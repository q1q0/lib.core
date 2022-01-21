export interface RequestService {
    retrieve(url: string): any;
    send(url: string, data: any, skipSettingResponseData?: boolean): any;
    getResponseData(): any;
    setResponseData(v: any): any;
}
