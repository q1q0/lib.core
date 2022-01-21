/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output, NgZone, Input } from '@angular/core';
var OnCreateDirective = /** @class */ (function () {
    function OnCreateDirective(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.vtOnCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    OnCreateDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.runOutsideZone === true) {
            this.zone.runOutsideAngular(function () {
                _this.vtOnCreate.emit({
                    element: _this.elementRef
                });
            });
        }
        else {
            this.vtOnCreate.emit({
                element: this.elementRef
            });
        }
    };
    OnCreateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vtOnCreate]'
                },] }
    ];
    /** @nocollapse */
    OnCreateDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    OnCreateDirective.propDecorators = {
        runOutsideZone: [{ type: Input }],
        vtOnCreate: [{ type: Output }]
    };
    return OnCreateDirective;
}());
export { OnCreateDirective };
if (false) {
    /** @type {?} */
    OnCreateDirective.prototype.runOutsideZone;
    /** @type {?} */
    OnCreateDirective.prototype.vtOnCreate;
    /** @type {?} */
    OnCreateDirective.prototype.elementRef;
    /** @type {?} */
    OnCreateDirective.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tY3JlYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYmFzZS9vbi1jcmVhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF3QixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBMkMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFVeEosMkJBQ1UsWUFDQTtRQURBLGVBQVUsR0FBVixVQUFVO1FBQ1YsU0FBSSxHQUFKLElBQUk7MEJBSnNDLElBQUksWUFBWSxFQUFpQjtLQU9wRjs7OztJQUVELG9DQUFROzs7SUFBUjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUMxQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxFQUFFLEtBQUksQ0FBQyxVQUFVO2lCQUN6QixDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTthQUN6QixDQUFDLENBQUM7U0FDSjtLQUNGOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs7OztnQkFMeUMsVUFBVTtnQkFBaUUsTUFBTTs7O2lDQU94SCxLQUFLOzZCQUNMLE1BQU07OzRCQVJUOztTQU1hLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkLCBPbkluaXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9uQ3JlYXRlRXZlbnQgfSBmcm9tICcuL29uLWNyZWF0ZS1ldmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2dE9uQ3JlYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgT25DcmVhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBydW5PdXRzaWRlWm9uZTogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHZ0T25DcmVhdGU6IEV2ZW50RW1pdHRlcjxPbkNyZWF0ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8T25DcmVhdGVFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5ydW5PdXRzaWRlWm9uZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAgIHRoaXMudnRPbkNyZWF0ZS5lbWl0KHtcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnRSZWZcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52dE9uQ3JlYXRlLmVtaXQoe1xuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnRSZWZcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19