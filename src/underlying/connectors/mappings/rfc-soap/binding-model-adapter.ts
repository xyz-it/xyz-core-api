import {mappingRfcConsolidationCompany} from "./mapping-consolidation-company.json"
import {mappingRfcCompany} from "./mapping-company.json"
import {mappingRfcControllingArea} from "./mapping-controlling-area.json"
import {mappingRfcCreditControlArea} from "./mapping-credit-control-area.json"
import {FlexRfcAdapter} from "../../generic-rfc-adapter";

const flexRfcAdapterSingleton = new FlexRfcAdapter()

export const bindingSetup = {
  ConsolidationCompany: { name : "ConsolidationCompany", "adapter": flexRfcAdapterSingleton, "table": "T880", "mapping": mappingRfcConsolidationCompany},
  Company: { name : "Company", "adapter": flexRfcAdapterSingleton, "table": "T001", "mapping": mappingRfcCompany},
  ControllingArea: { name : "ControllingArea", "adapter": flexRfcAdapterSingleton, "table": "TKA01", "mapping": mappingRfcControllingArea},
  CreditControlArea: { name : "CreditControlArea", "adapter": flexRfcAdapterSingleton, "table": "T014", "mapping": mappingRfcCreditControlArea},
}
