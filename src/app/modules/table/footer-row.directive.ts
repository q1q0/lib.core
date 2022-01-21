import { Directive, TemplateRef, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';

@Directive({
  selector: 'vt-footer-row'
})
export class FooterRowDirective {

  @ContentChildren(TableCellDirective, {read: TableCellDirective})
  cellTemplates: QueryList<TableCellDirective>;

}
