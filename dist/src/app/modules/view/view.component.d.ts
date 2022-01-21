import { Type, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AttributesEnum } from '../base/attributes.enum';
import { DialogComponent } from '../dialog/dialog.component';
import { ComponentType } from '../base/component-type.enum';
import { Observable } from "rxjs";
import { SessionService } from '../session/session.service';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { PopupMenuDirective } from '../popup-menu/popup-menu.directive';
import { AttributeNameValue } from '../base/attribute-name-value';
import { MenuItemComponent } from '../popup-menu/menu-item/menu-item.component';
/**
 * Base parent component class that all other screen components inherit from
 */
export declare class ViewComponent extends BaseComponent {
    dialog: DialogComponent;
    private routeUrl;
    private routeDeactivated;
    private mcos;
    zIndex: number;
    isDynamicPage: boolean;
    isDestroyed: boolean;
    canBeActiveView: boolean;
    actionForwardName: string;
    modal: string;
    routeId: string;
    private _viewInitializedSubject;
    viewInitialized: Observable<void>;
    private defIds;
    private popupMenus;
    private changeDetectionFrozen;
    isMinimized: boolean;
    skipBreadCrumb: boolean;
    allowMultipleScreen: boolean;
    screenIndex: number;
    baseScreenId: string;
    beforeDestroyCb: (id: string) => void;
    private _inactiveMenuItems;
    private _tableColumnsMap;
    _viewStatus: number;
    private viewRouteSet;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef);
    viewIsInitialized: boolean;
    /**
     * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
     * @param url
     */
    setRouteUrl(url: string): void;
    /**
     * Get [[routeUrl]] property value
     * @returns Route URL
     */
    getRouteUrl(): string;
    /**
     * Check if route is deactivated.
     * @returns True if route is deactivated
     */
    isRouteDeactivated(): boolean;
    /**
     * After view init lifecycle
     */
    ngAfterViewInit(): void;
    protected afterDialogInit(): void;
    /**
     * Set modal CSS and dialog's modal property value to true.
     * Make view component display as modal
     */
    setModalMode(): void;
    /**
     * Destroy lifecycle. Clear all references
     */
    ngOnDestroy(): void;
    /**
     * Delegate to [[bodyInit]]
     */
    protected componentInitialize(): void;
    /**
     * Get the component's tag name. Implementation of [[BaseComponent]] method
     * @returns Name of tag
     */
    getTagName(): string;
    /**
     * Not implemented
     */
    bodyInit(): void;
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param selectorFn
     */
    setElementAttribute(selectorFn: ((map: Map<string, BaseComponent>) => BaseComponent), attribute: AttributesEnum, value: any): void;
    /**
    * Set [[disabled]] property value
    * @param boo Value for disabled property
    */
    setDisabled(boo: boolean): void;
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param selectorFn
     */
    setElementAttributeById(compId: string, attribute: AttributesEnum | string, value: any): void;
    /**
     * Wholesale set attributes to an element.
     *
     * @param compId element to set attribute
     * @param attributes an array of AttributesEnum to be set
     */
    setElementAttributesById(compId: string, attributes: Array<AttributeNameValue>): void;
    /**
     * Removes an attribute from a component with a specific id
     * @param compId Component id
     * @param attribute Name of attribute to remove from component
     */
    removeElementAttributeById(compId: string, attribute: AttributesEnum | string): void;
    /**
     * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
     * @param radioGroupId
     * @param attribute HTML attribute name to be set
     * @param value Value to set on HTML attribute
     */
    setRadioGroupAttribute(radioGroupId: string, attribute: AttributesEnum | string, value: any): void;
    /**
     * Get the value of an HTML attribute of a component
     * @param compId Id of component to get attribute from
     * @param attribute Name of HTML attribute to get
     */
    getElementAttributeById(compId: string, attribute: AttributesEnum | string): any;
    /**
     * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
     * @param compId Component ID to initialize
     * @param value Value to set on combobox
     * @param attribute Name of attribute to set on combobox
     */
    initializeComboBoxValues(compId: string, value: any, attribute: any): void;
    /**
     * Set the [[ComboboxComponent]] selected item that matches value
     * @param compId [[ComboboxComponent]] id
     * @param value Value to set as selected
     */
    selectComboBoxItem(compId: string, value: any): void;
    /**
     * Find component and focus it
     * @param compId Component id
     */
    setFocus(compId?: string): void;
    /**
     * Set title on [[DialogComponent]]
     * @param title Title of dialog
     */
    setTitle(title: string): void;
    /**
     * Close [[dialog]] if it exists on this component
     * @param delayDialogClose
     */
    close(delayDialogClose?: boolean): void;
    /**
     * Get name of this component
     */
    getLocalName(): string;
    /**
     * Register and add an MCO
     * @param mcoName
     * @param mcoClass
     */
    createMco(mcoName: string, mcoClass: Type<any>): any;
    /**
     * Get MCO from client session
     * @param mcoName Name of MCO to get
     * @returns MCO
     */
    getMco(mcoName: string): any;
    /**
     * Parse string and create component base on it
     *
     * @param domString
     */
    createComponent(domString: string): void;
    /**
     * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
     * @param componentType
     */
    _createDynamicComponent(componentType: ComponentType): BaseComponent;
    /**
     * @deprecated DO NOT USE THIS! Exists only for legacy support
     * @param id
     */
    _removeComponent(id: string): void;
    /**
     * Check if this view can be active
     * @returns True if view can be active or parent is null
     */
    isView(): boolean;
    /**
     * Check if this view can't be active view
     * @returns True if view can't be active view
     */
    isNoneActiveView(): boolean;
    /**
     * Check if this is a dynamic page
     * @returns True if it is a dynamic page
     */
    isDynamicView(): boolean;
    /**
     * Set [[DialogComponent]] instance z-index
     * @param newZIndex
     */
    updateZIndex(newZIndex: number): void;
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata for this component
     */
    toJson(): {};
    /**
     * Add component id to [[defIds]]
     * @param id
     */
    trackDef(id: string): void;
    private static closeOnInit;
    static hasIdAsCloseTargetOnInit(viewId: string): boolean;
    static hasTypeAsCloseTargetOnInit(viewType: Type<ViewComponent>): boolean;
    private static hookClosePrevView2DynamicPagesService;
    static closePrevView(sessionService: SessionService, target: string | Type<ViewComponent>): void;
    /**
     * Close previous version of this view (if this view is "re-open"). This is to support usage
     * of removing current view and replacing with new view
     * @param viewId
     */
    closeView(viewId: string, delayDialogClose?: boolean): void;
    /**
     * Add a [[PopupMenuDirective]] to [[popupMenus]] property
     * @param popupMenu Popup menu to add to internal [[popupMenus]] list
     */
    registerPopupMenu(popupMenu: PopupMenuDirective): void;
    /**
     * Check if [[popupMenus]] has 1 or more items
     * @returns True if [[popupMenus]] is defined and has at least 1 item
     */
    hasPopupMenu(): boolean;
    /**
     * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
     * @returns Id of popup menu
     */
    getFirstPopupMenuId(): string;
    /**
     * Delegate to [[BaseComponent]] findElementById method
     * @param id Component ID
     */
    findElementById(id: string): BaseComponent;
    /**
     * Stop change detection
     */
    freezeChangeDetection(): void;
    /**
     * Resume change detection if it has been stopped
     */
    unfreezeChangeDetection(): void;
    /**
     * Check if change detection has been stopped
     * @returns True if change detection has been stopped
     */
    isChangeDetectionFrozen(): boolean;
    /**
     * Check if this is a container component
     * @returns True
     */
    protected isContainer(): boolean;
    /**
     * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
     */
    detectChanges(): void;
    /**
     * Mark this component for change detection
     */
    markForCheck(): void;
    /**
     * Show the view after it has been hidden via minimized
     */
    showView(): void;
    /**
     * Minimize the [[dialog]] of this component
     */
    minimize(): void;
    /**
     * Move this component to the top of the view stack
     */
    moveToTop(): void;
    trackInactiveMenuItem(menuItem: MenuItemComponent): void;
    getInactiveMenuItem(id: string): HTMLElementWrapper;
    cleanup(): void;
    isModalDialog(): boolean;
    /**
     * Not implemented
     */
    handleActionForward(): void;
    /**
     * screen index(0~)の文字列表現
     */
    getScreenIndex(): string;
    registerScreenIndex(): void;
    setVisible(boo: boolean): void;
}
