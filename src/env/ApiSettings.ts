export interface ApiSettings {
    company?:string;
    url?:string;

    sapBackendConnection?: SapBackendConnection;
    sapOdataConnection?: SapOdataConnection;
}

export interface SapBackendConnection {
    host?:string;
    client?:number;
    user?:string;
    password?:string;

    rfc?:ServiceEndpoint;
    salesRfc?:SalesEndpoint;
}

export interface SapOdataConnection {
  host?:string;
  client?:number;
  user?:string;
  password?:string;
}

export interface ServiceEndpoint {
    port?:number;
    protocol?:string;
    path?:string;
    service?:string;
    headers?:any;
    rfcread?: string;
}

export interface SalesEndpoint {
    rfcOrderGetDetails?:string;
    rfcOrderUpdate?:string;
}


class ApiSettingsHolder {
    static __apiSettings__:ApiSettings = {
        company: "SomeCompany",
        url: "https://someurl",

        sapBackendConnection: {
            host: "hosttobesetup",
            user: "usertobesetup",
            password: "passwordtobesetup",
            client: 100,

            rfc: {
                port: 8443,
                protocol: "https",
                path: "/sap/bc/soap/",
                service: "rfc",
                rfcread: "BBP_RFC_READ_TABLE"
            },

            salesRfc: {
              rfcOrderGetDetails: "BAPISDORDER_GETDETAILEDLIST",
              rfcOrderUpdate: "BAPI_SALESORDER_CHANGE"
            }
        } as SapBackendConnection,

      sapOdataConnection : {
        host: "hosttobesetup",
        user: "usertobesetup",
        password: "passwordtobesetup",
        client: 100,
      } as SapOdataConnection
    };
}

// var xAppsSettings = ApiSettingsHolder.__apiSettings__;
export let xAppsSettings:ApiSettings = ApiSettingsHolder.__apiSettings__; // = ApiSettingsHolder.__apiSettings__;
