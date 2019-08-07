import {ModelAdapter} from "../model-adapter";
import {ConsolidationCompany} from "../../../setup/organizational-structure/consolidation-company";
import {inject, injectable} from "inversify";
import {rfcQuery} from "../rfc-query-table";
import {rfcSoap} from "./mapping-consolidation-company.json";
import {
  FieldMapper
} from "../../../tools/conversion/mappers/basic-bapi-mapper";
import {from} from "rxjs";
// import {SERVICE_IDENTIFIER} from "../identifiers";
import {GenericRfcAdapter} from "../generic-rfc-adapter";
// import {rfcConnector} from "../../models/rfc-generic";


@injectable()
export class ConsolidationCompanyRfcAdapter extends GenericRfcAdapter(ConsolidationCompany, rfcSoap as FieldMapper[], "T880") {

}
