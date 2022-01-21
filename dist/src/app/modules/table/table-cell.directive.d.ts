import { TemplateRef } from '@angular/core';
/**
 * This directive serve as a template for rendering table cell.
 */
export declare class TableCellDirective {
    template: TemplateRef<any>;
    onContextMenuCb: (parentView: any) => void;
    /**
     * Horizontal alignment (center, left, right)
     */
    alignHorizontal: string;
    /**
     *
     * @param template Template on how to render the cell, we will forward row, column, etc to the template
     */
    constructor(template: TemplateRef<any>);
}
