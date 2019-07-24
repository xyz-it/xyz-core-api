import {SalesDocument, SalesDocumentItem, SalesDocumentScheduleLine } from "./sales-document";
import {Customer} from "../master/partners/customer";
import { SalesArea } from "./common";
import {Identifiable} from "../underlying/models/identifiable";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';
import { watchClass } from '../tools/conversion/mappers/basic-bapi-mapper';


/**
 * A sales order in SAP, with remote business rules
 *
 */
@watchClass
export class Order extends SalesDocument implements Identifiable<Order> {

  public static fetch(id:string):Order {
    return null;
  };


  private _items:Item[] = [];

  /**
   * Id of an order, that is documentId
   * @return {string} [description]
   */
    public get id():string {
      return this.documentId;
    }

    public get orderId():string {
      return this.documentId;
    }

    public set orderId(id:string) {
      this.documentId = id;
    }

    /**
     * Create an empty sales order
     */
    constructor() {
      super();
    }





    /**
     * Change customer
     * @param id  Id of the customer to be used
     * @returns       id of the customer
     */
    set customerId(id: string) {
      this.customer = id;
    }

    /**
     * Get customer
     * @returns       id of the customer
     */
    get customerId(): string {
        return this.customer;
    }

    /**
     * Force update sales order to backend
     * @param callback
     * @returns       id of the customer
     */
    public synchronize(callback: any): Observable<Order> {
      return null;
    }


    /**
     * Add items to the sales order
     * @param items
     * @returns       
     */
    public addItems(items: Array<Item|object> | Item): void {
      if (items instanceof Array) {
        // Array.prototype.push.apply(this._items,items);

        from(items)
            .pipe(map((someItem:Item|object):Item => {
              return someItem instanceof Item ? someItem: _.merge(new Item(),someItem);
            }))
            .subscribe((item:Item) => {
                this._items.push(item);
            });
      }
      else if (items instanceof Item) {
        this._items.push(items);
      }
    }


    /**
     * [removeItems description]
     * @param  {Array<string>} itemIds [description]
     * @return {[type]}         [description]
     */
    public removeItems(itemIds: Array<Item|string>): void {

    }


    public get items():Item[] {
        return this._items;
    }

}


/**
 * A sales order item in SAP
 * @param  {any}    jsObject [description]
 * @return {[type]}          [description]
 */
@watchClass
export class Item extends SalesDocumentItem {

  private _scheduleLines:Array<Schedule> = [];

  /**
   * Id of an order, that is documentId
   * @return {string} [description]
   */
    public get id():string {
      return this.documentId + this.itemId;
    }


    public addScheduleLines(schedules: Array<Schedule|object> | Schedule): void {
      if(schedules instanceof Array) {
        from(schedules)
        .pipe(map((someSchedule:Schedule|object):Schedule => {
          return someSchedule instanceof Schedule? someSchedule : _.merge(new Schedule(), someSchedule);
        }))
        .subscribe((someSchedule:Schedule) => {
                this._scheduleLines.push(someSchedule);
        });
      }
      else if (schedules instanceof Schedule) {
        this._scheduleLines.push(schedules)
      }
    }
}


@watchClass
export class Schedule extends SalesDocumentScheduleLine {

  /**
   * Id of an order, that is documentId
   * @return {string} [description]
   */
    public get id():string {
      return this.documentId + this.itemId + this.scheduleId;
    }
}

