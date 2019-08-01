import {Order} from "./sales/order";
import {Quotation} from "./sales/quotation";

export * from './lib/number';
export * from './sales/sales';
export * from './underlying/connectors/SoapRfc';
export * from './underlying/connectors/rfcQueryTable';
export * from './underlying/connectors/sales/BapiSoapSalesOrder';
export * from './env/ApiSettings';
// export * from './env/BusinessSettings';
export * from './system/connection';

const sales = {
  Order, Quotation
}

export { sales };
