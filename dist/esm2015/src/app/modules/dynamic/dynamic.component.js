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
export class DynamicComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
    }
    /**
     * After init lifecycle.
     * @return {?}
     */
    ngAfterViewInit() {
        this.cleanClass();
        this.cd.detectChanges();
    }
    /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    isVisible() {
        return this.elementDef.visible !== false;
    }
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    getId() {
        return this.elementDef.id == null ? BaseComponent.generateUniqueId() : this.elementDef.id;
    }
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    handleOnCommand() {
        if (typeof this.elementDef.onCommand === "function") {
            this.elementDef.onCommand(this.myComponent);
        }
    }
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    handleOnContextMenu() {
        if (typeof this.elementDef.onContextMenu === "function") {
            this.elementDef.onContextMenu(this.myComponent);
        }
    }
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    cleanClass() {
        if (this.elementDef.cssClass != null && this.elementDef.cssClass !== "") {
            if (typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                const attrs = AppUtils.attributeOverrideClass(this.elementDef.cssClass);
                if (attrs != null) {
                    _.forEach(attrs, (val) => {
                        if (val != null && val.attributeName === AttributesEnum.ENABLED) {
                            this.elementDef.enabled = val.value;
                        }
                    });
                }
            }
            this.elementDef.cssClass = BaseComponent.cleanCss(this.elementDef.cssClass);
        }
    }
}
DynamicComponent.decorators = [
    { type: Component, args: [{
                selector: "vt-dynamic-component",
                template: "<!-- panel -->\n<vt-panel #myComponent\n    *ngIf=\"elementDef.type === 'panel'\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n    <ng-template [ngIf]=\"elementDef.children != null && elementDef.children.length > 0\">\n        <vt-dynamic-component *ngFor=\"let compDef of elementDef.children\" [elementDef]=\"compDef\"></vt-dynamic-component>\n    </ng-template>\n</vt-panel>\n<!-- label -->\n<vt-label #myComponent\n    *ngIf=\"elementDef.type === 'label'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [tooltip]=\"elementDef.tooltip\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-label>\n<!-- textField -->\n<vt-text-field #myComponent\n    *ngIf=\"elementDef.type === 'textField'\"\n    [text]=\"elementDef.text\"\n    [value]=\"elementDef.value\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-text-field>\n<!-- button -->\n<vt-button #myComponent\n    *ngIf=\"elementDef.type === 'button'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [customAttributes]=\"elementDef.customAttributes\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onCommand)=\"handleOnCommand()\">\n</vt-button>\n<!-- horizontal -->\n<vt-horizontal-separator #myComponent\n    *ngIf=\"elementDef.type === 'horizontalSeparator'\"\n    [ngStyle]=\"elementDef.styles\">\n</vt-horizontal-separator>\n<!-- just a div -->\n<div *ngIf=\"elementDef.type === 'div'\" [ngClass]=\"elementDef.cssClass\"></div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DynamicComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DynamicComponent.propDecorators = {
    elementDef: [{ type: Input }],
    myComponent: [{ type: ViewChild, args: ["myComponent", { read: BaseComponent },] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2R5bmFtaWMvZHluYW1pYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBaUIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFVNUIsTUFBTTs7OztJQU9GLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO0tBRXhDOzs7OztJQUtELGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFNRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7S0FDNUM7Ozs7O0lBTUQsS0FBSztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7S0FDN0Y7Ozs7O0lBS0QsZUFBZTtRQUNYLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7Ozs7O0lBS0QsbUJBQW1CO1FBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFBRTtZQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkQ7S0FDSjs7Ozs7SUFLRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO1lBQ3JFLElBQUksT0FBTyxRQUFRLENBQUMsc0JBQXNCLEtBQUssVUFBVSxFQUFFOztnQkFDdkQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXhFLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDZixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFFO3dCQUNwQixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLGFBQWEsS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFOzRCQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO3lCQUN2QztxQkFDSixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRTtLQUNKOzs7WUE5RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLHlsRUFBdUM7Z0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBZHFDLGlCQUFpQjs7O3lCQW1CbEQsS0FBSzswQkFDTCxTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IER5bmFtaWNFbGVtZW50IH0gZnJvbSBcIi4vZHluYW1pYy1lbGVtZW50XCI7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSBcIi4uL2Jhc2UvYmFzZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFwcFV0aWxzIH0gZnJvbSBcIi4uL2Jhc2UvYXBwLXV0aWxzXCI7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gXCIuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bVwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbi8qKlxuICogRHluYW1pY0NvbXBvbmVudCBjbGFzcy4gUmVuZGVycyBjb21wb25lbnRzIGF0IHJ1bnRpbWUgYnkgZGVmaW5pdGlvblxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ2dC1keW5hbWljLWNvbXBvbmVudFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZHluYW1pYy5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICAvKipcbiAgICAgKiBEZWZpbml0aW9uIG9mIGNvbXBvbmVudCB0byByZW5kZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbGVtZW50RGVmOiBEeW5hbWljRWxlbWVudDtcbiAgICBAVmlld0NoaWxkKFwibXlDb21wb25lbnRcIiwgeyByZWFkOiBCYXNlQ29tcG9uZW50IH0pIG15Q29tcG9uZW50OiBCYXNlQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIGluaXQgbGlmZWN5Y2xlLlxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbkNsYXNzKCk7XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZWxlbWVudCBpcyB2aXNpYmxlXG4gICAgICogQHJldHVybnMgVmFsdWUgb2YgW1tEeW5hbWljRWxlbWVudF1dIHZpc2libGUgcHJvcGVydHkuXG4gICAgICovXG4gICAgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50RGVmLnZpc2libGUgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjb21wb25lbnQgSUQgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgZ2VuZXJhdGUgYSB1bmlxdWUgaWRcbiAgICAgKiBAcmV0dXJucyBDb21wb25lbnQncyBpZCB2YWx1ZVxuICAgICAqL1xuICAgIGdldElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50RGVmLmlkID09IG51bGwgPyBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoKSA6IHRoaXMuZWxlbWVudERlZi5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBPbkNvbW1hbmQgZXZlbnQuIENhbGwgcnVudGltZSBjb21wb25lbnQncyBvbkNvbW1hbmQgaGFuZGxlclxuICAgICAqL1xuICAgIGhhbmRsZU9uQ29tbWFuZCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsZW1lbnREZWYub25Db21tYW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudERlZi5vbkNvbW1hbmQodGhpcy5teUNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBPbkNvbnRleHRNZW51IChpLmUuIHJpZ2h0IGNsaWNrLCBjdHJsIGNsaWNrKSBldmVudC4gQ2FsbCBydW50aW1lIGNvbXBvbmVudCdzIG9uQ29udGV4dE1lbnUgSGFuZGxlclxuICAgICAqL1xuICAgIGhhbmRsZU9uQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbGVtZW50RGVmLm9uQ29udGV4dE1lbnUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLm9uQ29udGV4dE1lbnUodGhpcy5teUNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgcnVudGltZSBjb21wb25lbnQncyAnZW5hYmxlZCcgcHJvcGVydHkgdmFsdWUgYmFzZWQgb24gY3NzQ2xhc3MgYW5kIGNhbGwgcGFyZW50IGNsYXNzIGNsZWFuQ3NzIG1ldGhvZFxuICAgICAqL1xuICAgIGNsZWFuQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cnMgPSBBcHBVdGlscy5hdHRyaWJ1dGVPdmVycmlkZUNsYXNzKHRoaXMuZWxlbWVudERlZi5jc3NDbGFzcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGF0dHJzLCAodmFsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbC5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5FTkFCTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLmVuYWJsZWQgPSB2YWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50RGVmLmNzc0NsYXNzID0gQmFzZUNvbXBvbmVudC5jbGVhbkNzcyh0aGlzLmVsZW1lbnREZWYuY3NzQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==