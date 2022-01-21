export declare class ClientEvent {
    private _source;
    private _event;
    private _parameters;
    private _attributes;
    private _returnValue;
    private _returnValueSet;
    constructor(_source: any, _event: Event);
    getSource(): any;
    getEvent(): Event;
    setParameter(paramName: string, value: any): void;
    getParameter(paramName: string): any;
    setAttribute(attributeName: string, value: any): void;
    getAttribute(attributeName: string): any;
    stopPropagation(): void;
    preventDefault(): void;
    setReturnValue(value: any): void;
    getReturnValue(): any;
    isReturnValueSet(): boolean;
}
