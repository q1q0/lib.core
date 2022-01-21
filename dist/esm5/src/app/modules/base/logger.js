/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AppUtils } from "./app-utils";
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.warn = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.warn(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.log = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.info = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.info(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.error = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.error(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.debug = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.debug(e);
        }
    };
    return Logger;
}());
export { Logger };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxJQUFBOzs7Ozs7O0lBQ1csV0FBSTs7OztJQUFYLFVBQVksQ0FBTTtRQUNkLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKOzs7OztJQUVNLFVBQUc7Ozs7SUFBVixVQUFXLENBQU07UUFDYixJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7S0FDSjs7Ozs7SUFFTSxXQUFJOzs7O0lBQVgsVUFBWSxDQUFNO1FBQ2QsSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO0tBQ0o7Ozs7O0lBRU0sWUFBSzs7OztJQUFaLFVBQWEsQ0FBTTtRQUNmLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtLQUNKOzs7OztJQUVNLFlBQUs7Ozs7SUFBWixVQUFhLENBQU07UUFDZixJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0FDSjtpQkEvQkw7SUFnQ0MsQ0FBQTtBQTlCRCxrQkE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgICBzdGF0aWMgd2FybihlOiBhbnkpIHtcbiAgICAgICAgaWYgKEFwcFV0aWxzLmVuYWJsZUxvZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2coZTogYW55KSB7XG4gICAgICAgIGlmIChBcHBVdGlscy5lbmFibGVMb2dnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpbmZvKGU6IGFueSkge1xuICAgICAgICBpZiAoQXBwVXRpbHMuZW5hYmxlTG9nZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKGU6IGFueSkge1xuICAgICAgICBpZiAoQXBwVXRpbHMuZW5hYmxlTG9nZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1ZyhlOiBhbnkpIHtcbiAgICAgICAgaWYgKEFwcFV0aWxzLmVuYWJsZUxvZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoZSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19