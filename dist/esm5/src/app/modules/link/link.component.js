/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SkipSelf, Optional, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for a link component
 */
var LinkComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LinkComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector reference for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    function LinkComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(LinkComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.opacity = value ? '0.3' : '1.0';
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Calls parent init method
     */
    /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    LinkComponent.prototype.ngOnInit = /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * @event OnCommand
     */
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    LinkComponent.prototype.onClick = /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    function () {
        if (!this.disabled)
            this.onCommand.emit();
    };
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param e Keyboard Event
     */
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    LinkComponent.prototype.onKeyUp = /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    function (e) {
        // if ENTER key
        if (e.keyCode === 13) {
            this.onClick();
        }
    };
    /**
     * Get the JSON representation for panel
     */
    /**
     * Get the JSON representation for panel
     * @return {?}
     */
    LinkComponent.prototype.toJson = /**
     * Get the JSON representation for panel
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        if (json["customAttributes"] == null) {
            json["customAttributes"] = {};
        }
        this.setJson(json["customAttributes"], "idName", this.idName);
        return json;
    };
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @returns Value of [[cd]] property
     */
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    LinkComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    function () {
        return this.cd;
    };
    LinkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-link',
                    template: "<span [id]=\"id\" class=\"vt-link {{ cssClass }}\" (click)=\"onClick()\"\n  (keyup)=\"onKeyUp($event)\"\n  [style.color]=\"fontColor\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  tabindex=\"0\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.opacity]=\"opacity\">\n  {{ text }}\n  <div *ngIf=\"innerhtml && innerhtml.length > 0\" [innerHTML]=\"innerhtml\"></div>\n</span>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return LinkComponent; })
                        }
                    ],
                    styles: [".vt-link{text-decoration:underline;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    LinkComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    LinkComponent.propDecorators = {
        idName: [{ type: Input }],
        onCommand: [{ type: Output }],
        disabled: [{ type: Input, args: ['disabled',] }],
        innerhtml: [{ type: Input, args: ['innerhtml',] }]
    };
    return LinkComponent;
}(BaseComponent));
export { LinkComponent };
if (false) {
    /** @type {?} */
    LinkComponent.prototype.idName;
    /** @type {?} */
    LinkComponent.prototype.onCommand;
    /** @type {?} */
    LinkComponent.prototype._disabled;
    /** @type {?} */
    LinkComponent.prototype.innerhtml;
    /** @type {?} */
    LinkComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xpbmsvbGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFpQnpCLHlDQUFhO0lBSTlDOzs7Ozs7O09BT0c7SUFDSCx1QkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQjtRQUFySyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDtRQUYwSCxRQUFFLEdBQUYsRUFBRSxDQUFtQjswQkFWMUgsSUFBSSxZQUFZLEVBQUU7O0tBWXZDO0lBSUQsc0JBQUksbUNBQVE7Ozs7UUFBWixjQUFlLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzs7OztRQUN2QyxVQUNhLEtBQUs7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3hCOzs7T0FMc0M7SUFRdkM7O09BRUc7Ozs7O0lBQ0gsZ0NBQVE7Ozs7SUFBUjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ2xCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQkFBTzs7Ozs7SUFBUDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3pCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwrQkFBTzs7Ozs7SUFBUCxVQUFRLENBQWdCOztRQUV0QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtLQUNGO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOEJBQU07Ozs7SUFBTjs7UUFDRSxJQUFNLElBQUksR0FBUSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUVqQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUQsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7SUFDTyx5Q0FBaUI7Ozs7SUFBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDaEI7O2dCQXRGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLG9ZQUFvQztvQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFJLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQzt5QkFDM0M7cUJBQ0Y7O2lCQUNGOzs7O2dCQWpCUSxhQUFhLHVCQThCUCxRQUFRLFlBQUksUUFBUTtnQkE3QjFCLGNBQWM7Z0JBRmtDLFVBQVU7Z0JBQStDLGlCQUFpQjtnQkFBRSxTQUFTOzs7eUJBb0IzSSxLQUFLOzRCQUNMLE1BQU07MkJBaUJOLEtBQUssU0FBQyxVQUFVOzRCQUtoQixLQUFLLFNBQUMsV0FBVzs7d0JBM0NwQjtFQW1CbUMsYUFBYTtTQUFuQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgU2tpcFNlbGYsIE9wdGlvbmFsLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIGEgbGluayBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtbGluaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGluay5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PkxpbmtDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaWROYW1lOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBDaGFuZ2UgZGV0ZWN0b3IgcmVmZXJlbmNlIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKiDjgqvjg6zjg7Pjg4Djg7zjg5zjgr/jg7PmtLvmgKcv6Z2e5rS75oCn44Gu6Imy5oyH5a6aICovXG4gIF9kaXNhYmxlZDpib29sZWFuO1xuICBnZXQgZGlzYWJsZWQoKXtyZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgQElucHV0KCdkaXNhYmxlZCcpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSl7XG4gICAgdGhpcy5vcGFjaXR5ID0gdmFsdWUgPyAnMC4zJzonMS4wJztcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICB9XG4gIEBJbnB1dCgnaW5uZXJodG1sJykgaW5uZXJodG1sOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBDYWxscyBwYXJlbnQgaW5pdCBtZXRob2RcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIERvZXMgbm90IGVtaXQgZXZlbnQgaWYgdGhlIHBhbmVsIGlzIGRpc2FibGVkXG4gICAqIEBldmVudCBPbkNvbW1hbmRcbiAgICovXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKVxuICAgICAgdGhpcy5vbkNvbW1hbmQuZW1pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGtleWRvd24gZXZlbnQuIEV4ZWN1dGUgY2xpY2sgaGFuZGxlciBpZiBpdCdzIHRoZSBlbnRlciBrZXlcbiAgICogQHBhcmFtIGUgS2V5Ym9hcmQgRXZlbnRcbiAgICovXG4gIG9uS2V5VXAoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIGlmIEVOVEVSIGtleVxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIGZvciBwYW5lbFxuICAgKi9cbiAgdG9Kc29uKCk6IHt9IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcblxuICAgIGlmIChqc29uW1wiY3VzdG9tQXR0cmlidXRlc1wiXSA9PSBudWxsKSB7XG4gICAgICBqc29uW1wiY3VzdG9tQXR0cmlidXRlc1wiXSA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMuc2V0SnNvbihqc29uW1wiY3VzdG9tQXR0cmlidXRlc1wiXSwgXCJpZE5hbWVcIiwgdGhpcy5pZE5hbWUpO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBbW2NkXV0gKENoYW5nZURldGVjdG9yKSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NkXV0gcHJvcGVydHlcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cbn1cbiJdfQ==