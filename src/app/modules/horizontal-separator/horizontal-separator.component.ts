import { Component, OnInit, ElementRef, Input, Renderer2, forwardRef, Optional, SkipSelf } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

/**
 * Class for Horizontal line (HR) component
 */
@Component({
  selector: 'vt-horizontal-separator',
  templateUrl: './horizontal-separator.component.html',
  styleUrls: ['./horizontal-separator.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>HorizontalSeparatorComponent)
    }
  ]
})
export class HorizontalSeparatorComponent extends BaseComponent implements OnInit {
  @Input() borderColor: string;

  /**
   * 
   * @param parent see [[BaseComponent]]
   * @param sessionService see [[BaseComponent]]
   * @param elementRef see [[BaseComponent]]
   * @param renderer see [[BaseComponent]]
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle method
   */
  ngOnInit() {
  }

  /**
   * Get JSON representation for this component
   */
  toJson() {
    const json: any = super.toJson();
    this.setJson(json, "borderColor", this.borderColor);

    return json;
  }

}
