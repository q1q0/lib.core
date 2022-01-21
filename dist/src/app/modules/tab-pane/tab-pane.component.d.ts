import { ElementRef, QueryList, EventEmitter, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TabComponent } from './tab/tab.component';
import { TabEvent } from './tab-event';
declare type TabPlacement = "left" | "top" | "bottom" | "right";
/**
 * Class for tab pane container component
 */
export declare class TabPaneComponent extends BaseComponent {
    private cd;
    tabPlacement: TabPlacement;
    tabsList: QueryList<TabComponent>;
    tabNavItems: Array<ElementRef>;
    onClick: EventEmitter<TabEvent>;
    selectedTabIndex: number;
    focusedTabIndex: number;
    tabs: Array<TabComponent>;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Inject change detector
     * @param renderer see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     */
    ngAfterViewInit(): void;
    /**
     * Set the [[selectedTabIndex]] to index of active tab
     */
    private configureTabs;
    /**
     * Event handler for when tab is selected
     * @param event
     * @param index Index of tab to select
     * @param tabId
     * @event onCommand
     */
    handleSelectTab(event: Event, index: number, tabId: string): void;
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param e Key event
     */
    handleKeydown(e: KeyboardEvent): void;
    /**
     * Focus a tab by it's index position
     * @param index Index of tab to focus
     */
    setFocusedTab(index: number): void;
    /**
     * Set selected tab by index or id
     * @param index Index or Id of [[TabComponent]] to select
     */
    setSelectedTab(index: number | string): void;
    /**
     * Get the selected [[TabComponent]]
     * @returns Tab that is selected
     */
    readonly selectedTab: TabComponent;
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    protected getNxTagName(): string;
    /**
     * Get [[cd]] (ChangeDetector) member
     */
    getChangeDetector(): ChangeDetectorRef;
    /**
     * Remove a tab child from the pane
     * @param child Tab to remove
     */
    removeChild(child: TabComponent): void;
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata
     */
    toJson(): {};
    /**
     * Check if this is a container component
     * @returns True
     */
    protected isContainer(): boolean;
}
export {};
