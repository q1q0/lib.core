import { OnInit, ElementRef, QueryList, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { Layout } from '../base/style-literals';
export declare class PanelComponent extends BaseComponent implements OnInit {
    private cd;
    layout: Layout;
    caption: String;
    evenlySpace: boolean;
    /**
     * For escaping unneeded row & fluid container. This is a trikcy option.
     * Almost case, fluid container is not needed. it's too late...
     * @property {boolean}
     */
    noGutter: boolean;
    /**
   * For escaping fluid container. This is a trikcy option.
   * should be validated by `(layout !== 'grid')` . it's too late...
   * @property {boolean}
   */
    noGrid: boolean;
    childrenList: QueryList<BaseComponent>;
    panelClasses: Array<string>;
    panelStyles: {
        [name: string]: string;
    };
    resizeComponent: boolean;
    resizeMarginTop: string;
    resizeHeight: string;
    divHeight: string;
    contentDisplayWidth: string;
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2);
    /**
     * Init lifecycle. Set dimensions and css styles
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    ngAfterViewInit(): void;
    /**
     *
     * @param childrenList Update list of children ids
     */
    private resetChildIndexes;
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param heightStyleName
     * @param widthStyleName
     */
    protected initWidthHeightStyle(heightStyleName?: string, widthStyleName?: string): void;
    /**
     * Set [[disabled]] property value
     * @param boo Toggle disabled
     */
    setDisabled(boo: boolean): void;
    /**
     * Set [[visible]] property value
     * @param boo Toggle visibility
     */
    setVisible(boo: boolean): void;
    /**
     * Check if [[caption]] property exists and is set
     * @returns True if caption exists and has content, otherwise false
     */
    readonly hasCaption: boolean;
    /**
     * Check if [[layout]] property exists
     * @returns True if layout exists, otherwise false
     */
    readonly containerLayout: boolean;
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @returns Change detector for this panel
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Check whether or not this component is a container
     * @returns True since panels are always containers
     */
    protected isContainer(): boolean;
    protected getNxTagName(): string;
}
