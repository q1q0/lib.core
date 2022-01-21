/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
/**
 * Menu directive class
 */
export class MenuDirective extends MenuItemDirective {
}
MenuDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-menu',
                providers: [
                    {
                        provide: MenuItemDirective,
                        useExisting: forwardRef(() => MenuDirective)
                    }
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBYzFELE1BQU0sb0JBQXFCLFNBQVEsaUJBQWlCOzs7WUFUbkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxhQUFhLENBQUM7cUJBQzNDO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcblxuLyoqXG4gKiBNZW51IGRpcmVjdGl2ZSBjbGFzc1xuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd2dC1tZW51JyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTWVudUl0ZW1EaXJlY3RpdmUsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+TWVudURpcmVjdGl2ZSlcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWVudURpcmVjdGl2ZSBleHRlbmRzIE1lbnVJdGVtRGlyZWN0aXZlIHtcblxufVxuIl19