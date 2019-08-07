import {inject, named} from "inversify";
// import { SERVICE_IDENTIFIER, TAG } from "../../underlying/connectors/identifiers";
import {ModelAdapter} from "../../underlying/connectors/model-adapter";
import {Country} from "../common/country";
import {Language} from "../common/language";
import {Currency} from "../common/currency";
import {Company} from "./company";
import { container} from "../../inversify.config";
import { ConsolidationCompanyRfcAdapter } from "../../underlying/connectors/setup/consolidation-company-rfc-adapter";

enum LEGAL_FORM {
  INDEPENDENT,
  BRANCH
}

export class ConsolidationCompany {
  // @inject(SERVICE_IDENTIFIER.MODEL_ADAPTER) @named(TAG.CONSOLIDATION_COMPANY) private static adapter: ModelAdapter<ConsolidationCompany>;
  public static adapter: ModelAdapter<any>;

  public companyId:string;
  public country:Country;
  public name:string;
  public name2:string;
  public language:Language;
  public street:string;
  public street2:string;
  public poBox:string
  public zipCode:string;
  public city:string;
  public currency:Currency;
  public groupingCode:string;
  public isWriteLineItems:boolean;
  public legalStatus:LEGAL_FORM;
  public legalForm:string;
  public industrialSector
  public masterDataCompany:Company;
  public masterDataClient:number;
  public isConsolidationCompany:boolean;
  public isReadPurchaseOrder:boolean;

  public static getAll():Promise<ConsolidationCompany[]> {
    /*if (!this.adapter) {
      container.bind<ModelAdapter<any>>("ModelAdapter").to(ConsolidationCompanyRfcAdapter).whenTargetNamed("ConsolidationCompany");
      this.adapter = container.getNamed("ModelAdapter", "ConsolidationCompany");
    }*/
    return this.adapter.query()
  }
}

