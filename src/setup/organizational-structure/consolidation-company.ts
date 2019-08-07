import {inject, named} from "inversify";
import { SERVICE_IDENTIFIER, TAG } from "../../underlying/connectors/identifiers";
import {ModelAdapter} from "../../underlying/connectors/model-adapter";
import {Country} from "../common/country";
import {Language} from "../common/language";
import {Currency} from "../common/currency";
import {Company} from "./company";
import { container} from "../../inversify.config";

enum LEGAL_FORM {
  INDEPENDENT,
  BRANCH
}

export class ConsolidationCompany {
  // @inject(SERVICE_IDENTIFIER.MODEL_ADAPTER) @named(TAG.CONSOLIDATION_COMPANY) private static adapter: ModelAdapter<ConsolidationCompany>;
  private static adapter: ModelAdapter<any>;

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
    if (!this.adapter) {
      this.adapter = container.getNamed(SERVICE_IDENTIFIER.MODEL_ADAPTER, TAG.CONSOLIDATION_COMPANY);
    }
    return this.adapter.query()
  }
}
