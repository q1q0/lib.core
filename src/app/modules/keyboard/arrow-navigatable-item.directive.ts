import { Directive, ElementRef, NgZone, OnDestroy, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[vt-arrow-navigatable-item]',
})
export class ArrowNavigatableItemDirective implements OnDestroy {
  @Output() vtArrowOnMouseEnter: EventEmitter<void> = new EventEmitter<void>();
  @Output() vtArrowOnMouseLeave: EventEmitter<void> = new EventEmitter<void>();

  parent: any;
  jq: any;

  @HostListener("blur")
  handleOnBlur() {
    this.blur();
  }

  @HostListener("focus")
  handleOnFocus() {
    if (this.parent != null) {
      this.parent.activeItem = this;
    }
  }

  constructor(
    public element: ElementRef,
    private zone: NgZone,
    private renderer: Renderer2
  ) {
    this.jq = $(this.element.nativeElement);

    this.renderer.setAttribute(this.element.nativeElement, "tabindex", "-1");
  }

  ngOnDestroy() {
    this.jq = null;
    this.element = null;
    this.zone = null;
  }

  focus() {
    this.zone.run(()=>{
      this.jq.mouseover();
      // this.jq.focus();
      this.renderer.addClass(this.element.nativeElement, "mouse-hover");
    });
  }

  blur() {
    this.zone.run(()=>{
      this.jq.mouseout();
      // this.jq.blur();
      this.renderer.removeClass(this.element.nativeElement, "mouse-hover");
    });
  }

  select() {
    (this.element.nativeElement as HTMLElement).click();
  }

  hover() {
    this.zone.run(()=>{
      //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
      this.vtArrowOnMouseEnter.emit();
    });
  }

  leave() {
    this.zone.run(()=>{
      this.vtArrowOnMouseLeave.emit();
    });
  }
}
