/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { KeyUtils } from '../base/key-utils';
export class ClientEvent {
    /**
     * @param {?} _source
     * @param {?} _event
     */
    constructor(_source, _event) {
        this._source = _source;
        this._event = _event;
        this._parameters = new Map();
        this._attributes = new Map();
    }
    /**
     * @return {?}
     */
    getSource() {
        return this._source;
    }
    /**
     * @return {?}
     */
    getEvent() {
        return this._event;
    }
    /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    setParameter(paramName, value) {
        this._parameters.set(KeyUtils.toMapKey(paramName), value);
    }
    /**
     * @param {?} paramName
     * @return {?}
     */
    getParameter(paramName) {
        return this._parameters.get(KeyUtils.toMapKey(paramName));
    }
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    setAttribute(attributeName, value) {
        this._attributes.set(KeyUtils.toMapKey(attributeName), value);
    }
    /**
     * @param {?} attributeName
     * @return {?}
     */
    getAttribute(attributeName) {
        return this._attributes.get(KeyUtils.toMapKey(attributeName));
    }
    /**
     * @return {?}
     */
    stopPropagation() {
        if (this._event != null) {
            this._event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    preventDefault() {
        if (this._event != null) {
            this._event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setReturnValue(value) {
        this._returnValue = value;
        this._returnValueSet = true;
    }
    /**
     * @return {?}
     */
    getReturnValue() {
        return this._returnValue;
    }
    /**
     * @return {?}
     */
    isReturnValueSet() {
        //can't check for returnValue is null b/c it can be set to null
        return this._returnValueSet === true ? true : false;
    }
}
if (false) {
    /** @type {?} */
    ClientEvent.prototype._parameters;
    /** @type {?} */
    ClientEvent.prototype._attributes;
    /** @type {?} */
    ClientEvent.prototype._returnValue;
    /** @type {?} */
    ClientEvent.prototype._returnValueSet;
    /** @type {?} */
    ClientEvent.prototype._source;
    /** @type {?} */
    ClientEvent.prototype._event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWV2ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE1BQU07Ozs7O0lBTUYsWUFBb0IsT0FBWSxFQUFVLE1BQWE7UUFBbkMsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQU87MkJBTGYsSUFBSSxHQUFHLEVBQWU7MkJBQ3RCLElBQUksR0FBRyxFQUFlO0tBTTdEOzs7O0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7OztJQUVELFlBQVksQ0FBQyxTQUFpQixFQUFFLEtBQVU7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzRDs7Ozs7SUFFRCxZQUFZLENBQUMsU0FBaUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7Ozs7OztJQUVELFlBQVksQ0FBQyxhQUFxQixFQUFFLEtBQVU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvRDs7Ozs7SUFFRCxZQUFZLENBQUMsYUFBcUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQy9CO0tBQ0Y7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzlCO0tBQ0Y7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQVU7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7S0FDN0I7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7O0lBRUQsZ0JBQWdCOztRQUVkLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ3JEO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEtleVV0aWxzIH0gZnJvbSAnLi4vYmFzZS9rZXktdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50RXZlbnQge1xuICAgIHByaXZhdGUgX3BhcmFtZXRlcnM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHByaXZhdGUgX2F0dHJpYnV0ZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHByaXZhdGUgX3JldHVyblZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBfcmV0dXJuVmFsdWVTZXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NvdXJjZTogYW55LCBwcml2YXRlIF9ldmVudDogRXZlbnQpIHtcblxuICAgIH1cblxuICAgIGdldFNvdXJjZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICB9XG5cbiAgICBnZXRFdmVudCgpOiBFdmVudCB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnQ7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1ldGVyKHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICB0aGlzLl9wYXJhbWV0ZXJzLnNldChLZXlVdGlscy50b01hcEtleShwYXJhbU5hbWUpLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0UGFyYW1ldGVyKHBhcmFtTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzLmdldChLZXlVdGlscy50b01hcEtleShwYXJhbU5hbWUpKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzLnNldChLZXlVdGlscy50b01hcEtleShhdHRyaWJ1dGVOYW1lKSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXMuZ2V0KEtleVV0aWxzLnRvTWFwS2V5KGF0dHJpYnV0ZU5hbWUpKTtcbiAgICB9XG5cbiAgICBzdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgICBpZiAodGhpcy5fZXZlbnQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0UmV0dXJuVmFsdWUodmFsdWU6IGFueSl7XG4gICAgICB0aGlzLl9yZXR1cm5WYWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9yZXR1cm5WYWx1ZVNldCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0UmV0dXJuVmFsdWUoKTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXR1cm5WYWx1ZTtcbiAgICB9XG5cbiAgICBpc1JldHVyblZhbHVlU2V0KCk6IGJvb2xlYW4ge1xuICAgICAgLy9jYW4ndCBjaGVjayBmb3IgcmV0dXJuVmFsdWUgaXMgbnVsbCBiL2MgaXQgY2FuIGJlIHNldCB0byBudWxsXG4gICAgICByZXR1cm4gdGhpcy5fcmV0dXJuVmFsdWVTZXQgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxufSJdfQ==