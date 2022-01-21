import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AlignHorizontal } from '../base/style-literals';
import { AttributesEnum } from '../base/attributes.enum';

/**
 * Class for label component. Renders text
 */
@Component({
  selector: 'vt-label,vt-cell',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: LabelComponent
    }
  ]
})
export class LabelComponent extends BaseComponent implements OnInit {
  @Input() alignHorizontal: AlignHorizontal;
  @Input() set tooltip(tooltip: string) {
    if (tooltip == null || tooltip === "undefined") {
      this._tooltip = "";
    } else {
      this._tooltip = tooltip;
    }
  }
  @Input('innerhtml') innerhtml: string;
  /**
   * Accessor method for internal [[_tootip]] property
   */
  get tooltip() {
    return this._tooltip;
  }

  private _tooltip: string = '';

  @Output() onCommand = new EventEmitter();

  @Output() onMouseDown = new EventEmitter();

  /**
   *
   * @param parent See [[BaseComponent]]
   * @param sessionService see [[BaseComponent]]
   * @param elementRef see [[BaseComponent]]
   * @param cd Change detector ref
   * @param renderer see [[BaseComponent]]
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
		super(parent, sessionService, elementRef, renderer);
	}

  /**
   * Init lifecycle method. Runs when component is created
   */
  ngOnInit() {
    super.ngOnInit();

    if(this.controlWidth) {
      this.controlWidth = this.controlWidth + 'px';
    }

    if(this.marginRight) {
      this.marginRight = this.marginRight + 'px';
    }

    if(this.marginLeft) {
      this.marginLeft = this.marginLeft + 'px';
    }

    if(this.marginBottom) {
      this.marginBottom = this.marginBottom + 'px';
    }

    if(this.marginTop) {
      this.marginTop = this.marginTop + 'px';
    }
  }

  /**
   * After view init lifecycle method. Runs after component view is created
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    if (this.controlHeight != null && this.controlHeight !== "") {
      this.styles["height"] = this.controlHeight + "px";
    }

    this.setAttributeFromDef();

    //fix expression has changed blah blah blah
    this.detectChanges();
  }

  /**
   * Get JSON representation of component
   */
  toJson(): {} {
    const json: any = super.toJson();
    this.setJson(json, "alignHorizontal", this.alignHorizontal);

    return json;
  }

  /**
   * Set value of [[tooltip]] property
   * @param tooltip
   */
  setTooltip(tooltip: string) {
    this.tooltip = tooltip;
    this.markForCheck();
    super.handlePropertyEvent("set:Tooltip");
  }

  /**
   * Event handler for mousedown event. Call parent class [[handleMouseDown]]
   * @param e Mouse click event
   */
  onMouseDownLabel(e: MouseEvent) {
    this.handleMouseDown(e)
    this.onMouseDown.emit();
  }

  /**
   * Event handler for click event.
   * @event OnCommand
   */
  handleOnClick() {
    if (this.emitInternalOnCommand() === false) {
      this.onCommand.emit();
    }
  }

  /**
   * Get value of [[cd]] (ChangeDetectorRef) property
   * @returns The component's change detector
   */
  protected getChangeDetector() {
    return this.cd;
  }

  /**
   * Get NexaWeb tag name
   * @returns Name of tag
   */
  protected getNxTagName() {
    return "label";
  }

  /**
   * Check if the text is all space characters
   * @returns If text is just space characters TRUE, otherwise FALSE
   */
  get spaceText() {
    return this.text && this.text.length > 0 && this.text.trim().length === 0;
  }

  /**
   * Set [[visible]] property value
   * @override
   * @param value Toggle visibility
   */
  setVisible(value: boolean) {
    this.visible = value;
    if (this.visible) {
      this.removeCssClass('hidden');
      this.getElement().removeAttribute('hidden');
    } else {
      this.addCssClass('hidden');
      this.getElement().setAttribute('hidden', '');
    }
    super.handlePropertyEvent("setVisible");
  }

  setAttribute(attribute: AttributesEnum | string, value: any, skipAttributeOverride: boolean = false) {
    super.setAttribute(attribute, value, skipAttributeOverride);

    if (attribute === AttributesEnum.TEXT || attribute === "text") {
      this._notifyInternalChangeCb();
    }
  }
}
