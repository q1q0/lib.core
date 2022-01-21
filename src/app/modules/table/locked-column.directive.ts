import { Directive, ContentChild, forwardRef } from '@angular/core';
import { TableColumnDirective } from './table-column.directive';

@Directive({
  selector: 'vt-locked-column',
  providers: [
    {
      provide: TableColumnDirective,
      useExisting: forwardRef(()=>LockedColumnDirective)
    }
  ]
})
/**
 * Just aliasing vt-table-column for locked column
 */
export class LockedColumnDirective extends TableColumnDirective {
  ngOnInit() {
    super.ngOnInit();

    this.locked = true;
  }
}
