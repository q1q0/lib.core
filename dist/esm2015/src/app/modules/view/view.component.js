/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Type, ComponentFactoryResolver, ElementRef, SkipSelf, Optional } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AttributesEnum } from '../base/attributes.enum';
import { DialogComponent } from '../dialog/dialog.component';
import { ComponentType } from '../base/component-type.enum';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../button/button.component';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import * as _ from 'lodash';
import { DynamicPagesService } from './dynamic-pages.service';
import { AppUtils } from '../base/app-utils';
import { Subject } from "rxjs";
import { SessionService } from '../session/session.service';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { UiDocument } from '../base/ui-document';
import { Logger } from '../base/logger';
import { KeyUtils } from '../base/key-utils';
import { JavaUtils } from '../java/java-utils';
/**
 * Base parent component class that all other screen components inherit from
 */
export class ViewComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef) {
        super(parent, sessionService, elementRef, null);
        this.mcos = new Set();
        this.canBeActiveView = true;
        this._viewInitializedSubject = new Subject();
        this.viewInitialized = this._viewInitializedSubject.asObservable();
        this.defIds = [];
        this.screenIndex = null;
        this.actionForwardName = this.getId();
    }
    /**
     * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
     * @param {?} url
     * @return {?}
     */
    setRouteUrl(url) {
        this.routeUrl = url;
        if (this.dialog != null) {
            this.dialog.setViewRouteUrl(url);
        }
    }
    /**
     * Get [[routeUrl]] property value
     * @return {?} Route URL
     */
    getRouteUrl() {
        return this.routeUrl;
    }
    /**
     * Check if route is deactivated.
     * @return {?} True if route is deactivated
     */
    isRouteDeactivated() {
        return this.routeDeactivated === true;
    }
    /**
     * After view init lifecycle
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.canBeActiveView !== false) {
            this.parent = null;
        }
        //add view to stack
        this.getSession().getMcoContainer().registerView(this);
        super.ngAfterViewInit();
        this.afterDialogInit();
        if (this.popupMenus != null) {
            _.forEach(this.popupMenus, (popupMenu) => popupMenu.convertSubMenuItems(this.id));
        }
        this.componentInitialize();
        if (this.dialog) {
            this.dialog.setViewRouteUrl(this.routeUrl);
            this.viewRouteSet = true;
        }
        this.getSession().getMcoContainer().reStackView(this.id, this.screenIndex);
        this._viewInitializedSubject.next();
        this.viewIsInitialized = true;
    }
    /**
     * @return {?}
     */
    afterDialogInit() {
        if (this.dialog) {
            //get id of dialog as our id
            this.id = this.dialog.getId();
            this.dialog.screenIndex = this.screenIndex;
            if (typeof this.dialog.modal === "boolean") {
                this.modal = JavaUtils.booleanToString(this.dialog.modal);
            }
            else {
                this.modal = this.dialog.modal;
            }
            if (this.modal != null && (this.modal === "true" || this.modal === "false")) {
                this.setElementAttributeById(this.id, 'modal', this.modal);
                this.setModalMode();
            }
            else {
                this.dialog.modal = "false";
                this.modal = this.dialog.modal;
                this.setElementAttributeById(this.id, 'modal', "false");
            }
            if (this.popupMenus != null) {
                _.forEach(this.popupMenus, (popupMenu) => popupMenu.convertSubMenuItems(this.id));
            }
            this.dialog.resetId();
            if (this.viewRouteSet !== true) {
                this.dialog.setViewRouteUrl(this.routeUrl);
                this.viewRouteSet = true;
            }
        }
    }
    /**
     * Set modal CSS and dialog's modal property value to true.
     * Make view component display as modal
     * @return {?}
     */
    setModalMode() {
        if (this.modal == "true") {
            this.dialog["elementRef"].nativeElement.className = "modal fade in";
            this.dialog["elementRef"].nativeElement.style.cssText = "display:inline-block;";
            this.setElementAttributeById(this.id, 'modal', this.modal);
            this.dialog.modal = this.modal;
        }
    }
    /**
     * Destroy lifecycle. Clear all references
     * @return {?}
     */
    ngOnDestroy() {
        if (this.beforeDestroyCb != null) {
            this.beforeDestroyCb(this.getId());
        }
        this._inactiveMenuItems = null;
        this.routeDeactivated = true;
        //remove view from stack
        this.getSession().getMcoContainer().removeView(this);
        this.mcos.forEach(mco => this.getSession().getMcoContainer().removeMco(mco));
        this.mcos.clear();
        delete this.mcos;
        if (this.dialog != null) {
            if (this.dialog.viewContainer != null) {
                this.dialog.viewContainer.clear();
                delete this.dialog.viewContainer;
            }
            delete this.dialog;
        }
        this.isDestroyed = true;
        this.getSession().getInjector(DynamicPagesService).removeView(this);
        _.forEach(this.defIds, (id) => {
            this.getSession().deleteDef(id);
        });
        this.defIds = null;
        this.popupMenus = null;
        // if (this._findElementCache != null) {
        //   this._findElementCache.clear();
        // }
        // this._findElementCache = null;
        this._tableColumnsMap = null;
        super.ngOnDestroy();
    }
    /**
     * Delegate to [[bodyInit]]
     * @return {?}
     */
    componentInitialize() {
        this.bodyInit();
    }
    /**
     * Get the component's tag name. Implementation of [[BaseComponent]] method
     * @return {?} Name of tag
     */
    getTagName() {
        return 'vt-dummy-view';
    }
    /**
     * Not implemented
     * @return {?}
     */
    bodyInit() {
    }
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} selectorFn
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setElementAttribute(selectorFn, attribute, value) {
        /** @type {?} */
        const comp = selectorFn(this.children);
        if (comp == null) {
            Logger.warn('Unable to set attribute, component is null');
        }
        else {
            comp.setAttribute(attribute, value);
        }
        this.markForCheck();
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        this.dialog.setDisabled(boo);
    }
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} compId
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setElementAttributeById(compId, attribute, value) {
        if (attribute === AttributesEnum.TITLE || attribute === 'title') {
            this.setTitle(value);
        }
        else if (compId === this.getId()) {
            this.setAttribute(attribute, value);
        }
        else {
            /** @type {?} */
            let comp = this.findElementById(compId);
            /* istanbul ignore if */
            /* istanbul ignore else */
            if (comp == null) {
                /** @type {?} */
                const compDef = this.getSession().getDef(compId);
                if (compDef != null) {
                    compDef.attribute[attribute] = value;
                }
                else {
                    comp = UiDocument.getMenuComponent(compId);
                    /* istanbul ignore else */
                    if (comp != null) {
                        comp.setAttribute(attribute, value);
                    }
                    else {
                        Logger.warn(`Unable to set attribute, component with id: ${compId} is not found`);
                    }
                }
            }
            else {
                comp.setAttribute(attribute, value);
            }
            this.markForCheck();
        }
    }
    /**
     * Wholesale set attributes to an element.
     *
     * @param {?} compId element to set attribute
     * @param {?} attributes an array of AttributesEnum to be set
     * @return {?}
     */
    setElementAttributesById(compId, attributes) {
        if (compId === this.getId()) {
            this.setAttributes(attributes);
        }
        else {
            /** @type {?} */
            const comp = this.findElementById(compId);
            if (comp == null) {
                /** @type {?} */
                const compDef = this.getSession().getDef(compId);
                if (compDef != null) {
                    for (const attr of attributes) {
                        compDef.attribute[attr.attributeName] = attr.value;
                    }
                }
                else {
                    Logger.warn(`Unable to set attribute, component with id: ${compId} is not found`);
                }
            }
            else {
                comp.setAttributes(attributes);
            }
            this.markForCheck();
        }
    }
    /**
     * Removes an attribute from a component with a specific id
     * @param {?} compId Component id
     * @param {?} attribute Name of attribute to remove from component
     * @return {?}
     */
    removeElementAttributeById(compId, attribute) {
        if (attribute === AttributesEnum.TITLE || attribute === 'title') {
            this.setTitle("");
        }
        else if (compId === this.getId()) {
            this.removeAttribute(attribute);
        }
        else {
            /** @type {?} */
            const comp = this.findElementById(compId);
            /* istanbul ignore if */
            /* istanbul ignore else */
            if (comp == null) {
                Logger.warn(`Unable to remove attribute, component with id: ${compId} is not found`);
            }
            else {
                comp.removeAttribute(attribute);
            }
        }
        this.markForCheck();
    }
    /**
     * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
     * @param {?} radioGroupId
     * @param {?} attribute HTML attribute name to be set
     * @param {?} value Value to set on HTML attribute
     * @return {?}
     */
    setRadioGroupAttribute(radioGroupId, attribute, value) {
        /** @type {?} */
        const radios = _.filter(Array.from(this.children.values()), (child) => {
            return child instanceof RadioButtonComponent && (/** @type {?} */ (child)).group === radioGroupId;
        });
        /* istanbul ignore if */
        if (radios != null && radios.length > 0) {
            _.forEach(radios, (radio) => {
                radio.setAttribute(attribute, value);
            });
        }
        this.markForCheck();
    }
    /**
     * Get the value of an HTML attribute of a component
     * @param {?} compId Id of component to get attribute from
     * @param {?} attribute Name of HTML attribute to get
     * @return {?}
     */
    getElementAttributeById(compId, attribute) {
        /** @type {?} */
        const comp = this.findElementById(compId);
        if (comp != null) {
            return comp.getAttribute(attribute);
        }
    }
    /**
     * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
     * @param {?} compId Component ID to initialize
     * @param {?} value Value to set on combobox
     * @param {?} attribute Name of attribute to set on combobox
     * @return {?}
     */
    initializeComboBoxValues(compId, value, attribute) {
        /** @type {?} */
        const comboBox = /** @type {?} */ (this.findElementById(compId));
        if (comboBox == null) {
            console.error(`Unable to find combobox: ${compId} `);
        }
        else {
            comboBox.initializeComboboxValues(value);
            if (attribute != null) {
                if (attribute["width"] != null) {
                    comboBox.setControlWidth(attribute["width"]);
                }
                else if (attribute["onCommand"] != null) {
                    comboBox.setOnCommand(attribute["onCommand"]);
                }
            }
        }
    }
    /**
     * Set the [[ComboboxComponent]] selected item that matches value
     * @param {?} compId [[ComboboxComponent]] id
     * @param {?} value Value to set as selected
     * @return {?}
     */
    selectComboBoxItem(compId, value) {
        /** @type {?} */
        const comboBox = /** @type {?} */ (this.findElementById(compId));
        /* istanbul ignore if */
        if (comboBox == null) {
            console.error(`Unable to find combobox: ${compId} `);
        }
        else {
            comboBox.setSelectValue(value);
        }
    }
    /**
     * Find component and focus it
     * @param {?=} compId Component id
     * @return {?}
     */
    setFocus(compId = null) {
        if (compId == this.id) {
            this.showView();
        }
        else if (compId == null || compId == '') {
            this.requestFocus();
        }
        else {
            /** @type {?} */
            const comp = UiDocument.findElementById(compId);
            if (comp == null) {
                console.error(`Unable to setFocus, component with id: ${compId} is not found`);
            }
            else {
                comp.requestFocus();
            }
        }
    }
    /**
     * Set title on [[DialogComponent]]
     * @param {?} title Title of dialog
     * @return {?}
     */
    setTitle(title) {
        if (this.dialog != null) {
            this.dialog.title = title;
            this.dialog.markForCheck();
        }
    }
    /**
     * Close [[dialog]] if it exists on this component
     * @param {?=} delayDialogClose
     * @return {?}
     */
    close(delayDialogClose) {
        /** @type {?} */
        const dialog = document.getElementById(this.dialog.id);
        dialog.setAttribute("style", "display: none;");
        dialog.innerHTML = "";
        this._viewStatus = 1;
        this.cleanup();
        if (this.dialog != null) {
            if (delayDialogClose) {
                setTimeout(() => {
                    this.dialog.close(null, false);
                }, 1);
            }
            else {
                this.dialog.close(null, true);
            }
        }
        else if (this.isDynamicPage === true) {
            this.getSession().getInjector(DynamicPagesService).removeView(this);
        }
        else {
            if (this.getSession() != null && this.getSession().getRouteNavigatorService() != null) {
                this.getSession().getRouteNavigatorService().destroyRoute(this.routeUrl);
            }
            else {
                console.error("Unable to change route, session or route navigation service is not defined");
            }
            console.error('Unable to close ViewComponent, DialogComponent not found');
        }
    }
    /**
     * Get name of this component
     * @return {?}
     */
    getLocalName() {
        return "window";
    }
    /**
     * Register and add an MCO
     * @param {?} mcoName
     * @param {?} mcoClass
     * @return {?}
     */
    createMco(mcoName, mcoClass) {
        /** @type {?} */
        let mco = this.getSession().getMcoContainer().getMco(mcoName);
        //check to see if MCO already exists?
        if (mco != null) {
            console.warn("MCO " + mcoName + " is already exists, use existing one");
        }
        else {
            mco = new mcoClass(this);
            this.getSession().getMcoContainer().registerMco(mcoName, mco);
            //add mco name for tracking (to be cleaned and removed later)
            this.mcos.add(mcoName);
        }
        return mco;
    }
    /**
     * Get MCO from client session
     * @param {?} mcoName Name of MCO to get
     * @return {?} MCO
     */
    getMco(mcoName) {
        return this.getSession().getMcoContainer().getMco(mcoName);
    }
    /**
     * Parse string and create component base on it
     *
     * @param {?} domString
     * @return {?}
     */
    createComponent(domString) {
        //textField
        //label
        //panel
        //horizontalSeparator
        try {
            /** @type {?} */
            const element = AppUtils.parseDom(domString);
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
     * @param {?} componentType
     * @return {?}
     */
    _createDynamicComponent(componentType) {
        /** @type {?} */
        let comp = null;
        if (this.dialog != null && this.dialog.viewContainer != null) {
            try {
                /** @type {?} */
                const compFactory = this.getSession().getInjector(ComponentFactoryResolver);
                if (compFactory != null) {
                    /** @type {?} */
                    let compRef;
                    if (componentType === ComponentType.LABEL) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(LabelComponent));
                    }
                    else if (componentType === ComponentType.BUTTON) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(ButtonComponent));
                    }
                    else if (componentType === ComponentType.COMBOBOX) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(ComboBoxComponent));
                    }
                    else if (componentType === ComponentType.TEXT_FIELD) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(TextFieldComponent));
                    }
                    else if (componentType === ComponentType.CHECKBOX) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(CheckboxComponent));
                    }
                    else if (componentType === ComponentType.RADIO) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(RadioButtonComponent));
                    }
                    else if (componentType === ComponentType.TEXTAREA) {
                        compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(TextAreaComponent));
                    }
                    else {
                        throw new Error("Unknown component type: " + componentType);
                    }
                    if (compRef != null) {
                        comp = compRef.instance;
                        comp.compRef = compRef;
                        comp.compRef.changeDetectorRef.detectChanges();
                    }
                }
            }
            catch (e) {
                console.error("fail to create component: " + e);
            }
        }
        return comp;
    }
    /**
     * @deprecated DO NOT USE THIS! Exists only for legacy support
     * @param {?} id
     * @return {?}
     */
    _removeComponent(id) {
        /** @type {?} */
        const child = this.findElementById(id);
        if (child != null) {
            child.destroyComponent();
        }
        else {
            if (this.dialog != null &&
                this.dialog.viewContainer != null &&
                (/** @type {?} */ (this.dialog.viewContainer))._embeddedViews != null &&
                Array.isArray((/** @type {?} */ (this.dialog.viewContainer))._embeddedViews) &&
                (/** @type {?} */ (this.dialog.viewContainer))._embeddedViews.length > 0) {
                try {
                    /** @type {?} */
                    const ev = (/** @type {?} */ (this.dialog.viewContainer))._embeddedViews;
                    for (let v of ev) {
                        if (v.nodes && Array.isArray(v.nodes) && v.nodes.length > 0) {
                            for (let n of v.nodes) {
                                if (n.instance != null && n.instance.id === id) {
                                    if (typeof n.instance.destroyComponent === 'function') {
                                        n.instance.destroyComponent();
                                        /* istanbul ignore if */
                                        if (AppUtils.enableLogging === true) {
                                            console.info("Removed component: " + id);
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }
    /**
     * Check if this view can be active
     * @return {?} True if view can be active or parent is null
     */
    isView() {
        return this.canBeActiveView !== false ? true : (this.getParent() == null ? true : false);
    }
    /**
     * Check if this view can't be active view
     * @return {?} True if view can't be active view
     */
    isNoneActiveView() {
        return this.canBeActiveView === false;
    }
    /**
     * Check if this is a dynamic page
     * @return {?} True if it is a dynamic page
     */
    isDynamicView() {
        return this.isDynamicPage === true ? true : false;
    }
    /**
     * Set [[DialogComponent]] instance z-index
     * @param {?} newZIndex
     * @return {?}
     */
    updateZIndex(newZIndex) {
        if (this.dialog != null && this.isDestroyed !== true && this.disabled != true) {
            this.dialog.updateZIndex(newZIndex);
            this.zIndex = newZIndex;
        }
    }
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata for this component
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "screenIndex", this.getScreenIndex());
        if (this.getSession().getMcoContainer().activeView().getId() === this.getId() && UiDocument.menuItemElementMap != null) {
            /** @type {?} */
            const menuItems = [];
            /** @type {?} */
            const keySet = UiDocument.menuItemElementMap.keys();
            /** @type {?} */
            let keyIt = keySet.next();
            while (keyIt.done !== true) {
                menuItems.push(UiDocument.menuItemElementMap.get(keyIt.value).toJson());
                keyIt = keySet.next();
            }
            if (this._inactiveMenuItems != null) {
                /** @type {?} */
                const keyIt = this._inactiveMenuItems.values();
                /** @type {?} */
                let rs = keyIt.next();
                while (rs.done !== true) {
                    menuItems.push(rs.value.toJson());
                    rs = keyIt.next();
                }
            }
            if (json["children"] != null) {
                json["children"] = json["children"].concat(menuItems);
            }
            else {
                json["children"] = menuItems;
            }
        }
        return json;
    }
    /**
     * Add component id to [[defIds]]
     * @param {?} id
     * @return {?}
     */
    trackDef(id) {
        this.defIds.push(id);
    }
    /**
     * @param {?} viewId
     * @return {?}
     */
    static hasIdAsCloseTargetOnInit(viewId) {
        return ViewComponent.closeOnInit.idSet.has(viewId);
    }
    /**
     * @param {?} viewType
     * @return {?}
     */
    static hasTypeAsCloseTargetOnInit(viewType) {
        return ViewComponent.closeOnInit.types.has(viewType);
    }
    /**
     * @return {?}
     */
    static hookClosePrevView2DynamicPagesService() {
        if (!ViewComponent.closeOnInit.hooked) {
            DynamicPagesService.onCreateViewCloser = (sessionService, viewType, routeId) => {
                ViewComponent.closePrevView(sessionService, routeId ? routeId : viewType);
            };
            ViewComponent.closeOnInit.hooked = true;
        }
    }
    /**
     * @param {?} sessionService
     * @param {?} target
     * @return {?}
     */
    static closePrevView(sessionService, target) {
        /** @type {?} */
        let view = null;
        if ((typeof target) == "string") {
            /** @type {?} */
            let screenId = /** @type {?} */ (target);
            if (ViewComponent.hasIdAsCloseTargetOnInit(screenId)) {
                view = sessionService.getMcoContainer().getViewById(screenId);
            }
        }
        else if (target instanceof Type) {
            /** @type {?} */
            let viewType = /** @type {?} */ (target);
            if (ViewComponent.hasTypeAsCloseTargetOnInit(viewType)) {
                view = _.find(sessionService.getMcoContainer().getViews(), v => v.constructor == viewType);
            }
        }
        //Vivify: if view has actionForwardName, do not close the view as we will call it handleActionForward() to refresh the screen.
        if (view && view.actionForwardName == null) {
            view.close();
        }
    }
    /**
     * Close previous version of this view (if this view is "re-open"). This is to support usage
     * of removing current view and replacing with new view
     * @param {?} viewId
     * @param {?=} delayDialogClose
     * @return {?}
     */
    closeView(viewId, delayDialogClose) {
        /** @type {?} */
        const checkScreenInique = viewId === this.id;
        /** @type {?} */
        const oldView = _.find(this.getSession().getMcoContainer().getViews(), (view) => {
            return view.id === viewId &&
                (checkScreenInique === false ||
                    (checkScreenInique === true &&
                        view.uniqueId !== this.uniqueId));
        });
        if (oldView != null) {
            //for case where we are the same screen, we should't call beforeDestroyCb to cleanup
            if (checkScreenInique === true) {
                oldView.beforeDestroyCb = null;
            }
            oldView.close(delayDialogClose);
        }
        if (!this.viewIsInitialized && checkScreenInique) {
            // This case is too late to close. This object's view is already exist, reused and un-closable!
            // To save this trying, and execute closing at router before create new view.
            if (!ViewComponent.closeOnInit.idSet.has(viewId)) {
                ViewComponent.closeOnInit.idSet.add(viewId);
            }
            /** @type {?} */
            let oType = /** @type {?} */ (this.constructor);
            if (!ViewComponent.closeOnInit.types.has(oType)) {
                ViewComponent.closeOnInit.types.add(oType);
            }
            ViewComponent.hookClosePrevView2DynamicPagesService();
        }
    }
    /**
     * Add a [[PopupMenuDirective]] to [[popupMenus]] property
     * @param {?} popupMenu Popup menu to add to internal [[popupMenus]] list
     * @return {?}
     */
    registerPopupMenu(popupMenu) {
        if (this.popupMenus == null) {
            this.popupMenus = [];
        }
        this.popupMenus.push(popupMenu);
    }
    /**
     * Check if [[popupMenus]] has 1 or more items
     * @return {?} True if [[popupMenus]] is defined and has at least 1 item
     */
    hasPopupMenu() {
        return this.popupMenus != null && this.popupMenus.length > 0;
    }
    /**
     * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
     * @return {?} Id of popup menu
     */
    getFirstPopupMenuId() {
        return this.popupMenus != null && this.popupMenus.length > 0 ? this.popupMenus[0].id : null;
    }
    /**
     * Delegate to [[BaseComponent]] findElementById method
     * @param {?} id Component ID
     * @return {?}
     */
    findElementById(id) {
        /** @type {?} */
        let comp = super.findElementById(id);
        if (comp == null && this._tableColumnsMap != null) {
            comp = this._tableColumnsMap.get(KeyUtils.toMapKey(id));
        }
        if (comp == null) {
            //check for inactive menu items
            comp = /** @type {?} */ (this.getInactiveMenuItem(id));
        }
        return comp;
    }
    /**
     * Stop change detection
     * @return {?}
     */
    freezeChangeDetection() {
        if (this.getChangeDetector() != null) {
            this.getChangeDetector().detach();
            this.changeDetectionFrozen = true;
        }
    }
    /**
     * Resume change detection if it has been stopped
     * @return {?}
     */
    unfreezeChangeDetection() {
        if (this.getChangeDetector() != null) {
            this.getChangeDetector().detectChanges();
            this.getChangeDetector().reattach();
        }
        this.changeDetectionFrozen = false;
    }
    /**
     * Check if change detection has been stopped
     * @return {?} True if change detection has been stopped
     */
    isChangeDetectionFrozen() {
        return this.changeDetectionFrozen === true;
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
    /**
     * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
     * @return {?}
     */
    detectChanges() {
        super.detectChanges();
        if (this.dialog != null) {
            this.dialog.detectChanges();
        }
    }
    /**
     * Mark this component for change detection
     * @return {?}
     */
    markForCheck() {
        super.markForCheck();
        if (this.dialog != null) {
            this.dialog.markForCheck();
        }
    }
    /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    showView() {
        if (this.dialog != null) {
            this.dialog.showView();
        }
        delete this.isMinimized;
    }
    /**
     * Minimize the [[dialog]] of this component
     * @return {?}
     */
    minimize() {
        if (this.dialog != null) {
            this.dialog.minimize(null);
        }
    }
    /**
     * Move this component to the top of the view stack
     * @return {?}
     */
    moveToTop() {
        this.getSession().getMcoContainer().reStackView(this.id), this.screenIndex;
    }
    /**
     * @param {?} menuItem
     * @return {?}
     */
    trackInactiveMenuItem(menuItem) {
        /** @type {?} */
        const id = menuItem.getId();
        /** @type {?} */
        const fauxMenuItem = new HTMLElementWrapper(null, "menuItem", null);
        fauxMenuItem.setAttribute("id", id);
        if (menuItem.item != null && menuItem.item.customAttributes != null) {
            /** @type {?} */
            const keys = _.keys(menuItem.item.customAttributes);
            for (const key of keys) {
                if (key !== "id") {
                    fauxMenuItem.setAttribute(key, menuItem.item.customAttributes[key]);
                }
            }
        }
        if (this._inactiveMenuItems == null) {
            this._inactiveMenuItems = new Map();
        }
        this._inactiveMenuItems.set(id, fauxMenuItem);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getInactiveMenuItem(id) {
        return this._inactiveMenuItems != null ? this._inactiveMenuItems.get(id) : null;
    }
    /**
     * @return {?}
     */
    cleanup() {
        super.cleanup();
        if (this._viewChildrenMap != null) {
            /** @type {?} */
            const cit = this._viewChildrenMap.values();
            /** @type {?} */
            let val = cit.next();
            while (val.done !== true) {
                //some children are not actual BaseComponent
                if (typeof val.value.emptyChildren === "function") {
                    val.value.emptyChildren();
                    val.value._isDying = true;
                }
                val = cit.next();
            }
        }
        super.emptyChildren();
    }
    /**
     * @return {?}
     */
    isModalDialog() {
        return this.dialog != null && (this.dialog.modal === true || this.dialog.modal === "true");
    }
    /**
     * Not implemented
     * @return {?}
     */
    handleActionForward() {
    }
    /**
     * screen index(0~)の文字列表現
     * @return {?}
     */
    getScreenIndex() {
        return (this.screenIndex === undefined || this.screenIndex === null)
            ? ''
            : this.screenIndex.toString();
    }
    /**
     * @return {?}
     */
    registerScreenIndex() {
        this.screenIndex = this.getSession().getMcoContainer().nextScreenIndex(this.baseScreenId);
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    setVisible(boo) {
        super.setVisible(boo);
        this.getSession().getMcoContainer().refreshBreadCrumb();
    }
}
ViewComponent.closeOnInit = { idSet: new Set(), types: new Set(), hooked: false };
ViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-dummy-view',
                template: ''
            }] }
];
/** @nocollapse */
ViewComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef }
];
ViewComponent.propDecorators = {
    dialog: [{ type: ViewChild, args: [DialogComponent,] }]
};
if (false) {
    /** @type {?} */
    ViewComponent.closeOnInit;
    /** @type {?} */
    ViewComponent.prototype.dialog;
    /** @type {?} */
    ViewComponent.prototype.routeUrl;
    /** @type {?} */
    ViewComponent.prototype.routeDeactivated;
    /** @type {?} */
    ViewComponent.prototype.mcos;
    /** @type {?} */
    ViewComponent.prototype.zIndex;
    /** @type {?} */
    ViewComponent.prototype.isDynamicPage;
    /** @type {?} */
    ViewComponent.prototype.isDestroyed;
    /** @type {?} */
    ViewComponent.prototype.canBeActiveView;
    /** @type {?} */
    ViewComponent.prototype.actionForwardName;
    /** @type {?} */
    ViewComponent.prototype.modal;
    /** @type {?} */
    ViewComponent.prototype.routeId;
    /** @type {?} */
    ViewComponent.prototype._viewInitializedSubject;
    /** @type {?} */
    ViewComponent.prototype.viewInitialized;
    /** @type {?} */
    ViewComponent.prototype.defIds;
    /** @type {?} */
    ViewComponent.prototype.popupMenus;
    /** @type {?} */
    ViewComponent.prototype.changeDetectionFrozen;
    /** @type {?} */
    ViewComponent.prototype.isMinimized;
    /** @type {?} */
    ViewComponent.prototype.skipBreadCrumb;
    /** @type {?} */
    ViewComponent.prototype.allowMultipleScreen;
    /** @type {?} */
    ViewComponent.prototype.screenIndex;
    /** @type {?} */
    ViewComponent.prototype.baseScreenId;
    /** @type {?} */
    ViewComponent.prototype.beforeDestroyCb;
    /** @type {?} */
    ViewComponent.prototype._inactiveMenuItems;
    /** @type {?} */
    ViewComponent.prototype._tableColumnsMap;
    /** @type {?} */
    ViewComponent.prototype._viewStatus;
    /** @type {?} */
    ViewComponent.prototype.viewRouteSet;
    /** @type {?} */
    ViewComponent.prototype.viewIsInitialized;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3ZpZXcvdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLFNBQVMsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQXVCLFVBQVUsRUFBYSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BLLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXJFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsT0FBTyxFQUFj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QUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pDOzs7O0lBQ0QsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDM0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVk7UUFDckIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUN6RDs7NEJBL1I0QixFQUFFLEtBQUssRUFBRyxJQUFJLEdBQUcsRUFBVSxFQUFFLEtBQUssRUFBRyxJQUFJLEdBQUcsRUFBdUIsRUFBRSxNQUFNLEVBQUcsS0FBSyxFQUFFOztZQXh3Qm5ILFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYjs7OztZQWxDUSxhQUFhLHVCQXVGakIsUUFBUSxZQUFJLFFBQVE7WUFyRWhCLGNBQWM7WUFuQjRFLFVBQVU7OztxQkFxQzFHLFNBQVMsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIFR5cGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEF0dHJpYnV0ZXNFbnVtIH0gZnJvbSAnLi4vYmFzZS9hdHRyaWJ1dGVzLmVudW0nO1xuXG5pbXBvcnQgeyBEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnLi4vYmFzZS9jb21wb25lbnQtdHlwZS5lbnVtJztcbmltcG9ydCB7IExhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi4vbGFiZWwvbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbWJvQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tYm8tYm94L2NvbWJvLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4uL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4uL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRBcmVhQ29tcG9uZW50IH0gZnJvbSAnLi4vdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBEeW5hbWljUGFnZXNTZXJ2aWNlIH0gZnJvbSAnLi9keW5hbWljLXBhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwVXRpbHMgfSBmcm9tICcuLi9iYXNlL2FwcC11dGlscyc7XG5cbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBIVE1MRWxlbWVudFdyYXBwZXIgfSBmcm9tICcuLi90cmVlLXRhYmxlL2h0bWwtZWxlbWVudC13cmFwcGVyJztcbmltcG9ydCB7IFVpRG9jdW1lbnQgfSBmcm9tICcuLi9iYXNlL3VpLWRvY3VtZW50JztcbmltcG9ydCB7IFBvcHVwTWVudURpcmVjdGl2ZSB9IGZyb20gJy4uL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vYmFzZS9sb2dnZXInO1xuaW1wb3J0IHsgS2V5VXRpbHMgfSBmcm9tICcuLi9iYXNlL2tleS11dGlscyc7XG5pbXBvcnQgeyBKYXZhVXRpbHMgfSBmcm9tICcuLi9qYXZhL2phdmEtdXRpbHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlTmFtZVZhbHVlIH0gZnJvbSAnLi4vYmFzZS9hdHRyaWJ1dGUtbmFtZS12YWx1ZSc7XG5pbXBvcnQgeyBNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4uL3BvcHVwLW1lbnUvbWVudS1pdGVtL21lbnUtaXRlbS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEJhc2UgcGFyZW50IGNvbXBvbmVudCBjbGFzcyB0aGF0IGFsbCBvdGhlciBzY3JlZW4gY29tcG9uZW50cyBpbmhlcml0IGZyb21cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtZHVtbXktdmlldycsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBWaWV3Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoRGlhbG9nQ29tcG9uZW50KSBkaWFsb2c6IERpYWxvZ0NvbXBvbmVudDtcbiAgcHJpdmF0ZSByb3V0ZVVybDogc3RyaW5nO1xuICBwcml2YXRlIHJvdXRlRGVhY3RpdmF0ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgbWNvczogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgekluZGV4OiBudW1iZXI7XG4gIGlzRHluYW1pY1BhZ2U6IGJvb2xlYW47XG4gIGlzRGVzdHJveWVkOiBib29sZWFuO1xuICBjYW5CZUFjdGl2ZVZpZXc6IGJvb2xlYW4gPSB0cnVlO1xuICBhY3Rpb25Gb3J3YXJkTmFtZTogc3RyaW5nO1xuICBtb2RhbDpzdHJpbmc7XG4gIHJvdXRlSWQ6IHN0cmluZzsgICAvL0ZvciByb3V0ZS5zZXJ2aWNlXG5cbiAgcHJpdmF0ZSBfdmlld0luaXRpYWxpemVkU3ViamVjdDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHZpZXdJbml0aWFsaXplZDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3ZpZXdJbml0aWFsaXplZFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBkZWZJZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cE1lbnVzOiBBcnJheTxQb3B1cE1lbnVEaXJlY3RpdmU+O1xuXG4gIC8vcHJpdmF0ZSBfZmluZEVsZW1lbnRDYWNoZTogYW55O1xuXG4gIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uRnJvemVuOiBib29sZWFuO1xuXG4gIGlzTWluaW1pemVkOiBib29sZWFuO1xuXG4gIHNraXBCcmVhZENydW1iOiBib29sZWFuO1xuXG4gIC8vYWxsb3cgdGhpcyBzYW1lIHNjcmVlbiB0byBsYXVuY2ggbXVsdGlwbGUgdGltZVxuICBhbGxvd011bHRpcGxlU2NyZWVuOiBib29sZWFuO1xuICBzY3JlZW5JbmRleDogbnVtYmVyID0gbnVsbDtcbiAgYmFzZVNjcmVlbklkOiBzdHJpbmc7IC8vaWQgZm9yIGdyb3VwaW5nIHNjcmVlbiAoYXZvaWRpbmcgc2NyZWVuaW5kZXgpXG5cbiAgLy9jYWxsYmFjayBmb3IgYW55IGN1c3RvbSBjbGVhbnVwXG4gIGJlZm9yZURlc3Ryb3lDYjogKGlkOiBzdHJpbmcpPT52b2lkO1xuXG5cbiAgLy9rZWVwIHRyYWNrIG9mIG1lbnUgaXRlbXMgKHRoYXQgYXJlIG5vdCBhY3RpdmUpIGFzIGFyZSBtZW51IGl0ZW1zIGFyZSBkZXN0cm95ZWQgYWZ0ZXIgaXQgaXMgY2xvc2VkLlxuICBwcml2YXRlIF9pbmFjdGl2ZU1lbnVJdGVtczogTWFwPHN0cmluZywgSFRNTEVsZW1lbnRXcmFwcGVyPjtcblxuICBwcml2YXRlIF90YWJsZUNvbHVtbnNNYXA6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgX3ZpZXdTdGF0dXM6IG51bWJlcjtcblxuICBwcml2YXRlIHZpZXdSb3V0ZVNldDogYm9vbGVhbjtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZil7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgbnVsbCk7XG4gICAgdGhpcy5hY3Rpb25Gb3J3YXJkTmFtZSA9IHRoaXMuZ2V0SWQoKTtcbiAgfVxuXG4gIHZpZXdJc0luaXRpYWxpemVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTZXQgW1tyb3V0ZVVybF1dIHByb3BlcnR5IHZhbHVlLiBJZiBbW2RpYWxvZ11dIGV4aXN0cywgc2V0IGl0J3Mgcm91dGUgVVJMXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIHNldFJvdXRlVXJsKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZVVybCA9IHVybDtcblxuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy5zZXRWaWV3Um91dGVVcmwodXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbcm91dGVVcmxdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcmV0dXJucyBSb3V0ZSBVUkxcbiAgICovXG4gIGdldFJvdXRlVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVVcmw7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiByb3V0ZSBpcyBkZWFjdGl2YXRlZC5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiByb3V0ZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgaXNSb3V0ZURlYWN0aXZhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnJvdXRlRGVhY3RpdmF0ZWQgPT09IHRydWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY2FuQmVBY3RpdmVWaWV3ICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIH1cblxuICAgIC8vYWRkIHZpZXcgdG8gc3RhY2tcbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5yZWdpc3RlclZpZXcodGhpcyk7XG5cbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuYWZ0ZXJEaWFsb2dJbml0KCk7XG5cbiAgICBpZiAodGhpcy5wb3B1cE1lbnVzICE9IG51bGwpIHtcbiAgICAgIF8uZm9yRWFjaCh0aGlzLnBvcHVwTWVudXMsIChwb3B1cE1lbnUpPT5wb3B1cE1lbnUuY29udmVydFN1Yk1lbnVJdGVtcyh0aGlzLmlkKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21wb25lbnRJbml0aWFsaXplKCk7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cpIHtcbiAgICAgIHRoaXMuZGlhbG9nLnNldFZpZXdSb3V0ZVVybCh0aGlzLnJvdXRlVXJsKTtcbiAgICAgIHRoaXMudmlld1JvdXRlU2V0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5yZVN0YWNrVmlldyh0aGlzLmlkLCB0aGlzLnNjcmVlbkluZGV4KTtcblxuICAgIHRoaXMuX3ZpZXdJbml0aWFsaXplZFN1YmplY3QubmV4dCgpO1xuICAgIHRoaXMudmlld0lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cblxuICBwcm90ZWN0ZWQgYWZ0ZXJEaWFsb2dJbml0KCkge1xuICAgIGlmICh0aGlzLmRpYWxvZykge1xuICAgICAgLy9nZXQgaWQgb2YgZGlhbG9nIGFzIG91ciBpZFxuICAgICAgdGhpcy5pZCA9IHRoaXMuZGlhbG9nLmdldElkKCk7XG4gICAgICB0aGlzLmRpYWxvZy5zY3JlZW5JbmRleCA9IHRoaXMuc2NyZWVuSW5kZXg7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5kaWFsb2cubW9kYWwgPT09IFwiYm9vbGVhblwiKXtcbiAgICAgICAgdGhpcy5tb2RhbCA9IEphdmFVdGlscy5ib29sZWFuVG9TdHJpbmcodGhpcy5kaWFsb2cubW9kYWwpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLmRpYWxvZy5tb2RhbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGFsICE9IG51bGwgJiYgKHRoaXMubW9kYWwgPT09IFwidHJ1ZVwiIHx8IHRoaXMubW9kYWwgPT09IFwiZmFsc2VcIikpIHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50QXR0cmlidXRlQnlJZCh0aGlzLmlkLCAnbW9kYWwnLCB0aGlzLm1vZGFsKTtcbiAgICAgICAgdGhpcy5zZXRNb2RhbE1vZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLm1vZGFsID0gXCJmYWxzZVwiO1xuICAgICAgICB0aGlzLm1vZGFsID0gdGhpcy5kaWFsb2cubW9kYWw7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZUJ5SWQodGhpcy5pZCwgJ21vZGFsJywgXCJmYWxzZVwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9wdXBNZW51cyAhPSBudWxsKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBvcHVwTWVudXMsIChwb3B1cE1lbnUpPT5wb3B1cE1lbnUuY29udmVydFN1Yk1lbnVJdGVtcyh0aGlzLmlkKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlhbG9nLnJlc2V0SWQoKTtcblxuICAgICAgaWYgKHRoaXMudmlld1JvdXRlU2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLnNldFZpZXdSb3V0ZVVybCh0aGlzLnJvdXRlVXJsKTtcbiAgICAgICAgdGhpcy52aWV3Um91dGVTZXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNldCBtb2RhbCBDU1MgYW5kIGRpYWxvZydzIG1vZGFsIHByb3BlcnR5IHZhbHVlIHRvIHRydWUuXG4gICAqIE1ha2UgdmlldyBjb21wb25lbnQgZGlzcGxheSBhcyBtb2RhbFxuICAgKi9cbiAgc2V0TW9kYWxNb2RlKCl7XG4gICAgaWYgKHRoaXMubW9kYWwgPT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuZGlhbG9nW1wiZWxlbWVudFJlZlwiXS5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9IFwibW9kYWwgZmFkZSBpblwiO1xuICAgICAgdGhpcy5kaWFsb2dbXCJlbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI7XG4gICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVCeUlkKHRoaXMuaWQsICdtb2RhbCcsIHRoaXMubW9kYWwpO1xuICAgICAgdGhpcy5kaWFsb2cubW9kYWwgPSB0aGlzLm1vZGFsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgbGlmZWN5Y2xlLiBDbGVhciBhbGwgcmVmZXJlbmNlc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuYmVmb3JlRGVzdHJveUNiICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYmVmb3JlRGVzdHJveUNiKHRoaXMuZ2V0SWQoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5hY3RpdmVNZW51SXRlbXMgPSBudWxsO1xuXG4gICAgdGhpcy5yb3V0ZURlYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAvL3JlbW92ZSB2aWV3IGZyb20gc3RhY2tcbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5yZW1vdmVWaWV3KHRoaXMpO1xuXG4gICAgdGhpcy5tY29zLmZvckVhY2gobWNvPT50aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5yZW1vdmVNY28obWNvKSk7XG4gICAgdGhpcy5tY29zLmNsZWFyKCk7XG4gICAgZGVsZXRlIHRoaXMubWNvcztcblxuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICBkZWxldGUgdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lcjtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIHRoaXMuZGlhbG9nO1xuICAgIH1cblxuICAgIHRoaXMuaXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldEluamVjdG9yKER5bmFtaWNQYWdlc1NlcnZpY2UpLnJlbW92ZVZpZXcodGhpcyk7XG5cblxuICAgIF8uZm9yRWFjaCh0aGlzLmRlZklkcywgKGlkKT0+e1xuICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZGVsZXRlRGVmKGlkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGVmSWRzID0gbnVsbDtcbiAgICB0aGlzLnBvcHVwTWVudXMgPSBudWxsO1xuXG4gICAgLy8gaWYgKHRoaXMuX2ZpbmRFbGVtZW50Q2FjaGUgIT0gbnVsbCkge1xuICAgIC8vICAgdGhpcy5fZmluZEVsZW1lbnRDYWNoZS5jbGVhcigpO1xuICAgIC8vIH1cblxuICAgIC8vIHRoaXMuX2ZpbmRFbGVtZW50Q2FjaGUgPSBudWxsO1xuXG4gICAgdGhpcy5fdGFibGVDb2x1bW5zTWFwID0gbnVsbDtcblxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGUgdG8gW1tib2R5SW5pdF1dXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcG9uZW50SW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmJvZHlJbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQncyB0YWcgbmFtZS4gSW1wbGVtZW50YXRpb24gb2YgW1tCYXNlQ29tcG9uZW50XV0gbWV0aG9kXG4gICAqIEByZXR1cm5zIE5hbWUgb2YgdGFnXG4gICAqL1xuICBnZXRUYWdOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd2dC1kdW1teS12aWV3JztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3QgaW1wbGVtZW50ZWRcbiAgICovXG4gIGJvZHlJbml0KCkge1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBRdWVyeSB0aGUgXCJlbGVtZW50XCIgdmlhIHNlbGVjdEZuIGZ1bmN0aW9uLCB0aGVuIHNldCB0aGUgYXR0cmlidXRlIG9mIHRoZSBlbGVtZW50LiBJZiBmb3VuZFxuICAgKiBzZXQgdGhlIGF0dHJpYnV0ZSB7YXR0cmlidXRlfSB3aXRoIHZhbHVlIHt2YWx1ZX1cbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdG9yRm5cbiAgICovXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGUoXG4gICAgc2VsZWN0b3JGbjogKChtYXA6IE1hcDxzdHJpbmcsIEJhc2VDb21wb25lbnQ+KT0+QmFzZUNvbXBvbmVudCksXG4gICAgYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSxcbiAgICB2YWx1ZTogYW55XG4gICkge1xuICAgIGNvbnN0IGNvbXAgPSBzZWxlY3RvckZuKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgTG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBzZXQgYXR0cmlidXRlLCBjb21wb25lbnQgaXMgbnVsbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICogU2V0IFtbZGlzYWJsZWRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAqIEBwYXJhbSBib28gVmFsdWUgZm9yIGRpc2FibGVkIHByb3BlcnR5XG4gICovXG4gIHNldERpc2FibGVkKGJvbzogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBib287XG4gICAgdGhpcy5kaWFsb2cuc2V0RGlzYWJsZWQoYm9vKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFF1ZXJ5IHRoZSBcImVsZW1lbnRcIiB2aWEgc2VsZWN0Rm4gZnVuY3Rpb24sIHRoZW4gc2V0IHRoZSBhdHRyaWJ1dGUgb2YgdGhlIGVsZW1lbnQuIElmIGZvdW5kXG4gICAqIHNldCB0aGUgYXR0cmlidXRlIHthdHRyaWJ1dGV9IHdpdGggdmFsdWUge3ZhbHVlfVxuICAgKlxuICAgKiBAcGFyYW0gc2VsZWN0b3JGblxuICAgKi9cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZUJ5SWQoXG4gICAgY29tcElkOiBzdHJpbmcsXG4gICAgYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZyxcbiAgICB2YWx1ZTogYW55XG4gICkge1xuXG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVElUTEUgfHwgYXR0cmlidXRlID09PSAndGl0bGUnKSB7XG4gICAgICB0aGlzLnNldFRpdGxlKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGNvbXBJZCA9PT0gdGhpcy5nZXRJZCgpKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNvbXAgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChjb21wSWQpO1xuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIC8vaXMgdGhpcyBmb3IgZGVmP1xuICAgICAgICBjb25zdCBjb21wRGVmID0gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RGVmKGNvbXBJZCk7XG5cbiAgICAgICAgaWYgKGNvbXBEZWYgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbXBEZWYuYXR0cmlidXRlW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGNvbXAgPSBVaURvY3VtZW50LmdldE1lbnVDb21wb25lbnQoY29tcElkKTtcblxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExvZ2dlci53YXJuKGBVbmFibGUgdG8gc2V0IGF0dHJpYnV0ZSwgY29tcG9uZW50IHdpdGggaWQ6ICR7Y29tcElkfSBpcyBub3QgZm91bmRgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFdob2xlc2FsZSBzZXQgYXR0cmlidXRlcyB0byBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gY29tcElkIGVsZW1lbnQgdG8gc2V0IGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlcyBhbiBhcnJheSBvZiBBdHRyaWJ1dGVzRW51bSB0byBiZSBzZXRcbiAgICovXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGVzQnlJZChcbiAgICBjb21wSWQ6IHN0cmluZyxcbiAgICBhdHRyaWJ1dGVzOiBBcnJheTxBdHRyaWJ1dGVOYW1lVmFsdWU+XG4gICkge1xuXG4gICAgaWYgKGNvbXBJZCA9PT0gdGhpcy5nZXRJZCgpKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbXAgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChjb21wSWQpO1xuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIC8vaXMgdGhpcyBmb3IgZGVmP1xuICAgICAgICBjb25zdCBjb21wRGVmID0gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RGVmKGNvbXBJZCk7XG5cbiAgICAgICAgaWYgKGNvbXBEZWYgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb21wRGVmLmF0dHJpYnV0ZVthdHRyLmF0dHJpYnV0ZU5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgTG9nZ2VyLndhcm4oYFVuYWJsZSB0byBzZXQgYXR0cmlidXRlLCBjb21wb25lbnQgd2l0aCBpZDogJHtjb21wSWR9IGlzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBhdHRyaWJ1dGUgZnJvbSBhIGNvbXBvbmVudCB3aXRoIGEgc3BlY2lmaWMgaWRcbiAgICogQHBhcmFtIGNvbXBJZCBDb21wb25lbnQgaWRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBOYW1lIG9mIGF0dHJpYnV0ZSB0byByZW1vdmUgZnJvbSBjb21wb25lbnRcbiAgICovXG4gIHJlbW92ZUVsZW1lbnRBdHRyaWJ1dGVCeUlkKFxuICAgIGNvbXBJZDogc3RyaW5nLFxuICAgIGF0dHJpYnV0ZTogQXR0cmlidXRlc0VudW0gfCBzdHJpbmdcbiAgKSB7XG5cbiAgICBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5USVRMRSB8fCBhdHRyaWJ1dGUgPT09ICd0aXRsZScpIHtcbiAgICAgIHRoaXMuc2V0VGl0bGUoXCJcIik7XG4gICAgfSBlbHNlIGlmIChjb21wSWQgPT09IHRoaXMuZ2V0SWQoKSkge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29tcCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCk7XG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChjb21wID09IG51bGwpIHtcbiAgICAgICAgTG9nZ2VyLndhcm4oYFVuYWJsZSB0byByZW1vdmUgYXR0cmlidXRlLCBjb21wb25lbnQgd2l0aCBpZDogJHtjb21wSWR9IGlzIG5vdCBmb3VuZGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgcmFkaW8gYnV0dG9uIGdyb3VwIGJ5IElEIGFuZCBhZGRzIGFuIGF0dHJpYnV0ZSB0byBhbGwgW1tSYWRpb0J1dHRvbkNvbXBvbmVudF1dIGVsZW1lbnRzIGluIHRoZSBncm91cFxuICAgKiBAcGFyYW0gcmFkaW9Hcm91cElkXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGUgSFRNTCBhdHRyaWJ1dGUgbmFtZSB0byBiZSBzZXRcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNldCBvbiBIVE1MIGF0dHJpYnV0ZVxuICAgKi9cbiAgc2V0UmFkaW9Hcm91cEF0dHJpYnV0ZShyYWRpb0dyb3VwSWQ6IHN0cmluZywgYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IHJhZGlvcyA9IF8uZmlsdGVyKEFycmF5LmZyb20odGhpcy5jaGlsZHJlbi52YWx1ZXMoKSksIChjaGlsZCk9PntcbiAgICAgIHJldHVybiBjaGlsZCBpbnN0YW5jZW9mIFJhZGlvQnV0dG9uQ29tcG9uZW50ICYmIChjaGlsZCBhcyBSYWRpb0J1dHRvbkNvbXBvbmVudCkuZ3JvdXAgPT09IHJhZGlvR3JvdXBJZDtcbiAgICB9KTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChyYWRpb3MgIT0gbnVsbCAmJiByYWRpb3MubGVuZ3RoID4gMCkge1xuICAgICAgXy5mb3JFYWNoKHJhZGlvcywgKHJhZGlvKT0+e1xuICAgICAgICByYWRpby5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiBhbiBIVE1MIGF0dHJpYnV0ZSBvZiBhIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gY29tcElkIElkIG9mIGNvbXBvbmVudCB0byBnZXQgYXR0cmlidXRlIGZyb21cbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBOYW1lIG9mIEhUTUwgYXR0cmlidXRlIHRvIGdldFxuICAgKi9cbiAgZ2V0RWxlbWVudEF0dHJpYnV0ZUJ5SWQoY29tcElkOiBzdHJpbmcsIGF0dHJpYnV0ZTogQXR0cmlidXRlc0VudW0gfCBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChjb21wSWQpO1xuXG4gICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbXAuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogRmluZCBbW0NvbWJvYm94Q29tcG9uZW50XV0gYnkgaWQgYW5kIGNhbGwgaXQncyBpbml0aWFsaXplQ29tYm9ib3hWYWx1ZXMgbWV0aG9kLlxuICAgKiBAcGFyYW0gY29tcElkIENvbXBvbmVudCBJRCB0byBpbml0aWFsaXplXG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBzZXQgb24gY29tYm9ib3hcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBOYW1lIG9mIGF0dHJpYnV0ZSB0byBzZXQgb24gY29tYm9ib3hcbiAgICovXG4gIGluaXRpYWxpemVDb21ib0JveFZhbHVlcyhcbiAgICBjb21wSWQ6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGF0dHJpYnV0ZTogYW55XG4gICkge1xuICAgIGNvbnN0IGNvbWJvQm94OiBDb21ib0JveENvbXBvbmVudCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCkgYXMgQ29tYm9Cb3hDb21wb25lbnQ7XG5cbiAgICBpZiAoY29tYm9Cb3ggPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGZpbmQgY29tYm9ib3g6ICR7Y29tcElkfSBgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tYm9Cb3guaW5pdGlhbGl6ZUNvbWJvYm94VmFsdWVzKHZhbHVlKTtcblxuICAgICAgaWYgKGF0dHJpYnV0ZSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVbXCJ3aWR0aFwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgY29tYm9Cb3guc2V0Q29udHJvbFdpZHRoKGF0dHJpYnV0ZVtcIndpZHRoXCJdKTtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVbXCJvbkNvbW1hbmRcIl0gIT0gbnVsbCkge1xuICAgICAgICAgIGNvbWJvQm94LnNldE9uQ29tbWFuZChhdHRyaWJ1dGVbXCJvbkNvbW1hbmRcIl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgW1tDb21ib2JveENvbXBvbmVudF1dIHNlbGVjdGVkIGl0ZW0gdGhhdCBtYXRjaGVzIHZhbHVlXG4gICAqIEBwYXJhbSBjb21wSWQgW1tDb21ib2JveENvbXBvbmVudF1dIGlkXG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBzZXQgYXMgc2VsZWN0ZWRcbiAgICovXG4gIHNlbGVjdENvbWJvQm94SXRlbShjb21wSWQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGNvbWJvQm94OiBDb21ib0JveENvbXBvbmVudCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCkgYXMgQ29tYm9Cb3hDb21wb25lbnQ7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoY29tYm9Cb3ggPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGZpbmQgY29tYm9ib3g6ICR7Y29tcElkfSBgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tYm9Cb3guc2V0U2VsZWN0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGNvbXBvbmVudCBhbmQgZm9jdXMgaXRcbiAgICogQHBhcmFtIGNvbXBJZCBDb21wb25lbnQgaWRcbiAgICovXG4gIHNldEZvY3VzKGNvbXBJZDogc3RyaW5nID0gbnVsbCkge1xuICAgIGlmIChjb21wSWQgPT0gdGhpcy5pZCkge1xuICAgICAgdGhpcy5zaG93VmlldygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb21wSWQgPT0gbnVsbCB8fCBjb21wSWQgPT0gJycpIHtcbiAgICAgIHRoaXMucmVxdWVzdEZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbXAgPSBVaURvY3VtZW50LmZpbmRFbGVtZW50QnlJZChjb21wSWQpO1xuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byBzZXRGb2N1cywgY29tcG9uZW50IHdpdGggaWQ6ICR7Y29tcElkfSBpcyBub3QgZm91bmRgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAucmVxdWVzdEZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aXRsZSBvbiBbW0RpYWxvZ0NvbXBvbmVudF1dXG4gICAqIEBwYXJhbSB0aXRsZSBUaXRsZSBvZiBkaWFsb2dcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSB0aXRsZTtcblxuICAgICAgdGhpcy5kaWFsb2cubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgW1tkaWFsb2ddXSBpZiBpdCBleGlzdHMgb24gdGhpcyBjb21wb25lbnRcbiAgICogQHBhcmFtIGRlbGF5RGlhbG9nQ2xvc2VcbiAgICovXG4gIGNsb3NlKGRlbGF5RGlhbG9nQ2xvc2U/OiBib29sZWFuKSB7XG5cbiAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmRpYWxvZy5pZCk7XG4gICAgZGlhbG9nLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogbm9uZTtcIik7XG4gICAgZGlhbG9nLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLl92aWV3U3RhdHVzID0gMTtcblxuICAgIHRoaXMuY2xlYW51cCgpO1xuXG4gICAgaWYgKHRoaXMuZGlhbG9nICE9IG51bGwpIHtcbiAgICAgIGlmKGRlbGF5RGlhbG9nQ2xvc2UpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaWFsb2cuY2xvc2UobnVsbCwgZmFsc2UpO1xuICAgICAgICB9LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLmNsb3NlKG51bGwsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0R5bmFtaWNQYWdlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRJbmplY3RvcihEeW5hbWljUGFnZXNTZXJ2aWNlKS5yZW1vdmVWaWV3KHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5nZXRTZXNzaW9uKCkgIT0gbnVsbCAmJiB0aGlzLmdldFNlc3Npb24oKS5nZXRSb3V0ZU5hdmlnYXRvclNlcnZpY2UoKSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldFJvdXRlTmF2aWdhdG9yU2VydmljZSgpLmRlc3Ryb3lSb3V0ZSh0aGlzLnJvdXRlVXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gY2hhbmdlIHJvdXRlLCBzZXNzaW9uIG9yIHJvdXRlIG5hdmlnYXRpb24gc2VydmljZSBpcyBub3QgZGVmaW5lZFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGNsb3NlIFZpZXdDb21wb25lbnQsIERpYWxvZ0NvbXBvbmVudCBub3QgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IG5hbWUgb2YgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIGdldExvY2FsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIndpbmRvd1wiO1xuICB9XG5cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW5kIGFkZCBhbiBNQ09cbiAgICogQHBhcmFtIG1jb05hbWVcbiAgICogQHBhcmFtIG1jb0NsYXNzXG4gICAqL1xuICBjcmVhdGVNY28obWNvTmFtZTogc3RyaW5nLCBtY29DbGFzczogVHlwZTxhbnk+KTogYW55IHtcbiAgICBsZXQgbWNvOiBhbnkgPSB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5nZXRNY28obWNvTmFtZSk7XG5cbiAgICAvL2NoZWNrIHRvIHNlZSBpZiBNQ08gYWxyZWFkeSBleGlzdHM/XG4gICAgaWYgKG1jbyAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJNQ08gXCIgKyBtY29OYW1lICsgXCIgaXMgYWxyZWFkeSBleGlzdHMsIHVzZSBleGlzdGluZyBvbmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1jbyA9IG5ldyBtY29DbGFzcyh0aGlzKTtcbiAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlZ2lzdGVyTWNvKG1jb05hbWUsIG1jbyk7XG5cbiAgICAgIC8vYWRkIG1jbyBuYW1lIGZvciB0cmFja2luZyAodG8gYmUgY2xlYW5lZCBhbmQgcmVtb3ZlZCBsYXRlcilcbiAgICAgIHRoaXMubWNvcy5hZGQobWNvTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1jbztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTUNPIGZyb20gY2xpZW50IHNlc3Npb25cbiAgICogQHBhcmFtIG1jb05hbWUgTmFtZSBvZiBNQ08gdG8gZ2V0XG4gICAqIEByZXR1cm5zIE1DT1xuICAgKi9cbiAgZ2V0TWNvKG1jb05hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLmdldE1jbyhtY29OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzdHJpbmcgYW5kIGNyZWF0ZSBjb21wb25lbnQgYmFzZSBvbiBpdFxuICAgKlxuICAgKiBAcGFyYW0gZG9tU3RyaW5nXG4gICAqL1xuICBjcmVhdGVDb21wb25lbnQoZG9tU3RyaW5nOiBzdHJpbmcpIHtcbiAgICAvL3RleHRGaWVsZFxuICAgIC8vbGFiZWxcbiAgICAvL3BhbmVsXG4gICAgLy9ob3Jpem9udGFsU2VwYXJhdG9yXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBBcHBVdGlscy5wYXJzZURvbShkb21TdHJpbmcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRE8gTk9UIFVTRSBUSElTLCBleGlzdHMgb25seSBmb3IgbGVnYWN5IHN1cHBvcnQsIHVzZSBuZ0lmIGluc3RlYWRcbiAgICogQHBhcmFtIGNvbXBvbmVudFR5cGVcbiAgICovXG4gIF9jcmVhdGVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGUpOiBCYXNlQ29tcG9uZW50IHtcbiAgICBsZXQgY29tcDogQmFzZUNvbXBvbmVudCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCAmJiB0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbXBGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgPSB0aGlzLmdldFNlc3Npb24oKS5nZXRJbmplY3RvcihDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xuXG4gICAgICAgIGlmIChjb21wRmFjdG9yeSAhPSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNvbXBSZWY6IENvbXBvbmVudFJlZjxCYXNlQ29tcG9uZW50PjtcbiAgICAgICAgICBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5MQUJFTCkge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KExhYmVsQ29tcG9uZW50KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkJVVFRPTikge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEJ1dHRvbkNvbXBvbmVudCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DT01CT0JPWCkge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KENvbWJvQm94Q29tcG9uZW50KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlRFWFRfRklFTEQpIHtcbiAgICAgICAgICAgIGNvbXBSZWYgPSB0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wRmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUZXh0RmllbGRDb21wb25lbnQpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQ0hFQ0tCT1gpIHtcbiAgICAgICAgICAgIGNvbXBSZWYgPSB0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wRmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDaGVja2JveENvbXBvbmVudCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5SQURJTykge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFJhZGlvQnV0dG9uQ29tcG9uZW50KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlRFWFRBUkVBKSB7XG4gICAgICAgICAgICBjb21wUmVmID0gdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoVGV4dEFyZWFDb21wb25lbnQpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBjb21wb25lbnQgdHlwZTogXCIgKyBjb21wb25lbnRUeXBlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29tcFJlZiAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wID0gY29tcFJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbXAuY29tcFJlZiA9IGNvbXBSZWY7XG4gICAgICAgICAgICBjb21wLmNvbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJmYWlsIHRvIGNyZWF0ZSBjb21wb25lbnQ6IFwiICsgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBETyBOT1QgVVNFIFRISVMhIEV4aXN0cyBvbmx5IGZvciBsZWdhY3kgc3VwcG9ydFxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIF9yZW1vdmVDb21wb25lbnQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5maW5kRWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgaWYgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgIGNoaWxkLmRlc3Ryb3lDb21wb25lbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmRpYWxvZyAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIgIT0gbnVsbCAmJlxuICAgICAgICAodGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciBhcyBhbnkpLl9lbWJlZGRlZFZpZXdzICE9IG51bGwgJiZcbiAgICAgICAgQXJyYXkuaXNBcnJheSgodGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciBhcyBhbnkpLl9lbWJlZGRlZFZpZXdzKSAmJlxuICAgICAgICAodGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciBhcyBhbnkpLl9lbWJlZGRlZFZpZXdzLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGV2ID0gKHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIgYXMgYW55KS5fZW1iZWRkZWRWaWV3cztcblxuICAgICAgICAgIGZvciAobGV0IHYgb2YgZXYpIHtcbiAgICAgICAgICAgIGlmICh2Lm5vZGVzICYmIEFycmF5LmlzQXJyYXkodi5ub2RlcykgJiYgdi5ub2Rlcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgZm9yIChsZXQgbiBvZiB2Lm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG4uaW5zdGFuY2UgIT0gbnVsbCAmJiBuLmluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuLmluc3RhbmNlLmRlc3Ryb3lDb21wb25lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5pbnN0YW5jZS5kZXN0cm95Q29tcG9uZW50KClcblxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKEFwcFV0aWxzLmVuYWJsZUxvZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJSZW1vdmVkIGNvbXBvbmVudDogXCIgKyBpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIHZpZXcgY2FuIGJlIGFjdGl2ZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHZpZXcgY2FuIGJlIGFjdGl2ZSBvciBwYXJlbnQgaXMgbnVsbFxuICAgKi9cbiAgaXNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhbkJlQWN0aXZlVmlldyAhPT0gZmFsc2UgPyB0cnVlIDogKHRoaXMuZ2V0UGFyZW50KCkgPT0gbnVsbCA/IHRydWUgOiBmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIHZpZXcgY2FuJ3QgYmUgYWN0aXZlIHZpZXdcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB2aWV3IGNhbid0IGJlIGFjdGl2ZSB2aWV3XG4gICAqL1xuICBpc05vbmVBY3RpdmVWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhbkJlQWN0aXZlVmlldyA9PT0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhIGR5bmFtaWMgcGFnZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGl0IGlzIGEgZHluYW1pYyBwYWdlXG4gICAqL1xuICBpc0R5bmFtaWNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzRHluYW1pY1BhZ2UgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbRGlhbG9nQ29tcG9uZW50XV0gaW5zdGFuY2Ugei1pbmRleFxuICAgKiBAcGFyYW0gbmV3WkluZGV4XG4gICAqL1xuICB1cGRhdGVaSW5kZXgobmV3WkluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCAmJiB0aGlzLmlzRGVzdHJveWVkICE9PSB0cnVlICYmIHRoaXMuZGlzYWJsZWQgIT0gdHJ1ZSkge1xuICAgICAgdGhpcy5kaWFsb2cudXBkYXRlWkluZGV4KG5ld1pJbmRleCk7XG4gICAgICB0aGlzLnpJbmRleCA9IG5ld1pJbmRleDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3QgSlNPTiBtZXRhZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbjogYW55ID0gc3VwZXIudG9Kc29uKCk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwic2NyZWVuSW5kZXhcIiwgdGhpcy5nZXRTY3JlZW5JbmRleCgpKTtcblxuICAgIGlmICh0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5hY3RpdmVWaWV3KCkuZ2V0SWQoKSA9PT0gdGhpcy5nZXRJZCgpICYmIFVpRG9jdW1lbnQubWVudUl0ZW1FbGVtZW50TWFwICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG1lbnVJdGVtczogQXJyYXk8e30+ID0gW107XG4gICAgICBjb25zdCBrZXlTZXQgPSBVaURvY3VtZW50Lm1lbnVJdGVtRWxlbWVudE1hcC5rZXlzKCk7XG4gICAgICBsZXQga2V5SXQgPSBrZXlTZXQubmV4dCgpO1xuXG4gICAgICB3aGlsZShrZXlJdC5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgIG1lbnVJdGVtcy5wdXNoKFVpRG9jdW1lbnQubWVudUl0ZW1FbGVtZW50TWFwLmdldChrZXlJdC52YWx1ZSkudG9Kc29uKCkpO1xuICAgICAgICBrZXlJdCA9IGtleVNldC5uZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcyAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGtleUl0ID0gdGhpcy5faW5hY3RpdmVNZW51SXRlbXMudmFsdWVzKCk7XG4gICAgICAgIGxldCBycyA9IGtleUl0Lm5leHQoKTtcblxuICAgICAgICB3aGlsZShycy5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgICAgbWVudUl0ZW1zLnB1c2gocnMudmFsdWUudG9Kc29uKCkpO1xuICAgICAgICAgIHJzID0ga2V5SXQubmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChqc29uW1wiY2hpbGRyZW5cIl0gIT0gbnVsbCkge1xuICAgICAgICBqc29uW1wiY2hpbGRyZW5cIl0gPSBqc29uW1wiY2hpbGRyZW5cIl0uY29uY2F0KG1lbnVJdGVtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqc29uW1wiY2hpbGRyZW5cIl0gPSBtZW51SXRlbXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbXBvbmVudCBpZCB0byBbW2RlZklkc11dXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgdHJhY2tEZWYoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuZGVmSWRzLnB1c2goaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2xvc2VPbkluaXQgPSB7IGlkU2V0IDogbmV3IFNldDxzdHJpbmc+KCksIHR5cGVzIDogbmV3IFNldDxUeXBlPFZpZXdDb21wb25lbnQ+PigpLCBob29rZWQgOiBmYWxzZSB9O1xuXG4gIHN0YXRpYyBoYXNJZEFzQ2xvc2VUYXJnZXRPbkluaXQodmlld0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gVmlld0NvbXBvbmVudC5jbG9zZU9uSW5pdC5pZFNldC5oYXModmlld0lkKTtcbiAgfVxuXG4gIHN0YXRpYyBoYXNUeXBlQXNDbG9zZVRhcmdldE9uSW5pdCh2aWV3VHlwZTogVHlwZTxWaWV3Q29tcG9uZW50Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0LnR5cGVzLmhhcyh2aWV3VHlwZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBob29rQ2xvc2VQcmV2VmlldzJEeW5hbWljUGFnZXNTZXJ2aWNlKCkge1xuICAgIGlmKCFWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0Lmhvb2tlZCkge1xuICAgICAgRHluYW1pY1BhZ2VzU2VydmljZS5vbkNyZWF0ZVZpZXdDbG9zZXIgPSAoc2Vzc2lvblNlcnZpY2UsIHZpZXdUeXBlLCByb3V0ZUlkKSA9PiB7XG4gICAgICAgIFZpZXdDb21wb25lbnQuY2xvc2VQcmV2VmlldyhzZXNzaW9uU2VydmljZSwgcm91dGVJZCA/IHJvdXRlSWQgOiB2aWV3VHlwZSk7XG4gICAgICB9O1xuICAgICAgVmlld0NvbXBvbmVudC5jbG9zZU9uSW5pdC5ob29rZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZVByZXZWaWV3KHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgdGFyZ2V0OiBzdHJpbmd8VHlwZTxWaWV3Q29tcG9uZW50Pikge1xuICAgIGxldCB2aWV3OiBWaWV3Q29tcG9uZW50ID0gbnVsbDtcbiAgICBpZigodHlwZW9mIHRhcmdldCkgPT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IHNjcmVlbklkOiBzdHJpbmcgPSB0YXJnZXQgYXMgc3RyaW5nO1xuICAgICAgaWYoVmlld0NvbXBvbmVudC5oYXNJZEFzQ2xvc2VUYXJnZXRPbkluaXQoc2NyZWVuSWQpKSB7XG4gICAgICAgIHZpZXcgPSBzZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5nZXRWaWV3QnlJZChzY3JlZW5JZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKHRhcmdldCBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgIGxldCB2aWV3VHlwZTogVHlwZTxWaWV3Q29tcG9uZW50PiA9IHRhcmdldCBhcyBUeXBlPFZpZXdDb21wb25lbnQ+O1xuICAgICAgaWYoVmlld0NvbXBvbmVudC5oYXNUeXBlQXNDbG9zZVRhcmdldE9uSW5pdCh2aWV3VHlwZSkpIHtcbiAgICAgICAgdmlldyA9IF8uZmluZChzZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5nZXRWaWV3cygpLCB2ID0+IHYuY29uc3RydWN0b3IgPT0gdmlld1R5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vVml2aWZ5OiBpZiB2aWV3IGhhcyBhY3Rpb25Gb3J3YXJkTmFtZSwgZG8gbm90IGNsb3NlIHRoZSB2aWV3IGFzIHdlIHdpbGwgY2FsbCBpdCBoYW5kbGVBY3Rpb25Gb3J3YXJkKCkgdG8gcmVmcmVzaCB0aGUgc2NyZWVuLlxuICAgIGlmKHZpZXcgJiYgdmlldy5hY3Rpb25Gb3J3YXJkTmFtZSA9PSBudWxsKSB7XG4gICAgICB2aWV3LmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyB2aWV3IChpZiB0aGlzIHZpZXcgaXMgXCJyZS1vcGVuXCIpLiBUaGlzIGlzIHRvIHN1cHBvcnQgdXNhZ2VcbiAgICogb2YgcmVtb3ZpbmcgY3VycmVudCB2aWV3IGFuZCByZXBsYWNpbmcgd2l0aCBuZXcgdmlld1xuICAgKiBAcGFyYW0gdmlld0lkXG4gICAqL1xuICBjbG9zZVZpZXcodmlld0lkOiBzdHJpbmcsIGRlbGF5RGlhbG9nQ2xvc2U/OiBib29sZWFuKSB7XG4gICAgLy9pZiB0aGUgdmlldyBhYm91dCB0byBiZSBjbG9zZWQgaGFzIHRoZSBzYW1lIFwiaWRcIiAoaS5lLiBzYW1lIHNjcmVlbiBidXQgZGlmZikuXG4gICAgY29uc3QgY2hlY2tTY3JlZW5JbmlxdWUgPSB2aWV3SWQgPT09IHRoaXMuaWQ7XG5cbiAgICBjb25zdCBvbGRWaWV3OiBWaWV3Q29tcG9uZW50ID0gXy5maW5kKHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLmdldFZpZXdzKCksICh2aWV3OiBWaWV3Q29tcG9uZW50KT0+e1xuICAgICAgcmV0dXJuIHZpZXcuaWQgPT09IHZpZXdJZCAmJlxuICAgICAgICAoY2hlY2tTY3JlZW5JbmlxdWUgPT09IGZhbHNlIHx8XG4gICAgICAgICAgKGNoZWNrU2NyZWVuSW5pcXVlID09PSB0cnVlICYmXG4gICAgICAgICAgICB2aWV3LnVuaXF1ZUlkICE9PSB0aGlzLnVuaXF1ZUlkXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICA7XG4gICAgfSk7XG5cbiAgICBpZiAob2xkVmlldyAhPSBudWxsKSB7XG4gICAgICAvL2ZvciBjYXNlIHdoZXJlIHdlIGFyZSB0aGUgc2FtZSBzY3JlZW4sIHdlIHNob3VsZCd0IGNhbGwgYmVmb3JlRGVzdHJveUNiIHRvIGNsZWFudXBcbiAgICAgIGlmIChjaGVja1NjcmVlbkluaXF1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvbGRWaWV3LmJlZm9yZURlc3Ryb3lDYiA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIG9sZFZpZXcuY2xvc2UoZGVsYXlEaWFsb2dDbG9zZSk7XG4gICAgfVxuICAgIGlmKCF0aGlzLnZpZXdJc0luaXRpYWxpemVkICYmIGNoZWNrU2NyZWVuSW5pcXVlKSB7XG4gICAgICAvLyBUaGlzIGNhc2UgaXMgdG9vIGxhdGUgdG8gY2xvc2UuIFRoaXMgb2JqZWN0J3MgdmlldyBpcyBhbHJlYWR5IGV4aXN0LCByZXVzZWQgYW5kIHVuLWNsb3NhYmxlIVxuICAgICAgLy8gVG8gc2F2ZSB0aGlzIHRyeWluZywgYW5kIGV4ZWN1dGUgY2xvc2luZyBhdCByb3V0ZXIgYmVmb3JlIGNyZWF0ZSBuZXcgdmlldy5cbiAgICAgIGlmKCFWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0LmlkU2V0Lmhhcyh2aWV3SWQpKSB7XG4gICAgICAgIFZpZXdDb21wb25lbnQuY2xvc2VPbkluaXQuaWRTZXQuYWRkKHZpZXdJZCk7XG4gICAgICB9XG4gICAgICBsZXQgb1R5cGUgPSB0aGlzLmNvbnN0cnVjdG9yIGFzIFR5cGU8Vmlld0NvbXBvbmVudD47XG4gICAgICBpZighVmlld0NvbXBvbmVudC5jbG9zZU9uSW5pdC50eXBlcy5oYXMob1R5cGUpKSB7XG4gICAgICAgIFZpZXdDb21wb25lbnQuY2xvc2VPbkluaXQudHlwZXMuYWRkKG9UeXBlKTtcbiAgICAgIH1cbiAgICAgIFZpZXdDb21wb25lbnQuaG9va0Nsb3NlUHJldlZpZXcyRHluYW1pY1BhZ2VzU2VydmljZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCBhIFtbUG9wdXBNZW51RGlyZWN0aXZlXV0gdG8gW1twb3B1cE1lbnVzXV0gcHJvcGVydHlcbiAgICogQHBhcmFtIHBvcHVwTWVudSBQb3B1cCBtZW51IHRvIGFkZCB0byBpbnRlcm5hbCBbW3BvcHVwTWVudXNdXSBsaXN0XG4gICAqL1xuICByZWdpc3RlclBvcHVwTWVudShwb3B1cE1lbnU6IFBvcHVwTWVudURpcmVjdGl2ZSkge1xuICAgIGlmICh0aGlzLnBvcHVwTWVudXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5wb3B1cE1lbnVzID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5wb3B1cE1lbnVzLnB1c2gocG9wdXBNZW51KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBbW3BvcHVwTWVudXNdXSBoYXMgMSBvciBtb3JlIGl0ZW1zXG4gICAqIEByZXR1cm5zIFRydWUgaWYgW1twb3B1cE1lbnVzXV0gaXMgZGVmaW5lZCBhbmQgaGFzIGF0IGxlYXN0IDEgaXRlbVxuICAgKi9cbiAgaGFzUG9wdXBNZW51KCkge1xuICAgIHJldHVybiB0aGlzLnBvcHVwTWVudXMgIT0gbnVsbCAmJiB0aGlzLnBvcHVwTWVudXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIElEIG9mIHRoZSBmaXJzdCBbW1BvcHVwTWVudURpcmVjdGl2ZV1dIGluc3RhbmNlIGluIFtbcG9wdXBNZW51c1xuICAgKiBAcmV0dXJucyBJZCBvZiBwb3B1cCBtZW51XG4gICAqL1xuICBnZXRGaXJzdFBvcHVwTWVudUlkKCkge1xuICAgIHJldHVybiB0aGlzLnBvcHVwTWVudXMgIT0gbnVsbCAmJiB0aGlzLnBvcHVwTWVudXMubGVuZ3RoID4gMCA/IHRoaXMucG9wdXBNZW51c1swXS5pZCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGUgdG8gW1tCYXNlQ29tcG9uZW50XV0gZmluZEVsZW1lbnRCeUlkIG1ldGhvZFxuICAgKiBAcGFyYW0gaWQgQ29tcG9uZW50IElEXG4gICAqL1xuICBmaW5kRWxlbWVudEJ5SWQoaWQ6IHN0cmluZyk6IEJhc2VDb21wb25lbnQge1xuICAgIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gc3VwZXIuZmluZEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChjb21wID09IG51bGwgJiYgdGhpcy5fdGFibGVDb2x1bW5zTWFwICE9IG51bGwpIHtcbiAgICAgIGNvbXAgPSB0aGlzLl90YWJsZUNvbHVtbnNNYXAuZ2V0KEtleVV0aWxzLnRvTWFwS2V5KGlkKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgLy9jaGVjayBmb3IgaW5hY3RpdmUgbWVudSBpdGVtc1xuICAgICAgY29tcCA9IHRoaXMuZ2V0SW5hY3RpdmVNZW51SXRlbShpZCkgYXMgYW55O1xuICAgIH1cblxuICAgIHJldHVybiBjb21wO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgZnJlZXplQ2hhbmdlRGV0ZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5nZXRDaGFuZ2VEZXRlY3RvcigpLmRldGFjaCgpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25Gcm96ZW4gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN1bWUgY2hhbmdlIGRldGVjdGlvbiBpZiBpdCBoYXMgYmVlbiBzdG9wcGVkXG4gICAqL1xuICB1bmZyZWV6ZUNoYW5nZURldGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy5nZXRDaGFuZ2VEZXRlY3RvcigpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZ2V0Q2hhbmdlRGV0ZWN0b3IoKS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkucmVhdHRhY2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbkZyb3plbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNoYW5nZSBkZXRlY3Rpb24gaGFzIGJlZW4gc3RvcHBlZFxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGNoYW5nZSBkZXRlY3Rpb24gaGFzIGJlZW4gc3RvcHBlZFxuICAgKi9cbiAgaXNDaGFuZ2VEZXRlY3Rpb25Gcm96ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlRGV0ZWN0aW9uRnJvemVuID09PSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYSBjb250YWluZXIgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFRydWVcbiAgICovXG4gIHByb3RlY3RlZCBpc0NvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHBhcmVudCBbW0Jhc2VDb21wb25lbnRdXSBhbmQgW1tkaWFsb2ddXSBpbnN0YW5jZVxuICAgKi9cbiAgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBzdXBlci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaWFsb2cuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIHRoaXMgY29tcG9uZW50IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgc3VwZXIubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaWFsb2cubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIHZpZXcgYWZ0ZXIgaXQgaGFzIGJlZW4gaGlkZGVuIHZpYSBtaW5pbWl6ZWRcbiAgICovXG4gIHNob3dWaWV3KCkge1xuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy5zaG93VmlldygpO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLmlzTWluaW1pemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIE1pbmltaXplIHRoZSBbW2RpYWxvZ11dIG9mIHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBtaW5pbWl6ZSgpIHtcbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaWFsb2cubWluaW1pemUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUgdGhpcyBjb21wb25lbnQgdG8gdGhlIHRvcCBvZiB0aGUgdmlldyBzdGFja1xuICAgKi9cbiAgbW92ZVRvVG9wKCkge1xuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlU3RhY2tWaWV3KHRoaXMuaWQpLCB0aGlzLnNjcmVlbkluZGV4O1xuICB9XG5cbiAgdHJhY2tJbmFjdGl2ZU1lbnVJdGVtKG1lbnVJdGVtOiBNZW51SXRlbUNvbXBvbmVudCkge1xuICAgIGNvbnN0IGlkID0gbWVudUl0ZW0uZ2V0SWQoKTtcblxuICAgIGNvbnN0IGZhdXhNZW51SXRlbSA9IG5ldyBIVE1MRWxlbWVudFdyYXBwZXIobnVsbCwgXCJtZW51SXRlbVwiLCBudWxsKTtcbiAgICBmYXV4TWVudUl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuXG4gICAgaWYgKG1lbnVJdGVtLml0ZW0gIT0gbnVsbCAmJiBtZW51SXRlbS5pdGVtLmN1c3RvbUF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyhtZW51SXRlbS5pdGVtLmN1c3RvbUF0dHJpYnV0ZXMpO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmIChrZXkgIT09IFwiaWRcIikge1xuICAgICAgICAgIGZhdXhNZW51SXRlbS5zZXRBdHRyaWJ1dGUoa2V5LCBtZW51SXRlbS5pdGVtLmN1c3RvbUF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW5hY3RpdmVNZW51SXRlbXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5hY3RpdmVNZW51SXRlbXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnRXcmFwcGVyPigpO1xuICAgIH1cblxuICAgIHRoaXMuX2luYWN0aXZlTWVudUl0ZW1zLnNldChpZCwgZmF1eE1lbnVJdGVtKTtcbiAgfVxuXG4gIGdldEluYWN0aXZlTWVudUl0ZW0oaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcyAhPSBudWxsID8gdGhpcy5faW5hY3RpdmVNZW51SXRlbXMuZ2V0KGlkKSA6IG51bGw7XG4gIH1cblxuICBjbGVhbnVwKCkge1xuICAgIHN1cGVyLmNsZWFudXAoKTtcblxuICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY2l0ID0gdGhpcy5fdmlld0NoaWxkcmVuTWFwLnZhbHVlcygpO1xuICAgICAgbGV0IHZhbCA9IGNpdC5uZXh0KCk7XG5cbiAgICAgIHdoaWxlKHZhbC5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgIC8vc29tZSBjaGlsZHJlbiBhcmUgbm90IGFjdHVhbCBCYXNlQ29tcG9uZW50XG4gICAgICAgIGlmICh0eXBlb2YgdmFsLnZhbHVlLmVtcHR5Q2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHZhbC52YWx1ZS5lbXB0eUNoaWxkcmVuKCk7XG4gICAgICAgICAgdmFsLnZhbHVlLl9pc0R5aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IGNpdC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VwZXIuZW1wdHlDaGlsZHJlbigpO1xuICB9XG5cbiAgaXNNb2RhbERpYWxvZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cgIT0gbnVsbCAmJiAodGhpcy5kaWFsb2cubW9kYWwgPT09IHRydWUgfHwgdGhpcy5kaWFsb2cubW9kYWwgPT09IFwidHJ1ZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3QgaW1wbGVtZW50ZWRcbiAgICovXG4gIGhhbmRsZUFjdGlvbkZvcndhcmQoKSB7XG4gIH1cbiAgLyoqXG4gICAqIHNjcmVlbiBpbmRleCgwfinjga7mloflrZfliJfooajnj75cbiAgICovXG4gIGdldFNjcmVlbkluZGV4KCk6c3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuc2NyZWVuSW5kZXggPT09IHVuZGVmaW5lZCB8fCB0aGlzLnNjcmVlbkluZGV4ID09PSBudWxsKVxuICAgICAgPyAnJ1xuICAgICAgOiB0aGlzLnNjcmVlbkluZGV4LnRvU3RyaW5nKCk7XG4gIH1cbiAgcmVnaXN0ZXJTY3JlZW5JbmRleCgpe1xuICAgIHRoaXMuc2NyZWVuSW5kZXggPSB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5uZXh0U2NyZWVuSW5kZXgodGhpcy5iYXNlU2NyZWVuSWQpO1xuICB9XG5cbiAgc2V0VmlzaWJsZShib286IGJvb2xlYW4pIHtcbiAgICBzdXBlci5zZXRWaXNpYmxlKGJvbyk7XG4gICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkucmVmcmVzaEJyZWFkQ3J1bWIoKTtcbiAgfVxufVxuIl19