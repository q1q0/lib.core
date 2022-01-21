import { Directive, TemplateRef, Input } from '@angular/core';

/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
@Directive({
    selector: '[vt-table-header]'
})
export class TableHeaderDirective {
    @Input() id: string;
    @Input() autoWrap: boolean | string;
    /**
     * 
     * @param template Template on how to render the header, we will forward row, column, etc to the template
     */
    constructor(public template: TemplateRef<any>) {
        
    }
}
