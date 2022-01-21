/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { AppUtils } from "../base/app-utils";
import { AttributesEnum } from "../base/attributes.enum";
import * as _ from "lodash";
/**
 * DynamicComponent class. Renders components at runtime by definition
 */
var DynamicComponent = /** @class */ (function () {
    function DynamicComponent(cd) {
        this.cd = cd;
    }
    /**
     * After init lifecycle.
     */
    /**
     * After init lifecycle.
     * @return {?}
     */
    DynamicComponent.prototype.ngAfterViewInit = /**
     * After init lifecycle.
     * @return {?}
     */
    function () {
        this.cleanClass();
        this.cd.detectChanges();
    };
    /**
     * Check if element is visible
     * @returns Value of [[DynamicElement]] visible property.
     */
    /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    DynamicComponent.prototype.isVisible = /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    function () {
        return this.elementDef.visible !== false;
    };
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @returns Component's id value
     */
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    DynamicComponent.prototype.getId = /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    function () {
        return this.elementDef.id == null ? BaseComponent.generateUniqueId() : this.elementDef.id;
    };
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     */
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    DynamicComponent.prototype.handleOnCommand = /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    function () {
        if (typeof this.elementDef.onCommand === "function") {
            this.elementDef.onCommand(this.myComponent);
        }
    };
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     */
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    DynamicComponent.prototype.handleOnContextMenu = /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    function () {
        if (typeof this.elementDef.onContextMenu === "function") {
            this.elementDef.onContextMenu(this.myComponent);
        }
    };
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     */
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    DynamicComponent.prototype.cleanClass = /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.elementDef.cssClass != null && this.elementDef.cssClass !== "") {
            if (typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                var attrs = AppUtils.attributeOverrideClass(this.elementDef.cssClass);
                if (attrs != null) {
                    _.forEach(attrs, function (val) {
                        if (val != null && val.attributeName === AttributesEnum.ENABLED) {
                            _this.elementDef.enabled = val.value;
                        }
                    });
                }
            }
            this.elementDef.cssClass = BaseComponent.cleanCss(this.elementDef.cssClass);
        }
    };
    DynamicComponent.decorators = [
        { type: Component, args: [{
                    selector: "vt-dynamic-component",
                    template: "<!-- panel -->\n<vt-panel #myComponent\n    *ngIf=\"elementDef.type === 'panel'\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n    <ng-template [ngIf]=\"elementDef.children != null && elementDef.children.length > 0\">\n        <vt-dynamic-component *ngFor=\"let compDef of elementDef.children\" [elementDef]=\"compDef\"></vt-dynamic-component>\n    </ng-template>\n</vt-panel>\n<!-- label -->\n<vt-label #myComponent\n    *ngIf=\"elementDef.type === 'label'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [tooltip]=\"elementDef.tooltip\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-label>\n<!-- textField -->\n<vt-text-field #myComponent\n    *ngIf=\"elementDef.type === 'textField'\"\n    [text]=\"elementDef.text\"\n    [value]=\"elementDef.value\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-text-field>\n<!-- button -->\n<vt-button #myComponent\n    *ngIf=\"elementDef.type === 'button'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [customAttributes]=\"elementDef.customAttributes\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onCommand)=\"handleOnCommand()\">\n</vt-button>\n<!-- horizontal -->\n<vt-horizontal-separator #myComponent\n    *ngIf=\"elementDef.type === 'horizontalSeparator'\"\n    [ngStyle]=\"elementDef.styles\">\n</vt-horizontal-separator>\n<!-- just a div -->\n<div *ngIf=\"elementDef.type === 'div'\" [ngClass]=\"elementDef.cssClass\"></div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DynamicComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    DynamicComponent.propDecorators = {
        elementDef: [{ type: Input }],
        myComponent: [{ type: ViewChild, args: ["myComponent", { read: BaseComponent },] }]
    };
    return DynamicComponent;
}());
export { DynamicComponent };
if (false) {
    /**
     * Definition of component to render
     * @type {?}
     */
    DynamicComponent.prototype.elementDef;
    /** @type {?} */
    DynamicComponent.prototype.myComponent;
    /** @type {?} */
    DynamicComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2R5bmFtaWMvZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBaUIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0lBaUJ4QiwwQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7S0FFeEM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwwQ0FBZTs7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDM0I7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsb0NBQVM7Ozs7SUFBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO0tBQzVDO0lBRUQ7OztPQUdHOzs7OztJQUNILGdDQUFLOzs7O0lBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0tBQzdGO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMENBQWU7Ozs7SUFBZjtRQUNJLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBbUI7Ozs7SUFBbkI7UUFDSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssVUFBVSxFQUFFO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscUNBQVU7Ozs7SUFBVjtRQUFBLGlCQWdCQztRQWZHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNyRSxJQUFJLE9BQU8sUUFBUSxDQUFDLHNCQUFzQixLQUFLLFVBQVUsRUFBRTs7Z0JBQ3ZELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV4RSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQyxHQUFHO3dCQUNqQixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLGFBQWEsS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFOzRCQUM3RCxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO3lCQUN2QztxQkFDSixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRTtLQUNKOztnQkE5RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLHlsRUFBdUM7b0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OztnQkFkcUMsaUJBQWlCOzs7NkJBbUJsRCxLQUFLOzhCQUNMLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFOzsyQkFwQnJEOztTQWVhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IER5bmFtaWNFbGVtZW50IH0gZnJvbSBcIi4vZHluYW1pYy1lbGVtZW50XCI7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSBcIi4uL2Jhc2UvYmFzZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFwcFV0aWxzIH0gZnJvbSBcIi4uL2Jhc2UvYXBwLXV0aWxzXCI7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gXCIuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bVwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbi8qKlxuICogRHluYW1pY0NvbXBvbmVudCBjbGFzcy4gUmVuZGVycyBjb21wb25lbnRzIGF0IHJ1bnRpbWUgYnkgZGVmaW5pdGlvblxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ2dC1keW5hbWljLWNvbXBvbmVudFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZHluYW1pYy5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICAvKipcbiAgICAgKiBEZWZpbml0aW9uIG9mIGNvbXBvbmVudCB0byByZW5kZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbGVtZW50RGVmOiBEeW5hbWljRWxlbWVudDtcbiAgICBAVmlld0NoaWxkKFwibXlDb21wb25lbnRcIiwgeyByZWFkOiBCYXNlQ29tcG9uZW50IH0pIG15Q29tcG9uZW50OiBCYXNlQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIGluaXQgbGlmZWN5Y2xlLlxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbkNsYXNzKCk7XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZWxlbWVudCBpcyB2aXNpYmxlXG4gICAgICogQHJldHVybnMgVmFsdWUgb2YgW1tEeW5hbWljRWxlbWVudF1dIHZpc2libGUgcHJvcGVydHkuXG4gICAgICovXG4gICAgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50RGVmLnZpc2libGUgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjb21wb25lbnQgSUQgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgZ2VuZXJhdGUgYSB1bmlxdWUgaWRcbiAgICAgKiBAcmV0dXJucyBDb21wb25lbnQncyBpZCB2YWx1ZVxuICAgICAqL1xuICAgIGdldElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50RGVmLmlkID09IG51bGwgPyBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoKSA6IHRoaXMuZWxlbWVudERlZi5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBPbkNvbW1hbmQgZXZlbnQuIENhbGwgcnVudGltZSBjb21wb25lbnQncyBvbkNvbW1hbmQgaGFuZGxlclxuICAgICAqL1xuICAgIGhhbmRsZU9uQ29tbWFuZCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsZW1lbnREZWYub25Db21tYW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudERlZi5vbkNvbW1hbmQodGhpcy5teUNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBPbkNvbnRleHRNZW51IChpLmUuIHJpZ2h0IGNsaWNrLCBjdHJsIGNsaWNrKSBldmVudC4gQ2FsbCBydW50aW1lIGNvbXBvbmVudCdzIG9uQ29udGV4dE1lbnUgSGFuZGxlclxuICAgICAqL1xuICAgIGhhbmRsZU9uQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbGVtZW50RGVmLm9uQ29udGV4dE1lbnUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLm9uQ29udGV4dE1lbnUodGhpcy5teUNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgcnVudGltZSBjb21wb25lbnQncyAnZW5hYmxlZCcgcHJvcGVydHkgdmFsdWUgYmFzZWQgb24gY3NzQ2xhc3MgYW5kIGNhbGwgcGFyZW50IGNsYXNzIGNsZWFuQ3NzIG1ldGhvZFxuICAgICAqL1xuICAgIGNsZWFuQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cnMgPSBBcHBVdGlscy5hdHRyaWJ1dGVPdmVycmlkZUNsYXNzKHRoaXMuZWxlbWVudERlZi5jc3NDbGFzcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGF0dHJzLCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbC5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5FTkFCTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLmVuYWJsZWQgPSB2YWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLmNzc0NsYXNzID0gQmFzZUNvbXBvbmVudC5jbGVhbkNzcyh0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==