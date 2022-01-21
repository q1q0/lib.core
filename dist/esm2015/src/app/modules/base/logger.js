/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AppUtils } from "./app-utils";
export class Logger {
    /**
     * @param {?} e
     * @return {?}
     */
    static warn(e) {
        if (AppUtils.enableLogging === true) {
            console.warn(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static log(e) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static info(e) {
        if (AppUtils.enableLogging === true) {
            console.info(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static error(e) {
        if (AppUtils.enableLogging === true) {
            console.error(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static debug(e) {
        if (AppUtils.enableLogging === true) {
            console.debug(e);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNOzs7OztJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBTTtRQUNkLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBTTtRQUNiLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtLQUNKOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBTTtRQUNkLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBTTtRQUNmLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtLQUNKOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBTTtRQUNmLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtLQUNKO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgICBzdGF0aWMgd2FybihlOiBhbnkpIHtcbiAgICAgICAgaWYgKEFwcFV0aWxzLmVuYWJsZUxvZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsb2coZTogYW55KSB7XG4gICAgICAgIGlmIChBcHBVdGlscy5lbmFibGVMb2dnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpbmZvKGU6IGFueSkge1xuICAgICAgICBpZiAoQXBwVXRpbHMuZW5hYmxlTG9nZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKGU6IGFueSkge1xuICAgICAgICBpZiAoQXBwVXRpbHMuZW5hYmxlTG9nZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1ZyhlOiBhbnkpIHtcbiAgICAgICAgaWYgKEFwcFV0aWxzLmVuYWJsZUxvZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoZSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19