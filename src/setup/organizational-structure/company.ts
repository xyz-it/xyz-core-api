import {Country} from "../common/country";
import {Currency} from "../common/currency";
import {Language} from "../common/language";
import {ChartOfAccounts} from "../../master/finance/chart-of-accounts";
import {ConsolidationCompany} from "./consolidation-company";
import {ControllingArea, ALLOCATION_INDICATOR} from "./controlling-area";
import {CreditControlArea} from "./credit-control-area";
import {injectAdapter} from "../../underlying/connectors/inject-model-adapter";

@injectAdapter
export class Company {
  companyCode: string;
  companyCodeName: string;
  cityName: string;
  country: Country;
  currency: Currency;
  language: Language;
  chartOfAccounts: ChartOfAccounts;
  maxExchangeRateDeviation: number;
  fiscalYearVariant: string;
  company: ConsolidationCompany;
  creditControlArea: CreditControlArea;
  countryChartOfAccounts: string;
  financialManagementArea: string;
  addressId: string;
  taxableEntity: string;
  vatRegistration: string;
  isExtendedWhldgTaxActive: boolean;
  controllingArea: ControllingArea;
  fieldStatusVariant: string;
  nonTaxableTransactionTaxCode: string;
  docDateIsUsedForTaxDetn: boolean;
  isTaxRptgDateActive: boolean;
  allocationIndicator: ALLOCATION_INDICATOR;
  isProjectCashManagementActive: boolean;
  isCashBudgetManagementActive: boolean;
  isFundManagementUpdateActive: boolean;
  isTemplate:boolean;
}
