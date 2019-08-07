import {Order} from "./sales/order";
import {Quotation} from "./sales/quotation";

export * from './lib/number';
export * from './sales/sales';
export * from './underlying/connectors/soap-rfc';
export * from './underlying/connectors/rfc-query-table';
export * from './underlying/connectors/sales/BapiSoapSalesOrder';
export * from './env/ApiSettings';
// export * from './env/BusinessSettings';
export * from './system/connection';
export {ConsolidationCompany} from './setup/organizational-structure/consolidation-company'


const sales = {
  Order, Quotation
}

export { sales };

// export * from './inversify.config'
import { container } from './inversify.config';
import { ModelAdapter } from "./underlying/connectors/model-adapter";
import { ConsolidationCompanyRfcAdapter } from "./underlying/connectors/setup/consolidation-company-rfc-adapter";
import { ConsolidationCompany } from "./setup/organizational-structure/consolidation-company";


container.bind<ModelAdapter<any>>("ModelAdapter").to(ConsolidationCompanyRfcAdapter).whenTargetNamed("ConsolidationCompany");
ConsolidationCompany.adapter = container.getNamed("ModelAdapter", "ConsolidationCompany");

export { container }