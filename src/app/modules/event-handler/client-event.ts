//import { BaseComponent } from '../base/base.component';
import { KeyUtils } from '../base/key-utils';

export class ClientEvent {
    private _parameters: Map<string, any> = new Map<string, any>();
    private _attributes: Map<string, any> = new Map<string, any>();
    private _returnValue: any;
    private _returnValueSet: any;

    constructor(private _source: any, private _event: Event) {

    }

    getSource(): any {
      return this._source;
    }

    getEvent(): Event {
      return this._event;
    }

    setParameter(paramName: string, value: any) {
      this._parameters.set(KeyUtils.toMapKey(paramName), value);
    }

    getParameter(paramName: string): any {
      return this._parameters.get(KeyUtils.toMapKey(paramName));
    }

    setAttribute(attributeName: string, value: any) {
      this._attributes.set(KeyUtils.toMapKey(attributeName), value);
    }

    getAttribute(attributeName: string): any {
      return this._attributes.get(KeyUtils.toMapKey(attributeName));
    }

    stopPropagation() {
      if (this._event != null) {
        this._event.stopPropagation();
      }
    }

    preventDefault() {
      if (this._event != null) {
        this._event.preventDefault();
      }
    }

    setReturnValue(value: any){
      this._returnValue = value;

      this._returnValueSet = true;
    }

    getReturnValue(): any {
      return this._returnValue;
    }

    isReturnValueSet(): boolean {
      //can't check for returnValue is null b/c it can be set to null
      return this._returnValueSet === true ? true : false;
    }
}