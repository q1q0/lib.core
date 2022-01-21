export interface RequestService {
    retrieve(url: string);
    send(url: string, data: any, skipSettingResponseData?: boolean);
    getResponseData(): any;
    setResponseData(v: any);
}
