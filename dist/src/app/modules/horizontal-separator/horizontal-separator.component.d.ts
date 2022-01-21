import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for Horizontal line (HR) component
 */
export declare class HorizontalSeparatorComponent extends BaseComponent implements OnInit {
    borderColor: string;
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param renderer see [[BaseComponent]]
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2);
    /**
     * Init lifecycle method
     */
    ngOnInit(): void;
    /**
     * Get JSON representation for this component
     */
    toJson(): any;
}
