/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as momentImported from 'moment-timezone';
/** @type {?} */
const moment = momentImported;
/**
 * Simple util to parse moment into proper zone (if needed)
 */
export class MomentUtils {
    /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    static moment(dateString, format) {
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
    }
}
if (false) {
    /** @type {?} */
    MomentUtils.timeZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL21vbWVudC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFJbEQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDOzs7O0FBTTlCLE1BQU07Ozs7OztJQUdKLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBa0IsRUFBRSxNQUFlO1FBQy9DLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFO1lBQ2xDLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUU7Z0JBQzlELE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RDtZQUVELE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRTtnQkFDOUQsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEQ7WUFFRCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzQjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtb21lbnRJbXBvcnRlZCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuXG4vLyBOZWVkIHRvIGRvIHRoaXMgdG8gcHJldmVudCBwYWNrYWdyIG5hbWVzcGFjZSBlcnJvclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLXBhY2thZ3IvbmctcGFja2Fnci9pc3N1ZXMvMjE3XG5jb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuLyoqXG4gKiBTaW1wbGUgdXRpbCB0byBwYXJzZSBtb21lbnQgaW50byBwcm9wZXIgem9uZSAoaWYgbmVlZGVkKVxuICovXG4vLyBAZHluYW1pYyAtLSB0aGlzIGxpbmUgY29tbWVudCBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCBwYWNrYWdyIGVycm9yXG5leHBvcnQgY2xhc3MgTW9tZW50VXRpbHMge1xuICBzdGF0aWMgdGltZVpvbmU6IHN0cmluZztcblxuICBzdGF0aWMgbW9tZW50KGRhdGVTdHJpbmc6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nKTogbW9tZW50SW1wb3J0ZWQuTW9tZW50IHtcbiAgICBpZiAoZm9ybWF0ICE9IG51bGwgJiYgZm9ybWF0ICE9ICcnKSB7XG4gICAgICBpZiAoTW9tZW50VXRpbHMudGltZVpvbmUgIT0gbnVsbCAmJiBNb21lbnRVdGlscy50aW1lWm9uZSAhPSAnJykge1xuICAgICAgICByZXR1cm4gbW9tZW50LnR6KGRhdGVTdHJpbmcsIGZvcm1hdCwgTW9tZW50VXRpbHMudGltZVpvbmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGVTdHJpbmcsIGZvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNb21lbnRVdGlscy50aW1lWm9uZSAhPSBudWxsICYmIE1vbWVudFV0aWxzLnRpbWVab25lICE9ICcnKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQudHooZGF0ZVN0cmluZywgTW9tZW50VXRpbHMudGltZVpvbmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGVTdHJpbmcpO1xuICAgIH1cbiAgfVxufVxuIl19