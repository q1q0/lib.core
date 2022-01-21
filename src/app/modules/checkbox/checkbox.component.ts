import { Component, OnInit, Output, EventEmitter, ElementRef, Input, ChangeDetectionStrategy, Optional, SkipSelf, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

/**
 * Check box component class
 */
@Component({
  selector: 'vt-check-box',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>CheckboxComponent)
    }
  ]
})
export class CheckboxComponent extends BaseComponent implements OnInit {
  @Input() value: any;
  @Input() checked: boolean = false;
  //alias for checked
  @Input() set isChecked(boo: boolean) {
    this.checked = boo;
  }

  get isChecked(): boolean {
    return this.checked;
  }

  @Output() onCommand: EventEmitter<any> = new EventEmitter();
  @Output() onStateChange: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Must call parent class ngOnInit
   */
  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * After view init lifecycle. Must call parent class ngAfterViewInit
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setAttributeFromDef();
    this.detectChanges();
  }

  /**
   * Event handler for click event
   * @param event
   * @event OnCommand
   */
  onClick(event: MouseEvent) {
    //consume the event, do not propagate any further
    event.stopPropagation();

    //NGN-1924, need to set status of checkbox
    this.checked = (event.srcElement as HTMLInputElement).checked;

    this.handleClick(event);
    this.onCommand.emit();
  }

  /**
   * Event handler for mousedown event
   * @param event
   */
  onMouseDown(event: MouseEvent) {
    //consume the event, do not propagate any further
    event.stopPropagation();

    this.handleMouseDown(event);
  }

  /**
   * Event handler for state change (check/uncheck)
   * @event OnStateChange
   * @event OnSelect If the checkbox is set to selected state
   */
  handleStateChange() {
    this.onStateChange.emit();

    if (this.checked === true) {
      this.onSelect.emit();
    }

    //notify internal changes (for internal use only)
    this._notifyInternalChangeCb();
  }

  /**
   * Get component name
   * @returns Name of component
   */
  getLocalName(): string {
    return "checkBox";
  }

  /**
   * Get [[checked]] property
   * @returns Value of [[checked]]
   */
  getChecked(): boolean {
    return this.checked;
  }

  /**
   * Set [[checked]] property value
   * @param shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
   */
  setChecked(shouldChecked: boolean | string, skipInternalChange: boolean = false) {
    this.checked = shouldChecked === true || shouldChecked === 'true';

    this.markForCheck();

    //notify internal changes (for internal use only)
    if (skipInternalChange !== true) {
      this._notifyInternalChangeCb();
    }
  }

  /**
   * Alias for [[setChecked]] method
   * @param boo Toggle [[checked]]
   */
  setSelected(boo: boolean | string) {
    this.setChecked(boo);
  }

  /**
   * Get [[value]] property
   * @returns Value of [[value]]
   */
  getValue() {
    return this.value;
  }

  /**
   * Get JSON representation of component state
   * @returns Object Json object
   */
  toJson() {
    const json = super.toJson();

    if (this.getChecked() === true) {
      json["selected"] = "true";
    } else {
      json["selected"] = "false";
    }

    if (this.value != null) {
      json["value"] = this.value + '';
    }

    return json;
  }

  /**
   * Get Nexaweb tag name
   * @returns String Tag name
   */
  protected getNxTagName() {
    return "checkBox";
  }

  /**
   * Get [[cd]] (Change detector) property
   * @returns The component's change detector reference
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }
    /**
   * Set background-color
   * @param String background color
   */
  setBgColor(color:string){
    this['elementRef'].nativeElement.children[0]['style']['background-color'] = color;
  }
  getBgColor(){
   return  this['elementRef'].nativeElement.children[0]['style']['background-color'];
  }

  handleKeyDown(event: KeyboardEvent){
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode == 13){
      event.stopPropagation();
    }
  }
}
