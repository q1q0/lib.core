import { Injectable, Directive, ElementRef, EventEmitter, Output, NgZone, Input, NgModule, Component, SkipSelf, Optional, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, forwardRef, ContentChildren, ViewChild, TemplateRef, ViewContainerRef, ViewChildren, CUSTOM_ELEMENTS_SCHEMA, IterableDiffers, ViewEncapsulation, ContentChild, Injector, ComponentFactoryResolver, Type, HostListener, defineInjectable, inject } from '@angular/core';
import { map, keys, forEach, uniq, filter, parseInt as parseInt$1, random, findIndex, find, isEqual, orderBy, clone, sortBy, get, throttle, concat, padStart, uniqBy, lastIndexOf } from 'lodash';
import { Subject, timer } from 'rxjs';
import * as moment from 'moment';
import { isMoment } from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownDirective, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import * as tabbableFRollup from 'tabbable';
import * as momentImported from 'moment-timezone';
import { writeText } from 'clipboard-polyfill';
import { debounce } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This constant provide a global access to injector so we can use it to retrieve
 * service from place where we can't inject (like function).
 *
 * !!!!!!!!!!!!!!DO NOT USE THIS IN PLACES WHERE YOU CAN INJECT SERVICES!!!!!!!!!!!
  @type {?} */
let injectorRef;
/** @type {?} */
const appInjector = (injector) => {
    if (injector) {
        injectorRef = injector;
    }
    return injectorRef;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const AttributesEnum = {
    ID: 0,
    VISIBLE: 1,
    CLASS: 2,
    DISABLED: 3,
    ENABLED: 4,
    TEXT: 5,
    COLOR: 6,
    ON_COMMAND: 7,
    REQUIRE: 8,
    TITLE: 9,
    FONT_BOLD: 10,
    SELECTED: 11,
    BG_COLOR: 12,
    VALUE: 13,
    PATTERN: 14,
    MAX_LENGTH: 15,
    MAX: 16,
    MIN: 17,
};
AttributesEnum[AttributesEnum.ID] = 'ID';
AttributesEnum[AttributesEnum.VISIBLE] = 'VISIBLE';
AttributesEnum[AttributesEnum.CLASS] = 'CLASS';
AttributesEnum[AttributesEnum.DISABLED] = 'DISABLED';
AttributesEnum[AttributesEnum.ENABLED] = 'ENABLED';
AttributesEnum[AttributesEnum.TEXT] = 'TEXT';
AttributesEnum[AttributesEnum.COLOR] = 'COLOR';
AttributesEnum[AttributesEnum.ON_COMMAND] = 'ON_COMMAND';
AttributesEnum[AttributesEnum.REQUIRE] = 'REQUIRE';
AttributesEnum[AttributesEnum.TITLE] = 'TITLE';
AttributesEnum[AttributesEnum.FONT_BOLD] = 'FONT_BOLD';
AttributesEnum[AttributesEnum.SELECTED] = 'SELECTED';
AttributesEnum[AttributesEnum.BG_COLOR] = 'BG_COLOR';
AttributesEnum[AttributesEnum.VALUE] = 'VALUE';
AttributesEnum[AttributesEnum.PATTERN] = 'PATTERN';
AttributesEnum[AttributesEnum.MAX_LENGTH] = 'MAX_LENGTH';
AttributesEnum[AttributesEnum.MAX] = 'MAX';
AttributesEnum[AttributesEnum.MIN] = 'MIN';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class KeyUtils {
    /**
     * Make key case insensitive
     * @param {?} key
     * @return {?}
     */
    static toMapKey(key) {
        if (key != null) {
            return key.toLowerCase();
        }
        return null;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static toJsonValue(val) {
        if (typeof val === "number" || typeof val === "boolean") {
            return val + "";
        }
        else {
            return val;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class McoContainerService {
    constructor() {
        /**
         * Keeps internal list of active ViewComponents
         */
        this.activeViewsStack = [];
        /**
         * Internal map of MCO instances
         */
        this._mcoMap = new Map();
        this.MIN_Z_INDEX = 1000;
        this.MAX_Z_INDEX = 99999;
        //1050 is for actual modal
        this.viewsChanged = new Subject();
    }
    /**
     * Get mco instance from internal [[_mcoMap]]
     * @param {?} mcoName Name of MCO instance
     * @return {?}
     */
    getMco(mcoName) {
        return this._mcoMap.get(KeyUtils.toMapKey(mcoName));
    }
    /**
     * Get the maximum allowed z-index value for layering windows
     * @return {?}
     */
    getMaxZIndex() {
        return this.MAX_Z_INDEX;
    }
    /**
     * Alias of [[registerMco]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    addMco(mcoName, mco) {
        this.registerMco(mcoName, mco);
    }
    /**
     * Add an mco instance to internal [[_mcoMap]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    registerMco(mcoName, mco) {
        this._mcoMap.set(KeyUtils.toMapKey(mcoName), mco);
    }
    /**
     * Remove mco object from internal [[_mcoMap]]
     * @param {?} mcoName Name of mco instance to remove
     * @return {?}
     */
    removeMco(mcoName) {
        /** @type {?} */
        const key = KeyUtils.toMapKey(mcoName);
        /** @type {?} */
        const mco = this._mcoMap.get(key);
        if (mco != null && typeof mco["cleanup"] === "function") {
            mco.cleanup();
        }
        this._mcoMap.delete(key);
    }
    /**
     * Push view to the last active view stack. This will be the view that returned
     * when popLastActiveView is called.
     *
     * @param {?} view ViewComponent to be add to the stack
     * @return {?}
     */
    registerView(view) {
        if (view.canBeActiveView !== true) {
            // this.activeViewsStack.splice(0, 0, view);
            // view.zIndex = this.MIN_Z_INDEX - this.activeViewsCount();
            if (this.actionForwardHandler == null) {
                this.actionForwardHandler = new Map();
            }
            this.actionForwardHandler.set(view.actionForwardName, view);
        }
        else {
            this.activeViewsStack.push(view);
            view.zIndex = this.getViewZIndex();
        }
        this.activeViewsStack = uniqBy(this.activeViewsStack, (v) => v.uniqueId);
    }
    /**
     * Pop last active view. This will remove the view from the active stack
     * @return {?}
     */
    popLastActiveView() {
        return this.activeViewsStack.pop();
    }
    /**
     * Remove a view that has been destroyed from the stack.
     *
     * @param {?} view ViewComponent to be removed from stack
     * @return {?}
     */
    removeView(view) {
        if (view.canBeActiveView !== true) {
            if (this.actionForwardHandler != null) {
                this.actionForwardHandler.delete(view.actionForwardName);
            }
        }
        else {
            this.activeViewsStack = filter(this.activeViewsStack, (v) => v.uniqueId !== view.uniqueId);
            this.reStackView();
        }
    }
    /**
     * Minimize a view window by ID
     * @param {?} viewId Id of view to minimize
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    minimizeView(viewId, screenIndex = null) {
        /** @type {?} */
        const view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.isMinimized = true;
        }
        /** @type {?} */
        let activeView = null;
        /** @type {?} */
        let isModalActive = false;
        if (this.activeViewsCount() > 1) {
            /** @type {?} */
            const visibleViews = this.activeViewsStack.filter(v => v.isMinimized !== true && v.skipBreadCrumb !== true);
            if (visibleViews != null && visibleViews.length > 0) {
                activeView = visibleViews[visibleViews.length - 1];
                /** @type {?} */
                let i = visibleViews.length - 1;
                // Itterate through visibile views to look for the next dialog view (not subview)
                while (visibleViews[i] && !activeView.dialog) {
                    activeView = visibleViews[i];
                    i--;
                }
                /** @type {?} */
                let count = 0;
                do {
                    if (visibleViews[count]) {
                        isModalActive = visibleViews[count].isModalDialog();
                        count = count + 1;
                    }
                } while (isModalActive !== true && count < visibleViews.length);
            }
        }
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: activeView,
            minMaxEvent: true,
            isModalActive: isModalActive
        });
    }
    /**
     * Shows a view by id
     * @param {?} viewId Id of view to show
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    showView(viewId, screenIndex = null) {
        /** @type {?} */
        const view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.isMinimized = true;
        }
        /** @type {?} */
        let isModalActive = false;
        /** @type {?} */
        let count = 0;
        do {
            if (this.activeViewsStack[count]) {
                isModalActive = this.activeViewsStack[count].isModalDialog();
                count = count + 1;
            }
        } while (isModalActive !== true && count < this.activeViewsStack.length);
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: view,
            minMaxEvent: true,
            isModalActive: isModalActive
        });
    }
    /**
     * Close the view window
     * @param {?} viewId Id of view to close
     * @param {?=} screenIndex (optional) index of the screen if multi screen support
     * @return {?}
     */
    closeView(viewId, screenIndex = null) {
        /** @type {?} */
        const view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.close();
        }
    }
    /**
     * Get the number of current active view from [[activeViewsStack]]
     * @return {?} Number of active views
     */
    activeViewsCount() {
        return this.activeViewsStack.length;
    }
    /**
     * Check to see if a view is in the [[activeViewStack]]
     * @param {?} view ViewComponent's id as a string or [[ViewComponent]] instance
     * @return {?} True if the view component is in the [[activeViewStack]]
     */
    hasView(view) {
        if (typeof view === 'string') {
            return filter(this.activeViewsStack, (v) => v.id === /** @type {?} */ (view)).length > 0;
        }
        return filter(this.activeViewsStack, (v) => v.uniqueId === view.uniqueId).length > 0;
    }
    /**
     * Get the current active view
     * @return {?} the active view from the view stack
     */
    activeView() {
        return this.activeViewsCount() > 0 ? this.activeViewsStack[this.activeViewsCount() - 1] : null;
    }
    /**
     * Get a view from [[actriveViewStack]] by ID
     * @param {?} viewId Views id value
     * @param {?=} screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
     * @return {?} View that matches value of id
     */
    getViewById(viewId, screenIndex = null) {
        return find(this.activeViewsStack, (view) => {
            return view.id === viewId && (screenIndex == null || (screenIndex != null && view.screenIndex === screenIndex));
        });
    }
    /**
     * Get handler view component by name
     * @param {?} actionForwardName
     * @return {?} View component or null if there is no component with actionForwardName
     */
    getActionForwardHandler(actionForwardName) {
        if (this.actionForwardHandler != null) {
            return this.actionForwardHandler.get(actionForwardName);
        }
        return null;
    }
    /**
     * Get the [[actionForwardHandler]]
     * @return {?}
     */
    getActionForwardHandlerMap() {
        return this.actionForwardHandler;
    }
    /**
     * Get the [[activeViewStack]]
     * @return {?}
     */
    getViews() {
        return this.activeViewsStack;
    }
    /**
     * Update z-index (layer position) of all active views
     * @param {?=} topViewId ID of view component to set max z-index (top)
     * @param {?=} screenIndex
     * @return {?}
     */
    reStackView(topViewId = null, screenIndex = null) {
        this.activeViewsStack = sortBy(this.activeViewsStack, (view) => {
            //we are top view
            if (view.id === topViewId && (screenIndex == null || (screenIndex === view.screenIndex))) {
                return this.MAX_Z_INDEX;
            }
            return view.zIndex;
        });
        /** @type {?} */
        let isModalActive = false;
        forEach(this.activeViewsStack, (view, idx) => {
            view.updateZIndex(this.MIN_Z_INDEX + idx);
            if (isModalActive !== true && view.isModalDialog() === true) {
                isModalActive = true;
            }
        });
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: this.activeViewsStack[this.activeViewsStack.length - 1],
            isModalActive: isModalActive
        });
    }
    /**
     * Get the z-index
     * @return {?}
     */
    getViewZIndex() {
        return this.MIN_Z_INDEX + this.activeViewsCount();
    }
    /**
     * @param {?} views
     * @return {?}
     */
    getBreadcrumb(views) {
        return views.filter(v => v.skipBreadCrumb !== true && v.dialog != null && v.visible !== false);
    }
    /**
     * Get the session from an MCO instance
     * @param {?} mco
     * @return {?} Session
     */
    static getClientSessionFromMco(mco) {
        return mco.getSession();
    }
    /**
     * 次のscreenIndexを取得します。
     * screenIndexは1~8の値をとるように、サーバで想定されています。
     * @param {?} baseScreenId
     * @param {?=} id
     * @return {?}
     */
    nextScreenIndex(baseScreenId, id = null) {
        /** @type {?} */
        const existingScreens = this.activeViewsStack.filter(v => (id)
            ? v.id === id
            : v.baseScreenId === baseScreenId);
        if (existingScreens.length > 0) {
            /** @type {?} */
            const i = orderBy(existingScreens, (scr) => scr.screenIndex, "desc")
                .pop().screenIndex;
            return i + 1;
        }
        else {
            return 1;
        }
    }
    /**
     * @return {?}
     */
    refreshBreadCrumb() {
        /** @type {?} */
        let isModalActive = false;
        forEach(this.activeViewsStack, (view) => {
            if (isModalActive !== true && view.isModalDialog() === true) {
                isModalActive = true;
            }
        });
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: this.activeViewsStack[this.activeViewsStack.length - 1],
            isModalActive: isModalActive
        });
    }
}
McoContainerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ McoContainerService.ngInjectableDef = defineInjectable({ factory: function McoContainerService_Factory() { return new McoContainerService(); }, token: McoContainerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Track events
 */
class EventHandlerService {
    /**
     * @param {?} mcoContainerService
     */
    constructor(mcoContainerService) {
        this.mcoContainerService = mcoContainerService;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setClientEvent(event) {
        this._clientEvent = event;
    }
    /**
     * @return {?}
     */
    getClientEvent() {
        return this._clientEvent;
    }
    /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    fireEvent(command, mcoName, actionName, arg, source, clientEvent) {
        /** @type {?} */
        const mco = this.mcoContainerService.getMco(mcoName);
        if (mco != null && typeof mco[actionName] === "function") {
            if (Array.isArray(arg)) {
                (/** @type {?} */ (mco[actionName])).apply(mco, arg);
            }
            else {
                (/** @type {?} */ (mco[actionName])).apply(mco, [arg]);
            }
        }
    }
}
EventHandlerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EventHandlerService.ctorParameters = () => [
    { type: McoContainerService }
];
/** @nocollapse */ EventHandlerService.ngInjectableDef = defineInjectable({ factory: function EventHandlerService_Factory() { return new EventHandlerService(inject(McoContainerService)); }, token: EventHandlerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for creating [[MenuItems]]
 */
class MenuItemBuilder {
    /**
     *
     * @param {?=} menuItem
     */
    constructor(menuItem = null) {
        /**
         * Map of HTML attributes to add to menu item
         */
        this.attributes = {};
        this._internalMenuItem = menuItem;
    }
    /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    static createHorizontalDivider() {
        /** @type {?} */
        const menuItem = new MenuItemBuilder();
        menuItem.setAttribute("text", "-");
        return menuItem;
    }
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    static createMenuItem() {
        return new MenuItemBuilder();
    }
    /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        this.setAttribute("text", text);
    }
    /**
     *
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        //don't think this should be doing anything, all menu item shared the same width
    }
    /**
     *
     * @param {?} img
     * @return {?}
     */
    setImgHint(img) {
        //TODO
    }
    /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    setOnMouseDown(fn) {
        this.setAttribute("onMouseDownCallback", fn);
    }
    /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    setMargin(margin) {
        this.setAttribute("margin", margin);
    }
    /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    setFontColor(color) {
        this.setAttribute("fontColor", color);
    }
    /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    setFontSize(size) {
        this.setAttribute("fontSize", size);
    }
    /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    setFontBold(bold) {
        this.setAttribute("fontBold", bold);
    }
    /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        this.attributes[name] = value;
        if (this._internalMenuItem != null) {
            if (MenuItemBuilder.knownKeys.indexOf(name) >= 0) {
                this._internalMenuItem[name] = value;
            }
            else {
                if (this._internalMenuItem.customAttributes == null) {
                    this._internalMenuItem.customAttributes = {};
                }
                this._internalMenuItem.customAttributes[name] = value;
            }
        }
    }
    /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    getAttribute(name) {
        return this.attributes[name];
    }
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    toMenuItem(parentScreenId) {
        /** @type {?} */
        const menuItem = {};
        menuItem.parentScreenId = parentScreenId;
        /* istanbul ignore next */
        if (this.attributes["id"] != null) {
            menuItem.id = this.attributes["id"];
        }
        if (this.attributes["text"] != null) {
            menuItem.text = this.attributes["text"];
        }
        /* istanbul ignore next */
        if (this.attributes["menuItems"] != null) {
            menuItem.menuItems = map(this.attributes["menuItems"], (subMenu) => subMenu.toMenuItem(parentScreenId));
        }
        if (this.attributes["onCommandCallback"] != null) {
            menuItem.onCommandCallback = this.attributes["onCommandCallback"];
        }
        if (this.attributes["onCommand"] != null) {
            menuItem.onCommandCallback = this.attributes["onCommand"];
        }
        /* istanbul ignore next */
        if (this.attributes["onMouseDownCallback"] != null) {
            menuItem.onMouseDownCallback = this.attributes["onMouseDownCallback"];
        }
        if (this.attributes["display"] != null) {
            menuItem.display = this.attributes["display"];
        }
        if (this.attributes["fontColor"] != null) {
            MenuItemBuilder.initStyle(menuItem);
            menuItem.styles["color"] = this.attributes["fontColor"];
        }
        if (this.attributes["fontSize"] != null) {
            MenuItemBuilder.initStyle(menuItem);
            menuItem.styles["font-size"] = this.attributes["fontSize"];
        }
        /* istanbul ignore next */
        if (this.attributes["fontBold"] != null) {
            MenuItemBuilder.initStyle(menuItem);
            if (this.attributes["fontBold"] === true || this.attributes["fontBold"] === "true") {
                menuItem.styles["font-weight"] = this.attributes["bold"];
            }
            else {
                menuItem.styles["font-weight"] = "normal";
            }
        }
        if (this.attributes["margin"] != null) {
            MenuItemBuilder.initStyle(menuItem);
            menuItem.styles["margin"] = this.attributes["margin"];
        }
        /** @type {?} */
        const keys$$1 = filter(keys(this.attributes), (key) => {
            return MenuItemBuilder.knownKeys.indexOf(key) < 0;
        });
        if (keys$$1 && keys$$1.length > 0) {
            menuItem.customAttributes = {};
            for (let key of keys$$1) {
                menuItem.customAttributes[key] = this.attributes[key];
            }
        }
        return menuItem;
    }
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     * @param {?} menuItem
     * @return {?}
     */
    appendChild(menuItem) {
        if (this.attributes["menuItems"] == null) {
            this.attributes["menuItems"] = [];
        }
        if (menuItem instanceof MenuItemBuilder) {
            this.attributes["menuItems"].push(menuItem);
        }
    }
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param {?} menuItem
     * @return {?}
     */
    static fromMenuItem(menuItem) {
        return new MenuItemBuilder(menuItem);
    }
    /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    static initStyle(menuItem) {
        if (menuItem.styles == null) {
            menuItem.styles = {};
        }
    }
    /**
     * @return {?}
     */
    _free() {
        this._internalMenuItem = null;
        this.attributes = null;
    }
}
/**
 * Allowed attribute names
 */
MenuItemBuilder.knownKeys = [
    "id",
    "text",
    "onCommand",
    "onCommandCallback",
    "onMouseDownCallback",
    "menuItems",
    "display",
    "fontColor",
    "fontBold",
    "fontSize",
    "margin"
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service class to handle context menus
 */
class ContextMenuService {
    constructor() {
        this.contextMenuMap = new Map();
        this.activeMenuSubject = new Subject();
        this.activeMenuObservable = this.activeMenuSubject.asObservable();
    }
    /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    registerContextMenu(name, menuItems, parentScreenId = null) {
        /** @type {?} */
        const key = this.rekey(name);
        if (this.contextMenuMap.has(key)) {
            /** @type {?} */
            const menuData = this.contextMenuMap.get(key);
            if (parentScreenId != null && parentScreenId !== "") {
                menuData.parentScreenId = parentScreenId;
            }
            menuData.menuItems = menuItems;
        }
        else {
            this.contextMenuMap.set(key, {
                menuItems: menuItems,
                parentScreenId: parentScreenId
            });
        }
    }
    /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    showContextMenu(name) {
        /** @type {?} */
        let hasContextMenu = false;
        if (this.contextMenuMap.has(this.rekey(name))) {
            hasContextMenu = true;
        }
        this.setActiveMenu(name);
        this.activeMenu = name;
        if (this.menuItemBuilders != null) {
            this.menuItemBuilders.forEach(menuItemBuilder => menuItemBuilder._free());
            this.menuItemBuilders = [];
        }
        return hasContextMenu;
    }
    /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    hideContextMenu(name) {
        this.setActiveMenu(null);
        this.activeMenu = null;
    }
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    getContextMenuItems(name) {
        /** @type {?} */
        const menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.menuItems;
        }
        return null;
    }
    /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    getContextMenuParentScreenId(name) {
        /** @type {?} */
        const menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.parentScreenId;
        }
        return null;
    }
    /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    removeContextMenu(name) {
        this.contextMenuMap.delete(this.rekey(name));
        if (this.activeMenu === name) {
            this.activeMenu = null;
        }
    }
    /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    setActiveMenu(id) {
        this.activeMenuSubject.next(id);
    }
    /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    resetMenu(id, menuItems) {
        /** @type {?} */
        let newMenuItems;
        /** @type {?} */
        const parentScreenId = this.getContextMenuParentScreenId(id);
        if (menuItems.length > 0 && menuItems[0] instanceof MenuItemBuilder) {
            newMenuItems = map(menuItems, (menuItem) => menuItem.toMenuItem(parentScreenId));
        }
        else {
            newMenuItems = (/** @type {?} */ (menuItems)) || [];
        }
        this.registerContextMenu(id, newMenuItems);
    }
    /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    rekey(key) {
        return key.toLowerCase();
    }
    /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    _trackMenuItemBuilderForMemRelease(menuItemBuilder) {
        if (this.menuItemBuilders == null) {
            this.menuItemBuilders = [];
        }
        this.menuItemBuilders.push(menuItemBuilder);
    }
}
ContextMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextMenuService.ctorParameters = () => [];
/** @nocollapse */ ContextMenuService.ngInjectableDef = defineInjectable({ factory: function ContextMenuService_Factory() { return new ContextMenuService(); }, token: ContextMenuService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for managing client sessions
 */
class SessionService {
    /**
     *
     * @param {?} _mcoContainer
     * @param {?} _eventHandlerService
     * @param {?} injector
     * @param {?} contextMenuService
     * @param {?} ngZone
     */
    constructor(_mcoContainer, _eventHandlerService, injector, contextMenuService, ngZone) {
        this._mcoContainer = _mcoContainer;
        this._eventHandlerService = _eventHandlerService;
        this.injector = injector;
        this.contextMenuService = contextMenuService;
        this.defsMap = new Map();
        ngZone.runOutsideAngular(() => {
            document.addEventListener("keydown", (event) => this.checkKey(event), true);
            document.addEventListener("keyup", (event) => this.resetKey(event), true);
            //track when window lost/gain focus
            window.addEventListener("focusout", (event) => {
                this._windowLostFocus = true;
            }, true);
            window.addEventListener("focusin", () => {
                this._windowLostFocus = false;
            }, true);
        });
    }
    /**
     * Get internal [[_mcoContainer]]
     * @return {?}
     */
    getMcoContainer() {
        return this._mcoContainer;
    }
    /**
     * Get internal [[_eventHandlerService]]
     * @return {?}
     */
    getEventHandler() {
        return this._eventHandlerService;
    }
    /**
     * Set [[requestService]] value
     * @param {?} requestService
     * @return {?}
     */
    registerRequestService(requestService) {
        this.requestService = requestService;
    }
    /**
     * Get value of [[requestService]] property
     * @return {?} The requestService
     */
    getRequestService() {
        return this.requestService;
    }
    /**
     * Set [[routeNavigator]] value
     * @param {?} routeNavigator
     * @return {?}
     */
    registerRouteNavigatorService(routeNavigator) {
        this.routeNavigator = routeNavigator;
    }
    /**
     * Get value of [[routeNavigator]] property
     * @return {?}
     */
    getRouteNavigatorService() {
        return this.routeNavigator;
    }
    /**
     * Set the position of the mouse
     * @param {?} event
     * @return {?}
     */
    setMousePosition(event) {
        this.mousePosition = {
            x: event.clientX,
            y: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY
        };
    }
    /**
     * Get the mouse position
     * @return {?} Object with properties: x, y, screenX, screenY
     */
    getMousePosition() {
        return this.mousePosition;
    }
    /**
     * Delegate to [[Injector]].get method
     * @param {?} type
     * @return {?}
     */
    getInjector(type) {
        return this.injector.get(type);
    }
    /**
     * Get display service.
     * @return {?}
     */
    getDisplayService() {
        //TODO
        return null;
    }
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    showContextMenu(id) {
        return this.contextMenuService.showContextMenu(id);
    }
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    hideContextMenu(id) {
        this.contextMenuService.hideContextMenu(id);
    }
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param {?} id Menu id
     * @param {?} menuItems
     * @return {?}
     */
    resetContextMenu(id, menuItems) {
        this.contextMenuService.resetMenu(id, menuItems);
        this._currentPopupMenuId = id;
    }
    /**
     * Add entry to [[defsMap]] Map
     * @param {?} id Key
     * @param {?} data Value
     * @return {?}
     */
    storeDef(id, data) {
        this.defsMap.set(id, data);
    }
    /**
     * Get def map entry by key
     * @param {?} id Key
     * @return {?}
     */
    getDef(id) {
        return this.defsMap.get(id);
    }
    /**
     * Delete def from [[defsMap]] by key
     * @param {?} id Key to delete
     * @return {?}
     */
    deleteDef(id) {
        this.defsMap.delete(id);
    }
    /**
     * Get [[isCtrl]] property value
     * @return {?} True if control key is pressed, otherwise false.
     */
    isCtrlPressed() {
        return this.isCtrl === true;
    }
    /**
     * Get [[isShift]] property value
     * @return {?} True if shift key is pressed, otherwise false.
     */
    isShiftPressed() {
        return this.isShift === true;
    }
    /**
     * Get [[isAlt]] property value
     * @return {?} True if alt key is pressed, otherwise false.
     */
    isAltPressed() {
        return this.isAlt === true;
    }
    /**
     * Get [[messagingService]] property
     * @return {?} Value of [[messagingServiced]]
     */
    getMessagingService() {
        return this.messagingService;
    }
    /**
     * Set [[messagingService]] property
     * @param {?} service
     * @return {?}
     */
    registerMessagingService(service) {
        this.messagingService = service;
    }
    /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param {?} event
     * @return {?}
     */
    checkKey(event) {
        this.isCtrl = event.ctrlKey;
        this.isShift = event.shiftKey;
        this.isAlt = event.altKey;
    }
    /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param {?} event
     * @return {?}
     */
    resetKey(event) {
        this.isCtrl = false;
        this.isShift = false;
        this.isAlt = false;
    }
}
SessionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SessionService.ctorParameters = () => [
    { type: McoContainerService },
    { type: EventHandlerService },
    { type: Injector },
    { type: ContextMenuService },
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class IllegalArgumentException extends Error {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class JavaUtils {
    /**
     * @param {?} str
     * @return {?}
     */
    static isNumber(str) {
        return str == null ? false : JavaUtils.NUMERIC.test(str);
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    static booleanToString(boo) {
        if (boo === true) {
            return 'true';
        }
        return 'false';
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        return a == b;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static parseBoolean(val) {
        if (typeof val === 'boolean') {
            return val;
        }
        else if (typeof val === 'string') {
            return val === 'true' ? true : false;
        }
        else {
            throw new Error('Unsupport boolean value: ' + val);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static stringValue(val) {
        if (typeof val === 'string') {
            return val;
        }
        return val + '';
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static longValue(str) {
        if (str != null) {
            return parseInt$1(str);
        }
        return null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static doubleValue(str) {
        if (str != null) {
            /** @type {?} */
            let result = str.indexOf(".") >= 0 ? parseFloat(str) : parseInt$1(str);
            if (isNaN(result)) {
                throw new IllegalArgumentException;
            }
            return result;
        }
        return null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static intValue(str) {
        if (str != null) {
            return parseInt$1(str);
        }
        return null;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static toString(val) {
        if (typeof val === 'number') {
            return val + '';
        }
        else if (typeof val === 'boolean') {
            return JavaUtils.booleanToString(val);
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compareTo(a, b) {
        /** @type {?} */
        let retVal = null;
        if (a === b) {
            retVal = 0;
        }
        else if (a > b) {
            retVal = 1;
        }
        else {
            retVal = -1;
        }
        return retVal;
    }
    /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    static bigDecimal(val, scale = 0, roundingMode = -1) {
        /** @type {?} */
        const fixedValue = typeof val === 'number' ? val : parseFloat(val);
        if (scale > 0) {
            return parseFloat(`${fixedValue}.${padStart('', scale, '0')}`);
        }
        else {
            return fixedValue;
        }
    }
    /**
     * @param {?} num
     * @return {?}
     */
    static signum(num) {
        return num === 0 ? 0 : num > 0 ? 1 : -1;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static floatValue(str) {
        return parseFloat(str);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static lessThan(a, b) {
        if (isMoment(a) && isMoment(b)) {
            return (/** @type {?} */ (a)).isBefore(b);
        }
        return a < b;
    }
}
JavaUtils.NUMERIC = new RegExp("^[0-9]+$");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ClientEvent {
    /**
     * @param {?} _source
     * @param {?} _event
     */
    constructor(_source, _event) {
        this._source = _source;
        this._event = _event;
        this._parameters = new Map();
        this._attributes = new Map();
    }
    /**
     * @return {?}
     */
    getSource() {
        return this._source;
    }
    /**
     * @return {?}
     */
    getEvent() {
        return this._event;
    }
    /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    setParameter(paramName, value) {
        this._parameters.set(KeyUtils.toMapKey(paramName), value);
    }
    /**
     * @param {?} paramName
     * @return {?}
     */
    getParameter(paramName) {
        return this._parameters.get(KeyUtils.toMapKey(paramName));
    }
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    setAttribute(attributeName, value) {
        this._attributes.set(KeyUtils.toMapKey(attributeName), value);
    }
    /**
     * @param {?} attributeName
     * @return {?}
     */
    getAttribute(attributeName) {
        return this._attributes.get(KeyUtils.toMapKey(attributeName));
    }
    /**
     * @return {?}
     */
    stopPropagation() {
        if (this._event != null) {
            this._event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    preventDefault() {
        if (this._event != null) {
            this._event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setReturnValue(value) {
        this._returnValue = value;
        this._returnValueSet = true;
    }
    /**
     * @return {?}
     */
    getReturnValue() {
        return this._returnValue;
    }
    /**
     * @return {?}
     */
    isReturnValueSet() {
        //can't check for returnValue is null b/c it can be set to null
        return this._returnValueSet === true ? true : false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
class ListIterator {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.currentIndex = 0;
    }
    /**
     * @return {?}
     */
    hasNext() {
        return this.data != null && this.data.length > this.currentIndex;
    }
    /**
     * @template T
     * @return {?}
     */
    next() {
        if (this.currentIndex < this.data.length) {
            return this.data[this.currentIndex++];
        }
        throw new Error('No such element');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
class Vector {
    /**
     * @param {?=} size
     */
    constructor(size) {
        this.data = [];
        if (Array.isArray(size)) {
            this.data = size;
        }
    }
    /**
     * @return {?}
     */
    toArray() {
        return this.data;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.data = data;
    }
    /**
     * @return {?}
     */
    size() {
        return this.data == null ? 0 : this.data.length;
    }
    /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    get(idx) {
        if (this.size() > idx) {
            return /** @type {?} */ (this.data[idx]);
        }
        return null;
    }
    /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    add(element, insertionIndex = -1) {
        if (insertionIndex === -1) {
            return this.data.push(element);
        }
        else {
            this.data.splice(insertionIndex, 0, element);
            return insertionIndex;
        }
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    delete(idx) {
        if (this.get(idx)) {
            this.data.splice(idx, 1);
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    addElement(element) {
        return this.add(element);
    }
    /**
     * @param {?} vec
     * @return {?}
     */
    addAll(vec) {
        /** @type {?} */
        let it = vec.iterator();
        while (it.hasNext()) {
            this.add(it.next());
        }
    }
    /**
     * @return {?}
     */
    firstElement() {
        return this.data != null && this.data.length > 0 ? this.data[0] : null;
    }
    /**
     * @return {?}
     */
    lastElement() {
        return this.data != null && this.data.length > 0 ? this.data[this.data.length - 1] : null;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    contains(element) {
        return this.data != null && this.data.indexOf(element) >= 0 ? true : false;
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    elementAt(idx) {
        return this.get(idx);
    }
    /**
     * @return {?}
     */
    isEmpty() {
        return this.data == null || this.data.length === 0;
    }
    /**
     * @return {?}
     */
    iterator() {
        return new ListIterator(clone(this.data));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AttributeChangeEvent {
    /**
     * @param {?} name
     * @param {?} oldValue
     * @param {?} newValue
     * @param {?} sourceElement
     */
    constructor(name, oldValue, newValue, sourceElement) {
        this.name = name;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.sourceElement = sourceElement;
    }
    /**
     * @return {?}
     */
    getName() {
        return this.name;
    }
    /**
     * @return {?}
     */
    getOldValue() {
        return this.oldValue;
    }
    /**
     * @return {?}
     */
    getNewValue() {
        return this.newValue;
    }
    /**
     * @return {?}
     */
    getSourceElement() {
        return this.sourceElement;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AppUtils {
    /**
     * @param {?} str
     * @return {?}
     */
    static parseDom(str) {
        return this.domParser.parseFromString(str, "application/xml").firstElementChild;
    }
    /**
     * attributeOverrideInitializer
     * @return {?}
     */
    static attributeOverrideInitializer() {
        this.attributeOverrideClassInitializer();
        this.attributeOverrideValidateInitializer();
    }
}
AppUtils.domParser = new DOMParser();
/**
 * クラス属性変換用マップ
 */
AppUtils._classOverrideMap = new Map();
AppUtils.attributeOverrideClassInitializer = null;
AppUtils.attributeOverrideClass = null;
/**
 * バリデート属性変換用マップ
 */
AppUtils._validateOverrideMap = new Map();
AppUtils.attributeOverrideValidateInitializer = null;
AppUtils.attributeOverrideValidate = null;
AppUtils.customizeClientEvent = null;
AppUtils.validateField = null;
/**
 * Validate HTML attribute to see if they should be pass to the server. This is needed
 * because Nexaweb framework allow passing of custom attributes
 */
AppUtils.validateAttribute = null;
AppUtils.enableLogging = true;
AppUtils.maxFindElementCache = 500;
AppUtils.isCloseBtn = false;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
class HashMap {
    constructor() {
        this._internalMap = new Map();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._internalMap.size;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    put(key, value) {
        this._internalMap.set(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this._internalMap.get(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this._internalMap.set(key, value);
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return this._internalMap.delete(key);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.delete(key);
    }
    /**
     * @return {?}
     */
    clear() {
        return this._internalMap.clear();
    }
    /**
     * @return {?}
     */
    entries() {
        return this._internalMap.entries();
    }
    /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    forEach(cb, thisArg) {
        return this._internalMap.forEach(cb, thisArg);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this._internalMap.has(key);
    }
    /**
     * @return {?}
     */
    keys() {
        return this._internalMap.keys();
    }
    /**
     * @return {?}
     */
    values() {
        return this._internalMap.values();
    }
    /**
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = {};
        /** @type {?} */
        const keys$$1 = this.keys();
        /** @type {?} */
        let key = keys$$1.next();
        while (key.done !== true) {
            json[/** @type {?} */ (key.value)] = this.get(key.value);
            key = keys$$1.next();
        }
        return json;
    }
    /**
     * @return {?}
     */
    get [Symbol.iterator]() {
        return this._internalMap[Symbol.iterator];
    }
    /**
     * @return {?}
     */
    get [Symbol.toStringTag]() {
        return this._internalMap[Symbol.toStringTag];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
class Hashtable extends HashMap {
    constructor() {
        super();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Logger {
    /**
     * @param {?} e
     * @return {?}
     */
    static warn(e) {
        if (AppUtils.enableLogging === true) {
            console.warn(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static log(e) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static info(e) {
        if (AppUtils.enableLogging === true) {
            console.info(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static error(e) {
        if (AppUtils.enableLogging === true) {
            console.error(e);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static debug(e) {
        if (AppUtils.enableLogging === true) {
            console.debug(e);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Main class that all core components should inherit.
 */
class BaseComponent {
    /**
     * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
     * but it must provided the minimal required items to be injected.
     *
     * @param {?} parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
     * @param {?} sessionService SessionService needed by this class, this should be injected by Angular.
     * @param {?} elementRef the element reference that wrap the element (tag) of this component.
     * @param {?} renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
     */
    constructor(parent, sessionService, elementRef, renderer) {
        this.parent = parent;
        this.sessionService = sessionService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.disabled = false;
        this.sort = "";
        this.visible = true;
        this.text = "";
        this.required = false;
        this.orderIndex = -1;
        /* istanbul ignore next */
        this.onContextMenu = new EventEmitter();
        this.onActiveLost = new EventEmitter();
        this.onBeforeActiveLost = new EventEmitter();
        this.styles = {};
        this._children = null;
        /* istanbul ignore next */
        this._childrenIndex = null;
        this._uniqueId = BaseComponent.generateUniqueId();
        //initial id
        this.id = this._uniqueId;
    }
    /**
     * @param {?} css
     * @return {?}
     */
    set cssClass(css) {
        this._cssClass = this.cleanCss(css);
        this.initBorderLayout();
    }
    /**
     * @param {?} req
     * @return {?}
     */
    set require(req) {
        this.required = req;
    }
    /**
     * Accessor for [[required]] property
     * @return {?}
     */
    get require() {
        return this.required;
    }
    /**
     * @param {?} css
     * @return {?}
     */
    class(css) {
        this.cssClass = css;
    }
    /**
     * Accessor for [[cssClass]] property
     * @return {?}
     */
    get cssClass() {
        return this._cssClass;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set enabled(boo) {
        if (typeof boo === 'string') {
            //if enabled is false, disabled is true
            this.disabled = boo === 'true' ? false : true;
        }
        else {
            this.disabled = !boo;
        }
    }
    /**
     * @return {?}
     */
    get enabled() {
        return !this.disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortValue(value) {
        this.sort = value;
    }
    /**
     * @return {?}
     */
    get sortValue() {
        return this.sort;
    }
    /**
     * @return {?}
     */
    get uniqueId() {
        return this._uniqueId;
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.parent != null) {
            this.parent.addChild(this);
        }
        this._childrenIndex = uniq(this._childrenIndex);
        //commnet out, causing regression b/c the css selector need id of parent window
        // if (this.renderer != null && typeof this.renderer["removeAttribute"] === "function") {
        //   this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
        // }
    }
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    ngOnInit() {
        this.initBorderLayout();
        if (this.fontBold === true || this.fontBold === "true") {
            this.setFontBold(true);
        }
        if (this.fontItalic === true || this.fontItalic === "true") {
            this.styles["font-style"] = "italic";
            this.setFontItalic(true);
        }
        if (this.fontSize != null) {
            this.setFontSize(this.fontSize);
        }
        if (this.fontUnderline === true || this.fontUnderline === "true") {
            this.setFontUnderline(true);
        }
        if (this.fontColor != null) {
            this.setColor(this.fontColor);
        }
        if (this.autoWrap === true) {
            this.styles["white-space"] = "normal";
            this.markForCheck();
        }
        else if (this.autoWrap === false) {
            this.styles["white-space"] = "nowrap";
            this.markForCheck();
        }
        this.checkNxStyling();
    }
    /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    checkNxStyling(skipAttributeOverride = false) {
        if (skipAttributeOverride !== true && this._cssClass != null && this._cssClass.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
            /** @type {?} */
            let newAttributes = AppUtils.attributeOverrideClass(this._cssClass);
            if (newAttributes != null) {
                /** @type {?} */
                const newCssClass = filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                newAttributes = filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                newAttributes.push({
                    attributeName: AttributesEnum.CLASS,
                    value: (this._cssClass + " " + newCssClass).trim(),
                });
                this.setAttributes(newAttributes, true);
            }
        }
        if (this.elementRef != null) {
            /** @type {?} */
            const _validate = this.elementRef.nativeElement.getAttribute("validate");
            if (skipAttributeOverride !== true && _validate != null && _validate.length > 0) {
                /** @type {?} */
                let newAttributes = AppUtils.attributeOverrideValidate(_validate);
                if (newAttributes != null) {
                    /** @type {?} */
                    const newCssClass = filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                    newAttributes = filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
        }
    }
    /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    initBorderLayout() {
        if (this.borderPosition != null && this.borderPosition != '') {
            if (this._cssClass != null) {
                this._cssClass = this._cssClass + ' border-' + this.borderPosition;
            }
            else {
                this._cssClass = 'border-' + this.borderPosition;
            }
        }
    }
    /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    ngOnDestroy() {
        this.cleanup();
        this._isDying = true;
        /** @type {?} */
        const parentView = this.getParentView();
        if (parentView != null) {
            //remove ourself from the view children map
            if (parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(this.getId()));
            }
        }
        this._internalChangeCb = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
        }
        if (this._children !== null) {
            this._children.clear();
        }
        this._childrenIndex = null;
        this._viewChildrenMap = null;
        this.parent = null;
        this.sessionService = null;
        this.attributeChangeListeners = null;
        this.radioButtonGroups = null;
        this.elementRef = null;
        this.scrollPanes = null;
    }
    /**
     * @return {?}
     */
    cleanup() {
    }
    /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    getSession() {
        return this.sessionService;
    }
    /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    getChild(id) {
        if (this._children !== null) {
            return this._children.get(KeyUtils.toMapKey(id));
        }
        else {
            return null;
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        this.markForCheck();
    }
    /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    setVisible(boo) {
        this.visible = boo;
        this.markForCheck();
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    setScrollPosVertical(expression) {
        //TODO
    }
    /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    setFontColor(value) {
        this.setColor(value);
    }
    /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    getDisabled() {
        return this.disabled;
    }
    /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    getEnabled() {
        return !this.getDisabled();
    }
    /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    getSoColumnNo() {
        return this.getAttribute("soColumnNo");
    }
    /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    getEditor() {
        return this.editor;
    }
    /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    getSoRequire() {
        return this.getAttribute("soRequire");
    }
    /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    getSoValidate() {
        return this.getAttribute("soValidate");
    }
    /**
     * Value of soType attribute
     * @return {?} soType value
     */
    getSoType() {
        return this.getAttribute("soType");
    }
    /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    getSoFormat() {
        return this.getAttribute("soFormat");
    }
    /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    getSoMin() {
        return this.getAttribute("soMin");
    }
    /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    getSoMax() {
        return this.getAttribute("soMax");
    }
    /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    getSoMaxLength() {
        return this.getAttribute("soMaxLength");
    }
    /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    getSoPattern() {
        return this.getAttribute("soPattern");
    }
    /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    getSoMaxByteLen() {
        return this.getAttribute("soMaxByteLen");
    }
    /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    setEnabled(boo) {
        if (typeof boo === 'string') {
            boo = boo === 'true' ? true : false;
        }
        this.setDisabled(!boo);
    }
    /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    setSortValue(value) {
        this.sort = value;
    }
    /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    getVisible() {
        return this.visible;
    }
    /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    setText(value) {
        if (typeof value === 'string') {
            this.text = value;
        }
        else if (value == null) {
            this.text = '';
        }
        else {
            this.text = value + '';
        }
        this.markForCheck();
    }
    /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    setOnCommand(fn) {
        this._internalOnCommand = fn;
    }
    /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    setOnActiveLost(fn) {
        this._internalOnActiveLost = fn;
    }
    /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    setAttributes(attrs, skipAttributeOverride = false) {
        this._tempFreezeCd = true;
        for (const attr of attrs) {
            this.setAttribute(attr.attributeName, attr.value, skipAttributeOverride);
        }
        this._tempFreezeCd = false;
        this.markForCheck();
    }
    /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    setAttribute(attribute, value, skipAttributeOverride = false) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const originalAttributeName = attribute;
            attribute = attribute.toLowerCase();
            if (attribute === "id") {
                this.setAttribute(AttributesEnum.ID, value);
            }
            else if (attribute === 'visible') {
                this.setAttribute(AttributesEnum.VISIBLE, value);
            }
            else if (attribute === "class") {
                this.setAttribute(AttributesEnum.CLASS, value);
            }
            else if (attribute === 'enabled') {
                this.setAttribute(AttributesEnum.ENABLED, value);
            }
            else if (attribute === 'disabled') {
                this.setAttribute(AttributesEnum.DISABLED, value);
            }
            else if (attribute === 'text') {
                this.setAttribute(AttributesEnum.TEXT, value);
            }
            else if (attribute === 'color') {
                this.setAttribute(AttributesEnum.COLOR, value);
            }
            else if (attribute === "title") {
                this.setAttribute(AttributesEnum.TITLE, value);
            }
            else if (attribute === "require") {
                this.setAttribute(AttributesEnum.REQUIRE, value);
            }
            else if (attribute === "fontBold" || attribute === "fontbold") {
                this.setAttribute(AttributesEnum.FONT_BOLD, value);
            }
            else if (attribute === "selected") {
                this.setAttribute(AttributesEnum.SELECTED, value);
            }
            else if (attribute === "bgcolor") {
                this.setAttribute(AttributesEnum.BG_COLOR, value);
            }
            else if (attribute === "value") {
                this.setAttribute(AttributesEnum.VALUE, value);
            }
            else if (attribute === "maxlength" || attribute === "max_length") {
                this.setAttribute(AttributesEnum.MAX_LENGTH, value);
            }
            else if (attribute === "require" || attribute === "required") {
                this.setRequire(value);
            }
            else if (attribute === "width") {
                this.setControlWidth(value);
            }
            else if (attribute === "height") {
                this.setControlHeight(value);
            }
            else if (attribute === "fontSize" || attribute === "fontsize") {
                this.setFontSize(value);
            }
            else if (attribute === "oncommand") {
                this.setOnCommand(value);
            }
            else if (attribute === "onactivelost") {
                this.setOnActiveLost(value);
            }
            else if (attribute === "pattern") {
                this.setAttribute(AttributesEnum.PATTERN, value);
            }
            else if (attribute === "max") {
                this.setAttribute(AttributesEnum.MAX, value);
            }
            else if (attribute === "min") {
                this.setAttribute(AttributesEnum.MIN, value);
            }
            else if (JavaUtils.isNumber(originalAttributeName) === true) {
                this.setAttribute(parseInt$1(originalAttributeName), value);
            }
            else {
                this.setCustomAttribute(originalAttributeName, value);
                // Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);
                if (attribute === "validate" && skipAttributeOverride !== true && value != null && value.length > 0) {
                    /** @type {?} */
                    let newAttributes = AppUtils.attributeOverrideValidate(value);
                    if (newAttributes != null) {
                        /** @type {?} */
                        const newCssClass = filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                        newAttributes = filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                        newAttributes.push({
                            attributeName: AttributesEnum.CLASS,
                            value: (this._cssClass + " " + newCssClass).trim(),
                        });
                        this.setAttributes(newAttributes, true);
                    }
                }
            }
            this.fireSetAttributeEvent(originalAttributeName, value);
        }
        else {
            if (attribute === AttributesEnum.CLASS && skipAttributeOverride !== true && value != null && value.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                let newAttributes = AppUtils.attributeOverrideClass(value);
                if (newAttributes != null) {
                    /** @type {?} */
                    const newCssClass = filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                    newAttributes = filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
            if (attribute === AttributesEnum.ID) {
                this.setId(value);
            }
            else if (attribute === AttributesEnum.VISIBLE) {
                if (value != null && value !== "") {
                    this.setVisible(JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.CLASS) {
                this.setCssClass(value, skipAttributeOverride);
            }
            else if (attribute === AttributesEnum.DISABLED) {
                if (value != null && value !== "") {
                    this.setDisabled(JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.ENABLED) {
                if (value != null && value !== "") {
                    this.setDisabled(!JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.TEXT) {
                this.setText(value);
            }
            else if (attribute === AttributesEnum.COLOR) {
                this.setColor(value);
            }
            else if (attribute === AttributesEnum.FONT_BOLD) {
                this.setFontBold(value);
            }
            else if (attribute === AttributesEnum.ON_COMMAND) {
                this.setOnCommand(value);
            }
            else if (attribute === AttributesEnum.REQUIRE) {
                this.setRequire(value);
            }
            else if (attribute === AttributesEnum.TITLE) {
                this.setTitle(value);
            }
            else if (attribute === AttributesEnum.SELECTED) {
                this.setSelected(value);
            }
            else if (attribute === AttributesEnum.BG_COLOR) {
                this.setBgColor(value);
            }
            else if (attribute === AttributesEnum.VALUE) {
                this.setValue(value);
            }
            else if (attribute === AttributesEnum.MAX_LENGTH) {
                this.setMaxLength(value);
            }
            else if (attribute === AttributesEnum.MAX) {
                this.setMax(value);
            }
            else if (attribute === AttributesEnum.MIN) {
                this.setMin(value);
            }
            else if (attribute === AttributesEnum.PATTERN) {
                this.setPattern(value);
            }
            else {
                Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
            }
            this.markForCheck();
        }
    }
    /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    getAttribute(attribute, skipQueryDOMIfNotExists = false) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const attributeLower = attribute.toLowerCase();
            if (attributeLower === 'visible') {
                return this.getVisible() + '';
            }
            else if (attributeLower === 'enabled') {
                return this.getEnabled() + '';
            }
            else if (attributeLower === 'disabled') {
                return this.getDisabled() + '';
            }
            else if (attributeLower === 'text') {
                return this.getText();
            }
            else if (attributeLower === 'color') {
                return this.getColor();
            }
            else if (attributeLower === 'require') {
                return this.getRequired() + '';
            }
            else if (attributeLower === "value") {
                return this.getValue();
            }
            else if (attributeLower === "selected") {
                return this.getChecked() + '';
            }
            else if (attributeLower === "id") {
                return this.getId();
            }
            else if (attributeLower === "pattern") {
                return this.getPattern();
            }
            else if (attributeLower === "min") {
                return this.getMin();
            }
            else if (attributeLower === "max") {
                return this.getMax();
            }
            else if (attributeLower === "max_length") {
                return this.getMaxLength();
            }
            else if (this.customAttributes != null && this.customAttributes[attribute] !== undefined) {
                return this.getCustomAttribute(attribute);
            }
            else if (attribute === "isLockedColumn") {
                return false;
            }
            else if (skipQueryDOMIfNotExists !== true) {
                Logger.warn(`Attribute ${attribute} does not exists, trying to get from DOM`);
                if (this.elementRef != null) {
                    return this.elementRef.nativeElement.getAttribute(attribute);
                }
            }
            else {
                return undefined;
            }
        }
        else if (attribute === AttributesEnum.VISIBLE) {
            return this.getVisible() + '';
        }
        else if (attribute === AttributesEnum.DISABLED) {
            return this.getDisabled() + '';
        }
        else if (attribute === AttributesEnum.ENABLED) {
            return !this.getDisabled() + '';
        }
        else if (attribute === AttributesEnum.TEXT) {
            return this.getText();
        }
        else if (attribute === AttributesEnum.COLOR) {
            return this.getColor();
        }
        else if (attribute === AttributesEnum.REQUIRE) {
            return this.getRequired() + '';
        }
        else if (attribute === AttributesEnum.VALUE) {
            return this.getValue();
        }
        else if (attribute === AttributesEnum.SELECTED) {
            return this.getChecked() + '';
        }
        else if (attribute === AttributesEnum.PATTERN) {
            return this.getPattern();
        }
        else if (attribute === AttributesEnum.MIN) {
            return this.getMin();
        }
        else if (attribute === AttributesEnum.MAX) {
            return this.getMax();
        }
        else if (attribute === AttributesEnum.MAX_LENGTH) {
            return this.getMaxLength();
        }
        else {
            console.error('Unable to get attribute, unknown attribute id: ' + attribute);
        }
        return undefined;
    }
    /**
     * Focus the HTML element of this component
     * @return {?}
     */
    requestFocus() {
        if (this.getElement() != null) {
            this.getElement().focus();
        }
    }
    /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    setFocus() {
        if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
            this.markForCheck();
        }
    }
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    focusLost() {
        this.onActiveLost.emit();
        if (typeof this._internalOnActiveLost === 'function') {
            this._internalOnActiveLost(this);
        }
    }
    /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    static generateUniqueId(prefix = 'base') {
        return prefix + Date.now() + '_' + random(1, 1000) + random(1, 100);
    }
    /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    addChild(child) {
        if (child.id !== this.id) {
            /** @type {?} */
            const childKey = KeyUtils.toMapKey(child.id);
            if (this._children === null) {
                this._children = new Map();
            }
            if (this._childrenIndex === null) {
                this._childrenIndex = new Array();
            }
            this._children.set(childKey, child);
            this._childrenIndex.push(child.id);
            /** @type {?} */
            const parentView = this.getParentView();
            if (parentView != null && (child.isFauxElement() || child.isDialog() !== true)) {
                if (parentView._viewChildrenMap == null) {
                    parentView._viewChildrenMap = new Map();
                }
                parentView._viewChildrenMap.set(childKey, child);
                //track ScrollPane for scroll adjustment
                if (typeof child.isScrollPane === "function" && child.isScrollPane() === true) {
                    parentView.registerScrollPane(child);
                }
            }
        }
    }
    /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    getElement() {
        return this.elementRef ? this.elementRef.nativeElement : null;
    }
    /**
     * Get the text property value
     * @return {?} Text value
     */
    getText() {
        return this.text;
    }
    /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    setColor(color) {
        if (color == null || color === "") {
            delete this.styles['color'];
        }
        else {
            this.styles['color'] = color;
        }
        this.markForCheck();
    }
    /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    getColor() {
        return this.styles['color'];
    }
    /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    setBgColor(bgColor) {
        this.bgColor = bgColor;
        this.styles["background"] = bgColor;
        this.markForCheck();
    }
    /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    setFontBold(boo) {
        this.fontBold = boo;
        if (boo === true || boo === "true") {
            this.styles["font-weight"] = "bold";
        }
        else {
            delete this.styles["font-weight"];
        }
        this.markForCheck();
    }
    /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    setFontItalic(boo) {
        this.fontItalic = boo;
        if (boo === true || boo === "true") {
            this.styles["font-style"] = "italic";
        }
        else {
            delete this.styles["font-style"];
        }
    }
    /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    setFontSize(size) {
        this.fontSize = size;
        this.styles["font-size"] = size + "px";
    }
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    setFontUnderline(underline) {
        this.fontUnderline = underline;
        if (this.fontUnderline === "true" || this.fontUnderline === true) {
            this.styles["text-decoration"] = "underline";
        }
        else {
            delete this.styles["text-decoration"];
        }
    }
    /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    handleFocus(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    handleKeyUp(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    handleMouseDown(event) {
        this.registerClientEvent(event);
    }
    /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    getCustomAttribute(attributeName) {
        if (this.customAttributes != null) {
            return this.customAttributes[attributeName];
        }
        return undefined;
    }
    /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    setCustomAttribute(name, value) {
        if (this.customAttributes == null) {
            this.customAttributes = {};
        }
        if (value != null) {
            this.customAttributes[name] = value + '';
        }
    }
    /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    hasCustomAttribute(id) {
        return this.customAttributes != null && this.customAttributes[id] != null;
    }
    /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    getChildAt(idx) {
        if (this._childrenIndex !== null) {
            if (this._childrenIndex.length > idx) {
                return this.getChild(this._childrenIndex[idx]);
            }
        }
        return null;
    }
    /**
     * Get the number of child components
     * @return {?} Number of children
     */
    getChildCount() {
        if (this._children !== null) {
            return this._children.size;
        }
        else {
            return 0;
        }
    }
    /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    indexOfChild(child) {
        //TODO
        console.error("indexOfChild is not implemented");
        return -1;
    }
    /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    insertChildAt(idx, row) {
        //TODO
        console.error("insertChildAt is not implemented");
    }
    /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    emitInternalOnCommand() {
        if (typeof this._internalOnCommand === 'function') {
            this._internalOnCommand(this);
            return true;
        }
        else if (typeof this._internalOnCommand === "string") {
            this.invokeMcoAction(this._internalOnCommand);
        }
        return false;
    }
    /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    registerClientEvent(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        this.getSession().getEventHandler().setClientEvent(clientEvent);
    }
    /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    getTagName() {
        return this.elementRef != null ? this.elementRef.nativeElement.tagName : '';
    }
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    getLocalName() {
        return this.getTagName().toLowerCase().replace("vt-", "");
    }
    /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    getParent() {
        return this.parent;
    }
    /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    getValue() {
        if (this["value"]) {
            return this["value"];
        }
        return null;
    }
    /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    removeAttribute(attribute) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const attributeLower = attribute.toLowerCase();
            if (attributeLower === 'visible') {
                this.removeAttribute(AttributesEnum.VISIBLE);
            }
            else if (attributeLower === 'enabled') {
                this.removeAttribute(AttributesEnum.ENABLED);
            }
            else if (attributeLower === 'disabled') {
                this.removeAttribute(AttributesEnum.DISABLED);
            }
            else if (attributeLower === 'text') {
                this.removeAttribute(AttributesEnum.TEXT);
            }
            else if (attributeLower === 'color') {
                this.removeAttribute(AttributesEnum.COLOR);
            }
            else if (attributeLower === 'pattern') {
                this.removeAttribute(AttributesEnum.PATTERN);
            }
            else if (attributeLower === 'max') {
                this.removeAttribute(AttributesEnum.MAX);
            }
            else if (attributeLower === 'maxlength' || attributeLower === 'max_length') {
                this.removeAttribute(AttributesEnum.MAX_LENGTH);
            }
            else if (attributeLower === 'min') {
                this.removeAttribute(AttributesEnum.MIN);
            }
            else if (attributeLower === 'class') {
                this.removeAttribute(AttributesEnum.CLASS);
            }
            else if (attributeLower === 'oncommand' || attributeLower === 'on_command') {
                this.removeAttribute(AttributesEnum.ON_COMMAND);
            }
            else if (attributeLower === 'require') {
                this.removeAttribute(AttributesEnum.REQUIRE);
            }
            else if (attributeLower === 'title') {
                this.removeAttribute(AttributesEnum.TITLE);
            }
            else if (attributeLower === 'fontbold' || attributeLower === 'font_bold') {
                this.removeAttribute(AttributesEnum.FONT_BOLD);
            }
            else if (attributeLower === 'selected') {
                this.removeAttribute(AttributesEnum.SELECTED);
            }
            else if (attributeLower === 'bgColor') {
                this.removeAttribute(AttributesEnum.BG_COLOR);
            }
            else if (attributeLower === 'value') {
                this.removeAttribute(AttributesEnum.VALUE);
            }
            else if (this.customAttributes != null) {
                delete this.customAttributes[attribute];
                Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);
            }
            this.fireRenoveAttributeEvent(attribute);
        }
        else if (attribute === AttributesEnum.VISIBLE) {
            this.setVisible(true);
        }
        else if (attribute === AttributesEnum.DISABLED) {
            this.setDisabled(false);
        }
        else if (attribute === AttributesEnum.ENABLED) {
            this.setEnabled(true);
        }
        else if (attribute === AttributesEnum.TEXT) {
            delete this.text;
            this.markForCheck();
        }
        else if (attribute === AttributesEnum.COLOR) {
            this.setColor("");
        }
        else if (attribute === AttributesEnum.ON_COMMAND) {
            delete this._internalOnCommand;
        }
        else if (attribute === AttributesEnum.PATTERN) {
            this.setPattern(undefined);
        }
        else if (attribute === AttributesEnum.MAX) {
            this.setMax(undefined);
        }
        else if (attribute === AttributesEnum.MAX_LENGTH) {
            this.setMaxLength(undefined);
        }
        else if (attribute === AttributesEnum.MIN) {
            this.setMin(undefined);
        }
        else {
            Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
        }
    }
    /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    setRequire(boo) {
        this.setRequired(boo);
    }
    /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    setRequired(boo) {
        if (boo === 'true' || boo === true) {
            this.required = true;
        }
        else {
            this.required = false;
        }
        this.markForCheck();
    }
    /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    setPattern(pattern) {
        this.pattern = pattern;
        this.markForCheck();
    }
    /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    setMin(val) {
        this.min = val;
        this.markForCheck();
    }
    /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    setMax(val) {
        this.max = val;
        this.markForCheck();
    }
    /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    getPattern() {
        return this.pattern;
    }
    /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    getMin() {
        return this.min;
    }
    /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    getMax() {
        return this.max;
    }
    /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    getInputLocale() {
        return this.inputLocale;
    }
    /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    setInputLocale(locale) {
        this.inputLocale = locale;
        this.markForCheck();
    }
    /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    getInputCharsets() {
        return this.inputCharsets;
    }
    /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    setInputCharsets(inputCharSets) {
        this.inputCharsets = inputCharSets;
        this.markForCheck();
    }
    /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    getId() {
        return this.id;
    }
    /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    setId(id) {
        if (this.parent != null && this.parent.children.has(this.id)) {
            this.parent.children.delete(KeyUtils.toMapKey(this.id));
            this.parent.children.set(KeyUtils.toMapKey(id), this);
            if (this._childrenIndex !== null) {
                /** @type {?} */
                const idx = findIndex(this.parent._childrenIndex, (item) => item === this.id);
                if (idx >= 0) {
                    this.parent._childrenIndex[idx] = id;
                }
                else {
                    this.parent._childrenIndex.push(id);
                }
                this.parent._childrenIndex = uniq(this.parent._childrenIndex);
            }
        }
        this.id = id;
    }
    /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    setTitle(title) {
        //impl. by sub class
    }
    /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    setCssClass(css, skipAttributeOverride = false) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            const temp = css.split("\.");
            this.cssClass = temp.join("-");
            if (temp[0] === "") {
                this.cssClass = this.cssClass.substring(1);
            }
        }
        this.cssClass = css;
        this.checkNxStyling(skipAttributeOverride);
        this.markForCheck();
    }
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    addCssClass(css) {
        if (this._cssClass == null || this._cssClass === "") {
            this._cssClass = css;
        }
        else if (this._cssClass.indexOf(css) == -1) {
            this._cssClass = `${this._cssClass} ${css}`;
        }
        this.checkNxStyling();
        this.markForCheck();
    }
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    removeCssClass(css) {
        if (this._cssClass != null)
            this._cssClass = this._cssClass.replace(css, '');
        this.checkNxStyling();
        this.markForCheck();
    }
    /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    getRequired() {
        return this.require;
    }
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    destroyComponent() {
        if (this.compRef != null) {
            this.compRef.destroy();
        }
        else if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).remove();
            this.ngOnDestroy();
            Logger.warn("Memory leak! Please use ngIf if you want to remove component!");
        }
    }
    /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    toJson() {
        /** @type {?} */
        const retVal = {};
        //get custom attributes binded to our tag
        if (this.elementRef != null && this.elementRef.nativeElement != null) {
            /** @type {?} */
            const el = this.elementRef.nativeElement;
            /** @type {?} */
            let attributes = null;
            if (typeof el.getAttributeNames === "function") {
                attributes = el.getAttributeNames();
            }
            else if (el.attributes) {
                attributes = [];
                for (let i = 0; i < el.attributes.length; i++) {
                    attributes.push(el.attributes[i].name);
                }
            }
            if (attributes != null) {
                forEach(attributes, (attributeName) => {
                    if (typeof AppUtils.validateAttribute === "function" && AppUtils.validateAttribute(attributeName)) {
                        this.setJson(retVal, attributeName, el.getAttribute(attributeName));
                    }
                });
            }
            else if (typeof AppUtils.setCustomAttribute === "function") {
                AppUtils.setCustomAttribute(retVal, el);
            }
        }
        this.setJson(retVal, "nxTagName", this.getNxTagName());
        this.setJson(retVal, "tagName", this.getTagName());
        this.setJson(retVal, "id", this.id);
        this.setJson(retVal, "disabled", this.getDisabled());
        this.setJson(retVal, "enabled", this.getEnabled());
        this.setJson(retVal, "visible", this.getVisible());
        this.setJson(retVal, "text", this.getText());
        this.setJson(retVal, "cssClass", this.cssClass);
        this.setJson(retVal, "customAttributes", this.customAttributesToJson());
        if (this.getValue() != null) {
            this.setJson(retVal, "value", this.getValue());
        }
        if (this._children !== null) {
            if (this._children.size > 0) {
                //need to return children in proper order
                retVal["children"] = [];
                if (this._childrenIndex !== null) {
                    for (let id of this._childrenIndex) {
                        /** @type {?} */
                        const c = this.getChild(id);
                        //getChild can return null?
                        if (c != null) {
                            /** @type {?} */
                            const childJson = this.childToJson(c);
                            if (childJson != null) {
                                retVal["children"].push(childJson);
                            }
                        }
                    }
                }
            }
        }
        return retVal;
    }
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    childToJson(child) {
        return child.toJson();
    }
    /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    customAttributesToJson() {
        return BaseComponent.mapToJson(this.customAttributes);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    static mapToJson(map$$1) {
        /** @type {?} */
        const customAttributes = {};
        if (map$$1) {
            /** @type {?} */
            const keys$$1 = keys(map$$1);
            for (let key of keys$$1) {
                /** @type {?} */
                let value = map$$1[key];
                if (typeof value !== "string" && value != null) {
                    value = value + "";
                }
                customAttributes[key] = value;
            }
        }
        return customAttributes;
    }
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    getNxTagName() {
        return "none";
    }
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    setJson(json, key, value) {
        if (key != null) {
            json[key] = this.toJsonValue(value);
        }
    }
    /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    toJsonValue(value) {
        if (typeof value === 'string') {
            return value;
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            return value + '';
        }
        else {
            return value;
        }
    }
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    resetId() {
        this.id = this._uniqueId;
    }
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    getChecked() {
        return false;
    }
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    setChecked(boo) {
        // NO-OP
    }
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    setSelected(boo) {
        // NO-OP
    }
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    getMaxLength() {
        return this.maxLength == null ? -1 : JavaUtils.intValue(this.maxLength);
    }
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    getMinLength() {
        return this.minLength == null ? -1 : JavaUtils.intValue(this.minLength);
    }
    /**
     * Get a list of child components
     * @return {?} Child components
     */
    getChildren() {
        /** @type {?} */
        const children = new Vector();
        if (this._childrenIndex !== null) {
            for (let id of this._childrenIndex) {
                /** @type {?} */
                const c = this.getChild(id);
                if (c != null) {
                    children.add(c);
                }
            }
        }
        return children;
    }
    /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    removeChild(child) {
        //if somehow send it as string (via type any)
        if (typeof child === "string") {
            child = /** @type {?} */ (this.getElementById(child));
        }
        if (child != null) {
            //first hide it
            if (child.setVisible) {
                child.setVisible(false);
            }
            if (this.children) {
                this.children.delete(KeyUtils.toMapKey(child.id));
                if (this._childrenIndex !== null) {
                    this._childrenIndex = uniq(filter(this._childrenIndex, (item) => item !== child.id));
                }
            }
            /** @type {?} */
            const parentView = this.getParentView();
            //remove ourself from the view children map
            if (parentView != null && parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(child.getId()));
            }
            //move children of children
            if (child.removeAllChildren) {
                child.removeAllChildren();
            }
        }
    }
    /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    removeChildById(id) {
        /** @type {?} */
        const child = this.getElementById(id);
        if (child != null) {
            this.removeChild(child);
        }
    }
    /**
     * Remove all child components
     * @return {?}
     */
    removeAllChildren() {
        if (this.children != null) {
            /** @type {?} */
            const cit = this.children.values();
            /** @type {?} */
            let cr = cit.next();
            while (cr.done !== true) {
                this.removeChild(cr.value);
                cr = cit.next();
            }
        }
        if (this.tabChildrenIds != null) {
            this.tabChildrenIds.forEach(cid => {
                this.removeChildById(cid);
            });
        }
    }
    /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    getElementById(id) {
        return this.findElementById(id);
    }
    /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    hasChild(id) {
        return this.findElementById(id) != null;
    }
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    setValidate(attr) {
        //TODO
        console.error("setValidate is not implemented");
    }
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    setType(type) {
        //TODO
        console.error("setType is not implemented");
    }
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    setFormat(format) {
        //TODO
        console.error("setFormat is not implemented");
    }
    /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    setMaxLength(maxLength) {
        this.maxLength = maxLength;
        this.markForCheck();
    }
    /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    setMinLength(minLength) {
        this.minLength = minLength;
        this.markForCheck();
    }
    /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    setMaxByteLen(bl) {
        this.setMaxLength(bl);
    }
    /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    setValue(val) {
    }
    /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    setFocusable(focusable) {
        //TODO
    }
    /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    selectParentTab() {
        /**
         * @param {?} item
         * @return {?}
         */
        function findTabBelong(item) {
            if (item != null) {
                /** @type {?} */
                const parent = item.getParent();
                if (parent != null && parent.getLocalName() !== 'tab')
                    return findTabBelong(parent);
                return parent;
            }
        }
        /** @type {?} */
        const tab = /** @type {?} */ (findTabBelong(this.getElementById(this.id)));
        /**
         * @param {?} tab
         * @return {?}
         */
        function findTabPaneBelong(tab) {
            if (tab != null) {
                /** @type {?} */
                const parent = tab.getParent();
                if (parent != null && parent.getLocalName() !== 'tab-pane')
                    return findTabPaneBelong(parent);
                return parent;
            }
        }
        /** @type {?} */
        const tabPane = /** @type {?} */ (findTabPaneBelong(this.getElementById(this.id)));
        if (tab != null) {
            tabPane.setSelectedTab(tab.id);
        }
    }
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    findElementById(id) {
        /** @type {?} */
        const mappedChildId = KeyUtils.toMapKey(id);
        /** @type {?} */
        let comp = null;
        //first check for cache
        // let comp: BaseComponent = UiDocument.getFromCache(mappedChildId);
        if (comp == null) {
            /** @type {?} */
            const radioGroup = this.getRadioButtonGroupComponent(id);
            if (radioGroup != null) {
                comp = radioGroup;
            }
            if (comp == null) {
                //get all children from View
                // const allChildren = this.getParentView().reduceChildrenIterative();
                // const editorId = `#{id}`;
                // for (let child of allChildren) {
                //   if (
                //     KeyUtils.toMapKey(child.getId()) === mappedChildId ||
                //     //by editor id (e.g. editor="#editorId")
                //     child.editor === editorId
                //   ) {
                //     comp = child;
                //     break;
                //   }
                // }
                if (this._viewChildrenMap != null) {
                    comp = this._viewChildrenMap.get(mappedChildId);
                }
                if (comp == null && this.isView() !== true) {
                    /** @type {?} */
                    const parentView = this.getParentView();
                    if (parentView != null) {
                        comp = parentView.findElementById(mappedChildId);
                    }
                }
            }
            //if we find component, add to cache
            // if (comp != null) {
            //   UiDocument.addToCache(mappedChildId, comp);
            // }
        }
        if (comp === undefined) {
            comp = null;
        }
        return comp;
    }
    /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    getRadioButtonGroupComponent(id) {
        if (id === (/** @type {?} */ (this)).group) {
            //radio button group
            return this;
        }
        else {
            /** @type {?} */
            const radioGroup = this.getRadioButtonGroup(id);
            if (radioGroup != null) {
                /** @type {?} */
                let retVal = radioGroup[0];
                for (let radio of radioGroup) {
                    if (radio.getChecked() === true) {
                        retVal = radio;
                        break;
                    }
                }
                return retVal;
            }
        }
        return null;
    }
    /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    addAttributeChangeListener(listener) {
        if (this.attributeChangeListeners == null) {
            this.attributeChangeListeners = [];
        }
        listener._internalId = BaseComponent.generateUniqueId('listener');
        this.attributeChangeListeners.push(listener);
    }
    /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    removeAttributeChangeListener(listener) {
        if (this.attributeChangeListeners != null) {
            this.attributeChangeListeners = filter(this.attributeChangeListeners, (item) => item._internalId !== listener._internalId);
        }
    }
    /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    fireSetAttributeEvent(attributeName, newValue) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            const event = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), newValue, this);
            forEach(this.attributeChangeListeners, (listener) => {
                listener.onAttributeSet(event);
            });
        }
    }
    /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    fireRenoveAttributeEvent(attributeName) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            const event = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), null, this);
            forEach(this.attributeChangeListeners, (listener) => {
                listener.onAttributeRemoved(event);
            });
        }
    }
    /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    cleanCss(css) {
        return BaseComponent.cleanCss(css);
    }
    /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    static cleanCss(css) {
        if (css != null && css.indexOf(".") >= 0) {
            //more than one style?
            if (css.indexOf(" ") > 0) {
                return map(css.split(" "), (item) => this.cleanCss(item)).join(" ");
            }
            else {
                //only one style
                return css.replace(/\./g, '-').replace(/^\-/, '');
            }
        }
        return css;
    }
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    getChangeDetector() {
        //sub-class override
        return null;
    }
    /**
     * Mark component for change detection
     * @return {?}
     */
    markForCheck() {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().markForCheck();
            }
        }
    }
    /**
     * Invoke change detection on component
     * @return {?}
     */
    detectChanges() {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().detectChanges();
            }
        }
    }
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    initWidthHeightStyle(heightStyleName = 'height', widthStyleName = 'max-width') {
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.styles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.styles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    }
    /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    addRadioButtonGroup(radio) {
        //radio group need to be at ViewComponent level
        if (this.isView() !== true && this.getParent() != null) {
            return this.getParent().addRadioButtonGroup(radio);
        }
        if (this.radioButtonGroups == null) {
            this.radioButtonGroups = new Map();
        }
        /** @type {?} */
        let groupId = (/** @type {?} */ (radio)).group;
        if (this.radioButtonGroups.get(groupId) == null) {
            this.radioButtonGroups.set(groupId, [radio]);
        }
        else {
            this.radioButtonGroups.get(groupId).push(radio);
        }
        return;
    }
    /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    getRadioButtonGroup(groupId) {
        /** @type {?} */
        let view = this.getParentView();
        return view != null && view.radioButtonGroups != null ? view.radioButtonGroups.get(groupId) : null;
    }
    /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    setControlWidth(width) {
        this.controlWidth = width;
        this.initWidthHeightStyle();
        this.markForCheck();
    }
    /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    setControlHeight(height) {
        this.controlHeight = height;
        this.initWidthHeightStyle();
        this.markForCheck();
    }
    /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    setWidth(width) {
        this.setControlWidth(width);
    }
    /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    getWidth() {
        return this.controlWidth;
    }
    /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    setHeight(height) {
        this.setControlHeight(height);
    }
    /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    getHeight() {
        return this.controlHeight;
    }
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    setX(x) {
        this.x = x;
        this.styles["left"] = x + "px";
        this.markForCheck();
    }
    /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    getX() {
        return this.x;
    }
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    setY(y) {
        this.y = y;
        this.styles["top"] = y + "px";
        this.markForCheck();
    }
    /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    getY() {
        return this.y;
    }
    /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    setBorderWidth(borderWidth) {
        this.borderWidth = borderWidth;
        this.markForCheck();
    }
    /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    isView() {
        return false;
    }
    /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    isNoneActiveView() {
        return false;
    }
    /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    isDialog() {
        return false;
    }
    /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    isDynamicView() {
        return false;
    }
    /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    getParentView() {
        if (this.isView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
                if (temp.isView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    }
    /**
     * @return {?}
     */
    getParentScrollView() {
        if (this.isScrollView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
                if (temp.isScrollView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    }
    /**
     * @return {?}
     */
    isScrollView() {
        return false;
    }
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    _getNoneActiveViewParent() {
        if (this.isNoneActiveView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
                if (temp.isNoneActiveView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    }
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    handleOnContextMenu(event, force = false) {
        //allow component to skip emit event and let parent (i.e. table cell to emit it)
        if (force === true || this.skipEmitContextMenuEvent !== true) {
            if (this.getSession() != null) {
                this.getSession().setMousePosition(event);
            }
            /** @type {?} */
            const parentView = this.getParentView();
            /** @type {?} */
            let popupMenuId = null;
            if (parentView != null) {
                popupMenuId = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
            }
            this.onContextMenu.emit(event);
            if (this.popup != null && this.popup !== "") {
                if (this.popup.indexOf("#") === 0) {
                    this.popup = this.popup.substring(1);
                }
                popupMenuId = this.popup;
                this.getSession()._currentPopupMenuId = this.popup;
            }
            if (popupMenuId != null) {
                event.stopPropagation();
                event.preventDefault();
                /** @type {?} */
                const tm = setTimeout(() => {
                    clearTimeout(tm);
                    if (this.getSession()._currentPopupMenuId != null) {
                        popupMenuId = this.getSession()._currentPopupMenuId;
                    }
                    this.getSession().showContextMenu(popupMenuId);
                    this.getSession()._currentPopupMenuId = null;
                });
            }
        }
    }
    /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    validateField(event) {
        if (AppUtils.validateField != null && AppUtils.validateField(this) !== true) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.onBeforeActiveLost.emit();
        this.focusLost();
    }
    /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    getTableChildren() {
        return [];
    }
    /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    getBgColor() {
        return this.bgColor;
    }
    /**
     * @return {?}
     */
    setAttributeFromDef() {
        /** @type {?} */
        const compDef = this.getSession().getDef(this.id);
        if (compDef != null && compDef.attribute != null) {
            if (compDef.attribute instanceof Map ||
                compDef.attribute instanceof Hashtable ||
                compDef.attribute instanceof HashMap) {
                /** @type {?} */
                const keys$$1 = compDef.attribute.keys();
                /** @type {?} */
                let key = keys$$1.next();
                while (key.done !== true) {
                    this.setAttribute(key.value, compDef.attribute.get(key));
                    key = keys$$1.next();
                }
            }
            else {
                /** @type {?} */
                const keys$$1 = keys(compDef.attribute);
                for (let key of keys$$1) {
                    this.setAttribute(key, compDef.attribute[key]);
                }
            }
        }
    }
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        return null;
    }
    /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    setHighlightBgColor(color) {
        this.highlightBgColor = color;
    }
    /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    setHighlightFontColor(color) {
        this.highlightFontColor = color;
    }
    /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    getHighlightBgColor() {
        return this.highlightBgColor;
    }
    /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    getHighlightFontColor() {
        return this.highlightFontColor;
    }
    /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    getParentTableRow() {
        return this.parentTableRow;
    }
    /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    isChangeDetectionFrozen() {
        return false;
    }
    /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    isFauxElement() {
        return false;
    }
    /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    getViewChildrenMap() {
        return this._viewChildrenMap;
    }
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    removeViewChildFromMap(id) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.delete(KeyUtils.toMapKey(id));
        }
    }
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    addViewChildToMap(obj) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.set(KeyUtils.toMapKey(obj.getId()), /** @type {?} */ (obj));
        }
    }
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    invokeMcoAction(action) {
        if (typeof action === "function") {
            action(this);
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            const mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    if (arg === "this") {
                        mco[methodName].apply(mco, [this]);
                    }
                    else {
                        mco[methodName].apply(mco, [arg]);
                    }
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
            else {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    _notifyInternalChangeCb() {
        if (typeof this._internalChangeCb === "function") {
            this._internalChangeCb(this);
        }
    }
    /**
     * @return {?}
     */
    emptyChildren() {
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
        if (this.children != null) {
            this.children.clear();
        }
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
            delete this._viewChildrenMap;
        }
        // this._viewChildrenMap = null;
    }
    /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    isScrollPane() {
        return false;
    }
    /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    resetScrollTopToPreviousPosition() {
        //implement by scrollpane
    }
    /**
     * Reset all scrollpane pos
     * @return {?}
     */
    resetAllScrollPanesPositionToPrevious() {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopToPreviousPosition());
        }
    }
    /**
     * @return {?}
     */
    resetScrollTopPosition() {
    }
    /**
     * @return {?}
     */
    resetAllScrollPanesPositionToTop() {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopPosition());
        }
    }
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    notifyParentOfError() {
        if (this.getDisabled() === true) {
            /** @type {?} */
            const parentView = this.getParentView();
            if (parentView != null && parentView["dialog"] != null) {
                if (parentView["dialog"]._disabledErrorElementId == null) {
                    parentView["dialog"]._disabledErrorElementId = [];
                }
                if (parentView["dialog"]._disabledErrorElementId.indexOf(this.getId()) < 0) {
                    parentView["dialog"]._disabledErrorElementId.push(this.getId());
                }
            }
        }
    }
    /**
     * Focus the parent tab
     * @return {?}
     */
    focusParentTab() {
        /** @type {?} */
        const parentView = this._getNoneActiveViewParent() || this.getParentView();
        if (parentView != null) {
            /** @type {?} */
            const tabPane = parentView.getParent();
            //check to see if the parent is a Tab
            if (tabPane != null && tabPane.getNxTagName() === "tab") {
                tabPane.setFocus();
            }
        }
    }
    /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    registerScrollPane(scrollPane) {
        if (typeof scrollPane.isScrollPane === "function" && scrollPane.isScrollPane() === true) {
            if (this.scrollPanes == null) {
                this.scrollPanes = [];
            }
            this.scrollPanes.push(scrollPane);
        }
    }
}
BaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-base',
                template: 'nothing here'
            }] }
];
/** @nocollapse */
BaseComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
BaseComponent.propDecorators = {
    autoWrap: [{ type: Input }],
    borderPosition: [{ type: Input }],
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    sort: [{ type: Input }],
    visible: [{ type: Input }],
    text: [{ type: Input }],
    cssClass: [{ type: Input }],
    controlWidth: [{ type: Input }],
    controlHeight: [{ type: Input }],
    maxHeight: [{ type: Input }],
    lineHeight: [{ type: Input }],
    marginRight: [{ type: Input }],
    marginLeft: [{ type: Input }],
    marginTop: [{ type: Input }],
    marginBottom: [{ type: Input }],
    controlMargin: [{ type: Input }],
    controlPadding: [{ type: Input }],
    controlOverflow: [{ type: Input }],
    panelWidth: [{ type: Input }],
    panelMinWidth: [{ type: Input }],
    panelMinHeight: [{ type: Input }],
    controlFloat: [{ type: Input }],
    required: [{ type: Input }],
    pattern: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    minLength: [{ type: Input }],
    maxLength: [{ type: Input }],
    inputLocale: [{ type: Input }],
    inputCharsets: [{ type: Input }],
    focusOnActivation: [{ type: Input }],
    focused: [{ type: Input }],
    orderIndex: [{ type: Input }],
    x: [{ type: Input }],
    y: [{ type: Input }],
    require: [{ type: Input }],
    controlWidthComboBox: [{ type: Input }],
    class: [{ type: Input }],
    hGrabSpace: [{ type: Input }],
    vGrabSpace: [{ type: Input }],
    bgColor: [{ type: Input }],
    editor: [{ type: Input }],
    popup: [{ type: Input }],
    alignHorizontal: [{ type: Input }],
    enabled: [{ type: Input }],
    sortValue: [{ type: Input }],
    customAttributes: [{ type: Input }],
    fontBold: [{ type: Input }],
    fontColor: [{ type: Input }],
    fontItalic: [{ type: Input }],
    fontSize: [{ type: Input }],
    fontUnderline: [{ type: Input }],
    fontColorDisabled: [{ type: Input }],
    opacity: [{ type: Input }],
    borderColor: [{ type: Input }],
    borderWidth: [{ type: Input }],
    borderStyle: [{ type: Input }],
    borderHeight: [{ type: Input }],
    skipEmitContextMenuEvent: [{ type: Input }],
    onContextMenu: [{ type: Output }],
    onActiveLost: [{ type: Output }],
    onBeforeActiveLost: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class McoContainerModule {
}
McoContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [],
                providers: [
                    McoContainerService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class EventHandlerModule {
}
EventHandlerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McoContainerModule
                ],
                declarations: [],
                providers: [
                    EventHandlerService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SessionModule {
}
SessionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McoContainerModule,
                    EventHandlerModule
                ],
                declarations: [],
                providers: [
                    SessionService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class JavaModule {
}
JavaModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class OnCreateDirective {
    /**
     * @param {?} elementRef
     * @param {?} zone
     */
    constructor(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.vtOnCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.runOutsideZone === true) {
            this.zone.runOutsideAngular(() => {
                this.vtOnCreate.emit({
                    element: this.elementRef
                });
            });
        }
        else {
            this.vtOnCreate.emit({
                element: this.elementRef
            });
        }
    }
}
OnCreateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtOnCreate]'
            },] }
];
/** @nocollapse */
OnCreateDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
OnCreateDirective.propDecorators = {
    runOutsideZone: [{ type: Input }],
    vtOnCreate: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BaseModule {
}
BaseModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SessionModule,
                    JavaModule,
                    EventHandlerModule
                ],
                declarations: [BaseComponent, OnCreateDirective],
                exports: [BaseComponent, OnCreateDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const ComponentType = {
    LABEL: 0,
    BUTTON: 1,
    TEXT_FIELD: 2,
    COMBOBOX: 3,
    CHECKBOX: 4,
    RADIO: 5,
    TEXTAREA: 6,
};
ComponentType[ComponentType.LABEL] = 'LABEL';
ComponentType[ComponentType.BUTTON] = 'BUTTON';
ComponentType[ComponentType.TEXT_FIELD] = 'TEXT_FIELD';
ComponentType[ComponentType.COMBOBOX] = 'COMBOBOX';
ComponentType[ComponentType.CHECKBOX] = 'CHECKBOX';
ComponentType[ComponentType.RADIO] = 'RADIO';
ComponentType[ComponentType.TEXTAREA] = 'TEXTAREA';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Button component class. Inherits from [[BaseComponent]]
 */
class ButtonComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} cd
     * @param {?} renderer
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.focused = true;
        this.onCommand = new EventEmitter();
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.marginTop != null) {
            this.marginTop = this.marginTop + 'px';
        }
        if (this.marginRight != null) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft != null) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    }
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        //register client event for mco
        this.handleClick(event);
        this.onCommand.emit();
        //it looks like you can change onCommand binding at runtime and since we are code
        //we add another fn to do it (we may removed this later once we have a better of usage)
        this.emitInternalOnCommand();
    }
    /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    onMouseDown(e) {
        /** @type {?} */
        let currentTarget = e.currentTarget['id'];
        if (currentTarget != null && currentTarget.indexOf("BtnClose") > 0) {
            AppUtils.isCloseBtn = true;
        }
        else {
            AppUtils.isCloseBtn = false;
        }
        this.handleMouseDown(e);
    }
    /**
     * @return {?}
     */
    handleOnBlur() {
        AppUtils.isCloseBtn = false;
    }
    /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    getNxTagName() {
        return "button";
    }
    /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "focused", this.focused);
        return json;
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-button',
                template: "<button [disabled]=\"disabled || !enabled\"\n        [ngClass]=\"{'hidden': visible != true}\"\n\t\t\t\t[style.color]=\"fontColor\"\n\t\t\t\t[id]=\"id\"\n\t\t\t\ttype=\"button\" class=\"btn btn-default {{cssClass}}\"\n\t\t\t\t(mousedown)=\"onMouseDown($event)\"\n\t\t\t\t(click)=\"onClick($event)\"\n        (contextmenu)=\"handleOnContextMenu($event)\"\n        (blur)=\"handleOnBlur()\"\n        [ngStyle]=\"styles\"\n        [style.padding]=\"controlPadding\"\n        [style.margin-top]=\"marginTop\"\n        [style.margin-left]=\"marginLeft\"\n        [style.margin-right]=\"marginRight\"\n        [style.margin-bottom]=\"marginBottom\"\n        [style.line-height]=\"lineHeight\">\n\t{{ text }}\n\t<!-- allow children (in case user want to display html) -->\n\t<ng-content></ng-content>\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ButtonComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
ButtonComponent.propDecorators = {
    focused: [{ type: Input }],
    onCommand: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ButtonModule {
}
ButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [ButtonComponent],
                exports: [ButtonComponent],
                entryComponents: [
                    ButtonComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Check box component class
 */
class CheckboxComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} cd
     * @param {?} renderer
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.checked = false;
        this.onCommand = new EventEmitter();
        this.onStateChange = new EventEmitter();
        this.onSelect = new EventEmitter();
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set isChecked(boo) {
        this.checked = boo;
    }
    /**
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.setAttributeFromDef();
        this.cd.detectChanges();
    }
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleClick(event);
        this.onCommand.emit();
    }
    /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleMouseDown(event);
    }
    /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    handleStateChange() {
        this.onStateChange.emit();
        if (this.checked === true) {
            this.onSelect.emit();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    }
    /**
     * Get component name
     * @return {?} Name of component
     */
    getLocalName() {
        return "checkBox";
    }
    /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    getChecked() {
        return this.checked;
    }
    /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    setChecked(shouldChecked, skipInternalChange = false) {
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    }
    /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    setSelected(boo) {
        this.setChecked(boo);
    }
    /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    getValue() {
        return this.value;
    }
    /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        if (this.getChecked() === true) {
            json["selected"] = "true";
        }
        else {
            json["selected"] = "false";
        }
        if (this.value != null) {
            json["value"] = this.value + '';
        }
        return json;
    }
    /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    getNxTagName() {
        return "checkBox";
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    setBgColor(color) {
        this['elementRef'].nativeElement.children[0]['style']['background-color'] = color;
    }
    /**
     * @return {?}
     */
    getBgColor() {
        return this['elementRef'].nativeElement.children[0]['style']['background-color'];
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-check-box',
                template: "<div class=\"checkbox {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-checkbox\" [disabled]=\"disabled\" [id]=\"id\" type=\"checkbox\" value=\"\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (change)=\"handleStateChange()\" [(ngModel)]=\"checked\" [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => CheckboxComponent)
                    }
                ],
                styles: ["div>label>input{position:static;vertical-align:middle}"]
            }] }
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
CheckboxComponent.propDecorators = {
    value: [{ type: Input }],
    checked: [{ type: Input }],
    isChecked: [{ type: Input }],
    onCommand: [{ type: Output }],
    onStateChange: [{ type: Output }],
    onSelect: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CheckboxModule {
}
CheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [CheckboxComponent],
                exports: [
                    CheckboxComponent,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                entryComponents: [
                    CheckboxComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ListItemDirective {
    constructor() { }
}
ListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-list-item'
            },] }
];
/** @nocollapse */
ListItemDirective.ctorParameters = () => [];
ListItemDirective.propDecorators = {
    value: [{ type: Input }],
    text: [{ type: Input }],
    selected: [{ type: Input }],
    isChecked: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ListBoxDirective {
    constructor() { }
}
ListBoxDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-list-box'
            },] }
];
/** @nocollapse */
ListBoxDirective.ctorParameters = () => [];
ListBoxDirective.propDecorators = {
    listItems: [{ type: ContentChildren, args: [ListItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FauxComboElement {
    /**
     * @param {?} comboBox
     * @param {?} valuePair
     */
    constructor(comboBox, valuePair) {
        this.comboBox = comboBox;
        this.valuePair = valuePair;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (name === AttributesEnum.SELECTED || name === "selected") {
            if (value == true || value == "true") {
                this.comboBox.setSelectItem(this.valuePair, true);
            }
            else {
                this.comboBox.setSelectItem(null, true);
            }
            this.valuePair.selected = value == true || value == "true";
            this.comboBox.detectChanges();
        }
        else if (name === AttributesEnum.VISIBLE || name === "visible") {
            this.valuePair.visible = value;
        }
        else if (name === AttributesEnum.TEXT || name === "text") {
            this.valuePair.text = value;
        }
        else if (name === AttributesEnum.VALUE || name === "value") {
            this.valuePair.value = value;
        }
        else {
            console.error("FauxComboElement: Unknown attribute: " + name);
        }
    }
    /**
     * @return {?}
     */
    getLocalName() {
        return FauxComboElement.LOCAL_NAME;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAttribute(name) {
        if (name === "value" || name === AttributesEnum.VALUE) {
            return this.valuePair.value;
        }
        if (name === "text" || name === AttributesEnum.TEXT) {
            return this.valuePair.text;
        }
        if (name === "selected" || name === AttributesEnum.SELECTED) {
            return this.valuePair.selected == true ? "true" : "false";
        }
    }
    /**
     * @return {?}
     */
    getValue() {
        return this.getAttribute("value");
    }
    /**
     * @return {?}
     */
    getText() {
        return this.getAttribute("text");
    }
    /**
     * @return {?}
     */
    isSelected() {
        return this.getAttribute("selected");
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    setChecked(boo) {
        this.setAttribute("selected", boo);
    }
}
FauxComboElement.LOCAL_NAME = "listItem";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for combo box component
 */
class ComboBoxComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} cd ChangeDetector reference provided by Angular to control change detection
     * @param {?} renderer see [[BaseComponent]]
     * @param {?} ngZone
     */
    constructor(parent, sessionService, elementRef, cd, renderer, ngZone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.ngZone = ngZone;
        this.onCommand = new EventEmitter();
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        this.defaultStyle = {
            'color': '#333333',
            'background-color': '#ffffff'
        };
        this.dropdownElementId = `dropdown-${this.id}`;
        this.isDropup = false;
        this.isDropdownOpen = false;
        /* istanbul ignore next */
        this.dropdownMenuStyle = {};
        /* istanbul ignore next */
        this.hasInputFocus = false;
        this.isFirstKeyDown = true;
        this.parentScrollHanlder = () => {
            /* istanbul ignore else */
            if (this.dropdown != null) {
                this.dropdown.hide();
            }
        };
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set listItems(items) {
        this._listItems = items;
        if (this._listItems != null) {
            /** @type {?} */
            const selectedItem = find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
    }
    /**
     * Accessor method for [[_listItems]] property
     * @return {?}
     */
    get listItems() {
        return this._listItems;
    }
    /**
     * Accessor method for [[selectedItem.text]] property
     * @return {?}
     */
    get selectedItemText() {
        return this.selectedItem ? this.selectedItem.text : '';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.parentScrollHanlder != null && this.parentScroller != null) {
            this.ngZone.runOutsideAngular(() => {
                this.parentScroller.removeEventListener("scroll", this.parentScrollHanlder);
            });
        }
        this.parentScrollHanlder = null;
        this.parentScroller = null;
        if (this.dropdown && this.dropdown.isOpen) {
            this.dropdown.hide();
        }
        this.dropdown = null;
        super.ngOnDestroy();
    }
    /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.dropdownElementId = `dropdown-${this.id}`;
        // Ensure controlWidth is exists and is a number
        if (parseInt(this.controlWidth, 10)) {
            this.dropdownMenuStyle['min-width'] = this.controlWidth + 'px !important';
        }
        if (this.alignHorizontal) {
            this.alignHorizontal = this.alignHorizontal;
        }
    }
    /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.listBox != null && this.listBox.listItems != null) {
            this._listItems = [];
            this.listBox.listItems.forEach((item) => {
                /** @type {?} */
                let text = item.text || '';
                /** @type {?} */
                let value = item.value || '';
                this._listItems.push({
                    text: text ? text : value,
                    value: value ? value : text,
                    selected: item.selected === true || item.selected === "true" || item.isChecked === true || item.isChecked === "true"
                });
            });
            /** @type {?} */
            const selectedItem = find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
        this.loadDataFromDef();
        this.cd.detectChanges();
        this.subscribeToParentScroller();
    }
    /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    initializeComboboxValues(values) {
        if (values != null) {
            this._listItems = map(values, (item) => {
                item.text = item.text || '';
                return {
                    text: item.text,
                    value: item.value,
                    selected: item.selected
                };
            });
            /** @type {?} */
            const selectedItem = find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
            else {
                this.setSelectItem(this._listItems[0]);
            }
        }
        else {
            this._listItems = [];
        }
        this.cd.markForCheck();
    }
    /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    selectItem(item, event) {
        this.inputElement.nativeElement.focus();
        this.setSelectItem(item);
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    }
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    setSelectItem(item, forceCd = false) {
        this.selectedItem = item;
        if (forceCd === true) {
            this.cd.markForCheck();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    }
    /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    setSelectValue(value) {
        if (this._listItems != null) {
            /** @type {?} */
            const temp = find(this._listItems, (item) => item.value == value || (value != null && value !== "" && value === item.text));
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    onInputClick(event, dropdown) {
        event.stopPropagation();
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        dropdown.toggle(true);
        if (parseInt(this.controlWidthComboBox, 10)) {
            this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox)) + 'px';
        }
        else {
            this.dropdownMenuStyle['width'] = (parseInt(this.elementRef.nativeElement.children[0].children[0].children[0].clientWidth) + 20) + 'px';
        }
    }
    /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    onKeyDown(e, dropdown) {
        if (!this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            dropdown.toggle(true);
            /** @type {?} */
            let idx = 0;
            // トグルが閉じられている状態でキーボードのUP、DOWNが押下された場合
            if (e.keyCode === 38) {
                // UPの場合、プルダウンの最終に移動してしまうため、最後の要素を設定とする
                idx = this._listItems.length - 1;
            }
            else {
                // DOWNの場合、最初の要素を設定とする
                idx = 0;
            }
            // :hover状態のインデックスを更新
            this.hoveredItem = idx;
            // プルダウンを設定
            this.selectItem(this._listItems[idx], null);
            // フラグを更新
            this.isFirstKeyDown = false;
        }
        else if (this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            // トグルが開いている状態かつキーボードのUP、DOWNが押下された場合
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            /** @type {?} */
            let idx = 0;
            if (e.keyCode === 38) { // 38 = UP arrow
                // 38 = UP arrow
                if (this.isFirstKeyDown || this.hoveredItem === 0) {
                    // トグルが開かれた状態で、初めてキーが押下された場合
                    // :hover状態のプルダウン要素が一番上の場合
                    // UPは最後の要素を設定する
                    idx = this._listItems.length - 1;
                }
                else {
                    // 上記以外
                    // :hover状態の要素の１つ上を設定
                    idx = this.hoveredItem - 1;
                }
            }
            else { // 40 = DOWN arrow
                // 40 = DOWN arrow
                if (this.isFirstKeyDown || this.hoveredItem === (this._listItems.length - 1)) {
                    // トグルが開かれた状態で、初めてキーが押下された場合
                    // :hover状態のプルダウン要素が一番下の場合
                    // 初めの要素を設定
                    idx = 0;
                }
                else {
                    // 上記以外
                    // :hover状態の要素の１つ下を設定
                    idx = this.hoveredItem + 1;
                }
            }
            // :hover状態のインデックスを更新
            this.hoveredItem = idx;
            // プルダウンを設定
            this.selectItem(this._listItems[idx], null);
            // フラグを更新
            this.isFirstKeyDown = false;
        }
        this.cd.markForCheck();
        // V3R1-UT-NSD-643 修正 END
    }
    /**
     * @return {?}
     */
    adjustPulldownWidth() {
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        if (parseInt(this.controlWidthComboBox, 10)) {
            this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox)) + 'px';
        }
        else {
            this.dropdownMenuStyle['width'] = (parseInt(this.elementRef.nativeElement.children[0].children[0].children[0].clientWidth) + 20) + 'px';
        }
    }
    /**
     * @return {?}
     */
    toggleStatus() {
        if (!this.isDropdownOpen) {
            /** @type {?} */
            let id = get(this.getParentScrollView(), "id");
            /** @type {?} */
            let _this = this;
            $(`#${id}`).on('scroll mousewheel', function (e) {
                if (_this.dropdown != null) {
                    _this.dropdown.hide();
                }
                // return false;
            });
            /** @type {?} */
            const parentView = /** @type {?} */ (this.getParentView());
            if (parentView != null && parentView.dialog != null && parentView.dialog.modalContent && parentView.dialog.modalContent != null) {
                /** @type {?} */
                let parentPanel = parentView.dialog && parentView.dialog.modalContent.nativeElement;
                /** @type {?} */
                let comboBox = this.inputElement.nativeElement.parentElement;
                /** @type {?} */
                let parentPos = parentPanel.getBoundingClientRect();
                /** @type {?} */
                let childrenPos = comboBox.getBoundingClientRect();
                /** @type {?} */
                let distanceToBottom = parentPos.bottom - childrenPos.bottom;
                /** @type {?} */
                let distanceToTop = childrenPos.top - parentPos.top;
                /** @type {?} */
                let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
                if (distanceToBottom < 200) {
                    if (distanceToTop > 200) {
                        $(".dropdown-menu").parent().attr("class", "dropup");
                    }
                    else if (distanceToTop > distanceToBottom) {
                        $(".dropdown-menu").parent().attr("class", "dropup");
                    }
                    else {
                        $(".dropdown-menu").parent().attr("class", "dropdown");
                    }
                }
                else {
                    $(".dropdown-menu").parent().attr("class", "dropdown");
                }
            }
            else if (parentView != null) {
                /** @type {?} */
                let dialog = $(`#${parentView["mainScreenId"]}`);
                if (dialog != null && dialog.children() && dialog.children()[0] && dialog.children()[0] != null) {
                    /** @type {?} */
                    let comboBox = this.inputElement.nativeElement.parentElement;
                    /** @type {?} */
                    let parentPos = dialog.children()[0].getBoundingClientRect();
                    /** @type {?} */
                    let childrenPos = comboBox.getBoundingClientRect();
                    /** @type {?} */
                    let distanceToBottom = parentPos.bottom - childrenPos.bottom;
                    /** @type {?} */
                    let distanceToTop = childrenPos.top - parentPos.top;
                    /** @type {?} */
                    let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
                    if (distanceToBottom < 200) {
                        if (distanceToTop > 200) {
                            $(".dropdown-menu").parent().attr("class", "dropup");
                        }
                        else if (distanceToTop > distanceToBottom) {
                            $(".dropdown-menu").parent().attr("class", "dropup");
                        }
                        else {
                            $(".dropdown-menu").parent().attr("class", "dropdown");
                        }
                    }
                    else {
                        $(".dropdown-menu").parent().attr("class", "dropdown");
                    }
                }
            }
        }
        else {
            /** @type {?} */
            let id = get(this.getParentScrollView(), "id");
            $(`#${id}`).off('scroll mousewheel');
            // V3R1-UT-NSD-643 修正 START
            // トグルが閉じられたタイミングでフラグを戻す
            this.isFirstKeyDown = true;
            // V3R1-UT-NSD-643 修正 END
            this.dropdown.hide();
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    setValue(val) {
        this.setSelectValue(val);
        this.cd.markForCheck();
    }
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    setText(text) {
        if (text == null) {
            this.setSelectItem(null);
            this.cd.markForCheck();
        }
        else if (this._listItems != null) {
            /** @type {?} */
            const temp = find(this._listItems, (item) => item.text == text);
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    getValue() {
        return this.selectedItem ? this.selectedItem.value : null;
    }
    /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    getText() {
        return this.selectedItem ? this.selectedItem.text : "";
    }
    /**
     * Focuses the native input element
     * @return {?}
     */
    setFocus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    setBgColor(bgColor) {
        this.inputElement.nativeElement.style.backgroundColor = bgColor;
    }
    /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    findItemByText(text) {
        return find(this._listItems, (item) => item.text == text);
    }
    /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    getChildren() {
        /** @type {?} */
        const result = new Vector();
        if (this._listItems != null) {
            forEach(this._listItems, (item) => {
                result.add(new FauxComboElement(this, item));
            });
        }
        return result;
    }
    /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json.value = this.getValue();
        return json;
    }
    /**
     * Returns string name of the component
     * @return {?} String
     */
    getLocalName() {
        return "comboBox";
    }
    /**
     * Returns string tag name of component
     * @return {?}
     */
    getNxTagName() {
        return "comboBox";
    }
    /**
     * @return {?} [[ChangeDetector]] for the component
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    loadDataFromDef() {
        /** @type {?} */
        let defId = this.getId();
        if (this.editor != null && this.editor.length > 0) {
            defId = this.editor.substring(1);
        }
        /** @type {?} */
        const def = this.getSession().getDef(defId);
        if (def != null && def.valueList != null) {
            /** @type {?} */
            const attribute = def.attribute;
            this.initializeComboboxValues(map(def.valueList, (item) => {
                return {
                    value: item["value"],
                    text: item["name"],
                    selected: item["selectFlg"] === "true" || item["selectFlg"] === true
                };
            }));
            this.setAttributeFromDef();
        }
    }
    /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    inputFocusOut() {
        if (!this.hasInputFocus)
            return; //On the IE, prevent to fire focusout event without focusin event.(this occurs when error-dialog is showed.)issue#1433NG(2)
        if (this.inputElement.nativeElement.ownerDocument.activeElement === this.inputElement.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.setBgColor('');
        this.onBeforeActiveLost.emit();
        this.hasInputFocus = false;
        setTimeout(() => {
            /** @type {?} */
            let $active = $(":focus");
            if ($active.length > 0 && !$active.is("body") && $active.closest(".vt-combo-box,[vt-arrow-navigatable-container]").length == 0) {
                if (this.dropdown && this.dropdown.isOpen) {
                    this.dropdown.hide();
                }
            }
        }, 10);
    }
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    inputFocusIn() {
        this.hasInputFocus = true;
    }
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    preventDefault(event) {
        event.preventDefault();
        event.stopPropagation();
        this.inputElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    subscribeToParentScroller() {
        /** @type {?} */
        const scrollParent = $(this.elementRef.nativeElement).scrollParent();
        if (scrollParent != null && scrollParent[0] instanceof HTMLElement) {
            this.parentScroller = scrollParent[0];
            this.ngZone.runOutsideAngular(() => {
                this.parentScroller.addEventListener("scroll", this.parentScrollHanlder);
            });
        }
    }
}
ComboBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-combo-box',
                template: "<div [id]=\"id\" class=\"btn-group dropdown vt-combo-box {{cssClass}} {{!disabled}}select\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  [style.margin]=\"controlMargin\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  #dropdown=\"bs-dropdown\"\n  (onShown)=\"toggleStatus()\"\n  (onHidden)=\"toggleStatus()\"\n  dropdown [isDisabled]=\"disabled === true\" container=\"body\" [dropup]=\"isDropup\">\n  <div class=\"input-group\">\n    <input #input class=\"form-control combobox-input-box\" type=\"text\" [value]=\"selectedItemText\" [style.text-align]=\"alignHorizontal\"\n      (focusin)=\"inputFocusIn()\" (focusout)=\"inputFocusOut()\" (click)=\"onInputClick($event, dropdown)\" [readonly]=\"disabled !== true\" [disabled]=\"disabled\" (keydown)=\"onKeyDown($event,dropdown)\"/>\n    <span class=\"input-group-btn\">\n      <button id=\"button\" (mousedown)=\"preventDefault($event)\" (click)=\"adjustPulldownWidth()\" dropdownToggle type=\"button\" class=\"btn combo-btn dropdown-toggle\" style=\"width: 20px\" tabindex=\"-1\">\n        <span class=\"caret\"></span>\n      </button>\n    </span>\n  </div>\n  <ul\n    *dropdownMenu\n    [id]=\"dropdownElementId\"\n    class=\"dropdown-menu combobox-dropdown\"\n    role=\"menu\"\n    [ngStyle]=\"dropdownMenuStyle\"\n    vt-arrow-navigatable-container\n    [activeParent]=\"input\"\n    (onTab)=\"dropdown.hide()\"\n  >\n    <li *ngFor=\"let item of listItems; index as i\">\n      <ng-template [ngIf]=\"item.visible !== false && item.visible !== 'false'\">\n        <a *ngIf=\"item.text != null && item.text !== ''\"\n          class=\"dropdown-item menuItem\"\n          (mousedown)=\"preventDefault($event)\"\n          (click)=\"selectItem(item, $event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          vt-arrow-navigatable-item>{{item.text}}</a>\n        <a *ngIf=\"item.text == null || item.text === ''\"\n          class=\"dropdown-item\"\n          (mousedown)=\"preventDefault($event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          vt-arrow-navigatable-item\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          (click)=\"selectItem(item, $event)\">\n          &nbsp;\n        </a>\n      </ng-template>\n    </li>\n  </ul>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ComboBoxComponent)
                    }
                ],
                styles: ["bs-dropdown-container ul.dropdown-menu.combobox-dropdown{max-height:225px;margin-top:-3px!important;overflow:auto;overflow-x:hidden}.combobox-dropdown>li>a{padding:3px 10px 3px 5px;font-size:9px!important;margin-bottom:0!important}.combobox-dropdown>li>a:hover{color:#0000cd;background-color:#ff9c00}.vt-combo-box .form-control[readonly]{background:#fff;cursor:default;margin-bottom:3px}bs-dropdown-container{z-index:10000}.combo-btn,.combo-btn:hover{color:#000;background-color:#fff;border-color:#ccc;margin-bottom:3px}.combo-btn[disabled]{color:grey;background-color:#ccc;border-color:#ccc;margin-bottom:3px}.falseselect div.input-group .form-control{color:grey;background-color:#eee}.mouse-hover{background:#ff9c00!important}.dropup .dropdown-menu{margin-bottom:26px}"]
            }] }
];
/** @nocollapse */
ComboBoxComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NgZone }
];
ComboBoxComponent.propDecorators = {
    onCommand: [{ type: Output }],
    listBox: [{ type: ContentChild, args: [ListBoxDirective,] }],
    inputElement: [{ type: ViewChild, args: ['input',] }],
    dropdown: [{ type: ViewChild, args: ["dropdown", { read: BsDropdownDirective },] }],
    listItems: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ArrowNavigatableItemDirective {
    /**
     * @param {?} element
     * @param {?} zone
     * @param {?} renderer
     */
    constructor(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.vtArrowOnMouseEnter = new EventEmitter();
        this.vtArrowOnMouseLeave = new EventEmitter();
        this.jq = $(this.element.nativeElement);
        this.renderer.setAttribute(this.element.nativeElement, "tabindex", "-1");
    }
    /**
     * @return {?}
     */
    handleOnBlur() {
        this.blur();
    }
    /**
     * @return {?}
     */
    handleOnFocus() {
        if (this.parent != null) {
            this.parent.activeItem = this;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.jq = null;
        this.element = null;
        this.zone = null;
    }
    /**
     * @return {?}
     */
    focus() {
        this.zone.run(() => {
            this.jq.mouseover();
            this.jq.focus();
            this.renderer.addClass(this.element.nativeElement, "mouse-hover");
        });
    }
    /**
     * @return {?}
     */
    blur() {
        this.zone.run(() => {
            this.jq.mouseout();
            this.jq.blur();
            this.renderer.removeClass(this.element.nativeElement, "mouse-hover");
        });
    }
    /**
     * @return {?}
     */
    select() {
        (/** @type {?} */ (this.element.nativeElement)).click();
    }
    /**
     * @return {?}
     */
    hover() {
        this.zone.run(() => {
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            this.vtArrowOnMouseEnter.emit();
        });
    }
    /**
     * @return {?}
     */
    leave() {
        this.zone.run(() => {
            this.vtArrowOnMouseLeave.emit();
        });
    }
}
ArrowNavigatableItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-arrow-navigatable-item]',
            },] }
];
/** @nocollapse */
ArrowNavigatableItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
ArrowNavigatableItemDirective.propDecorators = {
    vtArrowOnMouseEnter: [{ type: Output }],
    vtArrowOnMouseLeave: [{ type: Output }],
    handleOnBlur: [{ type: HostListener, args: ["blur",] }],
    handleOnFocus: [{ type: HostListener, args: ["focus",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Usage.
 * <ul vt-arrow-navigatable-container ...>
 *  <li vt-arrow-navigatable-item ...>
 *  <li vt-arrow-navigatable-item ...>
 * </ul>
 */
class ArrowNavigatableContainerDirective {
    /**
     * @param {?} zone
     * @param {?} element
     */
    constructor(zone, element) {
        this.zone = zone;
        this.element = element;
        this.onItemHover = new EventEmitter();
        this.onTab = new EventEmitter();
        this.keydownHandler = (event) => this.handleKeydown(event);
        this.zone.runOutsideAngular(() => {
            (document).addEventListener("keydown", this.keydownHandler);
        });
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set navigatableItemsQuery(items) {
        if (items == null) {
            this.navigatableItems = null;
        }
        else {
            this.navigatableItems = items.toArray();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.navigatableItems = null;
        this.zone.runOutsideAngular(() => {
            (document).removeEventListener("keydown", this.keydownHandler);
        });
        this.element = null;
        this.keydownHandler = null;
        this.navigatableItems = null;
        this.activeItem = null;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (document.activeElement === this.element.nativeElement || document.activeElement === this.activeParent || this.isActiveElementDirectChildren()) {
            //check for arrow key and do stuff
            if (event.keyCode === 38 || event.key === "ArrowUp") {
                this.moveUp();
            }
            else if (event.keyCode === 40 || event.key === "ArrowDow") {
                this.moveDown();
            }
            else if (event.keyCode === 13 || event.key === "Enter" ||
                event.keyCode === 32 || event.key === "Space") {
                this.select();
            }
            else if (event.keyCode === 39 || event.key === "ArrowRight") {
                if (this.activeItem != null) {
                    this.activeItem.hover();
                }
            }
            else if (event.keyCode === 37 || event.key === "ArrowLeft") {
                if (this.activeItem != null) {
                    this.activeItem.leave();
                }
            }
            else if (event.keyCode === 9 || event.key === "Tab") {
                this.onTab.emit();
            }
        }
    }
    /**
     * @return {?}
     */
    moveUp() {
        //can only go up if there are any items above
        if (this.hasItems()) {
            /** @type {?} */
            let idx = 0;
            if (this.activeItem != null) {
                this.activeItem.blur();
                idx = findIndex(this.navigatableItems, (item) => item === this.activeItem);
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement);
                if (idx >= 0) {
                    this.navigatableItems[idx].blur();
                }
            }
            if (idx < this.navigatableItems.length && idx > 0) {
                this.activeItem = this.navigatableItems[idx - 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
            else if (idx === 0) {
                this.activeItem = this.navigatableItems[this.navigatableItems.length - 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
        }
    }
    /**
     * @return {?}
     */
    moveDown() {
        if (this.hasItems()) {
            /** @type {?} */
            let idx = -1;
            if (this.activeItem != null) {
                idx = findIndex(this.navigatableItems, (item) => item === this.activeItem);
                this.activeItem.blur();
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement);
            }
            if (idx < this.navigatableItems.length - 1) {
                this.activeItem = this.navigatableItems[idx + 1];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
            else if (idx == this.navigatableItems.length - 1) {
                this.activeItem = this.navigatableItems[0];
                this.activeItem.focus();
                this.onItemHover.emit(this.activeItem);
            }
        }
    }
    /**
     * @return {?}
     */
    select() {
        if (this.activeItem != null) {
            this.activeItem.select();
        }
    }
    /**
     * @return {?}
     */
    hasItems() {
        return this.navigatableItems != null && this.navigatableItems.length > 0;
    }
    /**
     * @return {?}
     */
    isActiveElementDirectChildren() {
        /** @type {?} */
        let retVal = false;
        if (document.activeElement != null && this.navigatableItems != null && this.navigatableItems.length > 0) {
            retVal = findIndex(this.navigatableItems, (item) => item.element.nativeElement === document.activeElement) >= 0;
        }
        return retVal;
    }
}
ArrowNavigatableContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-arrow-navigatable-container]'
            },] }
];
/** @nocollapse */
ArrowNavigatableContainerDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef }
];
ArrowNavigatableContainerDirective.propDecorators = {
    activeParent: [{ type: Input }],
    onItemHover: [{ type: Output }],
    onTab: [{ type: Output }],
    navigatableItemsQuery: [{ type: ContentChildren, args: [ArrowNavigatableItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class KeyboardModule {
}
KeyboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ArrowNavigatableItemDirective,
                    ArrowNavigatableContainerDirective
                ],
                exports: [
                    ArrowNavigatableItemDirective,
                    ArrowNavigatableContainerDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ComboBoxModule {
}
ComboBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BsDropdownModule.forRoot(),
                    KeyboardModule
                ],
                declarations: [ComboBoxComponent, ListBoxDirective, ListItemDirective],
                exports: [
                    ComboBoxComponent,
                    ListBoxDirective,
                    ListItemDirective,
                    BsDropdownModule,
                    KeyboardModule
                ],
                entryComponents: [
                    ComboBoxComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DraggableDirective {
    /**
     * @param {?} renderer
     * @param {?} ngZone
     * @param {?} sessionService
     */
    constructor(renderer, ngZone, sessionService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.sessionService = sessionService;
        this.positionAttrValues = ['absolute', 'fixed', 'relative'];
        this.isView = true;
        /**
         * \@Input
         */
        this.canDrag = true;
        this.canTrackMouseMove = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.mouseDownHandler = (event) => this.onMouseDownHandler(event);
        this.mouseMoveHandler = throttle((event) => this.onMouseMoveHandler(event), 75);
        this.mouseUpHandler = (event) => this.onMouseUpHandler(event);
    }
    /**
     * @return {?}
     */
    addDragListeners() {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(() => {
                dragElement.addEventListener('mousedown', this.mouseDownHandler, true);
                document.addEventListener('mouseup', this.mouseUpHandler, true);
                dragElement = null;
            });
        }
    }
    /**
     * @return {?}
     */
    removeDragListeners() {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            dragElement.removeEventListener('mousedown', this.mouseDownHandler, true);
            document.removeEventListener('mousemove', this.mouseMoveHandler, true); // 念のため置いておく
            document.removeEventListener('mouseup', this.mouseUpHandler, true);
            dragElement = null;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.addDragListeners();
        if (this.isView) {
            this.parentElement = this.parentPanel.nativeElement;
        }
        else {
            this.parentElement = this.parentPanel.nativeElement.parentElement.parentElement.parentElement; //get div('modal-dialog')
        }
        if (this.canDrag && this.parentElement != null) ;
        else {
            this.canDrag = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeDragListeners();
        delete this.renderer;
        delete this.ngZone;
        delete this.draggablePanel;
        delete this.mouseDownHandler;
        delete this.mouseMoveHandler;
        delete this.mouseUpHandler;
        delete this.parentPanel;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDownHandler(event) {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(() => {
                document.addEventListener('mousemove', this.mouseMoveHandler, true);
                dragElement = null;
            });
        }
        this.mousePosition = {
            x: event.pageX,
            y: event.pageY
        };
        if (this.canDrag) {
            if (this.isView) { //for main dialog
                /** @type {?} */
                const bound = this.getBound(this.parentElement);
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.applyTranslate(bound.x, bound.y);
                this.moveWindowToTop();
                this.canTrackMouseMove = true;
            }
            else { //for error/info dialog
                /** @type {?} */
                const bound = this.getBound(this.parentElement);
                /** @type {?} */
                const height = this.parentElement.offsetHeight + 'px';
                /** @type {?} */
                const width = this.parentElement.offsetWidth + 'px';
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.renderer.setStyle(this.parentElement, 'height', height);
                this.renderer.setStyle(this.parentElement, 'width', width);
                this.applyTranslate(bound.x, bound.y);
                this.canTrackMouseMove = true;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMoveHandler(event) {
        if (this.canDrag && this.canTrackMouseMove) {
            /** @type {?} */
            const currentMousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            /** @type {?} */
            const diffX = currentMousePosition.x - this.mousePosition.x;
            /** @type {?} */
            const diffY = currentMousePosition.y - this.mousePosition.y;
            /** @type {?} */
            const parentBound = this.getBound(this.parentElement);
            /** @type {?} */
            const newX = parentBound.x + diffX;
            /** @type {?} */
            const newY = parentBound.y + diffY;
            this.applyTranslate(newX, newY);
            this.mousePosition = currentMousePosition;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseUpHandler(event) {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            document.removeEventListener('mousemove', this.mouseMoveHandler, true);
            dragElement = null;
        }
        if (this.canDrag && this.canTrackMouseMove) {
            this.canTrackMouseMove = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.canDrag) {
            if (this.isView)
                this.moveWindowToTop();
        }
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    applyTranslate(x, y) {
        if (y > 0) {
            this.ngZone.runOutsideAngular(() => {
                /** @type {?} */
                let top = 0;
                /** @type {?} */
                let topMax = 82;
                if (this.isView) {
                    top = Math.max(y, topMax);
                }
                else {
                    top = Math.max(y, 0);
                }
                if (this.sessionService.dialogMaxTopPosition > 0 && top > this.sessionService.dialogMaxTopPosition) {
                    top = this.sessionService.dialogMaxTopPosition;
                }
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                this.renderer.setStyle(this.parentElement, 'top', top + 'px');
                this.renderer.setStyle(this.parentElement, 'left', x + 'px');
            });
        }
    }
    /**
     * @return {?}
     */
    moveWindowToTop() {
        this.sessionService.getMcoContainer().reStackView(this.viewId, this.screenIndex);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setViewId(id) {
        if (id != null) {
            this.viewId = id;
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setTableId(id) {
        if (id != null) {
            this.tableId = id;
        }
    }
    /**
     * @return {?}
     */
    getDragElement() {
        if (this.vtDraggable === true && this.draggablePanel) {
            return this.draggablePanel.nativeElement;
        }
        return null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBound(el) {
        /** @type {?} */
        const bound = /** @type {?} */ (el.getBoundingClientRect());
        return {
            x: bound.x || bound.left,
            y: bound.y || bound.top
        };
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtDraggable]',
                host: {
                    // '(dragstart)': 'onDragStart($event)',
                    // '(dragend)': 'onDragEnd($event)',
                    // '(drag)': 'onDrag($event)',
                    '(click)': 'onClick($event)'
                }
            },] }
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: SessionService }
];
DraggableDirective.propDecorators = {
    vtDraggable: [{ type: Input }],
    modal: [{ type: Input, args: ["modal",] }],
    isView: [{ type: Input }],
    title: [{ type: Input }],
    canDrag: [{ type: Input }],
    draggablePanel: [{ type: ContentChild, args: ['draggablePanel', { read: ElementRef },] }],
    parentPanel: [{ type: ContentChild, args: ['myModal', { read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for managing dynamic views
 */
class DynamicPagesService {
    /**
     *
     * @param {?} viewFactory
     * @param {?} sessionService
     */
    constructor(viewFactory, sessionService) {
        this.viewFactory = viewFactory;
        this.sessionService = sessionService;
        this.dynamicViewsMap = [];
    }
    /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param {?} viewContainer
     * @return {?}
     */
    registerViewContainer(viewContainer) {
        this.viewContainer = viewContainer;
    }
    /**
     * Create a new [[ViewComponent]] instance
     * @param {?} viewType
     * @param {?=} routeId
     * @return {?}
     */
    createDynamicView(viewType, routeId = null) {
        // For suppress warning (Circular dependency), it is not able to call ViewComponent's method directly here.
        if (DynamicPagesService.onCreateViewCloser) {
            DynamicPagesService.onCreateViewCloser(this.sessionService, viewType, routeId);
        }
        if (this.sessionService.getMessagingService() != null) {
            this.sessionService.getMessagingService().setFreezePushService(true);
        }
        /** @type {?} */
        const view = this.viewContainer.createComponent(this.viewFactory.resolveComponentFactory(viewType));
        this.dynamicViewsMap.push(view);
        view.instance.isDynamicPage = true;
        view.changeDetectorRef.detectChanges();
        return new Promise((r, j) => {
            //has route id?
            if (routeId != null && routeId !== "") {
                view.instance["routeId"] = routeId;
            }
            if (view.instance.viewIsInitialized === true) {
                if (this.sessionService.getMessagingService() != null) {
                    this.sessionService.getMessagingService().setFreezePushService(false);
                }
                r(view.instance);
            }
            else {
                /** @type {?} */
                const sub = view.instance.viewInitialized.subscribe(() => {
                    sub.unsubscribe();
                    if (this.sessionService.getMessagingService() != null) {
                        this.sessionService.getMessagingService().setFreezePushService(false);
                    }
                    r(view.instance);
                });
            }
        });
    }
    /**
     * Destroy [[ViewComponent]] instance reference
     * @param {?} viewToRemove
     * @param {?} immediate
     * @return {?}
     */
    removeView(viewToRemove, immediate) {
        /** @type {?} */
        const deadView = find(this.dynamicViewsMap, (view) => {
            return view.instance.uniqueId == viewToRemove.uniqueId;
        });
        this.dynamicViewsMap = filter(this.dynamicViewsMap, (view) => {
            return view.instance.uniqueId != viewToRemove.uniqueId;
        });
        if (viewToRemove.isDestroyed !== true && deadView != null) {
            if (immediate) {
                deadView.destroy();
            }
            else {
                setTimeout(() => {
                    deadView.destroy();
                }, 1);
            }
        }
    }
}
DynamicPagesService.onCreateViewCloser = null;
DynamicPagesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DynamicPagesService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: SessionService }
];
/** @nocollapse */ DynamicPagesService.ngInjectableDef = defineInjectable({ factory: function DynamicPagesService_Factory() { return new DynamicPagesService(inject(ComponentFactoryResolver), inject(SessionService)); }, token: DynamicPagesService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Document object class to access virtual DOM
 */
class UiDocument {
    /**
     * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
     * @param {?} id
     * @return {?}
     */
    static getMenuComponent(id) {
        if (this.menuItemElementMap == null) {
            return null;
        }
        return this.menuItemElementMap.get(id);
    }
    /**
     * Alias for [[findElementById]]
     * @param {?} id
     * @return {?}
     */
    static getElementById(id) {
        return UiDocument.findElementById(id);
    }
    /**
     * Search for and return a component by id
     * @param {?} id ViewComponent id
     * @return {?}
     */
    static findElementById(id) {
        if (id == null)
            return null;
        /** @type {?} */
        let comp = null;
        if (!appInjector())
            return;
        /** @type {?} */
        const mcoContainer = appInjector().get(McoContainerService);
        if (mcoContainer != null) {
            comp = mcoContainer.getViewById(id);
            if (comp == null && mcoContainer.activeView() != null) {
                comp = mcoContainer.activeView().findElementById(id);
            }
            if (comp == null) {
                comp = this.getMenuComponent(id);
            }
            if (comp == null) {
                /** @type {?} */
                const views = mcoContainer.getViews();
                for (let view of views) {
                    if (view.id === id) {
                        comp = view;
                    }
                    else {
                        comp = view.findElementById(id);
                    }
                    if (comp != null) {
                        break;
                    }
                }
            }
            //our component is in a subview?
            if (comp == null && mcoContainer.getActionForwardHandlerMap() != null) {
                /** @type {?} */
                const actionForwardIt = mcoContainer.getActionForwardHandlerMap().values();
                /** @type {?} */
                let forwardItResult = actionForwardIt.next();
                while (forwardItResult.done !== true) {
                    comp = forwardItResult.value.findElementById(id);
                    if (comp != null) {
                        break;
                    }
                    forwardItResult = actionForwardIt.next();
                }
            }
        }
        else {
            comp = this.getMenuComponent(id);
        }
        //MenuItem???? for special case where right click event of inner comp of table column
        //is trigger before row context menu is trigger (row context menu display popup menu)
        //this special component is MenuItemBuilder so it only support setAttribute
        if (comp == null) {
            /** @type {?} */
            const mcoContainer = appInjector().get(McoContainerService);
            if (mcoContainer != null) {
                /** @type {?} */
                const activeView = mcoContainer.activeView();
                if (activeView != null && activeView.hasPopupMenu()) {
                    /** @type {?} */
                    const contextMenuService = appInjector().get(ContextMenuService);
                    if (contextMenuService != null) {
                        /** @type {?} */
                        const popupMenuItems = contextMenuService.getContextMenuItems(activeView.getFirstPopupMenuId());
                        if (popupMenuItems != null) {
                            /** @type {?} */
                            const menuItem = popupMenuItems.find(item => {
                                return item.id === id;
                            });
                            if (menuItem != null) {
                                //fake component, specifically for menu
                                comp = /** @type {?} */ (MenuItemBuilder.fromMenuItem(menuItem));
                                contextMenuService._trackMenuItemBuilderForMemRelease(/** @type {?} */ (comp));
                            }
                        }
                    }
                }
            }
        }
        return comp;
    }
    /**
     * Get JSON representation of component
     * @return {?} Object JSON metadata for this component
     */
    static toJson() {
        /** @type {?} */
        const views = appInjector().get(McoContainerService).getViews();
        /** @type {?} */
        const json = {};
        for (let view of views) {
            json[view.getId()] = view.toJson();
        }
        return json;
    }
    /**
     * Set attribute with value on component by id
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute to set
     * @param {?} value Value of attribute to set
     * @return {?}
     */
    static setElementAttribute(id, attributeName, value) {
        /** @type {?} */
        const element = this.getElementById(id);
        if (element != null) {
            element.setAttribute(attributeName, value);
        }
        else {
            Logger.warn(`Unable to set attribute to element id: ${id}, doesn't exists`);
        }
    }
    /**
     * Get the value of an attribute if it exists, otherwise return null
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute value to get
     * @return {?}
     */
    static getElementAttribute(id, attributeName) {
        /** @type {?} */
        const element = this.getElementById(id);
        if (element != null) {
            return element.getAttribute(attributeName);
        }
        else {
            Logger.warn(`Unable to get attribute to element id: ${id}, doesn't exists`);
        }
        return null;
    }
    /**
     * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
     * @param {?} id Key to use in map for menu item being added
     * @param {?} menuItemElement Component to add to map
     * @return {?}
     */
    static registerMenuItemElement(id, menuItemElement) {
        if (this.menuItemElementMap == null) {
            this.menuItemElementMap = new Map();
        }
        this.menuItemElementMap.set(id, menuItemElement);
        //track menu item for sending to server
        if (menuItemElement.item != null && menuItemElement.item.parentScreenId != null) {
            /** @type {?} */
            const mcoContainer = appInjector().get(McoContainerService);
            if (mcoContainer != null) {
                /** @type {?} */
                const activeView = mcoContainer.getViewById(menuItemElement.item.parentScreenId);
                if (activeView != null) {
                    activeView.trackInactiveMenuItem(menuItemElement);
                }
            }
        }
    }
    /**
     * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
     * @param {?} id Key of menu item to remove from map
     * @return {?}
     */
    static unregisterMenuItemElement(id) {
        if (this.menuItemElementMap != null) {
            this.menuItemElementMap.delete(id);
        }
    }
    /**
     * Sets [[ComboboxComponent]] values
     * @param {?} id Combobox component id
     * @param {?} values Initial values to set on combobox component
     * @return {?}
     */
    static initializeComboBoxValues(id, values) {
        /** @type {?} */
        const comp = /** @type {?} */ (this.findElementById(id));
        if (comp != null) {
            comp.initializeComboboxValues(values);
        }
        else {
            console.warn("Unable to initialie combo: " + id);
        }
    }
    /**
     * Focus the parent tab of this [[elementId]]
     * @param {?} elementId the element id where we want its parent tab to be focused
     * @return {?}
     */
    static focusParentTab(elementId) {
        if (elementId != null) {
            /** @type {?} */
            const comp = this.findElementById(elementId);
            if (comp != null && typeof comp["focusParentTab"] === "function") {
                comp["focusParentTab"]();
            }
            if (comp != null) {
                appInjector().get(NgZone).runOutsideAngular(() => {
                    setTimeout(() => {
                        comp.setFocus();
                    }, 100);
                });
            }
        }
    }
}
UiDocument.menuItemElementMap = null;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const tabbable = tabbableFRollup;
/**
 * Class for dialog component
 */
class DialogComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd [[ChangeDetectorRef]] to inject
     * @param {?} renderer see [[BaseComponent]]
     * @param {?} dynamicPageService [[DynamicPageService]] instance to inject
     * @param {?} zone Angular zone
     */
    constructor(parent, sessionService, elementRef, cd, renderer, dynamicPageService, zone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.dynamicPageService = dynamicPageService;
        this.zone = zone;
        this.draggable = true;
        this._modal = "false";
        this._center = false;
        this.modalSize = 'large';
        this.resizeable = false;
        this.onClosing = new EventEmitter();
        this.modalWidth = '100%';
        this.modalHeight = '100%';
        this.modalBodyHeight = '100%';
        this.isMaximize = false;
        this.isUnMaximize = false;
        // 画面リサイズ対応 Start
        this.resizeDialog = false;
        this.modalBodyMinHeight = null;
        this.modalBodyDivHeight = null;
        this.modalBodyDivWidth = null;
        this.modalBodyPercentHeight = null;
        // 画面リサイズ対応 End
        this.resizeFlg = false;
        this.modalOriginalLeft = 0;
        this.modalOriginalTop = 0;
        /* istanbul ignore next */
        this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
        this.viewRouteUrl = '';
        this.docClickHandler = (event) => {
            this.handleDocClickEvent(event);
        };
        this.modalFocusOutHandler = (event) => {
            this.checkFocusOut(event);
        };
        this.keydownHandler = (event) => {
            this.checkKey(event);
        };
    }
    /**
     * @param {?} modal
     * @return {?}
     */
    set modal(modal) {
        this._modal = modal;
        this.updateModalDialogStyle();
    }
    /**
     * @return {?}
     */
    get modal() {
        return this._modal;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set centered(boo) {
        if (typeof boo === 'string') {
            this._center = boo === 'true' ? true : false;
        }
        else {
            this._center = boo;
        }
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set windowTitle(title) {
        this.title = title;
    }
    /**
     * Set [[viewRouteUrl]] property
     * @param {?} viewRouteUrl
     * @return {?}
     */
    setViewRouteUrl(viewRouteUrl) {
        this.viewRouteUrl = viewRouteUrl;
    }
    /**
     * Set draggable directive id and [[id]]
     * @return {?}
     */
    resetId() {
        this.updateDraggableDirectiveId();
        super.resetId();
        this.cd.detectChanges();
    }
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     * @return {?}
     */
    dialogResize() {
        /* istanbul ignore else */
        if (this.resizeFlg === false) {
            //this.resizeExecute();
            this.resizeFlg = true;
            this.setDisabledDialogWidth();
        }
    }
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * リサイズを行う
     * @return {?}
     */
    resizeExecute() {
        /** @type {?} */
        const bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild.lastElementChild)).getBoundingClientRect());
        /** @type {?} */
        const newX = bound.right - bound.left + 20;
        this.zone.runOutsideAngular(() => {
            this.renderer.setStyle(this.modalElement.nativeElement.firstChild.lastElementChild, 'width', newX + 'px');
        });
        this.cd.detectChanges();
    }
    /**
     * Init lifecycle. Sets [[viewId]]
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.viewId = this.id;
    }
    /**
     * Destroy lifecycle. Cleans up references
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.modalDialog = null;
        this.modalContent = null;
        if (this.viewContainer != null) {
            this.viewContainer.clear();
            this.viewContainer = null;
        }
        if (this.draggablePanel != null) {
            this.draggablePanel.clear();
            this.draggablePanel = null;
        }
        if (this.docClickHandler != null) {
            document.removeEventListener("mousedown", this.docClickHandler);
        }
        if (this.modalFocusOutHandler != null) {
            (/** @type {?} */ (this.modalElement.nativeElement)).removeEventListener("focusout", this.modalFocusOutHandler, true);
        }
        if (this.keydownHandler) {
            (/** @type {?} */ (this.modalElement.nativeElement)).removeEventListener("keydown", this.keydownHandler, true);
        }
        this.docClickHandler = null;
        this.modalFocusOutHandler = null;
        this.keydownHandler = null;
        this.draggableDirective = null;
        this.modalElement = null;
        this._tabbables = null;
    }
    /**
     * After view init lifecycle. Sets initial dialog height/width and positioning
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        //add 80px for grid padding
        this.modalWidth = parseInt(this.controlWidth) + 80;
        this.modalHeight = parseInt(this.controlHeight) + 80;
        // 画面リサイズ対応 Start
        if (this.resizeDialog) {
            this.modalBodyPercentHeight = "calc(100% - 25px)"; //modal-header分を削って設定
            this.modalBodyDivHeight = "100%";
            this.modalBodyDivWidth = "100%";
            this.modalBodyMinHeight = "auto";
        }
        else {
            this.modalBodyHeight = parseInt(this.controlHeight) - 25; //modal-header分を削って設定
        }
        // 画面リサイズ対応 End
        this.cd.detectChanges();
        if (this.modal !== "true" && this.modal !== true) {
            this.setModalLessPosition();
            this.bsModalClass.push("modaless");
            this.cd.detectChanges();
        }
        else {
            //disable buttons
            $(".header").addClass("header-disabled");
            $(".footer").addClass("footer-disabled");
        }
        this.setInitialPosition(this.initialPosition);
        this.updateDraggableDirectiveId();
        this.setDisabledDialogWidth();
        // if(this.resizeDialog){ 一時的にコメントアウト
        $(this.modalElement.nativeElement).resizable({
            handles: 'n, e, s, w, ne, se, sw, nw',
            minWidth: 150,
            minHeight: 20,
            resize: (event, ui) => {
                //top場所制限設定
                if (ui.position.top <= 82) {
                    ui.position.top = 82;
                    return;
                }
                ui.element.css("min-height", "");
                ui.element.css("min-width", "");
                $(this.modalDialog.nativeElement).css("height", ui.size.height);
                $(this.modalDialog.nativeElement).css("width", ui.size.width);
                $(this.modalContent.nativeElement).css("height", ui.size.height);
                $(this.modalContent.nativeElement).css("width", ui.size.width);
                $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
                if (this.tableId != null) {
                    /** @type {?} */
                    const table = /** @type {?} */ (UiDocument.getElementById(this.tableId));
                    if (table != null) {
                        table.tableResize();
                    }
                }
            }
        });
        $(this.modalElement.nativeElement).on("resizestop", () => {
            this.setDisabledDialogWidth();
        });
        // }
        this._tabbables = tabbable(this.body.nativeElement);
        this.zone.runOutsideAngular(() => {
            document.addEventListener("mousedown", this.docClickHandler);
            (/** @type {?} */ (this.modalElement.nativeElement)).addEventListener("focusout", this.modalFocusOutHandler, true);
            (/** @type {?} */ (this.modalElement.nativeElement)).addEventListener("keydown", this.keydownHandler, true);
        });
    }
    /**
     * Set the width of disabled-dialog with the width of the modal-content
     * @return {?}
     */
    setDisabledDialogWidth() {
        /** @type {?} */
        const element = this.modalElement.nativeElement;
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'width', element.querySelector('.modal-content').offsetWidth + 'px');
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'height', element.querySelector('.modal-content').offsetHeight + 'px');
    }
    /**
     * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
     * @return {?}
     */
    updateDraggableDirectiveId() {
        if (this.draggableDirective != null) {
            this.draggableDirective.setViewId(this.id);
            this.draggableDirective.setTableId(this.tableId);
            this.draggableDirective.screenIndex = this.screenIndex;
        }
    }
    /**
     * Set position of window component
     * @return {?}
     */
    setModalLessPosition() {
        /** @type {?} */
        const bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild)).getBoundingClientRect());
        /** @type {?} */
        const left = (bound.x || bound.left) + "px";
        /** @type {?} */
        const top = (Math.max(bound.y || bound.top, 120)) + "px";
        this.renderer.setStyle(this.modalElement.nativeElement, "left", left);
        this.renderer.setStyle(this.modalElement.nativeElement, "top", top);
    }
    /**
     * Get the native HTML element of this dialog
     * @return {?} DOM element
     */
    getElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * Event handler for click on close button. Closes the window
     * @param {?=} event
     * @param {?=} immediate
     * @return {?}
     */
    close(event = null, immediate = false) {
        // this.bsModalClass = ["vt-dialog", "modal", "fade", "out"];
        //this.cd.detectChanges();
        if (event != null) {
            event.stopPropagation();
        }
        if (this.modal === "true" || this.modal === true) {
            $(".header").removeClass("header-disabled");
            $(".footer").removeClass("footer-disabled");
        }
        if (this.getParent() != null && this.getParent().isView() && this.getParent().isDynamicView()) {
            this.dynamicPageService.removeView(/** @type {?} */ (this.getParent()), immediate);
        }
        else {
            if (this.getSession() != null && this.getSession().getRouteNavigatorService() != null) {
                this.getSession().getRouteNavigatorService().destroyRoute(this.viewRouteUrl);
            }
            else {
                console.error("Unable to change route, session or route navigation service is not defined");
            }
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        $(this.modalElement.nativeElement).resizable("option", "disabled", boo); //Don't remove this. This makes disabled-dialog not to be resizable.
        $(this.modalElement.nativeElement.querySelector('.modal-content')).disabled = boo; //I am not sure why this is needed.
    }
    /**
     * Sets the dialogs 'z-index' CSS property
     * @param {?} newZIndex
     * @return {?}
     */
    updateZIndex(newZIndex) {
        if (this.modalElement != null && this.renderer != null) {
            this.renderer.setStyle(this.modalElement.nativeElement, "z-index", newZIndex);
        }
        this.setInactiveDialogStyle();
    }
    /**
     * Set inactive window style if this dialog is not the current active dialog
     * @return {?}
     */
    setInactiveDialogStyle() {
        /** @type {?} */
        const inactiveDialogClass = 'inactive-dialog';
        // Apply inactive dialog class when other window is focused
        if (this.getSession().getMcoContainer().activeView() == null ||
            this.getSession().getMcoContainer().activeView().id != this.viewId) {
            this.bsModalClass.push(inactiveDialogClass);
        }
        else {
            this.bsModalClass = filter(this.bsModalClass, (c) => {
                return c !== inactiveDialogClass;
            });
        }
        //we used OnPush and change detector only know that it needs to do something if
        //our style array is immutable, so we need to tell it that changes happen.
        this.cd.markForCheck();
    }
    /**
     * Set position of this dialog when it is first opened
     * @param {?} position Window position
     * @return {?}
     */
    setInitialPosition(position) {
        if (position != null) {
            if (position.left >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", position.left + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "auto");
            }
            if (position.right >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "right", position.right + "px");
            }
            if (position.top >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "top", position.top + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "top", "auto");
            }
            if (position.bottom >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "bottom", position.bottom + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "bottom", "auto");
            }
        }
        /** @type {?} */
        const appHeader = $(".header")[0];
        /* istanbul ignore if */
        //appHeader can be null (in unit test, etc)
        if (appHeader) {
            /** @type {?} */
            let headerH = appHeader.clientHeight + appHeader.offsetTop;
            // init position
            this.renderer.setStyle(this.modalElement.nativeElement, "top", headerH + "px");
            if ((position != null)) {
                if (!(position.left > 0)) {
                    this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
                }
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
            }
            // If 'centered' input is true, override initialPosition and modalLessPosition
            if (this._center) {
                /** @type {?} */
                let modelH = $(this.modalElement.nativeElement).height();
                /** @type {?} */
                let footerH = $(".footer")[0].clientHeight;
                this.renderer.setStyle(this.modalElement.nativeElement, "top", `calc(((100vh - ${headerH}px - ${footerH}px - ${modelH}px) / 2) + ${headerH}px)`);
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "calc((100vw / 2) - " + ($(this.modalElement.nativeElement).width() / 2) + "px");
            }
        }
    }
    /**
     * Event handler for close event
     * \@event OnClosing
     * @return {?}
     */
    handleOnClosing() {
        this.onClosing.emit();
    }
    /**
     * Get the Nexaweb tag name of this component
     * @return {?}
     */
    getNxTagName() {
        return "dialog";
    }
    /**
     * Get JSON representation of dialog state
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "title", this.title);
        this.setJson(json, "modal", this.modal);
        this.setJson(json, "centered", this._center);
        return json;
    }
    /**
     * Check whether or not this dialog is a container
     * @return {?} Boolean
     */
    isContainer() {
        return true;
    }
    /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @return {?} Boolean
     */
    isDialog() {
        return true;
    }
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} ChangeDetectorRef
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Event handler for minimize button click. Minimizes dialog
     * @param {?} event
     * @return {?}
     */
    minimize(event) {
        if (event != null) {
            event.stopPropagation();
        }
        if ((JavaUtils.parseBoolean(this.modal))) {
            if (!this.isUnMaximize) {
                /** @type {?} */
                let minHeightLoc = DialogComponent.UNMAXIMIZE_HEGHT;
                this.isUnMaximize = true;
                if (this.isMaximize) {
                    $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
                    $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
                    this.isMaximize = false;
                }
                $(this.body.nativeElement).css("min-height", "");
                $(this.body.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement).css("min-height", "");
                $(this.modalElement.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
            }
            else {
                this.isUnMaximize = false;
                /** @type {?} */
                let minHeightLoc = $(this.modalElement.nativeElement.querySelector('.modal-dialog')).css("height");
                $(this.body.nativeElement).css("min-height", "calc(100% - 25px");
                $(this.body.nativeElement).css("height", "auto");
                $(this.modalElement.nativeElement).css("min-height", minHeightLoc);
                $(this.modalElement.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
            }
        }
        else {
            this.isUnMaximize = false;
            this.bsModalClass = ["vt-dialog", "modal", "fade", "out", "minimize"];
            this.getSession().getMcoContainer().minimizeView(this.viewId);
        }
        this.cd.detectChanges();
    }
    /**
     * Event handler for maximize button click. Maximizes dialog
     * @param {?} event
     * @return {?}
     */
    maximize(event) {
        if (event != null) {
            event.stopPropagation();
        }
        if (this.isMaximize) {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
            $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
            $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
            this.isMaximize = false;
            if (JavaUtils.parseBoolean(this.modal) && $(this.modalElement.nativeElement.querySelector('.modal-content'))[0].style.height === DialogComponent.UNMAXIMIZE_HEGHT) {
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
                this.isUnMaximize = true;
            }
            else {
                this.isUnMaximize = false;
            }
            this.cd.detectChanges();
        }
        else {
            $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
            $(this.modalElement.nativeElement).css("height", "auto");
            this.modalOriginalLeft = (/** @type {?} */ (this.modalElement.nativeElement)).getBoundingClientRect().left;
            this.modalOriginalTop = (/** @type {?} */ (this.modalElement.nativeElement)).getBoundingClientRect().top;
            $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
            $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
            this.isMaximize = true;
            this.isUnMaximize = false;
            this.cd.detectChanges();
        }
        // istanbul ignore if */
        if (this.tableId != null) {
            /** @type {?} */
            const table = /** @type {?} */ (UiDocument.getElementById(this.tableId));
            if (table != null) {
                table.tableResize();
            }
        }
        this.getSession().getMcoContainer().showView(this.viewId);
    }
    /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    showView() {
        if (this.disabled)
            return;
        if (this.isMaximize) {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
        }
        else {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
        }
        this.cd.detectChanges();
        this.getSession().getMcoContainer().showView(this.viewId, this.screenIndex);
    }
    /**
     * Event handler for mousedown event. Resets dialog view stack
     * @return {?}
     */
    handleMouseDown() {
        //make this screen top most.
        this.getSession().getMcoContainer().reStackView(this.viewId, this.screenIndex);
    }
    /**
     * Stop propagation on disabled dialog
     * @param {?} event
     * @return {?}
     */
    onClickDisableContent(event) {
        if (this.disabled)
            event.stopPropagation();
    }
    /**
     * Stop propagation on modal dialog
     * @param {?} event
     * @return {?}
     */
    onClickBackdrop(event) {
        if (this.modal == true || this.modal == 'true')
            event.stopPropagation();
    }
    /**
     * @return {?}
     */
    updateModalDialogStyle() {
        if (this.renderer != null && this.elementRef != null) {
            if (this.modal === true || this.modal === "true") {
                this.renderer.addClass(this.elementRef.nativeElement, "modal");
                this.renderer.setStyle(this.elementRef.nativeElement, "display", "inline-block");
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, "modal");
                this.renderer.removeStyle(this.elementRef.nativeElement, "display");
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkFocusOut(event) {
        if ((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.relatedTarget))) {
            this.getSession()._windowLostFocus = false;
        }
        if (this.getSession()._windowLostFocus !== true &&
            this._tabbables &&
            this._tabbables.length > 0 &&
            this.wasClickOutside !== true &&
            !((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.relatedTarget)))
            && this.disabled !== true) {
            if (event.relatedTarget == null ||
                (!(/** @type {?} */ (event.relatedTarget)).classList.contains("dropdown-item") &&
                    !(/** @type {?} */ (event.relatedTarget)).classList.contains("menuItem"))) {
                event.stopPropagation();
                this._tabbables[0].focus();
            }
        }
        this.getSession()._windowLostFocus = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDocClickEvent(event) {
        this.wasClickOutside = false;
        if (!((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.target)))) {
            this.wasClickOutside = true;
        }
        /** @type {?} */
        let _leftDisabledErroElementId = [];
        //if disabled element
        if (this._canTrackFocusLostOnErrorDisabled === true) {
            if (this._disabledErrorElementId != null &&
                this._disabledErrorElementId.length > 0) {
                for (let elId of this._disabledErrorElementId) {
                    /** @type {?} */
                    const disabledEl = UiDocument.getElementById(elId);
                    /** @type {?} */
                    const inputElement = disabledEl.getElement().querySelector('input');
                    if (disabledEl != null) {
                        if (event.target != inputElement)
                            disabledEl.setBgColor("");
                        else
                            _leftDisabledErroElementId.push(elId);
                    }
                }
            }
            if (_leftDisabledErroElementId.length == 0) {
                this._disabledErrorElementId = null;
                this._canTrackFocusLostOnErrorDisabled = false;
            }
            else {
                this._disabledErrorElementId = _leftDisabledErroElementId;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkKey(event) {
        if (this.disabled === true) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    trackFocusLostOnErrorDisabled() {
        this._canTrackFocusLostOnErrorDisabled = true;
    }
}
DialogComponent.UNMAXIMIZE_HEGHT = "20px";
DialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-dialog',
                template: "<div #myModal [vtDraggable]=\"draggable\" [modal]=\"modal\" [id]=\"id\" [ngClass]=\"bsModalClass\" tabindex=\"-1\" role=\"dialog\" title=\"\"\n[style.minWidth.px]=\"controlWidth\"\n[style.minHeight.px]=\"controlHeight\"\n>\n<div\n  #modalDialog\n  [style.height.px]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  class=\"modal-dialog\"\n  [ngClass]=\"cssClass\"\n  role=\"document\">\n  <div class=\"disabled-dialog\" [ngStyle]=\"{'display': disabled ? 'block' : 'none'}\" (click)=\"onClickDisableContent($event)\"></div>\n  <div #modalContent class=\"modal-content\" [style.height.px]=\"controlHeight\">\n    <div class=\"modal-header\" #draggablePanel>\n      <button type=\"button\" *ngIf=\"!isMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"maximize\"\n        (click)=\"maximize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-maximize\"></div></span>\n      </button>\n      <button type=\"button\" *ngIf=\"isMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"maximize\"\n        (click)=\"maximize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-unmaximize\"></div></span>\n      </button>\n      <button type=\"button\"  *ngIf=\"isUnMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"unmaximize\"\n        (click)=\"minimize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-unmaximize\"></div></span>\n      </button>\n      <button type=\"button\" *ngIf=\"!isUnMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"minimize\"\n        (click)=\"minimize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-minimize\"></div></span>\n      </button>\n      <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (mousedown)=\"handleOnClosing()\" (click)=\"close($event)\"><span aria-hidden=\"true\">&times;</span></button> -->\n      <h4 class=\"modal-title\" onselectstart=\"return false\" (dblclick)=\"maximize($event)\">{{ title }}</h4>\n    </div>\n    <div #modalBody class=\"modal-body\" [style.height.px]=\"modalBodyHeight\" [style.height]=\"modalBodyPercentHeight\" [style.minHeight]=\"modalBodyMinHeight\">\n      <div [style.width.percent]=\"100\" [style.width]=\"modalBodyDivWidth\" [style.height]=\"modalBodyDivHeight\" #viewContainer (mousedown)=\"handleMouseDown()\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n<div *ngIf= \" modal == true || modal == 'true'\" class=\"backdrop\" (click)=\"onClickBackdrop($event)\">\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".dialog-centered{position:fixed;top:50%;left:50%}@media (min-width:768px){.modal-xl{width:90%;max-width:1200px}}.modal.modaless{position:fixed;right:auto;bottom:auto}.modal.modaless .modal-dialog{margin:0}vt-dialog .modal-header{padding:5px 15px}.vt-dialog.modal{display:inline-block;right:auto;bottom:auto;overflow:visible}.minimize{display:none!important}.maximize{left:0!important;width:100%!important;bottom:34px!important;top:100px!important}.maximize .modal-dialog{width:100%!important;max-width:100%!important;height:100%!important}.maximize .modal-content{width:100%!important;height:100%!important}.maximize .modal-content.ui-resizable{left:0!important}@media (min-width:768px){.modal-dialog{margin:0;display:inline-block}}.modal-content{overflow:hidden}.modal-header .close{padding:3px;margin-left:3px;border:1px ridge;border-radius:4px}.icon-minimize{width:14px;height:10px;background-image:url(minimize.png);background-repeat:no-repeat;background-size:14px}.icon-maximize{width:14px;height:10px;background-image:url(maximize.png);background-repeat:no-repeat;background-size:14px}.icon-unmaximize{width:14px;height:10px;background-image:url(restore.png);background-repeat:no-repeat;background-size:14px}.disabled-dialog{position:absolute;z-index:10;background-color:rgba(0,0,0,.1)}.backdrop{width:100vw;height:100vh;opacity:0;background-color:#000}"]
            }] }
];
/** @nocollapse */
DialogComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: DynamicPagesService },
    { type: NgZone }
];
DialogComponent.propDecorators = {
    body: [{ type: ViewChild, args: ['modalBody',] }],
    modalDialog: [{ type: ViewChild, args: ["modalDialog",] }],
    modalContent: [{ type: ViewChild, args: ["modalContent",] }],
    title: [{ type: Input }],
    draggable: [{ type: Input }],
    initialPosition: [{ type: Input }],
    modal: [{ type: Input }],
    centered: [{ type: Input }],
    windowTitle: [{ type: Input }],
    modalSize: [{ type: Input }],
    resizeable: [{ type: Input }],
    onClosing: [{ type: Output }],
    modalElement: [{ type: ViewChild, args: ['myModal', { read: ElementRef },] }],
    viewContainer: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef },] }],
    draggablePanel: [{ type: ViewChild, args: ['draggablePanel', { read: ViewContainerRef },] }],
    draggableDirective: [{ type: ViewChild, args: [DraggableDirective,] }],
    resizeDialog: [{ type: Input }],
    tableId: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DialogModule {
}
DialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ModalModule.forRoot()
                ],
                declarations: [
                    DialogComponent,
                    DraggableDirective
                ],
                exports: [
                    DialogComponent,
                    DraggableDirective,
                    ModalModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GridColumnDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let cssClass = this.vtGridColumn ? `col-sm-${this.vtGridColumn}` : 'col-sm';
        this.el.nativeElement.classList.add(cssClass);
    }
}
GridColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtGridColumn]'
            },] }
];
/** @nocollapse */
GridColumnDirective.ctorParameters = () => [
    { type: ElementRef }
];
GridColumnDirective.propDecorators = {
    vtGridColumn: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for Horizontal line (HR) component
 */
class HorizontalSeparatorComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} renderer see [[BaseComponent]]
     */
    constructor(parent, sessionService, elementRef, renderer) {
        super(parent, sessionService, elementRef, renderer);
    }
    /**
     * Init lifecycle method
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * Get JSON representation for this component
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "borderColor", this.borderColor);
        return json;
    }
}
HorizontalSeparatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-horizontal-separator',
                template: "<hr [id]=\"id\" [style.backgroundColor]=\"borderColor\" [style.height]=\"controlHeight\" [style.maxWidth]=\"controlWidth\" />\n",
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => HorizontalSeparatorComponent)
                    }
                ],
                styles: ["hr{margin-top:3px;margin-bottom:3px;border-color:#5c5c5c;box-shadow:0 1px 0 #fff}"]
            }] }
];
/** @nocollapse */
HorizontalSeparatorComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
HorizontalSeparatorComponent.propDecorators = {
    borderColor: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HorizontalSeparatorModule {
}
HorizontalSeparatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [HorizontalSeparatorComponent],
                exports: [HorizontalSeparatorComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Integer {
    /**
     * @param {?} num
     * @return {?}
     */
    static toString(num) {
        return num + '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$1 = moment;
/**
 * Java DateFormat
 */
class DateFormat {
    /**
     * @param {?=} formatPattern
     */
    constructor(formatPattern = null) {
        this.formatPattern = formatPattern;
        this.isLenient = true;
    }
    /**
     * @param {?} pattern
     * @return {?}
     */
    static getDateInstance(pattern) {
        return new DateFormat(pattern);
    }
    /**
     * @param {?} fm
     * @return {?}
     */
    static javaToMomentDateFormat(fm) {
        /** @type {?} */
        const s = fm.replace(/y/g, 'Y');
        return s.replace(/d/g, 'D');
        //the above is needed b/c ng-packagr is being a b***
        //it doesn't like return fm.replace(/y/g, 'Y').replace(/d/g, 'D');
    }
    /**
     * @return {?}
     */
    static now() {
        return moment$1();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        if (date === null)
            return null;
        if (date === undefined)
            return undefined;
        return this.formatPattern == null ? moment$1(date).format() : moment$1(date).format(this.formatPattern);
    }
    /**
     * @param {?} dateString
     * @return {?}
     */
    parse(dateString) {
        /** @type {?} */
        let momentDate = this.formatPattern ? moment$1(dateString, this.formatPattern) : moment$1(dateString);
        if (this.isLenient === false && momentDate.isValid() === false) {
            throw new Error(`Unable to parse date string: ${dateString}, using format: ${this.formatPattern}`);
        }
        this.calendar = momentDate;
        return momentDate;
    }
    /**
     * @param {?} lenient
     * @return {?}
     */
    setLenient(lenient) {
        this.isLenient = lenient;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setCalendar(date) {
        this.calendar = moment$1(date);
    }
    /**
     * @return {?}
     */
    getCalendar() {
        return this.calendar;
    }
}
DateFormat.SHORT = 'M/D/YY';
DateFormat.MEDIUM = 'MMM D, YYYY';
DateFormat.LONG = 'MMMM D, YYYY';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for label component. Renders text
 */
class LabelComponent extends BaseComponent {
    /**
     *
     * @param {?} parent See [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} cd Change detector ref
     * @param {?} renderer see [[BaseComponent]]
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this._tooltip = '';
        this.onCommand = new EventEmitter();
    }
    /**
     * @param {?} tooltip
     * @return {?}
     */
    set tooltip(tooltip) {
        if (tooltip == null || tooltip === "undefined") {
            this._tooltip = "";
        }
        else {
            this._tooltip = tooltip;
        }
    }
    /**
     * Accessor method for internal [[_tootip]] property
     * @return {?}
     */
    get tooltip() {
        return this._tooltip;
    }
    /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.marginRight) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        this.setAttributeFromDef();
        //fix expression has changed blah blah blah
        this.cd.detectChanges();
    }
    /**
     * Get JSON representation of component
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "alignHorizontal", this.alignHorizontal);
        return json;
    }
    /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    setTooltip(tooltip) {
        this.tooltip = tooltip;
        this.cd.markForCheck();
    }
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    onMouseDown(e) {
        this.handleMouseDown(e);
    }
    /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    handleOnClick() {
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    }
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    getNxTagName() {
        return "label";
    }
    /**
     * Check if the text is all space characters
     * @return {?} If text is just space characters TRUE, otherwise FALSE
     */
    get spaceText() {
        return this.text && this.text.length > 0 && this.text.trim().length === 0;
    }
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    setVisible(value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
}
LabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-label,vt-cell',
                template: "<span\n  [id]=\"id\"\n  [title]=\"tooltip\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  class=\"vt-label {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\"\n  [style.textAlign]=\"alignHorizontal\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.border-style]=\"borderStyle\"\n  [style.margin-left]=\"marginLeft\"\n  [style.margin-right]=\"marginRight\"\n  [style.color]=\"fontColor\"\n  [ngStyle]=\"styles\"\n  (click)=\"handleOnClick()\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  (mousedown)=\"onMouseDown($event)\">\n  <ng-template [ngIf]=\"spaceText === false\">{{ text }}</ng-template>\n  <ng-template [ngIf]=\"spaceText === true\">&nbsp;</ng-template>\n  <!-- has children?-->\n  <ng-content></ng-content>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: LabelComponent
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
LabelComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
LabelComponent.propDecorators = {
    alignHorizontal: [{ type: Input }],
    tooltip: [{ type: Input }],
    onCommand: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LabelModule {
}
LabelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [LabelComponent],
                exports: [LabelComponent],
                entryComponents: [
                    LabelComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PanelComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} cd
     * @param {?} renderer
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        /**
         * For escaping unneeded row & fluid container. This is a trikcy option.
         * Almost case, fluid container is not needed. it's too late...
         * \@property {boolean}
         */
        this.noGutter = false;
        /**
         * For escaping fluid container. This is a trikcy option.
         * should be validated by `(layout !== 'grid')` . it's too late...
         * \@property {boolean}
         */
        this.noGrid = false;
        this.panelClasses = ['vt-panel'];
        this.panelStyles = {};
        // 画面リサイズ対応 Start
        this.resizeComponent = false;
        this.resizeMarginTop = null;
        this.resizeHeight = null;
        this.divHeight = null;
        // 画面リサイズ対応 End
        // 画面のレイアウト固定化対応 Start
        this.contentDisplayWidth = null;
    }
    /**
     * @param {?} children
     * @return {?}
     */
    set childrenList(children) {
        this.resetChildIndexes(children.filter(child => child !== this));
    }
    /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.cssClass != null) {
            this.cssClass.split(' ').forEach(css => this.panelClasses.push(css));
        }
        if (this.containerLayout === true && !this.noGrid && !this.noGutter) {
            this.panelClasses.push('container-fluid');
        }
        /*if (!this.borderColor) {
              this.borderColor = 'transparent';
            }*/
        if (this.borderWidth) {
            this.borderWidth = this.borderWidth + 'px';
            this.borderStyle = 'solid';
            if (this.borderColor == null) {
                this.borderColor = '#ffffff';
            }
        }
        if (this.controlHeight == null) {
            this.controlHeight = '100%';
        }
        this.setVisible(this.visible);
        // 画面リサイズ対応 Start
        if (this.resizeComponent) {
            this.resizeHeight = "calc(100% - " + this.resizeMarginTop + "px)";
            this.divHeight = "100%";
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    }
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle();
        this.cd.detectChanges();
    }
    /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    resetChildIndexes(childrenList) {
        if (childrenList != null && childrenList.length > 0) {
            if (this._childrenIndex !== null) {
                this._childrenIndex = uniq(concat(childrenList.map(child => child.getId()), this._childrenIndex));
            }
        }
    }
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    initWidthHeightStyle(heightStyleName = 'height', widthStyleName = 'max-width') {
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.panelStyles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.panelStyles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        this.getChildren().toArray().forEach(item => {
            item.setAttribute(AttributesEnum.DISABLED, boo);
        });
    }
    /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    setVisible(boo) {
        this.visible = boo;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
    /**
     * Check if [[caption]] property exists and is set
     * @return {?} True if caption exists and has content, otherwise false
     */
    get hasCaption() {
        return this.caption != null && this.caption.length > 0;
    }
    /**
     * Check if [[layout]] property exists
     * @return {?} True if layout exists, otherwise false
     */
    get containerLayout() {
        return this.layout != null;
    }
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    isContainer() {
        return true;
    }
    /**
     * @return {?}
     */
    getNxTagName() {
        return "panel";
    }
}
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-panel',
                template: "<div [id]=\"id\"\n  [style.color]=\"fontColor\"\n  [style.borderColor]=\"borderColor\"\n  [style.borderWidth]=\"borderWidth\"\n  [style.borderStyle]=\"borderStyle\"\n  [style.height]=\"resizeHeight\"\n  [style.overflow]=\"controlOverflow\"\n  [style.width.px]=\"panelWidth\"\n  [style.min-width.px]=\"panelMinWidth\"\n  [style.min-height]=\"panelMinHeight\"\n  [style.float]=\"controlFloat\"\n  [style.margin-left]=\"marginLeft\"\n  [ngClass]=\"panelClasses\">\n  <h1 *ngIf=\"hasCaption === true\" class=\"panel-caption\">{{caption}}</h1>\n  <div class=\"{{noGrid ?'':'row'}} {{noGutter ?'row-no-gutters':''}}\" [style.height]=\"divHeight\" [style.width.px]=\"contentDisplayWidth\" [style.padding]=\"controlPadding\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => PanelComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
PanelComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
PanelComponent.propDecorators = {
    layout: [{ type: Input }],
    caption: [{ type: Input }],
    evenlySpace: [{ type: Input }],
    noGutter: [{ type: Input }],
    noGrid: [{ type: Input }],
    childrenList: [{ type: ContentChildren, args: [BaseComponent,] }],
    resizeComponent: [{ type: Input }],
    resizeMarginTop: [{ type: Input }],
    contentDisplayWidth: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LayoutModule {
}
LayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GridColumnDirective,
                    PanelComponent
                ],
                exports: [
                    GridColumnDirective,
                    PanelComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for a link component
 */
class LinkComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector reference for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.onCommand = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this.opacity = value ? '0.3' : '1.0';
        this._disabled = value;
    }
    /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    onClick() {
        if (!this.disabled)
            this.onCommand.emit();
    }
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    onKeyUp(e) {
        // if ENTER key
        if (e.keyCode === 13) {
            this.onClick();
        }
    }
    /**
     * Get the JSON representation for panel
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        if (json["customAttributes"] == null) {
            json["customAttributes"] = {};
        }
        this.setJson(json["customAttributes"], "idName", this.idName);
        return json;
    }
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    getChangeDetector() {
        return this.cd;
    }
}
LinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-link',
                template: "<span [id]=\"id\" class=\"vt-link {{ cssClass }}\" (click)=\"onClick()\"\n  (keyup)=\"onKeyUp($event)\"\n  [style.color]=\"fontColor\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  tabindex=\"0\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.opacity]=\"opacity\">\n  {{ text }}\n  <div *ngIf=\"innerhtml && innerhtml.length > 0\" [innerHTML]=\"innerhtml\"></div>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => LinkComponent)
                    }
                ],
                styles: [".vt-link{text-decoration:underline;cursor:pointer}"]
            }] }
];
/** @nocollapse */
LinkComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
LinkComponent.propDecorators = {
    idName: [{ type: Input }],
    onCommand: [{ type: Output }],
    disabled: [{ type: Input, args: ['disabled',] }],
    innerhtml: [{ type: Input, args: ['innerhtml',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LinkModule {
}
LinkModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [LinkComponent],
                exports: [LinkComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Long {
    /**
     * @param {?} num
     * @return {?}
     */
    static toString(num) {
        return num + '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$2 = momentImported;
/**
 * Simple util to parse moment into proper zone (if needed)
 */
class MomentUtils {
    /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    static moment(dateString, format) {
        if (format != null && format != '') {
            if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
                return moment$2.tz(dateString, format, MomentUtils.timeZone);
            }
            return moment$2(dateString, format);
        }
        else {
            if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
                return moment$2.tz(dateString, MomentUtils.timeZone);
            }
            return moment$2(dateString);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * DynamicComponent class. Renders components at runtime by definition
 */
class DynamicComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
    }
    /**
     * After init lifecycle.
     * @return {?}
     */
    ngAfterViewInit() {
        this.cleanClass();
        this.cd.detectChanges();
    }
    /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    isVisible() {
        return this.elementDef.visible !== false;
    }
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    getId() {
        return this.elementDef.id == null ? BaseComponent.generateUniqueId() : this.elementDef.id;
    }
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    handleOnCommand() {
        if (typeof this.elementDef.onCommand === "function") {
            this.elementDef.onCommand(this.myComponent);
        }
    }
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    handleOnContextMenu() {
        if (typeof this.elementDef.onContextMenu === "function") {
            this.elementDef.onContextMenu(this.myComponent);
        }
    }
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    cleanClass() {
        if (this.elementDef.cssClass != null && this.elementDef.cssClass !== "") {
            if (typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                const attrs = AppUtils.attributeOverrideClass(this.elementDef.cssClass);
                if (attrs != null) {
                    forEach(attrs, (val) => {
                        if (val != null && val.attributeName === AttributesEnum.ENABLED) {
                            this.elementDef.enabled = val.value;
                        }
                    });
                }
            }
            this.elementDef.cssClass = BaseComponent.cleanCss(this.elementDef.cssClass);
        }
    }
}
DynamicComponent.decorators = [
    { type: Component, args: [{
                selector: "vt-dynamic-component",
                template: "<!-- panel -->\n<vt-panel #myComponent\n    *ngIf=\"elementDef.type === 'panel'\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n    <ng-template [ngIf]=\"elementDef.children != null && elementDef.children.length > 0\">\n        <vt-dynamic-component *ngFor=\"let compDef of elementDef.children\" [elementDef]=\"compDef\"></vt-dynamic-component>\n    </ng-template>\n</vt-panel>\n<!-- label -->\n<vt-label #myComponent\n    *ngIf=\"elementDef.type === 'label'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [tooltip]=\"elementDef.tooltip\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-label>\n<!-- textField -->\n<vt-text-field #myComponent\n    *ngIf=\"elementDef.type === 'textField'\"\n    [text]=\"elementDef.text\"\n    [value]=\"elementDef.value\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-text-field>\n<!-- button -->\n<vt-button #myComponent\n    *ngIf=\"elementDef.type === 'button'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [customAttributes]=\"elementDef.customAttributes\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onCommand)=\"handleOnCommand()\">\n</vt-button>\n<!-- horizontal -->\n<vt-horizontal-separator #myComponent\n    *ngIf=\"elementDef.type === 'horizontalSeparator'\"\n    [ngStyle]=\"elementDef.styles\">\n</vt-horizontal-separator>\n<!-- just a div -->\n<div *ngIf=\"elementDef.type === 'div'\" [ngClass]=\"elementDef.cssClass\"></div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DynamicComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DynamicComponent.propDecorators = {
    elementDef: [{ type: Input }],
    myComponent: [{ type: ViewChild, args: ["myComponent", { read: BaseComponent },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for text field component
 */
class TextFieldComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        /**
         * Whether or not text field is editable
         */
        this.editable = true;
        /**
         * HTML input element type attribute. Defaults to 'text'
         */
        this.type = 'text';
        this.onTextChange = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onMouseUp = new EventEmitter();
        this._maxLength = TextFieldComponent.MAX_LENGTH;
        this.styleVar = {};
    }
    /**
     * Max input allowed for characters
     * @param {?} max
     * @return {?}
     */
    set maxLength(max) {
        this._maxLength = max;
    }
    /**
     * @return {?}
     */
    get maxLength() {
        return this._maxLength > 0 ? this._maxLength : TextFieldComponent.MAX_LENGTH;
    }
    /**
     * Init lifecycle. Set dimensions and style properties
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.disabled && this.fontColorDisabled) {
            this.styleVar["color"] = this.fontColorDisabled;
        }
        else {
            this.styleVar["color"] = this.fontColor || 'inherit';
        }
        // this.styleVar["margin-left"] = "1px";
        this.styleVar["margin-right"] = "5px";
        // this.styles["margin-left"] = "1px";
        this.styles["margin-right"] = "5px";
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.controlHeight) {
            this.controlHeight = this.controlHeight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
        if (this.marginTop) {
            this.marginTop = this.marginTop + 'px';
        }
    }
    /**
     * After view init lifecycle. Set dimensions, focus text field
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initWidthHeightStyle();
        this.setAttributeFromDef();
        this.cd.detectChanges();
        if (this.focusOnActivation) {
            this.input.nativeElement.focus();
        }
        if (this.type === 'date') {
            // Remove native datepicker controls applied by Chrome
            this.renderer.setProperty(this.input.nativeElement, 'type', 'text');
        }
    }
    /**
     * Event handler for blur (unfocus) event
     * @param {?} e Input blur event
     * @param {?} value
     * @return {?}
     */
    onBlur(e, value) {
        if (!document.hasFocus() && $(":focus").length > 0) {
            return;
        }
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        // Checks for numeric date entry without slashes: e.g 20190104
        // If the user enters numbers without slashes auto format as date
        if (this.type === 'date' && /^\d{8}$/m.test(this.text)) {
            /** @type {?} */
            let formattedDateString = [this.text.substr(0, 4), this.text.substr(4, 2), this.text.substr(6, 2)].join('/');
            this.text = formattedDateString;
        }
        this.validateField(e);
    }
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    onFocus(e) {
        this.input.nativeElement.selectionStart = this.text.length;
        this.input.nativeElement.selectionEnd = this.text.length;
        if (!this.customAttributes)
            return;
        /** @type {?} */
        let formatName = this.customAttributes['format'];
        if (formatName && formatName.indexOf("add_comma") >= 0) {
            /** @type {?} */
            let txtMount = this.text.replace(/,/g, "");
            this.text = txtMount;
        }
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    onInput(event, value) {
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            /** @type {?} */
            let pos = this.input.nativeElement.selectionStart;
            this.text = value;
            setTimeout(() => {
                this.input.nativeElement.selectionStart = pos;
                this.input.nativeElement.selectionEnd = pos;
            });
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Focus the input element
     * @return {?}
     */
    setFocus() {
        this.input.nativeElement.focus();
    }
    /**
     * Set background color CSS for the text input
     * @param {?} bgColor CSS color string value for background
     * @return {?}
     */
    setBgColor(bgColor) {
        this.input.nativeElement.style.backgroundColor = bgColor;
    }
    /**
     * Get [[_maxLength]] property value
     * @return {?}
     */
    getMaxLength() {
        return this._maxLength;
    }
    /**
     * Set [[_maxLength]] property value
     * @param {?} max Maximum length of character input
     * @return {?}
     */
    setMaxLength(max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    }
    /**
     * Get JSON representation for this text-field
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "editable", this.editable);
        if (this.value != null) {
            this.setJson(json, "value", this.value);
        }
        return json;
    }
    /**
     * Get component name
     * @return {?}
     */
    getLocalName() {
        return "textField";
    }
    /**
     * Get the text content value of the input element
     * @return {?}
     */
    getValue() {
        return this.getText();
    }
    /**
     * Event handler for mouseup
     * \@event OnMouseUp
     * @return {?}
     */
    handleMouseUp() {
        this.onMouseUp.emit();
    }
    /**
     * @return {?} String Tag name
     */
    getNxTagName() {
        return "textField";
    }
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Change detector
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * @return {?}
     */
    _notifyInternalChangeCb() {
        super._notifyInternalChangeCb();
    }
    /**
     * Select all text
     * @return {?}
     */
    selectText() {
        this.input.nativeElement.select();
    }
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    setVisible(value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
}
TextFieldComponent.MAX_LENGTH = 9999;
TextFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-text-field',
                template: "<div\n  class=\"{{cssClass}}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngClass]=\"{'vt-text-field': true, 'hidden': visible != true}\">\n\n  <input [type]=\"type\" [id]=\"id\" #input\n    [ngClass]=\"{'input-date': type === 'date'}\"\n    class=\"form-control\"\n    [readonly]=\"editable !== true && editable !== 'true'\"\n    [attr.tabindex]=\"editable !== true && editable !== 'true' ? -1 : null\"\n    [disabled]=\"disabled\"\n    [(ngModel)]=\"text\"\n    [ngStyle]=\"styleVar\"\n    [maxLength]=\"maxLength\"\n    [style.width]=\"controlWidth\"\n    [style.height]=\"controlHeight\"\n    [style.textAlign]=\"alignHorizontal\"\n    [style.border-color]=\"borderColor\"\n    [style.margin-top]=\"marginTop\"\n    [style.margin-left]=\"marginLeft\"\n    [style.padding]=\"controlPadding\"\n    (focusout)=\"onBlur($event, input.value)\"\n    (focusin)=\"onFocus($event)\"\n    (change)=\"_notifyInternalChangeCb()\"\n    (mouseup)=\"handleMouseUp()\"\n    (keyup)=\"onInput($event, input.value)\"\n    [required]=\"required\"\n    [min]=\"min\"\n    [max]=\"max\"/>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TextFieldComponent)
                    }
                ],
                styles: [".vt-text-field{display:inline-block}.vt-text-field input.form-control{width:100%}.vt-text-field>input{margin-bottom:3px}"]
            }] }
];
/** @nocollapse */
TextFieldComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TextFieldComponent.propDecorators = {
    value: [{ type: Input }],
    editable: [{ type: Input }],
    maxLength: [{ type: Input }],
    type: [{ type: Input }],
    onTextChange: [{ type: Output }],
    onEdit: [{ type: Output }],
    onMouseUp: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextFieldModule {
}
TextFieldModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [TextFieldComponent],
                exports: [
                    TextFieldComponent,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                entryComponents: [
                    TextFieldComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DynamicModule {
}
DynamicModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ButtonModule,
                    LabelModule,
                    TextFieldModule,
                    LayoutModule,
                    HorizontalSeparatorModule
                ],
                declarations: [
                    DynamicComponent
                ],
                exports: [
                    DynamicComponent,
                    ButtonModule,
                    LabelModule,
                    TextFieldModule,
                    LayoutModule,
                    HorizontalSeparatorModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DynamicElementBuilder {
    /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    static createLabelElement(whiteSpaceWrap = false, padding = null) {
        /** @type {?} */
        const el = new DynamicElementBuilder();
        el.dynamicElement = {
            type: "label"
        };
        el.initStyle();
        if (whiteSpaceWrap === true) {
            el.dynamicElement.styles["white-space"] = "nowrap";
        }
        if (padding != null && padding !== '') {
            el.dynamicElement.styles["padding"] = padding;
        }
        return el;
    }
    /**
     * @return {?}
     */
    toDynamicElement() {
        return this.dynamicElement;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setId(id) {
        this.dynamicElement.id = id;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        this.dynamicElement.text = text;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText2(text) {
        //not sure what this is, for now, custom attribute
        this.setAttribute("text2", text);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        this.dynamicElement.value = value;
    }
    /**
     * @param {?} tooltip
     * @return {?}
     */
    setTooltip(tooltip) {
        this.dynamicElement.tooltip = tooltip;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    setVisible(visible) {
        this.dynamicElement.visible = visible;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    setEnabled(enabled) {
        this.dynamicElement.enabled = enabled;
    }
    /**
     * @param {?} popupMenuId
     * @return {?}
     */
    setPopup(popupMenuId) {
        this.dynamicElement.popupMenuId = popupMenuId;
    }
    /**
     * @param {?} bgColor
     * @return {?}
     */
    setBgColor(bgColor) {
        this.initStyle();
        this.dynamicElement.styles["background-color"] = this.checkCustomColor(bgColor);
    }
    /**
     * @param {?} cssClass
     * @return {?}
     */
    addCssClass(cssClass) {
        this.initStyle();
        if (this.dynamicElement.cssClass == undefined) {
            this.dynamicElement.cssClass = cssClass;
        }
        else {
            this.dynamicElement.cssClass = this.dynamicElement.cssClass + " " + cssClass;
        }
    }
    /**
     * @param {?} borderColor
     * @return {?}
     */
    setBorderColor(borderColor) {
        this.initStyle();
        this.dynamicElement.styles["border-color"] = this.checkCustomColor(borderColor);
        this.initBorderStyle();
    }
    /**
     * @param {?} borderWidth
     * @return {?}
     */
    setBorderWidth(borderWidth) {
        this.initStyle();
        this.dynamicElement.styles["border-width"] = this.convertStyleUnit(borderWidth);
        this.initBorderStyle();
    }
    /**
     * @param {?} borderStyle
     * @return {?}
     */
    setBorderStyle(borderStyle) {
        this.initStyle();
        this.dynamicElement.styles["border-style"] = borderStyle;
    }
    /**
     * @param {?} height
     * @return {?}
     */
    setHeight(height) {
        this.initStyle();
        this.dynamicElement.styles["height"] = height + "px";
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        this.initStyle();
        this.dynamicElement.styles["width"] = width + "px";
    }
    /**
     * @param {?} x
     * @return {?}
     */
    setX(x) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["left"] = x + "px";
    }
    /**
     * @param {?} y
     * @return {?}
     */
    setY(y) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["top"] = y + "px";
    }
    /**
     * @param {?} z
     * @return {?}
     */
    setZ(z) {
        this.initStyle();
        this.dynamicElement.styles["z-index"] = z;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    setFontBold(boo) {
        this.initStyle();
        if (boo === "true" || boo === true) {
            this.dynamicElement.styles["font-weight"] = "bold";
        }
        else {
            this.dynamicElement.styles["font-weight"] = "normal";
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setFontSize(size) {
        this.initStyle();
        this.dynamicElement.styles["font-size"] = size + "px";
    }
    /**
     * @param {?} color
     * @return {?}
     */
    setFontColor(color) {
        this.initStyle();
        this.dynamicElement.styles["color"] = this.checkCustomColor(color);
    }
    /**
     * @param {?} margin
     * @return {?}
     */
    setMargin(margin) {
        this.initStyle();
        this.dynamicElement.styles["margin"] = this.convertStyleUnit(margin);
    }
    /**
     * @param {?} align
     * @return {?}
     */
    setAlignVertical(align) {
        this.initStyle();
        if (align === "center") {
            align = "middle";
        }
        this.dynamicElement.styles["vertical-align"] = align;
    }
    /**
     * @param {?} align
     * @return {?}
     */
    setAlignHorizontal(align) {
        this.initStyle();
        this.dynamicElement.styles["text-align"] = align;
    }
    /**
     * @param {?} borderCorner
     * @return {?}
     */
    setBorderCorner(borderCorner) {
        this.initStyle();
        this.dynamicElement.styles["border-radius"] = this.convertStyleUnit(borderCorner);
    }
    /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    setDropShadowColor(dropShadowColor) {
        this.dropShadowColor = this.checkCustomColor(dropShadowColor);
        this.setBoxShadow();
    }
    /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    setDropShadowOffset(dropShadowOffset) {
        this.dropShadowOffset = dropShadowOffset;
        this.setBoxShadow();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setOnContextMenu(fn) {
        this.dynamicElement.onContextMenu = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setOnCommand(fn) {
        this.dynamicElement.onCommand = fn;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (this.dynamicElement.customAttributes == null) {
            this.dynamicElement.customAttributes = {};
        }
        this.dynamicElement.customAttributes[name] = value;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    setRichText(str) {
        this.dynamicElement.richText = str === true || str === "true";
    }
    /**
     * @param {?} child
     * @return {?}
     */
    appendChild(child) {
        if (this.dynamicElement.children == null) {
            this.dynamicElement.children = [child.dynamicElement];
        }
        else {
            this.dynamicElement.children.push(child.dynamicElement);
        }
    }
    /**
     * @return {?}
     */
    initStyle() {
        if (this.dynamicElement.styles == null) {
            this.dynamicElement.styles = {};
        }
    }
    /**
     * @return {?}
     */
    initBorderStyle() {
        if (this.dynamicElement.styles["border-style"] == null || this.dynamicElement.styles["border-style"] == "") {
            this.dynamicElement.styles["border-style"] = "solid";
        }
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    convertStyleUnit(unit) {
        if (unit != null && unit.indexOf(",") > 0) {
            unit = unit.split(",").map(m => m + "px").join(" ");
        }
        else if (unit != null && unit !== "") {
            unit = unit + "px";
        }
        return unit;
    }
    /**
     * @return {?}
     */
    setBoxShadow() {
        if (this.dropShadowColor != null && this.dropShadowOffset != null) {
            this.initStyle();
            this.dynamicElement.styles["box-shadow"] = `${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowColor}`;
        }
    }
    /**
     * @param {?} color
     * @return {?}
     */
    checkCustomColor(color) {
        if (color != null && color.indexOf("#") === 0 && color.length > 7) {
            color = "var(" + color.replace("#", "--") + ")";
        }
        return color;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for radio button input control
 */
class RadioButtonComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this panel
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.checked = false;
        this.onCommand = new EventEmitter();
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set isChecked(boo) {
        this.checked = boo;
    }
    /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.idName != null) {
            this.setCustomAttribute('idName', this.idName);
        }
    }
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.getParent() != null) {
            this.getParent().addRadioButtonGroup(this);
        }
        this.setAttributeFromDef();
        this.cd.detectChanges();
        this._internalChangeTracking = this.checked;
    }
    /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    onChange() {
        this.onCommand.emit();
    }
    /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        /** @type {?} */
        const tempCheck = this.checked;
        this.resetGroupRadios();
        //reset current value back for onChange
        this._internalChangeTracking = tempCheck;
        //register click for mco
        this.checked = true;
        this.handleClick(event);
        if (this._internalChangeTracking !== this.checked) {
            this.onChange();
            this._internalChangeTracking = this.checked;
        }
    }
    /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    onMouseDown(e) {
        this.handleMouseDown(e);
    }
    /**
     * Get the component name
     * @return {?}
     */
    getLocalName() {
        return "radioButton";
    }
    /**
     * Get the [[value]] property
     * @return {?}
     */
    getValue() {
        return this.value;
    }
    /**
     * Get the [[checked]] property
     * @return {?}
     */
    getChecked() {
        return this.checked;
    }
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    setChecked(shouldChecked, skipInternalChange = false) {
        if (shouldChecked === true) {
            this.resetGroupRadios();
        }
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this._internalChangeTracking = this.checked;
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    }
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    setSelected(value) {
        if (value === true || value === "true") {
            this.setChecked(true);
        }
        else if (value == this.value) {
            this.setChecked(true);
        }
        else if (this.getParent() != null) {
            /** @type {?} */
            const group = this.getParent().getRadioButtonGroup(this.group);
            if (group != null) {
                for (let radio of group) {
                    if (radio.getValue() == value) {
                        radio.setChecked(true);
                        break;
                    }
                }
            }
        }
    }
    /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json["group"] = this.group;
        json["selected"] = this.checked === true ? "true" : "false";
        return json;
    }
    /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "radioButton";
    }
    /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    resetGroupRadios() {
        /** @type {?} */
        const group = this.getParent().getRadioButtonGroup(this.group);
        if (group != null) {
            for (let radio of group) {
                radio.setChecked(false);
            }
        }
    }
    /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    isRadioButton() {
        return true;
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-radio-button',
                template: "<div class=\"radio {{cssClass}} {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-radio\" type=\"radio\" [name]=\"group\" [id]=\"id\" [value]=\"value\" [checked]=\"checked\"\n      [disabled]=\"disabled\"\n      (click)=\"onClick($event)\"\n      (mousedown)=\"onMouseDown($event)\"\n      [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => RadioButtonComponent)
                    }
                ],
                styles: ["div>label>span{vertical-align:top!important}"]
            }] }
];
/** @nocollapse */
RadioButtonComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
RadioButtonComponent.propDecorators = {
    group: [{ type: Input }],
    idName: [{ type: Input }],
    value: [{ type: Input }],
    isChecked: [{ type: Input }],
    checked: [{ type: Input }],
    onCommand: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RadioButtonModule {
}
RadioButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [RadioButtonComponent],
                exports: [
                    RadioButtonComponent,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                entryComponents: [
                    RadioButtonComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for scroll pane component
 */
class ScrollPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} cd Change detector for this component instance
     * @param {?} zone
     */
    constructor(parent, sessionService, elementRef, renderer, cd, zone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.zone = zone;
        this._scrollVerticalPos = 0;
        this._scrollerHandler = (event) => {
            this.handleOnScroll(event);
        };
    }
    /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.controlHeight == null) {
            this.controlHeight = '100%';
        }
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        if (this.controlWidth != null && this.controlWidth !== "") {
            this.styles["max-width"] = this.controlWidth + "px";
        }
        if (this.maxHeight != null && this.maxHeight !== "") {
            this.styles["max-height"] = this.maxHeight + "px";
        }
        if (this.resizeHeight != null && this.resizeHeight !== "") {
            this.styles["height"] = "calc(100% - " + this.resizeHeight + "px)";
        }
        this.zone.runOutsideAngular(() => {
            //for https://github.com/weaveio/ngnsophia/issues/1392, track position of scroll pane
            //so it can be reset back when user switching tabs
            if (this.skipScrollAdjustment !== true) {
                (/** @type {?} */ (this.scrollDivElement.nativeElement)).addEventListener("scroll", this._scrollerHandler, true);
            }
        });
        this.cd.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        (/** @type {?} */ (this.scrollDivElement.nativeElement)).removeEventListener("scroll", this._scrollerHandler, true);
        this._scrollerHandler = null;
    }
    /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    handleOnScroll(event) {
        this._scrollVerticalPos = event.srcElement.scrollTop;
    }
    /**
     * @return {?}
     */
    resetScrollTopToPreviousPosition() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                if (this.scrollDivElement.nativeElement.scrollTop != this._scrollVerticalPos) {
                    this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
                }
            }, 300);
        });
    }
    /**
     * @return {?}
     */
    resetScrollTopPosition() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this._scrollVerticalPos = 0;
                this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
            }, 300);
        });
    }
    /**
     * @return {?}
     */
    isScrollView() {
        return true;
    }
    /**
     * @return {?}
     */
    isScrollPane() {
        return true;
    }
}
ScrollPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-scroll-pane',
                template: "<div #scrollDiv [id]=\"id\" class=\"vt-scroll-pane {{cssClass}}\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\">\n  <ng-content></ng-content>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ScrollPaneComponent)
                    }
                ],
                styles: [".vt-scroll-pane{overflow:auto}.noscroll{overflow:hidden!important;overflow-y:hidden!important;overflow-x:hidden!important}"]
            }] }
];
/** @nocollapse */
ScrollPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
ScrollPaneComponent.propDecorators = {
    resizeHeight: [{ type: Input }],
    skipScrollAdjustment: [{ type: Input }],
    scrollDivElement: [{ type: ViewChild, args: ['scrollDiv',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ScrollPaneModule {
}
ScrollPaneModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [ScrollPaneComponent],
                exports: [
                    ScrollPaneComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StringBuilder {
    /**
     * @param {?=} initial
     */
    constructor(initial) {
        this._internalString = "";
        if (initial != null) {
            this.append(initial);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    append(str) {
        if (str instanceof StringBuilder) {
            this._internalString = this._internalString + str.toString();
        }
        else {
            this._internalString = this._internalString + str;
        }
        return this;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._internalString;
    }
    /**
     * @return {?}
     */
    clear() {
        this._internalString = "";
        return this;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.clear();
    }
    /**
     * @param {?} str
     * @return {?}
     */
    indexOf(str) {
        return this._internalString.indexOf(str);
    }
    /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    substring(startIdx, endIdx) {
        if (endIdx != null) {
            return this._internalString.substring(startIdx, endIdx);
        }
        return this._internalString.substring(startIdx);
    }
    /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    replace(startIdx, endIdex, replaceStr) {
        /** @type {?} */
        const b = this._internalString.substring(0, startIdx);
        /** @type {?} */
        const e = this._internalString.substring(endIdex);
        this._internalString = b + replaceStr + e;
        return this;
    }
    /**
     * @return {?}
     */
    length() {
        return this._internalString.length;
    }
    /**
     * @param {?} i
     * @return {?}
     */
    charAt(i) {
        if (i < this._internalString.length) {
            return this._internalString.charAt(i);
        }
        return null;
    }
    /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    setCharAt(idx, val) {
        if (typeof val === "number") {
            this.insert(idx, String.fromCharCode(val));
        }
        else {
            this.insert(idx, val);
        }
    }
    /**
     * @param {?} i
     * @return {?}
     */
    deleteCharAt(i) {
        this.replace(i, i, '');
        return this;
    }
    /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    insert(index, str) {
        if (index <= this._internalString.length) {
            this._internalString = this._internalString.substring(0, index - 1) + str + this._internalString.substring(index);
        }
        return this;
    }
    /**
     * @param {?} chr
     * @return {?}
     */
    lastIndexOf(chr) {
        if (this._internalString != null) {
            return lastIndexOf(this._internalString, chr);
        }
        return -1;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This directive serve as a template for rendering table cell.
 */
class TableCellDirective {
    /**
     *
     * @param {?} template Template on how to render the cell, we will forward row, column, etc to the template
     */
    constructor(template) {
        this.template = template;
    }
}
TableCellDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-table-cell]'
            },] }
];
/** @nocollapse */
TableCellDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TableCellDirective.propDecorators = {
    onContextMenuCb: [{ type: Input }],
    alignHorizontal: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
class TableHeaderDirective {
    /**
     *
     * @param {?} template Template on how to render the header, we will forward row, column, etc to the template
     */
    constructor(template) {
        this.template = template;
    }
}
TableHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-table-header]'
            },] }
];
/** @nocollapse */
TableHeaderDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TableHeaderDirective.propDecorators = {
    id: [{ type: Input }],
    autoWrap: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HeaderDirective {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("header");
        }
    }
}
HeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-header'
            },] }
];
/** @nocollapse */
HeaderDirective.ctorParameters = () => [];
HeaderDirective.propDecorators = {
    text: [{ type: Input }],
    cssClass: [{ type: Input }],
    controlHeight: [{ type: Input }],
    controlWidth: [{ type: Input }],
    headerHeight: [{ type: Input }],
    autoWrap: [{ type: Input }],
    id: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TableColumnDirective {
    constructor() {
        //TODO
        this.locked = false;
        //TODO
        this.enabled = true;
        this.sortable = true;
        this.isChecked = false;
        this._visible = true;
    }
    /**
     * @param {?} header
     * @return {?}
     */
    set header(header) {
        this._header = header;
    }
    /**
     * @return {?}
     */
    get header() {
        return this.headerDirective ? this.headerDirective.text : this._header;
    }
    /**
     * @param {?} vis
     * @return {?}
     */
    set visible(vis) {
        this._visible = vis;
        if (this._visible === true) {
            if (this.styles) {
                delete this.styles["display"];
            }
        }
        else {
            if (this.styles) {
                this.styles["display"] = "none";
            }
            else {
                this.styles = {
                    "display": "none"
                };
            }
        }
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @return {?}
     */
    get isHeaderTemplate() {
        return this.headerTemplate === null || this.headerTemplate === undefined ? false : true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.headerDirective != null) {
            this.header = this.headerDirective.text;
            if (this.autoWrap == null) {
                this.autoWrap = this.headerDirective.autoWrap === true || this.headerDirective.autoWrap === "true";
            }
        }
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("column");
        }
        if (this.headerHeight != null) {
            this.headerHeight = this.headerHeight;
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) {
            this.visible = JavaUtils.parseBoolean(value);
        }
        else {
            if (this.customAttributes == null) {
                this.customAttributes = {};
            }
            this.customAttributes[name] = value;
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAttribute(name) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE)
            return /** @type {?} */ (this.visible);
        if (typeof name === "number" && name === AttributesEnum.ID)
            return this.id;
        /** @type {?} */
        let retVal = this.customAttributes != null ? this.customAttributes[name] : null;
        if (typeof retVal !== "string") {
            retVal = retVal + "";
        }
        return retVal;
    }
    /**
     * @param {?} vis
     * @return {?}
     */
    setVisible(vis) {
        this.visible = vis;
    }
}
TableColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-table-column'
            },] }
];
TableColumnDirective.propDecorators = {
    locked: [{ type: Input }],
    enabled: [{ type: Input }],
    sortable: [{ type: Input }],
    isChecked: [{ type: Input }],
    alignHorizontal: [{ type: Input }],
    id: [{ type: Input }],
    cellTemplate: [{ type: ContentChild, args: [TableCellDirective, { read: TableCellDirective },] }],
    headerTemplate: [{ type: ContentChild, args: [TableHeaderDirective, { read: TemplateRef },] }],
    headerDirective: [{ type: ContentChild, args: [HeaderDirective,] }],
    header: [{ type: Input }],
    autoWrap: [{ type: Input }],
    controlWidth: [{ type: Input }],
    controlHeight: [{ type: Input }],
    cellHeight: [{ type: Input }],
    headerHeight: [{ type: Input }],
    visible: [{ type: Input }],
    customAttributes: [{ type: Input }],
    skipTracking: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TableSelectionEvent {
    /**
     * @param {?} rows
     */
    constructor(rows) {
        this.rows = rows;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HTMLElementWrapper {
    /**
     * @param {?} renderer
     * @param {?} type
     * @param {?} sessionService
     * @param {?=} virtual
     * @param {?=} docFragment
     */
    constructor(renderer, type, sessionService, virtual = false, docFragment = null) {
        this.renderer = renderer;
        this.sessionService = sessionService;
        //for none dynamic stuf
        this.childNodes = [];
        this.customAttributes = null;
        this._uniqueId = BaseComponent.generateUniqueId(type);
        this.localName = type;
        if (type === "row" && virtual !== true) {
            this.htmlElement = this.renderer.createElement("tr");
            this._dynamicComponent = true;
        }
        else if (type === "cell" && virtual !== true) {
            this.htmlElement = this.renderer.createElement("td");
            this._dynamicComponent = true;
        }
        else if (type === "label" || type === "menuItem" || virtual === true) {
            this.fauxElementAttributes = new Map();
            this.setAttribute("id", this._uniqueId);
        }
        if (this._dynamicComponent === true) {
            if (this.htmlElement instanceof HTMLTableRowElement) {
                this.htmlElement.setAttribute("data-tt-id", this._uniqueId);
            }
            this.onContextHandler = (event) => {
                /** @type {?} */
                const clientEvent = new ClientEvent(this, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(this, clientEvent);
                }
                if (this.parentScreenId != null) {
                    clientEvent.setParameter("screenId", this.parentScreenId);
                }
                this.sessionService.getEventHandler().setClientEvent(clientEvent);
                if (typeof this.contextMenuAction === "string") {
                    this.invokeMcoAction(this.contextMenuAction);
                }
                else if (typeof this.contextMenuAction === "function") {
                    this.contextMenuAction.apply(this, [this]);
                }
                this.showPopupMenu(event);
            };
            this.htmlElement.addEventListener("mousedown", (event) => this.onMouseDownHandler(event), true);
            this.htmlElement.addEventListener("dblclick", (event) => this.onDoubleClickHandler(event), true);
            this.onMouseDownHandler = (event) => {
                this.handleOnMouseDown(event);
            };
            this.onDoubleClickHandler = (event) => {
                this.handleDoubleClick(event);
            };
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this.getId();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static createVirtualElement(type) {
        return new HTMLElementWrapper(null, type, null, true);
    }
    /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    destroy(skipDestroyChild = false) {
        if (this._dynamicComponent === true && this.htmlElement != null) {
            this.htmlElement.removeEventListener("contextmenu", this.onContextHandler, true);
            this.htmlElement.removeEventListener("mousedown", this.onMouseDownHandler, true);
            this.htmlElement.removeEventListener("dblclick", this.onDoubleClickHandler, true);
        }
        if (this.childNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.childNodes;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
                if (node.childNodes != null) {
                    stack = stack.concat(node.childNodes);
                }
                node.destroy(true);
            }
        }
        if (this.dynamicChildNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.dynamicChildNodes;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
                if (node.dynamicChildNodes != null) {
                    stack = stack.concat(node.dynamicChildNodes);
                }
                node.destroy(true);
            }
        }
        if (this.childRows != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.childRows;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
                if (node.childRows != null) {
                    stack = stack.concat(node.childRows);
                }
                node.destroy(true);
            }
        }
        if (this.component != null) {
            this.component.removeAttributeChangeListener(this);
        }
        this.htmlElement = null;
        this.parent = null;
        this._uniqueId = null;
        this.component = null;
        this.childNodes = null;
        this.attributesName = null;
        this.fauxElementAttributes = null;
        this.childRows = null;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        if (this._dynamicComponent === true) {
            this.renderer.setProperty(this.htmlElement, "innerHTML", text);
        }
        else if (this.component != null) {
            this.component.setText(text);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("text", text);
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setFontSize(size) {
        if (this._dynamicComponent === true) {
            this.renderer.setStyle(this.htmlElement, "font-size", size + "px");
        }
        else if (this.component != null) {
            this.component.setFontSize(size);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontSize", size);
        }
    }
    /**
     * @param {?} bold
     * @return {?}
     */
    setFontBold(bold) {
        if (this._dynamicComponent === true) {
            if (bold === "true" || bold === true) {
                this.renderer.setStyle(this.htmlElement, "font-weight", "bold");
            }
            else {
                this.renderer.setStyle(this.htmlElement, "font-weight", "normal");
            }
        }
        else if (this.component != null) {
            this.component.setFontBold(bold);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontBold", bold);
        }
    }
    /**
     * @param {?} css
     * @return {?}
     */
    setClass(css) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            const temp = css.split("\.");
            /** @type {?} */
            let cssClass = temp.join("-");
            if (temp[0] === "") {
                css = cssClass.substring(1);
            }
        }
        if (this.htmlElement != null) {
            this.renderer.setAttribute(this.htmlElement, "class", css);
        }
        else if (this.component != null) {
            this.component.addCssClass(css);
        }
        else if (this.fauxElementAttributes != null) {
            this.setAttribute("class", css);
        }
    }
    /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    insertChildRowAt(idx, child) {
        if (child.htmlElement instanceof HTMLTableRowElement !== true && this._dynamicComponent === true) {
            throw new Error("Invalid insertion, only HTMLTableRowElement is allowed");
        }
        if (idx > 0 && (this.childRows == null || this.childRows.length <= idx)) {
            throw new Error("Unable to insert child row at this specific location (index overflow)");
        }
        else if (idx >= 0 && (this.childRows != null && this.childRows.length > idx)) {
            //track child rows so we can used insertChildRowAt
            if (this.childRows == null) {
                this.childRows = [];
            }
            if (this.parentTable.useDocFragment === true) {
                (/** @type {?} */ (this.parentTable._bodyFragment)).insertBefore(child.htmlElement, this.childRows[idx].htmlElement);
            }
            else {
                this.renderer.insertBefore(this.parentTable.tableBody.nativeElement, child.htmlElement, this.childRows[idx].htmlElement);
            }
            this.childRows.splice(idx, 0, child);
        }
        this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);
        child.parent = this;
    }
    /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    appendChild(child, appendToTableIfRow = false) {
        if (this._dynamicComponent === true) {
            if (child.htmlElement instanceof HTMLTableRowElement) {
                this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);
                if (appendToTableIfRow === true) {
                    if (this.parentTable.useDocFragment === true) {
                        (/** @type {?} */ (this.parentTable._bodyFragment)).appendChild(child.htmlElement);
                    }
                    else {
                        this.renderer.appendChild(this.parentTable.tableBody.nativeElement, child.htmlElement);
                    }
                }
                //track child rows so we can used insertChildRowAt
                if (this.childRows == null) {
                    this.childRows = [];
                }
                this.childRows.push(child);
            }
            else if (child.htmlElement instanceof HTMLTableCellElement) {
                this.renderer.appendChild(this.htmlElement, child.htmlElement);
                if (this.dynamicChildNodes == null) {
                    this.dynamicChildNodes = [];
                }
                this.dynamicChildNodes.push(child);
            }
        }
        else {
            this.childNodes.push(child);
        }
        child.parent = this;
    }
    /**
     * @param {?} cust
     * @return {?}
     */
    appendCustomAttributes(cust) {
        if (cust != null) {
            /** @type {?} */
            const keys$$1 = keys(cust);
            for (let key of keys$$1) {
                this.setAttribute(key, cust[key]);
            }
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (name === 'selected' && this.localName == 'row') {
            if (this.parentTable != null) {
                if (value == 'true')
                    this.parentTable.selectRow(this, true);
                else
                    this.parentTable.selectRow(this, false);
                this.parentTable.markForCheck();
            }
        }
        if (name === "expanded") {
            this.expandNode(value);
        }
        else if (this.component != null) {
            this.component.setAttribute(name, value);
            this.trackAttributeName(name);
        }
        else if (this.htmlElement != null) {
            if (name === "isLockedColumn") {
                if (this.fauxElementAttributes == null) {
                    this.fauxElementAttributes = new Map();
                }
                this.fauxElementAttributes.set(name, value);
            }
            else {
                this.renderer.setAttribute(this.htmlElement, name, value);
            }
            this.trackAttributeName(name);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set(name, value);
            this.trackAttributeName(name);
        }
    }
    /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    getAttribute(name, skipQueryDOMIfNotExists = false) {
        if (name === "expanded") {
            return this.expanded === "true" ? "true" : "false";
        }
        if (this.component != null) {
            return this.component.getAttribute(name, skipQueryDOMIfNotExists);
        }
        else if (this.htmlElement != null && skipQueryDOMIfNotExists !== true) {
            if (name === "text") {
                /** @type {?} */
                let text = this.htmlElement.getAttribute(name);
                if (text == null) {
                    text = this.htmlElement.innerText;
                }
                if (text == null || text === "") {
                    text = (/** @type {?} */ (this.htmlElement)).textContent;
                }
                if (typeof text === "string") {
                    text = text.trim();
                }
                return text;
            }
            else if (name === "isLockedColumn" && this.fauxElementAttributes != null) {
                return this.fauxElementAttributes.get(name);
            }
            else if (name === "isLockedColumn") {
                return "false";
            }
            return this.htmlElement.getAttribute(name);
        }
        else if (this.fauxElementAttributes != null) {
            return this.fauxElementAttributes.get(name);
        }
    }
    /**
     * @return {?}
     */
    getText() {
        return this.getAttribute("text");
    }
    /**
     * @return {?}
     */
    getId() {
        return this.getAttribute("id");
    }
    /**
     * @param {?} draggable
     * @return {?}
     */
    setDraggable(draggable) {
        this.setAttribute("draggable", draggable);
        if (draggable == "true") {
            this.applyDraggable();
        }
    }
    /**
     * @return {?}
     */
    getExpanded() {
        return this.getAttribute("expanded");
    }
    /**
     * @param {?} str
     * @return {?}
     */
    setExpanded(str) {
        this.setAttribute("expanded", str);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnContextMenu(action) {
        if (this.htmlElement != null) {
            this.contextMenuAction = action;
            this.htmlElement.addEventListener("contextmenu", (event) => this.onContextHandler(event), true);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnMouseDown(action) {
        this.mouseDownAction = action;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnDoubleClick(action) {
        this.doubleClickAction = action;
    }
    /**
     * @param {?} popupName
     * @return {?}
     */
    setPopup(popupName) {
        this.popupName = popupName.replace("#", "");
    }
    /**
     * @return {?}
     */
    getParent() {
        return this.parent;
    }
    /**
     * @return {?}
     */
    getLocalName() {
        return this.localName;
    }
    /**
     * @param {?} localName
     * @return {?}
     */
    setLocaleName(localName) {
        this.localName = localName;
    }
    /**
     * @return {?}
     */
    getChildren() {
        /** @type {?} */
        let children = this.childNodes;
        if ((children == null || children.length === 0) && (this.dynamicChildNodes != null)) {
            children = this.dynamicChildNodes;
        }
        if (this.getLocalName() === "row" &&
            children != null &&
            this.parentTable != null &&
            this.parentTable.getLocalName() === "table" &&
            this.parentTable.columnsHasBeenSwapped === true) {
            children = /** @type {?} */ (orderBy(children, (child) => {
                return child["originalColumnIndex"];
            }));
        }
        return children;
    }
    /**
     * @return {?}
     */
    getChildCount() {
        return this.childNodes != null ? this.childNodes.length : 0;
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    getChildAt(idx) {
        return this.getChildCount() > idx ? this.childNodes[idx] : null;
    }
    /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    setComponent(component, fromVirtualTable = false) {
        this.component = component;
        this.component.parentTableRow = this.parent;
        if (component != null && fromVirtualTable === true) {
            component.addAttributeChangeListener(this);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    invokeMcoAction(action) {
        if (typeof action === "function") {
            action();
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            const mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    if (arg === "this") {
                        mco[methodName].apply(mco, [this]);
                    }
                    else {
                        mco[methodName].apply(mco, [arg]);
                    }
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
            else {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    getComponent() {
        return this.component;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showPopupMenu(event) {
        this.sessionService.setMousePosition(event);
        if (this.popupName != null) {
            /** @type {?} */
            const contextMenu = this.sessionService.showContextMenu(this.popupName);
            if (contextMenu === true) {
                event.preventDefault();
                event.stopPropagation();
                // contextMenu.show(this.htmlElement);
            }
        }
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        clientEvent.setParameter("screenId", this.parentScreenId);
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleOnMouseDown(event) {
        if (this.parentTable != null) {
            /** @type {?} */
            let table = this.parentTable.elementRef.nativeElement;
            /** @type {?} */
            let tds = table.querySelectorAll('td');
            for (let i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = '';
            }
            tds = this.htmlElement.querySelectorAll('td');
            for (let i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = 'blue';
            }
        }
        if (this.mouseDownAction != null) {
            /** @type {?} */
            const clientEvent = new ClientEvent(this, event);
            if (AppUtils.customizeClientEvent != null) {
                AppUtils.customizeClientEvent(this, clientEvent);
            }
            if (this.parentScreenId != null) {
                clientEvent.setParameter("screenId", this.parentScreenId);
            }
            this.sessionService.getEventHandler().setClientEvent(clientEvent);
            this.invokeMcoAction(this.mouseDownAction);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDoubleClick(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.doubleClickAction != null) {
            this.invokeMcoAction(this.doubleClickAction);
        }
    }
    /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    expandNode(isExpanded, justUpdateAttribute = false) {
        this.expanded = typeof isExpanded === "string" ? isExpanded : isExpanded + '';
        if (justUpdateAttribute !== true && this.parentTableId != null && this.parentTableId !== "") {
            /** @type {?} */
            const jq = jQuery(`#${this.parentTableId} .jq-tree-table`);
            if (jq != null) {
                /** @type {?} */
                let nodeId = this.getAttribute("data-tt-id");
                if (nodeId != null) {
                    try {
                        if (isExpanded === "true" || isExpanded === true) {
                            jq.treetable("expandNode", nodeId);
                        }
                        else {
                            jq.treetable("collapseNode", nodeId);
                        }
                    }
                    catch (e) {
                        console.error("Unable to expand node due to error");
                    }
                }
            }
            else {
                console.error("Unable to expand node, tree table is null");
            }
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    trackAttributeName(name) {
        if (this.attributesName == null) {
            this.attributesName = [];
        }
        this.attributesName.push(name);
    }
    /**
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        let retVal = {};
        if (this.component != null) {
            retVal = this.component.toJson();
            if (this.component instanceof LabelComponent) {
                retVal["nxTagName"] = this.getLocalName();
                retVal["tagName"] = this.getLocalName();
            }
        }
        else {
            retVal["nxTagName"] = this.getLocalName();
            retVal["tagName"] = this.getLocalName();
        }
        if (this.component == null) {
            retVal["id"] = this.getId() || this._uniqueId;
            retVal["text"] = this.getText();
        }
        if (this.attributesName != null) {
            this.attributesName.forEach(name => {
                retVal[name] = this.getAttribute(name);
            });
        }
        /** @type {?} */
        let children;
        if (this.childNodes != null && this.childNodes.length > 0) {
            children = this.childNodes;
        }
        else if (this.dynamicChildNodes != null && this.dynamicChildNodes.length > 0) {
            children = this.dynamicChildNodes;
        }
        if (children != null) {
            if (this.getLocalName() === "row" &&
                this.parentTable != null &&
                this.parentTable.getLocalName() === "table" &&
                this.parentTable.columnsHasBeenSwapped === true) {
                children = /** @type {?} */ (orderBy(children, (child) => {
                    return child["originalColumnIndex"];
                }));
            }
            retVal["children"] = children.map(child => child.toJson());
        }
        if (this.customAttributes)
            retVal['customAttributes'] = this.customAttributes;
        return retVal;
    }
    /**
     * @return {?}
     */
    isView() {
        return false;
    }
    /**
     * @return {?}
     */
    isDialog() {
        return false;
    }
    /**
     * @return {?}
     */
    isDynamicView() {
        return false;
    }
    /**
     * @return {?}
     */
    isFauxElement() {
        return true;
    }
    /**
     * @param {?} chk
     * @return {?}
     */
    setChecked(chk) {
        if (typeof chk === "boolean") {
            chk = chk + "";
        }
        this.setAttribute("checked", chk);
    }
    /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    findChildByFn(fn) {
        /** @type {?} */
        let retVal;
        /** @type {?} */
        let children = this.concatNode(/** @type {?} */ ([]), this);
        while (children.length > 0) {
            /** @type {?} */
            const child = children.pop();
            if (child != null) {
                if (fn(child) === true) {
                    retVal = child;
                    break;
                }
                else {
                    children = this.concatNode(children, child);
                }
            }
        }
        return retVal;
    }
    /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    concatNode(toNode, fromNode) {
        /** @type {?} */
        let retVal = toNode;
        if (fromNode != null) {
            if (fromNode.childNodes != null) {
                retVal = retVal.concat(fromNode.childNodes);
            }
            if (fromNode.childRows != null) {
                retVal = retVal.concat(fromNode.childRows);
            }
            if (fromNode.dynamicChildNodes != null) {
                retVal = retVal.concat(fromNode.dynamicChildNodes);
            }
        }
        return retVal;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    beforeAttributeRemoved(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    beforeAttributeSet(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onAttributeRemoved(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onAttributeSet(evt) {
        if (evt.getName() === "sortValue" && this.htmlElement != null) {
            this.updateSortValue(evt.getNewValue());
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateSortValue(value) {
        if (this.renderer != null) {
            this.renderer.setAttribute(this.htmlElement, "data-text", value);
            if (this.component != null && this.component.getParent() != null && typeof (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache === "function") {
                (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache();
            }
        }
    }
    /**
     * @return {?}
     */
    isDraggable() {
        return this.getAttribute("draggable") === "true";
    }
    /**
     * @return {?}
     */
    applyDraggable() {
        if (this.isDraggable() && this.draggableApplied !== true && this.htmlElement != null) {
            jQuery(this.htmlElement).draggable({
                appendTo: "body",
                addClasses: false,
                helper: () => {
                    /** @type {?} */
                    const helper = document.createElement("div");
                    helper.classList.add("draggable-row-helper");
                    helper.id = "draggableRowHelperInternal";
                    // if (this.parentTable != null && this.parentTable.selectedRows != null && this.parentTable.selectedRows.length > 1) {
                    //   helper.classList.add("drag-row-helper-container");
                    //   const c = this.parentTable.selectedRows.length;
                    //   const frag = document.createDocumentFragment();
                    //   for (let i = 0; i < c; i++) {
                    //     const row = document.createElement("div");
                    //     row.classList.add("drag-row-helper-row");
                    //     frag.appendChild(row);
                    //   }
                    //   helper.appendChild(frag);
                    // }
                    return helper;
                },
                start: () => {
                    /** @type {?} */
                    const clientEvent = new ClientEvent(this, event);
                    clientEvent.setParameter("dragId", this.parentTableId);
                    if (AppUtils.customizeClientEvent != null) {
                        AppUtils.customizeClientEvent(this, clientEvent);
                    }
                    if (this.parentScreenId != null) {
                        clientEvent.setParameter("screenId", this.parentScreenId);
                    }
                    this.sessionService.getEventHandler().setClientEvent(clientEvent);
                }
            });
        }
        this.draggableApplied = true;
    }
    /**
     * @return {?}
     */
    isDraggableApplied() {
        return this.draggableApplied;
    }
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCustomAttribute(name, value) {
        if (!this.customAttributes)
            this.customAttributes = {};
        this.customAttributes[name] = value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TableRowDefDirective {
    constructor() { }
}
TableRowDefDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-table-row-def'
            },] }
];
/** @nocollapse */
TableRowDefDirective.ctorParameters = () => [];
TableRowDefDirective.propDecorators = {
    customAttributes: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FooterRowDirective {
}
FooterRowDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-footer-row'
            },] }
];
FooterRowDirective.propDecorators = {
    cellTemplates: [{ type: ContentChildren, args: [TableCellDirective, { read: TableCellDirective },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RowDirective {
}
RowDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-row'
            },] }
];
RowDirective.propDecorators = {
    customAttributes: [{ type: Input }],
    id: [{ type: Input }],
    cssClass: [{ type: Input }],
    cellTemplates: [{ type: ContentChildren, args: [TableCellDirective, { read: TableCellDirective },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Clipboard service that use the modern implementation of cliboard. For older browser, a polyfill
 * is used instead.
 */
class ClipboardService {
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    copy(txt) {
        return writeText(txt);
    }
}
ClipboardService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ClipboardService.ngInjectableDef = defineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(); }, token: ClipboardService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function isIE() {
    /** @type {?} */
    var nav = navigator.userAgent.toLowerCase();
    return nav.indexOf("msie") !== -1 ? parseInt(nav.split("msie")[1]) : false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for table component
 */
class TableComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} el see [[BaseComponent]] constructor
     * @param {?} changeDetectorRef Inject ChangeDetector
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} zone Inject NgZone
     * @param {?} differs Inject InterableDiffers
     * @param {?} clipboardService Inject [[ClipboardService]]
     */
    constructor(parent, sessionService, el, changeDetectorRef, renderer, zone, differs, clipboardService) {
        super(parent, sessionService, el, renderer);
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
        this.zone = zone;
        this.clipboardService = clipboardService;
        this.selectionMode = "singleRow";
        //use for virtual scrolling
        this.rowHeight = 24;
        this.scrollTimeout = 200;
        /* istanbul ignore next */
        this.onChange = new EventEmitter();
        this.onStateChange = new EventEmitter();
        this.onDoubleClick = new EventEmitter();
        this.onDragDrop = new EventEmitter();
        //custom sort function for virtual scroll
        this.forceFixWidth = true;
        this.isHeaderPadding = false;
        this.isHeaderAuto = false;
        //table-layout default fixed
        this.tableLayout = "fixed";
        //track dynamic rows so we can query for child later
        this.nodes = [];
        this.selectedRows = [];
        this._prevSelectedRows = [];
        this.scrollHandler = null;
        this.previousRowIndex = null;
        this.scrollSubject = new Subject();
        this.prevScrollTop = 0;
        this.prevScrollTopForHiddenHeader = 0;
        this.sortDirection = "";
        this.sortColumnId = 0;
        this.theadHeight = 0;
        this.scrollLeft = 0;
        this.adjustedRows = 0;
        this.preMouseEvent = null;
        this.dataSourceDiffer = differs.find([]).create();
        this.columnsDiffer = differs.find([]).create();
        this.customRowDiffer = differs.find([]).create();
        this.isIE9 = isIE() == 9;
        //for virtual scroll
        this.virtualScrollDataSourceDiffer = differs.find([]).create();
        this.keyupHandler = (evt) => this.handleKeyUp(evt);
        this.scrollHandler = (event) => {
            if (this._disabledScrolling === true) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (this.prevScrollTopForHiddenHeader !== event.srcElement.scrollTop) {
                if (!this.skipGhostHeader) {
                    this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "inline-block");
                    if (this.controlWidth === "100%") {
                        this.renderer.setStyle(this.ghostHeader.nativeElement, "width", "100%");
                    }
                    this.renderer.setStyle(this.tableHead.nativeElement, "visibility", "hidden");
                }
                //   if(this.forceFixWidth){
                //     this.renderer.setStyle(this.fakeTable.nativeElement, "table-layout", "fixed");
                //   }
                if (this.tableFoot != null) {
                    this.renderer.setStyle(this.tableFoot.nativeElement, "visibility", "hidden");
                }
                //   this.appendHeaderToFakeTable();
                if (this.virtualScroll === true) {
                    if (this.animationFrameId != null) {
                        cancelAnimationFrame(this.animationFrameId);
                    }
                    this.adjustTableHead(event, false, true);
                }
            }
            this.prevScrollTopForHiddenHeader = event.srcElement.scrollTop;
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            this.scrollSubject.next(event);
        };
    }
    /**
     * @param {?} ds
     * @return {?}
     */
    set dataSource(ds) {
        //data has changes, we need to do some clean up.
        this.cleanUpChildNodes();
        this.resetTableColumns();
        this._dataSource = this.buildRowIdentity(ds);
        this.checkShowBlankRow();
        this.previousRowIndex = null;
        this.modifiedVirtualRows = null;
        this.modifiedVirtualRowsJson = null;
        this.selectedRows = [];
        this.calcVirtualScrollHeight();
        this.calcVirtualScrollViewPort();
    }
    /**
     * @return {?}
     */
    get dataSource() {
        return this.virtualScroll === true ? this._virtualViewPort : this._dataSource;
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    set tableColumns(columns) {
        this.clearHeaderNodes();
        this.columns = this.toColumns(columns);
        if (this._isViewInit === true) {
            this.initPlugins();
        }
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set tableRowQuery(rows) {
        this.cleanUpChildNodes();
        this._tableRow = [];
        this.detectChanges();
        this._tableRow = rows.toArray();
    }
    /**
     * @return {?}
     */
    get tableRow() {
        return this._tableRow;
    }
    /**
     * @return {?}
     */
    get ROW_INDEX_KEY() {
        return '$$$$rowIndex$$$$';
    }
    /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    tableResize() {
        this.adjustTableFooter();
    }
    /**
     * Do check lifecycle
     * @return {?}
     */
    ngDoCheck() {
        if (this.dataSourceDiffer.diff(this._dataSource)) {
            if (this.virtualScroll === true) {
                this.calcVirtualScrollHeight();
                this.calcVirtualScrollViewPort(this.prevScrollTop);
            }
            this.checkShowBlankRow();
            this.markForCheck();
            this.refreshTableSorter();
        }
        else if (this.virtualScroll === true && this.virtualScrollDataSourceDiffer.diff(this._virtualViewPort)) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
        else {
            this.checkCustomRowsForChanged();
            this.checkColumnsForChanged();
        }
    }
    /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        /** @type {?} */
        const view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && this.columns != null) {
            this.columns.filter(col => col.id != null && col.id !== "").forEach(col => {
                if (view["_tableColumnsMap"] == null) {
                    view["_tableColumnsMap"] = new Map();
                }
                view["_tableColumnsMap"].set(KeyUtils.toMapKey(col.id), /** @type {?} */ (col));
            });
        }
        //droppable?
        if (this.droppable === true || this.droppable === "true") {
            $(this.tableContainer.nativeElement).droppable({
                classes: {
                    "ui-droppable-hover": "ui-state-hover"
                },
                hoverClass: "ui-state-hover",
                accept: "tr",
                drop: (event, ui) => {
                    this.onDragDrop.emit();
                },
                tolerance: "pointer"
            });
        }
        this.scrollSubcription = this.scrollSubject.pipe(debounce(() => timer(this.scrollTimeout))).subscribe((event) => {
            this.renderer.removeAttribute(this.ghostHeader.nativeElement, "display");
            /* istanbul ignore next */
            if (this.virtualScroll === true) {
                this.recalculateVirtualScrollData(event);
            }
            else {
                this.adjustTableHead(event);
            }
        });
        this.scrollContainerStyles = {
            "overflow-y": "auto",
            "overflow-x": "visible",
            "position": "relative"
        };
        /* istanbul ignore next */
        if (this.virtualScroll === true) {
            try {
                if (this.controlHeight == null || this.controlHeight == "100%")
                    this.clientHeightVirtualScroll = (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight;
                else
                    this.clientHeightVirtualScroll = parseInt(this.controlHeight);
                if (isNaN(this.clientHeightVirtualScroll) === false) {
                    this.recCalcNoVirtualRow();
                    this._isViewInit = true;
                }
            }
            catch (e) {
            }
            this.tableStyles = {
                "top": "0px",
                "left": "0px",
                "position": "absolute",
                "width": "100%",
                "height": "calc(100% - 17px)",
                "max-width": "100vw",
                "max-height": "100vh"
            };
            this.virtualScrollProgressStyles = {
                "top": "0px",
                "display": "none",
                "position": "absolute"
            };
            this.calcVirtualTablePosition(0);
        }
        /* istanbul ignore next */
        //fix expression has changed blah blah blah
        this.detectChanges();
        if (this.virtualScroll === true) {
            this.calcVirtualScrollHeight();
            this.calcVirtualScrollViewPort(0);
        }
        this.zone.runOutsideAngular(() => {
            this._isViewInit = true;
            this.initPlugins();
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.addEventListener('scroll', this.scrollHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                this.el.nativeElement.addEventListener("keyup", this.keyupHandler, true);
            });
        });
    }
    /**
     * @return {?}
     */
    initPlugins() {
        if (this.$dragableColumns) {
            this.$dragableColumns.destroy();
        }
        if (this.initTm != null) {
            clearTimeout(this.initTm);
        }
        // if (this.table) {
        this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
        this.initTm = setTimeout(() => {
            if (this.table) {
                this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
                // 再表示時にスクロールバーの位置を戻す
                this.tableContainer.nativeElement.scrollLeft = 0;
                /** @type {?} */
                const jQueryTable = jQuery(this.table.nativeElement);
                if (this.enableColumnDragging == null || this.enableColumnDragging === true) {
                    this.$dragableColumns = jQueryTable.dragableColumns({
                        dropCallback: (fromIndex, toIndex) => this.swapColumns(fromIndex, toIndex),
                        dragEndCallback: () => {
                            this.skipGhostHeader = false;
                            this.scrollContainerStyles["overflow-y"] = "auto";
                            this.detectChanges();
                            this._disabledScrolling = false;
                        },
                        dragStartCallback: (colIdx) => {
                            this.skipGhostHeader = true;
                            /** @type {?} */
                            let canDrag = this.canDragColumn(colIdx);
                            if (canDrag) {
                                this.scrollContainerStyles["overflow-y"] = "hidden";
                                this.detectChanges();
                                this._disabledScrolling = true;
                            }
                            return canDrag;
                        },
                        dragEnterCallback: (colIdx) => {
                            return this.canDragColumn(colIdx);
                        }
                    });
                }
                if ((this.enableSort == null || this.enableSort === true) && this.$tablesorter == null) {
                    if (this.virtualScroll !== true) {
                        this.$tablesorter = jQueryTable.tablesorter({
                            widgets: ['zebra', 'columns'],
                            usNumberFormat: false,
                            tabIndex: false,
                            sortReset: false,
                            sortRestart: true,
                            sortStable: true,
                            delayInit: true // move the initial performance hit to first sort so the table would load faster
                        });
                    }
                }
                else if (this.virtualScroll !== true && this.$tablesorter != null) {
                    this.$tablesorter.trigger("updateHeaders");
                }
                this.setHeaderWidthHeight();
                if (this.enableColumnResize == null || this.enableColumnResize === true) {
                    /** @type {?} */
                    let target_columns = new Array();
                    /** @type {?} */
                    let original_columnWidths = new Array();
                    for (let i = 0; i < this.columns.length; i++) {
                        /** @type {?} */
                        let column = this.columns.find((item, idx) => idx === i);
                        if (column != null) {
                            /** @type {?} */
                            const headChildren = this.tableHead.nativeElement.querySelector('th:nth-child(' + (i + 1) + ')');
                            target_columns.push(headChildren);
                            original_columnWidths.push(headChildren.style.width);
                        }
                    }
                    //reset
                    this._cleanupColResize();
                    this.$colResizable = jQueryTable.colResizable({
                        liveDrag: false,
                        //turning this on will incurred a severe performance penalty on IE so leave it off
                        resizeMode: 'overflow',
                        partialRefresh: true,
                        //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                        headerOnly: true //allow dragging using header only
                    });
                    for (let i = 0; i < target_columns.length; i++) {
                        /** @type {?} */
                        const targetColumn = target_columns[i];
                        /** @type {?} */
                        const headChildren_width = this.toWholeNumber(targetColumn.style.width.slice(0, -2));
                        /** @type {?} */
                        const originalChildren_width = this.toWholeNumber(original_columnWidths[i]);
                        // if(headChildren_width < originalChildren_width){
                        this.renderer.setStyle(targetColumn, "width", original_columnWidths[i]);
                        // }
                    }
                    target_columns = null;
                    original_columnWidths = null;
                }
                this.adjustTableFooter();
                this.renderer.setStyle(this.table.nativeElement, "table-layout", this.tableLayout);
            }
            if (this.table != null) {
                this.renderer.removeStyle(this.table.nativeElement, "visibility");
            }
        }, 200);
        //}
    }
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.cleanUpChildNodes(true);
        this.clearHeaderNodes(true);
        /** @type {?} */
        const view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && view["_tableColumnsMap"] != null) {
            view["_tableColumnsMap"].clear();
            view["_tableColumnsMap"] = null;
        }
        if (this._children != null) {
            this._children.clear();
        }
        this._children = null;
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
        }
        this._viewChildrenMap = null;
        if (this.scrollSubcription != null) {
            this.scrollSubcription.unsubscribe();
        }
        this.modifiedVirtualRows = null;
        this.modifiedVirtualRowsJson = null;
        this.scrollSubject = null;
        this.scrollSubcription = null;
        if (this.scrollHandler) {
            this.el.nativeElement.removeEventListener('scroll', this.scrollHandler, true);
            this.scrollHandler = null;
        }
        // if (this.mouseUpHandler) {
        //     this.el.nativeElement.removeEventListener("mouseup", this.mouseUpHandler, true);
        //     this.mouseUpHandler = null;
        // }
        if (this.keyupHandler) {
            this.table.nativeElement.removeEventListener("keyup", this.keyupHandler, true);
            this.keyupHandler = null;
        }
        if (this.$dragableColumns != null) {
            this.$dragableColumns.destroy();
        }
        // if (this.columnsChangeSubscription != null) {
        //     this.columnsChangeSubscription.unsubscribe();
        // }
        // this.columnsChangeSubscription = null;
        this.dataSourceDiffer = null;
        this.columnsDiffer = null;
        this.customRowDiffer = null;
        this.virtualScrollDataSourceDiffer = null;
        this.selectedRows = null;
        this.tableHead = null;
        this.tableWrapper = null;
        this.tableContainer = null;
        this.table = null;
        this.preMouseEvent = null;
        this.scrollContainerStyles = null;
    }
    /**
     * Check to see if columns have changes
     * @return {?}
     */
    checkColumnsForChanged() {
        if (this.columns != null && this.columnsDiffer.diff(this.columns.map(item => {
            return {
                visible: item.visible,
                header: item.header,
                controlWidth: item.controlWidth,
                locked: item.locked,
                enabled: item.enabled,
                sortable: item.sortable
            };
            // PK: DO NOT REMOVED
            // Comment this out for now and revert to previous, will bring this back
            // when we added a diff to check for changes in vt-row
            // return item.visible +
            //     item.header +
            //     item.controlWidth +
            //     item.locked +
            //     item.enabled +
            //     item.sortable;
        }))) {
            //this.cleanUpChildNodes();
            this.markForCheck();
            this.recCalcNoVirtualRow();
        }
    }
    /**
     * @return {?}
     */
    checkCustomRowsForChanged() {
        if (this._tableRow != null && this.customRowDiffer.diff(/** @type {?} */ (this._tableRow))) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
    }
    /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    clearHeaderNodes(nullOutHeadNode = false) {
        if (this.headNode != null) {
            if (this.headNode.childNodes != null && this.headNode.childNodes.length > 0) {
                for (let node of this.headNode.childNodes) {
                    /** @type {?} */
                    const parentView = this.getParentView();
                    if (parentView != null) {
                        parentView.removeViewChildFromMap(node.getId());
                    }
                    node.destroy();
                }
            }
            this.headNode.childNodes = [];
        }
        if (nullOutHeadNode === true) {
            this.headNode = null;
        }
    }
    /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    cleanUpChildNodes(skipTrackingVirtualRow = false) {
        if (this.nodes != null) {
            /** @type {?} */
            const parentView = this.getParentView();
            for (let node of this.nodes) {
                //cache modified data if virtual scroll
                if (skipTrackingVirtualRow !== true &&
                    node.getLocalName() === "row" &&
                    this.virtualScroll === true &&
                    this.modifiedVirtualRows != null &&
                    this.modifiedVirtualRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null) {
                    this._checkInitModifiedVirtualRowsJson();
                    this.modifiedVirtualRowsJson[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node.toJson();
                }
                //removed ourself from parent cache
                if (parentView != null) {
                    parentView.removeViewChildFromMap(node.getId());
                }
                node.destroy();
            }
        }
        this.nodes = [];
        if (this.virtualScroll !== true) {
            this.selectedRows = [];
        }
        this._prevSelectedRows = [];
        this.lastSelectedRowIndex = null;
    }
    /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    getRowCount() {
        return this._dataSource ? this._dataSource.length : 0;
    }
    /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    selectRow(row, isSelected) {
        /** @type {?} */
        let rowIndex = -1;
        if (this.virtualScroll === true) {
            /** @type {?} */
            const tempNode = find(this.nodes, (node) => {
                return node === row;
            });
            if (tempNode != null) {
                rowIndex = tempNode[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
        }
        else {
            rowIndex = findIndex(this.nodes, (node) => {
                return node === row;
            });
        }
        if (rowIndex >= 0 && rowIndex < this._dataSource.length) {
            /** @type {?} */
            let idx = findIndex(this.selectedRows, (row) => {
                return row === rowIndex;
            });
            if (isSelected) {
                //if it wasn't selected, add it in selectedRows.
                if (idx < 0) {
                    this.selectedRows.push(rowIndex);
                }
            }
            else {
                //if it was selected before, remove it from selectedRows.
                if (idx >= 0) {
                    this.selectedRows.splice(idx, 1);
                }
            }
        }
    }
    /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    onRowClick(event, rowIndex) {
        /** @type {?} */
        const parentView = this.getParentView();
        /* istanbul ignore if */
        if (parentView != null) {
            parentView.addViewChildToMap(this.nodes[rowIndex]);
            if (this.previousRowIndex != null && this.nodes[this.previousRowIndex] != null) {
                parentView.removeViewChildFromMap(this.nodes[this.previousRowIndex].getId());
            }
        }
        this.previousRowIndex = rowIndex;
        this.triggerStateChange();
    }
    /**
     * @return {?}
     */
    triggerStateChange() {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.getParentView() != null) {
            clientEvent.setParameter("screenId", this.getParentView().getId());
        }
        clientEvent.setParameter("id", this.getId());
        /** @type {?} */
        let rowId = this.selectedRows.map(idx => this.getChildByOriginalRowIndex(idx).getId()).join(",");
        clientEvent.setParameter("rowId", rowId);
        this.getSession().getEventHandler().setClientEvent(clientEvent);
        this.onStateChange.emit();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getChildByOriginalRowIndex(index) {
        /** @type {?} */
        let node = this.nodes[index];
        if (this.virtualScroll === true) {
            node = find(this.nodes, (el) => {
                return el[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === index;
            });
        }
        return node;
    }
    /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    handleMouseUp(event, rowIndex, row) {
        //for draggale rows, we need to double check row selection again
        if (this.draggableRows === true && this.shouldHandleMouseUp === true) {
            this.toggleRowSelection(event, rowIndex, row, true);
        }
        this.shouldHandleMouseUp = false;
    }
    /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    toggleRowSelection(event, rowIndex, row, isMouseUp = false) {
        /** @type {?} */
        const targetEl = /** @type {?} */ (event.target);
        if (targetEl.tagName.toLowerCase() == 'input' && targetEl.getAttribute('type') != null) {
            if (targetEl.getAttribute('type').toLowerCase() == 'radio') {
                return;
            }
        }
        if (targetEl.tagName.toLowerCase() == 'button') {
            return;
        }
        /** @type {?} */
        let actualRowIndex = rowIndex;
        //prevent text selection when shiftKey is pressed
        if (event.shiftKey === true && event.preventDefault) {
            event.preventDefault();
        }
        if (this.selectionMode !== "none") {
            if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
                actualRowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
            //if user is not pressing shift key, clear all previous selection
            if (event.shiftKey !== true && event.ctrlKey !== true && event.buttons !== 2) {
                /** @type {?} */
                let clearSelection = true;
                if (this.draggableRows === true && isMouseUp !== true && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                    clearSelection = false;
                    this.shouldHandleMouseUp = true;
                }
                if (clearSelection) {
                    this.selectedRows.splice(0, this.selectedRows.length);
                }
            }
            /** @type {?} */
            let idx = findIndex(this.selectedRows, (row) => {
                return row === actualRowIndex;
            });
            if (idx < 0) {
                //if multi row and user is pressing shift/ctrl key, allow multi row selection
                if (this.selectionMode === "multiRow" && (event.shiftKey || event.ctrlKey)) {
                    if (event.ctrlKey) {
                        this.selectedRows.push(actualRowIndex);
                    }
                    else if (event.shiftKey) {
                        if (this.lastSelectedRowIndex >= 0) {
                            if (this.lastSelectedRowIndex > rowIndex) {
                                for (let i = rowIndex; i < this.lastSelectedRowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else if (this.lastSelectedRowIndex < rowIndex) {
                                for (let i = this.lastSelectedRowIndex + 1; i <= rowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else {
                                this.selectedRows.push(actualRowIndex);
                            }
                        }
                        else {
                            this.selectedRows.push(actualRowIndex);
                        }
                    }
                }
                else {
                    this.selectedRows = [actualRowIndex];
                }
            }
            else if (event.ctrlKey === true && idx >= 0 && event.buttons !== 2) {
                //if control key is pressed (and not right click), remove the selected row
                this.selectedRows.splice(idx, 1);
            }
            this.detectChanges();
            this.lastSelectedRowIndex = rowIndex;
        }
        this.triggerStateChange();
    }
    /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    getOriginalIndex(index) {
        if (this.virtualScroll === true && this.nodes[index] != null) {
            return this.nodes[index][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return index;
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
    }
    /**
     * Get [[disabled]] property value
     * @return {?}
     */
    getDisabled() {
        return this.disabled;
    }
    /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    getSelectedRows() {
        /** @type {?} */
        const selectedRowElements = [];
        /* istanbul ignore if */
        if (this.selectedRows.length > 0 && this.nodes != null && this.nodes.length > 0) {
            for (let rowIndex of this.selectedRows) {
                for (let node of this.nodes) {
                    if (node.getLocalName() === "row" && node.rowNumber === rowIndex) {
                        selectedRowElements.push(node);
                        break;
                    }
                }
            }
        }
        return selectedRowElements;
    }
    /**
     * Get collection of selected row indexes
     * @return {?}
     */
    getSelectedRowIndexes() {
        return this.selectedRows.map(row => {
            return row[this.ROW_INDEX_KEY];
        });
    }
    /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    handleRowSelection(event) {
        /* istanbul ignore next */
        if (!isEqual(event.selected, this._prevSelectedRows)) {
            this.onChange.emit(new TableSelectionEvent(event.selected));
        }
        this._prevSelectedRows = event.selected;
    }
    /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    handleCellActivation(event) {
        if (event.type === 'dblclick') {
            this.onDoubleClick.emit(new TableSelectionEvent(event.row));
        }
    }
    /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    appendRowIndexToRow(row, rowIndex) {
        row[this.ROW_INDEX_KEY] = rowIndex;
    }
    /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    refresh(clearData = false) {
        if (clearData == true) {
            this._dataSource = [];
        }
        this.detectChanges();
    }
    /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    getChangeDetector() {
        return this.changeDetectorRef;
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "table";
    }
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        // if (this.getSelectedRows() != null && this.getSelectedRows().length > 0) {
        //     this.setJson(json, "selectedRows", this.getSelectedRows().map(item=>item.toJson()));
        // }
        if (this.nodes != null &&
            this.nodes.length > 0) {
            /** @type {?} */
            let tempRows;
            if (this.virtualScroll === true) {
                tempRows = {};
            }
            json["rows"] = this.nodes.map((node, index) => {
                /** @type {?} */
                const rowJson = node.toJson();
                if (this.selectedRows != null && this.selectedRows.indexOf(index) >= 0) {
                    rowJson["selected"] = "true";
                    rowJson["index"] = index + "";
                }
                if (this.virtualScroll === true) {
                    tempRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                }
                return rowJson;
            });
            //virtual scroll data
            if (this.virtualScroll === true && this.modifiedVirtualRowsJson != null) {
                /** @type {?} */
                const keys$$1 = keys(this.modifiedVirtualRowsJson);
                for (const key of keys$$1) {
                    //make sure we not already converted them
                    if (tempRows[key] == null) {
                        json["rows"].push(this.modifiedVirtualRowsJson[key]);
                    }
                }
            }
        }
        if (this.columns != null && this.columns.length > 0) {
            /** @type {?} */
            let columns = this.columns;
            if (this.getLocalName() === "table" &&
                this.columnsHasBeenSwapped === true) {
                columns = /** @type {?} */ (orderBy(columns, (child) => {
                    return child.originalColumnIndex;
                }));
            }
            json["columnDefs"] = columns.map((column, index) => {
                /** @type {?} */
                const def = {
                    "visible": this.toJsonValue(column.visible),
                    "locked": this.toJsonValue(column.locked),
                    "enabled": this.toJsonValue(column.enabled),
                    "sortable": this.toJsonValue(column.sortable),
                    "isChecked": this.toJsonValue(column.isChecked),
                    "customAttributes": BaseComponent.mapToJson(column.customAttributes)
                };
                // make sure customAttributes has 'width' property
                if (def["customAttributes"]["width"] != null) {
                    /** @type {?} */
                    const node = this.headNode.getChildAt(index);
                    /** @type {?} */
                    const width = this.toWholeNumber(node.htmlElement.style.width.slice(0, -2)); //server expect whole number
                    def["customAttributes"]["width"] = this.toJsonValue(width);
                }
                if (column.id) {
                    def["id"] = this.toJsonValue(column.id);
                }
                else {
                    def["id"] = BaseComponent.generateUniqueId("column");
                }
                if (column.locked === true) {
                    def["tagName"] = "lockedColumn";
                    def["nxTagName"] = "lockedColumn";
                }
                else {
                    def["tagName"] = "column";
                    def["nxTagName"] = "column";
                }
                /** @type {?} */
                const header = {
                    "tagName": "header",
                    "nxTagName": "header",
                    "text": this.toJsonValue(column.header)
                };
                if (column.headerDirective && column.headerDirective.id) {
                    header["id"] = this.toJsonValue(column.headerDirective.id);
                }
                else {
                    header["id"] = BaseComponent.generateUniqueId("header");
                }
                def["children"] = [header];
                return def;
            });
        }
        return json;
    }
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    childToJson(child) {
        return child.getTagName() === "headrow" || child.getTagName() === "headcell" ? child.toJson() : null;
    }
    /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    registerFauxElement(type, event, rowOrColumnIndex, rowDataOrColumnDef) {
        this._isHeaderCell = false;
        if (rowDataOrColumnDef === null ||
            (rowDataOrColumnDef !== undefined &&
                rowDataOrColumnDef !== null &&
                rowDataOrColumnDef.skipTracking !== true)) {
            if (type === "row") {
                this.trackRow(event, rowOrColumnIndex, rowDataOrColumnDef);
            }
            else if (type === "cell") {
                this.trackCell(event, rowOrColumnIndex, rowDataOrColumnDef);
            }
            else if (type === "headcell") {
                this._isHeaderCell = true;
                this.trackHeadCell(event, rowDataOrColumnDef);
                if (rowOrColumnIndex === this.columns.length - 1) {
                    this.initPlugins();
                }
            }
        }
    }
    /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    getTableChildren() {
        return this.nodes;
    }
    /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    getChildCount() {
        return this.nodes != null ? this.nodes.length : 0;
    }
    /**
     * Get all children of this table
     * @return {?} List of children
     */
    getChildren() {
        /** @type {?} */
        const children = new Vector();
        forEach(this.getTableChildren(), (child) => children.add(child));
        return children;
    }
    /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        /** @type {?} */
        const result = new Vector();
        /** @type {?} */
        const xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            let node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    }
    /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    appendChild(childOrArrayOrStringWtf, rowNumber = -1) {
        //TODO need to append child to certain row? dpending on childOrArrayOrStringWtf
    }
    /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    isSelectedRow(rowIndex, row) {
        if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
            rowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return this.selectedRows != null && this.selectedRows.indexOf(rowIndex) >= 0;
    }
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    getRowCustomAttributes(row, rowOrColumnIndex) {
        if (typeof this.rowCustomAttributeBuilder === "function") {
            return this.rowCustomAttributeBuilder(row, rowOrColumnIndex, /** @type {?} */ ((this._getNoneActiveViewParent() || this.getParentView())));
        }
        if (row != null && row.customAttributes) {
            return row.customAttributes;
        }
        return null;
    }
    /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    isColumnVisible(index, column = null) {
        if (column != null) {
            return column.visible;
        }
        return this.columns.find((item, idx) => idx === index).visible;
    }
    /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    addChild(child) {
        super.addChild(child);
        /** @type {?} */
        const row = this.nodes[this.nodes.length - 1];
        if (this._isHeaderCell !== true && row) {
            child.tableRowNo = row.rowNumber;
            row.parentTableId = this.id;
            row.parentTable = this;
            //when we get here row.childNodes[currentLength] should be the cell parent row
            //append child component to cell (for dynamic)
            if (row.childNodes[row.childNodes.length - 1] == null) {
                console.error("TableComponent: Unable to register element to cell of current row (cell is null)");
            }
            else {
                child.setAttribute("isLockedColumn", row.childNodes[row.childNodes.length - 1].getAttribute("isLockedColumn", true));
                row.childNodes[row.childNodes.length - 1].setComponent(child, true);
                //sophia #1728: restricted right click
                if (this.restrictCellPopup === true) {
                    child.skipEmitContextMenuEvent = true;
                }
                if (this.virtualScroll !== true) {
                    /** @type {?} */
                    const sortValue = child.getAttribute("sortValue", true);
                    if (sortValue != null) {
                        this.renderer.setAttribute(row.childNodes[row.childNodes.length - 1].htmlElement, "data-text", sortValue);
                    }
                }
                //track change if virtual scroll
                /* istanbul ignore if */
                if (this.virtualScroll === true &&
                    (child instanceof CheckboxComponent ||
                        child instanceof RadioButtonComponent ||
                        child instanceof TextFieldComponent ||
                        child instanceof ComboBoxComponent)) {
                    /** @type {?} */
                    const columnIdx = row.childNodes.length - 1;
                    //has cached data?
                    if (this.modifiedVirtualRows != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] != null) {
                        /** @type {?} */
                        const temp = this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]];
                        if (temp.text !== undefined) {
                            (/** @type {?} */ (child)).setText(temp.text);
                        }
                        (/** @type {?} */ (child)).setChecked(temp.checked, true);
                    }
                    child._internalChangeCb = (comp) => {
                        this._checkInitModifiedVirtualRows();
                        if (this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] = {
                            text: comp.getText(),
                            checked: comp.getChecked()
                        };
                    };
                }
            }
        }
        else if (this.headNode != null) {
            //skip emiting event so we can emit ourself.
            child.skipEmitContextMenuEvent = true;
            child.tableRowNo = -1;
            this.headNode.parentTableId = this.id;
            this.headNode.parentTable = this;
            this.headNode.childNodes[this.headNode.childNodes.length - 1].setComponent(child);
        }
    }
    /**
     * 選択中の行を削除する
     * @return {?}
     */
    removeSelectedRow() {
        if (this.selectedRows.length > 0) {
            /** @type {?} */
            let selected = this.selectedRows.concat().sort(function (v1, v2) { return v2 - v1; });
            for (let idx of selected) {
                /** @type {?} */
                let child = this.nodes[idx];
                for (let target of child.childNodes) {
                    this.removeChild(target.getComponent());
                }
                child.destroy();
                this.nodes.splice(idx, 1);
                this.dataSource.splice(idx, 1);
            }
            /** @type {?} */
            let rowNumber = 0;
            for (let row of this.nodes) {
                row.rowNumber = rowNumber++;
            }
            this.selectedRows = [];
        }
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
    /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    trackRow(event, rowOrColumnIndex, rowData) {
        /** @type {?} */
        const row = new HTMLElementWrapper(this.renderer, "", this.getSession());
        row.rowNumber = rowOrColumnIndex;
        row.htmlElement = /** @type {?} */ (event.element.nativeElement);
        this.setParentScreenId(row);
        row.setLocaleName("row");
        /** @type {?} */
        const customAttributes = this.getRowCustomAttributes(rowData, rowOrColumnIndex);
        if (customAttributes != null && customAttributes !== "") {
            row.appendCustomAttributes(customAttributes);
        }
        if (rowData != null && rowData.id != null) {
            row.setAttribute("id", rowData.id);
        }
        if (this.virtualScroll === true && rowData != null) {
            row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        this.trackNode(row);
        //draggable row
        if (row.isDraggable()) {
            row.applyDraggable();
            this.draggableRows = true;
        }
    }
    /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    toRowIndex(rowIndex, rowData) {
        return this.virtualScroll === true && rowData != null ? rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] : rowIndex;
    }
    /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    trackCell(event, columnIndex, columnDef) {
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("cell");
        if (columnDef.customAttributes !== undefined) {
            if (!cell.getAttribute("class")) {
                cell.setAttribute("class", columnDef.customAttributes["class"]);
            }
            else {
                /** @type {?} */
                let orgClass = cell.getAttribute("class");
                cell.setAttribute("class", orgClass + " " + columnDef.customAttributes["class"]);
            }
        }
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        this.setParentScreenId(cell);
        //track original column index for sorting
        if (columnDef.originalColumnIndex == null) {
            columnDef.originalColumnIndex = columnIndex;
        }
        cell["originalColumnIndex"] = columnDef.originalColumnIndex;
        //add cell to current row
        if (this.nodes[this.nodes.length - 1] !== undefined && this.nodes[this.nodes.length - 1] !== null) {
            this.nodes[this.nodes.length - 1].appendChild(cell, false);
        }
    }
    /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    trackHeadCell(event, columnDef) {
        if (this.headNode == null) {
            this.headNode = new HTMLElementWrapper(this.renderer, "", this.getSession());
            this.headNode.rowNumber = -1;
            this.setParentScreenId(this.headNode);
            this.headNode.setLocaleName("headrow");
        }
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("headcell");
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        cell.customData = columnDef;
        this.setParentScreenId(cell);
        this.headNode.appendChild(cell);
    }
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    trackNode(node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    }
    /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    setParentScreenId(el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    }
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    rowStyleClass(row) {
        if (typeof this.rowStyleFn === "function") {
            return this.rowStyleFn(row);
        }
        return "";
    }
    /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    getChildNodeById(id) {
        return this.nodes != null ? this.nodes.find(child => child.id === id) : null;
    }
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    handleColumnOnContextMenu(column, rowNumber, columnIndex, event) {
        if (this.nodes != null && this.nodes[rowNumber] != null) {
            /** @type {?} */
            const childColumn = this.nodes[rowNumber].getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                //sophia #1728
                if (this.restrictCellPopup !== true) {
                    childColumn.component.handleOnContextMenu(event);
                }
                else if (this.restrictCellPopup === true) {
                    if (childColumn.component.popup != null && childColumn.component.popup !== "") {
                        childColumn.component.handleOnContextMenu(event, true);
                    }
                    else {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
            else if (column != null) {
                if (this.getSession() != null) {
                    this.getSession().setMousePosition(event);
                }
                /** @type {?} */
                const parentView = this.getParentView();
                /** @type {?} */
                let popupMenuId = null;
                if (parentView != null) {
                    popupMenuId = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
                }
                if (typeof column.onContextMenuCb === "function") {
                    column.onContextMenuCb(this._getNoneActiveViewParent() || this.getParentView());
                }
                if (popupMenuId != null) {
                    event.stopPropagation();
                    event.preventDefault();
                    /** @type {?} */
                    const tm = setTimeout(() => {
                        clearTimeout(tm);
                        if (this.getSession()._currentPopupMenuId != null) {
                            popupMenuId = this.getSession()._currentPopupMenuId;
                        }
                        this.getSession().showContextMenu(popupMenuId);
                        this.getSession()._currentPopupMenuId = null;
                    });
                }
            }
        }
    }
    /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    handleHeaderOnContextMenu(columnIndex, event) {
        /* istanbul ignore if */
        if (this.headNode != null) {
            /** @type {?} */
            const childColumn = this.headNode.getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                /** @type {?} */
                const clientEvent = new ClientEvent(childColumn, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(childColumn, clientEvent);
                }
                if (this.getParentView() != null) {
                    clientEvent.setParameter("screenId", this.getParentView().getId());
                }
                clientEvent.setParameter("id", this.getId());
                this.getSession().getEventHandler().setClientEvent(clientEvent);
                childColumn.component.handleOnContextMenu(event, true);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    recalculateVirtualScrollData(event) {
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
            /** @type {?} */
            let scrollTop = event.srcElement.scrollTop;
            //adjust only on IE9, otherwise, it will stuck in inf loop
            if (this.isIE9 === true) {
                scrollTop -= 0.5;
            }
            if (this.scrollLeft === event.srcElement.scrollLeft) {
                this.calcVirtualScrollViewPort(scrollTop);
                this.detectChanges();
            }
            this.adjustTableHead(event);
        }
    }
    /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    adjustTableHead(event, skipBodyAdjustment = false, skipHeader = false) {
        if (this.table == null || event == null)
            return;
        this.preMouseEvent = event;
        /** @type {?} */
        let scrollTop = event.srcElement.scrollTop;
        //adjust only on IE9, otherwise, it will stuck in inf loop
        if (this.isIE9 === true) {
            scrollTop -= 0.5;
        }
        this.scrollLeft = event.srcElement.scrollLeft;
        if (this.virtualScroll === true) {
            // if (event.srcElement.scrollTop > this.maxScrollTop) {
            //     scrollTop = this.maxScrollTop;
            // }
            //this.calcVirtualScrollViewPort(scrollTop);
            if (this.prevScrollTopForHiddenHeader !== scrollTop && skipHeader === true) {
                scrollTop -= this.theadHeight;
            }
            this.prevScrollTopForHiddenHeader = scrollTop;
            this._disabledScrolling = true;
            this.calcVirtualTablePosition(scrollTop);
            setTimeout(() => {
                this._disabledScrolling = false;
            }, 100);
        }
        if (skipHeader !== true) {
            //   this.fakeTable.nativeElement.innerHTML = "";
            //   this.isHeaderAppendToFakeTable = false;
            this.renderer.removeStyle(this.tableHead.nativeElement, "visibility");
            if (this.tableFoot != null) {
                this.renderer.removeStyle(this.tableFoot.nativeElement, "visibility");
            }
            this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "none");
            /** @type {?} */
            const table = this.table.nativeElement;
            /** @type {?} */
            const thead = table.querySelector('thead');
            /** @type {?} */
            const tbody = table.querySelector('tbody');
            for (let i = 0; i < this.columns.length; i++) {
                /** @type {?} */
                let column = this.columns.find((item, idx) => idx === i);
                if (column != null && column.visible && column.locked) {
                    /** @type {?} */
                    const headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    let trans = `translate(${this.scrollLeft}px, ${scrollTop}px)`;
                    if (this.virtualScroll === true) {
                        trans = `translateX(${this.scrollLeft}px)`;
                    }
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                    if (skipBodyAdjustment !== true) {
                        /** @type {?} */
                        const bodyChildren = $(tbody.querySelectorAll('td:nth-child(' + (i + 1) + ')'));
                        bodyChildren.css("transform", `translate(${this.scrollLeft}px`);
                        bodyChildren.css("-ms-transform", `translate(${this.scrollLeft}px`);
                    }
                }
                else if (column != null && column.visible && this.virtualScroll !== true) {
                    /** @type {?} */
                    const headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    const trans = `translateY(${scrollTop}px)`;
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                }
            }
            this.adjustTableFooter();
        }
    }
    /**
     * Set table footer styles for proper display
     * @return {?}
     */
    adjustTableFooter() {
        /* istanbul ignore if */
        if (this.table == null)
            return;
        /** @type {?} */
        const tfoot = this.table.nativeElement.querySelector("tfoot");
        /* istanbul ignore if */
        if (tfoot != null) {
            /** @type {?} */
            let tfootPos = 0;
            if ($(this.table.nativeElement).height() < $(this.tableContainer.nativeElement).height()) {
                tfootPos = $(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height();
            }
            else {
                tfootPos = ($(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height()) + this.tableContainer.nativeElement.scrollTop;
            }
            for (let i = 0; i < this.columns.length; i++) {
                /** @type {?} */
                let column = this.columns.find((item, idx) => idx === i);
                if (column != null) {
                    /** @type {?} */
                    const footChildren = $(tfoot.querySelector('td:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    const trans = `translateY(${tfootPos}px)`;
                    footChildren.css("transform", trans);
                    footChildren.css("-ms-transform", trans);
                    footChildren.css("position", "relative");
                    footChildren.css("z-index", "3");
                }
            }
        }
    }
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    handleKeyUp(event) {
        if (event.ctrlKey === true &&
            (event.code === "KeyC" ||
                event.keyCode === 67 ||
                event.keyCode === 99)) {
            // istanbul ignore next
            this.copySelectedRowAsText();
        }
    }
    /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    copySelectedRowAsText() {
        /* istanbul ignore if */
        if (this.selectedRows != null && this.selectedRows.length === 1) {
            /** @type {?} */
            let selectedRowText;
            /** @type {?} */
            const selectedRow = this.getSelectedRows()[0];
            /* istanbul ignore if */
            if (selectedRow.childNodes != null && selectedRow.childNodes.length > 0) {
                selectedRowText = selectedRow.childNodes.map(child => child.getText());
            }
            else if (selectedRow.dynamicChildNodes != null && selectedRow.dynamicChildNodes.length > 0) {
                selectedRowText = selectedRow.dynamicChildNodes.map(child => child.getText());
            }
            /* istanbul ignore if */
            if (selectedRowText != null && selectedRowText.length > 0) {
                this.clipboardService.copy(selectedRowText.join(String.fromCharCode(9)));
            }
        }
    }
    /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    buildRowId(row, rowIndex) {
        if (typeof this.rowIdBuilder === "function") {
            return this.rowIdBuilder(row, rowIndex);
        }
        return ['row', this.id, rowIndex].join('-');
    }
    /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    handleSort(column) {
        //sorting is only allowed on a non locking column
        /* istanbul ignore if */
        if (this.virtualScroll === true && column.locked !== true) {
            //find previous sort direction for the column
            this.columns.forEach(col => {
                //using originalColumnIndex b/c use can drag column around and thus column index changed
                if (col.originalColumnIndex !== column.originalColumnIndex) {
                    col.sortDirection = null;
                }
            });
            if (column.sortDirection === "asc") {
                column.sortDirection = "desc";
            }
            else {
                column.sortDirection = "asc";
            }
            /** @type {?} */
            let sortColumnId = this.virtualScrollSortKeys[column.originalColumnIndex];
            //if custom sortn fn is provided, used to find proper column to sort
            if (typeof this.virtualScrollSortFn === "function") {
                sortColumnId = this.virtualScrollSortFn(this._getNoneActiveViewParent() || this.getParentView(), column.originalColumnIndex);
            }
            if (sortColumnId != null) {
                this._dataSource = orderBy(this._dataSource, [sortColumnId], /** @type {?} */ ([column.sortDirection]));
            }
            this.calcVirtualScrollViewPort(this.prevScrollTop);
            this.detectChanges();
        }
        else if (this.virtualScroll !== true && column.locked !== true) {
            // RXC Add
            if (this.sortDirection === "") {
                this.sortDirection = "asc";
            }
            else if (this.sortColumnId === column.originalColumnIndex) {
                if (this.sortDirection === "asc") {
                    this.sortDirection = "desc";
                }
                else {
                    this.sortDirection = "asc";
                }
            }
            else {
                this.sortDirection = "asc";
            }
            this.sortColumnId = column.originalColumnIndex;
        }
    }
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    calcVirtualScrollHeight() {
        // istanbul ignore if
        if (this.virtualScroll === true) {
            if (this._dataSource != null && this._dataSource.length > 0) {
                //scroll height = 10px * # rows (10px is the height of each row)
                this._virtualScrollDivHeight = (this.rowHeight * this._dataSource.length);
                this.maxScrollTop = this._virtualScrollDivHeight;
                this.virtualScrollSortKeys = keys(this._dataSource[0]);
                //track original index
                if (typeof this._dataSource[this._dataSource.length - 1][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] !== "number") {
                    forEach(this._dataSource, (item, index) => {
                        item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = index;
                    });
                }
            }
            else {
                this._virtualScrollDivHeight = 0;
            }
            this.markForCheck();
        }
    }
    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    calcVirtualTablePosition(scrollTop) {
        if (this.virtualScroll === true) {
            //-ms-transform
            //transform
            // if (this.maxScrollTop > 0) {
            //     scrollTop = Math.min(scrollTop, this.maxScrollTop);
            // }
            this.renderer.setStyle(this.tableWrapper.nativeElement, "transform", `translateY(${scrollTop}px)`);
            this.renderer.setStyle(this.tableWrapper.nativeElement, "-ms-transform", `translateY(${scrollTop}px)`);
            // this.markForCheck();
        }
    }
    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    calcVirtualScrollViewPort(scrollTop = 0) {
        if (this._isViewInit === true && this._dataSource != null) {
            /** @type {?} */
            let startIdx = 0;
            //if scrollTop is greater than 0, need to figure the starting row
            if (scrollTop > 0) {
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                startIdx = Math.floor(scrollTop / this.rowHeight);
                if (startIdx > this._dataSource.length - this._virtualScrollRowPerView) {
                    startIdx = this._dataSource.length - this._virtualScrollRowPerView;
                }
            }
            this._virtualViewPort = null;
            this.prevScrollTop = scrollTop;
            this.cleanUpChildNodes();
            this.detectChanges();
            this.zone.run(() => {
                this._virtualViewPort = this.buildRowIdentity(this._dataSource.slice(startIdx, startIdx + this._virtualScrollRowPerView + this.adjustedRows));
            });
        }
    }
    /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    _swap(fromIndex, toIndex) {
        /** @type {?} */
        const tempToColumn = this.columns[toIndex];
        this.columns[toIndex] = this.columns[fromIndex];
        this.columns[fromIndex] = tempToColumn;
    }
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    swapColumns(fromIndex, toIndex) {
        //sophia 1856: need to properly swap columns
        if (fromIndex < toIndex) {
            for (let i = fromIndex; i < toIndex; i++) {
                this._swap(i, i + 1);
            }
        }
        else if (fromIndex > toIndex) {
            for (let i = fromIndex; i > toIndex; i--) {
                this._swap(i, i - 1);
            }
        }
        if (this.scrollContainerStyles != null) {
            this.scrollContainerStyles["overflow-y"] = "auto";
            this.detectChanges();
        }
        //sophia 1823: for server tracking
        forEach(this.columns, (col, idx) => {
            col.setAttribute("visualIndex", idx + "");
        });
        if (this.virtualScroll !== true) {
            this.detectChanges();
            setTimeout(() => {
                this.applyResizeColumns();
            }, 200);
        }
        this.columnsHasBeenSwapped = true;
    }
    /**
     * @return {?}
     */
    _cleanupColResize() {
        //reset
        this.$colResizable = $(this.table.nativeElement).colResizable({
            disable: true
        });
        $(`#${this.id} .JCLRgrips`).remove();
    }
    /**
     * @return {?}
     */
    applyResizeColumns() {
        if (this.table != null && (this.enableColumnResize == null || this.enableColumnResize === true)) {
            this._cleanupColResize();
            this.$colResizable = $(this.table.nativeElement).colResizable({
                liveDrag: false,
                //turning this on will incurred a severe performance penalty on IE so leave it off
                resizeMode: 'overflow',
                partialRefresh: true,
                //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                headerOnly: true //allow dragging using header only
            });
        }
    }
    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    canDragColumn(colIdx) {
        /** @type {?} */
        let canDrag = true;
        for (let col of this.columns) {
            if (col.originalColumnIndex === colIdx && col.locked === true) {
                canDrag = false;
                break;
            }
        }
        return canDrag;
    }
    /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    indexOfChild(child) {
        if (this.nodes != null && this.nodes.length > 0) {
            return findIndex(this.nodes, (node) => node === child);
        }
        //child does not exists
        return -1;
    }
    /**
     * @return {?}
     */
    _checkInitModifiedVirtualRows() {
        if (this.modifiedVirtualRows == null) {
            this.modifiedVirtualRows = {};
        }
    }
    /**
     * @return {?}
     */
    _checkInitModifiedVirtualRowsJson() {
        if (this.modifiedVirtualRowsJson == null) {
            this.modifiedVirtualRowsJson = {};
        }
    }
    /**
     * Refresh the table sorter
     * @return {?}
     */
    refreshTableSorter() {
        //data changes, need to update tableSorter
        if (this._tableSorterRefreshTm != null) {
            clearTimeout(this._tableSorterRefreshTm);
            this._tableSorterRefreshTm = null;
        }
        this.zone.runOutsideAngular(() => {
            this._tableSorterRefreshTm = setTimeout(() => {
                clearTimeout(this._tableSorterRefreshTm);
                this._tableSorterRefreshTm = null;
                if (this.$tablesorter != null) {
                    this.$tablesorter.trigger("update");
                }
                this.adjustTableHead(this.preMouseEvent);
            }, 200);
        });
    }
    /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    refreshTableSorterCache() {
        //data changes, need to update tableSorter
        if (this._tableSorterCacheRefreshTm != null) {
            clearTimeout(this._tableSorterCacheRefreshTm);
            this._tableSorterCacheRefreshTm = null;
        }
        this.zone.runOutsideAngular(() => {
            this._tableSorterCacheRefreshTm = setTimeout(() => {
                clearTimeout(this._tableSorterCacheRefreshTm);
                this._tableSorterCacheRefreshTm = null;
                if (this.$tablesorter != null) {
                    this.$tablesorter.trigger("updateCache");
                }
            }, 200);
        });
    }
    /**
     * @param {?} shouldSelected
     * @return {?}
     */
    setSelectAllVirtualRows(shouldSelected) {
        if (shouldSelected !== true) {
            this.modifiedVirtualRows = {};
            this.modifiedVirtualRowsJson = {};
            this.selectedRows = [];
        }
        else {
            this._checkInitModifiedVirtualRows();
            this._checkInitModifiedVirtualRowsJson();
            /** @type {?} */
            const checkBoxeColumnIdxs = [];
            if (this.nodes != null && this.nodes.length > 0) {
                //find all checkboxes columns
                for (let i = 0; i < this.nodes[0].childNodes.length; i++) {
                    if (this.nodes[0].childNodes[i].component instanceof CheckboxComponent) {
                        checkBoxeColumnIdxs.push(i);
                    }
                }
            }
            //if there are checkboxes, check them
            this.lastSelectedRowIndex = 0;
            if (checkBoxeColumnIdxs.length > 0) {
                for (let row of this._dataSource) {
                    //make sure row is not visible
                    if (findIndex(this.nodes, (node) => {
                        return node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                    }) < 0) {
                        if (this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        for (let colIdx of checkBoxeColumnIdxs) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][colIdx] = {
                                checked: true,
                                text: undefined
                            };
                        }
                        //this.modifiedVirtualRowsJson []
                        if (typeof this.virtualScrollInvisibleRowBuilder === "function") {
                            /** @type {?} */
                            const rowElement = this.virtualScrollInvisibleRowBuilder(this._getNoneActiveViewParent() || this.getParentView(), row);
                            rowElement.setAttribute("selected", "true");
                            this.modifiedVirtualRowsJson[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = rowElement.toJson();
                        }
                        //selected the row
                        if (this.selectedRows == null) {
                            this.selectedRows = [];
                        }
                        this.selectedRows.push(row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]);
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    recCalcNoVirtualRow() {
        if (this.virtualScroll === true) {
            /** @type {?} */
            let height = $(this.tableContainer.nativeElement).height();
            if (this.tableHead != null) {
                this.theadHeight = $(this.tableHead.nativeElement).height();
                height = height - this.theadHeight;
                if (this.skipRowsAdjustment !== true) {
                    this.adjustedRows = Math.round(this.theadHeight / this.rowHeight) + 2;
                }
            }
            this._virtualScrollRowPerView = Math.round(height / this.rowHeight);
        }
    }
    /**
     * @return {?}
     */
    setHeaderWidthHeight() {
        /** @type {?} */
        const table = this.table.nativeElement;
        /** @type {?} */
        const thead = table.querySelector('thead');
        /** @type {?} */
        let headerMaxHeight = 0;
        /** @type {?} */
        var id = table.id;
        if (this.columns != null) {
            if (this.forceFixWidth) {
                //please do not removed our code
                //this.renderer.setStyle(this.table.nativeElement, "table-layout", "fixed");
                for (let i = 0; i < this.columns.length; i++) {
                    /** @type {?} */
                    let column = this.columns.find((item, idx) => idx === i);
                    if (column != null) {
                        /** @type {?} */
                        const headChildren = thead.querySelector('th:nth-child(' + (i + 1) + ')');
                        this.renderer.setStyle(headChildren, "width", `${column.controlWidth}px`);
                        if (column.controlHeight !== undefined) {
                            this.isHeaderAuto = true;
                            if (headerMaxHeight < column.controlHeight) {
                                headerMaxHeight = Number(column.controlHeight);
                            }
                        }
                    }
                }
                if (this.isHeaderAuto) {
                    $("#" + id + ">div>div>table").removeClass("header-fixed");
                }
            }
            /*else{
                            for(let i = 0; i < this.columns.length; i++){
                                let column = this.columns.find((item, idx)=>idx === i);
                                if(column != null)
                                {
                                    const headChildren = thead.querySelector('th:nth-child(' + (i+1) + ')');
                                    this.renderer.setStyle(headChildren, "min-width", `${column.controlWidth}px`);
                                }
                            }
                        }*/
        }
        if (this.ghostHeader != null) {
            if (headerMaxHeight == 0) {
                headerMaxHeight = 30;
            }
            this.renderer.setStyle(this.ghostHeader.nativeElement, "height", headerMaxHeight + "px");
        }
    }
    /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    resetTableColumns() {
        if (this.forceResetColumns === true &&
            this._isDying !== true &&
            this.columns != null &&
            this.columnsHasBeenSwapped === true) {
            this.columnsHasBeenSwapped = false;
            /** @type {?} */
            const temp = clone(this.columns);
            this.columns = [];
            this.detectChanges();
            if (this.headNode != null) {
                this.headNode.childNodes = [];
            }
            this.columns = sortBy(temp, (col, idx) => {
                col.setAttribute("visualIndex", idx + "");
                return col.originalColumnIndex;
            });
            this.detectChanges();
            this.initPlugins();
        }
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    buildRowIdentity(rows) {
        // if (rows == null) return rows;
        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_DIFFER_ID] = BaseComponent.generateUniqueId("row_differ");
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_ID] = this.buildRowId(rows[rowIndex], rowIndex);
        // }
        return rows;
    }
    /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    rowTrackByFn(idx, row) {
        return row[TableComponent.INTERNAL_ROW_DIFFER_ID];
    }
    /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    columnHeaderTrackByFn(idx, column) {
        return column[TableComponent.INTERNAL_COLUMN_HEADER_ID];
    }
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    removeTableRowByIndex(index) {
        if (this._tableRow != null && this._tableRow.length > index) {
            this._tableRow = filter(this._tableRow, (row, rowIndex) => {
                return rowIndex !== index;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    removeTableRowById(id) {
        if (this._tableRow != null && this._tableRow.length > 0) {
            this._tableRow = filter(this._tableRow, (row) => {
                return row.id !== id;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    toColumns(columns) {
        return columns.map((col, idx) => {
            col[TableComponent.INTERNAL_COLUMN_HEADER_ID] = BaseComponent.generateUniqueId("hc");
            col.setAttribute("visualIndex", idx + '');
            return col;
        });
    }
    /**
     * @param {?} width
     * @return {?}
     */
    toWholeNumber(width) {
        return parseInt(width);
    }
    /**
     * @return {?}
     */
    checkShowBlankRow() {
        if (this.dataSource == null ||
            this.dataSource.length === 0 ||
            (/** @type {?} */ (this.tableContainer.nativeElement)).scrollHeight > (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight) {
            this.showBlankRow = false;
        }
        else {
            this.showBlankRow = true;
        }
    }
    /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    removeFromTableRow(id) {
        /** @type {?} */
        const i = this.tableRow.findIndex(r => r.id === id);
        this.tableRow.splice(i, 1);
    }
}
TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX = "$$INTERNAL_VIRTUAL_ORIGINAL_INDEX$$";
TableComponent.INTERNAL_VIRTUAL_ROW_DATA = "$$INTERNAL_VIRTUAL_ROW_DATA$$";
TableComponent.INTERNAL_ROW_DIFFER_ID = "$$INTERNAL_VIRTUAL_ROW_DIFFER_ID$$";
TableComponent.INTERNAL_ROW_ID = "$$INTERNAL_VIRTUAL_ROW_ID$$";
TableComponent.INTERNAL_COLUMN_HEADER_ID = "$$INTERNAL_COLUMN_HEADER_ID$$";
TableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-table',
                template: "<div #ghostHeader class=\"ghost-header\" [style.width.px]=\"controlWidth\" style=\"display: none; position: absolute; z-index: 1; overflow: hidden;\">\n  <!-- <table #fakeTable class=\"fake-table table\" style=\"z-index: 1;\"></table> -->\n</div>\n<div #tableContainer class=\"table-container\"\n  [ngClass]=\"cssClass\"\n  [style.maxWidth.px]=\"controlWidth\"\n  [style.height.px]=\"controlHeight\"\n  [style.color]=\"fontColor\"\n  [style.visibility]=\"visible ? 'visible' : 'hidden'\"\n  [ngStyle]=\"scrollContainerStyles\"\n>\n  <!-- Virtual scroll height -->\n  <div *ngIf=\"virtualScroll === true\" [style.height.px]=\"_virtualScrollDivHeight\" [style.width.px]=\"1\"></div>\n  <div #tableWrapper class=\"table-scroller\" [ngStyle]=\"tableStyles\">\n    <table class=\"table tablesorter header-fixed\" [id]=\"id\" #table>\n      <thead #tableHead>\n        <tr class=\"dnd-moved\">\n          <th *ngFor=\"let column of columns; index as columnIndex; trackBy: columnHeaderTrackByFn\"\n            [ngClass]=\"{'headerPadding': isHeaderPadding === true,'nonForceFixWidth': forceFixWidth === false, 'vt-locked-column': column.locked === true, 'sort-up': column.sortDirection === 'asc' && column.locked !== true, 'sort-down': column.sortDirection === 'desc' && column.locked !== true, 'internal-sort': virtualScroll === true && enableSort !== false, 'auto-wrap': column.autoWrap === true}\"\n            [style.height.px]=\"column.headerHeight\"\n            [runOutsideZone]=\"false\"\n            (vtOnCreate)=\"registerFauxElement('headcell', $event, columnIndex, column)\"\n            [ngStyle]=\"column.styles\"\n            (contextmenu)=\"handleHeaderOnContextMenu(columnIndex, $event)\"\n            (click)=\"handleSort(column)\"\n            [attr.data-sorter]=\"column.sortable\">\n            <!-- If column has header as text, render as text -->\n            <span *ngIf=\"column.isHeaderTemplate === false\">\n              {{column.header}}\n            </span>\n            <!-- otherwise, if it has custom rendering (i.e. they want to render checkbox, etc), we spit out the template to them -->\n            <ng-template [ngIf]=\"column.isHeaderTemplate === true\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngTemplateOutletContext]=\"{columnIndex: columnIndex}\"></ng-template>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <!-- when there are data-->\n        <ng-template [ngIf]=\"dataSource != null && dataSource.length > 0\">\n          <tr class=\"dnd-moved\" *ngFor=\"let item of dataSource; index as rowIndex\" [id]=\"buildRowId(item, rowIndex)\" (vtOnCreate)=\"registerFauxElement('row', $event, rowIndex, item)\" [attr.rowNo]=\"rowIndex\" (mousedown)=\"toggleRowSelection($event, rowIndex, item)\" (mouseup)=\"handleMouseUp($event, rowIndex, item)\" (click)=\"onRowClick($event, rowIndex)\" [ngClass]=\"{'selected-row': isSelectedRow(rowIndex, item)}\" class=\"{{rowStyleClass(item)}}\">\n            <td *ngFor=\"let column of columns; index as columnIndex\" [ngClass]=\"{'vt-locked-column': column.locked === true}\" (vtOnCreate)=\"registerFauxElement('cell', $event, columnIndex, column)\" [attr.rowNo]=\"rowIndex\" [ngStyle]=\"column.styles\" [style.height.px]=\"column.cellHeight\" [style.textAlign]=\"column.alignHorizontal\" (contextmenu)=\"handleColumnOnContextMenu(column.cellTemplate, rowIndex, columnIndex, $event)\">\n                <!--\n                  the user of the library will choose how to render the data, i.e. as a checkbox, textfield, or whatever, we spit\n                  this out via columns cellTemplate (ColumnDirective lift this up via CellDirective which lift the content of the\n                  host of the directive)\n                -->\n                <ng-template [ngTemplateOutlet]=\"column.cellTemplate?.template\" [ngTemplateOutletContext]=\"{row: item, rowIndex: toRowIndex(rowIndex, item), columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n          <tr *ngIf=\"showBlankRow === true\"></tr>\n        </ng-template>\n        <!-- when there are no data-->\n        <ng-template [ngIf]=\"(dataSource == null || dataSource.length == 0) && (tableRow == null || tableRow.length === 0)\">\n          <tr class=\"dnd-moved\">\n            <td *ngFor=\"let column of columns; index as columnIndex\" [ngClass]=\"{'vt-locked-column': column.locked === true}\" [ngStyle]=\"column.styles\" >&nbsp;</td>\n          </tr>\n          <!-- <tr></tr> -->\n        </ng-template>\n        <!-- custom table row -->\n        <ng-template [ngIf]=\"tableRow != null && tableRow.length > 0\">\n          <tr *ngFor=\"let item of tableRow; index as rowIndex\" class=\"dnd-moved {{item.cssClass}}\" (vtOnCreate)=\"registerFauxElement('row', $event, rowIndex, item)\" [attr.rowNo]=\"rowIndex\" (mousedown)=\"toggleRowSelection($event, rowIndex, item)\" (mouseup)=\"handleMouseUp($event, rowIndex, item)\" [ngClass]=\"{'selected-row': isSelectedRow(rowIndex, item)}\" class=\"{{rowStyleClass(item)}}\">\n            <td *ngFor=\"let column of item.cellTemplates; index as columnIndex\" (vtOnCreate)=\"registerFauxElement('cell', $event, columnIndex, column)\" [attr.rowNo]=\"rowIndex\" (contextmenu)=\"handleColumnOnContextMenu(column, rowIndex, columnIndex, $event)\">\n              <ng-template [ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{row: item, rowIndex: rowIndex, columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n        </ng-template>\n      </tbody>\n      <ng-template [ngIf]=\"footerRow != null && footerRow.cellTemplates != null && footerRow.cellTemplates.length > 0\">\n        <tfoot #tableFoot>\n          <tr class=\"dnd-moved\">\n            <td *ngFor=\"let column of footerRow.cellTemplates; index as columnIndex\" [style.display]=\"'table-cell'\" [style.textAlign]=\"column.alignHorizontal\">\n              <ng-template [ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n        </tfoot>\n      </ng-template>\n    </table>\n    <!-- <div *ngIf=\"virtualScroll === true\" [style.height.px]=\"controlHeight\" [style.width.px]=\"controlWidth\" [ngStyle]=\"virtualScrollProgressStyles\"></div> -->\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TableComponent)
                    }
                ],
                styles: [".table-container{width:100%;height:100%;overflow:auto;border:1px solid #888}table{table-layout:auto;width:100%!important;background-color:#fff;border-collapse:separate}table>tbody>tr>td,table>thead>tr>th{min-width:1px;white-space:nowrap;text-align:center}table tr.selected-row>td{background-color:#cff!important;color:#1014ff!important}table>thead>tr>th{position:relative;vertical-align:middle;overflow:hidden}.vt-locked-column{position:relative}th.vt-locked-column{background-color:#44a!important;z-index:4}.ghost-header,.table>tfoot>tr>td,.table>thead>tr>th{border-bottom:1px solid #d8d8dc;border-right:1px solid #d8d8dc;background-color:#6a6aff;color:#fff;font-weight:400}.table>tbody>tr>td{border-bottom:1px solid #8080ff;border-right:1px solid #8080ff;padding-left:2px!important;padding-right:2px!important}.table>tfoot>tr>td{padding-left:2px!important;padding-right:2px!important;white-space:nowrap}.table>tbody>tr:nth-child(odd)>td{background:#fff}.table>tbody>tr:nth-child(even)>td{background:#e6e6e6}.table>tfoot>tr{height:10px}td{display:table-cell}table>thead>tr>th.auto-wrap{white-space:normal}.internal-sort{padding:4px 21px 4px 4px}.sort-up{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIRnC2nKLnT4or00Puy3rx7VQAAOw==) center right no-repeat}.sort-down{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIPnI+py+0/hJzz0IruwjsVADs=) center right no-repeat}table thead th.auto-wrap{white-space:normal!important;text-align:center}th.headerPadding{padding-right:14px;padding-left:14px}.fake-table>thead{visibility:visible!important}"]
            }] }
];
/** @nocollapse */
TableComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: IterableDiffers },
    { type: ClipboardService }
];
TableComponent.propDecorators = {
    selectionMode: [{ type: Input }],
    rowCustomAttributeBuilder: [{ type: Input }],
    rowIdBuilder: [{ type: Input }],
    rowStyleFn: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    virtualScrollSortFn: [{ type: Input }],
    virtualScrollInvisibleRowBuilder: [{ type: Input }],
    rowHeight: [{ type: Input }],
    scrollTimeout: [{ type: Input }],
    dataSource: [{ type: Input }],
    enableSort: [{ type: Input }],
    enableColumnDragging: [{ type: Input }],
    enableColumnResize: [{ type: Input }],
    droppable: [{ type: Input }],
    restrictCellPopup: [{ type: Input }],
    onChange: [{ type: Output }],
    onStateChange: [{ type: Output }],
    onDoubleClick: [{ type: Output }],
    onDragDrop: [{ type: Output }],
    table: [{ type: ViewChild, args: ['table',] }],
    tableContainer: [{ type: ViewChild, args: ["tableContainer", { read: ElementRef },] }],
    tableWrapper: [{ type: ViewChild, args: ["tableWrapper", { read: ElementRef },] }],
    tableHead: [{ type: ViewChild, args: ["tableHead", { read: ElementRef },] }],
    tableFoot: [{ type: ViewChild, args: ["tableFoot", { read: ElementRef },] }],
    ghostHeader: [{ type: ViewChild, args: ["ghostHeader", { read: ElementRef },] }],
    tableColumns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
    tableRowDef: [{ type: ContentChild, args: [TableRowDefDirective,] }],
    footerRow: [{ type: ContentChild, args: [FooterRowDirective,] }],
    tableRowQuery: [{ type: ContentChildren, args: [RowDirective,] }],
    forceFixWidth: [{ type: Input }],
    isHeaderPadding: [{ type: Input }],
    isHeaderAuto: [{ type: Input }],
    skipRowsAdjustment: [{ type: Input }],
    forceResetColumns: [{ type: Input }],
    tableLayout: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Just aliasing vt-table-column for locked column
 */
class LockedColumnDirective extends TableColumnDirective {
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.locked = true;
    }
}
LockedColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-locked-column',
                providers: [
                    {
                        provide: TableColumnDirective,
                        useExisting: forwardRef(() => LockedColumnDirective)
                    }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ClipboardModule {
}
ClipboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [],
                providers: [
                    ClipboardService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule,
                    ClipboardModule
                ],
                declarations: [
                    TableComponent,
                    TableCellDirective,
                    TableColumnDirective,
                    TableHeaderDirective,
                    HeaderDirective,
                    LockedColumnDirective,
                    TableRowDefDirective,
                    FooterRowDirective,
                    RowDirective
                ],
                exports: [
                    TableComponent,
                    TableCellDirective,
                    TableColumnDirective,
                    TableHeaderDirective,
                    HeaderDirective,
                    LockedColumnDirective,
                    TableRowDefDirective,
                    FooterRowDirective,
                    RowDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tab component
 */
class TabComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.onCommand = new EventEmitter();
    }
    /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    addChild(child) {
        (/** @type {?} */ (this.parent)).addChild(child);
        if (this.tabChildrenIds == null) {
            this.tabChildrenIds = [];
        }
        this.tabChildrenIds.push(child.getId());
    }
    /**
     * After view init lifecycle
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "active", this.focused);
        return json;
    }
    /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    getNxTagName() {
        return "tab";
    }
    /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    onClick() {
        this.onCommand.emit(this.id);
        this.active = true;
    }
    /**
     * Focus this tab
     * @return {?}
     */
    setFocus() {
        /** @type {?} */
        const parent = this.getParent();
        if (parent != null && typeof parent["setSelectedTab"] === "function") {
            parent["setSelectedTab"](this.id);
        }
        else {
            super.setFocus();
        }
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tab',
                template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TabComponent)
                    }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
TabComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
TabComponent.propDecorators = {
    active: [{ type: Input }],
    id: [{ type: Input }],
    onCommand: [{ type: Output }],
    content: [{ type: ViewChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tab pane container component
 */
class TabPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Inject change detector
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.tabPlacement = "top";
        this.onClick = new EventEmitter();
        this.selectedTabIndex = 0;
        this.focusedTabIndex = 0;
        this.tabs = [];
    }
    /**
     * @param {?} tabList
     * @return {?}
     */
    set tabsList(tabList) {
        this.tabs = tabList.toArray();
    }
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.configureTabs();
        this.cd.detectChanges();
    }
    /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    configureTabs() {
        forEach(this.tabs, (tab, index) => {
            if (tab.active === true) {
                this.selectedTabIndex = index;
            }
        });
    }
    /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    handleSelectTab(event, index, tabId) {
        event.preventDefault();
        this.setFocusedTab(index);
        this.selectedTabIndex = index;
        // this.onClick.emit({
        //   tabId: tabId,
        //   tabIndex: index
        // });
        this.selectedTab.onCommand.emit(tabId);
        this.markForCheck();
        /** @type {?} */
        const parentView = this.getParentView();
        if (parentView != null) {
            parentView.resetAllScrollPanesPositionToPrevious();
        }
    }
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    handleKeydown(e) {
        if (!document.activeElement.className.includes("combobox-input-box") && !document.activeElement.className.includes("dropdown-item")) {
            /** @type {?} */
            const UP_KEY_CODE = 38;
            /** @type {?} */
            const DOWN_KEY_CODE = 40;
            /** @type {?} */
            const ENTER_KEY_CODE = 13;
            /** @type {?} */
            const keyPressed = e.which;
            /** @type {?} */
            const navigationKeys = [UP_KEY_CODE, DOWN_KEY_CODE, ENTER_KEY_CODE];
            if (navigationKeys.indexOf(keyPressed) === -1)
                return;
            e.stopPropagation();
            /** @type {?} */
            let newIndex;
            if (keyPressed === DOWN_KEY_CODE && this.focusedTabIndex < this.tabs.length - 1) {
                newIndex = this.focusedTabIndex + 1;
            }
            else if (keyPressed === UP_KEY_CODE && this.focusedTabIndex > 0) {
                newIndex = this.focusedTabIndex - 1;
            }
            else if (keyPressed === ENTER_KEY_CODE) {
                this.setSelectedTab(this.focusedTabIndex);
            }
            else {
                newIndex = this.focusedTabIndex;
            }
            this.setFocusedTab(newIndex);
        }
    }
    /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    setFocusedTab(index) {
        this.focusedTabIndex = index;
        /** @type {?} */
        const tabItem = this.tabNavItems.find((item, i) => {
            return i === index;
        });
        if (tabItem) {
            setTimeout(() => {
                tabItem.nativeElement.focus();
            }, 0);
        }
    }
    /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    setSelectedTab(index) {
        if (typeof index === "number") {
            this.selectedTabIndex = index;
        }
        else {
            /** @type {?} */
            const tempIndex = findIndex(this.tabs, (tab) => tab.id === index);
            if (tempIndex >= 0) {
                this.selectedTabIndex = tempIndex;
            }
        }
        this.markForCheck();
    }
    /**
     * Get the selected [[TabComponent]]
     * @return {?} Tab that is selected
     */
    get selectedTab() {
        return this.tabs.find((item, index) => index === this.selectedTabIndex);
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    getNxTagName() {
        return "tabPane";
    }
    /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    removeChild(child) {
        super.removeChild(child);
        this.tabs = filter(this.tabs, (tab) => tab.id !== child.id);
        this.cd.markForCheck();
    }
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json["selectedTabIndex"] = this.selectedTabIndex;
        return json;
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
}
TabPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tab-pane',
                template: "<div\n  class=\"vt-tab-pane {{cssClass}}\"\n  [ngClass]=\"{'tabs-left': tabPlacement === 'left'}\"\n  [id]=\"id\" (contextmenu)=\"handleOnContextMenu($event)\"\n  (keydown)=\"handleKeydown($event)\"\n  [style.height]=\"controlHeight\"\n  >\n  <!-- Tab Navigation --->\n  <ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li #tabNavItem *ngFor=\"let tab of tabs; let i=index\" [ngClass]=\"{'active': selectedTabIndex === i}\" role=\"presentation\" tabindex=\"-1\">\n      <a id=\"{{tab.id}}-title\" href=\"javascript:void(0)\" [ngClass]=\"{'active': tab.active, 'focused': focusedTabIndex === i}\" role=\"tab\" (click)=\"handleSelectTab($event, i, tab.id)\" tabindex=\"-1\">{{tab.text}}</a>\n    </li>\n  </ul>\n\n  <!-- Tab Content -->\n  <div class=\"tab-content\" [style.height]=\"controlHeight\">\n    <ng-template [ngIf]=\"selectedTab != null\">\n      <div role=\"tabpanel\" class=\"vt-tab tabpane {{selectedTab.cssClass}}\" [id]=\"selectedTab.id\" [style.height]=\"controlHeight\">\n          <ng-container *ngTemplateOutlet=\"selectedTab.content\"></ng-container>\n      </div>\n    </ng-template>\n  </div>\n\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TabPaneComponent)
                    }
                ],
                styles: [".tabs-below>.nav-tabs,.tabs-left>.nav-tabs,.tabs-right>.nav-tabs{border-bottom:0}.pill-content>.pill-pane,.tab-content>.tab-pane{display:none}.pill-content>.active,.tab-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:focus,.tabs-below>.nav-tabs>li>a:hover{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:focus,.tabs-below>.nav-tabs>.active>a:hover{border-color:transparent #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:focus,.tabs-left>.nav-tabs>li>a:hover{border-color:#9abecb #aaa #9abecb #9abecb}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:focus,.tabs-left>.nav-tabs .active>a:hover{border-color:#aaa transparent #aaa #aaa}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:focus,.tabs-right>.nav-tabs>li>a:hover{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:focus,.tabs-right>.nav-tabs .active>a:hover{border-color:#ddd #ddd #ddd transparent}"]
            }] }
];
/** @nocollapse */
TabPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TabPaneComponent.propDecorators = {
    tabPlacement: [{ type: Input }],
    tabsList: [{ type: ContentChildren, args: [TabComponent,] }],
    tabNavItems: [{ type: ViewChildren, args: ['tabNavItem',] }],
    onClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TabHostDirective {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
TabHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-tab-host]'
            },] }
];
/** @nocollapse */
TabHostDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TabPaneModule {
}
TabPaneModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [TabPaneComponent, TabComponent, TabHostDirective],
                exports: [TabComponent, TabPaneComponent, TabHostDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for textarea component
 */
class TextAreaComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd ChangeDetector for this component
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this._maxLength = TextAreaComponent.MAX_LENGTH;
        this.onTextChange = new EventEmitter();
        this.onEdit = new EventEmitter();
        this._editable = true;
    }
    /**
     * @param {?} max
     * @return {?}
     */
    set maxLength(max) {
        this._maxLength = max;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set editable(val) {
        this._editable = val;
    }
    /**
     * @return {?}
     */
    get editable() {
        return this._editable !== "false" && this._editable !== false;
    }
    /**
     * @return {?}
     */
    get maxLength() {
        return this._maxLength > 0 ? this._maxLength : TextAreaComponent.MAX_LENGTH;
    }
    /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.controlPadding) {
            this.controlPadding = this.controlPadding + 'px';
        }
    }
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.focusOnActivation) {
            this.elementRef.nativeElement.focus();
        }
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    }
    /**
     * Get the name of the component
     * @return {?} Name of component
     */
    getLocalName() {
        return "textArea";
    }
    /**
     * Focus the textarea element
     * @return {?}
     */
    setFocus() {
        this.textarea.nativeElement.focus();
    }
    /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    getMaxLength() {
        return this._maxLength;
    }
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    setMaxLength(max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    }
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    onInput(event, value) {
        /** @type {?} */
        let pos = this.textarea.nativeElement.selectionStart;
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            this.text = value;
            setTimeout(() => {
                this.textarea.nativeElement.selectionStart = pos;
                this.textarea.nativeElement.selectionEnd = pos;
            });
        }
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "textArea";
    }
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    onFocus(e) {
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    }
    /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    onBlur(event, value) {
        if (this.textarea.nativeElement.ownerDocument.activeElement === this.textarea.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        this.validateField(event);
    }
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    setVisible(value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    }
}
TextAreaComponent.MAX_LENGTH = 9999;
TextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-text-area',
                template: "<textarea #textarea [id]=\"id\" class=\"vt-text-area form-control {{cssClass}}\"\n[attr.disabled]=\"enabled !== false ? null : true\"\n  [attr.readonly]=\"editable !== false ? null : true\"\n  [style.height]=\"controlHeight\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.line-height]=\"lineHeight\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (focusin)=\"onFocus($event)\"\n  (focusout)=\"onBlur($event, textarea.value)\"\n  (keyup)=\"onInput($event, textarea.value)\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngStyle]=\"styles\"\n  [required]=\"required\"\n  [maxLength]=\"maxLength\"\n  [(ngModel)]=\"text\"\n  [disabled]=\"disabled\"\n  >\n</textarea>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TextAreaComponent)
                    }
                ],
                styles: [".form-control[disabled]{color:grey!important}"]
            }] }
];
/** @nocollapse */
TextAreaComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TextAreaComponent.propDecorators = {
    maxLength: [{ type: Input }],
    editable: [{ type: Input }],
    textarea: [{ type: ViewChild, args: ['textarea',] }],
    onTextChange: [{ type: Output }],
    onEdit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextAreaModule {
}
TextAreaModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [TextAreaComponent],
                exports: [
                    TextAreaComponent,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                entryComponents: [
                    TextAreaComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tree table component
 */
class TreeTableComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} zone
     * @param {?} renderer
     * @param {?} cd
     */
    constructor(parent, sessionService, elementRef, zone, renderer, cd) {
        super(parent, sessionService, elementRef, renderer);
        this.zone = zone;
        this.cd = cd;
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // Width/Height is required otherwise grid will collapse to zero.
        // if (!this.controlHeight) this.controlHeight = '500px';
        // if (!this.controlWidth) this.controlWidth = '500px';
    }
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        //make sure to call sure it can init thing
        super.ngAfterViewInit();
        this.createDocFragment();
        if (this.columns != null && this.columns.length > 0) {
            this.columnDefs = [];
            this.columns.forEach(column => {
                this.columnDefs.push({
                    headerName: column.header,
                    controlWidth: column.controlWidth
                });
            });
        }
        if (this.rowData && this.rowData.length > 0) {
            this.zone.runOutsideAngular(() => {
                jQuery(`#${this.id} .jq-tree-table`).treetable();
            });
        }
    }
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    ngOnDestroy() {
        this.tableBody = null;
        this._bodyFragment = null;
        if (this.nodes != null) {
            for (let node of this.nodes) {
                node.destroy();
            }
        }
        this.nodes = null;
    }
    /**
     * Remove all child rows from this table
     * @return {?}
     */
    clearRows() {
        // while(this.tableBody.nativeElement.firstChild) {
        //   this.renderer.removeChild(this.tableBody.nativeElement, this.tableBody.nativeElement.firstChild);
        // }
        (/** @type {?} */ (this.tableBody.nativeElement)).innerHTML = "";
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
        this.createDocFragment();
    }
    /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    createRow() {
        /** @type {?} */
        const row = new HTMLElementWrapper(this.renderer, "row", this.getSession());
        row.setAttribute("id", BaseComponent.generateUniqueId("row"));
        row.parentTableId = this.id;
        row.parentTable = this;
        this.setParentScreenId(row);
        this.zone.runOutsideAngular(() => {
            row.htmlElement.addEventListener("mousedown", () => {
                if (this.selectedNodes != null) {
                    this.selectedNodes.forEach(idx => {
                        this._selectRow(idx, false);
                    });
                }
                this.selectedRowElements = [];
                this.selectRow(row, true);
            });
        });
        this.trackNode(row);
        return row;
    }
    /**
     * Create table row and append to table
     * @return {?}
     */
    addRow() {
        /** @type {?} */
        const row = this.createRow();
        if (this.useDocFragment === true) {
            this._bodyFragment.appendChild(row.htmlElement);
        }
        else {
            this.renderer.appendChild(this.tableBody.nativeElement, row.htmlElement);
        }
        row.htmlElement.style["background"] = "";
        return row;
    }
    /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    _selectRow(nodeIndex, isSelected) {
        /** @type {?} */
        let idx = findIndex(this.selectedNodes, (node) => {
            return node === nodeIndex;
        });
        /* istanbul ignore if */
        if (isSelected) {
            //if it wasn't selected, add it in selectedRows.
            if (idx < 0) {
                this.selectedNodes.push(nodeIndex);
                this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = 'blue';
            }
        }
        else {
            //if it was selected before, remove it from selectedRows.
            if (idx >= 0) {
                this.selectedNodes.splice(idx, 1);
                this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = "";
            }
        }
    }
    /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    selectRow(row, isSelected) {
        if (this.nodes == null)
            return;
        /** @type {?} */
        let nodeIndex = findIndex(this.nodes, (node) => {
            return node === row;
        });
        /** @type {?} */
        let tds = this.elementRef.nativeElement.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            (/** @type {?} */ (tds[i])).style.color = '';
        }
        for (let i = 0; i < this.nodes.length; i++) {
            this._selectRow(i, false);
        }
        this._selectRow(nodeIndex, true);
        if (isSelected) {
            this.selectedRowElements.push(row);
        }
        else {
            this.selectedRowElements = this.selectedRowElements.filter(el => {
                return el._uniqueId !== row._internalId;
            });
        }
    }
    /**
     * @return {?}
     */
    getSelectedRows() {
        return this.selectedRowElements;
    }
    /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    createCell() {
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "cell", this.getSession());
        cell.setAttribute("id", BaseComponent.generateUniqueId("cell"));
        this.setParentScreenId(cell);
        //for cell, we need to append it to the row
        this.trackNode(cell);
        return cell;
    }
    /**
     * @deprecated used createCell instead
     * @return {?}
     */
    addCell() {
        return this.createCell();
    }
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    redrawTree() {
        this.zone.runOutsideAngular(() => {
            /* istanbul ignore next */
            jQuery(`#${this.id} .jq-tree-table`).treetable({
                expandable: true
            }, true);
            this.cd.markForCheck();
        });
    }
    /**
     * Expand all nodes in the tree
     * @return {?}
     */
    expandAll() {
        /* istanbul ignore next */
        jQuery(`#${this.id} .jq-tree-table`).treetable("expandAll");
        this.setNodeExpandedStatus("true");
    }
    /**
     * Collapse all node in the tree
     * @return {?}
     */
    collapseAll() {
        jQuery(`#${this.id} .jq-tree-table`).treetable("collapseAll");
        this.setNodeExpandedStatus("false");
    }
    /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    getTableChildren() {
        return this.nodes;
    }
    /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    getChildCount() {
        return this.nodes != null ? this.nodes.length : 0;
    }
    /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    getChildById(id) {
        if (this.nodes != null) {
            /** @type {?} */
            const temp = filter(this.nodes, (item) => item.getId() === id);
            if (temp.length > 0) {
                return temp[0];
            }
        }
        return null;
    }
    /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        /** @type {?} */
        const result = new Vector();
        /** @type {?} */
        const xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            let node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    }
    /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    trackNode(node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    getNxTagName() {
        return "treeTable";
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    setNodeExpandedStatus(status) {
        if (this.nodes != null) {
            forEach(this.nodes, (node) => {
                if (node.getLocalName() === "row") {
                    node.expanded = status;
                }
            });
        }
    }
    /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    toJson() {
        /** @type {?} */
        const retVal = super.toJson();
        if (this.nodes != null) {
            /** @type {?} */
            const children = this.nodes.filter(node => node.getLocalName() === "row");
            if (children.length > 0) {
                retVal["children"] = children.map(child => child.toJson());
            }
        }
        return retVal;
    }
    /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    setParentScreenId(el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    }
    /**
     * @return {?}
     */
    getNodes() {
        return this.nodes;
    }
    /**
     * @return {?}
     */
    createDocFragment() {
        if (this.useDocFragment === true) {
            this._bodyFragment = document.createDocumentFragment();
        }
    }
    /**
     * @return {?}
     */
    appendFragment() {
        if (this._bodyFragment != null) {
            (/** @type {?} */ (this.tableBody.nativeElement)).appendChild(this._bodyFragment);
        }
    }
}
TreeTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tree-table',
                template: "<div [id]=\"id\"\nclass=\"vt-tree-table {{cssClass}}\"\n[style.width]=\"controlWidth\"\n[style.height]=\"controlHeight\"\n[style.border-style]=\"borderStyle\">\n    <table\n        class=\"table jq-tree-table\" [style.border-width]=\"borderWidth\">\n        <thead #tableHeader>\n            <tr>\n                <th scope=\"col\" *ngFor=\"let col of columnDefs\" [style.width.px]=\"col.controlWidth\">\n                    {{col.headerName}}\n                </th>\n            </tr>\n        </thead>\n        <tbody #tableBody>\n            <tr *ngFor=\"let row of rowData; let i = index\">\n                <td *ngFor=\"let col of columnDefs\">\n                    {{row[col.field]}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TreeTableComponent)
                    }
                ],
                styles: ["table.treetable span.indenter{display:inline-block;margin:0;padding:0;text-align:right;-ms-user-select:none;user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;box-sizing:content-box;width:19px}table.treetable span.indenter a{background-position:left center;background-repeat:no-repeat;display:inline-block;text-decoration:none;width:19px}table.treetable{border:1px solid #888;border-collapse:collapse;font-size:.8em;line-height:1;width:100%}table.treetable caption{font-size:.9em;font-weight:700;margin-bottom:.2em}table.treetable thead{background:url(data:image/png;base64,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) top left repeat-x #aaa;font-size:.9em}table.treetable thead tr th{border:1px solid #888;font-weight:400;padding:.3em 1em .1em;text-align:left;height:6px}table.treetable tbody tr td{cursor:default;border-right:1px solid #8080ff}table.treetable span{background-position:center left;background-repeat:no-repeat;padding:.2em 0 .2em 1.5em}table.treetable span.file{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC)}table.treetable span.folder{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLxZO7ihRBFIa/6u0ZW7GHBUV0UQQTZzd3QdhMQxOfwMRXEANBMNQX0MzAzFAwEzHwARbNFDdwEd31Mj3X7a6uOr9BtzNjYjKBJ6nicP7v3KqcJFaxhBVtZUAK8OHlld2st7Xl3DJPVONP+zEUV4HqL5UDYHr5xvuQAjgl/Qs7TzvOOVAjxjlC+ePSwe6DfbVegLVuT4r14eTr6zvA8xSAoBLzx6pvj4l+DZIezuVkG9fY2H7YRQIMZIBwycmzH1/s3F8AapfIPNF3kQk7+kw9PWBy+IZOdg5Ug3mkAATy/t0usovzGeCUWTjCz0B+Sj0ekfdvkZ3abBv+U4GaCtJ1iEm6ANQJ6fEzrG/engcKw/wXQvEKxSEKQxRGKE7Izt+DSiwBJMUSm71rguMYhQKrBygOIRStf4TiFFRBvbRGKiQLWP29yRSHKBTtfdBmHs0BUpgvtgF4yRFR+NUKi0XZcYjCeCG2smkzLAHkbRBmP0/Uk26O5YnUActBp1GsAI+S5nRJJJal5K1aAMrq0d6Tm9uI6zjyf75dAe6tx/SsWeD//o2/Ab6IH3/h25pOAAAAAElFTkSuQmCC)}table.treetable tr.collapsed span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.expanded span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHFJREFUeNpi/P//PwMlgImBQsA44C6gvhfa29v3MzAwOODRc6CystIRbxi0t7fjDJjKykpGYrwwi1hxnLHQ3t7+jIGBQRJJ6HllZaUUKYEYRYBPOB0gBShKwKGA////48VtbW3/8clTnBIH3gCKkzJgAGvBX0dDm0sCAAAAAElFTkSuQmCC)}table.treetable tr.branch{background-color:#f9f9f9}table.treetable tr.selected{background-color:#3875d7;color:#fff}table.treetable tr span.indenter a{outline:0}table.treetable tr.collapsed.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.expanded.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.accept{background-color:#a3bce4;color:#fff}table.treetable tr.collapsed.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}table.treetable tr.expanded.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}vt-tree-table{overflow:auto}table.treetable tr:nth-child(odd){background:0 0}table.treetable tr:nth-child(even){background:#e6e6e6}"]
            }] }
];
/** @nocollapse */
TreeTableComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
TreeTableComponent.propDecorators = {
    rowData: [{ type: Input }],
    columnDefs: [{ type: Input }],
    useDocFragment: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
    tableBody: [{ type: ViewChild, args: ["tableBody", { read: ElementRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TreeTableModule {
}
TreeTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [TreeTableComponent],
                exports: [
                    TreeTableComponent
                ],
                entryComponents: [
                    TreeTableComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Base parent component class that all other screen components inherit from
 */
class ViewComponent extends BaseComponent {
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
            forEach(this.popupMenus, (popupMenu) => popupMenu.convertSubMenuItems(this.id));
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
                forEach(this.popupMenus, (popupMenu) => popupMenu.convertSubMenuItems(this.id));
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
        forEach(this.defIds, (id) => {
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
        const radios = filter(Array.from(this.children.values()), (child) => {
            return child instanceof RadioButtonComponent && (/** @type {?} */ (child)).group === radioGroupId;
        });
        /* istanbul ignore if */
        if (radios != null && radios.length > 0) {
            forEach(radios, (radio) => {
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
                view = find(sessionService.getMcoContainer().getViews(), v => v.constructor == viewType);
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
        const oldView = find(this.getSession().getMcoContainer().getViews(), (view) => {
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
            const keys$$1 = keys(menuItem.item.customAttributes);
            for (const key of keys$$1) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ViewModule {
}
ViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [ViewComponent],
                providers: [
                    DynamicPagesService
                ],
                exports: [
                    ViewComponent,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for popup menu component
 */
class PopupMenuComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector
     * @param {?} differs
     * @param {?} popupMenuService
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, differs, popupMenuService, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.popupMenuService = popupMenuService;
        this.menuItems = [];
        this.menuItemsDiffer = null;
        this.isShown = false;
        this.menuItemsDiffer = differs.find([]).create();
        this.onDocumentClick = (event) => {
            this.handleDocumentClick(event);
        };
        document.addEventListener("click", this.onDocumentClick, true);
    }
    /**
     * @return {?}
     */
    get hasMenuItems() {
        return this.menuItems != null && this.menuItems.length > 0;
    }
    /**
     * Do check lifecycle
     * @return {?}
     */
    ngDoCheck() {
        if (this.menuItemsDiffer.diff(this.menuItems)) {
            this.cd.markForCheck();
        }
    }
    /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cd.detectChanges();
        UiDocument.registerMenuItemElement(this.getId(), /** @type {?} */ (this));
        /** @type {?} */
        const tm = setTimeout(() => {
            clearTimeout(tm);
            this.show();
        });
    }
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        UiDocument.unregisterMenuItemElement(this.getId());
        document.removeEventListener("click", this.onDocumentClick, true);
        this.dropdownContainer = null;
        this.dropdown = null;
    }
    /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    show() {
        this.popupMenuService.setActiveMenu(this.id);
        if (this.dropdown != null) {
            this.dropdown.show();
            this.isShown = true;
            /** @type {?} */
            const position = this.getSession().getMousePosition();
            if (position != null && this.dropdownContainer != null) {
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "left", position.x + "px");
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "top", position.y + "px");
            }
            this.cd.markForCheck();
        }
    }
    /**
     * Hide the popup menu
     * @return {?}
     */
    hide() {
        this.dropdown.hide();
        this.isShown = false;
        this.cd.markForCheck();
        this.popupMenuService.setActiveMenu(null);
    }
    /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    handleDocumentClick(event) {
        if (this.isShown === true && !this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    dispSubmenu(event) {
        /** @type {?} */
        const currentTarget = event.currentTarget;
        /** @type {?} */
        const currentChildren = currentTarget.children;
        /** @type {?} */
        const parentChildren = currentTarget.parentElement.children;
        for (let i = 0, len = parentChildren.length; i < len; i++) {
            if (parentChildren[i] !== undefined) {
                this.renderer.setStyle(parentChildren[i], "background-color", "#ffffff");
            }
            if (parentChildren[i].children[1] === undefined) {
                continue;
            }
            parentChildren[i].children[1].classList.remove('popup-sub-menu-display');
        }
        if (currentChildren[1] === undefined
            || (currentChildren[0] !== undefined && !currentChildren[0].classList.contains('dropdown-item'))) {
            return;
        }
        currentChildren[1].classList.add('popup-sub-menu-display');
        this.renderer.setStyle(currentTarget, "background-color", "#f5de92");
    }
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    setAttribute(name, value) {
        this.setCustomAttribute(name, value);
    }
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    getAttribute(name) {
        return this.getCustomAttribute(name);
    }
    /**
     * @return {?}
     */
    toJson() {
        return super.toJson();
    }
}
PopupMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-popup-menu-view',
                template: "<div class=\"dropdown-container\" bs-dropdown-container #bsDropdownContainer>\n  <div id=\"{{id}}\" dropdown #myDropdown=\"bs-dropdown\" [autoClose]=\"true\">\n    <ul *dropdownMenu class=\"dropdown-menu popup-menu\" role=\"menu\" id=\"{{id}}_menus\">\n      <ng-template ngFor [ngForOf]=\"menuItems\" let-item>\n        <li *ngIf=\"item.text === '-' && item.display !== false\" role=\"separator\" class=\"divider\"></li>\n        <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"item.menuItems != null && item.menuItems.length > 0 && item.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"item.text\" id=\"{{item.id}}\" [menuItems]=\"item.menuItems\" [display]=\"item.display\" [item]=\"item\" [popupMenuId]=\"id\"></li>\n        <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"item.text !== '-' && (item.menuItems == null || item.menuItems.length === 0) && item.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"item.text\" id=\"{{item.id}}\" [menuItems]=\"item.menuItems\" [display]=\"item.display\" [item]=\"item\" [popupMenuId]=\"id\"></li>\n      </ng-template>\n    </ul>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".hidden{display:none}.dropdown-submenu{position:relative}.dropdown-submenu>a{text-align:left;padding-right:43px!important}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-1px;margin-left:-1px;border-radius:6px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropdown-submenu>a:after{display:block;position:relative;right:-8px;font-size:8px;content:\">\";color:#626d8d;text-shadow:1px 0 0 #626d8d;float:right;margin:2px 0 -10px;padding:0;width:0;height:0;background:0 0;border:none}.dropdown-submenu:hover>a:after{border-left-color:#fff}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;border-radius:6px}.dropdown-container{position:absolute;z-index:9999}"]
            }] }
];
/** @nocollapse */
PopupMenuComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: IterableDiffers },
    { type: ContextMenuService },
    { type: Renderer2 }
];
PopupMenuComponent.propDecorators = {
    idName: [{ type: Input }],
    dropdown: [{ type: ViewChild, args: ["myDropdown", { read: BsDropdownDirective },] }],
    dropdownContainer: [{ type: ViewChild, args: ["bsDropdownContainer", { read: ElementRef },] }],
    menuItems: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Menu item directive class. Adds menu dispay and behavior to component
 */
class MenuItemDirective {
    constructor() {
        this.text = '';
        this.visible = true;
        this.onCommand = new EventEmitter();
    }
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    toMenuItem(parentScreenId) {
        /** @type {?} */
        const menuItem = {
            id: this.id,
            text: this.text,
            menuItems: null,
            onCommand: this.onCommand,
            parentScreenId: parentScreenId,
            display: this.visible
        };
        if (this.subMenuItems != null && this.subMenuItems.length > 0) {
            //filter to remove self then map to MenuItem
            menuItem.menuItems = this.subMenuItems.filter(item => item !== this).map(item => item.toMenuItem(parentScreenId));
        }
        return menuItem;
    }
}
MenuItemDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-menu-item'
            },] }
];
MenuItemDirective.propDecorators = {
    idName: [{ type: Input }],
    id: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    onCommand: [{ type: Output }],
    subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for menu item component. Child rendered by Menu directive
 */
class MenuItemComponent {
    /**
     *
     * @param {?} sessionService Injects reference to [[SessionService]] instance
     * @param {?} cd
     */
    constructor(sessionService, cd) {
        this.sessionService = sessionService;
        this.cd = cd;
        this.display = true;
        this.onClick = new EventEmitter();
    }
    /**
     * Check if menu items exist
     * @return {?} True if [[menuItems]] exists and has 1 or more items
     */
    get hasMenuItems() {
        return this.menuItems != null && this.menuItems.length > 0;
    }
    /**
     * Check if this menu item is a separator/divider (i.e. hyphen)
     * @return {?} True if the menu item text is a hyphen
     */
    get isDivider() {
        return this.text === '-';
    }
    /**
     * Get menu item styles map
     * @return {?} Map of styles
     */
    get menuStyles() {
        return this.item != null ? this.item.styles : null;
    }
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    ngAfterViewInit() {
        UiDocument.registerMenuItemElement(this.id, this);
    }
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    ngOnDestroy() {
        this.item = null;
        this.menuItems = null;
        UiDocument.unregisterMenuItemElement(this.id);
    }
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    setAttribute(name, value) {
        if (this.item) {
            if (name === "display" || name === "visible") {
                value = value === true || value === "true";
                this.display = value;
                this.item.display = value;
                this.cd.detectChanges();
            }
            else if (name === "text") {
                this.text = value;
                this.item.text = value;
                this.cd.detectChanges();
            }
            else if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
                if (this.item.customAttributes == null) {
                    this.item.customAttributes = {};
                }
                this.item.customAttributes[name] = value;
            }
        }
    }
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    getAttribute(name) {
        if (this.item) {
            if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
                return this.item.customAttributes == null ? null : this.item.customAttributes[name];
            }
            else if (name === "display" || name === "visible") {
                return this.display;
            }
            else if (name === "text") {
                return this.text;
            }
            else if (name === "id") {
                return this.id;
            }
        }
    }
    /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    getId() {
        return this.id;
    }
    /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    getText() {
        return this.text;
    }
    /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    handleOnEnter(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onCommandCallback === 'function') {
            this.item.onCommandCallback(this.item);
        }
        else if (this.item && this.item.onCommand) {
            this.item.onCommand.emit();
        }
        if (this.popupMenuId != null) {
            this.sessionService.hideContextMenu(this.popupMenuId);
        }
    }
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    handleMouseEnter(event) {
        event.target.focus();
    }
    /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    handleOnClick(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onCommandCallback === 'function') {
            this.item.onCommandCallback(this.item);
        }
        else if (this.item && this.item.onCommand) {
            this.item.onCommand.emit();
        }
        if (this.popupMenuId != null) {
            this.sessionService.hideContextMenu(this.popupMenuId);
        }
    }
    /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    handleMouseDown(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.item != null && this.item.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.item.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.item && typeof this.item.onMouseDownCallback === "function") {
            this.item.onMouseDownCallback(this);
        }
    }
    /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    toJson() {
        /** @type {?} */
        const json = {};
        json["tagName"] = "menuItem";
        json["nxTagName"] = "menuItem";
        if (this.id != null) {
            json["id"] = this.id;
        }
        if (this.text != null) {
            json["text"] = this.text;
        }
        /* istanbul ignore if */
        if (this.popupMenuId != null) {
            json["popup"] = "#" + this.popupMenuId;
        }
        /* istanbul ignore if */
        if (this.item.customAttributes != null) {
            /** @type {?} */
            const keys$$1 = keys(this.item.customAttributes);
            for (let key of keys$$1) {
                json[key] = KeyUtils.toJsonValue(this.item.customAttributes[key]);
            }
        }
        return json;
    }
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    dispSubmenu(event) {
        /** @type {?} */
        const currentTarget = event.currentTarget;
        /** @type {?} */
        const currentChildren = currentTarget.children;
        /** @type {?} */
        const parentChildren = currentTarget.parentElement.children;
        for (let i = 0, len = parentChildren.length; i < len; i++) {
            if (parentChildren[i] !== undefined) {
                parentChildren[i].style.backgroundColor = "#ffffff";
            }
            if (parentChildren[i].children[1] === undefined) {
                continue;
            }
            parentChildren[i].children[1].classList.remove('popup-sub-menu-display');
        }
        if (currentChildren[1] === undefined
            || (currentChildren[0] !== undefined && !currentChildren[0].classList.contains('dropdown-item'))) {
            return;
        }
        currentChildren[1].classList.add('popup-sub-menu-display');
        currentTarget.style.backgroundColor = "#f5de92";
    }
}
MenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[vt-menu-item-comp]',
                template: "<a *ngIf=\"hasMenuItems && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" tabindex=\"-1\">{{text}}</a>\n<a *ngIf=\"hasMenuItems !== true && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" [ngStyle]=\"menuStyles\" tabindex=\"-1\" (keydown.enter)=\"handleOnEnter($event)\" (mouseenter)=\"handleMouseEnter($event)\" (mousedown)=\"handleMouseDown($event)\" (click)=\"handleOnClick($event)\">{{text}}</a>\n<ng-template [ngIf]=\"hasMenuItems\">\n  <ul class=\"dropdown-menu popup-menu\" role=\"menu\">\n    <ng-template ngFor [ngForOf]=\"menuItems\" let-subItem>\n      <li *ngIf=\"subItem.text === '-' && subItem.display !== false\" role=\"separator\" class=\"divider\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.menuItems != null && subItem.menuItems.length > 0 && subItem.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.text !== '-' && (subItem.menuItems == null || subItem.menuItems.length === 0) && subItem.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n    </ng-template>\n  </ul>\n</ng-template>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MenuItemComponent.ctorParameters = () => [
    { type: SessionService },
    { type: ChangeDetectorRef }
];
MenuItemComponent.propDecorators = {
    text: [{ type: Input }],
    id: [{ type: Input }],
    menuItems: [{ type: Input }],
    display: [{ type: Input }],
    visible: [{ type: Input }],
    item: [{ type: Input }],
    popupMenuId: [{ type: Input }],
    onClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Menu directive class
 */
class MenuDirective extends MenuItemDirective {
}
MenuDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-menu',
                providers: [
                    {
                        provide: MenuItemDirective,
                        useExisting: forwardRef(() => MenuDirective)
                    }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for popup menu container
 */
class PopupMenuContainerComponent {
    /**
     *
     * @param {?} contextMenuService Injects reference to context menu service
     * @param {?} cd Injects change detector reference
     */
    constructor(contextMenuService, cd) {
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.hasPopupMenu = false;
        this.activeMenuSubscription = this.contextMenuService.activeMenuObservable.subscribe((activeMenu) => {
            this.setActiveMenu(activeMenu);
        });
    }
    /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    ngOnDestroy() {
        if (this.activeMenuSubscription != null) {
            this.activeMenuSubscription.unsubscribe();
        }
        this.activeMenuSubscription = null;
        this.activeMenuItems = null;
        this.contextMenuService = null;
    }
    /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    setActiveMenu(id) {
        this.activeMenuId = id;
        if (id != null) {
            this.activeMenuItems = this.contextMenuService.getContextMenuItems(id);
            if (this.activeMenuItems != null && this.activeMenuItems.length > 0) {
                this.hasPopupMenu = true;
            }
        }
        else {
            this.activeMenuItems = null;
            this.hasPopupMenu = false;
        }
        this.cd.detectChanges();
    }
}
PopupMenuContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-popup-menu-container',
                template: "<vt-popup-menu-view *ngIf=\"hasPopupMenu === true\" id=\"{{activeMenuId}}\" [menuItems]=\"activeMenuItems\"></vt-popup-menu-view>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
PopupMenuContainerComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef }
];
PopupMenuContainerComponent.propDecorators = {
    popupMenu: [{ type: ViewChild, args: [PopupMenuComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Popup menu directive class. Adds context menu items to component
 */
class PopupMenuDirective {
    /**
     *
     * @param {?} parent
     * @param {?} contextMenuService Injected service for context menu functions
     */
    constructor(parent, contextMenuService) {
        this.parent = parent;
        this.contextMenuService = contextMenuService;
        this.disabled = false;
        this.visible = true;
        this.text = "";
    }
    /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.parent != null && this.parent.getParentView() != null) {
            (/** @type {?} */ (this.parent.getParentView())).registerPopupMenu(this);
        }
        else {
            this.convertSubMenuItems(null);
        }
    }
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    getMenuItems() {
        return this.contextMenuService.getContextMenuItems(this.id);
    }
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    convertSubMenuItems(parentScreenId) {
        /** @type {?} */
        let menuItems = [];
        if (this.subMenuItems) {
            menuItems = this.subMenuItems.map(item => item.toMenuItem(parentScreenId));
        }
        this.contextMenuService.registerContextMenu(this.id, menuItems, parentScreenId);
    }
}
PopupMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-popup-menu'
            },] }
];
/** @nocollapse */
PopupMenuDirective.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }] },
    { type: ContextMenuService }
];
PopupMenuDirective.propDecorators = {
    idName: [{ type: Input }],
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    visible: [{ type: Input }],
    text: [{ type: Input }],
    subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PopupMenuModule {
}
PopupMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BsDropdownModule.forRoot()
                ],
                declarations: [
                    PopupMenuComponent,
                    MenuItemDirective,
                    MenuItemComponent,
                    MenuDirective,
                    PopupMenuContainerComponent,
                    PopupMenuDirective
                ],
                exports: [
                    PopupMenuComponent,
                    MenuItemDirective,
                    MenuItemComponent,
                    MenuDirective,
                    BsDropdownModule,
                    PopupMenuContainerComponent,
                    PopupMenuDirective
                ],
                providers: [
                    ContextMenuService
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for bottom/right split-pane section
 */
class BottomPaneComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
BottomPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-bottom',
                template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                styles: [""]
            }] }
];
/** @nocollapse */
BottomPaneComponent.ctorParameters = () => [];
BottomPaneComponent.propDecorators = {
    content: [{ type: ViewChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for top/left split-pane section
 */
class TopPaneComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TopPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-top',
                template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                styles: [""]
            }] }
];
/** @nocollapse */
TopPaneComponent.ctorParameters = () => [];
TopPaneComponent.propDecorators = {
    content: [{ type: ViewChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for split resizable panes
 */
class SplitPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} zone Inject [[NgZone]] reference
     * @param {?} cd Inject [[ChangeDetectorRef]]
     */
    constructor(parent, sessionService, elementRef, renderer, zone, cd) {
        super(parent, sessionService, elementRef, renderer);
        this.zone = zone;
        this.cd = cd;
        /**
         * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
         */
        this.orientation = 'horizontal';
        /**
         * Where the divider position should be set
         */
        this.splitPosition = '50%';
        this._noScroll = false;
        this.dividerStyles = {};
        this.topPaneStyles = {};
        this.bottomPaneStyles = {};
        this.dividerCssClass = ["split-pane-divider"];
        this._resizeOn = false;
        this._prevPos = -1;
        this._update = false;
        this._handleMouseMove = throttle((event) => {
            this._resizePanels(event);
        }, 150);
        this._handleMouseDown = (event) => {
            this.zone.runOutsideAngular(() => {
                document.addEventListener('mousemove', this._handleMouseMove, true);
            });
            if (this.orientation === "vertical") {
                this._prevPos = event.pageX;
            }
            else {
                this._prevPos = event.pageY;
            }
            this._resizeOn = true;
            this._update = false;
        };
        this._handleMouseUp = (event) => {
            this.zone.runOutsideAngular(() => {
                document.removeEventListener("mousemove", this._handleMouseMove, true);
            });
            this._resizeOn = false;
            this._update = true;
        };
    }
    /**
     * Set true, in case of cascading split pane
     * @param {?} value
     * @return {?}
     */
    set noScroll(value) {
        this._noScroll = value;
        this.topPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
        this.bottomPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
    }
    /**
     * @return {?}
     */
    get noScroll() { return this._noScroll; }
    /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.setPaneWidth();
    }
    /**
     * @return {?}
     */
    moveUp() {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(100% - 13px)");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "0%");
        }
    }
    /**
     * @return {?}
     */
    moveDown() {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "0%");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(100% - 13px)");
        }
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
    /**
     * Set pane layout and dimensions
     * @return {?}
     */
    setPaneWidth() {
        if (this.orientation === 'vertical') {
            this.dividerStyles["height"] = "100%";
            this.dividerStyles["width"] = "1px";
            this.dividerStyles['float'] = 'left';
            this.topPaneStyles['width'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['height'] = "100%";
            this.topPaneStyles['float'] = 'left';
            /** @type {?} */
            let percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            let nPercent = +percent;
            this.bottomPaneStyles['width'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['height'] = "100%";
            this.bottomPaneStyles['float'] = 'left';
            this.dividerCssClass.push("vertical");
        }
        else {
            this.dividerStyles["height"] = "8px";
            this.dividerStyles["width"] = "100%";
            this.topPaneStyles['height'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['width'] = "100%";
            /** @type {?} */
            let percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            let nPercent = +percent;
            this.bottomPaneStyles['height'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['width'] = "100%";
            this.dividerCssClass.push("horizontal");
        }
    }
    /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cd.detectChanges();
        this.zone.runOutsideAngular(() => {
            (/** @type {?} */ (this.splitPaneDivider.nativeElement)).addEventListener("mousedown", this._handleMouseDown, true);
            document.addEventListener("mouseup", this._handleMouseUp, true);
        });
    }
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            (/** @type {?} */ (this.splitPaneDivider.nativeElement)).removeEventListener("mousedown", this._handleMouseDown, true);
            document.removeEventListener("mouseup", this._handleMouseUp, true);
            document.removeEventListener("mousemove", this._handleMouseMove, true);
        });
        this._handleMouseDown = null;
        this._handleMouseMove = null;
        this._handleMouseUp = null;
        super.ngOnDestroy();
    }
    /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    _resizePanels(event) {
        if (!this._update) {
            if (this._containerWidth == null) {
                /** @type {?} */
                const c = $(this.splitPaneContainer.nativeElement);
                this._containerHeight = c.height();
                this._containerWidth = c.width();
            }
            this._update = true;
            requestAnimationFrame(() => this._doUpdate(event));
        }
    }
    /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    _doUpdate(event) {
        if (this._resizeOn === true) {
            if (this.orientation === "vertical") {
                /** @type {?} */
                const diff = this._prevPos - event.pageX;
                /** @type {?} */
                const leftWidth = ($(this.topPaneElement.nativeElement).width() - diff);
                this._containerWidth = $(this.splitPaneContainer.nativeElement).width();
                /** @type {?} */
                let left = (leftWidth / this._containerWidth) * 100;
                /** @type {?} */
                let maximum = (leftWidth / (this._containerWidth - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "width", left + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", (this._containerWidth - (leftWidth + 6)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(" + (100 - left) + "% - 13px)");
                this._prevPos = event.pageX;
            }
            else {
                /** @type {?} */
                const diff = this._prevPos - event.pageY;
                /** @type {?} */
                const topHeight = ($(this.topPaneElement.nativeElement).height() - diff);
                this._containerHeight = $(this.splitPaneContainer.nativeElement).height();
                /** @type {?} */
                let top = (topHeight / this._containerHeight) * 100;
                /** @type {?} */
                let maximum = (topHeight / (this._containerHeight - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", top + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", (this._containerHeight - (topHeight + 10)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top) + "% - 13px)");
                this._prevPos = event.pageY;
            }
            this._update = false;
        }
    }
}
SplitPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-split-pane',
                template: "<div\n  class=\"vt-split-pane\"\n  id=\"{{id}}\"\n  [ngClass]=\"cssClass\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  #splitPaneContainer\n>\n  <section #topPaneSection class=\"top-pane\" *ngIf=\"topPane != null\" [ngStyle]=\"topPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"topPane.content\" #containerTopTemplate></ng-container>\n  </section>\n  <div #splitPaneDivider [ngClass]=\"dividerCssClass\" [ngStyle]=\"dividerStyles\">\n    <span class=\"arrow left pull-left\" (click)=\"moveDown()\">\u2228</span>\n    <span class=\"arrow center\" style=\"font-size: 10pt;vertical-align: top;\">\uFF1D</span>\n    <span class=\"arrow right pull-right\" (click)=\"moveUp()\">\u2227</span>\n  </div>\n  <section #bottomPaneSection class=\"bottom-pane\" *ngIf=\"bottomPane != null\" [ngStyle]=\"bottomPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"bottomPane.content\" #containerBottomTemplate></ng-container>\n  </section>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => SplitPaneComponent)
                    }
                ],
                styles: [".split-pane-divider{background-image:linear-gradient(#eff1f1,#cad5db);border:1px solid silver;box-sizing:content-box;overflow:hidden}.split-pane-divider .center{margin-left:0}.split-pane-divider.horizontal{margin:0;background:#cecece;background:linear-gradient(to bottom,#eff1f1,#cad5db)}.split-pane-divider.horizontal .arrow{font-size:10px;line-height:8px}.split-pane-divider.horizontal .center{position:relative;left:calc(50% - 9px);font-size:15px}.split-pane-divider.vertical{width:6px!important;height:calc(100% - 12px)!important;margin-top:5px;background:#cecece;background:linear-gradient(to right,#eff1f1,#cad5db)}.split-pane-divider.vertical:hover{cursor:ew-resize}.split-pane-divider.horizontal:hover{cursor:ns-resize}section.top-pane{overflow:auto}"]
            }] }
];
/** @nocollapse */
SplitPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
SplitPaneComponent.propDecorators = {
    orientation: [{ type: Input }],
    splitPosition: [{ type: Input }],
    noScroll: [{ type: Input }],
    topPaneElement: [{ type: ViewChild, args: ["topPaneSection", { read: ElementRef },] }],
    splitPaneDivider: [{ type: ViewChild, args: ["splitPaneDivider", { read: ElementRef },] }],
    bottomPaneElement: [{ type: ViewChild, args: ["bottomPaneSection", { read: ElementRef },] }],
    splitPaneContainer: [{ type: ViewChild, args: ["splitPaneContainer", { read: ElementRef },] }],
    topPane: [{ type: ContentChild, args: [TopPaneComponent,] }],
    bottomPane: [{ type: ContentChild, args: [BottomPaneComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SplitPaneModule {
}
SplitPaneModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SplitPaneComponent,
                    TopPaneComponent,
                    BottomPaneComponent
                ],
                exports: [
                    SplitPaneComponent,
                    TopPaneComponent,
                    BottomPaneComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class CustomAttribute {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const name = this.getPropertyName();
        /** @type {?} */
        let value = this.getPropertyValue();
        if (this.parent != null && name != null && name !== "") {
            if (value == null) {
                value = "";
            }
            this.parent.setCustomAttribute(name, value);
        }
        else if (this.parent == null) {
            console.error("Unable to set custom property, parent is null");
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { appInjector, AttributesEnum, BaseComponent, BaseModule, ComponentType, AttributeChangeEvent, AppUtils, ButtonComponent, ButtonModule, CheckboxComponent, CheckboxModule, ClientEvent, ComboBoxComponent, ComboBoxModule, FauxComboElement, DialogComponent, DialogModule, DraggableDirective, EventHandlerModule, EventHandlerService, GridColumnDirective, HorizontalSeparatorModule, HorizontalSeparatorComponent, Integer, JavaModule, JavaUtils, IllegalArgumentException, DateFormat, LabelComponent, LabelModule, LayoutModule, LinkModule, ListBoxDirective, ListItemDirective, Long, McoContainerModule, McoContainerService, MomentUtils, UiDocument, Logger, DynamicModule, DynamicElementBuilder, PanelComponent, RadioButtonComponent, RadioButtonModule, ScrollPaneComponent, ScrollPaneModule, SessionModule, SessionService, StringBuilder, TableComponent, TableModule, TabPaneModule, TabPaneComponent, TabComponent, TextAreaComponent, TextAreaModule, TextFieldComponent, TextFieldModule, TreeTableComponent, TreeTableModule, HTMLElementWrapper, Vector, HashMap, Hashtable, ViewComponent, ViewModule, DynamicPagesService, PopupMenuModule, PopupMenuComponent, MenuItemBuilder, SplitPaneModule, SplitPaneComponent, TopPaneComponent, BottomPaneComponent, KeyboardModule, ArrowNavigatableContainerDirective, ArrowNavigatableItemDirective, CustomAttribute, TableColumnDirective, isIE, OnCreateDirective as ɵb, ClipboardModule as ɵl, ClipboardService as ɵk, DynamicComponent as ɵd, LinkComponent as ɵc, ContextMenuService as ɵa, MenuItemDirective as ɵo, MenuItemComponent as ɵp, MenuDirective as ɵq, PopupMenuContainerComponent as ɵr, PopupMenuDirective as ɵs, TabHostDirective as ɵn, FooterRowDirective as ɵi, HeaderDirective as ɵg, LockedColumnDirective as ɵm, RowDirective as ɵj, TableCellDirective as ɵe, TableHeaderDirective as ɵf, TableRowDefDirective as ɵh };
