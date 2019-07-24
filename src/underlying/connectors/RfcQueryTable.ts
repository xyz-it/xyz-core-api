import { SoapRfcCall, SoapRfc, SoapResponse } from './SoapRfc';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { xAppsSettings } from '../../env/ApiSettings';

export interface QueryParameters {
  queryTable?: string;
  whereClause?: string[];
  fields?: string[];
}

export interface QueryResults {
  data: any[];
  fields: any[];
}

function mapQueryToInnerPayload(params:QueryParameters):string {
  let fieldsAsString:string = "";
  if(params.fields && params.fields.constructor === Array) {
    params.fields.forEach(field => {
      fieldsAsString += "<item><FIELDNAME>" + field + "</FIELDNAME></item>"
    });
  }

  let clauseAsString:string = "";
  if(params.whereClause && params.whereClause.constructor === Array) {
    params.whereClause.forEach(field => {
      clauseAsString += "<item><TEXT>" + field + "</TEXT></item>"
    });
  }

  return '<QUERY_TABLE>' + params.queryTable + '</QUERY_TABLE>'
    + '<DELIMITER>|</DELIMITER>'
    + '<NO_DATA/><ROWSKIPS/><ROWCOUNT/>'
    + '<OPTIONS>' + clauseAsString + '</OPTIONS>'
    + '<FIELDS>' + fieldsAsString + '</FIELDS>'
    + '<DATA></DATA>';
}



function soapResponseToResult(res:SoapResponse):QueryResults {
  // console.log("soapResponseToResult");
  // console.log(res);
  const fields = res.response.FIELDS.item.constructor === Array? res.response.FIELDS.item:[res.response.FIELDS.item];
  const data = res.response.DATA.item.constructor === Array? res.response.DATA.item:[res.response.DATA.item];
  const output:any[] = [];

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {

      const item = data[prop];

      const outputItem:any = {};
      fields.forEach( (field:any) => {
        const start:number = parseInt(field.OFFSET,0);
        const end:number = start + parseInt(field.LENGTH, 0);
        outputItem[field.FIELDNAME.toLowerCase()] = item.WA.substring(start, end).trim();
      });

      output.push(outputItem);
    }
  }


  return {
    data: output,
    fields: fields
  } as QueryResults
}

export function rfcQuery(params:QueryParameters):Observable<QueryResults> {
  return SoapRfcCall(xAppsSettings.sapConnection.rfc.rfcread)
    .call(mapQueryToInnerPayload(params))
    .pipe(map(soapResponseToResult));
}
