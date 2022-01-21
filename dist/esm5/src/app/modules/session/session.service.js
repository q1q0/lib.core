/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, NgZone } from '@angular/core';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { ContextMenuService } from '../popup-menu/context-menu.service';
/**
 * Class for managing client sessions
 */
var SessionService = /** @class */ (function () {
    /**
     *
     * @param _mcoContainer
     * @param _eventHandlerService
     * @param injector
     * @param contextMenuService
     * @param ngZone
     */
    function SessionService(_mcoContainer, _eventHandlerService, injector, contextMenuService, ngZone) {
        var _this = this;
        this._mcoContainer = _mcoContainer;
        this._eventHandlerService = _eventHandlerService;
        this.injector = injector;
        this.contextMenuService = contextMenuService;
        this.defsMap = new Map();
        ngZone.runOutsideAngular(function () {
            document.addEventListener("keydown", function (event) { return _this.checkKey(event); }, true);
            document.addEventListener("keyup", function (event) { return _this.resetKey(event); }, true);
            //track when window lost/gain focus
            window.addEventListener("focusout", function (event) {
                _this._windowLostFocus = true;
            }, true);
            window.addEventListener("focusin", function () {
                _this._windowLostFocus = false;
            }, true);
        });
    }
    /**
     * Get internal [[_mcoContainer]]
     */
    /**
     * Get internal [[_mcoContainer]]
     * @return {?}
     */
    SessionService.prototype.getMcoContainer = /**
     * Get internal [[_mcoContainer]]
     * @return {?}
     */
    function () {
        return this._mcoContainer;
    };
    /**
     * Get internal [[_eventHandlerService]]
     */
    /**
     * Get internal [[_eventHandlerService]]
     * @return {?}
     */
    SessionService.prototype.getEventHandler = /**
     * Get internal [[_eventHandlerService]]
     * @return {?}
     */
    function () {
        return this._eventHandlerService;
    };
    /**
     * Set [[requestService]] value
     * @param requestService
     */
    /**
     * Set [[requestService]] value
     * @param {?} requestService
     * @return {?}
     */
    SessionService.prototype.registerRequestService = /**
     * Set [[requestService]] value
     * @param {?} requestService
     * @return {?}
     */
    function (requestService) {
        this.requestService = requestService;
    };
    /**
     * Get value of [[requestService]] property
     * @returns The requestService
     */
    /**
     * Get value of [[requestService]] property
     * @return {?} The requestService
     */
    SessionService.prototype.getRequestService = /**
     * Get value of [[requestService]] property
     * @return {?} The requestService
     */
    function () {
        return this.requestService;
    };
    /**
     * Set [[routeNavigator]] value
     * @param routeNavigator
     */
    /**
     * Set [[routeNavigator]] value
     * @param {?} routeNavigator
     * @return {?}
     */
    SessionService.prototype.registerRouteNavigatorService = /**
     * Set [[routeNavigator]] value
     * @param {?} routeNavigator
     * @return {?}
     */
    function (routeNavigator) {
        this.routeNavigator = routeNavigator;
    };
    /**
     * Get value of [[routeNavigator]] property
     */
    /**
     * Get value of [[routeNavigator]] property
     * @return {?}
     */
    SessionService.prototype.getRouteNavigatorService = /**
     * Get value of [[routeNavigator]] property
     * @return {?}
     */
    function () {
        return this.routeNavigator;
    };
    /**
     * Set the position of the mouse
     * @param event
     */
    /**
     * Set the position of the mouse
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.setMousePosition = /**
     * Set the position of the mouse
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mousePosition = {
            x: event.clientX,
            y: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY
        };
    };
    /**
     * Get the mouse position
     * @returns Object with properties: x, y, screenX, screenY
     */
    /**
     * Get the mouse position
     * @return {?} Object with properties: x, y, screenX, screenY
     */
    SessionService.prototype.getMousePosition = /**
     * Get the mouse position
     * @return {?} Object with properties: x, y, screenX, screenY
     */
    function () {
        return this.mousePosition;
    };
    /**
     * Delegate to [[Injector]].get method
     * @param type
     */
    /**
     * Delegate to [[Injector]].get method
     * @param {?} type
     * @return {?}
     */
    SessionService.prototype.getInjector = /**
     * Delegate to [[Injector]].get method
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.injector.get(type);
    };
    /**
     * Get display service.
     */
    /**
     * Get display service.
     * @return {?}
     */
    SessionService.prototype.getDisplayService = /**
     * Get display service.
     * @return {?}
     */
    function () {
        //TODO
        return null;
    };
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param id Context menu id
     */
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    SessionService.prototype.showContextMenu = /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    function (id) {
        return this.contextMenuService.showContextMenu(id);
    };
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param id Context menu id
     */
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    SessionService.prototype.hideContextMenu = /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    function (id) {
        this.contextMenuService.hideContextMenu(id);
    };
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param id Menu id
     * @param menuItems
     */
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param {?} id Menu id
     * @param {?} menuItems
     * @return {?}
     */
    SessionService.prototype.resetContextMenu = /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param {?} id Menu id
     * @param {?} menuItems
     * @return {?}
     */
    function (id, menuItems) {
        this.contextMenuService.resetMenu(id, menuItems);
        this._currentPopupMenuId = id;
    };
    /**
     * Add entry to [[defsMap]] Map
     * @param id Key
     * @param data Value
     */
    /**
     * Add entry to [[defsMap]] Map
     * @param {?} id Key
     * @param {?} data Value
     * @return {?}
     */
    SessionService.prototype.storeDef = /**
     * Add entry to [[defsMap]] Map
     * @param {?} id Key
     * @param {?} data Value
     * @return {?}
     */
    function (id, data) {
        this.defsMap.set(id, data);
    };
    /**
     * Get def map entry by key
     * @param id Key
     */
    /**
     * Get def map entry by key
     * @param {?} id Key
     * @return {?}
     */
    SessionService.prototype.getDef = /**
     * Get def map entry by key
     * @param {?} id Key
     * @return {?}
     */
    function (id) {
        return this.defsMap.get(id);
    };
    /**
     * Delete def from [[defsMap]] by key
     * @param id Key to delete
     */
    /**
     * Delete def from [[defsMap]] by key
     * @param {?} id Key to delete
     * @return {?}
     */
    SessionService.prototype.deleteDef = /**
     * Delete def from [[defsMap]] by key
     * @param {?} id Key to delete
     * @return {?}
     */
    function (id) {
        this.defsMap.delete(id);
    };
    /**
     * Get [[isCtrl]] property value
     * @returns True if control key is pressed, otherwise false.
     */
    /**
     * Get [[isCtrl]] property value
     * @return {?} True if control key is pressed, otherwise false.
     */
    SessionService.prototype.isCtrlPressed = /**
     * Get [[isCtrl]] property value
     * @return {?} True if control key is pressed, otherwise false.
     */
    function () {
        return this.isCtrl === true;
    };
    /**
     * Get [[isShift]] property value
     * @returns True if shift key is pressed, otherwise false.
     */
    /**
     * Get [[isShift]] property value
     * @return {?} True if shift key is pressed, otherwise false.
     */
    SessionService.prototype.isShiftPressed = /**
     * Get [[isShift]] property value
     * @return {?} True if shift key is pressed, otherwise false.
     */
    function () {
        return this.isShift === true;
    };
    /**
     * Get [[isAlt]] property value
     * @returns True if alt key is pressed, otherwise false.
     */
    /**
     * Get [[isAlt]] property value
     * @return {?} True if alt key is pressed, otherwise false.
     */
    SessionService.prototype.isAltPressed = /**
     * Get [[isAlt]] property value
     * @return {?} True if alt key is pressed, otherwise false.
     */
    function () {
        return this.isAlt === true;
    };
    /**
     * Get [[messagingService]] property
     * @returns Value of [[messagingServiced]]
     */
    /**
     * Get [[messagingService]] property
     * @return {?} Value of [[messagingServiced]]
     */
    SessionService.prototype.getMessagingService = /**
     * Get [[messagingService]] property
     * @return {?} Value of [[messagingServiced]]
     */
    function () {
        return this.messagingService;
    };
    /**
     * Set [[messagingService]] property
     * @param service
     */
    /**
     * Set [[messagingService]] property
     * @param {?} service
     * @return {?}
     */
    SessionService.prototype.registerMessagingService = /**
     * Set [[messagingService]] property
     * @param {?} service
     * @return {?}
     */
    function (service) {
        this.messagingService = service;
    };
    /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.checkKey = /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isCtrl = event.ctrlKey;
        this.isShift = event.shiftKey;
        this.isAlt = event.altKey;
    };
    /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.resetKey = /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isCtrl = false;
        this.isShift = false;
        this.isAlt = false;
    };
    SessionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SessionService.ctorParameters = function () { return [
        { type: McoContainerService },
        { type: EventHandlerService },
        { type: Injector },
        { type: ContextMenuService },
        { type: NgZone }
    ]; };
    return SessionService;
}());
export { SessionService };
if (false) {
    /** @type {?} */
    SessionService.prototype.requestService;
    /** @type {?} */
    SessionService.prototype.routeNavigator;
    /** @type {?} */
    SessionService.prototype.mousePosition;
    /** @type {?} */
    SessionService.prototype.defsMap;
    /**
     * Flag to keep track of when control key is pressed
     * @type {?}
     */
    SessionService.prototype.isCtrl;
    /**
     * Flag to keep track of when shift key is pressed
     * @type {?}
     */
    SessionService.prototype.isShift;
    /**
     * Flag to keep track of when alt key is pressed
     * @type {?}
     */
    SessionService.prototype.isAlt;
    /** @type {?} */
    SessionService.prototype.messagingService;
    /** @type {?} */
    SessionService.prototype._currentPopupMenuId;
    /**
     * Specify how far a user can drag the dialog down.
     * @type {?}
     */
    SessionService.prototype.dialogMaxTopPosition;
    /** @type {?} */
    SessionService.prototype._windowLostFocus;
    /** @type {?} */
    SessionService.prototype._mcoContainer;
    /** @type {?} */
    SessionService.prototype._eventHandlerService;
    /** @type {?} */
    SessionService.prototype.injector;
    /** @type {?} */
    SessionService.prototype.contextMenuService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9zZXNzaW9uL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQVEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSTdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7OztJQTBDdEU7Ozs7Ozs7T0FPRztJQUNILHdCQUNVLGVBQ0Esc0JBQ0EsVUFDQSxvQkFDUixNQUFjO1FBTGhCLGlCQW9CQztRQW5CUyxrQkFBYSxHQUFiLGFBQWE7UUFDYix5QkFBb0IsR0FBcEIsb0JBQW9CO1FBQ3BCLGFBQVEsR0FBUixRQUFRO1FBQ1IsdUJBQWtCLEdBQWxCLGtCQUFrQjt1QkF6Q1EsSUFBSSxHQUFHLEVBQWU7UUE0Q3hELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUN2QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBSyxJQUFHLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSyxJQUFHLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFHeEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQWlCO2dCQUNsRCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcs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IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNvQ29udGFpbmVyU2VydmljZSB9IGZyb20gJy4uL21jby1jb250YWluZXIvbWNvLWNvbnRhaW5lci5zZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50SGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi9ldmVudC1oYW5kbGVyL2V2ZW50LWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0U2VydmljZSB9IGZyb20gJy4vcmVxdWVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlTmF2aWdhdG9yIH0gZnJvbSAnLi9yb3V0ZS1uYXZpZ2F0b3InO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tICcuL3Bvc2l0aW9uJztcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gJy4uL3BvcHVwLW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudUl0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vcG9wdXAtbWVudS9tZW51LWl0ZW0tYnVpbGRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJy4uL3BvcHVwLW1lbnUvbWVudS1pdGVtJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9tZXNzYWdpbmctc2VydmljZSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIGNsaWVudCBzZXNzaW9uc1xuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuICBwcml2YXRlIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZTtcbiAgcHJpdmF0ZSByb3V0ZU5hdmlnYXRvcjogUm91dGVOYXZpZ2F0b3I7XG4gIHByaXZhdGUgbW91c2VQb3NpdGlvbjogUG9zaXRpb247XG4gIHByaXZhdGUgZGVmc01hcDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8ga2VlcCB0cmFjayBvZiB3aGVuIGNvbnRyb2wga2V5IGlzIHByZXNzZWRcbiAgICovXG4gIHByaXZhdGUgaXNDdHJsOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIGtlZXAgdHJhY2sgb2Ygd2hlbiBzaGlmdCBrZXkgaXMgcHJlc3NlZFxuICAgKi9cbiAgcHJpdmF0ZSBpc1NoaWZ0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIGtlZXAgdHJhY2sgb2Ygd2hlbiBhbHQga2V5IGlzIHByZXNzZWRcbiAgICovXG4gIHByaXZhdGUgaXNBbHQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBtZXNzYWdpbmdTZXJ2aWNlOiBNZXNzYWdlU2VydmljZTtcblxuICBfY3VycmVudFBvcHVwTWVudUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IGZhciBhIHVzZXIgY2FuIGRyYWcgdGhlIGRpYWxvZyBkb3duLlxuICAgKi9cbiAgZGlhbG9nTWF4VG9wUG9zaXRpb246IG51bWJlcjtcblxuICAvL3RyYWNrIHdpbmRvdyBsb3N0IGZvY3VzXG4gIF93aW5kb3dMb3N0Rm9jdXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBfbWNvQ29udGFpbmVyXG4gICAqIEBwYXJhbSBfZXZlbnRIYW5kbGVyU2VydmljZVxuICAgKiBAcGFyYW0gaW5qZWN0b3JcbiAgICogQHBhcmFtIGNvbnRleHRNZW51U2VydmljZVxuICAgKiBAcGFyYW0gbmdab25lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tY29Db250YWluZXI6IE1jb0NvbnRhaW5lclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyU2VydmljZTogRXZlbnRIYW5kbGVyU2VydmljZSxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U2VydmljZTogQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgIG5nWm9uZTogTmdab25lXG4gICkge1xuICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KT0+dGhpcy5jaGVja0tleShldmVudCksIHRydWUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCk9PnRoaXMucmVzZXRLZXkoZXZlbnQpLCB0cnVlKTtcblxuICAgICAgLy90cmFjayB3aGVuIHdpbmRvdyBsb3N0L2dhaW4gZm9jdXNcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgKGV2ZW50OiBGb2N1c0V2ZW50KT0+e1xuICAgICAgICAgIHRoaXMuX3dpbmRvd0xvc3RGb2N1cyA9IHRydWU7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsICgpPT57XG4gICAgICAgIHRoaXMuX3dpbmRvd0xvc3RGb2N1cyA9IGZhbHNlO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGludGVybmFsIFtbX21jb0NvbnRhaW5lcl1dXG4gICAqL1xuICBnZXRNY29Db250YWluZXIoKTogTWNvQ29udGFpbmVyU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX21jb0NvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW50ZXJuYWwgW1tfZXZlbnRIYW5kbGVyU2VydmljZV1dXG4gICAqL1xuICBnZXRFdmVudEhhbmRsZXIoKTogRXZlbnRIYW5kbGVyU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50SGFuZGxlclNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbcmVxdWVzdFNlcnZpY2VdXSB2YWx1ZVxuICAgKiBAcGFyYW0gcmVxdWVzdFNlcnZpY2VcbiAgICovXG4gIHJlZ2lzdGVyUmVxdWVzdFNlcnZpY2UocmVxdWVzdFNlcnZpY2U6IFJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgdGhpcy5yZXF1ZXN0U2VydmljZSA9IHJlcXVlc3RTZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBbW3JlcXVlc3RTZXJ2aWNlXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVGhlIHJlcXVlc3RTZXJ2aWNlXG4gICAqL1xuICBnZXRSZXF1ZXN0U2VydmljZSgpOiBSZXF1ZXN0U2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbcm91dGVOYXZpZ2F0b3JdXSB2YWx1ZVxuICAgKiBAcGFyYW0gcm91dGVOYXZpZ2F0b3JcbiAgICovXG4gIHJlZ2lzdGVyUm91dGVOYXZpZ2F0b3JTZXJ2aWNlKHJvdXRlTmF2aWdhdG9yOiBSb3V0ZU5hdmlnYXRvcikge1xuICAgIHRoaXMucm91dGVOYXZpZ2F0b3IgPSByb3V0ZU5hdmlnYXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgW1tyb3V0ZU5hdmlnYXRvcl1dIHByb3BlcnR5XG4gICAqL1xuICBnZXRSb3V0ZU5hdmlnYXRvclNlcnZpY2UoKTogUm91dGVOYXZpZ2F0b3Ige1xuICAgIHJldHVybiB0aGlzLnJvdXRlTmF2aWdhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIG1vdXNlXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgc2V0TW91c2VQb3NpdGlvbihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IHtcbiAgICAgIHg6IGV2ZW50LmNsaWVudFgsXG4gICAgICB5OiBldmVudC5jbGllbnRZLFxuICAgICAgc2NyZWVuWDogZXZlbnQuc2NyZWVuWCxcbiAgICAgIHNjcmVlblk6IGV2ZW50LnNjcmVlbllcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtb3VzZSBwb3NpdGlvblxuICAgKiBAcmV0dXJucyBPYmplY3Qgd2l0aCBwcm9wZXJ0aWVzOiB4LCB5LCBzY3JlZW5YLCBzY3JlZW5ZXG4gICAqL1xuICBnZXRNb3VzZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm1vdXNlUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGUgdG8gW1tJbmplY3Rvcl1dLmdldCBtZXRob2RcbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIGdldEluamVjdG9yKHR5cGU6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGlzcGxheSBzZXJ2aWNlLlxuICAgKi9cbiAgZ2V0RGlzcGxheVNlcnZpY2UoKSB7XG4gICAgLy9UT0RPXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGUgdG8gW1tDb250ZXh0TWVudVNlcnZpY2VdXS5zaG93Q29udGV4dE1lbnVcbiAgICogQHBhcmFtIGlkIENvbnRleHQgbWVudSBpZFxuICAgKi9cbiAgc2hvd0NvbnRleHRNZW51KGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0TWVudVNlcnZpY2Uuc2hvd0NvbnRleHRNZW51KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSB0byBbW0NvbnRleHRNZW51U2VydmljZV1dLmhpZGVDb250ZXh0TWVudVxuICAgKiBAcGFyYW0gaWQgQ29udGV4dCBtZW51IGlkXG4gICAqL1xuICBoaWRlQ29udGV4dE1lbnUoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmhpZGVDb250ZXh0TWVudShpZCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGUgdG8gW1tDb250ZXh0TWVudVNlcnZpY2VdXS5yZXNldE1lbnUuIEFuZCBzZXQgW1tfY3VycmVudFBvcHVwTWVudUlkXV1cbiAgICogQHBhcmFtIGlkIE1lbnUgaWRcbiAgICogQHBhcmFtIG1lbnVJdGVtc1xuICAgKi9cbiAgcmVzZXRDb250ZXh0TWVudShpZDogc3RyaW5nLCBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtQnVpbGRlcj4pIHtcbiAgICB0aGlzLmNvbnRleHRNZW51U2VydmljZS5yZXNldE1lbnUoaWQsIG1lbnVJdGVtcyk7XG4gICAgdGhpcy5fY3VycmVudFBvcHVwTWVudUlkID0gaWQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGVudHJ5IHRvIFtbZGVmc01hcF1dIE1hcFxuICAgKiBAcGFyYW0gaWQgS2V5XG4gICAqIEBwYXJhbSBkYXRhIFZhbHVlXG4gICAqL1xuICBzdG9yZURlZihpZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICB0aGlzLmRlZnNNYXAuc2V0KGlkLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGVmIG1hcCBlbnRyeSBieSBrZXlcbiAgICogQHBhcmFtIGlkIEtleVxuICAgKi9cbiAgZ2V0RGVmKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZzTWFwLmdldChpZCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGRlZiBmcm9tIFtbZGVmc01hcF1dIGJ5IGtleVxuICAgKiBAcGFyYW0gaWQgS2V5IHRvIGRlbGV0ZVxuICAgKi9cbiAgZGVsZXRlRGVmKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlZnNNYXAuZGVsZXRlKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tpc0N0cmxdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGNvbnRyb2wga2V5IGlzIHByZXNzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG4gIGlzQ3RybFByZXNzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDdHJsID09PSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lzU2hpZnRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHNoaWZ0IGtleSBpcyBwcmVzc2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAqL1xuICBpc1NoaWZ0UHJlc3NlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1NoaWZ0ID09PSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lzQWx0XV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBhbHQga2V5IGlzIHByZXNzZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG4gIGlzQWx0UHJlc3NlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0FsdCA9PT0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1ttZXNzYWdpbmdTZXJ2aWNlXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1ttZXNzYWdpbmdTZXJ2aWNlZF1dXG4gICAqL1xuICBnZXRNZXNzYWdpbmdTZXJ2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLm1lc3NhZ2luZ1NlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbbWVzc2FnaW5nU2VydmljZV1dIHByb3BlcnR5XG4gICAqIEBwYXJhbSBzZXJ2aWNlXG4gICAqL1xuICByZWdpc3Rlck1lc3NhZ2luZ1NlcnZpY2Uoc2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHtcbiAgICB0aGlzLm1lc3NhZ2luZ1NlcnZpY2UgPSBzZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEtleSBkb3duIGhhbmRsZXIgdG8gc2V0IGludGVybmFsIGZsYWdzIGZvciBDb250cm9sLCBTaGlmdCwgYW5kIEFsdFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHByaXZhdGUgY2hlY2tLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLmlzQ3RybCA9IGV2ZW50LmN0cmxLZXk7XG4gICAgdGhpcy5pc1NoaWZ0ID0gZXZlbnQuc2hpZnRLZXk7XG4gICAgdGhpcy5pc0FsdCA9IGV2ZW50LmFsdEtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZXlib2FyZCBldmVudCBoYW5kbGVyIGZvciBzZXR0aW5nIGFsbCBpbnRlcm5hbCBmbGFncyBmb3IgQ29udHJvbCwgU2hpZnQsIGFuZCBBbHQgdG8gZmFsc2VcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIHJlc2V0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICB0aGlzLmlzQ3RybCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1NoaWZ0ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQWx0ID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==