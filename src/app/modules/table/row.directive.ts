import { Directive, TemplateRef, ContentChild, ContentChildren, QueryList, Input } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';

@Directive({
  selector: 'vt-row'
})
export class RowDirective {
  @Input() customAttributes: {[name: string]: string};
  @Input() id: string;
  @Input() cssClass: string;

  @ContentChildren(TableCellDirective, {read: TableCellDirective})
  cellTemplates: QueryList<TableCellDirective>;
}
