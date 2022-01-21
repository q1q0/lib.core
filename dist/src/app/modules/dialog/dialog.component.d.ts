import { OnInit, ElementRef, AfterViewInit, ChangeDetectorRef, ViewContainerRef, Renderer2, EventEmitter, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { InitialPosition } from '../base/initial-position';
import { DraggableDirective } from './draggable.directive';
import { DynamicPagesService } from '../view/dynamic-pages.service';
/**
 * Class for dialog component
 */
export declare class DialogComponent extends BaseComponent implements OnInit, AfterViewInit {
    private cd;
    private dynamicPageService;
    private zone;
    body: ElementRef;
    modalDialog: ElementRef;
    modalContent: ElementRef;
    title: String;
    draggable: boolean;
    initialPosition: InitialPosition;
    modal: string | boolean;
    private _modal;
    centered: boolean | string;
    windowTitle: string;
    _center: boolean;
    modalSize: string;
    resizeable: boolean;
    onClosing: EventEmitter<void>;
    modalElement: ElementRef;
    viewContainer: ViewContainerRef;
    draggablePanel: ViewContainerRef;
    draggableDirective: DraggableDirective;
    modalWidth: number | string;
    modalHeight: number | string;
    modalBodyHeight: number | string;
    isMaximize: boolean;
    isUnMaximize: boolean;
    contentWidth: string;
    contentHeight: string;
    static readonly UNMAXIMIZE_HEGHT: string;
    resizeDialog: boolean;
    modalBodyMinHeight: string;
    modalBodyDivHeight: string;
    modalBodyDivWidth: string;
    modalBodyPercentHeight: string;
    resizeFlg: boolean;
    modalOriginalLeft: number;
    modalOriginalTop: number;
    bsModalClass: string[];
    private viewRouteUrl;
    private viewId;
    tableId: string;
    screenIndex: number;
    _disabledErrorElementId: Array<string>;
    _canTrackFocusLostOnErrorDisabled: boolean;
    private _tabbables;
    private wasClickOutside;
    private docClickHandler;
    private modalFocusOutHandler;
    private keydownHandler;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd [[ChangeDetectorRef]] to inject
     * @param renderer see [[BaseComponent]]
     * @param dynamicPageService [[DynamicPageService]] instance to inject
     * @param zone Angular zone
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2, dynamicPageService: DynamicPagesService, zone: NgZone);
    /**
     * Set [[viewRouteUrl]] property
     * @param viewRouteUrl
     */
    setViewRouteUrl(viewRouteUrl: string): void;
    /**
     * Set draggable directive id and [[id]]
     */
    resetId(): void;
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     */
    dialogResize(): void;
    /**
   * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
   * リサイズを行う
   */
    resizeExecute(): void;
    /**
     * Init lifecycle. Sets [[viewId]]
     */
    ngOnInit(): void;
    /**
     * Destroy lifecycle. Cleans up references
     */
    ngOnDestroy(): void;
    /**
     * After view init lifecycle. Sets initial dialog height/width and positioning
     */
    ngAfterViewInit(): void;
    /**
     * Set the width of disabled-dialog with the width of the modal-content
     */
    private setDisabledDialogWidth;
    /**
     * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
     */
    private updateDraggableDirectiveId;
    /**
     * Set position of window component
     */
    private setModalLessPosition;
    /**
     * Get the native HTML element of this dialog
     * @returns DOM element
     */
    getElement(): HTMLElement;
    /**
     * Event handler for click on close button. Closes the window
     * @param event
     * @param immediate
     */
    close(event?: MouseEvent, immediate?: boolean): void;
    /**
     * Set [[disabled]] property value
     * @param boo Value for disabled property
     */
    setDisabled(boo: boolean): void;
    /**
     * Sets the dialogs 'z-index' CSS property
     * @param newZIndex
     */
    updateZIndex(newZIndex: number): void;
    /**
     * Set inactive window style if this dialog is not the current active dialog
     */
    setInactiveDialogStyle(): void;
    /**
     * Set position of this dialog when it is first opened
     * @param position Window position
     */
    setInitialPosition(position: InitialPosition): void;
    /**
     * Event handler for close event
     * @event OnClosing
     */
    handleOnClosing(): void;
    /**
     * Get the Nexaweb tag name of this component
     */
    protected getNxTagName(): string;
    /**
     * Get JSON representation of dialog state
     */
    toJson(): {};
    /**
     * Check whether or not this dialog is a container
     * @returns Boolean
     */
    protected isContainer(): boolean;
    /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @returns Boolean
     */
    protected isDialog(): boolean;
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @returns ChangeDetectorRef
     */
    getChangeDetector(): ChangeDetectorRef;
    /**
     * Event handler for minimize button click. Minimizes dialog
     * @param event
     */
    minimize(event: MouseEvent): void;
    /**
     * Event handler for maximize button click. Maximizes dialog
     * @param event
     */
    maximize(event: MouseEvent): void;
    /**
     * Show the view after it has been hidden via minimized
     */
    showView(): void;
    /**
     * Event handler for mousedown event. Resets dialog view stack
     */
    handleMouseDown(): void;
    /**
     * Stop propagation on disabled dialog
     */
    onClickDisableContent(event: any): void;
    /**
     * Stop propagation on modal dialog
     */
    onClickBackdrop(event: any): void;
    private updateModalDialogStyle;
    private checkFocusOut;
    private handleDocClickEvent;
    checkKey(event: any): void;
    trackFocusLostOnErrorDisabled(): void;
}
