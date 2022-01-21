import { Directive, TemplateRef, Input } from '@angular/core';

/**
 * This directive serve as a template for rendering table cell.
 */
@Directive({
    selector: '[vt-table-cell]'
})
export class TableCellDirective {
    @Input() onContextMenuCb: (parentView: any)=>void;

    // 右クリックメニューイベントフラグ
    @Input() onContextMenuFlg: boolean = true;

    @Input() customAttributes: {[name: string]: string};

    /**
     * Horizontal alignment (center, left, right)
     */
    @Input() alignHorizontal: string;

    /**
     *
     * @param template Template on how to render the cell, we will forward row, column, etc to the template
     */
    constructor(public template: TemplateRef<any>) {

    }
}
