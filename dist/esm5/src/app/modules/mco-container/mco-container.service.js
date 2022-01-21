/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { KeyUtils } from '../base/key-utils';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
        this.activeViewsStack = _.uniqBy(this.activeViewsStack, function (v) { return v.uniqueId; });
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
            this.activeViewsStack = _.filter(this.activeViewsStack, function (v) { return v.uniqueId !== view.uniqueId; });
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
            return _.filter(this.activeViewsStack, function (v) { return v.id === /** @type {?} */ (view); }).length > 0;
        }
        return _.filter(this.activeViewsStack, function (v) { return v.uniqueId === view.uniqueId; }).length > 0;
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
        return _.find(this.activeViewsStack, function (view) {
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
        this.activeViewsStack = _.sortBy(this.activeViewsStack, function (view) {
            //we are top view
            if (view.id === topViewId && (screenIndex == null || (screenIndex === view.screenIndex))) {
                return _this.MAX_Z_INDEX;
            }
            return view.zIndex;
        });
        /** @type {?} */
        var isModalActive = false;
        _.forEach(this.activeViewsStack, function (view, idx) {
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
            var i = _.orderBy(existingScreens, function (scr) { return scr.screenIndex; }, "desc")
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
        _.forEach(this.activeViewsStack, function (view) {
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
    /** @nocollapse */ McoContainerService.ngInjectableDef = i0.defineInjectable({ factory: function McoContainerService_Factory() { return new McoContainerService(); }, token: McoContainerService, providedIn: "root" });
    return McoContainerService;
}());
export { McoContainerService };
if (false) {
    /**
     * Keeps internal list of active ViewComponents
     * @type {?}
     */
    McoContainerService.prototype.activeViewsStack;
    /** @type {?} */
    McoContainerService.prototype.actionForwardHandler;
    /**
     * Internal map of MCO instances
     * @type {?}
     */
    McoContainerService.prototype._mcoMap;
    /** @type {?} */
    McoContainerService.prototype.MIN_Z_INDEX;
    /** @type {?} */
    McoContainerService.prototype.MAX_Z_INDEX;
    /** @type {?} */
    McoContainerService.prototype.viewsChanged;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNvLWNvbnRhaW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tY28tY29udGFpbmVyL21jby1jb250YWluZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFN0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztnQ0FVb0IsRUFBRTs7Ozt1QkFRZixJQUFJLEdBQUcsRUFBZTsyQkFDM0IsSUFBSTsyQkFDSixLQUFLOzs0QkFHckIsSUFBSSxPQUFPLEVBQW9COztJQUU5Qzs7O09BR0c7Ozs7OztJQUNILG9DQUFNOzs7OztJQUFOLFVBQU8sT0FBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNyRDtJQUVEOztPQUVHOzs7OztJQUNILDBDQUFZOzs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsb0NBQU07Ozs7OztJQUFOLFVBQU8sT0FBZSxFQUFFLEdBQVE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDaEM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gseUNBQVc7Ozs7OztJQUFYLFVBQVksT0FBZSxFQUFFLEdBQVE7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMs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LENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLFlBQVk7UUFGbkMsQ0FFbUMsQ0FDcEMsQ0FBQztRQUNGLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBQzlCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQUMsR0FBa0IsSUFBRyxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQWYsQ0FBZSxFQUFFLE1BQU0sQ0FBQztpQkFDaEYsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFBO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQUk7WUFDSCxPQUFPLENBQUMsQ0FBQztTQUNWO0tBQ0Y7Ozs7SUFFRCwrQ0FBaUI7OztJQUFqQjs7UUFDRSxJQUFJLGFBQWEsR0FBWSxLQUFLLENBQUM7UUFFbkMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxJQUFtQjtZQUNuRCxJQUFJLGFBQWEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDM0QsYUFBYSxHQUFHLElBQUksQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLGFBQWEsRUFBRSxhQUFhO1NBQzdCLENBQUMsQ0FBQztLQUNKOztnQkFwV0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OzhCQVREOztTQVVhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleVV0aWxzIH0gZnJvbSAnLi4vYmFzZS9rZXktdXRpbHMnO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gJy4uL3ZpZXcvdmlldy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVmlld0NoYW5nZWRFdmVudCB9IGZyb20gJy4vdmlldy1jaGFuZ2VkLmV2ZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTWNvQ29udGFpbmVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBLZWVwcyBpbnRlcm5hbCBsaXN0IG9mIGFjdGl2ZSBWaWV3Q29tcG9uZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBhY3RpdmVWaWV3c1N0YWNrOiBBcnJheTxWaWV3Q29tcG9uZW50PiA9IFtdO1xuXG4gIC8vc3RvcmVkIGFjdGlvbkZvcndhcmRIYW5kbGVyIChlLmcuIGEgc3ViIHZpZXcpIHRoYXQgZG9lcyBub3QgaGF2ZSBhbiBOWE1MXG4gIHByaXZhdGUgYWN0aW9uRm9yd2FyZEhhbmRsZXI6IE1hcDxzdHJpbmcsIFZpZXdDb21wb25lbnQ+O1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBtYXAgb2YgTUNPIGluc3RhbmNlc1xuICAgKi9cbiAgcHJpdmF0ZSBfbWNvTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBNSU5fWl9JTkRFWCA9IDEwMDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgTUFYX1pfSU5ERVggPSA5OTk5OTtcbiAgLy8xMDUwIGlzIGZvciBhY3R1YWwgbW9kYWxcblxuICB2aWV3c0NoYW5nZWQgPSBuZXcgU3ViamVjdDxWaWV3Q2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBHZXQgbWNvIGluc3RhbmNlIGZyb20gaW50ZXJuYWwgW1tfbWNvTWFwXV1cbiAgICogQHBhcmFtIG1jb05hbWUgTmFtZSBvZiBNQ08gaW5zdGFuY2VcbiAgICovXG4gIGdldE1jbyhtY29OYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tY29NYXAuZ2V0KEtleVV0aWxzLnRvTWFwS2V5KG1jb05hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1heGltdW0gYWxsb3dlZCB6LWluZGV4IHZhbHVlIGZvciBsYXllcmluZyB3aW5kb3dzXG4gICAqL1xuICBnZXRNYXhaSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5NQVhfWl9JTkRFWDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiBbW3JlZ2lzdGVyTWNvXV1cbiAgICogQHBhcmFtIG1jb05hbWVcbiAgICogQHBhcmFtIG1jb1xuICAgKi9cbiAgYWRkTWNvKG1jb05hbWU6IHN0cmluZywgbWNvOiBhbnkpIHtcbiAgICB0aGlzLnJlZ2lzdGVyTWNvKG1jb05hbWUsIG1jbyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIG1jbyBpbnN0YW5jZSB0byBpbnRlcm5hbCBbW19tY29NYXBdXVxuICAgKiBAcGFyYW0gbWNvTmFtZVxuICAgKiBAcGFyYW0gbWNvXG4gICAqL1xuICByZWdpc3Rlck1jbyhtY29OYW1lOiBzdHJpbmcsIG1jbzogYW55KSB7XG4gICAgdGhpcy5fbWNvTWFwLnNldChLZXlVdGlscy50b01hcEtleShtY29OYW1lKSwgbWNvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbWNvIG9iamVjdCBmcm9tIGludGVybmFsIFtbX21jb01hcF1dXG4gICAqIEBwYXJhbSBtY29OYW1lIE5hbWUgb2YgbWNvIGluc3RhbmNlIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlTWNvKG1jb05hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGtleSA9IEtleVV0aWxzLnRvTWFwS2V5KG1jb05hbWUpO1xuICAgIGNvbnN0IG1jbyA9IHRoaXMuX21jb01hcC5nZXQoa2V5KTtcblxuICAgIGlmIChtY28gIT0gbnVsbCAmJiB0eXBlb2YgbWNvW1wiY2xlYW51cFwiXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBtY28uY2xlYW51cCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21jb01hcC5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoIHZpZXcgdG8gdGhlIGxhc3QgYWN0aXZlIHZpZXcgc3RhY2suIFRoaXMgd2lsbCBiZSB0aGUgdmlldyB0aGF0IHJldHVybmVkXG4gICAqIHdoZW4gcG9wTGFzdEFjdGl2ZVZpZXcgaXMgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0gdmlldyBWaWV3Q29tcG9uZW50IHRvIGJlIGFkZCB0byB0aGUgc3RhY2tcbiAgICovXG4gIHJlZ2lzdGVyVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50KSB7XG4gICAgaWYgKHZpZXcuY2FuQmVBY3RpdmVWaWV3ICE9PSB0cnVlKSB7XG4gICAgICAvLyB0aGlzLmFjdGl2ZVZpZXdzU3RhY2suc3BsaWNlKDAsIDAsIHZpZXcpO1xuICAgICAgLy8gdmlldy56SW5kZXggPSB0aGlzLk1JTl9aX0lOREVYIC0gdGhpcy5hY3RpdmVWaWV3c0NvdW50KCk7XG4gICAgICBpZiAodGhpcy5hY3Rpb25Gb3J3YXJkSGFuZGxlciA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uRm9yd2FyZEhhbmRsZXIgPSBuZXcgTWFwPHN0cmluZywgVmlld0NvbXBvbmVudD4oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aW9uRm9yd2FyZEhhbmRsZXIuc2V0KHZpZXcuYWN0aW9uRm9yd2FyZE5hbWUsIHZpZXcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVZpZXdzU3RhY2sucHVzaCh2aWV3KTtcbiAgICAgIHZpZXcuekluZGV4ID0gdGhpcy5nZXRWaWV3WkluZGV4KCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVWaWV3c1N0YWNrID0gXy51bmlxQnkodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodik9PnYudW5pcXVlSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvcCBsYXN0IGFjdGl2ZSB2aWV3LiBUaGlzIHdpbGwgcmVtb3ZlIHRoZSB2aWV3IGZyb20gdGhlIGFjdGl2ZSBzdGFja1xuICAgKi9cbiAgcG9wTGFzdEFjdGl2ZVZpZXcoKTogVmlld0NvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlld3NTdGFjay5wb3AoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSB2aWV3IHRoYXQgaGFzIGJlZW4gZGVzdHJveWVkIGZyb20gdGhlIHN0YWNrLlxuICAgKlxuICAgKiBAcGFyYW0gdmlldyBWaWV3Q29tcG9uZW50IHRvIGJlIHJlbW92ZWQgZnJvbSBzdGFja1xuICAgKi9cbiAgcmVtb3ZlVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50KSB7XG4gICAgaWYgKHZpZXcuY2FuQmVBY3RpdmVWaWV3ICE9PSB0cnVlKXtcbiAgICAgIGlmICh0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25Gb3J3YXJkSGFuZGxlci5kZWxldGUodmlldy5hY3Rpb25Gb3J3YXJkTmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlVmlld3NTdGFjayA9IF8uZmlsdGVyKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHYpPT52LnVuaXF1ZUlkICE9PSB2aWV3LnVuaXF1ZUlkKTtcbiAgICAgIHRoaXMucmVTdGFja1ZpZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWluaW1pemUgYSB2aWV3IHdpbmRvdyBieSBJRFxuICAgKiBAcGFyYW0gdmlld0lkIElkIG9mIHZpZXcgdG8gbWluaW1pemVcbiAgICogQHBhcmFtIHNjcmVlbkluZGV4IChvcHRpb25hbCkgaW5kZXggb2Ygc2NyZWVuIGlmIG11bHRpIHNjcmVlbiBzdXBwb3J0IGlzIGFsbG93ZWRcbiAgICovXG4gIG1pbmltaXplVmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuaXNNaW5pbWl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBhY3RpdmVWaWV3OiBWaWV3Q29tcG9uZW50ID0gbnVsbDtcbiAgICBsZXQgaXNNb2RhbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlVmlld3NDb3VudCgpID4gMSkge1xuICAgICAgY29uc3QgdmlzaWJsZVZpZXdzID0gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmZpbHRlcih2PT52LmlzTWluaW1pemVkICE9PSB0cnVlICYmIHYuc2tpcEJyZWFkQ3J1bWIgIT09IHRydWUpO1xuXG4gICAgICBpZiAodmlzaWJsZVZpZXdzICE9IG51bGwgJiYgdmlzaWJsZVZpZXdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlVmlldyA9IHZpc2libGVWaWV3c1t2aXNpYmxlVmlld3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBpID0gdmlzaWJsZVZpZXdzLmxlbmd0aCAtIDE7XG4gICAgICAgIC8vIEl0dGVyYXRlIHRocm91Z2ggdmlzaWJpbGUgdmlld3MgdG8gbG9vayBmb3IgdGhlIG5leHQgZGlhbG9nIHZpZXcgKG5vdCBzdWJ2aWV3KVxuICAgICAgICB3aGlsZSAodmlzaWJsZVZpZXdzW2ldICYmICFhY3RpdmVWaWV3LmRpYWxvZykge1xuICAgICAgICAgIGFjdGl2ZVZpZXcgPSB2aXNpYmxlVmlld3NbaV1cbiAgICAgICAgICBpLS07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpZiAodmlzaWJsZVZpZXdzW2NvdW50XSkge1xuICAgICAgICAgICAgaXNNb2RhbEFjdGl2ZSA9IHZpc2libGVWaWV3c1tjb3VudF0uaXNNb2RhbERpYWxvZygpO1xuICAgICAgICAgICAgY291bnQgPSBjb3VudCArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIGNvdW50IDwgdmlzaWJsZVZpZXdzLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiBhY3RpdmVWaWV3LFxuICAgICAgbWluTWF4RXZlbnQ6IHRydWUsXG4gICAgICBpc01vZGFsQWN0aXZlOiBpc01vZGFsQWN0aXZlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgYSB2aWV3IGJ5IGlkXG4gICAqIEBwYXJhbSB2aWV3SWQgSWQgb2YgdmlldyB0byBzaG93XG4gICAqIEBwYXJhbSBzY3JlZW5JbmRleCAob3B0aW9uYWwpIGluZGV4IG9mIHNjcmVlbiBpZiBtdWx0aSBzY3JlZW4gc3VwcG9ydCBpcyBhbGxvd2VkXG4gICAqL1xuICBzaG93Vmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuaXNNaW5pbWl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBpc01vZGFsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZG8ge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlVmlld3NTdGFja1tjb3VudF0pIHtcbiAgICAgICAgaXNNb2RhbEFjdGl2ZSA9IHRoaXMuYWN0aXZlVmlld3NTdGFja1tjb3VudF0uaXNNb2RhbERpYWxvZygpO1xuICAgICAgICBjb3VudCA9IGNvdW50ICsgMTtcbiAgICAgIH1cbiAgICB9IHdoaWxlIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIGNvdW50IDwgdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCk7XG5cbiAgICB0aGlzLnZpZXdzQ2hhbmdlZC5uZXh0KHtcbiAgICAgIHZpZXdzOiB0aGlzLmdldEJyZWFkY3J1bWIodGhpcy5hY3RpdmVWaWV3c1N0YWNrKSxcbiAgICAgIGFjdGl2ZVZpZXc6IHZpZXcsXG4gICAgICBtaW5NYXhFdmVudDogdHJ1ZSxcbiAgICAgIGlzTW9kYWxBY3RpdmU6IGlzTW9kYWxBY3RpdmVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgdmlldyB3aW5kb3dcbiAgICogQHBhcmFtIHZpZXdJZCBJZCBvZiB2aWV3IHRvIGNsb3NlXG4gICAqIEBwYXJhbSBzY3JlZW5JbmRleCAob3B0aW9uYWwpIGluZGV4IG9mIHRoZSBzY3JlZW4gaWYgbXVsdGkgc2NyZWVuIHN1cHBvcnRcbiAgICovXG4gIGNsb3NlVmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBudW1iZXIgb2YgY3VycmVudCBhY3RpdmUgdmlldyBmcm9tIFtbYWN0aXZlVmlld3NTdGFja11dXG4gICAqIEByZXR1cm5zIE51bWJlciBvZiBhY3RpdmUgdmlld3NcbiAgICovXG4gIGFjdGl2ZVZpZXdzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0byBzZWUgaWYgYSB2aWV3IGlzIGluIHRoZSBbW2FjdGl2ZVZpZXdTdGFja11dXG4gICAqIEBwYXJhbSB2aWV3IFZpZXdDb21wb25lbnQncyBpZCBhcyBhIHN0cmluZyBvciBbW1ZpZXdDb21wb25lbnRdXSBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2aWV3IGNvbXBvbmVudCBpcyBpbiB0aGUgW1thY3RpdmVWaWV3U3RhY2tdXVxuICAgKi9cbiAgaGFzVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50IHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB2aWV3ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIF8uZmlsdGVyKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHYpPT52LmlkID09PSB2aWV3IGFzIHN0cmluZykubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5maWx0ZXIodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodik9PnYudW5pcXVlSWQgPT09IHZpZXcudW5pcXVlSWQpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IGFjdGl2ZSB2aWV3XG4gICAqIEByZXR1cm5zIHRoZSBhY3RpdmUgdmlldyBmcm9tIHRoZSB2aWV3IHN0YWNrXG4gICAqL1xuICBhY3RpdmVWaWV3KCk6IFZpZXdDb21wb25lbnQge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXdzQ291bnQoKSA+IDAgPyB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c0NvdW50KCkgLSAxXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmlldyBmcm9tIFtbYWN0cml2ZVZpZXdTdGFja11dIGJ5IElEXG4gICAqIEBwYXJhbSB2aWV3SWQgVmlld3MgaWQgdmFsdWVcbiAgICogQHBhcmFtIHNjcmVlbkluZGV4IChvcHRpb25hbCkgdGhlIHNjcmVlbkluZGV4IG9mIHRoZSB2aWV3IChpZiBtdWx0aXBsZSBzY3JlZW4gaXMgYWxsb3cpXG4gICAqIEByZXR1cm5zIFZpZXcgdGhhdCBtYXRjaGVzIHZhbHVlIG9mIGlkXG4gICAqL1xuICBnZXRWaWV3QnlJZCh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpOiBWaWV3Q29tcG9uZW50IHtcbiAgICByZXR1cm4gXy5maW5kKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHZpZXc6IFZpZXdDb21wb25lbnQpPT57XG4gICAgICByZXR1cm4gdmlldy5pZCA9PT0gdmlld0lkICYmIChzY3JlZW5JbmRleCA9PSBudWxsIHx8IChzY3JlZW5JbmRleCAhPSBudWxsICYmIHZpZXcuc2NyZWVuSW5kZXggPT09IHNjcmVlbkluZGV4KSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGhhbmRsZXIgdmlldyBjb21wb25lbnQgYnkgbmFtZVxuICAgKiBAcGFyYW0gYWN0aW9uRm9yd2FyZE5hbWVcbiAgICogQHJldHVybnMgVmlldyBjb21wb25lbnQgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBjb21wb25lbnQgd2l0aCBhY3Rpb25Gb3J3YXJkTmFtZVxuICAgKi9cbiAgZ2V0QWN0aW9uRm9yd2FyZEhhbmRsZXIoYWN0aW9uRm9yd2FyZE5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyLmdldChhY3Rpb25Gb3J3YXJkTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBbW2FjdGlvbkZvcndhcmRIYW5kbGVyXV1cbiAgICovXG4gIGdldEFjdGlvbkZvcndhcmRIYW5kbGVyTWFwKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1thY3RpdmVWaWV3U3RhY2tdXVxuICAgKi9cbiAgZ2V0Vmlld3MoKTogQXJyYXk8Vmlld0NvbXBvbmVudD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2s7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHotaW5kZXggKGxheWVyIHBvc2l0aW9uKSBvZiBhbGwgYWN0aXZlIHZpZXdzXG4gICAqIEBwYXJhbSB0b3BWaWV3SWQgSUQgb2YgdmlldyBjb21wb25lbnQgdG8gc2V0IG1heCB6LWluZGV4ICh0b3ApXG4gICAqL1xuICByZVN0YWNrVmlldyh0b3BWaWV3SWQ6IHN0cmluZyA9IG51bGwsIHNjcmVlbkluZGV4OiBudW1iZXIgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmVWaWV3c1N0YWNrID0gXy5zb3J0QnkodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodmlldzogVmlld0NvbXBvbmVudCk9PntcbiAgICAgIC8vd2UgYXJlIHRvcCB2aWV3XG4gICAgICBpZiAodmlldy5pZCA9PT0gdG9wVmlld0lkICYmIChzY3JlZW5JbmRleCA9PSBudWxsIHx8IChzY3JlZW5JbmRleCA9PT0gdmlldy5zY3JlZW5JbmRleCkpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLk1BWF9aX0lOREVYO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmlldy56SW5kZXg7XG4gICAgfSk7XG5cbiAgICBsZXQgaXNNb2RhbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgXy5mb3JFYWNoKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHZpZXc6IFZpZXdDb21wb25lbnQsIGlkeDogbnVtYmVyKT0+e1xuICAgICAgdmlldy51cGRhdGVaSW5kZXgodGhpcy5NSU5fWl9JTkRFWCArIGlkeCk7XG5cbiAgICAgIGlmIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIHZpZXcuaXNNb2RhbERpYWxvZygpID09PSB0cnVlKSB7XG4gICAgICAgIGlzTW9kYWxBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCAtIDFdLFxuICAgICAgaXNNb2RhbEFjdGl2ZTogaXNNb2RhbEFjdGl2ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgei1pbmRleFxuICAgKi9cbiAgZ2V0Vmlld1pJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLk1JTl9aX0lOREVYICsgdGhpcy5hY3RpdmVWaWV3c0NvdW50KCk7XG4gIH1cblxuICBwcml2YXRlIGdldEJyZWFkY3J1bWIodmlld3M6IEFycmF5PFZpZXdDb21wb25lbnQ+KTogQXJyYXk8Vmlld0NvbXBvbmVudD4ge1xuICAgIHJldHVybiB2aWV3cy5maWx0ZXIodj0+di5za2lwQnJlYWRDcnVtYiAhPT0gdHJ1ZSAmJiB2LmRpYWxvZyAhPSBudWxsICYmIHYudmlzaWJsZSAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2Vzc2lvbiBmcm9tIGFuIE1DTyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbWNvXG4gICAqIEByZXR1cm5zIFNlc3Npb25cbiAgICovXG4gIHN0YXRpYyBnZXRDbGllbnRTZXNzaW9uRnJvbU1jbyhtY286IGFueSkge1xuICAgIHJldHVybiBtY28uZ2V0U2Vzc2lvbigpO1xuICB9XG4gIC8qKlxuICAgKiDmrKHjga5zY3JlZW5JbmRleOOCkuWPluW+l+OBl+OBvuOBmeOAglxuICAgKiBzY3JlZW5JbmRleOOBrzF+OOOBruWApOOCkuOBqOOCi+OCiOOBhuOBq+OAgeOCteODvOODkOOBp+aDs+WumuOBleOCjOOBpuOBhOOBvuOBmeOAglxuICAgKi9cbiAgbmV4dFNjcmVlbkluZGV4KGJhc2VTY3JlZW5JZDpzdHJpbmcsIGlkOnN0cmluZyA9IG51bGwpOiBudW1iZXJ7XG4gICAgY29uc3QgZXhpc3RpbmdTY3JlZW5zID0gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmZpbHRlcih2PT5cbiAgICAgIChpZClcbiAgICAgICAgPyB2LmlkID09PSBpZFxuICAgICAgICA6IHYuYmFzZVNjcmVlbklkID09PSBiYXNlU2NyZWVuSWRcbiAgICApO1xuICAgIGlmIChleGlzdGluZ1NjcmVlbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaSA9IF8ub3JkZXJCeShleGlzdGluZ1NjcmVlbnMsIChzY3I6IFZpZXdDb21wb25lbnQpPT5zY3Iuc2NyZWVuSW5kZXgsIFwiZGVzY1wiKVxuICAgICAgICAucG9wKCkuc2NyZWVuSW5kZXhcbiAgICAgIHJldHVybiBpICsgMTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2hCcmVhZENydW1iKCkge1xuICAgIGxldCBpc01vZGFsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfLmZvckVhY2godGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodmlldzogVmlld0NvbXBvbmVudCk9PntcbiAgICAgIGlmIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIHZpZXcuaXNNb2RhbERpYWxvZygpID09PSB0cnVlKSB7XG4gICAgICAgIGlzTW9kYWxBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCAtIDFdLFxuICAgICAgaXNNb2RhbEFjdGl2ZTogaXNNb2RhbEFjdGl2ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=