import {Country} from "../common/country";
import {Language} from "../common/language";
import {Currency} from "../common/currency";
import {Company} from "./company";
import {injectAdapter} from "../../underlying/connectors/inject-model-adapter"

enum LEGAL_FORM {
  INDEPENDENT,
  BRANCH
}

@injectAdapter
export class ConsolidationCompany {

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

}

