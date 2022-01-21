import { TemplateRef, OnInit } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
import { HeaderDirective } from './header.directive';
export declare class TableColumnDirective implements OnInit {
    locked: boolean;
    enabled: boolean;
    sortable: boolean;
    isChecked: boolean;
    /**
     * Horizontal alignment (center, left, right)
     */
    alignHorizontal: string;
    id: string;
    cellTemplate: TableCellDirective;
    headerTemplate: TemplateRef<any>;
    headerDirective: HeaderDirective;
    header: string;
    autoWrap: boolean;
    _header: string;
    sortDirection: string;
    originalColumnIndex: number;
    controlWidth: string | number;
    controlHeight: string | number;
    cellHeight: string | number;
    headerHeight: string | number;
    visible: boolean;
    _visible: boolean;
    customAttributes: {
        [name: string]: any;
    };
    styles: {
        [name: string]: string;
    };
    readonly isHeaderTemplate: boolean;
    /**
     * Don't track this column (that is, use for display only).
     */
    skipTracking: boolean;
    ngOnInit(): void;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string;
    setVisible(vis: boolean): void;
}
