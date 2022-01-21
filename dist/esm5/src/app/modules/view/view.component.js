/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     */
    function ViewComponent(parent, sessionService, elementRef) {
        var _this = _super.call(this, parent, sessionService, elementRef, null) || this;
        _this.mcos = new Set();
        _this.canBeActiveView = true;
        _this._viewInitializedSubject = new Subject();
        _this.viewInitialized = _this._viewInitializedSubject.asObservable();
        _this.defIds = [];
        _this.screenIndex = null;
        _this.actionForwardName = _this.getId();
        return _this;
    }
    /**
     * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
     * @param url
     */
    /**
     * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
     * @param {?} url
     * @return {?}
     */
    ViewComponent.prototype.setRouteUrl = /**
     * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this.routeUrl = url;
        if (this.dialog != null) {
            this.dialog.setViewRouteUrl(url);
        }
    };
    /**
     * Get [[routeUrl]] property value
     * @returns Route URL
     */
    /**
     * Get [[routeUrl]] property value
     * @return {?} Route URL
     */
    ViewComponent.prototype.getRouteUrl = /**
     * Get [[routeUrl]] property value
     * @return {?} Route URL
     */
    function () {
        return this.routeUrl;
    };
    /**
     * Check if route is deactivated.
     * @returns True if route is deactivated
     */
    /**
     * Check if route is deactivated.
     * @return {?} True if route is deactivated
     */
    ViewComponent.prototype.isRouteDeactivated = /**
     * Check if route is deactivated.
     * @return {?} True if route is deactivated
     */
    function () {
        return this.routeDeactivated === true;
    };
    /**
     * After view init lifecycle
     */
    /**
     * After view init lifecycle
     * @return {?}
     */
    ViewComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.canBeActiveView !== false) {
            this.parent = null;
        }
        //add view to stack
        this.getSession().getMcoContainer().registerView(this);
        _super.prototype.ngAfterViewInit.call(this);
        this.afterDialogInit();
        if (this.popupMenus != null) {
            _.forEach(this.popupMenus, function (popupMenu) { return popupMenu.convertSubMenuItems(_this.id); });
        }
        this.componentInitialize();
        if (this.dialog) {
            this.dialog.setViewRouteUrl(this.routeUrl);
            this.viewRouteSet = true;
        }
        this.getSession().getMcoContainer().reStackView(this.id, this.screenIndex);
        this._viewInitializedSubject.next();
        this.viewIsInitialized = true;
    };
    /**
     * @return {?}
     */
    ViewComponent.prototype.afterDialogInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
                _.forEach(this.popupMenus, function (popupMenu) { return popupMenu.convertSubMenuItems(_this.id); });
            }
            this.dialog.resetId();
            if (this.viewRouteSet !== true) {
                this.dialog.setViewRouteUrl(this.routeUrl);
                this.viewRouteSet = true;
            }
        }
    };
    /**
     * Set modal CSS and dialog's modal property value to true.
     * Make view component display as modal
     */
    /**
     * Set modal CSS and dialog's modal property value to true.
     * Make view component display as modal
     * @return {?}
     */
    ViewComponent.prototype.setModalMode = /**
     * Set modal CSS and dialog's modal property value to true.
     * Make view component display as modal
     * @return {?}
     */
    function () {
        if (this.modal == "true") {
            this.dialog["elementRef"].nativeElement.className = "modal fade in";
            this.dialog["elementRef"].nativeElement.style.cssText = "display:inline-block;";
            this.setElementAttributeById(this.id, 'modal', this.modal);
            this.dialog.modal = this.modal;
        }
    };
    /**
     * Destroy lifecycle. Clear all references
     */
    /**
     * Destroy lifecycle. Clear all references
     * @return {?}
     */
    ViewComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Clear all references
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.beforeDestroyCb != null) {
            this.beforeDestroyCb(this.getId());
        }
        this._inactiveMenuItems = null;
        this.routeDeactivated = true;
        //remove view from stack
        this.getSession().getMcoContainer().removeView(this);
        this.mcos.forEach(function (mco) { return _this.getSession().getMcoContainer().removeMco(mco); });
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
        _.forEach(this.defIds, function (id) {
            _this.getSession().deleteDef(id);
        });
        this.defIds = null;
        this.popupMenus = null;
        // if (this._findElementCache != null) {
        //   this._findElementCache.clear();
        // }
        // this._findElementCache = null;
        this._tableColumnsMap = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * Delegate to [[bodyInit]]
     */
    /**
     * Delegate to [[bodyInit]]
     * @return {?}
     */
    ViewComponent.prototype.componentInitialize = /**
     * Delegate to [[bodyInit]]
     * @return {?}
     */
    function () {
        this.bodyInit();
    };
    /**
     * Get the component's tag name. Implementation of [[BaseComponent]] method
     * @returns Name of tag
     */
    /**
     * Get the component's tag name. Implementation of [[BaseComponent]] method
     * @return {?} Name of tag
     */
    ViewComponent.prototype.getTagName = /**
     * Get the component's tag name. Implementation of [[BaseComponent]] method
     * @return {?} Name of tag
     */
    function () {
        return 'vt-dummy-view';
    };
    /**
     * Not implemented
     */
    /**
     * Not implemented
     * @return {?}
     */
    ViewComponent.prototype.bodyInit = /**
     * Not implemented
     * @return {?}
     */
    function () {
    };
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param selectorFn
     */
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} selectorFn
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    ViewComponent.prototype.setElementAttribute = /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} selectorFn
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    function (selectorFn, attribute, value) {
        /** @type {?} */
        var comp = selectorFn(this.children);
        if (comp == null) {
            Logger.warn('Unable to set attribute, component is null');
        }
        else {
            comp.setAttribute(attribute, value);
        }
        this.markForCheck();
    };
    /**
    * Set [[disabled]] property value
    * @param boo Value for disabled property
    */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    ViewComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        this.dialog.setDisabled(boo);
    };
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param selectorFn
     */
    /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} compId
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    ViewComponent.prototype.setElementAttributeById = /**
     * Query the "element" via selectFn function, then set the attribute of the element. If found
     * set the attribute {attribute} with value {value}
     *
     * @param {?} compId
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    function (compId, attribute, value) {
        if (attribute === AttributesEnum.TITLE || attribute === 'title') {
            this.setTitle(value);
        }
        else if (compId === this.getId()) {
            this.setAttribute(attribute, value);
        }
        else {
            /** @type {?} */
            var comp = this.findElementById(compId);
            /* istanbul ignore if */
            /* istanbul ignore else */
            if (comp == null) {
                /** @type {?} */
                var compDef = this.getSession().getDef(compId);
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
                        Logger.warn("Unable to set attribute, component with id: " + compId + " is not found");
                    }
                }
            }
            else {
                comp.setAttribute(attribute, value);
            }
            this.markForCheck();
        }
    };
    /**
     * Wholesale set attributes to an element.
     *
     * @param compId element to set attribute
     * @param attributes an array of AttributesEnum to be set
     */
    /**
     * Wholesale set attributes to an element.
     *
     * @param {?} compId element to set attribute
     * @param {?} attributes an array of AttributesEnum to be set
     * @return {?}
     */
    ViewComponent.prototype.setElementAttributesById = /**
     * Wholesale set attributes to an element.
     *
     * @param {?} compId element to set attribute
     * @param {?} attributes an array of AttributesEnum to be set
     * @return {?}
     */
    function (compId, attributes) {
        var e_1, _a;
        if (compId === this.getId()) {
            this.setAttributes(attributes);
        }
        else {
            /** @type {?} */
            var comp = this.findElementById(compId);
            if (comp == null) {
                /** @type {?} */
                var compDef = this.getSession().getDef(compId);
                if (compDef != null) {
                    try {
                        for (var attributes_1 = tslib_1.__values(attributes), attributes_1_1 = attributes_1.next(); !attributes_1_1.done; attributes_1_1 = attributes_1.next()) {
                            var attr = attributes_1_1.value;
                            compDef.attribute[attr.attributeName] = attr.value;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (attributes_1_1 && !attributes_1_1.done && (_a = attributes_1.return)) _a.call(attributes_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    Logger.warn("Unable to set attribute, component with id: " + compId + " is not found");
                }
            }
            else {
                comp.setAttributes(attributes);
            }
            this.markForCheck();
        }
    };
    /**
     * Removes an attribute from a component with a specific id
     * @param compId Component id
     * @param attribute Name of attribute to remove from component
     */
    /**
     * Removes an attribute from a component with a specific id
     * @param {?} compId Component id
     * @param {?} attribute Name of attribute to remove from component
     * @return {?}
     */
    ViewComponent.prototype.removeElementAttributeById = /**
     * Removes an attribute from a component with a specific id
     * @param {?} compId Component id
     * @param {?} attribute Name of attribute to remove from component
     * @return {?}
     */
    function (compId, attribute) {
        if (attribute === AttributesEnum.TITLE || attribute === 'title') {
            this.setTitle("");
        }
        else if (compId === this.getId()) {
            this.removeAttribute(attribute);
        }
        else {
            /** @type {?} */
            var comp = this.findElementById(compId);
            /* istanbul ignore if */
            /* istanbul ignore else */
            if (comp == null) {
                Logger.warn("Unable to remove attribute, component with id: " + compId + " is not found");
            }
            else {
                comp.removeAttribute(attribute);
            }
        }
        this.markForCheck();
    };
    /**
     * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
     * @param radioGroupId
     * @param attribute HTML attribute name to be set
     * @param value Value to set on HTML attribute
     */
    /**
     * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
     * @param {?} radioGroupId
     * @param {?} attribute HTML attribute name to be set
     * @param {?} value Value to set on HTML attribute
     * @return {?}
     */
    ViewComponent.prototype.setRadioGroupAttribute = /**
     * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
     * @param {?} radioGroupId
     * @param {?} attribute HTML attribute name to be set
     * @param {?} value Value to set on HTML attribute
     * @return {?}
     */
    function (radioGroupId, attribute, value) {
        /** @type {?} */
        var radios = _.filter(Array.from(this.children.values()), function (child) {
            return child instanceof RadioButtonComponent && (/** @type {?} */ (child)).group === radioGroupId;
        });
        /* istanbul ignore if */
        if (radios != null && radios.length > 0) {
            _.forEach(radios, function (radio) {
                radio.setAttribute(attribute, value);
            });
        }
        this.markForCheck();
    };
    /**
     * Get the value of an HTML attribute of a component
     * @param compId Id of component to get attribute from
     * @param attribute Name of HTML attribute to get
     */
    /**
     * Get the value of an HTML attribute of a component
     * @param {?} compId Id of component to get attribute from
     * @param {?} attribute Name of HTML attribute to get
     * @return {?}
     */
    ViewComponent.prototype.getElementAttributeById = /**
     * Get the value of an HTML attribute of a component
     * @param {?} compId Id of component to get attribute from
     * @param {?} attribute Name of HTML attribute to get
     * @return {?}
     */
    function (compId, attribute) {
        /** @type {?} */
        var comp = this.findElementById(compId);
        if (comp != null) {
            return comp.getAttribute(attribute);
        }
    };
    /**
     * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
     * @param compId Component ID to initialize
     * @param value Value to set on combobox
     * @param attribute Name of attribute to set on combobox
     */
    /**
     * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
     * @param {?} compId Component ID to initialize
     * @param {?} value Value to set on combobox
     * @param {?} attribute Name of attribute to set on combobox
     * @return {?}
     */
    ViewComponent.prototype.initializeComboBoxValues = /**
     * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
     * @param {?} compId Component ID to initialize
     * @param {?} value Value to set on combobox
     * @param {?} attribute Name of attribute to set on combobox
     * @return {?}
     */
    function (compId, value, attribute) {
        /** @type {?} */
        var comboBox = /** @type {?} */ (this.findElementById(compId));
        if (comboBox == null) {
            console.error("Unable to find combobox: " + compId + " ");
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
    };
    /**
     * Set the [[ComboboxComponent]] selected item that matches value
     * @param compId [[ComboboxComponent]] id
     * @param value Value to set as selected
     */
    /**
     * Set the [[ComboboxComponent]] selected item that matches value
     * @param {?} compId [[ComboboxComponent]] id
     * @param {?} value Value to set as selected
     * @return {?}
     */
    ViewComponent.prototype.selectComboBoxItem = /**
     * Set the [[ComboboxComponent]] selected item that matches value
     * @param {?} compId [[ComboboxComponent]] id
     * @param {?} value Value to set as selected
     * @return {?}
     */
    function (compId, value) {
        /** @type {?} */
        var comboBox = /** @type {?} */ (this.findElementById(compId));
        /* istanbul ignore if */
        if (comboBox == null) {
            console.error("Unable to find combobox: " + compId + " ");
        }
        else {
            comboBox.setSelectValue(value);
        }
    };
    /**
     * Find component and focus it
     * @param compId Component id
     */
    /**
     * Find component and focus it
     * @param {?=} compId Component id
     * @return {?}
     */
    ViewComponent.prototype.setFocus = /**
     * Find component and focus it
     * @param {?=} compId Component id
     * @return {?}
     */
    function (compId) {
        if (compId === void 0) { compId = null; }
        if (compId == this.id) {
            this.showView();
        }
        else if (compId == null || compId == '') {
            this.requestFocus();
        }
        else {
            /** @type {?} */
            var comp = UiDocument.findElementById(compId);
            if (comp == null) {
                console.error("Unable to setFocus, component with id: " + compId + " is not found");
            }
            else {
                comp.requestFocus();
            }
        }
    };
    /**
     * Set title on [[DialogComponent]]
     * @param title Title of dialog
     */
    /**
     * Set title on [[DialogComponent]]
     * @param {?} title Title of dialog
     * @return {?}
     */
    ViewComponent.prototype.setTitle = /**
     * Set title on [[DialogComponent]]
     * @param {?} title Title of dialog
     * @return {?}
     */
    function (title) {
        if (this.dialog != null) {
            this.dialog.title = title;
            this.dialog.markForCheck();
        }
    };
    /**
     * Close [[dialog]] if it exists on this component
     * @param delayDialogClose
     */
    /**
     * Close [[dialog]] if it exists on this component
     * @param {?=} delayDialogClose
     * @return {?}
     */
    ViewComponent.prototype.close = /**
     * Close [[dialog]] if it exists on this component
     * @param {?=} delayDialogClose
     * @return {?}
     */
    function (delayDialogClose) {
        var _this = this;
        /** @type {?} */
        var dialog = document.getElementById(this.dialog.id);
        dialog.setAttribute("style", "display: none;");
        dialog.innerHTML = "";
        this._viewStatus = 1;
        this.cleanup();
        if (this.dialog != null) {
            if (delayDialogClose) {
                setTimeout(function () {
                    _this.dialog.close(null, false);
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
    };
    /**
     * Get name of this component
     */
    /**
     * Get name of this component
     * @return {?}
     */
    ViewComponent.prototype.getLocalName = /**
     * Get name of this component
     * @return {?}
     */
    function () {
        return "window";
    };
    /**
     * Register and add an MCO
     * @param mcoName
     * @param mcoClass
     */
    /**
     * Register and add an MCO
     * @param {?} mcoName
     * @param {?} mcoClass
     * @return {?}
     */
    ViewComponent.prototype.createMco = /**
     * Register and add an MCO
     * @param {?} mcoName
     * @param {?} mcoClass
     * @return {?}
     */
    function (mcoName, mcoClass) {
        /** @type {?} */
        var mco = this.getSession().getMcoContainer().getMco(mcoName);
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
    };
    /**
     * Get MCO from client session
     * @param mcoName Name of MCO to get
     * @returns MCO
     */
    /**
     * Get MCO from client session
     * @param {?} mcoName Name of MCO to get
     * @return {?} MCO
     */
    ViewComponent.prototype.getMco = /**
     * Get MCO from client session
     * @param {?} mcoName Name of MCO to get
     * @return {?} MCO
     */
    function (mcoName) {
        return this.getSession().getMcoContainer().getMco(mcoName);
    };
    /**
     * Parse string and create component base on it
     *
     * @param domString
     */
    /**
     * Parse string and create component base on it
     *
     * @param {?} domString
     * @return {?}
     */
    ViewComponent.prototype.createComponent = /**
     * Parse string and create component base on it
     *
     * @param {?} domString
     * @return {?}
     */
    function (domString) {
        //textField
        //label
        //panel
        //horizontalSeparator
        try {
            /** @type {?} */
            var element = AppUtils.parseDom(domString);
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
     * @param componentType
     */
    /**
     * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
     * @param {?} componentType
     * @return {?}
     */
    ViewComponent.prototype._createDynamicComponent = /**
     * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
     * @param {?} componentType
     * @return {?}
     */
    function (componentType) {
        /** @type {?} */
        var comp = null;
        if (this.dialog != null && this.dialog.viewContainer != null) {
            try {
                /** @type {?} */
                var compFactory = this.getSession().getInjector(ComponentFactoryResolver);
                if (compFactory != null) {
                    /** @type {?} */
                    var compRef = void 0;
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
    };
    /**
     * @deprecated DO NOT USE THIS! Exists only for legacy support
     * @param id
     */
    /**
     * @deprecated DO NOT USE THIS! Exists only for legacy support
     * @param {?} id
     * @return {?}
     */
    ViewComponent.prototype._removeComponent = /**
     * @deprecated DO NOT USE THIS! Exists only for legacy support
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var e_2, _a, e_3, _b;
        /** @type {?} */
        var child = this.findElementById(id);
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
                    var ev = (/** @type {?} */ (this.dialog.viewContainer))._embeddedViews;
                    try {
                        for (var ev_1 = tslib_1.__values(ev), ev_1_1 = ev_1.next(); !ev_1_1.done; ev_1_1 = ev_1.next()) {
                            var v = ev_1_1.value;
                            if (v.nodes && Array.isArray(v.nodes) && v.nodes.length > 0) {
                                try {
                                    for (var _c = tslib_1.__values(v.nodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var n = _d.value;
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
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (ev_1_1 && !ev_1_1.done && (_a = ev_1.return)) _a.call(ev_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    };
    /**
     * Check if this view can be active
     * @returns True if view can be active or parent is null
     */
    /**
     * Check if this view can be active
     * @return {?} True if view can be active or parent is null
     */
    ViewComponent.prototype.isView = /**
     * Check if this view can be active
     * @return {?} True if view can be active or parent is null
     */
    function () {
        return this.canBeActiveView !== false ? true : (this.getParent() == null ? true : false);
    };
    /**
     * Check if this view can't be active view
     * @returns True if view can't be active view
     */
    /**
     * Check if this view can't be active view
     * @return {?} True if view can't be active view
     */
    ViewComponent.prototype.isNoneActiveView = /**
     * Check if this view can't be active view
     * @return {?} True if view can't be active view
     */
    function () {
        return this.canBeActiveView === false;
    };
    /**
     * Check if this is a dynamic page
     * @returns True if it is a dynamic page
     */
    /**
     * Check if this is a dynamic page
     * @return {?} True if it is a dynamic page
     */
    ViewComponent.prototype.isDynamicView = /**
     * Check if this is a dynamic page
     * @return {?} True if it is a dynamic page
     */
    function () {
        return this.isDynamicPage === true ? true : false;
    };
    /**
     * Set [[DialogComponent]] instance z-index
     * @param newZIndex
     */
    /**
     * Set [[DialogComponent]] instance z-index
     * @param {?} newZIndex
     * @return {?}
     */
    ViewComponent.prototype.updateZIndex = /**
     * Set [[DialogComponent]] instance z-index
     * @param {?} newZIndex
     * @return {?}
     */
    function (newZIndex) {
        if (this.dialog != null && this.isDestroyed !== true && this.disabled != true) {
            this.dialog.updateZIndex(newZIndex);
            this.zIndex = newZIndex;
        }
    };
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata for this component
     */
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata for this component
     */
    ViewComponent.prototype.toJson = /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata for this component
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "screenIndex", this.getScreenIndex());
        if (this.getSession().getMcoContainer().activeView().getId() === this.getId() && UiDocument.menuItemElementMap != null) {
            /** @type {?} */
            var menuItems = [];
            /** @type {?} */
            var keySet = UiDocument.menuItemElementMap.keys();
            /** @type {?} */
            var keyIt = keySet.next();
            while (keyIt.done !== true) {
                menuItems.push(UiDocument.menuItemElementMap.get(keyIt.value).toJson());
                keyIt = keySet.next();
            }
            if (this._inactiveMenuItems != null) {
                /** @type {?} */
                var keyIt_1 = this._inactiveMenuItems.values();
                /** @type {?} */
                var rs = keyIt_1.next();
                while (rs.done !== true) {
                    menuItems.push(rs.value.toJson());
                    rs = keyIt_1.next();
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
    };
    /**
     * Add component id to [[defIds]]
     * @param id
     */
    /**
     * Add component id to [[defIds]]
     * @param {?} id
     * @return {?}
     */
    ViewComponent.prototype.trackDef = /**
     * Add component id to [[defIds]]
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.defIds.push(id);
    };
    /**
     * @param {?} viewId
     * @return {?}
     */
    ViewComponent.hasIdAsCloseTargetOnInit = /**
     * @param {?} viewId
     * @return {?}
     */
    function (viewId) {
        return ViewComponent.closeOnInit.idSet.has(viewId);
    };
    /**
     * @param {?} viewType
     * @return {?}
     */
    ViewComponent.hasTypeAsCloseTargetOnInit = /**
     * @param {?} viewType
     * @return {?}
     */
    function (viewType) {
        return ViewComponent.closeOnInit.types.has(viewType);
    };
    /**
     * @return {?}
     */
    ViewComponent.hookClosePrevView2DynamicPagesService = /**
     * @return {?}
     */
    function () {
        if (!ViewComponent.closeOnInit.hooked) {
            DynamicPagesService.onCreateViewCloser = function (sessionService, viewType, routeId) {
                ViewComponent.closePrevView(sessionService, routeId ? routeId : viewType);
            };
            ViewComponent.closeOnInit.hooked = true;
        }
    };
    /**
     * @param {?} sessionService
     * @param {?} target
     * @return {?}
     */
    ViewComponent.closePrevView = /**
     * @param {?} sessionService
     * @param {?} target
     * @return {?}
     */
    function (sessionService, target) {
        /** @type {?} */
        var view = null;
        if ((typeof target) == "string") {
            /** @type {?} */
            var screenId = /** @type {?} */ (target);
            if (ViewComponent.hasIdAsCloseTargetOnInit(screenId)) {
                view = sessionService.getMcoContainer().getViewById(screenId);
            }
        }
        else if (target instanceof Type) {
            /** @type {?} */
            var viewType_1 = /** @type {?} */ (target);
            if (ViewComponent.hasTypeAsCloseTargetOnInit(viewType_1)) {
                view = _.find(sessionService.getMcoContainer().getViews(), function (v) { return v.constructor == viewType_1; });
            }
        }
        //Vivify: if view has actionForwardName, do not close the view as we will call it handleActionForward() to refresh the screen.
        if (view && view.actionForwardName == null) {
            view.close();
        }
    };
    /**
     * Close previous version of this view (if this view is "re-open"). This is to support usage
     * of removing current view and replacing with new view
     * @param viewId
     */
    /**
     * Close previous version of this view (if this view is "re-open"). This is to support usage
     * of removing current view and replacing with new view
     * @param {?} viewId
     * @param {?=} delayDialogClose
     * @return {?}
     */
    ViewComponent.prototype.closeView = /**
     * Close previous version of this view (if this view is "re-open"). This is to support usage
     * of removing current view and replacing with new view
     * @param {?} viewId
     * @param {?=} delayDialogClose
     * @return {?}
     */
    function (viewId, delayDialogClose) {
        var _this = this;
        /** @type {?} */
        var checkScreenInique = viewId === this.id;
        /** @type {?} */
        var oldView = _.find(this.getSession().getMcoContainer().getViews(), function (view) {
            return view.id === viewId &&
                (checkScreenInique === false ||
                    (checkScreenInique === true &&
                        view.uniqueId !== _this.uniqueId));
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
            var oType = /** @type {?} */ (this.constructor);
            if (!ViewComponent.closeOnInit.types.has(oType)) {
                ViewComponent.closeOnInit.types.add(oType);
            }
            ViewComponent.hookClosePrevView2DynamicPagesService();
        }
    };
    /**
     * Add a [[PopupMenuDirective]] to [[popupMenus]] property
     * @param popupMenu Popup menu to add to internal [[popupMenus]] list
     */
    /**
     * Add a [[PopupMenuDirective]] to [[popupMenus]] property
     * @param {?} popupMenu Popup menu to add to internal [[popupMenus]] list
     * @return {?}
     */
    ViewComponent.prototype.registerPopupMenu = /**
     * Add a [[PopupMenuDirective]] to [[popupMenus]] property
     * @param {?} popupMenu Popup menu to add to internal [[popupMenus]] list
     * @return {?}
     */
    function (popupMenu) {
        if (this.popupMenus == null) {
            this.popupMenus = [];
        }
        this.popupMenus.push(popupMenu);
    };
    /**
     * Check if [[popupMenus]] has 1 or more items
     * @returns True if [[popupMenus]] is defined and has at least 1 item
     */
    /**
     * Check if [[popupMenus]] has 1 or more items
     * @return {?} True if [[popupMenus]] is defined and has at least 1 item
     */
    ViewComponent.prototype.hasPopupMenu = /**
     * Check if [[popupMenus]] has 1 or more items
     * @return {?} True if [[popupMenus]] is defined and has at least 1 item
     */
    function () {
        return this.popupMenus != null && this.popupMenus.length > 0;
    };
    /**
     * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
     * @returns Id of popup menu
     */
    /**
     * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
     * @return {?} Id of popup menu
     */
    ViewComponent.prototype.getFirstPopupMenuId = /**
     * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
     * @return {?} Id of popup menu
     */
    function () {
        return this.popupMenus != null && this.popupMenus.length > 0 ? this.popupMenus[0].id : null;
    };
    /**
     * Delegate to [[BaseComponent]] findElementById method
     * @param id Component ID
     */
    /**
     * Delegate to [[BaseComponent]] findElementById method
     * @param {?} id Component ID
     * @return {?}
     */
    ViewComponent.prototype.findElementById = /**
     * Delegate to [[BaseComponent]] findElementById method
     * @param {?} id Component ID
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var comp = _super.prototype.findElementById.call(this, id);
        if (comp == null && this._tableColumnsMap != null) {
            comp = this._tableColumnsMap.get(KeyUtils.toMapKey(id));
        }
        if (comp == null) {
            //check for inactive menu items
            comp = /** @type {?} */ (this.getInactiveMenuItem(id));
        }
        return comp;
    };
    /**
     * Stop change detection
     */
    /**
     * Stop change detection
     * @return {?}
     */
    ViewComponent.prototype.freezeChangeDetection = /**
     * Stop change detection
     * @return {?}
     */
    function () {
        if (this.getChangeDetector() != null) {
            this.getChangeDetector().detach();
            this.changeDetectionFrozen = true;
        }
    };
    /**
     * Resume change detection if it has been stopped
     */
    /**
     * Resume change detection if it has been stopped
     * @return {?}
     */
    ViewComponent.prototype.unfreezeChangeDetection = /**
     * Resume change detection if it has been stopped
     * @return {?}
     */
    function () {
        if (this.getChangeDetector() != null) {
            this.getChangeDetector().detectChanges();
            this.getChangeDetector().reattach();
        }
        this.changeDetectionFrozen = false;
    };
    /**
     * Check if change detection has been stopped
     * @returns True if change detection has been stopped
     */
    /**
     * Check if change detection has been stopped
     * @return {?} True if change detection has been stopped
     */
    ViewComponent.prototype.isChangeDetectionFrozen = /**
     * Check if change detection has been stopped
     * @return {?} True if change detection has been stopped
     */
    function () {
        return this.changeDetectionFrozen === true;
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    ViewComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    /**
     * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
     */
    /**
     * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
     * @return {?}
     */
    ViewComponent.prototype.detectChanges = /**
     * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
     * @return {?}
     */
    function () {
        _super.prototype.detectChanges.call(this);
        if (this.dialog != null) {
            this.dialog.detectChanges();
        }
    };
    /**
     * Mark this component for change detection
     */
    /**
     * Mark this component for change detection
     * @return {?}
     */
    ViewComponent.prototype.markForCheck = /**
     * Mark this component for change detection
     * @return {?}
     */
    function () {
        _super.prototype.markForCheck.call(this);
        if (this.dialog != null) {
            this.dialog.markForCheck();
        }
    };
    /**
     * Show the view after it has been hidden via minimized
     */
    /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    ViewComponent.prototype.showView = /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    function () {
        if (this.dialog != null) {
            this.dialog.showView();
        }
        delete this.isMinimized;
    };
    /**
     * Minimize the [[dialog]] of this component
     */
    /**
     * Minimize the [[dialog]] of this component
     * @return {?}
     */
    ViewComponent.prototype.minimize = /**
     * Minimize the [[dialog]] of this component
     * @return {?}
     */
    function () {
        if (this.dialog != null) {
            this.dialog.minimize(null);
        }
    };
    /**
     * Move this component to the top of the view stack
     */
    /**
     * Move this component to the top of the view stack
     * @return {?}
     */
    ViewComponent.prototype.moveToTop = /**
     * Move this component to the top of the view stack
     * @return {?}
     */
    function () {
        this.getSession().getMcoContainer().reStackView(this.id), this.screenIndex;
    };
    /**
     * @param {?} menuItem
     * @return {?}
     */
    ViewComponent.prototype.trackInactiveMenuItem = /**
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        var e_4, _a;
        /** @type {?} */
        var id = menuItem.getId();
        /** @type {?} */
        var fauxMenuItem = new HTMLElementWrapper(null, "menuItem", null);
        fauxMenuItem.setAttribute("id", id);
        if (menuItem.item != null && menuItem.item.customAttributes != null) {
            /** @type {?} */
            var keys = _.keys(menuItem.item.customAttributes);
            try {
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    if (key !== "id") {
                        fauxMenuItem.setAttribute(key, menuItem.item.customAttributes[key]);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (this._inactiveMenuItems == null) {
            this._inactiveMenuItems = new Map();
        }
        this._inactiveMenuItems.set(id, fauxMenuItem);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ViewComponent.prototype.getInactiveMenuItem = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this._inactiveMenuItems != null ? this._inactiveMenuItems.get(id) : null;
    };
    /**
     * @return {?}
     */
    ViewComponent.prototype.cleanup = /**
     * @return {?}
     */
    function () {
        _super.prototype.cleanup.call(this);
        if (this._viewChildrenMap != null) {
            /** @type {?} */
            var cit = this._viewChildrenMap.values();
            /** @type {?} */
            var val = cit.next();
            while (val.done !== true) {
                //some children are not actual BaseComponent
                if (typeof val.value.emptyChildren === "function") {
                    val.value.emptyChildren();
                    val.value._isDying = true;
                }
                val = cit.next();
            }
        }
        _super.prototype.emptyChildren.call(this);
    };
    /**
     * @return {?}
     */
    ViewComponent.prototype.isModalDialog = /**
     * @return {?}
     */
    function () {
        return this.dialog != null && (this.dialog.modal === true || this.dialog.modal === "true");
    };
    /**
     * Not implemented
     */
    /**
     * Not implemented
     * @return {?}
     */
    ViewComponent.prototype.handleActionForward = /**
     * Not implemented
     * @return {?}
     */
    function () {
    };
    /**
     * screen index(0~)の文字列表現
     */
    /**
     * screen index(0~)の文字列表現
     * @return {?}
     */
    ViewComponent.prototype.getScreenIndex = /**
     * screen index(0~)の文字列表現
     * @return {?}
     */
    function () {
        return (this.screenIndex === undefined || this.screenIndex === null)
            ? ''
            : this.screenIndex.toString();
    };
    /**
     * @return {?}
     */
    ViewComponent.prototype.registerScreenIndex = /**
     * @return {?}
     */
    function () {
        this.screenIndex = this.getSession().getMcoContainer().nextScreenIndex(this.baseScreenId);
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    ViewComponent.prototype.setVisible = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        _super.prototype.setVisible.call(this, boo);
        this.getSession().getMcoContainer().refreshBreadCrumb();
    };
    ViewComponent.closeOnInit = { idSet: new Set(), types: new Set(), hooked: false };
    ViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-dummy-view',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    ViewComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef }
    ]; };
    ViewComponent.propDecorators = {
        dialog: [{ type: ViewChild, args: [DialogComponent,] }]
    };
    return ViewComponent;
}(BaseComponent));
export { ViewComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3ZpZXcvdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixTQUFTLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUF1QixVQUFVLEVBQWEsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVyRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFN0MsT0FBTyxFQUFFLE9BQU8sRUFB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YSx1QkF1RmpCLFFBQVEsWUFBSSxRQUFRO2dCQXJFaEIsY0FBYztnQkFuQjRFLFVBQVU7Ozt5QkFxQzFHLFNBQVMsU0FBQyxlQUFlOzt3QkFyQzVCO0VBb0NtQyxhQUFhO1NBQW5DLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgVHlwZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIFNraXBTZWxmLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tICcuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bSc7XG5cbmltcG9ydCB7IERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICcuLi9iYXNlL2NvbXBvbmVudC10eXBlLmVudW0nO1xuaW1wb3J0IHsgTGFiZWxDb21wb25lbnQgfSBmcm9tICcuLi9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tYm9Cb3hDb21wb25lbnQgfSBmcm9tICcuLi9jb21iby1ib3gvY29tYm8tYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0RmllbGRDb21wb25lbnQgfSBmcm9tICcuLi90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFJhZGlvQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dEFyZWFDb21wb25lbnQgfSBmcm9tICcuLi90ZXh0LWFyZWEvdGV4dC1hcmVhLmNvbXBvbmVudCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IER5bmFtaWNQYWdlc1NlcnZpY2UgfSBmcm9tICcuL2R5bmFtaWMtcGFnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uL2Jhc2UvYXBwLXV0aWxzJztcblxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEhUTUxFbGVtZW50V3JhcHBlciB9IGZyb20gJy4uL3RyZWUtdGFibGUvaHRtbC1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgVWlEb2N1bWVudCB9IGZyb20gJy4uL2Jhc2UvdWktZG9jdW1lbnQnO1xuaW1wb3J0IHsgUG9wdXBNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi4vcG9wdXAtbWVudS9wb3B1cC1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi9iYXNlL2xvZ2dlcic7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gJy4uL2Jhc2Uva2V5LXV0aWxzJztcbmltcG9ydCB7IEphdmFVdGlscyB9IGZyb20gJy4uL2phdmEvamF2YS11dGlscyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVOYW1lVmFsdWUgfSBmcm9tICcuLi9iYXNlL2F0dHJpYnV0ZS1uYW1lLXZhbHVlJztcbmltcG9ydCB7IE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vcG9wdXAtbWVudS9tZW51LWl0ZW0vbWVudS1pdGVtLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQmFzZSBwYXJlbnQgY29tcG9uZW50IGNsYXNzIHRoYXQgYWxsIG90aGVyIHNjcmVlbiBjb21wb25lbnRzIGluaGVyaXQgZnJvbVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1kdW1teS12aWV3JyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZChEaWFsb2dDb21wb25lbnQpIGRpYWxvZzogRGlhbG9nQ29tcG9uZW50O1xuICBwcml2YXRlIHJvdXRlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcm91dGVEZWFjdGl2YXRlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBtY29zOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICB6SW5kZXg6IG51bWJlcjtcbiAgaXNEeW5hbWljUGFnZTogYm9vbGVhbjtcbiAgaXNEZXN0cm95ZWQ6IGJvb2xlYW47XG4gIGNhbkJlQWN0aXZlVmlldzogYm9vbGVhbiA9IHRydWU7XG4gIGFjdGlvbkZvcndhcmROYW1lOiBzdHJpbmc7XG4gIG1vZGFsOnN0cmluZztcbiAgcm91dGVJZDogc3RyaW5nOyAgIC8vRm9yIHJvdXRlLnNlcnZpY2VcblxuICBwcml2YXRlIF92aWV3SW5pdGlhbGl6ZWRTdWJqZWN0OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgdmlld0luaXRpYWxpemVkOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fdmlld0luaXRpYWxpemVkU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIGRlZklkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwcml2YXRlIHBvcHVwTWVudXM6IEFycmF5PFBvcHVwTWVudURpcmVjdGl2ZT47XG5cbiAgLy9wcml2YXRlIF9maW5kRWxlbWVudENhY2hlOiBhbnk7XG5cbiAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25Gcm96ZW46IGJvb2xlYW47XG5cbiAgaXNNaW5pbWl6ZWQ6IGJvb2xlYW47XG5cbiAgc2tpcEJyZWFkQ3J1bWI6IGJvb2xlYW47XG5cbiAgLy9hbGxvdyB0aGlzIHNhbWUgc2NyZWVuIHRvIGxhdW5jaCBtdWx0aXBsZSB0aW1lXG4gIGFsbG93TXVsdGlwbGVTY3JlZW46IGJvb2xlYW47XG4gIHNjcmVlbkluZGV4OiBudW1iZXIgPSBudWxsO1xuICBiYXNlU2NyZWVuSWQ6IHN0cmluZzsgLy9pZCBmb3IgZ3JvdXBpbmcgc2NyZWVuIChhdm9pZGluZyBzY3JlZW5pbmRleClcblxuICAvL2NhbGxiYWNrIGZvciBhbnkgY3VzdG9tIGNsZWFudXBcbiAgYmVmb3JlRGVzdHJveUNiOiAoaWQ6IHN0cmluZyk9PnZvaWQ7XG5cblxuICAvL2tlZXAgdHJhY2sgb2YgbWVudSBpdGVtcyAodGhhdCBhcmUgbm90IGFjdGl2ZSkgYXMgYXJlIG1lbnUgaXRlbXMgYXJlIGRlc3Ryb3llZCBhZnRlciBpdCBpcyBjbG9zZWQuXG4gIHByaXZhdGUgX2luYWN0aXZlTWVudUl0ZW1zOiBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudFdyYXBwZXI+O1xuXG4gIHByaXZhdGUgX3RhYmxlQ29sdW1uc01hcDogTWFwPHN0cmluZywgYW55PjtcblxuICBfdmlld1N0YXR1czogbnVtYmVyO1xuXG4gIHByaXZhdGUgdmlld1JvdXRlU2V0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LFxuICAgIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSxcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmKXtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCBudWxsKTtcbiAgICB0aGlzLmFjdGlvbkZvcndhcmROYW1lID0gdGhpcy5nZXRJZCgpO1xuICB9XG5cbiAgdmlld0lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCBbW3JvdXRlVXJsXV0gcHJvcGVydHkgdmFsdWUuIElmIFtbZGlhbG9nXV0gZXhpc3RzLCBzZXQgaXQncyByb3V0ZSBVUkxcbiAgICogQHBhcmFtIHVybFxuICAgKi9cbiAgc2V0Um91dGVVcmwodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJvdXRlVXJsID0gdXJsO1xuXG4gICAgaWYgKHRoaXMuZGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGlhbG9nLnNldFZpZXdSb3V0ZVVybCh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tyb3V0ZVVybF1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEByZXR1cm5zIFJvdXRlIFVSTFxuICAgKi9cbiAgZ2V0Um91dGVVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZVVybDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHJvdXRlIGlzIGRlYWN0aXZhdGVkLlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHJvdXRlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBpc1JvdXRlRGVhY3RpdmF0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVEZWFjdGl2YXRlZCA9PT0gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGVcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jYW5CZUFjdGl2ZVZpZXcgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy9hZGQgdmlldyB0byBzdGFja1xuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlZ2lzdGVyVmlldyh0aGlzKTtcblxuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgdGhpcy5hZnRlckRpYWxvZ0luaXQoKTtcblxuICAgIGlmICh0aGlzLnBvcHVwTWVudXMgIT0gbnVsbCkge1xuICAgICAgXy5mb3JFYWNoKHRoaXMucG9wdXBNZW51cywgKHBvcHVwTWVudSk9PnBvcHVwTWVudS5jb252ZXJ0U3ViTWVudUl0ZW1zKHRoaXMuaWQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudEluaXRpYWxpemUoKTtcblxuICAgIGlmICh0aGlzLmRpYWxvZykge1xuICAgICAgdGhpcy5kaWFsb2cuc2V0Vmlld1JvdXRlVXJsKHRoaXMucm91dGVVcmwpO1xuICAgICAgdGhpcy52aWV3Um91dGVTZXQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlU3RhY2tWaWV3KHRoaXMuaWQsIHRoaXMuc2NyZWVuSW5kZXgpO1xuXG4gICAgdGhpcy5fdmlld0luaXRpYWxpemVkU3ViamVjdC5uZXh0KCk7XG4gICAgdGhpcy52aWV3SXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuXG4gIHByb3RlY3RlZCBhZnRlckRpYWxvZ0luaXQoKSB7XG4gICAgaWYgKHRoaXMuZGlhbG9nKSB7XG4gICAgICAvL2dldCBpZCBvZiBkaWFsb2cgYXMgb3VyIGlkXG4gICAgICB0aGlzLmlkID0gdGhpcy5kaWFsb2cuZ2V0SWQoKTtcbiAgICAgIHRoaXMuZGlhbG9nLnNjcmVlbkluZGV4ID0gdGhpcy5zY3JlZW5JbmRleDtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpYWxvZy5tb2RhbCA9PT0gXCJib29sZWFuXCIpe1xuICAgICAgICB0aGlzLm1vZGFsID0gSmF2YVV0aWxzLmJvb2xlYW5Ub1N0cmluZyh0aGlzLmRpYWxvZy5tb2RhbCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5tb2RhbCA9IHRoaXMuZGlhbG9nLm1vZGFsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kYWwgIT0gbnVsbCAmJiAodGhpcy5tb2RhbCA9PT0gXCJ0cnVlXCIgfHwgdGhpcy5tb2RhbCA9PT0gXCJmYWxzZVwiKSkge1xuICAgICAgICB0aGlzLnNldEVsZW1lbnRBdHRyaWJ1dGVCeUlkKHRoaXMuaWQsICdtb2RhbCcsIHRoaXMubW9kYWwpO1xuICAgICAgICB0aGlzLnNldE1vZGFsTW9kZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaWFsb2cubW9kYWwgPSBcImZhbHNlXCI7XG4gICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLmRpYWxvZy5tb2RhbDtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50QXR0cmlidXRlQnlJZCh0aGlzLmlkLCAnbW9kYWwnLCBcImZhbHNlXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb3B1cE1lbnVzICE9IG51bGwpIHtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMucG9wdXBNZW51cywgKHBvcHVwTWVudSk9PnBvcHVwTWVudS5jb252ZXJ0U3ViTWVudUl0ZW1zKHRoaXMuaWQpKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaWFsb2cucmVzZXRJZCgpO1xuXG4gICAgICBpZiAodGhpcy52aWV3Um91dGVTZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cuc2V0Vmlld1JvdXRlVXJsKHRoaXMucm91dGVVcmwpO1xuICAgICAgICB0aGlzLnZpZXdSb3V0ZVNldCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogU2V0IG1vZGFsIENTUyBhbmQgZGlhbG9nJ3MgbW9kYWwgcHJvcGVydHkgdmFsdWUgdG8gdHJ1ZS5cbiAgICogTWFrZSB2aWV3IGNvbXBvbmVudCBkaXNwbGF5IGFzIG1vZGFsXG4gICAqL1xuICBzZXRNb2RhbE1vZGUoKXtcbiAgICBpZiAodGhpcy5tb2RhbCA9PSBcInRydWVcIikge1xuICAgICAgdGhpcy5kaWFsb2dbXCJlbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJtb2RhbCBmYWRlIGluXCI7XG4gICAgICB0aGlzLmRpYWxvZ1tcImVsZW1lbnRSZWZcIl0ubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJkaXNwbGF5OmlubGluZS1ibG9jaztcIjtcbiAgICAgIHRoaXMuc2V0RWxlbWVudEF0dHJpYnV0ZUJ5SWQodGhpcy5pZCwgJ21vZGFsJywgdGhpcy5tb2RhbCk7XG4gICAgICB0aGlzLmRpYWxvZy5tb2RhbCA9IHRoaXMubW9kYWw7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIENsZWFyIGFsbCByZWZlcmVuY2VzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5iZWZvcmVEZXN0cm95Q2IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5iZWZvcmVEZXN0cm95Q2IodGhpcy5nZXRJZCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcyA9IG51bGw7XG5cbiAgICB0aGlzLnJvdXRlRGVhY3RpdmF0ZWQgPSB0cnVlO1xuICAgIC8vcmVtb3ZlIHZpZXcgZnJvbSBzdGFja1xuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlbW92ZVZpZXcodGhpcyk7XG5cbiAgICB0aGlzLm1jb3MuZm9yRWFjaChtY289PnRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLnJlbW92ZU1jbyhtY28pKTtcbiAgICB0aGlzLm1jb3MuY2xlYXIoKTtcbiAgICBkZWxldGUgdGhpcy5tY29zO1xuXG4gICAgaWYgKHRoaXMuZGlhbG9nICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgdGhpcy5kaWFsb2c7XG4gICAgfVxuXG4gICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0SW5qZWN0b3IoRHluYW1pY1BhZ2VzU2VydmljZSkucmVtb3ZlVmlldyh0aGlzKTtcblxuXG4gICAgXy5mb3JFYWNoKHRoaXMuZGVmSWRzLCAoaWQpPT57XG4gICAgICB0aGlzLmdldFNlc3Npb24oKS5kZWxldGVEZWYoaWQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kZWZJZHMgPSBudWxsO1xuICAgIHRoaXMucG9wdXBNZW51cyA9IG51bGw7XG5cbiAgICAvLyBpZiAodGhpcy5fZmluZEVsZW1lbnRDYWNoZSAhPSBudWxsKSB7XG4gICAgLy8gICB0aGlzLl9maW5kRWxlbWVudENhY2hlLmNsZWFyKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gdGhpcy5fZmluZEVsZW1lbnRDYWNoZSA9IG51bGw7XG5cbiAgICB0aGlzLl90YWJsZUNvbHVtbnNNYXAgPSBudWxsO1xuXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSB0byBbW2JvZHlJbml0XV1cbiAgICovXG4gIHByb3RlY3RlZCBjb21wb25lbnRJbml0aWFsaXplKCkge1xuICAgIHRoaXMuYm9keUluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbXBvbmVudCdzIHRhZyBuYW1lLiBJbXBsZW1lbnRhdGlvbiBvZiBbW0Jhc2VDb21wb25lbnRdXSBtZXRob2RcbiAgICogQHJldHVybnMgTmFtZSBvZiB0YWdcbiAgICovXG4gIGdldFRhZ05hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3Z0LWR1bW15LXZpZXcnO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgYm9keUluaXQoKSB7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFF1ZXJ5IHRoZSBcImVsZW1lbnRcIiB2aWEgc2VsZWN0Rm4gZnVuY3Rpb24sIHRoZW4gc2V0IHRoZSBhdHRyaWJ1dGUgb2YgdGhlIGVsZW1lbnQuIElmIGZvdW5kXG4gICAqIHNldCB0aGUgYXR0cmlidXRlIHthdHRyaWJ1dGV9IHdpdGggdmFsdWUge3ZhbHVlfVxuICAgKlxuICAgKiBAcGFyYW0gc2VsZWN0b3JGblxuICAgKi9cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShcbiAgICBzZWxlY3RvckZuOiAoKG1hcDogTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD4pPT5CYXNlQ29tcG9uZW50KSxcbiAgICBhdHRyaWJ1dGU6IEF0dHJpYnV0ZXNFbnVtLFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgY29tcCA9IHNlbGVjdG9yRm4odGhpcy5jaGlsZHJlbik7XG5cbiAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICBMb2dnZXIud2FybignVW5hYmxlIHRvIHNldCBhdHRyaWJ1dGUsIGNvbXBvbmVudCBpcyBudWxsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXAuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgKiBTZXQgW1tkaXNhYmxlZF1dIHByb3BlcnR5IHZhbHVlXG4gICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgZGlzYWJsZWQgcHJvcGVydHlcbiAgKi9cbiAgc2V0RGlzYWJsZWQoYm9vOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGJvbztcbiAgICB0aGlzLmRpYWxvZy5zZXREaXNhYmxlZChib28pO1xuICB9XG5cblxuICAvKipcbiAgICogUXVlcnkgdGhlIFwiZWxlbWVudFwiIHZpYSBzZWxlY3RGbiBmdW5jdGlvbiwgdGhlbiBzZXQgdGhlIGF0dHJpYnV0ZSBvZiB0aGUgZWxlbWVudC4gSWYgZm91bmRcbiAgICogc2V0IHRoZSBhdHRyaWJ1dGUge2F0dHJpYnV0ZX0gd2l0aCB2YWx1ZSB7dmFsdWV9XG4gICAqXG4gICAqIEBwYXJhbSBzZWxlY3RvckZuXG4gICAqL1xuICBzZXRFbGVtZW50QXR0cmlidXRlQnlJZChcbiAgICBjb21wSWQ6IHN0cmluZyxcbiAgICBhdHRyaWJ1dGU6IEF0dHJpYnV0ZXNFbnVtIHwgc3RyaW5nLFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG5cbiAgICBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5USVRMRSB8fCBhdHRyaWJ1dGUgPT09ICd0aXRsZScpIHtcbiAgICAgIHRoaXMuc2V0VGl0bGUodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoY29tcElkID09PSB0aGlzLmdldElkKCkpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY29tcCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCk7XG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChjb21wID09IG51bGwpIHtcbiAgICAgICAgLy9pcyB0aGlzIGZvciBkZWY/XG4gICAgICAgIGNvbnN0IGNvbXBEZWYgPSB0aGlzLmdldFNlc3Npb24oKS5nZXREZWYoY29tcElkKTtcblxuICAgICAgICBpZiAoY29tcERlZiAhPSBudWxsKSB7XG4gICAgICAgICAgY29tcERlZi5hdHRyaWJ1dGVbYXR0cmlidXRlXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgY29tcCA9IFVpRG9jdW1lbnQuZ2V0TWVudUNvbXBvbmVudChjb21wSWQpO1xuXG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICBpZiAoY29tcCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTG9nZ2VyLndhcm4oYFVuYWJsZSB0byBzZXQgYXR0cmlidXRlLCBjb21wb25lbnQgd2l0aCBpZDogJHtjb21wSWR9IGlzIG5vdCBmb3VuZGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogV2hvbGVzYWxlIHNldCBhdHRyaWJ1dGVzIHRvIGFuIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBjb21wSWQgZWxlbWVudCB0byBzZXQgYXR0cmlidXRlXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVzIGFuIGFycmF5IG9mIEF0dHJpYnV0ZXNFbnVtIHRvIGJlIHNldFxuICAgKi9cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZXNCeUlkKFxuICAgIGNvbXBJZDogc3RyaW5nLFxuICAgIGF0dHJpYnV0ZXM6IEFycmF5PEF0dHJpYnV0ZU5hbWVWYWx1ZT5cbiAgKSB7XG5cbiAgICBpZiAoY29tcElkID09PSB0aGlzLmdldElkKCkpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29tcCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCk7XG5cbiAgICAgIGlmIChjb21wID09IG51bGwpIHtcbiAgICAgICAgLy9pcyB0aGlzIGZvciBkZWY/XG4gICAgICAgIGNvbnN0IGNvbXBEZWYgPSB0aGlzLmdldFNlc3Npb24oKS5nZXREZWYoY29tcElkKTtcblxuICAgICAgICBpZiAoY29tcERlZiAhPSBudWxsKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbXBEZWYuYXR0cmlidXRlW2F0dHIuYXR0cmlidXRlTmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBMb2dnZXIud2FybihgVW5hYmxlIHRvIHNldCBhdHRyaWJ1dGUsIGNvbXBvbmVudCB3aXRoIGlkOiAke2NvbXBJZH0gaXMgbm90IGZvdW5kYCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIGEgY29tcG9uZW50IHdpdGggYSBzcGVjaWZpYyBpZFxuICAgKiBAcGFyYW0gY29tcElkIENvbXBvbmVudCBpZFxuICAgKiBAcGFyYW0gYXR0cmlidXRlIE5hbWUgb2YgYXR0cmlidXRlIHRvIHJlbW92ZSBmcm9tIGNvbXBvbmVudFxuICAgKi9cbiAgcmVtb3ZlRWxlbWVudEF0dHJpYnV0ZUJ5SWQoXG4gICAgY29tcElkOiBzdHJpbmcsXG4gICAgYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZ1xuICApIHtcblxuICAgIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlRJVExFIHx8IGF0dHJpYnV0ZSA9PT0gJ3RpdGxlJykge1xuICAgICAgdGhpcy5zZXRUaXRsZShcIlwiKTtcbiAgICB9IGVsc2UgaWYgKGNvbXBJZCA9PT0gdGhpcy5nZXRJZCgpKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb21wID0gdGhpcy5maW5kRWxlbWVudEJ5SWQoY29tcElkKTtcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgICBMb2dnZXIud2FybihgVW5hYmxlIHRvIHJlbW92ZSBhdHRyaWJ1dGUsIGNvbXBvbmVudCB3aXRoIGlkOiAke2NvbXBJZH0gaXMgbm90IGZvdW5kYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSByYWRpbyBidXR0b24gZ3JvdXAgYnkgSUQgYW5kIGFkZHMgYW4gYXR0cmlidXRlIHRvIGFsbCBbW1JhZGlvQnV0dG9uQ29tcG9uZW50XV0gZWxlbWVudHMgaW4gdGhlIGdyb3VwXG4gICAqIEBwYXJhbSByYWRpb0dyb3VwSWRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBIVE1MIGF0dHJpYnV0ZSBuYW1lIHRvIGJlIHNldFxuICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gc2V0IG9uIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBzZXRSYWRpb0dyb3VwQXR0cmlidXRlKHJhZGlvR3JvdXBJZDogc3RyaW5nLCBhdHRyaWJ1dGU6IEF0dHJpYnV0ZXNFbnVtIHwgc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgcmFkaW9zID0gXy5maWx0ZXIoQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuLnZhbHVlcygpKSwgKGNoaWxkKT0+e1xuICAgICAgcmV0dXJuIGNoaWxkIGluc3RhbmNlb2YgUmFkaW9CdXR0b25Db21wb25lbnQgJiYgKGNoaWxkIGFzIFJhZGlvQnV0dG9uQ29tcG9uZW50KS5ncm91cCA9PT0gcmFkaW9Hcm91cElkO1xuICAgIH0pO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHJhZGlvcyAhPSBudWxsICYmIHJhZGlvcy5sZW5ndGggPiAwKSB7XG4gICAgICBfLmZvckVhY2gocmFkaW9zLCAocmFkaW8pPT57XG4gICAgICAgIHJhZGlvLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGFuIEhUTUwgYXR0cmlidXRlIG9mIGEgY29tcG9uZW50XG4gICAqIEBwYXJhbSBjb21wSWQgSWQgb2YgY29tcG9uZW50IHRvIGdldCBhdHRyaWJ1dGUgZnJvbVxuICAgKiBAcGFyYW0gYXR0cmlidXRlIE5hbWUgb2YgSFRNTCBhdHRyaWJ1dGUgdG8gZ2V0XG4gICAqL1xuICBnZXRFbGVtZW50QXR0cmlidXRlQnlJZChjb21wSWQ6IHN0cmluZywgYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCk7XG5cbiAgICBpZiAoY29tcCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gY29tcC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBGaW5kIFtbQ29tYm9ib3hDb21wb25lbnRdXSBieSBpZCBhbmQgY2FsbCBpdCdzIGluaXRpYWxpemVDb21ib2JveFZhbHVlcyBtZXRob2QuXG4gICAqIEBwYXJhbSBjb21wSWQgQ29tcG9uZW50IElEIHRvIGluaXRpYWxpemVcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNldCBvbiBjb21ib2JveFxuICAgKiBAcGFyYW0gYXR0cmlidXRlIE5hbWUgb2YgYXR0cmlidXRlIHRvIHNldCBvbiBjb21ib2JveFxuICAgKi9cbiAgaW5pdGlhbGl6ZUNvbWJvQm94VmFsdWVzKFxuICAgIGNvbXBJZDogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgYXR0cmlidXRlOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgY29tYm9Cb3g6IENvbWJvQm94Q29tcG9uZW50ID0gdGhpcy5maW5kRWxlbWVudEJ5SWQoY29tcElkKSBhcyBDb21ib0JveENvbXBvbmVudDtcblxuICAgIGlmIChjb21ib0JveCA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gZmluZCBjb21ib2JveDogJHtjb21wSWR9IGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21ib0JveC5pbml0aWFsaXplQ29tYm9ib3hWYWx1ZXModmFsdWUpO1xuXG4gICAgICBpZiAoYXR0cmlidXRlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZVtcIndpZHRoXCJdICE9IG51bGwpIHtcbiAgICAgICAgICBjb21ib0JveC5zZXRDb250cm9sV2lkdGgoYXR0cmlidXRlW1wid2lkdGhcIl0pO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZVtcIm9uQ29tbWFuZFwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgY29tYm9Cb3guc2V0T25Db21tYW5kKGF0dHJpYnV0ZVtcIm9uQ29tbWFuZFwiXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBbW0NvbWJvYm94Q29tcG9uZW50XV0gc2VsZWN0ZWQgaXRlbSB0aGF0IG1hdGNoZXMgdmFsdWVcbiAgICogQHBhcmFtIGNvbXBJZCBbW0NvbWJvYm94Q29tcG9uZW50XV0gaWRcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNldCBhcyBzZWxlY3RlZFxuICAgKi9cbiAgc2VsZWN0Q29tYm9Cb3hJdGVtKGNvbXBJZDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgY29tYm9Cb3g6IENvbWJvQm94Q29tcG9uZW50ID0gdGhpcy5maW5kRWxlbWVudEJ5SWQoY29tcElkKSBhcyBDb21ib0JveENvbXBvbmVudDtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChjb21ib0JveCA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gZmluZCBjb21ib2JveDogJHtjb21wSWR9IGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21ib0JveC5zZXRTZWxlY3RWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgY29tcG9uZW50IGFuZCBmb2N1cyBpdFxuICAgKiBAcGFyYW0gY29tcElkIENvbXBvbmVudCBpZFxuICAgKi9cbiAgc2V0Rm9jdXMoY29tcElkOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgaWYgKGNvbXBJZCA9PSB0aGlzLmlkKSB7XG4gICAgICB0aGlzLnNob3dWaWV3KCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbXBJZCA9PSBudWxsIHx8IGNvbXBJZCA9PSAnJykge1xuICAgICAgdGhpcy5yZXF1ZXN0Rm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29tcCA9IFVpRG9jdW1lbnQuZmluZEVsZW1lbnRCeUlkKGNvbXBJZCk7XG5cbiAgICAgIGlmIChjb21wID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5hYmxlIHRvIHNldEZvY3VzLCBjb21wb25lbnQgd2l0aCBpZDogJHtjb21wSWR9IGlzIG5vdCBmb3VuZGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcC5yZXF1ZXN0Rm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRpdGxlIG9uIFtbRGlhbG9nQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHRpdGxlIFRpdGxlIG9mIGRpYWxvZ1xuICAgKi9cbiAgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IHRpdGxlO1xuXG4gICAgICB0aGlzLmRpYWxvZy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDbG9zZSBbW2RpYWxvZ11dIGlmIGl0IGV4aXN0cyBvbiB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gZGVsYXlEaWFsb2dDbG9zZVxuICAgKi9cbiAgY2xvc2UoZGVsYXlEaWFsb2dDbG9zZT86IGJvb2xlYW4pIHtcblxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZGlhbG9nLmlkKTtcbiAgICBkaWFsb2cuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBub25lO1wiKTtcbiAgICBkaWFsb2cuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHRoaXMuX3ZpZXdTdGF0dXMgPSAxO1xuXG4gICAgdGhpcy5jbGVhbnVwKCk7XG5cbiAgICBpZiAodGhpcy5kaWFsb2cgIT0gbnVsbCkge1xuICAgICAgaWYoZGVsYXlEaWFsb2dDbG9zZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZy5jbG9zZShudWxsLCBmYWxzZSk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaWFsb2cuY2xvc2UobnVsbCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRHluYW1pY1BhZ2UgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldEluamVjdG9yKER5bmFtaWNQYWdlc1NlcnZpY2UpLnJlbW92ZVZpZXcodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmdldFNlc3Npb24oKSAhPSBudWxsICYmIHRoaXMuZ2V0U2Vzc2lvbigpLmdldFJvdXRlTmF2aWdhdG9yU2VydmljZSgpICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0Um91dGVOYXZpZ2F0b3JTZXJ2aWNlKCkuZGVzdHJveVJvdXRlKHRoaXMucm91dGVVcmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBjaGFuZ2Ugcm91dGUsIHNlc3Npb24gb3Igcm91dGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gY2xvc2UgVmlld0NvbXBvbmVudCwgRGlhbG9nQ29tcG9uZW50IG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbmFtZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwid2luZG93XCI7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbmQgYWRkIGFuIE1DT1xuICAgKiBAcGFyYW0gbWNvTmFtZVxuICAgKiBAcGFyYW0gbWNvQ2xhc3NcbiAgICovXG4gIGNyZWF0ZU1jbyhtY29OYW1lOiBzdHJpbmcsIG1jb0NsYXNzOiBUeXBlPGFueT4pOiBhbnkge1xuICAgIGxldCBtY286IGFueSA9IHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLmdldE1jbyhtY29OYW1lKTtcblxuICAgIC8vY2hlY2sgdG8gc2VlIGlmIE1DTyBhbHJlYWR5IGV4aXN0cz9cbiAgICBpZiAobWNvICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk1DTyBcIiArIG1jb05hbWUgKyBcIiBpcyBhbHJlYWR5IGV4aXN0cywgdXNlIGV4aXN0aW5nIG9uZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWNvID0gbmV3IG1jb0NsYXNzKHRoaXMpO1xuICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkucmVnaXN0ZXJNY28obWNvTmFtZSwgbWNvKTtcblxuICAgICAgLy9hZGQgbWNvIG5hbWUgZm9yIHRyYWNraW5nICh0byBiZSBjbGVhbmVkIGFuZCByZW1vdmVkIGxhdGVyKVxuICAgICAgdGhpcy5tY29zLmFkZChtY29OYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWNvO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBNQ08gZnJvbSBjbGllbnQgc2Vzc2lvblxuICAgKiBAcGFyYW0gbWNvTmFtZSBOYW1lIG9mIE1DTyB0byBnZXRcbiAgICogQHJldHVybnMgTUNPXG4gICAqL1xuICBnZXRNY28obWNvTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkuZ2V0TWNvKG1jb05hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHN0cmluZyBhbmQgY3JlYXRlIGNvbXBvbmVudCBiYXNlIG9uIGl0XG4gICAqXG4gICAqIEBwYXJhbSBkb21TdHJpbmdcbiAgICovXG4gIGNyZWF0ZUNvbXBvbmVudChkb21TdHJpbmc6IHN0cmluZykge1xuICAgIC8vdGV4dEZpZWxkXG4gICAgLy9sYWJlbFxuICAgIC8vcGFuZWxcbiAgICAvL2hvcml6b250YWxTZXBhcmF0b3JcbiAgICB0cnkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IEFwcFV0aWxzLnBhcnNlRG9tKGRvbVN0cmluZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBETyBOT1QgVVNFIFRISVMsIGV4aXN0cyBvbmx5IGZvciBsZWdhY3kgc3VwcG9ydCwgdXNlIG5nSWYgaW5zdGVhZFxuICAgKiBAcGFyYW0gY29tcG9uZW50VHlwZVxuICAgKi9cbiAgX2NyZWF0ZUR5bmFtaWNDb21wb25lbnQoY29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZSk6IEJhc2VDb21wb25lbnQge1xuICAgIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsICYmIHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tcEZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA9IHRoaXMuZ2V0U2Vzc2lvbigpLmdldEluamVjdG9yKENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICAgICAgaWYgKGNvbXBGYWN0b3J5ICE9IG51bGwpIHtcbiAgICAgICAgICBsZXQgY29tcFJlZjogQ29tcG9uZW50UmVmPEJhc2VDb21wb25lbnQ+O1xuICAgICAgICAgIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkxBQkVMKSB7XG4gICAgICAgICAgICBjb21wUmVmID0gdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTGFiZWxDb21wb25lbnQpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQlVUVE9OKSB7XG4gICAgICAgICAgICBjb21wUmVmID0gdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQnV0dG9uQ29tcG9uZW50KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkNPTUJPQk9YKSB7XG4gICAgICAgICAgICBjb21wUmVmID0gdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29tYm9Cb3hDb21wb25lbnQpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuVEVYVF9GSUVMRCkge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFRleHRGaWVsZENvbXBvbmVudCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DSEVDS0JPWCkge1xuICAgICAgICAgICAgY29tcFJlZiA9IHRoaXMuZGlhbG9nLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KENoZWNrYm94Q29tcG9uZW50KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlJBRElPKSB7XG4gICAgICAgICAgICBjb21wUmVmID0gdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUmFkaW9CdXR0b25Db21wb25lbnQpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuVEVYVEFSRUEpIHtcbiAgICAgICAgICAgIGNvbXBSZWYgPSB0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wRmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUZXh0QXJlYUNvbXBvbmVudCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGNvbXBvbmVudCB0eXBlOiBcIiArIGNvbXBvbmVudFR5cGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb21wUmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXAgPSBjb21wUmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgY29tcC5jb21wUmVmID0gY29tcFJlZjtcbiAgICAgICAgICAgIGNvbXAuY29tcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcImZhaWwgdG8gY3JlYXRlIGNvbXBvbmVudDogXCIgKyBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERPIE5PVCBVU0UgVEhJUyEgRXhpc3RzIG9ubHkgZm9yIGxlZ2FjeSBzdXBwb3J0XG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgX3JlbW92ZUNvbXBvbmVudChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChpZCk7XG5cbiAgICBpZiAoY2hpbGQgIT0gbnVsbCkge1xuICAgICAgY2hpbGQuZGVzdHJveUNvbXBvbmVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZGlhbG9nICE9IG51bGwgJiZcbiAgICAgICAgdGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciAhPSBudWxsICYmXG4gICAgICAgICh0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyIGFzIGFueSkuX2VtYmVkZGVkVmlld3MgIT0gbnVsbCAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KCh0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyIGFzIGFueSkuX2VtYmVkZGVkVmlld3MpICYmXG4gICAgICAgICh0aGlzLmRpYWxvZy52aWV3Q29udGFpbmVyIGFzIGFueSkuX2VtYmVkZGVkVmlld3MubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZXYgPSAodGhpcy5kaWFsb2cudmlld0NvbnRhaW5lciBhcyBhbnkpLl9lbWJlZGRlZFZpZXdzO1xuXG4gICAgICAgICAgZm9yIChsZXQgdiBvZiBldikge1xuICAgICAgICAgICAgaWYgKHYubm9kZXMgJiYgQXJyYXkuaXNBcnJheSh2Lm5vZGVzKSAmJiB2Lm5vZGVzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICBmb3IgKGxldCBuIG9mIHYubm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobi5pbnN0YW5jZSAhPSBudWxsICYmIG4uaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG4uaW5zdGFuY2UuZGVzdHJveUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBuLmluc3RhbmNlLmRlc3Ryb3lDb21wb25lbnQoKVxuXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXBwVXRpbHMuZW5hYmxlTG9nZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlJlbW92ZWQgY29tcG9uZW50OiBcIiArIGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgdmlldyBjYW4gYmUgYWN0aXZlXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdmlldyBjYW4gYmUgYWN0aXZlIG9yIHBhcmVudCBpcyBudWxsXG4gICAqL1xuICBpc1ZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQmVBY3RpdmVWaWV3ICE9PSBmYWxzZSA/IHRydWUgOiAodGhpcy5nZXRQYXJlbnQoKSA9PSBudWxsID8gdHJ1ZSA6IGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgdmlldyBjYW4ndCBiZSBhY3RpdmUgdmlld1xuICAgKiBAcmV0dXJucyBUcnVlIGlmIHZpZXcgY2FuJ3QgYmUgYWN0aXZlIHZpZXdcbiAgICovXG4gIGlzTm9uZUFjdGl2ZVZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQmVBY3RpdmVWaWV3ID09PSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIGlzIGEgZHluYW1pYyBwYWdlXG4gICAqIEByZXR1cm5zIFRydWUgaWYgaXQgaXMgYSBkeW5hbWljIHBhZ2VcbiAgICovXG4gIGlzRHluYW1pY1ZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNEeW5hbWljUGFnZSA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tEaWFsb2dDb21wb25lbnRdXSBpbnN0YW5jZSB6LWluZGV4XG4gICAqIEBwYXJhbSBuZXdaSW5kZXhcbiAgICovXG4gIHVwZGF0ZVpJbmRleChuZXdaSW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsICYmIHRoaXMuaXNEZXN0cm95ZWQgIT09IHRydWUgJiYgdGhpcy5kaXNhYmxlZCAhPSB0cnVlKSB7XG4gICAgICB0aGlzLmRpYWxvZy51cGRhdGVaSW5kZXgobmV3WkluZGV4KTtcbiAgICAgIHRoaXMuekluZGV4ID0gbmV3WkluZGV4O1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIE9iamVjdCBKU09OIG1ldGFkYXRhIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgdG9Kc29uKCk6IHt9IHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICB0aGlzLnNldEpzb24oanNvbiwgXCJzY3JlZW5JbmRleFwiLCB0aGlzLmdldFNjcmVlbkluZGV4KCkpO1xuXG4gICAgaWYgKHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLmFjdGl2ZVZpZXcoKS5nZXRJZCgpID09PSB0aGlzLmdldElkKCkgJiYgVWlEb2N1bWVudC5tZW51SXRlbUVsZW1lbnRNYXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgbWVudUl0ZW1zOiBBcnJheTx7fT4gPSBbXTtcbiAgICAgIGNvbnN0IGtleVNldCA9IFVpRG9jdW1lbnQubWVudUl0ZW1FbGVtZW50TWFwLmtleXMoKTtcbiAgICAgIGxldCBrZXlJdCA9IGtleVNldC5uZXh0KCk7XG5cbiAgICAgIHdoaWxlKGtleUl0LmRvbmUgIT09IHRydWUpIHtcbiAgICAgICAgbWVudUl0ZW1zLnB1c2goVWlEb2N1bWVudC5tZW51SXRlbUVsZW1lbnRNYXAuZ2V0KGtleUl0LnZhbHVlKS50b0pzb24oKSk7XG4gICAgICAgIGtleUl0ID0ga2V5U2V0Lm5leHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2luYWN0aXZlTWVudUl0ZW1zICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qga2V5SXQgPSB0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcy52YWx1ZXMoKTtcbiAgICAgICAgbGV0IHJzID0ga2V5SXQubmV4dCgpO1xuXG4gICAgICAgIHdoaWxlKHJzLmRvbmUgIT09IHRydWUpIHtcbiAgICAgICAgICBtZW51SXRlbXMucHVzaChycy52YWx1ZS50b0pzb24oKSk7XG4gICAgICAgICAgcnMgPSBrZXlJdC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGpzb25bXCJjaGlsZHJlblwiXSAhPSBudWxsKSB7XG4gICAgICAgIGpzb25bXCJjaGlsZHJlblwiXSA9IGpzb25bXCJjaGlsZHJlblwiXS5jb25jYXQobWVudUl0ZW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpzb25bXCJjaGlsZHJlblwiXSA9IG1lbnVJdGVtcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGlkIHRvIFtbZGVmSWRzXV1cbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICB0cmFja0RlZihpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWZJZHMucHVzaChpZCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjbG9zZU9uSW5pdCA9IHsgaWRTZXQgOiBuZXcgU2V0PHN0cmluZz4oKSwgdHlwZXMgOiBuZXcgU2V0PFR5cGU8Vmlld0NvbXBvbmVudD4+KCksIGhvb2tlZCA6IGZhbHNlIH07XG5cbiAgc3RhdGljIGhhc0lkQXNDbG9zZVRhcmdldE9uSW5pdCh2aWV3SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0LmlkU2V0Lmhhcyh2aWV3SWQpO1xuICB9XG5cbiAgc3RhdGljIGhhc1R5cGVBc0Nsb3NlVGFyZ2V0T25Jbml0KHZpZXdUeXBlOiBUeXBlPFZpZXdDb21wb25lbnQ+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFZpZXdDb21wb25lbnQuY2xvc2VPbkluaXQudHlwZXMuaGFzKHZpZXdUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGhvb2tDbG9zZVByZXZWaWV3MkR5bmFtaWNQYWdlc1NlcnZpY2UoKSB7XG4gICAgaWYoIVZpZXdDb21wb25lbnQuY2xvc2VPbkluaXQuaG9va2VkKSB7XG4gICAgICBEeW5hbWljUGFnZXNTZXJ2aWNlLm9uQ3JlYXRlVmlld0Nsb3NlciA9IChzZXNzaW9uU2VydmljZSwgdmlld1R5cGUsIHJvdXRlSWQpID0+IHtcbiAgICAgICAgVmlld0NvbXBvbmVudC5jbG9zZVByZXZWaWV3KHNlc3Npb25TZXJ2aWNlLCByb3V0ZUlkID8gcm91dGVJZCA6IHZpZXdUeXBlKTtcbiAgICAgIH07XG4gICAgICBWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0Lmhvb2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb3NlUHJldlZpZXcoc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCB0YXJnZXQ6IHN0cmluZ3xUeXBlPFZpZXdDb21wb25lbnQ+KSB7XG4gICAgbGV0IHZpZXc6IFZpZXdDb21wb25lbnQgPSBudWxsO1xuICAgIGlmKCh0eXBlb2YgdGFyZ2V0KSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgc2NyZWVuSWQ6IHN0cmluZyA9IHRhcmdldCBhcyBzdHJpbmc7XG4gICAgICBpZihWaWV3Q29tcG9uZW50Lmhhc0lkQXNDbG9zZVRhcmdldE9uSW5pdChzY3JlZW5JZCkpIHtcbiAgICAgICAgdmlldyA9IHNlc3Npb25TZXJ2aWNlLmdldE1jb0NvbnRhaW5lcigpLmdldFZpZXdCeUlkKHNjcmVlbklkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYodGFyZ2V0IGluc3RhbmNlb2YgVHlwZSkge1xuICAgICAgbGV0IHZpZXdUeXBlOiBUeXBlPFZpZXdDb21wb25lbnQ+ID0gdGFyZ2V0IGFzIFR5cGU8Vmlld0NvbXBvbmVudD47XG4gICAgICBpZihWaWV3Q29tcG9uZW50Lmhhc1R5cGVBc0Nsb3NlVGFyZ2V0T25Jbml0KHZpZXdUeXBlKSkge1xuICAgICAgICB2aWV3ID0gXy5maW5kKHNlc3Npb25TZXJ2aWNlLmdldE1jb0NvbnRhaW5lcigpLmdldFZpZXdzKCksIHYgPT4gdi5jb25zdHJ1Y3RvciA9PSB2aWV3VHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9WaXZpZnk6IGlmIHZpZXcgaGFzIGFjdGlvbkZvcndhcmROYW1lLCBkbyBub3QgY2xvc2UgdGhlIHZpZXcgYXMgd2Ugd2lsbCBjYWxsIGl0IGhhbmRsZUFjdGlvbkZvcndhcmQoKSB0byByZWZyZXNoIHRoZSBzY3JlZW4uXG4gICAgaWYodmlldyAmJiB2aWV3LmFjdGlvbkZvcndhcmROYW1lID09IG51bGwpIHtcbiAgICAgIHZpZXcuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgcHJldmlvdXMgdmVyc2lvbiBvZiB0aGlzIHZpZXcgKGlmIHRoaXMgdmlldyBpcyBcInJlLW9wZW5cIikuIFRoaXMgaXMgdG8gc3VwcG9ydCB1c2FnZVxuICAgKiBvZiByZW1vdmluZyBjdXJyZW50IHZpZXcgYW5kIHJlcGxhY2luZyB3aXRoIG5ldyB2aWV3XG4gICAqIEBwYXJhbSB2aWV3SWRcbiAgICovXG4gIGNsb3NlVmlldyh2aWV3SWQ6IHN0cmluZywgZGVsYXlEaWFsb2dDbG9zZT86IGJvb2xlYW4pIHtcbiAgICAvL2lmIHRoZSB2aWV3IGFib3V0IHRvIGJlIGNsb3NlZCBoYXMgdGhlIHNhbWUgXCJpZFwiIChpLmUuIHNhbWUgc2NyZWVuIGJ1dCBkaWZmKS5cbiAgICBjb25zdCBjaGVja1NjcmVlbkluaXF1ZSA9IHZpZXdJZCA9PT0gdGhpcy5pZDtcblxuICAgIGNvbnN0IG9sZFZpZXc6IFZpZXdDb21wb25lbnQgPSBfLmZpbmQodGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkuZ2V0Vmlld3MoKSwgKHZpZXc6IFZpZXdDb21wb25lbnQpPT57XG4gICAgICByZXR1cm4gdmlldy5pZCA9PT0gdmlld0lkICYmXG4gICAgICAgIChjaGVja1NjcmVlbkluaXF1ZSA9PT0gZmFsc2UgfHxcbiAgICAgICAgICAoY2hlY2tTY3JlZW5JbmlxdWUgPT09IHRydWUgJiZcbiAgICAgICAgICAgIHZpZXcudW5pcXVlSWQgIT09IHRoaXMudW5pcXVlSWRcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmIChvbGRWaWV3ICE9IG51bGwpIHtcbiAgICAgIC8vZm9yIGNhc2Ugd2hlcmUgd2UgYXJlIHRoZSBzYW1lIHNjcmVlbiwgd2Ugc2hvdWxkJ3QgY2FsbCBiZWZvcmVEZXN0cm95Q2IgdG8gY2xlYW51cFxuICAgICAgaWYgKGNoZWNrU2NyZWVuSW5pcXVlID09PSB0cnVlKSB7XG4gICAgICAgIG9sZFZpZXcuYmVmb3JlRGVzdHJveUNiID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgb2xkVmlldy5jbG9zZShkZWxheURpYWxvZ0Nsb3NlKTtcbiAgICB9XG4gICAgaWYoIXRoaXMudmlld0lzSW5pdGlhbGl6ZWQgJiYgY2hlY2tTY3JlZW5JbmlxdWUpIHtcbiAgICAgIC8vIFRoaXMgY2FzZSBpcyB0b28gbGF0ZSB0byBjbG9zZS4gVGhpcyBvYmplY3QncyB2aWV3IGlzIGFscmVhZHkgZXhpc3QsIHJldXNlZCBhbmQgdW4tY2xvc2FibGUhXG4gICAgICAvLyBUbyBzYXZlIHRoaXMgdHJ5aW5nLCBhbmQgZXhlY3V0ZSBjbG9zaW5nIGF0IHJvdXRlciBiZWZvcmUgY3JlYXRlIG5ldyB2aWV3LlxuICAgICAgaWYoIVZpZXdDb21wb25lbnQuY2xvc2VPbkluaXQuaWRTZXQuaGFzKHZpZXdJZCkpIHtcbiAgICAgICAgVmlld0NvbXBvbmVudC5jbG9zZU9uSW5pdC5pZFNldC5hZGQodmlld0lkKTtcbiAgICAgIH1cbiAgICAgIGxldCBvVHlwZSA9IHRoaXMuY29uc3RydWN0b3IgYXMgVHlwZTxWaWV3Q29tcG9uZW50PjtcbiAgICAgIGlmKCFWaWV3Q29tcG9uZW50LmNsb3NlT25Jbml0LnR5cGVzLmhhcyhvVHlwZSkpIHtcbiAgICAgICAgVmlld0NvbXBvbmVudC5jbG9zZU9uSW5pdC50eXBlcy5hZGQob1R5cGUpO1xuICAgICAgfVxuICAgICAgVmlld0NvbXBvbmVudC5ob29rQ2xvc2VQcmV2VmlldzJEeW5hbWljUGFnZXNTZXJ2aWNlKCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIGEgW1tQb3B1cE1lbnVEaXJlY3RpdmVdXSB0byBbW3BvcHVwTWVudXNdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gcG9wdXBNZW51IFBvcHVwIG1lbnUgdG8gYWRkIHRvIGludGVybmFsIFtbcG9wdXBNZW51c11dIGxpc3RcbiAgICovXG4gIHJlZ2lzdGVyUG9wdXBNZW51KHBvcHVwTWVudTogUG9wdXBNZW51RGlyZWN0aXZlKSB7XG4gICAgaWYgKHRoaXMucG9wdXBNZW51cyA9PSBudWxsKSB7XG4gICAgICB0aGlzLnBvcHVwTWVudXMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcHVwTWVudXMucHVzaChwb3B1cE1lbnUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIFtbcG9wdXBNZW51c11dIGhhcyAxIG9yIG1vcmUgaXRlbXNcbiAgICogQHJldHVybnMgVHJ1ZSBpZiBbW3BvcHVwTWVudXNdXSBpcyBkZWZpbmVkIGFuZCBoYXMgYXQgbGVhc3QgMSBpdGVtXG4gICAqL1xuICBoYXNQb3B1cE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9wdXBNZW51cyAhPSBudWxsICYmIHRoaXMucG9wdXBNZW51cy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgSUQgb2YgdGhlIGZpcnN0IFtbUG9wdXBNZW51RGlyZWN0aXZlXV0gaW5zdGFuY2UgaW4gW1twb3B1cE1lbnVzXG4gICAqIEByZXR1cm5zIElkIG9mIHBvcHVwIG1lbnVcbiAgICovXG4gIGdldEZpcnN0UG9wdXBNZW51SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9wdXBNZW51cyAhPSBudWxsICYmIHRoaXMucG9wdXBNZW51cy5sZW5ndGggPiAwID8gdGhpcy5wb3B1cE1lbnVzWzBdLmlkIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSB0byBbW0Jhc2VDb21wb25lbnRdXSBmaW5kRWxlbWVudEJ5SWQgbWV0aG9kXG4gICAqIEBwYXJhbSBpZCBDb21wb25lbnQgSURcbiAgICovXG4gIGZpbmRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgbGV0IGNvbXA6IEJhc2VDb21wb25lbnQgPSBzdXBlci5maW5kRWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgaWYgKGNvbXAgPT0gbnVsbCAmJiB0aGlzLl90YWJsZUNvbHVtbnNNYXAgIT0gbnVsbCkge1xuICAgICAgY29tcCA9IHRoaXMuX3RhYmxlQ29sdW1uc01hcC5nZXQoS2V5VXRpbHMudG9NYXBLZXkoaWQpKTtcbiAgICB9XG5cbiAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAvL2NoZWNrIGZvciBpbmFjdGl2ZSBtZW51IGl0ZW1zXG4gICAgICBjb21wID0gdGhpcy5nZXRJbmFjdGl2ZU1lbnVJdGVtKGlkKSBhcyBhbnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICBmcmVlemVDaGFuZ2VEZXRlY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuZ2V0Q2hhbmdlRGV0ZWN0b3IoKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkuZGV0YWNoKCk7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvbkZyb3plbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc3VtZSBjaGFuZ2UgZGV0ZWN0aW9uIGlmIGl0IGhhcyBiZWVuIHN0b3BwZWRcbiAgICovXG4gIHVuZnJlZXplQ2hhbmdlRGV0ZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5nZXRDaGFuZ2VEZXRlY3RvcigpLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuZ2V0Q2hhbmdlRGV0ZWN0b3IoKS5yZWF0dGFjaCgpO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uRnJvemVuID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgY2hhbmdlIGRldGVjdGlvbiBoYXMgYmVlbiBzdG9wcGVkXG4gICAqIEByZXR1cm5zIFRydWUgaWYgY2hhbmdlIGRldGVjdGlvbiBoYXMgYmVlbiBzdG9wcGVkXG4gICAqL1xuICBpc0NoYW5nZURldGVjdGlvbkZyb3plbigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VEZXRlY3Rpb25Gcm96ZW4gPT09IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBpcyBhIGNvbnRhaW5lciBjb21wb25lbnRcbiAgICogQHJldHVybnMgVHJ1ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGlzQ29udGFpbmVyKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBmb3IgcGFyZW50IFtbQmFzZUNvbXBvbmVudF1dIGFuZCBbW2RpYWxvZ11dIGluc3RhbmNlXG4gICAqL1xuICBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHN1cGVyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhpcyBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIG1hcmtGb3JDaGVjaygpIHtcbiAgICBzdXBlci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgdmlldyBhZnRlciBpdCBoYXMgYmVlbiBoaWRkZW4gdmlhIG1pbmltaXplZFxuICAgKi9cbiAgc2hvd1ZpZXcoKSB7XG4gICAgaWYgKHRoaXMuZGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGlhbG9nLnNob3dWaWV3KCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMuaXNNaW5pbWl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogTWluaW1pemUgdGhlIFtbZGlhbG9nXV0gb2YgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIG1pbmltaXplKCkge1xuICAgIGlmICh0aGlzLmRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZy5taW5pbWl6ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGlzIGNvbXBvbmVudCB0byB0aGUgdG9wIG9mIHRoZSB2aWV3IHN0YWNrXG4gICAqL1xuICBtb3ZlVG9Ub3AoKSB7XG4gICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkucmVTdGFja1ZpZXcodGhpcy5pZCksIHRoaXMuc2NyZWVuSW5kZXg7XG4gIH1cblxuICB0cmFja0luYWN0aXZlTWVudUl0ZW0obWVudUl0ZW06IE1lbnVJdGVtQ29tcG9uZW50KSB7XG4gICAgY29uc3QgaWQgPSBtZW51SXRlbS5nZXRJZCgpO1xuXG4gICAgY29uc3QgZmF1eE1lbnVJdGVtID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcihudWxsLCBcIm1lbnVJdGVtXCIsIG51bGwpO1xuICAgIGZhdXhNZW51SXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XG5cbiAgICBpZiAobWVudUl0ZW0uaXRlbSAhPSBudWxsICYmIG1lbnVJdGVtLml0ZW0uY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBrZXlzID0gXy5rZXlzKG1lbnVJdGVtLml0ZW0uY3VzdG9tQXR0cmlidXRlcyk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gXCJpZFwiKSB7XG4gICAgICAgICAgZmF1eE1lbnVJdGVtLnNldEF0dHJpYnV0ZShrZXksIG1lbnVJdGVtLml0ZW0uY3VzdG9tQXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MRWxlbWVudFdyYXBwZXI+KCk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5hY3RpdmVNZW51SXRlbXMuc2V0KGlkLCBmYXV4TWVudUl0ZW0pO1xuICB9XG5cbiAgZ2V0SW5hY3RpdmVNZW51SXRlbShpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luYWN0aXZlTWVudUl0ZW1zICE9IG51bGwgPyB0aGlzLl9pbmFjdGl2ZU1lbnVJdGVtcy5nZXQoaWQpIDogbnVsbDtcbiAgfVxuXG4gIGNsZWFudXAoKSB7XG4gICAgc3VwZXIuY2xlYW51cCgpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaXQgPSB0aGlzLl92aWV3Q2hpbGRyZW5NYXAudmFsdWVzKCk7XG4gICAgICBsZXQgdmFsID0gY2l0Lm5leHQoKTtcblxuICAgICAgd2hpbGUodmFsLmRvbmUgIT09IHRydWUpIHtcbiAgICAgICAgLy9zb21lIGNoaWxkcmVuIGFyZSBub3QgYWN0dWFsIEJhc2VDb21wb25lbnRcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwudmFsdWUuZW1wdHlDaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdmFsLnZhbHVlLmVtcHR5Q2hpbGRyZW4oKTtcbiAgICAgICAgICB2YWwudmFsdWUuX2lzRHlpbmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsID0gY2l0Lm5leHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdXBlci5lbXB0eUNoaWxkcmVuKCk7XG4gIH1cblxuICBpc01vZGFsRGlhbG9nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZyAhPSBudWxsICYmICh0aGlzLmRpYWxvZy5tb2RhbCA9PT0gdHJ1ZSB8fCB0aGlzLmRpYWxvZy5tb2RhbCA9PT0gXCJ0cnVlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgaGFuZGxlQWN0aW9uRm9yd2FyZCgpIHtcbiAgfVxuICAvKipcbiAgICogc2NyZWVuIGluZGV4KDB+KeOBruaWh+Wtl+WIl+ihqOePvlxuICAgKi9cbiAgZ2V0U2NyZWVuSW5kZXgoKTpzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5zY3JlZW5JbmRleCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuc2NyZWVuSW5kZXggPT09IG51bGwpXG4gICAgICA/ICcnXG4gICAgICA6IHRoaXMuc2NyZWVuSW5kZXgudG9TdHJpbmcoKTtcbiAgfVxuICByZWdpc3RlclNjcmVlbkluZGV4KCl7XG4gICAgdGhpcy5zY3JlZW5JbmRleCA9IHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLm5leHRTY3JlZW5JbmRleCh0aGlzLmJhc2VTY3JlZW5JZCk7XG4gIH1cblxuICBzZXRWaXNpYmxlKGJvbzogYm9vbGVhbikge1xuICAgIHN1cGVyLnNldFZpc2libGUoYm9vKTtcbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5yZWZyZXNoQnJlYWRDcnVtYigpO1xuICB9XG59XG4iXX0=