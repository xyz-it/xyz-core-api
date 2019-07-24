import * as _ from "lodash";


function string_to_number(value: string): number {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
      return Number(value);
    }
    return NaN;
}

function string_to_boolean(value: string): boolean {
    return value === "X";
}

function string_to_date(value: string | Date): Date {
    if (!value) {
      return undefined;
    }
    else if (value.constructor === Date) {
      return value as Date;
    }
    else if (typeof value === "string" && /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(value)) {
      return new Date(value);
    }

    return undefined;

    /*
    let parsedStringDate:string[] = value.match(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[1-2]|2[1-9]|3[0-1])$/);

    if(parsedStringDate)
        return new Date(parseInt(parsedStringDate[1]),parseInt(parsedStringDate[2])-1,parseInt(parsedStringDate[3]));
    return null;
    */
}

function number_to_string(value: number): string {
    return value.toString();
}

function boolean_to_string(value: boolean): string {
    return value ? "X" : "";
}

function date_to_string(value: Date): string {
    return value.toISOString().slice(0, 10);
}


function any_to_string(value: any): string {
    if(_.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
      return "";
    }

    let valueType: string = typeof value;
    if (valueType === 'object') {
        if (value instanceof Date) {
            valueType = "date";
        }
    }

    const conv = conversion.from(valueType).to("string");
    return conv?conv(value):value;
}


const from: any = {
    string: {
        number: string_to_number,
        boolean: string_to_boolean,
        date: string_to_date
    },
    number: {
        string: number_to_string
    },
    boolean: {
        string: boolean_to_string
    },
    date: {
        string: date_to_string
    },
    any: {
        string: any_to_string
    }
};


export let conversion = {
    from: (sourceType: string) => {
        return {
            to: (targetType: string) => {
                return from[sourceType][targetType];
            }
        }
    }
}
