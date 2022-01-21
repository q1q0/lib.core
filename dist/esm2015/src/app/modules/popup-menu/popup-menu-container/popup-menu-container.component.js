/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ContextMenuService } from '../context-menu.service';
import { PopupMenuComponent } from '../popup-menu.component';
/**
 * Class for popup menu container
 */
export class PopupMenuContainerComponent {
    /**
     *
     * @param {?} contextMenuService Injects reference to context menu service
     * @param {?} cd Injects change detector reference
     */
    constructor(contextMenuService, cd) {
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.hasPopupMenu = false;
        this.activeMenuSubscription = this.contextMenuService.activeMenuObservable.subscribe((activeMenu) => {
            this.setActiveMenu(activeMenu);
        });
    }
    /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    ngOnDestroy() {
        if (this.activeMenuSubscription != null) {
            this.activeMenuSubscription.unsubscribe();
        }
        this.activeMenuSubscription = null;
        this.activeMenuItems = null;
        this.contextMenuService = null;
    }
    /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    setActiveMenu(id) {
        this.activeMenuId = id;
        if (id != null) {
            this.activeMenuItems = this.contextMenuService.getContextMenuItems(id);
            if (this.activeMenuItems != null && this.activeMenuItems.length > 0) {
                this.hasPopupMenu = true;
            }
        }
        else {
            this.activeMenuItems = null;
            this.hasPopupMenu = false;
        }
        this.cd.detectChanges();
    }
}
PopupMenuContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-popup-menu-container',
                template: "<vt-popup-menu-view *ngIf=\"hasPopupMenu === true\" id=\"{{activeMenuId}}\" [menuItems]=\"activeMenuItems\"></vt-popup-menu-view>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
PopupMenuContainerComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef }
];
PopupMenuContainerComponent.propDecorators = {
    popupMenu: [{ type: ViewChild, args: [PopupMenuComponent,] }]
};
if (false) {
    /** @type {?} */
    PopupMenuContainerComponent.prototype.popupMenu;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.activeMenuSubscription;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.activeMenuId;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.activeMenuItems;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.hasPopupMenu;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.contextMenuService;
    /** @type {?} */
    PopupMenuContainerComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wb3B1cC1tZW51L3BvcHVwLW1lbnUtY29udGFpbmVyL3BvcHVwLW1lbnUtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFXN0QsTUFBTTs7Ozs7O0lBZUosWUFDVSxvQkFDQTtRQURBLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsT0FBRSxHQUFGLEVBQUU7NEJBVFksS0FBSztRQVczQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBQyxFQUFFO1lBQ2pHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLHNCQUFzQixJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7S0FDaEM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZFLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUMxQjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDekI7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsNklBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFYUSxrQkFBa0I7WUFINkIsaUJBQWlCOzs7d0JBZ0J0RSxTQUFTLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuLi9jb250ZXh0LW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBQb3B1cE1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9wb3B1cC1tZW51LmNvbXBvbmVudCc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHBvcHVwIG1lbnUgY29udGFpbmVyXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXBvcHVwLW1lbnUtY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLW1lbnUtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcG9wdXAtbWVudS1jb250YWluZXIuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cE1lbnVDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKFBvcHVwTWVudUNvbXBvbmVudCkgcG9wdXBNZW51OiBQb3B1cE1lbnVDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBhY3RpdmVNZW51U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgYWN0aXZlTWVudUlkOiBzdHJpbmc7XG4gIGFjdGl2ZU1lbnVJdGVtczogQXJyYXk8YW55PjtcbiAgXG4gIGhhc1BvcHVwTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGNvbnRleHRNZW51U2VydmljZSBJbmplY3RzIHJlZmVyZW5jZSB0byBjb250ZXh0IG1lbnUgc2VydmljZVxuICAgKiBAcGFyYW0gY2QgSW5qZWN0cyBjaGFuZ2UgZGV0ZWN0b3IgcmVmZXJlbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U2VydmljZTogQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuYWN0aXZlTWVudVN1YnNjcmlwdGlvbiA9IHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmFjdGl2ZU1lbnVPYnNlcnZhYmxlLnN1YnNjcmliZSgoYWN0aXZlTWVudSk9PntcbiAgICAgIHRoaXMuc2V0QWN0aXZlTWVudShhY3RpdmVNZW51KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGxpZmVjeWNsZS4gUmVtb3ZlIHJlZmVyZW5jZXNcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZU1lbnVTdWJzY3JpcHRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3RpdmVNZW51U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVNZW51U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZU1lbnVJdGVtcyA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhY3RpdmUgbWVudSBieSBpZFxuICAgKiBAcGFyYW0gaWQgSWQgb2YgbWVudSB0byBzZXQgYXMgYWN0aXZlXG4gICAqL1xuICBzZXRBY3RpdmVNZW51KGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGl2ZU1lbnVJZCA9IGlkO1xuICAgIFxuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFjdGl2ZU1lbnVJdGVtcyA9IHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmdldENvbnRleHRNZW51SXRlbXMoaWQpO1xuXG4gICAgICBpZiAodGhpcy5hY3RpdmVNZW51SXRlbXMgIT0gbnVsbCAmJiB0aGlzLmFjdGl2ZU1lbnVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaGFzUG9wdXBNZW51ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVNZW51SXRlbXMgPSBudWxsO1xuICAgICAgdGhpcy5oYXNQb3B1cE1lbnUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19