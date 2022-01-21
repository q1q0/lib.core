/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, QueryList, NgZone, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ArrowNavigatableItemDirective } from './arrow-navigatable-item.directive';
import * as _ from "lodash";
/**
 * Usage.
 * <ul vt-arrow-navigatable-container ...>
 *  <li vt-arrow-navigatable-item ...>
 *  <li vt-arrow-navigatable-item ...>
 * </ul>
 */
export class ArrowNavigatableContainerDirective {
    /**
     * @param {?} zone
     * @param {?} element
     */
    constructor(zone, element) {
        this.zone = zone;
        this.element = element;
        this.onItemHover = new EventEmitter();
        this.onTab = new EventEmitter();
        this.keydownHandler = (event) => this.handleKeydown(event);
        this.zone.runOutsideAngular(() => {
            (document).addEventListener("keydown", this.keydownHandler);
        });
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set navigatableItemsQuery(items) {
        if (items == null) {
            this.navigatableItems = null;
        }
        else {
            this.navigatableItems = items.toArray();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.navigatableItems = null;
        this.zone.runOutsideAngular(() => {
            (document).removeEventListener("keydown", this.keydownHandler);
        });
        this.element = null;
        this.keydownHandler = null;
        this.navigatableItems = null;
        this.activeItem = null;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (document.activeElement === this.element.nativeElement || document.activeElement === this.activeParent || this.isActiveElementDirectChildren()) {
            //check for arrow key and do stuff
            if (event.keyCode === 38 || event.key === "ArrowUp") {
                this.moveUp();
            }
            else if (event.keyCode === 40 || event.key === "ArrowDow") {
                this.moveDown();
            }
            else if (event.keyCode === 13 || event.key === "Enter" ||
                event.keyCode === 32 || event.key === "Space") {
                this.select();
            }
            else if (event.keyCode === 39 || event.key === "ArrowRight") {
                if (this.activeItem != null) {
                    this.activeItem.hover();
                }
            }
            else if (event.keyCode === 37 || event.key === "ArrowLeft") {
                if (this.activeItem != null) {
                    this.activeItem.leave();
                }
            }
            else if (event.keyCode === 9 || event.key === "Tab") {
                this.onTab.emit();
            }
        }
    }
    /**
     * @return {?}
     */
    moveUp() {
        //can only go up if there are any items above
        if (this.hasItems()) {
            /** @type {?} */
            let idx = 0;
            if (this.activeItem != null) {
                this.activeItem.blur();
                idx = _.findIndex(this.navigatableItems, (item) => item === this.activeItem);
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = _.findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement);
                if (idx >= 0) {
                    this.navigatableItems[idx].blur();
                }
            }
            if (idx < this.navigatableItems.length && idx > 0) {
                this.activeItem = this.navigatableItems[idx - 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
            else if (idx === 0) {
                this.activeItem = this.navigatableItems[this.navigatableItems.length - 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
        }
    }
    /**
     * @return {?}
     */
    moveDown() {
        if (this.hasItems()) {
            /** @type {?} */
            let idx = -1;
            if (this.activeItem != null) {
                idx = _.findIndex(this.navigatableItems, (item) => item === this.activeItem);
                this.activeItem.blur();
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = _.findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement);
            }
            if (idx < this.navigatableItems.length - 1) {
                this.activeItem = this.navigatableItems[idx + 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
            else if (idx == this.navigatableItems.length - 1) {
                this.activeItem = this.navigatableItems[0];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
        }
    }
    /**
     * @return {?}
     */
    select() {
        if (this.activeItem != null) {
            this.activeItem.select();
        }
    }
    /**
     * @return {?}
     */
    hasItems() {
        return this.navigatableItems != null && this.navigatableItems.length > 0;
    }
    /**
     * @return {?}
     */
    isActiveElementDirectChildren() {
        /** @type {?} */
        let retVal = false;
        if (document.activeElement != null && this.navigatableItems != null && this.navigatableItems.length > 0) {
            retVal = _.findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement) >= 0;
        }
        return retVal;
    }
}
ArrowNavigatableContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-arrow-navigatable-container]'
            },] }
];
/** @nocollapse */
ArrowNavigatableContainerDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef }
];
ArrowNavigatableContainerDirective.propDecorators = {
    activeParent: [{ type: Input }],
    onItemHover: [{ type: Output }],
    onTab: [{ type: Output }],
    navigatableItemsQuery: [{ type: ContentChildren, args: [ArrowNavigatableItemDirective,] }]
};
if (false) {
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.activeParent;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.onItemHover;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.onTab;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.keydownHandler;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.activeItem;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.navigatableItems;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.zone;
    /** @type {?} */
    ArrowNavigatableContainerDirective.prototype.element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMva2V5Ym9hcmQvYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUI7Ozs7Ozs7QUFVQSxNQUFNOzs7OztJQW9CSixZQUFvQixJQUFZLEVBQVUsT0FBbUI7UUFBekMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7MkJBbEJRLElBQUksWUFBWSxFQUFpQztxQkFDaEYsSUFBSSxZQUFZLEVBQVE7UUFrQjVELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFFLEVBQUU7WUFDOUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdELENBQUMsQ0FBQztLQUNKOzs7OztJQXBCRCxJQUNJLHFCQUFxQixDQUFDLEtBQStDO1FBQ3ZFLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFD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LENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFHbkUsNkJBQTZCOztRQUNuQyxJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7UUFFNUIsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZHLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqSDtRQUVELE9BQU8sTUFBTSxDQUFDOzs7O1lBaEpqQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQzthQUM3Qzs7OztZQVArQyxNQUFNO1lBQUUsVUFBVTs7OzJCQWdCL0QsS0FBSzswQkFDTCxNQUFNO29CQUNOLE1BQU07b0NBRU4sZUFBZSxTQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIE5nWm9uZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9hcnJvdy1uYXZpZ2F0YWJsZS1pdGVtLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdnQtYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyXSdcbn0pXG4vKipcbiAqIFVzYWdlLlxuICogPHVsIHZ0LWFycm93LW5hdmlnYXRhYmxlLWNvbnRhaW5lciAuLi4+XG4gKiAgPGxpIHZ0LWFycm93LW5hdmlnYXRhYmxlLWl0ZW0gLi4uPlxuICogIDxsaSB2dC1hcnJvdy1uYXZpZ2F0YWJsZS1pdGVtIC4uLj5cbiAqIDwvdWw+XG4gKi9cbmV4cG9ydCBjbGFzcyBBcnJvd05hdmlnYXRhYmxlQ29udGFpbmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgYWN0aXZlUGFyZW50OiBIVE1MRWxlbWVudDtcbiAgQE91dHB1dCgpIG9uSXRlbUhvdmVyOiBFdmVudEVtaXR0ZXI8QXJyb3dOYXZpZ2F0YWJsZUl0ZW1EaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJvd05hdmlnYXRhYmxlSXRlbURpcmVjdGl2ZT4oKTtcbiAgQE91dHB1dCgpIG9uVGFiOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBcnJvd05hdmlnYXRhYmxlSXRlbURpcmVjdGl2ZSlcbiAgc2V0IG5hdmlnYXRhYmxlSXRlbXNRdWVyeShpdGVtczogUXVlcnlMaXN0PEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlPikge1xuICAgIGlmIChpdGVtcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5hdmlnYXRhYmxlSXRlbXMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdmlnYXRhYmxlSXRlbXMgPSBpdGVtcy50b0FycmF5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBrZXlkb3duSGFuZGxlcjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KT0+dm9pZDtcblxuICBwcml2YXRlIGFjdGl2ZUl0ZW06IEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlO1xuXG4gIHByaXZhdGUgbmF2aWdhdGFibGVJdGVtczogQXJyYXk8QXJyb3dOYXZpZ2F0YWJsZUl0ZW1EaXJlY3RpdmU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmtleWRvd25IYW5kbGVyID0gKGV2ZW50KT0+dGhpcy5oYW5kbGVLZXlkb3duKGV2ZW50KTtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIChkb2N1bWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlkb3duSGFuZGxlcik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5hdmlnYXRhYmxlSXRlbXMgPSBudWxsO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgKGRvY3VtZW50KS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25IYW5kbGVyKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5rZXlkb3duSGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuYWN0aXZlUGFyZW50IHx8IHRoaXMuaXNBY3RpdmVFbGVtZW50RGlyZWN0Q2hpbGRyZW4oKSkge1xuICAgICAgLy9jaGVjayBmb3IgYXJyb3cga2V5IGFuZCBkbyBzdHVmZlxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM4IHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNDAgfHwgZXZlbnQua2V5ID09PSBcIkFycm93RG93XCIpIHtcbiAgICAgICAgdGhpcy5tb3ZlRG93bigpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHxcbiAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5ID09PSBcIlNwYWNlXCJcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5ob3ZlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0ubGVhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA5IHx8IGV2ZW50LmtleSA9PT0gXCJUYWJcIikge1xuICAgICAgICB0aGlzLm9uVGFiLmVtaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVVcCgpIHtcbiAgICAvL2NhbiBvbmx5IGdvIHVwIGlmIHRoZXJlIGFyZSBhbnkgaXRlbXMgYWJvdmVcbiAgICBpZiAodGhpcy5oYXNJdGVtcygpKSB7XG4gICAgICBsZXQgaWR4ID0gMDtcblxuICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5ibHVyKCk7XG4gICAgICAgIGlkeCA9IF8uZmluZEluZGV4KHRoaXMubmF2aWdhdGFibGVJdGVtcywgKGl0ZW0pPT5pdGVtID09PSB0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWN0aXZlRWxlbWVudERpcmVjdENoaWxkcmVuKCkpIHtcbiAgICAgICAgaWR4ID0gXy5maW5kSW5kZXgodGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLCAoaXRlbSk9PiBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zW2lkeF0uYmx1cigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpZHggPCB0aGlzLm5hdmlnYXRhYmxlSXRlbXMubGVuZ3RoICYmIGlkeCA+IDApIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zW2lkeCAtIDFdO1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1Ib3Zlci5lbWl0KHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKGlkeCA9PT0gMCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLm5hdmlnYXRhYmxlSXRlbXNbdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1Ib3Zlci5lbWl0KHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlRG93bigpIHtcbiAgICBpZiAodGhpcy5oYXNJdGVtcygpKSB7XG4gICAgICBsZXQgaWR4ID0gLTE7XG5cbiAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICBpZHggPSBfLmZpbmRJbmRleCh0aGlzLm5hdmlnYXRhYmxlSXRlbXMsIChpdGVtKT0+aXRlbSA9PT0gdGhpcy5hY3RpdmVJdGVtKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uYmx1cigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWN0aXZlRWxlbWVudERpcmVjdENoaWxkcmVuKCkpIHtcbiAgICAgICAgaWR4ID0gXy5maW5kSW5kZXgodGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLCAoaXRlbSk9PiBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpZHggPCB0aGlzLm5hdmlnYXRhYmxlSXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLm5hdmlnYXRhYmxlSXRlbXNbaWR4ICsgMV07XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB0aGlzLm9uSXRlbUhvdmVyLmVtaXQodGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAoaWR4ID09IHRoaXMubmF2aWdhdGFibGVJdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMubmF2aWdhdGFibGVJdGVtc1swXTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtLmZvY3VzKCk7XG4gICAgICAgIHRoaXMub25JdGVtSG92ZXIuZW1pdCh0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gIT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3RpdmVJdGVtLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGFibGVJdGVtcyAhPSBudWxsICYmIHRoaXMubmF2aWdhdGFibGVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FjdGl2ZUVsZW1lbnREaXJlY3RDaGlsZHJlbigpIHtcbiAgICBsZXQgcmV0VmFsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBudWxsICYmIHRoaXMubmF2aWdhdGFibGVJdGVtcyAhPSBudWxsICYmIHRoaXMubmF2aWdhdGFibGVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXRWYWwgPSBfLmZpbmRJbmRleCh0aGlzLm5hdmlnYXRhYmxlSXRlbXMsIChpdGVtKT0+aXRlbS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID49IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxufVxuIl19