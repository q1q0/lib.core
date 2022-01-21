import { Directive, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Directive({
  selector: 'vt-header'
})
export class HeaderDirective implements OnInit {
  @Input() text: string;
  @Input() cssClass: string;
  @Input() controlHeight: string;
  @Input() controlWidth: string;
  @Input() headerHeight: string;
  @Input() autoWrap: boolean | string;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
    if (this.id == null) {
      this.id = BaseComponent.generateUniqueId("header");
    }
  }

}
