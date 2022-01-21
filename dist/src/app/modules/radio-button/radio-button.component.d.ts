import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for radio button input control
 */
export declare class RadioButtonComponent extends BaseComponent implements OnInit {
    private cd;
    group: string;
    idName: string;
    value: any;
    isChecked: boolean;
    checked: boolean;
    private _internalChangeTracking;
    onCommand: EventEmitter<{}>;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector for this panel
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Call parent init method.
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     */
    ngAfterViewInit(): void;
    /**
     * Event handler for change event
     * @event OnCommand
     */
    onChange(): void;
    /**
     * Event handler for click event. Updates radio button state
     * @param event Mouse click event
     */
    onClick(event: MouseEvent): void;
    /**
     * Event handler for mousedown event
     * @param e MouseDown event
     */
    onMouseDown(e: MouseEvent): void;
    /**
     * Get the component name
     */
    getLocalName(): string;
    /**
     * Get the [[value]] property
     */
    getValue(): any;
    /**
     * Get the [[checked]] property
     */
    getChecked(): boolean;
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param shouldChecked Toggle checked
     */
    setChecked(shouldChecked: boolean | string, skipInternalChange?: boolean): void;
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param value
     */
    setSelected(value: any): void;
    /**
     * Get JSON representation for the radiobutton component
     * @returns JSON
     */
    toJson(): {};
    /**
     * Get the NexaWeb tag name
     * @return Tag name
     */
    protected getNxTagName(): string;
    /**
     * Uncheck all radio buttons in the radio button's group
     */
    private resetGroupRadios;
    /**
     * Get [[cd]] (ChangeDetector) of this component
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Check if this component is a radiobutton
     * @returns True
     */
    protected isRadioButton(): boolean;
}
