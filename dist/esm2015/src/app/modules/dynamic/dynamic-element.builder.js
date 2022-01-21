/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class DynamicElementBuilder {
    /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    static createLabelElement(whiteSpaceWrap = false, padding = null) {
        /** @type {?} */
        const el = new DynamicElementBuilder();
        el.dynamicElement = {
            type: "label"
        };
        el.initStyle();
        if (whiteSpaceWrap === true) {
            el.dynamicElement.styles["white-space"] = "nowrap";
        }
        if (padding != null && padding !== '') {
            el.dynamicElement.styles["padding"] = padding;
        }
        return el;
    }
    /**
     * @return {?}
     */
    toDynamicElement() {
        return this.dynamicElement;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setId(id) {
        this.dynamicElement.id = id;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        this.dynamicElement.text = text;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText2(text) {
        //not sure what this is, for now, custom attribute
        this.setAttribute("text2", text);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        this.dynamicElement.value = value;
    }
    /**
     * @param {?} tooltip
     * @return {?}
     */
    setTooltip(tooltip) {
        this.dynamicElement.tooltip = tooltip;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    setVisible(visible) {
        this.dynamicElement.visible = visible;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    setEnabled(enabled) {
        this.dynamicElement.enabled = enabled;
    }
    /**
     * @param {?} popupMenuId
     * @return {?}
     */
    setPopup(popupMenuId) {
        this.dynamicElement.popupMenuId = popupMenuId;
    }
    /**
     * @param {?} bgColor
     * @return {?}
     */
    setBgColor(bgColor) {
        this.initStyle();
        this.dynamicElement.styles["background-color"] = this.checkCustomColor(bgColor);
    }
    /**
     * @param {?} cssClass
     * @return {?}
     */
    addCssClass(cssClass) {
        this.initStyle();
        if (this.dynamicElement.cssClass == undefined) {
            this.dynamicElement.cssClass = cssClass;
        }
        else {
            this.dynamicElement.cssClass = this.dynamicElement.cssClass + " " + cssClass;
        }
    }
    /**
     * @param {?} borderColor
     * @return {?}
     */
    setBorderColor(borderColor) {
        this.initStyle();
        this.dynamicElement.styles["border-color"] = this.checkCustomColor(borderColor);
        this.initBorderStyle();
    }
    /**
     * @param {?} borderWidth
     * @return {?}
     */
    setBorderWidth(borderWidth) {
        this.initStyle();
        this.dynamicElement.styles["border-width"] = this.convertStyleUnit(borderWidth);
        this.initBorderStyle();
    }
    /**
     * @param {?} borderStyle
     * @return {?}
     */
    setBorderStyle(borderStyle) {
        this.initStyle();
        this.dynamicElement.styles["border-style"] = borderStyle;
    }
    /**
     * @param {?} height
     * @return {?}
     */
    setHeight(height) {
        this.initStyle();
        this.dynamicElement.styles["height"] = height + "px";
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        this.initStyle();
        this.dynamicElement.styles["width"] = width + "px";
    }
    /**
     * @param {?} x
     * @return {?}
     */
    setX(x) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["left"] = x + "px";
    }
    /**
     * @param {?} y
     * @return {?}
     */
    setY(y) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["top"] = y + "px";
    }
    /**
     * @param {?} z
     * @return {?}
     */
    setZ(z) {
        this.initStyle();
        this.dynamicElement.styles["z-index"] = z;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    setFontBold(boo) {
        this.initStyle();
        if (boo === "true" || boo === true) {
            this.dynamicElement.styles["font-weight"] = "bold";
        }
        else {
            this.dynamicElement.styles["font-weight"] = "normal";
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setFontSize(size) {
        this.initStyle();
        this.dynamicElement.styles["font-size"] = size + "px";
    }
    /**
     * @param {?} color
     * @return {?}
     */
    setFontColor(color) {
        this.initStyle();
        this.dynamicElement.styles["color"] = this.checkCustomColor(color);
    }
    /**
     * @param {?} margin
     * @return {?}
     */
    setMargin(margin) {
        this.initStyle();
        this.dynamicElement.styles["margin"] = this.convertStyleUnit(margin);
    }
    /**
     * @param {?} align
     * @return {?}
     */
    setAlignVertical(align) {
        this.initStyle();
        if (align === "center") {
            align = "middle";
        }
        this.dynamicElement.styles["vertical-align"] = align;
    }
    /**
     * @param {?} align
     * @return {?}
     */
    setAlignHorizontal(align) {
        this.initStyle();
        this.dynamicElement.styles["text-align"] = align;
    }
    /**
     * @param {?} borderCorner
     * @return {?}
     */
    setBorderCorner(borderCorner) {
        this.initStyle();
        this.dynamicElement.styles["border-radius"] = this.convertStyleUnit(borderCorner);
    }
    /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    setDropShadowColor(dropShadowColor) {
        this.dropShadowColor = this.checkCustomColor(dropShadowColor);
        this.setBoxShadow();
    }
    /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    setDropShadowOffset(dropShadowOffset) {
        this.dropShadowOffset = dropShadowOffset;
        this.setBoxShadow();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setOnContextMenu(fn) {
        this.dynamicElement.onContextMenu = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setOnCommand(fn) {
        this.dynamicElement.onCommand = fn;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (this.dynamicElement.customAttributes == null) {
            this.dynamicElement.customAttributes = {};
        }
        this.dynamicElement.customAttributes[name] = value;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    setRichText(str) {
        this.dynamicElement.richText = str === true || str === "true";
    }
    /**
     * @param {?} child
     * @return {?}
     */
    appendChild(child) {
        if (this.dynamicElement.children == null) {
            this.dynamicElement.children = [child.dynamicElement];
        }
        else {
            this.dynamicElement.children.push(child.dynamicElement);
        }
    }
    /**
     * @return {?}
     */
    initStyle() {
        if (this.dynamicElement.styles == null) {
            this.dynamicElement.styles = {};
        }
    }
    /**
     * @return {?}
     */
    initBorderStyle() {
        if (this.dynamicElement.styles["border-style"] == null || this.dynamicElement.styles["border-style"] == "") {
            this.dynamicElement.styles["border-style"] = "solid";
        }
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    convertStyleUnit(unit) {
        if (unit != null && unit.indexOf(",") > 0) {
            unit = unit.split(",").map(m => m + "px").join(" ");
        }
        else if (unit != null && unit !== "") {
            unit = unit + "px";
        }
        return unit;
    }
    /**
     * @return {?}
     */
    setBoxShadow() {
        if (this.dropShadowColor != null && this.dropShadowOffset != null) {
            this.initStyle();
            this.dynamicElement.styles["box-shadow"] = `${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowColor}`;
        }
    }
    /**
     * @param {?} color
     * @return {?}
     */
    checkCustomColor(color) {
        if (color != null && color.indexOf("#") === 0 && color.length > 7) {
            color = "var(" + color.replace("#", "--") + ")";
        }
        return color;
    }
}
if (false) {
    /** @type {?} */
    DynamicElementBuilder.prototype.dynamicElement;
    /** @type {?} */
    DynamicElementBuilder.prototype.dropShadowColor;
    /** @type {?} */
    DynamicElementBuilder.prototype.dropShadowOffset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1lbGVtZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2R5bmFtaWMvZHluYW1pYy1lbGVtZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU07Ozs7OztJQUtGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBMEIsS0FBSyxFQUFFLFVBQWtCLElBQUk7O1FBQzdFLE1BQU0sRUFBRSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUN2QyxFQUFFLENBQUMsY0FBYyxHQUFHO1lBQ2hCLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFFRixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZixJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDekIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3REO1FBRUQsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDbkMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxFQUFFLENBQUM7S0FDYjs7OztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxLQUFLLENBQUMsRUFBVTtRQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDbkM7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVk7O1FBRWpCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3BDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNyQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZTtRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDekM7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUN6Qzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3pDOzs7OztJQUVELFFBQVEsQ0FBQyxXQUFtQjtRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7S0FDakQ7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25GOzs7OztJQUVELFdBQVcsQ0FBQyxRQUFnQjtRQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzNDO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO1NBQ2hGO0tBQ0o7Ozs7O0lBRUQsY0FBYyxDQUFDLFdBQW1CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELGNBQWMsQ0FBQyxXQUFtQjtRQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxjQUFjLENBQUMsV0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUM1RDs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztLQUN4RDs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztLQUN0RDs7Ozs7SUFFRCxJQUFJLENBQUMsQ0FBa0I7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ2pEOzs7OztJQUVELElBQUksQ0FBQyxDQUFrQjtRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDaEQ7Ozs7O0lBRUQsSUFBSSxDQUFDLENBQWtCO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUU7S0FDOUM7Ozs7O0lBR0QsV0FBVyxDQUFDLEdBQXFCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDdEQ7YUFBTTtZQUNILElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUN4RDtLQUNKOzs7OztJQUVELFdBQVcsQ0FBQyxJQUFxQjtRQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztLQUN6RDs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RFOzs7OztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEU7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3BCLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN4RDs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDcEQ7Ozs7O0lBRUQsZUFBZSxDQUFDLFlBQW9CO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDckY7Ozs7O0lBRUQsa0JBQWtCLENBQUMsZUFBdUI7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELG1CQUFtQixDQUFDLGdCQUF3QjtRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQXlCO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUMxQzs7Ozs7SUFFRCxZQUFZLENBQUMsRUFBeUI7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3RDOzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQUs7UUFDNUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3REOzs7OztJQUVELFdBQVcsQ0FBQyxHQUFxQjtRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxNQUFNLENBQUM7S0FDakU7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQTRCO1FBQ3BDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNEO0tBQ0o7Ozs7SUFFTyxTQUFTO1FBQ2IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ25DOzs7OztJQUdHLGVBQWU7UUFDbkIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUN4RDs7Ozs7O0lBR0csZ0JBQWdCLENBQUMsSUFBWTtRQUNqQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3BDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLENBQUM7Ozs7O0lBR1IsWUFBWTtRQUNoQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pKOzs7Ozs7SUFHRyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQ2xDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvRCxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNuRDtRQUVELE9BQU8sS0FBSyxDQUFDOztDQUVwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtaWNFbGVtZW50IH0gZnJvbSBcIi4vZHluYW1pYy1lbGVtZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRWxlbWVudEJ1aWxkZXIge1xuICAgIHByaXZhdGUgZHluYW1pY0VsZW1lbnQ6IER5bmFtaWNFbGVtZW50O1xuICAgIHByaXZhdGUgZHJvcFNoYWRvd0NvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkcm9wU2hhZG93T2Zmc2V0OiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgY3JlYXRlTGFiZWxFbGVtZW50KHdoaXRlU3BhY2VXcmFwOiBib29sZWFuID0gZmFsc2UsIHBhZGRpbmc6IHN0cmluZyA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgZWwgPSBuZXcgRHluYW1pY0VsZW1lbnRCdWlsZGVyKCk7XG4gICAgICAgIGVsLmR5bmFtaWNFbGVtZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogXCJsYWJlbFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgZWwuaW5pdFN0eWxlKCk7XG5cbiAgICAgICAgaWYgKHdoaXRlU3BhY2VXcmFwID09PSB0cnVlKSB7XG4gICAgICAgICAgICBlbC5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJ3aGl0ZS1zcGFjZVwiXSA9IFwibm93cmFwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFkZGluZyAhPSBudWxsICYmIHBhZGRpbmcgIT09ICcnKSB7XG4gICAgICAgICAgICBlbC5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJwYWRkaW5nXCJdID0gcGFkZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICB0b0R5bmFtaWNFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5keW5hbWljRWxlbWVudDtcbiAgICB9XG5cbiAgICBzZXRJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuaWQgPSBpZDtcbiAgICB9XG5cbiAgICBzZXRUZXh0KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIHNldFRleHQyKHRleHQ6IHN0cmluZykge1xuICAgICAgICAvL25vdCBzdXJlIHdoYXQgdGhpcyBpcywgZm9yIG5vdywgY3VzdG9tIGF0dHJpYnV0ZVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInRleHQyXCIsIHRleHQpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNldFRvb2x0aXAodG9vbHRpcDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQudG9vbHRpcCA9IHRvb2x0aXA7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQudmlzaWJsZSA9IHZpc2libGU7XG4gICAgfVxuXG4gICAgc2V0RW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuZW5hYmxlZCA9IGVuYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0UG9wdXAocG9wdXBNZW51SWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnBvcHVwTWVudUlkID0gcG9wdXBNZW51SWQ7XG4gICAgfVxuXG4gICAgc2V0QmdDb2xvcihiZ0NvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5jaGVja0N1c3RvbUNvbG9yKGJnQ29sb3IpO1xuICAgIH1cblxuICAgIGFkZENzc0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgaWYgKHRoaXMuZHluYW1pY0VsZW1lbnQuY3NzQ2xhc3MgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuY3NzQ2xhc3MgPSBjc3NDbGFzcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuY3NzQ2xhc3MgPSB0aGlzLmR5bmFtaWNFbGVtZW50LmNzc0NsYXNzICsgXCIgXCIgKyBjc3NDbGFzcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEJvcmRlckNvbG9yKGJvcmRlckNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJib3JkZXItY29sb3JcIl0gPSB0aGlzLmNoZWNrQ3VzdG9tQ29sb3IoYm9yZGVyQ29sb3IpO1xuICAgICAgICB0aGlzLmluaXRCb3JkZXJTdHlsZSgpO1xuICAgIH1cblxuICAgIHNldEJvcmRlcldpZHRoKGJvcmRlcldpZHRoOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJib3JkZXItd2lkdGhcIl0gPSB0aGlzLmNvbnZlcnRTdHlsZVVuaXQoYm9yZGVyV2lkdGgpO1xuICAgICAgICB0aGlzLmluaXRCb3JkZXJTdHlsZSgpO1xuICAgIH1cblxuICAgIHNldEJvcmRlclN0eWxlKGJvcmRlclN0eWxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJib3JkZXItc3R5bGVcIl0gPSBib3JkZXJTdHlsZTtcbiAgICB9XG5cbiAgICBzZXRIZWlnaHQoaGVpZ2h0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJoZWlnaHRcIl0gPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgc2V0V2lkdGgod2lkdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcIndpZHRoXCJdID0gd2lkdGggKyBcInB4XCI7XG4gICAgfVxuXG4gICAgc2V0WCh4OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJwb3NpdGlvblwiXSA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJsZWZ0XCJdID0geCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBzZXRZKHk6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInBvc2l0aW9uXCJdID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInRvcFwiXSA9IHkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgc2V0Wih6OiBzdHJpbmcgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJ6LWluZGV4XCJdID0geiA7XG4gICAgfVxuXG5cbiAgICBzZXRGb250Qm9sZChib286IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcblxuICAgICAgICBpZiAoYm9vID09PSBcInRydWVcIiB8fCBib28gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl0gPSBcImJvbGRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl0gPSBcIm5vcm1hbFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Rm9udFNpemUoc2l6ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiZm9udC1zaXplXCJdID0gc2l6ZSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBzZXRGb250Q29sb3IoY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImNvbG9yXCJdID0gdGhpcy5jaGVja0N1c3RvbUNvbG9yKGNvbG9yKTtcbiAgICB9XG5cbiAgICBzZXRNYXJnaW4obWFyZ2luOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJtYXJnaW5cIl0gPSB0aGlzLmNvbnZlcnRTdHlsZVVuaXQobWFyZ2luKTtcbiAgICB9XG5cbiAgICBzZXRBbGlnblZlcnRpY2FsKGFsaWduOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcblxuICAgICAgICBpZiAoYWxpZ24gPT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgICAgIGFsaWduID0gXCJtaWRkbGVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1widmVydGljYWwtYWxpZ25cIl0gPSBhbGlnbjtcbiAgICB9XG5cbiAgICBzZXRBbGlnbkhvcml6b250YWwoYWxpZ246IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInRleHQtYWxpZ25cIl0gPSBhbGlnbjtcbiAgICB9XG5cbiAgICBzZXRCb3JkZXJDb3JuZXIoYm9yZGVyQ29ybmVyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJib3JkZXItcmFkaXVzXCJdID0gdGhpcy5jb252ZXJ0U3R5bGVVbml0KGJvcmRlckNvcm5lcik7XG4gICAgfVxuXG4gICAgc2V0RHJvcFNoYWRvd0NvbG9yKGRyb3BTaGFkb3dDb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHJvcFNoYWRvd0NvbG9yID0gdGhpcy5jaGVja0N1c3RvbUNvbG9yKGRyb3BTaGFkb3dDb2xvcik7XG4gICAgICAgIHRoaXMuc2V0Qm94U2hhZG93KCk7XG4gICAgfVxuXG4gICAgc2V0RHJvcFNoYWRvd09mZnNldChkcm9wU2hhZG93T2Zmc2V0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kcm9wU2hhZG93T2Zmc2V0ID0gZHJvcFNoYWRvd09mZnNldDtcbiAgICAgICAgdGhpcy5zZXRCb3hTaGFkb3coKTtcbiAgICB9XG5cbiAgICBzZXRPbkNvbnRleHRNZW51KGZuOiAodGhpc0FyZz86IGFueSk9PnZvaWQpIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5vbkNvbnRleHRNZW51ID0gZm47XG4gICAgfVxuXG4gICAgc2V0T25Db21tYW5kKGZuOiAodGhpc0FyZz86IGFueSk9PnZvaWQpIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5vbkNvbW1hbmQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5keW5hbWljRWxlbWVudC5jdXN0b21BdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0UmljaFRleHQoc3RyOiBzdHJpbmcgfCBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQucmljaFRleHQgPSBzdHIgPT09IHRydWUgfHwgc3RyID09PSBcInRydWVcIjtcbiAgICB9XG5cbiAgICBhcHBlbmRDaGlsZChjaGlsZDogRHluYW1pY0VsZW1lbnRCdWlsZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmR5bmFtaWNFbGVtZW50LmNoaWxkcmVuID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuY2hpbGRyZW4gPSBbY2hpbGQuZHluYW1pY0VsZW1lbnRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jaGlsZHJlbi5wdXNoKGNoaWxkLmR5bmFtaWNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJvcmRlclN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJib3JkZXItc3R5bGVcIl0gPT0gbnVsbCB8fCB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1zdHlsZVwiXSA9PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1zdHlsZVwiXSA9IFwic29saWRcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29udmVydFN0eWxlVW5pdCh1bml0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHVuaXQgIT0gbnVsbCAmJiB1bml0LmluZGV4T2YoXCIsXCIpID4gMCkge1xuICAgICAgICAgICAgdW5pdCA9IHVuaXQuc3BsaXQoXCIsXCIpLm1hcChtPT5tICsgXCJweFwiKS5qb2luKFwiIFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh1bml0ICE9IG51bGwgJiYgdW5pdCAhPT0gXCJcIikge1xuICAgICAgICAgICAgdW5pdCA9IHVuaXQgKyBcInB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5pdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEJveFNoYWRvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcFNoYWRvd0NvbG9yICE9IG51bGwgJiYgdGhpcy5kcm9wU2hhZG93T2Zmc2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJveC1zaGFkb3dcIl0gPSBgJHt0aGlzLmRyb3BTaGFkb3dPZmZzZXR9cHggJHt0aGlzLmRyb3BTaGFkb3dPZmZzZXR9cHggJHt0aGlzLmRyb3BTaGFkb3dPZmZzZXR9cHggJHt0aGlzLmRyb3BTaGFkb3dDb2xvcn1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0N1c3RvbUNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNvbG9yICE9IG51bGwgJiYgY29sb3IuaW5kZXhPZihcIiNcIikgPT09IDAgJiYgY29sb3IubGVuZ3RoID4gNykge1xuICAgICAgICAgICAgY29sb3IgPSBcInZhcihcIiArIGNvbG9yLnJlcGxhY2UoXCIjXCIsIFwiLS1cIikgKyBcIilcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG59XG4iXX0=