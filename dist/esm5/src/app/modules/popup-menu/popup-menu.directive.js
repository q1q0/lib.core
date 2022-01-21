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
var PopupMenuDirective = /** @class */ (function () {
    /**
     *
     * @param parent
     * @param contextMenuService Injected service for context menu functions
     */
    function PopupMenuDirective(parent, contextMenuService) {
        this.parent = parent;
        this.contextMenuService = contextMenuService;
        this.disabled = false;
        this.visible = true;
        this.text = "";
    }
    /**
     * After view init lifecycle. Initialize submenu items
     */
    /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    PopupMenuDirective.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    function () {
        if (this.parent != null && this.parent.getParentView() != null) {
            (/** @type {?} */ (this.parent.getParentView())).registerPopupMenu(this);
        }
        else {
            this.convertSubMenuItems(null);
        }
    };
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     */
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    PopupMenuDirective.prototype.getMenuItems = /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    function () {
        return this.contextMenuService.getContextMenuItems(this.id);
    };
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param parentScreenId Id of parent view component
     */
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    PopupMenuDirective.prototype.convertSubMenuItems = /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    function (parentScreenId) {
        /** @type {?} */
        var menuItems = [];
        if (this.subMenuItems) {
            menuItems = this.subMenuItems.map(function (item) { return item.toMenuItem(parentScreenId); });
        }
        this.contextMenuService.registerContextMenu(this.id, menuItems, parentScreenId);
    };
    PopupMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-popup-menu'
                },] }
    ];
    /** @nocollapse */
    PopupMenuDirective.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }] },
        { type: ContextMenuService }
    ]; };
    PopupMenuDirective.propDecorators = {
        idName: [{ type: Input }],
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        visible: [{ type: Input }],
        text: [{ type: Input }],
        subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
    };
    return PopupMenuDirective;
}());
export { PopupMenuDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQXlCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0lBa0JyRDs7OztPQUlHO0lBQ0gsNEJBQ3NCLE1BQXFCLEVBQ2pDO1FBRFksV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCO3dCQWJDLEtBQUs7dUJBQ04sSUFBSTtvQkFDUixFQUFFO0tBWXJCO0lBRUw7O09BRUc7Ozs7O0lBQ0gsNENBQWU7Ozs7SUFBZjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDOUQsbUJBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQW1CLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBWTs7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxnREFBbUI7Ozs7O0lBQW5CLFVBQW9CLGNBQXNCOztRQUN4QyxJQUFJLFNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDakY7O2dCQXBERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7O2dCQVJRLGFBQWEsdUJBd0JqQixRQUFRO2dCQXpCSixrQkFBa0I7Ozt5QkFXeEIsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOytCQUVMLGVBQWUsU0FBQyxpQkFBaUI7OzZCQXBCcEM7O1NBYWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJy4vbWVudS1pdGVtJztcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gJy4uL3ZpZXcvdmlldy5jb21wb25lbnQnO1xuXG4vKipcbiAqIFBvcHVwIG1lbnUgZGlyZWN0aXZlIGNsYXNzLiBBZGRzIGNvbnRleHQgbWVudSBpdGVtcyB0byBjb21wb25lbnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndnQtcG9wdXAtbWVudSdcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBNZW51RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGlkTmFtZTogc3RyaW5nOyAvL0RPIE5PVCB1c2VkLCBleGlzdHMgZm9yIGJhZCB1c2FnZVxuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdGV4dDogc3RyaW5nID0gXCJcIjtcblxuICBAQ29udGVudENoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKSBwcml2YXRlIHN1Yk1lbnVJdGVtczogUXVlcnlMaXN0PE1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHBhcmVudCBcbiAgICogQHBhcmFtIGNvbnRleHRNZW51U2VydmljZSBJbmplY3RlZCBzZXJ2aWNlIGZvciBjb250ZXh0IG1lbnUgZnVuY3Rpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U2VydmljZTogQ29udGV4dE1lbnVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUuIEluaXRpYWxpemUgc3VibWVudSBpdGVtc1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsICYmIHRoaXMucGFyZW50LmdldFBhcmVudFZpZXcoKSAhPSBudWxsKSB7XG4gICAgICAodGhpcy5wYXJlbnQuZ2V0UGFyZW50VmlldygpIGFzIFZpZXdDb21wb25lbnQpLnJlZ2lzdGVyUG9wdXBNZW51KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnZlcnRTdWJNZW51SXRlbXMobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGVnYXRlIHRvIFtbQ29udGV4dE1lbnVTZXJ2aWNlXV0gZ2V0Q29udGV4dE1lbnVJdGVtcyBtZXRob2RcbiAgICovXG4gIGdldE1lbnVJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0TWVudVNlcnZpY2UuZ2V0Q29udGV4dE1lbnVJdGVtcyh0aGlzLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFsbCBzdWIgbWVudSBpdGVtcyAoW1tNZW51SXRlbURpcmVjdGl2ZV1dKSB0byBbW01lbnVJdGVtXV1cbiAgICogQHBhcmFtIHBhcmVudFNjcmVlbklkIElkIG9mIHBhcmVudCB2aWV3IGNvbXBvbmVudFxuICAgKi9cbiAgY29udmVydFN1Yk1lbnVJdGVtcyhwYXJlbnRTY3JlZW5JZDogc3RyaW5nKSB7XG4gICAgbGV0IG1lbnVJdGVtczogQXJyYXk8TWVudUl0ZW0+ID0gW107XG5cbiAgICBpZiAodGhpcy5zdWJNZW51SXRlbXMpIHtcbiAgICAgIG1lbnVJdGVtcyA9IHRoaXMuc3ViTWVudUl0ZW1zLm1hcChpdGVtPT5pdGVtLnRvTWVudUl0ZW0ocGFyZW50U2NyZWVuSWQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHRNZW51U2VydmljZS5yZWdpc3RlckNvbnRleHRNZW51KHRoaXMuaWQsIG1lbnVJdGVtcywgcGFyZW50U2NyZWVuSWQpO1xuICB9XG59XG4iXX0=