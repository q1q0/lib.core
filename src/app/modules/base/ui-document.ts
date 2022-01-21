import { appInjector } from "../session/app-injector";
import { McoContainerService } from "../mco-container/mco-container.service";
import { BaseComponent } from "../base/base.component";
import { AttributesEnum } from "./attributes.enum";
import { MenuItemComponent } from "../popup-menu/menu-item/menu-item.component";
import { Logger } from "./logger";
import { ComboBoxComponent } from "../combo-box/combo-box.component";
import { ValuePair } from "../combo-box/value-pair";
import { ContextMenuService } from "../popup-menu/context-menu.service";
import { MenuItemBuilder } from "../popup-menu/menu-item-builder";
import { NgZone } from "@angular/core";
import * as _ from 'lodash';

/**
 * Document object class to access virtual DOM
 */

// @dynamic -- this line comment is necessary to prevent packagr error
export class UiDocument {
  static menuItemElementMap: Map<string, MenuItemComponent> = null;

  /**
   * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
   * @param id
   */
  static getMenuComponent(id: string): any {
    if (this.menuItemElementMap == null) {
      return null;
    }

    return this.menuItemElementMap.get(id);
  }

  /**
   * Alias for [[findElementById]]
   * @param id
   */
  static getElementById(id: string) {
    return UiDocument.findElementById(id);
  }

  /**
   * Search for and return a component by id
   * @param id ViewComponent id
   */
  static findElementById(id: string): BaseComponent {
    if (id == null) return null;

    //WARNING: We can't cache here as we don't id here is NOT unique!!
    let comp: BaseComponent = null;

    if (!appInjector()) return;
    const mcoContainer: McoContainerService = appInjector().get(McoContainerService);

    if (mcoContainer != null) {
      comp = mcoContainer.getViewById(id);

      if (comp == null && mcoContainer.activeView() != null) {
        comp = mcoContainer.activeView().findElementById(id);
      }

      if (comp == null) {
        comp = this.getMenuComponent(id);
      }

      if (comp == null) {
        const views = mcoContainer.getViews();

        for (let view of views) {
          if (view.id === id) {
            comp = view;
          } else {
            comp = view.findElementById(id);
          }

          if (comp != null) {
            break;
          }
        }
      }

      //our component is in a subview?
      if (comp == null && mcoContainer.getActionForwardHandlerMap() != null) {
        const actionForwardIt = mcoContainer.getActionForwardHandlerMap().values();
        let forwardItResult = actionForwardIt.next();

        while(forwardItResult.done !== true) {
          comp = forwardItResult.value.findElementById(id);

          if (comp != null) {
            break;
          }

          forwardItResult = actionForwardIt.next();
        }
      }
    } else {
      comp = this.getMenuComponent(id);
    }

    /////////////////WARNING!!!!!!!!!!!!!!!!!!!!!!!
    //MenuItem???? for special case where right click event of inner comp of table column
    //is trigger before row context menu is trigger (row context menu display popup menu)
    //this special component is MenuItemBuilder so it only support setAttribute
    if (comp == null) {
      const mcoContainer: McoContainerService = appInjector().get(McoContainerService);

      if (mcoContainer != null) {
        const activeView = mcoContainer.activeView();

        if (activeView != null && activeView.hasPopupMenu()) {
          const contextMenuService = appInjector().get(ContextMenuService);

          if (contextMenuService != null) {
            const popupMenuItems = contextMenuService.getContextMenuItems(activeView.getFirstPopupMenuId());

            if (popupMenuItems != null) {
              const menuItem = popupMenuItems.find(item=>{
                return item.id === id;
              });

              if (menuItem != null) {
                //fake component, specifically for menu
                comp = MenuItemBuilder.fromMenuItem(menuItem) as any;

                contextMenuService._trackMenuItemBuilderForMemRelease(comp as any);
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
   * @returns Object JSON metadata for this component
   */
  static toJson(): {} {
     const json = {};
     const mcoContainerService = appInjector().get(McoContainerService);
 
     const activeView = mcoContainerService.activeView();
     const activeViewId = activeView.getId();
 
    if (activeViewId === 'NgnsSCR_SoOrd_EntryOdrRegist01') {
      json[activeViewId] = activeView.toJson();
    } else {
       const views = mcoContainerService.getViews();
       _.forEach(views, view => {
         json[view.getId()] = view.toJson();
       });
     }
 
     return json;
   }

  /**
   * Get JSON representation of component
   * @returns Object JSON metadata for this component
   */
  static targetViewToJson(targetViewId: string): {} {
    const views = appInjector().get(McoContainerService).getViews();
    const json = {};
    for (let view of views) {
      if(view.getId() === targetViewId){
        json[view.getId()] = view.toJson();
        break;
      }
    }
    return json;
  }

  /**
   * Set attribute with value on component by id
   * @param id Component id
   * @param attributeName Name of attribute to set
   * @param value Value of attribute to set
   */
  static setElementAttribute(id: string, attributeName: string | AttributesEnum, value: any) {
    const element = this.getElementById(id);

    if (element != null) {
      element.setAttribute(attributeName, value);
    } else {
      Logger.warn(`Unable to set attribute to element id: ${id}, doesn't exists`);
    }
  }

  /**
   * Get the value of an attribute if it exists, otherwise return null
   * @param id Component id
   * @param attributeName Name of attribute value to get
   */
  static getElementAttribute(id: string, attributeName: string | AttributesEnum) {
    const element = this.getElementById(id);

    if (element != null) {
      return element.getAttribute(attributeName);
    } else {
      Logger.warn(`Unable to get attribute to element id: ${id}, doesn't exists`);
    }

    return null;
  }

  /**
   * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
   * @param id Key to use in map for menu item being added
   * @param menuItemElement Component to add to map
   */
  static registerMenuItemElement(id: string, menuItemElement: MenuItemComponent) {
    if (this.menuItemElementMap == null) {
      this.menuItemElementMap = new Map();
    }

    this.menuItemElementMap.set(id, menuItemElement);

    //track menu item for sending to server
    if (menuItemElement.item != null && menuItemElement.item.parentScreenId != null) {
      const mcoContainer: McoContainerService = appInjector().get(McoContainerService);

      if (mcoContainer != null) {
        const activeView = mcoContainer.getViewById(menuItemElement.item.parentScreenId);

        if (activeView != null) {
          activeView.trackInactiveMenuItem(menuItemElement);
        }
      }
    }
  }

  /**
   * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
   * @param id Key of menu item to remove from map
   */
  static unregisterMenuItemElement(id: string) {
    if (this.menuItemElementMap != null) {
      this.menuItemElementMap.delete(id);
    }
  }

  /**
   * Sets [[ComboboxComponent]] values
   * @param id Combobox component id
   * @param values Initial values to set on combobox component
   */
  static initializeComboBoxValues(id: string, values: Array<ValuePair>) {
    const comp: ComboBoxComponent = this.findElementById(id) as any;

    if (comp != null) {
      comp.initializeComboboxValues(values);
    } else {
      console.warn("Unable to initialie combo: " + id);
    }
  }

  /* istanbul ignore next */
  /**
   * Focus the parent tab of this [[elementId]]
   * @param elementId the element id where we want its parent tab to be focused
   */
  static focusParentTab(elementId: string, timeoutFlg?: boolean) {
    if (elementId != null) {
      const comp = this.findElementById(elementId);

      if (comp != null && typeof comp["focusParentTab"] === "function") {
        comp["focusParentTab"]();
      }

      if (comp != null) {
        appInjector().get(NgZone).runOutsideAngular(()=>{
          if(timeoutFlg){
            setTimeout(()=>{
              comp.setFocus();
            }, 100);
          }else{
            comp.setFocus();
          }
        });
      }
    }
  }
}
