import { Directive, ContentChild, OnInit, ElementRef, EventEmitter, Output, ViewChild, forwardRef, ViewContainerRef, NgZone, Input } from '@angular/core';
import { OnCreateEvent } from './on-create-event';

@Directive({
  selector: '[vtOnCreate]'
})
export class OnCreateDirective implements OnInit {
  @Input() runOutsideZone: boolean;
  @Output() vtOnCreate: EventEmitter<OnCreateEvent> = new EventEmitter<OnCreateEvent>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    if (this.runOutsideZone === true) {
      this.zone.runOutsideAngular(()=>{
        this.vtOnCreate.emit({
          element: this.elementRef
        });
      });
    } else {
      this.vtOnCreate.emit({
        element: this.elementRef
      });
    }
  }
}
