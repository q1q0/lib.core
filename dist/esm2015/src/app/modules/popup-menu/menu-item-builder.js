/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from "lodash";
/**
 * Class for creating [[MenuItems]]
 */
export class MenuItemBuilder {
    /**
     *
     * @param {?=} menuItem
     */
    constructor(menuItem = null) {
        /**
         * Map of HTML attributes to add to menu item
         */
        this.attributes = {};
        this._internalMenuItem = menuItem;
    }
    /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    static createHorizontalDivider() {
        /** @type {?} */
        const menuItem = new MenuItemBuilder();
        menuItem.setAttribute("text", "-");
        return menuItem;
    }
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    static createMenuItem() {
        return new MenuItemBuilder();
    }
    /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        this.setAttribute("text", text);
    }
    /**
     *
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        //don't think this should be doing anything, all menu item shared the same width
    }
    /**
     *
     * @param {?} img
     * @return {?}
     */
    setImgHint(img) {
        //TODO
    }
    /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    setOnMouseDown(fn) {
        this.setAttribute("onMouseDownCallback", fn);
    }
    /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    setMargin(margin) {
        this.setAttribute("margin", margin);
    }
    /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    setFontColor(color) {
        this.setAttribute("fontColor", color);
    }
    /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    setFontSize(size) {
        this.setAttribute("fontSize", size);
    }
    /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    setFontBold(bold) {
        this.setAttribute("fontBold", bold);
    }
    /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        this.attributes[name] = value;
        if (this._internalMenuItem != null) {
            if (MenuItemBuilder.knownKeys.indexOf(name) >= 0) {
                this._internalMenuItem[name] = value;
            }
            else {
                if (this._internalMenuItem.customAttributes == null) {
                    this._internalMenuItem.customAttributes = {};
                }
                this._internalMenuItem.customAttributes[name] = value;
            }
        }
    }
    /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    getAttribute(name) {
        return this.attributes[name];
    }
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    toMenuItem(parentScreenId) {
        /** @type {?} */
        const menuItem = {};
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
            menuItem.menuItems = _.map(this.attributes["menuItems"], (subMenu) => subMenu.toMenuItem(parentScreenId));
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
            }
            else {
                menuItem.styles["font-weight"] = "normal";
            }
        }
        if (this.attributes["margin"] != null) {
            MenuItemBuilder.initStyle(menuItem);
            menuItem.styles["margin"] = this.attributes["margin"];
        }
        /** @type {?} */
        const keys = _.filter(_.keys(this.attributes), (key) => {
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
     * @param {?} menuItem
     * @return {?}
     */
    appendChild(menuItem) {
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
     * @param {?} menuItem
     * @return {?}
     */
    static fromMenuItem(menuItem) {
        return new MenuItemBuilder(menuItem);
    }
    /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    static initStyle(menuItem) {
        if (menuItem.styles == null) {
            menuItem.styles = {};
        }
    }
    /**
     * @return {?}
     */
    _free() {
        this._internalMenuItem = null;
        this.attributes = null;
    }
}
/**
 * Allowed attribute names
 */
MenuItemBuilder.knownKeys = [
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
if (false) {
    /**
     * Allowed attribute names
     * @type {?}
     */
    MenuItemBuilder.knownKeys;
    /** @type {?} */
    MenuItemBuilder.prototype._internalMenuItem;
    /**
     * Map of HTML attributes to add to menu item
     * @type {?}
     */
    MenuItemBuilder.prototype.attributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvbWVudS1pdGVtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7O0FBSzVCLE1BQU07Ozs7O0lBZUYsWUFBWSxXQUFxQixJQUFJOzs7OzBCQVBELEVBQUU7UUFRbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztLQUNyQzs7Ozs7SUF1QkQsTUFBTSxDQUFDLHVCQUF1Qjs7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN2QyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuQyxPQUFPLFFBQVEsQ0FBQztLQUNuQjs7Ozs7SUFNRCxNQUFNLENBQUMsY0FBYztRQUNqQixPQUFPLElBQUksZUFBZSxFQUFFLENBQUM7S0FDaEM7Ozs7OztJQU1ELE9BQU8sQ0FBQyxJQUFZO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFPRCxRQUFRLENBQUMsS0FBYTs7S0FFckI7Ozs7OztJQU9ELFVBQVUsQ0FBQyxHQUFXOztLQUVyQjs7Ozs7O0lBTUQsY0FBYyxDQUFDLEVBQXlCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEQ7Ozs7OztJQU9ELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFNRCxZQUFZLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMs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QUcsSUFBSSxDQUFDO0tBQzFCOzs7Ozs0QkE1UGtCO0lBQ2YsSUFBSTtJQUNKLE1BQU07SUFDTixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixXQUFXO0lBQ1gsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsVUFBVTtJQUNWLFFBQVE7Q0FDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSBcIi4vbWVudS1pdGVtXCI7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG4vKipcbiAqIENsYXNzIGZvciBjcmVhdGluZyBbW01lbnVJdGVtc11dXG4gKi9cbmV4cG9ydCBjbGFzcyBNZW51SXRlbUJ1aWxkZXIge1xuICAgIC8vaW50ZXJuYWwgbWVudSBpdGVtIGZvciBzcGVjaWFsIGNhc2UsIERPIE5PVCB1c2VcbiAgICAvL3RoaXMgaXMgbmVlZGVkIHdoZW4gcmlnaHQgY2xpY2sgZXZlbnQgb2YgY2hpbGQgaXRlbSBpcyB0YWJsZSBjb2x1bW4gdHJpZ2dlciBiZWZvcmUgcm93XG4gICAgX2ludGVybmFsTWVudUl0ZW06IE1lbnVJdGVtO1xuXG4gICAgLyoqXG4gICAgICogTWFwIG9mIEhUTUwgYXR0cmlidXRlcyB0byBhZGQgdG8gbWVudSBpdGVtXG4gICAgICovXG4gICAgYXR0cmlidXRlczoge1tuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBtZW51SXRlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZW51SXRlbTogTWVudUl0ZW0gPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ludGVybmFsTWVudUl0ZW0gPSBtZW51SXRlbTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzXG4gICAgICovXG4gICAgc3RhdGljIGtub3duS2V5cyA9IFtcbiAgICAgICAgXCJpZFwiLFxuICAgICAgICBcInRleHRcIixcbiAgICAgICAgXCJvbkNvbW1hbmRcIixcbiAgICAgICAgXCJvbkNvbW1hbmRDYWxsYmFja1wiLFxuICAgICAgICBcIm9uTW91c2VEb3duQ2FsbGJhY2tcIixcbiAgICAgICAgXCJtZW51SXRlbXNcIixcbiAgICAgICAgXCJkaXNwbGF5XCIsXG4gICAgICAgIFwiZm9udENvbG9yXCIsXG4gICAgICAgIFwiZm9udEJvbGRcIixcbiAgICAgICAgXCJmb250U2l6ZVwiLFxuICAgICAgICBcIm1hcmdpblwiXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1lbnUgc2VwYXJhdG9yIHVzaW5nIGh5cGhlbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlSG9yaXpvbnRhbERpdmlkZXIoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtID0gbmV3IE1lbnVJdGVtQnVpbGRlcigpO1xuICAgICAgICBtZW51SXRlbS5zZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIsIFwiLVwiKTtcblxuICAgICAgICByZXR1cm4gbWVudUl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbmV3IFtbTWVudUl0ZW1CdWlsZGVyXV0gaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyBbW01lbnVJdGVtQnVpbGRlcl1dIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZU1lbnVJdGVtKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1lbnVJdGVtQnVpbGRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0ZXh0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSB0ZXh0IFxuICAgICAqL1xuICAgIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwidGV4dFwiLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB3aWR0aCBcbiAgICAgKi9cbiAgICBzZXRXaWR0aCh3aWR0aDogc3RyaW5nKSB7XG4gICAgICAgIC8vZG9uJ3QgdGhpbmsgdGhpcyBzaG91bGQgYmUgZG9pbmcgYW55dGhpbmcsIGFsbCBtZW51IGl0ZW0gc2hhcmVkIHRoZSBzYW1lIHdpZHRoXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaW1nIFxuICAgICAqL1xuICAgIHNldEltZ0hpbnQoaW1nOiBzdHJpbmcpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBldmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd25cbiAgICAgKiBAcGFyYW0gZm4gTW91c2UgZG93biBldmVudCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc2V0T25Nb3VzZURvd24oZm46ICh0aGlzQXJnPzogYW55KT0+dm9pZCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm9uTW91c2VEb3duQ2FsbGJhY2tcIiwgZm4pO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IG1hcmdpbiBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gbWFyZ2luIFNob3VsZCBiZSBudW1iZXJcbiAgICAgKi9cbiAgICBzZXRNYXJnaW4obWFyZ2luOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJtYXJnaW5cIiwgbWFyZ2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgZm9udENvbG9yIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSBjb2xvciBTaG91bGQgYmUgQ1NTIHZhbGlkIGNvbG9yIHN0cmluZyAoZS5nLiAjZmYwMDAwLCByZWQsIGV0Yy4pXG4gICAgICovXG4gICAgc2V0Rm9udENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJmb250Q29sb3JcIiwgY29sb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBmb250U2l6ZSBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gc2l6ZSBTaG91bGQgYmUgbnVtYmVyXG4gICAgICovXG4gICAgc2V0Rm9udFNpemUoc2l6ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZm9udFNpemVcIiwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGZvbnRCb2xkIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSBib2xkIFxuICAgICAqL1xuICAgIHNldEZvbnRCb2xkKGJvbGQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImZvbnRCb2xkXCIsIGJvbGQpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IGN1c3RvbSBhdHRyaWJ1dGUgb24gW1tNZW51SXRlbV1dXG4gICAgICogQHBhcmFtIG5hbWUgXG4gICAgICogQHBhcmFtIHZhbHVlIFxuICAgICAqL1xuICAgIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ludGVybmFsTWVudUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKE1lbnVJdGVtQnVpbGRlci5rbm93bktleXMuaW5kZXhPZihuYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzID0ge307ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZVxuICAgICAqIFxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IFtbTWVudUl0ZW1EaXJlY3RpdmVdXSB0byBbW01lbnVJdGVtXV1cbiAgICAgKiBAcGFyYW0gcGFyZW50U2NyZWVuSWQgXG4gICAgICovXG4gICAgdG9NZW51SXRlbShwYXJlbnRTY3JlZW5JZD86IHN0cmluZyk6IE1lbnVJdGVtIHtcbiAgICAgICAgY29uc3QgbWVudUl0ZW06IE1lbnVJdGVtID0ge307XG4gICAgICAgIG1lbnVJdGVtLnBhcmVudFNjcmVlbklkID0gcGFyZW50U2NyZWVuSWQ7XG5cbiAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiaWRcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uaWQgPSB0aGlzLmF0dHJpYnV0ZXNbXCJpZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJ0ZXh0XCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLnRleHQgPSB0aGlzLmF0dHJpYnV0ZXNbXCJ0ZXh0XCJdO1xuICAgICAgICB9XG5cbiAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wibWVudUl0ZW1zXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLm1lbnVJdGVtcyA9IF8ubWFwKHRoaXMuYXR0cmlidXRlc1tcIm1lbnVJdGVtc1wiXSwgKHN1Yk1lbnUpPT5zdWJNZW51LnRvTWVudUl0ZW0ocGFyZW50U2NyZWVuSWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJvbkNvbW1hbmRDYWxsYmFja1wiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZW51SXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9IHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZENhbGxiYWNrXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZFwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZW51SXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9IHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJvbk1vdXNlRG93bkNhbGxiYWNrXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLm9uTW91c2VEb3duQ2FsbGJhY2sgPSB0aGlzLmF0dHJpYnV0ZXNbXCJvbk1vdXNlRG93bkNhbGxiYWNrXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlc1tcImRpc3BsYXlcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uZGlzcGxheSA9IHRoaXMuYXR0cmlidXRlc1tcImRpc3BsYXlcIl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiZm9udENvbG9yXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIE1lbnVJdGVtQnVpbGRlci5pbml0U3R5bGUobWVudUl0ZW0pO1xuXG4gICAgICAgICAgICBtZW51SXRlbS5zdHlsZXNbXCJjb2xvclwiXSA9IHRoaXMuYXR0cmlidXRlc1tcImZvbnRDb2xvclwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJmb250U2l6ZVwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBNZW51SXRlbUJ1aWxkZXIuaW5pdFN0eWxlKG1lbnVJdGVtKTtcblxuICAgICAgICAgICAgbWVudUl0ZW0uc3R5bGVzW1wiZm9udC1zaXplXCJdID0gdGhpcy5hdHRyaWJ1dGVzW1wiZm9udFNpemVcIl07XG4gICAgICAgIH1cblxuICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiZm9udEJvbGRcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgTWVudUl0ZW1CdWlsZGVyLmluaXRTdHlsZShtZW51SXRlbSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJmb250Qm9sZFwiXSA9PT0gdHJ1ZSB8fCB0aGlzLmF0dHJpYnV0ZXNbXCJmb250Qm9sZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBtZW51SXRlbS5zdHlsZXNbXCJmb250LXdlaWdodFwiXSA9IHRoaXMuYXR0cmlidXRlc1tcImJvbGRcIl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtLnN0eWxlc1tcImZvbnQtd2VpZ2h0XCJdID0gXCJub3JtYWxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJtYXJnaW5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgTWVudUl0ZW1CdWlsZGVyLmluaXRTdHlsZShtZW51SXRlbSk7XG5cbiAgICAgICAgICAgIG1lbnVJdGVtLnN0eWxlc1tcIm1hcmdpblwiXSA9IHRoaXMuYXR0cmlidXRlc1tcIm1hcmdpblwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmZpbHRlcihfLmtleXModGhpcy5hdHRyaWJ1dGVzKSwgKGtleSk9PntcbiAgICAgICAgICAgIHJldHVybiBNZW51SXRlbUJ1aWxkZXIua25vd25LZXlzLmluZGV4T2Yoa2V5KSA8IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChrZXlzICYmIGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtLmN1c3RvbUF0dHJpYnV0ZXNba2V5XSA9IHRoaXMuYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbnVJdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBbW01lbnVJdGVtQnVpbGRlcl1dIGluc3RhbmNlIHRvIG1lbnVJdGVtcyBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBhcHBlbmRDaGlsZChtZW51SXRlbTogTWVudUl0ZW1CdWlsZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJtZW51SXRlbXNcIl0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW1wibWVudUl0ZW1zXCJdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVudUl0ZW0gaW5zdGFuY2VvZiBNZW51SXRlbUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlc1tcIm1lbnVJdGVtc1wiXS5wdXNoKG1lbnVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIE1lbnVJdGVtIGFuZCBjb252ZXJ0IHRvIGEgYnVpbGRlci4gTmVlZCBmb3IgY2FzZSB3aGVyZSB0YWJsZSBjb2x1bW4gdHJpZ2dlciBjb250ZXh0IG1lbnVcbiAgICAgKiBwcmlvciB0byB0aGUgY29udGV4dG1lbnUgb2Ygcm93IGlzIGFjdGl2YXRlZC4gVGh1cyB0aGUgTWVudUl0ZW1Db21wb25lbnQgZG9lcyBub3QgZXhpc3RzIHlldCBzb1xuICAgICAqIHdlIG5lZWQgc29tZXRoaW5nIGFzIHRlbXBvcmFyeS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbWVudUl0ZW0gXG4gICAgICovXG4gICAgc3RhdGljIGZyb21NZW51SXRlbShtZW51SXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZW51SXRlbUJ1aWxkZXIobWVudUl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIG91dCBzdHlsZSB2YWx1ZXMgZm9yIFtbTWVudUl0ZW1dXVxuICAgICAqIEBwYXJhbSBtZW51SXRlbVxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0U3R5bGUobWVudUl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmIChtZW51SXRlbS5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uc3R5bGVzID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2ZyZWUgcmVzb3VyY2VcbiAgICBfZnJlZSgpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IG51bGw7XG4gICAgfVxufSJdfQ==