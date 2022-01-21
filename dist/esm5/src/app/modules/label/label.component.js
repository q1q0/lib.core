/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for label component. Renders text
 */
var LabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LabelComponent, _super);
    /**
     *
     * @param parent See [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd Change detector ref
     * @param renderer see [[BaseComponent]]
     */
    function LabelComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this._tooltip = '';
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(LabelComponent.prototype, "tooltip", {
        /**
         * Accessor method for internal [[_tootip]] property
         */
        get: /**
         * Accessor method for internal [[_tootip]] property
         * @return {?}
         */
        function () {
            return this._tooltip;
        },
        set: /**
         * @param {?} tooltip
         * @return {?}
         */
        function (tooltip) {
            if (tooltip == null || tooltip === "undefined") {
                this._tooltip = "";
            }
            else {
                this._tooltip = tooltip;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle method. Runs when component is created
     */
    /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    LabelComponent.prototype.ngOnInit = /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.marginRight) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    };
    /**
     * After view init lifecycle method. Runs after component view is created
     */
    /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    LabelComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        this.setAttributeFromDef();
        //fix expression has changed blah blah blah
        this.cd.detectChanges();
    };
    /**
     * Get JSON representation of component
     */
    /**
     * Get JSON representation of component
     * @return {?}
     */
    LabelComponent.prototype.toJson = /**
     * Get JSON representation of component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "alignHorizontal", this.alignHorizontal);
        return json;
    };
    /**
     * Set value of [[tooltip]] property
     * @param tooltip
     */
    /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    LabelComponent.prototype.setTooltip = /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        this.tooltip = tooltip;
        this.cd.markForCheck();
    };
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param e Mouse click event
     */
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    LabelComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    function (e) {
        this.handleMouseDown(e);
    };
    /**
     * Event handler for click event.
     * @event OnCommand
     */
    /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    LabelComponent.prototype.handleOnClick = /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    function () {
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    };
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @returns The component's change detector
     */
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    LabelComponent.prototype.getChangeDetector = /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    function () {
        return this.cd;
    };
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    LabelComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    function () {
        return "label";
    };
    Object.defineProperty(LabelComponent.prototype, "spaceText", {
        /**
         * Check if the text is all space characters
         * @returns If text is just space characters TRUE, otherwise FALSE
         */
        get: /**
         * Check if the text is all space characters
         * @return {?} If text is just space characters TRUE, otherwise FALSE
         */
        function () {
            return this.text && this.text.length > 0 && this.text.trim().length === 0;
        },
        enumerable: true,
        configurable: true
    });
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
    LabelComponent.prototype.setVisible = /**
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
    LabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-label,vt-cell',
                    template: "<span\n  [id]=\"id\"\n  [title]=\"tooltip\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  class=\"vt-label {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\"\n  [style.textAlign]=\"alignHorizontal\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.border-style]=\"borderStyle\"\n  [style.margin-left]=\"marginLeft\"\n  [style.margin-right]=\"marginRight\"\n  [style.color]=\"fontColor\"\n  [ngStyle]=\"styles\"\n  (click)=\"handleOnClick()\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  (mousedown)=\"onMouseDown($event)\">\n  <ng-template [ngIf]=\"spaceText === false\">{{ text }}</ng-template>\n  <ng-template [ngIf]=\"spaceText === true\">&nbsp;</ng-template>\n  <!-- has children?-->\n  <ng-content></ng-content>\n</span>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: LabelComponent
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    LabelComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    LabelComponent.propDecorators = {
        alignHorizontal: [{ type: Input }],
        tooltip: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return LabelComponent;
}(BaseComponent));
export { LabelComponent };
if (false) {
    /** @type {?} */
    LabelComponent.prototype.alignHorizontal;
    /** @type {?} */
    LabelComponent.prototype._tooltip;
    /** @type {?} */
    LabelComponent.prototype.onCommand;
    /** @type {?} */
    LabelComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYWJlbC9sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztJQWtCeEIsMENBQWE7SUFxQi9DOzs7Ozs7O09BT0c7SUFDSCx3QkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQjtRQUFySyxZQUNBLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNuRDtRQUYySCxRQUFFLEdBQUYsRUFBRSxDQUFtQjt5QkFackgsRUFBRTswQkFFUCxJQUFJLFlBQVksRUFBRTs7S0FZeEM7SUE3QkEsc0JBQWEsbUNBQU87UUFRcEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBYkQsVUFBcUIsT0FBZTtZQUNsQyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLFdBQVcsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDekI7U0FDRjs7O09BQUE7SUF5QkQ7O09BRUc7Ozs7O0lBQ0gsaUNBQVE7Ozs7SUFBUjtR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O29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLG14QkFBcUM7b0JBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxjQUFjO3lCQUM1QjtxQkFDRjs7aUJBQ0Y7Ozs7Z0JBbEJRLGFBQWEsdUJBZ0RQLFFBQVEsWUFBSSxRQUFRO2dCQS9DMUIsY0FBYztnQkFGWSxVQUFVO2dCQUErQyxpQkFBaUI7Z0JBQXdCLFNBQVM7OztrQ0FxQjNJLEtBQUs7MEJBQ0wsS0FBSzs0QkFpQkwsTUFBTTs7eUJBdkNUO0VBb0JvQyxhQUFhO1NBQXBDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTa2lwU2VsZiwgT3B0aW9uYWwsIENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEFsaWduSG9yaXpvbnRhbCB9IGZyb20gJy4uL2Jhc2Uvc3R5bGUtbGl0ZXJhbHMnO1xuXG4vKipcbiAqIENsYXNzIGZvciBsYWJlbCBjb21wb25lbnQuIFJlbmRlcnMgdGV4dFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1sYWJlbCx2dC1jZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xhYmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGFiZWwuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBMYWJlbENvbXBvbmVudFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBhbGlnbkhvcml6b250YWw6IEFsaWduSG9yaXpvbnRhbDtcbiAgQElucHV0KCkgc2V0IHRvb2x0aXAodG9vbHRpcDogc3RyaW5nKSB7XG4gICAgaWYgKHRvb2x0aXAgPT0gbnVsbCB8fCB0b29sdGlwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLl90b29sdGlwID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG9vbHRpcCA9IHRvb2x0aXA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIG1ldGhvZCBmb3IgaW50ZXJuYWwgW1tfdG9vdGlwXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCB0b29sdGlwKCkge1xuICAgIHJldHVybiB0aGlzLl90b29sdGlwO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG9vbHRpcDogc3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgpIG9uQ29tbWFuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBTZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIGNkIENoYW5nZSBkZXRlY3RvciByZWZcbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cdFx0c3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXHR9XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlIG1ldGhvZC4gUnVucyB3aGVuIGNvbXBvbmVudCBpcyBjcmVhdGVkXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgaWYodGhpcy5jb250cm9sV2lkdGgpIHtcbiAgICAgIHRoaXMuY29udHJvbFdpZHRoID0gdGhpcy5jb250cm9sV2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIGlmKHRoaXMubWFyZ2luUmlnaHQpIHtcbiAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSB0aGlzLm1hcmdpblJpZ2h0ICsgJ3B4JztcbiAgICB9XG5cbiAgICBpZih0aGlzLm1hcmdpbkxlZnQpIHtcbiAgICAgIHRoaXMubWFyZ2luTGVmdCA9IHRoaXMubWFyZ2luTGVmdCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUgbWV0aG9kLiBSdW5zIGFmdGVyIGNvbXBvbmVudCB2aWV3IGlzIGNyZWF0ZWRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIGlmICh0aGlzLmNvbnRyb2xIZWlnaHQgIT0gbnVsbCAmJiB0aGlzLmNvbnRyb2xIZWlnaHQgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiaGVpZ2h0XCJdID0gdGhpcy5jb250cm9sSGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlRnJvbURlZigpO1xuXG4gICAgLy9maXggZXhwcmVzc2lvbiBoYXMgY2hhbmdlZCBibGFoIGJsYWggYmxhaFxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGNvbXBvbmVudFxuICAgKi9cbiAgdG9Kc29uKCk6IHt9IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICB0aGlzLnNldEpzb24oanNvbiwgXCJhbGlnbkhvcml6b250YWxcIiwgdGhpcy5hbGlnbkhvcml6b250YWwpO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlIG9mIFtbdG9vbHRpcF1dIHByb3BlcnR5XG4gICAqIEBwYXJhbSB0b29sdGlwXG4gICAqL1xuICBzZXRUb29sdGlwKHRvb2x0aXA6IHN0cmluZykge1xuICAgIHRoaXMudG9vbHRpcCA9IHRvb2x0aXA7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd24gZXZlbnQuIENhbGwgcGFyZW50IGNsYXNzIFtbaGFuZGxlTW91c2VEb3duXV1cbiAgICogQHBhcmFtIGUgTW91c2UgY2xpY2sgZXZlbnRcbiAgICovXG4gIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihlKVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LlxuICAgKiBAZXZlbnQgT25Db21tYW5kXG4gICAqL1xuICBoYW5kbGVPbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmVtaXRJbnRlcm5hbE9uQ29tbWFuZCgpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5vbkNvbW1hbmQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgW1tjZF1dIChDaGFuZ2VEZXRlY3RvclJlZikgcHJvcGVydHlcbiAgICogQHJldHVybnMgVGhlIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvclxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENoYW5nZURldGVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBOZXhhV2ViIHRhZyBuYW1lXG4gICAqIEByZXR1cm5zIE5hbWUgb2YgdGFnXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcImxhYmVsXCI7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHRleHQgaXMgYWxsIHNwYWNlIGNoYXJhY3RlcnNcbiAgICogQHJldHVybnMgSWYgdGV4dCBpcyBqdXN0IHNwYWNlIGNoYXJhY3RlcnMgVFJVRSwgb3RoZXJ3aXNlIEZBTFNFXG4gICAqL1xuICBnZXQgc3BhY2VUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnRleHQgJiYgdGhpcy50ZXh0Lmxlbmd0aCA+IDAgJiYgdGhpcy50ZXh0LnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbdmlzaWJsZV1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcGFyYW0gdmFsdWUgVG9nZ2xlIHZpc2liaWxpdHlcbiAgICovXG4gIHNldFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc2libGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICB0aGlzLnJlbW92ZUNzc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ3NzQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuICB9XG59XG4iXX0=