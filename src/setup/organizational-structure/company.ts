import {Country} from "../common/country";
import {Currency} from "../common/currency";
import {Language} from "../common/language";
import {ChartOfAccounts} from "../../master/finance/chart-of-accounts";
import {ConsolidationCompany} from "./consolidation-company";
import {ControllingArea} from "./controlling-area";
import {CreditControlArea} from "./credit-control-area";

export class Company {
  companyCode: string;
  companyCodeName: string;
  cityName: string;
  country: Country;
  currency: Currency;
  language: Language;
  chartOfAccounts: ChartOfAccounts;
  fiscalYearVariant: string;
  company: ConsolidationCompany;
  creditControlArea: CreditControlArea;
  countryChartOfAccounts: string;
  financialManagementArea: string;
  addressID: string;
  taxableEntity: string;
  vATRegistration: string;
  extendedWhldgTaxIsActive: boolean;
  controllingArea: ControllingArea;
  fieldStatusVariant: string;
  nonTaxableTransactionTaxCode: string;
  docDateIsUsedForTaxDetn: boolean;
  taxRptgDateIsActive: boolean;
}
