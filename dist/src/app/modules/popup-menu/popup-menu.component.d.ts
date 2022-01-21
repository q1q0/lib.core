import { ElementRef, ChangeDetectorRef, DoCheck, IterableDiffers, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { MenuItem } from './menu-item';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownDirective } from 'ngx-bootstrap';
/**
 * Class for popup menu component
 */
export declare class PopupMenuComponent extends BaseComponent implements DoCheck {
    private cd;
    private popupMenuService;
    private idName;
    dropdown: BsDropdownDirective;
    dropdownContainer: ElementRef<HTMLElement>;
    menuItems: Array<MenuItem>;
    private menuItemsDiffer;
    private isShown;
    readonly hasMenuItems: boolean;
    onDocumentClick: (event: any) => void;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector
     * @param differs
     * @param popupMenuService
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, differs: IterableDiffers, popupMenuService: ContextMenuService, renderer: Renderer2);
    /**
     * Do check lifecycle
     */
    ngDoCheck(): void;
    /**
     * After view init lifecycle. Trigger change detection and show this component
     */
    ngAfterViewInit(): void;
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     */
    ngOnDestroy(): void;
    /**
     * Show the popup by setting CSS position to on screen
     */
    private show;
    /**
     * Hide the popup menu
     */
    private hide;
    /**
     * Event handler for mouse click
     * @param event
     */
    handleDocumentClick(event: MouseEvent): void;
    /**
     * Get [[cd]] (Change detector) property
     */
    getChangeDetector(): ChangeDetectorRef;
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param event
     */
    dispSubmenu(event: any): void;
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
    getAttribute(name: string): any;
    toJson(): {};
}
