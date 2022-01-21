import { OnInit, EventEmitter, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Check box component class
 */
export declare class CheckboxComponent extends BaseComponent implements OnInit {
    private cd;
    value: any;
    checked: boolean;
    isChecked: boolean;
    onCommand: EventEmitter<any>;
    onStateChange: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Must call parent class ngOnInit
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     */
    ngAfterViewInit(): void;
    /**
     * Event handler for click event
     * @param event
     * @event OnCommand
     */
    onClick(event: MouseEvent): void;
    /**
     * Event handler for mousedown event
     * @param event
     */
    onMouseDown(event: MouseEvent): void;
    /**
     * Event handler for state change (check/uncheck)
     * @event OnStateChange
     * @event OnSelect If the checkbox is set to selected state
     */
    handleStateChange(): void;
    /**
     * Get component name
     * @returns Name of component
     */
    getLocalName(): string;
    /**
     * Get [[checked]] property
     * @returns Value of [[checked]]
     */
    getChecked(): boolean;
    /**
     * Set [[checked]] property value
     * @param shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     */
    setChecked(shouldChecked: boolean | string, skipInternalChange?: boolean): void;
    /**
     * Alias for [[setChecked]] method
     * @param boo Toggle [[checked]]
     */
    setSelected(boo: boolean | string): void;
    /**
     * Get [[value]] property
     * @returns Value of [[value]]
     */
    getValue(): any;
    /**
     * Get JSON representation of component state
     * @returns Object Json object
     */
    toJson(): {};
    /**
     * Get Nexaweb tag name
     * @returns String Tag name
     */
    protected getNxTagName(): string;
    /**
     * Get [[cd]] (Change detector) property
     * @returns The component's change detector reference
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
   * Set background-color
   * @param String background color
   */
    setBgColor(color: string): void;
    getBgColor(): any;
}
