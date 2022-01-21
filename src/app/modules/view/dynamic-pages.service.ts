import { Injectable, ViewContainerRef, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';

import * as _ from "lodash";
import { ViewComponent } from './view.component';
import { SessionService } from '../session/session.service';

/**
 * Class for managing dynamic views
 */
@Injectable({
  providedIn: 'root'
})
export class DynamicPagesService {
  private viewContainer: ViewContainerRef;
  private dynamicViewsMap: Array<ComponentRef<ViewComponent>> = [];
  static onCreateViewCloser: (sessionService: SessionService, viewType: Type<ViewComponent>, routeId: string) => void = null;

  /**
   * 
   * @param viewFactory 
   */
  constructor(
    private viewFactory: ComponentFactoryResolver,
    private sessionService: SessionService
  ) { }

  /* istanbul ignore next */
  /**
   * Set the [[viewContainer]] property to reference a [[ViewContainer]]
   * @param viewContainer 
   */
  registerViewContainer(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
  }

  /* istanbul ignore next */
  /**
   * Create a new [[ViewComponent]] instance
   * @param viewType 
   * @param routeId 
   */
  createDynamicView(viewType: Type<ViewComponent>, routeId: string = null): Promise<ViewComponent> {
    // For suppress warning (Circular dependency), it is not able to call ViewComponent's method directly here.
    if(DynamicPagesService.onCreateViewCloser) {
      DynamicPagesService.onCreateViewCloser(this.sessionService, viewType, routeId);
    }

    if (this.sessionService.getMessagingService() != null) {
      this.sessionService.getMessagingService().setFreezePushService(true);
    }

    const view = this.viewContainer.createComponent(this.viewFactory.resolveComponentFactory(viewType));
    this.dynamicViewsMap.push(view);
    view.instance.isDynamicPage = true;

    view.changeDetectorRef.detectChanges();
    return new Promise<ViewComponent>((r, j)=>{
      //has route id?
      if (routeId != null && routeId !== "") {
        view.instance["routeId"] = routeId;
      }

      if (view.instance.viewIsInitialized === true) {
        if (this.sessionService.getMessagingService() != null) {
          this.sessionService.getMessagingService().setFreezePushService(false);
        }

        r(view.instance);
      } else {
        const sub = view.instance.viewInitialized.subscribe(()=>{
          sub.unsubscribe();
          
          if (this.sessionService.getMessagingService() != null) {
            this.sessionService.getMessagingService().setFreezePushService(false);
          }

          r(view.instance);
        });
      }
    });
  }

  /* istanbul ignore next */
  /**
   * Destroy [[ViewComponent]] instance reference
   * @param viewToRemove 
   * @param immediate
   */
  removeView(viewToRemove: ViewComponent, immediate: boolean) {
    const deadView = _.find(this.dynamicViewsMap, (view: ComponentRef<ViewComponent>)=>{
      return view.instance.uniqueId == viewToRemove.uniqueId;
    });

    this.dynamicViewsMap = _.filter(this.dynamicViewsMap, (view: ComponentRef<ViewComponent>)=>{
      return view.instance.uniqueId != viewToRemove.uniqueId;
    });

    if (viewToRemove.isDestroyed !== true && deadView != null) {
      if(immediate) {
        deadView.destroy();
      } else {
        deadView.destroy();
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Event handler for check the last modal. Closes the window
   */
  isParentModalExist(): boolean {
    let ViewsMapList = this.dynamicViewsMap;
    let modal_number: number = 0;
    for (let i = 0; i < ViewsMapList.length; i++){
      if (this.dynamicViewsMap[i].instance.modal === "true"){
        modal_number = modal_number + 1;
      }
    }
    if (modal_number < 2){
      return true;
    } else {
      return false;
    }
  }
}
