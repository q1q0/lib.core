import { Injector, NgZone } from '@angular/core';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { RequestService } from './request-service';
import { RouteNavigator } from './route-navigator';
import { Position } from './position';
import { ContextMenuService } from '../popup-menu/context-menu.service';
import { MenuItemBuilder } from '../popup-menu/menu-item-builder';
import { MessageService } from './messaging-service';
/**
 * Class for managing client sessions
 */
export declare class SessionService {
    private _mcoContainer;
    private _eventHandlerService;
    private injector;
    private contextMenuService;
    private requestService;
    private routeNavigator;
    private mousePosition;
    private defsMap;
    /**
     * Flag to keep track of when control key is pressed
     */
    private isCtrl;
    /**
     * Flag to keep track of when shift key is pressed
     */
    private isShift;
    /**
     * Flag to keep track of when alt key is pressed
     */
    private isAlt;
    private messagingService;
    _currentPopupMenuId: string;
    /**
     * Specify how far a user can drag the dialog down.
     */
    dialogMaxTopPosition: number;
    _windowLostFocus: boolean;
    /**
     *
     * @param _mcoContainer
     * @param _eventHandlerService
     * @param injector
     * @param contextMenuService
     * @param ngZone
     */
    constructor(_mcoContainer: McoContainerService, _eventHandlerService: EventHandlerService, injector: Injector, contextMenuService: ContextMenuService, ngZone: NgZone);
    /**
     * Get internal [[_mcoContainer]]
     */
    getMcoContainer(): McoContainerService;
    /**
     * Get internal [[_eventHandlerService]]
     */
    getEventHandler(): EventHandlerService;
    /**
     * Set [[requestService]] value
     * @param requestService
     */
    registerRequestService(requestService: RequestService): void;
    /**
     * Get value of [[requestService]] property
     * @returns The requestService
     */
    getRequestService(): RequestService;
    /**
     * Set [[routeNavigator]] value
     * @param routeNavigator
     */
    registerRouteNavigatorService(routeNavigator: RouteNavigator): void;
    /**
     * Get value of [[routeNavigator]] property
     */
    getRouteNavigatorService(): RouteNavigator;
    /**
     * Set the position of the mouse
     * @param event
     */
    setMousePosition(event: MouseEvent): void;
    /**
     * Get the mouse position
     * @returns Object with properties: x, y, screenX, screenY
     */
    getMousePosition(): Position;
    /**
     * Delegate to [[Injector]].get method
     * @param type
     */
    getInjector(type: any): any;
    /**
     * Get display service.
     */
    getDisplayService(): any;
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param id Context menu id
     */
    showContextMenu(id: string): boolean;
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param id Context menu id
     */
    hideContextMenu(id: string): void;
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param id Menu id
     * @param menuItems
     */
    resetContextMenu(id: string, menuItems: Array<MenuItemBuilder>): void;
    /**
     * Add entry to [[defsMap]] Map
     * @param id Key
     * @param data Value
     */
    storeDef(id: string, data: any): void;
    /**
     * Get def map entry by key
     * @param id Key
     */
    getDef(id: string): any;
    /**
     * Delete def from [[defsMap]] by key
     * @param id Key to delete
     */
    deleteDef(id: string): void;
    /**
     * Get [[isCtrl]] property value
     * @returns True if control key is pressed, otherwise false.
     */
    isCtrlPressed(): boolean;
    /**
     * Get [[isShift]] property value
     * @returns True if shift key is pressed, otherwise false.
     */
    isShiftPressed(): boolean;
    /**
     * Get [[isAlt]] property value
     * @returns True if alt key is pressed, otherwise false.
     */
    isAltPressed(): boolean;
    /**
     * Get [[messagingService]] property
     * @returns Value of [[messagingServiced]]
     */
    getMessagingService(): MessageService;
    /**
     * Set [[messagingService]] property
     * @param service
     */
    registerMessagingService(service: MessageService): void;
    /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param event
     */
    private checkKey;
    /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param event
     */
    private resetKey;
}
