/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from "lodash";
/**
 * Class for creating [[MenuItems]]
 */
var MenuItemBuilder = /** @class */ (function () {
    /* istanbul ignore next */
    /**
     *
     * @param menuItem
     */
    function MenuItemBuilder(menuItem) {
        if (menuItem === void 0) { menuItem = null; }
        /**
         * Map of HTML attributes to add to menu item
         */
        this.attributes = {};
        this._internalMenuItem = menuItem;
    }
    /**
     * Create a menu separator using hyphens
     */
    /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    MenuItemBuilder.createHorizontalDivider = /**
     * Create a menu separator using hyphens
     * @return {?}
     */
    function () {
        /** @type {?} */
        var menuItem = new MenuItemBuilder();
        menuItem.setAttribute("text", "-");
        return menuItem;
    };
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @returns [[MenuItemBuilder]] instance
     */
    /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    MenuItemBuilder.createMenuItem = /**
     * Get a new [[MenuItemBuilder]] instance
     * @return {?} [[MenuItemBuilder]] instance
     */
    function () {
        return new MenuItemBuilder();
    };
    /**
     * Set text attribute
     * @param text
     */
    /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    MenuItemBuilder.prototype.setText = /**
     * Set text attribute
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.setAttribute("text", text);
    };
    /* istanbul ignore next */
    /**
     *
     * @param width
     */
    /**
     *
     * @param {?} width
     * @return {?}
     */
    MenuItemBuilder.prototype.setWidth = /**
     *
     * @param {?} width
     * @return {?}
     */
    function (width) {
        //don't think this should be doing anything, all menu item shared the same width
    };
    /* istanbul ignore next */
    /**
     *
     * @param img
     */
    /**
     *
     * @param {?} img
     * @return {?}
     */
    MenuItemBuilder.prototype.setImgHint = /**
     *
     * @param {?} img
     * @return {?}
     */
    function (img) {
        //TODO
    };
    /**
     * Sets event handler for mousedown
     * @param fn Mouse down event handler function
     */
    /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    MenuItemBuilder.prototype.setOnMouseDown = /**
     * Sets event handler for mousedown
     * @param {?} fn Mouse down event handler function
     * @return {?}
     */
    function (fn) {
        this.setAttribute("onMouseDownCallback", fn);
    };
    /* istanbul ignore next */
    /**
     * Set margin attribute
     * @param margin Should be number
     */
    /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    MenuItemBuilder.prototype.setMargin = /**
     * Set margin attribute
     * @param {?} margin Should be number
     * @return {?}
     */
    function (margin) {
        this.setAttribute("margin", margin);
    };
    /**
     * Set fontColor attribute
     * @param color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     */
    /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontColor = /**
     * Set fontColor attribute
     * @param {?} color Should be CSS valid color string (e.g. #ff0000, red, etc.)
     * @return {?}
     */
    function (color) {
        this.setAttribute("fontColor", color);
    };
    /**
     * Set fontSize attribute
     * @param size Should be number
     */
    /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontSize = /**
     * Set fontSize attribute
     * @param {?} size Should be number
     * @return {?}
     */
    function (size) {
        this.setAttribute("fontSize", size);
    };
    /**
     * Set fontBold attribute
     * @param bold
     */
    /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    MenuItemBuilder.prototype.setFontBold = /**
     * Set fontBold attribute
     * @param {?} bold
     * @return {?}
     */
    function (bold) {
        this.setAttribute("fontBold", bold);
    };
    /* istanbul ignore next */
    /**
     * Set custom attribute on [[MenuItem]]
     * @param name
     * @param value
     */
    /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    MenuItemBuilder.prototype.setAttribute = /**
     * Set custom attribute on [[MenuItem]]
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
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
    };
    /* istanbul ignore next */
    /**
     * Return the value of the attribute
     *
     * @param name the name of the attribute
     */
    /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    MenuItemBuilder.prototype.getAttribute = /**
     * Return the value of the attribute
     *
     * @param {?} name the name of the attribute
     * @return {?}
     */
    function (name) {
        return this.attributes[name];
    };
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param parentScreenId
     */
    /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    MenuItemBuilder.prototype.toMenuItem = /**
     * Convert [[MenuItemDirective]] to [[MenuItem]]
     * @param {?=} parentScreenId
     * @return {?}
     */
    function (parentScreenId) {
        var e_1, _a;
        /** @type {?} */
        var menuItem = {};
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
            menuItem.menuItems = _.map(this.attributes["menuItems"], function (subMenu) { return subMenu.toMenuItem(parentScreenId); });
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
        var keys = _.filter(_.keys(this.attributes), function (key) {
            return MenuItemBuilder.knownKeys.indexOf(key) < 0;
        });
        if (keys && keys.length > 0) {
            menuItem.customAttributes = {};
            try {
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    menuItem.customAttributes[key] = this.attributes[key];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return menuItem;
    };
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     */
    /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.prototype.appendChild = /**
     * Add [[MenuItemBuilder]] instance to menuItems attribute
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        if (this.attributes["menuItems"] == null) {
            this.attributes["menuItems"] = [];
        }
        if (menuItem instanceof MenuItemBuilder) {
            this.attributes["menuItems"].push(menuItem);
        }
    };
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param menuItem
     */
    /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.fromMenuItem = /**
     * Parse MenuItem and convert to a builder. Need for case where table column trigger context menu
     * prior to the contextmenu of row is activated. Thus the MenuItemComponent does not exists yet so
     * we need something as temporary.
     *
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        return new MenuItemBuilder(menuItem);
    };
    /**
     * Clear out style values for [[MenuItem]]
     * @param menuItem
     */
    /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    MenuItemBuilder.initStyle = /**
     * Clear out style values for [[MenuItem]]
     * @param {?} menuItem
     * @return {?}
     */
    function (menuItem) {
        if (menuItem.styles == null) {
            menuItem.styles = {};
        }
    };
    //free resource
    /**
     * @return {?}
     */
    MenuItemBuilder.prototype._free = /**
     * @return {?}
     */
    function () {
        this._internalMenuItem = null;
        this.attributes = null;
    };
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
    return MenuItemBuilder;
}());
export { MenuItemBuilder };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvbWVudS1pdGVtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7SUFleEIsMEJBQTBCO0lBQzFCOzs7T0FHRztJQUNILHlCQUFZLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZUFBeUI7Ozs7MEJBUEQsRUFBRTtRQVFsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3JDO0lBb0JEOztPQUVHOzs7OztJQUNJLHVDQUF1Qjs7OztJQUE5Qjs7UUFDSSxJQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLE9BQU8sUUFBUSxDQUFDO0tBQ25CO0lBRUQ7OztPQUdHOzs7OztJQUNJLDhCQUFjOzs7O0lBQXJCO1FBQ0ksT0FBTyxJQUFJLGVBQWUsRUFBRSxDQUFDO0tBQ2hDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpQ0FBTzs7Ozs7SUFBUCxVQUFRLElBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbkM7SUFFRCwwQkFBMEI7SUFDMUI7OztPQUdHOzs7Ozs7SUFDSCxrQ0FBUTs7Ozs7SUFBUixVQUFTLEtBQWE7O0tBRXJCO0lBRUQsMEJBQTBCO0lBQzFCOzs7T0FHRzs7Ozs7O0lBQ0gsb0NBQVU7Ozs7O0lBQVYsVUFBVyxHQUFXOztLQUVyQjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsd0NBQWM7Ozs7O0lBQWQsVUFBZSxFQUF5QjtRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FB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QVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLFFBQVEsWUFBWSxlQUFlLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0M7S0FDSjtJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7O0lBQ0ksNEJBQVk7Ozs7Ozs7O0lBQW5CLFVBQW9CLFFBQWtCO1FBQ2xDLE9BQU8sSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLHlCQUFTOzs7OztJQUFoQixVQUFpQixRQUFrQjtRQUMvQixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO0tBQ0o7SUFFRCxlQUFlOzs7O0lBQ2YsK0JBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztLQUMxQjs7OztnQ0E1UGtCO1FBQ2YsSUFBSTtRQUNKLE1BQU07UUFDTixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixXQUFXO1FBQ1gsU0FBUztRQUNULFdBQVc7UUFDWCxVQUFVO1FBQ1YsVUFBVTtRQUNWLFFBQVE7S0FDWDswQkExQ0w7O1NBT2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSBcIi4vbWVudS1pdGVtXCI7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG4vKipcbiAqIENsYXNzIGZvciBjcmVhdGluZyBbW01lbnVJdGVtc11dXG4gKi9cbmV4cG9ydCBjbGFzcyBNZW51SXRlbUJ1aWxkZXIge1xuICAgIC8vaW50ZXJuYWwgbWVudSBpdGVtIGZvciBzcGVjaWFsIGNhc2UsIERPIE5PVCB1c2VcbiAgICAvL3RoaXMgaXMgbmVlZGVkIHdoZW4gcmlnaHQgY2xpY2sgZXZlbnQgb2YgY2hpbGQgaXRlbSBpcyB0YWJsZSBjb2x1bW4gdHJpZ2dlciBiZWZvcmUgcm93XG4gICAgX2ludGVybmFsTWVudUl0ZW06IE1lbnVJdGVtO1xuXG4gICAgLyoqXG4gICAgICogTWFwIG9mIEhUTUwgYXR0cmlidXRlcyB0byBhZGQgdG8gbWVudSBpdGVtXG4gICAgICovXG4gICAgYXR0cmlidXRlczoge1tuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBtZW51SXRlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZW51SXRlbTogTWVudUl0ZW0gPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ludGVybmFsTWVudUl0ZW0gPSBtZW51SXRlbTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzXG4gICAgICovXG4gICAgc3RhdGljIGtub3duS2V5cyA9IFtcbiAgICAgICAgXCJpZFwiLFxuICAgICAgICBcInRleHRcIixcbiAgICAgICAgXCJvbkNvbW1hbmRcIixcbiAgICAgICAgXCJvbkNvbW1hbmRDYWxsYmFja1wiLFxuICAgICAgICBcIm9uTW91c2VEb3duQ2FsbGJhY2tcIixcbiAgICAgICAgXCJtZW51SXRlbXNcIixcbiAgICAgICAgXCJkaXNwbGF5XCIsXG4gICAgICAgIFwiZm9udENvbG9yXCIsXG4gICAgICAgIFwiZm9udEJvbGRcIixcbiAgICAgICAgXCJmb250U2l6ZVwiLFxuICAgICAgICBcIm1hcmdpblwiXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1lbnUgc2VwYXJhdG9yIHVzaW5nIGh5cGhlbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlSG9yaXpvbnRhbERpdmlkZXIoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtID0gbmV3IE1lbnVJdGVtQnVpbGRlcigpO1xuICAgICAgICBtZW51SXRlbS5zZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIsIFwiLVwiKTtcblxuICAgICAgICByZXR1cm4gbWVudUl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbmV3IFtbTWVudUl0ZW1CdWlsZGVyXV0gaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyBbW01lbnVJdGVtQnVpbGRlcl1dIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZU1lbnVJdGVtKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1lbnVJdGVtQnVpbGRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0ZXh0IGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSB0ZXh0IFxuICAgICAqL1xuICAgIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwidGV4dFwiLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB3aWR0aCBcbiAgICAgKi9cbiAgICBzZXRXaWR0aCh3aWR0aDogc3RyaW5nKSB7XG4gICAgICAgIC8vZG9uJ3QgdGhpbmsgdGhpcyBzaG91bGQgYmUgZG9pbmcgYW55dGhpbmcsIGFsbCBtZW51IGl0ZW0gc2hhcmVkIHRoZSBzYW1lIHdpZHRoXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaW1nIFxuICAgICAqL1xuICAgIHNldEltZ0hpbnQoaW1nOiBzdHJpbmcpIHtcbiAgICAgICAgLy9UT0RPXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBldmVudCBoYW5kbGVyIGZvciBtb3VzZWRvd25cbiAgICAgKiBAcGFyYW0gZm4gTW91c2UgZG93biBldmVudCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc2V0T25Nb3VzZURvd24oZm46ICh0aGlzQXJnPzogYW55KT0+dm9pZCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm9uTW91c2VEb3duQ2FsbGJhY2tcIiwgZm4pO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IG1hcmdpbiBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gbWFyZ2luIFNob3VsZCBiZSBudW1iZXJcbiAgICAgKi9cbiAgICBzZXRNYXJnaW4obWFyZ2luOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJtYXJnaW5cIiwgbWFyZ2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgZm9udENvbG9yIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSBjb2xvciBTaG91bGQgYmUgQ1NTIHZhbGlkIGNvbG9yIHN0cmluZyAoZS5nLiAjZmYwMDAwLCByZWQsIGV0Yy4pXG4gICAgICovXG4gICAgc2V0Rm9udENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJmb250Q29sb3JcIiwgY29sb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBmb250U2l6ZSBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0gc2l6ZSBTaG91bGQgYmUgbnVtYmVyXG4gICAgICovXG4gICAgc2V0Rm9udFNpemUoc2l6ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZm9udFNpemVcIiwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGZvbnRCb2xkIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSBib2xkIFxuICAgICAqL1xuICAgIHNldEZvbnRCb2xkKGJvbGQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImZvbnRCb2xkXCIsIGJvbGQpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IGN1c3RvbSBhdHRyaWJ1dGUgb24gW1tNZW51SXRlbV1dXG4gICAgICogQHBhcmFtIG5hbWUgXG4gICAgICogQHBhcmFtIHZhbHVlIFxuICAgICAqL1xuICAgIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ludGVybmFsTWVudUl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKE1lbnVJdGVtQnVpbGRlci5rbm93bktleXMuaW5kZXhPZihuYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzID0ge307ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbS5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZVxuICAgICAqIFxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IFtbTWVudUl0ZW1EaXJlY3RpdmVdXSB0byBbW01lbnVJdGVtXV1cbiAgICAgKiBAcGFyYW0gcGFyZW50U2NyZWVuSWQgXG4gICAgICovXG4gICAgdG9NZW51SXRlbShwYXJlbnRTY3JlZW5JZD86IHN0cmluZyk6IE1lbnVJdGVtIHtcbiAgICAgICAgY29uc3QgbWVudUl0ZW06IE1lbnVJdGVtID0ge307XG4gICAgICAgIG1lbnVJdGVtLnBhcmVudFNjcmVlbklkID0gcGFyZW50U2NyZWVuSWQ7XG5cbiAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiaWRcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uaWQgPSB0aGlzLmF0dHJpYnV0ZXNbXCJpZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJ0ZXh0XCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLnRleHQgPSB0aGlzLmF0dHJpYnV0ZXNbXCJ0ZXh0XCJdO1xuICAgICAgICB9XG5cbiAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wibWVudUl0ZW1zXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLm1lbnVJdGVtcyA9IF8ubWFwKHRoaXMuYXR0cmlidXRlc1tcIm1lbnVJdGVtc1wiXSwgKHN1Yk1lbnUpPT5zdWJNZW51LnRvTWVudUl0ZW0ocGFyZW50U2NyZWVuSWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJvbkNvbW1hbmRDYWxsYmFja1wiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZW51SXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9IHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZENhbGxiYWNrXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZFwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZW51SXRlbS5vbkNvbW1hbmRDYWxsYmFjayA9IHRoaXMuYXR0cmlidXRlc1tcIm9uQ29tbWFuZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJvbk1vdXNlRG93bkNhbGxiYWNrXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLm9uTW91c2VEb3duQ2FsbGJhY2sgPSB0aGlzLmF0dHJpYnV0ZXNbXCJvbk1vdXNlRG93bkNhbGxiYWNrXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlc1tcImRpc3BsYXlcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uZGlzcGxheSA9IHRoaXMuYXR0cmlidXRlc1tcImRpc3BsYXlcIl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiZm9udENvbG9yXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIE1lbnVJdGVtQnVpbGRlci5pbml0U3R5bGUobWVudUl0ZW0pO1xuXG4gICAgICAgICAgICBtZW51SXRlbS5zdHlsZXNbXCJjb2xvclwiXSA9IHRoaXMuYXR0cmlidXRlc1tcImZvbnRDb2xvclwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJmb250U2l6ZVwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBNZW51SXRlbUJ1aWxkZXIuaW5pdFN0eWxlKG1lbnVJdGVtKTtcblxuICAgICAgICAgICAgbWVudUl0ZW0uc3R5bGVzW1wiZm9udC1zaXplXCJdID0gdGhpcy5hdHRyaWJ1dGVzW1wiZm9udFNpemVcIl07XG4gICAgICAgIH1cblxuICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW1wiZm9udEJvbGRcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgTWVudUl0ZW1CdWlsZGVyLmluaXRTdHlsZShtZW51SXRlbSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJmb250Qm9sZFwiXSA9PT0gdHJ1ZSB8fCB0aGlzLmF0dHJpYnV0ZXNbXCJmb250Qm9sZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBtZW51SXRlbS5zdHlsZXNbXCJmb250LXdlaWdodFwiXSA9IHRoaXMuYXR0cmlidXRlc1tcImJvbGRcIl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtLnN0eWxlc1tcImZvbnQtd2VpZ2h0XCJdID0gXCJub3JtYWxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJtYXJnaW5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgTWVudUl0ZW1CdWlsZGVyLmluaXRTdHlsZShtZW51SXRlbSk7XG5cbiAgICAgICAgICAgIG1lbnVJdGVtLnN0eWxlc1tcIm1hcmdpblwiXSA9IHRoaXMuYXR0cmlidXRlc1tcIm1hcmdpblwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmZpbHRlcihfLmtleXModGhpcy5hdHRyaWJ1dGVzKSwgKGtleSk9PntcbiAgICAgICAgICAgIHJldHVybiBNZW51SXRlbUJ1aWxkZXIua25vd25LZXlzLmluZGV4T2Yoa2V5KSA8IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChrZXlzICYmIGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtLmN1c3RvbUF0dHJpYnV0ZXNba2V5XSA9IHRoaXMuYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbnVJdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBbW01lbnVJdGVtQnVpbGRlcl1dIGluc3RhbmNlIHRvIG1lbnVJdGVtcyBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBhcHBlbmRDaGlsZChtZW51SXRlbTogTWVudUl0ZW1CdWlsZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbXCJtZW51SXRlbXNcIl0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW1wibWVudUl0ZW1zXCJdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVudUl0ZW0gaW5zdGFuY2VvZiBNZW51SXRlbUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlc1tcIm1lbnVJdGVtc1wiXS5wdXNoKG1lbnVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIE1lbnVJdGVtIGFuZCBjb252ZXJ0IHRvIGEgYnVpbGRlci4gTmVlZCBmb3IgY2FzZSB3aGVyZSB0YWJsZSBjb2x1bW4gdHJpZ2dlciBjb250ZXh0IG1lbnVcbiAgICAgKiBwcmlvciB0byB0aGUgY29udGV4dG1lbnUgb2Ygcm93IGlzIGFjdGl2YXRlZC4gVGh1cyB0aGUgTWVudUl0ZW1Db21wb25lbnQgZG9lcyBub3QgZXhpc3RzIHlldCBzb1xuICAgICAqIHdlIG5lZWQgc29tZXRoaW5nIGFzIHRlbXBvcmFyeS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbWVudUl0ZW0gXG4gICAgICovXG4gICAgc3RhdGljIGZyb21NZW51SXRlbShtZW51SXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZW51SXRlbUJ1aWxkZXIobWVudUl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFyIG91dCBzdHlsZSB2YWx1ZXMgZm9yIFtbTWVudUl0ZW1dXVxuICAgICAqIEBwYXJhbSBtZW51SXRlbVxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0U3R5bGUobWVudUl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmIChtZW51SXRlbS5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbWVudUl0ZW0uc3R5bGVzID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2ZyZWUgcmVzb3VyY2VcbiAgICBfZnJlZSgpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxNZW51SXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IG51bGw7XG4gICAgfVxufSJdfQ==