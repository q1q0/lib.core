/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { KeyUtils } from '../base/key-utils';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class McoContainerService {
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
        this.activeViewsStack = _.uniqBy(this.activeViewsStack, (v) => v.uniqueId);
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
            this.activeViewsStack = _.filter(this.activeViewsStack, (v) => v.uniqueId !== view.uniqueId);
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
            return _.filter(this.activeViewsStack, (v) => v.id === /** @type {?} */ (view)).length > 0;
        }
        return _.filter(this.activeViewsStack, (v) => v.uniqueId === view.uniqueId).length > 0;
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
        return _.find(this.activeViewsStack, (view) => {
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
        this.activeViewsStack = _.sortBy(this.activeViewsStack, (view) => {
            //we are top view
            if (view.id === topViewId && (screenIndex == null || (screenIndex === view.screenIndex))) {
                return this.MAX_Z_INDEX;
            }
            return view.zIndex;
        });
        /** @type {?} */
        let isModalActive = false;
        _.forEach(this.activeViewsStack, (view, idx) => {
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
            const i = _.orderBy(existingScreens, (scr) => scr.screenIndex, "desc")
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
        _.forEach(this.activeViewsStack, (view) => {
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
/** @nocollapse */ McoContainerService.ngInjectableDef = i0.defineInjectable({ factory: function McoContainerService_Factory() { return new McoContainerService(); }, token: McoContainerService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNvLWNvbnRhaW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9tY28tY29udGFpbmVyL21jby1jb250YWluZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFN0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNL0IsTUFBTTs7Ozs7Z0NBSTZDLEVBQUU7Ozs7dUJBUWYsSUFBSSxHQUFHLEVBQWU7MkJBQzNCLElBQUk7MkJBQ0osS0FBSzs7NEJBR3JCLElBQUksT0FBTyxFQUFvQjs7Ozs7OztJQU05QyxNQUFNLENBQUMsT0FBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNyRDs7Ozs7SUFLRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3pCOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLE9BQWUsRUFBRSxHQUFRO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLE9BQWUsRUFBRSxHQUFRO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbkQ7Ozs7OztJQU1ELFNBQVMsQ0FBQyxPQUFlOztRQUN2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9B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Z0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNuRSxhQUFhLEVBQUUsYUFBYTtTQUM3QixDQUFDLENBQUM7S0FDSjs7O1lBcFdGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtleVV0aWxzIH0gZnJvbSAnLi4vYmFzZS9rZXktdXRpbHMnO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gJy4uL3ZpZXcvdmlldy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVmlld0NoYW5nZWRFdmVudCB9IGZyb20gJy4vdmlldy1jaGFuZ2VkLmV2ZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTWNvQ29udGFpbmVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBLZWVwcyBpbnRlcm5hbCBsaXN0IG9mIGFjdGl2ZSBWaWV3Q29tcG9uZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBhY3RpdmVWaWV3c1N0YWNrOiBBcnJheTxWaWV3Q29tcG9uZW50PiA9IFtdO1xuXG4gIC8vc3RvcmVkIGFjdGlvbkZvcndhcmRIYW5kbGVyIChlLmcuIGEgc3ViIHZpZXcpIHRoYXQgZG9lcyBub3QgaGF2ZSBhbiBOWE1MXG4gIHByaXZhdGUgYWN0aW9uRm9yd2FyZEhhbmRsZXI6IE1hcDxzdHJpbmcsIFZpZXdDb21wb25lbnQ+O1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBtYXAgb2YgTUNPIGluc3RhbmNlc1xuICAgKi9cbiAgcHJpdmF0ZSBfbWNvTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBNSU5fWl9JTkRFWCA9IDEwMDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgTUFYX1pfSU5ERVggPSA5OTk5OTtcbiAgLy8xMDUwIGlzIGZvciBhY3R1YWwgbW9kYWxcblxuICB2aWV3c0NoYW5nZWQgPSBuZXcgU3ViamVjdDxWaWV3Q2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBHZXQgbWNvIGluc3RhbmNlIGZyb20gaW50ZXJuYWwgW1tfbWNvTWFwXV1cbiAgICogQHBhcmFtIG1jb05hbWUgTmFtZSBvZiBNQ08gaW5zdGFuY2VcbiAgICovXG4gIGdldE1jbyhtY29OYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tY29NYXAuZ2V0KEtleVV0aWxzLnRvTWFwS2V5KG1jb05hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1heGltdW0gYWxsb3dlZCB6LWluZGV4IHZhbHVlIGZvciBsYXllcmluZyB3aW5kb3dzXG4gICAqL1xuICBnZXRNYXhaSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5NQVhfWl9JTkRFWDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBvZiBbW3JlZ2lzdGVyTWNvXV1cbiAgICogQHBhcmFtIG1jb05hbWVcbiAgICogQHBhcmFtIG1jb1xuICAgKi9cbiAgYWRkTWNvKG1jb05hbWU6IHN0cmluZywgbWNvOiBhbnkpIHtcbiAgICB0aGlzLnJlZ2lzdGVyTWNvKG1jb05hbWUsIG1jbyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIG1jbyBpbnN0YW5jZSB0byBpbnRlcm5hbCBbW19tY29NYXBdXVxuICAgKiBAcGFyYW0gbWNvTmFtZVxuICAgKiBAcGFyYW0gbWNvXG4gICAqL1xuICByZWdpc3Rlck1jbyhtY29OYW1lOiBzdHJpbmcsIG1jbzogYW55KSB7XG4gICAgdGhpcy5fbWNvTWFwLnNldChLZXlVdGlscy50b01hcEtleShtY29OYW1lKSwgbWNvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbWNvIG9iamVjdCBmcm9tIGludGVybmFsIFtbX21jb01hcF1dXG4gICAqIEBwYXJhbSBtY29OYW1lIE5hbWUgb2YgbWNvIGluc3RhbmNlIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlTWNvKG1jb05hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGtleSA9IEtleVV0aWxzLnRvTWFwS2V5KG1jb05hbWUpO1xuICAgIGNvbnN0IG1jbyA9IHRoaXMuX21jb01hcC5nZXQoa2V5KTtcblxuICAgIGlmIChtY28gIT0gbnVsbCAmJiB0eXBlb2YgbWNvW1wiY2xlYW51cFwiXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBtY28uY2xlYW51cCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21jb01hcC5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoIHZpZXcgdG8gdGhlIGxhc3QgYWN0aXZlIHZpZXcgc3RhY2suIFRoaXMgd2lsbCBiZSB0aGUgdmlldyB0aGF0IHJldHVybmVkXG4gICAqIHdoZW4gcG9wTGFzdEFjdGl2ZVZpZXcgaXMgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0gdmlldyBWaWV3Q29tcG9uZW50IHRvIGJlIGFkZCB0byB0aGUgc3RhY2tcbiAgICovXG4gIHJlZ2lzdGVyVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50KSB7XG4gICAgaWYgKHZpZXcuY2FuQmVBY3RpdmVWaWV3ICE9PSB0cnVlKSB7XG4gICAgICAvLyB0aGlzLmFjdGl2ZVZpZXdzU3RhY2suc3BsaWNlKDAsIDAsIHZpZXcpO1xuICAgICAgLy8gdmlldy56SW5kZXggPSB0aGlzLk1JTl9aX0lOREVYIC0gdGhpcy5hY3RpdmVWaWV3c0NvdW50KCk7XG4gICAgICBpZiAodGhpcy5hY3Rpb25Gb3J3YXJkSGFuZGxlciA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uRm9yd2FyZEhhbmRsZXIgPSBuZXcgTWFwPHN0cmluZywgVmlld0NvbXBvbmVudD4oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aW9uRm9yd2FyZEhhbmRsZXIuc2V0KHZpZXcuYWN0aW9uRm9yd2FyZE5hbWUsIHZpZXcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVZpZXdzU3RhY2sucHVzaCh2aWV3KTtcbiAgICAgIHZpZXcuekluZGV4ID0gdGhpcy5nZXRWaWV3WkluZGV4KCk7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVWaWV3c1N0YWNrID0gXy51bmlxQnkodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodik9PnYudW5pcXVlSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvcCBsYXN0IGFjdGl2ZSB2aWV3LiBUaGlzIHdpbGwgcmVtb3ZlIHRoZSB2aWV3IGZyb20gdGhlIGFjdGl2ZSBzdGFja1xuICAgKi9cbiAgcG9wTGFzdEFjdGl2ZVZpZXcoKTogVmlld0NvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlld3NTdGFjay5wb3AoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSB2aWV3IHRoYXQgaGFzIGJlZW4gZGVzdHJveWVkIGZyb20gdGhlIHN0YWNrLlxuICAgKlxuICAgKiBAcGFyYW0gdmlldyBWaWV3Q29tcG9uZW50IHRvIGJlIHJlbW92ZWQgZnJvbSBzdGFja1xuICAgKi9cbiAgcmVtb3ZlVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50KSB7XG4gICAgaWYgKHZpZXcuY2FuQmVBY3RpdmVWaWV3ICE9PSB0cnVlKXtcbiAgICAgIGlmICh0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25Gb3J3YXJkSGFuZGxlci5kZWxldGUodmlldy5hY3Rpb25Gb3J3YXJkTmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlVmlld3NTdGFjayA9IF8uZmlsdGVyKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHYpPT52LnVuaXF1ZUlkICE9PSB2aWV3LnVuaXF1ZUlkKTtcbiAgICAgIHRoaXMucmVTdGFja1ZpZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWluaW1pemUgYSB2aWV3IHdpbmRvdyBieSBJRFxuICAgKiBAcGFyYW0gdmlld0lkIElkIG9mIHZpZXcgdG8gbWluaW1pemVcbiAgICogQHBhcmFtIHNjcmVlbkluZGV4IChvcHRpb25hbCkgaW5kZXggb2Ygc2NyZWVuIGlmIG11bHRpIHNjcmVlbiBzdXBwb3J0IGlzIGFsbG93ZWRcbiAgICovXG4gIG1pbmltaXplVmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuaXNNaW5pbWl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBhY3RpdmVWaWV3OiBWaWV3Q29tcG9uZW50ID0gbnVsbDtcbiAgICBsZXQgaXNNb2RhbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlVmlld3NDb3VudCgpID4gMSkge1xuICAgICAgY29uc3QgdmlzaWJsZVZpZXdzID0gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmZpbHRlcih2PT52LmlzTWluaW1pemVkICE9PSB0cnVlICYmIHYuc2tpcEJyZWFkQ3J1bWIgIT09IHRydWUpO1xuXG4gICAgICBpZiAodmlzaWJsZVZpZXdzICE9IG51bGwgJiYgdmlzaWJsZVZpZXdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlVmlldyA9IHZpc2libGVWaWV3c1t2aXNpYmxlVmlld3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBpID0gdmlzaWJsZVZpZXdzLmxlbmd0aCAtIDE7XG4gICAgICAgIC8vIEl0dGVyYXRlIHRocm91Z2ggdmlzaWJpbGUgdmlld3MgdG8gbG9vayBmb3IgdGhlIG5leHQgZGlhbG9nIHZpZXcgKG5vdCBzdWJ2aWV3KVxuICAgICAgICB3aGlsZSAodmlzaWJsZVZpZXdzW2ldICYmICFhY3RpdmVWaWV3LmRpYWxvZykge1xuICAgICAgICAgIGFjdGl2ZVZpZXcgPSB2aXNpYmxlVmlld3NbaV1cbiAgICAgICAgICBpLS07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpZiAodmlzaWJsZVZpZXdzW2NvdW50XSkge1xuICAgICAgICAgICAgaXNNb2RhbEFjdGl2ZSA9IHZpc2libGVWaWV3c1tjb3VudF0uaXNNb2RhbERpYWxvZygpO1xuICAgICAgICAgICAgY291bnQgPSBjb3VudCArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIGNvdW50IDwgdmlzaWJsZVZpZXdzLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiBhY3RpdmVWaWV3LFxuICAgICAgbWluTWF4RXZlbnQ6IHRydWUsXG4gICAgICBpc01vZGFsQWN0aXZlOiBpc01vZGFsQWN0aXZlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgYSB2aWV3IGJ5IGlkXG4gICAqIEBwYXJhbSB2aWV3SWQgSWQgb2YgdmlldyB0byBzaG93XG4gICAqIEBwYXJhbSBzY3JlZW5JbmRleCAob3B0aW9uYWwpIGluZGV4IG9mIHNjcmVlbiBpZiBtdWx0aSBzY3JlZW4gc3VwcG9ydCBpcyBhbGxvd2VkXG4gICAqL1xuICBzaG93Vmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuaXNNaW5pbWl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBpc01vZGFsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZG8ge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlVmlld3NTdGFja1tjb3VudF0pIHtcbiAgICAgICAgaXNNb2RhbEFjdGl2ZSA9IHRoaXMuYWN0aXZlVmlld3NTdGFja1tjb3VudF0uaXNNb2RhbERpYWxvZygpO1xuICAgICAgICBjb3VudCA9IGNvdW50ICsgMTtcbiAgICAgIH1cbiAgICB9IHdoaWxlIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIGNvdW50IDwgdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCk7XG5cbiAgICB0aGlzLnZpZXdzQ2hhbmdlZC5uZXh0KHtcbiAgICAgIHZpZXdzOiB0aGlzLmdldEJyZWFkY3J1bWIodGhpcy5hY3RpdmVWaWV3c1N0YWNrKSxcbiAgICAgIGFjdGl2ZVZpZXc6IHZpZXcsXG4gICAgICBtaW5NYXhFdmVudDogdHJ1ZSxcbiAgICAgIGlzTW9kYWxBY3RpdmU6IGlzTW9kYWxBY3RpdmVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgdmlldyB3aW5kb3dcbiAgICogQHBhcmFtIHZpZXdJZCBJZCBvZiB2aWV3IHRvIGNsb3NlXG4gICAqIEBwYXJhbSBzY3JlZW5JbmRleCAob3B0aW9uYWwpIGluZGV4IG9mIHRoZSBzY3JlZW4gaWYgbXVsdGkgc2NyZWVuIHN1cHBvcnRcbiAgICovXG4gIGNsb3NlVmlldyh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3QnlJZCh2aWV3SWQsIHNjcmVlbkluZGV4KTtcblxuICAgIGlmICh2aWV3ICE9IG51bGwpIHtcbiAgICAgIHZpZXcuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBudW1iZXIgb2YgY3VycmVudCBhY3RpdmUgdmlldyBmcm9tIFtbYWN0aXZlVmlld3NTdGFja11dXG4gICAqIEByZXR1cm5zIE51bWJlciBvZiBhY3RpdmUgdmlld3NcbiAgICovXG4gIGFjdGl2ZVZpZXdzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0byBzZWUgaWYgYSB2aWV3IGlzIGluIHRoZSBbW2FjdGl2ZVZpZXdTdGFja11dXG4gICAqIEBwYXJhbSB2aWV3IFZpZXdDb21wb25lbnQncyBpZCBhcyBhIHN0cmluZyBvciBbW1ZpZXdDb21wb25lbnRdXSBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2aWV3IGNvbXBvbmVudCBpcyBpbiB0aGUgW1thY3RpdmVWaWV3U3RhY2tdXVxuICAgKi9cbiAgaGFzVmlldyh2aWV3OiBWaWV3Q29tcG9uZW50IHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB2aWV3ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIF8uZmlsdGVyKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHYpPT52LmlkID09PSB2aWV3IGFzIHN0cmluZykubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5maWx0ZXIodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodik9PnYudW5pcXVlSWQgPT09IHZpZXcudW5pcXVlSWQpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IGFjdGl2ZSB2aWV3XG4gICAqIEByZXR1cm5zIHRoZSBhY3RpdmUgdmlldyBmcm9tIHRoZSB2aWV3IHN0YWNrXG4gICAqL1xuICBhY3RpdmVWaWV3KCk6IFZpZXdDb21wb25lbnQge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXdzQ291bnQoKSA+IDAgPyB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c0NvdW50KCkgLSAxXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmlldyBmcm9tIFtbYWN0cml2ZVZpZXdTdGFja11dIGJ5IElEXG4gICAqIEBwYXJhbSB2aWV3SWQgVmlld3MgaWQgdmFsdWVcbiAgICogQHBhcmFtIHNjcmVlbkluZGV4IChvcHRpb25hbCkgdGhlIHNjcmVlbkluZGV4IG9mIHRoZSB2aWV3IChpZiBtdWx0aXBsZSBzY3JlZW4gaXMgYWxsb3cpXG4gICAqIEByZXR1cm5zIFZpZXcgdGhhdCBtYXRjaGVzIHZhbHVlIG9mIGlkXG4gICAqL1xuICBnZXRWaWV3QnlJZCh2aWV3SWQ6IHN0cmluZywgc2NyZWVuSW5kZXg6IG51bWJlciA9IG51bGwpOiBWaWV3Q29tcG9uZW50IHtcbiAgICByZXR1cm4gXy5maW5kKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHZpZXc6IFZpZXdDb21wb25lbnQpPT57XG4gICAgICByZXR1cm4gdmlldy5pZCA9PT0gdmlld0lkICYmIChzY3JlZW5JbmRleCA9PSBudWxsIHx8IChzY3JlZW5JbmRleCAhPSBudWxsICYmIHZpZXcuc2NyZWVuSW5kZXggPT09IHNjcmVlbkluZGV4KSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGhhbmRsZXIgdmlldyBjb21wb25lbnQgYnkgbmFtZVxuICAgKiBAcGFyYW0gYWN0aW9uRm9yd2FyZE5hbWVcbiAgICogQHJldHVybnMgVmlldyBjb21wb25lbnQgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBjb21wb25lbnQgd2l0aCBhY3Rpb25Gb3J3YXJkTmFtZVxuICAgKi9cbiAgZ2V0QWN0aW9uRm9yd2FyZEhhbmRsZXIoYWN0aW9uRm9yd2FyZE5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyLmdldChhY3Rpb25Gb3J3YXJkTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBbW2FjdGlvbkZvcndhcmRIYW5kbGVyXV1cbiAgICovXG4gIGdldEFjdGlvbkZvcndhcmRIYW5kbGVyTWFwKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbkZvcndhcmRIYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1thY3RpdmVWaWV3U3RhY2tdXVxuICAgKi9cbiAgZ2V0Vmlld3MoKTogQXJyYXk8Vmlld0NvbXBvbmVudD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2s7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHotaW5kZXggKGxheWVyIHBvc2l0aW9uKSBvZiBhbGwgYWN0aXZlIHZpZXdzXG4gICAqIEBwYXJhbSB0b3BWaWV3SWQgSUQgb2YgdmlldyBjb21wb25lbnQgdG8gc2V0IG1heCB6LWluZGV4ICh0b3ApXG4gICAqL1xuICByZVN0YWNrVmlldyh0b3BWaWV3SWQ6IHN0cmluZyA9IG51bGwsIHNjcmVlbkluZGV4OiBudW1iZXIgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmVWaWV3c1N0YWNrID0gXy5zb3J0QnkodGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodmlldzogVmlld0NvbXBvbmVudCk9PntcbiAgICAgIC8vd2UgYXJlIHRvcCB2aWV3XG4gICAgICBpZiAodmlldy5pZCA9PT0gdG9wVmlld0lkICYmIChzY3JlZW5JbmRleCA9PSBudWxsIHx8IChzY3JlZW5JbmRleCA9PT0gdmlldy5zY3JlZW5JbmRleCkpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLk1BWF9aX0lOREVYO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmlldy56SW5kZXg7XG4gICAgfSk7XG5cbiAgICBsZXQgaXNNb2RhbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgXy5mb3JFYWNoKHRoaXMuYWN0aXZlVmlld3NTdGFjaywgKHZpZXc6IFZpZXdDb21wb25lbnQsIGlkeDogbnVtYmVyKT0+e1xuICAgICAgdmlldy51cGRhdGVaSW5kZXgodGhpcy5NSU5fWl9JTkRFWCArIGlkeCk7XG5cbiAgICAgIGlmIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIHZpZXcuaXNNb2RhbERpYWxvZygpID09PSB0cnVlKSB7XG4gICAgICAgIGlzTW9kYWxBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCAtIDFdLFxuICAgICAgaXNNb2RhbEFjdGl2ZTogaXNNb2RhbEFjdGl2ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgei1pbmRleFxuICAgKi9cbiAgZ2V0Vmlld1pJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLk1JTl9aX0lOREVYICsgdGhpcy5hY3RpdmVWaWV3c0NvdW50KCk7XG4gIH1cblxuICBwcml2YXRlIGdldEJyZWFkY3J1bWIodmlld3M6IEFycmF5PFZpZXdDb21wb25lbnQ+KTogQXJyYXk8Vmlld0NvbXBvbmVudD4ge1xuICAgIHJldHVybiB2aWV3cy5maWx0ZXIodj0+di5za2lwQnJlYWRDcnVtYiAhPT0gdHJ1ZSAmJiB2LmRpYWxvZyAhPSBudWxsICYmIHYudmlzaWJsZSAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2Vzc2lvbiBmcm9tIGFuIE1DTyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbWNvXG4gICAqIEByZXR1cm5zIFNlc3Npb25cbiAgICovXG4gIHN0YXRpYyBnZXRDbGllbnRTZXNzaW9uRnJvbU1jbyhtY286IGFueSkge1xuICAgIHJldHVybiBtY28uZ2V0U2Vzc2lvbigpO1xuICB9XG4gIC8qKlxuICAgKiDmrKHjga5zY3JlZW5JbmRleOOCkuWPluW+l+OBl+OBvuOBmeOAglxuICAgKiBzY3JlZW5JbmRleOOBrzF+OOOBruWApOOCkuOBqOOCi+OCiOOBhuOBq+OAgeOCteODvOODkOOBp+aDs+WumuOBleOCjOOBpuOBhOOBvuOBmeOAglxuICAgKi9cbiAgbmV4dFNjcmVlbkluZGV4KGJhc2VTY3JlZW5JZDpzdHJpbmcsIGlkOnN0cmluZyA9IG51bGwpOiBudW1iZXJ7XG4gICAgY29uc3QgZXhpc3RpbmdTY3JlZW5zID0gdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmZpbHRlcih2PT5cbiAgICAgIChpZClcbiAgICAgICAgPyB2LmlkID09PSBpZFxuICAgICAgICA6IHYuYmFzZVNjcmVlbklkID09PSBiYXNlU2NyZWVuSWRcbiAgICApO1xuICAgIGlmIChleGlzdGluZ1NjcmVlbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaSA9IF8ub3JkZXJCeShleGlzdGluZ1NjcmVlbnMsIChzY3I6IFZpZXdDb21wb25lbnQpPT5zY3Iuc2NyZWVuSW5kZXgsIFwiZGVzY1wiKVxuICAgICAgICAucG9wKCkuc2NyZWVuSW5kZXhcbiAgICAgIHJldHVybiBpICsgMTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2hCcmVhZENydW1iKCkge1xuICAgIGxldCBpc01vZGFsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfLmZvckVhY2godGhpcy5hY3RpdmVWaWV3c1N0YWNrLCAodmlldzogVmlld0NvbXBvbmVudCk9PntcbiAgICAgIGlmIChpc01vZGFsQWN0aXZlICE9PSB0cnVlICYmIHZpZXcuaXNNb2RhbERpYWxvZygpID09PSB0cnVlKSB7XG4gICAgICAgIGlzTW9kYWxBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy52aWV3c0NoYW5nZWQubmV4dCh7XG4gICAgICB2aWV3czogdGhpcy5nZXRCcmVhZGNydW1iKHRoaXMuYWN0aXZlVmlld3NTdGFjayksXG4gICAgICBhY3RpdmVWaWV3OiB0aGlzLmFjdGl2ZVZpZXdzU3RhY2tbdGhpcy5hY3RpdmVWaWV3c1N0YWNrLmxlbmd0aCAtIDFdLFxuICAgICAgaXNNb2RhbEFjdGl2ZTogaXNNb2RhbEFjdGl2ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=