/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from './combo-box.component';
import { ListBoxDirective } from './list-box.directive';
import { ListItemDirective } from './list-item.directive';
import { BsDropdownModule } from 'ngx-bootstrap';
import { KeyboardModule } from '../keyboard/keyboard.module';
export class ComboBoxModule {
}
ComboBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BsDropdownModule.forRoot(),
                    KeyboardModule
                ],
                declarations: [ComboBoxComponent, ListBoxDirective, ListItemDirective],
                exports: [
                    ComboBoxComponent,
                    ListBoxDirective,
                    ListItemDirective,
                    BsDropdownModule,
                    KeyboardModule
                ],
                entryComponents: [
                    ComboBoxComponent
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm8tYm94Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY29tYm8tYm94L2NvbWJvLWJveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFvQjdELE1BQU07OztZQWxCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFO29CQUMxQixjQUFjO2lCQUNmO2dCQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO2dCQUN0RSxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixjQUFjO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbWJvQm94Q29tcG9uZW50IH0gZnJvbSAnLi9jb21iby1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RCb3hEaXJlY3RpdmUgfSBmcm9tICcuL2xpc3QtYm94LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBLZXlib2FyZE1vZHVsZSB9IGZyb20gJy4uL2tleWJvYXJkL2tleWJvYXJkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnNEcm9wZG93bk1vZHVsZS5mb3JSb290KCksXG4gICAgS2V5Ym9hcmRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29tYm9Cb3hDb21wb25lbnQsIExpc3RCb3hEaXJlY3RpdmUsIExpc3RJdGVtRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1xuICAgIENvbWJvQm94Q29tcG9uZW50LFxuICAgIExpc3RCb3hEaXJlY3RpdmUsXG4gICAgTGlzdEl0ZW1EaXJlY3RpdmUsXG4gICAgQnNEcm9wZG93bk1vZHVsZSxcbiAgICBLZXlib2FyZE1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBDb21ib0JveENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbWJvQm94TW9kdWxlIHsgfVxuIl19