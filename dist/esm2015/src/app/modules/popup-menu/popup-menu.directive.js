/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, QueryList, Input, ContentChildren, Optional } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { ContextMenuService } from './context-menu.service';
import { BaseComponent } from '../base/base.component';
/**
 * Popup menu directive class. Adds context menu items to component
 */
export class PopupMenuDirective {
    /**
     *
     * @param {?} parent
     * @param {?} contextMenuService Injected service for context menu functions
     */
    constructor(parent, contextMenuService) {
        this.parent = parent;
        this.contextMenuService = contextMenuService;
        this.disabled = false;
        this.visible = true;
        this.text = "";
    }
    /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.parent != null && this.parent.getParentView() != null) {
            (/** @type {?} */ (this.parent.getParentView())).registerPopupMenu(this);
        }
        else {
            this.convertSubMenuItems(null);
        }
    }
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    getMenuItems() {
        return this.contextMenuService.getContextMenuItems(this.id);
    }
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    convertSubMenuItems(parentScreenId) {
        /** @type {?} */
        let menuItems = [];
        if (this.subMenuItems) {
            menuItems = this.subMenuItems.map(item => item.toMenuItem(parentScreenId));
        }
        this.contextMenuService.registerContextMenu(this.id, menuItems, parentScreenId);
    }
}
PopupMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-popup-menu'
            },] }
];
/** @nocollapse */
PopupMenuDirective.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }] },
    { type: ContextMenuService }
];
PopupMenuDirective.propDecorators = {
    idName: [{ type: Input }],
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    visible: [{ type: Input }],
    text: [{ type: Input }],
    subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
};
if (false) {
    /** @type {?} */
    PopupMenuDirective.prototype.idName;
    /** @type {?} */
    PopupMenuDirective.prototype.id;
    /** @type {?} */
    PopupMenuDirective.prototype.disabled;
    /** @type {?} */
    PopupMenuDirective.prototype.visible;
    /** @type {?} */
    PopupMenuDirective.prototype.text;
    /** @type {?} */
    PopupMenuDirective.prototype.subMenuItems;
    /** @type {?} */
    PopupMenuDirective.prototype.parent;
    /** @type {?} */
    PopupMenuDirective.prototype.contextMenuService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQXlCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFTdkQsTUFBTTs7Ozs7O0lBY0osWUFDc0IsTUFBcUIsRUFDakM7UUFEWSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ2pDLHVCQUFrQixHQUFsQixrQkFBa0I7d0JBYkMsS0FBSzt1QkFDTixJQUFJO29CQUNSLEVBQUU7S0FZckI7Ozs7O0lBS0wsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDOUQsbUJBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQW1CLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7O0lBS0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM3RDs7Ozs7O0lBTUQsbUJBQW1CLENBQUMsY0FBc0I7O1FBQ3hDLElBQUksU0FBUyxHQUFvQixFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztLQUNqRjs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQVJRLGFBQWEsdUJBd0JqQixRQUFRO1lBekJKLGtCQUFrQjs7O3FCQVd4QixLQUFLO2lCQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO21CQUNMLEtBQUs7MkJBRUwsZUFBZSxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUtaXRlbSc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi92aWV3L3ZpZXcuY29tcG9uZW50JztcblxuLyoqXG4gKiBQb3B1cCBtZW51IGRpcmVjdGl2ZSBjbGFzcy4gQWRkcyBjb250ZXh0IG1lbnUgaXRlbXMgdG8gY29tcG9uZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3Z0LXBvcHVwLW1lbnUnXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwTWVudURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBpZE5hbWU6IHN0cmluZzsgLy9ETyBOT1QgdXNlZCwgZXhpc3RzIGZvciBiYWQgdXNhZ2VcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNZW51SXRlbURpcmVjdGl2ZSkgcHJpdmF0ZSBzdWJNZW51SXRlbXM6IFF1ZXJ5TGlzdDxNZW51SXRlbURpcmVjdGl2ZT47XG4gIFxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBwYXJlbnQgXG4gICAqIEBwYXJhbSBjb250ZXh0TWVudVNlcnZpY2UgSW5qZWN0ZWQgc2VydmljZSBmb3IgY29udGV4dCBtZW51IGZ1bmN0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsXG4gICAgcHJpdmF0ZSBjb250ZXh0TWVudVNlcnZpY2U6IENvbnRleHRNZW51U2VydmljZVxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBJbml0aWFsaXplIHN1Ym1lbnUgaXRlbXNcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCAmJiB0aGlzLnBhcmVudC5nZXRQYXJlbnRWaWV3KCkgIT0gbnVsbCkge1xuICAgICAgKHRoaXMucGFyZW50LmdldFBhcmVudFZpZXcoKSBhcyBWaWV3Q29tcG9uZW50KS5yZWdpc3RlclBvcHVwTWVudSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb252ZXJ0U3ViTWVudUl0ZW1zKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSB0byBbW0NvbnRleHRNZW51U2VydmljZV1dIGdldENvbnRleHRNZW51SXRlbXMgbWV0aG9kXG4gICAqL1xuICBnZXRNZW51SXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmdldENvbnRleHRNZW51SXRlbXModGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhbGwgc3ViIG1lbnUgaXRlbXMgKFtbTWVudUl0ZW1EaXJlY3RpdmVdXSkgdG8gW1tNZW51SXRlbV1dXG4gICAqIEBwYXJhbSBwYXJlbnRTY3JlZW5JZCBJZCBvZiBwYXJlbnQgdmlldyBjb21wb25lbnRcbiAgICovXG4gIGNvbnZlcnRTdWJNZW51SXRlbXMocGFyZW50U2NyZWVuSWQ6IHN0cmluZykge1xuICAgIGxldCBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPiA9IFtdO1xuXG4gICAgaWYgKHRoaXMuc3ViTWVudUl0ZW1zKSB7XG4gICAgICBtZW51SXRlbXMgPSB0aGlzLnN1Yk1lbnVJdGVtcy5tYXAoaXRlbT0+aXRlbS50b01lbnVJdGVtKHBhcmVudFNjcmVlbklkKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2UucmVnaXN0ZXJDb250ZXh0TWVudSh0aGlzLmlkLCBtZW51SXRlbXMsIHBhcmVudFNjcmVlbklkKTtcbiAgfVxufVxuIl19