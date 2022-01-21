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
export class EventHandlerService {
    /**
     * @param {?} mcoContainerService
     */
    constructor(mcoContainerService) {
        this.mcoContainerService = mcoContainerService;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setClientEvent(event) {
        this._clientEvent = event;
    }
    /**
     * @return {?}
     */
    getClientEvent() {
        return this._clientEvent;
    }
    /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    fireEvent(command, mcoName, actionName, arg, source, clientEvent) {
        /** @type {?} */
        const mco = this.mcoContainerService.getMco(mcoName);
        if (mco != null && typeof mco[actionName] === "function") {
            if (Array.isArray(arg)) {
                (/** @type {?} */ (mco[actionName])).apply(mco, arg);
            }
            else {
                (/** @type {?} */ (mco[actionName])).apply(mco, [arg]);
            }
        }
    }
}
EventHandlerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EventHandlerService.ctorParameters = () => [
    { type: McoContainerService }
];
/** @nocollapse */ EventHandlerService.ngInjectableDef = i0.defineInjectable({ factory: function EventHandlerService_Factory() { return new EventHandlerService(i0.inject(i1.McoContainerService)); }, token: EventHandlerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    EventHandlerService.prototype._clientEvent;
    /** @type {?} */
    EventHandlerService.prototype.mcoContainerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ldmVudC1oYW5kbGVyL2V2ZW50LWhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7O0FBUTdFLE1BQU07Ozs7SUFHSixZQUNVO1FBQUEsd0JBQW1CLEdBQW5CLG1CQUFtQjtLQUc1Qjs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBa0I7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7S0FDM0I7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7Ozs7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWUsRUFBRSxPQUFlLEVBQUUsVUFBa0IsRUFBRSxHQUFRLEVBQUUsTUFBcUIsRUFBRSxXQUF3Qjs7UUFDdkgsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyRCxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3hELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsbUJBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBYSxFQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxtQkFBQyxHQUFHLENBQUMsVUFBVSxDQUFhLEVBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNqRDtTQUNGO0tBQ0Y7OztZQTlCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQUSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGllbnRFdmVudCB9IGZyb20gJy4vY2xpZW50LWV2ZW50JztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1jb0NvbnRhaW5lclNlcnZpY2UgfSBmcm9tICcuLi9tY28tY29udGFpbmVyL21jby1jb250YWluZXIuc2VydmljZSc7XG5cbi8qKlxuICogVHJhY2sgZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50SGFuZGxlclNlcnZpY2Uge1xuICBwcml2YXRlIF9jbGllbnRFdmVudDogQ2xpZW50RXZlbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtY29Db250YWluZXJTZXJ2aWNlOiBNY29Db250YWluZXJTZXJ2aWNlXG4gICkge1xuXG4gIH1cblxuICBzZXRDbGllbnRFdmVudChldmVudDogQ2xpZW50RXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGllbnRFdmVudCA9IGV2ZW50O1xuICB9XG5cbiAgZ2V0Q2xpZW50RXZlbnQoKTogQ2xpZW50RXZlbnQge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnRFdmVudDtcbiAgfVxuXG4gIGZpcmVFdmVudChjb21tYW5kOiBzdHJpbmcsIG1jb05hbWU6IHN0cmluZywgYWN0aW9uTmFtZTogc3RyaW5nLCBhcmc6IGFueSwgc291cmNlOiBCYXNlQ29tcG9uZW50LCBjbGllbnRFdmVudDogQ2xpZW50RXZlbnQpIHtcbiAgICBjb25zdCBtY28gPSB0aGlzLm1jb0NvbnRhaW5lclNlcnZpY2UuZ2V0TWNvKG1jb05hbWUpO1xuXG4gICAgaWYgKG1jbyAhPSBudWxsICYmIHR5cGVvZiBtY29bYWN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICAobWNvW2FjdGlvbk5hbWVdIGFzIEZ1bmN0aW9uKS5hcHBseShtY28sIGFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAobWNvW2FjdGlvbk5hbWVdIGFzIEZ1bmN0aW9uKS5hcHBseShtY28sIFthcmddKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==