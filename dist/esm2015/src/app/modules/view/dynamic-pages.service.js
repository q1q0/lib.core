/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import * as _ from "lodash";
import { SessionService } from '../session/session.service';
import * as i0 from "@angular/core";
import * as i1 from "../session/session.service";
/**
 * Class for managing dynamic views
 */
export class DynamicPagesService {
    /**
     *
     * @param {?} viewFactory
     * @param {?} sessionService
     */
    constructor(viewFactory, sessionService) {
        this.viewFactory = viewFactory;
        this.sessionService = sessionService;
        this.dynamicViewsMap = [];
    }
    /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param {?} viewContainer
     * @return {?}
     */
    registerViewContainer(viewContainer) {
        this.viewContainer = viewContainer;
    }
    /**
     * Create a new [[ViewComponent]] instance
     * @param {?} viewType
     * @param {?=} routeId
     * @return {?}
     */
    createDynamicView(viewType, routeId = null) {
        // For suppress warning (Circular dependency), it is not able to call ViewComponent's method directly here.
        if (DynamicPagesService.onCreateViewCloser) {
            DynamicPagesService.onCreateViewCloser(this.sessionService, viewType, routeId);
        }
        if (this.sessionService.getMessagingService() != null) {
            this.sessionService.getMessagingService().setFreezePushService(true);
        }
        /** @type {?} */
        const view = this.viewContainer.createComponent(this.viewFactory.resolveComponentFactory(viewType));
        this.dynamicViewsMap.push(view);
        view.instance.isDynamicPage = true;
        view.changeDetectorRef.detectChanges();
        return new Promise((r, j) => {
            //has route id?
            if (routeId != null && routeId !== "") {
                view.instance["routeId"] = routeId;
            }
            if (view.instance.viewIsInitialized === true) {
                if (this.sessionService.getMessagingService() != null) {
                    this.sessionService.getMessagingService().setFreezePushService(false);
                }
                r(view.instance);
            }
            else {
                /** @type {?} */
                const sub = view.instance.viewInitialized.subscribe(() => {
                    sub.unsubscribe();
                    if (this.sessionService.getMessagingService() != null) {
                        this.sessionService.getMessagingService().setFreezePushService(false);
                    }
                    r(view.instance);
                });
            }
        });
    }
    /**
     * Destroy [[ViewComponent]] instance reference
     * @param {?} viewToRemove
     * @param {?} immediate
     * @return {?}
     */
    removeView(viewToRemove, immediate) {
        /** @type {?} */
        const deadView = _.find(this.dynamicViewsMap, (view) => {
            return view.instance.uniqueId == viewToRemove.uniqueId;
        });
        this.dynamicViewsMap = _.filter(this.dynamicViewsMap, (view) => {
            return view.instance.uniqueId != viewToRemove.uniqueId;
        });
        if (viewToRemove.isDestroyed !== true && deadView != null) {
            if (immediate) {
                deadView.destroy();
            }
            else {
                setTimeout(() => {
                    deadView.destroy();
                }, 1);
            }
        }
    }
}
DynamicPagesService.onCreateViewCloser = null;
DynamicPagesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DynamicPagesService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: SessionService }
];
/** @nocollapse */ DynamicPagesService.ngInjectableDef = i0.defineInjectable({ factory: function DynamicPagesService_Factory() { return new DynamicPagesService(i0.inject(i0.ComponentFactoryResolver), i0.inject(i1.SessionService)); }, token: DynamicPagesService, providedIn: "root" });
if (false) {
    /** @type {?} */
    DynamicPagesService.onCreateViewCloser;
    /** @type {?} */
    DynamicPagesService.prototype.viewContainer;
    /** @type {?} */
    DynamicPagesService.prototype.dynamicViewsMap;
    /** @type {?} */
    DynamicPagesService.prototype.viewFactory;
    /** @type {?} */
    DynamicPagesService.prototype.sessionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1wYWdlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy92aWV3L2R5bmFtaWMtcGFnZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBb0Isd0JBQXdCLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBRTNHLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7O0FBUTVELE1BQU07Ozs7OztJQVNKLFlBQ1UsYUFDQTtRQURBLGdCQUFXLEdBQVgsV0FBVztRQUNYLG1CQUFjLEdBQWQsY0FBYzsrQkFUc0MsRUFBRTtLQVUzRDs7Ozs7O0lBT0wscUJBQXFCLENBQUMsYUFBK0I7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7S0FDcEM7Ozs7Ozs7SUFRRCxpQkFBaUIsQ0FBQyxRQUE2QixFQUFFLFVBQWtCLElBQUk7O1FBRXJFLElBQUcsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUU7WUFDekMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEY7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RFOztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFOztZQUV4QyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDcEM7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkU7Z0JBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQjtpQkFBTTs7Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUUsRUFBRTtvQkFDdEQsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVsQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLEVBQUU7d0JBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdkU7b0JBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEIsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7OztJQVFELFVBQVUsQ0FBQyxZQUEyQixFQUFFLFNBQWtCOztRQUN4RCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFpQyxFQUFDLEVBQUU7WUFDakYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDO1NBQ3hELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBaUMsRUFBQyxFQUFFO1lBQ3pGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQztTQUN4RCxDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekQsSUFBRyxTQUFTLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1A7U0FDRjtLQUNGOzt5Q0EzRnFILElBQUk7O1lBTjNILFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVhzQyx3QkFBd0I7WUFJdEQsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVHlwZSwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIGR5bmFtaWMgdmlld3NcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY1BhZ2VzU2VydmljZSB7XG4gIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBkeW5hbWljVmlld3NNYXA6IEFycmF5PENvbXBvbmVudFJlZjxWaWV3Q29tcG9uZW50Pj4gPSBbXTtcbiAgc3RhdGljIG9uQ3JlYXRlVmlld0Nsb3NlcjogKHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgdmlld1R5cGU6IFR5cGU8Vmlld0NvbXBvbmVudD4sIHJvdXRlSWQ6IHN0cmluZykgPT4gdm9pZCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gdmlld0ZhY3RvcnkgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZpZXdGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2VcbiAgKSB7IH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHRoZSBbW3ZpZXdDb250YWluZXJdXSBwcm9wZXJ0eSB0byByZWZlcmVuY2UgYSBbW1ZpZXdDb250YWluZXJdXVxuICAgKiBAcGFyYW0gdmlld0NvbnRhaW5lciBcbiAgICovXG4gIHJlZ2lzdGVyVmlld0NvbnRhaW5lcih2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyID0gdmlld0NvbnRhaW5lcjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgW1tWaWV3Q29tcG9uZW50XV0gaW5zdGFuY2VcbiAgICogQHBhcmFtIHZpZXdUeXBlIFxuICAgKiBAcGFyYW0gcm91dGVJZCBcbiAgICovXG4gIGNyZWF0ZUR5bmFtaWNWaWV3KHZpZXdUeXBlOiBUeXBlPFZpZXdDb21wb25lbnQ+LCByb3V0ZUlkOiBzdHJpbmcgPSBudWxsKTogUHJvbWlzZTxWaWV3Q29tcG9uZW50PiB7XG4gICAgLy8gRm9yIHN1cHByZXNzIHdhcm5pbmcgKENpcmN1bGFyIGRlcGVuZGVuY3kpLCBpdCBpcyBub3QgYWJsZSB0byBjYWxsIFZpZXdDb21wb25lbnQncyBtZXRob2QgZGlyZWN0bHkgaGVyZS5cbiAgICBpZihEeW5hbWljUGFnZXNTZXJ2aWNlLm9uQ3JlYXRlVmlld0Nsb3Nlcikge1xuICAgICAgRHluYW1pY1BhZ2VzU2VydmljZS5vbkNyZWF0ZVZpZXdDbG9zZXIodGhpcy5zZXNzaW9uU2VydmljZSwgdmlld1R5cGUsIHJvdXRlSWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlc3Npb25TZXJ2aWNlLmdldE1lc3NhZ2luZ1NlcnZpY2UoKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldE1lc3NhZ2luZ1NlcnZpY2UoKS5zZXRGcmVlemVQdXNoU2VydmljZSh0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCB2aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudCh0aGlzLnZpZXdGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHZpZXdUeXBlKSk7XG4gICAgdGhpcy5keW5hbWljVmlld3NNYXAucHVzaCh2aWV3KTtcbiAgICB2aWV3Lmluc3RhbmNlLmlzRHluYW1pY1BhZ2UgPSB0cnVlO1xuXG4gICAgdmlldy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFZpZXdDb21wb25lbnQ+KChyLCBqKT0+e1xuICAgICAgLy9oYXMgcm91dGUgaWQ/XG4gICAgICBpZiAocm91dGVJZCAhPSBudWxsICYmIHJvdXRlSWQgIT09IFwiXCIpIHtcbiAgICAgICAgdmlldy5pbnN0YW5jZVtcInJvdXRlSWRcIl0gPSByb3V0ZUlkO1xuICAgICAgfVxuXG4gICAgICBpZiAodmlldy5pbnN0YW5jZS52aWV3SXNJbml0aWFsaXplZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5zZXNzaW9uU2VydmljZS5nZXRNZXNzYWdpbmdTZXJ2aWNlKCkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0TWVzc2FnaW5nU2VydmljZSgpLnNldEZyZWV6ZVB1c2hTZXJ2aWNlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHIodmlldy5pbnN0YW5jZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdWIgPSB2aWV3Lmluc3RhbmNlLnZpZXdJbml0aWFsaXplZC5zdWJzY3JpYmUoKCk9PntcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5zZXNzaW9uU2VydmljZS5nZXRNZXNzYWdpbmdTZXJ2aWNlKCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRNZXNzYWdpbmdTZXJ2aWNlKCkuc2V0RnJlZXplUHVzaFNlcnZpY2UoZmFsc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHIodmlldy5pbnN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIERlc3Ryb3kgW1tWaWV3Q29tcG9uZW50XV0gaW5zdGFuY2UgcmVmZXJlbmNlXG4gICAqIEBwYXJhbSB2aWV3VG9SZW1vdmUgXG4gICAqIEBwYXJhbSBpbW1lZGlhdGVcbiAgICovXG4gIHJlbW92ZVZpZXcodmlld1RvUmVtb3ZlOiBWaWV3Q29tcG9uZW50LCBpbW1lZGlhdGU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBkZWFkVmlldyA9IF8uZmluZCh0aGlzLmR5bmFtaWNWaWV3c01hcCwgKHZpZXc6IENvbXBvbmVudFJlZjxWaWV3Q29tcG9uZW50Pik9PntcbiAgICAgIHJldHVybiB2aWV3Lmluc3RhbmNlLnVuaXF1ZUlkID09IHZpZXdUb1JlbW92ZS51bmlxdWVJZDtcbiAgICB9KTtcblxuICAgIHRoaXMuZHluYW1pY1ZpZXdzTWFwID0gXy5maWx0ZXIodGhpcy5keW5hbWljVmlld3NNYXAsICh2aWV3OiBDb21wb25lbnRSZWY8Vmlld0NvbXBvbmVudD4pPT57XG4gICAgICByZXR1cm4gdmlldy5pbnN0YW5jZS51bmlxdWVJZCAhPSB2aWV3VG9SZW1vdmUudW5pcXVlSWQ7XG4gICAgfSk7XG5cbiAgICBpZiAodmlld1RvUmVtb3ZlLmlzRGVzdHJveWVkICE9PSB0cnVlICYmIGRlYWRWaWV3ICE9IG51bGwpIHtcbiAgICAgIGlmKGltbWVkaWF0ZSkge1xuICAgICAgICBkZWFkVmlldy5kZXN0cm95KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkZWFkVmlldy5kZXN0cm95KCk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19