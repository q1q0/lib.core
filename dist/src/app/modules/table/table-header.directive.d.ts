import { TemplateRef } from '@angular/core';
/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
export declare class TableHeaderDirective {
    template: TemplateRef<any>;
    id: string;
    autoWrap: boolean | string;
    /**
     *
     * @param template Template on how to render the header, we will forward row, column, etc to the template
     */
    constructor(template: TemplateRef<any>);
}
