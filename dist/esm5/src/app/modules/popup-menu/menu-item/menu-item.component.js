/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ClientEvent } from '../../event-handler/client-event';
import { AppUtils } from '../../base/app-utils';
import { SessionService } from '../../session/session.service';
import { MenuItemBuilder } from '../menu-item-builder';
import { UiDocument } from '../../base/ui-document';
import * as _ from "lodash";
import { KeyUtils } from '../../base/key-utils';
/**
 * Class for menu item component. Child rendered by Menu directive
 */
var MenuItemComponent = /** @class */ (function () {
    /**
     *
     * @param sessionService Injects reference to [[SessionService]] instance
     */
    function MenuItemComponent(sessionService, cd) {
        this.sessionService = sessionService;
        this.cd = cd;
        this.display = true;
        this.onClick = new EventEmitter();
    }
    Object.defineProperty(MenuItemComponent.prototype, "hasMenuItems", {
        /**
         * Check if menu items exist
         * @returns True if [[menuItems]] exists and has 1 or more items
         */
        get: /**
         * Check if menu items exist
         * @return {?} True if [[menuItems]] exists and has 1 or more items
         */
        function () {
            return this.menuItems != null && this.menuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "isDivider", {
        /**
         * Check if this menu item is a separator/divider (i.e. hyphen)
         * @returns True if the menu item text is a hyphen
         */
        get: /**
         * Check if this menu item is a separator/divider (i.e. hyphen)
         * @return {?} True if the menu item text is a hyphen
         */
        function () {
            return this.text === '-';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "menuStyles", {
        /**
         * Get menu item styles map
         * @return Map of styles
         */
        get: /**
         * Get menu item styles map
         * @return {?} Map of styles
         */
        function () {
            return this.item != null ? this.item.styles : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     */
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    MenuItemComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    function () {
        UiDocument.registerMenuItemElement(this.id, this);
    };
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     */
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    MenuItemComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    function () {
        this.item = null;
        this.menuItems = null;
        UiDocument.unregisterMenuItemElement(this.id);
    };
    /**
     * Set an attribute with value on the menu item
     * @param name Attribute name
     * @param value Attribute value
     */
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    MenuItemComponent.prototype.setAttribute = /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    function (name, value) {
        if (this.item) {
            if (name === "display" || name === "visible") {
                value = value === true || value === "true";
                this.display = value;
                this.item.display = value;
                this.cd.detectChanges();
            }
            else if (name === "text") {
                this.text = value;
                this.item.text = value;
                this.cd.detectChanges();
            }
            else if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
                if (this.item.customAttributes == null) {
                    this.item.customAttributes = {};
                }
                this.item.customAttributes[name] = value;
            }
        }
    };
    /**
     * Get the value of an attribute by name
     * @param name Attribute name
     */
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    MenuItemComponent.prototype.getAttribute = /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    function (name) {
        if (this.item) {
            if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
                return this.item.customAttributes == null ? null : this.item.customAttributes[name];
            }
            else if (name === "display" || name === "visible") {
                return this.display;
            }
            else if (name === "text") {
                return this.text;
            }
            else if (name === "id") {
                return this.id;
            }
        }
    };
    /**
     * Get value of [[id]] property
     * @returns [[id]] value
     */
    /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    MenuItemComponent.prototype.getId = /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    function () {
        return this.id;
    };
    /**
     * Get value of [[text]] property
     * @returns [[text]] value
     */
    /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    MenuItemComponent.prototype.getText = /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    function () {
        return this.text;
    };
    /* istanbul ignore next */
    /**
     * Event handler fro mouseenter event
     * @param event Mouse event
     */
    /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    MenuItemComponent.prototype.handleOnEnter = /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onCommandCallback === 'function') {
            this.item.onCommandCallback(this.item);
        }
        else if (this.item && this.item.onCommand) {
            this.item.onCommand.emit();
        }
        if (this.popupMenuId != null) {
            this.sessionService.hideContextMenu(this.popupMenuId);
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param event Mouse event
     */
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    MenuItemComponent.prototype.handleMouseEnter = /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        event.target.focus();
    };
    /* istanbul ignore next */
    /**
     * Event handler for click.
     * @param event
     * @event OnCommand
     */
    /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    MenuItemComponent.prototype.handleOnClick = /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onCommandCallback === 'function') {
            this.item.onCommandCallback(this.item);
        }
        else if (this.item && this.item.onCommand) {
            this.item.onCommand.emit();
        }
        if (this.popupMenuId != null) {
            this.sessionService.hideContextMenu(this.popupMenuId);
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for mousedown event
     * @param event Mouse down event
     */
    /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    MenuItemComponent.prototype.handleMouseDown = /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onMouseDownCallback === "function") {
            this.item.onMouseDownCallback(this);
        }
    };
    /**
     * Get JSON representation for this component
     * @returns Object Metadata as JSON
     */
    /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    MenuItemComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var json = {};
        json["tagName"] = "menuItem";
        json["nxTagName"] = "menuItem";
        if (this.id != null) {
            json["id"] = this.id;
        }
        if (this.text != null) {
            json["text"] = this.text;
        }
        /* istanbul ignore if */
        if (this.popupMenuId != null) {
            json["popup"] = "#" + this.popupMenuId;
        }
        /* istanbul ignore if */
        if (this.item.customAttributes != null) {
            /** @type {?} */
            var keys = _.keys(this.item.customAttributes);
            try {
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    json[key] = KeyUtils.toJsonValue(this.item.customAttributes[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return json;
    };
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param event
     */
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    MenuItemComponent.prototype.dispSubmenu = /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentTarget = event.currentTarget;
        /** @type {?} */
        var currentChildren = currentTarget.children;
        /** @type {?} */
        var parentChildren = currentTarget.parentElement.children;
        for (var i = 0, len = parentChildren.length; i < len; i++) {
            if (parentChildren[i] !== undefined) {
                parentChildren[i].style.backgroundColor = "#ffffff";
            }
            if (parentChildren[i].children[1] === undefined) {
                continue;
            }
            parentChildren[i].children[1].classList.remove('popup-sub-menu-display');
        }
        if (currentChildren[1] === undefined
            || (currentChildren[0] !== undefined && !currentChildren[0].classList.contains('dropdown-item'))) {
            return;
        }
        currentChildren[1].classList.add('popup-sub-menu-display');
        currentTarget.style.backgroundColor = "#f5de92";
    };
    MenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: '[vt-menu-item-comp]',
                    template: "<a *ngIf=\"hasMenuItems && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" tabindex=\"-1\">{{text}}</a>\n<a *ngIf=\"hasMenuItems !== true && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" [ngStyle]=\"menuStyles\" tabindex=\"-1\" (keydown.enter)=\"handleOnEnter($event)\" (mouseenter)=\"handleMouseEnter($event)\" (mousedown)=\"handleMouseDown($event)\" (click)=\"handleOnClick($event)\">{{text}}</a>\n<ng-template [ngIf]=\"hasMenuItems\">\n  <ul class=\"dropdown-menu popup-menu\" role=\"menu\">\n    <ng-template ngFor [ngForOf]=\"menuItems\" let-subItem>\n      <li *ngIf=\"subItem.text === '-' && subItem.display !== false\" role=\"separator\" class=\"divider\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.menuItems != null && subItem.menuItems.length > 0 && subItem.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.text !== '-' && (subItem.menuItems == null || subItem.menuItems.length === 0) && subItem.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n    </ng-template>\n  </ul>\n</ng-template>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    MenuItemComponent.ctorParameters = function () { return [
        { type: SessionService },
        { type: ChangeDetectorRef }
    ]; };
    MenuItemComponent.propDecorators = {
        text: [{ type: Input }],
        id: [{ type: Input }],
        menuItems: [{ type: Input }],
        display: [{ type: Input }],
        visible: [{ type: Input }],
        item: [{ type: Input }],
        popupMenuId: [{ type: Input }],
        onClick: [{ type: Output }]
    };
    return MenuItemComponent;
}());
export { MenuItemComponent };
if (false) {
    /** @type {?} */
    MenuItemComponent.prototype.text;
    /** @type {?} */
    MenuItemComponent.prototype.id;
    /** @type {?} */
    MenuItemComponent.prototype.menuItems;
    /** @type {?} */
    MenuItemComponent.prototype.display;
    /** @type {?} */
    MenuItemComponent.prototype.visible;
    /** @type {?} */
    MenuItemComponent.prototype.item;
    /** @type {?} */
    MenuItemComponent.prototype.popupMenuId;
    /** @type {?} */
    MenuItemComponent.prototype.onClick;
    /** @type {?} */
    MenuItemComponent.prototype.sessionService;
    /** @type {?} */
    MenuItemComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcG9wdXAtbWVudS9tZW51LWl0ZW0vbWVudS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQTRCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztJQTZDOUM7OztPQUdHO0lBQ0gsMkJBQW9CLGNBQThCLEVBQVUsRUFBcUI7UUFBN0QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7dUJBbkNyRCxJQUFJO3VCQUtaLElBQUksWUFBWSxFQUFRO0tBZ0MzQztJQTFCRCxzQkFBSSwyQ0FBWTtRQUpoQjs7O1dBR0c7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM1RDs7O09BQUE7SUFNRCxzQkFBSSx3Q0FBUztRQUpiOzs7V0FHRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFD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Q0FBQzthQUNyRDtZQUNELElBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUM7Z0JBQzdDLFNBQVM7YUFDVjtZQUVELGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUztlQUM1QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFDO1lBQ25HLE9BQU87U0FDUjtRQUVELGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDM0QsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0tBQ2pEOztnQkF0UkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLCsrQ0FBeUM7O2lCQUUxQzs7OztnQkFiUSxjQUFjO2dCQUpvRCxpQkFBaUI7Ozt1QkFtQnpGLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7MEJBRUwsTUFBTTs7NEJBM0JUOztTQWtCYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuLi9tZW51LWl0ZW0nO1xuaW1wb3J0IHsgQ2xpZW50RXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudCc7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uLy4uL2Jhc2UvYXBwLXV0aWxzJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudUl0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vbWVudS1pdGVtLWJ1aWxkZXInO1xuaW1wb3J0IHsgVWlEb2N1bWVudCB9IGZyb20gJy4uLy4uL2Jhc2UvdWktZG9jdW1lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gJy4uLy4uL2Jhc2Uva2V5LXV0aWxzJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgbWVudSBpdGVtIGNvbXBvbmVudC4gQ2hpbGQgcmVuZGVyZWQgYnkgTWVudSBkaXJlY3RpdmVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3Z0LW1lbnUtaXRlbS1jb21wXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0e1xuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1lbnVJdGVtczogQXJyYXk8TWVudUl0ZW0+O1xuICBASW5wdXQoKSBkaXNwbGF5OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG4gIEBJbnB1dCgpIHBvcHVwTWVudUlkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIG1lbnUgaXRlbXMgZXhpc3RcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBbW21lbnVJdGVtc11dIGV4aXN0cyBhbmQgaGFzIDEgb3IgbW9yZSBpdGVtc1xuICAgKi9cbiAgZ2V0IGhhc01lbnVJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZW51SXRlbXMgIT0gbnVsbCAmJiB0aGlzLm1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgbWVudSBpdGVtIGlzIGEgc2VwYXJhdG9yL2RpdmlkZXIgKGkuZS4gaHlwaGVuKVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtZW51IGl0ZW0gdGV4dCBpcyBhIGh5cGhlblxuICAgKi9cbiAgZ2V0IGlzRGl2aWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0ID09PSAnLSc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG1lbnUgaXRlbSBzdHlsZXMgbWFwXG4gICAqIEByZXR1cm4gTWFwIG9mIHN0eWxlc1xuICAgKi9cbiAgZ2V0IG1lbnVTdHlsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbSAhPSBudWxsID8gdGhpcy5pdGVtLnN0eWxlcyA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIEluamVjdHMgcmVmZXJlbmNlIHRvIFtbU2Vzc2lvblNlcnZpY2VdXSBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBBZGRzIG1lbnUgaXRlbSB0byBbW1VpRG9jdW1lbnRdXVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIFVpRG9jdW1lbnQucmVnaXN0ZXJNZW51SXRlbUVsZW1lbnQodGhpcy5pZCwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIFJlbW92ZSBtZW51IGl0ZW0gZnJvbSBbW1VpRG9jdW1lbnRdXVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICB0aGlzLm1lbnVJdGVtcyA9IG51bGw7XG5cbiAgICBVaURvY3VtZW50LnVucmVnaXN0ZXJNZW51SXRlbUVsZW1lbnQodGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHZhbHVlIG9uIHRoZSBtZW51IGl0ZW1cbiAgICogQHBhcmFtIG5hbWUgQXR0cmlidXRlIG5hbWVcbiAgICogQHBhcmFtIHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgIGlmIChuYW1lID09PSBcImRpc3BsYXlcIiB8fCBuYW1lID09PSBcInZpc2libGVcIikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIjtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaXRlbS5kaXNwbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pdGVtLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9IGVsc2UgaWYgKE1lbnVJdGVtQnVpbGRlci5rbm93bktleXMuaW5kZXhPZihuYW1lKSA8IDApIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbS5jdXN0b21BdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtLmN1c3RvbUF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZSBBdHRyaWJ1dGUgbmFtZVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgIGlmIChNZW51SXRlbUJ1aWxkZXIua25vd25LZXlzLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlcyA9PSBudWxsID8gbnVsbCA6IHRoaXMuaXRlbS5jdXN0b21BdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcImRpc3BsYXlcIiB8fCBuYW1lID09PSBcInZpc2libGVcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5O1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcImlkXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBbW2lkXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgW1tpZF1dIHZhbHVlXG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgW1t0ZXh0XV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgW1t0ZXh0XV0gdmFsdWVcbiAgICovXG4gIGdldFRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZybyBtb3VzZWVudGVyIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBldmVudFxuICAgKi9cbiAgaGFuZGxlT25FbnRlcihldmVudCkge1xuICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcblxuICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCh0aGlzLCBjbGllbnRFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXRlbSAhPSBudWxsICYmIHRoaXMuaXRlbS5wYXJlbnRTY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLml0ZW0ucGFyZW50U2NyZWVuSWQpO1xuICAgIH1cblxuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuXG4gICAgaWYgKHRoaXMuaXRlbSAmJiB0eXBlb2YgdGhpcy5pdGVtLm9uQ29tbWFuZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLml0ZW0ub25Db21tYW5kQ2FsbGJhY2sodGhpcy5pdGVtKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0ub25Db21tYW5kKSB7XG4gICAgICB0aGlzLml0ZW0ub25Db21tYW5kLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3B1cE1lbnVJZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmhpZGVDb250ZXh0TWVudSh0aGlzLnBvcHVwTWVudUlkKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbW91c2VlbnRlci4gRm9jdXNlcyB0aGUgZXZlbnQgdGFyZ2V0XG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBldmVudFxuICAgKi9cbiAgaGFuZGxlTW91c2VFbnRlcihldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5mb2N1cygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrLlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IE9uQ29tbWFuZFxuICAgKi9cbiAgaGFuZGxlT25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcblxuICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCh0aGlzLCBjbGllbnRFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXRlbSAhPSBudWxsICYmIHRoaXMuaXRlbS5wYXJlbnRTY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLml0ZW0ucGFyZW50U2NyZWVuSWQpO1xuICAgIH1cblxuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuXG4gICAgaWYgKHRoaXMuaXRlbSAmJiB0eXBlb2YgdGhpcy5pdGVtLm9uQ29tbWFuZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLml0ZW0ub25Db21tYW5kQ2FsbGJhY2sodGhpcy5pdGVtKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0ub25Db21tYW5kKSB7XG4gICAgICB0aGlzLml0ZW0ub25Db21tYW5kLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3B1cE1lbnVJZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmhpZGVDb250ZXh0TWVudSh0aGlzLnBvcHVwTWVudUlkKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbW91c2Vkb3duIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudCBNb3VzZSBkb3duIGV2ZW50XG4gICAqL1xuICBoYW5kbGVNb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLml0ZW0gIT0gbnVsbCAmJiB0aGlzLml0ZW0ucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5pdGVtLnBhcmVudFNjcmVlbklkKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcblxuICAgIGlmICh0aGlzLml0ZW0gJiYgdHlwZW9mIHRoaXMuaXRlbS5vbk1vdXNlRG93bkNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMuaXRlbS5vbk1vdXNlRG93bkNhbGxiYWNrKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybnMgT2JqZWN0IE1ldGFkYXRhIGFzIEpTT05cbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbiA9IHt9O1xuXG4gICAganNvbltcInRhZ05hbWVcIl0gPSBcIm1lbnVJdGVtXCI7XG4gICAganNvbltcIm54VGFnTmFtZVwiXSA9IFwibWVudUl0ZW1cIjtcblxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpIHtcbiAgICAgIGpzb25bXCJpZFwiXSA9IHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGV4dCAhPSBudWxsKSB7XG4gICAgICBqc29uW1widGV4dFwiXSA9IHRoaXMudGV4dDtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3B1cE1lbnVJZCAhPSBudWxsKSB7XG4gICAgICBqc29uW1wicG9wdXBcIl0gPSBcIiNcIiArIHRoaXMucG9wdXBNZW51SWQ7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMuaXRlbS5jdXN0b21BdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBfLmtleXModGhpcy5pdGVtLmN1c3RvbUF0dHJpYnV0ZXMpO1xuXG4gICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICBqc29uW2tleV0gPSBLZXlVdGlscy50b0pzb25WYWx1ZSh0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRvIHNob3cgdGhlIHN1Ym1lbnUgaXRlbXMgYnkgYWRkaW5nIENTUyBjbGFzc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGRpc3BTdWJtZW51KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50VGFyZ2V0OiBhbnkgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGN1cnJlbnRDaGlsZHJlbjogQXJyYXk8YW55PiA9IGN1cnJlbnRUYXJnZXQuY2hpbGRyZW47XG4gICAgY29uc3QgcGFyZW50Q2hpbGRyZW46IEFycmF5PGFueT4gPSBjdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG5cbiAgICBmb3IobGV0IGkgPSAwLCBsZW4gPSBwYXJlbnRDaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICBpZihwYXJlbnRDaGlsZHJlbltpXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgcGFyZW50Q2hpbGRyZW5baV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCI7XG4gICAgICB9XG4gICAgICBpZihwYXJlbnRDaGlsZHJlbltpXS5jaGlsZHJlblsxXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudENoaWxkcmVuW2ldLmNoaWxkcmVuWzFdLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwLXN1Yi1tZW51LWRpc3BsYXknKTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50Q2hpbGRyZW5bMV0gPT09IHVuZGVmaW5lZFxuICAgICAgICB8fCAoY3VycmVudENoaWxkcmVuWzBdICE9PSB1bmRlZmluZWQgJiYgIWN1cnJlbnRDaGlsZHJlblswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLWl0ZW0nKSkpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRDaGlsZHJlblsxXS5jbGFzc0xpc3QuYWRkKCdwb3B1cC1zdWItbWVudS1kaXNwbGF5Jyk7XG4gICAgY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmNWRlOTJcIjtcbiAgfVxufVxuIl19