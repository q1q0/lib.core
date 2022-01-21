import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'vt-table-row-def'
})
export class TableRowDefDirective {
  @Input() customAttributes: {[name: string]: string};
  
  constructor() { }

}
