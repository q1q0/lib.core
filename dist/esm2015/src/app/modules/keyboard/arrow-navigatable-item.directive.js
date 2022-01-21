/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
export class ArrowNavigatableItemDirective {
    /**
     * @param {?} element
     * @param {?} zone
     * @param {?} renderer
     */
    constructor(element, zone, renderer) {
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
    handleOnBlur() {
        this.blur();
    }
    /**
     * @return {?}
     */
    handleOnFocus() {
        if (this.parent != null) {
            this.parent.activeItem = this;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.jq = null;
        this.element = null;
        this.zone = null;
    }
    /**
     * @return {?}
     */
    focus() {
        this.zone.run(() => {
            this.jq.mouseover();
            this.jq.focus();
            this.renderer.addClass(this.element.nativeElement, "mouse-hover");
        });
    }
    /**
     * @return {?}
     */
    blur() {
        this.zone.run(() => {
            this.jq.mouseout();
            this.jq.blur();
            this.renderer.removeClass(this.element.nativeElement, "mouse-hover");
        });
    }
    /**
     * @return {?}
     */
    select() {
        (/** @type {?} */ (this.element.nativeElement)).click();
    }
    /**
     * @return {?}
     */
    hover() {
        this.zone.run(() => {
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            this.vtArrowOnMouseEnter.emit();
        });
    }
    /**
     * @return {?}
     */
    leave() {
        this.zone.run(() => {
            this.vtArrowOnMouseLeave.emit();
        });
    }
}
ArrowNavigatableItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-arrow-navigatable-item]',
            },] }
];
/** @nocollapse */
ArrowNavigatableItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
ArrowNavigatableItemDirective.propDecorators = {
    vtArrowOnMouseEnter: [{ type: Output }],
    vtArrowOnMouseLeave: [{ type: Output }],
    handleOnBlur: [{ type: HostListener, args: ["blur",] }],
    handleOnFocus: [{ type: HostListener, args: ["focus",] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3ctbmF2aWdhdGFibGUtaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2tleWJvYXJkL2Fycm93LW5hdmlnYXRhYmxlLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3hILE1BQU07Ozs7OztJQW1CSixZQUNTLFNBQ0MsTUFDQTtRQUZELFlBQU8sR0FBUCxPQUFPO1FBQ04sU0FBSSxHQUFKLElBQUk7UUFDSixhQUFRLEdBQVIsUUFBUTttQ0FyQmtDLElBQUksWUFBWSxFQUFRO21DQUN4QixJQUFJLFlBQVksRUFBUTtRQXNCMUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDMUU7Ozs7SUFuQkQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNiOzs7O0lBR0QsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQy9CO0tBQ0Y7Ozs7SUFZRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNsQjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25FLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7S0FDSjs7OztJQUVELE1BQU07UUFDSixtQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQTRCLEVBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNyRDs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFFLEVBQUU7O1lBRWhCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQyxDQUFDLENBQUM7S0FDSjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOzs7WUFyRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Ozs7WUFObUIsVUFBVTtZQUFFLE1BQU07WUFBYSxTQUFTOzs7a0NBUXpELE1BQU07a0NBQ04sTUFBTTsyQkFLTixZQUFZLFNBQUMsTUFBTTs0QkFLbkIsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBSZW5kZXJlcjIsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdnQtYXJyb3ctbmF2aWdhdGFibGUtaXRlbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBBcnJvd05hdmlnYXRhYmxlSXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB2dEFycm93T25Nb3VzZUVudGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSB2dEFycm93T25Nb3VzZUxlYXZlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcGFyZW50OiBhbnk7XG4gIGpxOiBhbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcihcImJsdXJcIilcbiAgaGFuZGxlT25CbHVyKCkge1xuICAgIHRoaXMuYmx1cigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcihcImZvY3VzXCIpXG4gIGhhbmRsZU9uRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucGFyZW50LmFjdGl2ZUl0ZW0gPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLmpxID0gJCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5qcSA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnpvbmUgPSBudWxsO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy56b25lLnJ1bigoKT0+e1xuICAgICAgdGhpcy5qcS5tb3VzZW92ZXIoKTtcbiAgICAgIHRoaXMuanEuZm9jdXMoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwibW91c2UtaG92ZXJcIik7XG4gICAgfSk7XG4gIH1cblxuICBibHVyKCkge1xuICAgIHRoaXMuem9uZS5ydW4oKCk9PntcbiAgICAgIHRoaXMuanEubW91c2VvdXQoKTtcbiAgICAgIHRoaXMuanEuYmx1cigpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJtb3VzZS1ob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdCgpIHtcbiAgICAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsaWNrKCk7XG4gIH1cblxuICBob3ZlcigpIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpPT57XG4gICAgICAvLyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJtb3VzZWVudGVyXCIpKTtcbiAgICAgIHRoaXMudnRBcnJvd09uTW91c2VFbnRlci5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBsZWF2ZSgpIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpPT57XG4gICAgICB0aGlzLnZ0QXJyb3dPbk1vdXNlTGVhdmUuZW1pdCgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=