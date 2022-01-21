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
var PopupMenuContainerComponent = /** @class */ (function () {
    /**
     *
     * @param contextMenuService Injects reference to context menu service
     * @param cd Injects change detector reference
     */
    function PopupMenuContainerComponent(contextMenuService, cd) {
        var _this = this;
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.hasPopupMenu = false;
        this.activeMenuSubscription = this.contextMenuService.activeMenuObservable.subscribe(function (activeMenu) {
            _this.setActiveMenu(activeMenu);
        });
    }
    /**
     * Destroy lifecycle. Remove references
     */
    /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    PopupMenuContainerComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    function () {
        if (this.activeMenuSubscription != null) {
            this.activeMenuSubscription.unsubscribe();
        }
        this.activeMenuSubscription = null;
        this.activeMenuItems = null;
        this.contextMenuService = null;
    };
    /**
     * Set active menu by id
     * @param id Id of menu to set as active
     */
    /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    PopupMenuContainerComponent.prototype.setActiveMenu = /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    function (id) {
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
    };
    PopupMenuContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-popup-menu-container',
                    template: "<vt-popup-menu-view *ngIf=\"hasPopupMenu === true\" id=\"{{activeMenuId}}\" [menuItems]=\"activeMenuItems\"></vt-popup-menu-view>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PopupMenuContainerComponent.ctorParameters = function () { return [
        { type: ContextMenuService },
        { type: ChangeDetectorRef }
    ]; };
    PopupMenuContainerComponent.propDecorators = {
        popupMenu: [{ type: ViewChild, args: [PopupMenuComponent,] }]
    };
    return PopupMenuContainerComponent;
}());
export { PopupMenuContainerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9wb3B1cC1tZW51L3BvcHVwLW1lbnUtY29udGFpbmVyL3BvcHVwLW1lbnUtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O0lBcUIzRDs7OztPQUlHO0lBQ0gscUNBQ1Usb0JBQ0E7UUFGVixpQkFPQztRQU5TLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsT0FBRSxHQUFGLEVBQUU7NEJBVFksS0FBSztRQVczQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxVQUFDLFVBQVU7WUFDOUYsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7S0FDSjtJQUVEOztPQUVHOzs7OztJQUNILGlEQUFXOzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0tBQ2hDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxtREFBYTs7Ozs7SUFBYixVQUFjLEVBQVU7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFdkIsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkUsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN6Qjs7Z0JBOURGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyw2SUFBb0Q7b0JBRXBELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBWFEsa0JBQWtCO2dCQUg2QixpQkFBaUI7Ozs0QkFnQnRFLFNBQVMsU0FBQyxrQkFBa0I7O3NDQWhCL0I7O1NBZWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuLi9jb250ZXh0LW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBQb3B1cE1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9wb3B1cC1tZW51LmNvbXBvbmVudCc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHBvcHVwIG1lbnUgY29udGFpbmVyXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXBvcHVwLW1lbnUtY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLW1lbnUtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcG9wdXAtbWVudS1jb250YWluZXIuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cE1lbnVDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKFBvcHVwTWVudUNvbXBvbmVudCkgcG9wdXBNZW51OiBQb3B1cE1lbnVDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBhY3RpdmVNZW51U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgYWN0aXZlTWVudUlkOiBzdHJpbmc7XG4gIGFjdGl2ZU1lbnVJdGVtczogQXJyYXk8YW55PjtcbiAgXG4gIGhhc1BvcHVwTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGNvbnRleHRNZW51U2VydmljZSBJbmplY3RzIHJlZmVyZW5jZSB0byBjb250ZXh0IG1lbnUgc2VydmljZVxuICAgKiBAcGFyYW0gY2QgSW5qZWN0cyBjaGFuZ2UgZGV0ZWN0b3IgcmVmZXJlbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U2VydmljZTogQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuYWN0aXZlTWVudVN1YnNjcmlwdGlvbiA9IHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmFjdGl2ZU1lbnVPYnNlcnZhYmxlLnN1YnNjcmliZSgoYWN0aXZlTWVudSk9PntcbiAgICAgIHRoaXMuc2V0QWN0aXZlTWVudShhY3RpdmVNZW51KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGxpZmVjeWNsZS4gUmVtb3ZlIHJlZmVyZW5jZXNcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZU1lbnVTdWJzY3JpcHRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3RpdmVNZW51U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVNZW51U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZU1lbnVJdGVtcyA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhY3RpdmUgbWVudSBieSBpZFxuICAgKiBAcGFyYW0gaWQgSWQgb2YgbWVudSB0byBzZXQgYXMgYWN0aXZlXG4gICAqL1xuICBzZXRBY3RpdmVNZW51KGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGl2ZU1lbnVJZCA9IGlkO1xuICAgIFxuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFjdGl2ZU1lbnVJdGVtcyA9IHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmdldENvbnRleHRNZW51SXRlbXMoaWQpO1xuXG4gICAgICBpZiAodGhpcy5hY3RpdmVNZW51SXRlbXMgIT0gbnVsbCAmJiB0aGlzLmFjdGl2ZU1lbnVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuaGFzUG9wdXBNZW51ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVNZW51SXRlbXMgPSBudWxsO1xuICAgICAgdGhpcy5oYXNQb3B1cE1lbnUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19