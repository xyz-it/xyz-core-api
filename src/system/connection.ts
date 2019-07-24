import { SoapRfcCall, SoapRfc, SoapResponse } from '../underlying/connectors/SoapRfc';
import { Observable } from 'rxjs'
import { xAppsSettings } from '../env/ApiSettings';


export interface ServerDescription {
  name?:string;
  host?:string;
  hostname?:string;
  ip?:string;
}

export interface SapServerInfo {
  db?:string;
  sid?:string;
  os?:string;
  release?:string;
  components?:any[];
}

export function getServerList() {
  return SoapRfcCall('TH_SERVER_LIST')
    .call('<LIST_IPV6></LIST_IPV6>')
    .map(soapResponseToServerList);
}


export function getSapServerInfo() {
  return SoapRfcCall('SCSI_GET_SYSTEM_INFO')
    .call('<ET_CVERS></ET_CVERS>')
    .map(soapResponseToServerInfo);
}


function soapResponseToServerList(res:SoapResponse):ServerDescription[] {
  let output:ServerDescription[] = [];
  let list = res.response.LIST_IPV6.item.constructor === Array? res.response.LIST_IPV6.item:[res.response.LIST_IPV6.item];

  list.forEach((item:any) => {
    output.push({
      name: item.NAME,
      host: item.HOST,
      hostname: item.HOSTNAMELONG,
      ip: item.HOSTADDR_V6_STR
    })
  })

  return output;
}



function soapResponseToServerInfo(res:SoapResponse):SapServerInfo {
  let info = res.response;
  let components = res.response.ET_CVERS.item.constructor === Array? res.response.ET_CVERS.item:[res.response.ET_CVERS.item];
  let comp:any[] = [];

  components.forEach((item:any) => {
    comp.push({
      component: item.COMPONENT,
      release: item.RELEASE,
      extrelease: item.EXTRELEASE,
      componentType: item.COMP_TYPE
    })
  })

  return {
    db: info.SY_DBSYS,
    sid: info.SY_SYSID,
    os: info.SY_OPSYS,
    release: info.SY_SAPRL,
    components: comp
  };
}
