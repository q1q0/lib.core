import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'vt-list-item'
})
export class ListItemDirective {
  @Input() value: string;
  @Input() text: string;
  @Input() selected: boolean | string;
  @Input() isChecked: boolean | string;

  constructor() { }

}
