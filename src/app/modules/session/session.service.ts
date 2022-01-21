import { Injectable, Injector, Type, NgZone } from '@angular/core';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { RequestService } from './request-service';
import { RouteNavigator } from './route-navigator';
import { Position } from './position';
import { ContextMenuService } from '../popup-menu/context-menu.service';
import { MenuItemBuilder } from '../popup-menu/menu-item-builder';
import { MenuItem } from '../popup-menu/menu-item';
import { MessageService } from './messaging-service';

declare var $: any;

/**
 * Class for managing client sessions
 */
@Injectable()
export class SessionService {
  private requestService: RequestService;
  private routeNavigator: RouteNavigator;
  private mousePosition: Position;
  private defsMap: Map<string, any> = new Map<string, any>();

  /**
   * Flag to keep track of when control key is pressed
   */
  private isCtrl: boolean;

  /**
   * Flag to keep track of when shift key is pressed
   */
  private isShift: boolean;

  /**
   * Flag to keep track of when alt key is pressed
   */
  private isAlt: boolean;

  private messagingService: MessageService;

  _currentPopupMenuId: string;

  /**
   * Specify how far a user can drag the dialog down.
   */
  //dialogMaxTopPosition: number;

  //track window lost focus
  _windowLostFocus: boolean;

  private _keydown: boolean;

  /**
   *
   * @param _mcoContainer
   * @param _eventHandlerService
   * @param injector
   * @param contextMenuService
   * @param ngZone
   */
  constructor(
    private _mcoContainer: McoContainerService,
    private _eventHandlerService: EventHandlerService,
    private injector: Injector,
    private contextMenuService: ContextMenuService,
    private ngZone: NgZone
  ) {
    ngZone.runOutsideAngular(()=>{
      document.addEventListener("keydown", (event)=>this.checkKey(event), true);
      document.addEventListener("keyup", (event)=>this.resetKey(event), true);

      // //track when window lost/gain focus
      // window.addEventListener("focusout", (event: FocusEvent)=>{
      //   this._windowLostFocus = true;

      //   if (this._keydown === true) {
      //     this._windowLostFocus = false;
      //   } else if (event.relatedTarget != null && event.srcElement != null && event.srcElement instanceof HTMLElement) {
      //     const parent: HTMLElement = $(event.srcElement).parents(".vt-dialog")[0];

      //     if (parent != null && parent.contains(event.relatedTarget as HTMLElement)) {
      //       this._windowLostFocus = false;
      //     }
      //   }

      //   this._keydown = false;
      // }, true);

      // window.addEventListener("focusin", ()=>{
      //   this._windowLostFocus = false;
      //   this._keydown = false;
      // }, true);
    });
  }

  /**
   * Get internal [[_mcoContainer]]
   */
  getMcoContainer(): McoContainerService {
    return this._mcoContainer;
  }

  /**
   * Get internal [[_eventHandlerService]]
   */
  getEventHandler(): EventHandlerService {
    return this._eventHandlerService;
  }

  /**
   * Set [[requestService]] value
   * @param requestService
   */
  registerRequestService(requestService: RequestService) {
    this.requestService = requestService;
  }

  /**
   * Get value of [[requestService]] property
   * @returns The requestService
   */
  getRequestService(): RequestService {
    return this.requestService;
  }

  /**
   * Set [[routeNavigator]] value
   * @param routeNavigator
   */
  registerRouteNavigatorService(routeNavigator: RouteNavigator) {
    this.routeNavigator = routeNavigator;
  }

  /**
   * Get value of [[routeNavigator]] property
   */
  getRouteNavigatorService(): RouteNavigator {
    return this.routeNavigator;
  }

  /**
   * Set the position of the mouse
   * @param event
   */
  setMousePosition(event: MouseEvent) {
    this.mousePosition = {
      x: event.clientX,
      y: event.clientY,
      screenX: event.screenX,
      screenY: event.screenY
    }
  }

  /**
   * Get the mouse position
   * @returns Object with properties: x, y, screenX, screenY
   */
  getMousePosition() {
    return this.mousePosition;
  }

  /**
   * Delegate to [[Injector]].get method
   * @param type
   */
  getInjector(type: any) {
    return this.injector.get(type);
  }

  /**
   * Get display service.
   */
  getDisplayService() {
    //TODO
    return null;
  }

  /**
   * Delegate to [[ContextMenuService]].showContextMenu
   * @param id Context menu id
   */
  showContextMenu(id: string): boolean {
    return this.contextMenuService.showContextMenu(id);
  }

  /**
   * Delegate to [[ContextMenuService]].hideContextMenu
   * @param id Context menu id
   */
  hideContextMenu(id: string) {
    this.contextMenuService.hideContextMenu(id);
  }

  /**
   * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
   * @param id Menu id
   * @param menuItems
   */
  resetContextMenu(id: string, menuItems: Array<MenuItemBuilder>) {
    this.contextMenuService.resetMenu(id, menuItems);
    this._currentPopupMenuId = id;
  }

  /**
   * Add entry to [[defsMap]] Map
   * @param id Key
   * @param data Value
   */
  storeDef(id: string, data: any) {
    this.defsMap.set(id, data);
  }

  /**
   * Get def map entry by key
   * @param id Key
   */
  getDef(id: string) {
    return this.defsMap.get(id);
  }

  /**
   * Delete def from [[defsMap]] by key
   * @param id Key to delete
   */
  deleteDef(id: string) {
    this.defsMap.delete(id);
  }

  /**
   * Get [[isCtrl]] property value
   * @returns True if control key is pressed, otherwise false.
   */
  isCtrlPressed(): boolean {
    return this.isCtrl === true;
  }

  /**
   * Get [[isShift]] property value
   * @returns True if shift key is pressed, otherwise false.
   */
  isShiftPressed(): boolean {
    return this.isShift === true;
  }

  /**
   * Get [[isAlt]] property value
   * @returns True if alt key is pressed, otherwise false.
   */
  isAltPressed(): boolean {
    return this.isAlt === true;
  }

  /**
   * Get [[messagingService]] property
   * @returns Value of [[messagingServiced]]
   */
  getMessagingService() {
    return this.messagingService;
  }

  /**
   * Set [[messagingService]] property
   * @param service
   */
  registerMessagingService(service: MessageService) {
    this.messagingService = service;
  }

  /**
   * Key down handler to set internal flags for Control, Shift, and Alt
   * @param event
   */
  private checkKey(event: KeyboardEvent) {
    this.isCtrl = event.ctrlKey;
    this.isShift = event.shiftKey;
    this.isAlt = event.altKey;
    this._keydown = true;

    this.ngZone.runOutsideAngular(()=>{
      setTimeout(()=>{
        this._keydown = false;
      });
    });
  }

  /**
   * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
   * @param event
   */
  private resetKey(event: KeyboardEvent) {
      this.isCtrl = false;
      this.isShift = false;
      this.isAlt = false;
  }
}
