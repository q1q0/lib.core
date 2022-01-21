/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class MenuItemComponent {
    /**
     *
     * @param {?} sessionService Injects reference to [[SessionService]] instance
     * @param {?} cd
     */
    constructor(sessionService, cd) {
        this.sessionService = sessionService;
        this.cd = cd;
        this.display = true;
        this.onClick = new EventEmitter();
    }
    /**
     * Check if menu items exist
     * @return {?} True if [[menuItems]] exists and has 1 or more items
     */
    get hasMenuItems() {
        return this.menuItems != null && this.menuItems.length > 0;
    }
    /**
     * Check if this menu item is a separator/divider (i.e. hyphen)
     * @return {?} True if the menu item text is a hyphen
     */
    get isDivider() {
        return this.text === '-';
    }
    /**
     * Get menu item styles map
     * @return {?} Map of styles
     */
    get menuStyles() {
        return this.item != null ? this.item.styles : null;
    }
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    ngAfterViewInit() {
        UiDocument.registerMenuItemElement(this.id, this);
    }
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    ngOnDestroy() {
        this.item = null;
        this.menuItems = null;
        UiDocument.unregisterMenuItemElement(this.id);
    }
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    setAttribute(name, value) {
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
    }
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    getAttribute(name) {
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
    }
    /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    getId() {
        return this.id;
    }
    /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    getText() {
        return this.text;
    }
    /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    handleOnEnter(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
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
    }
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    handleMouseEnter(event) {
        event.target.focus();
    }
    /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    handleOnClick(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
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
    }
    /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    handleMouseDown(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
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
    }
    /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    toJson() {
        /** @type {?} */
        const json = {};
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
            const keys = _.keys(this.item.customAttributes);
            for (let key of keys) {
                json[key] = KeyUtils.toJsonValue(this.item.customAttributes[key]);
            }
        }
        return json;
    }
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    dispSubmenu(event) {
        /** @type {?} */
        const currentTarget = event.currentTarget;
        /** @type {?} */
        const currentChildren = currentTarget.children;
        /** @type {?} */
        const parentChildren = currentTarget.parentElement.children;
        for (let i = 0, len = parentChildren.length; i < len; i++) {
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
    }
}
MenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[vt-menu-item-comp]',
                template: "<a *ngIf=\"hasMenuItems && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" tabindex=\"-1\">{{text}}</a>\n<a *ngIf=\"hasMenuItems !== true && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" [ngStyle]=\"menuStyles\" tabindex=\"-1\" (keydown.enter)=\"handleOnEnter($event)\" (mouseenter)=\"handleMouseEnter($event)\" (mousedown)=\"handleMouseDown($event)\" (click)=\"handleOnClick($event)\">{{text}}</a>\n<ng-template [ngIf]=\"hasMenuItems\">\n  <ul class=\"dropdown-menu popup-menu\" role=\"menu\">\n    <ng-template ngFor [ngForOf]=\"menuItems\" let-subItem>\n      <li *ngIf=\"subItem.text === '-' && subItem.display !== false\" role=\"separator\" class=\"divider\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.menuItems != null && subItem.menuItems.length > 0 && subItem.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.text !== '-' && (subItem.menuItems == null || subItem.menuItems.length === 0) && subItem.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n    </ng-template>\n  </ul>\n</ng-template>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MenuItemComponent.ctorParameters = () => [
    { type: SessionService },
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcG9wdXAtbWVudS9tZW51LWl0ZW0vbWVudS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFVaEQsTUFBTTs7Ozs7O0lBdUNKLFlBQW9CLGNBQThCLEVBQVUsRUFBcUI7UUFBN0QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7dUJBbkNyRCxJQUFJO3VCQUtaLElBQUksWUFBWSxFQUFRO0tBZ0MzQzs7Ozs7SUExQkQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDNUQ7Ozs7O0lBTUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQztLQUMxQjs7Ozs7SUFNRCxJQUFJLFVBQVU7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QUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7S0FDakQ7OztZQXRSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsKytDQUF5Qzs7YUFFMUM7Ozs7WUFiUSxjQUFjO1lBSm9ELGlCQUFpQjs7O21CQW1CekYsS0FBSztpQkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAnLi4vbWVudS1pdGVtJztcbmltcG9ydCB7IENsaWVudEV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnQtaGFuZGxlci9jbGllbnQtZXZlbnQnO1xuaW1wb3J0IHsgQXBwVXRpbHMgfSBmcm9tICcuLi8uLi9iYXNlL2FwcC11dGlscyc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1lbnVJdGVtQnVpbGRlciB9IGZyb20gJy4uL21lbnUtaXRlbS1idWlsZGVyJztcbmltcG9ydCB7IFVpRG9jdW1lbnQgfSBmcm9tICcuLi8uLi9iYXNlL3VpLWRvY3VtZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgS2V5VXRpbHMgfSBmcm9tICcuLi8uLi9iYXNlL2tleS11dGlscyc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1lbnUgaXRlbSBjb21wb25lbnQuIENoaWxkIHJlbmRlcmVkIGJ5IE1lbnUgZGlyZWN0aXZlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1t2dC1tZW51LWl0ZW0tY29tcF0nLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS1pdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdHtcbiAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPjtcbiAgQElucHV0KCkgZGlzcGxheTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHZpc2libGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuICBASW5wdXQoKSBwb3B1cE1lbnVJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBtZW51IGl0ZW1zIGV4aXN0XG4gICAqIEByZXR1cm5zIFRydWUgaWYgW1ttZW51SXRlbXNdXSBleGlzdHMgYW5kIGhhcyAxIG9yIG1vcmUgaXRlbXNcbiAgICovXG4gIGdldCBoYXNNZW51SXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWVudUl0ZW1zICE9IG51bGwgJiYgdGhpcy5tZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIG1lbnUgaXRlbSBpcyBhIHNlcGFyYXRvci9kaXZpZGVyIChpLmUuIGh5cGhlbilcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbWVudSBpdGVtIHRleHQgaXMgYSBoeXBoZW5cbiAgICovXG4gIGdldCBpc0RpdmlkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCA9PT0gJy0nO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBtZW51IGl0ZW0gc3R5bGVzIG1hcFxuICAgKiBAcmV0dXJuIE1hcCBvZiBzdHlsZXNcbiAgICovXG4gIGdldCBtZW51U3R5bGVzKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW0gIT0gbnVsbCA/IHRoaXMuaXRlbS5zdHlsZXMgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBJbmplY3RzIHJlZmVyZW5jZSB0byBbW1Nlc3Npb25TZXJ2aWNlXV0gaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gQWRkcyBtZW51IGl0ZW0gdG8gW1tVaURvY3VtZW50XV1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBVaURvY3VtZW50LnJlZ2lzdGVyTWVudUl0ZW1FbGVtZW50KHRoaXMuaWQsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgbGlmZWN5Y2xlLiBSZW1vdmUgbWVudSBpdGVtIGZyb20gW1tVaURvY3VtZW50XV1cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgdGhpcy5tZW51SXRlbXMgPSBudWxsO1xuXG4gICAgVWlEb2N1bWVudC51bnJlZ2lzdGVyTWVudUl0ZW1FbGVtZW50KHRoaXMuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbiBhdHRyaWJ1dGUgd2l0aCB2YWx1ZSBvbiB0aGUgbWVudSBpdGVtXG4gICAqIEBwYXJhbSBuYW1lIEF0dHJpYnV0ZSBuYW1lXG4gICAqIEBwYXJhbSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWVcbiAgICovXG4gIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICBpZiAobmFtZSA9PT0gXCJkaXNwbGF5XCIgfHwgbmFtZSA9PT0gXCJ2aXNpYmxlXCIpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLml0ZW0uZGlzcGxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaXRlbS50ZXh0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSBlbHNlIGlmIChNZW51SXRlbUJ1aWxkZXIua25vd25LZXlzLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlcyA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5pdGVtLmN1c3RvbUF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbS5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgQXR0cmlidXRlIG5hbWVcbiAgICovXG4gIGdldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICBpZiAoTWVudUl0ZW1CdWlsZGVyLmtub3duS2V5cy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLmN1c3RvbUF0dHJpYnV0ZXMgPT0gbnVsbCA/IG51bGwgOiB0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlc1tuYW1lXTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJkaXNwbGF5XCIgfHwgbmFtZSA9PT0gXCJ2aXNpYmxlXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJpZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgW1tpZF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFtbaWRdXSB2YWx1ZVxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIG9mIFtbdGV4dF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFtbdGV4dF1dIHZhbHVlXG4gICAqL1xuICBnZXRUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnRleHQ7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmcm8gbW91c2VlbnRlciBldmVudFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgZXZlbnRcbiAgICovXG4gIGhhbmRsZU9uRW50ZXIoZXZlbnQpIHtcbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLml0ZW0gIT0gbnVsbCAmJiB0aGlzLml0ZW0ucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5pdGVtLnBhcmVudFNjcmVlbklkKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcblxuICAgIGlmICh0aGlzLml0ZW0gJiYgdHlwZW9mIHRoaXMuaXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pdGVtLm9uQ29tbWFuZENhbGxiYWNrKHRoaXMuaXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLml0ZW0gJiYgdGhpcy5pdGVtLm9uQ29tbWFuZCkge1xuICAgICAgdGhpcy5pdGVtLm9uQ29tbWFuZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9wdXBNZW51SWQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5oaWRlQ29udGV4dE1lbnUodGhpcy5wb3B1cE1lbnVJZCk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlZW50ZXIuIEZvY3VzZXMgdGhlIGV2ZW50IHRhcmdldFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgZXZlbnRcbiAgICovXG4gIGhhbmRsZU1vdXNlRW50ZXIoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljay5cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBldmVudCBPbkNvbW1hbmRcbiAgICovXG4gIGhhbmRsZU9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLml0ZW0gIT0gbnVsbCAmJiB0aGlzLml0ZW0ucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5pdGVtLnBhcmVudFNjcmVlbklkKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcblxuICAgIGlmICh0aGlzLml0ZW0gJiYgdHlwZW9mIHRoaXMuaXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pdGVtLm9uQ29tbWFuZENhbGxiYWNrKHRoaXMuaXRlbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLml0ZW0gJiYgdGhpcy5pdGVtLm9uQ29tbWFuZCkge1xuICAgICAgdGhpcy5pdGVtLm9uQ29tbWFuZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9wdXBNZW51SWQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5oaWRlQ29udGV4dE1lbnUodGhpcy5wb3B1cE1lbnVJZCk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlZG93biBldmVudFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgZG93biBldmVudFxuICAgKi9cbiAgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pdGVtICE9IG51bGwgJiYgdGhpcy5pdGVtLnBhcmVudFNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInNjcmVlbklkXCIsIHRoaXMuaXRlbS5wYXJlbnRTY3JlZW5JZCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG5cbiAgICBpZiAodGhpcy5pdGVtICYmIHR5cGVvZiB0aGlzLml0ZW0ub25Nb3VzZURvd25DYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLml0ZW0ub25Nb3VzZURvd25DYWxsYmFjayh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IEpTT04gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIE9iamVjdCBNZXRhZGF0YSBhcyBKU09OXG4gICAqL1xuICB0b0pzb24oKToge30ge1xuICAgIGNvbnN0IGpzb24gPSB7fTtcblxuICAgIGpzb25bXCJ0YWdOYW1lXCJdID0gXCJtZW51SXRlbVwiO1xuICAgIGpzb25bXCJueFRhZ05hbWVcIl0gPSBcIm1lbnVJdGVtXCI7XG5cbiAgICBpZiAodGhpcy5pZCAhPSBudWxsKSB7XG4gICAgICBqc29uW1wiaWRcIl0gPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRleHQgIT0gbnVsbCkge1xuICAgICAganNvbltcInRleHRcIl0gPSB0aGlzLnRleHQ7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9wdXBNZW51SWQgIT0gbnVsbCkge1xuICAgICAganNvbltcInBvcHVwXCJdID0gXCIjXCIgKyB0aGlzLnBvcHVwTWVudUlkO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLml0ZW0uY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHRoaXMuaXRlbS5jdXN0b21BdHRyaWJ1dGVzKTtcblxuICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAganNvbltrZXldID0gS2V5VXRpbHMudG9Kc29uVmFsdWUodGhpcy5pdGVtLmN1c3RvbUF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciB0byBzaG93IHRoZSBzdWJtZW51IGl0ZW1zIGJ5IGFkZGluZyBDU1MgY2xhc3NcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBkaXNwU3VibWVudShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFRhcmdldDogYW55ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBjdXJyZW50Q2hpbGRyZW46IEFycmF5PGFueT4gPSBjdXJyZW50VGFyZ2V0LmNoaWxkcmVuO1xuICAgIGNvbnN0IHBhcmVudENoaWxkcmVuOiBBcnJheTxhbnk+ID0gY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuXG4gICAgZm9yKGxldCBpID0gMCwgbGVuID0gcGFyZW50Q2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgaWYocGFyZW50Q2hpbGRyZW5baV0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHBhcmVudENoaWxkcmVuW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZmZmZlwiO1xuICAgICAgfVxuICAgICAgaWYocGFyZW50Q2hpbGRyZW5baV0uY2hpbGRyZW5bMV0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRDaGlsZHJlbltpXS5jaGlsZHJlblsxXS5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cC1zdWItbWVudS1kaXNwbGF5Jyk7XG4gICAgfVxuXG4gICAgaWYoY3VycmVudENoaWxkcmVuWzFdID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgKGN1cnJlbnRDaGlsZHJlblswXSAhPT0gdW5kZWZpbmVkICYmICFjdXJyZW50Q2hpbGRyZW5bMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1pdGVtJykpKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50Q2hpbGRyZW5bMV0uY2xhc3NMaXN0LmFkZCgncG9wdXAtc3ViLW1lbnUtZGlzcGxheScpO1xuICAgIGN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZjVkZTkyXCI7XG4gIH1cbn1cbiJdfQ==