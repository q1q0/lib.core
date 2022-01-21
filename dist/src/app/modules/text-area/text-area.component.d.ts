import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for textarea component
 */
export declare class TextAreaComponent extends BaseComponent implements OnInit {
    private cd;
    static readonly MAX_LENGTH: number;
    private _maxLength;
    maxLength: number;
    editable: string | boolean;
    textarea: ElementRef;
    onTextChange: EventEmitter<{}>;
    onEdit: EventEmitter<{}>;
    _editable: boolean | string;
    private _textBeforeFocusIn;
    private _textPreviousKeyInput;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd ChangeDetector for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Call parent ngOnInit
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     */
    ngAfterViewInit(): void;
    /**
     * Get the name of the component
     * @returns Name of component
     */
    getLocalName(): string;
    /**
     * Focus the textarea element
     */
    setFocus(): void;
    /**
     * Get the value of internal [[_maxLength]] property
     */
    getMaxLength(): number;
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param max Length of text content
     */
    setMaxLength(max: number | string): void;
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * @param event
     * @param value
     * @event onTextChange
     */
    onInput(event: KeyboardEvent, value: string): void;
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @returns Change detector for this component
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Get Nexaweb tag name
     * @returns Tag name
     */
    protected getNxTagName(): string;
    /**
     * Event handler for focus event
     * @param e Input focus event
     */
    onFocus(e: any): void;
    /**
     * Event handler for blur (unfocus) event
     * @param e Input blur event
     */
    onBlur(event: any, value: any): void;
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    setVisible(value: boolean): void;
}
