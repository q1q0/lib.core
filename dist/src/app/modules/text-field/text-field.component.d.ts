import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for text field component
 */
export declare class TextFieldComponent extends BaseComponent implements OnInit, AfterViewInit {
    private cd;
    static readonly MAX_LENGTH: number;
    /**
     * Input element's value
     */
    value: string;
    /**
     * Whether or not text field is editable
     */
    editable: boolean | string;
    /**
     * Max input allowed for characters
     */
    maxLength: number;
    /**
     * HTML input element type attribute. Defaults to 'text'
     */
    type: string;
    onTextChange: EventEmitter<{}>;
    onEdit: EventEmitter<{}>;
    onMouseUp: EventEmitter<{}>;
    private _maxLength;
    private _textBeforeFocusIn;
    private _textPreviousKeyInput;
    input: ElementRef;
    styleVar: {
        [key: string]: string;
    };
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Set dimensions and style properties
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Set dimensions, focus text field
     */
    ngAfterViewInit(): void;
    /**
     * Event handler for blur (unfocus) event
     * @param e Input blur event
     */
    onBlur(e: any, value: any): void;
    /**
     * Event handler for focus event
     * @param e Input focus event
     */
    onFocus(e: any): void;
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * @param event
     * @param value
     * @event onTextChange
     */
    onInput(event: KeyboardEvent, value: string): void;
    /**
     * Focus the input element
     */
    setFocus(): void;
    /**
     * Set background color CSS for the text input
     * @param bgColor CSS color string value for background
     */
    setBgColor(bgColor: string): void;
    /**
     * Get [[_maxLength]] property value
     */
    getMaxLength(): number;
    /**
     * Set [[_maxLength]] property value
     * @param max Maximum length of character input
     */
    setMaxLength(max: number | string): void;
    /**
     * Get JSON representation for this text-field
     */
    toJson(): {};
    /**
     * Get component name
     */
    getLocalName(): string;
    /**
     * Get the text content value of the input element
     */
    getValue(): string;
    /**
     * Event handler for mouseup
     * @event OnMouseUp
     */
    handleMouseUp(): void;
    /**
     * @returns String Tag name
     */
    protected getNxTagName(): string;
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @returns Change detector
     */
    protected getChangeDetector(): ChangeDetectorRef;
    _notifyInternalChangeCb(): void;
    /**
     * Select all text
     */
    selectText(): void;
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    setVisible(value: boolean): void;
}
