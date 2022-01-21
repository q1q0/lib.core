import { OnInit, ElementRef, EventEmitter, TemplateRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { SessionService } from '../../session/session.service';
/**
 * Class for tab component
 */
export declare class TabComponent extends BaseComponent implements OnInit {
    active: boolean;
    id: string;
    onCommand: EventEmitter<{}>;
    content: TemplateRef<any>;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2);
    /**
     *
     * @param child Tab child component to add
     */
    protected addChild(child: BaseComponent): void;
    /**
     * After view init lifecycle
     */
    ngAfterViewInit(): void;
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata about this component
     */
    toJson(): any;
    /**
     * Get NexaWeb component tag name
     */
    protected getNxTagName(): string;
    /**
     * Event handler for click event
     * @event onCommand
     */
    onClick(): void;
    /**
     * Focus this tab
     */
    setFocus(): void;
}
