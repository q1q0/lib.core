import { MenuItem } from "./menu-item";

import * as _ from "lodash";

/**
 * Class for creating [[MenuItems]]
 */
export class MenuItemBuilder {
    //internal menu item for special case, DO NOT use
    //this is needed when right click event of child item is table column trigger before row
    _internalMenuItem: MenuItem;

    /**
     * Map of HTML attributes to add to menu item
     */
    attributes: {[name: string]: any} = {};

    /* istanbul ignore next */
    /**
     * 
     * @param menuItem 
     */
    constructor(menuItem: MenuItem = null) {
        this._internalMenuItem = menuItem;
    }

    /* istanbul ignore next */
    /**
     * Allowed attribute names
     */
    static knownKeys = [
        "id",
        "text",
        "onCommand",
        "onCommandCallback",
        "onMouseDownCallback",
        "menuItems",
        "display",
        "fontColor",
        "fontBold",
        "fontSize",
        "margin"
    ];

    /**
     * Create a menu separator using hyphens
     */
    static createHorizontalDivider() {
        const menuItem = new MenuItemBuilder();
        menuItem.setAttribute("text", "-");

        return menuItem;
    }

    /**
     * Get a new [[MenuItemBuilder]] instance
     * @returns [[MenuItemBuilder]] instance
     */
    static createMenuItem() {
        return new MenuItemBuilder();
    }

    /**
     * Set text attribute
     * @param text 
     */
    setText(text: string) {
        this.setAttribute("text", text);
    }

    /* istanbul ignore next */
    /**
     * 
     * @param width 
     */
    setWidth(width: string) {
        //don't think this should be doing anything, all menu item shared the same width
    }

    /* istanbul ignore next */
    /**
     * 
     * @param img 
     */
    setImgHint(img: string) {
        //TODO
    }

    /**
     * Sets event handler for mousedown
     * @param fn Mouse down event handler function
     */
    setOnMouseDown(fn: (thisArg?: any)=>void) {
        this.setAttribute("onMouseDownCallback", fn);
    }

    /* istanbul ignore next */
    /**
     * Set margin attribute
     * @param margin Should be number
     */
    setMargin(margin: string) {
        this.setAttribute("margin", margin);
    }

    /**
     * Set fontColor attribute
     * @param color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     */
    setFontColor(color: string) {
        this.setAttribute("fontColor", color);
    }

    /**
     * Set fontSize attribute
     * @param size Should be number
     */
    setFontSize(size: string) {
        this.setAttribute("fontSize", size);
    }

    /**
     * Set fontBold attribute
     * @param bold 
     */
    setFontBold(bold: string) {
        this.setAttribute("fontBold", bold);
    }

    /* istanbul ignore next */
    /**
     * Set custom attribute on [[MenuItem]]
     * @param name 
     * @param value 
     */
    setAttribute(name: string, value: any) {
        this.attributes[name] = value;

        if (this._internalMenuItem != null) {
            if (MenuItemBuilder.knownKeys.indexOf(name) >= 0) {
                this._internalMenuItem[name] = value;
            } else {
                if (this._internalMenuItem.customAttributes == null) {
                    this._internalMenuItem.customAttributes = {};                    
                }
                
                this._internalMenuItem.customAttributes[name] = value;
            }
        }
    }

    /* istanbul ignore next */
    /**
     * Return the value of the attribute
     * 
     * @param name the name of the attribute
     */
    getAttribute(name: string): any {
        return this.attributes[name];
    }

    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param parentScreenId 
     */
    toMenuItem(parentScreenId?: string): MenuItem {
        const menuItem: MenuItem = {};
        menuItem.parentScreenId = parentScreenId;

       /* istanbul ignore next */
        if (this.attributes["id"] != null) {
            menuItem.id = this.attributes["id"];
        }

        if (this.attributes["text"] != null) {
            menuItem.text = this.attributes["text"];
        }

       /* istanbul ignore next */
        if (this.attributes["menuItems"] != null) {
            menuItem.menuItems = _.map(this.attributes["menuItems"], (subMenu)=>subMenu.toMenuItem(parentScreenId));
        }

        if (this.attributes["onCommandCallback"] != null) {
            menuItem.onCommandCallback = this.attributes["onCommandCallback"];
        }

        if (this.attributes["onCommand"] != null) {
            menuItem.onCommandCallback = this.attributes["onCommand"];
        }

        /* istanbul ignore next */
        if (this.attributes["onMouseDownCallback"] != null) {
            menuItem.onMouseDownCallback = this.attributes["onMouseDownCallback"];
        }

        if (this.attributes["display"] != null) {
            menuItem.display = this.attributes["display"];
        }

        if (this.attributes["fontColor"] != null) {
            MenuItemBuilder.initStyle(menuItem);

            menuItem.styles["color"] = this.attributes["fontColor"];
        }

        if (this.attributes["fontSize"] != null) {
            MenuItemBuilder.initStyle(menuItem);

            menuItem.styles["font-size"] = this.attributes["fontSize"];
        }

       /* istanbul ignore next */ 
        if (this.attributes["fontBold"] != null) {
            MenuItemBuilder.initStyle(menuItem);

            if (this.attributes["fontBold"] === true || this.attributes["fontBold"] === "true") {
                menuItem.styles["font-weight"] = this.attributes["bold"];
            } else {
                menuItem.styles["font-weight"] = "normal";
            }
        }

        if (this.attributes["margin"] != null) {
            MenuItemBuilder.initStyle(menuItem);

            menuItem.styles["margin"] = this.attributes["margin"];
        }

        const keys = _.filter(_.keys(this.attributes), (key)=>{
            return MenuItemBuilder.knownKeys.indexOf(key) < 0;
        });

        if (keys && keys.length > 0) {
            menuItem.customAttributes = {};

            for (let key of keys) {
                menuItem.customAttributes[key] = this.attributes[key];
            }
        }

        return menuItem;
    }

    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     */
    appendChild(menuItem: MenuItemBuilder) {
        if (this.attributes["menuItems"] == null) {
            this.attributes["menuItems"] = [];
        }

        if (menuItem instanceof MenuItemBuilder) {
            this.attributes["menuItems"].push(menuItem);
        }
    }

    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     * 
     * @param menuItem 
     */
    static fromMenuItem(menuItem: MenuItem) {
        return new MenuItemBuilder(menuItem);
    }

    /**
     * Clear out style values for [[MenuItem]]
     * @param menuItem
     */
    static initStyle(menuItem: MenuItem) {
        if (menuItem.styles == null) {
            menuItem.styles = {};
        }
    }

    //free resource
    _free() {
        this._internalMenuItem = null;
        this.attributes = null;
    }
}