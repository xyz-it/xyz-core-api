import "reflect-metadata";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { makeWatchable, enhancePropertiesOf } from "../../../underlying/models/tracable"
import { conversion } from './implicit-conversion';



export function watchClass(target: any) {

    // save a reference to the original constructor
    let original = makeWatchable(target);
    //original.prototype = target.prototype;

    // template instance, construct without parameters
    let templateInstance = new original();

    enhancePropertiesOf(templateInstance);


    // the new constructor behaviour
    var newConstructor: any = function (...args: any[]) {
        let originalInstance: any = new original();

        return originalInstance;
    }

    // copy prototype so intanceof operator still works
    newConstructor.prototype = target.prototype;

    // return new constructor (will override original)
    return newConstructor;
}


export class BasicMapper {

    public static deserialize<T>(clazz: { new(): T }, mapping: FieldMapper[], inputJsonObject: any): T {

        // Checks beforehand
        if ((clazz === undefined) || (inputJsonObject === undefined) || (mapping === undefined))
            return undefined;

        // Instantiate an object so we will have access to its properties
        let result = new clazz();

        // Loop over mapping table and assign each field
        Observable.from(mapping).subscribe(function (x: { source: string, target: string }) {

            if (x.target && x.target !== "" && inputJsonObject.hasOwnProperty(x.source)) {
                let inputValue = inputJsonObject[x.source];
                _.set(result, x.target, inputValue);
            }

        });

        return result;
    }
}

export interface FieldMapper {
    source: string;
    target: string;
}