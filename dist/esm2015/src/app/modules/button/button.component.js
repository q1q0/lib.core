/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AppUtils } from '../base/app-utils';
/**
 * Button component class. Inherits from [[BaseComponent]]
 */
export class ButtonComponent extends BaseComponent {
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
        this.focused = true;
        this.onCommand = new EventEmitter();
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.marginTop != null) {
            this.marginTop = this.marginTop + 'px';
        }
        if (this.marginRight != null) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft != null) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle("height", "width");
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
        event.stopPropagation();
        //register client event for mco
        this.handleClick(event);
        this.onCommand.emit();
        //it looks like you can change onCommand binding at runtime and since we are code
        //we add another fn to do it (we may removed this later once we have a better of usage)
        this.emitInternalOnCommand();
    }
    /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    onMouseDown(e) {
        /** @type {?} */
        let currentTarget = e.currentTarget['id'];
        if (currentTarget != null && currentTarget.indexOf("BtnClose") > 0) {
            AppUtils.isCloseBtn = true;
        }
        else {
            AppUtils.isCloseBtn = false;
        }
        this.handleMouseDown(e);
    }
    /**
     * @return {?}
     */
    handleOnBlur() {
        AppUtils.isCloseBtn = false;
    }
    /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    getNxTagName() {
        return "button";
    }
    /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "focused", this.focused);
        return json;
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-button',
                template: "<button [disabled]=\"disabled || !enabled\"\n        [ngClass]=\"{'hidden': visible != true}\"\n\t\t\t\t[style.color]=\"fontColor\"\n\t\t\t\t[id]=\"id\"\n\t\t\t\ttype=\"button\" class=\"btn btn-default {{cssClass}}\"\n\t\t\t\t(mousedown)=\"onMouseDown($event)\"\n\t\t\t\t(click)=\"onClick($event)\"\n        (contextmenu)=\"handleOnContextMenu($event)\"\n        (blur)=\"handleOnBlur()\"\n        [ngStyle]=\"styles\"\n        [style.padding]=\"controlPadding\"\n        [style.margin-top]=\"marginTop\"\n        [style.margin-left]=\"marginLeft\"\n        [style.margin-right]=\"marginRight\"\n        [style.margin-bottom]=\"marginBottom\"\n        [style.line-height]=\"lineHeight\">\n\t{{ text }}\n\t<!-- allow children (in case user want to display html) -->\n\t<ng-content></ng-content>\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ButtonComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
ButtonComponent.propDecorators = {
    focused: [{ type: Input }],
    onCommand: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.focused;
    /** @type {?} */
    ButtonComponent.prototype.onCommand;
    /** @type {?} */
    ButtonComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQWlCN0MsTUFBTSxzQkFBdUIsU0FBUSxhQUFhOzs7Ozs7OztJQUloRCxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQ25LLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURxRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjt1QkFIcEgsSUFBSTt5QkFDWCxJQUFJLFlBQVksRUFBRTtLQUl0Qzs7Ozs7SUFLRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN4QztRQUVELElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUM1QztRQUVELElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMxQztLQUNGOzs7OztJQUtELGVBQWU7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3pCOzs7Ozs7O0lBUUYsT0FBTyxDQUFDLEtBQWlCO1FBRXRCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzs7UUFJdEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7S0FDOUI7Ozs7OztJQU9ELFdBQVcsQ0FBQyxDQUFhOztRQUN2QixJQUFJLGFBQWEsR0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRSxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNO1lBQ0wsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCOzs7O0lBR0QsWUFBWTtRQUNWLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0tBQzdCOzs7OztJQU1TLGlCQUFpQjtRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDaEI7Ozs7O0lBTVMsWUFBWTtRQUNwQixPQUFPLFFBQVEsQ0FBQztLQUNqQjs7Ozs7SUFNRCxNQUFNOztRQUNKLE1BQU0sSUFBSSxHQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7OztZQW5IRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLGt6QkFBc0M7Z0JBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRSxFQUFFLENBQUEsZUFBZSxDQUFDO3FCQUM3QztpQkFDRjs7YUFDRjs7OztZQXBCUSxhQUFhLHVCQXlCUCxRQUFRLFlBQUksUUFBUTtZQXZCMUIsY0FBYztZQUgyRCxVQUFVO1lBQXNCLGlCQUFpQjtZQUFFLFNBQVM7OztzQkF1QjNJLEtBQUs7d0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFbGVtZW50UmVmLCBTa2lwU2VsZiwgT3B0aW9uYWwsIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50Jztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uL2Jhc2UvYXBwLXV0aWxzJztcblxuLyoqXG4gKiBCdXR0b24gY29tcG9uZW50IGNsYXNzLiBJbmhlcml0cyBmcm9tIFtbQmFzZUNvbXBvbmVudF1dXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXR0b24uY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5CdXR0b25Db21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmb2N1c2VkOiBib29sZWFuID0gdHJ1ZTtcblx0QE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIE11c3QgY2FsbCBwYXJlbnQgbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZih0aGlzLm1hcmdpblRvcCAhPSBudWxsKXtcbiAgICAgIHRoaXMubWFyZ2luVG9wID0gdGhpcy5tYXJnaW5Ub3AgKyAncHgnO1xuICAgIH1cblxuICAgIGlmKHRoaXMubWFyZ2luUmlnaHQgIT0gbnVsbCl7XG4gICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5tYXJnaW5SaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5tYXJnaW5MZWZ0ICE9IG51bGwpe1xuICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gdGhpcy5tYXJnaW5MZWZ0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gTXVzdCBjYWxsIHBhcmVudCBuZ0FmdGVyVmlld0luaXRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoXCJoZWlnaHRcIiwgXCJ3aWR0aFwiKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IE9uQ29tbWFuZFxuICAgKi9cblx0b25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvL3JlZ2lzdGVyIGNsaWVudCBldmVudCBmb3IgbWNvXG4gICAgdGhpcy5oYW5kbGVDbGljayhldmVudCk7XG5cbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KCk7XG5cbiAgICAvL2l0IGxvb2tzIGxpa2UgeW91IGNhbiBjaGFuZ2Ugb25Db21tYW5kIGJpbmRpbmcgYXQgcnVudGltZSBhbmQgc2luY2Ugd2UgYXJlIGNvZGVcbiAgICAvL3dlIGFkZCBhbm90aGVyIGZuIHRvIGRvIGl0ICh3ZSBtYXkgcmVtb3ZlZCB0aGlzIGxhdGVyIG9uY2Ugd2UgaGF2ZSBhIGJldHRlciBvZiB1c2FnZSlcbiAgICB0aGlzLmVtaXRJbnRlcm5hbE9uQ29tbWFuZCgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlZG93biBldmVudFxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJyZW50VGFyZ2V0OiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXRbJ2lkJ107XG4gICAgaWYgKGN1cnJlbnRUYXJnZXQgIT0gbnVsbCAmJiBjdXJyZW50VGFyZ2V0LmluZGV4T2YoXCJCdG5DbG9zZVwiKSA+IDApIHtcbiAgICAgIEFwcFV0aWxzLmlzQ2xvc2VCdG4gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBBcHBVdGlscy5pc0Nsb3NlQnRuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlTW91c2VEb3duKGUpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaGFuZGxlT25CbHVyKCkge1xuICAgIEFwcFV0aWxzLmlzQ2xvc2VCdG4gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hhbmdlIGRldGVjdG9yIHJlZmVyZW5jZSBmb3IgdGhlIGJ1dHRvbiBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyBbW2NkXV0gcHJvcGVydHkgKENoYW5nZSBkZXRlY3RvcilcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0IE5leGF3ZWIgdGFnIG5hbWVcbiAgICogQHJldHVybnMgU3RyaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcImJ1dHRvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBidXR0b24gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIEpzb24gb2JqZWN0XG4gICAqL1xuICB0b0pzb24oKToge30ge1xuICAgIGNvbnN0IGpzb246IGFueSA9IHN1cGVyLnRvSnNvbigpO1xuICAgIHRoaXMuc2V0SnNvbihqc29uLCBcImZvY3VzZWRcIiwgdGhpcy5mb2N1c2VkKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbn1cbiJdfQ==