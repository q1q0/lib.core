/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, TemplateRef, Optional, SkipSelf, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { SessionService } from '../../session/session.service';
/**
 * Class for tab component
 */
export class TabComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.onCommand = new EventEmitter();
    }
    /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    addChild(child) {
        (/** @type {?} */ (this.parent)).addChild(child);
        if (this.tabChildrenIds == null) {
            this.tabChildrenIds = [];
        }
        this.tabChildrenIds.push(child.getId());
    }
    /**
     * After view init lifecycle
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "active", this.focused);
        return json;
    }
    /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    getNxTagName() {
        return "tab";
    }
    /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    onClick() {
        this.onCommand.emit(this.id);
        this.active = true;
    }
    /**
     * Focus this tab
     * @return {?}
     */
    setFocus() {
        /** @type {?} */
        const parent = this.getParent();
        if (parent != null && typeof parent["setSelectedTab"] === "function") {
            parent["setSelectedTab"](this.id);
        }
        else {
            super.setFocus();
        }
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tab',
                template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TabComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
TabComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
TabComponent.propDecorators = {
    active: [{ type: Input }],
    id: [{ type: Input }],
    onCommand: [{ type: Output }],
    content: [{ type: ViewChild, args: [TemplateRef,] }]
};
if (false) {
    /** @type {?} */
    TabComponent.prototype.active;
    /** @type {?} */
    TabComponent.prototype.id;
    /** @type {?} */
    TabComponent.prototype.onCommand;
    /** @type {?} */
    TabComponent.prototype.content;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFiLXBhbmUvdGFiL3RhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWtDLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5TCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0FBZ0IvRCxNQUFNLG1CQUFvQixTQUFRLGFBQWE7Ozs7Ozs7O0lBZ0I3QyxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtRQUNwSSxLQUFLLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7eUJBWmhDLElBQUksWUFBWSxFQUFFO0tBYXZDOzs7Ozs7SUFPUyxRQUFRLENBQUMsS0FBb0I7UUFDckMsbUJBQUMsSUFBSSxDQUFDLE1BQWEsRUFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDekM7Ozs7O0lBTUQsZUFBZTtRQUNiLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFPRCxNQUFNOztRQUNKLE1BQU0sSUFBSSxHQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBTVMsWUFBWTtRQUNwQixPQUFPLEtBQUssQ0FBQztLQUNkOzs7Ozs7SUFPRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7OztJQU1ELFFBQVE7O1FBQ04sTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWhDLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUNwRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7WUFoR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2dCQUNsQixzRUFBbUM7Z0JBRW5DLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxZQUFZLENBQUM7cUJBQzFDO2lCQUNGOzthQUNGOzs7O1lBaEJRLGFBQWEsdUJBaUNQLFFBQVEsWUFBSSxRQUFRO1lBaEMxQixjQUFjO1lBRkssVUFBVTtZQUEyRSxTQUFTOzs7cUJBb0J2SCxLQUFLO2lCQUNMLEtBQUs7d0JBRUwsTUFBTTtzQkFFTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIE9wdGlvbmFsLCBTa2lwU2VsZiwgUmVuZGVyZXIyLCBDb250ZW50Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciB0YWIgY29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWIuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlRhYkNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGFiQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIFNldHMgYWN0aXZlIHRhYiBjbGFzc1xuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2hpbGQgVGFiIGNoaWxkIGNvbXBvbmVudCB0byBhZGRcbiAgICovXG4gIHByb3RlY3RlZCBhZGRDaGlsZChjaGlsZDogQmFzZUNvbXBvbmVudCkge1xuICAgICh0aGlzLnBhcmVudCBhcyBhbnkpLmFkZENoaWxkKGNoaWxkKTtcblxuICAgIGlmICh0aGlzLnRhYkNoaWxkcmVuSWRzID09IG51bGwpIHtcbiAgICAgIHRoaXMudGFiQ2hpbGRyZW5JZHMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnRhYkNoaWxkcmVuSWRzLnB1c2goY2hpbGQuZ2V0SWQoKSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIE9iamVjdCBKU09OIG1ldGFkYXRhIGFib3V0IHRoaXMgY29tcG9uZW50XG4gICAqL1xuICB0b0pzb24oKSB7XG4gICAgY29uc3QganNvbjogYW55ID0gc3VwZXIudG9Kc29uKCk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwiYWN0aXZlXCIsIHRoaXMuZm9jdXNlZCk7XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgTmV4YVdlYiBjb21wb25lbnQgdGFnIG5hbWVcbiAgICovXG4gIHByb3RlY3RlZCBnZXROeFRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIFwidGFiXCI7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY2xpY2sgZXZlbnRcbiAgICogQGV2ZW50IG9uQ29tbWFuZFxuICAgKi9cbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm9uQ29tbWFuZC5lbWl0KHRoaXMuaWQpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBGb2N1cyB0aGlzIHRhYlxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcblxuICAgIGlmIChwYXJlbnQgIT0gbnVsbCAmJiB0eXBlb2YgcGFyZW50W1wic2V0U2VsZWN0ZWRUYWJcIl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcGFyZW50W1wic2V0U2VsZWN0ZWRUYWJcIl0odGhpcy5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnNldEZvY3VzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=