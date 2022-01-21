/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var KeyUtils = /** @class */ (function () {
    function KeyUtils() {
    }
    /**
     * Make key case insensitive
     * @param key
     */
    /**
     * Make key case insensitive
     * @param {?} key
     * @return {?}
     */
    KeyUtils.toMapKey = /**
     * Make key case insensitive
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key != null) {
            return key.toLowerCase();
        }
        return null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    KeyUtils.toJsonValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === "number" || typeof val === "boolean") {
            return val + "";
        }
        else {
            return val;
        }
    };
    return KeyUtils;
}());
export { KeyUtils };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL2tleS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBQTs7O0lBQ0U7OztPQUdHOzs7Ozs7SUFDSSxpQkFBUTs7Ozs7SUFBZixVQUFnQixHQUFXO1FBQ3pCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFCO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFTSxvQkFBVzs7OztJQUFsQixVQUFtQixHQUFRO1FBQ3pCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUN2RCxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDO1NBQ1o7S0FDRjttQkFuQkg7SUFvQkMsQ0FBQTtBQXBCRCxvQkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgS2V5VXRpbHMge1xuICAvKipcbiAgICogTWFrZSBrZXkgY2FzZSBpbnNlbnNpdGl2ZVxuICAgKiBAcGFyYW0ga2V5XG4gICAqL1xuICBzdGF0aWMgdG9NYXBLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIHRvSnNvblZhbHVlKHZhbDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIHZhbCArIFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9XG59XG4iXX0=