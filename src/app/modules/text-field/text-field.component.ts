import { Component, Input, OnInit, Output, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit , ChangeDetectionStrategy, SkipSelf, Optional, ViewChild, forwardRef, Renderer2, NgZone} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AttributesEnum } from '../base/attributes.enum'
import { isIE } from '../../functions/is-ie';

declare var $ : any;

/**
 * Class for text field component
 */
@Component({
  selector: 'vt-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TextFieldComponent)
    }
  ]
})
export class TextFieldComponent extends BaseComponent implements OnInit, AfterViewInit {
  static readonly MAX_LENGTH: number = 9999; //should be 523...but 9999 should be good enough

  /**
   * Input element's value
   */
  @Input() value: string;

  /**
   * Whether or not text field is editable
   */
  @Input() editable: boolean | string = true;

  /**
   * Max input allowed for characters
   */
  @Input() set maxLength(max: number) {
    this._maxLength = max;
  }

  @Input() formattedMaxLength: number;

  /**
   * HTML input element type attribute. Defaults to 'text'
   */
  @Input() type: string = 'text';

  @Output() onTextChange = new EventEmitter();
//　フィールドをフォーカスした場合、変更の有無にかかわらずイベント実行される
  @Output() onEdit = new EventEmitter();
// V3R1-UT_IT-NSD-336 修正 START
//　フィールドをフォーカスし、テキストチェンジもされている場合に使用
  @Output() onEditChange = new EventEmitter();
// V3R1-UT_IT-NSD-336 修正 END
  @Output() onMouseUp = new EventEmitter();

  get maxLength(): number {
    return this._maxLength > 0 ? this._maxLength : TextFieldComponent.MAX_LENGTH;
  }

  private _maxLength: number = TextFieldComponent.MAX_LENGTH;
  private _textBeforeFocusIn:string;//for onEdit()
  private _textPreviousKeyInput:string;//for onTextChange()
  isIE9: boolean;
  @ViewChild('input') input: ElementRef;

  styleVar: {[key: string]: string} = {};

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd Change detector for this component
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2, private zone: NgZone) {
    super(parent, sessionService, elementRef, renderer);
    this.isIE9 = isIE() == 9;
  }

  /**
   * Init lifecycle. Set dimensions and style properties
   */
  ngOnInit() {
    super.ngOnInit();
    if (this.disabled) {
      this.styleVar["color"] = this.fontColorDisabled || '';
    } else {
      this.styleVar["color"] = this.fontColor || 'inherit';
    }
    // this.styleVar["margin-left"] = "1px";
    this.styleVar["margin-right"] = "5px";

    // this.styles["margin-left"] = "1px";
    this.styles["margin-right"] = "5px";

    if(this.controlWidth){
      this.controlWidth = this.controlWidth + 'px';
    }

    if(this.controlHeight){
      this.controlHeight = this.controlHeight + 'px';
    }

    if(this.marginLeft){
      this.marginLeft = this.marginLeft + 'px';
    }

    if(this.marginTop){
      this.marginTop = this.marginTop + 'px';
    }

  }

  /**
   * After view init lifecycle. Set dimensions, focus text field
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.initWidthHeightStyle();

    this.setMaxLengthOnIE9();

    this.setAttributeFromDef();
    this.detectChanges();

    if (this.focusOnActivation) {
      this.input.nativeElement.focus();
    }

    if (this.type === 'date') {
      // Remove native datepicker controls applied by Chrome
      this.renderer.setProperty(this.input.nativeElement, 'type', 'text');
    }

    this.input.nativeElement.addEventListener('dragstart', (event) => { event.preventDefault() });
  }

  /**
   * Event handler for blur (unfocus) event
   * @param e Input blur event
   */
  onBlur(e, value) {
//    if(!document.hasFocus() && $(":focus").length > 0) {
//      this.value = this.text;
//      return;
//    }
    // setTimeout(()=>{
      if(!document.hasFocus() && $(":focus").length > 0) {
        return;
      }
      this.text = value;//when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
  // V3R1-UT-NSD-2120 修正 START
  // V3R1-UT_IT-NSD-336 修正 START
      if(this.text != this._textBeforeFocusIn){
        this.onEditChange.emit();
      }
      // 変更有無に関わらず実行
      this.onEdit.emit();
  // V3R1-UT_IT-NSD-336 修正 END
  // V3R1-UT-NSD-2120 修正 END
      // Checks for numeric date entry without slashes: e.g 20190104
      this.value = value;
      // If the user enters numbers without slashes auto format as date
      if (this.type==='date' && /^\d{8}$/m.test(this.text)) {
        let formattedDateString = [this.text.substr(0,4), this.text.substr(4,2), this.text.substr(6,2)].join('/');
        this.text = formattedDateString;
      }

      this.validateField(e);
      this.value = this.text;//https://github.com/weaveio/ngnsophia/issues/2040
    // }, 10);
  }

  /**
   * Event handler for focus event
   * @param e Input focus event
   */
  onFocus(e) {
    this.adjustScrollOnTable(this.input.nativeElement);
//    setTimeout(()=>{
//      if(this.value != null){
//        this.input.nativeElement.value = this.value;
//        this.text = this.value;
//      }
      // this.input.nativeElement.selectionStart = this.text.length;
      // this.input.nativeElement.selectionEnd = this.text.length;

  // V3R1-UT-NSD-2120 修正 START
      // if(!this.customAttributes)
      //   return;
      // customAttributesが存在しない場合にreturnで抜けると
      // _textBeforeFocusIn、_textPreviousKeyInputに値が設定されないのを修正
      // customAttributesにformatが存在する場合のみ、カンマの処理を実施
      if (this.customAttributes && this.customAttributes['format']) {
        let formatName:string= this.customAttributes['format'];
        if (formatName && formatName.indexOf("add_comma") >= 0) {
          //数値チェックでエラーになると、カンマが削除されて表示されるため
          //正常な数値（カンマ付き、小数点、マイナス許容）の場合のみ、カンマを削除する。
          if (/^(?=^(-)?([0-9,]*(\.)?[0-9,]*)$)(?!^,*$).*$/m.test(this.text)) {
            let txtMount = this.text.replace(/,/g,"")
            this.text = txtMount;
          }
        }
      }
  // V3R1-UT-NSD-2120 修正 END
      this._textBeforeFocusIn = this.text;
      this._textPreviousKeyInput = this.text;
//    }, 200);
  }

  private setMaxLengthOnIE9() {
    this.zone.runOutsideAngular(() => {
      let ta = this.input.nativeElement;
      let formatedMaxLength: number = this.formattedMaxLength;
      // console.log(`this.maxLength:${this.maxLength}`);
      // console.log(`ta.getAttribute("maxlength"):${ta.getAttribute("maxlength")}`);
      let ml = this.maxLength ? this.maxLength : parseInt(ta.getAttribute("maxlength"));
      // console.log(`ml:${ml}`);
      if(ta && ta.attachEvent && ta.addEventListener && !isNaN(ml) && ml >= 0) {
        let prevValue = ta.value;
        let imeModeIsON = null;
        let imeNotFixed = false;
        let imeDecision = false;
        ta.addEventListener("focus", function(evt: any) {
          prevValue = ta.value;
          imeModeIsON = null;
          imeNotFixed = false;
          imeDecision = false;
        }, false);
        ta.addEventListener("blur", function(evt: any) {
          if(!document.hasFocus() && $(":focus").length > 0) {
            return;
          }
          imeDecision = imeNotFixed;
          imeNotFixed = false;
          valHandler();
        }, false);
        ta.addEventListener("keyup", function(evt: any) {
          let kc = evt.keyCode;
          switch(kc) {
          case 243:  // Hankaku -> Zenkaku
            imeModeIsON = true;
            break;
          case 244:  // Zenkaku -> Hankaku
            imeModeIsON = false;
            break;
          case 13:  // Enter
            if(imeNotFixed) {
              imeNotFixed = false;
              imeDecision = true;
            }
            else {
              ta.selectionStart = 0;
              ta.selectionEnd = ta.value.length
            }
          case 27:  // Esc
            if(imeNotFixed) {
              imeNotFixed = false;
              imeDecision = true;
            }
            // (through non-break)
          default:
            setTimeout(valHandler, 1);
          }
        }, false);
        let valHandler = (evt?: any) => {
          this.zone.runOutsideAngular(() => {
            let nextValue = ta.value;
            // this.logMessage("valHandler: nextValue " + nextValue);
            // this.logMessage("valHandler: prevValue " + prevValue);
            let isChanged = (nextValue != prevValue);
            // this.logMessage("valHandler: isChanged " + isChanged);
            // this.logMessage("valHandler: imeModeIsON " + imeModeIsON);
            // this.logMessage("valHandler: selectionStart " + ta.selectionStart);
            // this.logMessage("valHandler: selectionEnd" + ta.selectionEnd);
            if(isChanged && ta.selectionStart == ta.selectionEnd && ta.selectionStart > 0) {
              // this.logMessage("valHandler: here1");
              if(nextValue.length > prevValue.length) {
                // this.logMessage("valHandler: here2");
                imeModeIsON = (nextValue.charCodeAt(ta.selectionStart - 1) > 0xFF);
              }
            }
            // this.logMessage("valHandler: imeDecision" + imeDecision);
            if(imeDecision === true || imeModeIsON == false) {
              imeDecision = false;
              imeNotFixed = false;
            } else if(imeModeIsON === true || imeNotFixed === true) {
              imeNotFixed = isChanged && (nextValue.length >= prevValue.length);
            }
            if(imeNotFixed) {
              // this.logMessage("valHandler, not fix IME, returning");
              return;  // Not fixed ime input characters exist, check should wait fix it.
            }
            if(!isChanged) {
              // this.logMessage("valHandler, no changes is detected, returning");
              return;
            }

            if((formatedMaxLength == null && nextValue.length > ml) || 
            (formatedMaxLength >= ml && nextValue.length > formatedMaxLength) || 
            (nextValue.length > ml && formatedMaxLength >= ml && nextValue.indexOf(',') < 0)) {
              // this.logMessage("valHandler, nextValue.length > maxLength");
              let diff = nextValue.length - prevValue.length;
              let posS = parseInt(ta.selectionStart);
              let posE = parseInt(ta.selectionEnd);
              if(posS > posE) {
                let posT = posS;
                posS = posE;
                posE = posT;
              }
              // this.logMessage("valHandler: posS: " + posS);
              if((posS > 0 && posS == nextValue.length) || nextValue.indexOf(prevValue, 0) == 0) {
                // this.logMessage("valHandler: cutting due to overflue");
                //check formatted string
                if (formatedMaxLength > ml && nextValue.indexOf(',') > 0) {
                  const count = nextValue.match(/,/g).length;
                  nextValue = nextValue.substring(0, ml + count);
                } else {
                  // this.logMessage("here5");
                  nextValue = nextValue.substring(0, ml);
                }

                ta.value = nextValue;
                prevValue = nextValue;
              } 
              else if(posS > 0 && posS < nextValue.length && (nextValue.indexOf(prevValue, 0) == 0 || nextValue.length > ml)) {
                const prevPosS = posS - (nextValue.length - ml);
                const firstPart = nextValue.substring(0, prevPosS);
                const secondPart = nextValue.substring(posS);
                // this.logMessage("first part:" + firstPart);
                // this.logMessage("second part:" + secondPart);
                nextValue = firstPart + secondPart;
                ta.value = nextValue;
                prevValue = nextValue;
                ta.selectionStart = prevPosS;
                ta.selectionEnd = prevPosS;
              } 
              else {
                // this.logMessage("valHandler: posS != nextValue.length, not cutting");
                if(posS == posE) {
                  posS -= diff;
                  posE -= diff;
                } else {
                  posE -= diff;
                }
                ta.value = prevValue;
                posE = posS;  // deselect. (If you don't want to deselect, comment off this line.)
                ta.selectionStart = posS;
                ta.selectionEnd   = posE;
                setTimeout(() => {
                  this.zone.runOutsideAngular(() => {
                    ta.selectionStart = posS;
                    ta.selectionEnd   = posE;
                    ta.setSelectionRange(posS, posE);
                  });
                }, 1);
              }
            } else {
              prevValue = nextValue;
            }
            this.text = ta.value;
          });
        };
        ta.attachEvent("onpropertychange", valHandler);
        ta.attachEvent("onpaste"         , valHandler);
      }
    });
  }

  /**
   * Event handler for text input
   * Emit onTextChange b/c user keep typing (input still has focus)
   * @param event
   * @param value
   * @event onTextChange
   */
  onInput(event: KeyboardEvent, value: string) {
    // if(event.keyCode == 8 || event.keyCode == 46)//Backspace || Delete
    // {
    //   let pos = this.input.nativeElement.selectionStart;
    //   this.text = value;
    //   setTimeout(() => {
    //     this.input.nativeElement.selectionStart = pos;
    //     this.input.nativeElement.selectionEnd = pos;
    //   });
    // }
    if(this.isIE9 && event.keyCode === 90 && event.ctrlKey ){
      this.text = value; 
    }//NGN-2296
    if(event.keyCode === 13 && this._textPreviousKeyInput == this.text){
      this.selectText();
    }
    if(this._textPreviousKeyInput != this.text)
      this.onTextChange.emit();
    this._textPreviousKeyInput = this.text;
  }

  /**
   * Focus the input element
   */
  /* istanbul ignore next */
  setFocus(){
    this.input.nativeElement.focus();
    super.handlePropertyEvent("set:Focus");
  }

  /**
   * Set background color CSS for the text input
   * @param bgColor CSS color string value for background
   */
  setBgColor(bgColor: string)
  {
    this.input.nativeElement.style.backgroundColor = bgColor;
    this.bgColor = bgColor;
    super.handlePropertyEvent("set:BgColor");
  }

  /**
   * Get [[_maxLength]] property value
   */
  getMaxLength() {
    return this._maxLength;
  }

  /**
   * Set [[_maxLength]] property value
   * @param max Maximum length of character input
   */
  setMaxLength(max: number | string) {
    // console.log(`textfield_maxLength1:${this._maxLength}`)
    // console.log(`id:${this.id}`);
    // console.log(`max:${max}`);
    if (typeof max === "number") {
      this._maxLength = max;
    } else {
      this._maxLength = parseInt(max);
    }
    // console.log(`textfield_maxLength2:${this._maxLength}`);
    setTimeout(()=>{
      this.setMaxLengthOnIE9();
      this.markForCheck();
    }, 300);
    super.handlePropertyEvent("set:MaxLength");
  }

  /**
   * Get JSON representation for this text-field
   */
  toJson(): {} {
    const json: any = super.toJson();
    this.setJson(json, "editable", this.editable);

    if (this.value != null) {
      this.setJson(json, "value", this.value);
    }

    return json;
  }

  /**
   * Get component name
   */
  getLocalName(): string {
    return "textField";
  }

  /**
   * Get the text content value of the input element
   */
  getValue(): string {
    return this.getText();
  }

  /**
   * Event handler for mousedown
   */
  handleMouseDown() {
    if(this.isIE9 && (!this.editable || !this.textEditable)){
      return false;
    }
  }

  /**
   * Event handler for mouseup
   * @event OnMouseUp
   */
  handleMouseUp() {
    this.onMouseUp.emit();
  }

  /**
   * @returns String Tag name
   */
  /* istanbul ignore next */
  protected getNxTagName() {
    return "textField";
  }

  /**
   * Get the [[cd]] (ChangeDetector) property
   * @returns Change detector
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }

  //angular doesn't like accessing private/public method
  _notifyInternalChangeCb() {
    super._notifyInternalChangeCb();
  }

  /**
   * Select all text
   */
  selectText(){
    this.input.nativeElement.select();
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
    super.handlePropertyEvent("set:Visible");
  }

  handleKeyDown(event: KeyboardEvent){
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode == 13){
      event.stopPropagation();
    }
    if (event.keyCode === 9) { //NGN-2357: when tab key is pressed, onTextChange event should be emitted.
      this.onTextChange.emit();
    }
  }

  setDisabled(boo: boolean) {
    this.textEditable = !boo;
    super.setDisabled(boo);
    this.setTextColor(!boo);
  }
  set enabled(boo: boolean) {
    this.textEditable = boo;
    this.disabled = !boo;
    this.setTextColor(boo);
  }
  private setTextColor(boo: boolean){
    if (!boo){
        this.styleVar["color"]= this.fontColorDisabled || '';
    }else{
      this.styleVar["color"] = this.fontColor || 'inherit';
    }
  }
}
