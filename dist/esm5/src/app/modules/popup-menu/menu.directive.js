/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
/**
 * Menu directive class
 */
var MenuDirective = /** @class */ (function (_super) {
    tslib_1.__extends(MenuDirective, _super);
    function MenuDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-menu',
                    providers: [
                        {
                            provide: MenuItemDirective,
                            useExisting: forwardRef(function () { return MenuDirective; })
                        }
                    ]
                },] }
    ];
    return MenuDirective;
}(MenuItemDirective));
export { MenuDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7SUFjdkIseUNBQWlCOzs7OztnQkFUbkQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFJLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7O3dCQWREO0VBZW1DLGlCQUFpQjtTQUF2QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogTWVudSBkaXJlY3RpdmUgY2xhc3NcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndnQtbWVudScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1lbnVJdGVtRGlyZWN0aXZlLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9Pk1lbnVEaXJlY3RpdmUpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVEaXJlY3RpdmUgZXh0ZW5kcyBNZW51SXRlbURpcmVjdGl2ZSB7XG5cbn1cbiJdfQ==