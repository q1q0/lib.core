import { ElementRef, Renderer2, NgZone, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BottomPaneComponent } from './bottom-pane/bottom-pane.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { SessionService } from '../session/session.service';
/**
 * Class for split resizable panes
 */
export declare class SplitPaneComponent extends BaseComponent {
    private zone;
    private cd;
    /**
     * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
     */
    orientation: string;
    /**
     * Where the divider position should be set
     */
    splitPosition: string;
    /**
     * Set true, in case of cascading split pane
     */
    noScroll: any;
    private _noScroll;
    topPaneElement: ElementRef;
    splitPaneDivider: ElementRef;
    bottomPaneElement: ElementRef;
    splitPaneContainer: ElementRef;
    topPane: TopPaneComponent;
    bottomPane: BottomPaneComponent;
    dividerStyles: {
        [name: string]: string;
    };
    topPaneStyles: {
        [name: string]: string;
    };
    bottomPaneStyles: {
        [name: string]: string;
    };
    dividerCssClass: string[];
    private _resizeOn;
    private _handleMouseMove;
    private _handleMouseDown;
    private _handleMouseUp;
    private _prevPos;
    private _containerHeight;
    private _containerWidth;
    private _update;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param zone Inject [[NgZone]] reference
     * @param cd Inject [[ChangeDetectorRef]]
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2, zone: NgZone, cd: ChangeDetectorRef);
    /**
     * Init lifecycle. Set panel width
     */
    ngOnInit(): void;
    moveUp(): void;
    moveDown(): void;
    /**
     * Check if this is a container component
     * @returns True
     */
    protected isContainer(): boolean;
    /**
     * Set pane layout and dimensions
     */
    private setPaneWidth;
    /**
     * After view init lifecycle. Add event listeners
     */
    ngAfterViewInit(): void;
    /**
     * Destroy lifecycle. Remove event listeners
     */
    ngOnDestroy(): void;
    /**
     * Event handler for panel resize event
     * @param event Mouse event
     */
    private _resizePanels;
    /**
     * Event handler for mouse event. Update pane width/height
     * @param event Mouse event
     */
    private _doUpdate;
}
