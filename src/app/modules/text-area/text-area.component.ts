import { Component, Input, OnInit, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, forwardRef, Renderer2, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
/* istanbul ignore next */
import { SessionService } from '../session/session.service';
import { toASCII } from 'punycode';

/**
 * Class for textarea component
 */
@Component({
  selector: 'vt-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TextAreaComponent)
    }
  ]
})
export class TextAreaComponent extends BaseComponent implements OnInit {
  static readonly MAX_LENGTH: number = 9999;
  private _maxLength: number = TextAreaComponent.MAX_LENGTH;

  @Input() set maxLength(max: number) {
    this._maxLength = max;
  }
  @Input() set editable(val: string | boolean) {
    this._editable = val;
  }

  @ViewChild('textarea') textarea: ElementRef;
  @Output() onTextChange = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  _editable: boolean | string = true;

  get editable(): boolean | string {
    return this._editable !== "false" && this._editable !== false;
  }
  get maxLength(): number {
    return this._maxLength > 0 ? this._maxLength : TextAreaComponent.MAX_LENGTH;
  }

  private _textBeforeFocusIn:string;//for onEdit()
  //private _textPreviousKeyInput:string;//for onTextChange()
  private _caretPreviousKeyInput: number;

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd ChangeDetector for this component
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2, private zone: NgZone) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Call parent ngOnInit
   */
  ngOnInit() {
    super.ngOnInit();

    // if(this.controlPadding){
    //   this.controlPadding = this.controlPadding + 'px';
    // }
  }

  /* istanbul ignore next */
  /**
   * After view init lifecycle.
   * Focus the textarea and set dimensions
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.focusOnActivation) {
      this.elementRef.nativeElement.focus();
    }

    this.textarea.nativeElement.addEventListener('dragstart', (event) => { event.preventDefault() });
    this.setMaxLengthOnIE9();
    this.initWidthHeightStyle("height", "width");
    this.setAttributeFromDef();
    this.detectChanges();
  }

  /**
   * Get the name of the component
   * @returns Name of component
   */
  getLocalName(): string {
    return "textArea";
  }

  /**
   * Focus the textarea element
   */
  setFocus() {
    this.textarea.nativeElement.focus();
    super.handlePropertyEvent("set:Focus");
  }

  /**
   * Get the value of internal [[_maxLength]] property
   */
  getMaxLength() {
    return this._maxLength;
  }

  /**
   * Set [[_maxLength]] property value and mark for change detection
   * @param max Length of text content
   */
  setMaxLength(max: number | string) {
    if (typeof max === "number") {
      this._maxLength = max;
    } else {
      this._maxLength = parseInt(max);
    }

    this.markForCheck();
    super.handlePropertyEvent("set:MaxLength");
  }

  private setMaxLengthOnIE9() {
    this.zone.runOutsideAngular(() => {
      let ta = this.textarea.nativeElement;
      let ml = this.maxLength ? this.maxLength : parseInt(ta.getAttribute("maxlength"));
      if(ta && ta.attachEvent && ta.addEventListener && !isNaN(ml) && ml >= 0) {
        // this.logMessage("maxlengthIE9 start: " + ml);

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
            if (evt) {
              // console.log("event type: " + evt.type);
              if (evt.type === 'paste') {
                if ((window as any).clipboardData) {
                  imeModeIsON = false;
                  imeNotFixed = false;
                  imeDecision = true;
                  // const data = (window as any).clipboardData.getData("Text");
                  // this.logMessage("current value: " + prevValue);
                  // this.logMessage("paste value: " + data);

                  // const le = (prevValue + data).length;

                  // this.logMessage("length: " + le + ", ml: " + ml);

                  // if (le > ml) {
                  //   this.logMessage("overflow!!!!");
                  //   evt.returnValue = false;
                
                  //   if (evt.preventDefault) {
                  //     evt.preventDefault();
                  //   }
    
                  //   if (evt.stopPropagation) {
                  //     evt.stopPropagation();
                  //   }

                  //   this.logMessage("pasting overflow, pasting is prevented");
                  // }
                } else {
                  // this.logMessage(" no clipboard!!!");
                }
              }
            }
            if(imeNotFixed) {
              // this.logMessage("valHandler, not fix IME, returning");
              return;  // Not fixed ime input characters exist, check should wait fix it.
            }
            if(!isChanged) {
              // this.logMessage("valHandler, no changes is detected, returning");
              return;
            }

            // this.logMessage("valHandler, nextValue.length: " + nextValue.length + ", mxlength: " + ml);
            if(nextValue.length > ml) {
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
              if(posS > 0 && posS == nextValue.length && (nextValue.indexOf(prevValue, 0) == 0 || nextValue.length > ml)) {
                // this.logMessage("valHandler: cutting due to overflue");
                nextValue = nextValue.substring(0, ml);
                ta.value = nextValue;
                prevValue = nextValue;
              } 
              else if(posS > 0 && posS < nextValue.length && (nextValue.indexOf(prevValue, 0) == 0 || nextValue.length > ml)) {
                // this.logMessage("valHandler: cutting due to overflue");
                // this.logMessage("nextValue.length: " + nextValue.length);
                // this.logMessage("posS: "+  posS);
                // this.logMessage("ml: "+  ml);
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

            //need to emit the change event
            this.onTextChange.emit();
          });
        };
        ta.attachEvent("onkeyup"         , valHandler);
        ta.attachEvent("onpropertychange", valHandler);
        ta.attachEvent("onpaste"         , valHandler);
      }
    });
  }

  // /* istanbul ignore next */
  // /**
  //  * Event handler for text input
  //  * Emit onTextChange b/c user keep typing (input still has focus)
  //  * @param event
  //  * @event onTextChange
  //  */
  // onInput(event) {
  //   // console.log('=======================');
  //   // console.log(`onInput:${this.textarea.nativeElement.value}`);
  //   // console.log(`onInput:${this.text}`);
  //   let pos = this.textarea.nativeElement.selectionStart;
  //   // if(event.keyCode == 8 || event.keyCode == 46)//Backspace || Delete
  //   // {
  //   //   this.text = this.textarea.nativeElement.value;
  //   //   setTimeout(() => {
  //   //     this.textarea.nativeElement.selectionStart = pos;
  //   //     this.textarea.nativeElement.selectionEnd = pos;
  //   //   });
  //   // }

  //   if(this.text != null && this._maxLength > 0 && this._maxLength < this.text.length && this._caretPreviousKeyInput > -1) {
  //     this.text = this._textPreviousKeyInput;
  //     this.textarea.nativeElement.value = this._textPreviousKeyInput;
  //     setTimeout(() => {
  //       this.textarea.nativeElement.selectionStart = this._caretPreviousKeyInput;
  //       this.textarea.nativeElement.selectionEnd = this._caretPreviousKeyInput;
  //     });
  //   }

  //   if(this._textPreviousKeyInput != this.text)
  //     this.onTextChange.emit();
  //   this._textPreviousKeyInput = this.text;
  //   this._caretPreviousKeyInput = pos;    
  // }

  /**
   * Get the value of [[cd]] (ChangeDetector) property
   * @returns Change detector for this component
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }

  /**
   * Get Nexaweb tag name
   * @returns Tag name
   */
  protected getNxTagName() {
    return "textArea";
  }

  /* istanbul ignore next */
  /**
   * Event handler for focus event
   * @param e Input focus event
   */
  onFocus(e) {
    this._textBeforeFocusIn = this.text;
    //this._textPreviousKeyInput = this.text;
  }

  /* istanbul ignore next */
  /**
   * Event handler for blur (unfocus) event
   * @param e Input blur event
   */
  onBlur(event) {
    if(this.textarea.nativeElement.ownerDocument.activeElement === this.textarea.nativeElement) return;//prevent focuslost whenever active process is changed.
    this.text = event.srcElement.value;//when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
    if(this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
      this.text = this.text.substring(0, this._maxLength);
    }
    if(this.text != this._textBeforeFocusIn)
      this.onEdit.emit();
    this.validateField(event);
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
  /**
   * Set [[editable]] property value
   * @override
   * @param boo for editable property 
   */
  setTextEditable(boo: boolean) {
    this.editable = boo;
    this.markForCheck();
    super.handlePropertyEvent("set:TextEditable");
  }
  
  handleKeyDown(event: KeyboardEvent){
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode == 13){
      event.stopPropagation();
    }
  }
}
