/**
 * Created by kimveasna on 21/02/2017.
 */
export abstract class Identifiable<someType> {

    id: string;

    static fetch<someType>(id:string):someType {
        return null;
    };
}
