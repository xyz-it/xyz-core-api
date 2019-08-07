import {FieldMapper} from "../../tools/conversion/mappers/basic-bapi-mapper";
import {Constructor} from "./tracable";
import {GenericRfcAdapter} from "../connectors/generic-rfc-adapter";

/*
export function rfcConnector<ModelClass>(modelConstructor: new() => ModelClass, mapping: FieldMapper[], tableName:string): ((any) => (any)) {
  return <TBase>(constructor: TBase) => {
    return class EnhancedRfcConnector extends GenericRfcAdapter<ModelClass> {

      public constructor() {
        super(modelConstructor, mapping, tableName);
      }
    }
  }
}
*/
