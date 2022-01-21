import { Injectable, Directive, ElementRef, EventEmitter, Output, NgZone, Input, NgModule, Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ContentChildren, Optional, TemplateRef, ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA, ContentChild, Injector, Renderer2, ComponentFactoryResolver, HostListener, defineInjectable, forwardRef, SkipSelf, ViewChildren, ViewEncapsulation, IterableDiffers, inject, Type } from '@angular/core';
import { forEach, map, keys, uniq, filter, parseInt as parseInt$1, random, findIndex, find, isEqual, orderBy, clone, sortBy, get, throttle, concat, padStart, lastIndexOf, uniqBy } from 'lodash';
import { Subject, timer } from 'rxjs';
import { __extends, __values } from 'tslib';
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
var injectorRef;
/** @type {?} */
var appInjector = function (injector) {
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
var AttributesEnum = {
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
var KeyUtils = /** @class */ (function () {
    function KeyUtils() {
    }
    /**
     * Make key case insensitive
     * @param key
     */
    /**
     * Make key case insensitive
     * @param {?} key
     * @return {?}
     */
    KeyUtils.toMapKey = /**
     * Make key case insensitive
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key != null) {
            return key.toLowerCase();
        }
        return null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    KeyUtils.toJsonValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === "number" || typeof val === "boolean") {
            return val + "";
        }
        else {
            return val;
        }
    };
    return KeyUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var McoContainerService = /** @class */ (function () {
    function McoContainerService() {
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
     * @param mcoName Name of MCO instance
     */
    /**
     * Get mco instance from internal [[_mcoMap]]
     * @param {?} mcoName Name of MCO instance
     * @return {?}
     */
    McoContainerService.prototype.getMco = /**
     * Get mco instance from internal [[_mcoMap]]
     * @param {?} mcoName Name of MCO instance
     * @return {?}
     */
    function (mcoName) {
        return this._mcoMap.get(KeyUtils.toMapKey(mcoName));
    };
    /**
     * Get the maximum allowed z-index value for layering windows
     */
    /**
     * Get the maximum allowed z-index value for layering windows
     * @return {?}
     */
    McoContainerService.prototype.getMaxZIndex = /**
     * Get the maximum allowed z-index value for layering windows
     * @return {?}
     */
    function () {
        return this.MAX_Z_INDEX;
    };
    /**
     * Alias of [[registerMco]]
     * @param mcoName
     * @param mco
     */
    /**
     * Alias of [[registerMco]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    McoContainerService.prototype.addMco = /**
     * Alias of [[registerMco]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    function (mcoName, mco) {
        this.registerMco(mcoName, mco);
    };
    /**
     * Add an mco instance to internal [[_mcoMap]]
     * @param mcoName
     * @param mco
     */
    /**
     * Add an mco instance to internal [[_mcoMap]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    McoContainerService.prototype.registerMco = /**
     * Add an mco instance to internal [[_mcoMap]]
     * @param {?} mcoName
     * @param {?} mco
     * @return {?}
     */
    function (mcoName, mco) {
        this._mcoMap.set(KeyUtils.toMapKey(mcoName), mco);
    };
    /**
     * Remove mco object from internal [[_mcoMap]]
     * @param mcoName Name of mco instance to remove
     */
    /**
     * Remove mco object from internal [[_mcoMap]]
     * @param {?} mcoName Name of mco instance to remove
     * @return {?}
     */
    McoContainerService.prototype.removeMco = /**
     * Remove mco object from internal [[_mcoMap]]
     * @param {?} mcoName Name of mco instance to remove
     * @return {?}
     */
    function (mcoName) {
        /** @type {?} */
        var key = KeyUtils.toMapKey(mcoName);
        /** @type {?} */
        var mco = this._mcoMap.get(key);
        if (mco != null && typeof mco["cleanup"] === "function") {
            mco.cleanup();
        }
        this._mcoMap.delete(key);
    };
    /**
     * Push view to the last active view stack. This will be the view that returned
     * when popLastActiveView is called.
     *
     * @param view ViewComponent to be add to the stack
     */
    /**
     * Push view to the last active view stack. This will be the view that returned
     * when popLastActiveView is called.
     *
     * @param {?} view ViewComponent to be add to the stack
     * @return {?}
     */
    McoContainerService.prototype.registerView = /**
     * Push view to the last active view stack. This will be the view that returned
     * when popLastActiveView is called.
     *
     * @param {?} view ViewComponent to be add to the stack
     * @return {?}
     */
    function (view) {
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
        this.activeViewsStack = uniqBy(this.activeViewsStack, function (v) { return v.uniqueId; });
    };
    /**
     * Pop last active view. This will remove the view from the active stack
     */
    /**
     * Pop last active view. This will remove the view from the active stack
     * @return {?}
     */
    McoContainerService.prototype.popLastActiveView = /**
     * Pop last active view. This will remove the view from the active stack
     * @return {?}
     */
    function () {
        return this.activeViewsStack.pop();
    };
    /**
     * Remove a view that has been destroyed from the stack.
     *
     * @param view ViewComponent to be removed from stack
     */
    /**
     * Remove a view that has been destroyed from the stack.
     *
     * @param {?} view ViewComponent to be removed from stack
     * @return {?}
     */
    McoContainerService.prototype.removeView = /**
     * Remove a view that has been destroyed from the stack.
     *
     * @param {?} view ViewComponent to be removed from stack
     * @return {?}
     */
    function (view) {
        if (view.canBeActiveView !== true) {
            if (this.actionForwardHandler != null) {
                this.actionForwardHandler.delete(view.actionForwardName);
            }
        }
        else {
            this.activeViewsStack = filter(this.activeViewsStack, function (v) { return v.uniqueId !== view.uniqueId; });
            this.reStackView();
        }
    };
    /**
     * Minimize a view window by ID
     * @param viewId Id of view to minimize
     * @param screenIndex (optional) index of screen if multi screen support is allowed
     */
    /**
     * Minimize a view window by ID
     * @param {?} viewId Id of view to minimize
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    McoContainerService.prototype.minimizeView = /**
     * Minimize a view window by ID
     * @param {?} viewId Id of view to minimize
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    function (viewId, screenIndex) {
        if (screenIndex === void 0) { screenIndex = null; }
        /** @type {?} */
        var view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.isMinimized = true;
        }
        /** @type {?} */
        var activeView = null;
        /** @type {?} */
        var isModalActive = false;
        if (this.activeViewsCount() > 1) {
            /** @type {?} */
            var visibleViews = this.activeViewsStack.filter(function (v) { return v.isMinimized !== true && v.skipBreadCrumb !== true; });
            if (visibleViews != null && visibleViews.length > 0) {
                activeView = visibleViews[visibleViews.length - 1];
                /** @type {?} */
                var i = visibleViews.length - 1;
                // Itterate through visibile views to look for the next dialog view (not subview)
                while (visibleViews[i] && !activeView.dialog) {
                    activeView = visibleViews[i];
                    i--;
                }
                /** @type {?} */
                var count = 0;
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
    };
    /**
     * Shows a view by id
     * @param viewId Id of view to show
     * @param screenIndex (optional) index of screen if multi screen support is allowed
     */
    /**
     * Shows a view by id
     * @param {?} viewId Id of view to show
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    McoContainerService.prototype.showView = /**
     * Shows a view by id
     * @param {?} viewId Id of view to show
     * @param {?=} screenIndex (optional) index of screen if multi screen support is allowed
     * @return {?}
     */
    function (viewId, screenIndex) {
        if (screenIndex === void 0) { screenIndex = null; }
        /** @type {?} */
        var view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.isMinimized = true;
        }
        /** @type {?} */
        var isModalActive = false;
        /** @type {?} */
        var count = 0;
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
    };
    /**
     * Close the view window
     * @param viewId Id of view to close
     * @param screenIndex (optional) index of the screen if multi screen support
     */
    /**
     * Close the view window
     * @param {?} viewId Id of view to close
     * @param {?=} screenIndex (optional) index of the screen if multi screen support
     * @return {?}
     */
    McoContainerService.prototype.closeView = /**
     * Close the view window
     * @param {?} viewId Id of view to close
     * @param {?=} screenIndex (optional) index of the screen if multi screen support
     * @return {?}
     */
    function (viewId, screenIndex) {
        if (screenIndex === void 0) { screenIndex = null; }
        /** @type {?} */
        var view = this.getViewById(viewId, screenIndex);
        if (view != null) {
            view.close();
        }
    };
    /**
     * Get the number of current active view from [[activeViewsStack]]
     * @returns Number of active views
     */
    /**
     * Get the number of current active view from [[activeViewsStack]]
     * @return {?} Number of active views
     */
    McoContainerService.prototype.activeViewsCount = /**
     * Get the number of current active view from [[activeViewsStack]]
     * @return {?} Number of active views
     */
    function () {
        return this.activeViewsStack.length;
    };
    /**
     * Check to see if a view is in the [[activeViewStack]]
     * @param view ViewComponent's id as a string or [[ViewComponent]] instance
     * @returns True if the view component is in the [[activeViewStack]]
     */
    /**
     * Check to see if a view is in the [[activeViewStack]]
     * @param {?} view ViewComponent's id as a string or [[ViewComponent]] instance
     * @return {?} True if the view component is in the [[activeViewStack]]
     */
    McoContainerService.prototype.hasView = /**
     * Check to see if a view is in the [[activeViewStack]]
     * @param {?} view ViewComponent's id as a string or [[ViewComponent]] instance
     * @return {?} True if the view component is in the [[activeViewStack]]
     */
    function (view) {
        if (typeof view === 'string') {
            return filter(this.activeViewsStack, function (v) { return v.id === /** @type {?} */ (view); }).length > 0;
        }
        return filter(this.activeViewsStack, function (v) { return v.uniqueId === view.uniqueId; }).length > 0;
    };
    /**
     * Get the current active view
     * @returns the active view from the view stack
     */
    /**
     * Get the current active view
     * @return {?} the active view from the view stack
     */
    McoContainerService.prototype.activeView = /**
     * Get the current active view
     * @return {?} the active view from the view stack
     */
    function () {
        return this.activeViewsCount() > 0 ? this.activeViewsStack[this.activeViewsCount() - 1] : null;
    };
    /**
     * Get a view from [[actriveViewStack]] by ID
     * @param viewId Views id value
     * @param screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
     * @returns View that matches value of id
     */
    /**
     * Get a view from [[actriveViewStack]] by ID
     * @param {?} viewId Views id value
     * @param {?=} screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
     * @return {?} View that matches value of id
     */
    McoContainerService.prototype.getViewById = /**
     * Get a view from [[actriveViewStack]] by ID
     * @param {?} viewId Views id value
     * @param {?=} screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
     * @return {?} View that matches value of id
     */
    function (viewId, screenIndex) {
        if (screenIndex === void 0) { screenIndex = null; }
        return find(this.activeViewsStack, function (view) {
            return view.id === viewId && (screenIndex == null || (screenIndex != null && view.screenIndex === screenIndex));
        });
    };
    /**
     * Get handler view component by name
     * @param actionForwardName
     * @returns View component or null if there is no component with actionForwardName
     */
    /**
     * Get handler view component by name
     * @param {?} actionForwardName
     * @return {?} View component or null if there is no component with actionForwardName
     */
    McoContainerService.prototype.getActionForwardHandler = /**
     * Get handler view component by name
     * @param {?} actionForwardName
     * @return {?} View component or null if there is no component with actionForwardName
     */
    function (actionForwardName) {
        if (this.actionForwardHandler != null) {
            return this.actionForwardHandler.get(actionForwardName);
        }
        return null;
    };
    /**
     * Get the [[actionForwardHandler]]
     */
    /**
     * Get the [[actionForwardHandler]]
     * @return {?}
     */
    McoContainerService.prototype.getActionForwardHandlerMap = /**
     * Get the [[actionForwardHandler]]
     * @return {?}
     */
    function () {
        return this.actionForwardHandler;
    };
    /**
     * Get the [[activeViewStack]]
     */
    /**
     * Get the [[activeViewStack]]
     * @return {?}
     */
    McoContainerService.prototype.getViews = /**
     * Get the [[activeViewStack]]
     * @return {?}
     */
    function () {
        return this.activeViewsStack;
    };
    /**
     * Update z-index (layer position) of all active views
     * @param topViewId ID of view component to set max z-index (top)
     */
    /**
     * Update z-index (layer position) of all active views
     * @param {?=} topViewId ID of view component to set max z-index (top)
     * @param {?=} screenIndex
     * @return {?}
     */
    McoContainerService.prototype.reStackView = /**
     * Update z-index (layer position) of all active views
     * @param {?=} topViewId ID of view component to set max z-index (top)
     * @param {?=} screenIndex
     * @return {?}
     */
    function (topViewId, screenIndex) {
        var _this = this;
        if (topViewId === void 0) { topViewId = null; }
        if (screenIndex === void 0) { screenIndex = null; }
        this.activeViewsStack = sortBy(this.activeViewsStack, function (view) {
            //we are top view
            if (view.id === topViewId && (screenIndex == null || (screenIndex === view.screenIndex))) {
                return _this.MAX_Z_INDEX;
            }
            return view.zIndex;
        });
        /** @type {?} */
        var isModalActive = false;
        forEach(this.activeViewsStack, function (view, idx) {
            view.updateZIndex(_this.MIN_Z_INDEX + idx);
            if (isModalActive !== true && view.isModalDialog() === true) {
                isModalActive = true;
            }
        });
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: this.activeViewsStack[this.activeViewsStack.length - 1],
            isModalActive: isModalActive
        });
    };
    /**
     * Get the z-index
     */
    /**
     * Get the z-index
     * @return {?}
     */
    McoContainerService.prototype.getViewZIndex = /**
     * Get the z-index
     * @return {?}
     */
    function () {
        return this.MIN_Z_INDEX + this.activeViewsCount();
    };
    /**
     * @param {?} views
     * @return {?}
     */
    McoContainerService.prototype.getBreadcrumb = /**
     * @param {?} views
     * @return {?}
     */
    function (views) {
        return views.filter(function (v) { return v.skipBreadCrumb !== true && v.dialog != null && v.visible !== false; });
    };
    /**
     * Get the session from an MCO instance
     * @param mco
     * @returns Session
     */
    /**
     * Get the session from an MCO instance
     * @param {?} mco
     * @return {?} Session
     */
    McoContainerService.getClientSessionFromMco = /**
     * Get the session from an MCO instance
     * @param {?} mco
     * @return {?} Session
     */
    function (mco) {
        return mco.getSession();
    };
    /**
     * 次のscreenIndexを取得します。
     * screenIndexは1~8の値をとるように、サーバで想定されています。
     */
    /**
     * 次のscreenIndexを取得します。
     * screenIndexは1~8の値をとるように、サーバで想定されています。
     * @param {?} baseScreenId
     * @param {?=} id
     * @return {?}
     */
    McoContainerService.prototype.nextScreenIndex = /**
     * 次のscreenIndexを取得します。
     * screenIndexは1~8の値をとるように、サーバで想定されています。
     * @param {?} baseScreenId
     * @param {?=} id
     * @return {?}
     */
    function (baseScreenId, id) {
        if (id === void 0) { id = null; }
        /** @type {?} */
        var existingScreens = this.activeViewsStack.filter(function (v) {
            return (id)
                ? v.id === id
                : v.baseScreenId === baseScreenId;
        });
        if (existingScreens.length > 0) {
            /** @type {?} */
            var i = orderBy(existingScreens, function (scr) { return scr.screenIndex; }, "desc")
                .pop().screenIndex;
            return i + 1;
        }
        else {
            return 1;
        }
    };
    /**
     * @return {?}
     */
    McoContainerService.prototype.refreshBreadCrumb = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isModalActive = false;
        forEach(this.activeViewsStack, function (view) {
            if (isModalActive !== true && view.isModalDialog() === true) {
                isModalActive = true;
            }
        });
        this.viewsChanged.next({
            views: this.getBreadcrumb(this.activeViewsStack),
            activeView: this.activeViewsStack[this.activeViewsStack.length - 1],
            isModalActive: isModalActive
        });
    };
    McoContainerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ McoContainerService.ngInjectableDef = defineInjectable({ factory: function McoContainerService_Factory() { return new McoContainerService(); }, token: McoContainerService, providedIn: "root" });
    return McoContainerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Track events
 */
var EventHandlerService = /** @class */ (function () {
    function EventHandlerService(mcoContainerService) {
        this.mcoContainerService = mcoContainerService;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    EventHandlerService.prototype.setClientEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._clientEvent = event;
    };
    /**
     * @return {?}
     */
    EventHandlerService.prototype.getClientEvent = /**
     * @return {?}
     */
    function () {
        return this._clientEvent;
    };
    /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    EventHandlerService.prototype.fireEvent = /**
     * @param {?} command
     * @param {?} mcoName
     * @param {?} actionName
     * @param {?} arg
     * @param {?} source
     * @param {?} clientEvent
     * @return {?}
     */
    function (command, mcoName, actionName, arg, source, clientEvent) {
        /** @type {?} */
        var mco = this.mcoContainerService.getMco(mcoName);
        if (mco != null && typeof mco[actionName] === "function") {
            if (Array.isArray(arg)) {
                (/** @type {?} */ (mco[actionName])).apply(mco, arg);
            }
            else {
                (/** @type {?} */ (mco[actionName])).apply(mco, [arg]);
            }
        }
    };
    EventHandlerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    EventHandlerService.ctorParameters = function () { return [
        { type: McoContainerService }
    ]; };
    /** @nocollapse */ EventHandlerService.ngInjectableDef = defineInjectable({ factory: function EventHandlerService_Factory() { return new EventHandlerService(inject(McoContainerService)); }, token: EventHandlerService, providedIn: "root" });
    return EventHandlerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for creating [[MenuItems]]
 */
var MenuItemBuilder = /** @class */ (function () {
    /* istanbul ignore next */
    /**
     *
     * @param menuItem
     */
    function MenuItemBuilder(menuItem) {
        if (menuItem === void 0) { menuItem = null; }
        /**
         * Map of HTML attributes to add to menu item
         */
        this.attributes = {};
        this._internalMenuItem = menuItem;
    }
    /**
     * Create a menu separator using hyphens
     */
    /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    MenuItemBuilder.createHorizontalDivider = /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    function () {
        /** @type {?} */
        var menuItem = new MenuItemBuilder();
        menuItem.setAttribute("text", "-");
        return menuItem;
    };
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @returns [[MenuItemBuilder]] instance
     */
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    MenuItemBuilder.createMenuItem = /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    function () {
        return new MenuItemBuilder();
    };
    /**
     * Set text attribute
     * @param text
     */
    /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    MenuItemBuilder.prototype.setText = /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.setAttribute("text", text);
    };
    /* istanbul ignore next */
    /**
     *
     * @param width
     */
    /**
     *
     * @param {?} width
     * @return {?}
     */
    MenuItemBuilder.prototype.setWidth = /**
     *
     * @param {?} width
     * @return {?}
     */
    function (width) {
        //don't think this should be doing anything, all menu item shared the same width
    };
    /* istanbul ignore next */
    /**
     *
     * @param img
     */
    /**
     *
     * @param {?} img
     * @return {?}
     */
    MenuItemBuilder.prototype.setImgHint = /**
     *
     * @param {?} img
     * @return {?}
     */
    function (img) {
        //TODO
    };
    /**
     * Sets event handler for mousedown
     * @param fn Mouse down event handler function
     */
    /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    MenuItemBuilder.prototype.setOnMouseDown = /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    function (fn) {
        this.setAttribute("onMouseDownCallback", fn);
    };
    /* istanbul ignore next */
    /**
     * Set margin attribute
     * @param margin Should be number
     */
    /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    MenuItemBuilder.prototype.setMargin = /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    function (margin) {
        this.setAttribute("margin", margin);
    };
    /**
     * Set fontColor attribute
     * @param color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     */
    /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontColor = /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    function (color) {
        this.setAttribute("fontColor", color);
    };
    /**
     * Set fontSize attribute
     * @param size Should be number
     */
    /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontSize = /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    function (size) {
        this.setAttribute("fontSize", size);
    };
    /**
     * Set fontBold attribute
     * @param bold
     */
    /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontBold = /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    function (bold) {
        this.setAttribute("fontBold", bold);
    };
    /* istanbul ignore next */
    /**
     * Set custom attribute on [[MenuItem]]
     * @param name
     * @param value
     */
    /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    MenuItemBuilder.prototype.setAttribute = /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
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
    };
    /* istanbul ignore next */
    /**
     * Return the value of the attribute
     *
     * @param name the name of the attribute
     */
    /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    MenuItemBuilder.prototype.getAttribute = /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    function (name) {
        return this.attributes[name];
    };
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param parentScreenId
     */
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    MenuItemBuilder.prototype.toMenuItem = /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (parentScreenId) {
        var e_1, _a;
        /** @type {?} */
        var menuItem = {};
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
            menuItem.menuItems = map(this.attributes["menuItems"], function (subMenu) { return subMenu.toMenuItem(parentScreenId); });
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
        var keys$$1 = filter(keys(this.attributes), function (key) {
            return MenuItemBuilder.knownKeys.indexOf(key) < 0;
        });
        if (keys$$1 && keys$$1.length > 0) {
            menuItem.customAttributes = {};
            try {
                for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    menuItem.customAttributes[key] = this.attributes[key];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return menuItem;
    };
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     */
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.prototype.appendChild = /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        if (this.attributes["menuItems"] == null) {
            this.attributes["menuItems"] = [];
        }
        if (menuItem instanceof MenuItemBuilder) {
            this.attributes["menuItems"].push(menuItem);
        }
    };
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param menuItem
     */
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.fromMenuItem = /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        return new MenuItemBuilder(menuItem);
    };
    /**
     * Clear out style values for [[MenuItem]]
     * @param menuItem
     */
    /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.initStyle = /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        if (menuItem.styles == null) {
            menuItem.styles = {};
        }
    };
    //free resource
    /**
     * @return {?}
     */
    MenuItemBuilder.prototype._free = /**
     * @return {?}
     */
    function () {
        this._internalMenuItem = null;
        this.attributes = null;
    };
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
    return MenuItemBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service class to handle context menus
 */
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.contextMenuMap = new Map();
        this.activeMenuSubject = new Subject();
        this.activeMenuObservable = this.activeMenuSubject.asObservable();
    }
    /**
     *
     * @param name
     * @param menuItems
     * @param parentScreenId
     */
    /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    ContextMenuService.prototype.registerContextMenu = /**
     *
     * @param {?} name
     * @param {?} menuItems
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (name, menuItems, parentScreenId) {
        if (parentScreenId === void 0) { parentScreenId = null; }
        /** @type {?} */
        var key = this.rekey(name);
        if (this.contextMenuMap.has(key)) {
            /** @type {?} */
            var menuData = this.contextMenuMap.get(key);
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
    };
    /**
     * Set the active and visible context menu by name
     * @param name
     */
    /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    ContextMenuService.prototype.showContextMenu = /**
     * Set the active and visible context menu by name
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var hasContextMenu = false;
        if (this.contextMenuMap.has(this.rekey(name))) {
            hasContextMenu = true;
        }
        this.setActiveMenu(name);
        this.activeMenu = name;
        if (this.menuItemBuilders != null) {
            this.menuItemBuilders.forEach(function (menuItemBuilder) { return menuItemBuilder._free(); });
            this.menuItemBuilders = [];
        }
        return hasContextMenu;
    };
    /**
     * Deactivate menu by name, and hide it
     * @param name
     */
    /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    ContextMenuService.prototype.hideContextMenu = /**
     * Deactivate menu by name, and hide it
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.setActiveMenu(null);
        this.activeMenu = null;
    };
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param name Name of [[PopupMenuData]] key
     * @returns Menu items in data if it exists, otherwise null
     */
    /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    ContextMenuService.prototype.getContextMenuItems = /**
     * Get menu items by [[PopupMenuData]] name key
     * @param {?} name Name of [[PopupMenuData]] key
     * @return {?} Menu items in data if it exists, otherwise null
     */
    function (name) {
        /** @type {?} */
        var menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.menuItems;
        }
        return null;
    };
    /**
     * Get the menu's parent id
     * @param name Name of [[PopupMenuData]] item key
     */
    /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    ContextMenuService.prototype.getContextMenuParentScreenId = /**
     * Get the menu's parent id
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var menuData = this.contextMenuMap.get(this.rekey(name));
        if (menuData != null) {
            return menuData.parentScreenId;
        }
        return null;
    };
    /**
     * Remove context menu item by name
     * @param name Name of [[PopupMenuData]] item key
     */
    /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    ContextMenuService.prototype.removeContextMenu = /**
     * Remove context menu item by name
     * @param {?} name Name of [[PopupMenuData]] item key
     * @return {?}
     */
    function (name) {
        this.contextMenuMap.delete(this.rekey(name));
        if (this.activeMenu === name) {
            this.activeMenu = null;
        }
    };
    /**
     * Set active menu
     * @param id Id of menu to set as active
     */
    /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    ContextMenuService.prototype.setActiveMenu = /**
     * Set active menu
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    function (id) {
        this.activeMenuSubject.next(id);
    };
    /**
     * Set menu items by parent screen id
     * @param id Id of parent containing menu
     * @param menuItems Items to set
     */
    /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    ContextMenuService.prototype.resetMenu = /**
     * Set menu items by parent screen id
     * @param {?} id Id of parent containing menu
     * @param {?} menuItems Items to set
     * @return {?}
     */
    function (id, menuItems) {
        /** @type {?} */
        var newMenuItems;
        /** @type {?} */
        var parentScreenId = this.getContextMenuParentScreenId(id);
        if (menuItems.length > 0 && menuItems[0] instanceof MenuItemBuilder) {
            newMenuItems = map(menuItems, function (menuItem) { return menuItem.toMenuItem(parentScreenId); });
        }
        else {
            newMenuItems = (/** @type {?} */ (menuItems)) || [];
        }
        this.registerContextMenu(id, newMenuItems);
    };
    /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    ContextMenuService.prototype.rekey = /**
     * Convert key to lowercase
     * @param {?} key
     * @return {?} key value as lowercased string
     */
    function (key) {
        return key.toLowerCase();
    };
    /**
     * This is for special case
     * @param menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     */
    /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    ContextMenuService.prototype._trackMenuItemBuilderForMemRelease = /**
     * This is for special case
     * @param {?} menuItemBuilder MenuItemBuilder to be released of memory when showContextMenu is called.
     * @return {?}
     */
    function (menuItemBuilder) {
        if (this.menuItemBuilders == null) {
            this.menuItemBuilders = [];
        }
        this.menuItemBuilders.push(menuItemBuilder);
    };
    ContextMenuService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextMenuService.ctorParameters = function () { return []; };
    /** @nocollapse */ ContextMenuService.ngInjectableDef = defineInjectable({ factory: function ContextMenuService_Factory() { return new ContextMenuService(); }, token: ContextMenuService, providedIn: "root" });
    return ContextMenuService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for managing client sessions
 */
var SessionService = /** @class */ (function () {
    /**
     *
     * @param _mcoContainer
     * @param _eventHandlerService
     * @param injector
     * @param contextMenuService
     * @param ngZone
     */
    function SessionService(_mcoContainer, _eventHandlerService, injector, contextMenuService, ngZone) {
        var _this = this;
        this._mcoContainer = _mcoContainer;
        this._eventHandlerService = _eventHandlerService;
        this.injector = injector;
        this.contextMenuService = contextMenuService;
        this.defsMap = new Map();
        ngZone.runOutsideAngular(function () {
            document.addEventListener("keydown", function (event) { return _this.checkKey(event); }, true);
            document.addEventListener("keyup", function (event) { return _this.resetKey(event); }, true);
            //track when window lost/gain focus
            window.addEventListener("focusout", function (event) {
                _this._windowLostFocus = true;
            }, true);
            window.addEventListener("focusin", function () {
                _this._windowLostFocus = false;
            }, true);
        });
    }
    /**
     * Get internal [[_mcoContainer]]
     */
    /**
     * Get internal [[_mcoContainer]]
     * @return {?}
     */
    SessionService.prototype.getMcoContainer = /**
     * Get internal [[_mcoContainer]]
     * @return {?}
     */
    function () {
        return this._mcoContainer;
    };
    /**
     * Get internal [[_eventHandlerService]]
     */
    /**
     * Get internal [[_eventHandlerService]]
     * @return {?}
     */
    SessionService.prototype.getEventHandler = /**
     * Get internal [[_eventHandlerService]]
     * @return {?}
     */
    function () {
        return this._eventHandlerService;
    };
    /**
     * Set [[requestService]] value
     * @param requestService
     */
    /**
     * Set [[requestService]] value
     * @param {?} requestService
     * @return {?}
     */
    SessionService.prototype.registerRequestService = /**
     * Set [[requestService]] value
     * @param {?} requestService
     * @return {?}
     */
    function (requestService) {
        this.requestService = requestService;
    };
    /**
     * Get value of [[requestService]] property
     * @returns The requestService
     */
    /**
     * Get value of [[requestService]] property
     * @return {?} The requestService
     */
    SessionService.prototype.getRequestService = /**
     * Get value of [[requestService]] property
     * @return {?} The requestService
     */
    function () {
        return this.requestService;
    };
    /**
     * Set [[routeNavigator]] value
     * @param routeNavigator
     */
    /**
     * Set [[routeNavigator]] value
     * @param {?} routeNavigator
     * @return {?}
     */
    SessionService.prototype.registerRouteNavigatorService = /**
     * Set [[routeNavigator]] value
     * @param {?} routeNavigator
     * @return {?}
     */
    function (routeNavigator) {
        this.routeNavigator = routeNavigator;
    };
    /**
     * Get value of [[routeNavigator]] property
     */
    /**
     * Get value of [[routeNavigator]] property
     * @return {?}
     */
    SessionService.prototype.getRouteNavigatorService = /**
     * Get value of [[routeNavigator]] property
     * @return {?}
     */
    function () {
        return this.routeNavigator;
    };
    /**
     * Set the position of the mouse
     * @param event
     */
    /**
     * Set the position of the mouse
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.setMousePosition = /**
     * Set the position of the mouse
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mousePosition = {
            x: event.clientX,
            y: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY
        };
    };
    /**
     * Get the mouse position
     * @returns Object with properties: x, y, screenX, screenY
     */
    /**
     * Get the mouse position
     * @return {?} Object with properties: x, y, screenX, screenY
     */
    SessionService.prototype.getMousePosition = /**
     * Get the mouse position
     * @return {?} Object with properties: x, y, screenX, screenY
     */
    function () {
        return this.mousePosition;
    };
    /**
     * Delegate to [[Injector]].get method
     * @param type
     */
    /**
     * Delegate to [[Injector]].get method
     * @param {?} type
     * @return {?}
     */
    SessionService.prototype.getInjector = /**
     * Delegate to [[Injector]].get method
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.injector.get(type);
    };
    /**
     * Get display service.
     */
    /**
     * Get display service.
     * @return {?}
     */
    SessionService.prototype.getDisplayService = /**
     * Get display service.
     * @return {?}
     */
    function () {
        //TODO
        return null;
    };
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param id Context menu id
     */
    /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    SessionService.prototype.showContextMenu = /**
     * Delegate to [[ContextMenuService]].showContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    function (id) {
        return this.contextMenuService.showContextMenu(id);
    };
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param id Context menu id
     */
    /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    SessionService.prototype.hideContextMenu = /**
     * Delegate to [[ContextMenuService]].hideContextMenu
     * @param {?} id Context menu id
     * @return {?}
     */
    function (id) {
        this.contextMenuService.hideContextMenu(id);
    };
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param id Menu id
     * @param menuItems
     */
    /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param {?} id Menu id
     * @param {?} menuItems
     * @return {?}
     */
    SessionService.prototype.resetContextMenu = /**
     * Delegate to [[ContextMenuService]].resetMenu. And set [[_currentPopupMenuId]]
     * @param {?} id Menu id
     * @param {?} menuItems
     * @return {?}
     */
    function (id, menuItems) {
        this.contextMenuService.resetMenu(id, menuItems);
        this._currentPopupMenuId = id;
    };
    /**
     * Add entry to [[defsMap]] Map
     * @param id Key
     * @param data Value
     */
    /**
     * Add entry to [[defsMap]] Map
     * @param {?} id Key
     * @param {?} data Value
     * @return {?}
     */
    SessionService.prototype.storeDef = /**
     * Add entry to [[defsMap]] Map
     * @param {?} id Key
     * @param {?} data Value
     * @return {?}
     */
    function (id, data) {
        this.defsMap.set(id, data);
    };
    /**
     * Get def map entry by key
     * @param id Key
     */
    /**
     * Get def map entry by key
     * @param {?} id Key
     * @return {?}
     */
    SessionService.prototype.getDef = /**
     * Get def map entry by key
     * @param {?} id Key
     * @return {?}
     */
    function (id) {
        return this.defsMap.get(id);
    };
    /**
     * Delete def from [[defsMap]] by key
     * @param id Key to delete
     */
    /**
     * Delete def from [[defsMap]] by key
     * @param {?} id Key to delete
     * @return {?}
     */
    SessionService.prototype.deleteDef = /**
     * Delete def from [[defsMap]] by key
     * @param {?} id Key to delete
     * @return {?}
     */
    function (id) {
        this.defsMap.delete(id);
    };
    /**
     * Get [[isCtrl]] property value
     * @returns True if control key is pressed, otherwise false.
     */
    /**
     * Get [[isCtrl]] property value
     * @return {?} True if control key is pressed, otherwise false.
     */
    SessionService.prototype.isCtrlPressed = /**
     * Get [[isCtrl]] property value
     * @return {?} True if control key is pressed, otherwise false.
     */
    function () {
        return this.isCtrl === true;
    };
    /**
     * Get [[isShift]] property value
     * @returns True if shift key is pressed, otherwise false.
     */
    /**
     * Get [[isShift]] property value
     * @return {?} True if shift key is pressed, otherwise false.
     */
    SessionService.prototype.isShiftPressed = /**
     * Get [[isShift]] property value
     * @return {?} True if shift key is pressed, otherwise false.
     */
    function () {
        return this.isShift === true;
    };
    /**
     * Get [[isAlt]] property value
     * @returns True if alt key is pressed, otherwise false.
     */
    /**
     * Get [[isAlt]] property value
     * @return {?} True if alt key is pressed, otherwise false.
     */
    SessionService.prototype.isAltPressed = /**
     * Get [[isAlt]] property value
     * @return {?} True if alt key is pressed, otherwise false.
     */
    function () {
        return this.isAlt === true;
    };
    /**
     * Get [[messagingService]] property
     * @returns Value of [[messagingServiced]]
     */
    /**
     * Get [[messagingService]] property
     * @return {?} Value of [[messagingServiced]]
     */
    SessionService.prototype.getMessagingService = /**
     * Get [[messagingService]] property
     * @return {?} Value of [[messagingServiced]]
     */
    function () {
        return this.messagingService;
    };
    /**
     * Set [[messagingService]] property
     * @param service
     */
    /**
     * Set [[messagingService]] property
     * @param {?} service
     * @return {?}
     */
    SessionService.prototype.registerMessagingService = /**
     * Set [[messagingService]] property
     * @param {?} service
     * @return {?}
     */
    function (service) {
        this.messagingService = service;
    };
    /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.checkKey = /**
     * Key down handler to set internal flags for Control, Shift, and Alt
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isCtrl = event.ctrlKey;
        this.isShift = event.shiftKey;
        this.isAlt = event.altKey;
    };
    /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param {?} event
     * @return {?}
     */
    SessionService.prototype.resetKey = /**
     * Keyboard event handler for setting all internal flags for Control, Shift, and Alt to false
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isCtrl = false;
        this.isShift = false;
        this.isAlt = false;
    };
    SessionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SessionService.ctorParameters = function () { return [
        { type: McoContainerService },
        { type: EventHandlerService },
        { type: Injector },
        { type: ContextMenuService },
        { type: NgZone }
    ]; };
    return SessionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var IllegalArgumentException = /** @class */ (function (_super) {
    __extends(IllegalArgumentException, _super);
    function IllegalArgumentException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IllegalArgumentException;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var JavaUtils = /** @class */ (function () {
    function JavaUtils() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.isNumber = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str == null ? false : JavaUtils.NUMERIC.test(str);
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    JavaUtils.booleanToString = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        if (boo === true) {
            return 'true';
        }
        return 'false';
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.equals = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return a == b;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.parseBoolean = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'boolean') {
            return val;
        }
        else if (typeof val === 'string') {
            return val === 'true' ? true : false;
        }
        else {
            throw new Error('Unsupport boolean value: ' + val);
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.stringValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'string') {
            return val;
        }
        return val + '';
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.longValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            return parseInt$1(str);
        }
        return null;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.doubleValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            /** @type {?} */
            var result = str.indexOf(".") >= 0 ? parseFloat(str) : parseInt$1(str);
            if (isNaN(result)) {
                throw new IllegalArgumentException;
            }
            return result;
        }
        return null;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.intValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            return parseInt$1(str);
        }
        return null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.toString = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'number') {
            return val + '';
        }
        else if (typeof val === 'boolean') {
            return JavaUtils.booleanToString(val);
        }
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.compareTo = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var retVal = null;
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
    };
    /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    JavaUtils.bigDecimal = /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    function (val, scale, roundingMode) {
        if (scale === void 0) { scale = 0; }
        if (roundingMode === void 0) { roundingMode = -1; }
        /** @type {?} */
        var fixedValue = typeof val === 'number' ? val : parseFloat(val);
        if (scale > 0) {
            return parseFloat(fixedValue + "." + padStart('', scale, '0'));
        }
        else {
            return fixedValue;
        }
    };
    /**
     * @param {?} num
     * @return {?}
     */
    JavaUtils.signum = /**
     * @param {?} num
     * @return {?}
     */
    function (num) {
        return num === 0 ? 0 : num > 0 ? 1 : -1;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.floatValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return parseFloat(str);
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.lessThan = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (isMoment(a) && isMoment(b)) {
            return (/** @type {?} */ (a)).isBefore(b);
        }
        return a < b;
    };
    JavaUtils.NUMERIC = new RegExp("^[0-9]+$");
    return JavaUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClientEvent = /** @class */ (function () {
    function ClientEvent(_source, _event) {
        this._source = _source;
        this._event = _event;
        this._parameters = new Map();
        this._attributes = new Map();
    }
    /**
     * @return {?}
     */
    ClientEvent.prototype.getSource = /**
     * @return {?}
     */
    function () {
        return this._source;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.getEvent = /**
     * @return {?}
     */
    function () {
        return this._event;
    };
    /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setParameter = /**
     * @param {?} paramName
     * @param {?} value
     * @return {?}
     */
    function (paramName, value) {
        this._parameters.set(KeyUtils.toMapKey(paramName), value);
    };
    /**
     * @param {?} paramName
     * @return {?}
     */
    ClientEvent.prototype.getParameter = /**
     * @param {?} paramName
     * @return {?}
     */
    function (paramName) {
        return this._parameters.get(KeyUtils.toMapKey(paramName));
    };
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setAttribute = /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    function (attributeName, value) {
        this._attributes.set(KeyUtils.toMapKey(attributeName), value);
    };
    /**
     * @param {?} attributeName
     * @return {?}
     */
    ClientEvent.prototype.getAttribute = /**
     * @param {?} attributeName
     * @return {?}
     */
    function (attributeName) {
        return this._attributes.get(KeyUtils.toMapKey(attributeName));
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.stopPropagation = /**
     * @return {?}
     */
    function () {
        if (this._event != null) {
            this._event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.preventDefault = /**
     * @return {?}
     */
    function () {
        if (this._event != null) {
            this._event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ClientEvent.prototype.setReturnValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._returnValue = value;
        this._returnValueSet = true;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.getReturnValue = /**
     * @return {?}
     */
    function () {
        return this._returnValue;
    };
    /**
     * @return {?}
     */
    ClientEvent.prototype.isReturnValueSet = /**
     * @return {?}
     */
    function () {
        //can't check for returnValue is null b/c it can be set to null
        return this._returnValueSet === true ? true : false;
    };
    return ClientEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
var /**
 * @template E
 */
ListIterator = /** @class */ (function () {
    function ListIterator(data) {
        this.data = data;
        this.currentIndex = 0;
    }
    /**
     * @return {?}
     */
    ListIterator.prototype.hasNext = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > this.currentIndex;
    };
    /**
     * @template T
     * @return {?}
     */
    ListIterator.prototype.next = /**
     * @template T
     * @return {?}
     */
    function () {
        if (this.currentIndex < this.data.length) {
            return this.data[this.currentIndex++];
        }
        throw new Error('No such element');
    };
    return ListIterator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
var  /**
 * @template E
 */
Vector = /** @class */ (function () {
    function Vector(size) {
        this.data = [];
        if (Array.isArray(size)) {
            this.data = size;
        }
    }
    /**
     * @return {?}
     */
    Vector.prototype.toArray = /**
     * @return {?}
     */
    function () {
        return this.data;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Vector.prototype.setData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.data = data;
    };
    /**
     * @return {?}
     */
    Vector.prototype.size = /**
     * @return {?}
     */
    function () {
        return this.data == null ? 0 : this.data.length;
    };
    /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.get = /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (this.size() > idx) {
            return /** @type {?} */ (this.data[idx]);
        }
        return null;
    };
    /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    Vector.prototype.add = /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    function (element, insertionIndex) {
        if (insertionIndex === void 0) { insertionIndex = -1; }
        if (insertionIndex === -1) {
            return this.data.push(element);
        }
        else {
            this.data.splice(insertionIndex, 0, element);
            return insertionIndex;
        }
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.delete = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (this.get(idx)) {
            this.data.splice(idx, 1);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Vector.prototype.addElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return this.add(element);
    };
    /**
     * @param {?} vec
     * @return {?}
     */
    Vector.prototype.addAll = /**
     * @param {?} vec
     * @return {?}
     */
    function (vec) {
        /** @type {?} */
        var it = vec.iterator();
        while (it.hasNext()) {
            this.add(it.next());
        }
    };
    /**
     * @return {?}
     */
    Vector.prototype.firstElement = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > 0 ? this.data[0] : null;
    };
    /**
     * @return {?}
     */
    Vector.prototype.lastElement = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > 0 ? this.data[this.data.length - 1] : null;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Vector.prototype.contains = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return this.data != null && this.data.indexOf(element) >= 0 ? true : false;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.elementAt = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        return this.get(idx);
    };
    /**
     * @return {?}
     */
    Vector.prototype.isEmpty = /**
     * @return {?}
     */
    function () {
        return this.data == null || this.data.length === 0;
    };
    /**
     * @return {?}
     */
    Vector.prototype.iterator = /**
     * @return {?}
     */
    function () {
        return new ListIterator(clone(this.data));
    };
    return Vector;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AttributeChangeEvent = /** @class */ (function () {
    function AttributeChangeEvent(name, oldValue, newValue, sourceElement) {
        this.name = name;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.sourceElement = sourceElement;
    }
    /**
     * @return {?}
     */
    AttributeChangeEvent.prototype.getName = /**
     * @return {?}
     */
    function () {
        return this.name;
    };
    /**
     * @return {?}
     */
    AttributeChangeEvent.prototype.getOldValue = /**
     * @return {?}
     */
    function () {
        return this.oldValue;
    };
    /**
     * @return {?}
     */
    AttributeChangeEvent.prototype.getNewValue = /**
     * @return {?}
     */
    function () {
        return this.newValue;
    };
    /**
     * @return {?}
     */
    AttributeChangeEvent.prototype.getSourceElement = /**
     * @return {?}
     */
    function () {
        return this.sourceElement;
    };
    return AttributeChangeEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AppUtils = /** @class */ (function () {
    function AppUtils() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    AppUtils.parseDom = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this.domParser.parseFromString(str, "application/xml").firstElementChild;
    };
    /** attributeOverrideInitializer */
    /**
     * attributeOverrideInitializer
     * @return {?}
     */
    AppUtils.attributeOverrideInitializer = /**
     * attributeOverrideInitializer
     * @return {?}
     */
    function () {
        this.attributeOverrideClassInitializer();
        this.attributeOverrideValidateInitializer();
    };
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
    return AppUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
var  /**
 * @template K, V
 */
HashMap = /** @class */ (function () {
    function HashMap() {
        this._internalMap = new Map();
    }
    Object.defineProperty(HashMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    HashMap.prototype.put = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this._internalMap.set(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.get(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    HashMap.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this._internalMap.set(key, value);
        return this;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.delete(key);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.delete(key);
    };
    /**
     * @return {?}
     */
    HashMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        return this._internalMap.clear();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.entries = /**
     * @return {?}
     */
    function () {
        return this._internalMap.entries();
    };
    /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    HashMap.prototype.forEach = /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    function (cb, thisArg) {
        return this._internalMap.forEach(cb, thisArg);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.has(key);
    };
    /**
     * @return {?}
     */
    HashMap.prototype.keys = /**
     * @return {?}
     */
    function () {
        return this._internalMap.keys();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.values = /**
     * @return {?}
     */
    function () {
        return this._internalMap.values();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.toJson = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = {};
        /** @type {?} */
        var keys$$1 = this.keys();
        /** @type {?} */
        var key = keys$$1.next();
        while (key.done !== true) {
            json[/** @type {?} */ (key.value)] = this.get(key.value);
            key = keys$$1.next();
        }
        return json;
    };
    Object.defineProperty(HashMap.prototype, Symbol.iterator, {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap[Symbol.iterator];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, Symbol.toStringTag, {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap[Symbol.toStringTag];
        },
        enumerable: true,
        configurable: true
    });
    return HashMap;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
var  /**
 * @template K, V
 */
Hashtable = /** @class */ (function (_super) {
    __extends(Hashtable, _super);
    function Hashtable() {
        return _super.call(this) || this;
    }
    return Hashtable;
}(HashMap));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.warn = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.warn(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.log = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.log(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.info = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.info(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.error = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.error(e);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Logger.debug = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (AppUtils.enableLogging === true) {
            console.debug(e);
        }
    };
    return Logger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Main class that all core components should inherit.
 */
var BaseComponent = /** @class */ (function () {
    /**
     * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
     * but it must provided the minimal required items to be injected.
     *
     * @param parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
     * @param sessionService SessionService needed by this class, this should be injected by Angular.
     * @param elementRef the element reference that wrap the element (tag) of this component.
     * @param renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
     */
    function BaseComponent(parent, sessionService, elementRef, renderer) {
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
    Object.defineProperty(BaseComponent.prototype, "cssClass", {
        /**
         * Accessor for [[cssClass]] property
         */
        get: /**
         * Accessor for [[cssClass]] property
         * @return {?}
         */
        function () {
            return this._cssClass;
        },
        set: /**
         * @param {?} css
         * @return {?}
         */
        function (css) {
            this._cssClass = this.cleanCss(css);
            this.initBorderLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "require", {
        /**
         * Accessor for [[required]] property
         */
        get: /**
         * Accessor for [[required]] property
         * @return {?}
         */
        function () {
            return this.required;
        },
        set: /**
         * @param {?} req
         * @return {?}
         */
        function (req) {
            this.required = req;
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    //add to prevent confusion
    /**
     * @param {?} css
     * @return {?}
     */
    BaseComponent.prototype.class = /**
     * @param {?} css
     * @return {?}
     */
    function (css) {
        this.cssClass = css;
    };
    Object.defineProperty(BaseComponent.prototype, "enabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.disabled;
        },
        //alias for disabled
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            if (typeof boo === 'string') {
                //if enabled is false, disabled is true
                this.disabled = boo === 'true' ? false : true;
            }
            else {
                this.disabled = !boo;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "sortValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sort;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.sort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "uniqueId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._uniqueId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     */
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    BaseComponent.prototype.ngAfterViewInit = /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    function () {
        if (this.parent != null) {
            this.parent.addChild(this);
        }
        this._childrenIndex = uniq(this._childrenIndex);
        //commnet out, causing regression b/c the css selector need id of parent window
        // if (this.renderer != null && typeof this.renderer["removeAttribute"] === "function") {
        //   this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
        // }
    };
    /* istanbul ignore next */
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     */
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    BaseComponent.prototype.ngOnInit = /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    BaseComponent.prototype.checkNxStyling = /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    function (skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (skipAttributeOverride !== true && this._cssClass != null && this._cssClass.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
            /** @type {?} */
            var newAttributes = AppUtils.attributeOverrideClass(this._cssClass);
            if (newAttributes != null) {
                /** @type {?} */
                var newCssClass = filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                newAttributes = filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                newAttributes.push({
                    attributeName: AttributesEnum.CLASS,
                    value: (this._cssClass + " " + newCssClass).trim(),
                });
                this.setAttributes(newAttributes, true);
            }
        }
        if (this.elementRef != null) {
            /** @type {?} */
            var _validate = this.elementRef.nativeElement.getAttribute("validate");
            if (skipAttributeOverride !== true && _validate != null && _validate.length > 0) {
                /** @type {?} */
                var newAttributes = AppUtils.attributeOverrideValidate(_validate);
                if (newAttributes != null) {
                    /** @type {?} */
                    var newCssClass = filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                    newAttributes = filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
        }
    };
    /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    BaseComponent.prototype.initBorderLayout = /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    function () {
        if (this.borderPosition != null && this.borderPosition != '') {
            if (this._cssClass != null) {
                this._cssClass = this._cssClass + ' border-' + this.borderPosition;
            }
            else {
                this._cssClass = 'border-' + this.borderPosition;
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Clear component references and cache
     */
    /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    BaseComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    function () {
        this.cleanup();
        this._isDying = true;
        /** @type {?} */
        var parentView = this.getParentView();
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
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.cleanup = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Get [[SessionService]] instance injected via constructor
     * @returns SessionService instance
     */
    /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    BaseComponent.prototype.getSession = /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    function () {
        return this.sessionService;
    };
    /* istanbul ignore next */
    /**
     * Get child component by id
     * @param id Component ID
     * @returns Child [[BaseComponent]]
     */
    /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    BaseComponent.prototype.getChild = /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    function (id) {
        if (this._children !== null) {
            return this._children.get(KeyUtils.toMapKey(id));
        }
        else {
            return null;
        }
    };
    /* istanbul ignore next */
    /**
     * Set [[disabled]] property value
     * @param boo Value for disabled property
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    BaseComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set [[visible]] property value
     * @param boo Value for visible property
     */
    /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    BaseComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    function (boo) {
        this.visible = boo;
        this.markForCheck();
    };
    /**
     * @param {?} expression
     * @return {?}
     */
    BaseComponent.prototype.setScrollPosVertical = /**
     * @param {?} expression
     * @return {?}
     */
    function (expression) {
        //TODO
    };
    /**
     * Set color of text on the component
     * @param value Color string. Should be hexadecimal or color name supported by CSS
     */
    /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    BaseComponent.prototype.setFontColor = /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    function (value) {
        this.setColor(value);
    };
    /* istanbul ignore next */
    /**
     * Value of [[disabled]] property
     * @returns Value of disabled
     */
    /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    BaseComponent.prototype.getDisabled = /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    function () {
        return this.disabled;
    };
    /**
     * Value of opposite of [[disabled]] value
     * @returns Value of enabled
     */
    /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    BaseComponent.prototype.getEnabled = /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    function () {
        return !this.getDisabled();
    };
    /* istanbul ignore next */
    /**
     * Value of soColumnNo attribute
     * @returns Column number
     */
    /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    BaseComponent.prototype.getSoColumnNo = /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    function () {
        return this.getAttribute("soColumnNo");
    };
    /* istanbul ignore next */
    /**
     * Get the component ref string value from [[editor]] property
     * @returns Ref of component
     */
    /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    BaseComponent.prototype.getEditor = /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    function () {
        return this.editor;
    };
    /**
     * Value of soRequire attribute
     * @returns soRequire value
     */
    /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    BaseComponent.prototype.getSoRequire = /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    function () {
        return this.getAttribute("soRequire");
    };
    /**
     * Value of soValidate attribute
     * @returns soValidate value
     */
    /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    BaseComponent.prototype.getSoValidate = /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    function () {
        return this.getAttribute("soValidate");
    };
    /* istanbul ignore next */
    /**
     * Value of soType attribute
     * @returns soType value
     */
    /**
     * Value of soType attribute
     * @return {?} soType value
     */
    BaseComponent.prototype.getSoType = /**
     * Value of soType attribute
     * @return {?} soType value
     */
    function () {
        return this.getAttribute("soType");
    };
    /**
     * Value of soFormat attribute
     * @returns soFormat value
     */
    /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    BaseComponent.prototype.getSoFormat = /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    function () {
        return this.getAttribute("soFormat");
    };
    /* istanbul ignore next */
    /**
     * Value of soMin attribute
     * @returns soMin value
     */
    /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    BaseComponent.prototype.getSoMin = /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    function () {
        return this.getAttribute("soMin");
    };
    /* istanbul ignore next */
    /**
     * Value of soMax attribute
     * @returns soMax value
     */
    /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    BaseComponent.prototype.getSoMax = /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    function () {
        return this.getAttribute("soMax");
    };
    /**
     * Value of soMaxLength attribute
     * @returns soMaxLength value
     */
    /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    BaseComponent.prototype.getSoMaxLength = /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    function () {
        return this.getAttribute("soMaxLength");
    };
    /* istanbul ignore next */
    /**
     * Value of soPattern attribute
     * @returns soPattern value
     */
    /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    BaseComponent.prototype.getSoPattern = /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    function () {
        return this.getAttribute("soPattern");
    };
    /* istanbul ignore next */
    /**
     * Value of soMaxByteLen attribute
     * @returns soMaxByteLen value
     */
    /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    BaseComponent.prototype.getSoMaxByteLen = /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    function () {
        return this.getAttribute("soMaxByteLen");
    };
    /* istanbul ignore next */
    /**
     * Set [[disabled]] property to opposite of input
     * @param boo Value of enabled
     */
    /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    BaseComponent.prototype.setEnabled = /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    function (boo) {
        if (typeof boo === 'string') {
            boo = boo === 'true' ? true : false;
        }
        this.setDisabled(!boo);
    };
    /* istanbul ignore next */
    /**
     * Set value of [[sort]] property
     * @param value Sort value to set
     */
    /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    BaseComponent.prototype.setSortValue = /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    function (value) {
        this.sort = value;
    };
    /**
     * Get value of [[visible]] property
     * @returns Visble property value
     */
    /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    BaseComponent.prototype.getVisible = /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    function () {
        return this.visible;
    };
    /* istanbul ignore next */
    /**
     * Sets value of text attribute and marks component for change detection
     * @param value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     */
    /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    BaseComponent.prototype.setText = /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    function (value) {
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
    };
    /* istanbul ignore next */
    /**
     * Set callback function for [[onCommand]]
     * @param fn Function to be invoked for [[onCommand]] event
     */
    /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    BaseComponent.prototype.setOnCommand = /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    function (fn) {
        this._internalOnCommand = fn;
    };
    /* istanbul ignore next */
    /**
     * Set callback function for [[onActiveLost]]
     * @param fn Function to be invoked for [[onActiveLost]] event
     */
    /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    BaseComponent.prototype.setOnActiveLost = /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    function (fn) {
        this._internalOnActiveLost = fn;
    };
    /* istanbul ignore next */
    /**
     * Set all attributes in one go
     *
     * @param attrs
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    BaseComponent.prototype.setAttributes = /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    function (attrs, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        var e_1, _a;
        this._tempFreezeCd = true;
        try {
            for (var attrs_1 = __values(attrs), attrs_1_1 = attrs_1.next(); !attrs_1_1.done; attrs_1_1 = attrs_1.next()) {
                var attr = attrs_1_1.value;
                this.setAttribute(attr.attributeName, attr.value, skipAttributeOverride);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (attrs_1_1 && !attrs_1_1.done && (_a = attrs_1.return)) _a.call(attrs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._tempFreezeCd = false;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set HTML attribute value on component
     * @param attribute HTML attribute to set
     * @param value Value of attribute
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    BaseComponent.prototype.setAttribute = /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    function (attribute, value, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (typeof attribute === 'string') {
            /** @type {?} */
            var originalAttributeName = attribute;
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
                    var newAttributes = AppUtils.attributeOverrideValidate(value);
                    if (newAttributes != null) {
                        /** @type {?} */
                        var newCssClass = filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                        newAttributes = filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
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
                var newAttributes = AppUtils.attributeOverrideClass(value);
                if (newAttributes != null) {
                    /** @type {?} */
                    var newCssClass = filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                    newAttributes = filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
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
    };
    /* istanbul ignore next */
    /**
     * Get value of HTML attribute
     * @param attribute Name of HTML attribute to get
     * @returns Value of attribute
     */
    /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    BaseComponent.prototype.getAttribute = /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    function (attribute, skipQueryDOMIfNotExists) {
        if (skipQueryDOMIfNotExists === void 0) { skipQueryDOMIfNotExists = false; }
        if (typeof attribute === 'string') {
            /** @type {?} */
            var attributeLower = attribute.toLowerCase();
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
                Logger.warn("Attribute " + attribute + " does not exists, trying to get from DOM");
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
    };
    /* istanbul ignore next */
    /**
     * Focus the HTML element of this component
     */
    /**
     * Focus the HTML element of this component
     * @return {?}
     */
    BaseComponent.prototype.requestFocus = /**
     * Focus the HTML element of this component
     * @return {?}
     */
    function () {
        if (this.getElement() != null) {
            this.getElement().focus();
        }
    };
    /* istanbul ignore next */
    /**
     * Focus the native HTML element of the component and mark for change detection
     */
    /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    BaseComponent.prototype.setFocus = /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    function () {
        if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
            this.markForCheck();
        }
    };
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * @event [[OnActiveLost]]
     */
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    BaseComponent.prototype.focusLost = /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    function () {
        this.onActiveLost.emit();
        if (typeof this._internalOnActiveLost === 'function') {
            this._internalOnActiveLost(this);
        }
    };
    /* istanbul ignore next */
    /**
     * Creates a unique id using an optional prefix
     * @param prefix String to append to beginning of ID
     * @returns Unique ID
     */
    /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    BaseComponent.generateUniqueId = /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    function (prefix) {
        if (prefix === void 0) { prefix = 'base'; }
        return prefix + Date.now() + '_' + random(1, 1000) + random(1, 100);
    };
    /* istanbul ignore next */
    /**
     * Adds child component to this component
     * @param child Component to add as child
     */
    /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    BaseComponent.prototype.addChild = /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    function (child) {
        if (child.id !== this.id) {
            /** @type {?} */
            var childKey = KeyUtils.toMapKey(child.id);
            if (this._children === null) {
                this._children = new Map();
            }
            if (this._childrenIndex === null) {
                this._childrenIndex = new Array();
            }
            this._children.set(childKey, child);
            this._childrenIndex.push(child.id);
            /** @type {?} */
            var parentView = this.getParentView();
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
    };
    /**
     * Get the native element of the component if a reference to it is defined
     * @returns The HTML native element or 'null' if reference is missing
     */
    /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    BaseComponent.prototype.getElement = /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    function () {
        return this.elementRef ? this.elementRef.nativeElement : null;
    };
    /* istanbul ignore next */
    /**
     * Get the text property value
     * @returns Text value
     */
    /**
     * Get the text property value
     * @return {?} Text value
     */
    BaseComponent.prototype.getText = /**
     * Get the text property value
     * @return {?} Text value
     */
    function () {
        return this.text;
    };
    /* istanbul ignore next */
    /**
     * Set CSS color style attribute and marks for change detection
     * @param color CSS color string value. Should be hexadecimal or valid CSS color string
     */
    /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    BaseComponent.prototype.setColor = /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    function (color) {
        if (color == null || color === "") {
            delete this.styles['color'];
        }
        else {
            this.styles['color'] = color;
        }
        this.markForCheck();
    };
    /**
     * Get the color style attribute value
     * @returns Color string. Hexadecimal or CSS color string
     */
    /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    BaseComponent.prototype.getColor = /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    function () {
        return this.styles['color'];
    };
    /**
     * Set background color CSS style attribute value
     * @param bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     */
    /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    BaseComponent.prototype.setBgColor = /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    function (bgColor) {
        this.bgColor = bgColor;
        this.styles["background"] = bgColor;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Sets font-weight style property to bold
     * @param boo Switch for turning bold style on/off
     */
    /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    BaseComponent.prototype.setFontBold = /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    function (boo) {
        this.fontBold = boo;
        if (boo === true || boo === "true") {
            this.styles["font-weight"] = "bold";
        }
        else {
            delete this.styles["font-weight"];
        }
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Sets CSS style attribute font-style to italic
     * @param boo Switch for turning italic style on/off
     */
    /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    BaseComponent.prototype.setFontItalic = /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    function (boo) {
        this.fontItalic = boo;
        if (boo === true || boo === "true") {
            this.styles["font-style"] = "italic";
        }
        else {
            delete this.styles["font-style"];
        }
    };
    /**
     * Sets CSS style attribute font-size
     * @param size Number of pixels for font-size
     */
    /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    BaseComponent.prototype.setFontSize = /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    function (size) {
        this.fontSize = size;
        this.styles["font-size"] = size + "px";
    };
    /* istanbul ignore next */
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param underline Switch for turning underline style on/off for text
     */
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    BaseComponent.prototype.setFontUnderline = /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    function (underline) {
        this.fontUnderline = underline;
        if (this.fontUnderline === "true" || this.fontUnderline === true) {
            this.styles["text-decoration"] = "underline";
        }
        else {
            delete this.styles["text-decoration"];
        }
    };
    /**
     * Event handler that registers focus event
     * @param event
     */
    /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleFocus = /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Event handler that registers click event
     * @param event
     */
    /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleClick = /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /**
     * Event handler that registers keydown event
     * @param event
     */
    /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleKeyDown = /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Event handler that registers keyup event
     * @param event
     */
    /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleKeyUp = /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /**
     * Event handler that registers mousedown event
     * @param event
     */
    /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleMouseDown = /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Gets custom attribute by name if it exists
     * @param attributeName Name of custom attribute
     * @returns Custom attribute if it exists, otherwise undefined
     */
    /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    BaseComponent.prototype.getCustomAttribute = /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    function (attributeName) {
        if (this.customAttributes != null) {
            return this.customAttributes[attributeName];
        }
        return undefined;
    };
    /* istanbul ignore next */
    /**
     * Set attribute on customAttribute object using name as key
     * @param name key name of attribute
     * @param value value to set for key/name
     */
    /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    BaseComponent.prototype.setCustomAttribute = /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    function (name, value) {
        if (this.customAttributes == null) {
            this.customAttributes = {};
        }
        if (value != null) {
            this.customAttributes[name] = value + '';
        }
    };
    /* istanbul ignore next */
    /**
     * Check if custom attribute exists
     * @param id Key name of attribute
     * @returns True if custom attribute with name/key exists
     */
    /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    BaseComponent.prototype.hasCustomAttribute = /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    function (id) {
        return this.customAttributes != null && this.customAttributes[id] != null;
    };
    /* istanbul ignore next */
    /**
     * Get child component by index
     * @param idx Index of child component
     * @returns Child [[BaseComponent]]
     */
    /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    BaseComponent.prototype.getChildAt = /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    function (idx) {
        if (this._childrenIndex !== null) {
            if (this._childrenIndex.length > idx) {
                return this.getChild(this._childrenIndex[idx]);
            }
        }
        return null;
    };
    /**
     * Get the number of child components
     * @returns Number of children
     */
    /**
     * Get the number of child components
     * @return {?} Number of children
     */
    BaseComponent.prototype.getChildCount = /**
     * Get the number of child components
     * @return {?} Number of children
     */
    function () {
        if (this._children !== null) {
            return this._children.size;
        }
        else {
            return 0;
        }
    };
    /**
     * Get index of child component if it exists
     * @param child Child component
     */
    /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    BaseComponent.prototype.indexOfChild = /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    function (child) {
        //TODO
        console.error("indexOfChild is not implemented");
        return -1;
    };
    /* istanbul ignore next */
    /**
     * Insert child component to children array at location of index
     * @param idx Index of insert location
     * @param row
     */
    /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    BaseComponent.prototype.insertChildAt = /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    function (idx, row) {
        //TODO
        console.error("insertChildAt is not implemented");
    };
    /* istanbul ignore next */
    /**
     * TODO: Add documentation for emitInternalCommand
     */
    /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    BaseComponent.prototype.emitInternalOnCommand = /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    function () {
        if (typeof this._internalOnCommand === 'function') {
            this._internalOnCommand(this);
            return true;
        }
        else if (typeof this._internalOnCommand === "string") {
            this.invokeMcoAction(this._internalOnCommand);
        }
        return false;
    };
    /* istanbul ignore next */
    /**
     * Registers event handler for client event
     * @param event Event to register
     */
    /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    BaseComponent.prototype.registerClientEvent = /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        this.getSession().getEventHandler().setClientEvent(clientEvent);
    };
    /* istanbul ignore next */
    /**
     * Get the native HTML element tag name
     * @returns Name of HTML element tag
     */
    /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    BaseComponent.prototype.getTagName = /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    function () {
        return this.elementRef != null ? this.elementRef.nativeElement.tagName : '';
    };
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @returns Tag name
     */
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    BaseComponent.prototype.getLocalName = /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    function () {
        return this.getTagName().toLowerCase().replace("vt-", "");
    };
    /* istanbul ignore next */
    /**
     * Get the parent component if it exists
     * @returns Component or null if there is no parent
     */
    /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    BaseComponent.prototype.getParent = /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    function () {
        return this.parent;
    };
    /**
     * Get value property if it exists, otherwise return 'null'
     * @returns Value or 'null'
     */
    /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    BaseComponent.prototype.getValue = /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    function () {
        if (this["value"]) {
            return this["value"];
        }
        return null;
    };
    /* istanbul ignore next */
    /**
     * Removes attribute name name
     * @param attribute Attribute to remove
     */
    /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    BaseComponent.prototype.removeAttribute = /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    function (attribute) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            var attributeLower = attribute.toLowerCase();
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
                Logger.warn("Unknown attribute: " + attribute + ", setting as custom attribute");
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
    };
    /**
     * Alias of [[setRequired]]
     * @param boo
     */
    /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    BaseComponent.prototype.setRequire = /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.setRequired(boo);
    };
    /* istanbul ignore next */
    /**
     * Set [[required]] to true or false
     * @param boo
     */
    /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    BaseComponent.prototype.setRequired = /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        if (boo === 'true' || boo === true) {
            this.required = true;
        }
        else {
            this.required = false;
        }
        this.markForCheck();
    };
    /**
     * Set [[pattern]] value
     * @param pattern
     */
    /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    BaseComponent.prototype.setPattern = /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        this.pattern = pattern;
        this.markForCheck();
    };
    /**
     * Set [[min]] value
     * @param val
     */
    /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    BaseComponent.prototype.setMin = /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.min = val;
        this.markForCheck();
    };
    /**
     * Set [[max]] value
     * @param val
     */
    /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    BaseComponent.prototype.setMax = /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.max = val;
        this.markForCheck();
    };
    /**
     * Get [[pattern]] value
     * @returns [[pattern]]
     */
    /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    BaseComponent.prototype.getPattern = /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    function () {
        return this.pattern;
    };
    /**
     * Get [[min]] value
     * @returns [[min]]
     */
    /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    BaseComponent.prototype.getMin = /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    function () {
        return this.min;
    };
    /**
     * Get [[max]] value
     * @returns [[max]]
     */
    /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    BaseComponent.prototype.getMax = /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    function () {
        return this.max;
    };
    /**
     * Get [[inputLocale]] value
     * @returns [[inputLocale]]
     */
    /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    BaseComponent.prototype.getInputLocale = /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    function () {
        return this.inputLocale;
    };
    /** Set [[inputLocale]] value
     * @param locale
     */
    /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    BaseComponent.prototype.setInputLocale = /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.inputLocale = locale;
        this.markForCheck();
    };
    /**
     * Get [[inputCharsets]] value
     * @returns [[inputCharsets]]
     */
    /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    BaseComponent.prototype.getInputCharsets = /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    function () {
        return this.inputCharsets;
    };
    /**
     * Set [[inputCharests]] value
     * @param inputCharSets
     */
    /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    BaseComponent.prototype.setInputCharsets = /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    function (inputCharSets) {
        this.inputCharsets = inputCharSets;
        this.markForCheck();
    };
    /**
     * Get [[id]] value
     * @returns [[id]]
     */
    /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    BaseComponent.prototype.getId = /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    function () {
        return this.id;
    };
    /**
     * Set [[id]] value
     * @param id
     */
    /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    BaseComponent.prototype.setId = /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        if (this.parent != null && this.parent.children.has(this.id)) {
            this.parent.children.delete(KeyUtils.toMapKey(this.id));
            this.parent.children.set(KeyUtils.toMapKey(id), this);
            if (this._childrenIndex !== null) {
                /** @type {?} */
                var idx = findIndex(this.parent._childrenIndex, function (item) { return item === _this.id; });
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
    };
    /**
     * Abstract method. Implemented by sub class components
     * @param title
     */
    /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    BaseComponent.prototype.setTitle = /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    function (title) {
        //impl. by sub class
    };
    /**
     * Set [[cssClass]] of component.
     * @param css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     */
    /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    BaseComponent.prototype.setCssClass = /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    function (css, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            var temp = css.split("\.");
            this.cssClass = temp.join("-");
            if (temp[0] === "") {
                this.cssClass = this.cssClass.substring(1);
            }
        }
        this.cssClass = css;
        this.checkNxStyling(skipAttributeOverride);
        this.markForCheck();
    };
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param css CSS class name to add
     */
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    BaseComponent.prototype.addCssClass = /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    function (css) {
        if (this._cssClass == null || this._cssClass === "") {
            this._cssClass = css;
        }
        else if (this._cssClass.indexOf(css) == -1) {
            this._cssClass = this._cssClass + " " + css;
        }
        this.checkNxStyling();
        this.markForCheck();
    };
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param css CSS class name to remove
     */
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    BaseComponent.prototype.removeCssClass = /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    function (css) {
        if (this._cssClass != null)
            this._cssClass = this._cssClass.replace(css, '');
        this.checkNxStyling();
        this.markForCheck();
    };
    /**
     * Get the [[require]] property value
     * @returns Value of [[require]]
     */
    /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    BaseComponent.prototype.getRequired = /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    function () {
        return this.require;
    };
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     */
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    BaseComponent.prototype.destroyComponent = /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    function () {
        if (this.compRef != null) {
            this.compRef.destroy();
        }
        else if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).remove();
            this.ngOnDestroy();
            Logger.warn("Memory leak! Please use ngIf if you want to remove component!");
        }
    };
    /**
     * Gets JSON representation of the component
     * @returns JSON object
     */
    /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    BaseComponent.prototype.toJson = /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    function () {
        var _this = this;
        var e_2, _a;
        /** @type {?} */
        var retVal = {};
        //get custom attributes binded to our tag
        if (this.elementRef != null && this.elementRef.nativeElement != null) {
            /** @type {?} */
            var el_1 = this.elementRef.nativeElement;
            /** @type {?} */
            var attributes = null;
            if (typeof el_1.getAttributeNames === "function") {
                attributes = el_1.getAttributeNames();
            }
            else if (el_1.attributes) {
                attributes = [];
                for (var i = 0; i < el_1.attributes.length; i++) {
                    attributes.push(el_1.attributes[i].name);
                }
            }
            if (attributes != null) {
                forEach(attributes, function (attributeName) {
                    if (typeof AppUtils.validateAttribute === "function" && AppUtils.validateAttribute(attributeName)) {
                        _this.setJson(retVal, attributeName, el_1.getAttribute(attributeName));
                    }
                });
            }
            else if (typeof AppUtils.setCustomAttribute === "function") {
                AppUtils.setCustomAttribute(retVal, el_1);
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
                    try {
                        for (var _b = __values(this._childrenIndex), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var id = _c.value;
                            /** @type {?} */
                            var c = this.getChild(id);
                            //getChild can return null?
                            if (c != null) {
                                /** @type {?} */
                                var childJson = this.childToJson(c);
                                if (childJson != null) {
                                    retVal["children"].push(childJson);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        return retVal;
    };
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    BaseComponent.prototype.childToJson = /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    function (child) {
        return child.toJson();
    };
    /**
     * Gets JSON representation of [[customAttributes]]
     * @returns JSON Object
     */
    /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    BaseComponent.prototype.customAttributesToJson = /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    function () {
        return BaseComponent.mapToJson(this.customAttributes);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    BaseComponent.mapToJson = /**
     * @param {?} map
     * @return {?}
     */
    function (map$$1) {
        var e_3, _a;
        /** @type {?} */
        var customAttributes = {};
        if (map$$1) {
            /** @type {?} */
            var keys$$1 = keys(map$$1);
            try {
                for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    /** @type {?} */
                    var value = map$$1[key];
                    if (typeof value !== "string" && value != null) {
                        value = value + "";
                    }
                    customAttributes[key] = value;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return customAttributes;
    };
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @returns NxTagName as string
     */
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    BaseComponent.prototype.getNxTagName = /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    function () {
        return "none";
    };
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param json Object to add key to
     * @param key Key to set
     * @param value Value to set for key param
     */
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    BaseComponent.prototype.setJson = /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    function (json, key, value) {
        if (key != null) {
            json[key] = this.toJsonValue(value);
        }
    };
    /**
     * Converts value to a valid JSON property string
     * @param value Value to convert to string
     * @returns Value as a valid JSON property string
     */
    /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    BaseComponent.prototype.toJsonValue = /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    function (value) {
        if (typeof value === 'string') {
            return value;
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            return value + '';
        }
        else {
            return value;
        }
    };
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     */
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    BaseComponent.prototype.resetId = /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    function () {
        this.id = this._uniqueId;
    };
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @returns Value of [[checked]] property
     */
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    BaseComponent.prototype.getChecked = /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    function () {
        return false;
    };
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param boo Toggle [[checked]] on/off
     */
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    BaseComponent.prototype.setChecked = /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    function (boo) {
        // NO-OP
    };
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param boo Toggle [[checked]] on/off
     */
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    BaseComponent.prototype.setSelected = /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    function (boo) {
        // NO-OP
    };
    /* istanbul ignore next */
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @returns Value of maxLength as integer if it's set, otherwise returns null
     */
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    BaseComponent.prototype.getMaxLength = /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    function () {
        return this.maxLength == null ? -1 : JavaUtils.intValue(this.maxLength);
    };
    /* istanbul ignore next */
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @returns Value of minLength as integer if it's set, otherwise returns null
     */
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    BaseComponent.prototype.getMinLength = /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    function () {
        return this.minLength == null ? -1 : JavaUtils.intValue(this.minLength);
    };
    /**
     * Get a list of child components
     * @returns Child components
     */
    /**
     * Get a list of child components
     * @return {?} Child components
     */
    BaseComponent.prototype.getChildren = /**
     * Get a list of child components
     * @return {?} Child components
     */
    function () {
        var e_4, _a;
        /** @type {?} */
        var children = new Vector();
        if (this._childrenIndex !== null) {
            try {
                for (var _b = __values(this._childrenIndex), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    /** @type {?} */
                    var c = this.getChild(id);
                    if (c != null) {
                        children.add(c);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return children;
    };
    /* istanbul ignore next */
    /**
     * Remove child component from list of children and remove children of child
     * @param child Child component to remove
     */
    /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    BaseComponent.prototype.removeChild = /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    function (child) {
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
                    this._childrenIndex = uniq(filter(this._childrenIndex, function (item) { return item !== child.id; }));
                }
            }
            /** @type {?} */
            var parentView = this.getParentView();
            //remove ourself from the view children map
            if (parentView != null && parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(child.getId()));
            }
            //move children of children
            if (child.removeAllChildren) {
                child.removeAllChildren();
            }
        }
    };
    /**
     * Removes child component by ID
     * @param id Child [[id]]
     */
    /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    BaseComponent.prototype.removeChildById = /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var child = this.getElementById(id);
        if (child != null) {
            this.removeChild(child);
        }
    };
    /**
     * Remove all child components
     * @return {?}
     */
    BaseComponent.prototype.removeAllChildren = /**
     * Remove all child components
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.children != null) {
            /** @type {?} */
            var cit = this.children.values();
            /** @type {?} */
            var cr = cit.next();
            while (cr.done !== true) {
                this.removeChild(cr.value);
                cr = cit.next();
            }
        }
        if (this.tabChildrenIds != null) {
            this.tabChildrenIds.forEach(function (cid) {
                _this.removeChildById(cid);
            });
        }
    };
    /* istanbul ignore next */
    /**
     * Finds the child component by ID. Deep search
     * @param id Child component [[id]]
     */
    /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    BaseComponent.prototype.getElementById = /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    function (id) {
        return this.findElementById(id);
    };
    /**
     * Check if a child component with id exists
     * @param id Child component [id]
     */
    /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    BaseComponent.prototype.hasChild = /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    function (id) {
        return this.findElementById(id) != null;
    };
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param attr
     */
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    BaseComponent.prototype.setValidate = /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    function (attr) {
        //TODO
        console.error("setValidate is not implemented");
    };
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param type
     */
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    BaseComponent.prototype.setType = /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    function (type) {
        //TODO
        console.error("setType is not implemented");
    };
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param format
     */
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    BaseComponent.prototype.setFormat = /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    function (format) {
        //TODO
        console.error("setFormat is not implemented");
    };
    /**
     * Set [[maxLength]] for input component
     * @param maxLength Input max length property. Should be numeric string
     */
    /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMaxLength = /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    function (maxLength) {
        this.maxLength = maxLength;
        this.markForCheck();
    };
    /**
     * Set [[minLength]] for input component
     * @param minLength Input max length property. Should be numeric string
     */
    /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMinLength = /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    function (minLength) {
        this.minLength = minLength;
        this.markForCheck();
    };
    /**
     * Set [[maxLength]] as byte length for input component
     * @param bl Should be numeric string
     */
    /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMaxByteLen = /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    function (bl) {
        this.setMaxLength(bl);
    };
    /**
     * Abstract method. Set value of input component
     * @param val Value to set
     */
    /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    BaseComponent.prototype.setValue = /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    function (val) {
    };
    /**
     * Set focusable property value for component. Implement on sub class
     * @param focusable Toggle focusable on/off
     */
    /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    BaseComponent.prototype.setFocusable = /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    function (focusable) {
        //TODO
    };
    /**
     * Abstract. Select parent component tab. Implement on sub class
     */
    /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    BaseComponent.prototype.selectParentTab = /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    function () {
        /**
         * @param {?} item
         * @return {?}
         */
        function findTabBelong(item) {
            if (item != null) {
                /** @type {?} */
                var parent_1 = item.getParent();
                if (parent_1 != null && parent_1.getLocalName() !== 'tab')
                    return findTabBelong(parent_1);
                return parent_1;
            }
        }
        /** @type {?} */
        var tab = /** @type {?} */ (findTabBelong(this.getElementById(this.id)));
        /**
         * @param {?} tab
         * @return {?}
         */
        function findTabPaneBelong(tab) {
            if (tab != null) {
                /** @type {?} */
                var parent_2 = tab.getParent();
                if (parent_2 != null && parent_2.getLocalName() !== 'tab-pane')
                    return findTabPaneBelong(parent_2);
                return parent_2;
            }
        }
        /** @type {?} */
        var tabPane = /** @type {?} */ (findTabPaneBelong(this.getElementById(this.id)));
        if (tab != null) {
            tabPane.setSelectedTab(tab.id);
        }
    };
    /* istanbul ignore next */
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param id element id to search
     */
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    BaseComponent.prototype.findElementById = /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var mappedChildId = KeyUtils.toMapKey(id);
        /** @type {?} */
        var comp = null;
        //first check for cache
        // let comp: BaseComponent = UiDocument.getFromCache(mappedChildId);
        if (comp == null) {
            /** @type {?} */
            var radioGroup = this.getRadioButtonGroupComponent(id);
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
                    var parentView = this.getParentView();
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
    };
    /* istanbul ignore next */
    /**
     * Get radio button group component by id
     * @param id Radio button group ID
     */
    /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    BaseComponent.prototype.getRadioButtonGroupComponent = /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    function (id) {
        var e_5, _a;
        if (id === (/** @type {?} */ (this)).group) {
            //radio button group
            return this;
        }
        else {
            /** @type {?} */
            var radioGroup = this.getRadioButtonGroup(id);
            if (radioGroup != null) {
                /** @type {?} */
                var retVal = radioGroup[0];
                try {
                    for (var radioGroup_1 = __values(radioGroup), radioGroup_1_1 = radioGroup_1.next(); !radioGroup_1_1.done; radioGroup_1_1 = radioGroup_1.next()) {
                        var radio = radioGroup_1_1.value;
                        if (radio.getChecked() === true) {
                            retVal = radio;
                            break;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (radioGroup_1_1 && !radioGroup_1_1.done && (_a = radioGroup_1.return)) _a.call(radioGroup_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return retVal;
            }
        }
        return null;
    };
    /**
     * Add change listener on attributes
     * @param listener
     */
    /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    BaseComponent.prototype.addAttributeChangeListener = /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        if (this.attributeChangeListeners == null) {
            this.attributeChangeListeners = [];
        }
        listener._internalId = BaseComponent.generateUniqueId('listener');
        this.attributeChangeListeners.push(listener);
    };
    /**
     * Remove change listener on attributes
     * @param listener
     */
    /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    BaseComponent.prototype.removeAttributeChangeListener = /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        if (this.attributeChangeListeners != null) {
            this.attributeChangeListeners = filter(this.attributeChangeListeners, function (item) { return item._internalId !== listener._internalId; });
        }
    };
    /**
     * Set attribute and emit change event
     * @param attributeName
     * @param newValue
     * @event AttributeChangeEvent
     */
    /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    BaseComponent.prototype.fireSetAttributeEvent = /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    function (attributeName, newValue) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            var event_1 = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), newValue, this);
            forEach(this.attributeChangeListeners, function (listener) {
                listener.onAttributeSet(event_1);
            });
        }
    };
    /**
     * Remove attribute and emit change event
     * @param attributeName
     * @event AttributeChangeEvent
     */
    /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    BaseComponent.prototype.fireRenoveAttributeEvent = /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    function (attributeName) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            var event_2 = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), null, this);
            forEach(this.attributeChangeListeners, function (listener) {
                listener.onAttributeRemoved(event_2);
            });
        }
    };
    /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    BaseComponent.prototype.cleanCss = /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    function (css) {
        return BaseComponent.cleanCss(css);
    };
    /* istanbul ignore next */
    /**
     * Format css selectors. Remove dot
     * @param css
     * @returns New CSS selector string
     */
    /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    BaseComponent.cleanCss = /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    function (css) {
        var _this = this;
        if (css != null && css.indexOf(".") >= 0) {
            //more than one style?
            if (css.indexOf(" ") > 0) {
                return map(css.split(" "), function (item) { return _this.cleanCss(item); }).join(" ");
            }
            else {
                //only one style
                return css.replace(/\./g, '-').replace(/^\-/, '');
            }
        }
        return css;
    };
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     */
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    BaseComponent.prototype.getChangeDetector = /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    function () {
        //sub-class override
        return null;
    };
    /**
     * Mark component for change detection
     */
    /**
     * Mark component for change detection
     * @return {?}
     */
    BaseComponent.prototype.markForCheck = /**
     * Mark component for change detection
     * @return {?}
     */
    function () {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().markForCheck();
            }
        }
    };
    /**
     * Invoke change detection on component
     */
    /**
     * Invoke change detection on component
     * @return {?}
     */
    BaseComponent.prototype.detectChanges = /**
     * Invoke change detection on component
     * @return {?}
     */
    function () {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().detectChanges();
            }
        }
    };
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param heightStyleName
     * @param widthStyleName
     */
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    BaseComponent.prototype.initWidthHeightStyle = /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    function (heightStyleName, widthStyleName) {
        if (heightStyleName === void 0) { heightStyleName = 'height'; }
        if (widthStyleName === void 0) { widthStyleName = 'max-width'; }
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.styles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.styles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    };
    /* istanbul ignore next */
    /**
     * Add a radio button component to this component
     * @param radio
     */
    /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    BaseComponent.prototype.addRadioButtonGroup = /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    function (radio) {
        //radio group need to be at ViewComponent level
        if (this.isView() !== true && this.getParent() != null) {
            return this.getParent().addRadioButtonGroup(radio);
        }
        if (this.radioButtonGroups == null) {
            this.radioButtonGroups = new Map();
        }
        /** @type {?} */
        var groupId = (/** @type {?} */ (radio)).group;
        if (this.radioButtonGroups.get(groupId) == null) {
            this.radioButtonGroups.set(groupId, [radio]);
        }
        else {
            this.radioButtonGroups.get(groupId).push(radio);
        }
        return;
    };
    /* istanbul ignore next */
    /**
     * Get radio button group by group ID
     * @param groupId
     * @returns  Radio button group component
     */
    /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    BaseComponent.prototype.getRadioButtonGroup = /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    function (groupId) {
        /** @type {?} */
        var view = this.getParentView();
        return view != null && view.radioButtonGroups != null ? view.radioButtonGroups.get(groupId) : null;
    };
    /**
     * Sets [[controlWidth]] property
     * @param width Should be numeric value
     */
    /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    BaseComponent.prototype.setControlWidth = /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    function (width) {
        this.controlWidth = width;
        this.initWidthHeightStyle();
        this.markForCheck();
    };
    /**
     * Sets [[controlHeight]] property
     * @param height Should be numeric value
     */
    /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    BaseComponent.prototype.setControlHeight = /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    function (height) {
        this.controlHeight = height;
        this.initWidthHeightStyle();
        this.markForCheck();
    };
    /**
     * Alias for [[setControlWidth]] method
     * @param width Should be a numeric value
     */
    /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    BaseComponent.prototype.setWidth = /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    function (width) {
        this.setControlWidth(width);
    };
    /**
     * Get [[controlWidth]] property
     * @returns Value of [[controlWidth]]
     */
    /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    BaseComponent.prototype.getWidth = /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    function () {
        return this.controlWidth;
    };
    /**
     * Alias for [[setControlHeight]] method
     * @param height Should be a numeric value
     */
    /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    BaseComponent.prototype.setHeight = /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    function (height) {
        this.setControlHeight(height);
    };
    /**
     * Get [[controlHeight]] property
     * @returns Value of [[controlHeight]]
     */
    /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    BaseComponent.prototype.getHeight = /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    function () {
        return this.controlHeight;
    };
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param x Horizontal coordinate position
     */
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    BaseComponent.prototype.setX = /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    function (x) {
        this.x = x;
        this.styles["left"] = x + "px";
        this.markForCheck();
    };
    /**
     * Get [[x]] property
     * @returns Value of [[x]]
     */
    /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    BaseComponent.prototype.getX = /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    function () {
        return this.x;
    };
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param y Vertical coordinate position
     */
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    BaseComponent.prototype.setY = /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    function (y) {
        this.y = y;
        this.styles["top"] = y + "px";
        this.markForCheck();
    };
    /**
     * Get [[y]] property
     * @returns Value of [[y]]
     */
    /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    BaseComponent.prototype.getY = /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    function () {
        return this.y;
    };
    /**
     * Set [[borderWidth]] property value
     * @param borderWidth Should be numeric
     */
    /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    BaseComponent.prototype.setBorderWidth = /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    function (borderWidth) {
        this.borderWidth = borderWidth;
        this.markForCheck();
    };
    /**
     * Check if component is view component.
     * Implement in sub class
     */
    /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    BaseComponent.prototype.isView = /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if there are active views.
     * Implement in sub class
     */
    /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    BaseComponent.prototype.isNoneActiveView = /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if this component is an instance of [[DialogComponent]]
     */
    /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    BaseComponent.prototype.isDialog = /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if this component is a dynamic view
     */
    /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    BaseComponent.prototype.isDynamicView = /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Get the parent view of this component
     * @returns Parent view component
     */
    /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    BaseComponent.prototype.getParentView = /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    function () {
        if (this.isView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
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
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.getParentScrollView = /**
     * @return {?}
     */
    function () {
        if (this.isScrollView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
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
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.isScrollView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     */
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    BaseComponent.prototype._getNoneActiveViewParent = /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    function () {
        if (this.isNoneActiveView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param event Click event
     * @param force always emit
     */
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    BaseComponent.prototype.handleOnContextMenu = /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    function (event, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        //allow component to skip emit event and let parent (i.e. table cell to emit it)
        if (force === true || this.skipEmitContextMenuEvent !== true) {
            if (this.getSession() != null) {
                this.getSession().setMousePosition(event);
            }
            /** @type {?} */
            var parentView = this.getParentView();
            /** @type {?} */
            var popupMenuId_1 = null;
            if (parentView != null) {
                popupMenuId_1 = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
            }
            this.onContextMenu.emit(event);
            if (this.popup != null && this.popup !== "") {
                if (this.popup.indexOf("#") === 0) {
                    this.popup = this.popup.substring(1);
                }
                popupMenuId_1 = this.popup;
                this.getSession()._currentPopupMenuId = this.popup;
            }
            if (popupMenuId_1 != null) {
                event.stopPropagation();
                event.preventDefault();
                /** @type {?} */
                var tm_1 = setTimeout(function () {
                    clearTimeout(tm_1);
                    if (_this.getSession()._currentPopupMenuId != null) {
                        popupMenuId_1 = _this.getSession()._currentPopupMenuId;
                    }
                    _this.getSession().showContextMenu(popupMenuId_1);
                    _this.getSession()._currentPopupMenuId = null;
                });
            }
        }
    };
    /**
     * Emits focus lost event for components that require validation
     * @param event
     * @event BeforeActiveLost
     */
    /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.validateField = /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (AppUtils.validateField != null && AppUtils.validateField(this) !== true) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.onBeforeActiveLost.emit();
        this.focusLost();
    };
    //iteratative function to prevent stack overflow
    // reduceChildrenIterative() {
    //   if (this._reduceChildrenIterativeCache != null && this._reduceChildrenIterativeCache.length > 0) {
    //     return this._reduceChildrenIterativeCache;
    //   }
    //   this._reduceChildrenIterativeCache = [];
    //   if (this.children == null) {
    //     Logger.warn("reduceChildrenIterative, children is null");
    //     return this._reduceChildrenIterativeCache;
    //   }
    //   //skip DialogComponent
    //   let stack: Array<BaseComponent> = _.filter(Array.from(this.children.values()), (comp: BaseComponent)=>{
    //     return comp.isFauxElement() || comp.isDialog() !== true;
    //   });
    //   this._reduceChildrenIterativeCache = this._reduceChildrenIterativeCache.concat(stack);
    //   let counter = 0;
    //   while(stack.length > 0) {
    //     const child = stack.pop();
    //     if (child.children != null && child.children.size > 0) {
    //       //get grandchildren
    //       const grandChildren = Array.from(child.children.values());
    //       this._reduceChildrenIterativeCache = this._reduceChildrenIterativeCache.concat(grandChildren);
    //       //push to our stack to iterate our grandchildren to look for great grandchildren
    //       stack = stack.concat(grandChildren);
    //     }
    //     counter++;
    //     if (counter > 10000 || stack.length > 10000) {
    //       throw new Error("BaseComponent.reduceChildrenIterative: stack overflow");
    //     }
    //   }
    //   return this._reduceChildrenIterativeCache;
    // }
    /**
     * Get children of a table component.
     * @returns Array of table children
     */
    /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    BaseComponent.prototype.getTableChildren = /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    function () {
        return [];
    };
    /**
     * Get [[bgColor]] property
     * @returns Value of [[bgColor]]
     */
    /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    BaseComponent.prototype.getBgColor = /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    function () {
        return this.bgColor;
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.setAttributeFromDef = /**
     * @return {?}
     */
    function () {
        var e_6, _a;
        /** @type {?} */
        var compDef = this.getSession().getDef(this.id);
        if (compDef != null && compDef.attribute != null) {
            if (compDef.attribute instanceof Map ||
                compDef.attribute instanceof Hashtable ||
                compDef.attribute instanceof HashMap) {
                /** @type {?} */
                var keys$$1 = compDef.attribute.keys();
                /** @type {?} */
                var key = keys$$1.next();
                while (key.done !== true) {
                    this.setAttribute(key.value, compDef.attribute.get(key));
                    key = keys$$1.next();
                }
            }
            else {
                /** @type {?} */
                var keys$$1 = keys(compDef.attribute);
                try {
                    for (var keys_2 = __values(keys$$1), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                        var key = keys_2_1.value;
                        this.setAttribute(key, compDef.attribute[key]);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
    };
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * @warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param xpathExpression
     */
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    BaseComponent.prototype.evaluateXPath = /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    function (xpathExpression) {
        return null;
    };
    /**
     * Set color of hightlighted text background
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    BaseComponent.prototype.setHighlightBgColor = /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    function (color) {
        this.highlightBgColor = color;
    };
    /**
     * Set color of highlighted text foreground
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    BaseComponent.prototype.setHighlightFontColor = /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    function (color) {
        this.highlightFontColor = color;
    };
    /**
     * Get [[hightlightBgColor]] property
     * @returns Color string
     */
    /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    BaseComponent.prototype.getHighlightBgColor = /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    function () {
        return this.highlightBgColor;
    };
    /**
     * Get [[highlightFontColor]] property
     * @returns Color string
     */
    /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    BaseComponent.prototype.getHighlightFontColor = /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    function () {
        return this.highlightFontColor;
    };
    /**
     * Get [[parentTableRow]] property
     */
    /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    BaseComponent.prototype.getParentTableRow = /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    function () {
        return this.parentTableRow;
    };
    //clear reduce children iterative cache
    // resetReduceChildrenIterativeCache() {
    //   this._reduceChildrenIterativeCache = null;
    // }
    /**
     * Check if change detection is frozen
     * @returns Boolean If component change detection is frozen
     */
    /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    BaseComponent.prototype.isChangeDetectionFrozen = /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    function () {
        return false;
    };
    /**
     * Check if component is a faux element
     * @returns Boolean If component is faux element
     */
    /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    BaseComponent.prototype.isFauxElement = /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    function () {
        return false;
    };
    /**
     * Get internal [[_viewChildrenMap]] member
     * @returns Value of [[_viewChildrenMap]]
     */
    /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    BaseComponent.prototype.getViewChildrenMap = /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    function () {
        return this._viewChildrenMap;
    };
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param id ID of child to remove
     */
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    BaseComponent.prototype.removeViewChildFromMap = /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    function (id) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.delete(KeyUtils.toMapKey(id));
        }
    };
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param obj Child to add to [[_viewChildrenMap]]
     */
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    BaseComponent.prototype.addViewChildToMap = /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    function (obj) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.set(KeyUtils.toMapKey(obj.getId()), /** @type {?} */ (obj));
        }
    };
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param action Name of action method to invoke or a function to invoke
     */
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    BaseComponent.prototype.invokeMcoAction = /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    function (action) {
        if (typeof action === "function") {
            action(this);
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            var mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            var methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            var arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
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
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype._notifyInternalChangeCb = /**
     * @return {?}
     */
    function () {
        if (typeof this._internalChangeCb === "function") {
            this._internalChangeCb(this);
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.emptyChildren = /**
     * @return {?}
     */
    function () {
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
        if (this.children != null) {
            this.children.clear();
        }
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
            delete this._viewChildrenMap;
        }
        // this._viewChildrenMap = null;
    };
    /**
     * Check to see if this is a ScrollPaneComponent
     */
    /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    BaseComponent.prototype.isScrollPane = /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Reset the scroll position to the previous captured
     */
    /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    BaseComponent.prototype.resetScrollTopToPreviousPosition = /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    function () {
        //implement by scrollpane
    };
    /**
     * Reset all scrollpane pos
     */
    /**
     * Reset all scrollpane pos
     * @return {?}
     */
    BaseComponent.prototype.resetAllScrollPanesPositionToPrevious = /**
     * Reset all scrollpane pos
     * @return {?}
     */
    function () {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach(function (scrollPane) { return scrollPane.resetScrollTopToPreviousPosition(); });
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.resetScrollTopPosition = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.resetAllScrollPanesPositionToTop = /**
     * @return {?}
     */
    function () {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach(function (scrollPane) { return scrollPane.resetScrollTopPosition(); });
        }
    };
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     */
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    BaseComponent.prototype.notifyParentOfError = /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    function () {
        if (this.getDisabled() === true) {
            /** @type {?} */
            var parentView = this.getParentView();
            if (parentView != null && parentView["dialog"] != null) {
                if (parentView["dialog"]._disabledErrorElementId == null) {
                    parentView["dialog"]._disabledErrorElementId = [];
                }
                if (parentView["dialog"]._disabledErrorElementId.indexOf(this.getId()) < 0) {
                    parentView["dialog"]._disabledErrorElementId.push(this.getId());
                }
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Focus the parent tab
     */
    /**
     * Focus the parent tab
     * @return {?}
     */
    BaseComponent.prototype.focusParentTab = /**
     * Focus the parent tab
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parentView = this._getNoneActiveViewParent() || this.getParentView();
        if (parentView != null) {
            /** @type {?} */
            var tabPane = parentView.getParent();
            //check to see if the parent is a Tab
            if (tabPane != null && tabPane.getNxTagName() === "tab") {
                tabPane.setFocus();
            }
        }
    };
    /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    BaseComponent.prototype.registerScrollPane = /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    function (scrollPane) {
        if (typeof scrollPane.isScrollPane === "function" && scrollPane.isScrollPane() === true) {
            if (this.scrollPanes == null) {
                this.scrollPanes = [];
            }
            this.scrollPanes.push(scrollPane);
        }
    };
    BaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-base',
                    template: 'nothing here'
                }] }
    ];
    /** @nocollapse */
    BaseComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return BaseComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var McoContainerModule = /** @class */ (function () {
    function McoContainerModule() {
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
    return McoContainerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var EventHandlerModule = /** @class */ (function () {
    function EventHandlerModule() {
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
    return EventHandlerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SessionModule = /** @class */ (function () {
    function SessionModule() {
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
    return SessionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var JavaModule = /** @class */ (function () {
    function JavaModule() {
    }
    JavaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: []
                },] }
    ];
    return JavaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var OnCreateDirective = /** @class */ (function () {
    function OnCreateDirective(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.vtOnCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    OnCreateDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.runOutsideZone === true) {
            this.zone.runOutsideAngular(function () {
                _this.vtOnCreate.emit({
                    element: _this.elementRef
                });
            });
        }
        else {
            this.vtOnCreate.emit({
                element: this.elementRef
            });
        }
    };
    OnCreateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vtOnCreate]'
                },] }
    ];
    /** @nocollapse */
    OnCreateDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    OnCreateDirective.propDecorators = {
        runOutsideZone: [{ type: Input }],
        vtOnCreate: [{ type: Output }]
    };
    return OnCreateDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BaseModule = /** @class */ (function () {
    function BaseModule() {
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
    return BaseModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var ComponentType = {
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
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.focused = true;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.marginTop != null) {
            this.marginTop = this.marginTop + 'px';
        }
        if (this.marginRight != null) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft != null) {
            this.marginLeft = this.marginLeft + 'px';
        }
    };
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     */
    /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    ButtonComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Must call parent ngAfterViewInit
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /* istanbul ignore next */
    /**
     * Event handler for click event
     * @param event
     * @event OnCommand
     */
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    ButtonComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        //register client event for mco
        this.handleClick(event);
        this.onCommand.emit();
        //it looks like you can change onCommand binding at runtime and since we are code
        //we add another fn to do it (we may removed this later once we have a better of usage)
        this.emitInternalOnCommand();
    };
    /* istanbul ignore next */
    /**
     * Event handler for mousedown event
     * @param e
     */
    /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    ButtonComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var currentTarget = e.currentTarget['id'];
        if (currentTarget != null && currentTarget.indexOf("BtnClose") > 0) {
            AppUtils.isCloseBtn = true;
        }
        else {
            AppUtils.isCloseBtn = false;
        }
        this.handleMouseDown(e);
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    ButtonComponent.prototype.handleOnBlur = /**
     * @return {?}
     */
    function () {
        AppUtils.isCloseBtn = false;
    };
    /**
     * Get change detector reference for the button instance
     * @returns [[cd]] property (Change detector)
     */
    /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    ButtonComponent.prototype.getChangeDetector = /**
     * Get change detector reference for the button instance
     * @return {?} [[cd]] property (Change detector)
     */
    function () {
        return this.cd;
    };
    /**
     * Get Nexaweb tag name
     * @returns String
     */
    /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    ButtonComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} String
     */
    function () {
        return "button";
    };
    /**
     * Get JSON representation of the button component
     * @returns Json object
     */
    /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    ButtonComponent.prototype.toJson = /**
     * Get JSON representation of the button component
     * @return {?} Json object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "focused", this.focused);
        return json;
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-button',
                    template: "<button [disabled]=\"disabled || !enabled\"\n        [ngClass]=\"{'hidden': visible != true}\"\n\t\t\t\t[style.color]=\"fontColor\"\n\t\t\t\t[id]=\"id\"\n\t\t\t\ttype=\"button\" class=\"btn btn-default {{cssClass}}\"\n\t\t\t\t(mousedown)=\"onMouseDown($event)\"\n\t\t\t\t(click)=\"onClick($event)\"\n        (contextmenu)=\"handleOnContextMenu($event)\"\n        (blur)=\"handleOnBlur()\"\n        [ngStyle]=\"styles\"\n        [style.padding]=\"controlPadding\"\n        [style.margin-top]=\"marginTop\"\n        [style.margin-left]=\"marginLeft\"\n        [style.margin-right]=\"marginRight\"\n        [style.margin-bottom]=\"marginBottom\"\n        [style.line-height]=\"lineHeight\">\n\t{{ text }}\n\t<!-- allow children (in case user want to display html) -->\n\t<ng-content></ng-content>\n</button>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ButtonComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    ButtonComponent.propDecorators = {
        focused: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return ButtonComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
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
    return ButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Check box component class
 */
var CheckboxComponent = /** @class */ (function (_super) {
    __extends(CheckboxComponent, _super);
    function CheckboxComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.checked = false;
        _this.onCommand = new EventEmitter();
        _this.onStateChange = new EventEmitter();
        _this.onSelect = new EventEmitter();
        return _this;
    }
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checked;
        },
        //alias for checked
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            this.checked = boo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Must call parent class ngOnInit
     */
    /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent class ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     */
    /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    CheckboxComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Must call parent class ngAfterViewInit
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /**
     * Event handler for click event
     * @param event
     * @event OnCommand
     */
    /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleClick(event);
        this.onCommand.emit();
    };
    /**
     * Event handler for mousedown event
     * @param event
     */
    /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //consume the event, do not propagate any further
        event.stopPropagation();
        this.handleMouseDown(event);
    };
    /**
     * Event handler for state change (check/uncheck)
     * @event OnStateChange
     * @event OnSelect If the checkbox is set to selected state
     */
    /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    CheckboxComponent.prototype.handleStateChange = /**
     * Event handler for state change (check/uncheck)
     * \@event OnStateChange
     * \@event OnSelect If the checkbox is set to selected state
     * @return {?}
     */
    function () {
        this.onStateChange.emit();
        if (this.checked === true) {
            this.onSelect.emit();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    };
    /**
     * Get component name
     * @returns Name of component
     */
    /**
     * Get component name
     * @return {?} Name of component
     */
    CheckboxComponent.prototype.getLocalName = /**
     * Get component name
     * @return {?} Name of component
     */
    function () {
        return "checkBox";
    };
    /**
     * Get [[checked]] property
     * @returns Value of [[checked]]
     */
    /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    CheckboxComponent.prototype.getChecked = /**
     * Get [[checked]] property
     * @return {?} Value of [[checked]]
     */
    function () {
        return this.checked;
    };
    /**
     * Set [[checked]] property value
     * @param shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     */
    /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    CheckboxComponent.prototype.setChecked = /**
     * Set [[checked]] property value
     * @param {?} shouldChecked Value should be true/false or "true"/"false" to set [[checked]]
     * @param {?=} skipInternalChange
     * @return {?}
     */
    function (shouldChecked, skipInternalChange) {
        if (skipInternalChange === void 0) { skipInternalChange = false; }
        this.checked = shouldChecked === true || shouldChecked === 'true';
        this.markForCheck();
        //notify internal changes (for internal use only)
        if (skipInternalChange !== true) {
            this._notifyInternalChangeCb();
        }
    };
    /**
     * Alias for [[setChecked]] method
     * @param boo Toggle [[checked]]
     */
    /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    CheckboxComponent.prototype.setSelected = /**
     * Alias for [[setChecked]] method
     * @param {?} boo Toggle [[checked]]
     * @return {?}
     */
    function (boo) {
        this.setChecked(boo);
    };
    /**
     * Get [[value]] property
     * @returns Value of [[value]]
     */
    /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    CheckboxComponent.prototype.getValue = /**
     * Get [[value]] property
     * @return {?} Value of [[value]]
     */
    function () {
        return this.value;
    };
    /**
     * Get JSON representation of component state
     * @returns Object Json object
     */
    /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    CheckboxComponent.prototype.toJson = /**
     * Get JSON representation of component state
     * @return {?} Object Json object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
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
    };
    /**
     * Get Nexaweb tag name
     * @returns String Tag name
     */
    /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    CheckboxComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} String Tag name
     */
    function () {
        return "checkBox";
    };
    /**
     * Get [[cd]] (Change detector) property
     * @returns The component's change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    CheckboxComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?} The component's change detector reference
     */
    function () {
        return this.cd;
    };
    /**
   * Set background-color
   * @param String background color
   */
    /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    CheckboxComponent.prototype.setBgColor = /**
     * Set background-color
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this['elementRef'].nativeElement.children[0]['style']['background-color'] = color;
    };
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.getBgColor = /**
     * @return {?}
     */
    function () {
        return this['elementRef'].nativeElement.children[0]['style']['background-color'];
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-check-box',
                    template: "<div class=\"checkbox {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-checkbox\" [disabled]=\"disabled\" [id]=\"id\" type=\"checkbox\" value=\"\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (change)=\"handleStateChange()\" [(ngModel)]=\"checked\" [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return CheckboxComponent; })
                        }
                    ],
                    styles: ["div>label>input{position:static;vertical-align:middle}"]
                }] }
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    CheckboxComponent.propDecorators = {
        value: [{ type: Input }],
        checked: [{ type: Input }],
        isChecked: [{ type: Input }],
        onCommand: [{ type: Output }],
        onStateChange: [{ type: Output }],
        onSelect: [{ type: Output }]
    };
    return CheckboxComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CheckboxModule = /** @class */ (function () {
    function CheckboxModule() {
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
    return CheckboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ListItemDirective = /** @class */ (function () {
    function ListItemDirective() {
    }
    ListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-list-item'
                },] }
    ];
    /** @nocollapse */
    ListItemDirective.ctorParameters = function () { return []; };
    ListItemDirective.propDecorators = {
        value: [{ type: Input }],
        text: [{ type: Input }],
        selected: [{ type: Input }],
        isChecked: [{ type: Input }]
    };
    return ListItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ListBoxDirective = /** @class */ (function () {
    function ListBoxDirective() {
    }
    ListBoxDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-list-box'
                },] }
    ];
    /** @nocollapse */
    ListBoxDirective.ctorParameters = function () { return []; };
    ListBoxDirective.propDecorators = {
        listItems: [{ type: ContentChildren, args: [ListItemDirective,] }]
    };
    return ListBoxDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FauxComboElement = /** @class */ (function () {
    function FauxComboElement(comboBox, valuePair) {
        this.comboBox = comboBox;
        this.valuePair = valuePair;
    }
    /* istanbul ignore next */
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    FauxComboElement.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
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
    };
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getLocalName = /**
     * @return {?}
     */
    function () {
        return FauxComboElement.LOCAL_NAME;
    };
    /* istanbul ignore next */
    /**
     * @param {?} name
     * @return {?}
     */
    FauxComboElement.prototype.getAttribute = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (name === "value" || name === AttributesEnum.VALUE) {
            return this.valuePair.value;
        }
        if (name === "text" || name === AttributesEnum.TEXT) {
            return this.valuePair.text;
        }
        if (name === "selected" || name === AttributesEnum.SELECTED) {
            return this.valuePair.selected == true ? "true" : "false";
        }
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("value");
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getText = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("text");
    };
    /**
     * @return {?}
     */
    FauxComboElement.prototype.isSelected = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("selected");
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    FauxComboElement.prototype.setChecked = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.setAttribute("selected", boo);
    };
    FauxComboElement.LOCAL_NAME = "listItem";
    return FauxComboElement;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for combo box component
 */
var ComboBoxComponent = /** @class */ (function (_super) {
    __extends(ComboBoxComponent, _super);
    // V3R1-UT-NSD-643 修正 END
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd ChangeDetector reference provided by Angular to control change detection
     * @param renderer see [[BaseComponent]]
     */
    function ComboBoxComponent(parent, sessionService, elementRef, cd, renderer, ngZone) {
        var _this_1 = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this_1.cd = cd;
        _this_1.ngZone = ngZone;
        _this_1.onCommand = new EventEmitter();
        _this_1.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        _this_1.defaultStyle = {
            'color': '#333333',
            'background-color': '#ffffff'
        };
        _this_1.dropdownElementId = "dropdown-" + _this_1.id;
        _this_1.isDropup = false;
        _this_1.isDropdownOpen = false;
        /* istanbul ignore next */
        _this_1.dropdownMenuStyle = {};
        /* istanbul ignore next */
        _this_1.hasInputFocus = false;
        _this_1.isFirstKeyDown = true;
        _this_1.parentScrollHanlder = function () {
            /* istanbul ignore else */
            if (_this_1.dropdown != null) {
                _this_1.dropdown.hide();
            }
        };
        return _this_1;
    }
    Object.defineProperty(ComboBoxComponent.prototype, "listItems", {
        /**
         * Accessor method for [[_listItems]] property
         */
        get: /**
         * Accessor method for [[_listItems]] property
         * @return {?}
         */
        function () {
            return this._listItems;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._listItems = items;
            if (this._listItems != null) {
                /** @type {?} */
                var selectedItem = find(this._listItems, function (item) { return item.selected === true; });
                if (selectedItem != null) {
                    this.setSelectItem(selectedItem);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "selectedItemText", {
        /**
         * Accessor method for [[selectedItem.text]] property
         */
        get: /**
         * Accessor method for [[selectedItem.text]] property
         * @return {?}
         */
        function () {
            return this.selectedItem ? this.selectedItem.text : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this_1 = this;
        if (this.parentScrollHanlder != null && this.parentScroller != null) {
            this.ngZone.runOutsideAngular(function () {
                _this_1.parentScroller.removeEventListener("scroll", _this_1.parentScrollHanlder);
            });
        }
        this.parentScrollHanlder = null;
        this.parentScroller = null;
        if (this.dropdown && this.dropdown.isOpen) {
            this.dropdown.hide();
        }
        this.dropdown = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * Initialize component and set css stye attribute for dropdown element
     */
    /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    ComboBoxComponent.prototype.ngOnInit = /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.dropdownElementId = "dropdown-" + this.id;
        // Ensure controlWidth is exists and is a number
        if (parseInt(this.controlWidth, 10)) {
            this.dropdownMenuStyle['min-width'] = this.controlWidth + 'px !important';
        }
        if (this.alignHorizontal) {
            this.alignHorizontal = this.alignHorizontal;
        }
    };
    /**
     * Set up list items and set value/text on them. Sets selected item
     */
    /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    ComboBoxComponent.prototype.ngAfterViewInit = /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    function () {
        var _this_1 = this;
        _super.prototype.ngAfterViewInit.call(this);
        if (this.listBox != null && this.listBox.listItems != null) {
            this._listItems = [];
            this.listBox.listItems.forEach(function (item) {
                /** @type {?} */
                var text = item.text || '';
                /** @type {?} */
                var value = item.value || '';
                _this_1._listItems.push({
                    text: text ? text : value,
                    value: value ? value : text,
                    selected: item.selected === true || item.selected === "true" || item.isChecked === true || item.isChecked === "true"
                });
            });
            /** @type {?} */
            var selectedItem = find(this._listItems, function (item) { return item.selected === true; });
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
        this.loadDataFromDef();
        this.cd.detectChanges();
        this.subscribeToParentScroller();
    };
    /**
     * Sets combobox list using array of values
     * @param values Array of [[ValuePairs]] to set combobox options.
     */
    /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    ComboBoxComponent.prototype.initializeComboboxValues = /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    function (values) {
        if (values != null) {
            this._listItems = map(values, function (item) {
                item.text = item.text || '';
                return {
                    text: item.text,
                    value: item.value,
                    selected: item.selected
                };
            });
            /** @type {?} */
            var selectedItem = find(this._listItems, function (item) { return item.selected === true; });
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
    };
    /**
     * Focuses and selects item that is clicked
     * @param item Item to focus and select
     * @param event Mouse click event on item
     * @event onCommand
     */
    /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    ComboBoxComponent.prototype.selectItem = /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    function (item, event) {
        this.inputElement.nativeElement.focus();
        this.setSelectItem(item);
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    };
    /* istanbul ignore next */
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param item Item to set as selected
     * @param forceCd Force change detection
     */
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    ComboBoxComponent.prototype.setSelectItem = /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    function (item, forceCd) {
        if (forceCd === void 0) { forceCd = false; }
        this.selectedItem = item;
        if (forceCd === true) {
            this.cd.markForCheck();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    };
    /* istanbul ignore next */
    /**
     * Sets selected item based on value
     * @param value Value to set
     */
    /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    ComboBoxComponent.prototype.setSelectValue = /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    function (value) {
        if (this._listItems != null) {
            /** @type {?} */
            var temp = find(this._listItems, function (item) { return item.value == value || (value != null && value !== "" && value === item.text); });
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for mouse click on input
     * @param event Mouse click event on input element.
     */
    /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    ComboBoxComponent.prototype.onInputClick = /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    function (event, dropdown) {
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
    };
    /* istanbul ignore next */
    /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    ComboBoxComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    function (e, dropdown) {
        if (!this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            dropdown.toggle(true);
            /** @type {?} */
            var idx = 0;
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
            var idx = 0;
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
    };
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.adjustPulldownWidth = /**
     * @return {?}
     */
    function () {
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
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.toggleStatus = /**
     * @return {?}
     */
    function () {
        if (!this.isDropdownOpen) {
            /** @type {?} */
            var id = get(this.getParentScrollView(), "id");
            /** @type {?} */
            var _this_2 = this;
            $("#" + id).on('scroll mousewheel', function (e) {
                if (_this_2.dropdown != null) {
                    _this_2.dropdown.hide();
                }
                // return false;
            });
            /** @type {?} */
            var parentView = /** @type {?} */ (this.getParentView());
            if (parentView != null && parentView.dialog != null && parentView.dialog.modalContent && parentView.dialog.modalContent != null) {
                /** @type {?} */
                var parentPanel = parentView.dialog && parentView.dialog.modalContent.nativeElement;
                /** @type {?} */
                var comboBox = this.inputElement.nativeElement.parentElement;
                /** @type {?} */
                var parentPos = parentPanel.getBoundingClientRect();
                /** @type {?} */
                var childrenPos = comboBox.getBoundingClientRect();
                /** @type {?} */
                var distanceToBottom = parentPos.bottom - childrenPos.bottom;
                /** @type {?} */
                var distanceToTop = childrenPos.top - parentPos.top;
                /** @type {?} */
                var heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
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
                var dialog = $("#" + parentView["mainScreenId"]);
                if (dialog != null && dialog.children() && dialog.children()[0] && dialog.children()[0] != null) {
                    /** @type {?} */
                    var comboBox = this.inputElement.nativeElement.parentElement;
                    /** @type {?} */
                    var parentPos = dialog.children()[0].getBoundingClientRect();
                    /** @type {?} */
                    var childrenPos = comboBox.getBoundingClientRect();
                    /** @type {?} */
                    var distanceToBottom = parentPos.bottom - childrenPos.bottom;
                    /** @type {?} */
                    var distanceToTop = childrenPos.top - parentPos.top;
                    /** @type {?} */
                    var heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
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
            var id = get(this.getParentScrollView(), "id");
            $("#" + id).off('scroll mousewheel');
            // V3R1-UT-NSD-643 修正 START
            // トグルが閉じられたタイミングでフラグを戻す
            this.isFirstKeyDown = true;
            // V3R1-UT-NSD-643 修正 END
            this.dropdown.hide();
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    };
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param val Value to set.
     */
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    ComboBoxComponent.prototype.setValue = /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    function (val) {
        this.setSelectValue(val);
        this.cd.markForCheck();
    };
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param text Text of option to mark as selected.
     */
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    ComboBoxComponent.prototype.setText = /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    function (text) {
        if (text == null) {
            this.setSelectItem(null);
            this.cd.markForCheck();
        }
        else if (this._listItems != null) {
            /** @type {?} */
            var temp = find(this._listItems, function (item) { return item.text == text; });
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    };
    /**
     * Returns the selected item value.
     * @returns Value of the selected item in the combobox.
     */
    /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    ComboBoxComponent.prototype.getValue = /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    function () {
        return this.selectedItem ? this.selectedItem.value : null;
    };
    /**
     * Returns the text of the selected item.
     * @returns String value of selected item text.
     */
    /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    ComboBoxComponent.prototype.getText = /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    function () {
        return this.selectedItem ? this.selectedItem.text : "";
    };
    /**
     * Focuses the native input element
     */
    /**
     * Focuses the native input element
     * @return {?}
     */
    ComboBoxComponent.prototype.setFocus = /**
     * Focuses the native input element
     * @return {?}
     */
    function () {
        this.inputElement.nativeElement.focus();
    };
    /**
     * Set the background color of the input element.
     * @param bgColor A CSS color string value. Should be hexadecimal or valid color name.
     */
    /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    ComboBoxComponent.prototype.setBgColor = /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    function (bgColor) {
        this.inputElement.nativeElement.style.backgroundColor = bgColor;
    };
    /**
     * Finds a list item by text.
     * @param text Item text to search for
     * @returns [[ValuePair]] in [[_listItems]] that matches text
     */
    /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    ComboBoxComponent.prototype.findItemByText = /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    function (text) {
        return find(this._listItems, function (item) { return item.text == text; });
    };
    /**
     * Gets all list items that are children of the combobox component.
     * @returns Collection of list items.
     */
    /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    ComboBoxComponent.prototype.getChildren = /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    function () {
        var _this_1 = this;
        /** @type {?} */
        var result = new Vector();
        if (this._listItems != null) {
            forEach(this._listItems, function (item) {
                result.add(new FauxComboElement(_this_1, item));
            });
        }
        return result;
    };
    /**
     * Outputs JSON object that describes component
     * @returns Object
     */
    /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    ComboBoxComponent.prototype.toJson = /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json.value = this.getValue();
        return json;
    };
    /**
     * Returns string name of the component
     * @returns String
     */
    /**
     * Returns string name of the component
     * @return {?} String
     */
    ComboBoxComponent.prototype.getLocalName = /**
     * Returns string name of the component
     * @return {?} String
     */
    function () {
        return "comboBox";
    };
    /**
     * Returns string tag name of component
     */
    /**
     * Returns string tag name of component
     * @return {?}
     */
    ComboBoxComponent.prototype.getNxTagName = /**
     * Returns string tag name of component
     * @return {?}
     */
    function () {
        return "comboBox";
    };
    /* istanbul ignore next */
    /**
     * @returns [[ChangeDetector]] for the component
     */
    /**
     * @return {?} [[ChangeDetector]] for the component
     */
    ComboBoxComponent.prototype.getChangeDetector = /**
     * @return {?} [[ChangeDetector]] for the component
     */
    function () {
        return this.cd;
    };
    /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    ComboBoxComponent.prototype.loadDataFromDef = /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defId = this.getId();
        if (this.editor != null && this.editor.length > 0) {
            defId = this.editor.substring(1);
        }
        /** @type {?} */
        var def = this.getSession().getDef(defId);
        if (def != null && def.valueList != null) {
            /** @type {?} */
            var attribute = def.attribute;
            this.initializeComboboxValues(map(def.valueList, function (item) {
                return {
                    value: item["value"],
                    text: item["name"],
                    selected: item["selectFlg"] === "true" || item["selectFlg"] === true
                };
            }));
            this.setAttributeFromDef();
        }
    };
    /**
     * Removes focus from input element and sets unfocus background
     * @event OnBeforeActiveLost
     */
    /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    ComboBoxComponent.prototype.inputFocusOut = /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    function () {
        var _this_1 = this;
        if (!this.hasInputFocus)
            return; //On the IE, prevent to fire focusout event without focusin event.(this occurs when error-dialog is showed.)issue#1433NG(2)
        if (this.inputElement.nativeElement.ownerDocument.activeElement === this.inputElement.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.setBgColor('');
        this.onBeforeActiveLost.emit();
        this.hasInputFocus = false;
        setTimeout(function () {
            /** @type {?} */
            var $active = $(":focus");
            if ($active.length > 0 && !$active.is("body") && $active.closest(".vt-combo-box,[vt-arrow-navigatable-container]").length == 0) {
                if (_this_1.dropdown && _this_1.dropdown.isOpen) {
                    _this_1.dropdown.hide();
                }
            }
        }, 10);
    };
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     */
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    ComboBoxComponent.prototype.inputFocusIn = /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    function () {
        this.hasInputFocus = true;
    };
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param event Event object
     */
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    ComboBoxComponent.prototype.preventDefault = /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.inputElement.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.subscribeToParentScroller = /**
     * @return {?}
     */
    function () {
        var _this_1 = this;
        /** @type {?} */
        var scrollParent = $(this.elementRef.nativeElement).scrollParent();
        if (scrollParent != null && scrollParent[0] instanceof HTMLElement) {
            this.parentScroller = scrollParent[0];
            this.ngZone.runOutsideAngular(function () {
                _this_1.parentScroller.addEventListener("scroll", _this_1.parentScrollHanlder);
            });
        }
    };
    ComboBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-combo-box',
                    template: "<div [id]=\"id\" class=\"btn-group dropdown vt-combo-box {{cssClass}} {{!disabled}}select\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  [style.margin]=\"controlMargin\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  #dropdown=\"bs-dropdown\"\n  (onShown)=\"toggleStatus()\"\n  (onHidden)=\"toggleStatus()\"\n  dropdown [isDisabled]=\"disabled === true\" container=\"body\" [dropup]=\"isDropup\">\n  <div class=\"input-group\">\n    <input #input class=\"form-control combobox-input-box\" type=\"text\" [value]=\"selectedItemText\" [style.text-align]=\"alignHorizontal\"\n      (focusin)=\"inputFocusIn()\" (focusout)=\"inputFocusOut()\" (click)=\"onInputClick($event, dropdown)\" [readonly]=\"disabled !== true\" [disabled]=\"disabled\" (keydown)=\"onKeyDown($event,dropdown)\"/>\n    <span class=\"input-group-btn\">\n      <button id=\"button\" (mousedown)=\"preventDefault($event)\" (click)=\"adjustPulldownWidth()\" dropdownToggle type=\"button\" class=\"btn combo-btn dropdown-toggle\" style=\"width: 20px\" tabindex=\"-1\">\n        <span class=\"caret\"></span>\n      </button>\n    </span>\n  </div>\n  <ul\n    *dropdownMenu\n    [id]=\"dropdownElementId\"\n    class=\"dropdown-menu combobox-dropdown\"\n    role=\"menu\"\n    [ngStyle]=\"dropdownMenuStyle\"\n    vt-arrow-navigatable-container\n    [activeParent]=\"input\"\n    (onTab)=\"dropdown.hide()\"\n  >\n    <li *ngFor=\"let item of listItems; index as i\">\n      <ng-template [ngIf]=\"item.visible !== false && item.visible !== 'false'\">\n        <a *ngIf=\"item.text != null && item.text !== ''\"\n          class=\"dropdown-item menuItem\"\n          (mousedown)=\"preventDefault($event)\"\n          (click)=\"selectItem(item, $event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          vt-arrow-navigatable-item>{{item.text}}</a>\n        <a *ngIf=\"item.text == null || item.text === ''\"\n          class=\"dropdown-item\"\n          (mousedown)=\"preventDefault($event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          vt-arrow-navigatable-item\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          (click)=\"selectItem(item, $event)\">\n          &nbsp;\n        </a>\n      </ng-template>\n    </li>\n  </ul>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ComboBoxComponent; })
                        }
                    ],
                    styles: ["bs-dropdown-container ul.dropdown-menu.combobox-dropdown{max-height:225px;margin-top:-3px!important;overflow:auto;overflow-x:hidden}.combobox-dropdown>li>a{padding:3px 10px 3px 5px;font-size:9px!important;margin-bottom:0!important}.combobox-dropdown>li>a:hover{color:#0000cd;background-color:#ff9c00}.vt-combo-box .form-control[readonly]{background:#fff;cursor:default;margin-bottom:3px}bs-dropdown-container{z-index:10000}.combo-btn,.combo-btn:hover{color:#000;background-color:#fff;border-color:#ccc;margin-bottom:3px}.combo-btn[disabled]{color:grey;background-color:#ccc;border-color:#ccc;margin-bottom:3px}.falseselect div.input-group .form-control{color:grey;background-color:#eee}.mouse-hover{background:#ff9c00!important}.dropup .dropdown-menu{margin-bottom:26px}"]
                }] }
    ];
    /** @nocollapse */
    ComboBoxComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    ComboBoxComponent.propDecorators = {
        onCommand: [{ type: Output }],
        listBox: [{ type: ContentChild, args: [ListBoxDirective,] }],
        inputElement: [{ type: ViewChild, args: ['input',] }],
        dropdown: [{ type: ViewChild, args: ["dropdown", { read: BsDropdownDirective },] }],
        listItems: [{ type: Input }]
    };
    return ComboBoxComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ArrowNavigatableItemDirective = /** @class */ (function () {
    function ArrowNavigatableItemDirective(element, zone, renderer) {
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
    ArrowNavigatableItemDirective.prototype.handleOnBlur = /**
     * @return {?}
     */
    function () {
        this.blur();
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.handleOnFocus = /**
     * @return {?}
     */
    function () {
        if (this.parent != null) {
            this.parent.activeItem = this;
        }
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.jq = null;
        this.element = null;
        this.zone = null;
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.jq.mouseover();
            _this.jq.focus();
            _this.renderer.addClass(_this.element.nativeElement, "mouse-hover");
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.blur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.jq.mouseout();
            _this.jq.blur();
            _this.renderer.removeClass(_this.element.nativeElement, "mouse-hover");
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.select = /**
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.element.nativeElement)).click();
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.hover = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            //(this.element.nativeElement as HTMLElement).dispatchEvent(new Event("mouseenter"));
            _this.vtArrowOnMouseEnter.emit();
        });
    };
    /**
     * @return {?}
     */
    ArrowNavigatableItemDirective.prototype.leave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run(function () {
            _this.vtArrowOnMouseLeave.emit();
        });
    };
    ArrowNavigatableItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-arrow-navigatable-item]',
                },] }
    ];
    /** @nocollapse */
    ArrowNavigatableItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ArrowNavigatableItemDirective.propDecorators = {
        vtArrowOnMouseEnter: [{ type: Output }],
        vtArrowOnMouseLeave: [{ type: Output }],
        handleOnBlur: [{ type: HostListener, args: ["blur",] }],
        handleOnFocus: [{ type: HostListener, args: ["focus",] }]
    };
    return ArrowNavigatableItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ArrowNavigatableContainerDirective = /** @class */ (function () {
    function ArrowNavigatableContainerDirective(zone, element) {
        var _this = this;
        this.zone = zone;
        this.element = element;
        this.onItemHover = new EventEmitter();
        this.onTab = new EventEmitter();
        this.keydownHandler = function (event) { return _this.handleKeydown(event); };
        this.zone.runOutsideAngular(function () {
            (document).addEventListener("keydown", _this.keydownHandler);
        });
    }
    Object.defineProperty(ArrowNavigatableContainerDirective.prototype, "navigatableItemsQuery", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (items == null) {
                this.navigatableItems = null;
            }
            else {
                this.navigatableItems = items.toArray();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.navigatableItems = null;
        this.zone.runOutsideAngular(function () {
            (document).removeEventListener("keydown", _this.keydownHandler);
        });
        this.element = null;
        this.keydownHandler = null;
        this.navigatableItems = null;
        this.activeItem = null;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.moveUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //can only go up if there are any items above
        if (this.hasItems()) {
            /** @type {?} */
            var idx = 0;
            if (this.activeItem != null) {
                this.activeItem.blur();
                idx = findIndex(this.navigatableItems, function (item) { return item === _this.activeItem; });
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; });
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.moveDown = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hasItems()) {
            /** @type {?} */
            var idx = -1;
            if (this.activeItem != null) {
                idx = findIndex(this.navigatableItems, function (item) { return item === _this.activeItem; });
                this.activeItem.blur();
            }
            else if (this.isActiveElementDirectChildren()) {
                idx = findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; });
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
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.select = /**
     * @return {?}
     */
    function () {
        if (this.activeItem != null) {
            this.activeItem.select();
        }
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.hasItems = /**
     * @return {?}
     */
    function () {
        return this.navigatableItems != null && this.navigatableItems.length > 0;
    };
    /**
     * @return {?}
     */
    ArrowNavigatableContainerDirective.prototype.isActiveElementDirectChildren = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var retVal = false;
        if (document.activeElement != null && this.navigatableItems != null && this.navigatableItems.length > 0) {
            retVal = findIndex(this.navigatableItems, function (item) { return item.element.nativeElement === document.activeElement; }) >= 0;
        }
        return retVal;
    };
    ArrowNavigatableContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-arrow-navigatable-container]'
                },] }
    ];
    /** @nocollapse */
    ArrowNavigatableContainerDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef }
    ]; };
    ArrowNavigatableContainerDirective.propDecorators = {
        activeParent: [{ type: Input }],
        onItemHover: [{ type: Output }],
        onTab: [{ type: Output }],
        navigatableItemsQuery: [{ type: ContentChildren, args: [ArrowNavigatableItemDirective,] }]
    };
    return ArrowNavigatableContainerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var KeyboardModule = /** @class */ (function () {
    function KeyboardModule() {
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
    return KeyboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ComboBoxModule = /** @class */ (function () {
    function ComboBoxModule() {
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
    return ComboBoxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(renderer, ngZone, sessionService) {
        var _this = this;
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
        this.mouseDownHandler = function (event) { return _this.onMouseDownHandler(event); };
        this.mouseMoveHandler = throttle(function (event) { return _this.onMouseMoveHandler(event); }, 75);
        this.mouseUpHandler = function (event) { return _this.onMouseUpHandler(event); };
    }
    /**
     * @return {?}
     */
    DraggableDirective.prototype.addDragListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(function () {
                dragElement.addEventListener('mousedown', _this.mouseDownHandler, true);
                document.addEventListener('mouseup', _this.mouseUpHandler, true);
                dragElement = null;
            });
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.removeDragListeners = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            dragElement.removeEventListener('mousedown', this.mouseDownHandler, true);
            document.removeEventListener('mousemove', this.mouseMoveHandler, true); // 念のため置いておく
            document.removeEventListener('mouseup', this.mouseUpHandler, true);
            dragElement = null;
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeDragListeners();
        delete this.renderer;
        delete this.ngZone;
        delete this.draggablePanel;
        delete this.mouseDownHandler;
        delete this.mouseMoveHandler;
        delete this.mouseUpHandler;
        delete this.parentPanel;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseDownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(function () {
                document.addEventListener('mousemove', _this.mouseMoveHandler, true);
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
                var bound = this.getBound(this.parentElement);
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.applyTranslate(bound.x, bound.y);
                this.moveWindowToTop();
                this.canTrackMouseMove = true;
            }
            else { //for error/info dialog
                /** @type {?} */
                var bound = this.getBound(this.parentElement);
                /** @type {?} */
                var height = this.parentElement.offsetHeight + 'px';
                /** @type {?} */
                var width = this.parentElement.offsetWidth + 'px';
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.renderer.setStyle(this.parentElement, 'height', height);
                this.renderer.setStyle(this.parentElement, 'width', width);
                this.applyTranslate(bound.x, bound.y);
                this.canTrackMouseMove = true;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseMoveHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.canDrag && this.canTrackMouseMove) {
            /** @type {?} */
            var currentMousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            /** @type {?} */
            var diffX = currentMousePosition.x - this.mousePosition.x;
            /** @type {?} */
            var diffY = currentMousePosition.y - this.mousePosition.y;
            /** @type {?} */
            var parentBound = this.getBound(this.parentElement);
            /** @type {?} */
            var newX = parentBound.x + diffX;
            /** @type {?} */
            var newY = parentBound.y + diffY;
            this.applyTranslate(newX, newY);
            this.mousePosition = currentMousePosition;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseUpHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            document.removeEventListener('mousemove', this.mouseMoveHandler, true);
            dragElement = null;
        }
        if (this.canDrag && this.canTrackMouseMove) {
            this.canTrackMouseMove = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.canDrag) {
            if (this.isView)
                this.moveWindowToTop();
        }
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DraggableDirective.prototype.applyTranslate = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        var _this = this;
        if (y > 0) {
            this.ngZone.runOutsideAngular(function () {
                /** @type {?} */
                var top = 0;
                /** @type {?} */
                var topMax = 82;
                if (_this.isView) {
                    top = Math.max(y, topMax);
                }
                else {
                    top = Math.max(y, 0);
                }
                if (_this.sessionService.dialogMaxTopPosition > 0 && top > _this.sessionService.dialogMaxTopPosition) {
                    top = _this.sessionService.dialogMaxTopPosition;
                }
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                _this.renderer.setStyle(_this.parentElement, 'top', top + 'px');
                _this.renderer.setStyle(_this.parentElement, 'left', x + 'px');
            });
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.moveWindowToTop = /**
     * @return {?}
     */
    function () {
        this.sessionService.getMcoContainer().reStackView(this.viewId, this.screenIndex);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DraggableDirective.prototype.setViewId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id != null) {
            this.viewId = id;
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DraggableDirective.prototype.setTableId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id != null) {
            this.tableId = id;
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.getDragElement = /**
     * @return {?}
     */
    function () {
        if (this.vtDraggable === true && this.draggablePanel) {
            return this.draggablePanel.nativeElement;
        }
        return null;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DraggableDirective.prototype.getBound = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        /** @type {?} */
        var bound = /** @type {?} */ (el.getBoundingClientRect());
        return {
            x: bound.x || bound.left,
            y: bound.y || bound.top
        };
    };
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
    DraggableDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: SessionService }
    ]; };
    DraggableDirective.propDecorators = {
        vtDraggable: [{ type: Input }],
        modal: [{ type: Input, args: ["modal",] }],
        isView: [{ type: Input }],
        title: [{ type: Input }],
        canDrag: [{ type: Input }],
        draggablePanel: [{ type: ContentChild, args: ['draggablePanel', { read: ElementRef },] }],
        parentPanel: [{ type: ContentChild, args: ['myModal', { read: ElementRef },] }]
    };
    return DraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for managing dynamic views
 */
var DynamicPagesService = /** @class */ (function () {
    /**
     *
     * @param viewFactory
     */
    function DynamicPagesService(viewFactory, sessionService) {
        this.viewFactory = viewFactory;
        this.sessionService = sessionService;
        this.dynamicViewsMap = [];
    }
    /* istanbul ignore next */
    /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param viewContainer
     */
    /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param {?} viewContainer
     * @return {?}
     */
    DynamicPagesService.prototype.registerViewContainer = /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param {?} viewContainer
     * @return {?}
     */
    function (viewContainer) {
        this.viewContainer = viewContainer;
    };
    /* istanbul ignore next */
    /**
     * Create a new [[ViewComponent]] instance
     * @param viewType
     * @param routeId
     */
    /**
     * Create a new [[ViewComponent]] instance
     * @param {?} viewType
     * @param {?=} routeId
     * @return {?}
     */
    DynamicPagesService.prototype.createDynamicView = /**
     * Create a new [[ViewComponent]] instance
     * @param {?} viewType
     * @param {?=} routeId
     * @return {?}
     */
    function (viewType, routeId) {
        var _this = this;
        if (routeId === void 0) { routeId = null; }
        // For suppress warning (Circular dependency), it is not able to call ViewComponent's method directly here.
        if (DynamicPagesService.onCreateViewCloser) {
            DynamicPagesService.onCreateViewCloser(this.sessionService, viewType, routeId);
        }
        if (this.sessionService.getMessagingService() != null) {
            this.sessionService.getMessagingService().setFreezePushService(true);
        }
        /** @type {?} */
        var view = this.viewContainer.createComponent(this.viewFactory.resolveComponentFactory(viewType));
        this.dynamicViewsMap.push(view);
        view.instance.isDynamicPage = true;
        view.changeDetectorRef.detectChanges();
        return new Promise(function (r, j) {
            //has route id?
            if (routeId != null && routeId !== "") {
                view.instance["routeId"] = routeId;
            }
            if (view.instance.viewIsInitialized === true) {
                if (_this.sessionService.getMessagingService() != null) {
                    _this.sessionService.getMessagingService().setFreezePushService(false);
                }
                r(view.instance);
            }
            else {
                /** @type {?} */
                var sub_1 = view.instance.viewInitialized.subscribe(function () {
                    sub_1.unsubscribe();
                    if (_this.sessionService.getMessagingService() != null) {
                        _this.sessionService.getMessagingService().setFreezePushService(false);
                    }
                    r(view.instance);
                });
            }
        });
    };
    /* istanbul ignore next */
    /**
     * Destroy [[ViewComponent]] instance reference
     * @param viewToRemove
     * @param immediate
     */
    /**
     * Destroy [[ViewComponent]] instance reference
     * @param {?} viewToRemove
     * @param {?} immediate
     * @return {?}
     */
    DynamicPagesService.prototype.removeView = /**
     * Destroy [[ViewComponent]] instance reference
     * @param {?} viewToRemove
     * @param {?} immediate
     * @return {?}
     */
    function (viewToRemove, immediate) {
        /** @type {?} */
        var deadView = find(this.dynamicViewsMap, function (view) {
            return view.instance.uniqueId == viewToRemove.uniqueId;
        });
        this.dynamicViewsMap = filter(this.dynamicViewsMap, function (view) {
            return view.instance.uniqueId != viewToRemove.uniqueId;
        });
        if (viewToRemove.isDestroyed !== true && deadView != null) {
            if (immediate) {
                deadView.destroy();
            }
            else {
                setTimeout(function () {
                    deadView.destroy();
                }, 1);
            }
        }
    };
    DynamicPagesService.onCreateViewCloser = null;
    DynamicPagesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DynamicPagesService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: SessionService }
    ]; };
    /** @nocollapse */ DynamicPagesService.ngInjectableDef = defineInjectable({ factory: function DynamicPagesService_Factory() { return new DynamicPagesService(inject(ComponentFactoryResolver), inject(SessionService)); }, token: DynamicPagesService, providedIn: "root" });
    return DynamicPagesService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Document object class to access virtual DOM
 */
var UiDocument = /** @class */ (function () {
    function UiDocument() {
    }
    /**
     * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
     * @param id
     */
    /**
     * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
     * @param {?} id
     * @return {?}
     */
    UiDocument.getMenuComponent = /**
     * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this.menuItemElementMap == null) {
            return null;
        }
        return this.menuItemElementMap.get(id);
    };
    /**
     * Alias for [[findElementById]]
     * @param id
     */
    /**
     * Alias for [[findElementById]]
     * @param {?} id
     * @return {?}
     */
    UiDocument.getElementById = /**
     * Alias for [[findElementById]]
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return UiDocument.findElementById(id);
    };
    /**
     * Search for and return a component by id
     * @param id ViewComponent id
     */
    /**
     * Search for and return a component by id
     * @param {?} id ViewComponent id
     * @return {?}
     */
    UiDocument.findElementById = /**
     * Search for and return a component by id
     * @param {?} id ViewComponent id
     * @return {?}
     */
    function (id) {
        var e_1, _a;
        if (id == null)
            return null;
        /** @type {?} */
        var comp = null;
        if (!appInjector())
            return;
        /** @type {?} */
        var mcoContainer = appInjector().get(McoContainerService);
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
                var views = mcoContainer.getViews();
                try {
                    for (var views_1 = __values(views), views_1_1 = views_1.next(); !views_1_1.done; views_1_1 = views_1.next()) {
                        var view = views_1_1.value;
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
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (views_1_1 && !views_1_1.done && (_a = views_1.return)) _a.call(views_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            //our component is in a subview?
            if (comp == null && mcoContainer.getActionForwardHandlerMap() != null) {
                /** @type {?} */
                var actionForwardIt = mcoContainer.getActionForwardHandlerMap().values();
                /** @type {?} */
                var forwardItResult = actionForwardIt.next();
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
            var mcoContainer_1 = appInjector().get(McoContainerService);
            if (mcoContainer_1 != null) {
                /** @type {?} */
                var activeView = mcoContainer_1.activeView();
                if (activeView != null && activeView.hasPopupMenu()) {
                    /** @type {?} */
                    var contextMenuService = appInjector().get(ContextMenuService);
                    if (contextMenuService != null) {
                        /** @type {?} */
                        var popupMenuItems = contextMenuService.getContextMenuItems(activeView.getFirstPopupMenuId());
                        if (popupMenuItems != null) {
                            /** @type {?} */
                            var menuItem = popupMenuItems.find(function (item) {
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
    };
    /**
     * Get JSON representation of component
     * @returns Object JSON metadata for this component
     */
    /**
     * Get JSON representation of component
     * @return {?} Object JSON metadata for this component
     */
    UiDocument.toJson = /**
     * Get JSON representation of component
     * @return {?} Object JSON metadata for this component
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var views = appInjector().get(McoContainerService).getViews();
        /** @type {?} */
        var json = {};
        try {
            for (var views_2 = __values(views), views_2_1 = views_2.next(); !views_2_1.done; views_2_1 = views_2.next()) {
                var view = views_2_1.value;
                json[view.getId()] = view.toJson();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (views_2_1 && !views_2_1.done && (_a = views_2.return)) _a.call(views_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return json;
    };
    /**
     * Set attribute with value on component by id
     * @param id Component id
     * @param attributeName Name of attribute to set
     * @param value Value of attribute to set
     */
    /**
     * Set attribute with value on component by id
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute to set
     * @param {?} value Value of attribute to set
     * @return {?}
     */
    UiDocument.setElementAttribute = /**
     * Set attribute with value on component by id
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute to set
     * @param {?} value Value of attribute to set
     * @return {?}
     */
    function (id, attributeName, value) {
        /** @type {?} */
        var element = this.getElementById(id);
        if (element != null) {
            element.setAttribute(attributeName, value);
        }
        else {
            Logger.warn("Unable to set attribute to element id: " + id + ", doesn't exists");
        }
    };
    /**
     * Get the value of an attribute if it exists, otherwise return null
     * @param id Component id
     * @param attributeName Name of attribute value to get
     */
    /**
     * Get the value of an attribute if it exists, otherwise return null
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute value to get
     * @return {?}
     */
    UiDocument.getElementAttribute = /**
     * Get the value of an attribute if it exists, otherwise return null
     * @param {?} id Component id
     * @param {?} attributeName Name of attribute value to get
     * @return {?}
     */
    function (id, attributeName) {
        /** @type {?} */
        var element = this.getElementById(id);
        if (element != null) {
            return element.getAttribute(attributeName);
        }
        else {
            Logger.warn("Unable to get attribute to element id: " + id + ", doesn't exists");
        }
        return null;
    };
    /**
     * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
     * @param id Key to use in map for menu item being added
     * @param menuItemElement Component to add to map
     */
    /**
     * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
     * @param {?} id Key to use in map for menu item being added
     * @param {?} menuItemElement Component to add to map
     * @return {?}
     */
    UiDocument.registerMenuItemElement = /**
     * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
     * @param {?} id Key to use in map for menu item being added
     * @param {?} menuItemElement Component to add to map
     * @return {?}
     */
    function (id, menuItemElement) {
        if (this.menuItemElementMap == null) {
            this.menuItemElementMap = new Map();
        }
        this.menuItemElementMap.set(id, menuItemElement);
        //track menu item for sending to server
        if (menuItemElement.item != null && menuItemElement.item.parentScreenId != null) {
            /** @type {?} */
            var mcoContainer = appInjector().get(McoContainerService);
            if (mcoContainer != null) {
                /** @type {?} */
                var activeView = mcoContainer.getViewById(menuItemElement.item.parentScreenId);
                if (activeView != null) {
                    activeView.trackInactiveMenuItem(menuItemElement);
                }
            }
        }
    };
    /**
     * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
     * @param id Key of menu item to remove from map
     */
    /**
     * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
     * @param {?} id Key of menu item to remove from map
     * @return {?}
     */
    UiDocument.unregisterMenuItemElement = /**
     * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
     * @param {?} id Key of menu item to remove from map
     * @return {?}
     */
    function (id) {
        if (this.menuItemElementMap != null) {
            this.menuItemElementMap.delete(id);
        }
    };
    /**
     * Sets [[ComboboxComponent]] values
     * @param id Combobox component id
     * @param values Initial values to set on combobox component
     */
    /**
     * Sets [[ComboboxComponent]] values
     * @param {?} id Combobox component id
     * @param {?} values Initial values to set on combobox component
     * @return {?}
     */
    UiDocument.initializeComboBoxValues = /**
     * Sets [[ComboboxComponent]] values
     * @param {?} id Combobox component id
     * @param {?} values Initial values to set on combobox component
     * @return {?}
     */
    function (id, values) {
        /** @type {?} */
        var comp = /** @type {?} */ (this.findElementById(id));
        if (comp != null) {
            comp.initializeComboboxValues(values);
        }
        else {
            console.warn("Unable to initialie combo: " + id);
        }
    };
    /* istanbul ignore next */
    /**
     * Focus the parent tab of this [[elementId]]
     * @param elementId the element id where we want its parent tab to be focused
     */
    /**
     * Focus the parent tab of this [[elementId]]
     * @param {?} elementId the element id where we want its parent tab to be focused
     * @return {?}
     */
    UiDocument.focusParentTab = /**
     * Focus the parent tab of this [[elementId]]
     * @param {?} elementId the element id where we want its parent tab to be focused
     * @return {?}
     */
    function (elementId) {
        if (elementId != null) {
            /** @type {?} */
            var comp_1 = this.findElementById(elementId);
            if (comp_1 != null && typeof comp_1["focusParentTab"] === "function") {
                comp_1["focusParentTab"]();
            }
            if (comp_1 != null) {
                appInjector().get(NgZone).runOutsideAngular(function () {
                    setTimeout(function () {
                        comp_1.setFocus();
                    }, 100);
                });
            }
        }
    };
    UiDocument.menuItemElementMap = null;
    return UiDocument;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var tabbable = tabbableFRollup;
/**
 * Class for dialog component
 */
var DialogComponent = /** @class */ (function (_super) {
    __extends(DialogComponent, _super);
    /* istanbul ignore next */
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
    function DialogComponent(parent, sessionService, elementRef, cd, renderer, dynamicPageService, zone) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.dynamicPageService = dynamicPageService;
        _this.zone = zone;
        _this.draggable = true;
        _this._modal = "false";
        _this._center = false;
        _this.modalSize = 'large';
        _this.resizeable = false;
        _this.onClosing = new EventEmitter();
        _this.modalWidth = '100%';
        _this.modalHeight = '100%';
        _this.modalBodyHeight = '100%';
        _this.isMaximize = false;
        _this.isUnMaximize = false;
        // 画面リサイズ対応 Start
        _this.resizeDialog = false;
        _this.modalBodyMinHeight = null;
        _this.modalBodyDivHeight = null;
        _this.modalBodyDivWidth = null;
        _this.modalBodyPercentHeight = null;
        // 画面リサイズ対応 End
        _this.resizeFlg = false;
        _this.modalOriginalLeft = 0;
        _this.modalOriginalTop = 0;
        /* istanbul ignore next */
        _this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
        _this.viewRouteUrl = '';
        _this.docClickHandler = function (event) {
            _this.handleDocClickEvent(event);
        };
        _this.modalFocusOutHandler = function (event) {
            _this.checkFocusOut(event);
        };
        _this.keydownHandler = function (event) {
            _this.checkKey(event);
        };
        return _this;
    }
    Object.defineProperty(DialogComponent.prototype, "modal", {
        get: /**
         * @return {?}
         */
        function () {
            return this._modal;
        },
        //modal is default to false, when true, it is blocking
        set: /**
         * @param {?} modal
         * @return {?}
         */
        function (modal) {
            this._modal = modal;
            this.updateModalDialogStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "centered", {
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            if (typeof boo === 'string') {
                this._center = boo === 'true' ? true : false;
            }
            else {
                this._center = boo;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "windowTitle", {
        //alias
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this.title = title;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set [[viewRouteUrl]] property
     * @param viewRouteUrl
     */
    /**
     * Set [[viewRouteUrl]] property
     * @param {?} viewRouteUrl
     * @return {?}
     */
    DialogComponent.prototype.setViewRouteUrl = /**
     * Set [[viewRouteUrl]] property
     * @param {?} viewRouteUrl
     * @return {?}
     */
    function (viewRouteUrl) {
        this.viewRouteUrl = viewRouteUrl;
    };
    /**
     * Set draggable directive id and [[id]]
     */
    /**
     * Set draggable directive id and [[id]]
     * @return {?}
     */
    DialogComponent.prototype.resetId = /**
     * Set draggable directive id and [[id]]
     * @return {?}
     */
    function () {
        this.updateDraggableDirectiveId();
        _super.prototype.resetId.call(this);
        this.cd.detectChanges();
    };
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     */
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     * @return {?}
     */
    DialogComponent.prototype.dialogResize = /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     * @return {?}
     */
    function () {
        /* istanbul ignore else */
        if (this.resizeFlg === false) {
            //this.resizeExecute();
            this.resizeFlg = true;
            this.setDisabledDialogWidth();
        }
    };
    /**
   * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
   * リサイズを行う
   */
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * リサイズを行う
     * @return {?}
     */
    DialogComponent.prototype.resizeExecute = /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * リサイズを行う
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild.lastElementChild)).getBoundingClientRect());
        /** @type {?} */
        var newX = bound.right - bound.left + 20;
        this.zone.runOutsideAngular(function () {
            _this.renderer.setStyle(_this.modalElement.nativeElement.firstChild.lastElementChild, 'width', newX + 'px');
        });
        this.cd.detectChanges();
    };
    /* istanbul ignore next */
    /**
     * Init lifecycle. Sets [[viewId]]
     */
    /**
     * Init lifecycle. Sets [[viewId]]
     * @return {?}
     */
    DialogComponent.prototype.ngOnInit = /**
     * Init lifecycle. Sets [[viewId]]
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.viewId = this.id;
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Cleans up references
     */
    /**
     * Destroy lifecycle. Cleans up references
     * @return {?}
     */
    DialogComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Cleans up references
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
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
    };
    /**
     * After view init lifecycle. Sets initial dialog height/width and positioning
     */
    /**
     * After view init lifecycle. Sets initial dialog height/width and positioning
     * @return {?}
     */
    DialogComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Sets initial dialog height/width and positioning
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
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
            resize: function (event, ui) {
                //top場所制限設定
                if (ui.position.top <= 82) {
                    ui.position.top = 82;
                    return;
                }
                ui.element.css("min-height", "");
                ui.element.css("min-width", "");
                $(_this.modalDialog.nativeElement).css("height", ui.size.height);
                $(_this.modalDialog.nativeElement).css("width", ui.size.width);
                $(_this.modalContent.nativeElement).css("height", ui.size.height);
                $(_this.modalContent.nativeElement).css("width", ui.size.width);
                $(_this.body.nativeElement).css("min-height", "calc(100% - 25px)");
                if (_this.tableId != null) {
                    /** @type {?} */
                    var table = /** @type {?} */ (UiDocument.getElementById(_this.tableId));
                    if (table != null) {
                        table.tableResize();
                    }
                }
            }
        });
        $(this.modalElement.nativeElement).on("resizestop", function () {
            _this.setDisabledDialogWidth();
        });
        // }
        this._tabbables = tabbable(this.body.nativeElement);
        this.zone.runOutsideAngular(function () {
            document.addEventListener("mousedown", _this.docClickHandler);
            (/** @type {?} */ (_this.modalElement.nativeElement)).addEventListener("focusout", _this.modalFocusOutHandler, true);
            (/** @type {?} */ (_this.modalElement.nativeElement)).addEventListener("keydown", _this.keydownHandler, true);
        });
    };
    /**
     * Set the width of disabled-dialog with the width of the modal-content
     * @return {?}
     */
    DialogComponent.prototype.setDisabledDialogWidth = /**
     * Set the width of disabled-dialog with the width of the modal-content
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.modalElement.nativeElement;
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'width', element.querySelector('.modal-content').offsetWidth + 'px');
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'height', element.querySelector('.modal-content').offsetHeight + 'px');
    };
    /**
     * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
     * @return {?}
     */
    DialogComponent.prototype.updateDraggableDirectiveId = /**
     * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
     * @return {?}
     */
    function () {
        if (this.draggableDirective != null) {
            this.draggableDirective.setViewId(this.id);
            this.draggableDirective.setTableId(this.tableId);
            this.draggableDirective.screenIndex = this.screenIndex;
        }
    };
    /**
     * Set position of window component
     * @return {?}
     */
    DialogComponent.prototype.setModalLessPosition = /**
     * Set position of window component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild)).getBoundingClientRect());
        /** @type {?} */
        var left = (bound.x || bound.left) + "px";
        /** @type {?} */
        var top = (Math.max(bound.y || bound.top, 120)) + "px";
        this.renderer.setStyle(this.modalElement.nativeElement, "left", left);
        this.renderer.setStyle(this.modalElement.nativeElement, "top", top);
    };
    /**
     * Get the native HTML element of this dialog
     * @returns DOM element
     */
    /**
     * Get the native HTML element of this dialog
     * @return {?} DOM element
     */
    DialogComponent.prototype.getElement = /**
     * Get the native HTML element of this dialog
     * @return {?} DOM element
     */
    function () {
        return this.elementRef.nativeElement;
    };
    /* istanbul ignore next */
    /**
     * Event handler for click on close button. Closes the window
     * @param event
     * @param immediate
     */
    /**
     * Event handler for click on close button. Closes the window
     * @param {?=} event
     * @param {?=} immediate
     * @return {?}
     */
    DialogComponent.prototype.close = /**
     * Event handler for click on close button. Closes the window
     * @param {?=} event
     * @param {?=} immediate
     * @return {?}
     */
    function (event, immediate) {
        if (event === void 0) { event = null; }
        if (immediate === void 0) { immediate = false; }
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
    };
    /* istanbul ignore next */
    /**
     * Set [[disabled]] property value
     * @param boo Value for disabled property
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    DialogComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        $(this.modalElement.nativeElement).resizable("option", "disabled", boo); //Don't remove this. This makes disabled-dialog not to be resizable.
        $(this.modalElement.nativeElement.querySelector('.modal-content')).disabled = boo; //I am not sure why this is needed.
    };
    /**
     * Sets the dialogs 'z-index' CSS property
     * @param newZIndex
     */
    /**
     * Sets the dialogs 'z-index' CSS property
     * @param {?} newZIndex
     * @return {?}
     */
    DialogComponent.prototype.updateZIndex = /**
     * Sets the dialogs 'z-index' CSS property
     * @param {?} newZIndex
     * @return {?}
     */
    function (newZIndex) {
        if (this.modalElement != null && this.renderer != null) {
            this.renderer.setStyle(this.modalElement.nativeElement, "z-index", newZIndex);
        }
        this.setInactiveDialogStyle();
    };
    /* istanbul ignore next */
    /**
     * Set inactive window style if this dialog is not the current active dialog
     */
    /**
     * Set inactive window style if this dialog is not the current active dialog
     * @return {?}
     */
    DialogComponent.prototype.setInactiveDialogStyle = /**
     * Set inactive window style if this dialog is not the current active dialog
     * @return {?}
     */
    function () {
        /** @type {?} */
        var inactiveDialogClass = 'inactive-dialog';
        // Apply inactive dialog class when other window is focused
        if (this.getSession().getMcoContainer().activeView() == null ||
            this.getSession().getMcoContainer().activeView().id != this.viewId) {
            this.bsModalClass.push(inactiveDialogClass);
        }
        else {
            this.bsModalClass = filter(this.bsModalClass, function (c) {
                return c !== inactiveDialogClass;
            });
        }
        //we used OnPush and change detector only know that it needs to do something if
        //our style array is immutable, so we need to tell it that changes happen.
        this.cd.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set position of this dialog when it is first opened
     * @param position Window position
     */
    /**
     * Set position of this dialog when it is first opened
     * @param {?} position Window position
     * @return {?}
     */
    DialogComponent.prototype.setInitialPosition = /**
     * Set position of this dialog when it is first opened
     * @param {?} position Window position
     * @return {?}
     */
    function (position) {
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
        var appHeader = $(".header")[0];
        /* istanbul ignore if */
        //appHeader can be null (in unit test, etc)
        if (appHeader) {
            /** @type {?} */
            var headerH = appHeader.clientHeight + appHeader.offsetTop;
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
                var modelH = $(this.modalElement.nativeElement).height();
                /** @type {?} */
                var footerH = $(".footer")[0].clientHeight;
                this.renderer.setStyle(this.modalElement.nativeElement, "top", "calc(((100vh - " + headerH + "px - " + footerH + "px - " + modelH + "px) / 2) + " + headerH + "px)");
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "calc((100vw / 2) - " + ($(this.modalElement.nativeElement).width() / 2) + "px");
            }
        }
    };
    /**
     * Event handler for close event
     * @event OnClosing
     */
    /**
     * Event handler for close event
     * \@event OnClosing
     * @return {?}
     */
    DialogComponent.prototype.handleOnClosing = /**
     * Event handler for close event
     * \@event OnClosing
     * @return {?}
     */
    function () {
        this.onClosing.emit();
    };
    /**
     * Get the Nexaweb tag name of this component
     */
    /**
     * Get the Nexaweb tag name of this component
     * @return {?}
     */
    DialogComponent.prototype.getNxTagName = /**
     * Get the Nexaweb tag name of this component
     * @return {?}
     */
    function () {
        return "dialog";
    };
    /**
     * Get JSON representation of dialog state
     */
    /**
     * Get JSON representation of dialog state
     * @return {?}
     */
    DialogComponent.prototype.toJson = /**
     * Get JSON representation of dialog state
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "title", this.title);
        this.setJson(json, "modal", this.modal);
        this.setJson(json, "centered", this._center);
        return json;
    };
    /**
     * Check whether or not this dialog is a container
     * @returns Boolean
     */
    /**
     * Check whether or not this dialog is a container
     * @return {?} Boolean
     */
    DialogComponent.prototype.isContainer = /**
     * Check whether or not this dialog is a container
     * @return {?} Boolean
     */
    function () {
        return true;
    };
    /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @returns Boolean
     */
    /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @return {?} Boolean
     */
    DialogComponent.prototype.isDialog = /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @return {?} Boolean
     */
    function () {
        return true;
    };
    /* istanbul ignore next */
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @returns ChangeDetectorRef
     */
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} ChangeDetectorRef
     */
    DialogComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} ChangeDetectorRef
     */
    function () {
        return this.cd;
    };
    /* istanbul ignore next */
    /**
     * Event handler for minimize button click. Minimizes dialog
     * @param event
     */
    /**
     * Event handler for minimize button click. Minimizes dialog
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.minimize = /**
     * Event handler for minimize button click. Minimizes dialog
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event != null) {
            event.stopPropagation();
        }
        if ((JavaUtils.parseBoolean(this.modal))) {
            if (!this.isUnMaximize) {
                /** @type {?} */
                var minHeightLoc = DialogComponent.UNMAXIMIZE_HEGHT;
                this.isUnMaximize = true;
                if (this.isMaximize) {
                    $(this.modalElement.nativeElement).css("top", this.modalOriginalTop + "px");
                    $(this.modalElement.nativeElement).css("left", this.modalOriginalLeft + "px");
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
                var minHeightLoc = $(this.modalElement.nativeElement.querySelector('.modal-dialog')).css("height");
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for maximize button click. Maximizes dialog
     * @param event
     */
    /**
     * Event handler for maximize button click. Maximizes dialog
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.maximize = /**
     * Event handler for maximize button click. Maximizes dialog
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event != null) {
            event.stopPropagation();
        }
        if (this.isMaximize) {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
            $(this.modalElement.nativeElement).css("top", this.modalOriginalTop + "px");
            $(this.modalElement.nativeElement).css("left", this.modalOriginalLeft + "px");
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
            $(this.modalElement.nativeElement).css("left", this.modalOriginalLeft + "px");
            $(this.modalElement.nativeElement).css("top", this.modalOriginalTop + "px");
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
            this.isMaximize = true;
            this.isUnMaximize = false;
            this.cd.detectChanges();
        }
        // istanbul ignore if */
        if (this.tableId != null) {
            /** @type {?} */
            var table = /** @type {?} */ (UiDocument.getElementById(this.tableId));
            if (table != null) {
                table.tableResize();
            }
        }
        this.getSession().getMcoContainer().showView(this.viewId);
    };
    /* istanbul ignore next */
    /**
     * Show the view after it has been hidden via minimized
     */
    /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    DialogComponent.prototype.showView = /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    function () {
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
    };
    /**
     * Event handler for mousedown event. Resets dialog view stack
     */
    /**
     * Event handler for mousedown event. Resets dialog view stack
     * @return {?}
     */
    DialogComponent.prototype.handleMouseDown = /**
     * Event handler for mousedown event. Resets dialog view stack
     * @return {?}
     */
    function () {
        //make this screen top most.
        this.getSession().getMcoContainer().reStackView(this.viewId, this.screenIndex);
    };
    /**
     * Stop propagation on disabled dialog
     */
    /**
     * Stop propagation on disabled dialog
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.onClickDisableContent = /**
     * Stop propagation on disabled dialog
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled)
            event.stopPropagation();
    };
    /**
     * Stop propagation on modal dialog
     */
    /**
     * Stop propagation on modal dialog
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.onClickBackdrop = /**
     * Stop propagation on modal dialog
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modal == true || this.modal == 'true')
            event.stopPropagation();
    };
    /**
     * @return {?}
     */
    DialogComponent.prototype.updateModalDialogStyle = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.checkFocusOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.handleDocClickEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var e_1, _a;
        this.wasClickOutside = false;
        if (!((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.target)))) {
            this.wasClickOutside = true;
        }
        /** @type {?} */
        var _leftDisabledErroElementId = [];
        //if disabled element
        if (this._canTrackFocusLostOnErrorDisabled === true) {
            if (this._disabledErrorElementId != null &&
                this._disabledErrorElementId.length > 0) {
                try {
                    for (var _b = __values(this._disabledErrorElementId), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var elId = _c.value;
                        /** @type {?} */
                        var disabledEl = UiDocument.getElementById(elId);
                        /** @type {?} */
                        var inputElement = disabledEl.getElement().querySelector('input');
                        if (disabledEl != null) {
                            if (event.target != inputElement)
                                disabledEl.setBgColor("");
                            else
                                _leftDisabledErroElementId.push(elId);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DialogComponent.prototype.checkKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled === true) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    DialogComponent.prototype.trackFocusLostOnErrorDisabled = /**
     * @return {?}
     */
    function () {
        this._canTrackFocusLostOnErrorDisabled = true;
    };
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
    DialogComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: DynamicPagesService },
        { type: NgZone }
    ]; };
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
    return DialogComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DialogModule = /** @class */ (function () {
    function DialogModule() {
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
    return DialogModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GridColumnDirective = /** @class */ (function () {
    function GridColumnDirective(el) {
        this.el = el;
    }
    /**
     * Init lifecycle. Set grid column css class
     */
    /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    GridColumnDirective.prototype.ngOnInit = /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    function () {
        /** @type {?} */
        var cssClass = this.vtGridColumn ? "col-sm-" + this.vtGridColumn : 'col-sm';
        this.el.nativeElement.classList.add(cssClass);
    };
    GridColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vtGridColumn]'
                },] }
    ];
    /** @nocollapse */
    GridColumnDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    GridColumnDirective.propDecorators = {
        vtGridColumn: [{ type: Input }]
    };
    return GridColumnDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for Horizontal line (HR) component
 */
var HorizontalSeparatorComponent = /** @class */ (function (_super) {
    __extends(HorizontalSeparatorComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param renderer see [[BaseComponent]]
     */
    function HorizontalSeparatorComponent(parent, sessionService, elementRef, renderer) {
        return _super.call(this, parent, sessionService, elementRef, renderer) || this;
    }
    /**
     * Init lifecycle method
     */
    /**
     * Init lifecycle method
     * @return {?}
     */
    HorizontalSeparatorComponent.prototype.ngOnInit = /**
     * Init lifecycle method
     * @return {?}
     */
    function () {
    };
    /**
     * Get JSON representation for this component
     */
    /**
     * Get JSON representation for this component
     * @return {?}
     */
    HorizontalSeparatorComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "borderColor", this.borderColor);
        return json;
    };
    HorizontalSeparatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-horizontal-separator',
                    template: "<hr [id]=\"id\" [style.backgroundColor]=\"borderColor\" [style.height]=\"controlHeight\" [style.maxWidth]=\"controlWidth\" />\n",
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return HorizontalSeparatorComponent; })
                        }
                    ],
                    styles: ["hr{margin-top:3px;margin-bottom:3px;border-color:#5c5c5c;box-shadow:0 1px 0 #fff}"]
                }] }
    ];
    /** @nocollapse */
    HorizontalSeparatorComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    HorizontalSeparatorComponent.propDecorators = {
        borderColor: [{ type: Input }]
    };
    return HorizontalSeparatorComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HorizontalSeparatorModule = /** @class */ (function () {
    function HorizontalSeparatorModule() {
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
    return HorizontalSeparatorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Integer = /** @class */ (function () {
    function Integer() {
    }
    /**
     * @param {?} num
     * @return {?}
     */
    Integer.toString = /**
     * @param {?} num
     * @return {?}
     */
    function (num) {
        return num + '';
    };
    return Integer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var moment$1 = moment;
/**
 * Java DateFormat
 */
var DateFormat = /** @class */ (function () {
    function DateFormat(formatPattern) {
        if (formatPattern === void 0) { formatPattern = null; }
        this.formatPattern = formatPattern;
        this.isLenient = true;
    }
    /**
     * @param {?} pattern
     * @return {?}
     */
    DateFormat.getDateInstance = /**
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        return new DateFormat(pattern);
    };
    /**
     * @param {?} fm
     * @return {?}
     */
    DateFormat.javaToMomentDateFormat = /**
     * @param {?} fm
     * @return {?}
     */
    function (fm) {
        /** @type {?} */
        var s = fm.replace(/y/g, 'Y');
        return s.replace(/d/g, 'D');
        //the above is needed b/c ng-packagr is being a b***
        //it doesn't like return fm.replace(/y/g, 'Y').replace(/d/g, 'D');
    };
    /**
     * @return {?}
     */
    DateFormat.now = /**
     * @return {?}
     */
    function () {
        return moment$1();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.prototype.format = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date === null)
            return null;
        if (date === undefined)
            return undefined;
        return this.formatPattern == null ? moment$1(date).format() : moment$1(date).format(this.formatPattern);
    };
    /**
     * @param {?} dateString
     * @return {?}
     */
    DateFormat.prototype.parse = /**
     * @param {?} dateString
     * @return {?}
     */
    function (dateString) {
        /** @type {?} */
        var momentDate = this.formatPattern ? moment$1(dateString, this.formatPattern) : moment$1(dateString);
        if (this.isLenient === false && momentDate.isValid() === false) {
            throw new Error("Unable to parse date string: " + dateString + ", using format: " + this.formatPattern);
        }
        this.calendar = momentDate;
        return momentDate;
    };
    /**
     * @param {?} lenient
     * @return {?}
     */
    DateFormat.prototype.setLenient = /**
     * @param {?} lenient
     * @return {?}
     */
    function (lenient) {
        this.isLenient = lenient;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.prototype.setCalendar = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.calendar = moment$1(date);
    };
    /**
     * @return {?}
     */
    DateFormat.prototype.getCalendar = /**
     * @return {?}
     */
    function () {
        return this.calendar;
    };
    DateFormat.SHORT = 'M/D/YY';
    DateFormat.MEDIUM = 'MMM D, YYYY';
    DateFormat.LONG = 'MMMM D, YYYY';
    return DateFormat;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for label component. Renders text
 */
var LabelComponent = /** @class */ (function (_super) {
    __extends(LabelComponent, _super);
    /**
     *
     * @param parent See [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd Change detector ref
     * @param renderer see [[BaseComponent]]
     */
    function LabelComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this._tooltip = '';
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(LabelComponent.prototype, "tooltip", {
        /**
         * Accessor method for internal [[_tootip]] property
         */
        get: /**
         * Accessor method for internal [[_tootip]] property
         * @return {?}
         */
        function () {
            return this._tooltip;
        },
        set: /**
         * @param {?} tooltip
         * @return {?}
         */
        function (tooltip) {
            if (tooltip == null || tooltip === "undefined") {
                this._tooltip = "";
            }
            else {
                this._tooltip = tooltip;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle method. Runs when component is created
     */
    /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    LabelComponent.prototype.ngOnInit = /**
     * Init lifecycle method. Runs when component is created
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.controlWidth) {
            this.controlWidth = this.controlWidth + 'px';
        }
        if (this.marginRight) {
            this.marginRight = this.marginRight + 'px';
        }
        if (this.marginLeft) {
            this.marginLeft = this.marginLeft + 'px';
        }
    };
    /**
     * After view init lifecycle method. Runs after component view is created
     */
    /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    LabelComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle method. Runs after component view is created
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.controlHeight != null && this.controlHeight !== "") {
            this.styles["height"] = this.controlHeight + "px";
        }
        this.setAttributeFromDef();
        //fix expression has changed blah blah blah
        this.cd.detectChanges();
    };
    /**
     * Get JSON representation of component
     */
    /**
     * Get JSON representation of component
     * @return {?}
     */
    LabelComponent.prototype.toJson = /**
     * Get JSON representation of component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "alignHorizontal", this.alignHorizontal);
        return json;
    };
    /**
     * Set value of [[tooltip]] property
     * @param tooltip
     */
    /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    LabelComponent.prototype.setTooltip = /**
     * Set value of [[tooltip]] property
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        this.tooltip = tooltip;
        this.cd.markForCheck();
    };
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param e Mouse click event
     */
    /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    LabelComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event. Call parent class [[handleMouseDown]]
     * @param {?} e Mouse click event
     * @return {?}
     */
    function (e) {
        this.handleMouseDown(e);
    };
    /**
     * Event handler for click event.
     * @event OnCommand
     */
    /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    LabelComponent.prototype.handleOnClick = /**
     * Event handler for click event.
     * \@event OnCommand
     * @return {?}
     */
    function () {
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    };
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @returns The component's change detector
     */
    /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    LabelComponent.prototype.getChangeDetector = /**
     * Get value of [[cd]] (ChangeDetectorRef) property
     * @return {?} The component's change detector
     */
    function () {
        return this.cd;
    };
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    LabelComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    function () {
        return "label";
    };
    Object.defineProperty(LabelComponent.prototype, "spaceText", {
        /**
         * Check if the text is all space characters
         * @returns If text is just space characters TRUE, otherwise FALSE
         */
        get: /**
         * Check if the text is all space characters
         * @return {?} If text is just space characters TRUE, otherwise FALSE
         */
        function () {
            return this.text && this.text.length > 0 && this.text.trim().length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    LabelComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    function (value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
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
    LabelComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    LabelComponent.propDecorators = {
        alignHorizontal: [{ type: Input }],
        tooltip: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return LabelComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LabelModule = /** @class */ (function () {
    function LabelModule() {
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
    return LabelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PanelComponent = /** @class */ (function (_super) {
    __extends(PanelComponent, _super);
    // 画面のレイアウト固定化対応 End
    function PanelComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        /**
         * For escaping unneeded row & fluid container. This is a trikcy option.
         * Almost case, fluid container is not needed. it's too late...
         * \@property {boolean}
         */
        _this.noGutter = false;
        /**
         * For escaping fluid container. This is a trikcy option.
         * should be validated by `(layout !== 'grid')` . it's too late...
         * \@property {boolean}
         */
        _this.noGrid = false;
        _this.panelClasses = ['vt-panel'];
        _this.panelStyles = {};
        // 画面リサイズ対応 Start
        _this.resizeComponent = false;
        _this.resizeMarginTop = null;
        _this.resizeHeight = null;
        _this.divHeight = null;
        // 画面リサイズ対応 End
        // 画面のレイアウト固定化対応 Start
        _this.contentDisplayWidth = null;
        return _this;
    }
    Object.defineProperty(PanelComponent.prototype, "childrenList", {
        //children list to keep indexes
        set: /**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            var _this = this;
            this.resetChildIndexes(children.filter(function (child) { return child !== _this; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Set dimensions and css styles
     */
    /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    PanelComponent.prototype.ngOnInit = /**
     * Init lifecycle. Set dimensions and css styles
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.cssClass != null) {
            this.cssClass.split(' ').forEach(function (css) { return _this.panelClasses.push(css); });
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
    };
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    PanelComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.initWidthHeightStyle();
        this.cd.detectChanges();
    };
    /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    PanelComponent.prototype.resetChildIndexes = /**
     *
     * @param {?} childrenList Update list of children ids
     * @return {?}
     */
    function (childrenList) {
        if (childrenList != null && childrenList.length > 0) {
            if (this._childrenIndex !== null) {
                this._childrenIndex = uniq(concat(childrenList.map(function (child) { return child.getId(); }), this._childrenIndex));
            }
        }
    };
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param heightStyleName
     * @param widthStyleName
     */
    /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    PanelComponent.prototype.initWidthHeightStyle = /**
     * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    function (heightStyleName, widthStyleName) {
        if (heightStyleName === void 0) { heightStyleName = 'height'; }
        if (widthStyleName === void 0) { widthStyleName = 'max-width'; }
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.panelStyles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.panelStyles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    };
    /**
     * Set [[disabled]] property value
     * @param boo Toggle disabled
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    PanelComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle disabled
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        this.getChildren().toArray().forEach(function (item) {
            item.setAttribute(AttributesEnum.DISABLED, boo);
        });
    };
    /**
     * Set [[visible]] property value
     * @param boo Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    PanelComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @param {?} boo Toggle visibility
     * @return {?}
     */
    function (boo) {
        this.visible = boo;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
    Object.defineProperty(PanelComponent.prototype, "hasCaption", {
        /**
         * Check if [[caption]] property exists and is set
         * @returns True if caption exists and has content, otherwise false
         */
        get: /**
         * Check if [[caption]] property exists and is set
         * @return {?} True if caption exists and has content, otherwise false
         */
        function () {
            return this.caption != null && this.caption.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "containerLayout", {
        /**
         * Check if [[layout]] property exists
         * @returns True if layout exists, otherwise false
         */
        get: /**
         * Check if [[layout]] property exists
         * @return {?} True if layout exists, otherwise false
         */
        function () {
            return this.layout != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @returns Change detector for this panel
     */
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    PanelComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} Change detector for this panel
     */
    function () {
        return this.cd;
    };
    /**
     * Check whether or not this component is a container
     * @returns True since panels are always containers
     */
    /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    PanelComponent.prototype.isContainer = /**
     * Check whether or not this component is a container
     * @return {?} True since panels are always containers
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    PanelComponent.prototype.getNxTagName = /**
     * @return {?}
     */
    function () {
        return "panel";
    };
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-panel',
                    template: "<div [id]=\"id\"\n  [style.color]=\"fontColor\"\n  [style.borderColor]=\"borderColor\"\n  [style.borderWidth]=\"borderWidth\"\n  [style.borderStyle]=\"borderStyle\"\n  [style.height]=\"resizeHeight\"\n  [style.overflow]=\"controlOverflow\"\n  [style.width.px]=\"panelWidth\"\n  [style.min-width.px]=\"panelMinWidth\"\n  [style.min-height]=\"panelMinHeight\"\n  [style.float]=\"controlFloat\"\n  [style.margin-left]=\"marginLeft\"\n  [ngClass]=\"panelClasses\">\n  <h1 *ngIf=\"hasCaption === true\" class=\"panel-caption\">{{caption}}</h1>\n  <div class=\"{{noGrid ?'':'row'}} {{noGutter ?'row-no-gutters':''}}\" [style.height]=\"divHeight\" [style.width.px]=\"contentDisplayWidth\" [style.padding]=\"controlPadding\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return PanelComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PanelComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return PanelComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
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
    return LayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for a link component
 */
var LinkComponent = /** @class */ (function (_super) {
    __extends(LinkComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector reference for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    function LinkComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(LinkComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.opacity = value ? '0.3' : '1.0';
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Calls parent init method
     */
    /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    LinkComponent.prototype.ngOnInit = /**
     * Init lifecycle. Calls parent init method
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * @event OnCommand
     */
    /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    LinkComponent.prototype.onClick = /**
     * Event handler for click event. Does not emit event if the panel is disabled
     * \@event OnCommand
     * @return {?}
     */
    function () {
        if (!this.disabled)
            this.onCommand.emit();
    };
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param e Keyboard Event
     */
    /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    LinkComponent.prototype.onKeyUp = /**
     * Event handler for keydown event. Execute click handler if it's the enter key
     * @param {?} e Keyboard Event
     * @return {?}
     */
    function (e) {
        // if ENTER key
        if (e.keyCode === 13) {
            this.onClick();
        }
    };
    /**
     * Get the JSON representation for panel
     */
    /**
     * Get the JSON representation for panel
     * @return {?}
     */
    LinkComponent.prototype.toJson = /**
     * Get the JSON representation for panel
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        if (json["customAttributes"] == null) {
            json["customAttributes"] = {};
        }
        this.setJson(json["customAttributes"], "idName", this.idName);
        return json;
    };
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @returns Value of [[cd]] property
     */
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    LinkComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Value of [[cd]] property
     */
    function () {
        return this.cd;
    };
    LinkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-link',
                    template: "<span [id]=\"id\" class=\"vt-link {{ cssClass }}\" (click)=\"onClick()\"\n  (keyup)=\"onKeyUp($event)\"\n  [style.color]=\"fontColor\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  tabindex=\"0\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.opacity]=\"opacity\">\n  {{ text }}\n  <div *ngIf=\"innerhtml && innerhtml.length > 0\" [innerHTML]=\"innerhtml\"></div>\n</span>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return LinkComponent; })
                        }
                    ],
                    styles: [".vt-link{text-decoration:underline;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    LinkComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    LinkComponent.propDecorators = {
        idName: [{ type: Input }],
        onCommand: [{ type: Output }],
        disabled: [{ type: Input, args: ['disabled',] }],
        innerhtml: [{ type: Input, args: ['innerhtml',] }]
    };
    return LinkComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LinkModule = /** @class */ (function () {
    function LinkModule() {
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
    return LinkModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Long = /** @class */ (function () {
    function Long() {
    }
    /**
     * @param {?} num
     * @return {?}
     */
    Long.toString = /**
     * @param {?} num
     * @return {?}
     */
    function (num) {
        return num + '';
    };
    return Long;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var moment$2 = momentImported;
/**
 * Simple util to parse moment into proper zone (if needed)
 */
var  /**
 * Simple util to parse moment into proper zone (if needed)
 */
MomentUtils = /** @class */ (function () {
    function MomentUtils() {
    }
    /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    MomentUtils.moment = /**
     * @param {?} dateString
     * @param {?=} format
     * @return {?}
     */
    function (dateString, format) {
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
    };
    return MomentUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * DynamicComponent class. Renders components at runtime by definition
 */
var DynamicComponent = /** @class */ (function () {
    function DynamicComponent(cd) {
        this.cd = cd;
    }
    /**
     * After init lifecycle.
     */
    /**
     * After init lifecycle.
     * @return {?}
     */
    DynamicComponent.prototype.ngAfterViewInit = /**
     * After init lifecycle.
     * @return {?}
     */
    function () {
        this.cleanClass();
        this.cd.detectChanges();
    };
    /**
     * Check if element is visible
     * @returns Value of [[DynamicElement]] visible property.
     */
    /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    DynamicComponent.prototype.isVisible = /**
     * Check if element is visible
     * @return {?} Value of [[DynamicElement]] visible property.
     */
    function () {
        return this.elementDef.visible !== false;
    };
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @returns Component's id value
     */
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    DynamicComponent.prototype.getId = /**
     * Get component ID if it exists, otherwise generate a unique id
     * @return {?} Component's id value
     */
    function () {
        return this.elementDef.id == null ? BaseComponent.generateUniqueId() : this.elementDef.id;
    };
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     */
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    DynamicComponent.prototype.handleOnCommand = /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     * @return {?}
     */
    function () {
        if (typeof this.elementDef.onCommand === "function") {
            this.elementDef.onCommand(this.myComponent);
        }
    };
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     */
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    DynamicComponent.prototype.handleOnContextMenu = /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     * @return {?}
     */
    function () {
        if (typeof this.elementDef.onContextMenu === "function") {
            this.elementDef.onContextMenu(this.myComponent);
        }
    };
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     */
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    DynamicComponent.prototype.cleanClass = /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.elementDef.cssClass != null && this.elementDef.cssClass !== "") {
            if (typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                var attrs = AppUtils.attributeOverrideClass(this.elementDef.cssClass);
                if (attrs != null) {
                    forEach(attrs, function (val) {
                        if (val != null && val.attributeName === AttributesEnum.ENABLED) {
                            _this.elementDef.enabled = val.value;
                        }
                    });
                }
            }
            this.elementDef.cssClass = BaseComponent.cleanCss(this.elementDef.cssClass);
        }
    };
    DynamicComponent.decorators = [
        { type: Component, args: [{
                    selector: "vt-dynamic-component",
                    template: "<!-- panel -->\n<vt-panel #myComponent\n    *ngIf=\"elementDef.type === 'panel'\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n    <ng-template [ngIf]=\"elementDef.children != null && elementDef.children.length > 0\">\n        <vt-dynamic-component *ngFor=\"let compDef of elementDef.children\" [elementDef]=\"compDef\"></vt-dynamic-component>\n    </ng-template>\n</vt-panel>\n<!-- label -->\n<vt-label #myComponent\n    *ngIf=\"elementDef.type === 'label'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [tooltip]=\"elementDef.tooltip\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-label>\n<!-- textField -->\n<vt-text-field #myComponent\n    *ngIf=\"elementDef.type === 'textField'\"\n    [text]=\"elementDef.text\"\n    [value]=\"elementDef.value\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onContextMenu)=\"handleOnContextMenu()\"\n    [customAttributes]=\"elementDef.customAttributes\">\n</vt-text-field>\n<!-- button -->\n<vt-button #myComponent\n    *ngIf=\"elementDef.type === 'button'\"\n    [text]=\"elementDef.text\"\n    [ngStyle]=\"elementDef.styles\"\n    [ngClass]=\"elementDef.cssClass\"\n    id=\"{{getId()}}\"\n    [visible]=\"isVisible()\"\n    [customAttributes]=\"elementDef.customAttributes\"\n    [enabled]=\"elementDef.enabled !== false\"\n    (onCommand)=\"handleOnCommand()\">\n</vt-button>\n<!-- horizontal -->\n<vt-horizontal-separator #myComponent\n    *ngIf=\"elementDef.type === 'horizontalSeparator'\"\n    [ngStyle]=\"elementDef.styles\">\n</vt-horizontal-separator>\n<!-- just a div -->\n<div *ngIf=\"elementDef.type === 'div'\" [ngClass]=\"elementDef.cssClass\"></div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DynamicComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    DynamicComponent.propDecorators = {
        elementDef: [{ type: Input }],
        myComponent: [{ type: ViewChild, args: ["myComponent", { read: BaseComponent },] }]
    };
    return DynamicComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for text field component
 */
var TextFieldComponent = /** @class */ (function (_super) {
    __extends(TextFieldComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    function TextFieldComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        /**
         * Whether or not text field is editable
         */
        _this.editable = true;
        /**
         * HTML input element type attribute. Defaults to 'text'
         */
        _this.type = 'text';
        _this.onTextChange = new EventEmitter();
        _this.onEdit = new EventEmitter();
        _this.onMouseUp = new EventEmitter();
        _this._maxLength = TextFieldComponent.MAX_LENGTH;
        _this.styleVar = {};
        return _this;
    }
    Object.defineProperty(TextFieldComponent.prototype, "maxLength", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxLength > 0 ? this._maxLength : TextFieldComponent.MAX_LENGTH;
        },
        /**
         * Max input allowed for characters
         */
        set: /**
         * Max input allowed for characters
         * @param {?} max
         * @return {?}
         */
        function (max) {
            this._maxLength = max;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Set dimensions and style properties
     */
    /**
     * Init lifecycle. Set dimensions and style properties
     * @return {?}
     */
    TextFieldComponent.prototype.ngOnInit = /**
     * Init lifecycle. Set dimensions and style properties
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
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
    };
    /**
     * After view init lifecycle. Set dimensions, focus text field
     */
    /**
     * After view init lifecycle. Set dimensions, focus text field
     * @return {?}
     */
    TextFieldComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set dimensions, focus text field
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
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
    };
    /**
     * Event handler for blur (unfocus) event
     * @param e Input blur event
     */
    /**
     * Event handler for blur (unfocus) event
     * @param {?} e Input blur event
     * @param {?} value
     * @return {?}
     */
    TextFieldComponent.prototype.onBlur = /**
     * Event handler for blur (unfocus) event
     * @param {?} e Input blur event
     * @param {?} value
     * @return {?}
     */
    function (e, value) {
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
            var formattedDateString = [this.text.substr(0, 4), this.text.substr(4, 2), this.text.substr(6, 2)].join('/');
            this.text = formattedDateString;
        }
        this.validateField(e);
    };
    /**
     * Event handler for focus event
     * @param e Input focus event
     */
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    TextFieldComponent.prototype.onFocus = /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    function (e) {
        this.input.nativeElement.selectionStart = this.text.length;
        this.input.nativeElement.selectionEnd = this.text.length;
        if (!this.customAttributes)
            return;
        /** @type {?} */
        var formatName = this.customAttributes['format'];
        if (formatName && formatName.indexOf("add_comma") >= 0) {
            /** @type {?} */
            var txtMount = this.text.replace(/,/g, "");
            this.text = txtMount;
        }
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    };
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * @param event
     * @param value
     * @event onTextChange
     */
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    TextFieldComponent.prototype.onInput = /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        var _this = this;
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            /** @type {?} */
            var pos_1 = this.input.nativeElement.selectionStart;
            this.text = value;
            setTimeout(function () {
                _this.input.nativeElement.selectionStart = pos_1;
                _this.input.nativeElement.selectionEnd = pos_1;
            });
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    };
    /**
     * Focus the input element
     */
    /* istanbul ignore next */
    /**
     * Focus the input element
     * @return {?}
     */
    TextFieldComponent.prototype.setFocus = /**
     * Focus the input element
     * @return {?}
     */
    function () {
        this.input.nativeElement.focus();
    };
    /**
     * Set background color CSS for the text input
     * @param bgColor CSS color string value for background
     */
    /**
     * Set background color CSS for the text input
     * @param {?} bgColor CSS color string value for background
     * @return {?}
     */
    TextFieldComponent.prototype.setBgColor = /**
     * Set background color CSS for the text input
     * @param {?} bgColor CSS color string value for background
     * @return {?}
     */
    function (bgColor) {
        this.input.nativeElement.style.backgroundColor = bgColor;
    };
    /**
     * Get [[_maxLength]] property value
     */
    /**
     * Get [[_maxLength]] property value
     * @return {?}
     */
    TextFieldComponent.prototype.getMaxLength = /**
     * Get [[_maxLength]] property value
     * @return {?}
     */
    function () {
        return this._maxLength;
    };
    /**
     * Set [[_maxLength]] property value
     * @param max Maximum length of character input
     */
    /**
     * Set [[_maxLength]] property value
     * @param {?} max Maximum length of character input
     * @return {?}
     */
    TextFieldComponent.prototype.setMaxLength = /**
     * Set [[_maxLength]] property value
     * @param {?} max Maximum length of character input
     * @return {?}
     */
    function (max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    };
    /**
     * Get JSON representation for this text-field
     */
    /**
     * Get JSON representation for this text-field
     * @return {?}
     */
    TextFieldComponent.prototype.toJson = /**
     * Get JSON representation for this text-field
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "editable", this.editable);
        if (this.value != null) {
            this.setJson(json, "value", this.value);
        }
        return json;
    };
    /**
     * Get component name
     */
    /**
     * Get component name
     * @return {?}
     */
    TextFieldComponent.prototype.getLocalName = /**
     * Get component name
     * @return {?}
     */
    function () {
        return "textField";
    };
    /**
     * Get the text content value of the input element
     */
    /**
     * Get the text content value of the input element
     * @return {?}
     */
    TextFieldComponent.prototype.getValue = /**
     * Get the text content value of the input element
     * @return {?}
     */
    function () {
        return this.getText();
    };
    /**
     * Event handler for mouseup
     * @event OnMouseUp
     */
    /**
     * Event handler for mouseup
     * \@event OnMouseUp
     * @return {?}
     */
    TextFieldComponent.prototype.handleMouseUp = /**
     * Event handler for mouseup
     * \@event OnMouseUp
     * @return {?}
     */
    function () {
        this.onMouseUp.emit();
    };
    /**
     * @returns String Tag name
     */
    /* istanbul ignore next */
    /**
     * @return {?} String Tag name
     */
    TextFieldComponent.prototype.getNxTagName = /**
     * @return {?} String Tag name
     */
    function () {
        return "textField";
    };
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @returns Change detector
     */
    /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Change detector
     */
    TextFieldComponent.prototype.getChangeDetector = /**
     * Get the [[cd]] (ChangeDetector) property
     * @return {?} Change detector
     */
    function () {
        return this.cd;
    };
    //angular doesn't like accessing private/public method
    /**
     * @return {?}
     */
    TextFieldComponent.prototype._notifyInternalChangeCb = /**
     * @return {?}
     */
    function () {
        _super.prototype._notifyInternalChangeCb.call(this);
    };
    /**
     * Select all text
     */
    /**
     * Select all text
     * @return {?}
     */
    TextFieldComponent.prototype.selectText = /**
     * Select all text
     * @return {?}
     */
    function () {
        this.input.nativeElement.select();
    };
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    TextFieldComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    function (value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
    TextFieldComponent.MAX_LENGTH = 9999;
    TextFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-text-field',
                    template: "<div\n  class=\"{{cssClass}}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngClass]=\"{'vt-text-field': true, 'hidden': visible != true}\">\n\n  <input [type]=\"type\" [id]=\"id\" #input\n    [ngClass]=\"{'input-date': type === 'date'}\"\n    class=\"form-control\"\n    [readonly]=\"editable !== true && editable !== 'true'\"\n    [attr.tabindex]=\"editable !== true && editable !== 'true' ? -1 : null\"\n    [disabled]=\"disabled\"\n    [(ngModel)]=\"text\"\n    [ngStyle]=\"styleVar\"\n    [maxLength]=\"maxLength\"\n    [style.width]=\"controlWidth\"\n    [style.height]=\"controlHeight\"\n    [style.textAlign]=\"alignHorizontal\"\n    [style.border-color]=\"borderColor\"\n    [style.margin-top]=\"marginTop\"\n    [style.margin-left]=\"marginLeft\"\n    [style.padding]=\"controlPadding\"\n    (focusout)=\"onBlur($event, input.value)\"\n    (focusin)=\"onFocus($event)\"\n    (change)=\"_notifyInternalChangeCb()\"\n    (mouseup)=\"handleMouseUp()\"\n    (keyup)=\"onInput($event, input.value)\"\n    [required]=\"required\"\n    [min]=\"min\"\n    [max]=\"max\"/>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TextFieldComponent; })
                        }
                    ],
                    styles: [".vt-text-field{display:inline-block}.vt-text-field input.form-control{width:100%}.vt-text-field>input{margin-bottom:3px}"]
                }] }
    ];
    /** @nocollapse */
    TextFieldComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return TextFieldComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextFieldModule = /** @class */ (function () {
    function TextFieldModule() {
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
    return TextFieldModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DynamicModule = /** @class */ (function () {
    function DynamicModule() {
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
    return DynamicModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DynamicElementBuilder = /** @class */ (function () {
    function DynamicElementBuilder() {
    }
    /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    DynamicElementBuilder.createLabelElement = /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    function (whiteSpaceWrap, padding) {
        if (whiteSpaceWrap === void 0) { whiteSpaceWrap = false; }
        if (padding === void 0) { padding = null; }
        /** @type {?} */
        var el = new DynamicElementBuilder();
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
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.toDynamicElement = /**
     * @return {?}
     */
    function () {
        return this.dynamicElement;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DynamicElementBuilder.prototype.setId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.dynamicElement.id = id;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    DynamicElementBuilder.prototype.setText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.dynamicElement.text = text;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    DynamicElementBuilder.prototype.setText2 = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        //not sure what this is, for now, custom attribute
        this.setAttribute("text2", text);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DynamicElementBuilder.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.dynamicElement.value = value;
    };
    /**
     * @param {?} tooltip
     * @return {?}
     */
    DynamicElementBuilder.prototype.setTooltip = /**
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        this.dynamicElement.tooltip = tooltip;
    };
    /**
     * @param {?} visible
     * @return {?}
     */
    DynamicElementBuilder.prototype.setVisible = /**
     * @param {?} visible
     * @return {?}
     */
    function (visible) {
        this.dynamicElement.visible = visible;
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    DynamicElementBuilder.prototype.setEnabled = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this.dynamicElement.enabled = enabled;
    };
    /**
     * @param {?} popupMenuId
     * @return {?}
     */
    DynamicElementBuilder.prototype.setPopup = /**
     * @param {?} popupMenuId
     * @return {?}
     */
    function (popupMenuId) {
        this.dynamicElement.popupMenuId = popupMenuId;
    };
    /**
     * @param {?} bgColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBgColor = /**
     * @param {?} bgColor
     * @return {?}
     */
    function (bgColor) {
        this.initStyle();
        this.dynamicElement.styles["background-color"] = this.checkCustomColor(bgColor);
    };
    /**
     * @param {?} cssClass
     * @return {?}
     */
    DynamicElementBuilder.prototype.addCssClass = /**
     * @param {?} cssClass
     * @return {?}
     */
    function (cssClass) {
        this.initStyle();
        if (this.dynamicElement.cssClass == undefined) {
            this.dynamicElement.cssClass = cssClass;
        }
        else {
            this.dynamicElement.cssClass = this.dynamicElement.cssClass + " " + cssClass;
        }
    };
    /**
     * @param {?} borderColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderColor = /**
     * @param {?} borderColor
     * @return {?}
     */
    function (borderColor) {
        this.initStyle();
        this.dynamicElement.styles["border-color"] = this.checkCustomColor(borderColor);
        this.initBorderStyle();
    };
    /**
     * @param {?} borderWidth
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderWidth = /**
     * @param {?} borderWidth
     * @return {?}
     */
    function (borderWidth) {
        this.initStyle();
        this.dynamicElement.styles["border-width"] = this.convertStyleUnit(borderWidth);
        this.initBorderStyle();
    };
    /**
     * @param {?} borderStyle
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderStyle = /**
     * @param {?} borderStyle
     * @return {?}
     */
    function (borderStyle) {
        this.initStyle();
        this.dynamicElement.styles["border-style"] = borderStyle;
    };
    /**
     * @param {?} height
     * @return {?}
     */
    DynamicElementBuilder.prototype.setHeight = /**
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.initStyle();
        this.dynamicElement.styles["height"] = height + "px";
    };
    /**
     * @param {?} width
     * @return {?}
     */
    DynamicElementBuilder.prototype.setWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this.initStyle();
        this.dynamicElement.styles["width"] = width + "px";
    };
    /**
     * @param {?} x
     * @return {?}
     */
    DynamicElementBuilder.prototype.setX = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["left"] = x + "px";
    };
    /**
     * @param {?} y
     * @return {?}
     */
    DynamicElementBuilder.prototype.setY = /**
     * @param {?} y
     * @return {?}
     */
    function (y) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["top"] = y + "px";
    };
    /**
     * @param {?} z
     * @return {?}
     */
    DynamicElementBuilder.prototype.setZ = /**
     * @param {?} z
     * @return {?}
     */
    function (z) {
        this.initStyle();
        this.dynamicElement.styles["z-index"] = z;
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontBold = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.initStyle();
        if (boo === "true" || boo === true) {
            this.dynamicElement.styles["font-weight"] = "bold";
        }
        else {
            this.dynamicElement.styles["font-weight"] = "normal";
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.initStyle();
        this.dynamicElement.styles["font-size"] = size + "px";
    };
    /**
     * @param {?} color
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this.initStyle();
        this.dynamicElement.styles["color"] = this.checkCustomColor(color);
    };
    /**
     * @param {?} margin
     * @return {?}
     */
    DynamicElementBuilder.prototype.setMargin = /**
     * @param {?} margin
     * @return {?}
     */
    function (margin) {
        this.initStyle();
        this.dynamicElement.styles["margin"] = this.convertStyleUnit(margin);
    };
    /**
     * @param {?} align
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAlignVertical = /**
     * @param {?} align
     * @return {?}
     */
    function (align) {
        this.initStyle();
        if (align === "center") {
            align = "middle";
        }
        this.dynamicElement.styles["vertical-align"] = align;
    };
    /**
     * @param {?} align
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAlignHorizontal = /**
     * @param {?} align
     * @return {?}
     */
    function (align) {
        this.initStyle();
        this.dynamicElement.styles["text-align"] = align;
    };
    /**
     * @param {?} borderCorner
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderCorner = /**
     * @param {?} borderCorner
     * @return {?}
     */
    function (borderCorner) {
        this.initStyle();
        this.dynamicElement.styles["border-radius"] = this.convertStyleUnit(borderCorner);
    };
    /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setDropShadowColor = /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    function (dropShadowColor) {
        this.dropShadowColor = this.checkCustomColor(dropShadowColor);
        this.setBoxShadow();
    };
    /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    DynamicElementBuilder.prototype.setDropShadowOffset = /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    function (dropShadowOffset) {
        this.dropShadowOffset = dropShadowOffset;
        this.setBoxShadow();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DynamicElementBuilder.prototype.setOnContextMenu = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.dynamicElement.onContextMenu = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DynamicElementBuilder.prototype.setOnCommand = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.dynamicElement.onCommand = fn;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (this.dynamicElement.customAttributes == null) {
            this.dynamicElement.customAttributes = {};
        }
        this.dynamicElement.customAttributes[name] = value;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    DynamicElementBuilder.prototype.setRichText = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.dynamicElement.richText = str === true || str === "true";
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DynamicElementBuilder.prototype.appendChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        if (this.dynamicElement.children == null) {
            this.dynamicElement.children = [child.dynamicElement];
        }
        else {
            this.dynamicElement.children.push(child.dynamicElement);
        }
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.initStyle = /**
     * @return {?}
     */
    function () {
        if (this.dynamicElement.styles == null) {
            this.dynamicElement.styles = {};
        }
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.initBorderStyle = /**
     * @return {?}
     */
    function () {
        if (this.dynamicElement.styles["border-style"] == null || this.dynamicElement.styles["border-style"] == "") {
            this.dynamicElement.styles["border-style"] = "solid";
        }
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    DynamicElementBuilder.prototype.convertStyleUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        if (unit != null && unit.indexOf(",") > 0) {
            unit = unit.split(",").map(function (m) { return m + "px"; }).join(" ");
        }
        else if (unit != null && unit !== "") {
            unit = unit + "px";
        }
        return unit;
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBoxShadow = /**
     * @return {?}
     */
    function () {
        if (this.dropShadowColor != null && this.dropShadowOffset != null) {
            this.initStyle();
            this.dynamicElement.styles["box-shadow"] = this.dropShadowOffset + "px " + this.dropShadowOffset + "px " + this.dropShadowOffset + "px " + this.dropShadowColor;
        }
    };
    /**
     * @param {?} color
     * @return {?}
     */
    DynamicElementBuilder.prototype.checkCustomColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        if (color != null && color.indexOf("#") === 0 && color.length > 7) {
            color = "var(" + color.replace("#", "--") + ")";
        }
        return color;
    };
    return DynamicElementBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for radio button input control
 */
var RadioButtonComponent = /** @class */ (function (_super) {
    __extends(RadioButtonComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector for this panel
     * @param renderer see [[BaseComponent]] constructor
     */
    function RadioButtonComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.checked = false;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    Object.defineProperty(RadioButtonComponent.prototype, "isChecked", {
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            this.checked = boo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Call parent init method.
     */
    /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    RadioButtonComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent init method.
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.idName != null) {
            this.setCustomAttribute('idName', this.idName);
        }
    };
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     */
    /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    RadioButtonComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set the radiobutton group and attributes.
     * Calls parent ngAfterViewInti method
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.getParent() != null) {
            this.getParent().addRadioButtonGroup(this);
        }
        this.setAttributeFromDef();
        this.cd.detectChanges();
        this._internalChangeTracking = this.checked;
    };
    /**
     * Event handler for change event
     * @event OnCommand
     */
    /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    RadioButtonComponent.prototype.onChange = /**
     * Event handler for change event
     * \@event OnCommand
     * @return {?}
     */
    function () {
        this.onCommand.emit();
    };
    /**
     * Event handler for click event. Updates radio button state
     * @param event Mouse click event
     */
    /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    RadioButtonComponent.prototype.onClick = /**
     * Event handler for click event. Updates radio button state
     * @param {?} event Mouse click event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        /** @type {?} */
        var tempCheck = this.checked;
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
    };
    /**
     * Event handler for mousedown event
     * @param e MouseDown event
     */
    /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    RadioButtonComponent.prototype.onMouseDown = /**
     * Event handler for mousedown event
     * @param {?} e MouseDown event
     * @return {?}
     */
    function (e) {
        this.handleMouseDown(e);
    };
    /**
     * Get the component name
     */
    /**
     * Get the component name
     * @return {?}
     */
    RadioButtonComponent.prototype.getLocalName = /**
     * Get the component name
     * @return {?}
     */
    function () {
        return "radioButton";
    };
    /**
     * Get the [[value]] property
     */
    /**
     * Get the [[value]] property
     * @return {?}
     */
    RadioButtonComponent.prototype.getValue = /**
     * Get the [[value]] property
     * @return {?}
     */
    function () {
        return this.value;
    };
    /**
     * Get the [[checked]] property
     */
    /**
     * Get the [[checked]] property
     * @return {?}
     */
    RadioButtonComponent.prototype.getChecked = /**
     * Get the [[checked]] property
     * @return {?}
     */
    function () {
        return this.checked;
    };
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param shouldChecked Toggle checked
     */
    /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    RadioButtonComponent.prototype.setChecked = /**
     * Sets the value for [[checked]] property and updated [[_internalChangeTracking]] value
     * @param {?} shouldChecked Toggle checked
     * @param {?=} skipInternalChange
     * @return {?}
     */
    function (shouldChecked, skipInternalChange) {
        if (skipInternalChange === void 0) { skipInternalChange = false; }
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
    };
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param value
     */
    /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    RadioButtonComponent.prototype.setSelected = /**
     * Check the radio button of the parent group that matches [[value]]
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var e_1, _a;
        if (value === true || value === "true") {
            this.setChecked(true);
        }
        else if (value == this.value) {
            this.setChecked(true);
        }
        else if (this.getParent() != null) {
            /** @type {?} */
            var group = this.getParent().getRadioButtonGroup(this.group);
            if (group != null) {
                try {
                    for (var group_1 = __values(group), group_1_1 = group_1.next(); !group_1_1.done; group_1_1 = group_1.next()) {
                        var radio = group_1_1.value;
                        if (radio.getValue() == value) {
                            radio.setChecked(true);
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (group_1_1 && !group_1_1.done && (_a = group_1.return)) _a.call(group_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    };
    /**
     * Get JSON representation for the radiobutton component
     * @returns JSON
     */
    /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    RadioButtonComponent.prototype.toJson = /**
     * Get JSON representation for the radiobutton component
     * @return {?} JSON
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json["group"] = this.group;
        json["selected"] = this.checked === true ? "true" : "false";
        return json;
    };
    /**
     * Get the NexaWeb tag name
     * @return Tag name
     */
    /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    RadioButtonComponent.prototype.getNxTagName = /**
     * Get the NexaWeb tag name
     * @return {?} Tag name
     */
    function () {
        return "radioButton";
    };
    /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    RadioButtonComponent.prototype.resetGroupRadios = /**
     * Uncheck all radio buttons in the radio button's group
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var group = this.getParent().getRadioButtonGroup(this.group);
        if (group != null) {
            try {
                for (var group_2 = __values(group), group_2_1 = group_2.next(); !group_2_1.done; group_2_1 = group_2.next()) {
                    var radio = group_2_1.value;
                    radio.setChecked(false);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (group_2_1 && !group_2_1.done && (_a = group_2.return)) _a.call(group_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    /**
     * Get [[cd]] (ChangeDetector) of this component
     */
    /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    RadioButtonComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (ChangeDetector) of this component
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Check if this component is a radiobutton
     * @returns True
     */
    /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    RadioButtonComponent.prototype.isRadioButton = /**
     * Check if this component is a radiobutton
     * @return {?} True
     */
    function () {
        return true;
    };
    RadioButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-radio-button',
                    template: "<div class=\"radio {{cssClass}} {{cssClass}} {{(disabled ===true) ? 'disabled':''}}\" [ngClass]=\"{'hidden': visible != true}\" (contextmenu)=\"handleOnContextMenu($event)\">\n  <label>\n    <input class=\"input-radio\" type=\"radio\" [name]=\"group\" [id]=\"id\" [value]=\"value\" [checked]=\"checked\"\n      [disabled]=\"disabled\"\n      (click)=\"onClick($event)\"\n      (mousedown)=\"onMouseDown($event)\"\n      [required]=\"required\">\n    <span [style.margin-left.px]=\"marginLeft\" [style.margin-right.px]=\"marginRight\">{{text}}</span>\n  </label>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return RadioButtonComponent; })
                        }
                    ],
                    styles: ["div>label>span{vertical-align:top!important}"]
                }] }
    ];
    /** @nocollapse */
    RadioButtonComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    RadioButtonComponent.propDecorators = {
        group: [{ type: Input }],
        idName: [{ type: Input }],
        value: [{ type: Input }],
        isChecked: [{ type: Input }],
        checked: [{ type: Input }],
        onCommand: [{ type: Output }]
    };
    return RadioButtonComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RadioButtonModule = /** @class */ (function () {
    function RadioButtonModule() {
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
    return RadioButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for scroll pane component
 */
var ScrollPaneComponent = /** @class */ (function (_super) {
    __extends(ScrollPaneComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param cd Change detector for this component instance
     */
    function ScrollPaneComponent(parent, sessionService, elementRef, renderer, cd, zone) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.zone = zone;
        _this._scrollVerticalPos = 0;
        _this._scrollerHandler = function (event) {
            _this.handleOnScroll(event);
        };
        return _this;
    }
    /**
     * Get [[cd]] (Change detector) property value
     * @returns Change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    ScrollPaneComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property value
     * @return {?} Change detector reference
     */
    function () {
        return this.cd;
    };
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     */
    /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    ScrollPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set dimensions and trigger change detection
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
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
        this.zone.runOutsideAngular(function () {
            //for https://github.com/weaveio/ngnsophia/issues/1392, track position of scroll pane
            //so it can be reset back when user switching tabs
            if (_this.skipScrollAdjustment !== true) {
                (/** @type {?} */ (_this.scrollDivElement.nativeElement)).addEventListener("scroll", _this._scrollerHandler, true);
            }
        });
        this.cd.detectChanges();
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        (/** @type {?} */ (this.scrollDivElement.nativeElement)).removeEventListener("scroll", this._scrollerHandler, true);
        this._scrollerHandler = null;
    };
    /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    ScrollPaneComponent.prototype.handleOnScroll = /**
     * Scroll event of div
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._scrollVerticalPos = event.srcElement.scrollTop;
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.resetScrollTopToPreviousPosition = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                if (_this.scrollDivElement.nativeElement.scrollTop != _this._scrollVerticalPos) {
                    _this.scrollDivElement.nativeElement.scrollTop = _this._scrollVerticalPos;
                }
            }, 300);
        });
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.resetScrollTopPosition = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                _this._scrollVerticalPos = 0;
                _this.scrollDivElement.nativeElement.scrollTop = _this._scrollVerticalPos;
            }, 300);
        });
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.isScrollView = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @return {?}
     */
    ScrollPaneComponent.prototype.isScrollPane = /**
     * @return {?}
     */
    function () {
        return true;
    };
    ScrollPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-scroll-pane',
                    template: "<div #scrollDiv [id]=\"id\" class=\"vt-scroll-pane {{cssClass}}\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  [ngStyle]=\"styles\"\n  (contextmenu)=\"handleOnContextMenu($event)\">\n  <ng-content></ng-content>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ScrollPaneComponent; })
                        }
                    ],
                    styles: [".vt-scroll-pane{overflow:auto}.noscroll{overflow:hidden!important;overflow-y:hidden!important;overflow-x:hidden!important}"]
                }] }
    ];
    /** @nocollapse */
    ScrollPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    ScrollPaneComponent.propDecorators = {
        resizeHeight: [{ type: Input }],
        skipScrollAdjustment: [{ type: Input }],
        scrollDivElement: [{ type: ViewChild, args: ['scrollDiv',] }]
    };
    return ScrollPaneComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ScrollPaneModule = /** @class */ (function () {
    function ScrollPaneModule() {
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
    return ScrollPaneModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StringBuilder = /** @class */ (function () {
    function StringBuilder(initial) {
        this._internalString = "";
        if (initial != null) {
            this.append(initial);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.append = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str instanceof StringBuilder) {
            this._internalString = this._internalString + str.toString();
        }
        else {
            this._internalString = this._internalString + str;
        }
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._internalString;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._internalString = "";
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.clear();
    };
    /**
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.indexOf = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this._internalString.indexOf(str);
    };
    /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    StringBuilder.prototype.substring = /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    function (startIdx, endIdx) {
        if (endIdx != null) {
            return this._internalString.substring(startIdx, endIdx);
        }
        return this._internalString.substring(startIdx);
    };
    /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    StringBuilder.prototype.replace = /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    function (startIdx, endIdex, replaceStr) {
        /** @type {?} */
        var b = this._internalString.substring(0, startIdx);
        /** @type {?} */
        var e = this._internalString.substring(endIdex);
        this._internalString = b + replaceStr + e;
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.length = /**
     * @return {?}
     */
    function () {
        return this._internalString.length;
    };
    /**
     * @param {?} i
     * @return {?}
     */
    StringBuilder.prototype.charAt = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        if (i < this._internalString.length) {
            return this._internalString.charAt(i);
        }
        return null;
    };
    /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    StringBuilder.prototype.setCharAt = /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    function (idx, val) {
        if (typeof val === "number") {
            this.insert(idx, String.fromCharCode(val));
        }
        else {
            this.insert(idx, val);
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    StringBuilder.prototype.deleteCharAt = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        this.replace(i, i, '');
        return this;
    };
    /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.insert = /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    function (index, str) {
        if (index <= this._internalString.length) {
            this._internalString = this._internalString.substring(0, index - 1) + str + this._internalString.substring(index);
        }
        return this;
    };
    /**
     * @param {?} chr
     * @return {?}
     */
    StringBuilder.prototype.lastIndexOf = /**
     * @param {?} chr
     * @return {?}
     */
    function (chr) {
        if (this._internalString != null) {
            return lastIndexOf(this._internalString, chr);
        }
        return -1;
    };
    return StringBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This directive serve as a template for rendering table cell.
 */
var TableCellDirective = /** @class */ (function () {
    /**
     *
     * @param template Template on how to render the cell, we will forward row, column, etc to the template
     */
    function TableCellDirective(template) {
        this.template = template;
    }
    TableCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-table-cell]'
                },] }
    ];
    /** @nocollapse */
    TableCellDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TableCellDirective.propDecorators = {
        onContextMenuCb: [{ type: Input }],
        alignHorizontal: [{ type: Input }]
    };
    return TableCellDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
var TableHeaderDirective = /** @class */ (function () {
    /**
     *
     * @param template Template on how to render the header, we will forward row, column, etc to the template
     */
    function TableHeaderDirective(template) {
        this.template = template;
    }
    TableHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-table-header]'
                },] }
    ];
    /** @nocollapse */
    TableHeaderDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TableHeaderDirective.propDecorators = {
        id: [{ type: Input }],
        autoWrap: [{ type: Input }]
    };
    return TableHeaderDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HeaderDirective = /** @class */ (function () {
    function HeaderDirective() {
    }
    /**
     * @return {?}
     */
    HeaderDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("header");
        }
    };
    HeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-header'
                },] }
    ];
    /** @nocollapse */
    HeaderDirective.ctorParameters = function () { return []; };
    HeaderDirective.propDecorators = {
        text: [{ type: Input }],
        cssClass: [{ type: Input }],
        controlHeight: [{ type: Input }],
        controlWidth: [{ type: Input }],
        headerHeight: [{ type: Input }],
        autoWrap: [{ type: Input }],
        id: [{ type: Input }]
    };
    return HeaderDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TableColumnDirective = /** @class */ (function () {
    function TableColumnDirective() {
        //TODO
        this.locked = false;
        //TODO
        this.enabled = true;
        this.sortable = true;
        this.isChecked = false;
        this._visible = true;
    }
    Object.defineProperty(TableColumnDirective.prototype, "header", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerDirective ? this.headerDirective.text : this._header;
        },
        //default, use the {header} as the header for the cell
        set: /**
         * @param {?} header
         * @return {?}
         */
        function (header) {
            this._header = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableColumnDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} vis
         * @return {?}
         */
        function (vis) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableColumnDirective.prototype, "isHeaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerTemplate === null || this.headerTemplate === undefined ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TableColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    TableColumnDirective.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) {
            this.visible = JavaUtils.parseBoolean(value);
        }
        else {
            if (this.customAttributes == null) {
                this.customAttributes = {};
            }
            this.customAttributes[name] = value;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    TableColumnDirective.prototype.getAttribute = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE)
            return /** @type {?} */ (this.visible);
        if (typeof name === "number" && name === AttributesEnum.ID)
            return this.id;
        /** @type {?} */
        var retVal = this.customAttributes != null ? this.customAttributes[name] : null;
        if (typeof retVal !== "string") {
            retVal = retVal + "";
        }
        return retVal;
    };
    /**
     * @param {?} vis
     * @return {?}
     */
    TableColumnDirective.prototype.setVisible = /**
     * @param {?} vis
     * @return {?}
     */
    function (vis) {
        this.visible = vis;
    };
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
    return TableColumnDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TableSelectionEvent = /** @class */ (function () {
    function TableSelectionEvent(rows) {
        this.rows = rows;
    }
    return TableSelectionEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HTMLElementWrapper = /** @class */ (function () {
    function HTMLElementWrapper(renderer, type, sessionService, virtual, docFragment) {
        if (virtual === void 0) { virtual = false; }
        if (docFragment === void 0) { docFragment = null; }
        var _this = this;
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
            this.onContextHandler = function (event) {
                /** @type {?} */
                var clientEvent = new ClientEvent(_this, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(_this, clientEvent);
                }
                if (_this.parentScreenId != null) {
                    clientEvent.setParameter("screenId", _this.parentScreenId);
                }
                _this.sessionService.getEventHandler().setClientEvent(clientEvent);
                if (typeof _this.contextMenuAction === "string") {
                    _this.invokeMcoAction(_this.contextMenuAction);
                }
                else if (typeof _this.contextMenuAction === "function") {
                    _this.contextMenuAction.apply(_this, [_this]);
                }
                _this.showPopupMenu(event);
            };
            this.htmlElement.addEventListener("mousedown", function (event) { return _this.onMouseDownHandler(event); }, true);
            this.htmlElement.addEventListener("dblclick", function (event) { return _this.onDoubleClickHandler(event); }, true);
            this.onMouseDownHandler = function (event) {
                _this.handleOnMouseDown(event);
            };
            this.onDoubleClickHandler = function (event) {
                _this.handleDoubleClick(event);
            };
        }
    }
    Object.defineProperty(HTMLElementWrapper.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getId();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @return {?}
     */
    HTMLElementWrapper.createVirtualElement = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return new HTMLElementWrapper(null, type, null, true);
    };
    /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    HTMLElementWrapper.prototype.destroy = /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    function (skipDestroyChild) {
        if (skipDestroyChild === void 0) { skipDestroyChild = false; }
        if (this._dynamicComponent === true && this.htmlElement != null) {
            this.htmlElement.removeEventListener("contextmenu", this.onContextHandler, true);
            this.htmlElement.removeEventListener("mousedown", this.onMouseDownHandler, true);
            this.htmlElement.removeEventListener("dblclick", this.onDoubleClickHandler, true);
        }
        if (this.childNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.childNodes;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
                if (node.childNodes != null) {
                    stack = stack.concat(node.childNodes);
                }
                node.destroy(true);
            }
        }
        if (this.dynamicChildNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.dynamicChildNodes;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
                if (node.dynamicChildNodes != null) {
                    stack = stack.concat(node.dynamicChildNodes);
                }
                node.destroy(true);
            }
        }
        if (this.childRows != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.childRows;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
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
    };
    /**
     * @param {?} text
     * @return {?}
     */
    HTMLElementWrapper.prototype.setText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (this._dynamicComponent === true) {
            this.renderer.setProperty(this.htmlElement, "innerHTML", text);
        }
        else if (this.component != null) {
            this.component.setText(text);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("text", text);
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    HTMLElementWrapper.prototype.setFontSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (this._dynamicComponent === true) {
            this.renderer.setStyle(this.htmlElement, "font-size", size + "px");
        }
        else if (this.component != null) {
            this.component.setFontSize(size);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontSize", size);
        }
    };
    /**
     * @param {?} bold
     * @return {?}
     */
    HTMLElementWrapper.prototype.setFontBold = /**
     * @param {?} bold
     * @return {?}
     */
    function (bold) {
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
    };
    /**
     * @param {?} css
     * @return {?}
     */
    HTMLElementWrapper.prototype.setClass = /**
     * @param {?} css
     * @return {?}
     */
    function (css) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            var temp = css.split("\.");
            /** @type {?} */
            var cssClass = temp.join("-");
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
    };
    /**
     * Insert a child row at specific location
     * @param idx
     * @param child
     */
    /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    HTMLElementWrapper.prototype.insertChildRowAt = /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    function (idx, child) {
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
    };
    /**
     * Append a child to this element. If this is a row and we append a row, set {@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param child child to be appended
     * @param appendToTable
     */
    /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    HTMLElementWrapper.prototype.appendChild = /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    function (child, appendToTableIfRow) {
        if (appendToTableIfRow === void 0) { appendToTableIfRow = false; }
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
    };
    /**
     * @param {?} cust
     * @return {?}
     */
    HTMLElementWrapper.prototype.appendCustomAttributes = /**
     * @param {?} cust
     * @return {?}
     */
    function (cust) {
        var e_1, _a;
        if (cust != null) {
            /** @type {?} */
            var keys$$1 = keys(cust);
            try {
                for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    this.setAttribute(key, cust[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    //NSD will override this, added to fix error
    // setCustomAttribute(name: string, value: string) {
    //   this.setAttribute(name, value);
    // }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
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
    };
    /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    HTMLElementWrapper.prototype.getAttribute = /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    function (name, skipQueryDOMIfNotExists) {
        if (skipQueryDOMIfNotExists === void 0) { skipQueryDOMIfNotExists = false; }
        if (name === "expanded") {
            return this.expanded === "true" ? "true" : "false";
        }
        if (this.component != null) {
            return this.component.getAttribute(name, skipQueryDOMIfNotExists);
        }
        else if (this.htmlElement != null && skipQueryDOMIfNotExists !== true) {
            if (name === "text") {
                /** @type {?} */
                var text = this.htmlElement.getAttribute(name);
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
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getText = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("text");
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getId = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("id");
    };
    /**
     * @param {?} draggable
     * @return {?}
     */
    HTMLElementWrapper.prototype.setDraggable = /**
     * @param {?} draggable
     * @return {?}
     */
    function (draggable) {
        this.setAttribute("draggable", draggable);
        if (draggable == "true") {
            this.applyDraggable();
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getExpanded = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("expanded");
    };
    /**
     * @param {?} str
     * @return {?}
     */
    HTMLElementWrapper.prototype.setExpanded = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.setAttribute("expanded", str);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnContextMenu = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var _this = this;
        if (this.htmlElement != null) {
            this.contextMenuAction = action;
            this.htmlElement.addEventListener("contextmenu", function (event) { return _this.onContextHandler(event); }, true);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnMouseDown = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.mouseDownAction = action;
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnDoubleClick = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.doubleClickAction = action;
    };
    /**
     * @param {?} popupName
     * @return {?}
     */
    HTMLElementWrapper.prototype.setPopup = /**
     * @param {?} popupName
     * @return {?}
     */
    function (popupName) {
        this.popupName = popupName.replace("#", "");
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getParent = /**
     * @return {?}
     */
    function () {
        return this.parent;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getLocalName = /**
     * @return {?}
     */
    function () {
        return this.localName;
    };
    /**
     * @param {?} localName
     * @return {?}
     */
    HTMLElementWrapper.prototype.setLocaleName = /**
     * @param {?} localName
     * @return {?}
     */
    function (localName) {
        this.localName = localName;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildren = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var children = this.childNodes;
        if ((children == null || children.length === 0) && (this.dynamicChildNodes != null)) {
            children = this.dynamicChildNodes;
        }
        if (this.getLocalName() === "row" &&
            children != null &&
            this.parentTable != null &&
            this.parentTable.getLocalName() === "table" &&
            this.parentTable.columnsHasBeenSwapped === true) {
            children = /** @type {?} */ (orderBy(children, function (child) {
                return child["originalColumnIndex"];
            }));
        }
        return children;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildCount = /**
     * @return {?}
     */
    function () {
        return this.childNodes != null ? this.childNodes.length : 0;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildAt = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        return this.getChildCount() > idx ? this.childNodes[idx] : null;
    };
    /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    HTMLElementWrapper.prototype.setComponent = /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    function (component, fromVirtualTable) {
        if (fromVirtualTable === void 0) { fromVirtualTable = false; }
        this.component = component;
        this.component.parentTableRow = this.parent;
        if (component != null && fromVirtualTable === true) {
            component.addAttributeChangeListener(this);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.invokeMcoAction = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        if (typeof action === "function") {
            action();
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            var mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            var methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            var arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
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
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getComponent = /**
     * @return {?}
     */
    function () {
        return this.component;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.showPopupMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.sessionService.setMousePosition(event);
        if (this.popupName != null) {
            /** @type {?} */
            var contextMenu = this.sessionService.showContextMenu(this.popupName);
            if (contextMenu === true) {
                event.preventDefault();
                event.stopPropagation();
                // contextMenu.show(this.htmlElement);
            }
        }
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        clientEvent.setParameter("screenId", this.parentScreenId);
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.handleOnMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.parentTable != null) {
            /** @type {?} */
            var table = this.parentTable.elementRef.nativeElement;
            /** @type {?} */
            var tds = table.querySelectorAll('td');
            for (var i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = '';
            }
            tds = this.htmlElement.querySelectorAll('td');
            for (var i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = 'blue';
            }
        }
        if (this.mouseDownAction != null) {
            /** @type {?} */
            var clientEvent = new ClientEvent(this, event);
            if (AppUtils.customizeClientEvent != null) {
                AppUtils.customizeClientEvent(this, clientEvent);
            }
            if (this.parentScreenId != null) {
                clientEvent.setParameter("screenId", this.parentScreenId);
            }
            this.sessionService.getEventHandler().setClientEvent(clientEvent);
            this.invokeMcoAction(this.mouseDownAction);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.handleDoubleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
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
    };
    /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    HTMLElementWrapper.prototype.expandNode = /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    function (isExpanded, justUpdateAttribute) {
        if (justUpdateAttribute === void 0) { justUpdateAttribute = false; }
        this.expanded = typeof isExpanded === "string" ? isExpanded : isExpanded + '';
        if (justUpdateAttribute !== true && this.parentTableId != null && this.parentTableId !== "") {
            /** @type {?} */
            var jq = jQuery("#" + this.parentTableId + " .jq-tree-table");
            if (jq != null) {
                /** @type {?} */
                var nodeId = this.getAttribute("data-tt-id");
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
    };
    /**
     * @param {?} name
     * @return {?}
     */
    HTMLElementWrapper.prototype.trackAttributeName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.attributesName == null) {
            this.attributesName = [];
        }
        this.attributesName.push(name);
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.toJson = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var retVal = {};
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
            this.attributesName.forEach(function (name) {
                retVal[name] = _this.getAttribute(name);
            });
        }
        /** @type {?} */
        var children;
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
                children = /** @type {?} */ (orderBy(children, function (child) {
                    return child["originalColumnIndex"];
                }));
            }
            retVal["children"] = children.map(function (child) { return child.toJson(); });
        }
        if (this.customAttributes)
            retVal['customAttributes'] = this.customAttributes;
        return retVal;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDialog = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDynamicView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isFauxElement = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @param {?} chk
     * @return {?}
     */
    HTMLElementWrapper.prototype.setChecked = /**
     * @param {?} chk
     * @return {?}
     */
    function (chk) {
        if (typeof chk === "boolean") {
            chk = chk + "";
        }
        this.setAttribute("checked", chk);
    };
    /**
     * Search for child using the provided function
     *
     * @param fn function to execute while iterating child lookup
     */
    /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    HTMLElementWrapper.prototype.findChildByFn = /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var retVal;
        /** @type {?} */
        var children = this.concatNode(/** @type {?} */ ([]), this);
        while (children.length > 0) {
            /** @type {?} */
            var child = children.pop();
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
    };
    /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    HTMLElementWrapper.prototype.concatNode = /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    function (toNode, fromNode) {
        /** @type {?} */
        var retVal = toNode;
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
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.beforeAttributeRemoved = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.beforeAttributeSet = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.onAttributeRemoved = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.onAttributeSet = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (evt.getName() === "sortValue" && this.htmlElement != null) {
            this.updateSortValue(evt.getNewValue());
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.updateSortValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.renderer != null) {
            this.renderer.setAttribute(this.htmlElement, "data-text", value);
            if (this.component != null && this.component.getParent() != null && typeof (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache === "function") {
                (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache();
            }
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDraggable = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("draggable") === "true";
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.applyDraggable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isDraggable() && this.draggableApplied !== true && this.htmlElement != null) {
            jQuery(this.htmlElement).draggable({
                appendTo: "body",
                addClasses: false,
                helper: function () {
                    /** @type {?} */
                    var helper = document.createElement("div");
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
                start: function () {
                    /** @type {?} */
                    var clientEvent = new ClientEvent(_this, event);
                    clientEvent.setParameter("dragId", _this.parentTableId);
                    if (AppUtils.customizeClientEvent != null) {
                        AppUtils.customizeClientEvent(_this, clientEvent);
                    }
                    if (_this.parentScreenId != null) {
                        clientEvent.setParameter("screenId", _this.parentScreenId);
                    }
                    _this.sessionService.getEventHandler().setClientEvent(clientEvent);
                }
            });
        }
        this.draggableApplied = true;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDraggableApplied = /**
     * @return {?}
     */
    function () {
        return this.draggableApplied;
    };
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param name
     * @param value
     */
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.setCustomAttribute = /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (!this.customAttributes)
            this.customAttributes = {};
        this.customAttributes[name] = value;
    };
    return HTMLElementWrapper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TableRowDefDirective = /** @class */ (function () {
    function TableRowDefDirective() {
    }
    TableRowDefDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-table-row-def'
                },] }
    ];
    /** @nocollapse */
    TableRowDefDirective.ctorParameters = function () { return []; };
    TableRowDefDirective.propDecorators = {
        customAttributes: [{ type: Input }]
    };
    return TableRowDefDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FooterRowDirective = /** @class */ (function () {
    function FooterRowDirective() {
    }
    FooterRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-footer-row'
                },] }
    ];
    FooterRowDirective.propDecorators = {
        cellTemplates: [{ type: ContentChildren, args: [TableCellDirective, { read: TableCellDirective },] }]
    };
    return FooterRowDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RowDirective = /** @class */ (function () {
    function RowDirective() {
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
    return RowDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardService = /** @class */ (function () {
    function ClipboardService() {
    }
    //constructor(@Inject("ClipboardPolyfill") private clipboard: any) { }
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param txt text to be copied into the clipboard
     */
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    ClipboardService.prototype.copy = /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    function (txt) {
        return writeText(txt);
    };
    ClipboardService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ ClipboardService.ngInjectableDef = defineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(); }, token: ClipboardService, providedIn: "root" });
    return ClipboardService;
}());

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
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    /* istanbul ignore next */
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param el see [[BaseComponent]] constructor
     * @param changeDetectorRef Inject ChangeDetector
     * @param renderer see [[BaseComponent]] constructor
     * @param zone Inject NgZone
     * @param differs Inject InterableDiffers
     * @param clipboardService Inject [[ClipboardService]]
     */
    function TableComponent(parent, sessionService, el, changeDetectorRef, renderer, zone, differs, clipboardService) {
        var _this = _super.call(this, parent, sessionService, el, renderer) || this;
        _this.el = el;
        _this.changeDetectorRef = changeDetectorRef;
        _this.zone = zone;
        _this.clipboardService = clipboardService;
        _this.selectionMode = "singleRow";
        //use for virtual scrolling
        _this.rowHeight = 24;
        _this.scrollTimeout = 200;
        /* istanbul ignore next */
        _this.onChange = new EventEmitter();
        _this.onStateChange = new EventEmitter();
        _this.onDoubleClick = new EventEmitter();
        _this.onDragDrop = new EventEmitter();
        //custom sort function for virtual scroll
        _this.forceFixWidth = true;
        _this.isHeaderPadding = false;
        _this.isHeaderAuto = false;
        //table-layout default fixed
        _this.tableLayout = "fixed";
        //track dynamic rows so we can query for child later
        _this.nodes = [];
        _this.selectedRows = [];
        _this._prevSelectedRows = [];
        _this.scrollHandler = null;
        _this.previousRowIndex = null;
        _this.scrollSubject = new Subject();
        _this.prevScrollTop = 0;
        _this.prevScrollTopForHiddenHeader = 0;
        _this.sortDirection = "";
        _this.sortColumnId = 0;
        _this.theadHeight = 0;
        _this.scrollLeft = 0;
        _this.adjustedRows = 0;
        _this.preMouseEvent = null;
        _this.dataSourceDiffer = differs.find([]).create();
        _this.columnsDiffer = differs.find([]).create();
        _this.customRowDiffer = differs.find([]).create();
        _this.isIE9 = isIE() == 9;
        //for virtual scroll
        //for virtual scroll
        _this.virtualScrollDataSourceDiffer = differs.find([]).create();
        _this.keyupHandler = function (evt) { return _this.handleKeyUp(evt); };
        _this.scrollHandler = function (event) {
            if (_this._disabledScrolling === true) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (_this.prevScrollTopForHiddenHeader !== event.srcElement.scrollTop) {
                if (!_this.skipGhostHeader) {
                    _this.renderer.setStyle(_this.ghostHeader.nativeElement, "display", "inline-block");
                    if (_this.controlWidth === "100%") {
                        _this.renderer.setStyle(_this.ghostHeader.nativeElement, "width", "100%");
                    }
                    _this.renderer.setStyle(_this.tableHead.nativeElement, "visibility", "hidden");
                }
                //   if(this.forceFixWidth){
                //     this.renderer.setStyle(this.fakeTable.nativeElement, "table-layout", "fixed");
                //   }
                if (_this.tableFoot != null) {
                    _this.renderer.setStyle(_this.tableFoot.nativeElement, "visibility", "hidden");
                }
                //   this.appendHeaderToFakeTable();
                if (_this.virtualScroll === true) {
                    if (_this.animationFrameId != null) {
                        cancelAnimationFrame(_this.animationFrameId);
                    }
                    _this.adjustTableHead(event, false, true);
                }
            }
            _this.prevScrollTopForHiddenHeader = event.srcElement.scrollTop;
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            _this.scrollSubject.next(event);
        };
        return _this;
    }
    Object.defineProperty(TableComponent.prototype, "dataSource", {
        get: /**
         * @return {?}
         */
        function () {
            return this.virtualScroll === true ? this._virtualViewPort : this._dataSource;
        },
        set: /**
         * @param {?} ds
         * @return {?}
         */
        function (ds) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableColumns", {
        set: /**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this.clearHeaderNodes();
            this.columns = this.toColumns(columns);
            if (this._isViewInit === true) {
                this.initPlugins();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableRowQuery", {
        //table with no datasource
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.cleanUpChildNodes();
            this._tableRow = [];
            this.detectChanges();
            this._tableRow = rows.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableRow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tableRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "ROW_INDEX_KEY", {
        get: /**
         * @return {?}
         */
        function () {
            return '$$$$rowIndex$$$$';
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * 画面がリサイズされた際に動かすイベント
     */
    /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    TableComponent.prototype.tableResize = /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    function () {
        this.adjustTableFooter();
    };
    /* istanbul ignore next */
    /**
     * Do check lifecycle
     */
    /**
     * Do check lifecycle
     * @return {?}
     */
    TableComponent.prototype.ngDoCheck = /**
     * Do check lifecycle
     * @return {?}
     */
    function () {
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
    };
    /**
     * Init lifecycle. Call parent class ngOnInit
     */
    /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    TableComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     */
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    TableComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        /** @type {?} */
        var view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && this.columns != null) {
            this.columns.filter(function (col) { return col.id != null && col.id !== ""; }).forEach(function (col) {
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
                drop: function (event, ui) {
                    _this.onDragDrop.emit();
                },
                tolerance: "pointer"
            });
        }
        this.scrollSubcription = this.scrollSubject.pipe(debounce(function () { return timer(_this.scrollTimeout); })).subscribe(function (event) {
            _this.renderer.removeAttribute(_this.ghostHeader.nativeElement, "display");
            /* istanbul ignore next */
            if (_this.virtualScroll === true) {
                _this.recalculateVirtualScrollData(event);
            }
            else {
                _this.adjustTableHead(event);
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
        this.zone.runOutsideAngular(function () {
            _this._isViewInit = true;
            _this.initPlugins();
            _this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.addEventListener('scroll', _this.scrollHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                _this.el.nativeElement.addEventListener("keyup", _this.keyupHandler, true);
            });
        });
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.initPlugins = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.$dragableColumns) {
            this.$dragableColumns.destroy();
        }
        if (this.initTm != null) {
            clearTimeout(this.initTm);
        }
        // if (this.table) {
        this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
        this.initTm = setTimeout(function () {
            if (_this.table) {
                _this.renderer.setStyle(_this.table.nativeElement, "visibility", "hidden");
                // 再表示時にスクロールバーの位置を戻す
                // 再表示時にスクロールバーの位置を戻す
                _this.tableContainer.nativeElement.scrollLeft = 0;
                /** @type {?} */
                var jQueryTable = jQuery(_this.table.nativeElement);
                if (_this.enableColumnDragging == null || _this.enableColumnDragging === true) {
                    _this.$dragableColumns = jQueryTable.dragableColumns({
                        dropCallback: function (fromIndex, toIndex) { return _this.swapColumns(fromIndex, toIndex); },
                        dragEndCallback: function () {
                            _this.skipGhostHeader = false;
                            _this.scrollContainerStyles["overflow-y"] = "auto";
                            _this.detectChanges();
                            _this._disabledScrolling = false;
                        },
                        dragStartCallback: function (colIdx) {
                            _this.skipGhostHeader = true;
                            /** @type {?} */
                            var canDrag = _this.canDragColumn(colIdx);
                            if (canDrag) {
                                _this.scrollContainerStyles["overflow-y"] = "hidden";
                                _this.detectChanges();
                                _this._disabledScrolling = true;
                            }
                            return canDrag;
                        },
                        dragEnterCallback: function (colIdx) {
                            return _this.canDragColumn(colIdx);
                        }
                    });
                }
                if ((_this.enableSort == null || _this.enableSort === true) && _this.$tablesorter == null) {
                    if (_this.virtualScroll !== true) {
                        _this.$tablesorter = jQueryTable.tablesorter({
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
                else if (_this.virtualScroll !== true && _this.$tablesorter != null) {
                    _this.$tablesorter.trigger("updateHeaders");
                }
                _this.setHeaderWidthHeight();
                if (_this.enableColumnResize == null || _this.enableColumnResize === true) {
                    /** @type {?} */
                    var target_columns = new Array();
                    /** @type {?} */
                    var original_columnWidths = new Array();
                    var _loop_1 = function (i) {
                        /** @type {?} */
                        var column = _this.columns.find(function (item, idx) { return idx === i; });
                        if (column != null) {
                            /** @type {?} */
                            var headChildren = _this.tableHead.nativeElement.querySelector('th:nth-child(' + (i + 1) + ')');
                            target_columns.push(headChildren);
                            original_columnWidths.push(headChildren.style.width);
                        }
                    };
                    for (var i = 0; i < _this.columns.length; i++) {
                        _loop_1(i);
                    }
                    //reset
                    //reset
                    _this._cleanupColResize();
                    _this.$colResizable = jQueryTable.colResizable({
                        liveDrag: false,
                        //turning this on will incurred a severe performance penalty on IE so leave it off
                        resizeMode: 'overflow',
                        partialRefresh: true,
                        //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                        headerOnly: true //allow dragging using header only
                    });
                    for (var i = 0; i < target_columns.length; i++) {
                        /** @type {?} */
                        var targetColumn = target_columns[i];
                        /** @type {?} */
                        var headChildren_width = _this.toWholeNumber(targetColumn.style.width.slice(0, -2));
                        /** @type {?} */
                        var originalChildren_width = _this.toWholeNumber(original_columnWidths[i]);
                        // if(headChildren_width < originalChildren_width){
                        // if(headChildren_width < originalChildren_width){
                        _this.renderer.setStyle(targetColumn, "width", original_columnWidths[i]);
                        // }
                    }
                    target_columns = null;
                    original_columnWidths = null;
                }
                _this.adjustTableFooter();
                _this.renderer.setStyle(_this.table.nativeElement, "table-layout", _this.tableLayout);
            }
            if (_this.table != null) {
                _this.renderer.removeStyle(_this.table.nativeElement, "visibility");
            }
        }, 200);
        //}
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Remove event listeners
     */
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    TableComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.cleanUpChildNodes(true);
        this.clearHeaderNodes(true);
        /** @type {?} */
        var view = this._getNoneActiveViewParent() || this.getParentView();
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
    };
    /**
     * Check to see if columns have changes
     * @return {?}
     */
    TableComponent.prototype.checkColumnsForChanged = /**
     * Check to see if columns have changes
     * @return {?}
     */
    function () {
        if (this.columns != null && this.columnsDiffer.diff(this.columns.map(function (item) {
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
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.checkCustomRowsForChanged = /**
     * @return {?}
     */
    function () {
        if (this._tableRow != null && this.customRowDiffer.diff(/** @type {?} */ (this._tableRow))) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
    };
    /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    TableComponent.prototype.clearHeaderNodes = /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    function (nullOutHeadNode) {
        if (nullOutHeadNode === void 0) { nullOutHeadNode = false; }
        var e_1, _a;
        if (this.headNode != null) {
            if (this.headNode.childNodes != null && this.headNode.childNodes.length > 0) {
                try {
                    for (var _b = __values(this.headNode.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var node = _c.value;
                        /** @type {?} */
                        var parentView = this.getParentView();
                        if (parentView != null) {
                            parentView.removeViewChildFromMap(node.getId());
                        }
                        node.destroy();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this.headNode.childNodes = [];
        }
        if (nullOutHeadNode === true) {
            this.headNode = null;
        }
    };
    /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    TableComponent.prototype.cleanUpChildNodes = /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    function (skipTrackingVirtualRow) {
        if (skipTrackingVirtualRow === void 0) { skipTrackingVirtualRow = false; }
        var e_2, _a;
        if (this.nodes != null) {
            /** @type {?} */
            var parentView = this.getParentView();
            try {
                for (var _b = __values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.nodes = [];
        if (this.virtualScroll !== true) {
            this.selectedRows = [];
        }
        this._prevSelectedRows = [];
        this.lastSelectedRowIndex = null;
    };
    /**
     * Get the datasource row count
     * @returns Number of rows in [[dataSource]]
     */
    /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    TableComponent.prototype.getRowCount = /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    function () {
        return this._dataSource ? this._dataSource.length : 0;
    };
    /* istanbul ignore next */
    /**
     * Add/remove row to list of selected rows
     * @param row
     * @param isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     */
    /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    TableComponent.prototype.selectRow = /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    function (row, isSelected) {
        /** @type {?} */
        var rowIndex = -1;
        if (this.virtualScroll === true) {
            /** @type {?} */
            var tempNode = find(this.nodes, function (node) {
                return node === row;
            });
            if (tempNode != null) {
                rowIndex = tempNode[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
        }
        else {
            rowIndex = findIndex(this.nodes, function (node) {
                return node === row;
            });
        }
        if (rowIndex >= 0 && rowIndex < this._dataSource.length) {
            /** @type {?} */
            var idx = findIndex(this.selectedRows, function (row) {
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for click on row
     * @param event Mouse click event
     * @param rowIndex Index of the row that was clicked
     * @event onStateChange
     */
    /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    TableComponent.prototype.onRowClick = /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    function (event, rowIndex) {
        /** @type {?} */
        var parentView = this.getParentView();
        /* istanbul ignore if */
        if (parentView != null) {
            parentView.addViewChildToMap(this.nodes[rowIndex]);
            if (this.previousRowIndex != null && this.nodes[this.previousRowIndex] != null) {
                parentView.removeViewChildFromMap(this.nodes[this.previousRowIndex].getId());
            }
        }
        this.previousRowIndex = rowIndex;
        this.triggerStateChange();
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.triggerStateChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.getParentView() != null) {
            clientEvent.setParameter("screenId", this.getParentView().getId());
        }
        clientEvent.setParameter("id", this.getId());
        /** @type {?} */
        var rowId = this.selectedRows.map(function (idx) { return _this.getChildByOriginalRowIndex(idx).getId(); }).join(",");
        clientEvent.setParameter("rowId", rowId);
        this.getSession().getEventHandler().setClientEvent(clientEvent);
        this.onStateChange.emit();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.getChildByOriginalRowIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var node = this.nodes[index];
        if (this.virtualScroll === true) {
            node = find(this.nodes, function (el) {
                return el[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === index;
            });
        }
        return node;
    };
    /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    TableComponent.prototype.handleMouseUp = /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    function (event, rowIndex, row) {
        //for draggale rows, we need to double check row selection again
        if (this.draggableRows === true && this.shouldHandleMouseUp === true) {
            this.toggleRowSelection(event, rowIndex, row, true);
        }
        this.shouldHandleMouseUp = false;
    };
    /* istanbul ignore next */
    /**
     * Set row as selected/unselected
     * @param rowIndex Index of row to toggle on/off
     */
    /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    TableComponent.prototype.toggleRowSelection = /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    function (event, rowIndex, row, isMouseUp) {
        if (isMouseUp === void 0) { isMouseUp = false; }
        /** @type {?} */
        var targetEl = /** @type {?} */ (event.target);
        if (targetEl.tagName.toLowerCase() == 'input' && targetEl.getAttribute('type') != null) {
            if (targetEl.getAttribute('type').toLowerCase() == 'radio') {
                return;
            }
        }
        if (targetEl.tagName.toLowerCase() == 'button') {
            return;
        }
        /** @type {?} */
        var actualRowIndex = rowIndex;
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
                var clearSelection = true;
                if (this.draggableRows === true && isMouseUp !== true && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                    clearSelection = false;
                    this.shouldHandleMouseUp = true;
                }
                if (clearSelection) {
                    this.selectedRows.splice(0, this.selectedRows.length);
                }
            }
            /** @type {?} */
            var idx = findIndex(this.selectedRows, function (row) {
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
                                for (var i = rowIndex; i < this.lastSelectedRowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else if (this.lastSelectedRowIndex < rowIndex) {
                                for (var i = this.lastSelectedRowIndex + 1; i <= rowIndex; i++) {
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
    };
    /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.getOriginalIndex = /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.virtualScroll === true && this.nodes[index] != null) {
            return this.nodes[index][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return index;
    };
    /**
     * Set [[disabled]] property value
     * @param boo Toggle [[disabled]]
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    TableComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
    };
    /**
     * Get [[disabled]] property value
     */
    /**
     * Get [[disabled]] property value
     * @return {?}
     */
    TableComponent.prototype.getDisabled = /**
     * Get [[disabled]] property value
     * @return {?}
     */
    function () {
        return this.disabled;
    };
    /* istanbul ignore next */
    /**
     * Get a collection of all row elements that are selected
     * @returns The selected rows
     */
    /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    TableComponent.prototype.getSelectedRows = /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    function () {
        var e_3, _a, e_4, _b;
        /** @type {?} */
        var selectedRowElements = [];
        /* istanbul ignore if */
        if (this.selectedRows.length > 0 && this.nodes != null && this.nodes.length > 0) {
            try {
                for (var _c = __values(this.selectedRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var rowIndex = _d.value;
                    try {
                        for (var _e = __values(this.nodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var node = _f.value;
                            if (node.getLocalName() === "row" && node.rowNumber === rowIndex) {
                                selectedRowElements.push(node);
                                break;
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return selectedRowElements;
    };
    /* istanbul ignore next */
    /**
     * Get collection of selected row indexes
     */
    /**
     * Get collection of selected row indexes
     * @return {?}
     */
    TableComponent.prototype.getSelectedRowIndexes = /**
     * Get collection of selected row indexes
     * @return {?}
     */
    function () {
        var _this = this;
        return this.selectedRows.map(function (row) {
            return row[_this.ROW_INDEX_KEY];
        });
    };
    /**
     * Event handler for row select event
     * @param event
     */
    /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleRowSelection = /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* istanbul ignore next */
        if (!isEqual(event.selected, this._prevSelectedRows)) {
            this.onChange.emit(new TableSelectionEvent(event.selected));
        }
        this._prevSelectedRows = event.selected;
    };
    /**
     * Event handler for double click on cell
     * @param event
     * @event onDoubleClick
     */
    /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleCellActivation = /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.type === 'dblclick') {
            this.onDoubleClick.emit(new TableSelectionEvent(event.row));
        }
    };
    //internal
    /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    TableComponent.prototype.appendRowIndexToRow = /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    function (row, rowIndex) {
        row[this.ROW_INDEX_KEY] = rowIndex;
    };
    /* istanbul ignore */
    /**
     * Trigger change detection and re-render the table
     * @param clearData Set to true to empty table data
     */
    /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    TableComponent.prototype.refresh = /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    function (clearData) {
        if (clearData === void 0) { clearData = false; }
        if (clearData == true) {
            this._dataSource = [];
        }
        this.detectChanges();
    };
    /* istanbul ignore next */
    /**
     * Get [[changeDetectorRef]] property
     * @return the ChangeDetector
     */
    /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    TableComponent.prototype.getChangeDetector = /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    function () {
        return this.changeDetectorRef;
    };
    /**
     * Get NexaWeb tag name
     * @returns Tag name
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    TableComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    function () {
        return "table";
    };
    /* istanbul ignore next */
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     */
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    TableComponent.prototype.toJson = /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    function () {
        var _this = this;
        var e_5, _a;
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        // if (this.getSelectedRows() != null && this.getSelectedRows().length > 0) {
        //     this.setJson(json, "selectedRows", this.getSelectedRows().map(item=>item.toJson()));
        // }
        if (this.nodes != null &&
            this.nodes.length > 0) {
            /** @type {?} */
            var tempRows_1 = void 0;
            if (this.virtualScroll === true) {
                tempRows_1 = {};
            }
            json["rows"] = this.nodes.map(function (node, index) {
                /** @type {?} */
                var rowJson = node.toJson();
                if (_this.selectedRows != null && _this.selectedRows.indexOf(index) >= 0) {
                    rowJson["selected"] = "true";
                    rowJson["index"] = index + "";
                }
                if (_this.virtualScroll === true) {
                    tempRows_1[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                }
                return rowJson;
            });
            //virtual scroll data
            if (this.virtualScroll === true && this.modifiedVirtualRowsJson != null) {
                /** @type {?} */
                var keys$$1 = keys(this.modifiedVirtualRowsJson);
                try {
                    for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        //make sure we not already converted them
                        if (tempRows_1[key] == null) {
                            json["rows"].push(this.modifiedVirtualRowsJson[key]);
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        if (this.columns != null && this.columns.length > 0) {
            /** @type {?} */
            var columns = this.columns;
            if (this.getLocalName() === "table" &&
                this.columnsHasBeenSwapped === true) {
                columns = /** @type {?} */ (orderBy(columns, function (child) {
                    return child.originalColumnIndex;
                }));
            }
            json["columnDefs"] = columns.map(function (column, index) {
                /** @type {?} */
                var def = {
                    "visible": _this.toJsonValue(column.visible),
                    "locked": _this.toJsonValue(column.locked),
                    "enabled": _this.toJsonValue(column.enabled),
                    "sortable": _this.toJsonValue(column.sortable),
                    "isChecked": _this.toJsonValue(column.isChecked),
                    "customAttributes": BaseComponent.mapToJson(column.customAttributes)
                };
                // make sure customAttributes has 'width' property
                if (def["customAttributes"]["width"] != null) {
                    /** @type {?} */
                    var node = _this.headNode.getChildAt(index);
                    /** @type {?} */
                    var width = _this.toWholeNumber(node.htmlElement.style.width.slice(0, -2)); //server expect whole number
                    def["customAttributes"]["width"] = _this.toJsonValue(width);
                }
                if (column.id) {
                    def["id"] = _this.toJsonValue(column.id);
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
                var header = {
                    "tagName": "header",
                    "nxTagName": "header",
                    "text": _this.toJsonValue(column.header)
                };
                if (column.headerDirective && column.headerDirective.id) {
                    header["id"] = _this.toJsonValue(column.headerDirective.id);
                }
                else {
                    header["id"] = BaseComponent.generateUniqueId("header");
                }
                def["children"] = [header];
                return def;
            });
        }
        return json;
    };
    /* istanbul ignore next */
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    TableComponent.prototype.childToJson = /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    function (child) {
        return child.getTagName() === "headrow" || child.getTagName() === "headcell" ? child.toJson() : null;
    };
    /* istanbul ignore next */
    /**
     * Add element to internal list of row, cell, or header cell
     * @param type 'row' | 'cell' | 'headcell'
     * @param event Create event
     * @param rowOrColumnIndex
     * @param rowDataOrColumnDef
     */
    /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    TableComponent.prototype.registerFauxElement = /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    function (type, event, rowOrColumnIndex, rowDataOrColumnDef) {
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
    };
    /**
     * Get [[nodes]] property
     * @returns Node list
     */
    /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    TableComponent.prototype.getTableChildren = /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    function () {
        return this.nodes;
    };
    /**
     * Get number of nodes
     * @returns Number of nodes
     */
    /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    TableComponent.prototype.getChildCount = /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    function () {
        return this.nodes != null ? this.nodes.length : 0;
    };
    /**
     * Get all children of this table
     * @return List of children
     */
    /**
     * Get all children of this table
     * @return {?} List of children
     */
    TableComponent.prototype.getChildren = /**
     * Get all children of this table
     * @return {?} List of children
     */
    function () {
        /** @type {?} */
        var children = new Vector();
        forEach(this.getTableChildren(), function (child) { return children.add(child); });
        return children;
    };
    /**
     *
     * @param xpathExpression Get query result from an xpath expression string
     */
    /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    TableComponent.prototype.evaluateXPath = /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    function (xpathExpression) {
        /** @type {?} */
        var result = new Vector();
        /** @type {?} */
        var xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            var node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    };
    /**
     *
     * @param childOrArrayOrStringWtf
     * @param rowNumber
     */
    /* istanbul ignore next */
    /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    TableComponent.prototype.appendChild = /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    function (childOrArrayOrStringWtf, rowNumber) {
        if (rowNumber === void 0) { rowNumber = -1; }
        //TODO need to append child to certain row? dpending on childOrArrayOrStringWtf
    };
    /**
     * Check if the row has been selected
     * @param rowIndex Index of row to check
     * @returns True if row is a selected row
     */
    /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    TableComponent.prototype.isSelectedRow = /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    function (rowIndex, row) {
        if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
            rowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return this.selectedRows != null && this.selectedRows.indexOf(rowIndex) >= 0;
    };
    /* istanbul ignore next */
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param row
     * @param rowOrColumnIndex
     */
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    TableComponent.prototype.getRowCustomAttributes = /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    function (row, rowOrColumnIndex) {
        if (typeof this.rowCustomAttributeBuilder === "function") {
            return this.rowCustomAttributeBuilder(row, rowOrColumnIndex, /** @type {?} */ ((this._getNoneActiveViewParent() || this.getParentView())));
        }
        if (row != null && row.customAttributes) {
            return row.customAttributes;
        }
        return null;
    };
    /**
     * Check if column is visible. Either by index or column
     * @param index
     * @param column
     * @returns True if column is visible
     */
    /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    TableComponent.prototype.isColumnVisible = /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    function (index, column) {
        if (column === void 0) { column = null; }
        if (column != null) {
            return column.visible;
        }
        return this.columns.find(function (item, idx) { return idx === index; }).visible;
    };
    /* istanbul ignore next */
    /**
     * Add a child component to the table
     * @param child Component to add
     */
    /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    TableComponent.prototype.addChild = /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    function (child) {
        var _this = this;
        _super.prototype.addChild.call(this, child);
        /** @type {?} */
        var row = this.nodes[this.nodes.length - 1];
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
                    var sortValue = child.getAttribute("sortValue", true);
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
                    var columnIdx_1 = row.childNodes.length - 1;
                    //has cached data?
                    if (this.modifiedVirtualRows != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]] != null) {
                        /** @type {?} */
                        var temp = this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]];
                        if (temp.text !== undefined) {
                            (/** @type {?} */ (child)).setText(temp.text);
                        }
                        (/** @type {?} */ (child)).setChecked(temp.checked, true);
                    }
                    child._internalChangeCb = function (comp) {
                        _this._checkInitModifiedVirtualRows();
                        if (_this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            _this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        _this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]] = {
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
    };
    /* istanbul ignore next */
    /**
     * 選択中の行を削除する
     */
    /**
     * 選択中の行を削除する
     * @return {?}
     */
    TableComponent.prototype.removeSelectedRow = /**
     * 選択中の行を削除する
     * @return {?}
     */
    function () {
        var e_6, _a, e_7, _b, e_8, _c;
        if (this.selectedRows.length > 0) {
            /** @type {?} */
            var selected = this.selectedRows.concat().sort(function (v1, v2) { return v2 - v1; });
            try {
                for (var selected_1 = __values(selected), selected_1_1 = selected_1.next(); !selected_1_1.done; selected_1_1 = selected_1.next()) {
                    var idx = selected_1_1.value;
                    /** @type {?} */
                    var child = this.nodes[idx];
                    try {
                        for (var _d = __values(child.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var target = _e.value;
                            this.removeChild(target.getComponent());
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    child.destroy();
                    this.nodes.splice(idx, 1);
                    this.dataSource.splice(idx, 1);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (selected_1_1 && !selected_1_1.done && (_a = selected_1.return)) _a.call(selected_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            /** @type {?} */
            var rowNumber = 0;
            try {
                for (var _f = __values(this.nodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var row = _g.value;
                    row.rowNumber = rowNumber++;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                }
                finally { if (e_8) throw e_8.error; }
            }
            this.selectedRows = [];
        }
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    TableComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    TableComponent.prototype.trackRow = /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    function (event, rowOrColumnIndex, rowData) {
        /** @type {?} */
        var row = new HTMLElementWrapper(this.renderer, "", this.getSession());
        row.rowNumber = rowOrColumnIndex;
        row.htmlElement = /** @type {?} */ (event.element.nativeElement);
        this.setParentScreenId(row);
        row.setLocaleName("row");
        /** @type {?} */
        var customAttributes = this.getRowCustomAttributes(rowData, rowOrColumnIndex);
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
    };
    /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    TableComponent.prototype.toRowIndex = /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    function (rowIndex, rowData) {
        return this.virtualScroll === true && rowData != null ? rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] : rowIndex;
    };
    /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    TableComponent.prototype.trackCell = /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    function (event, columnIndex, columnDef) {
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("cell");
        if (columnDef.customAttributes !== undefined) {
            if (!cell.getAttribute("class")) {
                cell.setAttribute("class", columnDef.customAttributes["class"]);
            }
            else {
                /** @type {?} */
                var orgClass = cell.getAttribute("class");
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
    };
    /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    TableComponent.prototype.trackHeadCell = /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    function (event, columnDef) {
        if (this.headNode == null) {
            this.headNode = new HTMLElementWrapper(this.renderer, "", this.getSession());
            this.headNode.rowNumber = -1;
            this.setParentScreenId(this.headNode);
            this.headNode.setLocaleName("headrow");
        }
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("headcell");
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        cell.customData = columnDef;
        this.setParentScreenId(cell);
        this.headNode.appendChild(cell);
    };
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    TableComponent.prototype.trackNode = /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    function (node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    };
    /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    TableComponent.prototype.setParentScreenId = /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    };
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param row
     * @returns Style attributes
     */
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    TableComponent.prototype.rowStyleClass = /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    function (row) {
        if (typeof this.rowStyleFn === "function") {
            return this.rowStyleFn(row);
        }
        return "";
    };
    /**
     * Find the child node by id
     * @param id Child's id
     */
    /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    TableComponent.prototype.getChildNodeById = /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    function (id) {
        return this.nodes != null ? this.nodes.find(function (child) { return child.id === id; }) : null;
    };
    /* istanbul ignore next */
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param rowNumber
     * @param columnIndex
     * @param event
     */
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleColumnOnContextMenu = /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    function (column, rowNumber, columnIndex, event) {
        var _this = this;
        if (this.nodes != null && this.nodes[rowNumber] != null) {
            /** @type {?} */
            var childColumn = this.nodes[rowNumber].getChildAt(columnIndex);
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
                var parentView = this.getParentView();
                /** @type {?} */
                var popupMenuId_1 = null;
                if (parentView != null) {
                    popupMenuId_1 = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
                }
                if (typeof column.onContextMenuCb === "function") {
                    column.onContextMenuCb(this._getNoneActiveViewParent() || this.getParentView());
                }
                if (popupMenuId_1 != null) {
                    event.stopPropagation();
                    event.preventDefault();
                    /** @type {?} */
                    var tm_1 = setTimeout(function () {
                        clearTimeout(tm_1);
                        if (_this.getSession()._currentPopupMenuId != null) {
                            popupMenuId_1 = _this.getSession()._currentPopupMenuId;
                        }
                        _this.getSession().showContextMenu(popupMenuId_1);
                        _this.getSession()._currentPopupMenuId = null;
                    });
                }
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for context click on the header
     * @param columnIndex Index of column that was clicked
     * @param event
     */
    /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleHeaderOnContextMenu = /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    function (columnIndex, event) {
        /* istanbul ignore if */
        if (this.headNode != null) {
            /** @type {?} */
            var childColumn = this.headNode.getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                /** @type {?} */
                var clientEvent = new ClientEvent(childColumn, event);
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.recalculateVirtualScrollData = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
            /** @type {?} */
            var scrollTop = event.srcElement.scrollTop;
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
    };
    /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    TableComponent.prototype.adjustTableHead = /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    function (event, skipBodyAdjustment, skipHeader) {
        var _this = this;
        if (skipBodyAdjustment === void 0) { skipBodyAdjustment = false; }
        if (skipHeader === void 0) { skipHeader = false; }
        if (this.table == null || event == null)
            return;
        this.preMouseEvent = event;
        /** @type {?} */
        var scrollTop = event.srcElement.scrollTop;
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
            setTimeout(function () {
                _this._disabledScrolling = false;
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
            var table = this.table.nativeElement;
            /** @type {?} */
            var thead = table.querySelector('thead');
            /** @type {?} */
            var tbody = table.querySelector('tbody');
            var _loop_2 = function (i) {
                /** @type {?} */
                var column = this_1.columns.find(function (item, idx) { return idx === i; });
                if (column != null && column.visible && column.locked) {
                    /** @type {?} */
                    var headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translate(" + this_1.scrollLeft + "px, " + scrollTop + "px)";
                    if (this_1.virtualScroll === true) {
                        trans = "translateX(" + this_1.scrollLeft + "px)";
                    }
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                    if (skipBodyAdjustment !== true) {
                        /** @type {?} */
                        var bodyChildren = $(tbody.querySelectorAll('td:nth-child(' + (i + 1) + ')'));
                        bodyChildren.css("transform", "translate(" + this_1.scrollLeft + "px");
                        bodyChildren.css("-ms-transform", "translate(" + this_1.scrollLeft + "px");
                    }
                }
                else if (column != null && column.visible && this_1.virtualScroll !== true) {
                    /** @type {?} */
                    var headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translateY(" + scrollTop + "px)";
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.columns.length; i++) {
                _loop_2(i);
            }
            this.adjustTableFooter();
        }
    };
    /**
     * Set table footer styles for proper display
     * @return {?}
     */
    TableComponent.prototype.adjustTableFooter = /**
     * Set table footer styles for proper display
     * @return {?}
     */
    function () {
        /* istanbul ignore if */
        if (this.table == null)
            return;
        /** @type {?} */
        var tfoot = this.table.nativeElement.querySelector("tfoot");
        /* istanbul ignore if */
        if (tfoot != null) {
            /** @type {?} */
            var tfootPos = 0;
            if ($(this.table.nativeElement).height() < $(this.tableContainer.nativeElement).height()) {
                tfootPos = $(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height();
            }
            else {
                tfootPos = ($(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height()) + this.tableContainer.nativeElement.scrollTop;
            }
            var _loop_3 = function (i) {
                /** @type {?} */
                var column = this_2.columns.find(function (item, idx) { return idx === i; });
                if (column != null) {
                    /** @type {?} */
                    var footChildren = $(tfoot.querySelector('td:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translateY(" + tfootPos + "px)";
                    footChildren.css("transform", trans);
                    footChildren.css("-ms-transform", trans);
                    footChildren.css("position", "relative");
                    footChildren.css("z-index", "3");
                }
            };
            var this_2 = this;
            for (var i = 0; i < this.columns.length; i++) {
                _loop_3(i);
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param event Keyup event
     */
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    TableComponent.prototype.handleKeyUp = /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    function (event) {
        if (event.ctrlKey === true &&
            (event.code === "KeyC" ||
                event.keyCode === 67 ||
                event.keyCode === 99)) {
            // istanbul ignore next
            this.copySelectedRowAsText();
        }
    };
    /* istanbul ignore next */
    /**
     * Check to see if we can send selected rows to clipboard
     */
    /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    TableComponent.prototype.copySelectedRowAsText = /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    function () {
        /* istanbul ignore if */
        if (this.selectedRows != null && this.selectedRows.length === 1) {
            /** @type {?} */
            var selectedRowText = void 0;
            /** @type {?} */
            var selectedRow = this.getSelectedRows()[0];
            /* istanbul ignore if */
            if (selectedRow.childNodes != null && selectedRow.childNodes.length > 0) {
                selectedRowText = selectedRow.childNodes.map(function (child) { return child.getText(); });
            }
            else if (selectedRow.dynamicChildNodes != null && selectedRow.dynamicChildNodes.length > 0) {
                selectedRowText = selectedRow.dynamicChildNodes.map(function (child) { return child.getText(); });
            }
            /* istanbul ignore if */
            if (selectedRowText != null && selectedRowText.length > 0) {
                this.clipboardService.copy(selectedRowText.join(String.fromCharCode(9)));
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Generate a row id based on row's [[id]] and index
     * @param row
     * @param rowIndex
     */
    /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    TableComponent.prototype.buildRowId = /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    function (row, rowIndex) {
        if (typeof this.rowIdBuilder === "function") {
            return this.rowIdBuilder(row, rowIndex);
        }
        return ['row', this.id, rowIndex].join('-');
    };
    /* istanbul ignore next */
    /**
     * Sort the data (for virtual scroll)
     *
     * @param column
     */
    /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    TableComponent.prototype.handleSort = /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    function (column) {
        //sorting is only allowed on a non locking column
        /* istanbul ignore if */
        if (this.virtualScroll === true && column.locked !== true) {
            //find previous sort direction for the column
            this.columns.forEach(function (col) {
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
            var sortColumnId = this.virtualScrollSortKeys[column.originalColumnIndex];
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
    };
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    TableComponent.prototype.calcVirtualScrollHeight = /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    function () {
        // istanbul ignore if
        if (this.virtualScroll === true) {
            if (this._dataSource != null && this._dataSource.length > 0) {
                //scroll height = 10px * # rows (10px is the height of each row)
                this._virtualScrollDivHeight = (this.rowHeight * this._dataSource.length);
                this.maxScrollTop = this._virtualScrollDivHeight;
                this.virtualScrollSortKeys = keys(this._dataSource[0]);
                //track original index
                if (typeof this._dataSource[this._dataSource.length - 1][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] !== "number") {
                    forEach(this._dataSource, function (item, index) {
                        item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = index;
                    });
                }
            }
            else {
                this._virtualScrollDivHeight = 0;
            }
            this.markForCheck();
        }
    };
    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    TableComponent.prototype.calcVirtualTablePosition = /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        if (this.virtualScroll === true) {
            //-ms-transform
            //transform
            // if (this.maxScrollTop > 0) {
            //     scrollTop = Math.min(scrollTop, this.maxScrollTop);
            // }
            this.renderer.setStyle(this.tableWrapper.nativeElement, "transform", "translateY(" + scrollTop + "px)");
            this.renderer.setStyle(this.tableWrapper.nativeElement, "-ms-transform", "translateY(" + scrollTop + "px)");
            // this.markForCheck();
        }
    };
    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    TableComponent.prototype.calcVirtualScrollViewPort = /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        var _this = this;
        if (scrollTop === void 0) { scrollTop = 0; }
        if (this._isViewInit === true && this._dataSource != null) {
            /** @type {?} */
            var startIdx_1 = 0;
            //if scrollTop is greater than 0, need to figure the starting row
            if (scrollTop > 0) {
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                startIdx_1 = Math.floor(scrollTop / this.rowHeight);
                if (startIdx_1 > this._dataSource.length - this._virtualScrollRowPerView) {
                    startIdx_1 = this._dataSource.length - this._virtualScrollRowPerView;
                }
            }
            this._virtualViewPort = null;
            this.prevScrollTop = scrollTop;
            this.cleanUpChildNodes();
            this.detectChanges();
            this.zone.run(function () {
                _this._virtualViewPort = _this.buildRowIdentity(_this._dataSource.slice(startIdx_1, startIdx_1 + _this._virtualScrollRowPerView + _this.adjustedRows));
            });
        }
    };
    /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    TableComponent.prototype._swap = /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    function (fromIndex, toIndex) {
        /** @type {?} */
        var tempToColumn = this.columns[toIndex];
        this.columns[toIndex] = this.columns[fromIndex];
        this.columns[fromIndex] = tempToColumn;
    };
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    TableComponent.prototype.swapColumns = /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    function (fromIndex, toIndex) {
        var _this = this;
        //sophia 1856: need to properly swap columns
        if (fromIndex < toIndex) {
            for (var i = fromIndex; i < toIndex; i++) {
                this._swap(i, i + 1);
            }
        }
        else if (fromIndex > toIndex) {
            for (var i = fromIndex; i > toIndex; i--) {
                this._swap(i, i - 1);
            }
        }
        if (this.scrollContainerStyles != null) {
            this.scrollContainerStyles["overflow-y"] = "auto";
            this.detectChanges();
        }
        //sophia 1823: for server tracking
        forEach(this.columns, function (col, idx) {
            col.setAttribute("visualIndex", idx + "");
        });
        if (this.virtualScroll !== true) {
            this.detectChanges();
            setTimeout(function () {
                _this.applyResizeColumns();
            }, 200);
        }
        this.columnsHasBeenSwapped = true;
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._cleanupColResize = /**
     * @return {?}
     */
    function () {
        //reset
        this.$colResizable = $(this.table.nativeElement).colResizable({
            disable: true
        });
        $("#" + this.id + " .JCLRgrips").remove();
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    TableComponent.prototype.applyResizeColumns = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    TableComponent.prototype.canDragColumn = /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    function (colIdx) {
        var e_9, _a;
        /** @type {?} */
        var canDrag = true;
        try {
            for (var _b = __values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                if (col.originalColumnIndex === colIdx && col.locked === true) {
                    canDrag = false;
                    break;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return canDrag;
    };
    /**
     * Return the index of the suppplied row
     *
     * @param child row to check fo rindex?
     */
    /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    TableComponent.prototype.indexOfChild = /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    function (child) {
        if (this.nodes != null && this.nodes.length > 0) {
            return findIndex(this.nodes, function (node) { return node === child; });
        }
        //child does not exists
        return -1;
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._checkInitModifiedVirtualRows = /**
     * @return {?}
     */
    function () {
        if (this.modifiedVirtualRows == null) {
            this.modifiedVirtualRows = {};
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._checkInitModifiedVirtualRowsJson = /**
     * @return {?}
     */
    function () {
        if (this.modifiedVirtualRowsJson == null) {
            this.modifiedVirtualRowsJson = {};
        }
    };
    /**
     * Refresh the table sorter
     * @return {?}
     */
    TableComponent.prototype.refreshTableSorter = /**
     * Refresh the table sorter
     * @return {?}
     */
    function () {
        var _this = this;
        //data changes, need to update tableSorter
        if (this._tableSorterRefreshTm != null) {
            clearTimeout(this._tableSorterRefreshTm);
            this._tableSorterRefreshTm = null;
        }
        this.zone.runOutsideAngular(function () {
            _this._tableSorterRefreshTm = setTimeout(function () {
                clearTimeout(_this._tableSorterRefreshTm);
                _this._tableSorterRefreshTm = null;
                if (_this.$tablesorter != null) {
                    _this.$tablesorter.trigger("update");
                }
                _this.adjustTableHead(_this.preMouseEvent);
            }, 200);
        });
    };
    /**
     * Refresh cache data (sort value, etc)
     */
    /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    TableComponent.prototype.refreshTableSorterCache = /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    function () {
        var _this = this;
        //data changes, need to update tableSorter
        if (this._tableSorterCacheRefreshTm != null) {
            clearTimeout(this._tableSorterCacheRefreshTm);
            this._tableSorterCacheRefreshTm = null;
        }
        this.zone.runOutsideAngular(function () {
            _this._tableSorterCacheRefreshTm = setTimeout(function () {
                clearTimeout(_this._tableSorterCacheRefreshTm);
                _this._tableSorterCacheRefreshTm = null;
                if (_this.$tablesorter != null) {
                    _this.$tablesorter.trigger("updateCache");
                }
            }, 200);
        });
    };
    /**
     * @param {?} shouldSelected
     * @return {?}
     */
    TableComponent.prototype.setSelectAllVirtualRows = /**
     * @param {?} shouldSelected
     * @return {?}
     */
    function (shouldSelected) {
        var e_10, _a;
        if (shouldSelected !== true) {
            this.modifiedVirtualRows = {};
            this.modifiedVirtualRowsJson = {};
            this.selectedRows = [];
        }
        else {
            this._checkInitModifiedVirtualRows();
            this._checkInitModifiedVirtualRowsJson();
            /** @type {?} */
            var checkBoxeColumnIdxs = [];
            if (this.nodes != null && this.nodes.length > 0) {
                //find all checkboxes columns
                for (var i = 0; i < this.nodes[0].childNodes.length; i++) {
                    if (this.nodes[0].childNodes[i].component instanceof CheckboxComponent) {
                        checkBoxeColumnIdxs.push(i);
                    }
                }
            }
            //if there are checkboxes, check them
            this.lastSelectedRowIndex = 0;
            if (checkBoxeColumnIdxs.length > 0) {
                var _loop_4 = function (row) {
                    var e_11, _a;
                    //make sure row is not visible
                    if (findIndex(this_3.nodes, function (node) {
                        return node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                    }) < 0) {
                        if (this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        try {
                            for (var checkBoxeColumnIdxs_1 = __values(checkBoxeColumnIdxs), checkBoxeColumnIdxs_1_1 = checkBoxeColumnIdxs_1.next(); !checkBoxeColumnIdxs_1_1.done; checkBoxeColumnIdxs_1_1 = checkBoxeColumnIdxs_1.next()) {
                                var colIdx = checkBoxeColumnIdxs_1_1.value;
                                this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][colIdx] = {
                                    checked: true,
                                    text: undefined
                                };
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (checkBoxeColumnIdxs_1_1 && !checkBoxeColumnIdxs_1_1.done && (_a = checkBoxeColumnIdxs_1.return)) _a.call(checkBoxeColumnIdxs_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        //this.modifiedVirtualRowsJson []
                        if (typeof this_3.virtualScrollInvisibleRowBuilder === "function") {
                            /** @type {?} */
                            var rowElement = this_3.virtualScrollInvisibleRowBuilder(this_3._getNoneActiveViewParent() || this_3.getParentView(), row);
                            rowElement.setAttribute("selected", "true");
                            this_3.modifiedVirtualRowsJson[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = rowElement.toJson();
                        }
                        //selected the row
                        if (this_3.selectedRows == null) {
                            this_3.selectedRows = [];
                        }
                        this_3.selectedRows.push(row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]);
                    }
                };
                var this_3 = this;
                try {
                    for (var _b = __values(this._dataSource), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var row = _c.value;
                        _loop_4(row);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.recCalcNoVirtualRow = /**
     * @return {?}
     */
    function () {
        if (this.virtualScroll === true) {
            /** @type {?} */
            var height = $(this.tableContainer.nativeElement).height();
            if (this.tableHead != null) {
                this.theadHeight = $(this.tableHead.nativeElement).height();
                height = height - this.theadHeight;
                if (this.skipRowsAdjustment !== true) {
                    this.adjustedRows = Math.round(this.theadHeight / this.rowHeight) + 2;
                }
            }
            this._virtualScrollRowPerView = Math.round(height / this.rowHeight);
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.setHeaderWidthHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var table = this.table.nativeElement;
        /** @type {?} */
        var thead = table.querySelector('thead');
        /** @type {?} */
        var headerMaxHeight = 0;
        /** @type {?} */
        var id = table.id;
        if (this.columns != null) {
            if (this.forceFixWidth) {
                //please do not removed our code
                //this.renderer.setStyle(this.table.nativeElement, "table-layout", "fixed");
                var _loop_5 = function (i) {
                    /** @type {?} */
                    var column = this_4.columns.find(function (item, idx) { return idx === i; });
                    if (column != null) {
                        /** @type {?} */
                        var headChildren = thead.querySelector('th:nth-child(' + (i + 1) + ')');
                        this_4.renderer.setStyle(headChildren, "width", column.controlWidth + "px");
                        if (column.controlHeight !== undefined) {
                            this_4.isHeaderAuto = true;
                            if (headerMaxHeight < column.controlHeight) {
                                headerMaxHeight = Number(column.controlHeight);
                            }
                        }
                    }
                };
                var this_4 = this;
                for (var i = 0; i < this.columns.length; i++) {
                    _loop_5(i);
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
    };
    /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    TableComponent.prototype.resetTableColumns = /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    function () {
        if (this.forceResetColumns === true &&
            this._isDying !== true &&
            this.columns != null &&
            this.columnsHasBeenSwapped === true) {
            this.columnsHasBeenSwapped = false;
            /** @type {?} */
            var temp = clone(this.columns);
            this.columns = [];
            this.detectChanges();
            if (this.headNode != null) {
                this.headNode.childNodes = [];
            }
            this.columns = sortBy(temp, function (col, idx) {
                col.setAttribute("visualIndex", idx + "");
                return col.originalColumnIndex;
            });
            this.detectChanges();
            this.initPlugins();
        }
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    TableComponent.prototype.buildRowIdentity = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        // if (rows == null) return rows;
        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_DIFFER_ID] = BaseComponent.generateUniqueId("row_differ");
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_ID] = this.buildRowId(rows[rowIndex], rowIndex);
        // }
        return rows;
    };
    /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    TableComponent.prototype.rowTrackByFn = /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    function (idx, row) {
        return row[TableComponent.INTERNAL_ROW_DIFFER_ID];
    };
    /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    TableComponent.prototype.columnHeaderTrackByFn = /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    function (idx, column) {
        return column[TableComponent.INTERNAL_COLUMN_HEADER_ID];
    };
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     */
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.removeTableRowByIndex = /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this._tableRow != null && this._tableRow.length > index) {
            this._tableRow = filter(this._tableRow, function (row, rowIndex) {
                return rowIndex !== index;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    };
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     */
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    TableComponent.prototype.removeTableRowById = /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this._tableRow != null && this._tableRow.length > 0) {
            this._tableRow = filter(this._tableRow, function (row) {
                return row.id !== id;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    };
    /**
     * @param {?} columns
     * @return {?}
     */
    TableComponent.prototype.toColumns = /**
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        return columns.map(function (col, idx) {
            col[TableComponent.INTERNAL_COLUMN_HEADER_ID] = BaseComponent.generateUniqueId("hc");
            col.setAttribute("visualIndex", idx + '');
            return col;
        });
    };
    /**
     * @param {?} width
     * @return {?}
     */
    TableComponent.prototype.toWholeNumber = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        return parseInt(width);
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.checkShowBlankRow = /**
     * @return {?}
     */
    function () {
        if (this.dataSource == null ||
            this.dataSource.length === 0 ||
            (/** @type {?} */ (this.tableContainer.nativeElement)).scrollHeight > (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight) {
            this.showBlankRow = false;
        }
        else {
            this.showBlankRow = true;
        }
    };
    // removeFromTableRow(whtvr:string) {
    //   //no idea what this for
    // }
    // private appendHeaderToFakeTable() {
    //   if (this.isHeaderAppendToFakeTable !== true) {
    //     this.fakeTable.nativeElement.appendChild($(this.tableHead.nativeElement).clone()[0]);
    //     this.isHeaderAppendToFakeTable = true;
    //   }
    // }
    /**
     * Remove row from tableRows by id. no detect change
     * @param id row element id
     */
    /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    TableComponent.prototype.removeFromTableRow = /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var i = this.tableRow.findIndex(function (r) { return r.id === id; });
        this.tableRow.splice(i, 1);
    };
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
                            useExisting: forwardRef(function () { return TableComponent; })
                        }
                    ],
                    styles: [".table-container{width:100%;height:100%;overflow:auto;border:1px solid #888}table{table-layout:auto;width:100%!important;background-color:#fff;border-collapse:separate}table>tbody>tr>td,table>thead>tr>th{min-width:1px;white-space:nowrap;text-align:center}table tr.selected-row>td{background-color:#cff!important;color:#1014ff!important}table>thead>tr>th{position:relative;vertical-align:middle;overflow:hidden}.vt-locked-column{position:relative}th.vt-locked-column{background-color:#44a!important;z-index:4}.ghost-header,.table>tfoot>tr>td,.table>thead>tr>th{border-bottom:1px solid #d8d8dc;border-right:1px solid #d8d8dc;background-color:#6a6aff;color:#fff;font-weight:400}.table>tbody>tr>td{border-bottom:1px solid #8080ff;border-right:1px solid #8080ff;padding-left:2px!important;padding-right:2px!important}.table>tfoot>tr>td{padding-left:2px!important;padding-right:2px!important;white-space:nowrap}.table>tbody>tr:nth-child(odd)>td{background:#fff}.table>tbody>tr:nth-child(even)>td{background:#e6e6e6}.table>tfoot>tr{height:10px}td{display:table-cell}table>thead>tr>th.auto-wrap{white-space:normal}.internal-sort{padding:4px 21px 4px 4px}.sort-up{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIRnC2nKLnT4or00Puy3rx7VQAAOw==) center right no-repeat}.sort-down{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIPnI+py+0/hJzz0IruwjsVADs=) center right no-repeat}table thead th.auto-wrap{white-space:normal!important;text-align:center}th.headerPadding{padding-right:14px;padding-left:14px}.fake-table>thead{visibility:visible!important}"]
                }] }
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: IterableDiffers },
        { type: ClipboardService }
    ]; };
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
    return TableComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LockedColumnDirective = /** @class */ (function (_super) {
    __extends(LockedColumnDirective, _super);
    function LockedColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    LockedColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.locked = true;
    };
    LockedColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-locked-column',
                    providers: [
                        {
                            provide: TableColumnDirective,
                            useExisting: forwardRef(function () { return LockedColumnDirective; })
                        }
                    ]
                },] }
    ];
    return LockedColumnDirective;
}(TableColumnDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardModule = /** @class */ (function () {
    function ClipboardModule() {
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
    return ClipboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TableModule = /** @class */ (function () {
    function TableModule() {
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
    return TableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tab component
 */
var TabComponent = /** @class */ (function (_super) {
    __extends(TabComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     */
    function TabComponent(parent, sessionService, elementRef, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.onCommand = new EventEmitter();
        return _this;
    }
    /* istanbul ignore next */
    /**
     *
     * @param child Tab child component to add
     */
    /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    TabComponent.prototype.addChild = /**
     *
     * @param {?} child Tab child component to add
     * @return {?}
     */
    function (child) {
        (/** @type {?} */ (this.parent)).addChild(child);
        if (this.tabChildrenIds == null) {
            this.tabChildrenIds = [];
        }
        this.tabChildrenIds.push(child.getId());
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle
     */
    /**
     * After view init lifecycle
     * @return {?}
     */
    TabComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
    };
    /* istanbul ignore next */
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata about this component
     */
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    TabComponent.prototype.toJson = /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata about this component
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "active", this.focused);
        return json;
    };
    /* istanbul ignore next */
    /**
     * Get NexaWeb component tag name
     */
    /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    TabComponent.prototype.getNxTagName = /**
     * Get NexaWeb component tag name
     * @return {?}
     */
    function () {
        return "tab";
    };
    /* istanbul ignore next */
    /**
     * Event handler for click event
     * @event onCommand
     */
    /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    TabComponent.prototype.onClick = /**
     * Event handler for click event
     * \@event onCommand
     * @return {?}
     */
    function () {
        this.onCommand.emit(this.id);
        this.active = true;
    };
    /* istanbul ignore next */
    /**
     * Focus this tab
     */
    /**
     * Focus this tab
     * @return {?}
     */
    TabComponent.prototype.setFocus = /**
     * Focus this tab
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parent = this.getParent();
        if (parent != null && typeof parent["setSelectedTab"] === "function") {
            parent["setSelectedTab"](this.id);
        }
        else {
            _super.prototype.setFocus.call(this);
        }
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tab',
                    template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TabComponent; })
                        }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    TabComponent.propDecorators = {
        active: [{ type: Input }],
        id: [{ type: Input }],
        onCommand: [{ type: Output }],
        content: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return TabComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tab pane container component
 */
var TabPaneComponent = /** @class */ (function (_super) {
    __extends(TabPaneComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Inject change detector
     * @param renderer see [[BaseComponent]] constructor
     */
    function TabPaneComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.tabPlacement = "top";
        _this.onClick = new EventEmitter();
        _this.selectedTabIndex = 0;
        _this.focusedTabIndex = 0;
        _this.tabs = [];
        return _this;
    }
    Object.defineProperty(TabPaneComponent.prototype, "tabsList", {
        set: /**
         * @param {?} tabList
         * @return {?}
         */
        function (tabList) {
            this.tabs = tabList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     */
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    TabPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.configureTabs();
        this.cd.detectChanges();
    };
    /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    TabPaneComponent.prototype.configureTabs = /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    function () {
        var _this = this;
        forEach(this.tabs, function (tab, index) {
            if (tab.active === true) {
                _this.selectedTabIndex = index;
            }
        });
    };
    /* istanbul ignore next */
    /**
     * Event handler for when tab is selected
     * @param event
     * @param index Index of tab to select
     * @param tabId
     * @event onCommand
     */
    /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    TabPaneComponent.prototype.handleSelectTab = /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    function (event, index, tabId) {
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
        var parentView = this.getParentView();
        if (parentView != null) {
            parentView.resetAllScrollPanesPositionToPrevious();
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param e Key event
     */
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    TabPaneComponent.prototype.handleKeydown = /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    function (e) {
        if (!document.activeElement.className.includes("combobox-input-box") && !document.activeElement.className.includes("dropdown-item")) {
            /** @type {?} */
            var UP_KEY_CODE = 38;
            /** @type {?} */
            var DOWN_KEY_CODE = 40;
            /** @type {?} */
            var ENTER_KEY_CODE = 13;
            /** @type {?} */
            var keyPressed = e.which;
            /** @type {?} */
            var navigationKeys = [UP_KEY_CODE, DOWN_KEY_CODE, ENTER_KEY_CODE];
            if (navigationKeys.indexOf(keyPressed) === -1)
                return;
            e.stopPropagation();
            /** @type {?} */
            var newIndex = void 0;
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
    };
    /* istanbul ignore next */
    /**
     * Focus a tab by it's index position
     * @param index Index of tab to focus
     */
    /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    TabPaneComponent.prototype.setFocusedTab = /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    function (index) {
        this.focusedTabIndex = index;
        /** @type {?} */
        var tabItem = this.tabNavItems.find(function (item, i) {
            return i === index;
        });
        if (tabItem) {
            setTimeout(function () {
                tabItem.nativeElement.focus();
            }, 0);
        }
    };
    /* istanbul ignore next */
    /**
     * Set selected tab by index or id
     * @param index Index or Id of [[TabComponent]] to select
     */
    /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    TabPaneComponent.prototype.setSelectedTab = /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    function (index) {
        if (typeof index === "number") {
            this.selectedTabIndex = index;
        }
        else {
            /** @type {?} */
            var tempIndex = findIndex(this.tabs, function (tab) { return tab.id === index; });
            if (tempIndex >= 0) {
                this.selectedTabIndex = tempIndex;
            }
        }
        this.markForCheck();
    };
    Object.defineProperty(TabPaneComponent.prototype, "selectedTab", {
        /**
         * Get the selected [[TabComponent]]
         * @returns Tab that is selected
         */
        get: /**
         * Get the selected [[TabComponent]]
         * @return {?} Tab that is selected
         */
        function () {
            var _this = this;
            return this.tabs.find(function (item, index) { return index === _this.selectedTabIndex; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    TabPaneComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    function () {
        return "tabPane";
    };
    /**
     * Get [[cd]] (ChangeDetector) member
     */
    /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    TabPaneComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Remove a tab child from the pane
     * @param child Tab to remove
     */
    /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    TabPaneComponent.prototype.removeChild = /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    function (child) {
        _super.prototype.removeChild.call(this, child);
        this.tabs = filter(this.tabs, function (tab) { return tab.id !== child.id; });
        this.cd.markForCheck();
    };
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata
     */
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    TabPaneComponent.prototype.toJson = /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json["selectedTabIndex"] = this.selectedTabIndex;
        return json;
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    TabPaneComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    TabPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tab-pane',
                    template: "<div\n  class=\"vt-tab-pane {{cssClass}}\"\n  [ngClass]=\"{'tabs-left': tabPlacement === 'left'}\"\n  [id]=\"id\" (contextmenu)=\"handleOnContextMenu($event)\"\n  (keydown)=\"handleKeydown($event)\"\n  [style.height]=\"controlHeight\"\n  >\n  <!-- Tab Navigation --->\n  <ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li #tabNavItem *ngFor=\"let tab of tabs; let i=index\" [ngClass]=\"{'active': selectedTabIndex === i}\" role=\"presentation\" tabindex=\"-1\">\n      <a id=\"{{tab.id}}-title\" href=\"javascript:void(0)\" [ngClass]=\"{'active': tab.active, 'focused': focusedTabIndex === i}\" role=\"tab\" (click)=\"handleSelectTab($event, i, tab.id)\" tabindex=\"-1\">{{tab.text}}</a>\n    </li>\n  </ul>\n\n  <!-- Tab Content -->\n  <div class=\"tab-content\" [style.height]=\"controlHeight\">\n    <ng-template [ngIf]=\"selectedTab != null\">\n      <div role=\"tabpanel\" class=\"vt-tab tabpane {{selectedTab.cssClass}}\" [id]=\"selectedTab.id\" [style.height]=\"controlHeight\">\n          <ng-container *ngTemplateOutlet=\"selectedTab.content\"></ng-container>\n      </div>\n    </ng-template>\n  </div>\n\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TabPaneComponent; })
                        }
                    ],
                    styles: [".tabs-below>.nav-tabs,.tabs-left>.nav-tabs,.tabs-right>.nav-tabs{border-bottom:0}.pill-content>.pill-pane,.tab-content>.tab-pane{display:none}.pill-content>.active,.tab-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:focus,.tabs-below>.nav-tabs>li>a:hover{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:focus,.tabs-below>.nav-tabs>.active>a:hover{border-color:transparent #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:focus,.tabs-left>.nav-tabs>li>a:hover{border-color:#9abecb #aaa #9abecb #9abecb}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:focus,.tabs-left>.nav-tabs .active>a:hover{border-color:#aaa transparent #aaa #aaa}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:focus,.tabs-right>.nav-tabs>li>a:hover{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:focus,.tabs-right>.nav-tabs .active>a:hover{border-color:#ddd #ddd #ddd transparent}"]
                }] }
    ];
    /** @nocollapse */
    TabPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    TabPaneComponent.propDecorators = {
        tabPlacement: [{ type: Input }],
        tabsList: [{ type: ContentChildren, args: [TabComponent,] }],
        tabNavItems: [{ type: ViewChildren, args: ['tabNavItem',] }],
        onClick: [{ type: Output }]
    };
    return TabPaneComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TabHostDirective = /** @class */ (function () {
    function TabHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TabHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-tab-host]'
                },] }
    ];
    /** @nocollapse */
    TabHostDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return TabHostDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TabPaneModule = /** @class */ (function () {
    function TabPaneModule() {
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
    return TabPaneModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for textarea component
 */
var TextAreaComponent = /** @class */ (function (_super) {
    __extends(TextAreaComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd ChangeDetector for this component
     * @param renderer see [[BaseComponent]] constructor
     */
    function TextAreaComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this._maxLength = TextAreaComponent.MAX_LENGTH;
        _this.onTextChange = new EventEmitter();
        _this.onEdit = new EventEmitter();
        _this._editable = true;
        return _this;
    }
    Object.defineProperty(TextAreaComponent.prototype, "maxLength", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxLength > 0 ? this._maxLength : TextAreaComponent.MAX_LENGTH;
        },
        set: /**
         * @param {?} max
         * @return {?}
         */
        function (max) {
            this._maxLength = max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "editable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editable !== "false" && this._editable !== false;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._editable = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init lifecycle. Call parent ngOnInit
     */
    /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    TextAreaComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.controlPadding) {
            this.controlPadding = this.controlPadding + 'px';
        }
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     */
    /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    TextAreaComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle.
     * Focus the textarea and set dimensions
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.focusOnActivation) {
            this.elementRef.nativeElement.focus();
        }
        this.initWidthHeightStyle("height", "width");
        this.setAttributeFromDef();
        this.cd.detectChanges();
    };
    /**
     * Get the name of the component
     * @returns Name of component
     */
    /**
     * Get the name of the component
     * @return {?} Name of component
     */
    TextAreaComponent.prototype.getLocalName = /**
     * Get the name of the component
     * @return {?} Name of component
     */
    function () {
        return "textArea";
    };
    /**
     * Focus the textarea element
     */
    /**
     * Focus the textarea element
     * @return {?}
     */
    TextAreaComponent.prototype.setFocus = /**
     * Focus the textarea element
     * @return {?}
     */
    function () {
        this.textarea.nativeElement.focus();
    };
    /**
     * Get the value of internal [[_maxLength]] property
     */
    /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    TextAreaComponent.prototype.getMaxLength = /**
     * Get the value of internal [[_maxLength]] property
     * @return {?}
     */
    function () {
        return this._maxLength;
    };
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param max Length of text content
     */
    /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    TextAreaComponent.prototype.setMaxLength = /**
     * Set [[_maxLength]] property value and mark for change detection
     * @param {?} max Length of text content
     * @return {?}
     */
    function (max) {
        if (typeof max === "number") {
            this._maxLength = max;
        }
        else {
            this._maxLength = parseInt(max);
        }
        this.cd.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * @param event
     * @param value
     * @event onTextChange
     */
    /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    TextAreaComponent.prototype.onInput = /**
     * Event handler for text input
     * Emit onTextChange b/c user keep typing (input still has focus)
     * \@event onTextChange
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        var _this = this;
        /** @type {?} */
        var pos = this.textarea.nativeElement.selectionStart;
        if (event.keyCode == 8 || event.keyCode == 46) //Backspace || Delete
         {
            this.text = value;
            setTimeout(function () {
                _this.textarea.nativeElement.selectionStart = pos;
                _this.textarea.nativeElement.selectionEnd = pos;
            });
        }
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this._textPreviousKeyInput != this.text)
            this.onTextChange.emit();
        this._textPreviousKeyInput = this.text;
    };
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @returns Change detector for this component
     */
    /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    TextAreaComponent.prototype.getChangeDetector = /**
     * Get the value of [[cd]] (ChangeDetector) property
     * @return {?} Change detector for this component
     */
    function () {
        return this.cd;
    };
    /**
     * Get Nexaweb tag name
     * @returns Tag name
     */
    /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    TextAreaComponent.prototype.getNxTagName = /**
     * Get Nexaweb tag name
     * @return {?} Tag name
     */
    function () {
        return "textArea";
    };
    /* istanbul ignore next */
    /**
     * Event handler for focus event
     * @param e Input focus event
     */
    /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    TextAreaComponent.prototype.onFocus = /**
     * Event handler for focus event
     * @param {?} e Input focus event
     * @return {?}
     */
    function (e) {
        this._textBeforeFocusIn = this.text;
        this._textPreviousKeyInput = this.text;
    };
    /* istanbul ignore next */
    /**
     * Event handler for blur (unfocus) event
     * @param e Input blur event
     */
    /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    TextAreaComponent.prototype.onBlur = /**
     * Event handler for blur (unfocus) event
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        if (this.textarea.nativeElement.ownerDocument.activeElement === this.textarea.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.text = value; //when the last char is Zenkaku and the user doesn't press 'Enter', this is needed.
        if (this.text != null && this._maxLength > 0 && this._maxLength < this.text.length) {
            this.text = this.text.substring(0, this._maxLength);
        }
        if (this.text != this._textBeforeFocusIn)
            this.onEdit.emit();
        this.validateField(event);
    };
    /**
     * Set [[visible]] property value
     * @override
     * @param value Toggle visibility
     */
    /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    TextAreaComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @override
     * @param {?} value Toggle visibility
     * @return {?}
     */
    function (value) {
        this.visible = value;
        if (this.visible) {
            this.removeCssClass('hidden');
            this.getElement().removeAttribute('hidden');
        }
        else {
            this.addCssClass('hidden');
            this.getElement().setAttribute('hidden', '');
        }
    };
    TextAreaComponent.MAX_LENGTH = 9999;
    TextAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-text-area',
                    template: "<textarea #textarea [id]=\"id\" class=\"vt-text-area form-control {{cssClass}}\"\n[attr.disabled]=\"enabled !== false ? null : true\"\n  [attr.readonly]=\"editable !== false ? null : true\"\n  [style.height]=\"controlHeight\"\n  [style.maxWidth]=\"controlWidth\"\n  [style.padding]=\"controlPadding\"\n  [style.line-height]=\"lineHeight\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (focusin)=\"onFocus($event)\"\n  (focusout)=\"onBlur($event, textarea.value)\"\n  (keyup)=\"onInput($event, textarea.value)\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  [ngStyle]=\"styles\"\n  [required]=\"required\"\n  [maxLength]=\"maxLength\"\n  [(ngModel)]=\"text\"\n  [disabled]=\"disabled\"\n  >\n</textarea>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TextAreaComponent; })
                        }
                    ],
                    styles: [".form-control[disabled]{color:grey!important}"]
                }] }
    ];
    /** @nocollapse */
    TextAreaComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    TextAreaComponent.propDecorators = {
        maxLength: [{ type: Input }],
        editable: [{ type: Input }],
        textarea: [{ type: ViewChild, args: ['textarea',] }],
        onTextChange: [{ type: Output }],
        onEdit: [{ type: Output }]
    };
    return TextAreaComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextAreaModule = /** @class */ (function () {
    function TextAreaModule() {
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
    return TextAreaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for tree table component
 */
var TreeTableComponent = /** @class */ (function (_super) {
    __extends(TreeTableComponent, _super);
    function TreeTableComponent(parent, sessionService, elementRef, zone, renderer, cd) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.zone = zone;
        _this.cd = cd;
        _this.nodes = [];
        _this.selectedNodes = [];
        _this.selectedRowElements = [];
        return _this;
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    TreeTableComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        // Width/Height is required otherwise grid will collapse to zero.
        // if (!this.controlHeight) this.controlHeight = '500px';
        // if (!this.controlWidth) this.controlWidth = '500px';
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     */
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    TreeTableComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    function () {
        var _this = this;
        //make sure to call sure it can init thing
        _super.prototype.ngAfterViewInit.call(this);
        this.createDocFragment();
        if (this.columns != null && this.columns.length > 0) {
            this.columnDefs = [];
            this.columns.forEach(function (column) {
                _this.columnDefs.push({
                    headerName: column.header,
                    controlWidth: column.controlWidth
                });
            });
        }
        if (this.rowData && this.rowData.length > 0) {
            this.zone.runOutsideAngular(function () {
                jQuery("#" + _this.id + " .jq-tree-table").treetable();
            });
        }
    };
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     */
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    TreeTableComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    function () {
        var e_1, _a;
        this.tableBody = null;
        this._bodyFragment = null;
        if (this.nodes != null) {
            try {
                for (var _b = __values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    node.destroy();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.nodes = null;
    };
    /**
     * Remove all child rows from this table
     */
    /**
     * Remove all child rows from this table
     * @return {?}
     */
    TreeTableComponent.prototype.clearRows = /**
     * Remove all child rows from this table
     * @return {?}
     */
    function () {
        // while(this.tableBody.nativeElement.firstChild) {
        //   this.renderer.removeChild(this.tableBody.nativeElement, this.tableBody.nativeElement.firstChild);
        // }
        (/** @type {?} */ (this.tableBody.nativeElement)).innerHTML = "";
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
        this.createDocFragment();
    };
    /* istanbul ignore next */
    /**
     * Create table row but DO NOT append to table
     */
    /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    TreeTableComponent.prototype.createRow = /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var row = new HTMLElementWrapper(this.renderer, "row", this.getSession());
        row.setAttribute("id", BaseComponent.generateUniqueId("row"));
        row.parentTableId = this.id;
        row.parentTable = this;
        this.setParentScreenId(row);
        this.zone.runOutsideAngular(function () {
            row.htmlElement.addEventListener("mousedown", function () {
                if (_this.selectedNodes != null) {
                    _this.selectedNodes.forEach(function (idx) {
                        _this._selectRow(idx, false);
                    });
                }
                _this.selectedRowElements = [];
                _this.selectRow(row, true);
            });
        });
        this.trackNode(row);
        return row;
    };
    /* istanbul ignore next */
    /**
     * Create table row and append to table
     */
    /**
     * Create table row and append to table
     * @return {?}
     */
    TreeTableComponent.prototype.addRow = /**
     * Create table row and append to table
     * @return {?}
     */
    function () {
        /** @type {?} */
        var row = this.createRow();
        if (this.useDocFragment === true) {
            this._bodyFragment.appendChild(row.htmlElement);
        }
        else {
            this.renderer.appendChild(this.tableBody.nativeElement, row.htmlElement);
        }
        row.htmlElement.style["background"] = "";
        return row;
    };
    /* istanbul ignore next */
    /**
     * Set a row as selected and set selected style
     * @param nodeIndex Index of node/row to select
     * @param isSelected Toggle to set selected style
     */
    /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    TreeTableComponent.prototype._selectRow = /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    function (nodeIndex, isSelected) {
        /** @type {?} */
        var idx = findIndex(this.selectedNodes, function (node) {
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
    };
    /**
     * This function is called by setAttribute(row, value);
     * @param row Row to set as selected row
     * @param isSelected Toggle selected state and style
     */
    /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    TreeTableComponent.prototype.selectRow = /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    function (row, isSelected) {
        if (this.nodes == null)
            return;
        /** @type {?} */
        var nodeIndex = findIndex(this.nodes, function (node) {
            return node === row;
        });
        /** @type {?} */
        var tds = this.elementRef.nativeElement.querySelectorAll('td');
        for (var i = 0; i < tds.length; i++) {
            (/** @type {?} */ (tds[i])).style.color = '';
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this._selectRow(i, false);
        }
        this._selectRow(nodeIndex, true);
        if (isSelected) {
            this.selectedRowElements.push(row);
        }
        else {
            this.selectedRowElements = this.selectedRowElements.filter(function (el) {
                return el._uniqueId !== row._internalId;
            });
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.getSelectedRows = /**
     * @return {?}
     */
    function () {
        return this.selectedRowElements;
    };
    /* istanbul ignore next */
    /**
     * Create table cell (will not append to anything)
     * @returns The table cell that is created
     */
    /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    TreeTableComponent.prototype.createCell = /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    function () {
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "cell", this.getSession());
        cell.setAttribute("id", BaseComponent.generateUniqueId("cell"));
        this.setParentScreenId(cell);
        //for cell, we need to append it to the row
        this.trackNode(cell);
        return cell;
    };
    /* istanbul ignore next */
    /**
     * @deprecated used createCell instead
     */
    /**
     * @deprecated used createCell instead
     * @return {?}
     */
    TreeTableComponent.prototype.addCell = /**
     * @deprecated used createCell instead
     * @return {?}
     */
    function () {
        return this.createCell();
    };
    /* istanbul ignore next */
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     */
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    TreeTableComponent.prototype.redrawTree = /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            /* istanbul ignore next */
            jQuery("#" + _this.id + " .jq-tree-table").treetable({
                expandable: true
            }, true);
            _this.cd.markForCheck();
        });
    };
    /* istanbul ignore next */
    /**
     * Expand all nodes in the tree
     */
    /**
     * Expand all nodes in the tree
     * @return {?}
     */
    TreeTableComponent.prototype.expandAll = /**
     * Expand all nodes in the tree
     * @return {?}
     */
    function () {
        /* istanbul ignore next */
        jQuery("#" + this.id + " .jq-tree-table").treetable("expandAll");
        this.setNodeExpandedStatus("true");
    };
    /* istanbul ignore next */
    /**
     * Collapse all node in the tree
     */
    /**
     * Collapse all node in the tree
     * @return {?}
     */
    TreeTableComponent.prototype.collapseAll = /**
     * Collapse all node in the tree
     * @return {?}
     */
    function () {
        jQuery("#" + this.id + " .jq-tree-table").treetable("collapseAll");
        this.setNodeExpandedStatus("false");
    };
    /**
     * Get child nodes of the table
     * @returns [[nodes]]
     */
    /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    TreeTableComponent.prototype.getTableChildren = /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    function () {
        return this.nodes;
    };
    /* istanbul ignore next */
    /**
     * Get number of child nodes for this tree
     * @returns Number of child nodes
     */
    /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    TreeTableComponent.prototype.getChildCount = /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    function () {
        return this.nodes != null ? this.nodes.length : 0;
    };
    /**
     * Get child node by id
     * @param id
     */
    /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    TreeTableComponent.prototype.getChildById = /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this.nodes != null) {
            /** @type {?} */
            var temp = filter(this.nodes, function (item) { return item.getId() === id; });
            if (temp.length > 0) {
                return temp[0];
            }
        }
        return null;
    };
    /* istanbul ignore next */
    /**
     * Get list of nodes from XPath expression string
     * @param xpathExpression
     */
    /* istanbul ignore next */
    /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    TreeTableComponent.prototype.evaluateXPath = /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    function (xpathExpression) {
        /** @type {?} */
        var result = new Vector();
        /** @type {?} */
        var xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            var node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    };
    /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    TreeTableComponent.prototype.trackNode = /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    function (node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    };
    /**
     * Get NexaWeb tag name
     * @returns Tagname
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    TreeTableComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    function () {
        return "treeTable";
    };
    /* istanbul ignore next */
    /**
     * Get [[cd]] (Change detector) property
     * @returns Change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    TreeTableComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    function () {
        return this.cd;
    };
    /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    TreeTableComponent.prototype.setNodeExpandedStatus = /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    function (status) {
        if (this.nodes != null) {
            forEach(this.nodes, function (node) {
                if (node.getLocalName() === "row") {
                    node.expanded = status;
                }
            });
        }
    };
    /**
     * Get JSON representation for this component
     * @returns Component metadata as JSON object
     */
    /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    TreeTableComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    function () {
        /** @type {?} */
        var retVal = _super.prototype.toJson.call(this);
        if (this.nodes != null) {
            /** @type {?} */
            var children = this.nodes.filter(function (node) { return node.getLocalName() === "row"; });
            if (children.length > 0) {
                retVal["children"] = children.map(function (child) { return child.toJson(); });
            }
        }
        return retVal;
    };
    /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    TreeTableComponent.prototype.setParentScreenId = /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.getNodes = /**
     * @return {?}
     */
    function () {
        return this.nodes;
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.createDocFragment = /**
     * @return {?}
     */
    function () {
        if (this.useDocFragment === true) {
            this._bodyFragment = document.createDocumentFragment();
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.appendFragment = /**
     * @return {?}
     */
    function () {
        if (this._bodyFragment != null) {
            (/** @type {?} */ (this.tableBody.nativeElement)).appendChild(this._bodyFragment);
        }
    };
    TreeTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tree-table',
                    template: "<div [id]=\"id\"\nclass=\"vt-tree-table {{cssClass}}\"\n[style.width]=\"controlWidth\"\n[style.height]=\"controlHeight\"\n[style.border-style]=\"borderStyle\">\n    <table\n        class=\"table jq-tree-table\" [style.border-width]=\"borderWidth\">\n        <thead #tableHeader>\n            <tr>\n                <th scope=\"col\" *ngFor=\"let col of columnDefs\" [style.width.px]=\"col.controlWidth\">\n                    {{col.headerName}}\n                </th>\n            </tr>\n        </thead>\n        <tbody #tableBody>\n            <tr *ngFor=\"let row of rowData; let i = index\">\n                <td *ngFor=\"let col of columnDefs\">\n                    {{row[col.field]}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TreeTableComponent; })
                        }
                    ],
                    styles: ["table.treetable span.indenter{display:inline-block;margin:0;padding:0;text-align:right;-ms-user-select:none;user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;box-sizing:content-box;width:19px}table.treetable span.indenter a{background-position:left center;background-repeat:no-repeat;display:inline-block;text-decoration:none;width:19px}table.treetable{border:1px solid #888;border-collapse:collapse;font-size:.8em;line-height:1;width:100%}table.treetable caption{font-size:.9em;font-weight:700;margin-bottom:.2em}table.treetable thead{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAYAAADwkER/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAD9JREFUeNpsxzEKgDAQAMHlQEhpYWuTF+RV+X+fmLU7ItgMDGoPYAXwJPOHkWxFbd9W1Dt7oZ4BTNSCeqDGOwDlRyvLRZQgvgAAAABJRU5ErkJggg==) top left repeat-x #aaa;font-size:.9em}table.treetable thead tr th{border:1px solid #888;font-weight:400;padding:.3em 1em .1em;text-align:left;height:6px}table.treetable tbody tr td{cursor:default;border-right:1px solid #8080ff}table.treetable span{background-position:center left;background-repeat:no-repeat;padding:.2em 0 .2em 1.5em}table.treetable span.file{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC)}table.treetable span.folder{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLxZO7ihRBFIa/6u0ZW7GHBUV0UQQTZzd3QdhMQxOfwMRXEANBMNQX0MzAzFAwEzHwARbNFDdwEd31Mj3X7a6uOr9BtzNjYjKBJ6nicP7v3KqcJFaxhBVtZUAK8OHlld2st7Xl3DJPVONP+zEUV4HqL5UDYHr5xvuQAjgl/Qs7TzvOOVAjxjlC+ePSwe6DfbVegLVuT4r14eTr6zvA8xSAoBLzx6pvj4l+DZIezuVkG9fY2H7YRQIMZIBwycmzH1/s3F8AapfIPNF3kQk7+kw9PWBy+IZOdg5Ug3mkAATy/t0usovzGeCUWTjCz0B+Sj0ekfdvkZ3abBv+U4GaCtJ1iEm6ANQJ6fEzrG/engcKw/wXQvEKxSEKQxRGKE7Izt+DSiwBJMUSm71rguMYhQKrBygOIRStf4TiFFRBvbRGKiQLWP29yRSHKBTtfdBmHs0BUpgvtgF4yRFR+NUKi0XZcYjCeCG2smkzLAHkbRBmP0/Uk26O5YnUActBp1GsAI+S5nRJJJal5K1aAMrq0d6Tm9uI6zjyf75dAe6tx/SsWeD//o2/Ab6IH3/h25pOAAAAAElFTkSuQmCC)}table.treetable tr.collapsed span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHlJREFUeNrcU1sNgDAQ6wgmcAM2MICGGlg1gJnNzWQcvwQGy1j4oUl/7tH0mpwzM7SgQyO+EZAUWh2MkkzSWhJwuRAlHYsJwEwyvs1gABDuzqoJcTw5qxaIJN0bgQRgIjnlmn1heSO5PE6Y2YXe+5Cr5+h++gs12AcAS6FS+7YOsj4AAAAASUVORK5CYII=)}table.treetable tr.expanded span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHFJREFUeNpi/P//PwMlgImBQsA44C6gvhfa29v3MzAwOODRc6CystIRbxi0t7fjDJjKykpGYrwwi1hxnLHQ3t7+jIGBQRJJ6HllZaUUKYEYRYBPOB0gBShKwKGA////48VtbW3/8clTnBIH3gCKkzJgAGvBX0dDm0sCAAAAAElFTkSuQmCC)}table.treetable tr.branch{background-color:#f9f9f9}table.treetable tr.selected{background-color:#3875d7;color:#fff}table.treetable tr span.indenter a{outline:0}table.treetable tr.collapsed.selected span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAFpJREFUeNpi/P//PwMlgHHADWD4//8/NtyAQxwD45KAAQdKDfj//////fgMIsYAZIMw1DKREFwODAwM/4kNRKq64AADA4MjFDOQ6gKyY4HodMA49PMCxQYABgAVYHsjyZ1x7QAAAABJRU5ErkJggg==)}table.treetable tr.expanded.selected span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAFtJREFUeNpi/P//PwMlgImBQsA44C6giQENDAwM//HgBmLCAF/AMBLjBUeixf///48L7/+PCvZjU4fPAAc0AxywqcMXCwegGJ1NckL6jx5wpKYDxqGXEkkCgAEAmrqBIejdgngAAAAASUVORK5CYII=)}table.treetable tr.accept{background-color:#a3bce4;color:#fff}table.treetable tr.collapsed.accept td span.indenter a{background-image:url(data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAFpJREFUeNpi/P//PwMlgHHADWD4//8/NtyAQxwD45KAAQdKDfj//////fgMIsYAZIMw1DKREFwODAwM/4kNRKq64AADA4MjFDOQ6gKyY4HodMA49PMCxQYABgAVYHsjyZ1x7QAAAABJRU5ErkJggg==)}table.treetable tr.expanded.accept td span.indenter a{background-image:url(data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAFtJREFUeNpi/P//PwMlgImBQsA44C6giQENDAwM//HgBmLCAF/AMBLjBUeixf///48L7/+PCvZjU4fPAAc0AxywqcMXCwegGJ1NckL6jx5wpKYDxqGXEkkCgAEAmrqBIejdgngAAAAASUVORK5CYII=)}vt-tree-table{overflow:auto}table.treetable tr:nth-child(odd){background:0 0}table.treetable tr:nth-child(even){background:#e6e6e6}"]
                }] }
    ];
    /** @nocollapse */
    TreeTableComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    TreeTableComponent.propDecorators = {
        rowData: [{ type: Input }],
        columnDefs: [{ type: Input }],
        useDocFragment: [{ type: Input }],
        columns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
        tableBody: [{ type: ViewChild, args: ["tableBody", { read: ElementRef },] }]
    };
    return TreeTableComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TreeTableModule = /** @class */ (function () {
    function TreeTableModule() {
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
    return TreeTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Base parent component class that all other screen components inherit from
 */
var ViewComponent = /** @class */ (function (_super) {
    __extends(ViewComponent, _super);
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
            forEach(this.popupMenus, function (popupMenu) { return popupMenu.convertSubMenuItems(_this.id); });
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
                forEach(this.popupMenus, function (popupMenu) { return popupMenu.convertSubMenuItems(_this.id); });
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
        forEach(this.defIds, function (id) {
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
                        for (var attributes_1 = __values(attributes), attributes_1_1 = attributes_1.next(); !attributes_1_1.done; attributes_1_1 = attributes_1.next()) {
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
        var radios = filter(Array.from(this.children.values()), function (child) {
            return child instanceof RadioButtonComponent && (/** @type {?} */ (child)).group === radioGroupId;
        });
        /* istanbul ignore if */
        if (radios != null && radios.length > 0) {
            forEach(radios, function (radio) {
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
                        for (var ev_1 = __values(ev), ev_1_1 = ev_1.next(); !ev_1_1.done; ev_1_1 = ev_1.next()) {
                            var v = ev_1_1.value;
                            if (v.nodes && Array.isArray(v.nodes) && v.nodes.length > 0) {
                                try {
                                    for (var _c = __values(v.nodes), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                view = find(sessionService.getMcoContainer().getViews(), function (v) { return v.constructor == viewType_1; });
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
        var oldView = find(this.getSession().getMcoContainer().getViews(), function (view) {
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
            var keys$$1 = keys(menuItem.item.customAttributes);
            try {
                for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ViewModule = /** @class */ (function () {
    function ViewModule() {
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
    return ViewModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for popup menu component
 */
var PopupMenuComponent = /** @class */ (function (_super) {
    __extends(PopupMenuComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector
     * @param differs
     * @param popupMenuService
     * @param renderer see [[BaseComponent]] constructor
     */
    function PopupMenuComponent(parent, sessionService, elementRef, cd, differs, popupMenuService, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.popupMenuService = popupMenuService;
        _this.menuItems = [];
        _this.menuItemsDiffer = null;
        _this.isShown = false;
        _this.menuItemsDiffer = differs.find([]).create();
        _this.onDocumentClick = function (event) {
            _this.handleDocumentClick(event);
        };
        document.addEventListener("click", _this.onDocumentClick, true);
        return _this;
    }
    Object.defineProperty(PopupMenuComponent.prototype, "hasMenuItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this.menuItems != null && this.menuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Do check lifecycle
     */
    /**
     * Do check lifecycle
     * @return {?}
     */
    PopupMenuComponent.prototype.ngDoCheck = /**
     * Do check lifecycle
     * @return {?}
     */
    function () {
        if (this.menuItemsDiffer.diff(this.menuItems)) {
            this.cd.markForCheck();
        }
    };
    /**
     * After view init lifecycle. Trigger change detection and show this component
     */
    /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    PopupMenuComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        this.cd.detectChanges();
        UiDocument.registerMenuItemElement(this.getId(), /** @type {?} */ (this));
        /** @type {?} */
        var tm = setTimeout(function () {
            clearTimeout(tm);
            _this.show();
        });
    };
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     */
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    PopupMenuComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        UiDocument.unregisterMenuItemElement(this.getId());
        document.removeEventListener("click", this.onDocumentClick, true);
        this.dropdownContainer = null;
        this.dropdown = null;
    };
    /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    PopupMenuComponent.prototype.show = /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    function () {
        this.popupMenuService.setActiveMenu(this.id);
        if (this.dropdown != null) {
            this.dropdown.show();
            this.isShown = true;
            /** @type {?} */
            var position = this.getSession().getMousePosition();
            if (position != null && this.dropdownContainer != null) {
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "left", position.x + "px");
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "top", position.y + "px");
            }
            this.cd.markForCheck();
        }
    };
    /**
     * Hide the popup menu
     * @return {?}
     */
    PopupMenuComponent.prototype.hide = /**
     * Hide the popup menu
     * @return {?}
     */
    function () {
        this.dropdown.hide();
        this.isShown = false;
        this.cd.markForCheck();
        this.popupMenuService.setActiveMenu(null);
    };
    /**
     * Event handler for mouse click
     * @param event
     */
    /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    PopupMenuComponent.prototype.handleDocumentClick = /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isShown === true && !this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    };
    /**
     * Get [[cd]] (Change detector) property
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    PopupMenuComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param event
     */
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    PopupMenuComponent.prototype.dispSubmenu = /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentTarget = event.currentTarget;
        /** @type {?} */
        var currentChildren = currentTarget.children;
        /** @type {?} */
        var parentChildren = currentTarget.parentElement.children;
        for (var i = 0, len = parentChildren.length; i < len; i++) {
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
    };
    /**
     * Set an attribute with value on the menu item
     * @param name Attribute name
     * @param value Attribute value
     */
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    PopupMenuComponent.prototype.setAttribute = /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    function (name, value) {
        this.setCustomAttribute(name, value);
    };
    /**
     * Get the value of an attribute by name
     * @param name Attribute name
     */
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    PopupMenuComponent.prototype.getAttribute = /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    function (name) {
        return this.getCustomAttribute(name);
    };
    /**
     * @return {?}
     */
    PopupMenuComponent.prototype.toJson = /**
     * @return {?}
     */
    function () {
        return _super.prototype.toJson.call(this);
    };
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
    PopupMenuComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: IterableDiffers },
        { type: ContextMenuService },
        { type: Renderer2 }
    ]; };
    PopupMenuComponent.propDecorators = {
        idName: [{ type: Input }],
        dropdown: [{ type: ViewChild, args: ["myDropdown", { read: BsDropdownDirective },] }],
        dropdownContainer: [{ type: ViewChild, args: ["bsDropdownContainer", { read: ElementRef },] }],
        menuItems: [{ type: Input }]
    };
    return PopupMenuComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Menu item directive class. Adds menu dispay and behavior to component
 */
var MenuItemDirective = /** @class */ (function () {
    function MenuItemDirective() {
        this.text = '';
        this.visible = true;
        this.onCommand = new EventEmitter();
    }
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param parentScreenId
     */
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    MenuItemDirective.prototype.toMenuItem = /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (parentScreenId) {
        var _this = this;
        /** @type {?} */
        var menuItem = {
            id: this.id,
            text: this.text,
            menuItems: null,
            onCommand: this.onCommand,
            parentScreenId: parentScreenId,
            display: this.visible
        };
        if (this.subMenuItems != null && this.subMenuItems.length > 0) {
            //filter to remove self then map to MenuItem
            menuItem.menuItems = this.subMenuItems.filter(function (item) { return item !== _this; }).map(function (item) { return item.toMenuItem(parentScreenId); });
        }
        return menuItem;
    };
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
    return MenuItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for menu item component. Child rendered by Menu directive
 */
var MenuItemComponent = /** @class */ (function () {
    /**
     *
     * @param sessionService Injects reference to [[SessionService]] instance
     */
    function MenuItemComponent(sessionService, cd) {
        this.sessionService = sessionService;
        this.cd = cd;
        this.display = true;
        this.onClick = new EventEmitter();
    }
    Object.defineProperty(MenuItemComponent.prototype, "hasMenuItems", {
        /**
         * Check if menu items exist
         * @returns True if [[menuItems]] exists and has 1 or more items
         */
        get: /**
         * Check if menu items exist
         * @return {?} True if [[menuItems]] exists and has 1 or more items
         */
        function () {
            return this.menuItems != null && this.menuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "isDivider", {
        /**
         * Check if this menu item is a separator/divider (i.e. hyphen)
         * @returns True if the menu item text is a hyphen
         */
        get: /**
         * Check if this menu item is a separator/divider (i.e. hyphen)
         * @return {?} True if the menu item text is a hyphen
         */
        function () {
            return this.text === '-';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "menuStyles", {
        /**
         * Get menu item styles map
         * @return Map of styles
         */
        get: /**
         * Get menu item styles map
         * @return {?} Map of styles
         */
        function () {
            return this.item != null ? this.item.styles : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     */
    /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    MenuItemComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Adds menu item to [[UiDocument]]
     * @return {?}
     */
    function () {
        UiDocument.registerMenuItemElement(this.id, this);
    };
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     */
    /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    MenuItemComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove menu item from [[UiDocument]]
     * @return {?}
     */
    function () {
        this.item = null;
        this.menuItems = null;
        UiDocument.unregisterMenuItemElement(this.id);
    };
    /**
     * Set an attribute with value on the menu item
     * @param name Attribute name
     * @param value Attribute value
     */
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    MenuItemComponent.prototype.setAttribute = /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    function (name, value) {
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
    };
    /**
     * Get the value of an attribute by name
     * @param name Attribute name
     */
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    MenuItemComponent.prototype.getAttribute = /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    function (name) {
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
    };
    /**
     * Get value of [[id]] property
     * @returns [[id]] value
     */
    /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    MenuItemComponent.prototype.getId = /**
     * Get value of [[id]] property
     * @return {?} [[id]] value
     */
    function () {
        return this.id;
    };
    /**
     * Get value of [[text]] property
     * @returns [[text]] value
     */
    /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    MenuItemComponent.prototype.getText = /**
     * Get value of [[text]] property
     * @return {?} [[text]] value
     */
    function () {
        return this.text;
    };
    /* istanbul ignore next */
    /**
     * Event handler fro mouseenter event
     * @param event Mouse event
     */
    /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    MenuItemComponent.prototype.handleOnEnter = /**
     * Event handler fro mouseenter event
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param event Mouse event
     */
    /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    MenuItemComponent.prototype.handleMouseEnter = /**
     * Event handler for mouseenter. Focuses the event target
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        event.target.focus();
    };
    /* istanbul ignore next */
    /**
     * Event handler for click.
     * @param event
     * @event OnCommand
     */
    /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    MenuItemComponent.prototype.handleOnClick = /**
     * Event handler for click.
     * \@event OnCommand
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for mousedown event
     * @param event Mouse down event
     */
    /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    MenuItemComponent.prototype.handleMouseDown = /**
     * Event handler for mousedown event
     * @param {?} event Mouse down event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
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
    };
    /**
     * Get JSON representation for this component
     * @returns Object Metadata as JSON
     */
    /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    MenuItemComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?} Object Metadata as JSON
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var json = {};
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
            var keys$$1 = keys(this.item.customAttributes);
            try {
                for (var keys_1 = __values(keys$$1), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    json[key] = KeyUtils.toJsonValue(this.item.customAttributes[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return json;
    };
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param event
     */
    /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    MenuItemComponent.prototype.dispSubmenu = /**
     * Event handler to show the submenu items by adding CSS class
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentTarget = event.currentTarget;
        /** @type {?} */
        var currentChildren = currentTarget.children;
        /** @type {?} */
        var parentChildren = currentTarget.parentElement.children;
        for (var i = 0, len = parentChildren.length; i < len; i++) {
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
    };
    MenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: '[vt-menu-item-comp]',
                    template: "<a *ngIf=\"hasMenuItems && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" tabindex=\"-1\">{{text}}</a>\n<a *ngIf=\"hasMenuItems !== true && display !== false\" id=\"{{id}}\" [ngClass]=\"{'dropdown-item': true}\" [ngStyle]=\"menuStyles\" tabindex=\"-1\" (keydown.enter)=\"handleOnEnter($event)\" (mouseenter)=\"handleMouseEnter($event)\" (mousedown)=\"handleMouseDown($event)\" (click)=\"handleOnClick($event)\">{{text}}</a>\n<ng-template [ngIf]=\"hasMenuItems\">\n  <ul class=\"dropdown-menu popup-menu\" role=\"menu\">\n    <ng-template ngFor [ngForOf]=\"menuItems\" let-subItem>\n      <li *ngIf=\"subItem.text === '-' && subItem.display !== false\" role=\"separator\" class=\"divider\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.menuItems != null && subItem.menuItems.length > 0 && subItem.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n      <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"subItem.text !== '-' && (subItem.menuItems == null || subItem.menuItems.length === 0) && subItem.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"subItem.text\" [id]=\"subItem.id\" [menuItems]=\"subItem.menuItems\" [display]=\"subItem.display\" [item]=\"subItem\" [popupMenuId]=\"popupMenuId\"></li>\n    </ng-template>\n  </ul>\n</ng-template>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    MenuItemComponent.ctorParameters = function () { return [
        { type: SessionService },
        { type: ChangeDetectorRef }
    ]; };
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
    return MenuItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Menu directive class
 */
var MenuDirective = /** @class */ (function (_super) {
    __extends(MenuDirective, _super);
    function MenuDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-menu',
                    providers: [
                        {
                            provide: MenuItemDirective,
                            useExisting: forwardRef(function () { return MenuDirective; })
                        }
                    ]
                },] }
    ];
    return MenuDirective;
}(MenuItemDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for popup menu container
 */
var PopupMenuContainerComponent = /** @class */ (function () {
    /**
     *
     * @param contextMenuService Injects reference to context menu service
     * @param cd Injects change detector reference
     */
    function PopupMenuContainerComponent(contextMenuService, cd) {
        var _this = this;
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.hasPopupMenu = false;
        this.activeMenuSubscription = this.contextMenuService.activeMenuObservable.subscribe(function (activeMenu) {
            _this.setActiveMenu(activeMenu);
        });
    }
    /**
     * Destroy lifecycle. Remove references
     */
    /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    PopupMenuContainerComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove references
     * @return {?}
     */
    function () {
        if (this.activeMenuSubscription != null) {
            this.activeMenuSubscription.unsubscribe();
        }
        this.activeMenuSubscription = null;
        this.activeMenuItems = null;
        this.contextMenuService = null;
    };
    /**
     * Set active menu by id
     * @param id Id of menu to set as active
     */
    /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    PopupMenuContainerComponent.prototype.setActiveMenu = /**
     * Set active menu by id
     * @param {?} id Id of menu to set as active
     * @return {?}
     */
    function (id) {
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
    };
    PopupMenuContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-popup-menu-container',
                    template: "<vt-popup-menu-view *ngIf=\"hasPopupMenu === true\" id=\"{{activeMenuId}}\" [menuItems]=\"activeMenuItems\"></vt-popup-menu-view>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PopupMenuContainerComponent.ctorParameters = function () { return [
        { type: ContextMenuService },
        { type: ChangeDetectorRef }
    ]; };
    PopupMenuContainerComponent.propDecorators = {
        popupMenu: [{ type: ViewChild, args: [PopupMenuComponent,] }]
    };
    return PopupMenuContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Popup menu directive class. Adds context menu items to component
 */
var PopupMenuDirective = /** @class */ (function () {
    /**
     *
     * @param parent
     * @param contextMenuService Injected service for context menu functions
     */
    function PopupMenuDirective(parent, contextMenuService) {
        this.parent = parent;
        this.contextMenuService = contextMenuService;
        this.disabled = false;
        this.visible = true;
        this.text = "";
    }
    /**
     * After view init lifecycle. Initialize submenu items
     */
    /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    PopupMenuDirective.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Initialize submenu items
     * @return {?}
     */
    function () {
        if (this.parent != null && this.parent.getParentView() != null) {
            (/** @type {?} */ (this.parent.getParentView())).registerPopupMenu(this);
        }
        else {
            this.convertSubMenuItems(null);
        }
    };
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     */
    /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    PopupMenuDirective.prototype.getMenuItems = /**
     * Delegate to [[ContextMenuService]] getContextMenuItems method
     * @return {?}
     */
    function () {
        return this.contextMenuService.getContextMenuItems(this.id);
    };
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param parentScreenId Id of parent view component
     */
    /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    PopupMenuDirective.prototype.convertSubMenuItems = /**
     * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
     * @param {?} parentScreenId Id of parent view component
     * @return {?}
     */
    function (parentScreenId) {
        /** @type {?} */
        var menuItems = [];
        if (this.subMenuItems) {
            menuItems = this.subMenuItems.map(function (item) { return item.toMenuItem(parentScreenId); });
        }
        this.contextMenuService.registerContextMenu(this.id, menuItems, parentScreenId);
    };
    PopupMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-popup-menu'
                },] }
    ];
    /** @nocollapse */
    PopupMenuDirective.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }] },
        { type: ContextMenuService }
    ]; };
    PopupMenuDirective.propDecorators = {
        idName: [{ type: Input }],
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        visible: [{ type: Input }],
        text: [{ type: Input }],
        subMenuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }]
    };
    return PopupMenuDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PopupMenuModule = /** @class */ (function () {
    function PopupMenuModule() {
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
    return PopupMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for bottom/right split-pane section
 */
var BottomPaneComponent = /** @class */ (function () {
    function BottomPaneComponent() {
    }
    /**
     * @return {?}
     */
    BottomPaneComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    BottomPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-bottom',
                    template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    BottomPaneComponent.ctorParameters = function () { return []; };
    BottomPaneComponent.propDecorators = {
        content: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return BottomPaneComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for top/left split-pane section
 */
var TopPaneComponent = /** @class */ (function () {
    function TopPaneComponent() {
    }
    /**
     * @return {?}
     */
    TopPaneComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    TopPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-top',
                    template: "<ng-template>\n  <ng-content></ng-content>\n</ng-template>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    TopPaneComponent.ctorParameters = function () { return []; };
    TopPaneComponent.propDecorators = {
        content: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return TopPaneComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class for split resizable panes
 */
var SplitPaneComponent = /** @class */ (function (_super) {
    __extends(SplitPaneComponent, _super);
    /* istanbul ignore next */
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param renderer see [[BaseComponent]] constructor
     * @param zone Inject [[NgZone]] reference
     * @param cd Inject [[ChangeDetectorRef]]
     */
    function SplitPaneComponent(parent, sessionService, elementRef, renderer, zone, cd) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.zone = zone;
        _this.cd = cd;
        /**
         * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
         */
        _this.orientation = 'horizontal';
        /**
         * Where the divider position should be set
         */
        _this.splitPosition = '50%';
        _this._noScroll = false;
        _this.dividerStyles = {};
        _this.topPaneStyles = {};
        _this.bottomPaneStyles = {};
        _this.dividerCssClass = ["split-pane-divider"];
        _this._resizeOn = false;
        _this._prevPos = -1;
        _this._update = false;
        _this._handleMouseMove = throttle(function (event) {
            _this._resizePanels(event);
        }, 150);
        _this._handleMouseDown = function (event) {
            _this.zone.runOutsideAngular(function () {
                document.addEventListener('mousemove', _this._handleMouseMove, true);
            });
            if (_this.orientation === "vertical") {
                _this._prevPos = event.pageX;
            }
            else {
                _this._prevPos = event.pageY;
            }
            _this._resizeOn = true;
            _this._update = false;
        };
        _this._handleMouseUp = function (event) {
            _this.zone.runOutsideAngular(function () {
                document.removeEventListener("mousemove", _this._handleMouseMove, true);
            });
            _this._resizeOn = false;
            _this._update = true;
        };
        return _this;
    }
    Object.defineProperty(SplitPaneComponent.prototype, "noScroll", {
        get: /**
         * @return {?}
         */
        function () { return this._noScroll; },
        /**
         * Set true, in case of cascading split pane
         */
        set: /**
         * Set true, in case of cascading split pane
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._noScroll = value;
            this.topPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
            this.bottomPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * Init lifecycle. Set panel width
     */
    /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    SplitPaneComponent.prototype.ngOnInit = /**
     * Init lifecycle. Set panel width
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.setPaneWidth();
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    SplitPaneComponent.prototype.moveUp = /**
     * @return {?}
     */
    function () {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(100% - 13px)");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "0%");
        }
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    SplitPaneComponent.prototype.moveDown = /**
     * @return {?}
     */
    function () {
        if (this.orientation === 'horizontal') {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px)");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "0%");
        }
        else {
            this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "0%");
            this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(100% - 13px)");
        }
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    SplitPaneComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    /**
     * Set pane layout and dimensions
     * @return {?}
     */
    SplitPaneComponent.prototype.setPaneWidth = /**
     * Set pane layout and dimensions
     * @return {?}
     */
    function () {
        if (this.orientation === 'vertical') {
            this.dividerStyles["height"] = "100%";
            this.dividerStyles["width"] = "1px";
            this.dividerStyles['float'] = 'left';
            this.topPaneStyles['width'] = 'calc(' + this.splitPosition + ' - 3px)';
            this.topPaneStyles['height'] = "100%";
            this.topPaneStyles['float'] = 'left';
            /** @type {?} */
            var percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            var nPercent = +percent;
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
            var percent = this.splitPosition.split('%', 1)[0];
            /** @type {?} */
            var nPercent = +percent;
            this.bottomPaneStyles['height'] = 'calc(' + (100 - nPercent) + '% - 10px)';
            this.bottomPaneStyles['width'] = "100%";
            this.dividerCssClass.push("horizontal");
        }
    };
    /**
     * After view init lifecycle. Add event listeners
     */
    /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    SplitPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Add event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        this.cd.detectChanges();
        this.zone.runOutsideAngular(function () {
            (/** @type {?} */ (_this.splitPaneDivider.nativeElement)).addEventListener("mousedown", _this._handleMouseDown, true);
            document.addEventListener("mouseup", _this._handleMouseUp, true);
        });
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Remove event listeners
     */
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    SplitPaneComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            (/** @type {?} */ (_this.splitPaneDivider.nativeElement)).removeEventListener("mousedown", _this._handleMouseDown, true);
            document.removeEventListener("mouseup", _this._handleMouseUp, true);
            document.removeEventListener("mousemove", _this._handleMouseMove, true);
        });
        this._handleMouseDown = null;
        this._handleMouseMove = null;
        this._handleMouseUp = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    SplitPaneComponent.prototype._resizePanels = /**
     * Event handler for panel resize event
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this._update) {
            if (this._containerWidth == null) {
                /** @type {?} */
                var c = $(this.splitPaneContainer.nativeElement);
                this._containerHeight = c.height();
                this._containerWidth = c.width();
            }
            this._update = true;
            requestAnimationFrame(function () { return _this._doUpdate(event); });
        }
    };
    /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    SplitPaneComponent.prototype._doUpdate = /**
     * Event handler for mouse event. Update pane width/height
     * @param {?} event Mouse event
     * @return {?}
     */
    function (event) {
        if (this._resizeOn === true) {
            if (this.orientation === "vertical") {
                /** @type {?} */
                var diff = this._prevPos - event.pageX;
                /** @type {?} */
                var leftWidth = ($(this.topPaneElement.nativeElement).width() - diff);
                this._containerWidth = $(this.splitPaneContainer.nativeElement).width();
                /** @type {?} */
                var left = (leftWidth / this._containerWidth) * 100;
                /** @type {?} */
                var maximum = (leftWidth / (this._containerWidth - 15)) * 100;
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
                var diff = this._prevPos - event.pageY;
                /** @type {?} */
                var topHeight = ($(this.topPaneElement.nativeElement).height() - diff);
                this._containerHeight = $(this.splitPaneContainer.nativeElement).height();
                /** @type {?} */
                var top_1 = (topHeight / this._containerHeight) * 100;
                /** @type {?} */
                var maximum = (topHeight / (this._containerHeight - 15)) * 100;
                if (maximum > 100)
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px");
                else
                    this.renderer.setStyle(this.topPaneElement.nativeElement, "height", top_1 + "%");
                // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", (this._containerHeight - (topHeight + 10)) + "px");
                this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top_1) + "% - 13px)");
                this._prevPos = event.pageY;
            }
            this._update = false;
        }
    };
    SplitPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-split-pane',
                    template: "<div\n  class=\"vt-split-pane\"\n  id=\"{{id}}\"\n  [ngClass]=\"cssClass\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  #splitPaneContainer\n>\n  <section #topPaneSection class=\"top-pane\" *ngIf=\"topPane != null\" [ngStyle]=\"topPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"topPane.content\" #containerTopTemplate></ng-container>\n  </section>\n  <div #splitPaneDivider [ngClass]=\"dividerCssClass\" [ngStyle]=\"dividerStyles\">\n    <span class=\"arrow left pull-left\" (click)=\"moveDown()\">\u2228</span>\n    <span class=\"arrow center\" style=\"font-size: 10pt;vertical-align: top;\">\uFF1D</span>\n    <span class=\"arrow right pull-right\" (click)=\"moveUp()\">\u2227</span>\n  </div>\n  <section #bottomPaneSection class=\"bottom-pane\" *ngIf=\"bottomPane != null\" [ngStyle]=\"bottomPaneStyles\">\n    <ng-container *ngTemplateOutlet=\"bottomPane.content\" #containerBottomTemplate></ng-container>\n  </section>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return SplitPaneComponent; })
                        }
                    ],
                    styles: [".split-pane-divider{background-image:linear-gradient(#eff1f1,#cad5db);border:1px solid silver;box-sizing:content-box;overflow:hidden}.split-pane-divider .center{margin-left:0}.split-pane-divider.horizontal{margin:0;background:#cecece;background:linear-gradient(to bottom,#eff1f1,#cad5db)}.split-pane-divider.horizontal .arrow{font-size:10px;line-height:8px}.split-pane-divider.horizontal .center{position:relative;left:calc(50% - 9px);font-size:15px}.split-pane-divider.vertical{width:6px!important;height:calc(100% - 12px)!important;margin-top:5px;background:#cecece;background:linear-gradient(to right,#eff1f1,#cad5db)}.split-pane-divider.vertical:hover{cursor:ew-resize}.split-pane-divider.horizontal:hover{cursor:ns-resize}section.top-pane{overflow:auto}"]
                }] }
    ];
    /** @nocollapse */
    SplitPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
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
    return SplitPaneComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SplitPaneModule = /** @class */ (function () {
    function SplitPaneModule() {
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
    return SplitPaneModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
CustomAttribute = /** @class */ (function () {
    function CustomAttribute(parent) {
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    CustomAttribute.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var name = this.getPropertyName();
        /** @type {?} */
        var value = this.getPropertyValue();
        if (this.parent != null && name != null && name !== "") {
            if (value == null) {
                value = "";
            }
            this.parent.setCustomAttribute(name, value);
        }
        else if (this.parent == null) {
            console.error("Unable to set custom property, parent is null");
        }
    };
    return CustomAttribute;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { appInjector, AttributesEnum, BaseComponent, BaseModule, ComponentType, AttributeChangeEvent, AppUtils, ButtonComponent, ButtonModule, CheckboxComponent, CheckboxModule, ClientEvent, ComboBoxComponent, ComboBoxModule, FauxComboElement, DialogComponent, DialogModule, DraggableDirective, EventHandlerModule, EventHandlerService, GridColumnDirective, HorizontalSeparatorModule, HorizontalSeparatorComponent, Integer, JavaModule, JavaUtils, IllegalArgumentException, DateFormat, LabelComponent, LabelModule, LayoutModule, LinkModule, ListBoxDirective, ListItemDirective, Long, McoContainerModule, McoContainerService, MomentUtils, UiDocument, Logger, DynamicModule, DynamicElementBuilder, PanelComponent, RadioButtonComponent, RadioButtonModule, ScrollPaneComponent, ScrollPaneModule, SessionModule, SessionService, StringBuilder, TableComponent, TableModule, TabPaneModule, TabPaneComponent, TabComponent, TextAreaComponent, TextAreaModule, TextFieldComponent, TextFieldModule, TreeTableComponent, TreeTableModule, HTMLElementWrapper, Vector, HashMap, Hashtable, ViewComponent, ViewModule, DynamicPagesService, PopupMenuModule, PopupMenuComponent, MenuItemBuilder, SplitPaneModule, SplitPaneComponent, TopPaneComponent, BottomPaneComponent, KeyboardModule, ArrowNavigatableContainerDirective, ArrowNavigatableItemDirective, CustomAttribute, TableColumnDirective, isIE, OnCreateDirective as ɵb, ClipboardModule as ɵl, ClipboardService as ɵk, DynamicComponent as ɵd, LinkComponent as ɵc, ContextMenuService as ɵa, MenuItemDirective as ɵo, MenuItemComponent as ɵp, MenuDirective as ɵq, PopupMenuContainerComponent as ɵr, PopupMenuDirective as ɵs, TabHostDirective as ɵn, FooterRowDirective as ɵi, HeaderDirective as ɵg, LockedColumnDirective as ɵm, RowDirective as ɵj, TableCellDirective as ɵe, TableHeaderDirective as ɵf, TableRowDefDirective as ɵh };
