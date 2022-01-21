/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { McoContainerService } from '../mco-container/mco-container.service';
import * as i0 from "@angular/core";
import * as i1 from "../mco-container/mco-container.service";
/**
 * Track events
 */
var EventHandlerService = /** @class */ (function () {
    function EventHandlerService(mcoContainerService) {
        this.mcoContainerService = mcoContainerService;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    EventHandlerService.prototype.setClientEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._clientEvent = event;
    };
    /**
     * @return {?}
     */
    EventHandlerService.prototype.getClientEvent = /**
     * @return {?}
     */
    function () {
        return this._clientEvent;
    };
    /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    EventHandlerService.prototype.fireEvent = /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    function (command, mcoName, actionName, arg, source, clientEvent) {
        /** @type {?} */
        var mco = this.mcoContainerService.getMco(mcoName);
        if (mco != null && typeof mco[actionName] === "function") {
            if (Array.isArray(arg)) {
                (/** @type {?} */ (mco[actionName])).apply(mco, arg);
            }
            else {
                (/** @type {?} */ (mco[actionName])).apply(mco, [arg]);
            }
        }
    };
    EventHandlerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    EventHandlerService.ctorParameters = function () { return [
        { type: McoContainerService }
    ]; };
    /** @nocollapse */ EventHandlerService.ngInjectableDef = i0.defineInjectable({ factory: function EventHandlerService_Factory() { return new EventHandlerService(i0.inject(i1.McoContainerService)); }, token: EventHandlerService, providedIn: "root" });
    return EventHandlerService;
}());
export { EventHandlerService };
if (false) {
    /** @type {?} */
    EventHandlerService.prototype._clientEvent;
    /** @type {?} */
    EventHandlerService.prototype.mcoContainerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ldmVudC1oYW5kbGVyL2V2ZW50LWhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7OztJQVczRSw2QkFDVTtRQUFBLHdCQUFtQixHQUFuQixtQkFBbUI7S0FHNUI7Ozs7O0lBRUQsNENBQWM7Ozs7SUFBZCxVQUFlLEtBQWtCO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0tBQzNCOzs7O0lBRUQsNENBQWM7OztJQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7Ozs7Ozs7O0lBRUQsdUNBQVM7Ozs7Ozs7OztJQUFULFVBQVUsT0FBZSxFQUFFLE9BQWUsRUFBRSxVQUFrQixFQUFFLEdBQVEsRUFBRSxNQUFxQixFQUFFLFdBQXdCOztRQUN2SCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJELElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDeEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixtQkFBQyxHQUFHLENBQUMsVUFBVSxDQUFhLEVBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO2lCQUFNO2dCQUNMLG1CQUFDLEdBQUcsQ0FBQyxVQUFVLENBQWEsRUFBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7S0FDRjs7Z0JBOUJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUFEsbUJBQW1COzs7OEJBSDVCOztTQVdhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsaWVudEV2ZW50IH0gZnJvbSAnLi9jbGllbnQtZXZlbnQnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNvQ29udGFpbmVyU2VydmljZSB9IGZyb20gJy4uL21jby1jb250YWluZXIvbWNvLWNvbnRhaW5lci5zZXJ2aWNlJztcblxuLyoqXG4gKiBUcmFjayBldmVudHNcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2NsaWVudEV2ZW50OiBDbGllbnRFdmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1jb0NvbnRhaW5lclNlcnZpY2U6IE1jb0NvbnRhaW5lclNlcnZpY2VcbiAgKSB7XG5cbiAgfVxuXG4gIHNldENsaWVudEV2ZW50KGV2ZW50OiBDbGllbnRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NsaWVudEV2ZW50ID0gZXZlbnQ7XG4gIH1cblxuICBnZXRDbGllbnRFdmVudCgpOiBDbGllbnRFdmVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudEV2ZW50O1xuICB9XG5cbiAgZmlyZUV2ZW50KGNvbW1hbmQ6IHN0cmluZywgbWNvTmFtZTogc3RyaW5nLCBhY3Rpb25OYW1lOiBzdHJpbmcsIGFyZzogYW55LCBzb3VyY2U6IEJhc2VDb21wb25lbnQsIGNsaWVudEV2ZW50OiBDbGllbnRFdmVudCkge1xuICAgIGNvbnN0IG1jbyA9IHRoaXMubWNvQ29udGFpbmVyU2VydmljZS5nZXRNY28obWNvTmFtZSk7XG5cbiAgICBpZiAobWNvICE9IG51bGwgJiYgdHlwZW9mIG1jb1thY3Rpb25OYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIChtY29bYWN0aW9uTmFtZV0gYXMgRnVuY3Rpb24pLmFwcGx5KG1jbywgYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChtY29bYWN0aW9uTmFtZV0gYXMgRnVuY3Rpb24pLmFwcGx5KG1jbywgW2FyZ10pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19