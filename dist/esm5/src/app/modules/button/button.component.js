/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AppUtils } from '../base/app-utils';
/**
 * Button component class. Inherits from [[BaseComponent]]
 */
var ButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonComponent, _super);
    function ButtonComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.focused = true;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.marginTop != null) {
            this.marginTop = this.marginTop + 'px';
        }
        if (this.marginRight != null) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft != null) {
            this.marginLeft = this.marginLeft + 'px';
        }
    };
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     */
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    ButtonComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /* istanbul ignore next */
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
    ButtonComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        //register client event for mco
        this.handleClick(event);
        this.onCommand.emit();
        //it looks like you can change onCommand binding at runtime and since we are code
        //we add another fn to do it (we may removed this later once we have a better of usage)
        this.emitInternalOnCommand();
    };
    /* istanbul ignore next */
    /**
     * Event handler for mousedown event
     * @param e
     */
    /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    ButtonComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var currentTarget = e.currentTarget['id'];
        if (currentTarget != null && currentTarget.indexOf("BtnClose") > 0) {
            AppUtils.isCloseBtn = true;
        }
        else {
            AppUtils.isCloseBtn = false;
        }
        this.handleMouseDown(e);
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    ButtonComponent.prototype.handleOnBlur = /**
     * @return {?}
     */
    function () {
        AppUtils.isCloseBtn = false;
    };
    /**
     * Get change detector reference for the button instance
     * @returns [[cd]] property (Change detector)
     */
    /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    ButtonComponent.prototype.getChangeDetector = /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    function () {
        return this.cd;
    };
    /**
     * Get Nexaweb tag name
     * @returns String
     */
    /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    ButtonComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    function () {
        return "button";
    };
    /**
     * Get JSON representation of the button component
     * @returns Json object
     */
    /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    ButtonComponent.prototype.toJson = /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "focused", this.focused);
        return json;
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-button',
                    template: "<button [disabled]=\"disabled || !enabled\"\n        [ngClass]=\"{'hidden': visible != true}\"\n\t\t\t\t[style.color]=\"fontColor\"\n\t\t\t\t[id]=\"id\"\n\t\t\t\ttype=\"button\" class=\"btn btn-default {{cssClass}}\"\n\t\t\t\t(mousedown)=\"onMouseDown($event)\"\n\t\t\t\t(click)=\"onClick($event)\"\n        (contextmenu)=\"handleOnContextMenu($event)\"\n        (blur)=\"handleOnBlur()\"\n        [ngStyle]=\"styles\"\n        [style.padding]=\"controlPadding\"\n        [style.margin-top]=\"marginTop\"\n        [style.margin-left]=\"marginLeft\"\n        [style.margin-right]=\"marginRight\"\n        [style.margin-bottom]=\"marginBottom\"\n        [style.line-height]=\"lineHeight\">\n\t{{ text }}\n\t<!-- allow children (in case user want to display html) -->\n\t<ng-content></ng-content>\n</button>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ButtonComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    ButtonComponent.propDecorators = {
        focused: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return ButtonComponent;
}(BaseComponent));
export { ButtonComponent };
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.focused;
    /** @type {?} */
    ButtonComponent.prototype.onCommand;
    /** @type {?} */
    ButtonComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0lBaUJSLDJDQUFhO0lBSWhELHlCQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQXJLLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQ3BEO1FBRjBILFFBQUUsR0FBRixFQUFFLENBQW1CO3dCQUhwSCxJQUFJOzBCQUNYLElBQUksWUFBWSxFQUFFOztLQUl0QztJQUVEOztPQUVHOzs7OztJQUNILGtDQUFROzs7O0lBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEM7UUFFRCxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDNUM7UUFFRCxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUM7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILHlDQUFlOzs7O0lBQWY7UUFDRSxpQkFBTSxlQUFlLFdBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDekI7SUFFRCwwQkFBMEI7SUFDMUI7Ozs7T0FJRzs7Ozs7OztJQUNKLGlDQUFPOzs7Ozs7SUFBUCxVQUFRLEtBQWlCO1FBRXRCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzs7UUFJdEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7S0FDOUI7SUFFRCwwQkFBMEI7SUFDMUI7OztPQUdHOzs7Ozs7SUFDSCxxQ0FBVzs7Ozs7SUFBWCxVQUFZLENBQWE7O1FBQ3ZCLElBQUksYUFBYSxHQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxhQUFhLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xFLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU07WUFDTCxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7SUFFRCwwQkFBMEI7Ozs7SUFDMUIsc0NBQVk7OztJQUFaO1FBQ0UsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7S0FDN0I7SUFFRDs7O09BR0c7Ozs7O0lBQ08sMkNBQWlCOzs7O0lBQTNCO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2hCO0lBRUQ7OztPQUdHOzs7OztJQUNPLHNDQUFZOzs7O0lBQXRCO1FBQ0UsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsZ0NBQU07Ozs7SUFBTjs7UUFDRSxJQUFNLElBQUksR0FBUSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O2dCQW5IRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGt6QkFBc0M7b0JBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLGVBQWUsRUFBZixDQUFlLENBQUM7eUJBQzdDO3FCQUNGOztpQkFDRjs7OztnQkFwQlEsYUFBYSx1QkF5QlAsUUFBUSxZQUFJLFFBQVE7Z0JBdkIxQixjQUFjO2dCQUgyRCxVQUFVO2dCQUFzQixpQkFBaUI7Z0JBQUUsU0FBUzs7OzBCQXVCM0ksS0FBSzs0QkFDTixNQUFNOzswQkF4QlI7RUFzQnFDLGFBQWE7U0FBckMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFbGVtZW50UmVmLCBTa2lwU2VsZiwgT3B0aW9uYWwsIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50Jztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uL2Jhc2UvYXBwLXV0aWxzJztcblxuLyoqXG4gKiBCdXR0b24gY29tcG9uZW50IGNsYXNzLiBJbmhlcml0cyBmcm9tIFtbQmFzZUNvbXBvbmVudF1dXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXR0b24uY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5CdXR0b25Db21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmb2N1c2VkOiBib29sZWFuID0gdHJ1ZTtcblx0QE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIE11c3QgY2FsbCBwYXJlbnQgbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZih0aGlzLm1hcmdpblRvcCAhPSBudWxsKXtcbiAgICAgIHRoaXMubWFyZ2luVG9wID0gdGhpcy5tYXJnaW5Ub3AgKyAncHgnO1xuICAgIH1cblxuICAgIGlmKHRoaXMubWFyZ2luUmlnaHQgIT0gbnVsbCl7XG4gICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5tYXJnaW5SaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5tYXJnaW5MZWZ0ICE9IG51bGwpe1xuICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gdGhpcy5tYXJnaW5MZWZ0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gTXVzdCBjYWxsIHBhcmVudCBuZ0FmdGVyVmlld0luaXRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoXCJoZWlnaHRcIiwgXCJ3aWR0aFwiKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IE9uQ29tbWFuZFxuICAgKi9cblx0b25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvL3JlZ2lzdGVyIGNsaWVudCBldmVudCBmb3IgbWNvXG4gICAgdGhpcy5oYW5kbGVDbGljayhldmVudCk7XG5cbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KCk7XG5cbiAgICAvL2l0IGxvb2tzIGxpa2UgeW91IGNhbiBjaGFuZ2Ugb25Db21tYW5kIGJpbmRpbmcgYXQgcnVudGltZSBhbmQgc2luY2Ugd2UgYXJlIGNvZGVcbiAgICAvL3dlIGFkZCBhbm90aGVyIGZuIHRvIGRvIGl0ICh3ZSBtYXkgcmVtb3ZlZCB0aGlzIGxhdGVyIG9uY2Ugd2UgaGF2ZSBhIGJldHRlciBvZiB1c2FnZSlcbiAgICB0aGlzLmVtaXRJbnRlcm5hbE9uQ29tbWFuZCgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlZG93biBldmVudFxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJyZW50VGFyZ2V0OiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXRbJ2lkJ107XG4gICAgaWYgKGN1cnJlbnRUYXJnZXQgIT0gbnVsbCAmJiBjdXJyZW50VGFyZ2V0LmluZGV4T2YoXCJCdG5DbG9zZVwiKSA+IDApIHtcbiAgICAgIEFwcFV0aWxzLmlzQ2xvc2VCdG4gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBBcHBVdGlscy5pc0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlTW91c2VEb3duKGUpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaGFuZGxlT25CbHVyKCkge1xuICAgIEFwcFV0aWxzLmlzQ2xvc2VCdG4gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hhbmdlIGRldGVjdG9yIHJlZmVyZW5jZSBmb3IgdGhlIGJ1dHRvbiBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyBbW2NkXV0gcHJvcGVydHkgKENoYW5nZSBkZXRlY3RvcilcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0IE5leGF3ZWIgdGFnIG5hbWVcbiAgICogQHJldHVybnMgU3RyaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcImJ1dHRvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBidXR0b24gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIEpzb24gb2JqZWN0XG4gICAqL1xuICB0b0pzb24oKToge30ge1xuICAgIGNvbnN0IGpzb246IGFueSA9IHN1cGVyLnRvSnNvbigpO1xuICAgIHRoaXMuc2V0SnNvbihqc29uLCBcImZvY3VzZWRcIiwgdGhpcy5mb2N1c2VkKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbn1cbiJdfQ==