/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, forwardRef, Renderer2, ChangeDetectorRef, Input, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for scroll pane component
 */
var ScrollPaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollPaneComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param cd Change detector for this component instance
     */
    function ScrollPaneComponent(parent, sessionService, elementRef, renderer, cd, zone) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.zone = zone;
        _this._scrollVerticalPos = 0;
        _this._scrollerHandler = function (event) {
            _this.handleOnScroll(event);
        };
        return _this;
    }
    /**
     * Get [[cd]] (Change detector) property value
     * @returns Change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    ScrollPaneComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    function () {
        return this.cd;
    };
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ScrollPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        if (this.controlHeight == null) {
            this.controlHeight = '100%';
        }
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        if (this.controlWidth != null && this.controlWidth !== "") {
            this.styles["max-width"] = this.controlWidth + "px";
        }
        if (this.maxHeight != null && this.maxHeight !== "") {
            this.styles["max-height"] = this.maxHeight + "px";
        }
        if (this.resizeHeight != null && this.resizeHeight !== "") {
            this.styles["height"] = "calc(100% - " + this.resizeHeight + "px)";
        }
        this.zone.runOutsideAngular(function () {
            //for https://github.com/weaveio/ngnsophia/issues/1392, track position of scroll pane
            //so it can be reset back when user switching tabs
            if (_this.skipScrollAdjustment !== true) {
                (/** @type {?} */ (_this.scrollDivElement.nativeElement)).addEventListener("scroll", _this._scrollerHandler, true);
            }
        });
        this.cd.detectChanges();
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        (/** @type {?} */ (this.scrollDivElement.nativeElement)).removeEventListener("scroll", this._scrollerHandler, true);
        this._scrollerHandler = null;
    };
    /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    ScrollPaneComponent.prototype.handleOnScroll = /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._scrollVerticalPos = event.srcElement.scrollTop;
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.resetScrollTopToPreviousPosition = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                if (_this.scrollDivElement.nativeElement.scrollTop != _this._scrollVerticalPos) {
                    _this.scrollDivElement.nativeElement.scrollTop = _this._scrollVerticalPos;
                }
            }, 300);
        });
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.resetScrollTopPosition = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                _this._scrollVerticalPos = 0;
                _this.scrollDivElement.nativeElement.scrollTop = _this._scrollVerticalPos;
            }, 300);
        });
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.isScrollView = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.isScrollPane = /**
     * @return {?}
     */
    function () {
        return true;
    };
    ScrollPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-scroll-pane',
                    template: "<div #scrollDiv [id]=\"id\" class=\"vt-scroll-pane {{cssClass}}\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\">\n  <ng-content></ng-content>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ScrollPaneComponent; })
                        }
                    ],
                    styles: [".vt-scroll-pane{overflow:auto}.noscroll{overflow:hidden!important;overflow-y:hidden!important;overflow-x:hidden!important}"]
                }] }
    ];
    /** @nocollapse */
    ScrollPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    ScrollPaneComponent.propDecorators = {
        resizeHeight: [{ type: Input }],
        skipScrollAdjustment: [{ type: Input }],
        scrollDivElement: [{ type: ViewChild, args: ['scrollDiv',] }]
    };
    return ScrollPaneComponent;
}(BaseComponent));
export { ScrollPaneComponent };
if (false) {
    /** @type {?} */
    ScrollPaneComponent.prototype.resizeHeight;
    /** @type {?} */
    ScrollPaneComponent.prototype.skipScrollAdjustment;
    /** @type {?} */
    ScrollPaneComponent.prototype.scrollDivElement;
    /** @type {?} */
    ScrollPaneComponent.prototype._scrollerHandler;
    /** @type {?} */
    ScrollPaneComponent.prototype._scrollVerticalPos;
    /** @type {?} */
    ScrollPaneComponent.prototype.cd;
    /** @type {?} */
    ScrollPaneComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXBhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9zY3JvbGwtcGFuZS9zY3JvbGwtcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0ssT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFpQm5CLCtDQUFhO0lBV3BEOzs7Ozs7O09BT0c7SUFDSCw2QkFDMEIsTUFBcUIsRUFDN0MsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsUUFBbUIsRUFDWCxJQUNBO1FBTlYsWUFRRSxrQkFBTSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FLcEQ7UUFSUyxRQUFFLEdBQUYsRUFBRTtRQUNGLFVBQUksR0FBSixJQUFJO21DQWZlLENBQUM7UUFtQjVCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLEtBQUs7WUFDNUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QixDQUFBOztLQUNGO0lBRUQ7OztPQUdHOzs7OztJQUNILCtDQUFpQjs7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjtJQUVEOztPQUVHOzs7OztJQUNILDZDQUFlOzs7O0lBQWY7UUFBQSxpQkE2QkM7UUE1QkMsaUJBQU0sZUFBZSxXQUFFLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJ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QUFPLElBQUksQ0FBQztLQUNiOztnQkEvSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDJPQUEyQztvQkFFM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFJLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7eUJBQ2pEO3FCQUNGOztpQkFDRjs7OztnQkFqQlEsYUFBYSx1QkFzQ2pCLFFBQVEsWUFBSSxRQUFRO2dCQXJDaEIsY0FBYztnQkFGSyxVQUFVO2dCQUEyRCxTQUFTO2dCQUFFLGlCQUFpQjtnQkFBb0IsTUFBTTs7OytCQXNCcEosS0FBSzt1Q0FDTCxLQUFLO21DQUVMLFNBQVMsU0FBQyxXQUFXOzs4QkF6QnhCO0VBbUJ5QyxhQUFhO1NBQXpDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2tpcFNlbGYsIE9wdGlvbmFsLCBmb3J3YXJkUmVmLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgVmlld0NoaWxkLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciBzY3JvbGwgcGFuZSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtc2Nyb2xsLXBhbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2Nyb2xsLXBhbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zY3JvbGwtcGFuZS5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlNjcm9sbFBhbmVDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvL+aMh+WumuOBleOCjOOBn+WIhuOBoOOBkeWbuuWumumDqOWIhuOBqOOBl+OBpumZpOOBjeOAgeOBneOCjOS7peWkluOCkuWPr+WkiemgmOWfn+OBqOOBmeOCi1xuICBASW5wdXQoKSByZXNpemVIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgc2tpcFNjcm9sbEFkanVzdG1lbnQ6IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnc2Nyb2xsRGl2Jykgc2Nyb2xsRGl2RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9zY3JvbGxlckhhbmRsZXI6IChldmVudCk9PnZvaWQ7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsVmVydGljYWxQb3MgPSAwO1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY2QgQ2hhbmdlIGRldGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LFxuICAgIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSxcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXG4gICAgdGhpcy5fc2Nyb2xsZXJIYW5kbGVyID0gKGV2ZW50KT0+e1xuICAgICAgdGhpcy5oYW5kbGVPblNjcm9sbChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2NkXV0gKENoYW5nZSBkZXRlY3RvcikgcHJvcGVydHkgdmFsdWVcbiAgICogQHJldHVybnMgQ2hhbmdlIGRldGVjdG9yIHJlZmVyZW5jZVxuICAgKi9cbiAgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gU2V0IGRpbWVuc2lvbnMgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIGlmICh0aGlzLmNvbnRyb2xIZWlnaHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250cm9sSGVpZ2h0ID0gJzEwMCUnO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250cm9sSGVpZ2h0ICE9IG51bGwgJiYgdGhpcy5jb250cm9sSGVpZ2h0ICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcImhlaWdodFwiXSA9IHRoaXMuY29udHJvbEhlaWdodCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250cm9sV2lkdGggIT0gbnVsbCAmJiB0aGlzLmNvbnRyb2xXaWR0aCAhPT0gXCJcIikge1xuICAgICAgdGhpcy5zdHlsZXNbXCJtYXgtd2lkdGhcIl0gPSB0aGlzLmNvbnRyb2xXaWR0aCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhIZWlnaHQgIT0gbnVsbCAmJiB0aGlzLm1heEhlaWdodCAhPT0gXCJcIikge1xuICAgICAgdGhpcy5zdHlsZXNbXCJtYXgtaGVpZ2h0XCJdID0gdGhpcy5tYXhIZWlnaHQgKyBcInB4XCI7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlc2l6ZUhlaWdodCAhPSBudWxsICYmIHRoaXMucmVzaXplSGVpZ2h0ICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcImhlaWdodFwiXSA9IFwiY2FsYygxMDAlIC0gXCIgKyB0aGlzLnJlc2l6ZUhlaWdodCArIFwicHgpXCI7XG4gICAgfVxuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAvL2ZvciBodHRwczovL2dpdGh1Yi5jb20vd2VhdmVpby9uZ25zb3BoaWEvaXNzdWVzLzEzOTIsIHRyYWNrIHBvc2l0aW9uIG9mIHNjcm9sbCBwYW5lXG4gICAgICAvL3NvIGl0IGNhbiBiZSByZXNldCBiYWNrIHdoZW4gdXNlciBzd2l0Y2hpbmcgdGFic1xuICAgICAgaWYgKHRoaXMuc2tpcFNjcm9sbEFkanVzdG1lbnQgIT09IHRydWUpIHtcbiAgICAgICAgKHRoaXMuc2Nyb2xsRGl2RWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX3Njcm9sbGVySGFuZGxlciwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAodGhpcy5zY3JvbGxEaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5fc2Nyb2xsZXJIYW5kbGVyLCB0cnVlKTtcbiAgICB0aGlzLl9zY3JvbGxlckhhbmRsZXIgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBldmVudCBvZiBkaXZcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlT25TY3JvbGwoZXZlbnQpIHtcbiAgICB0aGlzLl9zY3JvbGxWZXJ0aWNhbFBvcyA9IGV2ZW50LnNyY0VsZW1lbnQuc2Nyb2xsVG9wO1xuICB9XG5cbiAgcmVzZXRTY3JvbGxUb3BUb1ByZXZpb3VzUG9zaXRpb24oKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgIGlmKHRoaXMuc2Nyb2xsRGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCAhPSB0aGlzLl9zY3JvbGxWZXJ0aWNhbFBvcykge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsRGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX3Njcm9sbFZlcnRpY2FsUG9zO1xuICAgICAgICB9XG4gICAgICB9LCAzMDApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRTY3JvbGxUb3BQb3NpdGlvbigpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgdGhpcy5fc2Nyb2xsVmVydGljYWxQb3MgPSAwO1xuICAgICAgICB0aGlzLnNjcm9sbERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLl9zY3JvbGxWZXJ0aWNhbFBvcztcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH1cblxuICBpc1Njcm9sbFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc1Njcm9sbFBhbmUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==