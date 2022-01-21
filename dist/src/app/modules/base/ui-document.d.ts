import { BaseComponent } from "../base/base.component";
import { AttributesEnum } from "./attributes.enum";
import { MenuItemComponent } from "../popup-menu/menu-item/menu-item.component";
import { ValuePair } from "../combo-box/value-pair";
/**
 * Document object class to access virtual DOM
 */
export declare class UiDocument {
    static menuItemElementMap: Map<string, MenuItemComponent>;
    /**
     * Get [[MenuItemComponent]] by id key in [[menuItemElementMap]]
     * @param id
     */
    static getMenuComponent(id: string): any;
    /**
     * Alias for [[findElementById]]
     * @param id
     */
    static getElementById(id: string): BaseComponent;
    /**
     * Search for and return a component by id
     * @param id ViewComponent id
     */
    static findElementById(id: string): BaseComponent;
    /**
     * Get JSON representation of component
     * @returns Object JSON metadata for this component
     */
    static toJson(): {};
    /**
     * Set attribute with value on component by id
     * @param id Component id
     * @param attributeName Name of attribute to set
     * @param value Value of attribute to set
     */
    static setElementAttribute(id: string, attributeName: string | AttributesEnum, value: any): void;
    /**
     * Get the value of an attribute if it exists, otherwise return null
     * @param id Component id
     * @param attributeName Name of attribute value to get
     */
    static getElementAttribute(id: string, attributeName: string | AttributesEnum): any;
    /**
     * Add a [[MenuItemComponent]] to internal [[menuItemElementMap]]
     * @param id Key to use in map for menu item being added
     * @param menuItemElement Component to add to map
     */
    static registerMenuItemElement(id: string, menuItemElement: MenuItemComponent): void;
    /**
     * Remove [[MenuItemComponent]] from internal [[menuItemElementMap]]
     * @param id Key of menu item to remove from map
     */
    static unregisterMenuItemElement(id: string): void;
    /**
     * Sets [[ComboboxComponent]] values
     * @param id Combobox component id
     * @param values Initial values to set on combobox component
     */
    static initializeComboBoxValues(id: string, values: Array<ValuePair>): void;
    /**
     * Focus the parent tab of this [[elementId]]
     * @param elementId the element id where we want its parent tab to be focused
     */
    static focusParentTab(elementId: string): void;
}
