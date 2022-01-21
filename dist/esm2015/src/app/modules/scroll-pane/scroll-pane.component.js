/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, forwardRef, Renderer2, ChangeDetectorRef, Input, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for scroll pane component
 */
export class ScrollPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this component instance
     * @param {?} zone
     */
    constructor(parent, sessionService, elementRef, renderer, cd, zone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.zone = zone;
        this._scrollVerticalPos = 0;
        this._scrollerHandler = (event) => {
            this.handleOnScroll(event);
        };
    }
    /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
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
        this.zone.runOutsideAngular(() => {
            //for https://github.com/weaveio/ngnsophia/issues/1392, track position of scroll pane
            //so it can be reset back when user switching tabs
            if (this.skipScrollAdjustment !== true) {
                (/** @type {?} */ (this.scrollDivElement.nativeElement)).addEventListener("scroll", this._scrollerHandler, true);
            }
        });
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        (/** @type {?} */ (this.scrollDivElement.nativeElement)).removeEventListener("scroll", this._scrollerHandler, true);
        this._scrollerHandler = null;
    }
    /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    handleOnScroll(event) {
        this._scrollVerticalPos = event.srcElement.scrollTop;
    }
    /**
     * @return {?}
     */
    resetScrollTopToPreviousPosition() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                if (this.scrollDivElement.nativeElement.scrollTop != this._scrollVerticalPos) {
                    this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
                }
            }, 300);
        });
    }
    /**
     * @return {?}
     */
    resetScrollTopPosition() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this._scrollVerticalPos = 0;
                this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
            }, 300);
        });
    }
    /**
     * @return {?}
     */
    isScrollView() {
        return true;
    }
    /**
     * @return {?}
     */
    isScrollPane() {
        return true;
    }
}
ScrollPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-scroll-pane',
                template: "<div #scrollDiv [id]=\"id\" class=\"vt-scroll-pane {{cssClass}}\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\">\n  <ng-content></ng-content>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ScrollPaneComponent)
                    }
                ],
                styles: [".vt-scroll-pane{overflow:auto}.noscroll{overflow:hidden!important;overflow-y:hidden!important;overflow-x:hidden!important}"]
            }] }
];
/** @nocollapse */
ScrollPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
ScrollPaneComponent.propDecorators = {
    resizeHeight: [{ type: Input }],
    skipScrollAdjustment: [{ type: Input }],
    scrollDivElement: [{ type: ViewChild, args: ['scrollDiv',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXBhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9zY3JvbGwtcGFuZS9zY3JvbGwtcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBaUI1RCxNQUFNLDBCQUEyQixTQUFRLGFBQWE7Ozs7Ozs7Ozs7SUFtQnBELFlBQzBCLE1BQXFCLEVBQzdDLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1gsSUFDQTtRQUVSLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUg1QyxPQUFFLEdBQUYsRUFBRTtRQUNGLFNBQUksR0FBSixJQUFJO2tDQWZlLENBQUM7UUFtQjVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUIsQ0FBQTtLQUNGOzs7OztJQU1ELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjs7Ozs7SUFLRCxlQUFlO1FBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FB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USxFQUFFLGdCQUFnQjtnQkFDMUIsMk9BQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUUsRUFBRSxDQUFBLG1CQUFtQixDQUFDO3FCQUNqRDtpQkFDRjs7YUFDRjs7OztZQWpCUSxhQUFhLHVCQXNDakIsUUFBUSxZQUFJLFFBQVE7WUFyQ2hCLGNBQWM7WUFGSyxVQUFVO1lBQTJELFNBQVM7WUFBRSxpQkFBaUI7WUFBb0IsTUFBTTs7OzJCQXNCcEosS0FBSzttQ0FDTCxLQUFLOytCQUVMLFNBQVMsU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTa2lwU2VsZiwgT3B0aW9uYWwsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBWaWV3Q2hpbGQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHNjcm9sbCBwYW5lIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1zY3JvbGwtcGFuZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9zY3JvbGwtcGFuZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Njcm9sbC1wYW5lLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+U2Nyb2xsUGFuZUNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsUGFuZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8v5oyH5a6a44GV44KM44Gf5YiG44Gg44GR5Zu65a6a6YOo5YiG44Go44GX44Gm6Zmk44GN44CB44Gd44KM5Lul5aSW44KS5Y+v5aSJ6aCY5Z+f44Go44GZ44KLXG4gIEBJbnB1dCgpIHJlc2l6ZUhlaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBza2lwU2Nyb2xsQWRqdXN0bWVudDogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdzY3JvbGxEaXYnKSBzY3JvbGxEaXZFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX3Njcm9sbGVySGFuZGxlcjogKGV2ZW50KT0+dm9pZDtcblxuICBwcml2YXRlIF9zY3JvbGxWZXJ0aWNhbFBvcyA9IDA7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBDaGFuZ2UgZGV0ZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50IGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsXG4gICAgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgICB0aGlzLl9zY3JvbGxlckhhbmRsZXIgPSAoZXZlbnQpPT57XG4gICAgICB0aGlzLmhhbmRsZU9uU2Nyb2xsKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY2RdXSAoQ2hhbmdlIGRldGVjdG9yKSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcmV0dXJucyBDaGFuZ2UgZGV0ZWN0b3IgcmVmZXJlbmNlXG4gICAqL1xuICBnZXRDaGFuZ2VEZXRlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBTZXQgZGltZW5zaW9ucyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgaWYgKHRoaXMuY29udHJvbEhlaWdodCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmNvbnRyb2xIZWlnaHQgPSAnMTAwJSc7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRyb2xIZWlnaHQgIT0gbnVsbCAmJiB0aGlzLmNvbnRyb2xIZWlnaHQgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiaGVpZ2h0XCJdID0gdGhpcy5jb250cm9sSGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRyb2xXaWR0aCAhPSBudWxsICYmIHRoaXMuY29udHJvbFdpZHRoICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcIm1heC13aWR0aFwiXSA9IHRoaXMuY29udHJvbFdpZHRoICsgXCJweFwiO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1heEhlaWdodCAhPSBudWxsICYmIHRoaXMubWF4SGVpZ2h0ICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcIm1heC1oZWlnaHRcIl0gPSB0aGlzLm1heEhlaWdodCArIFwicHhcIjtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzaXplSGVpZ2h0ICE9IG51bGwgJiYgdGhpcy5yZXNpemVIZWlnaHQgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiaGVpZ2h0XCJdID0gXCJjYWxjKDEwMCUgLSBcIiArIHRoaXMucmVzaXplSGVpZ2h0ICsgXCJweClcIjtcbiAgICB9XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIC8vZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWF2ZWlvL25nbnNvcGhpYS9pc3N1ZXMvMTM5MiwgdHJhY2sgcG9zaXRpb24gb2Ygc2Nyb2xsIHBhbmVcbiAgICAgIC8vc28gaXQgY2FuIGJlIHJlc2V0IGJhY2sgd2hlbiB1c2VyIHN3aXRjaGluZyB0YWJzXG4gICAgICBpZiAodGhpcy5za2lwU2Nyb2xsQWRqdXN0bWVudCAhPT0gdHJ1ZSkge1xuICAgICAgICAodGhpcy5zY3JvbGxEaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5fc2Nyb2xsZXJIYW5kbGVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICh0aGlzLnNjcm9sbERpdkVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9zY3JvbGxlckhhbmRsZXIsIHRydWUpO1xuICAgIHRoaXMuX3Njcm9sbGVySGFuZGxlciA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIGV2ZW50IG9mIGRpdlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVPblNjcm9sbChldmVudCkge1xuICAgIHRoaXMuX3Njcm9sbFZlcnRpY2FsUG9zID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3A7XG4gIH1cblxuICByZXNldFNjcm9sbFRvcFRvUHJldmlvdXNQb3NpdGlvbigpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgaWYodGhpcy5zY3JvbGxEaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICE9IHRoaXMuX3Njcm9sbFZlcnRpY2FsUG9zKSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxEaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5fc2Nyb2xsVmVydGljYWxQb3M7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH1cblxuICByZXNldFNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICB0aGlzLl9zY3JvbGxWZXJ0aWNhbFBvcyA9IDA7XG4gICAgICAgIHRoaXMuc2Nyb2xsRGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX3Njcm9sbFZlcnRpY2FsUG9zO1xuICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzU2Nyb2xsVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzU2Nyb2xsUGFuZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19