// import { AjaxRequest, AjaxObservable, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import * as Rx from 'rxjs';
import { AjaxResponse } from "rxjs/ajax";
import * as xml2js from 'xml2js';
import { ApiSettings, xAppsSettings } from '../../env/ApiSettings';

/*const rfcConfig:SoapRfcConfig = {
  url: xAppsSettings.url,
  user: "K5965772",
  password: "kimpen@123456789"
}*/

export interface SoapRfcRequest {
  body?: any;
  function?: string;
}

export interface SoapRfcConfig {
  url?: string;
  user?: string;
  async?: boolean;
  headers?: Object;
  timeout?: number;
  password?: string;
  function?: string;
}

export class SoapResponse {
  status: number;
  response: any;
  responseText: string;
  responseType: string;
}

/**
 * This function is used in order to instantiate an RFC service, bound to an RFC
 *  function :
 *
 *  xapi.SoapRfcCall("BAPI_USER_GET_DETAIL").call("<USERNAME>DEMO</USERNAME>").subscribe(function (x) {
    console.log(x);
  },
 function (err) {
    console.log('Error: %s', err);
  },
 function () {
    console.log('Completed');
  })

 */
export function SoapRfcCall(rfcFunction:string) {

  return new SoapRfc(rfcFunction);
}

/**
 * [Builder description]
 * @return {[type]} [description]
 */
export class SoapRfc {

  private xmlBuilder = new xml2js.Builder();

  private xAppsSettings:ApiSettings = xAppsSettings;

  private __singleInstance__:SoapRfc;


  constructor(private rfcFunction:string) { }

  public call(input:any):Rx.Observable<SoapResponse> {

    let headers = {
      'Authorization': this.make_base_auth(this.xAppsSettings.sapConnection.user, this.xAppsSettings.sapConnection.password),
      'Content-Type':'text/xml'
    };

    return Rx.Observable.ajax({
      method: 'POST',
      url: this.xAppsSettings.sapConnection.rfc.protocol
          + "://" + this.xAppsSettings.sapConnection.host + ":" + this.xAppsSettings.sapConnection.rfc.port
        + this.xAppsSettings.sapConnection.rfc.path + this.xAppsSettings.sapConnection.rfc.service ,  //this.config.url,
      body: this.make_soap_body(input),
      headers: headers,
      responseType: 'text'
    }).map(this.responseToSoapResponse);

    /*return Rx.Observable.ajax.post(
        this.config.url,
        this.make_soap_body(input),
        headers
      ).map(this.responseToSoapResponse);*/
       //.catch(this.catchError);
  };


  private make_base_auth(user:string, password:string) {
    return "Basic " + btoa(user + ':' + password);
  }


  private make_soap_body(body:any) {

    let innerPayload:string = (typeof body === 'string')?body:this.parseToXml(body);


    var namespace = "s0";
    return "<SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/' xmlns:" + namespace + "='urn:sap-com:document:sap:rfc:functions'>"
      + "<SOAP-ENV:Header/>"
      + "<SOAP-ENV:Body>"
      + "<" + namespace + ":" + this.rfcFunction + ">"
      + innerPayload
      + "</" + namespace + ":" + this.rfcFunction + ">"
      + "</SOAP-ENV:Body>"
      + "</SOAP-ENV:Envelope>";
  }


  private parseToXml(body:any) {
    return this.xmlBuilder.buildObject(body);
  }


  /**
   * [res description]
   * @param res AjaxResponse
   */
  private responseToSoapResponse = (res:AjaxResponse) => {
    let xmlObject:any = {};
    let me = this;

    //console.log("responseToSoapResponse ...");
    //console.log(res);

    xml2js.parseString(
      me.decode(res.response),
      {explicitArray: false},
      function(err,result) {
        //console.log(result);
        xmlObject = result
      })

    return {
      responseText: res.response,
      response: xmlObject['SOAP-ENV:Envelope']['SOAP-ENV:Body']['s0:' + me.rfcFunction + '.Response']
    } as SoapResponse;
  }


  private decode(text:string):string {
    let elem = document.createElement('textarea');
    elem.innerHTML = text;
    //console.log("decode ...");
    //console.log(elem.value);

    return elem.value;
  }

  private catchError(err:any, caught:Rx.Observable<SoapResponse>):Rx.Observable<SoapResponse> {
    console.log('error');
    return null;
  }
}
