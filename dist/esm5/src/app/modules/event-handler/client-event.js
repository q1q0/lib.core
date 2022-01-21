/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { KeyUtils } from '../base/key-utils';
var ClientEvent = /** @class */ (function () {
    function ClientEvent(_source, _event) {
        this._source = _source;
        this._event = _event;
        this._parameters = new Map();
        this._attributes = new Map();
    }
    /**
     * @return {?}
     */
    ClientEvent.prototype.getSource = /**
     * @return {?}
     */
    function () {
        return this._source;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.getEvent = /**
     * @return {?}
     */
    function () {
        return this._event;
    };
    /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setParameter = /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    function (paramName, value) {
        this._parameters.set(KeyUtils.toMapKey(paramName), value);
    };
    /**
     * @param {?} paramName
     * @return {?}
     */
    ClientEvent.prototype.getParameter = /**
     * @param {?} paramName
     * @return {?}
     */
    function (paramName) {
        return this._parameters.get(KeyUtils.toMapKey(paramName));
    };
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setAttribute = /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    function (attributeName, value) {
        this._attributes.set(KeyUtils.toMapKey(attributeName), value);
    };
    /**
     * @param {?} attributeName
     * @return {?}
     */
    ClientEvent.prototype.getAttribute = /**
     * @param {?} attributeName
     * @return {?}
     */
    function (attributeName) {
        return this._attributes.get(KeyUtils.toMapKey(attributeName));
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.stopPropagation = /**
     * @return {?}
     */
    function () {
        if (this._event != null) {
            this._event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.preventDefault = /**
     * @return {?}
     */
    function () {
        if (this._event != null) {
            this._event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setReturnValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._returnValue = value;
        this._returnValueSet = true;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.getReturnValue = /**
     * @return {?}
     */
    function () {
        return this._returnValue;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.isReturnValueSet = /**
     * @return {?}
     */
    function () {
        //can't check for returnValue is null b/c it can be set to null
        return this._returnValueSet === true ? true : false;
    };
    return ClientEvent;
}());
export { ClientEvent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWV2ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLElBQUE7SUFNSSxxQkFBb0IsT0FBWSxFQUFVLE1BQWE7UUFBbkMsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQU87MkJBTGYsSUFBSSxHQUFHLEVBQWU7MkJBQ3RCLElBQUksR0FBRyxFQUFlO0tBTTdEOzs7O0lBRUQsK0JBQVM7OztJQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBRUQsOEJBQVE7OztJQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7Ozs7SUFFRCxrQ0FBWTs7Ozs7SUFBWixVQUFhLFNBQWlCLEVBQUUsS0FBVTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNEOzs7OztJQUVELGtDQUFZOzs7O0lBQVosVUFBYSxTQUFpQjtRQUM1QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUMzRDs7Ozs7O0lBRUQsa0NBQVk7Ozs7O0lBQVosVUFBYSxhQUFxQixFQUFFLEtBQVU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvRDs7Ozs7SUFFRCxrQ0FBWTs7OztJQUFaLFVBQWEsYUFBcUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7Ozs7SUFFRCxxQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDL0I7S0FDRjs7OztJQUVELG9DQUFjOzs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUM5QjtLQUNGOzs7OztJQUVELG9DQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0tBQzdCOzs7O0lBRUQsb0NBQWM7OztJQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7O0lBRUQsc0NBQWdCOzs7SUFBaEI7O1FBRUUsT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDckQ7c0JBOURMO0lBK0RDLENBQUE7QUE1REQsdUJBNERDIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gJy4uL2Jhc2Uva2V5LXV0aWxzJztcblxuZXhwb3J0IGNsYXNzIENsaWVudEV2ZW50IHtcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBwcml2YXRlIF9hdHRyaWJ1dGVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBwcml2YXRlIF9yZXR1cm5WYWx1ZTogYW55O1xuICAgIHByaXZhdGUgX3JldHVyblZhbHVlU2V0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zb3VyY2U6IGFueSwgcHJpdmF0ZSBfZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICB9XG5cbiAgICBnZXRTb3VyY2UoKTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gICAgfVxuXG4gICAgZ2V0RXZlbnQoKTogRXZlbnQge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50O1xuICAgIH1cblxuICAgIHNldFBhcmFtZXRlcihwYXJhbU5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgdGhpcy5fcGFyYW1ldGVycy5zZXQoS2V5VXRpbHMudG9NYXBLZXkocGFyYW1OYW1lKSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldFBhcmFtZXRlcihwYXJhbU5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVycy5nZXQoS2V5VXRpbHMudG9NYXBLZXkocGFyYW1OYW1lKSk7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgdGhpcy5fYXR0cmlidXRlcy5zZXQoS2V5VXRpbHMudG9NYXBLZXkoYXR0cmlidXRlTmFtZSksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzLmdldChLZXlVdGlscy50b01hcEtleShhdHRyaWJ1dGVOYW1lKSk7XG4gICAgfVxuXG4gICAgc3RvcFByb3BhZ2F0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJldmVudERlZmF1bHQoKSB7XG4gICAgICBpZiAodGhpcy5fZXZlbnQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFJldHVyblZhbHVlKHZhbHVlOiBhbnkpe1xuICAgICAgdGhpcy5fcmV0dXJuVmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5fcmV0dXJuVmFsdWVTZXQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldFJldHVyblZhbHVlKCk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmV0dXJuVmFsdWU7XG4gICAgfVxuXG4gICAgaXNSZXR1cm5WYWx1ZVNldCgpOiBib29sZWFuIHtcbiAgICAgIC8vY2FuJ3QgY2hlY2sgZm9yIHJldHVyblZhbHVlIGlzIG51bGwgYi9jIGl0IGNhbiBiZSBzZXQgdG8gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuX3JldHVyblZhbHVlU2V0ID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbn0iXX0=