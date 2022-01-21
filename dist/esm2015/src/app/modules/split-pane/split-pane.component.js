/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, ContentChild, ViewChild, ElementRef, Optional, SkipSelf, Renderer2, NgZone, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BottomPaneComponent } from './bottom-pane/bottom-pane.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { SessionService } from '../session/session.service';
import * as _ from 'lodash';
/**
 * Class for split resizable panes
 */
export class SplitPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} zone Inject [[NgZone]] reference
     * @param {?} cd Inject [[ChangeDetectorRef]]
     */
    constructor(parent, sessionService, elementRef, renderer, zone, cd) {
        super(parent, sessionService, elementRef, renderer);
        this.zone = zone;
        this.cd = cd;
        /**
         * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
         */
        this.orientation = 'horizontal';
        /**
         * Where the divider position should be set
         */
        this.splitPosition = '50%';
        this._noScroll = false;
        this.dividerStyles = {};
        this.topPaneStyles = {};
        this.bottomPaneStyles = {};
        this.dividerCssClass = ["split-pane-divider"];
        this._resizeOn = false;
        this._prevPos = -1;
        this._update = false;
        this._handleMouseMove = _.throttle((event) => {
            this._resizePanels(event);
        }, 150);
        this._handleMouseDown = (event) => {
            this.zone.runOutsideAngular(() => {
                document.addEventListener('mousemove', this._handleMouseMove, true);
            });
            if (this.orientation === "vertical") {
                this._prevPos = event.pageX;
            }
            else {
                this._prevPos = event.pageY;
            }
            this._resizeOn = true;
            this._update = false;
        };
        this._handleMouseUp = (event) => {
            this.zone.runOutsideAngular(() => {
                document.removeEventListener("mousemove", this._handleMouseMove, true);
            });
            this._resizeOn = false;
            this._update = true;
        };
    }
    /**
     * Set true, in case of cascading split pane
     * @param {?} value
     * @return {?}
     */
    set noScroll(value) {
        this._noScroll = value;
        this.topPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
        this.bottomPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
    }
    /**
     * @return {?}
     */
    get noScroll() { return this._noScroll; }
    /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.setPaneWidth();
    }
    /**
     * @return {?}
     */
    moveUp() {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(100% - 13px)");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "0%");
        }
    }
    /**
     * @return {?}
     */
    moveDown() {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "0%");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(100% - 13px)");
        }
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
    /**
     * Set pane layout and dimensions
     * @return {?}
     */
    setPaneWidth() {
        if (this.orientation === 'vertical') {
            this.dividerStyles["height"] = "100%";
            this.dividerStyles["width"] = "1px";
            this.dividerStyles['float'] = 'left';
            this.topPaneStyles['width'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['height'] = "100%";
            this.topPaneStyles['float'] = 'left';
            /** @type {?} */
            let percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            let nPercent = +percent;
            this.bottomPaneStyles['width'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['height'] = "100%";
            this.bottomPaneStyles['float'] = 'left';
            this.dividerCssClass.push("vertical");
        }
        else {
            this.dividerStyles["height"] = "8px";
            this.dividerStyles["width"] = "100%";
            this.topPaneStyles['height'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['width'] = "100%";
            /** @type {?} */
            let percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            let nPercent = +percent;
            this.bottomPaneStyles['height'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['width'] = "100%";
            this.dividerCssClass.push("horizontal");
        }
    }
    /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cd.detectChanges();
        this.zone.runOutsideAngular(() => {
            (/** @type {?} */ (this.splitPaneDivider.nativeElement)).addEventListener("mousedown", this._handleMouseDown, true);
            document.addEventListener("mouseup", this._handleMouseUp, true);
        });
    }
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            (/** @type {?} */ (this.splitPaneDivider.nativeElement)).removeEventListener("mousedown", this._handleMouseDown, true);
            document.removeEventListener("mouseup", this._handleMouseUp, true);
            document.removeEventListener("mousemove", this._handleMouseMove, true);
        });
        this._handleMouseDown = null;
        this._handleMouseMove = null;
        this._handleMouseUp = null;
        super.ngOnDestroy();
    }
    /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    _resizePanels(event) {
        if (!this._update) {
            if (this._containerWidth == null) {
                /** @type {?} */
                const c = $(this.splitPaneContainer.nativeElement);
                this._containerHeight = c.height();
                this._containerWidth = c.width();
            }
            this._update = true;
            requestAnimationFrame(() => this._doUpdate(event));
        }
    }
    /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    _doUpdate(event) {
        if (this._resizeOn === true) {
            if (this.orientation === "vertical") {
                /** @type {?} */
                const diff = this._prevPos - event.pageX;
                /** @type {?} */
                const leftWidth = ($(this.topPaneElement.nativeElement).width() - diff);
                this._containerWidth = $(this.splitPaneContainer.nativeElement).width();
                /** @type {?} */
                let left = (leftWidth / this._containerWidth) * 100;
                /** @type {?} */
                let maximum = (leftWidth / (this._containerWidth - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "width", left + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", (this._containerWidth - (leftWidth + 6)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(" + (100 - left) + "% - 13px)");
                this._prevPos = event.pageX;
            }
            else {
                /** @type {?} */
                const diff = this._prevPos - event.pageY;
                /** @type {?} */
                const topHeight = ($(this.topPaneElement.nativeElement).height() - diff);
                this._containerHeight = $(this.splitPaneContainer.nativeElement).height();
                /** @type {?} */
                let top = (topHeight / this._containerHeight) * 100;
                /** @type {?} */
                let maximum = (topHeight / (this._containerHeight - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", top + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", (this._containerHeight - (topHeight + 10)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top) + "% - 13px)");
                this._prevPos = event.pageY;
            }
            this._update = false;
        }
    }
}
SplitPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-split-pane',
                template: "<div\n  class=\"vt-split-pane\"\n  id=\"{{id}}\"\n  [ngClass]=\"cssClass\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  #splitPaneContainer\n>\n  <section #topPaneSection class=\"top-pane\" *ngIf=\"topPane != null\" [ngStyle]=\"topPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"topPane.content\" #containerTopTemplate></ng-container>\n  </section>\n  <div #splitPaneDivider [ngClass]=\"dividerCssClass\" [ngStyle]=\"dividerStyles\">\n    <span class=\"arrow left pull-left\" (click)=\"moveDown()\">\u2228</span>\n    <span class=\"arrow center\" style=\"font-size: 10pt;vertical-align: top;\">\uFF1D</span>\n    <span class=\"arrow right pull-right\" (click)=\"moveUp()\">\u2227</span>\n  </div>\n  <section #bottomPaneSection class=\"bottom-pane\" *ngIf=\"bottomPane != null\" [ngStyle]=\"bottomPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"bottomPane.content\" #containerBottomTemplate></ng-container>\n  </section>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => SplitPaneComponent)
                    }
                ],
                styles: [".split-pane-divider{background-image:linear-gradient(#eff1f1,#cad5db);border:1px solid silver;box-sizing:content-box;overflow:hidden}.split-pane-divider .center{margin-left:0}.split-pane-divider.horizontal{margin:0;background:#cecece;background:linear-gradient(to bottom,#eff1f1,#cad5db)}.split-pane-divider.horizontal .arrow{font-size:10px;line-height:8px}.split-pane-divider.horizontal .center{position:relative;left:calc(50% - 9px);font-size:15px}.split-pane-divider.vertical{width:6px!important;height:calc(100% - 12px)!important;margin-top:5px;background:#cecece;background:linear-gradient(to right,#eff1f1,#cad5db)}.split-pane-divider.vertical:hover{cursor:ew-resize}.split-pane-divider.horizontal:hover{cursor:ns-resize}section.top-pane{overflow:auto}"]
            }] }
];
/** @nocollapse */
SplitPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
SplitPaneComponent.propDecorators = {
    orientation: [{ type: Input }],
    splitPosition: [{ type: Input }],
    noScroll: [{ type: Input }],
    topPaneElement: [{ type: ViewChild, args: ["topPaneSection", { read: ElementRef },] }],
    splitPaneDivider: [{ type: ViewChild, args: ["splitPaneDivider", { read: ElementRef },] }],
    bottomPaneElement: [{ type: ViewChild, args: ["bottomPaneSection", { read: ElementRef },] }],
    splitPaneContainer: [{ type: ViewChild, args: ["splitPaneContainer", { read: ElementRef },] }],
    topPane: [{ type: ContentChild, args: [TopPaneComponent,] }],
    bottomPane: [{ type: ContentChild, args: [BottomPaneComponent,] }]
};
if (false) {
    /**
     * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
     * @type {?}
     */
    SplitPaneComponent.prototype.orientation;
    /**
     * Where the divider position should be set
     * @type {?}
     */
    SplitPaneComponent.prototype.splitPosition;
    /** @type {?} */
    SplitPaneComponent.prototype._noScroll;
    /** @type {?} */
    SplitPaneComponent.prototype.topPaneElement;
    /** @type {?} */
    SplitPaneComponent.prototype.splitPaneDivider;
    /** @type {?} */
    SplitPaneComponent.prototype.bottomPaneElement;
    /** @type {?} */
    SplitPaneComponent.prototype.splitPaneContainer;
    /** @type {?} */
    SplitPaneComponent.prototype.topPane;
    /** @type {?} */
    SplitPaneComponent.prototype.bottomPane;
    /** @type {?} */
    SplitPaneComponent.prototype.dividerStyles;
    /** @type {?} */
    SplitPaneComponent.prototype.topPaneStyles;
    /** @type {?} */
    SplitPaneComponent.prototype.bottomPaneStyles;
    /** @type {?} */
    SplitPaneComponent.prototype.dividerCssClass;
    /** @type {?} */
    SplitPaneComponent.prototype._resizeOn;
    /** @type {?} */
    SplitPaneComponent.prototype._handleMouseMove;
    /** @type {?} */
    SplitPaneComponent.prototype._handleMouseDown;
    /** @type {?} */
    SplitPaneComponent.prototype._handleMouseUp;
    /** @type {?} */
    SplitPaneComponent.prototype._prevPos;
    /** @type {?} */
    SplitPaneComponent.prototype._containerHeight;
    /** @type {?} */
    SplitPaneComponent.prototype._containerWidth;
    /** @type {?} */
    SplitPaneComponent.prototype._update;
    /** @type {?} */
    SplitPaneComponent.prototype.zone;
    /** @type {?} */
    SplitPaneComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtcGFuZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3NwbGl0LXBhbmUvc3BsaXQtcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7OztBQW1CNUIsTUFBTSx5QkFBMEIsU0FBUSxhQUFhOzs7Ozs7Ozs7O0lBc0RuRCxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQixFQUFVLElBQVksRUFBVSxFQUFxQjtRQUN6TCxLQUFLLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEMEYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1COzs7OzJCQWxENUosWUFBWTs7Ozs2QkFLVixLQUFLO3lCQVVULEtBQUs7NkJBVVEsRUFBRTs2QkFDRixFQUFFO2dDQUNDLEVBQUU7K0JBRTdCLENBQUMsb0JBQW9CLENBQUM7eUJBRVgsS0FBSzt3QkFJZixDQUFDLENBQUM7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Y3Rpb25TdHJhdGVneSwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPcHRpb25hbCwgU2tpcFNlbGYsIFJlbmRlcmVyMiwgTmdab25lLCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm90dG9tUGFuZUNvbXBvbmVudCB9IGZyb20gJy4vYm90dG9tLXBhbmUvYm90dG9tLXBhbmUuY29tcG9uZW50Jztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBUb3BQYW5lQ29tcG9uZW50IH0gZnJvbSAnLi90b3AtcGFuZS90b3AtcGFuZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLyoqXG4gKiBDbGFzcyBmb3Igc3BsaXQgcmVzaXphYmxlIHBhbmVzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXNwbGl0LXBhbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3BsaXQtcGFuZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NwbGl0LXBhbmUuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5TcGxpdFBhbmVDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0UGFuZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAvKipcbiAgICogJ2hvcml6b250YWwnID0gdG9wL2JvdHRvbSBwYW5lcywgJ3ZlcnRpY2FsJyA9IGxlZnQvcmlnaHQgcGFuZXNcbiAgICovXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBzdHJpbmcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgLyoqXG4gICAqIFdoZXJlIHRoZSBkaXZpZGVyIHBvc2l0aW9uIHNob3VsZCBiZSBzZXRcbiAgICovXG4gIEBJbnB1dCgpIHNwbGl0UG9zaXRpb246IHN0cmluZyA9ICc1MCUnOyAvL3BlcmNlbnRcbiAgLyoqXG4gICAqIFNldCB0cnVlLCBpbiBjYXNlIG9mIGNhc2NhZGluZyBzcGxpdCBwYW5lXG4gICAqL1xuICBASW5wdXQoKSBzZXQgbm9TY3JvbGwodmFsdWUpe1xuICAgIHRoaXMuX25vU2Nyb2xsID0gdmFsdWU7XG4gICAgdGhpcy50b3BQYW5lU3R5bGVzWydvdmVyZmxvdyddID0gdmFsdWUgPyAnaGlkZGVuJyA6ICdpbmhlcml0JztcbiAgICB0aGlzLmJvdHRvbVBhbmVTdHlsZXNbJ292ZXJmbG93J10gPSB2YWx1ZSA/ICdoaWRkZW4nIDogJ2luaGVyaXQnO1xuICB9XG4gIGdldCBub1Njcm9sbCgpeyByZXR1cm4gdGhpcy5fbm9TY3JvbGw7IH1cbiAgcHJpdmF0ZSBfbm9TY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKFwidG9wUGFuZVNlY3Rpb25cIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0b3BQYW5lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInNwbGl0UGFuZURpdmlkZXJcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBzcGxpdFBhbmVEaXZpZGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiYm90dG9tUGFuZVNlY3Rpb25cIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBib3R0b21QYW5lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInNwbGl0UGFuZUNvbnRhaW5lclwiLCB7cmVhZDogRWxlbWVudFJlZn0pIHNwbGl0UGFuZUNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICBAQ29udGVudENoaWxkKFRvcFBhbmVDb21wb25lbnQpIHRvcFBhbmU6IFRvcFBhbmVDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoQm90dG9tUGFuZUNvbXBvbmVudCkgYm90dG9tUGFuZTogQm90dG9tUGFuZUNvbXBvbmVudDtcblxuICBkaXZpZGVyU3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgdG9wUGFuZVN0eWxlczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGJvdHRvbVBhbmVTdHlsZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIGRpdmlkZXJDc3NDbGFzcyA9IFtcInNwbGl0LXBhbmUtZGl2aWRlclwiXTtcblxuICBwcml2YXRlIF9yZXNpemVPbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9oYW5kbGVNb3VzZU1vdmU6IChldmVudCk9PnZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZU1vdXNlRG93bjogKGV2ZW50KT0+dm9pZDtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VVcDogKGV2ZW50KT0+dm9pZDtcbiAgcHJpdmF0ZSBfcHJldlBvcyA9IC0xO1xuICBwcml2YXRlIF9jb250YWluZXJIZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY29udGFpbmVyV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfdXBkYXRlID0gZmFsc2U7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHpvbmUgSW5qZWN0IFtbTmdab25lXV0gcmVmZXJlbmNlXG4gICAqIEBwYXJhbSBjZCBJbmplY3QgW1tDaGFuZ2VEZXRlY3RvclJlZl1dXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXG4gICAgdGhpcy5faGFuZGxlTW91c2VNb3ZlID0gIF8udGhyb3R0bGUoKGV2ZW50KT0+e1xuICAgICAgdGhpcy5fcmVzaXplUGFuZWxzKGV2ZW50KTtcbiAgICB9LDE1MCk7XG5cbiAgICB0aGlzLl9oYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpPT57XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlTW91c2VNb3ZlLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIHRoaXMuX3ByZXZQb3MgPSBldmVudC5wYWdlWDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3ByZXZQb3MgPSBldmVudC5wYWdlWTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Jlc2l6ZU9uID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGlzLl9oYW5kbGVNb3VzZVVwID0gKGV2ZW50KT0+e1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlTW91c2VNb3ZlLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9yZXNpemVPbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fdXBkYXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIFNldCBwYW5lbCB3aWR0aFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLnNldFBhbmVXaWR0aCgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbW92ZVVwKCkge1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCBcIjAlXCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaGVpZ2h0XCIsIFwiY2FsYygxMDAlIC0gMTNweClcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIFwiY2FsYygxMDAlIC0gMTNweClcIik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm90dG9tUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcIjAlXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG1vdmVEb3duKCkge1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIDEzcHgpXCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaGVpZ2h0XCIsIFwiMCVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIFwiMCVcIik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm90dG9tUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcImNhbGMoMTAwJSAtIDEzcHgpXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGEgY29udGFpbmVyIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBUcnVlXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHBhbmUgbGF5b3V0IGFuZCBkaW1lbnNpb25zXG4gICAqL1xuICBwcml2YXRlIHNldFBhbmVXaWR0aCgpIHtcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5kaXZpZGVyU3R5bGVzW1wiaGVpZ2h0XCJdID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmRpdmlkZXJTdHlsZXNbXCJ3aWR0aFwiXSA9IFwiMXB4XCI7XG4gICAgICB0aGlzLmRpdmlkZXJTdHlsZXNbJ2Zsb2F0J10gPSAnbGVmdCc7XG4gICAgICB0aGlzLnRvcFBhbmVTdHlsZXNbJ3dpZHRoJ10gPSAnY2FsYygnICsgdGhpcy5zcGxpdFBvc2l0aW9uICsgJyAtIDNweCknO1xuICAgICAgdGhpcy50b3BQYW5lU3R5bGVzWydoZWlnaHQnXSA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy50b3BQYW5lU3R5bGVzWydmbG9hdCddID0gJ2xlZnQnXG4gICAgICBsZXQgcGVyY2VudDogc3RyaW5nID0gdGhpcy5zcGxpdFBvc2l0aW9uLnNwbGl0KCclJywgMSlbMF07XG4gICAgICBsZXQgblBlcmNlbnQgPSArcGVyY2VudDtcbiAgICAgIHRoaXMuYm90dG9tUGFuZVN0eWxlc1snd2lkdGgnXSA9ICdjYWxjKCcgKyAoMTAwIC0gblBlcmNlbnQpICsgJyUgLSAxMHB4KSc7XG4gICAgICB0aGlzLmJvdHRvbVBhbmVTdHlsZXNbJ2hlaWdodCddID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmJvdHRvbVBhbmVTdHlsZXNbJ2Zsb2F0J10gPSAnbGVmdCc7XG4gICAgICB0aGlzLmRpdmlkZXJDc3NDbGFzcy5wdXNoKFwidmVydGljYWxcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGl2aWRlclN0eWxlc1tcImhlaWdodFwiXSA9IFwiOHB4XCI7XG4gICAgICB0aGlzLmRpdmlkZXJTdHlsZXNbXCJ3aWR0aFwiXSA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy50b3BQYW5lU3R5bGVzWydoZWlnaHQnXSA9ICdjYWxjKCcgKyB0aGlzLnNwbGl0UG9zaXRpb24gKyAnIC0gM3B4KSc7XG4gICAgICB0aGlzLnRvcFBhbmVTdHlsZXNbJ3dpZHRoJ10gPSBcIjEwMCVcIjtcbiAgICAgIGxldCBwZXJjZW50OiBzdHJpbmcgPSB0aGlzLnNwbGl0UG9zaXRpb24uc3BsaXQoJyUnLCAxKVswXTtcbiAgICAgIGxldCBuUGVyY2VudCA9ICtwZXJjZW50O1xuICAgICAgdGhpcy5ib3R0b21QYW5lU3R5bGVzWydoZWlnaHQnXSA9ICdjYWxjKCcgKyAoMTAwIC0gblBlcmNlbnQpICsgJyUgLSAxMHB4KSc7XG4gICAgICB0aGlzLmJvdHRvbVBhbmVTdHlsZXNbJ3dpZHRoJ10gPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMuZGl2aWRlckNzc0NsYXNzLnB1c2goXCJob3Jpem9udGFsXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBBZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgKHRoaXMuc3BsaXRQYW5lRGl2aWRlci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuX2hhbmRsZU1vdXNlRG93biwgdHJ1ZSk7XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU1vdXNlVXAsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIERlc3Ryb3kgbGlmZWN5Y2xlLiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgICh0aGlzLnNwbGl0UGFuZURpdmlkZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9oYW5kbGVNb3VzZURvd24sIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlTW91c2VVcCwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oYW5kbGVNb3VzZURvd24gPSBudWxsO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSA9IG51bGw7XG4gICAgdGhpcy5faGFuZGxlTW91c2VVcCA9IG51bGw7XG5cbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIHBhbmVsIHJlc2l6ZSBldmVudFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZVBhbmVscyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5fdXBkYXRlKSB7XG4gICAgICBpZiAodGhpcy5fY29udGFpbmVyV2lkdGggPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjID0gJCh0aGlzLnNwbGl0UGFuZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVySGVpZ2h0ID0gYy5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyV2lkdGggPSBjLndpZHRoKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0ZSA9IHRydWU7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCk9PnRoaXMuX2RvVXBkYXRlKGV2ZW50KSk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlIGV2ZW50LiBVcGRhdGUgcGFuZSB3aWR0aC9oZWlnaHRcbiAgICogQHBhcmFtIGV2ZW50IE1vdXNlIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF9kb1VwZGF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLl9yZXNpemVPbiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5fcHJldlBvcyAtIGV2ZW50LnBhZ2VYO1xuICAgICAgICBjb25zdCBsZWZ0V2lkdGggPSAgKCQodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50KS53aWR0aCgpIC0gZGlmZik7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcldpZHRoID0gJCh0aGlzLnNwbGl0UGFuZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS53aWR0aCgpO1xuICAgICAgICBsZXQgbGVmdDogbnVtYmVyID0gKGxlZnRXaWR0aCAvIHRoaXMuX2NvbnRhaW5lcldpZHRoKSAqIDEwMDtcbiAgICAgICAgbGV0IG1heGltdW06IG51bWJlciA9IChsZWZ0V2lkdGggLyAodGhpcy5fY29udGFpbmVyV2lkdGggLSAxNSkpICogMTAwO1xuICAgICAgICBpZiggbWF4aW11bSA+IDEwMCApIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIFwiY2FsYygxMDAlIC0gMTNweClcIik7XG4gICAgICAgIGVsc2UgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvcFBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwid2lkdGhcIiwgbGVmdCArIFwiJVwiKTtcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwid2lkdGhcIiwgKHRoaXMuX2NvbnRhaW5lcldpZHRoIC0gKGxlZnRXaWR0aCArIDYpKSArIFwicHhcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib3R0b21QYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIFwiY2FsYyhcIiArICgxMDAgLSBsZWZ0KSArIFwiJSAtIDEzcHgpXCIpO1xuICAgICAgICB0aGlzLl9wcmV2UG9zID0gZXZlbnQucGFnZVg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5fcHJldlBvcyAtIGV2ZW50LnBhZ2VZO1xuICAgICAgICBjb25zdCB0b3BIZWlnaHQgPSAgKCQodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSAtIGRpZmYpO1xuICAgICAgICB0aGlzLl9jb250YWluZXJIZWlnaHQgPSAkKHRoaXMuc3BsaXRQYW5lQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpLmhlaWdodCgpO1xuICAgICAgICBsZXQgdG9wOiBudW1iZXIgPSAodG9wSGVpZ2h0IC8gdGhpcy5fY29udGFpbmVySGVpZ2h0KSAqIDEwMDtcbiAgICAgICAgbGV0IG1heGltdW06IG51bWJlciA9ICh0b3BIZWlnaHQgLyAodGhpcy5fY29udGFpbmVySGVpZ2h0IC0gMTUpKSAqIDEwMDtcbiAgICAgICAgaWYoIG1heGltdW0gPiAxMDAgKSB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSAxM3B4XCIpO1xuICAgICAgICBlbHNlIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCB0b3AgKyBcIiVcIik7XG4gICAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib3R0b21QYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCAodGhpcy5fY29udGFpbmVySGVpZ2h0IC0gKHRvcEhlaWdodCArIDEwKSkgKyBcInB4XCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm90dG9tUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgXCJjYWxjKFwiICsgKDEwMCAtIHRvcCkgKyBcIiUgLSAxM3B4KVwiKTtcbiAgICAgICAgdGhpcy5fcHJldlBvcyA9IGV2ZW50LnBhZ2VZO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91cGRhdGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==