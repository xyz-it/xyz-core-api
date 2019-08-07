import {ModelAdapter} from "../model-adapter";
import {ConsolidationCompany} from "../../../setup/organizational-structure/consolidation-company";
import {inject, injectable} from "inversify";
import {rfcQuery} from "../rfc-query-table";
import {rfcSoap} from "./mapping-consolidation-company.json";
import {
  FieldMapper
} from "../../../tools/conversion/mappers/basic-bapi-mapper";
import {from} from "rxjs";
import {SERVICE_IDENTIFIER} from "../identifiers";
import {GenericRfcAdapter} from "../generic-rfc-adapter";
// import {rfcConnector} from "../../models/rfc-generic";

// @rfcConnector<ConsolidationCompany>(ConsolidationCompany, rfcSoap as FieldMapper[], "T880")
@injectable()
export class ConsolidationCompanyRfcAdapter extends GenericRfcAdapter<ConsolidationCompany>(ConsolidationCompany, rfcSoap as FieldMapper[], "T880") { // implements ModelAdapter<ConsolidationCompany> {

  // private genericAdapter = new GenericRfcAdapter<ConsolidationCompany>(ConsolidationCompany, rfcSoap as FieldMapper[], "T880");

  /*
  readonly create: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => (Promise<ConsolidationCompany[] | ConsolidationCompany>);
  readonly delete: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => void;
  readonly query: (...args: any[]) => Promise<ConsolidationCompany[]>;
  readonly read: (companyId: string) => Promise<ConsolidationCompany> = (companyId: string) => {

    return rfcQuery({queryTable: 'T005', whereClause: [`RCOMP = $(companyId)`] })
      .pipe(map(this.mapToConsolidationCompany),map(tab => tab[0]))
      .toPromise();
    // return null;

  }
  readonly update: (obj: (ConsolidationCompany[] | ConsolidationCompany)) => (ConsolidationCompany[] | ConsolidationCompany);


  private mapToConsolidationCompany(input:any):ConsolidationCompany[] {
    const consolidationCompanies:ConsolidationCompany[] = new Array<ConsolidationCompany>();

    const mapping = rfcSoap as FieldMapper[]

    input.data.forEach(record => {
      consolidationCompanies.push(BasicMapper.deserialize<ConsolidationCompany>(ConsolidationCompany, mapping, record));
    })

    return consolidationCompanies;
  }

   */
}
