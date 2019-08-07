import {ModelAdapter} from "./model-adapter";
import { rfcQuery } from "./rfc-query-table";
import {map} from "rxjs/operators";
import {
  BasicMapper,
  FieldMapper
} from "../../tools/conversion/mappers/basic-bapi-mapper";


export function GenericRfcAdapter<T>(modelConstructor: new() => T, mapping: FieldMapper[], table:string ): (new() => ModelAdapter<T>) {
  return class implements ModelAdapter<T> {

    private modelConstructor: new() => T;
    private mapping: FieldMapper[];
    private table: string;

    public constructor( ) {
      //
      this.modelConstructor = modelConstructor;
      this.mapping = mapping;
      this.table = table;
    }

    create(obj: T|T[]): Promise<T|T[]> {
      return null; // Not implemented for RFC SOAP
    };

    delete(obj: T|T[]): void {
      return null; // Not implemented
    };

    query(...args: any[]): Promise<T[]> {
      return rfcQuery({queryTable: this.table })
        .pipe(map(this.mapToGeneric))
        .toPromise();
    };

    update<T>(obj: T|T[]): Promise<T|T[]> {
      return null; // Not implemented
    };

    // readonly read = (...args: any[]) => {
    // tslint:disable-next-line:no-shadowed-variable
    read( ...args: any[]): Promise<T> {
      return rfcQuery({queryTable: this.table, whereClause: [`RCOMP = $(companyId)`] })
        .pipe(map(this.mapToGeneric),map(tab => tab[0]))
        .toPromise();
    }

    private mapToGeneric(input:any):T[] {
      const objectTable:T[] = new Array<T>();

      input.data.forEach(record => {
        objectTable.push(BasicMapper.deserialize<T>(this.modelConstructor, this.mapping, record));
      })

      return objectTable;
    }
  }
}
