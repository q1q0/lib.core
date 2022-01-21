/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { appInjector } from "../session/app-injector";
import { McoContainerService } from "../mco-container/mco-container.service";
import { Logger } from "./logger";
import { ContextMenuService } from "../popup-menu/context-menu.service";
import { MenuItemBuilder } from "../popup-menu/menu-item-builder";
import { NgZone } from "@angular/core";
/**
 * Document object class to access virtual DOM
 */
export class UiDocument {
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
if (false) {
    /** @type {?} */
    UiDocument.menuItemElementMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2Jhc2UvdWktZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUk3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2xDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBT3ZDLE1BQU07Ozs7OztJQU9KLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFVO1FBQ2hDLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOzs7Ozs7SUFNRCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQVU7UUFDOUIsT0FBTyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFNRCxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQVU7UUFDL0IsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztRQUc1QixJQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPOztRQUMzQixNQUFNLFlBQVksR0FBd0IsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7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QUcsRUFBRSxDQUFDLENBQUM7U0FDbEQ7S0FDRjs7Ozs7O0lBT0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFpQjtRQUNyQyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7O1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0MsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2FBQzFCO1lBRUQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNoQixXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsR0FBRSxFQUFFO29CQUM5QyxVQUFVLENBQUMsR0FBRSxFQUFFO3dCQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakIsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDVCxDQUFDLENBQUM7YUFDSjtTQUNGO0tBQ0Y7O2dDQTdPMkQsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcEluamVjdG9yIH0gZnJvbSBcIi4uL3Nlc3Npb24vYXBwLWluamVjdG9yXCI7XG5pbXBvcnQgeyBNY29Db250YWluZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL21jby1jb250YWluZXIvbWNvLWNvbnRhaW5lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSBcIi4uL2Jhc2UvYmFzZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEF0dHJpYnV0ZXNFbnVtIH0gZnJvbSBcIi4vYXR0cmlidXRlcy5lbnVtXCI7XG5pbXBvcnQgeyBNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gXCIuLi9wb3B1cC1tZW51L21lbnUtaXRlbS9tZW51LWl0ZW0uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IENvbWJvQm94Q29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWYWx1ZVBhaXIgfSBmcm9tIFwiLi4vY29tYm8tYm94L3ZhbHVlLXBhaXJcIjtcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gXCIuLi9wb3B1cC1tZW51L2NvbnRleHQtbWVudS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNZW51SXRlbUJ1aWxkZXIgfSBmcm9tIFwiLi4vcG9wdXAtbWVudS9tZW51LWl0ZW0tYnVpbGRlclwiO1xuaW1wb3J0IHsgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqXG4gKiBEb2N1bWVudCBvYmplY3QgY2xhc3MgdG8gYWNjZXNzIHZpcnR1YWwgRE9NXG4gKi9cblxuLy8gQGR5bmFtaWMgLS0gdGhpcyBsaW5lIGNvbW1lbnQgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgcGFja2FnciBlcnJvclxuZXhwb3J0IGNsYXNzIFVpRG9jdW1lbnQge1xuICBzdGF0aWMgbWVudUl0ZW1FbGVtZW50TWFwOiBNYXA8c3RyaW5nLCBNZW51SXRlbUNvbXBvbmVudD4gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBHZXQgW1tNZW51SXRlbUNvbXBvbmVudF1dIGJ5IGlkIGtleSBpbiBbW21lbnVJdGVtRWxlbWVudE1hcF1dXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgc3RhdGljIGdldE1lbnVDb21wb25lbnQoaWQ6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHRoaXMubWVudUl0ZW1FbGVtZW50TWFwID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lbnVJdGVtRWxlbWVudE1hcC5nZXQoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBbW2ZpbmRFbGVtZW50QnlJZF1dXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgc3RhdGljIGdldEVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVWlEb2N1bWVudC5maW5kRWxlbWVudEJ5SWQoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBmb3IgYW5kIHJldHVybiBhIGNvbXBvbmVudCBieSBpZFxuICAgKiBAcGFyYW0gaWQgVmlld0NvbXBvbmVudCBpZFxuICAgKi9cbiAgc3RhdGljIGZpbmRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKGlkID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgLy9XQVJOSU5HOiBXZSBjYW4ndCBjYWNoZSBoZXJlIGFzIHdlIGRvbid0IGlkIGhlcmUgaXMgTk9UIHVuaXF1ZSEhXG4gICAgbGV0IGNvbXA6IEJhc2VDb21wb25lbnQgPSBudWxsO1xuXG4gICAgaWYgKCFhcHBJbmplY3RvcigpKSByZXR1cm47XG4gICAgY29uc3QgbWNvQ29udGFpbmVyOiBNY29Db250YWluZXJTZXJ2aWNlID0gYXBwSW5qZWN0b3IoKS5nZXQoTWNvQ29udGFpbmVyU2VydmljZSk7XG5cbiAgICBpZiAobWNvQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgIGNvbXAgPSBtY29Db250YWluZXIuZ2V0Vmlld0J5SWQoaWQpO1xuXG4gICAgICBpZiAoY29tcCA9PSBudWxsICYmIG1jb0NvbnRhaW5lci5hY3RpdmVWaWV3KCkgIT0gbnVsbCkge1xuICAgICAgICBjb21wID0gbWNvQ29udGFpbmVyLmFjdGl2ZVZpZXcoKS5maW5kRWxlbWVudEJ5SWQoaWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIGNvbXAgPSB0aGlzLmdldE1lbnVDb21wb25lbnQoaWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHZpZXdzID0gbWNvQ29udGFpbmVyLmdldFZpZXdzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgdmlldyBvZiB2aWV3cykge1xuICAgICAgICAgIGlmICh2aWV3LmlkID09PSBpZCkge1xuICAgICAgICAgICAgY29tcCA9IHZpZXc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXAgPSB2aWV3LmZpbmRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vb3VyIGNvbXBvbmVudCBpcyBpbiBhIHN1YnZpZXc/XG4gICAgICBpZiAoY29tcCA9PSBudWxsICYmIG1jb0NvbnRhaW5lci5nZXRBY3Rpb25Gb3J3YXJkSGFuZGxlck1hcCgpICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uRm9yd2FyZEl0ID0gbWNvQ29udGFpbmVyLmdldEFjdGlvbkZvcndhcmRIYW5kbGVyTWFwKCkudmFsdWVzKCk7XG4gICAgICAgIGxldCBmb3J3YXJkSXRSZXN1bHQgPSBhY3Rpb25Gb3J3YXJkSXQubmV4dCgpO1xuXG4gICAgICAgIHdoaWxlKGZvcndhcmRJdFJlc3VsdC5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgICAgY29tcCA9IGZvcndhcmRJdFJlc3VsdC52YWx1ZS5maW5kRWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgICAgICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yd2FyZEl0UmVzdWx0ID0gYWN0aW9uRm9yd2FyZEl0Lm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wID0gdGhpcy5nZXRNZW51Q29tcG9uZW50KGlkKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vL1dBUk5JTkchISEhISEhISEhISEhISEhISEhISEhIVxuICAgIC8vTWVudUl0ZW0/Pz8/IGZvciBzcGVjaWFsIGNhc2Ugd2hlcmUgcmlnaHQgY2xpY2sgZXZlbnQgb2YgaW5uZXIgY29tcCBvZiB0YWJsZSBjb2x1bW5cbiAgICAvL2lzIHRyaWdnZXIgYmVmb3JlIHJvdyBjb250ZXh0IG1lbnUgaXMgdHJpZ2dlciAocm93IGNvbnRleHQgbWVudSBkaXNwbGF5IHBvcHVwIG1lbnUpXG4gICAgLy90aGlzIHNwZWNpYWwgY29tcG9uZW50IGlzIE1lbnVJdGVtQnVpbGRlciBzbyBpdCBvbmx5IHN1cHBvcnQgc2V0QXR0cmlidXRlXG4gICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgY29uc3QgbWNvQ29udGFpbmVyOiBNY29Db250YWluZXJTZXJ2aWNlID0gYXBwSW5qZWN0b3IoKS5nZXQoTWNvQ29udGFpbmVyU2VydmljZSk7XG5cbiAgICAgIGlmIChtY29Db250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBhY3RpdmVWaWV3ID0gbWNvQ29udGFpbmVyLmFjdGl2ZVZpZXcoKTtcblxuICAgICAgICBpZiAoYWN0aXZlVmlldyAhPSBudWxsICYmIGFjdGl2ZVZpZXcuaGFzUG9wdXBNZW51KCkpIHtcbiAgICAgICAgICBjb25zdCBjb250ZXh0TWVudVNlcnZpY2UgPSBhcHBJbmplY3RvcigpLmdldChDb250ZXh0TWVudVNlcnZpY2UpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHRNZW51U2VydmljZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBwb3B1cE1lbnVJdGVtcyA9IGNvbnRleHRNZW51U2VydmljZS5nZXRDb250ZXh0TWVudUl0ZW1zKGFjdGl2ZVZpZXcuZ2V0Rmlyc3RQb3B1cE1lbnVJZCgpKTtcblxuICAgICAgICAgICAgaWYgKHBvcHVwTWVudUl0ZW1zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgbWVudUl0ZW0gPSBwb3B1cE1lbnVJdGVtcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmIChtZW51SXRlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9mYWtlIGNvbXBvbmVudCwgc3BlY2lmaWNhbGx5IGZvciBtZW51XG4gICAgICAgICAgICAgICAgY29tcCA9IE1lbnVJdGVtQnVpbGRlci5mcm9tTWVudUl0ZW0obWVudUl0ZW0pIGFzIGFueTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHRNZW51U2VydmljZS5fdHJhY2tNZW51SXRlbUJ1aWxkZXJGb3JNZW1SZWxlYXNlKGNvbXAgYXMgYW55KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3QgSlNPTiBtZXRhZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHN0YXRpYyB0b0pzb24oKToge30ge1xuICAgIGNvbnN0IHZpZXdzID0gYXBwSW5qZWN0b3IoKS5nZXQoTWNvQ29udGFpbmVyU2VydmljZSkuZ2V0Vmlld3MoKTtcbiAgICBjb25zdCBqc29uID0ge307XG5cbiAgICBmb3IgKGxldCB2aWV3IG9mIHZpZXdzKSB7XG4gICAgICBqc29uW3ZpZXcuZ2V0SWQoKV0gPSB2aWV3LnRvSnNvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhdHRyaWJ1dGUgd2l0aCB2YWx1ZSBvbiBjb21wb25lbnQgYnkgaWRcbiAgICogQHBhcmFtIGlkIENvbXBvbmVudCBpZFxuICAgKiBAcGFyYW0gYXR0cmlidXRlTmFtZSBOYW1lIG9mIGF0dHJpYnV0ZSB0byBzZXRcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIG9mIGF0dHJpYnV0ZSB0byBzZXRcbiAgICovXG4gIHN0YXRpYyBzZXRFbGVtZW50QXR0cmlidXRlKGlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyB8IEF0dHJpYnV0ZXNFbnVtLCB2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgaWYgKGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMb2dnZXIud2FybihgVW5hYmxlIHRvIHNldCBhdHRyaWJ1dGUgdG8gZWxlbWVudCBpZDogJHtpZH0sIGRvZXNuJ3QgZXhpc3RzYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHJldHVybiBudWxsXG4gICAqIEBwYXJhbSBpZCBDb21wb25lbnQgaWRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZU5hbWUgTmFtZSBvZiBhdHRyaWJ1dGUgdmFsdWUgdG8gZ2V0XG4gICAqL1xuICBzdGF0aWMgZ2V0RWxlbWVudEF0dHJpYnV0ZShpZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcgfCBBdHRyaWJ1dGVzRW51bSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTG9nZ2VyLndhcm4oYFVuYWJsZSB0byBnZXQgYXR0cmlidXRlIHRvIGVsZW1lbnQgaWQ6ICR7aWR9LCBkb2Vzbid0IGV4aXN0c2ApO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIFtbTWVudUl0ZW1Db21wb25lbnRdXSB0byBpbnRlcm5hbCBbW21lbnVJdGVtRWxlbWVudE1hcF1dXG4gICAqIEBwYXJhbSBpZCBLZXkgdG8gdXNlIGluIG1hcCBmb3IgbWVudSBpdGVtIGJlaW5nIGFkZGVkXG4gICAqIEBwYXJhbSBtZW51SXRlbUVsZW1lbnQgQ29tcG9uZW50IHRvIGFkZCB0byBtYXBcbiAgICovXG4gIHN0YXRpYyByZWdpc3Rlck1lbnVJdGVtRWxlbWVudChpZDogc3RyaW5nLCBtZW51SXRlbUVsZW1lbnQ6IE1lbnVJdGVtQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMubWVudUl0ZW1FbGVtZW50TWFwID09IG51bGwpIHtcbiAgICAgIHRoaXMubWVudUl0ZW1FbGVtZW50TWFwID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIHRoaXMubWVudUl0ZW1FbGVtZW50TWFwLnNldChpZCwgbWVudUl0ZW1FbGVtZW50KTtcblxuICAgIC8vdHJhY2sgbWVudSBpdGVtIGZvciBzZW5kaW5nIHRvIHNlcnZlclxuICAgIGlmIChtZW51SXRlbUVsZW1lbnQuaXRlbSAhPSBudWxsICYmIG1lbnVJdGVtRWxlbWVudC5pdGVtLnBhcmVudFNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG1jb0NvbnRhaW5lcjogTWNvQ29udGFpbmVyU2VydmljZSA9IGFwcEluamVjdG9yKCkuZ2V0KE1jb0NvbnRhaW5lclNlcnZpY2UpO1xuXG4gICAgICBpZiAobWNvQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlVmlldyA9IG1jb0NvbnRhaW5lci5nZXRWaWV3QnlJZChtZW51SXRlbUVsZW1lbnQuaXRlbS5wYXJlbnRTY3JlZW5JZCk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZVZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgIGFjdGl2ZVZpZXcudHJhY2tJbmFjdGl2ZU1lbnVJdGVtKG1lbnVJdGVtRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIFtbTWVudUl0ZW1Db21wb25lbnRdXSBmcm9tIGludGVybmFsIFtbbWVudUl0ZW1FbGVtZW50TWFwXV1cbiAgICogQHBhcmFtIGlkIEtleSBvZiBtZW51IGl0ZW0gdG8gcmVtb3ZlIGZyb20gbWFwXG4gICAqL1xuICBzdGF0aWMgdW5yZWdpc3Rlck1lbnVJdGVtRWxlbWVudChpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudUl0ZW1FbGVtZW50TWFwICE9IG51bGwpIHtcbiAgICAgIHRoaXMubWVudUl0ZW1FbGVtZW50TWFwLmRlbGV0ZShpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tDb21ib2JveENvbXBvbmVudF1dIHZhbHVlc1xuICAgKiBAcGFyYW0gaWQgQ29tYm9ib3ggY29tcG9uZW50IGlkXG4gICAqIEBwYXJhbSB2YWx1ZXMgSW5pdGlhbCB2YWx1ZXMgdG8gc2V0IG9uIGNvbWJvYm94IGNvbXBvbmVudFxuICAgKi9cbiAgc3RhdGljIGluaXRpYWxpemVDb21ib0JveFZhbHVlcyhpZDogc3RyaW5nLCB2YWx1ZXM6IEFycmF5PFZhbHVlUGFpcj4pIHtcbiAgICBjb25zdCBjb21wOiBDb21ib0JveENvbXBvbmVudCA9IHRoaXMuZmluZEVsZW1lbnRCeUlkKGlkKSBhcyBhbnk7XG5cbiAgICBpZiAoY29tcCAhPSBudWxsKSB7XG4gICAgICBjb21wLmluaXRpYWxpemVDb21ib2JveFZhbHVlcyh2YWx1ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gaW5pdGlhbGllIGNvbWJvOiBcIiArIGlkKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgdGhlIHBhcmVudCB0YWIgb2YgdGhpcyBbW2VsZW1lbnRJZF1dXG4gICAqIEBwYXJhbSBlbGVtZW50SWQgdGhlIGVsZW1lbnQgaWQgd2hlcmUgd2Ugd2FudCBpdHMgcGFyZW50IHRhYiB0byBiZSBmb2N1c2VkXG4gICAqL1xuICBzdGF0aWMgZm9jdXNQYXJlbnRUYWIoZWxlbWVudElkOiBzdHJpbmcpIHtcbiAgICBpZiAoZWxlbWVudElkICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNvbXAgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuXG4gICAgICBpZiAoY29tcCAhPSBudWxsICYmIHR5cGVvZiBjb21wW1wiZm9jdXNQYXJlbnRUYWJcIl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb21wW1wiZm9jdXNQYXJlbnRUYWJcIl0oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgICBhcHBJbmplY3RvcigpLmdldChOZ1pvbmUpLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgY29tcC5zZXRGb2N1cygpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19