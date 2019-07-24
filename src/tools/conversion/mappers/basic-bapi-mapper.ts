import "reflect-metadata";
import * as _ from "lodash";
import { from, Observable } from "rxjs";
import { makeWatchable, enhancePropertiesOf } from "../../../underlying/models/tracable"
import { conversion } from './implicit-conversion';



export function watchClass(target: any):any {

    // save a reference to the original constructor
    const original = makeWatchable(target);
    // original.prototype = target.prototype;

    // template instance, construct without parameters
    const templateInstance = new original();

    enhancePropertiesOf(templateInstance);


    // the new constructor behaviour
    const newConstructor: any =  (...args: any[]) => {
        const originalInstance: any = new original();

        return originalInstance;
    }

    // copy prototype so intanceof operator still works
    newConstructor.prototype = target.prototype;

    // return new constructor (will override original)
    return newConstructor;
}


export class BasicMapper {

    public static deserialize<T>(clazz: new() => T , mapping: FieldMapper[], inputJsonObject: any): T {

        // Checks beforehand
        if ((clazz === undefined) || (inputJsonObject === undefined) || (mapping === undefined)) {
          return undefined;
        }


        // Instantiate an object so we will have access to its properties
        const result = new clazz();

        // Loop over mapping table and assign each field
        from(mapping).subscribe((x: { source: string, target: string }) => {

            if (x.target && x.target !== "" && inputJsonObject.hasOwnProperty(x.source)) {
                const inputValue = inputJsonObject[x.source];
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
