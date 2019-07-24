/*jslint
    this
*/
import {SoapResponse, SoapRfcCall} from '../SoapRfc';
import {from, Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {xAppsSettings} from '../../../env/ApiSettings';
import {Item, Order, Schedule} from '../../../sales/order';
import * as mapping from './BapiSoapSalesOrderMapping.json';
import * as _ from 'lodash';
import {BasicMapper, FieldMapper} from "../../../tools/conversion/mappers/basic-bapi-mapper";
import {conversion} from "../../../tools/conversion/mappers/implicit-conversion";

export function getSalesOrderDetails(query: Array<string> | string): Observable<Order[]> {
    return SoapRfcCall(xAppsSettings.sapConnection.salesRfc.rfcOrderGetDetails)
        .call(mapOrderQueryToInnerPayload(query))
        .pipe(map(soapResponseToResult));
}

export function updateSalesOrderDetails(order: Order): Observable<Order> {
    return SoapRfcCall(xAppsSettings.sapConnection.salesRfc.rfcOrderUpdate)
        .call(mapOrderUpdateToInnerPayload(order))
        .pipe(map(soapUpdateResponseToResult))
}

function mapOrderQueryToInnerPayload(query: Array<string> | string): string {
    let queriedOrders = "";
    if (query.constructor === Array) {
        (query as Array<string>).forEach((orderId: string) => {
            queriedOrders += "<item><VBELN>" + orderId + "</VBELN></item>";
        })
    } else {
        queriedOrders = "<item><VBELN>" + query + "</VBELN></item>";
    }

    return "<I_BAPI_VIEW>"
        + "<HEADER>X</HEADER>"
        + "<ITEM>X</ITEM>"
        + "<SDSCHEDULE>X</SDSCHEDULE>"
        + "<BUSINESS>X</BUSINESS>"
        + "<PARTNER>X</PARTNER>"
        + "<ADDRESS>X</ADDRESS>"
        + "<STATUS_H>X</STATUS_H>"
        + "<STATUS_I>X</STATUS_I>"
        + "<SDCOND></SDCOND>"
        + "<SDCOND_ADD></SDCOND_ADD>"
        + "<CONTRACT>X</CONTRACT>"
        + "<TEXT>X</TEXT>"
        + "<FLOW>X</FLOW>"
        + "<BILLPLAN></BILLPLAN>"
        + "<CONFIGURE></CONFIGURE>"
        + "<CREDCARD></CREDCARD>"
        + "<INCOMP_LOG>X</INCOMP_LOG>"
        + "</I_BAPI_VIEW> "
        + "<SALES_DOCUMENTS>"
        + queriedOrders
        + "</SALES_DOCUMENTS>"
        + "<ORDER_HEADERS_OUT></ORDER_HEADERS_OUT>"
        + "<ORDER_ITEMS_OUT></ORDER_ITEMS_OUT>"
        + "<ORDER_SCHEDULES_OUT></ORDER_SCHEDULES_OUT>"
        + "<ORDER_BUSINESS_OUT></ORDER_BUSINESS_OUT>"
        + "<ORDER_PARTNERS_OUT></ORDER_PARTNERS_OUT>"
        + "<ORDER_ADDRESS_OUT></ORDER_ADDRESS_OUT>"
        + "<ORDER_STATUSHEADERS_OUT></ORDER_STATUSHEADERS_OUT>"
        + "<ORDER_STATUSITEMS_OUT></ORDER_STATUSITEMS_OUT>"
        + "<ORDER_CONDITIONS_OUT></ORDER_CONDITIONS_OUT>"
        + "<ORDER_COND_HEAD></ORDER_COND_HEAD>"
        + "<ORDER_COND_ITEM></ORDER_COND_ITEM>"
        + "<ORDER_COND_QTY_SCALE></ORDER_COND_QTY_SCALE>"
        + "<ORDER_COND_VAL_SCALE></ORDER_COND_VAL_SCALE>"
        + "<ORDER_CONTRACTS_OUT></ORDER_CONTRACTS_OUT>"
        + "<ORDER_TEXTHEADERS_OUT></ORDER_TEXTHEADERS_OUT>"
        + "<ORDER_TEXTLINES_OUT></ORDER_TEXTLINES_OUT>"
        + "<ORDER_FLOWS_OUT></ORDER_FLOWS_OUT>"
        + "<ORDER_CFGS_CUREFS_OUT></ORDER_CFGS_CUREFS_OUT>"
        + "<ORDER_CFGS_CUCFGS_OUT></ORDER_CFGS_CUCFGS_OUT>"
        + "<ORDER_CFGS_CUINS_OUT></ORDER_CFGS_CUINS_OUT>"
        + "<ORDER_CFGS_CUPRTS_OUT></ORDER_CFGS_CUPRTS_OUT>"
        + "<ORDER_CFGS_CUVALS_OUT></ORDER_CFGS_CUVALS_OUT>"
        + "<ORDER_CFGS_CUBLBS_OUT></ORDER_CFGS_CUBLBS_OUT>"
        + "<ORDER_CFGS_CUVKS_OUT></ORDER_CFGS_CUVKS_OUT>"
        + "<ORDER_BILLINGPLANS_OUT></ORDER_BILLINGPLANS_OUT>"
        + "<ORDER_BILLINGDATES_OUT></ORDER_BILLINGDATES_OUT>"
        + "<ORDER_CREDITCARDS_OUT></ORDER_CREDITCARDS_OUT>"
        + "<EXTENSIONOUT></EXTENSIONOUT>"
}


function soapResponseToResult(res: SoapResponse): Order[] {
    console.log("soapResponseToResult");
    console.log(res);

    let output: Order[] = [];
    let hashedOrder: any = {};
    let hashedItem: any = {};

    let queriedOrders: string[] = res.response.SALES_DOCUMENTS.item.constructor == Array ? res.response.SALES_DOCUMENTS.item : [res.response.SALES_DOCUMENTS.item];
    let orderHeaders: any[] = res.response.ORDER_HEADERS_OUT.item.constructor == Array ? res.response.ORDER_HEADERS_OUT.item : [res.response.ORDER_HEADERS_OUT.item];
    let orderItems: any[] = res.response.ORDER_ITEMS_OUT.item.constructor == Array ? res.response.ORDER_ITEMS_OUT.item : [res.response.ORDER_ITEMS_OUT.item];
    let orderSchedules: any[] = res.response.ORDER_SCHEDULES_OUT.item.constructor == Array ? res.response.ORDER_SCHEDULES_OUT.item : [res.response.ORDER_SCHEDULES_OUT.item];
    let orderBusinessData: any[] = res.response.ORDER_BUSINESS_OUT.item.constructor == Array ? res.response.ORDER_BUSINESS_OUT.item : [res.response.ORDER_BUSINESS_OUT.item];

    let headerMapping = _.get(mapping, "BAPISDORDER_GETDETAILEDLIST.ORDER_HEADERS_OUT") as FieldMapper[];
    let itemMapping = _.get(mapping, "BAPISDORDER_GETDETAILEDLIST.ORDER_ITEMS_OUT") as FieldMapper[];
    let scheduleMapping = _.get(mapping, "BAPISDORDER_GETDETAILEDLIST.ORDER_SCHEDULES_OUT") as FieldMapper[];
    let businessDataMapping = _.get(mapping, "BAPISDORDER_GETDETAILEDLIST.ORDER_BUSINESS_OUT") as FieldMapper[];

    from(orderHeaders).subscribe((headerJson: any) => {
        let order = BasicMapper.deserialize(Order, headerMapping, headerJson);
        output.push(order);
        hashedOrder[order.documentId] = order;
    });

    from(orderItems).subscribe((itemJson: any) => {
        let item = BasicMapper.deserialize(Item, itemMapping, itemJson);
        hashedOrder[item.documentId].addItems(item);
        hashedItem[item.documentId + item.itemId] = item;
    })

    from(orderSchedules).subscribe((scheduleJson: any) => {
        let schedule = BasicMapper.deserialize(Schedule, scheduleMapping, scheduleJson);
        hashedItem[schedule.documentId + schedule.itemId].addScheduleLines(schedule);
    })

    from(orderBusinessData).subscribe((businessDataJson: any) => {
        let item = BasicMapper.deserialize(Object, businessDataMapping, businessDataJson) as Object & { documentId: string; itemId: string };

        if (item.itemId === "000000") {
            _.assign(hashedOrder[item.documentId], item);
        }
        else {
            _.assign(hashedItem[item.documentId + item.itemId], item);
        }
    })

    return output;
}


function mapOrderUpdateToInnerPayload(order: Order): string {

    let headerMapping = _.get(mapping, "BAPI_SALESORDER_CHANGE.ORDER_HEADER_IN") as FieldMapper[];
    let itemMapping = _.get(mapping, "BAPI_SALESORDER_CHANGE.ORDER_ITEM_IN") as FieldMapper[];

    let orderHeaderIn: string = "";
    let orderHeaderInX: string = "<UPDATEFLAG>U</UPDATEFLAG>";

    let itemsIn: string = "";
    let itemsInX: string = "";


    for (let idx in headerMapping) {
        let fieldMapper: FieldMapper = headerMapping[idx];

        let value: any = (order as any)[fieldMapper.source];
        let stringValue: string = conversion.from("any").to("string")(value);
        let changed: string = !_.isUndefined(value) ? "X" : "";

        orderHeaderIn += "<" + fieldMapper.target + ">"
            + stringValue
            + "</" + fieldMapper.target + ">";

        orderHeaderInX += "<" + fieldMapper.target + ">"
            + changed
            + "</" + fieldMapper.target + ">";
    }

    from(order.items).subscribe((item: Item) => {
        let itemIn: string = "<item>";
        let itemInX: string = "<item><UPDATEFLAG>U</UPDATEFLAG>";

        for (let idx in itemMapping) {
            let fieldMapper: FieldMapper = itemMapping[idx];
            let value: any = (item as any)[fieldMapper.source];
            let stringValue: string = conversion.from("any").to("string")(value);
            let changed: string = !_.isUndefined(value) ? "X" : "";

            itemIn += "<" + fieldMapper.target + ">"
                + stringValue
                + "</" + fieldMapper.target + ">";

            itemInX += "<" + fieldMapper.target + ">"
                + changed
                + "</" + fieldMapper.target + ">";
        }

        itemIn += "</item>";
        itemInX += "</item>";

        itemsIn += itemIn;
        itemsInX += itemInX;
    });


    return "<SALESDOCUMENT>" + order.orderId + "</SALESDOCUMENT>"
        + "<ORDER_HEADER_IN>" + orderHeaderIn + "</ORDER_HEADER_IN>"
        + "<ORDER_HEADER_INX>" + orderHeaderInX + "</ORDER_HEADER_INX>"
        + "<SIMULATION></SIMULATION>"
        + "<BEHAVE_WHEN_ERROR></BEHAVE_WHEN_ERROR>"
        + "<INT_NUMBER_ASSIGNMENT></INT_NUMBER_ASSIGNMENT>"
        + "<LOGIC_SWITCH></LOGIC_SWITCH>"
        + "<NO_STATUS_BUF_INIT></NO_STATUS_BUF_INIT>"
        + "<RETURN></RETURN>"
        + "<ORDER_ITEM_IN>" + itemsIn + "</ORDER_ITEM_IN>"
        + "<ORDER_ITEM_INX>" + itemsInX + "</ORDER_ITEM_INX>"
        + "<PARTNERS></PARTNERS>"
        + "<PARTNERCHANGES></PARTNERCHANGES>"
        + "<PARTNERADDRESSES></PARTNERADDRESSES>"
        + "<ORDER_CFGS_REF></ORDER_CFGS_REF>"
        + "<ORDER_CFGS_INST></ORDER_CFGS_INST>"
        + "<ORDER_CFGS_PART_OF></ORDER_CFGS_PART_OF>"
        + "<ORDER_CFGS_VALUE></ORDER_CFGS_VALUE>"
        + "<ORDER_CFGS_BLOB></ORDER_CFGS_BLOB>"
        + "<ORDER_CFGS_VK></ORDER_CFGS_VK>"
        + "<ORDER_CFGS_REFINST></ORDER_CFGS_REFINST>"
        + "<SCHEDULE_LINES></SCHEDULE_LINES>"
        + "<SCHEDULE_LINESX></SCHEDULE_LINESX>"
        + "<ORDER_TEXT></ORDER_TEXT>"
        + "<ORDER_KEYS></ORDER_KEYS>"
        ;

}

function soapUpdateResponseToResult(res: SoapResponse): Order {

    console.log("soapResponseToResult");
    console.log(res);

    return null;
}
