import { ViewComponent } from '../view/view.component';
import { Subject } from 'rxjs';
import { ViewChangedEvent } from './view-changed.event';
export declare class McoContainerService {
    /**
     * Keeps internal list of active ViewComponents
     */
    private activeViewsStack;
    private actionForwardHandler;
    /**
     * Internal map of MCO instances
     */
    private _mcoMap;
    private readonly MIN_Z_INDEX;
    private readonly MAX_Z_INDEX;
    viewsChanged: Subject<ViewChangedEvent>;
    /**
     * Get mco instance from internal [[_mcoMap]]
     * @param mcoName Name of MCO instance
     */
    getMco(mcoName: string): any;
    /**
     * Get the maximum allowed z-index value for layering windows
     */
    getMaxZIndex(): number;
    /**
     * Alias of [[registerMco]]
     * @param mcoName
     * @param mco
     */
    addMco(mcoName: string, mco: any): void;
    /**
     * Add an mco instance to internal [[_mcoMap]]
     * @param mcoName
     * @param mco
     */
    registerMco(mcoName: string, mco: any): void;
    /**
     * Remove mco object from internal [[_mcoMap]]
     * @param mcoName Name of mco instance to remove
     */
    removeMco(mcoName: string): void;
    /**
     * Push view to the last active view stack. This will be the view that returned
     * when popLastActiveView is called.
     *
     * @param view ViewComponent to be add to the stack
     */
    registerView(view: ViewComponent): void;
    /**
     * Pop last active view. This will remove the view from the active stack
     */
    popLastActiveView(): ViewComponent;
    /**
     * Remove a view that has been destroyed from the stack.
     *
     * @param view ViewComponent to be removed from stack
     */
    removeView(view: ViewComponent): void;
    /**
     * Minimize a view window by ID
     * @param viewId Id of view to minimize
     * @param screenIndex (optional) index of screen if multi screen support is allowed
     */
    minimizeView(viewId: string, screenIndex?: number): void;
    /**
     * Shows a view by id
     * @param viewId Id of view to show
     * @param screenIndex (optional) index of screen if multi screen support is allowed
     */
    showView(viewId: string, screenIndex?: number): void;
    /**
     * Close the view window
     * @param viewId Id of view to close
     * @param screenIndex (optional) index of the screen if multi screen support
     */
    closeView(viewId: string, screenIndex?: number): void;
    /**
     * Get the number of current active view from [[activeViewsStack]]
     * @returns Number of active views
     */
    activeViewsCount(): number;
    /**
     * Check to see if a view is in the [[activeViewStack]]
     * @param view ViewComponent's id as a string or [[ViewComponent]] instance
     * @returns True if the view component is in the [[activeViewStack]]
     */
    hasView(view: ViewComponent | string): boolean;
    /**
     * Get the current active view
     * @returns the active view from the view stack
     */
    activeView(): ViewComponent;
    /**
     * Get a view from [[actriveViewStack]] by ID
     * @param viewId Views id value
     * @param screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
     * @returns View that matches value of id
     */
    getViewById(viewId: string, screenIndex?: number): ViewComponent;
    /**
     * Get handler view component by name
     * @param actionForwardName
     * @returns View component or null if there is no component with actionForwardName
     */
    getActionForwardHandler(actionForwardName: string): ViewComponent;
    /**
     * Get the [[actionForwardHandler]]
     */
    getActionForwardHandlerMap(): Map<string, ViewComponent>;
    /**
     * Get the [[activeViewStack]]
     */
    getViews(): Array<ViewComponent>;
    /**
     * Update z-index (layer position) of all active views
     * @param topViewId ID of view component to set max z-index (top)
     */
    reStackView(topViewId?: string, screenIndex?: number): void;
    /**
     * Get the z-index
     */
    getViewZIndex(): number;
    private getBreadcrumb;
    /**
     * Get the session from an MCO instance
     * @param mco
     * @returns Session
     */
    static getClientSessionFromMco(mco: any): any;
    /**
     * 次のscreenIndexを取得します。
     * screenIndexは1~8の値をとるように、サーバで想定されています。
     */
    nextScreenIndex(baseScreenId: string, id?: string): number;
    refreshBreadCrumb(): void;
}
