import { OnInit, ElementRef, ChangeDetectorRef, EventEmitter, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { AlignHorizontal } from '../base/style-literals';
/**
 * Class for label component. Renders text
 */
export declare class LabelComponent extends BaseComponent implements OnInit {
    private cd;
    alignHorizontal: AlignHorizontal;
    /**
    * Accessor method for internal [[_tootip]] property
    */
    tooltip: string;
    private _tooltip;
    onCommand: EventEmitter<{}>;
    /**
     *
     * @param parent See [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd Change detector ref
     * @param renderer see [[BaseComponent]]
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle method. Runs when component is created
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle method. Runs after component view is created
     */
    ngAfterViewInit(): void;
    /**
     * Get JSON representation of component
     */
    toJson(): {};
    /**
     * Set value of [[tooltip]] property
     * @param tooltip
     */
    setTooltip(tooltip: string): void;
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param e Mouse click event
     */
    onMouseDown(e: MouseEvent): void;
    /**
     * Event handler for click event.
     * @event OnCommand
     */
    handleOnClick(): void;
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @returns The component's change detector
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    protected getNxTagName(): string;
    /**
     * Check if the text is all space characters
     * @returns If text is just space characters TRUE, otherwise FALSE
     */
    readonly spaceText: boolean;
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    setVisible(value: boolean): void;
}
