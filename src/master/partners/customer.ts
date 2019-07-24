/**
 * Created by kimveasna on 21/02/2017.
 */
import {ThirdPartyRecord} from "./third-party";

import { Identifiable } from '../../underlying/models/identifiable';

export class Customer extends Identifiable<Customer> implements ThirdPartyRecord {
    id: string;

}
