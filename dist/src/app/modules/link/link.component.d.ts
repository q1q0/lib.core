import { OnInit, EventEmitter, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for a link component
 */
export declare class LinkComponent extends BaseComponent implements OnInit {
    private cd;
    idName: string;
    onCommand: EventEmitter<{}>;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector reference for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    _disabled: boolean;
    disabled: boolean;
    innerhtml: string;
    /**
     * Init lifecycle. Calls parent init method
     */
    ngOnInit(): void;
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * @event OnCommand
     */
    onClick(): void;
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param e Keyboard Event
     */
    onKeyUp(e: KeyboardEvent): void;
    /**
     * Get the JSON representation for panel
     */
    toJson(): {};
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @returns Value of [[cd]] property
     */
    protected getChangeDetector(): ChangeDetectorRef;
}
