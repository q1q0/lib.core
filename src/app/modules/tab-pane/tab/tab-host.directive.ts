import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[vt-tab-host]'
})
export class TabHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
