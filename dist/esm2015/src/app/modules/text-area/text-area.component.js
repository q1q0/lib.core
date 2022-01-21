/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, forwardRef, Renderer2, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for textarea component
 */
export class TextAreaComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd ChangeDetector for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this._maxLength = TextAreaComponent.MAX_LENGTH;
        this.onTextChange = new EventEmitter();
        this.onEdit = new EventEmitter();
        this._editable = true;
    }
    /**
     * @param {?} max
     * @return {?}
     */
    set maxLength(max) {
        this._maxLength = max;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set editable(val) {
        this._editable = val;
    }
    /**
     * @return {?}
     */
    get editable() {
        return this._editable !== "false" && this._editable !== false;
    }
    /**
     * @return {?}
     */
    get maxLength() {
        return this._maxLength > 0 ? this._maxLength : TextAreaComponent.MAX_LENGTH;
    }
    /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.controlPadding) {
            this.controlPadding = this.controlPadding + 'px';
        }
    }
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.focusOnActivation) {
            this.elementRef.nativeElement.focus();
        }
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    }
    /**
     * Get the name of the component
     * @return {?} Name of component
     */
    getLocalName() {
        return "textArea";
    }
    /**
     * Focus the textarea element
     * @return {?}
     */
    setFocus() {
        this.textarea.nativeElement.focus();
    }
    /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    getMaxLength() {
        return this._maxLength;
    }
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    setMaxLength(max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    }
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    onInput(event, value) {
        /** @type {?} */
        let pos = this.textarea.nativeElement.selectionStart;
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            this.text = value;
            setTimeout(() => {
                this.textarea.nativeElement.selectionStart = pos;
                this.textarea.nativeElement.selectionEnd = pos;
            });
        }
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "textArea";
    }
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    onFocus(e) {
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    onBlur(event, value) {
        if (this.textarea.nativeElement.ownerDocument.activeElement === this.textarea.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        this.validateField(event);
    }
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    setVisible(value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
}
TextAreaComponent.MAX_LENGTH = 9999;
TextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-text-area',
                template: "<textarea #textarea [id]=\"id\" class=\"vt-text-area form-control {{cssClass}}\"\n[attr.disabled]=\"enabled !== false ? null : true\"\n  [attr.readonly]=\"editable !== false ? null : true\"\n  [style.height]=\"controlHeight\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.line-height]=\"lineHeight\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (focusin)=\"onFocus($event)\"\n  (focusout)=\"onBlur($event, textarea.value)\"\n  (keyup)=\"onInput($event, textarea.value)\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngStyle]=\"styles\"\n  [required]=\"required\"\n  [maxLength]=\"maxLength\"\n  [(ngModel)]=\"text\"\n  [disabled]=\"disabled\"\n  >\n</textarea>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TextAreaComponent)
                    }
                ],
                styles: [".form-control[disabled]{color:grey!important}"]
            }] }
];
/** @nocollapse */
TextAreaComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TextAreaComponent.propDecorators = {
    maxLength: [{ type: Input }],
    editable: [{ type: Input }],
    textarea: [{ type: ViewChild, args: ['textarea',] }],
    onTextChange: [{ type: Output }],
    onEdit: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TextAreaComponent.MAX_LENGTH;
    /** @type {?} */
    TextAreaComponent.prototype._maxLength;
    /** @type {?} */
    TextAreaComponent.prototype.textarea;
    /** @type {?} */
    TextAreaComponent.prototype.onTextChange;
    /** @type {?} */
    TextAreaComponent.prototype.onEdit;
    /** @type {?} */
    TextAreaComponent.prototype._editable;
    /** @type {?} */
    TextAreaComponent.prototype._textBeforeFocusIn;
    /** @type {?} */
    TextAreaComponent.prototype._textPreviousKeyInput;
    /** @type {?} */
    TextAreaComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0wsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQWlCNUQsTUFBTSx3QkFBeUIsU0FBUSxhQUFhOzs7Ozs7Ozs7SUFtQ2xELFlBQW9DLE1BQXFCLEVBQUUsY0FBOEIsRUFBRSxVQUFzQixFQUFVLEVBQXFCLEVBQUUsUUFBbUI7UUFDbkssS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRHFFLE9BQUUsR0FBRixFQUFFLENBQW1COzBCQWpDbkgsaUJBQWlCLENBQUMsVUFBVTs0QkFVaEMsSUFBSSxZQUFZLEVBQUU7c0JBQ3hCLElBQUksWUFBWSxFQUFFO3lCQUVQLElBQUk7S0FzQmpDOzs7OztJQWpDRCxJQUFhLFNBQVMsQ0FBQyxHQUFXO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCOzs7OztJQUNELElBQWEsUUFBUSxDQUFDLEdBQXFCO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0tBQ3RCOzs7O0lBUUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sSUFBSSxJ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QUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QztLQUNGOzsrQkF4TG9DLElBQUk7O1lBYjFDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsb3RCQUF5QztnQkFFekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxpQkFBaUIsQ0FBQztxQkFDL0M7aUJBQ0Y7O2FBQ0Y7Ozs7WUFsQlEsYUFBYSx1QkFzRFAsUUFBUSxZQUFJLFFBQVE7WUFwRDFCLGNBQWM7WUFIb0IsVUFBVTtZQUE2RCxpQkFBaUI7WUFBYyxTQUFTOzs7d0JBd0J2SixLQUFLO3VCQUdMLEtBQUs7dUJBSUwsU0FBUyxTQUFDLFVBQVU7MkJBQ3BCLE1BQU07cUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTa2lwU2VsZiwgT3B0aW9uYWwsIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciB0ZXh0YXJlYSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtdGV4dC1hcmVhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYXJlYS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RleHQtYXJlYS5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlRleHRBcmVhQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzdGF0aWMgcmVhZG9ubHkgTUFYX0xFTkdUSDogbnVtYmVyID0gOTk5OTtcbiAgcHJpdmF0ZSBfbWF4TGVuZ3RoOiBudW1iZXIgPSBUZXh0QXJlYUNvbXBvbmVudC5NQVhfTEVOR1RIO1xuXG4gIEBJbnB1dCgpIHNldCBtYXhMZW5ndGgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXhMZW5ndGggPSBtYXg7XG4gIH1cbiAgQElucHV0KCkgc2V0IGVkaXRhYmxlKHZhbDogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgIHRoaXMuX2VkaXRhYmxlID0gdmFsO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgndGV4dGFyZWEnKSB0ZXh0YXJlYTogRWxlbWVudFJlZjtcbiAgQE91dHB1dCgpIG9uVGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZWRpdGFibGU6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuXG4gIGdldCBlZGl0YWJsZSgpOiBib29sZWFuIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGFibGUgIT09IFwiZmFsc2VcIiAmJiB0aGlzLl9lZGl0YWJsZSAhPT0gZmFsc2U7XG4gIH1cbiAgZ2V0IG1heExlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXhMZW5ndGggPiAwID8gdGhpcy5fbWF4TGVuZ3RoIDogVGV4dEFyZWFDb21wb25lbnQuTUFYX0xFTkdUSDtcbiAgfVxuXG4gIHByaXZhdGUgX3RleHRCZWZvcmVGb2N1c0luOnN0cmluZzsvL2ZvciBvbkVkaXQoKVxuICBwcml2YXRlIF90ZXh0UHJldmlvdXNLZXlJbnB1dDpzdHJpbmc7Ly9mb3Igb25UZXh0Q2hhbmdlKClcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNkIENoYW5nZURldGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIENhbGwgcGFyZW50IG5nT25Jbml0XG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgaWYodGhpcy5jb250cm9sUGFkZGluZyl7XG4gICAgICB0aGlzLmNvbnRyb2xQYWRkaW5nID0gdGhpcy5jb250cm9sUGFkZGluZyArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUuXG4gICAqIEZvY3VzIHRoZSB0ZXh0YXJlYSBhbmQgc2V0IGRpbWVuc2lvbnNcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBpZiAodGhpcy5mb2N1c09uQWN0aXZhdGlvbikge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRXaWR0aEhlaWdodFN0eWxlKFwiaGVpZ2h0XCIsIFwid2lkdGhcIik7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVGcm9tRGVmKCk7XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMgTmFtZSBvZiBjb21wb25lbnRcbiAgICovXG4gIGdldExvY2FsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcInRleHRBcmVhXCI7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIHRleHRhcmVhIGVsZW1lbnRcbiAgICovXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgb2YgaW50ZXJuYWwgW1tfbWF4TGVuZ3RoXV0gcHJvcGVydHlcbiAgICovXG4gIGdldE1heExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4TGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW19tYXhMZW5ndGhdXSBwcm9wZXJ0eSB2YWx1ZSBhbmQgbWFyayBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gbWF4IExlbmd0aCBvZiB0ZXh0IGNvbnRlbnRcbiAgICovXG4gIHNldE1heExlbmd0aChtYXg6IG51bWJlciB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgbWF4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLl9tYXhMZW5ndGggPSBtYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21heExlbmd0aCA9IHBhcnNlSW50KG1heCk7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciB0ZXh0IGlucHV0XG4gICAqIEVtaXQgb25UZXh0Q2hhbmdlIGIvYyB1c2VyIGtlZXAgdHlwaW5nIChpbnB1dCBzdGlsbCBoYXMgZm9jdXMpXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQGV2ZW50IG9uVGV4dENoYW5nZVxuICAgKi9cbiAgb25JbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGxldCBwb3MgPSB0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgaWYoZXZlbnQua2V5Q29kZSA9PSA4IHx8IGV2ZW50LmtleUNvZGUgPT0gNDYpLy9CYWNrc3BhY2UgfHwgRGVsZXRlXG4gICAge1xuICAgICAgdGhpcy50ZXh0ID0gdmFsdWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50ZXh0YXJlYS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gcG9zO1xuICAgICAgICB0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gcG9zO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYodGhpcy50ZXh0ICE9IG51bGwgJiYgdGhpcy5fbWF4TGVuZ3RoID4gMCAmJiB0aGlzLl9tYXhMZW5ndGggPCB0aGlzLnRleHQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dC5zdWJzdHJpbmcoMCwgdGhpcy5fbWF4TGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLl90ZXh0UHJldmlvdXNLZXlJbnB1dCAhPSB0aGlzLnRleHQpXG4gICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KCk7XG4gICAgdGhpcy5fdGV4dFByZXZpb3VzS2V5SW5wdXQgPSB0aGlzLnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBbW2NkXV0gKENoYW5nZURldGVjdG9yKSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBDaGFuZ2UgZGV0ZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBOZXhhd2ViIHRhZyBuYW1lXG4gICAqIEByZXR1cm5zIFRhZyBuYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInRleHRBcmVhXCI7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgZm9jdXMgZXZlbnRcbiAgICogQHBhcmFtIGUgSW5wdXQgZm9jdXMgZXZlbnRcbiAgICovXG4gIG9uRm9jdXMoZSkge1xuICAgIHRoaXMuX3RleHRCZWZvcmVGb2N1c0luID0gdGhpcy50ZXh0O1xuICAgIHRoaXMuX3RleHRQcmV2aW91c0tleUlucHV0ID0gdGhpcy50ZXh0O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGJsdXIgKHVuZm9jdXMpIGV2ZW50XG4gICAqIEBwYXJhbSBlIElucHV0IGJsdXIgZXZlbnRcbiAgICovXG4gIG9uQmx1cihldmVudCwgdmFsdWUpIHtcbiAgICBpZih0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQpIHJldHVybjsvL3ByZXZlbnQgZm9jdXNsb3N0IHdoZW5ldmVyIGFjdGl2ZSBwcm9jZXNzIGlzIGNoYW5nZWQuXG4gICAgdGhpcy50ZXh0ID0gdmFsdWU7Ly93aGVuIHRoZSBsYXN0IGNoYXIgaXMgWmVua2FrdSBhbmQgdGhlIHVzZXIgZG9lc24ndCBwcmVzcyAnRW50ZXInLCB0aGlzIGlzIG5lZWRlZC5cbiAgICBpZih0aGlzLnRleHQgIT0gbnVsbCAmJiB0aGlzLl9tYXhMZW5ndGggPiAwICYmIHRoaXMuX21heExlbmd0aCA8IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dC5zdWJzdHJpbmcoMCwgdGhpcy5fbWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgaWYodGhpcy50ZXh0ICE9IHRoaXMuX3RleHRCZWZvcmVGb2N1c0luKVxuICAgICAgdGhpcy5vbkVkaXQuZW1pdCgpO1xuICAgIHRoaXMudmFsaWRhdGVGaWVsZChldmVudCk7XG4gIH1cbiAgLyoqXG4gICAqIFNldCBbW3Zpc2libGVdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAb3ZlcnJpZGVcbiAgICogQHBhcmFtIHZhbHVlIFRvZ2dsZSB2aXNpYmlsaXR5XG4gICAqL1xuICBzZXRWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy52aXNpYmxlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVDc3NDbGFzcygnaGlkZGVuJyk7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENzc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cbiAgfVxufVxuIl19