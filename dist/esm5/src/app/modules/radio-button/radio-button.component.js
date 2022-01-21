/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for radio button input control
 */
var RadioButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadioButtonComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector for this panel
     * @param renderer see [[BaseComponent]] constructor
     */
    function RadioButtonComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.checked = false;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(RadioButtonComponent.prototype, "isChecked", {
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
     * Init lifecycle. Call parent init method.
     */
    /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    RadioButtonComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.idName != null) {
            this.setCustomAttribute('idName', this.idName);
        }
    };
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     */
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    RadioButtonComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.getParent() != null) {
            this.getParent().addRadioButtonGroup(this);
        }
        this.setAttributeFromDef();
        this.cd.detectChanges();
        this._internalChangeTracking = this.checked;
    };
    /**
     * Event handler for change event
     * @event OnCommand
     */
    /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    RadioButtonComponent.prototype.onChange = /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    function () {
        this.onCommand.emit();
    };
    /**
     * Event handler for click event. Updates radio button state
     * @param event Mouse click event
     */
    /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    RadioButtonComponent.prototype.onClick = /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        /** @type {?} */
        var fireOnChange = false;
        /** @type {?} */
        var tempCheck = this.checked;
        this.resetGroupRadios();
        //reset current value back for onChange
        this._internalChangeTracking = tempCheck;
        //register click for mco
        this.checked = true;
        this.handleClick(event);
        if (this._internalChangeTracking !== this.checked) {
            this.onChange();
            this._internalChangeTracking = this.checked;
        }
    };
    /**
     * Event handler for mousedown event
     * @param e MouseDown event
     */
    /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    RadioButtonComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    function (e) {
        this.handleMouseDown(e);
    };
    /**
     * Get the component name
     */
    /**
     * Get the component name
     * @return {?}
     */
    RadioButtonComponent.prototype.getLocalName = /**
     * Get the component name
     * @return {?}
     */
    function () {
        return "radioButton";
    };
    /**
     * Get the [[value]] property
     */
    /**
     * Get the [[value]] property
     * @return {?}
     */
    RadioButtonComponent.prototype.getValue = /**
     * Get the [[value]] property
     * @return {?}
     */
    function () {
        return this.value;
    };
    /**
     * Get the [[checked]] property
     */
    /**
     * Get the [[checked]] property
     * @return {?}
     */
    RadioButtonComponent.prototype.getChecked = /**
     * Get the [[checked]] property
     * @return {?}
     */
    function () {
        return this.checked;
    };
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param shouldChecked Toggle checked
     */
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    RadioButtonComponent.prototype.setChecked = /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    function (shouldChecked, skipInternalChange) {
        if (skipInternalChange === void 0) { skipInternalChange = false; }
        if (shouldChecked === true) {
            this.resetGroupRadios();
        }
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this._internalChangeTracking = this.checked;
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    };
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param value
     */
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    RadioButtonComponent.prototype.setSelected = /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var e_1, _a;
        if (value === true || value === "true") {
            this.setChecked(true);
        }
        else if (value == this.value) {
            this.setChecked(true);
        }
        else if (this.getParent() != null) {
            /** @type {?} */
            var group = this.getParent().getRadioButtonGroup(this.group);
            if (group != null) {
                try {
                    for (var group_1 = tslib_1.__values(group), group_1_1 = group_1.next(); !group_1_1.done; group_1_1 = group_1.next()) {
                        var radio = group_1_1.value;
                        if (radio.getValue() == value) {
                            radio.setChecked(true);
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (group_1_1 && !group_1_1.done && (_a = group_1.return)) _a.call(group_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    };
    /**
     * Get JSON representation for the radiobutton component
     * @returns JSON
     */
    /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    RadioButtonComponent.prototype.toJson = /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json["group"] = this.group;
        json["selected"] = this.checked === true ? "true" : "false";
        return json;
    };
    /**
     * Get the NexaWeb tag name
     * @return Tag name
     */
    /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    RadioButtonComponent.prototype.getNxTagName = /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    function () {
        return "radioButton";
    };
    /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    RadioButtonComponent.prototype.resetGroupRadios = /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var group = this.getParent().getRadioButtonGroup(this.group);
        if (group != null) {
            try {
                for (var group_2 = tslib_1.__values(group), group_2_1 = group_2.next(); !group_2_1.done; group_2_1 = group_2.next()) {
                    var radio = group_2_1.value;
                    radio.setChecked(false);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (group_2_1 && !group_2_1.done && (_a = group_2.return)) _a.call(group_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    /**
     * Get [[cd]] (ChangeDetector) of this component
     */
    /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    RadioButtonComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Check if this component is a radiobutton
     * @returns True
     */
    /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    RadioButtonComponent.prototype.isRadioButton = /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    function () {
        return true;
    };
    RadioButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-radio-button',
                    template: "<div class=\"radio {{cssClass}} {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-radio\" type=\"radio\" [name]=\"group\" [id]=\"id\" [value]=\"value\" [checked]=\"checked\"\n      [disabled]=\"disabled\"\n      (click)=\"onClick($event)\"\n      (mousedown)=\"onMouseDown($event)\"\n      [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return RadioButtonComponent; })
                        }
                    ],
                    styles: ["div>label>span{vertical-align:top!important}"]
                }] }
    ];
    /** @nocollapse */
    RadioButtonComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    RadioButtonComponent.propDecorators = {
        group: [{ type: Input }],
        idName: [{ type: Input }],
        value: [{ type: Input }],
        isChecked: [{ type: Input }],
        checked: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return RadioButtonComponent;
}(BaseComponent));
export { RadioButtonComponent };
if (false) {
    /** @type {?} */
    RadioButtonComponent.prototype.group;
    /** @type {?} */
    RadioButtonComponent.prototype.idName;
    /** @type {?} */
    RadioButtonComponent.prototype.value;
    /** @type {?} */
    RadioButtonComponent.prototype.checked;
    /** @type {?} */
    RadioButtonComponent.prototype._internalChangeTracking;
    /** @type {?} */
    RadioButtonComponent.prototype.onCommand;
    /** @type {?} */
    RadioButtonComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFtQmxCLGdEQUFhO0lBY3JEOzs7Ozs7O09BT0c7SUFDSCw4QkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQjtRQUFySyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDtRQUYwSCxRQUFFLEdBQUYsRUFBRSxDQUFtQjt3QkFkcEgsS0FBSzswQkFJWCxJQUFJLFlBQVksRUFBRTs7S0FZdkM7SUFwQkQsc0JBQWEsMkNBQVM7Ozs7O1FBQXRCLFVBQXVCLEdBQVk7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDcEI7OztPQUFBO0lBb0JEOztPQUVHOzs7OztJQUNILHVDQUFROzs7O0lBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NB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Rjs7SUFHSDs7T0FFRzs7Ozs7SUFDTyxnREFBaUI7Ozs7SUFBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDaEI7SUFFRDs7O09BR0c7Ozs7O0lBQ08sNENBQWE7Ozs7SUFBdkI7UUFDRSxPQUFPLElBQUksQ0FBQztLQUNiOztnQkEzTkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHVrQkFBNEM7b0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO3lCQUNsRDtxQkFDRjs7aUJBQ0Y7Ozs7Z0JBbkJRLGFBQWEsdUJBMENQLFFBQVEsWUFBSSxRQUFRO2dCQXpDMUIsY0FBYztnQkFGb0IsVUFBVTtnQkFBNkQsaUJBQWlCO2dCQUFFLFNBQVM7Ozt3QkFzQjNJLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBSUwsS0FBSzs0QkFJTCxNQUFNOzsrQkFqQ1Q7RUFxQjBDLGFBQWE7U0FBMUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBlbGVtZW50IH0gZnJvbSAncHJvdHJhY3Rvcic7XG5pbXBvcnQgeyBVaURvY3VtZW50IH0gZnJvbSAnLi4vYmFzZS91aS1kb2N1bWVudCc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHJhZGlvIGJ1dHRvbiBpbnB1dCBjb250cm9sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXJhZGlvLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9yYWRpby1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yYWRpby1idXR0b24uY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5SYWRpb0J1dHRvbkNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcbiAgQElucHV0KCkgaWROYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHNldCBpc0NoZWNrZWQoYm9vOiBib29sZWFuKSB7XG4gICAgdGhpcy5jaGVja2VkID0gYm9vO1xuICB9XG5cbiAgQElucHV0KCkgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2ludGVybmFsQ2hhbmdlVHJhY2tpbmc6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBDaGFuZ2UgZGV0ZWN0b3IgZm9yIHRoaXMgcGFuZWxcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBDYWxsIHBhcmVudCBpbml0IG1ldGhvZC5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZiAodGhpcy5pZE5hbWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRDdXN0b21BdHRyaWJ1dGUoJ2lkTmFtZScsIHRoaXMuaWROYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gU2V0IHRoZSByYWRpb2J1dHRvbiBncm91cCBhbmQgYXR0cmlidXRlcy5cbiAgICogQ2FsbHMgcGFyZW50IG5nQWZ0ZXJWaWV3SW50aSBtZXRob2RcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIGlmICh0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZ2V0UGFyZW50KCkuYWRkUmFkaW9CdXR0b25Hcm91cCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNoYW5nZSBldmVudFxuICAgKiBAZXZlbnQgT25Db21tYW5kXG4gICAqL1xuICBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFVwZGF0ZXMgcmFkaW8gYnV0dG9uIHN0YXRlXG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBjbGljayBldmVudFxuICAgKi9cbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIFxuICAgIGxldCBmaXJlT25DaGFuZ2UgPSBmYWxzZTtcblxuICAgIC8vc2F2ZSBjdXJyZW50IHZhbHVlIGJlZm9yZSByZXNldFxuICAgIGNvbnN0IHRlbXBDaGVjayA9IHRoaXMuY2hlY2tlZDtcblxuICAgIHRoaXMucmVzZXRHcm91cFJhZGlvcygpO1xuXG4gICAgLy9yZXNldCBjdXJyZW50IHZhbHVlIGJhY2sgZm9yIG9uQ2hhbmdlXG4gICAgdGhpcy5faW50ZXJuYWxDaGFuZ2VUcmFja2luZyA9IHRlbXBDaGVjaztcblxuICAgIC8vcmVnaXN0ZXIgY2xpY2sgZm9yIG1jb1xuICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5oYW5kbGVDbGljayhldmVudCk7XG5cbiAgICBpZiAodGhpcy5faW50ZXJuYWxDaGFuZ2VUcmFja2luZyAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd24gZXZlbnRcbiAgICogQHBhcmFtIGUgTW91c2VEb3duIGV2ZW50XG4gICAqL1xuICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgbmFtZVxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwicmFkaW9CdXR0b25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFtbdmFsdWVdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFtbY2hlY2tlZF1dIHByb3BlcnR5XG4gICAqL1xuICBnZXRDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIFtbY2hlY2tlZF1dIHByb3BlcnR5IGFuZCB1cGRhdGVkIFtbX2ludGVybmFsQ2hhbmdlVHJhY2tpbmddXSB2YWx1ZVxuICAgKiBAcGFyYW0gc2hvdWxkQ2hlY2tlZCBUb2dnbGUgY2hlY2tlZFxuICAgKi9cbiAgc2V0Q2hlY2tlZChzaG91bGRDaGVja2VkOiBib29sZWFuIHwgc3RyaW5nLCBza2lwSW50ZXJuYWxDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChzaG91bGRDaGVja2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlc2V0R3JvdXBSYWRpb3MoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSBzaG91bGRDaGVja2VkID09PSB0cnVlIHx8IHNob3VsZENoZWNrZWQgPT09ICd0cnVlJztcbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICAvL25vdGlmeSBpbnRlcm5hbCBjaGFuZ2VzIChmb3IgaW50ZXJuYWwgdXNlIG9ubHkpXG4gICAgaWYgKHNraXBJbnRlcm5hbENoYW5nZSAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fbm90aWZ5SW50ZXJuYWxDaGFuZ2VDYigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgcmFkaW8gYnV0dG9uIG9mIHRoZSBwYXJlbnQgZ3JvdXAgdGhhdCBtYXRjaGVzIFtbdmFsdWVdXVxuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBzZXRTZWxlY3RlZCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgdGhpcy5zZXRDaGVja2VkKHRydWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRDaGVja2VkKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRQYXJlbnQoKS5nZXRSYWRpb0J1dHRvbkdyb3VwKHRoaXMuZ3JvdXApO1xuXG4gICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCByYWRpbyBvZiBncm91cCkge1xuICAgICAgICAgIGlmIChyYWRpby5nZXRWYWx1ZSgpID09IHZhbHVlKSB7XG4gICAgICAgICAgICByYWRpby5zZXRDaGVja2VkKHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgcmFkaW9idXR0b24gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIEpTT05cbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbiA9IHN1cGVyLnRvSnNvbigpO1xuXG4gICAganNvbltcImdyb3VwXCJdID0gdGhpcy5ncm91cDtcbiAgICBqc29uW1wic2VsZWN0ZWRcIl0gPSB0aGlzLmNoZWNrZWQgPT09IHRydWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJuIFRhZyBuYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInJhZGlvQnV0dG9uXCI7XG4gIH1cblxuICAvKipcbiAgICogVW5jaGVjayBhbGwgcmFkaW8gYnV0dG9ucyBpbiB0aGUgcmFkaW8gYnV0dG9uJ3MgZ3JvdXBcbiAgICovXG4gIHByaXZhdGUgcmVzZXRHcm91cFJhZGlvcygpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50KCkuZ2V0UmFkaW9CdXR0b25Hcm91cCh0aGlzLmdyb3VwKTtcblxuICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCByYWRpbyBvZiBncm91cCkge1xuICAgICAgICByYWRpby5zZXRDaGVja2VkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3IpIG9mIHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgcmFkaW9idXR0b25cbiAgICogQHJldHVybnMgVHJ1ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGlzUmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==