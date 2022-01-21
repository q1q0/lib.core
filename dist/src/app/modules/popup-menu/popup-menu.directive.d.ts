import { AfterViewInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { ContextMenuService } from './context-menu.service';
import { BaseComponent } from '../base/base.component';
/**
 * Popup menu directive class. Adds context menu items to component
 */
export declare class PopupMenuDirective implements AfterViewInit {
    private parent;
    private contextMenuService;
    idName: string;
    id: string;
    disabled: boolean;
    visible: boolean;
    text: string;
    private subMenuItems;
    /**
     *
     * @param parent
     * @param contextMenuService Injected service for context menu functions
     */
    constructor(parent: BaseComponent, contextMenuService: ContextMenuService);
    /**
     * After view init lifecycle. Initialize submenu items
     */
    ngAfterViewInit(): void;
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     */
    getMenuItems(): MenuItem[];
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param parentScreenId Id of parent view component
     */
    convertSubMenuItems(parentScreenId: string): void;
}
