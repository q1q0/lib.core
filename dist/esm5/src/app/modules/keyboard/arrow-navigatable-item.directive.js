/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
var ArrowNavigatableItemDirective = /** @class */ (function () {
    function ArrowNavigatableItemDirective(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.vtArrowOnMouseEnter = new EventEmitter();
        this.vtArrowOnMouseLeave = new EventEmitter();
        this.jq = $(this.element.nativeElement);
        this.renderer.setAttribute(this.element.nativeElement, "tabindex", "-1");
    }
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.handleOnBlur = /**
     * @return {?}
     */
    function () {
        this.blur();
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.handleOnFocus = /**
     * @return {?}
     */
    function () {
        if (this.parent != null) {
            this.parent.activeItem = this;
        }
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.jq = null;
        this.element = null;
        this.zone = null;
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.jq.mouseover();
            _this.jq.focus();
            _this.renderer.addClass(_this.element.nativeElement, "mouse-hover");
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.jq.mouseout();
            _this.jq.blur();
            _this.renderer.removeClass(_this.element.nativeElement, "mouse-hover");
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.select = /**
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.element.nativeElement)).click();
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.hover = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            _this.vtArrowOnMouseEnter.emit();
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.leave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.vtArrowOnMouseLeave.emit();
        });
    };
    ArrowNavigatableItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-arrow-navigatable-item]',
                },] }
    ];
    /** @nocollapse */
    ArrowNavigatableItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ArrowNavigatableItemDirective.propDecorators = {
        vtArrowOnMouseEnter: [{ type: Output }],
        vtArrowOnMouseLeave: [{ type: Output }],
        handleOnBlur: [{ type: HostListener, args: ["blur",] }],
        handleOnFocus: [{ type: HostListener, args: ["focus",] }]
    };
    return ArrowNavigatableItemDirective;
}());
export { ArrowNavigatableItemDirective };
if (false) {
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.vtArrowOnMouseEnter;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.vtArrowOnMouseLeave;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.parent;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.jq;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.element;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.zone;
    /** @type {?} */
    ArrowNavigatableItemDirective.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3ctbmF2aWdhdGFibGUtaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2tleWJvYXJkL2Fycm93LW5hdmlnYXRhYmxlLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQTBCdEgsdUNBQ1MsU0FDQyxNQUNBO1FBRkQsWUFBTyxHQUFQLE9BQU87UUFDTixTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO21DQXJCa0MsSUFBSSxZQUFZLEVBQVE7bUNBQ3hCLElBQUksWUFBWSxFQUFRO1FBc0IxRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMxRTs7OztJQW5CRCxvREFBWTs7O0lBRFo7UUFFRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDYjs7OztJQUdELHFEQUFhOzs7SUFEYjtRQUVFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQy9CO0tBQ0Y7Ozs7SUFZRCxtREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOzs7O0lBRUQsNkNBQUs7OztJQUFMO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNuRSxDQUFDLENBQUM7S0FDSjs7OztJQUVELDRDQUFJOzs7SUFBSjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDWixLQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7S0FDSjs7OztJQUVELDhDQUFNOzs7SUFBTjtRQUNFLG1CQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBNEIsRUFBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JEOzs7O0lBRUQsNkNBQUs7OztJQUFMO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7WUFFWixBQURBLHFGQUFxRjtZQUNyRixLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCw2Q0FBSzs7O0lBQUw7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1osS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOztnQkFyRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDOzs7O2dCQU5tQixVQUFVO2dCQUFFLE1BQU07Z0JBQWEsU0FBUzs7O3NDQVF6RCxNQUFNO3NDQUNOLE1BQU07K0JBS04sWUFBWSxTQUFDLE1BQU07Z0NBS25CLFlBQVksU0FBQyxPQUFPOzt3Q0FuQnZCOztTQU9hLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgSG9zdExpc3RlbmVyLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2dC1hcnJvdy1uYXZpZ2F0YWJsZS1pdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHZ0QXJyb3dPbk1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHZ0QXJyb3dPbk1vdXNlTGVhdmU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwYXJlbnQ6IGFueTtcbiAganE6IGFueTtcblxuICBASG9zdExpc3RlbmVyKFwiYmx1clwiKVxuICBoYW5kbGVPbkJsdXIoKSB7XG4gICAgdGhpcy5ibHVyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKFwiZm9jdXNcIilcbiAgaGFuZGxlT25Gb2N1cygpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wYXJlbnQuYWN0aXZlSXRlbSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuanEgPSAkKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmpxID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuem9uZSA9IG51bGw7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpPT57XG4gICAgICB0aGlzLmpxLm1vdXNlb3ZlcigpO1xuICAgICAgdGhpcy5qcS5mb2N1cygpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJtb3VzZS1ob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJsdXIoKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKT0+e1xuICAgICAgdGhpcy5qcS5tb3VzZW91dCgpO1xuICAgICAgdGhpcy5qcS5ibHVyKCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIm1vdXNlLWhvdmVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcbiAgfVxuXG4gIGhvdmVyKCkge1xuICAgIHRoaXMuem9uZS5ydW4oKCk9PntcbiAgICAgIC8vKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcIm1vdXNlZW50ZXJcIikpO1xuICAgICAgdGhpcy52dEFycm93T25Nb3VzZUVudGVyLmVtaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxlYXZlKCkge1xuICAgIHRoaXMuem9uZS5ydW4oKCk9PntcbiAgICAgIHRoaXMudnRBcnJvd09uTW91c2VMZWF2ZS5lbWl0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==