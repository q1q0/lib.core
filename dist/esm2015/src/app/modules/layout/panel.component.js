/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Optional, SkipSelf, ElementRef, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AttributesEnum } from '../base/attributes.enum';
import * as _ from "lodash";
export class PanelComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} cd
     * @param {?} renderer
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        /**
         * For escaping unneeded row & fluid container. This is a trikcy option.
         * Almost case, fluid container is not needed. it's too late...
         * \@property {boolean}
         */
        this.noGutter = false;
        /**
         * For escaping fluid container. This is a trikcy option.
         * should be validated by `(layout !== 'grid')` . it's too late...
         * \@property {boolean}
         */
        this.noGrid = false;
        this.panelClasses = ['vt-panel'];
        this.panelStyles = {};
        // 画面リサイズ対応 Start
        this.resizeComponent = false;
        this.resizeMarginTop = null;
        this.resizeHeight = null;
        this.divHeight = null;
        // 画面リサイズ対応 End
        // 画面のレイアウト固定化対応 Start
        this.contentDisplayWidth = null;
    }
    /**
     * @param {?} children
     * @return {?}
     */
    set childrenList(children) {
        this.resetChildIndexes(children.filter(child => child !== this));
    }
    /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.cssClass != null) {
            this.cssClass.split(' ').forEach(css => this.panelClasses.push(css));
        }
        if (this.containerLayout === true && !this.noGrid && !this.noGutter) {
            this.panelClasses.push('container-fluid');
        }
        /*if (!this.borderColor) {
              this.borderColor = 'transparent';
            }*/
        if (this.borderWidth) {
            this.borderWidth = this.borderWidth + 'px';
            this.borderStyle = 'solid';
            if (this.borderColor == null) {
                this.borderColor = '#ffffff';
            }
        }
        if (this.controlHeight == null) {
            this.controlHeight = '100%';
        }
        this.setVisible(this.visible);
        // 画面リサイズ対応 Start
        if (this.resizeComponent) {
            this.resizeHeight = "calc(100% - " + this.resizeMarginTop + "px)";
            this.divHeight = "100%";
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle();
        this.cd.detectChanges();
    }
    /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    resetChildIndexes(childrenList) {
        if (childrenList != null && childrenList.length > 0) {
            if (this._childrenIndex !== null) {
                this._childrenIndex = _.uniq(_.concat(childrenList.map(child => child.getId()), this._childrenIndex));
            }
        }
    }
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    initWidthHeightStyle(heightStyleName = 'height', widthStyleName = 'max-width') {
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.panelStyles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.panelStyles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        this.getChildren().toArray().forEach(item => {
            item.setAttribute(AttributesEnum.DISABLED, boo);
        });
    }
    /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    setVisible(boo) {
        this.visible = boo;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
    /**
     * Check if [[caption]] property exists and is set
     * @return {?} True if caption exists and has content, otherwise false
     */
    get hasCaption() {
        return this.caption != null && this.caption.length > 0;
    }
    /**
     * Check if [[layout]] property exists
     * @return {?} True if layout exists, otherwise false
     */
    get containerLayout() {
        return this.layout != null;
    }
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    isContainer() {
        return true;
    }
    /**
     * @return {?}
     */
    getNxTagName() {
        return "panel";
    }
}
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-panel',
                template: "<div [id]=\"id\"\n  [style.color]=\"fontColor\"\n  [style.borderColor]=\"borderColor\"\n  [style.borderWidth]=\"borderWidth\"\n  [style.borderStyle]=\"borderStyle\"\n  [style.height]=\"resizeHeight\"\n  [style.overflow]=\"controlOverflow\"\n  [style.width.px]=\"panelWidth\"\n  [style.min-width.px]=\"panelMinWidth\"\n  [style.min-height]=\"panelMinHeight\"\n  [style.float]=\"controlFloat\"\n  [style.margin-left]=\"marginLeft\"\n  [ngClass]=\"panelClasses\">\n  <h1 *ngIf=\"hasCaption === true\" class=\"panel-caption\">{{caption}}</h1>\n  <div class=\"{{noGrid ?'':'row'}} {{noGutter ?'row-no-gutters':''}}\" [style.height]=\"divHeight\" [style.width.px]=\"contentDisplayWidth\" [style.padding]=\"controlPadding\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => PanelComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
PanelComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
PanelComponent.propDecorators = {
    layout: [{ type: Input }],
    caption: [{ type: Input }],
    evenlySpace: [{ type: Input }],
    noGutter: [{ type: Input }],
    noGrid: [{ type: Input }],
    childrenList: [{ type: ContentChildren, args: [BaseComponent,] }],
    resizeComponent: [{ type: Input }],
    resizeMarginTop: [{ type: Input }],
    contentDisplayWidth: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PanelComponent.prototype.layout;
    /** @type {?} */
    PanelComponent.prototype.caption;
    /** @type {?} */
    PanelComponent.prototype.evenlySpace;
    /**
     * For escaping unneeded row & fluid container. This is a trikcy option.
     * Almost case, fluid container is not needed. it's too late...
     * \@property {boolean}
     * @type {?}
     */
    PanelComponent.prototype.noGutter;
    /**
     * For escaping fluid container. This is a trikcy option.
     * should be validated by `(layout !== 'grid')` . it's too late...
     * \@property {boolean}
     * @type {?}
     */
    PanelComponent.prototype.noGrid;
    /** @type {?} */
    PanelComponent.prototype.panelClasses;
    /** @type {?} */
    PanelComponent.prototype.panelStyles;
    /** @type {?} */
    PanelComponent.prototype.resizeComponent;
    /** @type {?} */
    PanelComponent.prototype.resizeMarginTop;
    /** @type {?} */
    PanelComponent.prototype.resizeHeight;
    /** @type {?} */
    PanelComponent.prototype.divHeight;
    /** @type {?} */
    PanelComponent.prototype.contentDisplayWidth;
    /** @type {?} */
    PanelComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFNLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBYzVCLE1BQU0scUJBQXNCLFNBQVEsYUFBYTs7Ozs7Ozs7SUFtQy9DLFlBQW9DLE1BQXFCLEVBQUUsY0FBOEIsRUFBRSxVQUFzQixFQUFVLEVBQXFCLEVBQUUsUUFBbUI7UUFDbkssS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRHFFLE9BQUUsR0FBRixFQUFFLENBQW1COzs7Ozs7d0JBMUJuSCxLQUFLOzs7Ozs7c0JBTVAsS0FBSzs0QkFNRixDQUFDLFVBQVUsQ0FBQzsyQkFDRixFQUFFOzsrQkFHTixLQUFLOytCQUNOLElBQUk7NEJBQ2hCLElBQUk7eUJBQ1AsSUFBSTs7O21DQUllLElBQUk7S0FLMUM7Ozs7O0lBcEJELElBQW9DLFlBQVksQ0FBQyxRQUFrQztRQUNqRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsRUFBRSxDQUFBLEtBQUss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QUNwQixPQUFPLE9BQU8sQ0FBQztLQUNoQjs7O1lBaE1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsNHdCQUFxQztnQkFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxjQUFjLENBQUM7cUJBQzVDO2lCQUNGOzthQUNGOzs7O1lBakJRLGFBQWEsdUJBcURQLFFBQVEsWUFBSSxRQUFRO1lBcEQxQixjQUFjO1lBRmdDLFVBQVU7WUFBcUYsaUJBQWlCO1lBQUUsU0FBUzs7O3FCQW9CL0ssS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBTUwsS0FBSztxQkFNTCxLQUFLOzJCQUVMLGVBQWUsU0FBQyxhQUFhOzhCQVE3QixLQUFLOzhCQUNMLEtBQUs7a0NBTUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmLCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgZm9yd2FyZFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQm9yZGVyUG9zaXRpb24sIExheW91dCB9IGZyb20gJy4uL2Jhc2Uvc3R5bGUtbGl0ZXJhbHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tICcuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYW5lbC5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlBhbmVsQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBsYXlvdXQ6IExheW91dDtcbiAgQElucHV0KCkgY2FwdGlvbjogU3RyaW5nO1xuICBASW5wdXQoKSBldmVubHlTcGFjZTogYm9vbGVhbjsgLy9UT0RPIG5vdCBzdXJlIHdoYXQgdGhpcyBpcyBmb3JcbiAgLyoqXG4gICAqIEZvciBlc2NhcGluZyB1bm5lZWRlZCByb3cgJiBmbHVpZCBjb250YWluZXIuIFRoaXMgaXMgYSB0cmlrY3kgb3B0aW9uLlxuICAgKiBBbG1vc3QgY2FzZSwgZmx1aWQgY29udGFpbmVyIGlzIG5vdCBuZWVkZWQuIGl0J3MgdG9vIGxhdGUuLi5cbiAgICogQHByb3BlcnR5IHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KCkgbm9HdXR0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICogRm9yIGVzY2FwaW5nIGZsdWlkIGNvbnRhaW5lci4gVGhpcyBpcyBhIHRyaWtjeSBvcHRpb24uXG4gICAqIHNob3VsZCBiZSB2YWxpZGF0ZWQgYnkgYChsYXlvdXQgIT09ICdncmlkJylgIC4gaXQncyB0b28gbGF0ZS4uLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKSBub0dyaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy9jaGlsZHJlbiBsaXN0IHRvIGtlZXAgaW5kZXhlc1xuICBAQ29udGVudENoaWxkcmVuKEJhc2VDb21wb25lbnQpIHNldCBjaGlsZHJlbkxpc3QoY2hpbGRyZW46IFF1ZXJ5TGlzdDxCYXNlQ29tcG9uZW50Pikge1xuICAgIHRoaXMucmVzZXRDaGlsZEluZGV4ZXMoY2hpbGRyZW4uZmlsdGVyKGNoaWxkPT5jaGlsZCAhPT0gdGhpcykpO1xuICB9XG5cbiAgcGFuZWxDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gWyd2dC1wYW5lbCddO1xuICBwYW5lbFN0eWxlczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgLy8g55S76Z2i44Oq44K144Kk44K65a++5b+cIFN0YXJ0XG4gIEBJbnB1dCgpIHJlc2l6ZUNvbXBvbmVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSByZXNpemVNYXJnaW5Ub3A6IHN0cmluZyA9IG51bGw7XG4gIHJlc2l6ZUhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgZGl2SGVpZ2h0OiBzdHJpbmcgPSBudWxsO1xuICAvLyDnlLvpnaLjg6rjgrXjgqTjgrrlr77lv5wgRW5kXG5cbiAgLy8g55S76Z2i44Gu44Os44Kk44Ki44Km44OI5Zu65a6a5YyW5a++5b+cIFN0YXJ0XG4gIEBJbnB1dCgpIGNvbnRlbnREaXNwbGF5V2lkdGg6IHN0cmluZyA9IG51bGw7XG4gIC8vIOeUu+mdouOBruODrOOCpOOCouOCpuODiOWbuuWumuWMluWvvuW/nCBFbmRcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIFNldCBkaW1lbnNpb25zIGFuZCBjc3Mgc3R5bGVzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgaWYgKHRoaXMuY3NzQ2xhc3MgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jc3NDbGFzcy5zcGxpdCgnICcpLmZvckVhY2goY3NzPT50aGlzLnBhbmVsQ2xhc3Nlcy5wdXNoKGNzcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRhaW5lckxheW91dCA9PT0gdHJ1ZSAmJiAhdGhpcy5ub0dyaWQgJiYgIXRoaXMubm9HdXR0ZXIpIHtcbiAgICAgIHRoaXMucGFuZWxDbGFzc2VzLnB1c2goJ2NvbnRhaW5lci1mbHVpZCcpO1xuICAgIH1cblxuICAgIC8qaWYgKCF0aGlzLmJvcmRlckNvbG9yKSB7XG4gICAgICB0aGlzLmJvcmRlckNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICB9Ki9cblxuICAgIGlmICh0aGlzLmJvcmRlcldpZHRoKSB7XG4gICAgICB0aGlzLmJvcmRlcldpZHRoID0gdGhpcy5ib3JkZXJXaWR0aCArICdweCc7XG4gICAgICB0aGlzLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcblxuICAgICAgIGlmKHRoaXMuYm9yZGVyQ29sb3IgPT0gbnVsbCl7XG4gICAgICAgICB0aGlzLmJvcmRlckNvbG9yID0gJyNmZmZmZmYnO1xuICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuY29udHJvbEhlaWdodCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmNvbnRyb2xIZWlnaHQgPSAnMTAwJSc7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRWaXNpYmxlKHRoaXMudmlzaWJsZSk7XG5cbiAgICAvLyDnlLvpnaLjg6rjgrXjgqTjgrrlr77lv5wgU3RhcnRcbiAgICBpZiAodGhpcy5yZXNpemVDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucmVzaXplSGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSBcIiArIHRoaXMucmVzaXplTWFyZ2luVG9wICsgXCJweClcIjtcbiAgICAgIHRoaXMuZGl2SGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFyZ2luTGVmdCkge1xuICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gdGhpcy5tYXJnaW5MZWZ0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gU2V0IGRpbWVuc2lvbnMgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgdGhpcy5pbml0V2lkdGhIZWlnaHRTdHlsZSgpO1xuXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGNoaWxkcmVuTGlzdCBVcGRhdGUgbGlzdCBvZiBjaGlsZHJlbiBpZHNcbiAgICovXG4gIHByaXZhdGUgcmVzZXRDaGlsZEluZGV4ZXMoY2hpbGRyZW5MaXN0OiBBcnJheTxCYXNlQ29tcG9uZW50Pikge1xuICAgIGlmIChjaGlsZHJlbkxpc3QgIT0gbnVsbCAmJiBjaGlsZHJlbkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW5JbmRleCA9IF8udW5pcShfLmNvbmNhdChjaGlsZHJlbkxpc3QubWFwKGNoaWxkPT5jaGlsZC5nZXRJZCgpKSwgdGhpcy5fY2hpbGRyZW5JbmRleCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZGltZW5zaW9ucyBvZiBwYW5lbCBiYXNlZCBvbiBbW2NvbnRyb2xIZWlnaHRdXSBhbmQgW1tjb250cm9sV2lkdGhdXSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSBoZWlnaHRTdHlsZU5hbWVcbiAgICogQHBhcmFtIHdpZHRoU3R5bGVOYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgaW5pdFdpZHRoSGVpZ2h0U3R5bGUoaGVpZ2h0U3R5bGVOYW1lOiBzdHJpbmcgPSAnaGVpZ2h0Jywgd2lkdGhTdHlsZU5hbWU6IHN0cmluZyA9ICdtYXgtd2lkdGgnKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbEhlaWdodCAhPSBudWxsICYmIHRoaXMuY29udHJvbEhlaWdodCAhPSBcIlwiICYmIHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgPiAwKSB7XG4gICAgICB0aGlzLnBhbmVsU3R5bGVzW1wiaGVpZ2h0XCJdID0gcGFyc2VJbnQodGhpcy5jb250cm9sSGVpZ2h0KSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250cm9sV2lkdGggIT0gbnVsbCAmJiB0aGlzLmNvbnRyb2xXaWR0aCAhPSBcIlwiICYmIHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoKSA+IDApIHtcbiAgICAgIHRoaXMucGFuZWxTdHlsZXNbd2lkdGhTdHlsZU5hbWVdID0gcGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGgpICsgXCJweFwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tkaXNhYmxlZF1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBib28gVG9nZ2xlIGRpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZChib286IGJvb2xlYW4pe1xuICAgIHRoaXMuZGlzYWJsZWQgPSBib287XG4gICAgdGhpcy5nZXRDaGlsZHJlbigpLnRvQXJyYXkoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uRElTQUJMRUQsIGJvbyk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1t2aXNpYmxlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBUb2dnbGUgdmlzaWJpbGl0eVxuICAgKi9cbiAgc2V0VmlzaWJsZShib286IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc2libGUgPSBib287XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVDc3NDbGFzcygnaGlkZGVuJyk7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENzc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBbW2NhcHRpb25dXSBwcm9wZXJ0eSBleGlzdHMgYW5kIGlzIHNldFxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGNhcHRpb24gZXhpc3RzIGFuZCBoYXMgY29udGVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBnZXQgaGFzQ2FwdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYXB0aW9uICE9IG51bGwgJiYgdGhpcy5jYXB0aW9uLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgW1tsYXlvdXRdXSBwcm9wZXJ0eSBleGlzdHNcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBsYXlvdXQgZXhpc3RzLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIGdldCBjb250YWluZXJMYXlvdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ICE9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBbW2NkXV0gKENoYW5nZURldGVjdG9yUmVmKSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBDaGFuZ2UgZGV0ZWN0b3IgZm9yIHRoaXMgcGFuZWxcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBvciBub3QgdGhpcyBjb21wb25lbnQgaXMgYSBjb250YWluZXJcbiAgICogQHJldHVybnMgVHJ1ZSBzaW5jZSBwYW5lbHMgYXJlIGFsd2F5cyBjb250YWluZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwicGFuZWxcIjtcbiAgfVxufVxuIl19