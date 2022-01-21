/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { appInjector } from "../session/app-injector";
import { McoContainerService } from "../mco-container/mco-container.service";
import { Logger } from "./logger";
import { ContextMenuService } from "../popup-menu/context-menu.service";
import { MenuItemBuilder } from "../popup-menu/menu-item-builder";
import { NgZone } from "@angular/core";
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
                    for (var views_1 = tslib_1.__values(views), views_1_1 = views_1.next(); !views_1_1.done; views_1_1 = views_1.next()) {
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
            for (var views_2 = tslib_1.__values(views), views_2_1 = views_2.next(); !views_2_1.done; views_2_1 = views_2.next()) {
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
export { UiDocument };
if (false) {
    /** @type {?} */
    UiDocument.menuItemElementMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2Jhc2UvdWktZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFJN0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdsQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQVVyQzs7O09BR0c7Ozs7OztJQUNJLDJCQUFnQjs7Ozs7SUFBdkIsVUFBd0IsRUFBVTtRQUNoQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0kseUJBQWM7Ozs7O0lBQXJCLFVBQXNCLEVBQVU7UUFDOUIsT0FBTyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSSwwQkFBZTs7Ozs7SUFBdEIsVUFBdUIsRUFBVTs7UUFDL0IsSUFBSSxFQUFFLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztRQUc1QixJQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPOztRQUMzQixJQUFNLFlBQVksR0FBd0IsV0FBVyxF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Ozs7SUFBL0IsVUFBZ0MsRUFBVSxFQUFFLE1BQXdCOztRQUNsRSxJQUFNLElBQUkscUJBQXNCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFRLEVBQUM7UUFFaEUsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNsRDtLQUNGO0lBRUQsMEJBQTBCO0lBQzFCOzs7T0FHRzs7Ozs7O0lBQ0kseUJBQWM7Ozs7O0lBQXJCLFVBQXNCLFNBQWlCO1FBQ3JDLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTs7WUFDckIsSUFBTSxNQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU3QyxJQUFJLE1BQUksSUFBSSxJQUFJLElBQUksT0FBTyxNQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ2hFLE1BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7YUFDMUI7WUFFRCxJQUFJLE1BQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2hCLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDMUMsVUFBVSxDQUFDO3dCQUNULE1BQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakIsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDVCxDQUFDLENBQUM7YUFDSjtTQUNGO0tBQ0Y7b0NBN08yRCxJQUFJO3FCQWxCbEU7O1NBaUJhLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHBJbmplY3RvciB9IGZyb20gXCIuLi9zZXNzaW9uL2FwcC1pbmplY3RvclwiO1xuaW1wb3J0IHsgTWNvQ29udGFpbmVyU2VydmljZSB9IGZyb20gXCIuLi9tY28tY29udGFpbmVyL21jby1jb250YWluZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gXCIuLi9iYXNlL2Jhc2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gXCIuL2F0dHJpYnV0ZXMuZW51bVwiO1xuaW1wb3J0IHsgTWVudUl0ZW1Db21wb25lbnQgfSBmcm9tIFwiLi4vcG9wdXAtbWVudS9tZW51LWl0ZW0vbWVudS1pdGVtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBDb21ib0JveENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21iby1ib3gvY29tYm8tYm94LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSBcIi4uL2NvbWJvLWJveC92YWx1ZS1wYWlyXCI7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tIFwiLi4vcG9wdXAtbWVudS9jb250ZXh0LW1lbnUuc2VydmljZVwiO1xuaW1wb3J0IHsgTWVudUl0ZW1CdWlsZGVyIH0gZnJvbSBcIi4uL3BvcHVwLW1lbnUvbWVudS1pdGVtLWJ1aWxkZXJcIjtcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKlxuICogRG9jdW1lbnQgb2JqZWN0IGNsYXNzIHRvIGFjY2VzcyB2aXJ0dWFsIERPTVxuICovXG5cbi8vIEBkeW5hbWljIC0tIHRoaXMgbGluZSBjb21tZW50IGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IHBhY2thZ3IgZXJyb3JcbmV4cG9ydCBjbGFzcyBVaURvY3VtZW50IHtcbiAgc3RhdGljIG1lbnVJdGVtRWxlbWVudE1hcDogTWFwPHN0cmluZywgTWVudUl0ZW1Db21wb25lbnQ+ID0gbnVsbDtcblxuICAvKipcbiAgICogR2V0IFtbTWVudUl0ZW1Db21wb25lbnRdXSBieSBpZCBrZXkgaW4gW1ttZW51SXRlbUVsZW1lbnRNYXBdXVxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIHN0YXRpYyBnZXRNZW51Q29tcG9uZW50KGlkOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0aGlzLm1lbnVJdGVtRWxlbWVudE1hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZW51SXRlbUVsZW1lbnRNYXAuZ2V0KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBmb3IgW1tmaW5kRWxlbWVudEJ5SWRdXVxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIHN0YXRpYyBnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFVpRG9jdW1lbnQuZmluZEVsZW1lbnRCeUlkKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggZm9yIGFuZCByZXR1cm4gYSBjb21wb25lbnQgYnkgaWRcbiAgICogQHBhcmFtIGlkIFZpZXdDb21wb25lbnQgaWRcbiAgICovXG4gIHN0YXRpYyBmaW5kRWxlbWVudEJ5SWQoaWQ6IHN0cmluZyk6IEJhc2VDb21wb25lbnQge1xuICAgIGlmIChpZCA9PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAgIC8vV0FSTklORzogV2UgY2FuJ3QgY2FjaGUgaGVyZSBhcyB3ZSBkb24ndCBpZCBoZXJlIGlzIE5PVCB1bmlxdWUhIVxuICAgIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIGlmICghYXBwSW5qZWN0b3IoKSkgcmV0dXJuO1xuICAgIGNvbnN0IG1jb0NvbnRhaW5lcjogTWNvQ29udGFpbmVyU2VydmljZSA9IGFwcEluamVjdG9yKCkuZ2V0KE1jb0NvbnRhaW5lclNlcnZpY2UpO1xuXG4gICAgaWYgKG1jb0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICBjb21wID0gbWNvQ29udGFpbmVyLmdldFZpZXdCeUlkKGlkKTtcblxuICAgICAgaWYgKGNvbXAgPT0gbnVsbCAmJiBtY29Db250YWluZXIuYWN0aXZlVmlldygpICE9IG51bGwpIHtcbiAgICAgICAgY29tcCA9IG1jb0NvbnRhaW5lci5hY3RpdmVWaWV3KCkuZmluZEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgICBjb21wID0gdGhpcy5nZXRNZW51Q29tcG9uZW50KGlkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAgPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB2aWV3cyA9IG1jb0NvbnRhaW5lci5nZXRWaWV3cygpO1xuXG4gICAgICAgIGZvciAobGV0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICAgICAgICBpZiAodmlldy5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgIGNvbXAgPSB2aWV3O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wID0gdmlldy5maW5kRWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb21wICE9IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL291ciBjb21wb25lbnQgaXMgaW4gYSBzdWJ2aWV3P1xuICAgICAgaWYgKGNvbXAgPT0gbnVsbCAmJiBtY29Db250YWluZXIuZ2V0QWN0aW9uRm9yd2FyZEhhbmRsZXJNYXAoKSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbkZvcndhcmRJdCA9IG1jb0NvbnRhaW5lci5nZXRBY3Rpb25Gb3J3YXJkSGFuZGxlck1hcCgpLnZhbHVlcygpO1xuICAgICAgICBsZXQgZm9yd2FyZEl0UmVzdWx0ID0gYWN0aW9uRm9yd2FyZEl0Lm5leHQoKTtcblxuICAgICAgICB3aGlsZShmb3J3YXJkSXRSZXN1bHQuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbXAgPSBmb3J3YXJkSXRSZXN1bHQudmFsdWUuZmluZEVsZW1lbnRCeUlkKGlkKTtcblxuICAgICAgICAgIGlmIChjb21wICE9IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcndhcmRJdFJlc3VsdCA9IGFjdGlvbkZvcndhcmRJdC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29tcCA9IHRoaXMuZ2V0TWVudUNvbXBvbmVudChpZCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy9XQVJOSU5HISEhISEhISEhISEhISEhISEhISEhISFcbiAgICAvL01lbnVJdGVtPz8/PyBmb3Igc3BlY2lhbCBjYXNlIHdoZXJlIHJpZ2h0IGNsaWNrIGV2ZW50IG9mIGlubmVyIGNvbXAgb2YgdGFibGUgY29sdW1uXG4gICAgLy9pcyB0cmlnZ2VyIGJlZm9yZSByb3cgY29udGV4dCBtZW51IGlzIHRyaWdnZXIgKHJvdyBjb250ZXh0IG1lbnUgZGlzcGxheSBwb3B1cCBtZW51KVxuICAgIC8vdGhpcyBzcGVjaWFsIGNvbXBvbmVudCBpcyBNZW51SXRlbUJ1aWxkZXIgc28gaXQgb25seSBzdXBwb3J0IHNldEF0dHJpYnV0ZVxuICAgIGlmIChjb21wID09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1jb0NvbnRhaW5lcjogTWNvQ29udGFpbmVyU2VydmljZSA9IGFwcEluamVjdG9yKCkuZ2V0KE1jb0NvbnRhaW5lclNlcnZpY2UpO1xuXG4gICAgICBpZiAobWNvQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlVmlldyA9IG1jb0NvbnRhaW5lci5hY3RpdmVWaWV3KCk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZVZpZXcgIT0gbnVsbCAmJiBhY3RpdmVWaWV3Lmhhc1BvcHVwTWVudSgpKSB7XG4gICAgICAgICAgY29uc3QgY29udGV4dE1lbnVTZXJ2aWNlID0gYXBwSW5qZWN0b3IoKS5nZXQoQ29udGV4dE1lbnVTZXJ2aWNlKTtcblxuICAgICAgICAgIGlmIChjb250ZXh0TWVudVNlcnZpY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcG9wdXBNZW51SXRlbXMgPSBjb250ZXh0TWVudVNlcnZpY2UuZ2V0Q29udGV4dE1lbnVJdGVtcyhhY3RpdmVWaWV3LmdldEZpcnN0UG9wdXBNZW51SWQoKSk7XG5cbiAgICAgICAgICAgIGlmIChwb3B1cE1lbnVJdGVtcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtID0gcG9wdXBNZW51SXRlbXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IGlkO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAobWVudUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vZmFrZSBjb21wb25lbnQsIHNwZWNpZmljYWxseSBmb3IgbWVudVxuICAgICAgICAgICAgICAgIGNvbXAgPSBNZW51SXRlbUJ1aWxkZXIuZnJvbU1lbnVJdGVtKG1lbnVJdGVtKSBhcyBhbnk7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0TWVudVNlcnZpY2UuX3RyYWNrTWVudUl0ZW1CdWlsZGVyRm9yTWVtUmVsZWFzZShjb21wIGFzIGFueSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBjb21wb25lbnRcbiAgICogQHJldHVybnMgT2JqZWN0IEpTT04gbWV0YWRhdGEgZm9yIHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBzdGF0aWMgdG9Kc29uKCk6IHt9IHtcbiAgICBjb25zdCB2aWV3cyA9IGFwcEluamVjdG9yKCkuZ2V0KE1jb0NvbnRhaW5lclNlcnZpY2UpLmdldFZpZXdzKCk7XG4gICAgY29uc3QganNvbiA9IHt9O1xuXG4gICAgZm9yIChsZXQgdmlldyBvZiB2aWV3cykge1xuICAgICAganNvblt2aWV3LmdldElkKCldID0gdmlldy50b0pzb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYXR0cmlidXRlIHdpdGggdmFsdWUgb24gY29tcG9uZW50IGJ5IGlkXG4gICAqIEBwYXJhbSBpZCBDb21wb25lbnQgaWRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZU5hbWUgTmFtZSBvZiBhdHRyaWJ1dGUgdG8gc2V0XG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBvZiBhdHRyaWJ1dGUgdG8gc2V0XG4gICAqL1xuICBzdGF0aWMgc2V0RWxlbWVudEF0dHJpYnV0ZShpZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcgfCBBdHRyaWJ1dGVzRW51bSwgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTG9nZ2VyLndhcm4oYFVuYWJsZSB0byBzZXQgYXR0cmlidXRlIHRvIGVsZW1lbnQgaWQ6ICR7aWR9LCBkb2Vzbid0IGV4aXN0c2ApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBpZiBpdCBleGlzdHMsIG90aGVyd2lzZSByZXR1cm4gbnVsbFxuICAgKiBAcGFyYW0gaWQgQ29tcG9uZW50IGlkXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVOYW1lIE5hbWUgb2YgYXR0cmlidXRlIHZhbHVlIHRvIGdldFxuICAgKi9cbiAgc3RhdGljIGdldEVsZW1lbnRBdHRyaWJ1dGUoaWQ6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nIHwgQXR0cmlidXRlc0VudW0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICBpZiAoZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIExvZ2dlci53YXJuKGBVbmFibGUgdG8gZ2V0IGF0dHJpYnV0ZSB0byBlbGVtZW50IGlkOiAke2lkfSwgZG9lc24ndCBleGlzdHNgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBbW01lbnVJdGVtQ29tcG9uZW50XV0gdG8gaW50ZXJuYWwgW1ttZW51SXRlbUVsZW1lbnRNYXBdXVxuICAgKiBAcGFyYW0gaWQgS2V5IHRvIHVzZSBpbiBtYXAgZm9yIG1lbnUgaXRlbSBiZWluZyBhZGRlZFxuICAgKiBAcGFyYW0gbWVudUl0ZW1FbGVtZW50IENvbXBvbmVudCB0byBhZGQgdG8gbWFwXG4gICAqL1xuICBzdGF0aWMgcmVnaXN0ZXJNZW51SXRlbUVsZW1lbnQoaWQ6IHN0cmluZywgbWVudUl0ZW1FbGVtZW50OiBNZW51SXRlbUNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLm1lbnVJdGVtRWxlbWVudE1hcCA9PSBudWxsKSB7XG4gICAgICB0aGlzLm1lbnVJdGVtRWxlbWVudE1hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVJdGVtRWxlbWVudE1hcC5zZXQoaWQsIG1lbnVJdGVtRWxlbWVudCk7XG5cbiAgICAvL3RyYWNrIG1lbnUgaXRlbSBmb3Igc2VuZGluZyB0byBzZXJ2ZXJcbiAgICBpZiAobWVudUl0ZW1FbGVtZW50Lml0ZW0gIT0gbnVsbCAmJiBtZW51SXRlbUVsZW1lbnQuaXRlbS5wYXJlbnRTY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBtY29Db250YWluZXI6IE1jb0NvbnRhaW5lclNlcnZpY2UgPSBhcHBJbmplY3RvcigpLmdldChNY29Db250YWluZXJTZXJ2aWNlKTtcblxuICAgICAgaWYgKG1jb0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVZpZXcgPSBtY29Db250YWluZXIuZ2V0Vmlld0J5SWQobWVudUl0ZW1FbGVtZW50Lml0ZW0ucGFyZW50U2NyZWVuSWQpO1xuXG4gICAgICAgIGlmIChhY3RpdmVWaWV3ICE9IG51bGwpIHtcbiAgICAgICAgICBhY3RpdmVWaWV3LnRyYWNrSW5hY3RpdmVNZW51SXRlbShtZW51SXRlbUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBbW01lbnVJdGVtQ29tcG9uZW50XV0gZnJvbSBpbnRlcm5hbCBbW21lbnVJdGVtRWxlbWVudE1hcF1dXG4gICAqIEBwYXJhbSBpZCBLZXkgb2YgbWVudSBpdGVtIHRvIHJlbW92ZSBmcm9tIG1hcFxuICAgKi9cbiAgc3RhdGljIHVucmVnaXN0ZXJNZW51SXRlbUVsZW1lbnQoaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lbnVJdGVtRWxlbWVudE1hcCAhPSBudWxsKSB7XG4gICAgICB0aGlzLm1lbnVJdGVtRWxlbWVudE1hcC5kZWxldGUoaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIFtbQ29tYm9ib3hDb21wb25lbnRdXSB2YWx1ZXNcbiAgICogQHBhcmFtIGlkIENvbWJvYm94IGNvbXBvbmVudCBpZFxuICAgKiBAcGFyYW0gdmFsdWVzIEluaXRpYWwgdmFsdWVzIHRvIHNldCBvbiBjb21ib2JveCBjb21wb25lbnRcbiAgICovXG4gIHN0YXRpYyBpbml0aWFsaXplQ29tYm9Cb3hWYWx1ZXMoaWQ6IHN0cmluZywgdmFsdWVzOiBBcnJheTxWYWx1ZVBhaXI+KSB7XG4gICAgY29uc3QgY29tcDogQ29tYm9Cb3hDb21wb25lbnQgPSB0aGlzLmZpbmRFbGVtZW50QnlJZChpZCkgYXMgYW55O1xuXG4gICAgaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgY29tcC5pbml0aWFsaXplQ29tYm9ib3hWYWx1ZXModmFsdWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGluaXRpYWxpZSBjb21ibzogXCIgKyBpZCk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBwYXJlbnQgdGFiIG9mIHRoaXMgW1tlbGVtZW50SWRdXVxuICAgKiBAcGFyYW0gZWxlbWVudElkIHRoZSBlbGVtZW50IGlkIHdoZXJlIHdlIHdhbnQgaXRzIHBhcmVudCB0YWIgdG8gYmUgZm9jdXNlZFxuICAgKi9cbiAgc3RhdGljIGZvY3VzUGFyZW50VGFiKGVsZW1lbnRJZDogc3RyaW5nKSB7XG4gICAgaWYgKGVsZW1lbnRJZCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjb21wID0gdGhpcy5maW5kRWxlbWVudEJ5SWQoZWxlbWVudElkKTtcblxuICAgICAgaWYgKGNvbXAgIT0gbnVsbCAmJiB0eXBlb2YgY29tcFtcImZvY3VzUGFyZW50VGFiXCJdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29tcFtcImZvY3VzUGFyZW50VGFiXCJdKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wICE9IG51bGwpIHtcbiAgICAgICAgYXBwSW5qZWN0b3IoKS5nZXQoTmdab25lKS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIGNvbXAuc2V0Rm9jdXMoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==