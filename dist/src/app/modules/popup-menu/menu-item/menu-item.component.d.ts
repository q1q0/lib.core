import { EventEmitter, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from '../menu-item';
import { SessionService } from '../../session/session.service';
/**
 * Class for menu item component. Child rendered by Menu directive
 */
export declare class MenuItemComponent implements OnDestroy, AfterViewInit {
    private sessionService;
    private cd;
    text: string;
    id: string;
    menuItems: Array<MenuItem>;
    display: boolean;
    visible: boolean;
    item: MenuItem;
    popupMenuId: string;
    onClick: EventEmitter<void>;
    /**
     * Check if menu items exist
     * @returns True if [[menuItems]] exists and has 1 or more items
     */
    readonly hasMenuItems: boolean;
    /**
     * Check if this menu item is a separator/divider (i.e. hyphen)
     * @returns True if the menu item text is a hyphen
     */
    readonly isDivider: boolean;
    /**
     * Get menu item styles map
     * @return Map of styles
     */
    readonly menuStyles: {
        [name: string]: string;
    };
    /**
     *
     * @param sessionService Injects reference to [[SessionService]] instance
     */
    constructor(sessionService: SessionService, cd: ChangeDetectorRef);
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     */
    ngAfterViewInit(): void;
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     */
    ngOnDestroy(): void;
    /**
     * Set an attribute with value on the menu item
     * @param name Attribute name
     * @param value Attribute value
     */
    setAttribute(name: string, value: any): void;
    /**
     * Get the value of an attribute by name
     * @param name Attribute name
     */
    getAttribute(name: string): string | boolean;
    /**
     * Get value of [[id]] property
     * @returns [[id]] value
     */
    getId(): string;
    /**
     * Get value of [[text]] property
     * @returns [[text]] value
     */
    getText(): string;
    /**
     * Event handler fro mouseenter event
     * @param event Mouse event
     */
    handleOnEnter(event: any): void;
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param event Mouse event
     */
    handleMouseEnter(event: any): void;
    /**
     * Event handler for click.
     * @param event
     * @event OnCommand
     */
    handleOnClick(event: MouseEvent): void;
    /**
     * Event handler for mousedown event
     * @param event Mouse down event
     */
    handleMouseDown(event: MouseEvent): void;
    /**
     * Get JSON representation for this component
     * @returns Object Metadata as JSON
     */
    toJson(): {};
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param event
     */
    dispSubmenu(event: any): void;
}
