/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMenuComponent } from './popup-menu.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuDirective } from './menu.directive';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PopupMenuContainerComponent } from './popup-menu-container/popup-menu-container.component';
import { PopupMenuDirective } from './popup-menu.directive';
export class PopupMenuModule {
}
PopupMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BsDropdownModule.forRoot()
                ],
                declarations: [
                    PopupMenuComponent,
                    MenuItemDirective,
                    MenuItemComponent,
                    MenuDirective,
                    PopupMenuContainerComponent,
                    PopupMenuDirective
                ],
                exports: [
                    PopupMenuComponent,
                    MenuItemDirective,
                    MenuItemComponent,
                    MenuDirective,
                    BsDropdownModule,
                    PopupMenuContainerComponent,
                    PopupMenuDirective
                ],
                providers: [
                    ContextMenuService
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUE2QjVELE1BQU07OztZQTNCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2lCQUMzQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYiwyQkFBMkI7b0JBQzNCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQiwyQkFBMkI7b0JBQzNCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBvcHVwTWVudUNvbXBvbmVudCB9IGZyb20gJy4vcG9wdXAtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL21lbnUtaXRlbS9tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL21lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAnO1xuaW1wb3J0IHsgUG9wdXBNZW51Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC1tZW51LWNvbnRhaW5lci9wb3B1cC1tZW51LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9wb3B1cC1tZW51LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnNEcm9wZG93bk1vZHVsZS5mb3JSb290KClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUG9wdXBNZW51Q29tcG9uZW50LFxuICAgIE1lbnVJdGVtRGlyZWN0aXZlLFxuICAgIE1lbnVJdGVtQ29tcG9uZW50LFxuICAgIE1lbnVEaXJlY3RpdmUsXG4gICAgUG9wdXBNZW51Q29udGFpbmVyQ29tcG9uZW50LFxuICAgIFBvcHVwTWVudURpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUG9wdXBNZW51Q29tcG9uZW50LFxuICAgIE1lbnVJdGVtRGlyZWN0aXZlLFxuICAgIE1lbnVJdGVtQ29tcG9uZW50LFxuICAgIE1lbnVEaXJlY3RpdmUsXG4gICAgQnNEcm9wZG93bk1vZHVsZSxcbiAgICBQb3B1cE1lbnVDb250YWluZXJDb21wb25lbnQsXG4gICAgUG9wdXBNZW51RGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbnRleHRNZW51U2VydmljZVxuICBdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBNZW51TW9kdWxlIHsgfVxuIl19