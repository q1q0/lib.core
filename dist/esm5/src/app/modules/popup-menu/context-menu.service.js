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
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.contextMenuMap = new Map();
        this.activeMenuSubject = new Subject();
        this.activeMenuObservable = this.activeMenuSubject.asObservable();
    }
    /**
     *
     * @param name
     * @param menuItems
     * @param parentScreenId
     */
    /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    ContextMenuService.prototype.registerContextMenu = /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (name, menuItems, parentScreenId) {
        if (parentScreenId === void 0) { parentScreenId = null; }
        /** @type {?} */
        var key = this.rekey(name);
        if (this.contextMenuMap.has(key)) {
            /** @type {?} */
            var menuData = this.contextMenuMap.get(key);
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
    };
    /**
     * Set the active and visible context menu by name
     * @param name
     */
    /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    ContextMenuService.prototype.showContextMenu = /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var hasContextMenu = false;
        if (this.contextMenuMap.has(this.rekey(name))) {
            hasContextMenu = true;
        }
        this.setActiveMenu(name);
        this.activeMenu = name;
        if (this.menuItemBuilders != null) {
            this.menuItemBuilders.forEach(function (menuItemBuilder) { return menuItemBuilder._free(); });
            this.menuItemBuilders = [];
        }
        return hasContextMenu;
    };
    /**
     * Deactivate menu by name, and hide it
     * @param name
     */
    /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    ContextMenuService.prototype.hideContextMenu = /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.setActiveMenu(null);
        this.activeMenu = null;
    };
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param name Name of [[PopupMenuData]] key
     * @returns Menu items in data if it exists, otherwise null
     */
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    ContextMenuService.prototype.getContextMenuItems = /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    function (name) {
        /** @type {?} */
        var menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.menuItems;
        }
        return null;
    };
    /**
     * Get the menu's parent id
     * @param name Name of [[PopupMenuData]] item key
     */
    /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    ContextMenuService.prototype.getContextMenuParentScreenId = /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.parentScreenId;
        }
        return null;
    };
    /**
     * Remove context menu item by name
     * @param name Name of [[PopupMenuData]] item key
     */
    /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    ContextMenuService.prototype.removeContextMenu = /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    function (name) {
        this.contextMenuMap.delete(this.rekey(name));
        if (this.activeMenu === name) {
            this.activeMenu = null;
        }
    };
    /**
     * Set active menu
     * @param id Id of menu to set as active
     */
    /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    ContextMenuService.prototype.setActiveMenu = /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    function (id) {
        this.activeMenuSubject.next(id);
    };
    /**
     * Set menu items by parent screen id
     * @param id Id of parent containing menu
     * @param menuItems Items to set
     */
    /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    ContextMenuService.prototype.resetMenu = /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    function (id, menuItems) {
        /** @type {?} */
        var newMenuItems;
        /** @type {?} */
        var parentScreenId = this.getContextMenuParentScreenId(id);
        if (menuItems.length > 0 && menuItems[0] instanceof MenuItemBuilder) {
            newMenuItems = _.map(menuItems, function (menuItem) { return menuItem.toMenuItem(parentScreenId); });
        }
        else {
            newMenuItems = (/** @type {?} */ (menuItems)) || [];
        }
        this.registerContextMenu(id, newMenuItems);
    };
    /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    ContextMenuService.prototype.rekey = /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    function (key) {
        return key.toLowerCase();
    };
    /**
     * This is for special case
     * @param menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     */
    /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    ContextMenuService.prototype._trackMenuItemBuilderForMemRelease = /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    function (menuItemBuilder) {
        if (this.menuItemBuilders == null) {
            this.menuItemBuilders = [];
        }
        this.menuItemBuilders.push(menuItemBuilder);
    };
    ContextMenuService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextMenuService.ctorParameters = function () { return []; };
    /** @nocollapse */ ContextMenuService.ngInjectableDef = i0.defineInjectable({ factory: function ContextMenuService_Factory() { return new ContextMenuService(); }, token: ContextMenuService, providedIn: "root" });
    return ContextMenuService;
}());
export { ContextMenuService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHdEQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBcUIxQjs4QkFQcUQsSUFBSSxHQUFHLEVBQXlCO2lDQUN4QyxJQUFJLE9BQU8sRUFBVTtvQ0FJM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRTtLQUUzQztJQUVqQjs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxnREFBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsSUFBWSxFQUFFLFNBQTBCLEVBQUUsY0FBNkI7UUFBN0IsK0JBQUEsRUFBQSxxQkFBNkI7O1FBQ3pGLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTs7WUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUMsSUFBSSxjQUFjLElBQUksSUFBSSxJQUFJLGNBQWMsS0FBSyxFQUFFLEVBQUU7Z0JBQ25ELFFBQVEsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO2FBQzFDO1lBRUQsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMs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Y0FBYyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztTQUNuRzthQUFNO1lBQ0wsWUFBWSxHQUFHLG1CQUFDLFNBQWdCLEVBQUMsSUFBRyxFQUFFLENBQUM7U0FDeEM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7SUFPTyxrQ0FBSzs7Ozs7Y0FBQyxHQUFXO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUczQjs7O09BR0c7Ozs7OztJQUNILCtEQUFrQzs7Ozs7SUFBbEMsVUFBbUMsZUFBZ0M7UUFDakUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzdDOztnQkEzSkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7NkJBbEJEOztTQW1CYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3B1cE1lbnVDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgTWVudUl0ZW1CdWlsZGVyIH0gZnJvbSAnLi9tZW51LWl0ZW0tYnVpbGRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJy4vbWVudS1pdGVtJztcblxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9wdXBNZW51RGF0YSB7XG4gIG1lbnVJdGVtczogQXJyYXk8TWVudUl0ZW0+O1xuICBwYXJlbnRTY3JlZW5JZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFNlcnZpY2UgY2xhc3MgdG8gaGFuZGxlIGNvbnRleHQgbWVudXNcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb250ZXh0TWVudU1hcDogTWFwPHN0cmluZywgUG9wdXBNZW51RGF0YT4gPSBuZXcgTWFwPHN0cmluZywgUG9wdXBNZW51RGF0YT4oKTtcbiAgcHJpdmF0ZSBhY3RpdmVNZW51U3ViamVjdDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwcml2YXRlIGFjdGl2ZU1lbnU6IHN0cmluZztcbiAgcHJpdmF0ZSBtZW51SXRlbUJ1aWxkZXJzOiBBcnJheTxNZW51SXRlbUJ1aWxkZXI+O1xuXG4gIGFjdGl2ZU1lbnVPYnNlcnZhYmxlID0gdGhpcy5hY3RpdmVNZW51U3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIG5hbWUgXG4gICAqIEBwYXJhbSBtZW51SXRlbXMgXG4gICAqIEBwYXJhbSBwYXJlbnRTY3JlZW5JZCBcbiAgICovXG4gIHJlZ2lzdGVyQ29udGV4dE1lbnUobmFtZTogc3RyaW5nLCBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPiwgcGFyZW50U2NyZWVuSWQ6IHN0cmluZyA9IG51bGwpIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLnJla2V5KG5hbWUpO1xuICAgIGlmICh0aGlzLmNvbnRleHRNZW51TWFwLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCBtZW51RGF0YSA9IHRoaXMuY29udGV4dE1lbnVNYXAuZ2V0KGtleSk7XG5cbiAgICAgIGlmIChwYXJlbnRTY3JlZW5JZCAhPSBudWxsICYmIHBhcmVudFNjcmVlbklkICE9PSBcIlwiKSB7XG4gICAgICAgIG1lbnVEYXRhLnBhcmVudFNjcmVlbklkID0gcGFyZW50U2NyZWVuSWQ7XG4gICAgICB9XG5cbiAgICAgIG1lbnVEYXRhLm1lbnVJdGVtcyA9IG1lbnVJdGVtcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0TWVudU1hcC5zZXQoa2V5LCB7XG4gICAgICAgIG1lbnVJdGVtczogbWVudUl0ZW1zLFxuICAgICAgICBwYXJlbnRTY3JlZW5JZDogcGFyZW50U2NyZWVuSWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGFjdGl2ZSBhbmQgdmlzaWJsZSBjb250ZXh0IG1lbnUgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZSBcbiAgICovXG4gIHNob3dDb250ZXh0TWVudShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgaGFzQ29udGV4dE1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBpZiAodGhpcy5jb250ZXh0TWVudU1hcC5oYXModGhpcy5yZWtleShuYW1lKSkpIHtcbiAgICAgIGhhc0NvbnRleHRNZW51ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldEFjdGl2ZU1lbnUobmFtZSk7XG4gICAgdGhpcy5hY3RpdmVNZW51ID0gbmFtZTtcblxuICAgIGlmICh0aGlzLm1lbnVJdGVtQnVpbGRlcnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tZW51SXRlbUJ1aWxkZXJzLmZvckVhY2gobWVudUl0ZW1CdWlsZGVyPT5tZW51SXRlbUJ1aWxkZXIuX2ZyZWUoKSk7XG4gICAgICB0aGlzLm1lbnVJdGVtQnVpbGRlcnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzQ29udGV4dE1lbnU7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZSBtZW51IGJ5IG5hbWUsIGFuZCBoaWRlIGl0XG4gICAqIEBwYXJhbSBuYW1lXG4gICAqL1xuICBoaWRlQ29udGV4dE1lbnUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRBY3RpdmVNZW51KG51bGwpO1xuICAgIHRoaXMuYWN0aXZlTWVudSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG1lbnUgaXRlbXMgYnkgW1tQb3B1cE1lbnVEYXRhXV0gbmFtZSBrZXlcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiBbW1BvcHVwTWVudURhdGFdXSBrZXlcbiAgICogQHJldHVybnMgTWVudSBpdGVtcyBpbiBkYXRhIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIG51bGxcbiAgICovXG4gIGdldENvbnRleHRNZW51SXRlbXMobmFtZTogc3RyaW5nKTogQXJyYXk8TWVudUl0ZW0+IHtcbiAgICBjb25zdCBtZW51RGF0YSA9IHRoaXMuY29udGV4dE1lbnVNYXAuZ2V0KHRoaXMucmVrZXkobmFtZSkpO1xuXG4gICAgaWYgKG1lbnVEYXRhICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBtZW51RGF0YS5tZW51SXRlbXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtZW51J3MgcGFyZW50IGlkXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgW1tQb3B1cE1lbnVEYXRhXV0gaXRlbSBrZXlcbiAgICovXG4gIGdldENvbnRleHRNZW51UGFyZW50U2NyZWVuSWQobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbWVudURhdGEgPSB0aGlzLmNvbnRleHRNZW51TWFwLmdldCh0aGlzLnJla2V5KG5hbWUpKTtcblxuICAgIGlmIChtZW51RGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gbWVudURhdGEucGFyZW50U2NyZWVuSWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNvbnRleHQgbWVudSBpdGVtIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiBbW1BvcHVwTWVudURhdGFdXSBpdGVtIGtleVxuICAgKi9cbiAgcmVtb3ZlQ29udGV4dE1lbnUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jb250ZXh0TWVudU1hcC5kZWxldGUodGhpcy5yZWtleShuYW1lKSk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVNZW51ID09PSBuYW1lKSB7XG4gICAgICB0aGlzLmFjdGl2ZU1lbnUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWN0aXZlIG1lbnVcbiAgICogQHBhcmFtIGlkIElkIG9mIG1lbnUgdG8gc2V0IGFzIGFjdGl2ZVxuICAgKi9cbiAgc2V0QWN0aXZlTWVudShpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hY3RpdmVNZW51U3ViamVjdC5uZXh0KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbWVudSBpdGVtcyBieSBwYXJlbnQgc2NyZWVuIGlkXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBwYXJlbnQgY29udGFpbmluZyBtZW51XG4gICAqIEBwYXJhbSBtZW51SXRlbXMgSXRlbXMgdG8gc2V0XG4gICAqL1xuICByZXNldE1lbnUoaWQ6IHN0cmluZywgbWVudUl0ZW1zOiBBcnJheTxNZW51SXRlbUJ1aWxkZXI+KSB7XG4gICAgbGV0IG5ld01lbnVJdGVtczogQXJyYXk8TWVudUl0ZW0+O1xuXG4gICAgY29uc3QgcGFyZW50U2NyZWVuSWQgPSB0aGlzLmdldENvbnRleHRNZW51UGFyZW50U2NyZWVuSWQoaWQpO1xuXG4gICAgaWYgKG1lbnVJdGVtcy5sZW5ndGggPiAwICYmIG1lbnVJdGVtc1swXSBpbnN0YW5jZW9mIE1lbnVJdGVtQnVpbGRlcikge1xuICAgICAgbmV3TWVudUl0ZW1zID0gXy5tYXAobWVudUl0ZW1zLCAobWVudUl0ZW06IE1lbnVJdGVtQnVpbGRlcik9Pm1lbnVJdGVtLnRvTWVudUl0ZW0ocGFyZW50U2NyZWVuSWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TWVudUl0ZW1zID0gKG1lbnVJdGVtcyBhcyBhbnkpfHwgW107XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlckNvbnRleHRNZW51KGlkLCBuZXdNZW51SXRlbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQga2V5IHRvIGxvd2VyY2FzZVxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcmV0dXJucyBrZXkgdmFsdWUgYXMgbG93ZXJjYXNlZCBzdHJpbmdcbiAgICovXG4gIHByaXZhdGUgcmVrZXkoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBmb3Igc3BlY2lhbCBjYXNlXG4gICAqIEBwYXJhbSBtZW51SXRlbUJ1aWxkZXIgTWVudUl0ZW1CdWlsZGVyIHRvIGJlIHJlbGVhc2VkIG9mIG1lbW9yeSB3aGVuIHNob3dDb250ZXh0TWVudSBpcyBjYWxsZWQuXG4gICAqL1xuICBfdHJhY2tNZW51SXRlbUJ1aWxkZXJGb3JNZW1SZWxlYXNlKG1lbnVJdGVtQnVpbGRlcjogTWVudUl0ZW1CdWlsZGVyKSB7XG4gICAgaWYgKHRoaXMubWVudUl0ZW1CdWlsZGVycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLm1lbnVJdGVtQnVpbGRlcnMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVJdGVtQnVpbGRlcnMucHVzaChtZW51SXRlbUJ1aWxkZXIpO1xuICB9XG59XG4iXX0=