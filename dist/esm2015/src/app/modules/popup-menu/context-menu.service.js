/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { MenuItemBuilder } from './menu-item-builder';
import * as _ from "lodash";
import * as i0 from "@angular/core";
/**
 * @record
 */
export function PopupMenuData() { }
/** @type {?} */
PopupMenuData.prototype.menuItems;
/** @type {?} */
PopupMenuData.prototype.parentScreenId;
/**
 * Service class to handle context menus
 */
export class ContextMenuService {
    constructor() {
        this.contextMenuMap = new Map();
        this.activeMenuSubject = new Subject();
        this.activeMenuObservable = this.activeMenuSubject.asObservable();
    }
    /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    registerContextMenu(name, menuItems, parentScreenId = null) {
        /** @type {?} */
        const key = this.rekey(name);
        if (this.contextMenuMap.has(key)) {
            /** @type {?} */
            const menuData = this.contextMenuMap.get(key);
            if (parentScreenId != null && parentScreenId !== "") {
                menuData.parentScreenId = parentScreenId;
            }
            menuData.menuItems = menuItems;
        }
        else {
            this.contextMenuMap.set(key, {
                menuItems: menuItems,
                parentScreenId: parentScreenId
            });
        }
    }
    /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    showContextMenu(name) {
        /** @type {?} */
        let hasContextMenu = false;
        if (this.contextMenuMap.has(this.rekey(name))) {
            hasContextMenu = true;
        }
        this.setActiveMenu(name);
        this.activeMenu = name;
        if (this.menuItemBuilders != null) {
            this.menuItemBuilders.forEach(menuItemBuilder => menuItemBuilder._free());
            this.menuItemBuilders = [];
        }
        return hasContextMenu;
    }
    /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    hideContextMenu(name) {
        this.setActiveMenu(null);
        this.activeMenu = null;
    }
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    getContextMenuItems(name) {
        /** @type {?} */
        const menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.menuItems;
        }
        return null;
    }
    /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    getContextMenuParentScreenId(name) {
        /** @type {?} */
        const menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.parentScreenId;
        }
        return null;
    }
    /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    removeContextMenu(name) {
        this.contextMenuMap.delete(this.rekey(name));
        if (this.activeMenu === name) {
            this.activeMenu = null;
        }
    }
    /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    setActiveMenu(id) {
        this.activeMenuSubject.next(id);
    }
    /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    resetMenu(id, menuItems) {
        /** @type {?} */
        let newMenuItems;
        /** @type {?} */
        const parentScreenId = this.getContextMenuParentScreenId(id);
        if (menuItems.length > 0 && menuItems[0] instanceof MenuItemBuilder) {
            newMenuItems = _.map(menuItems, (menuItem) => menuItem.toMenuItem(parentScreenId));
        }
        else {
            newMenuItems = (/** @type {?} */ (menuItems)) || [];
        }
        this.registerContextMenu(id, newMenuItems);
    }
    /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    rekey(key) {
        return key.toLowerCase();
    }
    /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    _trackMenuItemBuilderForMemRelease(menuItemBuilder) {
        if (this.menuItemBuilders == null) {
            this.menuItemBuilders = [];
        }
        this.menuItemBuilders.push(menuItemBuilder);
    }
}
ContextMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextMenuService.ctorParameters = () => [];
/** @nocollapse */ ContextMenuService.ngInjectableDef = i0.defineInjectable({ factory: function ContextMenuService_Factory() { return new ContextMenuService(); }, token: ContextMenuService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ContextMenuService.prototype.contextMenuMap;
    /** @type {?} */
    ContextMenuService.prototype.activeMenuSubject;
    /** @type {?} */
    ContextMenuService.prototype.activeMenu;
    /** @type {?} */
    ContextMenuService.prototype.menuItemBuilders;
    /** @type {?} */
    ContextMenuService.prototype.activeMenuObservable;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHdEQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhNUIsTUFBTTtJQVFKOzhCQVBxRCxJQUFJLEdBQUcsRUFBeUI7aUNBQ3hDLElBQUksT0FBTyxFQUFVO29DQUkzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFO0tBRTNDOzs7Ozs7OztJQVFqQixtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsU0FBMEIsRUFBRSxpQkFBeUIsSUFBSTs7UUFDekYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU5QyxJQUFJLGNBQWMsSUFBSSxJQUFJLElBQUksY0FBYyxLQUFLLEVBQUUsRUFBRTtnQkFDbkQsUUFBUSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7YUFDMUM7WUFFRCxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUMzQixTQUFTLEVBQUUs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Ozs7SUFPM0Isa0NBQWtDLENBQUMsZUFBZ0M7UUFDakUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzdDOzs7WUEzSkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wdXBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IE1lbnVJdGVtQnVpbGRlciB9IGZyb20gJy4vbWVudS1pdGVtLWJ1aWxkZXInO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUtaXRlbSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvcHVwTWVudURhdGEge1xuICBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPjtcbiAgcGFyZW50U2NyZWVuSWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTZXJ2aWNlIGNsYXNzIHRvIGhhbmRsZSBjb250ZXh0IG1lbnVzXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51U2VydmljZSB7XG4gIHByaXZhdGUgY29udGV4dE1lbnVNYXA6IE1hcDxzdHJpbmcsIFBvcHVwTWVudURhdGE+ID0gbmV3IE1hcDxzdHJpbmcsIFBvcHVwTWVudURhdGE+KCk7XG4gIHByaXZhdGUgYWN0aXZlTWVudVN1YmplY3Q6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBhY3RpdmVNZW51OiBzdHJpbmc7XG4gIHByaXZhdGUgbWVudUl0ZW1CdWlsZGVyczogQXJyYXk8TWVudUl0ZW1CdWlsZGVyPjtcblxuICBhY3RpdmVNZW51T2JzZXJ2YWJsZSA9IHRoaXMuYWN0aXZlTWVudVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBuYW1lIFxuICAgKiBAcGFyYW0gbWVudUl0ZW1zIFxuICAgKiBAcGFyYW0gcGFyZW50U2NyZWVuSWQgXG4gICAqL1xuICByZWdpc3RlckNvbnRleHRNZW51KG5hbWU6IHN0cmluZywgbWVudUl0ZW1zOiBBcnJheTxNZW51SXRlbT4sIHBhcmVudFNjcmVlbklkOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5yZWtleShuYW1lKTtcbiAgICBpZiAodGhpcy5jb250ZXh0TWVudU1hcC5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgbWVudURhdGEgPSB0aGlzLmNvbnRleHRNZW51TWFwLmdldChrZXkpO1xuXG4gICAgICBpZiAocGFyZW50U2NyZWVuSWQgIT0gbnVsbCAmJiBwYXJlbnRTY3JlZW5JZCAhPT0gXCJcIikge1xuICAgICAgICBtZW51RGF0YS5wYXJlbnRTY3JlZW5JZCA9IHBhcmVudFNjcmVlbklkO1xuICAgICAgfVxuXG4gICAgICBtZW51RGF0YS5tZW51SXRlbXMgPSBtZW51SXRlbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dE1lbnVNYXAuc2V0KGtleSwge1xuICAgICAgICBtZW51SXRlbXM6IG1lbnVJdGVtcyxcbiAgICAgICAgcGFyZW50U2NyZWVuSWQ6IHBhcmVudFNjcmVlbklkXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBhY3RpdmUgYW5kIHZpc2libGUgY29udGV4dCBtZW51IGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgXG4gICAqL1xuICBzaG93Q29udGV4dE1lbnUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhc0NvbnRleHRNZW51OiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgaWYgKHRoaXMuY29udGV4dE1lbnVNYXAuaGFzKHRoaXMucmVrZXkobmFtZSkpKSB7XG4gICAgICBoYXNDb250ZXh0TWVudSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRBY3RpdmVNZW51KG5hbWUpO1xuICAgIHRoaXMuYWN0aXZlTWVudSA9IG5hbWU7XG5cbiAgICBpZiAodGhpcy5tZW51SXRlbUJ1aWxkZXJzICE9IG51bGwpIHtcbiAgICAgIHRoaXMubWVudUl0ZW1CdWlsZGVycy5mb3JFYWNoKG1lbnVJdGVtQnVpbGRlcj0+bWVudUl0ZW1CdWlsZGVyLl9mcmVlKCkpO1xuICAgICAgdGhpcy5tZW51SXRlbUJ1aWxkZXJzID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc0NvbnRleHRNZW51O1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGUgbWVudSBieSBuYW1lLCBhbmQgaGlkZSBpdFxuICAgKiBAcGFyYW0gbmFtZVxuICAgKi9cbiAgaGlkZUNvbnRleHRNZW51KG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc2V0QWN0aXZlTWVudShudWxsKTtcbiAgICB0aGlzLmFjdGl2ZU1lbnUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBtZW51IGl0ZW1zIGJ5IFtbUG9wdXBNZW51RGF0YV1dIG5hbWUga2V5XG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgW1tQb3B1cE1lbnVEYXRhXV0ga2V5XG4gICAqIEByZXR1cm5zIE1lbnUgaXRlbXMgaW4gZGF0YSBpZiBpdCBleGlzdHMsIG90aGVyd2lzZSBudWxsXG4gICAqL1xuICBnZXRDb250ZXh0TWVudUl0ZW1zKG5hbWU6IHN0cmluZyk6IEFycmF5PE1lbnVJdGVtPiB7XG4gICAgY29uc3QgbWVudURhdGEgPSB0aGlzLmNvbnRleHRNZW51TWFwLmdldCh0aGlzLnJla2V5KG5hbWUpKTtcblxuICAgIGlmIChtZW51RGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gbWVudURhdGEubWVudUl0ZW1zO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWVudSdzIHBhcmVudCBpZFxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIFtbUG9wdXBNZW51RGF0YV1dIGl0ZW0ga2V5XG4gICAqL1xuICBnZXRDb250ZXh0TWVudVBhcmVudFNjcmVlbklkKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IG1lbnVEYXRhID0gdGhpcy5jb250ZXh0TWVudU1hcC5nZXQodGhpcy5yZWtleShuYW1lKSk7XG5cbiAgICBpZiAobWVudURhdGEgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG1lbnVEYXRhLnBhcmVudFNjcmVlbklkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb250ZXh0IG1lbnUgaXRlbSBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgW1tQb3B1cE1lbnVEYXRhXV0gaXRlbSBrZXlcbiAgICovXG4gIHJlbW92ZUNvbnRleHRNZW51KG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY29udGV4dE1lbnVNYXAuZGVsZXRlKHRoaXMucmVrZXkobmFtZSkpO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlTWVudSA9PT0gbmFtZSkge1xuICAgICAgdGhpcy5hY3RpdmVNZW51ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFjdGl2ZSBtZW51XG4gICAqIEBwYXJhbSBpZCBJZCBvZiBtZW51IHRvIHNldCBhcyBhY3RpdmVcbiAgICovXG4gIHNldEFjdGl2ZU1lbnUoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuYWN0aXZlTWVudVN1YmplY3QubmV4dChpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG1lbnUgaXRlbXMgYnkgcGFyZW50IHNjcmVlbiBpZFxuICAgKiBAcGFyYW0gaWQgSWQgb2YgcGFyZW50IGNvbnRhaW5pbmcgbWVudVxuICAgKiBAcGFyYW0gbWVudUl0ZW1zIEl0ZW1zIHRvIHNldFxuICAgKi9cbiAgcmVzZXRNZW51KGlkOiBzdHJpbmcsIG1lbnVJdGVtczogQXJyYXk8TWVudUl0ZW1CdWlsZGVyPikge1xuICAgIGxldCBuZXdNZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPjtcblxuICAgIGNvbnN0IHBhcmVudFNjcmVlbklkID0gdGhpcy5nZXRDb250ZXh0TWVudVBhcmVudFNjcmVlbklkKGlkKTtcblxuICAgIGlmIChtZW51SXRlbXMubGVuZ3RoID4gMCAmJiBtZW51SXRlbXNbMF0gaW5zdGFuY2VvZiBNZW51SXRlbUJ1aWxkZXIpIHtcbiAgICAgIG5ld01lbnVJdGVtcyA9IF8ubWFwKG1lbnVJdGVtcywgKG1lbnVJdGVtOiBNZW51SXRlbUJ1aWxkZXIpPT5tZW51SXRlbS50b01lbnVJdGVtKHBhcmVudFNjcmVlbklkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld01lbnVJdGVtcyA9IChtZW51SXRlbXMgYXMgYW55KXx8IFtdO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0ZXJDb250ZXh0TWVudShpZCwgbmV3TWVudUl0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGtleSB0byBsb3dlcmNhc2VcbiAgICogQHBhcmFtIGtleSBcbiAgICogQHJldHVybnMga2V5IHZhbHVlIGFzIGxvd2VyY2FzZWQgc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIHJla2V5KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgZm9yIHNwZWNpYWwgY2FzZVxuICAgKiBAcGFyYW0gbWVudUl0ZW1CdWlsZGVyIE1lbnVJdGVtQnVpbGRlciB0byBiZSByZWxlYXNlZCBvZiBtZW1vcnkgd2hlbiBzaG93Q29udGV4dE1lbnUgaXMgY2FsbGVkLlxuICAgKi9cbiAgX3RyYWNrTWVudUl0ZW1CdWlsZGVyRm9yTWVtUmVsZWFzZShtZW51SXRlbUJ1aWxkZXI6IE1lbnVJdGVtQnVpbGRlcikge1xuICAgIGlmICh0aGlzLm1lbnVJdGVtQnVpbGRlcnMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5tZW51SXRlbUJ1aWxkZXJzID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5tZW51SXRlbUJ1aWxkZXJzLnB1c2gobWVudUl0ZW1CdWlsZGVyKTtcbiAgfVxufVxuIl19