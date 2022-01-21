/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Optional, SkipSelf, ElementRef, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AttributesEnum } from '../base/attributes.enum';
import * as _ from "lodash";
var PanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanelComponent, _super);
    // 画面のレイアウト固定化対応 End
    function PanelComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        /**
         * For escaping unneeded row & fluid container. This is a trikcy option.
         * Almost case, fluid container is not needed. it's too late...
         * \@property {boolean}
         */
        _this.noGutter = false;
        /**
         * For escaping fluid container. This is a trikcy option.
         * should be validated by `(layout !== 'grid')` . it's too late...
         * \@property {boolean}
         */
        _this.noGrid = false;
        _this.panelClasses = ['vt-panel'];
        _this.panelStyles = {};
        // 画面リサイズ対応 Start
        _this.resizeComponent = false;
        _this.resizeMarginTop = null;
        _this.resizeHeight = null;
        _this.divHeight = null;
        // 画面リサイズ対応 End
        // 画面のレイアウト固定化対応 Start
        _this.contentDisplayWidth = null;
        return _this;
    }
    Object.defineProperty(PanelComponent.prototype, "childrenList", {
        //children list to keep indexes
        set: /**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            var _this = this;
            this.resetChildIndexes(children.filter(function (child) { return child !== _this; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Set dimensions and css styles
     */
    /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    PanelComponent.prototype.ngOnInit = /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.cssClass != null) {
            this.cssClass.split(' ').forEach(function (css) { return _this.panelClasses.push(css); });
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
    };
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    PanelComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.initWidthHeightStyle();
        this.cd.detectChanges();
    };
    /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    PanelComponent.prototype.resetChildIndexes = /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    function (childrenList) {
        if (childrenList != null && childrenList.length > 0) {
            if (this._childrenIndex !== null) {
                this._childrenIndex = _.uniq(_.concat(childrenList.map(function (child) { return child.getId(); }), this._childrenIndex));
            }
        }
    };
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param heightStyleName
     * @param widthStyleName
     */
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    PanelComponent.prototype.initWidthHeightStyle = /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    function (heightStyleName, widthStyleName) {
        if (heightStyleName === void 0) { heightStyleName = 'height'; }
        if (widthStyleName === void 0) { widthStyleName = 'max-width'; }
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.panelStyles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.panelStyles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    };
    /**
     * Set [[disabled]] property value
     * @param boo Toggle disabled
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    PanelComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        this.getChildren().toArray().forEach(function (item) {
            item.setAttribute(AttributesEnum.DISABLED, boo);
        });
    };
    /**
     * Set [[visible]] property value
     * @param boo Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    PanelComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    function (boo) {
        this.visible = boo;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
    Object.defineProperty(PanelComponent.prototype, "hasCaption", {
        /**
         * Check if [[caption]] property exists and is set
         * @returns True if caption exists and has content, otherwise false
         */
        get: /**
         * Check if [[caption]] property exists and is set
         * @return {?} True if caption exists and has content, otherwise false
         */
        function () {
            return this.caption != null && this.caption.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "containerLayout", {
        /**
         * Check if [[layout]] property exists
         * @returns True if layout exists, otherwise false
         */
        get: /**
         * Check if [[layout]] property exists
         * @return {?} True if layout exists, otherwise false
         */
        function () {
            return this.layout != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @returns Change detector for this panel
     */
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    PanelComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    function () {
        return this.cd;
    };
    /**
     * Check whether or not this component is a container
     * @returns True since panels are always containers
     */
    /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    PanelComponent.prototype.isContainer = /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    PanelComponent.prototype.getNxTagName = /**
     * @return {?}
     */
    function () {
        return "panel";
    };
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-panel',
                    template: "<div [id]=\"id\"\n  [style.color]=\"fontColor\"\n  [style.borderColor]=\"borderColor\"\n  [style.borderWidth]=\"borderWidth\"\n  [style.borderStyle]=\"borderStyle\"\n  [style.height]=\"resizeHeight\"\n  [style.overflow]=\"controlOverflow\"\n  [style.width.px]=\"panelWidth\"\n  [style.min-width.px]=\"panelMinWidth\"\n  [style.min-height]=\"panelMinHeight\"\n  [style.float]=\"controlFloat\"\n  [style.margin-left]=\"marginLeft\"\n  [ngClass]=\"panelClasses\">\n  <h1 *ngIf=\"hasCaption === true\" class=\"panel-caption\">{{caption}}</h1>\n  <div class=\"{{noGrid ?'':'row'}} {{noGutter ?'row-no-gutters':''}}\" [style.height]=\"divHeight\" [style.width.px]=\"contentDisplayWidth\" [style.padding]=\"controlPadding\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return PanelComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PanelComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return PanelComponent;
}(BaseComponent));
export { PanelComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsVUFBVSxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7SUFjUSwwQ0FBYTtJQWlDL0Msb0JBQW9CO0lBRXBCLHdCQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQXJLLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQ3BEO1FBRjBILFFBQUUsR0FBRixFQUFFLENBQW1COzs7Ozs7eUJBMUJuSCxLQUFLOzs7Ozs7dUJBTVAsS0FBSzs2QkFNRixDQUFDLFVBQVUsQ0FBQzs0QkFDRixFQUFFOztnQ0FHTixLQUFLO2dDQUNOLElBQUk7NkJBQ2hCLElBQUk7MEJBQ1AsSUFBSTs7O29DQUllLElBQUk7O0tBSzFDO0lBcEJELHNCQUFvQyx3Q0FBWTtRQURoRCwrQkFBK0I7Ozs7O1FBQy9CLFVBQWlELFFBQWtDO1lBQW5GLGlCQUVDO1lBREMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENB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SUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEOzs7T0FBQTtJQU1ELHNCQUFJLDJDQUFlO1FBSm5COzs7V0FHRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7U0FDNUI7OztPQUFBO0lBRUQ7OztPQUdHOzs7OztJQUNPLDBDQUFpQjs7OztJQUEzQjtRQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjtJQUVEOzs7T0FHRzs7Ozs7SUFDTyxvQ0FBVzs7OztJQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7SUFFUyxxQ0FBWTs7O0lBQXRCO1FBQ0UsT0FBTyxPQUFPLENBQUM7S0FDaEI7O2dCQWhNRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLDR3QkFBcUM7b0JBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUM7eUJBQzVDO3FCQUNGOztpQkFDRjs7OztnQkFqQlEsYUFBYSx1QkFxRFAsUUFBUSxZQUFJLFFBQVE7Z0JBcEQxQixjQUFjO2dCQUZnQyxVQUFVO2dCQUFxRixpQkFBaUI7Z0JBQUUsU0FBUzs7O3lCQW9CL0ssS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBTUwsS0FBSzt5QkFNTCxLQUFLOytCQUVMLGVBQWUsU0FBQyxhQUFhO2tDQVE3QixLQUFLO2tDQUNMLEtBQUs7c0NBTUwsS0FBSzs7eUJBbkRSO0VBbUJvQyxhQUFhO1NBQXBDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZiwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIGZvcndhcmRSZWYsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEJvcmRlclBvc2l0aW9uLCBMYXlvdXQgfSBmcm9tICcuLi9iYXNlL3N0eWxlLWxpdGVyYWxzJztcbmltcG9ydCB7IEF0dHJpYnV0ZXNFbnVtIH0gZnJvbSAnLi4vYmFzZS9hdHRyaWJ1dGVzLmVudW0nO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFuZWwuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5QYW5lbENvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbGF5b3V0OiBMYXlvdXQ7XG4gIEBJbnB1dCgpIGNhcHRpb246IFN0cmluZztcbiAgQElucHV0KCkgZXZlbmx5U3BhY2U6IGJvb2xlYW47IC8vVE9ETyBub3Qgc3VyZSB3aGF0IHRoaXMgaXMgZm9yXG4gIC8qKlxuICAgKiBGb3IgZXNjYXBpbmcgdW5uZWVkZWQgcm93ICYgZmx1aWQgY29udGFpbmVyLiBUaGlzIGlzIGEgdHJpa2N5IG9wdGlvbi5cbiAgICogQWxtb3N0IGNhc2UsIGZsdWlkIGNvbnRhaW5lciBpcyBub3QgbmVlZGVkLiBpdCdzIHRvbyBsYXRlLi4uXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpIG5vR3V0dGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAqIEZvciBlc2NhcGluZyBmbHVpZCBjb250YWluZXIuIFRoaXMgaXMgYSB0cmlrY3kgb3B0aW9uLlxuICAgKiBzaG91bGQgYmUgdmFsaWRhdGVkIGJ5IGAobGF5b3V0ICE9PSAnZ3JpZCcpYCAuIGl0J3MgdG9vIGxhdGUuLi5cbiAgICogQHByb3BlcnR5IHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KCkgbm9HcmlkOiBib29sZWFuID0gZmFsc2U7XG4gIC8vY2hpbGRyZW4gbGlzdCB0byBrZWVwIGluZGV4ZXNcbiAgQENvbnRlbnRDaGlsZHJlbihCYXNlQ29tcG9uZW50KSBzZXQgY2hpbGRyZW5MaXN0KGNoaWxkcmVuOiBRdWVyeUxpc3Q8QmFzZUNvbXBvbmVudD4pIHtcbiAgICB0aGlzLnJlc2V0Q2hpbGRJbmRleGVzKGNoaWxkcmVuLmZpbHRlcihjaGlsZD0+Y2hpbGQgIT09IHRoaXMpKTtcbiAgfVxuXG4gIHBhbmVsQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFsndnQtcGFuZWwnXTtcbiAgcGFuZWxTdHlsZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIC8vIOeUu+mdouODquOCteOCpOOCuuWvvuW/nCBTdGFydFxuICBASW5wdXQoKSByZXNpemVDb21wb25lbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcmVzaXplTWFyZ2luVG9wOiBzdHJpbmcgPSBudWxsO1xuICByZXNpemVIZWlnaHQ6IHN0cmluZyA9IG51bGw7XG4gIGRpdkhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgLy8g55S76Z2i44Oq44K144Kk44K65a++5b+cIEVuZFxuXG4gIC8vIOeUu+mdouOBruODrOOCpOOCouOCpuODiOWbuuWumuWMluWvvuW/nCBTdGFydFxuICBASW5wdXQoKSBjb250ZW50RGlzcGxheVdpZHRoOiBzdHJpbmcgPSBudWxsO1xuICAvLyDnlLvpnaLjga7jg6zjgqTjgqLjgqbjg4jlm7rlrprljJblr77lv5wgRW5kXG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBTZXQgZGltZW5zaW9ucyBhbmQgY3NzIHN0eWxlc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIGlmICh0aGlzLmNzc0NsYXNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY3NzQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKGNzcz0+dGhpcy5wYW5lbENsYXNzZXMucHVzaChjc3MpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250YWluZXJMYXlvdXQgPT09IHRydWUgJiYgIXRoaXMubm9HcmlkICYmICF0aGlzLm5vR3V0dGVyKSB7XG4gICAgICB0aGlzLnBhbmVsQ2xhc3Nlcy5wdXNoKCdjb250YWluZXItZmx1aWQnKTtcbiAgICB9XG5cbiAgICAvKmlmICghdGhpcy5ib3JkZXJDb2xvcikge1xuICAgICAgdGhpcy5ib3JkZXJDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgfSovXG5cbiAgICBpZiAodGhpcy5ib3JkZXJXaWR0aCkge1xuICAgICAgdGhpcy5ib3JkZXJXaWR0aCA9IHRoaXMuYm9yZGVyV2lkdGggKyAncHgnO1xuICAgICAgdGhpcy5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG5cbiAgICAgICBpZih0aGlzLmJvcmRlckNvbG9yID09IG51bGwpe1xuICAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRyb2xIZWlnaHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250cm9sSGVpZ2h0ID0gJzEwMCUnO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VmlzaWJsZSh0aGlzLnZpc2libGUpO1xuXG4gICAgLy8g55S76Z2i44Oq44K144Kk44K65a++5b+cIFN0YXJ0XG4gICAgaWYgKHRoaXMucmVzaXplQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnJlc2l6ZUhlaWdodCA9IFwiY2FsYygxMDAlIC0gXCIgKyB0aGlzLnJlc2l6ZU1hcmdpblRvcCArIFwicHgpXCI7XG4gICAgICB0aGlzLmRpdkhlaWdodCA9IFwiMTAwJVwiO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hcmdpbkxlZnQpIHtcbiAgICAgIHRoaXMubWFyZ2luTGVmdCA9IHRoaXMubWFyZ2luTGVmdCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUuIFNldCBkaW1lbnNpb25zIGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcblxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBjaGlsZHJlbkxpc3QgVXBkYXRlIGxpc3Qgb2YgY2hpbGRyZW4gaWRzXG4gICAqL1xuICBwcml2YXRlIHJlc2V0Q2hpbGRJbmRleGVzKGNoaWxkcmVuTGlzdDogQXJyYXk8QmFzZUNvbXBvbmVudD4pIHtcbiAgICBpZiAoY2hpbGRyZW5MaXN0ICE9IG51bGwgJiYgY2hpbGRyZW5MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuSW5kZXggPSBfLnVuaXEoXy5jb25jYXQoY2hpbGRyZW5MaXN0Lm1hcChjaGlsZD0+Y2hpbGQuZ2V0SWQoKSksIHRoaXMuX2NoaWxkcmVuSW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRpbWVuc2lvbnMgb2YgcGFuZWwgYmFzZWQgb24gW1tjb250cm9sSGVpZ2h0XV0gYW5kIFtbY29udHJvbFdpZHRoXV0gcHJvcGVydGllc1xuICAgKiBAcGFyYW0gaGVpZ2h0U3R5bGVOYW1lXG4gICAqIEBwYXJhbSB3aWR0aFN0eWxlTmFtZVxuICAgKi9cbiAgcHJvdGVjdGVkIGluaXRXaWR0aEhlaWdodFN0eWxlKGhlaWdodFN0eWxlTmFtZTogc3RyaW5nID0gJ2hlaWdodCcsIHdpZHRoU3R5bGVOYW1lOiBzdHJpbmcgPSAnbWF4LXdpZHRoJykge1xuICAgIGlmICh0aGlzLmNvbnRyb2xIZWlnaHQgIT0gbnVsbCAmJiB0aGlzLmNvbnRyb2xIZWlnaHQgIT0gXCJcIiAmJiBwYXJzZUludCh0aGlzLmNvbnRyb2xIZWlnaHQpID4gMCkge1xuICAgICAgdGhpcy5wYW5lbFN0eWxlc1tcImhlaWdodFwiXSA9IHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbFdpZHRoICE9IG51bGwgJiYgdGhpcy5jb250cm9sV2lkdGggIT0gXCJcIiAmJiBwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aCkgPiAwKSB7XG4gICAgICB0aGlzLnBhbmVsU3R5bGVzW3dpZHRoU3R5bGVOYW1lXSA9IHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoKSArIFwicHhcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbZGlzYWJsZWRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gYm9vIFRvZ2dsZSBkaXNhYmxlZFxuICAgKi9cbiAgc2V0RGlzYWJsZWQoYm9vOiBib29sZWFuKXtcbiAgICB0aGlzLmRpc2FibGVkID0gYm9vO1xuICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS50b0FycmF5KCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVELCBib28pO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbdmlzaWJsZV1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBib28gVG9nZ2xlIHZpc2liaWxpdHlcbiAgICovXG4gIHNldFZpc2libGUoYm9vOiBib29sZWFuKSB7XG4gICAgdGhpcy52aXNpYmxlID0gYm9vO1xuICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDc3NDbGFzcygnaGlkZGVuJyk7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgW1tjYXB0aW9uXV0gcHJvcGVydHkgZXhpc3RzIGFuZCBpcyBzZXRcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBjYXB0aW9uIGV4aXN0cyBhbmQgaGFzIGNvbnRlbnQsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgZ2V0IGhhc0NhcHRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FwdGlvbiAhPSBudWxsICYmIHRoaXMuY2FwdGlvbi5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIFtbbGF5b3V0XV0gcHJvcGVydHkgZXhpc3RzXG4gICAqIEByZXR1cm5zIFRydWUgaWYgbGF5b3V0IGV4aXN0cywgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBnZXQgY29udGFpbmVyTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCAhPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1tjZF1dIChDaGFuZ2VEZXRlY3RvclJlZikgcHJvcGVydHlcbiAgICogQHJldHVybnMgQ2hhbmdlIGRldGVjdG9yIGZvciB0aGlzIHBhbmVsXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9uZW50IGlzIGEgY29udGFpbmVyXG4gICAqIEByZXR1cm5zIFRydWUgc2luY2UgcGFuZWxzIGFyZSBhbHdheXMgY29udGFpbmVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIGlzQ29udGFpbmVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcInBhbmVsXCI7XG4gIH1cbn1cbiJdfQ==