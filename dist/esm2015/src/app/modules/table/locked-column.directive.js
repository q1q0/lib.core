/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef } from '@angular/core';
import { TableColumnDirective } from './table-column.directive';
/**
 * Just aliasing vt-table-column for locked column
 */
export class LockedColumnDirective extends TableColumnDirective {
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.locked = true;
    }
}
LockedColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-locked-column',
                providers: [
                    {
                        provide: TableColumnDirective,
                        useExisting: forwardRef(() => LockedColumnDirective)
                    }
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ja2VkLWNvbHVtbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RhYmxlL2xvY2tlZC1jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEU7OztBQVlBLE1BQU0sNEJBQTZCLFNBQVEsb0JBQW9COzs7O0lBQzdELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDcEI7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRSxFQUFFLENBQUEscUJBQXFCLENBQUM7cUJBQ25EO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIENvbnRlbnRDaGlsZCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd2dC1sb2NrZWQtY29sdW1uJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVGFibGVDb2x1bW5EaXJlY3RpdmUsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+TG9ja2VkQ29sdW1uRGlyZWN0aXZlKVxuICAgIH1cbiAgXVxufSlcbi8qKlxuICogSnVzdCBhbGlhc2luZyB2dC10YWJsZS1jb2x1bW4gZm9yIGxvY2tlZCBjb2x1bW5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2tlZENvbHVtbkRpcmVjdGl2ZSBleHRlbmRzIFRhYmxlQ29sdW1uRGlyZWN0aXZlIHtcbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcbiAgfVxufVxuIl19