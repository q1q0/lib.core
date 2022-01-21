import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ElementRef, SkipSelf, Optional, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
/* istanbul ignore next */
import { SessionService } from '../session/session.service';
/* istanbul ignore next */
import { AppUtils } from '../base/app-utils';

/**
 * Button component class. Inherits from [[BaseComponent]]
 */
@Component({
  selector: 'vt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>ButtonComponent)
    }
  ]
})
export class ButtonComponent extends BaseComponent implements OnInit {
  @Input() focused: boolean = true;
	@Output() onCommand = new EventEmitter();

  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Must call parent ngOnInit
   */
  ngOnInit() {
    super.ngOnInit();

    if(this.marginTop != null){
      this.marginTop = this.marginTop + 'px';
    }

    if(this.marginRight != null){
      this.marginRight = this.marginRight + 'px';
    }

    if(this.marginLeft != null){
      this.marginLeft = this.marginLeft + 'px';
    }

    if(this.marginBottom != null){
      this.marginBottom = this.marginBottom + 'px';
    }
  }

  /**
   * After view init lifecycle. Must call parent ngAfterViewInit
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.initWidthHeightStyle("height", "width");
    this.setAttributeFromDef();
    this.detectChanges();
  }

  /* istanbul ignore next */
  /**
   * Event handler for click event
   * @param event
   * @event OnCommand
   */
	onClick(event: MouseEvent) {

    event.stopPropagation();

    //register client event for mco
    this.handleClick(event);

    this.onCommand.emit();

    //it looks like you can change onCommand binding at runtime and since we are code
    //we add another fn to do it (we may removed this later once we have a better of usage)
    this.emitInternalOnCommand();
  }

  /* istanbul ignore next */
  /**
   * Event handler for mousedown event
   * @param e
   */
  onMouseDown(e: MouseEvent) {
    let currentTarget: string = e.currentTarget['id'];
    if (currentTarget != null && currentTarget.indexOf("BtnClose") > 0) {
      AppUtils.isCloseBtn = true;
    } else {
      AppUtils.isCloseBtn = false;
    }
    this.handleMouseDown(e);
  }

  /* istanbul ignore next */
  handleOnBlur() {
    setTimeout(() => {
      AppUtils.isCloseBtn = false;
    }, 500);
  }

  /**
   * Get change detector reference for the button instance
   * @returns [[cd]] property (Change detector)
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }

  /**
   * Get Nexaweb tag name
   * @returns String
   */
  protected getNxTagName() {
    return "button";
  }

  /**
   * Get JSON representation of the button component
   * @returns Json object
   */
  toJson(): {} {
    const json: any = super.toJson();
    this.setJson(json, "focused", this.focused);

    return json;
  }

}
