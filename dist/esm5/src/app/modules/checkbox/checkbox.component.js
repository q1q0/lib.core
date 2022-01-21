/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ElementRef, Input, ChangeDetectionStrategy, Optional, SkipSelf, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Check box component class
 */
var CheckboxComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxComponent, _super);
    function CheckboxComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.checked = false;
        _this.onCommand = new EventEmitter();
        _this.onStateChange = new EventEmitter();
        _this.onSelect = new EventEmitter();
        return _this;
    }
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checked;
        },
        //alias for checked
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            this.checked = boo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Must call parent class ngOnInit
     */
    /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     */
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    CheckboxComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /**
     * Event handler for click event
     * @param event
     * @event OnCommand
     */
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleClick(event);
        this.onCommand.emit();
    };
    /**
     * Event handler for mousedown event
     * @param event
     */
    /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleMouseDown(event);
    };
    /**
     * Event handler for state change (check/uncheck)
     * @event OnStateChange
     * @event OnSelect If the checkbox is set to selected state
     */
    /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    CheckboxComponent.prototype.handleStateChange = /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    function () {
        this.onStateChange.emit();
        if (this.checked === true) {
            this.onSelect.emit();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    };
    /**
     * Get component name
     * @returns Name of component
     */
    /**
     * Get component name
     * @return {?} Name of component
     */
    CheckboxComponent.prototype.getLocalName = /**
     * Get component name
     * @return {?} Name of component
     */
    function () {
        return "checkBox";
    };
    /**
     * Get [[checked]] property
     * @returns Value of [[checked]]
     */
    /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    CheckboxComponent.prototype.getChecked = /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    function () {
        return this.checked;
    };
    /**
     * Set [[checked]] property value
     * @param shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     */
    /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    CheckboxComponent.prototype.setChecked = /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    function (shouldChecked, skipInternalChange) {
        if (skipInternalChange === void 0) { skipInternalChange = false; }
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    };
    /**
     * Alias for [[setChecked]] method
     * @param boo Toggle [[checked]]
     */
    /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    CheckboxComponent.prototype.setSelected = /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    function (boo) {
        this.setChecked(boo);
    };
    /**
     * Get [[value]] property
     * @returns Value of [[value]]
     */
    /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    CheckboxComponent.prototype.getValue = /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    function () {
        return this.value;
    };
    /**
     * Get JSON representation of component state
     * @returns Object Json object
     */
    /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    CheckboxComponent.prototype.toJson = /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        if (this.getChecked() === true) {
            json["selected"] = "true";
        }
        else {
            json["selected"] = "false";
        }
        if (this.value != null) {
            json["value"] = this.value + '';
        }
        return json;
    };
    /**
     * Get Nexaweb tag name
     * @returns String Tag name
     */
    /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    CheckboxComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    function () {
        return "checkBox";
    };
    /**
     * Get [[cd]] (Change detector) property
     * @returns The component's change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    CheckboxComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    function () {
        return this.cd;
    };
    /**
   * Set background-color
   * @param String background color
   */
    /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    CheckboxComponent.prototype.setBgColor = /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this['elementRef'].nativeElement.children[0]['style']['background-color'] = color;
    };
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.getBgColor = /**
     * @return {?}
     */
    function () {
        return this['elementRef'].nativeElement.children[0]['style']['background-color'];
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-check-box',
                    template: "<div class=\"checkbox {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-checkbox\" [disabled]=\"disabled\" [id]=\"id\" type=\"checkbox\" value=\"\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (change)=\"handleStateChange()\" [(ngModel)]=\"checked\" [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return CheckboxComponent; })
                        }
                    ],
                    styles: ["div>label>input{position:static;vertical-align:middle}"]
                }] }
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    CheckboxComponent.propDecorators = {
        value: [{ type: Input }],
        checked: [{ type: Input }],
        isChecked: [{ type: Input }],
        onCommand: [{ type: Output }],
        onStateChange: [{ type: Output }],
        onSelect: [{ type: Output }]
    };
    return CheckboxComponent;
}(BaseComponent));
export { CheckboxComponent };
if (false) {
    /** @type {?} */
    CheckboxComponent.prototype.value;
    /** @type {?} */
    CheckboxComponent.prototype.checked;
    /** @type {?} */
    CheckboxComponent.prototype.onCommand;
    /** @type {?} */
    CheckboxComponent.prototype.onStateChange;
    /** @type {?} */
    CheckboxComponent.prototype.onSelect;
    /** @type {?} */
    CheckboxComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFpQnJCLDZDQUFhO0lBaUJsRCwyQkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQjtRQUFySyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDtRQUYwSCxRQUFFLEdBQUYsRUFBRSxDQUFtQjt3QkFmcEgsS0FBSzswQkFVUSxJQUFJLFlBQVksRUFBRTs4QkFDZCxJQUFJLFlBQVksRUFBRTt5QkFFdkIsSUFBSSxZQUFZLEVBQUU7O0tBSXpEO0lBZkQsc0JBQWEsd0NBQVM7Ozs7UUFJdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7UUFQRCxtQkFBbUI7Ozs7O1FBQ25CLFVBQXVCLEdBQVk7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDcEI7OztPQUFBO0lBZUQ7O09BRUc7Ozs7O0lBQ0gsb0NBQVE7Ozs7SUFBUjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ2xCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMkNBQWU7Ozs7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Q0FBQyxHQUFHLEtBQUssQ0FBQztLQUNuRjs7OztJQUNELHNDQUFVOzs7SUFBVjtRQUNDLE9BQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNsRjs7Z0JBcExGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsa2pCQUF3QztvQkFFeEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFJLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7eUJBQy9DO3FCQUNGOztpQkFDRjs7OztnQkFqQlEsYUFBYSx1QkFtQ1AsUUFBUSxZQUFJLFFBQVE7Z0JBbEMxQixjQUFjO2dCQUYyQixVQUFVO2dCQUFzRCxpQkFBaUI7Z0JBQUUsU0FBUzs7O3dCQW9CM0ksS0FBSzswQkFDTCxLQUFLOzRCQUVMLEtBQUs7NEJBUUwsTUFBTTtnQ0FDTixNQUFNOzJCQUVOLE1BQU07OzRCQWxDVDtFQW1CdUMsYUFBYTtTQUF2QyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT3B0aW9uYWwsIFNraXBTZWxmLCBDaGFuZ2VEZXRlY3RvclJlZiwgUmVuZGVyZXIyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBDaGVjayBib3ggY29tcG9uZW50IGNsYXNzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWNoZWNrLWJveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoZWNrYm94LmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+Q2hlY2tib3hDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy9hbGlhcyBmb3IgY2hlY2tlZFxuICBASW5wdXQoKSBzZXQgaXNDaGVja2VkKGJvbzogYm9vbGVhbikge1xuICAgIHRoaXMuY2hlY2tlZCA9IGJvbztcbiAgfVxuXG4gIGdldCBpc0NoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25TdGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCwgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gTXVzdCBjYWxsIHBhcmVudCBjbGFzcyBuZ09uSW5pdFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBNdXN0IGNhbGwgcGFyZW50IGNsYXNzIG5nQWZ0ZXJWaWV3SW5pdFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlRnJvbURlZigpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAZXZlbnQgT25Db21tYW5kXG4gICAqL1xuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy9jb25zdW1lIHRoZSBldmVudCwgZG8gbm90IHByb3BhZ2F0ZSBhbnkgZnVydGhlclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIFxuICAgIHRoaXMuaGFuZGxlQ2xpY2soZXZlbnQpO1xuICAgIHRoaXMub25Db21tYW5kLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd24gZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvL2NvbnN1bWUgdGhlIGV2ZW50LCBkbyBub3QgcHJvcGFnYXRlIGFueSBmdXJ0aGVyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Igc3RhdGUgY2hhbmdlIChjaGVjay91bmNoZWNrKVxuICAgKiBAZXZlbnQgT25TdGF0ZUNoYW5nZVxuICAgKiBAZXZlbnQgT25TZWxlY3QgSWYgdGhlIGNoZWNrYm94IGlzIHNldCB0byBzZWxlY3RlZCBzdGF0ZVxuICAgKi9cbiAgaGFuZGxlU3RhdGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlLmVtaXQoKTtcblxuICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdCgpO1xuICAgIH1cblxuICAgIC8vbm90aWZ5IGludGVybmFsIGNoYW5nZXMgKGZvciBpbnRlcm5hbCB1c2Ugb25seSlcbiAgICB0aGlzLl9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbXBvbmVudCBuYW1lXG4gICAqIEByZXR1cm5zIE5hbWUgb2YgY29tcG9uZW50XG4gICAqL1xuICBnZXRMb2NhbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJjaGVja0JveFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2NoZWNrZWRdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NoZWNrZWRdXVxuICAgKi9cbiAgZ2V0Q2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW2NoZWNrZWRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gc2hvdWxkQ2hlY2tlZCBWYWx1ZSBzaG91bGQgYmUgdHJ1ZS9mYWxzZSBvciBcInRydWVcIi9cImZhbHNlXCIgdG8gc2V0IFtbY2hlY2tlZF1dXG4gICAqL1xuICBzZXRDaGVja2VkKHNob3VsZENoZWNrZWQ6IGJvb2xlYW4gfCBzdHJpbmcsIHNraXBJbnRlcm5hbENoYW5nZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5jaGVja2VkID0gc2hvdWxkQ2hlY2tlZCA9PT0gdHJ1ZSB8fCBzaG91bGRDaGVja2VkID09PSAndHJ1ZSc7XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgLy9ub3RpZnkgaW50ZXJuYWwgY2hhbmdlcyAoZm9yIGludGVybmFsIHVzZSBvbmx5KVxuICAgIGlmIChza2lwSW50ZXJuYWxDaGFuZ2UgIT09IHRydWUpIHtcbiAgICAgIHRoaXMuX25vdGlmeUludGVybmFsQ2hhbmdlQ2IoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIFtbc2V0Q2hlY2tlZF1dIG1ldGhvZFxuICAgKiBAcGFyYW0gYm9vIFRvZ2dsZSBbW2NoZWNrZWRdXVxuICAgKi9cbiAgc2V0U2VsZWN0ZWQoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRDaGVja2VkKGJvbyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbdmFsdWVdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW3ZhbHVlXV1cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGNvbXBvbmVudCBzdGF0ZVxuICAgKiBAcmV0dXJucyBPYmplY3QgSnNvbiBvYmplY3RcbiAgICovXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uID0gc3VwZXIudG9Kc29uKCk7XG5cbiAgICBpZiAodGhpcy5nZXRDaGVja2VkKCkgPT09IHRydWUpIHtcbiAgICAgIGpzb25bXCJzZWxlY3RlZFwiXSA9IFwidHJ1ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBqc29uW1wic2VsZWN0ZWRcIl0gPSBcImZhbHNlXCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWUgIT0gbnVsbCkge1xuICAgICAganNvbltcInZhbHVlXCJdID0gdGhpcy52YWx1ZSArICcnO1xuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBOZXhhd2ViIHRhZyBuYW1lXG4gICAqIEByZXR1cm5zIFN0cmluZyBUYWcgbmFtZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJjaGVja0JveFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2NkXV0gKENoYW5nZSBkZXRlY3RvcikgcHJvcGVydHlcbiAgICogQHJldHVybnMgVGhlIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvciByZWZlcmVuY2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cbiAgICAvKipcbiAgICogU2V0IGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIFN0cmluZyBiYWNrZ3JvdW5kIGNvbG9yXG4gICAqL1xuICBzZXRCZ0NvbG9yKGNvbG9yOnN0cmluZyl7XG4gICAgdGhpc1snZWxlbWVudFJlZiddLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF1bJ3N0eWxlJ11bJ2JhY2tncm91bmQtY29sb3InXSA9IGNvbG9yO1xuICB9XG4gIGdldEJnQ29sb3IoKXtcbiAgIHJldHVybiAgdGhpc1snZWxlbWVudFJlZiddLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF1bJ3N0eWxlJ11bJ2JhY2tncm91bmQtY29sb3InXTtcbiAgfVxufVxuIl19