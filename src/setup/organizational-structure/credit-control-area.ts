import {Currency} from "../common/currency";
import {injectAdapter} from "../../underlying/connectors/inject-model-adapter";


export enum CREDIT_UPDATE {
  OPEN_ORDER,
  OPEN_DELIVERY_BILLING,
  OPEN_DELIVERY_ORDER
}

@injectAdapter
export class CreditControlArea {
  creditControlArea: string;
  currency: Currency
  creditUpdate: CREDIT_UPDATE;
  fiscalYearVariant: string;
  creditManagementRiskCategory: string;
  creditLimit: number;
  creditManagementRepresentativesGroup: string;
  isAllCompanyPostingPossible: boolean;
}
