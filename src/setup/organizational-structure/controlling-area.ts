import {Currency} from "../common/currency";
import {ChartOfAccounts} from "../../master/finance/chart-of-accounts";
import {injectAdapter} from "../../underlying/connectors/inject-model-adapter";

export enum ALLOCATION_INDICATOR {
  AS_COMPANY_CODE = 1,
  CROSS_COMPANY = 2
}

@injectAdapter
export class ControllingArea {
  controllingArea:string;
  name:string;
  currency: Currency;
  chartOfAccounts: ChartOfAccounts;
  fiscalYearVariant: string;
  allocationIndicator: ALLOCATION_INDICATOR;
  logicalSystem: string;
  costCenterDistributionMethod: string;
  masterDatalogicalSystem: string;
}
