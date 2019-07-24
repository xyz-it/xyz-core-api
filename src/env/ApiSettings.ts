export interface ApiSettings {
    company?:string;
    url?:string;

    sapConnection?: SapConnection;
}

export interface SapConnection {
    host?:string;
    client?:number;
    user?:string;
    password?:string;

    rfc?:ServiceEndpoint;
    salesRfc?:SalesEndpoint;
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
        url: "http://ampsv017pjt0t.p1.saint-gobain.net:8000/sap/bc/soap/rfc?sap-client=800",

        sapConnection: {
            host: "ampsv017pjt0t.p1.saint-gobain.net",
            user: "K5965772",
            password: "kimpen@123456789",
            client: 800,

            rfc: {
                port: 8000,
                protocol: "http",
                path: "/sap/bc/soap/",
                service: "rfc",
                rfcread: "BBP_RFC_READ_TABLE"
            },

            salesRfc: {
              rfcOrderGetDetails: "BAPISDORDER_GETDETAILEDLIST",
              rfcOrderUpdate: "BAPI_SALESORDER_CHANGE"
            }
        } as SapConnection
    };
}

// var xAppsSettings = ApiSettingsHolder.__apiSettings__;
export let xAppsSettings:ApiSettings = ApiSettingsHolder.__apiSettings__; // = ApiSettingsHolder.__apiSettings__;
