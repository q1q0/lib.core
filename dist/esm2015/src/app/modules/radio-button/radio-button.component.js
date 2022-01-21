/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for radio button input control
 */
export class RadioButtonComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this panel
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.checked = false;
        this.onCommand = new EventEmitter();
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set isChecked(boo) {
        this.checked = boo;
    }
    /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.idName != null) {
            this.setCustomAttribute('idName', this.idName);
        }
    }
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.getParent() != null) {
            this.getParent().addRadioButtonGroup(this);
        }
        this.setAttributeFromDef();
        this.cd.detectChanges();
        this._internalChangeTracking = this.checked;
    }
    /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    onChange() {
        this.onCommand.emit();
    }
    /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        /** @type {?} */
        let fireOnChange = false;
        /** @type {?} */
        const tempCheck = this.checked;
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
    }
    /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    onMouseDown(e) {
        this.handleMouseDown(e);
    }
    /**
     * Get the component name
     * @return {?}
     */
    getLocalName() {
        return "radioButton";
    }
    /**
     * Get the [[value]] property
     * @return {?}
     */
    getValue() {
        return this.value;
    }
    /**
     * Get the [[checked]] property
     * @return {?}
     */
    getChecked() {
        return this.checked;
    }
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    setChecked(shouldChecked, skipInternalChange = false) {
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
    }
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    setSelected(value) {
        if (value === true || value === "true") {
            this.setChecked(true);
        }
        else if (value == this.value) {
            this.setChecked(true);
        }
        else if (this.getParent() != null) {
            /** @type {?} */
            const group = this.getParent().getRadioButtonGroup(this.group);
            if (group != null) {
                for (let radio of group) {
                    if (radio.getValue() == value) {
                        radio.setChecked(true);
                        break;
                    }
                }
            }
        }
    }
    /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json["group"] = this.group;
        json["selected"] = this.checked === true ? "true" : "false";
        return json;
    }
    /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "radioButton";
    }
    /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    resetGroupRadios() {
        /** @type {?} */
        const group = this.getParent().getRadioButtonGroup(this.group);
        if (group != null) {
            for (let radio of group) {
                radio.setChecked(false);
            }
        }
    }
    /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    isRadioButton() {
        return true;
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-radio-button',
                template: "<div class=\"radio {{cssClass}} {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-radio\" type=\"radio\" [name]=\"group\" [id]=\"id\" [value]=\"value\" [checked]=\"checked\"\n      [disabled]=\"disabled\"\n      (click)=\"onClick($event)\"\n      (mousedown)=\"onMouseDown($event)\"\n      [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => RadioButtonComponent)
                    }
                ],
                styles: ["div>label>span{vertical-align:top!important}"]
            }] }
];
/** @nocollapse */
RadioButtonComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
RadioButtonComponent.propDecorators = {
    group: [{ type: Input }],
    idName: [{ type: Input }],
    value: [{ type: Input }],
    isChecked: [{ type: Input }],
    checked: [{ type: Input }],
    onCommand: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBbUI1RCxNQUFNLDJCQUE0QixTQUFRLGFBQWE7Ozs7Ozs7OztJQXNCckQsWUFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQjtRQUNuSyxLQUFLLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEcUUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7dUJBZHBILEtBQUs7eUJBSVgsSUFBSSxZQUFZLEVBQUU7S0FZdkM7Ozs7O0lBcEJELElBQWEsU0FBUyxDQUFDLEdBQVk7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDcEI7Ozs7O0lBdUJELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoRDtLQUNGOzs7Ozs7SUFNRCxlQUFlO1FBQ2Is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QjtZQUFFLFNBQVM7OztvQkFzQjNJLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBSUwsS0FBSzt3QkFJTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBlbGVtZW50IH0gZnJvbSAncHJvdHJhY3Rvcic7XG5pbXBvcnQgeyBVaURvY3VtZW50IH0gZnJvbSAnLi4vYmFzZS91aS1kb2N1bWVudCc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHJhZGlvIGJ1dHRvbiBpbnB1dCBjb250cm9sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXJhZGlvLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9yYWRpby1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yYWRpby1idXR0b24uY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5SYWRpb0J1dHRvbkNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcbiAgQElucHV0KCkgaWROYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHNldCBpc0NoZWNrZWQoYm9vOiBib29sZWFuKSB7XG4gICAgdGhpcy5jaGVja2VkID0gYm9vO1xuICB9XG5cbiAgQElucHV0KCkgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2ludGVybmFsQ2hhbmdlVHJhY2tpbmc6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBDaGFuZ2UgZGV0ZWN0b3IgZm9yIHRoaXMgcGFuZWxcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBDYWxsIHBhcmVudCBpbml0IG1ldGhvZC5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZiAodGhpcy5pZE5hbWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRDdXN0b21BdHRyaWJ1dGUoJ2lkTmFtZScsIHRoaXMuaWROYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gU2V0IHRoZSByYWRpb2J1dHRvbiBncm91cCBhbmQgYXR0cmlidXRlcy5cbiAgICogQ2FsbHMgcGFyZW50IG5nQWZ0ZXJWaWV3SW50aSBtZXRob2RcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIGlmICh0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZ2V0UGFyZW50KCkuYWRkUmFkaW9CdXR0b25Hcm91cCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNoYW5nZSBldmVudFxuICAgKiBAZXZlbnQgT25Db21tYW5kXG4gICAqL1xuICBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFVwZGF0ZXMgcmFkaW8gYnV0dG9uIHN0YXRlXG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBjbGljayBldmVudFxuICAgKi9cbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIFxuICAgIGxldCBmaXJlT25DaGFuZ2UgPSBmYWxzZTtcblxuICAgIC8vc2F2ZSBjdXJyZW50IHZhbHVlIGJlZm9yZSByZXNldFxuICAgIGNvbnN0IHRlbXBDaGVjayA9IHRoaXMuY2hlY2tlZDtcblxuICAgIHRoaXMucmVzZXRHcm91cFJhZGlvcygpO1xuXG4gICAgLy9yZXNldCBjdXJyZW50IHZhbHVlIGJhY2sgZm9yIG9uQ2hhbmdlXG4gICAgdGhpcy5faW50ZXJuYWxDaGFuZ2VUcmFja2luZyA9IHRlbXBDaGVjaztcblxuICAgIC8vcmVnaXN0ZXIgY2xpY2sgZm9yIG1jb1xuICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5oYW5kbGVDbGljayhldmVudCk7XG5cbiAgICBpZiAodGhpcy5faW50ZXJuYWxDaGFuZ2VUcmFja2luZyAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd24gZXZlbnRcbiAgICogQHBhcmFtIGUgTW91c2VEb3duIGV2ZW50XG4gICAqL1xuICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgbmFtZVxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwicmFkaW9CdXR0b25cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFtbdmFsdWVdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFtbY2hlY2tlZF1dIHByb3BlcnR5XG4gICAqL1xuICBnZXRDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIFtbY2hlY2tlZF1dIHByb3BlcnR5IGFuZCB1cGRhdGVkIFtbX2ludGVybmFsQ2hhbmdlVHJhY2tpbmddXSB2YWx1ZVxuICAgKiBAcGFyYW0gc2hvdWxkQ2hlY2tlZCBUb2dnbGUgY2hlY2tlZFxuICAgKi9cbiAgc2V0Q2hlY2tlZChzaG91bGRDaGVja2VkOiBib29sZWFuIHwgc3RyaW5nLCBza2lwSW50ZXJuYWxDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChzaG91bGRDaGVja2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlc2V0R3JvdXBSYWRpb3MoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSBzaG91bGRDaGVja2VkID09PSB0cnVlIHx8IHNob3VsZENoZWNrZWQgPT09ICd0cnVlJztcbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZVRyYWNraW5nID0gdGhpcy5jaGVja2VkO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICAvL25vdGlmeSBpbnRlcm5hbCBjaGFuZ2VzIChmb3IgaW50ZXJuYWwgdXNlIG9ubHkpXG4gICAgaWYgKHNraXBJbnRlcm5hbENoYW5nZSAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fbm90aWZ5SW50ZXJuYWxDaGFuZ2VDYigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgcmFkaW8gYnV0dG9uIG9mIHRoZSBwYXJlbnQgZ3JvdXAgdGhhdCBtYXRjaGVzIFtbdmFsdWVdXVxuICAgKiBAcGFyYW0gdmFsdWUgXG4gICAqL1xuICBzZXRTZWxlY3RlZCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgdGhpcy5zZXRDaGVja2VkKHRydWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRDaGVja2VkKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRQYXJlbnQoKS5nZXRSYWRpb0J1dHRvbkdyb3VwKHRoaXMuZ3JvdXApO1xuXG4gICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCByYWRpbyBvZiBncm91cCkge1xuICAgICAgICAgIGlmIChyYWRpby5nZXRWYWx1ZSgpID09IHZhbHVlKSB7XG4gICAgICAgICAgICByYWRpby5zZXRDaGVja2VkKHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgcmFkaW9idXR0b24gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIEpTT05cbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbiA9IHN1cGVyLnRvSnNvbigpO1xuXG4gICAganNvbltcImdyb3VwXCJdID0gdGhpcy5ncm91cDtcbiAgICBqc29uW1wic2VsZWN0ZWRcIl0gPSB0aGlzLmNoZWNrZWQgPT09IHRydWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJuIFRhZyBuYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInJhZGlvQnV0dG9uXCI7XG4gIH1cblxuICAvKipcbiAgICogVW5jaGVjayBhbGwgcmFkaW8gYnV0dG9ucyBpbiB0aGUgcmFkaW8gYnV0dG9uJ3MgZ3JvdXBcbiAgICovXG4gIHByaXZhdGUgcmVzZXRHcm91cFJhZGlvcygpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50KCkuZ2V0UmFkaW9CdXR0b25Hcm91cCh0aGlzLmdyb3VwKTtcblxuICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCByYWRpbyBvZiBncm91cCkge1xuICAgICAgICByYWRpby5zZXRDaGVja2VkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3IpIG9mIHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgcmFkaW9idXR0b25cbiAgICogQHJldHVybnMgVHJ1ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGlzUmFkaW9CdXR0b24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==