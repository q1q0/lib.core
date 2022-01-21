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

@NgModule({
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
    TableColumnDirective ,
    TableHeaderDirective,
    HeaderDirective,
    LockedColumnDirective,
    TableRowDefDirective,
    FooterRowDirective,
    RowDirective
  ]
})
export class TableModule { }
