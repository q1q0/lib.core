/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, SkipSelf, Optional, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for a link component
 */
export class LinkComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector reference for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.onCommand = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this.opacity = value ? '0.3' : '1.0';
        this._disabled = value;
    }
    /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    onClick() {
        if (!this.disabled)
            this.onCommand.emit();
    }
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    onKeyUp(e) {
        // if ENTER key
        if (e.keyCode === 13) {
            this.onClick();
        }
    }
    /**
     * Get the JSON representation for panel
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        if (json["customAttributes"] == null) {
            json["customAttributes"] = {};
        }
        this.setJson(json["customAttributes"], "idName", this.idName);
        return json;
    }
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    getChangeDetector() {
        return this.cd;
    }
}
LinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-link',
                template: "<span [id]=\"id\" class=\"vt-link {{ cssClass }}\" (click)=\"onClick()\"\n  (keyup)=\"onKeyUp($event)\"\n  [style.color]=\"fontColor\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  tabindex=\"0\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.opacity]=\"opacity\">\n  {{ text }}\n  <div *ngIf=\"innerhtml && innerhtml.length > 0\" [innerHTML]=\"innerhtml\"></div>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => LinkComponent)
                    }
                ],
                styles: [".vt-link{text-decoration:underline;cursor:pointer}"]
            }] }
];
/** @nocollapse */
LinkComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
LinkComponent.propDecorators = {
    idName: [{ type: Input }],
    onCommand: [{ type: Output }],
    disabled: [{ type: Input, args: ['disabled',] }],
    innerhtml: [{ type: Input, args: ['innerhtml',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xpbmsvbGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBaUI1RCxNQUFNLG9CQUFxQixTQUFRLGFBQWE7Ozs7Ozs7OztJQVk5QyxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQ25LLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURxRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjt5QkFWMUgsSUFBSSxZQUFZLEVBQUU7S0FZdkM7Ozs7SUFJRCxJQUFJLFFBQVEsS0FBRyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7Ozs7SUFDdkMsSUFDSSxRQUFRLENBQUMsS0FBSztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FDeEI7Ozs7O0lBTUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7Ozs7O0lBTUQsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3pCOzs7Ozs7SUFNRCxPQUFPLENBQUMsQ0FBZ0I7O1FBRXRCLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0tBQ0Y7Ozs7O0lBS0QsTUFBTTs7UUFDSixNQUFNLElBQUksR0FBUSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFakMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBTVMsaUJBQWlCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjs7O1lBdEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsb1lBQW9DO2dCQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUUsRUFBRSxDQUFBLGFBQWEsQ0FBQztxQkFDM0M7aUJBQ0Y7O2FBQ0Y7Ozs7WUFqQlEsYUFBYSx1QkE4QlAsUUFBUSxZQUFJLFFBQVE7WUE3QjFCLGNBQWM7WUFGa0MsVUFBVTtZQUErQyxpQkFBaUI7WUFBRSxTQUFTOzs7cUJBb0IzSSxLQUFLO3dCQUNMLE1BQU07dUJBaUJOLEtBQUssU0FBQyxVQUFVO3dCQUtoQixLQUFLLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciBhIGxpbmsgY29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmsuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5MaW5rQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGlkTmFtZTogc3RyaW5nO1xuICBAT3V0cHV0KCkgb25Db21tYW5kID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY2QgQ2hhbmdlIGRldGVjdG9yIHJlZmVyZW5jZSBmb3IgdGhpcyBjb21wb25lbnRcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICB9XG5cbiAgLyog44Kr44Os44Oz44OA44O844Oc44K/44Oz5rS75oCnL+mdnua0u+aAp+OBruiJsuaMh+WumiAqL1xuICBfZGlzYWJsZWQ6Ym9vbGVhbjtcbiAgZ2V0IGRpc2FibGVkKCl7cmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIEBJbnB1dCgnZGlzYWJsZWQnKVxuICBzZXQgZGlzYWJsZWQodmFsdWUpe1xuICAgIHRoaXMub3BhY2l0eSA9IHZhbHVlID8gJzAuMyc6JzEuMCc7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuICBASW5wdXQoJ2lubmVyaHRtbCcpIGlubmVyaHRtbDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gQ2FsbHMgcGFyZW50IGluaXQgbWV0aG9kXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LiBEb2VzIG5vdCBlbWl0IGV2ZW50IGlmIHRoZSBwYW5lbCBpcyBkaXNhYmxlZFxuICAgKiBAZXZlbnQgT25Db21tYW5kXG4gICAqL1xuICBvbkNsaWNrKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZClcbiAgICAgIHRoaXMub25Db21tYW5kLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBrZXlkb3duIGV2ZW50LiBFeGVjdXRlIGNsaWNrIGhhbmRsZXIgaWYgaXQncyB0aGUgZW50ZXIga2V5XG4gICAqIEBwYXJhbSBlIEtleWJvYXJkIEV2ZW50XG4gICAqL1xuICBvbktleVVwKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBpZiBFTlRFUiBrZXlcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgcGFuZWxcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbjogYW55ID0gc3VwZXIudG9Kc29uKCk7XG5cbiAgICBpZiAoanNvbltcImN1c3RvbUF0dHJpYnV0ZXNcIl0gPT0gbnVsbCkge1xuICAgICAganNvbltcImN1c3RvbUF0dHJpYnV0ZXNcIl0gPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnNldEpzb24oanNvbltcImN1c3RvbUF0dHJpYnV0ZXNcIl0sIFwiaWROYW1lXCIsIHRoaXMuaWROYW1lKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1tjZF1dIChDaGFuZ2VEZXRlY3RvcikgcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tjZF1dIHByb3BlcnR5XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG59XG4iXX0=