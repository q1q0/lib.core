/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, forwardRef, Renderer2, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for textarea component
 */
var TextAreaComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd ChangeDetector for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    function TextAreaComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this._maxLength = TextAreaComponent.MAX_LENGTH;
        _this.onTextChange = new EventEmitter();
        _this.onEdit = new EventEmitter();
        _this._editable = true;
        return _this;
    }
    Object.defineProperty(TextAreaComponent.prototype, "maxLength", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxLength > 0 ? this._maxLength : TextAreaComponent.MAX_LENGTH;
        },
        set: /**
         * @param {?} max
         * @return {?}
         */
        function (max) {
            this._maxLength = max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "editable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editable !== "false" && this._editable !== false;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._editable = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Call parent ngOnInit
     */
    /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    TextAreaComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.controlPadding) {
            this.controlPadding = this.controlPadding + 'px';
        }
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     */
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    TextAreaComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.focusOnActivation) {
            this.elementRef.nativeElement.focus();
        }
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /**
     * Get the name of the component
     * @returns Name of component
     */
    /**
     * Get the name of the component
     * @return {?} Name of component
     */
    TextAreaComponent.prototype.getLocalName = /**
     * Get the name of the component
     * @return {?} Name of component
     */
    function () {
        return "textArea";
    };
    /**
     * Focus the textarea element
     */
    /**
     * Focus the textarea element
     * @return {?}
     */
    TextAreaComponent.prototype.setFocus = /**
     * Focus the textarea element
     * @return {?}
     */
    function () {
        this.textarea.nativeElement.focus();
    };
    /**
     * Get the value of internal [[_maxLength]] property
     */
    /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    TextAreaComponent.prototype.getMaxLength = /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    function () {
        return this._maxLength;
    };
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param max Length of text content
     */
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    TextAreaComponent.prototype.setMaxLength = /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    function (max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * @param event
     * @param value
     * @event onTextChange
     */
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    TextAreaComponent.prototype.onInput = /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        var _this = this;
        /** @type {?} */
        var pos = this.textarea.nativeElement.selectionStart;
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            this.text = value;
            setTimeout(function () {
                _this.textarea.nativeElement.selectionStart = pos;
                _this.textarea.nativeElement.selectionEnd = pos;
            });
        }
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    };
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @returns Change detector for this component
     */
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    TextAreaComponent.prototype.getChangeDetector = /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    function () {
        return this.cd;
    };
    /**
     * Get Nexaweb tag name
     * @returns Tag name
     */
    /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    TextAreaComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    function () {
        return "textArea";
    };
    /* istanbul ignore next */
    /**
     * Event handler for focus event
     * @param e Input focus event
     */
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    TextAreaComponent.prototype.onFocus = /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    function (e) {
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    };
    /* istanbul ignore next */
    /**
     * Event handler for blur (unfocus) event
     * @param e Input blur event
     */
    /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    TextAreaComponent.prototype.onBlur = /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        if (this.textarea.nativeElement.ownerDocument.activeElement === this.textarea.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        this.validateField(event);
    };
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    TextAreaComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    function (value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
    TextAreaComponent.MAX_LENGTH = 9999;
    TextAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-text-area',
                    template: "<textarea #textarea [id]=\"id\" class=\"vt-text-area form-control {{cssClass}}\"\n[attr.disabled]=\"enabled !== false ? null : true\"\n  [attr.readonly]=\"editable !== false ? null : true\"\n  [style.height]=\"controlHeight\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.line-height]=\"lineHeight\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (focusin)=\"onFocus($event)\"\n  (focusout)=\"onBlur($event, textarea.value)\"\n  (keyup)=\"onInput($event, textarea.value)\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngStyle]=\"styles\"\n  [required]=\"required\"\n  [maxLength]=\"maxLength\"\n  [(ngModel)]=\"text\"\n  [disabled]=\"disabled\"\n  >\n</textarea>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TextAreaComponent; })
                        }
                    ],
                    styles: [".form-control[disabled]{color:grey!important}"]
                }] }
    ];
    /** @nocollapse */
    TextAreaComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    TextAreaComponent.propDecorators = {
        maxLength: [{ type: Input }],
        editable: [{ type: Input }],
        textarea: [{ type: ViewChild, args: ['textarea',] }],
        onTextChange: [{ type: Output }],
        onEdit: [{ type: Output }]
    };
    return TextAreaComponent;
}(BaseComponent));
export { TextAreaComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdMLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0lBaUJyQiw2Q0FBYTtJQTJCbEQ7Ozs7Ozs7T0FPRztJQUNILDJCQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQXJLLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQ3BEO1FBRjBILFFBQUUsR0FBRixFQUFFLENBQW1COzJCQWpDbkgsaUJBQWlCLENBQUMsVUFBVTs2QkFVaEMsSUFBSSxZQUFZLEVBQUU7dUJBQ3hCLElBQUksWUFBWSxFQUFFOzBCQUVQLElBQUk7O0tBc0JqQztJQWpDRCxzQkFBYSx3Q0FBUzs7OztRQWdCdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7U0FDN0U7Ozs7O1FBbEJELFVBQXVCLEdBQVc7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7OztPQUFB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QUFLLENBQUMsQ0FBQztLQUMzQjtJQUNEOzs7O09BSUc7Ozs7Ozs7SUFDSCxzQ0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDOUM7S0FDRjttQ0F4TG9DLElBQUk7O2dCQWIxQyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLG90QkFBeUM7b0JBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO3lCQUMvQztxQkFDRjs7aUJBQ0Y7Ozs7Z0JBbEJRLGFBQWEsdUJBc0RQLFFBQVEsWUFBSSxRQUFRO2dCQXBEMUIsY0FBYztnQkFIb0IsVUFBVTtnQkFBNkQsaUJBQWlCO2dCQUFjLFNBQVM7Ozs0QkF3QnZKLEtBQUs7MkJBR0wsS0FBSzsyQkFJTCxTQUFTLFNBQUMsVUFBVTsrQkFDcEIsTUFBTTt5QkFDTixNQUFNOzs0QkFqQ1Q7RUFvQnVDLGFBQWE7U0FBdkMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRleHRhcmVhIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC10ZXh0LWFyZWEnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1hcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1hcmVhLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+VGV4dEFyZWFDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRBcmVhQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHN0YXRpYyByZWFkb25seSBNQVhfTEVOR1RIOiBudW1iZXIgPSA5OTk5O1xuICBwcml2YXRlIF9tYXhMZW5ndGg6IG51bWJlciA9IFRleHRBcmVhQ29tcG9uZW50Lk1BWF9MRU5HVEg7XG5cbiAgQElucHV0KCkgc2V0IG1heExlbmd0aChtYXg6IG51bWJlcikge1xuICAgIHRoaXMuX21heExlbmd0aCA9IG1heDtcbiAgfVxuICBASW5wdXQoKSBzZXQgZWRpdGFibGUodmFsOiBzdHJpbmcgfCBib29sZWFuKSB7XG4gICAgdGhpcy5fZWRpdGFibGUgPSB2YWw7XG4gIH1cblxuICBAVmlld0NoaWxkKCd0ZXh0YXJlYScpIHRleHRhcmVhOiBFbGVtZW50UmVmO1xuICBAT3V0cHV0KCkgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25FZGl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9lZGl0YWJsZTogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XG5cbiAgZ2V0IGVkaXRhYmxlKCk6IGJvb2xlYW4gfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lZGl0YWJsZSAhPT0gXCJmYWxzZVwiICYmIHRoaXMuX2VkaXRhYmxlICE9PSBmYWxzZTtcbiAgfVxuICBnZXQgbWF4TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heExlbmd0aCA+IDAgPyB0aGlzLl9tYXhMZW5ndGggOiBUZXh0QXJlYUNvbXBvbmVudC5NQVhfTEVOR1RIO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGV4dEJlZm9yZUZvY3VzSW46c3RyaW5nOy8vZm9yIG9uRWRpdCgpXG4gIHByaXZhdGUgX3RleHRQcmV2aW91c0tleUlucHV0OnN0cmluZzsvL2ZvciBvblRleHRDaGFuZ2UoKVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY2QgQ2hhbmdlRGV0ZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50XG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCwgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gQ2FsbCBwYXJlbnQgbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZih0aGlzLmNvbnRyb2xQYWRkaW5nKXtcbiAgICAgIHRoaXMuY29udHJvbFBhZGRpbmcgPSB0aGlzLmNvbnRyb2xQYWRkaW5nICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS5cbiAgICogRm9jdXMgdGhlIHRleHRhcmVhIGFuZCBzZXQgZGltZW5zaW9uc1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIGlmICh0aGlzLmZvY3VzT25BY3RpdmF0aW9uKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoXCJoZWlnaHRcIiwgXCJ3aWR0aFwiKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBOYW1lIG9mIGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwidGV4dEFyZWFcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgdGV4dGFyZWEgZWxlbWVudFxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy50ZXh0YXJlYS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBpbnRlcm5hbCBbW19tYXhMZW5ndGhdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0TWF4TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXhMZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbX21heExlbmd0aF1dIHByb3BlcnR5IHZhbHVlIGFuZCBtYXJrIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSBtYXggTGVuZ3RoIG9mIHRleHQgY29udGVudFxuICAgKi9cbiAgc2V0TWF4TGVuZ3RoKG1heDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBtYXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuX21heExlbmd0aCA9IG1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWF4TGVuZ3RoID0gcGFyc2VJbnQobWF4KTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIHRleHQgaW5wdXRcbiAgICogRW1pdCBvblRleHRDaGFuZ2UgYi9jIHVzZXIga2VlcCB0eXBpbmcgKGlucHV0IHN0aWxsIGhhcyBmb2N1cylcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAZXZlbnQgb25UZXh0Q2hhbmdlXG4gICAqL1xuICBvbklucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICBpZihldmVudC5rZXlDb2RlID09IDggfHwgZXZlbnQua2V5Q29kZSA9PSA0NikvL0JhY2tzcGFjZSB8fCBEZWxldGVcbiAgICB7XG4gICAgICB0aGlzLnRleHQgPSB2YWx1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBwb3M7XG4gICAgICAgIHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBwb3M7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLnRleHQgIT0gbnVsbCAmJiB0aGlzLl9tYXhMZW5ndGggPiAwICYmIHRoaXMuX21heExlbmd0aCA8IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0LnN1YnN0cmluZygwLCB0aGlzLl9tYXhMZW5ndGgpO1xuICAgIH1cblxuICAgIGlmKHRoaXMuX3RleHRQcmV2aW91c0tleUlucHV0ICE9IHRoaXMudGV4dClcbiAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoKTtcbiAgICB0aGlzLl90ZXh0UHJldmlvdXNLZXlJbnB1dCA9IHRoaXMudGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3IpIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIENoYW5nZSBkZXRlY3RvciBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0IE5leGF3ZWIgdGFnIG5hbWVcbiAgICogQHJldHVybnMgVGFnIG5hbWVcbiAgICovXG4gIHByb3RlY3RlZCBnZXROeFRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIFwidGV4dEFyZWFcIjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBmb2N1cyBldmVudFxuICAgKiBAcGFyYW0gZSBJbnB1dCBmb2N1cyBldmVudFxuICAgKi9cbiAgb25Gb2N1cyhlKSB7XG4gICAgdGhpcy5fdGV4dEJlZm9yZUZvY3VzSW4gPSB0aGlzLnRleHQ7XG4gICAgdGhpcy5fdGV4dFByZXZpb3VzS2V5SW5wdXQgPSB0aGlzLnRleHQ7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgYmx1ciAodW5mb2N1cykgZXZlbnRcbiAgICogQHBhcmFtIGUgSW5wdXQgYmx1ciBldmVudFxuICAgKi9cbiAgb25CbHVyKGV2ZW50LCB2YWx1ZSkge1xuICAgIGlmKHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudCkgcmV0dXJuOy8vcHJldmVudCBmb2N1c2xvc3Qgd2hlbmV2ZXIgYWN0aXZlIHByb2Nlc3MgaXMgY2hhbmdlZC5cbiAgICB0aGlzLnRleHQgPSB2YWx1ZTsvL3doZW4gdGhlIGxhc3QgY2hhciBpcyBaZW5rYWt1IGFuZCB0aGUgdXNlciBkb2Vzbid0IHByZXNzICdFbnRlcicsIHRoaXMgaXMgbmVlZGVkLlxuICAgIGlmKHRoaXMudGV4dCAhPSBudWxsICYmIHRoaXMuX21heExlbmd0aCA+IDAgJiYgdGhpcy5fbWF4TGVuZ3RoIDwgdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0LnN1YnN0cmluZygwLCB0aGlzLl9tYXhMZW5ndGgpO1xuICAgIH1cbiAgICBpZih0aGlzLnRleHQgIT0gdGhpcy5fdGV4dEJlZm9yZUZvY3VzSW4pXG4gICAgICB0aGlzLm9uRWRpdC5lbWl0KCk7XG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkKGV2ZW50KTtcbiAgfVxuICAvKipcbiAgICogU2V0IFtbdmlzaWJsZV1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcGFyYW0gdmFsdWUgVG9nZ2xlIHZpc2liaWxpdHlcbiAgICovXG4gIHNldFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc2libGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICB0aGlzLnJlbW92ZUNzc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ3NzQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuICB9XG59XG4iXX0=