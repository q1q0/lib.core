import { QueryList } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
export declare class RowDirective {
    customAttributes: {
        [name: string]: string;
    };
    id: string;
    cssClass: string;
    cellTemplates: QueryList<TableCellDirective>;
}
