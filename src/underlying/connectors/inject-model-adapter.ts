import {FlexRfcAdapter} from "../connectors/generic-rfc-adapter";
import {bindingSetup} from "./mappings/rfc-soap/binding-model-adapter"

// const modelAdapterMapping = {};

export interface AdapterDescription {
  class: any,
  name: string,
  adapter: any,
  table: string,
  mapping: any
}

export class InjectModelAdapter {
  //
  public static getAdapterFor(name:string): AdapterDescription {
    return bindingSetup[name] as AdapterDescription;
  }
}

export function injectAdapter<T extends { new(...constructorArgs: any[]) }>(Base: T):any{
  bindingSetup[Base.name].class = Base; /*{
    class: Base,
    name: Base.name,
    adapter: new FlexRfcAdapter(),
    table: "T880",
    mapping: rfcSoap
  };*/

  return class extends Base {
    // private static adapter2 : FlexRfcAdapter = new FlexRfcAdapter();

    public static getAll2(...id:any[]):Promise<T[]>  {
      return bindingSetup[Base.name].adapter.query<T>(Base.name);
    }
  }
}

