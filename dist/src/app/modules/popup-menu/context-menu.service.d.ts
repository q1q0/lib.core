import { Observable } from "rxjs";
import { MenuItemBuilder } from './menu-item-builder';
import { MenuItem } from './menu-item';
export interface PopupMenuData {
    menuItems: Array<MenuItem>;
    parentScreenId: string;
}
/**
 * Service class to handle context menus
 */
export declare class ContextMenuService {
    private contextMenuMap;
    private activeMenuSubject;
    private activeMenu;
    private menuItemBuilders;
    activeMenuObservable: Observable<string>;
    constructor();
    /**
     *
     * @param name
     * @param menuItems
     * @param parentScreenId
     */
    registerContextMenu(name: string, menuItems: Array<MenuItem>, parentScreenId?: string): void;
    /**
     * Set the active and visible context menu by name
     * @param name
     */
    showContextMenu(name: string): boolean;
    /**
     * Deactivate menu by name, and hide it
     * @param name
     */
    hideContextMenu(name: string): void;
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param name Name of [[PopupMenuData]] key
     * @returns Menu items in data if it exists, otherwise null
     */
    getContextMenuItems(name: string): Array<MenuItem>;
    /**
     * Get the menu's parent id
     * @param name Name of [[PopupMenuData]] item key
     */
    getContextMenuParentScreenId(name: string): string;
    /**
     * Remove context menu item by name
     * @param name Name of [[PopupMenuData]] item key
     */
    removeContextMenu(name: string): void;
    /**
     * Set active menu
     * @param id Id of menu to set as active
     */
    setActiveMenu(id: string): void;
    /**
     * Set menu items by parent screen id
     * @param id Id of parent containing menu
     * @param menuItems Items to set
     */
    resetMenu(id: string, menuItems: Array<MenuItemBuilder>): void;
    /**
     * Convert key to lowercase
     * @param key
     * @returns key value as lowercased string
     */
    private rekey;
    /**
     * This is for special case
     * @param menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     */
    _trackMenuItemBuilderForMemRelease(menuItemBuilder: MenuItemBuilder): void;
}
