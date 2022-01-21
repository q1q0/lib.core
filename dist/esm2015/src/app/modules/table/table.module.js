/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCellDirective } from './table-cell.directive';
import { TableHeaderDirective } from './table-header.directive';
import { TableColumnDirective } from './table-column.directive';
import { HeaderDirective } from './header.directive';
import { LockedColumnDirective } from './locked-column.directive';
import { BaseModule } from '../base/base.module';
import { TableRowDefDirective } from './table-row-def.directive';
import { FooterRowDirective } from './footer-row.directive';
import { RowDirective } from './row.directive';
import { ClipboardModule } from '../clipboard/clipboard.module';
export class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule,
                    ClipboardModule
                ],
                declarations: [
                    TableComponent,
                    TableCellDirective,
                    TableColumnDirective,
                    TableHeaderDirective,
                    HeaderDirective,
                    LockedColumnDirective,
                    TableRowDefDirective,
                    FooterRowDirective,
                    RowDirective
                ],
                exports: [
                    TableComponent,
                    TableCellDirective,
                    TableColumnDirective,
                    TableHeaderDirective,
                    HeaderDirective,
                    LockedColumnDirective,
                    TableRowDefDirective,
                    FooterRowDirective,
                    RowDirective
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy90YWJsZS90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUErQmhFLE1BQU07OztZQTdCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixlQUFlO29CQUNmLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixZQUFZO2lCQUNiO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2hlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTG9ja2VkQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2NrZWQtY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCYXNlTW9kdWxlIH0gZnJvbSAnLi4vYmFzZS9iYXNlLm1vZHVsZSc7XG5pbXBvcnQgeyBUYWJsZVJvd0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtcm93LWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9vdGVyUm93RGlyZWN0aXZlIH0gZnJvbSAnLi9mb290ZXItcm93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSb3dEaXJlY3RpdmUgfSBmcm9tICcuL3Jvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkTW9kdWxlIH0gZnJvbSAnLi4vY2xpcGJvYXJkL2NsaXBib2FyZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJhc2VNb2R1bGUsXG4gICAgQ2xpcGJvYXJkTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRhYmxlQ29tcG9uZW50LFxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZSxcbiAgICBUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBUYWJsZUhlYWRlckRpcmVjdGl2ZSxcbiAgICBIZWFkZXJEaXJlY3RpdmUsXG4gICAgTG9ja2VkQ29sdW1uRGlyZWN0aXZlLFxuICAgIFRhYmxlUm93RGVmRGlyZWN0aXZlLFxuICAgIEZvb3RlclJvd0RpcmVjdGl2ZSxcbiAgICBSb3dEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRhYmxlQ29tcG9uZW50LFxuICAgIFRhYmxlQ2VsbERpcmVjdGl2ZSxcbiAgICBUYWJsZUNvbHVtbkRpcmVjdGl2ZSAsXG4gICAgVGFibGVIZWFkZXJEaXJlY3RpdmUsXG4gICAgSGVhZGVyRGlyZWN0aXZlLFxuICAgIExvY2tlZENvbHVtbkRpcmVjdGl2ZSxcbiAgICBUYWJsZVJvd0RlZkRpcmVjdGl2ZSxcbiAgICBGb290ZXJSb3dEaXJlY3RpdmUsXG4gICAgUm93RGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUgeyB9XG4iXX0=