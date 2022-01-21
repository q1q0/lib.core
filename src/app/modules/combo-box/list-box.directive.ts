import { ContentChildren, Directive, QueryList } from '@angular/core';
import { ListItemDirective } from './list-item.directive';

@Directive({
  selector: 'vt-list-box'
})
export class ListBoxDirective {
  @ContentChildren(ListItemDirective)
  listItems: QueryList<ListItemDirective>;

  constructor() { }

}
