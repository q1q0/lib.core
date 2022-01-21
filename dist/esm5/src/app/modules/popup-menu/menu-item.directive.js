/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, QueryList, ContentChildren, Output, EventEmitter } from '@angular/core';
/**
 * Menu item directive class. Adds menu dispay and behavior to component
 */
var MenuItemDirective = /** @class */ (function () {
    function MenuItemDirective() {
        this.text = '';
        this.visible = true;
        this.onCommand = new EventEmitter();
    }
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param parentScreenId
     */
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    MenuItemDirective.prototype.toMenuItem = /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (parentScreenId) {
        var _this = this;
        /** @type {?} */
        var menuItem = {
            id: this.id,
            text: this.text,
            menuItems: null,
            onCommand: this.onCommand,
            parentScreenId: parentScreenId,
            display: this.visible
        };
        if (this.subMenuItems != null && this.subMenuItems.length > 0) {
            //filter to remove self then map to MenuItem
            menuItem.menuItems = this.subMenuItems.filter(function (item) { return item !== _this; }).map(function (item) { return item.toMenuItem(parentScreenId); });
        }
        return menuItem;
    };
    MenuItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-menu-item'
                },] }
    ];
    MenuItemDirective.propDecorators = {
        idName: [{ type: Input }],
        id: [{ type: Input }],
        text: [{ type: Input }],
        visible: [{ type: Input }],
        onCommand: [{ type: Output }],
        subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
    };
    return MenuItemDirective;
}());
export { MenuItemDirective };
if (false) {
    /** @type {?} */
    MenuItemDirective.prototype.idName;
    /** @type {?} */
    MenuItemDirective.prototype.id;
    /** @type {?} */
    MenuItemDirective.prototype.text;
    /** @type {?} */
    MenuItemDirective.prototype.visible;
    /** @type {?} */
    MenuItemDirective.prototype.onCommand;
    /** @type {?} */
    MenuItemDirective.prototype.subMenuItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcG9wdXAtbWVudS9tZW51LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztvQkFZakUsRUFBRTt1QkFDRSxJQUFJO3lCQUNWLElBQUksWUFBWSxFQUFROztJQUl0RDs7O09BR0c7Ozs7OztJQUNILHNDQUFVOzs7OztJQUFWLFVBQVcsY0FBdUI7UUFBbEMsaUJBZ0JDOztRQWZDLElBQU0sUUFBUSxHQUFhO1lBQ3pCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBRTdELFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxJQUFJLEtBQUssS0FBSSxFQUFiLENBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBRSxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztTQUMvRztRQUVELE9BQU8sUUFBUSxDQUFDO0tBQ2pCOztnQkFoQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs7O3lCQUVFLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsTUFBTTsrQkFFTixlQUFlLFNBQUMsaUJBQWlCOzs0QkFoQnBDOztTQVNhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUtaXRlbSc7XG5cbi8qKlxuICogTWVudSBpdGVtIGRpcmVjdGl2ZSBjbGFzcy4gQWRkcyBtZW51IGRpc3BheSBhbmQgYmVoYXZpb3IgdG8gY29tcG9uZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3Z0LW1lbnUtaXRlbSdcbn0pXG5leHBvcnQgY2xhc3MgTWVudUl0ZW1EaXJlY3RpdmUge1xuICBASW5wdXQoKSBwcml2YXRlIGlkTmFtZTogc3RyaW5nOyAvL0RPIE5PVCB1c2VkLCBleGlzdHMgZm9yIGJhZCB1c2FnZVxuICBASW5wdXQoKSBwcml2YXRlIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByaXZhdGUgdGV4dDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHByaXZhdGUgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBwcml2YXRlIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKSBwcml2YXRlIHN1Yk1lbnVJdGVtczogUXVlcnlMaXN0PE1lbnVJdGVtRGlyZWN0aXZlPjtcblxuICAvKipcbiAgICogQ29udmVydCBbW01lbnVJdGVtRGlyZWN0aXZlXV0gY2hpbGRyZW4gb2YgcGFyZW50IHZpZXcgdG8gW1tNZW51SXRlbV1dXG4gICAqIEBwYXJhbSBwYXJlbnRTY3JlZW5JZFxuICAgKi9cbiAgdG9NZW51SXRlbShwYXJlbnRTY3JlZW5JZD86IHN0cmluZyk6IE1lbnVJdGVtIHtcbiAgICBjb25zdCBtZW51SXRlbTogTWVudUl0ZW0gPSB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHRleHQ6IHRoaXMudGV4dCxcbiAgICAgIG1lbnVJdGVtczogbnVsbCxcbiAgICAgIG9uQ29tbWFuZDogdGhpcy5vbkNvbW1hbmQsXG4gICAgICBwYXJlbnRTY3JlZW5JZDogcGFyZW50U2NyZWVuSWQsXG4gICAgICBkaXNwbGF5OiB0aGlzLnZpc2libGVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc3ViTWVudUl0ZW1zICE9IG51bGwgJiYgdGhpcy5zdWJNZW51SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgLy9maWx0ZXIgdG8gcmVtb3ZlIHNlbGYgdGhlbiBtYXAgdG8gTWVudUl0ZW1cbiAgICAgIG1lbnVJdGVtLm1lbnVJdGVtcyA9IHRoaXMuc3ViTWVudUl0ZW1zLmZpbHRlcihpdGVtPT5pdGVtICE9PSB0aGlzKS5tYXAoaXRlbT0+aXRlbS50b01lbnVJdGVtKHBhcmVudFNjcmVlbklkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbnVJdGVtO1xuICB9XG59XG4iXX0=