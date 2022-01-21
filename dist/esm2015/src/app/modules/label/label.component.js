/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for label component. Renders text
 */
export class LabelComponent extends BaseComponent {
    /**
     *
     * @param {?} parent See [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} cd Change detector ref
     * @param {?} renderer see [[BaseComponent]]
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this._tooltip = '';
        this.onCommand = new EventEmitter();
    }
    /**
     * @param {?} tooltip
     * @return {?}
     */
    set tooltip(tooltip) {
        if (tooltip == null || tooltip === "undefined") {
            this._tooltip = "";
        }
        else {
            this._tooltip = tooltip;
        }
    }
    /**
     * Accessor method for internal [[_tootip]] property
     * @return {?}
     */
    get tooltip() {
        return this._tooltip;
    }
    /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.marginRight) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        this.setAttributeFromDef();
        //fix expression has changed blah blah blah
        this.cd.detectChanges();
    }
    /**
     * Get JSON representation of component
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "alignHorizontal", this.alignHorizontal);
        return json;
    }
    /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    setTooltip(tooltip) {
        this.tooltip = tooltip;
        this.cd.markForCheck();
    }
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    onMouseDown(e) {
        this.handleMouseDown(e);
    }
    /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    handleOnClick() {
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    }
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    getNxTagName() {
        return "label";
    }
    /**
     * Check if the text is all space characters
     * @return {?} If text is just space characters TRUE, otherwise FALSE
     */
    get spaceText() {
        return this.text && this.text.length > 0 && this.text.trim().length === 0;
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
LabelComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
LabelComponent.propDecorators = {
    alignHorizontal: [{ type: Input }],
    tooltip: [{ type: Input }],
    onCommand: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYWJlbC9sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RLLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFrQjVELE1BQU0scUJBQXNCLFNBQVEsYUFBYTs7Ozs7Ozs7O0lBNkIvQyxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBVSxFQUFxQixFQUFFLFFBQW1CO1FBQ3JLLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUR1RSxPQUFFLEdBQUYsRUFBRSxDQUFtQjt3QkFackgsRUFBRTt5QkFFUCxJQUFJLFlBQVksRUFBRTtLQVl4Qzs7Ozs7SUE3QkEsSUFBYSxPQUFPLENBQUMsT0FBZTtRQUNsQyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLFdBQVcsRUFBRTtZQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDekI7S0FDRjs7Ozs7SUFLRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0lBcUJELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFB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QkFBaUI7WUFBd0IsU0FBUzs7OzhCQXFCM0ksS0FBSztzQkFDTCxLQUFLO3dCQWlCTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2tpcFNlbGYsIE9wdGlvbmFsLCBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBBbGlnbkhvcml6b250YWwgfSBmcm9tICcuLi9iYXNlL3N0eWxlLWxpdGVyYWxzJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgbGFiZWwgY29tcG9uZW50LiBSZW5kZXJzIHRleHRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtbGFiZWwsdnQtY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sYWJlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xhYmVsLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogTGFiZWxDb21wb25lbnRcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWxpZ25Ib3Jpem9udGFsOiBBbGlnbkhvcml6b250YWw7XG4gIEBJbnB1dCgpIHNldCB0b29sdGlwKHRvb2x0aXA6IHN0cmluZykge1xuICAgIGlmICh0b29sdGlwID09IG51bGwgfHwgdG9vbHRpcCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5fdG9vbHRpcCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY2Nlc3NvciBtZXRob2QgZm9yIGludGVybmFsIFtbX3Rvb3RpcF1dIHByb3BlcnR5XG4gICAqL1xuICBnZXQgdG9vbHRpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcbiAgfVxuXG4gIHByaXZhdGUgX3Rvb2x0aXA6IHN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgU2VlIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqIEBwYXJhbSBjZCBDaGFuZ2UgZGV0ZWN0b3IgcmVmXG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCwgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuXHRcdHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcblx0fVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZSBtZXRob2QuIFJ1bnMgd2hlbiBjb21wb25lbnQgaXMgY3JlYXRlZFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIGlmKHRoaXMuY29udHJvbFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbnRyb2xXaWR0aCA9IHRoaXMuY29udHJvbFdpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICBpZih0aGlzLm1hcmdpblJpZ2h0KSB7XG4gICAgICB0aGlzLm1hcmdpblJpZ2h0ID0gdGhpcy5tYXJnaW5SaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgaWYodGhpcy5tYXJnaW5MZWZ0KSB7XG4gICAgICB0aGlzLm1hcmdpbkxlZnQgPSB0aGlzLm1hcmdpbkxlZnQgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlIG1ldGhvZC4gUnVucyBhZnRlciBjb21wb25lbnQgdmlldyBpcyBjcmVhdGVkXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICBpZiAodGhpcy5jb250cm9sSGVpZ2h0ICE9IG51bGwgJiYgdGhpcy5jb250cm9sSGVpZ2h0ICE9PSBcIlwiKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcImhlaWdodFwiXSA9IHRoaXMuY29udHJvbEhlaWdodCArIFwicHhcIjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZUZyb21EZWYoKTtcblxuICAgIC8vZml4IGV4cHJlc3Npb24gaGFzIGNoYW5nZWQgYmxhaCBibGFoIGJsYWhcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBjb21wb25lbnRcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbjogYW55ID0gc3VwZXIudG9Kc29uKCk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwiYWxpZ25Ib3Jpem9udGFsXCIsIHRoaXMuYWxpZ25Ib3Jpem9udGFsKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBvZiBbW3Rvb2x0aXBdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gdG9vbHRpcFxuICAgKi9cbiAgc2V0VG9vbHRpcCh0b29sdGlwOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRvb2x0aXAgPSB0b29sdGlwO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbW91c2Vkb3duIGV2ZW50LiBDYWxsIHBhcmVudCBjbGFzcyBbW2hhbmRsZU1vdXNlRG93bl1dXG4gICAqIEBwYXJhbSBlIE1vdXNlIGNsaWNrIGV2ZW50XG4gICAqL1xuICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljayBldmVudC5cbiAgICogQGV2ZW50IE9uQ29tbWFuZFxuICAgKi9cbiAgaGFuZGxlT25DbGljaygpIHtcbiAgICBpZiAodGhpcy5lbWl0SW50ZXJuYWxPbkNvbW1hbmQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMub25Db21tYW5kLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIG9mIFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3JSZWYpIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFRoZSBjb21wb25lbnQncyBjaGFuZ2UgZGV0ZWN0b3JcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJucyBOYW1lIG9mIHRhZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJsYWJlbFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSB0ZXh0IGlzIGFsbCBzcGFjZSBjaGFyYWN0ZXJzXG4gICAqIEByZXR1cm5zIElmIHRleHQgaXMganVzdCBzcGFjZSBjaGFyYWN0ZXJzIFRSVUUsIG90aGVyd2lzZSBGQUxTRVxuICAgKi9cbiAgZ2V0IHNwYWNlVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0ICYmIHRoaXMudGV4dC5sZW5ndGggPiAwICYmIHRoaXMudGV4dC50cmltKCkubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW3Zpc2libGVdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAb3ZlcnJpZGVcbiAgICogQHBhcmFtIHZhbHVlIFRvZ2dsZSB2aXNpYmlsaXR5XG4gICAqL1xuICBzZXRWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy52aXNpYmxlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVDc3NDbGFzcygnaGlkZGVuJyk7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENzc0NsYXNzKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cbiAgfVxufVxuIl19