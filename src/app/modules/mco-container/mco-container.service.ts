import { Injectable } from '@angular/core';
import { KeyUtils } from '../base/key-utils';
import { ViewComponent } from '../view/view.component';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { ViewChangedEvent } from './view-changed.event';

@Injectable({
  providedIn: 'root'
})
export class McoContainerService {
  /**
   * Keeps internal list of active ViewComponents
   */
  private activeViewsStack: Array<ViewComponent> = [];

  //stored actionForwardHandler (e.g. a sub view) that does not have an NXML
  private actionForwardHandler: Map<string, ViewComponent>;

  /**
   * Internal map of MCO instances
   */
  private _mcoMap: Map<string, any> = new Map<string, any>();
  private readonly MIN_Z_INDEX = 1000;
  private readonly MAX_Z_INDEX = 99999;
  //1050 is for actual modal

  viewsChanged = new Subject<ViewChangedEvent>();

  /**
   * Get mco instance from internal [[_mcoMap]]
   * @param mcoName Name of MCO instance
   */
  getMco(mcoName: string): any {
    return this._mcoMap.get(KeyUtils.toMapKey(mcoName));
  }

  /**
   * Get the maximum allowed z-index value for layering windows
   */
  getMaxZIndex(): number {
    return this.MAX_Z_INDEX;
  }

  /**
   * Alias of [[registerMco]]
   * @param mcoName
   * @param mco
   */
  addMco(mcoName: string, mco: any) {
    this.registerMco(mcoName, mco);
  }

  /**
   * Add an mco instance to internal [[_mcoMap]]
   * @param mcoName
   * @param mco
   */
  registerMco(mcoName: string, mco: any) {
    this._mcoMap.set(KeyUtils.toMapKey(mcoName), mco);
  }

  /**
   * Remove mco object from internal [[_mcoMap]]
   * @param mcoName Name of mco instance to remove
   */
  removeMco(mcoName: string) {
    const key = KeyUtils.toMapKey(mcoName);
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
   * @param view ViewComponent to be add to the stack
   */
  registerView(view: ViewComponent) {
    if (view.canBeActiveView !== true) {
      // this.activeViewsStack.splice(0, 0, view);
      // view.zIndex = this.MIN_Z_INDEX - this.activeViewsCount();
      if (this.actionForwardHandler == null) {
        this.actionForwardHandler = new Map<string, ViewComponent>();
      }
      this.actionForwardHandler.set(view.actionForwardName, view);
    } else {
      this.activeViewsStack.push(view);
      view.zIndex = this.getViewZIndex();
    }

    this.activeViewsStack = _.uniqBy(this.activeViewsStack, (v)=>v.uniqueId);
  }

  /**
   * Pop last active view. This will remove the view from the active stack
   */
  popLastActiveView(): ViewComponent {
    return this.activeViewsStack.pop();
  }

  /**
   * Remove a view that has been destroyed from the stack.
   *
   * @param view ViewComponent to be removed from stack
   */
  removeView(view: ViewComponent) {
    if (view.canBeActiveView !== true){
      if (this.actionForwardHandler != null) {
        this.actionForwardHandler.delete(view.actionForwardName);
      }
    } else {
      this.activeViewsStack = _.filter(this.activeViewsStack, (v)=>v.uniqueId !== view.uniqueId);

      this.viewsChanged.next({
        views: this.getBreadcrumb(this.activeViewsStack),
        activeView: null,
        isModalActive: false
      });
    }
  }

  /**
   * Minimize a view window by ID
   * @param viewId Id of view to minimize
   * @param screenIndex (optional) index of screen if multi screen support is allowed
   */
  minimizeView(viewId: string, screenIndex: number = null) {
    const view = this.getViewById(viewId, screenIndex);

    if (view != null) {
      view.isMinimized = true;
    }

    let activeView: ViewComponent = null;
    let isModalActive: boolean = false;

    if (this.activeViewsCount() > 1) {
      const visibleViews = this.activeViewsStack.filter(v=>v.isMinimized !== true && v.skipBreadCrumb !== true);

      if (visibleViews != null && visibleViews.length > 0) {
        activeView = visibleViews[visibleViews.length - 1];
        let i = visibleViews.length - 1;
        // Itterate through visibile views to look for the next dialog view (not subview)
        while (visibleViews[i] && !activeView.dialog) {
          activeView = visibleViews[i]
          i--;
        }

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
   * @param viewId Id of view to show
   * @param screenIndex (optional) index of screen if multi screen support is allowed
   */
  showView(viewId: string, screenIndex: number = null) {
    const view = this.getViewById(viewId, screenIndex);

    if (view != null) {
      view.isMinimized = true;
    }

    let isModalActive: boolean = false;

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
   * @param viewId Id of view to close
   * @param screenIndex (optional) index of the screen if multi screen support
   */
  closeView(viewId: string, screenIndex: number = null) {
    const view = this.getViewById(viewId, screenIndex);

    if (view != null) {
      view.close();
    }
  }

  /**
   * Get the number of current active view from [[activeViewsStack]]
   * @returns Number of active views
   */
  activeViewsCount(): number {
    return this.activeViewsStack.length;
  }

  /**
   * Check to see if a view is in the [[activeViewStack]]
   * @param view ViewComponent's id as a string or [[ViewComponent]] instance
   * @returns True if the view component is in the [[activeViewStack]]
   */
  hasView(view: ViewComponent | string): boolean {
    if (typeof view === 'string') {
      return _.filter(this.activeViewsStack, (v)=>v.id === view as string).length > 0;
    }

    return _.filter(this.activeViewsStack, (v)=>v.uniqueId === view.uniqueId).length > 0;
  }

  /**
   * Get the current active view
   * @returns the active view from the view stack
   */
  activeView(): ViewComponent {
    return this.activeViewsCount() > 0 ? this.activeViewsStack[this.activeViewsCount() - 1] : null;
  }

  /**
   * Get a view from [[actriveViewStack]] by ID
   * @param viewId Views id value
   * @param screenIndex (optional) the screenIndex of the view (if multiple screen is allow)
   * @returns View that matches value of id
   */
  getViewById(viewId: string, screenIndex: number = null): ViewComponent {
    //return _.find(this.activeViewsStack, (view: ViewComponent)=>{
    //  return view.id === viewId && (screenIndex == null || (screenIndex != null && view.screenIndex === screenIndex));
    //});
    const viewObj = _.find(this.activeViewsStack, (view: ViewComponent)=>{
      return view.id === viewId && (screenIndex == null || (screenIndex != null && view.screenIndex === screenIndex));
    });
    return viewObj;
  }

  /**
   * Get handler view component by name
   * @param actionForwardName
   * @returns View component or null if there is no component with actionForwardName
   */
  getActionForwardHandler(actionForwardName: string) {
    if (this.actionForwardHandler != null) {
      return this.actionForwardHandler.get(actionForwardName);
    }

    return null;
  }

  /**
   * Get the [[actionForwardHandler]]
   */
  getActionForwardHandlerMap() {
    return this.actionForwardHandler;
  }

  /**
   * Get the [[activeViewStack]]
   */
  getViews(): Array<ViewComponent> {
    return this.activeViewsStack;
  }

  /**
   * Update z-index (layer position) of all active views
   * @param topViewId ID of view component to set max z-index (top)
   */
  reStackView(topViewId: string = null, screenIndex: number = null) {
    this.activeViewsStack = _.sortBy(this.activeViewsStack, (view: ViewComponent)=>{
      //we are top view
      if (view.id === topViewId && (screenIndex == null || (screenIndex === view.screenIndex))) {
        return this.MAX_Z_INDEX;
      }

      return view.zIndex;
    });

    let isModalActive: boolean = false;

    _.forEach(this.activeViewsStack, (view: ViewComponent, idx: number)=>{
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
   */
  getViewZIndex(): number {
    return this.MIN_Z_INDEX + this.activeViewsCount();
  }

  private getBreadcrumb(views: Array<ViewComponent>): Array<ViewComponent> {
    return views.filter(v=>v.skipBreadCrumb !== true && v.dialog != null && v.visible !== false);
  }

  /**
   * Get the session from an MCO instance
   * @param mco
   * @returns Session
   */
  static getClientSessionFromMco(mco: any) {
    return mco.getSession();
  }
  /**
   * 次のscreenIndexを取得します。
   * screenIndexは1~8の値をとるように、サーバで想定されています。
   */
  nextScreenIndex(baseScreenId:string, id:string = null): number{
    const existingScreens = this.activeViewsStack.filter(v=>
      (id)
        ? v.id === id
        : v.baseScreenId === baseScreenId
    );
    if (existingScreens.length > 0) {
      //const i = _.orderBy(existingScreens, (scr: ViewComponent)=>scr.screenIndex, "desc")
      //  .pop().screenIndex
      let i = 0;
      _.forEach(existingScreens, (view: ViewComponent)=>{
        if(i < view.screenIndex) i = view.screenIndex;
      });
      return i + 1;
    }else{
      return 1;
    }
  }

  refreshBreadCrumb() {
    let isModalActive: boolean = false;

    _.forEach(this.activeViewsStack, (view: ViewComponent)=>{
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
   * close the screen if its refreshHTML is set to true
   *
   * @param screenId
   */
  closeExistingScreen(screenId: string) {
    const view = this.getViewById(screenId);
    if (view != null) {
      switch(typeof view.refreshHTML) {
      case "boolean":
        if (view.refreshHTML === true) {
          view.close();
        }
        break;
      case "function":
        if ((view.refreshHTML as Function).call(view, screenId) === true) {
          view.close();
        }
        break;
      default:
      }
    }
  }
}
