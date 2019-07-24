import {SalesDocument, SalesDocumentItem } from "./sales-document";
// import './common';
import {SalesArea} from "./common";
import {Material} from "../master/shared/material"

/**
 * A sales order in SAP, with remote business rules
 */
export class Quotation extends SalesDocument {
    documentId:string;

    /**
     * Create an empty sales order
     */
    constructor(public salesArea:SalesArea, customerId:string) {
      super();
    }

    /**
     * Change customer
     * @param id  Id of the customer to be used
     * @returns       id of the customer
     */
    set customerId(id:string) {
      //
    }

    /**
     * Get customer
     * @returns       id of the customer
     */
    get customerId():string {
      return this.customerId;
    }

    /**
     * Force update sales order to backend
     * @returns       id of the customer
     */
    synchronize(callback:any):void {
      //
    }


    /**
     * Add items to the sales order
     * @returns       id of the customer
     */
    addItems(items:Array<Item>):void {
      //
    }


    removeItems(itemIds:Array<string>):void {
      //
    }

}


  export class Item extends SalesDocumentItem {

    constructor(jsObject:any) {
      super();
        this.material = jsObject.materialId || null;
        this.quantity.ordered = jsObject.quantity;
    }
  }
