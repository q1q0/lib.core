/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, TemplateRef, Optional, SkipSelf, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { SessionService } from '../../session/session.service';
/**
 * Class for tab component
 */
var TabComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TabComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     */
    function TabComponent(parent, sessionService, elementRef, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    /* istanbul ignore next */
    /**
     *
     * @param child Tab child component to add
     */
    /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    TabComponent.prototype.addChild = /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    function (child) {
        (/** @type {?} */ (this.parent)).addChild(child);
        if (this.tabChildrenIds == null) {
            this.tabChildrenIds = [];
        }
        this.tabChildrenIds.push(child.getId());
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle
     */
    /**
     * After view init lifecycle
     * @return {?}
     */
    TabComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
    };
    /* istanbul ignore next */
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata about this component
     */
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    TabComponent.prototype.toJson = /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "active", this.focused);
        return json;
    };
    /* istanbul ignore next */
    /**
     * Get NexaWeb component tag name
     */
    /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    TabComponent.prototype.getNxTagName = /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    function () {
        return "tab";
    };
    /* istanbul ignore next */
    /**
     * Event handler for click event
     * @event onCommand
     */
    /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    TabComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    function () {
        this.onCommand.emit(this.id);
        this.active = true;
    };
    /* istanbul ignore next */
    /**
     * Focus this tab
     */
    /**
     * Focus this tab
     * @return {?}
     */
    TabComponent.prototype.setFocus = /**
     * Focus this tab
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parent = this.getParent();
        if (parent != null && typeof parent["setSelectedTab"] === "function") {
            parent["setSelectedTab"](this.id);
        }
        else {
            _super.prototype.setFocus.call(this);
        }
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tab',
                    template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TabComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    TabComponent.propDecorators = {
        active: [{ type: Input }],
        id: [{ type: Input }],
        onCommand: [{ type: Output }],
        content: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return TabComponent;
}(BaseComponent));
export { TabComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFiLXBhbmUvdGFiL3RhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFrQyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUwsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7SUFnQjdCLHdDQUFhO0lBUzdDOzs7Ozs7T0FNRztJQUNILHNCQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtRQUF0SSxZQUNFLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDswQkFicUIsSUFBSSxZQUFZLEVBQUU7O0tBYXZDO0lBRUQsMEJBQTBCO0lBQzFCOzs7T0FHRzs7Ozs7O0lBQ08sK0JBQVE7Ozs7O0lBQWxCLFVBQW1CLEtBQW9CO1FBQ3JDLG1CQUFDLElBQUksQ0FBQyxNQUFhLEVBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsMEJBQTBCO0lBQzFCOztPQUVHOzs7OztJQUNILHNDQUFlOzs7O0lBQWY7UUFDRSxpQkFBTSxlQUFlLFdBQUUsQ0FBQztLQUN6QjtJQUVELDBCQUEwQjtJQUMxQjs7O09BR0c7Ozs7O0lBQ0gsNkJBQU07Ozs7SUFBTjs7UUFDRSxJQUFNLElBQUksR0FBUSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCwwQkFBMEI7SUFDMUI7O09BRUc7Ozs7O0lBQ08sbUNBQVk7Ozs7SUFBdEI7UUFDRSxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsMEJBQTBCO0lBQzFCOzs7T0FHRzs7Ozs7O0lBQ0gsOEJBQU87Ozs7O0lBQVA7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDcEI7SUFFRCwwQkFBMEI7SUFDMUI7O09BRUc7Ozs7O0lBQ0gsK0JBQVE7Ozs7SUFBUjs7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFaEMsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsaUJBQU0sUUFBUSxXQUFFLENBQUM7U0FDbEI7S0FDRjs7Z0JBaEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsc0VBQW1DO29CQUVuQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7eUJBQzFDO3FCQUNGOztpQkFDRjs7OztnQkFoQlEsYUFBYSx1QkFpQ1AsUUFBUSxZQUFJLFFBQVE7Z0JBaEMxQixjQUFjO2dCQUZLLFVBQVU7Z0JBQTJFLFNBQVM7Ozt5QkFvQnZILEtBQUs7cUJBQ0wsS0FBSzs0QkFFTCxNQUFNOzBCQUVOLFNBQVMsU0FBQyxXQUFXOzt1QkF6QnhCO0VBa0JrQyxhQUFhO1NBQWxDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBPcHRpb25hbCwgU2tpcFNlbGYsIFJlbmRlcmVyMiwgQ29udGVudENoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGFiIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC10YWInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFiLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5UYWJDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyBTZXRzIGFjdGl2ZSB0YWIgY2xhc3NcbiAgQElucHV0KCkgYWN0aXZlOiBib29sZWFuO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGNoaWxkIFRhYiBjaGlsZCBjb21wb25lbnQgdG8gYWRkXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkQ2hpbGQoY2hpbGQ6IEJhc2VDb21wb25lbnQpIHtcbiAgICAodGhpcy5wYXJlbnQgYXMgYW55KS5hZGRDaGlsZChjaGlsZCk7XG5cbiAgICBpZiAodGhpcy50YWJDaGlsZHJlbklkcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLnRhYkNoaWxkcmVuSWRzID0gW107XG4gICAgfVxuXG4gICAgdGhpcy50YWJDaGlsZHJlbklkcy5wdXNoKGNoaWxkLmdldElkKCkpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGVcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3QgSlNPTiBtZXRhZGF0YSBhYm91dCB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgdG9Kc29uKCkge1xuICAgIGNvbnN0IGpzb246IGFueSA9IHN1cGVyLnRvSnNvbigpO1xuICAgIHRoaXMuc2V0SnNvbihqc29uLCBcImFjdGl2ZVwiLCB0aGlzLmZvY3VzZWQpO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IE5leGFXZWIgY29tcG9uZW50IHRhZyBuYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInRhYlwiO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50XG4gICAqIEBldmVudCBvbkNvbW1hbmRcbiAgICovXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5vbkNvbW1hbmQuZW1pdCh0aGlzLmlkKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgdGhpcyB0YWJcbiAgICovXG4gIHNldEZvY3VzKCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG5cbiAgICBpZiAocGFyZW50ICE9IG51bGwgJiYgdHlwZW9mIHBhcmVudFtcInNldFNlbGVjdGVkVGFiXCJdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHBhcmVudFtcInNldFNlbGVjdGVkVGFiXCJdKHRoaXMuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5zZXRGb2N1cygpO1xuICAgIH1cbiAgfVxufVxuIl19