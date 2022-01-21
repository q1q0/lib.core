/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, ElementRef, Input, ChangeDetectionStrategy, Optional, SkipSelf, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Check box component class
 */
export class CheckboxComponent extends BaseComponent {
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
        this.checked = false;
        this.onCommand = new EventEmitter();
        this.onStateChange = new EventEmitter();
        this.onSelect = new EventEmitter();
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set isChecked(boo) {
        this.checked = boo;
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.setAttributeFromDef();
        this.cd.detectChanges();
    }
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleClick(event);
        this.onCommand.emit();
    }
    /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleMouseDown(event);
    }
    /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    handleStateChange() {
        this.onStateChange.emit();
        if (this.checked === true) {
            this.onSelect.emit();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    }
    /**
     * Get component name
     * @return {?} Name of component
     */
    getLocalName() {
        return "checkBox";
    }
    /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    getChecked() {
        return this.checked;
    }
    /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    setChecked(shouldChecked, skipInternalChange = false) {
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    }
    /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    setSelected(boo) {
        this.setChecked(boo);
    }
    /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    getValue() {
        return this.value;
    }
    /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
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
    }
    /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    getNxTagName() {
        return "checkBox";
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    setBgColor(color) {
        this['elementRef'].nativeElement.children[0]['style']['background-color'] = color;
    }
    /**
     * @return {?}
     */
    getBgColor() {
        return this['elementRef'].nativeElement.children[0]['style']['background-color'];
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-check-box',
                template: "<div class=\"checkbox {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-checkbox\" [disabled]=\"disabled\" [id]=\"id\" type=\"checkbox\" value=\"\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (change)=\"handleStateChange()\" [(ngModel)]=\"checked\" [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => CheckboxComponent)
                    }
                ],
                styles: ["div>label>input{position:static;vertical-align:middle}"]
            }] }
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
CheckboxComponent.propDecorators = {
    value: [{ type: Input }],
    checked: [{ type: Input }],
    isChecked: [{ type: Input }],
    onCommand: [{ type: Output }],
    onStateChange: [{ type: Output }],
    onSelect: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBaUI1RCxNQUFNLHdCQUF5QixTQUFRLGFBQWE7Ozs7Ozs7O0lBaUJsRCxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQ25LLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURxRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjt1QkFmcEgsS0FBSzt5QkFVUSxJQUFJLFlBQVksRUFBRTs2QkFDZCxJQUFJLFlBQVksRUFBRTt3QkFFdkIsSUFBSSxZQUFZLEVBQUU7S0FJekQ7Ozs7O0lBZkQsSUFBYSxTQUFTLENBQUMsR0FBWTtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztLQUNwQjs7OztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7Ozs7SUFjRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7OztJQUtELGVBQWU7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFD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RUFBRSxDQUFBLGlCQUFpQixDQUFDO3FCQUMvQztpQkFDRjs7YUFDRjs7OztZQWpCUSxhQUFhLHVCQW1DUCxRQUFRLFlBQUksUUFBUTtZQWxDMUIsY0FBYztZQUYyQixVQUFVO1lBQXNELGlCQUFpQjtZQUFFLFNBQVM7OztvQkFvQjNJLEtBQUs7c0JBQ0wsS0FBSzt3QkFFTCxLQUFLO3dCQVFMLE1BQU07NEJBQ04sTUFBTTt1QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9wdGlvbmFsLCBTa2lwU2VsZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQ2hlY2sgYm94IGNvbXBvbmVudCBjbGFzc1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1jaGVjay1ib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PkNoZWNrYm94Q29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICBASW5wdXQoKSBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIC8vYWxpYXMgZm9yIGNoZWNrZWRcbiAgQElucHV0KCkgc2V0IGlzQ2hlY2tlZChib286IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNoZWNrZWQgPSBib287XG4gIH1cblxuICBnZXQgaXNDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gIH1cblxuICBAT3V0cHV0KCkgb25Db21tYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIE11c3QgY2FsbCBwYXJlbnQgY2xhc3MgbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gTXVzdCBjYWxsIHBhcmVudCBjbGFzcyBuZ0FmdGVyVmlld0luaXRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IE9uQ29tbWFuZFxuICAgKi9cbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vY29uc3VtZSB0aGUgZXZlbnQsIGRvIG5vdCBwcm9wYWdhdGUgYW55IGZ1cnRoZXJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcbiAgICB0aGlzLmhhbmRsZUNsaWNrKGV2ZW50KTtcbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbW91c2Vkb3duIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy9jb25zdW1lIHRoZSBldmVudCwgZG8gbm90IHByb3BhZ2F0ZSBhbnkgZnVydGhlclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIHN0YXRlIGNoYW5nZSAoY2hlY2svdW5jaGVjaylcbiAgICogQGV2ZW50IE9uU3RhdGVDaGFuZ2VcbiAgICogQGV2ZW50IE9uU2VsZWN0IElmIHRoZSBjaGVja2JveCBpcyBzZXQgdG8gc2VsZWN0ZWQgc3RhdGVcbiAgICovXG4gIGhhbmRsZVN0YXRlQ2hhbmdlKCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZS5lbWl0KCk7XG5cbiAgICBpZiAodGhpcy5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoKTtcbiAgICB9XG5cbiAgICAvL25vdGlmeSBpbnRlcm5hbCBjaGFuZ2VzIChmb3IgaW50ZXJuYWwgdXNlIG9ubHkpXG4gICAgdGhpcy5fbm90aWZ5SW50ZXJuYWxDaGFuZ2VDYigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb21wb25lbnQgbmFtZVxuICAgKiBAcmV0dXJucyBOYW1lIG9mIGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiY2hlY2tCb3hcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tjaGVja2VkXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tjaGVja2VkXV1cbiAgICovXG4gIGdldENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tjaGVja2VkXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIHNob3VsZENoZWNrZWQgVmFsdWUgc2hvdWxkIGJlIHRydWUvZmFsc2Ugb3IgXCJ0cnVlXCIvXCJmYWxzZVwiIHRvIHNldCBbW2NoZWNrZWRdXVxuICAgKi9cbiAgc2V0Q2hlY2tlZChzaG91bGRDaGVja2VkOiBib29sZWFuIHwgc3RyaW5nLCBza2lwSW50ZXJuYWxDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuY2hlY2tlZCA9IHNob3VsZENoZWNrZWQgPT09IHRydWUgfHwgc2hvdWxkQ2hlY2tlZCA9PT0gJ3RydWUnO1xuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcblxuICAgIC8vbm90aWZ5IGludGVybmFsIGNoYW5nZXMgKGZvciBpbnRlcm5hbCB1c2Ugb25seSlcbiAgICBpZiAoc2tpcEludGVybmFsQ2hhbmdlICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLl9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBbW3NldENoZWNrZWRdXSBtZXRob2RcbiAgICogQHBhcmFtIGJvbyBUb2dnbGUgW1tjaGVja2VkXV1cbiAgICovXG4gIHNldFNlbGVjdGVkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuc2V0Q2hlY2tlZChib28pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW3ZhbHVlXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1t2YWx1ZV1dXG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBjb21wb25lbnQgc3RhdGVcbiAgICogQHJldHVybnMgT2JqZWN0IEpzb24gb2JqZWN0XG4gICAqL1xuICB0b0pzb24oKSB7XG4gICAgY29uc3QganNvbiA9IHN1cGVyLnRvSnNvbigpO1xuXG4gICAgaWYgKHRoaXMuZ2V0Q2hlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICBqc29uW1wic2VsZWN0ZWRcIl0gPSBcInRydWVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAganNvbltcInNlbGVjdGVkXCJdID0gXCJmYWxzZVwiO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgIGpzb25bXCJ2YWx1ZVwiXSA9IHRoaXMudmFsdWUgKyAnJztcbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTmV4YXdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJucyBTdHJpbmcgVGFnIG5hbWVcbiAgICovXG4gIHByb3RlY3RlZCBnZXROeFRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIFwiY2hlY2tCb3hcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tjZF1dIChDaGFuZ2UgZGV0ZWN0b3IpIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFRoZSBjb21wb25lbnQncyBjaGFuZ2UgZGV0ZWN0b3IgcmVmZXJlbmNlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG4gICAgLyoqXG4gICAqIFNldCBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSBTdHJpbmcgYmFja2dyb3VuZCBjb2xvclxuICAgKi9cbiAgc2V0QmdDb2xvcihjb2xvcjpzdHJpbmcpe1xuICAgIHRoaXNbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdWydzdHlsZSddWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjb2xvcjtcbiAgfVxuICBnZXRCZ0NvbG9yKCl7XG4gICByZXR1cm4gIHRoaXNbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdWydzdHlsZSddWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gIH1cbn1cbiJdfQ==