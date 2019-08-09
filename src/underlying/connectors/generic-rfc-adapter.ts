import {FlexAdapter, ModelAdapter} from "./model-adapter";
import { rfcQuery } from "./rfc-query-table";
import {map} from "rxjs/operators";
import {
  BasicMapper
} from "../../tools/conversion/mappers/basic-bapi-mapper";
import {InjectModelAdapter} from "./inject-model-adapter";


export class FlexRfcAdapter implements FlexAdapter {

  create<T>(obj: T|T[]): Promise<T|T[]> {
    return null; // Not implemented for RFC SOAP
  };

  delete<T>(obj: T|T[]): void {
    return null; // Not implemented
  };

  query<T>(name:string, ...args: any[]): Promise<T[]> {
    return rfcQuery({queryTable: InjectModelAdapter.getAdapterFor(name).table })
      .pipe(map(this.mapTo(name)))
      .toPromise() as Promise<T[]>
  };

  update<T>(obj: T|T[]): Promise<T|T[]> {
    return null; // Not implemented
  };

  // readonly read = (...args: any[]) => {
  // tslint:disable-next-line:no-shadowed-variable
  read<T>(name:string, ...args: any[]): Promise<T> {
    return rfcQuery({queryTable: InjectModelAdapter.getAdapterFor(name).table, whereClause: [`RCOMP = $(companyId)`] })
      .pipe(map(this.mapTo(name)),map(tab => tab[0] as T))
      .toPromise() as Promise<T>;
  }

  private mapTo<T>(name: string): (any) => T[] {
    const currentClass = InjectModelAdapter.getAdapterFor(name).class;
    const currentMapping = InjectModelAdapter.getAdapterFor(name).mapping;

    return (input:any) => {
      const objectTable:T[] = new Array<T>();

      input.data.forEach(record => {
        objectTable.push(BasicMapper.deserialize<T>(currentClass, currentMapping, record));
      })

      return objectTable as T[];
    }
  }
}
