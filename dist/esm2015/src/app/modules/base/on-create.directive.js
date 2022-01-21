/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Output, NgZone, Input } from '@angular/core';
export class OnCreateDirective {
    /**
     * @param {?} elementRef
     * @param {?} zone
     */
    constructor(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.vtOnCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.runOutsideZone === true) {
            this.zone.runOutsideAngular(() => {
                this.vtOnCreate.emit({
                    element: this.elementRef
                });
            });
        }
        else {
            this.vtOnCreate.emit({
                element: this.elementRef
            });
        }
    }
}
OnCreateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtOnCreate]'
            },] }
];
/** @nocollapse */
OnCreateDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
OnCreateDirective.propDecorators = {
    runOutsideZone: [{ type: Input }],
    vtOnCreate: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tY3JlYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYmFzZS9vbi1jcmVhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF3QixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBMkMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0xSixNQUFNOzs7OztJQUlKLFlBQ1UsWUFDQTtRQURBLGVBQVUsR0FBVixVQUFVO1FBQ1YsU0FBSSxHQUFKLElBQUk7MEJBSnNDLElBQUksWUFBWSxFQUFpQjtLQU9wRjs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QixDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTthQUN6QixDQUFDLENBQUM7U0FDSjtLQUNGOzs7WUExQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBTHlDLFVBQVU7WUFBaUUsTUFBTTs7OzZCQU94SCxLQUFLO3lCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPbkNyZWF0ZUV2ZW50IH0gZnJvbSAnLi9vbi1jcmVhdGUtZXZlbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdnRPbkNyZWF0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIE9uQ3JlYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcnVuT3V0c2lkZVpvbmU6IGJvb2xlYW47XG4gIEBPdXRwdXQoKSB2dE9uQ3JlYXRlOiBFdmVudEVtaXR0ZXI8T25DcmVhdGVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9uQ3JlYXRlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucnVuT3V0c2lkZVpvbmUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgICB0aGlzLnZ0T25DcmVhdGUuZW1pdCh7XG4gICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50UmVmXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudnRPbkNyZWF0ZS5lbWl0KHtcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50UmVmXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==