import { Injectable } from '@angular/core';
import { PopupMenuComponent } from './popup-menu.component';
import { Observable, Subject } from "rxjs";
import { MenuItemBuilder } from './menu-item-builder';
import { MenuItem } from './menu-item';

import * as _ from "lodash";

export interface PopupMenuData {
  menuItems: Array<MenuItem>;
  parentScreenId: string;
}

/**
 * Service class to handle context menus
 */
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private contextMenuMap: Map<string, PopupMenuData> = new Map<string, PopupMenuData>();
  private activeMenuSubject: Subject<string> = new Subject<string>();
  private activeMenu: string;
  private menuItemBuilders: Array<MenuItemBuilder>;

  activeMenuObservable = this.activeMenuSubject.asObservable();

  constructor() { }

  /**
   *
   * @param name
   * @param menuItems
   * @param parentScreenId
   */
  registerContextMenu(name: string, menuItems: Array<MenuItem>, parentScreenId: string = null) {
    const key = this.rekey(name);
    if (this.contextMenuMap.has(key)) {
      const menuData = this.contextMenuMap.get(key);

      if (parentScreenId != null && parentScreenId !== "") {
        menuData.parentScreenId = parentScreenId;
      }

      menuData.menuItems = menuItems;
    } else {
      this.contextMenuMap.set(key, {
        menuItems: menuItems,
        parentScreenId: parentScreenId
      });
    }
  }

  /**
   * Set the active and visible context menu by name
   * @param name
   */
  showContextMenu(name: string): boolean {
    let hasContextMenu: boolean = false;

    if (this.contextMenuMap.has(this.rekey(name))) {
      hasContextMenu = true;
    }

    this.setActiveMenu(name);
    this.activeMenu = name;

    if (this.menuItemBuilders != null) {
      this.menuItemBuilders.forEach(menuItemBuilder=>menuItemBuilder._free());
      this.menuItemBuilders = [];
    }

    return hasContextMenu;
  }

  /**
   * Deactivate menu by name, and hide it
   * @param name
   */
  hideContextMenu(name: string) {
    this.setActiveMenu(null);
    this.activeMenu = null;
  }

  /**
   * Get menu items by [[PopupMenuData]] name key
   * @param name Name of [[PopupMenuData]] key
   * @returns Menu items in data if it exists, otherwise null
   */
  getContextMenuItems(name: string): Array<MenuItem> {
    const menuData = this.contextMenuMap.get(this.rekey(name));

    if (menuData != null) {
      return menuData.menuItems;
    }

    return null;
  }

  /**
   * Get the menu's parent id
   * @param name Name of [[PopupMenuData]] item key
   */
  getContextMenuParentScreenId(name: string) {
    const menuData = this.contextMenuMap.get(this.rekey(name));

    if (menuData != null) {
      return menuData.parentScreenId;
    }

    return null;
  }

  /**
   * Remove context menu item by name
   * @param name Name of [[PopupMenuData]] item key
   */
  removeContextMenu(name: string) {
    this.contextMenuMap.delete(this.rekey(name));

    if (this.activeMenu === name) {
      this.activeMenu = null;
    }
  }

  /**
   * Set active menu
   * @param id Id of menu to set as active
   */
  setActiveMenu(id: string) {
    this.activeMenuSubject.next(id);
  }

  /**
   * Set menu items by parent screen id
   * @param id Id of parent containing menu
   * @param menuItems Items to set
   */
  resetMenu(id: string, menuItems: Array<MenuItemBuilder>) {
    let newMenuItems: Array<MenuItem>;

    const parentScreenId = this.getContextMenuParentScreenId(id);

    if (menuItems.length > 0 && menuItems[0] instanceof MenuItemBuilder) {
      newMenuItems = _.map(menuItems, (menuItem: MenuItemBuilder)=>menuItem.toMenuItem(parentScreenId));
    } else {
      newMenuItems = (menuItems as any)|| [];
    }

    this.registerContextMenu(id, newMenuItems);

    if (this.activeMenu == null) {
      if (window.event) {
        try {
          window.event.preventDefault ? window.event.preventDefault() : window.event.returnValue = false;
        } catch (e) {

        }

        try {
          if (typeof window.event.stopPropagation === "function") {
            window.event.stopPropagation();
          }
        } catch (e){

        }
      }

      setTimeout(()=>{
        this.showContextMenu(id);
      });
    }
  }

  /**
   * Convert key to lowercase
   * @param key
   * @returns key value as lowercased string
   */
  private rekey(key: string) {
    return key.toLowerCase();
  }

  /**
   * This is for special case
   * @param menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
   */
  _trackMenuItemBuilderForMemRelease(menuItemBuilder: MenuItemBuilder) {
    if (this.menuItemBuilders == null) {
      this.menuItemBuilders = [];
    }

    this.menuItemBuilders.push(menuItemBuilder);
  }
}
