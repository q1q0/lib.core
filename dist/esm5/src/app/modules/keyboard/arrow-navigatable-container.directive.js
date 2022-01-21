/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, QueryList, NgZone, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ArrowNavigatableItemDirective } from './arrow-navigatable-item.directive';
import * as _ from "lodash";
var ArrowNavigatableContainerDirective = /** @class */ (function () {
    function ArrowNavigatableContainerDirective(zone, element) {
        var _this = this;
        this.zone = zone;
        this.element = element;
        this.onItemHover = new EventEmitter();
        this.onTab = new EventEmitter();
        this.keydownHandler = function (event) { return _this.handleKeydown(event); };
        this.zone.runOutsideAngular(function () {
            (document).addEventListener("keydown", _this.keydownHandler);
        });
    }
    Object.defineProperty(ArrowNavigatableContainerDirective.prototype, "navigatableItemsQuery", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (items == null) {
                this.navigatableItems = null;
            }
            else {
                this.navigatableItems = items.toArray();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.navigatableItems = null;
        this.zone.runOutsideAngular(function () {
            (document).removeEventListener("keydown", _this.keydownHandler);
        });
        this.element = null;
        this.keydownHandler = null;
        this.navigatableItems = null;
        this.activeItem = null;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.moveUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //can only go up if there are any items above
        if (this.hasItems()) {
            /** @type {?} */
            var idx = 0;
            if (this.activeItem != null) {
                this.activeItem.blur();
                idx = _.findIndex(this.navigatableItems, function (item) { return item === _this.activeItem; });
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = _.findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; });
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.moveDown = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hasItems()) {
            /** @type {?} */
            var idx = -1;
            if (this.activeItem != null) {
                idx = _.findIndex(this.navigatableItems, function (item) { return item === _this.activeItem; });
                this.activeItem.blur();
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = _.findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; });
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.select = /**
     * @return {?}
     */
    function () {
        if (this.activeItem != null) {
            this.activeItem.select();
        }
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.hasItems = /**
     * @return {?}
     */
    function () {
        return this.navigatableItems != null && this.navigatableItems.length > 0;
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.isActiveElementDirectChildren = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var retVal = false;
        if (document.activeElement != null && this.navigatableItems != null && this.navigatableItems.length > 0) {
            retVal = _.findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; }) >= 0;
        }
        return retVal;
    };
    ArrowNavigatableContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-arrow-navigatable-container]'
                },] }
    ];
    /** @nocollapse */
    ArrowNavigatableContainerDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef }
    ]; };
    ArrowNavigatableContainerDirective.propDecorators = {
        activeParent: [{ type: Input }],
        onItemHover: [{ type: Output }],
        onTab: [{ type: Output }],
        navigatableItemsQuery: [{ type: ContentChildren, args: [ArrowNavigatableItemDirective,] }]
    };
    return ArrowNavigatableContainerDirective;
}());
export { ArrowNavigatableContainerDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMva2V5Ym9hcmQvYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbkYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O0lBZ0MxQiw0Q0FBb0IsSUFBWSxFQUFVLE9BQW1CO1FBQTdELGlCQUtDO1FBTG1CLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFZOzJCQWxCUSxJQUFJLFlBQVksRUFBaUM7cUJBQ2hGLElBQUksWUFBWSxFQUFRO1FBa0I1RCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQUMsS0FBSyxJQUFHLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3RCxDQUFDLENBQUM7S0FDSjtJQXBCRCxzQkFDSSxxRUFBcUI7Ozs7O1FBRHpCLFVBQzBCLEtBQStDO1lBQ3ZFLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxJ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UTs7OztRQUNkLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFHbkUsMEVBQTZCOzs7OztRQUNuQyxJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7UUFFNUIsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZHLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLElBQUksSUFBRyxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxhQUFhLEVBQXJELENBQXFELENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakg7UUFFRCxPQUFPLE1BQU0sQ0FBQzs7O2dCQWhKakIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7aUJBQzdDOzs7O2dCQVArQyxNQUFNO2dCQUFFLFVBQVU7OzsrQkFnQi9ELEtBQUs7OEJBQ0wsTUFBTTt3QkFDTixNQUFNO3dDQUVOLGVBQWUsU0FBQyw2QkFBNkI7OzZDQXBCaEQ7O1NBZWEsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgTmdab25lLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXJyb3dOYXZpZ2F0YWJsZUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2Fycm93LW5hdmlnYXRhYmxlLWl0ZW0uZGlyZWN0aXZlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2dC1hcnJvdy1uYXZpZ2F0YWJsZS1jb250YWluZXJdJ1xufSlcbi8qKlxuICogVXNhZ2UuXG4gKiA8dWwgdnQtYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyIC4uLj5cbiAqICA8bGkgdnQtYXJyb3ctbmF2aWdhdGFibGUtaXRlbSAuLi4+XG4gKiAgPGxpIHZ0LWFycm93LW5hdmlnYXRhYmxlLWl0ZW0gLi4uPlxuICogPC91bD5cbiAqL1xuZXhwb3J0IGNsYXNzIEFycm93TmF2aWdhdGFibGVDb250YWluZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBhY3RpdmVQYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBAT3V0cHV0KCkgb25JdGVtSG92ZXI6IEV2ZW50RW1pdHRlcjxBcnJvd05hdmlnYXRhYmxlSXRlbURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KCkgb25UYWI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKEFycm93TmF2aWdhdGFibGVJdGVtRGlyZWN0aXZlKVxuICBzZXQgbmF2aWdhdGFibGVJdGVtc1F1ZXJ5KGl0ZW1zOiBRdWVyeUxpc3Q8QXJyb3dOYXZpZ2F0YWJsZUl0ZW1EaXJlY3RpdmU+KSB7XG4gICAgaWYgKGl0ZW1zID09IG51bGwpIHtcbiAgICAgIHRoaXMubmF2aWdhdGFibGVJdGVtcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2aWdhdGFibGVJdGVtcyA9IGl0ZW1zLnRvQXJyYXkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGtleWRvd25IYW5kbGVyOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpPT52b2lkO1xuXG4gIHByaXZhdGUgYWN0aXZlSXRlbTogQXJyb3dOYXZpZ2F0YWJsZUl0ZW1EaXJlY3RpdmU7XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0YWJsZUl0ZW1zOiBBcnJheTxBcnJvd05hdmlnYXRhYmxlSXRlbURpcmVjdGl2ZT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMua2V5ZG93bkhhbmRsZXIgPSAoZXZlbnQpPT50aGlzLmhhbmRsZUtleWRvd24oZXZlbnQpO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgKGRvY3VtZW50KS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25IYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubmF2aWdhdGFibGVJdGVtcyA9IG51bGw7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAoZG9jdW1lbnQpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5ZG93bkhhbmRsZXIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmtleWRvd25IYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLm5hdmlnYXRhYmxlSXRlbXMgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5hY3RpdmVQYXJlbnQgfHwgdGhpcy5pc0FjdGl2ZUVsZW1lbnREaXJlY3RDaGlsZHJlbigpKSB7XG4gICAgICAvL2NoZWNrIGZvciBhcnJvdyBrZXkgYW5kIGRvIHN0dWZmXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICB0aGlzLm1vdmVVcCgpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA0MCB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dEb3dcIikge1xuICAgICAgICB0aGlzLm1vdmVEb3duKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fFxuICAgICAgICBldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXkgPT09IFwiU3BhY2VcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLmhvdmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5sZWF2ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIHRoaXMub25UYWIuZW1pdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW92ZVVwKCkge1xuICAgIC8vY2FuIG9ubHkgZ28gdXAgaWYgdGhlcmUgYXJlIGFueSBpdGVtcyBhYm92ZVxuICAgIGlmICh0aGlzLmhhc0l0ZW1zKCkpIHtcbiAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICBpZiAodGhpcy5hY3RpdmVJdGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtLmJsdXIoKTtcbiAgICAgICAgaWR4ID0gXy5maW5kSW5kZXgodGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLCAoaXRlbSk9Pml0ZW0gPT09IHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmVFbGVtZW50RGlyZWN0Q2hpbGRyZW4oKSkge1xuICAgICAgICBpZHggPSBfLmZpbmRJbmRleCh0aGlzLm5hdmlnYXRhYmxlSXRlbXMsIChpdGVtKT0+IGl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRhYmxlSXRlbXNbaWR4XS5ibHVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlkeCA8IHRoaXMubmF2aWdhdGFibGVJdGVtcy5sZW5ndGggJiYgaWR4ID4gMCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLm5hdmlnYXRhYmxlSXRlbXNbaWR4IC0gMV07XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB0aGlzLm9uSXRlbUhvdmVyLmVtaXQodGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAoaWR4ID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMubmF2aWdhdGFibGVJdGVtc1t0aGlzLm5hdmlnYXRhYmxlSXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgICAgICB0aGlzLm9uSXRlbUhvdmVyLmVtaXQodGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVEb3duKCkge1xuICAgIGlmICh0aGlzLmhhc0l0ZW1zKCkpIHtcbiAgICAgIGxldCBpZHggPSAtMTtcblxuICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSAhPSBudWxsKSB7XG4gICAgICAgIGlkeCA9IF8uZmluZEluZGV4KHRoaXMubmF2aWdhdGFibGVJdGVtcywgKGl0ZW0pPT5pdGVtID09PSB0aGlzLmFjdGl2ZUl0ZW0pO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5ibHVyKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmVFbGVtZW50RGlyZWN0Q2hpbGRyZW4oKSkge1xuICAgICAgICBpZHggPSBfLmZpbmRJbmRleCh0aGlzLm5hdmlnYXRhYmxlSXRlbXMsIChpdGVtKT0+IGl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlkeCA8IHRoaXMubmF2aWdhdGFibGVJdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMubmF2aWdhdGFibGVJdGVtc1tpZHggKyAxXTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtLmZvY3VzKCk7XG4gICAgICAgIHRoaXMub25JdGVtSG92ZXIuZW1pdCh0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgICAgfSBlbHNlIGlmIChpZHggPT0gdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zWzBdO1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uZm9jdXMoKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1Ib3Zlci5lbWl0KHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlSXRlbSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2VsZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYXNJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zICE9IG51bGwgJiYgdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwcml2YXRlIGlzQWN0aXZlRWxlbWVudERpcmVjdENoaWxkcmVuKCkge1xuICAgIGxldCByZXRWYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IG51bGwgJiYgdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zICE9IG51bGwgJiYgdGhpcy5uYXZpZ2F0YWJsZUl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldFZhbCA9IF8uZmluZEluZGV4KHRoaXMubmF2aWdhdGFibGVJdGVtcywgKGl0ZW0pPT5pdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPj0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG59XG4iXX0=