import {Subject} from "rxjs";
import * as _ from "lodash";
import {conversion} from '../../tools/conversion/mappers/implicit-conversion';

enum ChangeState {
    Loading,         // Object is being created
    Ready,           // Object is created and cleared from changes
    Dirty,           // Object has been changed
    InLocalProcess,  // Object is locked for local update
    LocalCleared,    // Local update is done
    InRemoteProcess, // Object is locked for remote update
    RemoteCleared,   // Object is back from remote, still to be merged with local data
    Merging          // Object is being merged (local data and remote data), will be back to 'Ready'
}


export interface ChangedAttribute {
    name: string;
    oldValue: any;
    newValue: any;
}

export interface ChangedState {
    oldState: number,
    newState: number
}

export type Constructor<T = {}> = new (...args: any[]) => T;


export function makeWatchable<TBase extends Constructor>(Base: TBase):Constructor {
    return class WatchedObject extends Base {
        /**
         * Hashed access to attribute's ids
         */
        private static _tracedAttributes: any = {};


        /**
         * Number of traced attributes. Also used for id generation
         */
        private static _tracedAttributesCount: number = 0;


        /**
         * Observable for changed attributes
         */
        public changedAttribute = new Subject<ChangedAttribute>();


        /**
         * Observable for rejected attribute changes
         */
        public rejectedChange = new Subject<ChangedAttribute>();


        /**
         * Observable for object status updates
         */
        public changedState = new Subject<ChangedState>();



        /**
         * Holds state of the business object
         */
        private _state: number = ChangeState.Loading;



        /**
         * Ids of all dirty attributes
         */
        private _dirtyAttributes: number = 0;

        /**
         * Ids of all locally processed attributes
         */
        private _localClearedAttributes: number = 0;

        /**
         * Ids of all remotely processed attributes which needs to be merged
         */
        private _remoteClearedAttributes: number = 0;




        /**
         * Records change to an attribute value. It is usually called from object setters only
         * @param key Name of the attribute
         * @param oldValue Old value (converted value)
         * @param newValue New value (may be the converted value)
         */
        public traceChangedAttribute(key: string, oldValue: any, newValue: any): boolean {

            switch (this._state) {
                case ChangeState.Loading:
                    // In loading state: object is being created, we do not raise changes
                    this.changedAttribute.next({
                        name: key,
                        oldValue: oldValue,
                        newValue: newValue
                    });
                    return true;

                case ChangeState.InLocalProcess || ChangeState.InRemoteProcess || ChangeState.Merging || ChangeState.RemoteCleared:
                    // In local process, some characteristics are being updated and can be inconsistent with new values
                    // Same issues with remote process
                    // In 'merging' state, model has first to be syncronized before we accept new changes
                    // In 'remote cleared', we just got the update from remote and require to merge with our local version
                    this.rejectedChange.next({
                        name: key,
                        oldValue: oldValue,
                        newValue: newValue
                    });
                    return false;

                case ChangeState.LocalCleared || ChangeState.Ready || ChangeState.Dirty:
                    this.changedAttribute.next({
                        name: key,
                        newValue: newValue,
                        oldValue: oldValue

                    });
                    return true;
            }
        }


        /**
         * Initiates a change pointer to an attribute, in order to prepare for update events. Generates an id and return its value
         * @param key Name of the attribute
         */
        public addTraceToAttribute(key: string): number {

            this.constructor.prototype._tracedAttributes[key] = WatchedObject._tracedAttributesCount;

            return 2 ** (WatchedObject._tracedAttributesCount++);
        }


        public getAttributeId(key:string):number {
            return /*WatchedObject*/this.constructor.prototype._tracedAttributes.hasOwnProperty(key)? 2 ** WatchedObject._tracedAttributes[key] : 0;
        }
    };
}



/**
 * Factory function for getter and setter: attributes are hidden in local scope
 * @param {string} key
 * @param {string} valueType
 * @returns {{get: (() => any); set: any}}
 * @private
 */
function _getter_setter_factory_(key: string, valueType: string): any {

    /*
        This weak map stores attributes for any objects. Key is the object instance itself
     */
    const privateValue: WeakMap<any, any> = new WeakMap<any, any>();


    /*
        Some implicit conversions may be used
     */
    const conv = conversion.from("string").to(valueType);


    /*
        Declare setter function with signature
     */
    let setter: (val: any) => void;


    if (valueType === "string") {
        setter = function (val: any):void {
            const oldValue = privateValue.get(this);
            privateValue.set(this, val);
            if(this.traceChangedAttribute) {
              this.traceChangedAttribute(key, oldValue, val);
            }
        };
    }
    else if (valueType === "object" && !conv) {

        setter = function (val: any):void {

            let targetVal = this[key];

            if (targetVal && targetVal._isEnhanced) {
                const keys = Object.getOwnPropertyNames(targetVal);
                for (const idx in keys) {
                    const subkey = keys[idx];
                    if (!subkey.startsWith("_") && targetVal.hasOwnProperty(subkey)) {
                        targetVal[subkey] = val[subkey];
                    }
                }
            }
            else {
                targetVal = enhancePropertiesOf(val);
            }

            const oldValue = privateValue.get(this);
            privateValue.set(this, targetVal);
            if(this.traceChangedAttribute) {
              this.traceChangedAttribute(key, oldValue, targetVal);
            }
        };
    }
    else {
        setter = function (val: any):void {
            const oldValue = privateValue.get(this);
            const newValue = conv(val);
            privateValue.set(this, newValue);
            if(this.traceChangedAttribute) {
              this.traceChangedAttribute(key,oldValue,newValue);
            }
        };
    }


    return {
        get: function ():any {
            return privateValue.get(this);
        },
        set: setter
    }

}


export function enhancePropertiesOf<T>(target: T ): T {
    // Only deep objects can be enhanced
    if (!target || !_.isObjectLike(target) || _.isArray(target) || target.hasOwnProperty("_isEnhanced") ) {
        return target;
    }

    // In case of an instance, enhance prototype, otherwise in case of a plain object enhance it directly
    const targetedObject = _.isPlainObject(target) ? target : target.constructor.prototype;


    for (const key in target) {
        if (target.hasOwnProperty(key) && !key.startsWith("_") && key !== "id" && key !== "documentId" && key !== "itemId" && key !== "scheduleId") {

            const value = target[key];
            const valueType:string = _.isDate(value) ? "date" : typeof value;

            if (Reflect.deleteProperty(targetedObject, key)) {

                const factory = _getter_setter_factory_(key, valueType);

                Reflect.defineProperty(targetedObject, key, {
                    get: factory.get,
                    set: factory.set,
                    enumerable: false
                });

                if((target as any).addTraceToAttribute) {
                  (target as any).addTraceToAttribute(key);
                }
            }

            target[key] = value;

            if (valueType === "object") {
                enhancePropertiesOf(value);
            }
        }
    }

    if (!targetedObject._isEnhanced) {
        Reflect.defineProperty(targetedObject, "_isEnhanced", {
            value: true,
            writable: false,
            enumerable: false
        })
    }

    return target;
}
