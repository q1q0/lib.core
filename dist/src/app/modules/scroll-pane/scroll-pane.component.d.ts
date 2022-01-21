import { OnInit, ElementRef, Renderer2, ChangeDetectorRef, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for scroll pane component
 */
export declare class ScrollPaneComponent extends BaseComponent implements OnInit {
    private cd;
    private zone;
    resizeHeight: string;
    skipScrollAdjustment: boolean;
    scrollDivElement: ElementRef;
    private _scrollerHandler;
    private _scrollVerticalPos;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param cd Change detector for this component instance
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone);
    /**
     * Get [[cd]] (Change detector) property value
     * @returns Change detector reference
     */
    getChangeDetector(): ChangeDetectorRef;
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Scroll event of div
     */
    private handleOnScroll;
    resetScrollTopToPreviousPosition(): void;
    resetScrollTopPosition(): void;
    isScrollView(): boolean;
    isScrollPane(): boolean;
}
