import {ConsolidationCompany} from "../..";
import {ConsolidationCompanyRfcAdapter} from "./setup/consolidation-company-rfc-adapter";
import {ModelAdapter} from "./model-adapter";

export const SERVICE_IDENTIFIER = {
  MODEL_ADAPTER: Symbol.for("ModelAdapter"),
  CONSOLIDATION_COMPANY_RFC_ADAPATER: Symbol.for("ConsolidationCompanyRfcAdapter")
};

export const TAG = {
  CONSOLIDATION_COMPANY : Symbol.for("ConsolidationCompany")
}

export default SERVICE_IDENTIFIER;
