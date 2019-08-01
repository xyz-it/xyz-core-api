import {ModelAdapter} from "../model-adapter";
import {ConsolidationCompany} from "../../../setup/organizational-structure/consolidation-company";
import {injectable} from "inversify";

@injectable()
export class ConsolidationCompanyRfcAdapter implements ModelAdapter<ConsolidationCompany> {
  readonly create: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => (ConsolidationCompany[] | ConsolidationCompany);
  readonly delete: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => void;
  readonly query: (...args: any[]) => ConsolidationCompany[];
  readonly read: (...args: any[]) => ConsolidationCompany;
  readonly update: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => (ConsolidationCompany[] | ConsolidationCompany);

}
