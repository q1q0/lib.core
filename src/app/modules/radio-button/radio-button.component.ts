import { Component, Input, OnInit, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { element } from 'protractor';
import { UiDocument } from '../base/ui-document';
import { TableComponent } from '../table/table.component';

/**
 * Class for radio button input control
 */
@Component({
  selector: 'vt-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>RadioButtonComponent)
    }
  ]
})
export class RadioButtonComponent extends BaseComponent implements OnInit {
  @Input() group: string;
  @Input() idName: string;
  @Input() value: any;
  @Input() set isChecked(boo: boolean) {
    this.checked = boo;
  }

  @Input() checked: boolean = false;

  private _internalChangeTracking: boolean;

  @Output() onCommand = new EventEmitter();

  /**
   * 
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd Change detector for this panel
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Call parent init method.
   */
  ngOnInit() {
    super.ngOnInit();

    if (this.idName != null) {
      this.setCustomAttribute('idName', this.idName);
    }
  }

  /**
   * After view init lifecycle. Set the radiobutton group and attributes.
   * Calls parent ngAfterViewInti method
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    if (this.getParent() != null) {
      this.getParent().addRadioButtonGroup(this);
    }

    this.setAttributeFromDef();
    this.detectChanges();
    this._internalChangeTracking = this.checked;
  }

  /**
   * Event handler for change event
   * @event OnCommand
   */
  onChange() {
    this.onCommand.emit();
  }

  /**
   * Event handler for click event. Updates radio button state
   * @param event Mouse click event
   */
  onClick(event: MouseEvent) {
    event.stopPropagation();
    
    let fireOnChange = false;

    //save current value before reset
    const tempCheck = this.checked;

    const selectedRow = this.getParentTableRow();
    if(selectedRow != null){
      const parent = this.getParent();
      if(parent.isTable() && /^vt-table$/i.test(parent.getTagName())) {
        (parent as TableComponent).setSelectedRadioRow(selectedRow);
      }
    }

    this.resetGroupRadios();

    //reset current value back for onChange
    this._internalChangeTracking = tempCheck;

    //register click for mco
    this.checked = true;
    this.handleClick(event);

    //notify internal changes (for internal use only)
    this._notifyInternalChangeCb();

    if (this._internalChangeTracking !== this.checked) {
      this.onChange();
      this._internalChangeTracking = this.checked;
    }
  }

  /**
   * Event handler for mousedown event
   * @param e MouseDown event
   */
  onMouseDown(e: MouseEvent) {
    this.handleMouseDown(e);
  }

  /**
   * Get the component name
   */
  getLocalName(): string {
    return "radioButton";
  }

  /**
   * Get the [[value]] property
   */
  getValue(): any {
    return this.value;
  }

  /**
   * Get the [[checked]] property
   */
  getChecked(): boolean {
    return this.checked;
  }

  /**
   * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
   * @param shouldChecked Toggle checked
   */
  setChecked(shouldChecked: boolean | string, skipInternalChange: boolean = false) {
    if (shouldChecked === true) {
      this.resetGroupRadios();
    }

    this.checked = shouldChecked === true || shouldChecked === 'true';
    this._internalChangeTracking = this.checked;
    this.markForCheck();

    //notify internal changes (for internal use only)
    if (skipInternalChange !== true) {
      this._notifyInternalChangeCb();
    }
  }

  /**
   * Check the radio button of the parent group that matches [[value]]
   * @param value 
   */
  setSelected(value: any) {
    if (value === true || value === "true") {
      this.setChecked(true);
    } else if (value == this.value) {
      this.setChecked(true);
    }
    else if (this.getParent() != null) {
      const group = this.getParent().getRadioButtonGroup(this.group);

      if (group != null) {
        for (let radio of group) {
          if (radio.getValue() == value) {
            radio.setChecked(true);
            break;
          }
        }
      }
    }
  }

  /**
   * Get JSON representation for the radiobutton component
   * @returns JSON
   */
  toJson(): {} {
    const json = super.toJson();

    json["group"] = this.group;
    json["selected"] = this.checked === true ? "true" : "false";

    return json;
  }

  /**
   * Get the NexaWeb tag name
   * @return Tag name
   */
  protected getNxTagName() {
    return "radioButton";
  }

  /**
   * Uncheck all radio buttons in the radio button's group
   */
  private resetGroupRadios() {
    const group = this.getParent().getRadioButtonGroup(this.group);

    if (group != null) {
      for (let radio of group) {
        radio.setChecked(false);
      }
    }
  }

  /**
   * Get [[cd]] (ChangeDetector) of this component
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }

  /**
   * Check if this component is a radiobutton
   * @returns True
   */
  protected isRadioButton() {
    return true;
  }

  handleKeyDown(event: KeyboardEvent){
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode == 13){
      event.stopPropagation();
    }
  }
}
