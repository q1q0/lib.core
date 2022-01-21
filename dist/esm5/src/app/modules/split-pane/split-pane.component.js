/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Input, ContentChild, ViewChild, ElementRef, Optional, SkipSelf, Renderer2, NgZone, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BottomPaneComponent } from './bottom-pane/bottom-pane.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { SessionService } from '../session/session.service';
import * as _ from 'lodash';
/**
 * Class for split resizable panes
 */
var SplitPaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SplitPaneComponent, _super);
    /* istanbul ignore next */
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param zone Inject [[NgZone]] reference
     * @param cd Inject [[ChangeDetectorRef]]
     */
    function SplitPaneComponent(parent, sessionService, elementRef, renderer, zone, cd) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.zone = zone;
        _this.cd = cd;
        /**
         * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
         */
        _this.orientation = 'horizontal';
        /**
         * Where the divider position should be set
         */
        _this.splitPosition = '50%';
        _this._noScroll = false;
        _this.dividerStyles = {};
        _this.topPaneStyles = {};
        _this.bottomPaneStyles = {};
        _this.dividerCssClass = ["split-pane-divider"];
        _this._resizeOn = false;
        _this._prevPos = -1;
        _this._update = false;
        _this._handleMouseMove = _.throttle(function (event) {
            _this._resizePanels(event);
        }, 150);
        _this._handleMouseDown = function (event) {
            _this.zone.runOutsideAngular(function () {
                document.addEventListener('mousemove', _this._handleMouseMove, true);
            });
            if (_this.orientation === "vertical") {
                _this._prevPos = event.pageX;
            }
            else {
                _this._prevPos = event.pageY;
            }
            _this._resizeOn = true;
            _this._update = false;
        };
        _this._handleMouseUp = function (event) {
            _this.zone.runOutsideAngular(function () {
                document.removeEventListener("mousemove", _this._handleMouseMove, true);
            });
            _this._resizeOn = false;
            _this._update = true;
        };
        return _this;
    }
    Object.defineProperty(SplitPaneComponent.prototype, "noScroll", {
        get: /**
         * @return {?}
         */
        function () { return this._noScroll; },
        /**
         * Set true, in case of cascading split pane
         */
        set: /**
         * Set true, in case of cascading split pane
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._noScroll = value;
            this.topPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
            this.bottomPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * Init lifecycle. Set panel width
     */
    /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    SplitPaneComponent.prototype.ngOnInit = /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.setPaneWidth();
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    SplitPaneComponent.prototype.moveUp = /**
     * @return {?}
     */
    function () {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(100% - 13px)");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "0%");
        }
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    SplitPaneComponent.prototype.moveDown = /**
     * @return {?}
     */
    function () {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "0%");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(100% - 13px)");
        }
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    SplitPaneComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    /**
     * Set pane layout and dimensions
     * @return {?}
     */
    SplitPaneComponent.prototype.setPaneWidth = /**
     * Set pane layout and dimensions
     * @return {?}
     */
    function () {
        if (this.orientation === 'vertical') {
            this.dividerStyles["height"] = "100%";
            this.dividerStyles["width"] = "1px";
            this.dividerStyles['float'] = 'left';
            this.topPaneStyles['width'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['height'] = "100%";
            this.topPaneStyles['float'] = 'left';
            /** @type {?} */
            var percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            var nPercent = +percent;
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
            var percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            var nPercent = +percent;
            this.bottomPaneStyles['height'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['width'] = "100%";
            this.dividerCssClass.push("horizontal");
        }
    };
    /**
     * After view init lifecycle. Add event listeners
     */
    /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    SplitPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        this.cd.detectChanges();
        this.zone.runOutsideAngular(function () {
            (/** @type {?} */ (_this.splitPaneDivider.nativeElement)).addEventListener("mousedown", _this._handleMouseDown, true);
            document.addEventListener("mouseup", _this._handleMouseUp, true);
        });
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Remove event listeners
     */
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    SplitPaneComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            (/** @type {?} */ (_this.splitPaneDivider.nativeElement)).removeEventListener("mousedown", _this._handleMouseDown, true);
            document.removeEventListener("mouseup", _this._handleMouseUp, true);
            document.removeEventListener("mousemove", _this._handleMouseMove, true);
        });
        this._handleMouseDown = null;
        this._handleMouseMove = null;
        this._handleMouseUp = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    SplitPaneComponent.prototype._resizePanels = /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this._update) {
            if (this._containerWidth == null) {
                /** @type {?} */
                var c = $(this.splitPaneContainer.nativeElement);
                this._containerHeight = c.height();
                this._containerWidth = c.width();
            }
            this._update = true;
            requestAnimationFrame(function () { return _this._doUpdate(event); });
        }
    };
    /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    SplitPaneComponent.prototype._doUpdate = /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        if (this._resizeOn === true) {
            if (this.orientation === "vertical") {
                /** @type {?} */
                var diff = this._prevPos - event.pageX;
                /** @type {?} */
                var leftWidth = ($(this.topPaneElement.nativeElement).width() - diff);
                this._containerWidth = $(this.splitPaneContainer.nativeElement).width();
                /** @type {?} */
                var left = (leftWidth / this._containerWidth) * 100;
                /** @type {?} */
                var maximum = (leftWidth / (this._containerWidth - 15)) * 100;
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
                var diff = this._prevPos - event.pageY;
                /** @type {?} */
                var topHeight = ($(this.topPaneElement.nativeElement).height() - diff);
                this._containerHeight = $(this.splitPaneContainer.nativeElement).height();
                /** @type {?} */
                var top_1 = (topHeight / this._containerHeight) * 100;
                /** @type {?} */
                var maximum = (topHeight / (this._containerHeight - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", top_1 + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", (this._containerHeight - (topHeight + 10)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top_1) + "% - 13px)");
                this._prevPos = event.pageY;
            }
            this._update = false;
        }
    };
    SplitPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-split-pane',
                    template: "<div\n  class=\"vt-split-pane\"\n  id=\"{{id}}\"\n  [ngClass]=\"cssClass\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  #splitPaneContainer\n>\n  <section #topPaneSection class=\"top-pane\" *ngIf=\"topPane != null\" [ngStyle]=\"topPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"topPane.content\" #containerTopTemplate></ng-container>\n  </section>\n  <div #splitPaneDivider [ngClass]=\"dividerCssClass\" [ngStyle]=\"dividerStyles\">\n    <span class=\"arrow left pull-left\" (click)=\"moveDown()\">\u2228</span>\n    <span class=\"arrow center\" style=\"font-size: 10pt;vertical-align: top;\">\uFF1D</span>\n    <span class=\"arrow right pull-right\" (click)=\"moveUp()\">\u2227</span>\n  </div>\n  <section #bottomPaneSection class=\"bottom-pane\" *ngIf=\"bottomPane != null\" [ngStyle]=\"bottomPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"bottomPane.content\" #containerBottomTemplate></ng-container>\n  </section>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return SplitPaneComponent; })
                        }
                    ],
                    styles: [".split-pane-divider{background-image:linear-gradient(#eff1f1,#cad5db);border:1px solid silver;box-sizing:content-box;overflow:hidden}.split-pane-divider .center{margin-left:0}.split-pane-divider.horizontal{margin:0;background:#cecece;background:linear-gradient(to bottom,#eff1f1,#cad5db)}.split-pane-divider.horizontal .arrow{font-size:10px;line-height:8px}.split-pane-divider.horizontal .center{position:relative;left:calc(50% - 9px);font-size:15px}.split-pane-divider.vertical{width:6px!important;height:calc(100% - 12px)!important;margin-top:5px;background:#cecece;background:linear-gradient(to right,#eff1f1,#cad5db)}.split-pane-divider.vertical:hover{cursor:ew-resize}.split-pane-divider.horizontal:hover{cursor:ns-resize}section.top-pane{overflow:auto}"]
                }] }
    ];
    /** @nocollapse */
    SplitPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
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
    return SplitPaneComponent;
}(BaseComponent));
export { SplitPaneComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtcGFuZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3NwbGl0LXBhbmUvc3BsaXQtcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JMLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0lBbUJZLDhDQUFhO0lBNENuRCwwQkFBMEI7SUFDMUI7Ozs7Ozs7O09BUUc7SUFDSCw0QkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQUUsUUFBbUIsRUFBVSxJQUFZLEVBQVUsRUFBcUI7UUFBM0wsWUFDRSxrQkFBTSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsU0E0QnBEO1FBN0IrSSxVQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsUUFBRSxHQUFGLEVBQUUsQ0FBbUI7Ozs7NEJBbEQ1SixZQUFZOzs7OzhCQUtWLEtBQUs7MEJBVVQsS0FBSzs4QkFVUSxFQUFFOzhCQUNGLEVBQUU7aUNBQ0MsRUFBRTtnQ0FFN0IsQ0FBQyxvQkFBb0IsQ0FBQzswQkFFWCxLQUFLO3lCQUlm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QUFDO3FDQUNqRCxTQUFTLFNBQUMsb0JBQW9CLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzBCQUVsRCxZQUFZLFNBQUMsZ0JBQWdCOzZCQUM3QixZQUFZLFNBQUMsbUJBQW1COzs2QkFwRG5DO0VBeUJ3QyxhQUFhO1NBQXhDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT3B0aW9uYWwsIFNraXBTZWxmLCBSZW5kZXJlcjIsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEJvdHRvbVBhbmVDb21wb25lbnQgfSBmcm9tICcuL2JvdHRvbS1wYW5lL2JvdHRvbS1wYW5lLmNvbXBvbmVudCc7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaW1wb3J0IHsgVG9wUGFuZUNvbXBvbmVudCB9IGZyb20gJy4vdG9wLXBhbmUvdG9wLXBhbmUuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHNwbGl0IHJlc2l6YWJsZSBwYW5lc1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1zcGxpdC1wYW5lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NwbGl0LXBhbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zcGxpdC1wYW5lLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+U3BsaXRQYW5lQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTcGxpdFBhbmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqICdob3Jpem9udGFsJyA9IHRvcC9ib3R0b20gcGFuZXMsICd2ZXJ0aWNhbCcgPSBsZWZ0L3JpZ2h0IHBhbmVzXG4gICAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ2hvcml6b250YWwnO1xuXG4gIC8qKlxuICAgKiBXaGVyZSB0aGUgZGl2aWRlciBwb3NpdGlvbiBzaG91bGQgYmUgc2V0XG4gICAqL1xuICBASW5wdXQoKSBzcGxpdFBvc2l0aW9uOiBzdHJpbmcgPSAnNTAlJzsgLy9wZXJjZW50XG4gIC8qKlxuICAgKiBTZXQgdHJ1ZSwgaW4gY2FzZSBvZiBjYXNjYWRpbmcgc3BsaXQgcGFuZVxuICAgKi9cbiAgQElucHV0KCkgc2V0IG5vU2Nyb2xsKHZhbHVlKXtcbiAgICB0aGlzLl9ub1Njcm9sbCA9IHZhbHVlO1xuICAgIHRoaXMudG9wUGFuZVN0eWxlc1snb3ZlcmZsb3cnXSA9IHZhbHVlID8gJ2hpZGRlbicgOiAnaW5oZXJpdCc7XG4gICAgdGhpcy5ib3R0b21QYW5lU3R5bGVzWydvdmVyZmxvdyddID0gdmFsdWUgPyAnaGlkZGVuJyA6ICdpbmhlcml0JztcbiAgfVxuICBnZXQgbm9TY3JvbGwoKXsgcmV0dXJuIHRoaXMuX25vU2Nyb2xsOyB9XG4gIHByaXZhdGUgX25vU2Nyb2xsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZChcInRvcFBhbmVTZWN0aW9uXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgdG9wUGFuZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJzcGxpdFBhbmVEaXZpZGVyXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgc3BsaXRQYW5lRGl2aWRlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImJvdHRvbVBhbmVTZWN0aW9uXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgYm90dG9tUGFuZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJzcGxpdFBhbmVDb250YWluZXJcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBzcGxpdFBhbmVDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZChUb3BQYW5lQ29tcG9uZW50KSB0b3BQYW5lOiBUb3BQYW5lQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKEJvdHRvbVBhbmVDb21wb25lbnQpIGJvdHRvbVBhbmU6IEJvdHRvbVBhbmVDb21wb25lbnQ7XG5cbiAgZGl2aWRlclN0eWxlczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIHRvcFBhbmVTdHlsZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBib3R0b21QYW5lU3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBkaXZpZGVyQ3NzQ2xhc3MgPSBbXCJzcGxpdC1wYW5lLWRpdmlkZXJcIl07XG5cbiAgcHJpdmF0ZSBfcmVzaXplT246IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGFuZGxlTW91c2VNb3ZlOiAoZXZlbnQpPT52b2lkO1xuICBwcml2YXRlIF9oYW5kbGVNb3VzZURvd246IChldmVudCk9PnZvaWQ7XG4gIHByaXZhdGUgX2hhbmRsZU1vdXNlVXA6IChldmVudCk9PnZvaWQ7XG4gIHByaXZhdGUgX3ByZXZQb3MgPSAtMTtcbiAgcHJpdmF0ZSBfY29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgX2NvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX3VwZGF0ZSA9IGZhbHNlO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB6b25lIEluamVjdCBbW05nWm9uZV1dIHJlZmVyZW5jZVxuICAgKiBAcGFyYW0gY2QgSW5qZWN0IFtbQ2hhbmdlRGV0ZWN0b3JSZWZdXVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcblxuICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSA9ICBfLnRocm90dGxlKChldmVudCk9PntcbiAgICAgIHRoaXMuX3Jlc2l6ZVBhbmVscyhldmVudCk7XG4gICAgfSwxNTApO1xuXG4gICAgdGhpcy5faGFuZGxlTW91c2VEb3duID0gKGV2ZW50KT0+e1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSwgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLl9wcmV2UG9zID0gZXZlbnQucGFnZVg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wcmV2UG9zID0gZXZlbnQucGFnZVk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZXNpemVPbiA9IHRydWU7XG4gICAgICB0aGlzLl91cGRhdGUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5faGFuZGxlTW91c2VVcCA9IChldmVudCk9PntcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSwgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fcmVzaXplT24gPSBmYWxzZTtcbiAgICAgIHRoaXMuX3VwZGF0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBTZXQgcGFuZWwgd2lkdGhcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5zZXRQYW5lV2lkdGgoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG1vdmVVcCgpIHtcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgXCIwJVwiKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib3R0b21QYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIDEzcHgpXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcImNhbGMoMTAwJSAtIDEzcHgpXCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwid2lkdGhcIiwgXCIwJVwiKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBtb3ZlRG93bigpIHtcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSAxM3B4KVwiKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib3R0b21QYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImhlaWdodFwiLCBcIjAlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcIjAlXCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwid2lkdGhcIiwgXCJjYWxjKDEwMCUgLSAxM3B4KVwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhIGNvbnRhaW5lciBjb21wb25lbnRcbiAgICogQHJldHVybnMgVHJ1ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGlzQ29udGFpbmVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBwYW5lIGxheW91dCBhbmQgZGltZW5zaW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBzZXRQYW5lV2lkdGgoKSB7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMuZGl2aWRlclN0eWxlc1tcImhlaWdodFwiXSA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5kaXZpZGVyU3R5bGVzW1wid2lkdGhcIl0gPSBcIjFweFwiO1xuICAgICAgdGhpcy5kaXZpZGVyU3R5bGVzWydmbG9hdCddID0gJ2xlZnQnO1xuICAgICAgdGhpcy50b3BQYW5lU3R5bGVzWyd3aWR0aCddID0gJ2NhbGMoJyArIHRoaXMuc3BsaXRQb3NpdGlvbiArICcgLSAzcHgpJztcbiAgICAgIHRoaXMudG9wUGFuZVN0eWxlc1snaGVpZ2h0J10gPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMudG9wUGFuZVN0eWxlc1snZmxvYXQnXSA9ICdsZWZ0J1xuICAgICAgbGV0IHBlcmNlbnQ6IHN0cmluZyA9IHRoaXMuc3BsaXRQb3NpdGlvbi5zcGxpdCgnJScsIDEpWzBdO1xuICAgICAgbGV0IG5QZXJjZW50ID0gK3BlcmNlbnQ7XG4gICAgICB0aGlzLmJvdHRvbVBhbmVTdHlsZXNbJ3dpZHRoJ10gPSAnY2FsYygnICsgKDEwMCAtIG5QZXJjZW50KSArICclIC0gMTBweCknO1xuICAgICAgdGhpcy5ib3R0b21QYW5lU3R5bGVzWydoZWlnaHQnXSA9IFwiMTAwJVwiO1xuICAgICAgdGhpcy5ib3R0b21QYW5lU3R5bGVzWydmbG9hdCddID0gJ2xlZnQnO1xuICAgICAgdGhpcy5kaXZpZGVyQ3NzQ2xhc3MucHVzaChcInZlcnRpY2FsXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpdmlkZXJTdHlsZXNbXCJoZWlnaHRcIl0gPSBcIjhweFwiO1xuICAgICAgdGhpcy5kaXZpZGVyU3R5bGVzW1wid2lkdGhcIl0gPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMudG9wUGFuZVN0eWxlc1snaGVpZ2h0J10gPSAnY2FsYygnICsgdGhpcy5zcGxpdFBvc2l0aW9uICsgJyAtIDNweCknO1xuICAgICAgdGhpcy50b3BQYW5lU3R5bGVzWyd3aWR0aCddID0gXCIxMDAlXCI7XG4gICAgICBsZXQgcGVyY2VudDogc3RyaW5nID0gdGhpcy5zcGxpdFBvc2l0aW9uLnNwbGl0KCclJywgMSlbMF07XG4gICAgICBsZXQgblBlcmNlbnQgPSArcGVyY2VudDtcbiAgICAgIHRoaXMuYm90dG9tUGFuZVN0eWxlc1snaGVpZ2h0J10gPSAnY2FsYygnICsgKDEwMCAtIG5QZXJjZW50KSArICclIC0gMTBweCknO1xuICAgICAgdGhpcy5ib3R0b21QYW5lU3R5bGVzWyd3aWR0aCddID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmRpdmlkZXJDc3NDbGFzcy5wdXNoKFwiaG9yaXpvbnRhbFwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gQWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgICh0aGlzLnNwbGl0UGFuZURpdmlkZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9oYW5kbGVNb3VzZURvd24sIHRydWUpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVNb3VzZVVwLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBEZXN0cm95IGxpZmVjeWNsZS4gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAodGhpcy5zcGxpdFBhbmVEaXZpZGVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5faGFuZGxlTW91c2VEb3duLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU1vdXNlVXAsIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9oYW5kbGVNb3VzZU1vdmUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5faGFuZGxlTW91c2VEb3duID0gbnVsbDtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZU1vdmUgPSBudWxsO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlVXAgPSBudWxsO1xuXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBwYW5lbCByZXNpemUgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IE1vdXNlIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF9yZXNpemVQYW5lbHMoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX3VwZGF0ZSkge1xuICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lcldpZHRoID09IG51bGwpIHtcbiAgICAgICAgY29uc3QgYyA9ICQodGhpcy5zcGxpdFBhbmVDb250YWluZXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lckhlaWdodCA9IGMuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcldpZHRoID0gYy53aWR0aCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91cGRhdGUgPSB0cnVlO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLl9kb1VwZGF0ZShldmVudCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZSBldmVudC4gVXBkYXRlIHBhbmUgd2lkdGgvaGVpZ2h0XG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBfZG9VcGRhdGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5fcmVzaXplT24gPT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuX3ByZXZQb3MgLSBldmVudC5wYWdlWDtcbiAgICAgICAgY29uc3QgbGVmdFdpZHRoID0gICgkKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCkud2lkdGgoKSAtIGRpZmYpO1xuICAgICAgICB0aGlzLl9jb250YWluZXJXaWR0aCA9ICQodGhpcy5zcGxpdFBhbmVDb250YWluZXIubmF0aXZlRWxlbWVudCkud2lkdGgoKTtcbiAgICAgICAgbGV0IGxlZnQ6IG51bWJlciA9IChsZWZ0V2lkdGggLyB0aGlzLl9jb250YWluZXJXaWR0aCkgKiAxMDA7XG4gICAgICAgIGxldCBtYXhpbXVtOiBudW1iZXIgPSAobGVmdFdpZHRoIC8gKHRoaXMuX2NvbnRhaW5lcldpZHRoIC0gMTUpKSAqIDEwMDtcbiAgICAgICAgaWYoIG1heGltdW0gPiAxMDAgKSB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcImNhbGMoMTAwJSAtIDEzcHgpXCIpO1xuICAgICAgICBlbHNlIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b3BQYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIGxlZnQgKyBcIiVcIik7XG4gICAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib3R0b21QYW5lRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsICh0aGlzLl9jb250YWluZXJXaWR0aCAtIChsZWZ0V2lkdGggKyA2KSkgKyBcInB4XCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm90dG9tUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ3aWR0aFwiLCBcImNhbGMoXCIgKyAoMTAwIC0gbGVmdCkgKyBcIiUgLSAxM3B4KVwiKTtcbiAgICAgICAgdGhpcy5fcHJldlBvcyA9IGV2ZW50LnBhZ2VYO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuX3ByZXZQb3MgLSBldmVudC5wYWdlWTtcbiAgICAgICAgY29uc3QgdG9wSGVpZ2h0ID0gICgkKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCkgLSBkaWZmKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVySGVpZ2h0ID0gJCh0aGlzLnNwbGl0UGFuZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKTtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gKHRvcEhlaWdodCAvIHRoaXMuX2NvbnRhaW5lckhlaWdodCkgKiAxMDA7XG4gICAgICAgIGxldCBtYXhpbXVtOiBudW1iZXIgPSAodG9wSGVpZ2h0IC8gKHRoaXMuX2NvbnRhaW5lckhlaWdodCAtIDE1KSkgKiAxMDA7XG4gICAgICAgIGlmKCBtYXhpbXVtID4gMTAwICkgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvcFBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaGVpZ2h0XCIsIFwiY2FsYygxMDAlIC0gMTNweFwiKTtcbiAgICAgICAgZWxzZSB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9wUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgdG9wICsgXCIlXCIpO1xuICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm90dG9tUGFuZUVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgKHRoaXMuX2NvbnRhaW5lckhlaWdodCAtICh0b3BIZWlnaHQgKyAxMCkpICsgXCJweFwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvdHRvbVBhbmVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaGVpZ2h0XCIsIFwiY2FsYyhcIiArICgxMDAgLSB0b3ApICsgXCIlIC0gMTNweClcIik7XG4gICAgICAgIHRoaXMuX3ByZXZQb3MgPSBldmVudC5wYWdlWTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdXBkYXRlID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=