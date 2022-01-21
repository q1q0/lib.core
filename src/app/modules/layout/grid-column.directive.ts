import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[vtGridColumn]'
})
export class GridColumnDirective implements OnInit {
  // ColumnSpan of element
  @Input() vtGridColumn: number;

  constructor(private el: ElementRef) {
  }

  /**
   * Init lifecycle. Set grid column css class
   */
  ngOnInit() {
    let cssClass = this.vtGridColumn ? `col-sm-${this.vtGridColumn}` : 'col-sm';
    this.el.nativeElement.classList.add(cssClass);
  }

}
