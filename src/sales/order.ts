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
 * <uml alt="Class Diagram">
 interface Sales.SalesDocument
 interface Sales.SalesDocumentItem

 Sales.SalesDocument <|-- Sales.Order
 Sales.SalesDocumentItem <|-- Sales.Order.Item
 Sales.Order o-- "*" Sales.Order.Item

 class Sales.Order {
  -documentId
  +customerId
  __ Getters/Setters __
  + get/set/CustomerId()
  __ No side-effect methods __
  + getDetailedPrice()
  + getTotalPrice()
  __ Side-effect methods __
  + synchronize()
}

 class Sales.Order.Item {
  .. Simple Getter ..
  + getName()
  + getAddress()
  .. Some setter ..
  + setName()
  __ private data __
  int age
  -- encrypted --
  String password
}
 * </uml>
 */
@watchClass
export class Order extends SalesDocument implements Identifiable<Order> {

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




    static fetch<Order>(id:string):Order {
        return null;
    };

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
    synchronize(callback: any): Observable<Order> {
      return null;
    }


    /**
     * Add items to the sales order
     * @param items
     * @returns       
     */
    addItems(items: Array<Item|Object> | Item): void {
      if (items instanceof Array) {
        //Array.prototype.push.apply(this._items,items);

        from(items)
            .pipe(map((someItem:Item|Object):Item => {
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
    removeItems(itemIds: Array<Item|string>): void {

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


    addScheduleLines(schedules: Array<Schedule|Object> | Schedule): void {
      if(schedules instanceof Array) {
        from(schedules)
        .pipe(map((someSchedule:Schedule|Object):Schedule => {
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

