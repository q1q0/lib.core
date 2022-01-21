import { MenuItem } from "./menu-item";
/**
 * Class for creating [[MenuItems]]
 */
export declare class MenuItemBuilder {
    _internalMenuItem: MenuItem;
    /**
     * Map of HTML attributes to add to menu item
     */
    attributes: {
        [name: string]: any;
    };
    /**
     *
     * @param menuItem
     */
    constructor(menuItem?: MenuItem);
    /**
     * Allowed attribute names
     */
    static knownKeys: string[];
    /**
     * Create a menu separator using hyphens
     */
    static createHorizontalDivider(): MenuItemBuilder;
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @returns [[MenuItemBuilder]] instance
     */
    static createMenuItem(): MenuItemBuilder;
    /**
     * Set text attribute
     * @param text
     */
    setText(text: string): void;
    /**
     *
     * @param width
     */
    setWidth(width: string): void;
    /**
     *
     * @param img
     */
    setImgHint(img: string): void;
    /**
     * Sets event handler for mousedown
     * @param fn Mouse down event handler function
     */
    setOnMouseDown(fn: (thisArg?: any) => void): void;
    /**
     * Set margin attribute
     * @param margin Should be number
     */
    setMargin(margin: string): void;
    /**
     * Set fontColor attribute
     * @param color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     */
    setFontColor(color: string): void;
    /**
     * Set fontSize attribute
     * @param size Should be number
     */
    setFontSize(size: string): void;
    /**
     * Set fontBold attribute
     * @param bold
     */
    setFontBold(bold: string): void;
    /**
     * Set custom attribute on [[MenuItem]]
     * @param name
     * @param value
     */
    setAttribute(name: string, value: any): void;
    /**
     * Return the value of the attribute
     *
     * @param name the name of the attribute
     */
    getAttribute(name: string): any;
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param parentScreenId
     */
    toMenuItem(parentScreenId?: string): MenuItem;
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     */
    appendChild(menuItem: MenuItemBuilder): void;
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param menuItem
     */
    static fromMenuItem(menuItem: MenuItem): MenuItemBuilder;
    /**
     * Clear out style values for [[MenuItem]]
     * @param menuItem
     */
    static initStyle(menuItem: MenuItem): void;
    _free(): void;
}
