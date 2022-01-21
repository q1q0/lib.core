import { EventEmitter, OnInit, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Button component class. Inherits from [[BaseComponent]]
 */
export declare class ButtonComponent extends BaseComponent implements OnInit {
    private cd;
    focused: boolean;
    onCommand: EventEmitter<{}>;
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
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
     * @param e
     */
    onMouseDown(e: MouseEvent): void;
    handleOnBlur(): void;
    /**
     * Get change detector reference for the button instance
     * @returns [[cd]] property (Change detector)
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Get Nexaweb tag name
     * @returns String
     */
    protected getNxTagName(): string;
    /**
     * Get JSON representation of the button component
     * @returns Json object
     */
    toJson(): {};
}
