/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as momentImported from 'moment-timezone';
/** @type {?} */
var moment = momentImported;
/**
 * Simple util to parse moment into proper zone (if needed)
 */
var /**
 * Simple util to parse moment into proper zone (if needed)
 */
MomentUtils = /** @class */ (function () {
    function MomentUtils() {
    }
    /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    MomentUtils.moment = /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    function (dateString, format) {
        if (format != null && format != '') {
            if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
                return moment.tz(dateString, format, MomentUtils.timeZone);
            }
            return moment(dateString, format);
        }
        else {
            if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
                return moment.tz(dateString, MomentUtils.timeZone);
            }
            return moment(dateString);
        }
    };
    return MomentUtils;
}());
/**
 * Simple util to parse moment into proper zone (if needed)
 */
export { MomentUtils };
if (false) {
    /** @type {?} */
    MomentUtils.timeZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL21vbWVudC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFJbEQsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDOzs7O0FBTTlCOzs7QUFBQTs7Ozs7Ozs7SUFHUyxrQkFBTTs7Ozs7SUFBYixVQUFjLFVBQWtCLEVBQUUsTUFBZTtRQUMvQyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLEVBQUUsRUFBRTtZQUNsQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFO2dCQUM5RCxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUQ7WUFFRCxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUU7Z0JBQzlELE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0I7S0FDRjtzQkEzQkg7SUE0QkMsQ0FBQTs7OztBQWxCRCx1QkFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtb21lbnRJbXBvcnRlZCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuXG4vLyBOZWVkIHRvIGRvIHRoaXMgdG8gcHJldmVudCBwYWNrYWdyIG5hbWVzcGFjZSBlcnJvclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLXBhY2thZ3IvbmctcGFja2Fnci9pc3N1ZXMvMjE3XG5jb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuLyoqXG4gKiBTaW1wbGUgdXRpbCB0byBwYXJzZSBtb21lbnQgaW50byBwcm9wZXIgem9uZSAoaWYgbmVlZGVkKVxuICovXG4vLyBAZHluYW1pYyAtLSB0aGlzIGxpbmUgY29tbWVudCBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCBwYWNrYWdyIGVycm9yXG5leHBvcnQgY2xhc3MgTW9tZW50VXRpbHMge1xuICBzdGF0aWMgdGltZVpvbmU6IHN0cmluZztcblxuICBzdGF0aWMgbW9tZW50KGRhdGVTdHJpbmc6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nKTogbW9tZW50SW1wb3J0ZWQuTW9tZW50IHtcbiAgICBpZiAoZm9ybWF0ICE9IG51bGwgJiYgZm9ybWF0ICE9ICcnKSB7XG4gICAgICBpZiAoTW9tZW50VXRpbHMudGltZVpvbmUgIT0gbnVsbCAmJiBNb21lbnRVdGlscy50aW1lWm9uZSAhPSAnJykge1xuICAgICAgICByZXR1cm4gbW9tZW50LnR6KGRhdGVTdHJpbmcsIGZvcm1hdCwgTW9tZW50VXRpbHMudGltZVpvbmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGVTdHJpbmcsIGZvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNb21lbnRVdGlscy50aW1lWm9uZSAhPSBudWxsICYmIE1vbWVudFV0aWxzLnRpbWVab25lICE9ICcnKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQudHooZGF0ZVN0cmluZywgTW9tZW50VXRpbHMudGltZVpvbmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGVTdHJpbmcpO1xuICAgIH1cbiAgfVxufVxuIl19