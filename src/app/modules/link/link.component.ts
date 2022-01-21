import { Component, OnInit, Input, Output, EventEmitter, ElementRef, SkipSelf, Optional, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

/**
 * Class for a link component
 */
@Component({
  selector: 'vt-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>LinkComponent)
    }
  ]
})
export class LinkComponent extends BaseComponent implements OnInit {
  @Input() idName: string;
  @Output() onCommand = new EventEmitter();

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd Change detector reference for this component
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /* カレンダーボタン活性/非活性の色指定 */
  _disabled:boolean;
  get disabled(){return this._disabled; }
  @Input('disabled')
  set disabled(value){
    this.opacity = value ? '0.3':'1.0';
    this._disabled = value;
  }
  @Input('innerhtml') innerhtml: string;

  /**
   * Init lifecycle. Calls parent init method
   */
  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Event handler for click event. Does not emit event if the panel is disabled
   * @event OnCommand
   */
  onClick() {
    if (!this.disabled)
      this.onCommand.emit();
  }

  /**
   * Event handler for keydown event. Execute click handler if it's the enter key
   * @param e Keyboard Event
   */
  onKeyUp(e: KeyboardEvent) {
    // if ENTER key
    if (e.keyCode === 13) {
      this.onClick();
    }
  }

  /**
   * Get the JSON representation for panel
   */
  toJson(): {} {
    const json: any = super.toJson();

    if (json["customAttributes"] == null) {
      json["customAttributes"] = {};
    }

    this.setJson(json["customAttributes"], "idName", this.idName);

    return json;
  }

  /**
   * Get the [[cd]] (ChangeDetector) property
   * @returns Value of [[cd]] property
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }
}
