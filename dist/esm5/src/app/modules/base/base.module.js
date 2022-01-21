/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { SessionModule } from '../session/session.module';
import { JavaModule } from '../java/java.module';
import { EventHandlerModule } from '../event-handler/event-handler.module';
import { OnCreateDirective } from './on-create.directive';
var BaseModule = /** @class */ (function () {
    function BaseModule() {
    }
    BaseModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SessionModule,
                        JavaModule,
                        EventHandlerModule
                    ],
                    declarations: [BaseComponent, OnCreateDirective],
                    exports: [BaseComponent, OnCreateDirective]
                },] }
    ];
    return BaseModule;
}());
export { BaseModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2Jhc2UvYmFzZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztnQkFFekQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixrQkFBa0I7cUJBQ25CO29CQUNELFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztvQkFDaEQsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDO2lCQUM1Qzs7cUJBakJEOztTQWtCYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uTW9kdWxlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBKYXZhTW9kdWxlIH0gZnJvbSAnLi4vamF2YS9qYXZhLm1vZHVsZSc7XG5pbXBvcnQgeyBFdmVudEhhbmRsZXJNb2R1bGUgfSBmcm9tICcuLi9ldmVudC1oYW5kbGVyL2V2ZW50LWhhbmRsZXIubW9kdWxlJztcbmltcG9ydCB7IE9uQ3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9vbi1jcmVhdGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTZXNzaW9uTW9kdWxlLFxuICAgIEphdmFNb2R1bGUsXG4gICAgRXZlbnRIYW5kbGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Jhc2VDb21wb25lbnQsIE9uQ3JlYXRlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0Jhc2VDb21wb25lbnQsIE9uQ3JlYXRlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBCYXNlTW9kdWxlIHsgfVxuIl19