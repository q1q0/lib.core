/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ElementRef, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, SkipSelf, Optional, ViewChild, forwardRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for text field component
 */
export class TextFieldComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        /**
         * Whether or not text field is editable
         */
        this.editable = true;
        /**
         * HTML input element type attribute. Defaults to 'text'
         */
        this.type = 'text';
        this.onTextChange = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onMouseUp = new EventEmitter();
        this._maxLength = TextFieldComponent.MAX_LENGTH;
        this.styleVar = {};
    }
    /**
     * Max input allowed for characters
     * @param {?} max
     * @return {?}
     */
    set maxLength(max) {
        this._maxLength = max;
    }
    /**
     * @return {?}
     */
    get maxLength() {
        return this._maxLength > 0 ? this._maxLength : TextFieldComponent.MAX_LENGTH;
    }
    /**
     * Init lifecycle. Set dimensions and style properties
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.disabled && this.fontColorDisabled) {
            this.styleVar["color"] = this.fontColorDisabled;
        }
        else {
            this.styleVar["color"] = this.fontColor || 'inherit';
        }
        // this.styleVar["margin-left"] = "1px";
        this.styleVar["margin-right"] = "5px";
        // this.styles["margin-left"] = "1px";
        this.styles["margin-right"] = "5px";
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.controlHeight) {
            this.controlHeight = this.controlHeight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
        if (this.marginTop) {
            this.marginTop = this.marginTop + 'px';
        }
    }
    /**
     * After view init lifecycle. Set dimensions, focus text field
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle();
        this.setAttributeFromDef();
        this.cd.detectChanges();
        if (this.focusOnActivation) {
            this.input.nativeElement.focus();
        }
        if (this.type === 'date') {
            // Remove native datepicker controls applied by Chrome
            this.renderer.setProperty(this.input.nativeElement, 'type', 'text');
        }
    }
    /**
     * Event handler for blur (unfocus) event
     * @param {?} e Input blur event
     * @param {?} value
     * @return {?}
     */
    onBlur(e, value) {
        if (!document.hasFocus() && $(":focus").length > 0) {
            return;
        }
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        // Checks for numeric date entry without slashes: e.g 20190104
        // If the user enters numbers without slashes auto format as date
        if (this.type === 'date' && /^\d{8}$/m.test(this.text)) {
            /** @type {?} */
            let formattedDateString = [this.text.substr(0, 4), this.text.substr(4, 2), this.text.substr(6, 2)].join('/');
            this.text = formattedDateString;
        }
        this.validateField(e);
    }
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    onFocus(e) {
        this.input.nativeElement.selectionStart = this.text.length;
        this.input.nativeElement.selectionEnd = this.text.length;
        if (!this.customAttributes)
            return;
        /** @type {?} */
        let formatName = this.customAttributes['format'];
        if (formatName && formatName.indexOf("add_comma") >= 0) {
            /** @type {?} */
            let txtMount = this.text.replace(/,/g, "");
            this.text = txtMount;
        }
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
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
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            /** @type {?} */
            let pos = this.input.nativeElement.selectionStart;
            this.text = value;
            setTimeout(() => {
                this.input.nativeElement.selectionStart = pos;
                this.input.nativeElement.selectionEnd = pos;
            });
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Focus the input element
     * @return {?}
     */
    setFocus() {
        this.input.nativeElement.focus();
    }
    /**
     * Set background color CSS for the text input
     * @param {?} bgColor CSS color string value for background
     * @return {?}
     */
    setBgColor(bgColor) {
        this.input.nativeElement.style.backgroundColor = bgColor;
    }
    /**
     * Get [[_maxLength]] property value
     * @return {?}
     */
    getMaxLength() {
        return this._maxLength;
    }
    /**
     * Set [[_maxLength]] property value
     * @param {?} max Maximum length of character input
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
     * Get JSON representation for this text-field
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "editable", this.editable);
        if (this.value != null) {
            this.setJson(json, "value", this.value);
        }
        return json;
    }
    /**
     * Get component name
     * @return {?}
     */
    getLocalName() {
        return "textField";
    }
    /**
     * Get the text content value of the input element
     * @return {?}
     */
    getValue() {
        return this.getText();
    }
    /**
     * Event handler for mouseup
     * \@event OnMouseUp
     * @return {?}
     */
    handleMouseUp() {
        this.onMouseUp.emit();
    }
    /**
     * @return {?} String Tag name
     */
    getNxTagName() {
        return "textField";
    }
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Change detector
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * @return {?}
     */
    _notifyInternalChangeCb() {
        super._notifyInternalChangeCb();
    }
    /**
     * Select all text
     * @return {?}
     */
    selectText() {
        this.input.nativeElement.select();
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
TextFieldComponent.MAX_LENGTH = 9999;
TextFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-text-field',
                template: "<div\n  class=\"{{cssClass}}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngClass]=\"{'vt-text-field': true, 'hidden': visible != true}\">\n\n  <input [type]=\"type\" [id]=\"id\" #input\n    [ngClass]=\"{'input-date': type === 'date'}\"\n    class=\"form-control\"\n    [readonly]=\"editable !== true && editable !== 'true'\"\n    [attr.tabindex]=\"editable !== true && editable !== 'true' ? -1 : null\"\n    [disabled]=\"disabled\"\n    [(ngModel)]=\"text\"\n    [ngStyle]=\"styleVar\"\n    [maxLength]=\"maxLength\"\n    [style.width]=\"controlWidth\"\n    [style.height]=\"controlHeight\"\n    [style.textAlign]=\"alignHorizontal\"\n    [style.border-color]=\"borderColor\"\n    [style.margin-top]=\"marginTop\"\n    [style.margin-left]=\"marginLeft\"\n    [style.padding]=\"controlPadding\"\n    (focusout)=\"onBlur($event, input.value)\"\n    (focusin)=\"onFocus($event)\"\n    (change)=\"_notifyInternalChangeCb()\"\n    (mouseup)=\"handleMouseUp()\"\n    (keyup)=\"onInput($event, input.value)\"\n    [required]=\"required\"\n    [min]=\"min\"\n    [max]=\"max\"/>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TextFieldComponent)
                    }
                ],
                styles: [".vt-text-field{display:inline-block}.vt-text-field input.form-control{width:100%}.vt-text-field>input{margin-bottom:3px}"]
            }] }
];
/** @nocollapse */
TextFieldComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TextFieldComponent.propDecorators = {
    value: [{ type: Input }],
    editable: [{ type: Input }],
    maxLength: [{ type: Input }],
    type: [{ type: Input }],
    onTextChange: [{ type: Output }],
    onEdit: [{ type: Output }],
    onMouseUp: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input',] }]
};
if (false) {
    /** @type {?} */
    TextFieldComponent.MAX_LENGTH;
    /**
     * Input element's value
     * @type {?}
     */
    TextFieldComponent.prototype.value;
    /**
     * Whether or not text field is editable
     * @type {?}
     */
    TextFieldComponent.prototype.editable;
    /**
     * HTML input element type attribute. Defaults to 'text'
     * @type {?}
     */
    TextFieldComponent.prototype.type;
    /** @type {?} */
    TextFieldComponent.prototype.onTextChange;
    /** @type {?} */
    TextFieldComponent.prototype.onEdit;
    /** @type {?} */
    TextFieldComponent.prototype.onMouseUp;
    /** @type {?} */
    TextFieldComponent.prototype._maxLength;
    /** @type {?} */
    TextFieldComponent.prototype._textBeforeFocusIn;
    /** @type {?} */
    TextFieldComponent.prototype._textPreviousKeyInput;
    /** @type {?} */
    TextFieldComponent.prototype.input;
    /** @type {?} */
    TextFieldComponent.prototype.styleVar;
    /** @type {?} */
    TextFieldComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RleHQtZmllbGQvdGV4dC1maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFrQix1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVNLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFvQjVELE1BQU0seUJBQTBCLFNBQVEsYUFBYTs7Ozs7Ozs7O0lBZ0RuRCxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQ25LLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURxRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjs7Ozt3QkFyQzFHLElBQUk7Ozs7b0JBWWxCLE1BQU07NEJBRUwsSUFBSSxZQUFZLEVBQUU7c0JBQ3hCLElBQUksWUFBWSxFQUFFO3lCQUNmLElBQUksWUFBWSxFQUFFOzBCQU1YLGtCQUFrQixDQUFDLFVBQVU7d0JBS3RCLEVBQUU7S0FhckM7Ozs7OztJQW5DRCxJQUFhLFNBQVMsQ0FBQyxHQUFXO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCOzs7O0lBV0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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QkFDaEQ7aUJBQ0Y7O2FBQ0Y7Ozs7WUFwQlEsYUFBYSx1QkFxRVAsUUFBUSxZQUFJLFFBQVE7WUFwRTFCLGNBQWM7WUFGb0IsVUFBVTtZQUFnQixpQkFBaUI7WUFBc0YsU0FBUzs7O29CQTRCbEwsS0FBSzt1QkFLTCxLQUFLO3dCQUtMLEtBQUs7bUJBT0wsS0FBSzsyQkFFTCxNQUFNO3FCQUNOLE1BQU07d0JBQ04sTUFBTTtvQkFTTixTQUFTLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmLCBBZnRlclZpZXdJbml0ICwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gJy4uL2Jhc2UvYXR0cmlidXRlcy5lbnVtJ1xuXG5kZWNsYXJlIHZhciAkIDogYW55O1xuXG4vKipcbiAqIENsYXNzIGZvciB0ZXh0IGZpZWxkIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC10ZXh0LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90ZXh0LWZpZWxkLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+VGV4dEZpZWxkQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgc3RhdGljIHJlYWRvbmx5IE1BWF9MRU5HVEg6IG51bWJlciA9IDk5OTk7IC8vc2hvdWxkIGJlIDUyMy4uLmJ1dCA5OTk5IHNob3VsZCBiZSBnb29kIGVub3VnaFxuXG4gIC8qKlxuICAgKiBJbnB1dCBlbGVtZW50J3MgdmFsdWVcbiAgICovXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRleHQgZmllbGQgaXMgZWRpdGFibGVcbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgICogTWF4IGlucHV0IGFsbG93ZWQgZm9yIGNoYXJhY3RlcnNcbiAgICovXG4gIEBJbnB1dCgpIHNldCBtYXhMZW5ndGgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXhMZW5ndGggPSBtYXg7XG4gIH1cblxuICAvKipcbiAgICogSFRNTCBpbnB1dCBlbGVtZW50IHR5cGUgYXR0cmlidXRlLiBEZWZhdWx0cyB0byAndGV4dCdcbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICd0ZXh0JztcblxuICBAT3V0cHV0KCkgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25FZGl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Nb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCBtYXhMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4TGVuZ3RoID4gMCA/IHRoaXMuX21heExlbmd0aCA6IFRleHRGaWVsZENvbXBvbmVudC5NQVhfTEVOR1RIO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF4TGVuZ3RoOiBudW1iZXIgPSBUZXh0RmllbGRDb21wb25lbnQuTUFYX0xFTkdUSDtcbiAgcHJpdmF0ZSBfdGV4dEJlZm9yZUZvY3VzSW46c3RyaW5nOy8vZm9yIG9uRWRpdCgpXG4gIHByaXZhdGUgX3RleHRQcmV2aW91c0tleUlucHV0OnN0cmluZzsvL2ZvciBvblRleHRDaGFuZ2UoKVxuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIHN0eWxlVmFyOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY2QgQ2hhbmdlIGRldGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gU2V0IGRpbWVuc2lvbnMgYW5kIHN0eWxlIHByb3BlcnRpZXNcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgJiYgdGhpcy5mb250Q29sb3JEaXNhYmxlZCkge1xuICAgICAgdGhpcy5zdHlsZVZhcltcImNvbG9yXCJdID0gdGhpcy5mb250Q29sb3JEaXNhYmxlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHlsZVZhcltcImNvbG9yXCJdID0gdGhpcy5mb250Q29sb3IgfHwgJ2luaGVyaXQnO1xuICAgIH1cbiAgICAvLyB0aGlzLnN0eWxlVmFyW1wibWFyZ2luLWxlZnRcIl0gPSBcIjFweFwiO1xuICAgIHRoaXMuc3R5bGVWYXJbXCJtYXJnaW4tcmlnaHRcIl0gPSBcIjVweFwiO1xuXG4gICAgLy8gdGhpcy5zdHlsZXNbXCJtYXJnaW4tbGVmdFwiXSA9IFwiMXB4XCI7XG4gICAgdGhpcy5zdHlsZXNbXCJtYXJnaW4tcmlnaHRcIl0gPSBcIjVweFwiO1xuXG4gICAgaWYodGhpcy5jb250cm9sV2lkdGgpe1xuICAgICAgdGhpcy5jb250cm9sV2lkdGggPSB0aGlzLmNvbnRyb2xXaWR0aCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5jb250cm9sSGVpZ2h0KXtcbiAgICAgIHRoaXMuY29udHJvbEhlaWdodCA9IHRoaXMuY29udHJvbEhlaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5tYXJnaW5MZWZ0KXtcbiAgICAgIHRoaXMubWFyZ2luTGVmdCA9IHRoaXMubWFyZ2luTGVmdCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5tYXJnaW5Ub3Ape1xuICAgICAgdGhpcy5tYXJnaW5Ub3AgPSB0aGlzLm1hcmdpblRvcCArICdweCc7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gU2V0IGRpbWVuc2lvbnMsIGZvY3VzIHRleHQgZmllbGRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlRnJvbURlZigpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgaWYgKHRoaXMuZm9jdXNPbkFjdGl2YXRpb24pIHtcbiAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgLy8gUmVtb3ZlIG5hdGl2ZSBkYXRlcGlja2VyIGNvbnRyb2xzIGFwcGxpZWQgYnkgQ2hyb21lXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCwgJ3R5cGUnLCAndGV4dCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBibHVyICh1bmZvY3VzKSBldmVudFxuICAgKiBAcGFyYW0gZSBJbnB1dCBibHVyIGV2ZW50XG4gICAqL1xuICBvbkJsdXIoZSwgdmFsdWUpIHtcbiAgICBpZighZG9jdW1lbnQuaGFzRm9jdXMoKSAmJiAkKFwiOmZvY3VzXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSB2YWx1ZTsvL3doZW4gdGhlIGxhc3QgY2hhciBpcyBaZW5rYWt1IGFuZCB0aGUgdXNlciBkb2Vzbid0IHByZXNzICdFbnRlcicsIHRoaXMgaXMgbmVlZGVkLlxuICAgIGlmKHRoaXMudGV4dCAhPSB0aGlzLl90ZXh0QmVmb3JlRm9jdXNJbilcbiAgICAgIHRoaXMub25FZGl0LmVtaXQoKTtcbiAgICAvLyBDaGVja3MgZm9yIG51bWVyaWMgZGF0ZSBlbnRyeSB3aXRob3V0IHNsYXNoZXM6IGUuZyAyMDE5MDEwNFxuXG4gICAgLy8gSWYgdGhlIHVzZXIgZW50ZXJzIG51bWJlcnMgd2l0aG91dCBzbGFzaGVzIGF1dG8gZm9ybWF0IGFzIGRhdGVcbiAgICBpZiAodGhpcy50eXBlPT09J2RhdGUnICYmIC9eXFxkezh9JC9tLnRlc3QodGhpcy50ZXh0KSkge1xuICAgICAgbGV0IGZvcm1hdHRlZERhdGVTdHJpbmcgPSBbdGhpcy50ZXh0LnN1YnN0cigwLDQpLCB0aGlzLnRleHQuc3Vic3RyKDQsMiksIHRoaXMudGV4dC5zdWJzdHIoNiwyKV0uam9pbignLycpO1xuICAgICAgdGhpcy50ZXh0ID0gZm9ybWF0dGVkRGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlRmllbGQoZSk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgZm9jdXMgZXZlbnRcbiAgICogQHBhcmFtIGUgSW5wdXQgZm9jdXMgZXZlbnRcbiAgICovXG4gIG9uRm9jdXMoZSkge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHRoaXMudGV4dC5sZW5ndGg7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMudGV4dC5sZW5ndGg7XG5cbiAgICBpZighdGhpcy5jdXN0b21BdHRyaWJ1dGVzKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCBmb3JtYXROYW1lOnN0cmluZz0gdGhpcy5jdXN0b21BdHRyaWJ1dGVzWydmb3JtYXQnXTtcbiAgICBpZiAoZm9ybWF0TmFtZSAmJiBmb3JtYXROYW1lLmluZGV4T2YoXCJhZGRfY29tbWFcIikgPj0gMCkge1xuICAgICAgbGV0IHR4dE1vdW50ID0gdGhpcy50ZXh0LnJlcGxhY2UoLywvZyxcIlwiKVxuICAgICAgdGhpcy50ZXh0ID0gdHh0TW91bnQ7XG4gICAgfVxuICAgIHRoaXMuX3RleHRCZWZvcmVGb2N1c0luID0gdGhpcy50ZXh0O1xuICAgIHRoaXMuX3RleHRQcmV2aW91c0tleUlucHV0ID0gdGhpcy50ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIHRleHQgaW5wdXRcbiAgICogRW1pdCBvblRleHRDaGFuZ2UgYi9jIHVzZXIga2VlcCB0eXBpbmcgKGlucHV0IHN0aWxsIGhhcyBmb2N1cylcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAZXZlbnQgb25UZXh0Q2hhbmdlXG4gICAqL1xuICBvbklucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYoZXZlbnQua2V5Q29kZSA9PSA4IHx8IGV2ZW50LmtleUNvZGUgPT0gNDYpLy9CYWNrc3BhY2UgfHwgRGVsZXRlXG4gICAge1xuICAgICAgbGV0IHBvcyA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgIHRoaXMudGV4dCA9IHZhbHVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHBvcztcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZCA9IHBvcztcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLl90ZXh0UHJldmlvdXNLZXlJbnB1dCAhPSB0aGlzLnRleHQpXG4gICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KCk7XG4gICAgdGhpcy5fdGV4dFByZXZpb3VzS2V5SW5wdXQgPSB0aGlzLnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIGlucHV0IGVsZW1lbnRcbiAgICovXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHNldEZvY3VzKCl7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGJhY2tncm91bmQgY29sb3IgQ1NTIGZvciB0aGUgdGV4dCBpbnB1dFxuICAgKiBAcGFyYW0gYmdDb2xvciBDU1MgY29sb3Igc3RyaW5nIHZhbHVlIGZvciBiYWNrZ3JvdW5kXG4gICAqL1xuICBzZXRCZ0NvbG9yKGJnQ29sb3I6IHN0cmluZylcbiAge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW19tYXhMZW5ndGhdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKi9cbiAgZ2V0TWF4TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXhMZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbX21heExlbmd0aF1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBtYXggTWF4aW11bSBsZW5ndGggb2YgY2hhcmFjdGVyIGlucHV0XG4gICAqL1xuICBzZXRNYXhMZW5ndGgobWF4OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIG1heCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy5fbWF4TGVuZ3RoID0gbWF4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXhMZW5ndGggPSBwYXJzZUludChtYXgpO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEpTT04gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgdGV4dC1maWVsZFxuICAgKi9cbiAgdG9Kc29uKCk6IHt9IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICB0aGlzLnNldEpzb24oanNvbiwgXCJlZGl0YWJsZVwiLCB0aGlzLmVkaXRhYmxlKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0SnNvbihqc29uLCBcInZhbHVlXCIsIHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb21wb25lbnQgbmFtZVxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwidGV4dEZpZWxkXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0ZXh0IGNvbnRlbnQgdmFsdWUgb2YgdGhlIGlucHV0IGVsZW1lbnRcbiAgICovXG4gIGdldFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNldXBcbiAgICogQGV2ZW50IE9uTW91c2VVcFxuICAgKi9cbiAgaGFuZGxlTW91c2VVcCgpIHtcbiAgICB0aGlzLm9uTW91c2VVcC5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgU3RyaW5nIFRhZyBuYW1lXG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInRleHRGaWVsZFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1tjZF1dIChDaGFuZ2VEZXRlY3RvcikgcHJvcGVydHlcbiAgICogQHJldHVybnMgQ2hhbmdlIGRldGVjdG9yXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLy9hbmd1bGFyIGRvZXNuJ3QgbGlrZSBhY2Nlc3NpbmcgcHJpdmF0ZS9wdWJsaWMgbWV0aG9kXG4gIF9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCkge1xuICAgIHN1cGVyLl9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0ZXh0XG4gICAqL1xuICBzZWxlY3RUZXh0KCl7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xuICB9XG4gIC8qKlxuICAgKiBTZXQgW1t2aXNpYmxlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQG92ZXJyaWRlXG4gICAqIEBwYXJhbSB2YWx1ZSBUb2dnbGUgdmlzaWJpbGl0eVxuICAgKi9cbiAgc2V0VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudmlzaWJsZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDc3NDbGFzcygnaGlkZGVuJyk7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==