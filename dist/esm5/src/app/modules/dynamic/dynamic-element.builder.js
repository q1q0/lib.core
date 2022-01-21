/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DynamicElementBuilder = /** @class */ (function () {
    function DynamicElementBuilder() {
    }
    /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    DynamicElementBuilder.createLabelElement = /**
     * @param {?=} whiteSpaceWrap
     * @param {?=} padding
     * @return {?}
     */
    function (whiteSpaceWrap, padding) {
        if (whiteSpaceWrap === void 0) { whiteSpaceWrap = false; }
        if (padding === void 0) { padding = null; }
        /** @type {?} */
        var el = new DynamicElementBuilder();
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
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.toDynamicElement = /**
     * @return {?}
     */
    function () {
        return this.dynamicElement;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DynamicElementBuilder.prototype.setId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.dynamicElement.id = id;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    DynamicElementBuilder.prototype.setText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.dynamicElement.text = text;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    DynamicElementBuilder.prototype.setText2 = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        //not sure what this is, for now, custom attribute
        this.setAttribute("text2", text);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DynamicElementBuilder.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.dynamicElement.value = value;
    };
    /**
     * @param {?} tooltip
     * @return {?}
     */
    DynamicElementBuilder.prototype.setTooltip = /**
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        this.dynamicElement.tooltip = tooltip;
    };
    /**
     * @param {?} visible
     * @return {?}
     */
    DynamicElementBuilder.prototype.setVisible = /**
     * @param {?} visible
     * @return {?}
     */
    function (visible) {
        this.dynamicElement.visible = visible;
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    DynamicElementBuilder.prototype.setEnabled = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this.dynamicElement.enabled = enabled;
    };
    /**
     * @param {?} popupMenuId
     * @return {?}
     */
    DynamicElementBuilder.prototype.setPopup = /**
     * @param {?} popupMenuId
     * @return {?}
     */
    function (popupMenuId) {
        this.dynamicElement.popupMenuId = popupMenuId;
    };
    /**
     * @param {?} bgColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBgColor = /**
     * @param {?} bgColor
     * @return {?}
     */
    function (bgColor) {
        this.initStyle();
        this.dynamicElement.styles["background-color"] = this.checkCustomColor(bgColor);
    };
    /**
     * @param {?} cssClass
     * @return {?}
     */
    DynamicElementBuilder.prototype.addCssClass = /**
     * @param {?} cssClass
     * @return {?}
     */
    function (cssClass) {
        this.initStyle();
        if (this.dynamicElement.cssClass == undefined) {
            this.dynamicElement.cssClass = cssClass;
        }
        else {
            this.dynamicElement.cssClass = this.dynamicElement.cssClass + " " + cssClass;
        }
    };
    /**
     * @param {?} borderColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderColor = /**
     * @param {?} borderColor
     * @return {?}
     */
    function (borderColor) {
        this.initStyle();
        this.dynamicElement.styles["border-color"] = this.checkCustomColor(borderColor);
        this.initBorderStyle();
    };
    /**
     * @param {?} borderWidth
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderWidth = /**
     * @param {?} borderWidth
     * @return {?}
     */
    function (borderWidth) {
        this.initStyle();
        this.dynamicElement.styles["border-width"] = this.convertStyleUnit(borderWidth);
        this.initBorderStyle();
    };
    /**
     * @param {?} borderStyle
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderStyle = /**
     * @param {?} borderStyle
     * @return {?}
     */
    function (borderStyle) {
        this.initStyle();
        this.dynamicElement.styles["border-style"] = borderStyle;
    };
    /**
     * @param {?} height
     * @return {?}
     */
    DynamicElementBuilder.prototype.setHeight = /**
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.initStyle();
        this.dynamicElement.styles["height"] = height + "px";
    };
    /**
     * @param {?} width
     * @return {?}
     */
    DynamicElementBuilder.prototype.setWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this.initStyle();
        this.dynamicElement.styles["width"] = width + "px";
    };
    /**
     * @param {?} x
     * @return {?}
     */
    DynamicElementBuilder.prototype.setX = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["left"] = x + "px";
    };
    /**
     * @param {?} y
     * @return {?}
     */
    DynamicElementBuilder.prototype.setY = /**
     * @param {?} y
     * @return {?}
     */
    function (y) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["top"] = y + "px";
    };
    /**
     * @param {?} z
     * @return {?}
     */
    DynamicElementBuilder.prototype.setZ = /**
     * @param {?} z
     * @return {?}
     */
    function (z) {
        this.initStyle();
        this.dynamicElement.styles["z-index"] = z;
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontBold = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.initStyle();
        if (boo === "true" || boo === true) {
            this.dynamicElement.styles["font-weight"] = "bold";
        }
        else {
            this.dynamicElement.styles["font-weight"] = "normal";
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.initStyle();
        this.dynamicElement.styles["font-size"] = size + "px";
    };
    /**
     * @param {?} color
     * @return {?}
     */
    DynamicElementBuilder.prototype.setFontColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this.initStyle();
        this.dynamicElement.styles["color"] = this.checkCustomColor(color);
    };
    /**
     * @param {?} margin
     * @return {?}
     */
    DynamicElementBuilder.prototype.setMargin = /**
     * @param {?} margin
     * @return {?}
     */
    function (margin) {
        this.initStyle();
        this.dynamicElement.styles["margin"] = this.convertStyleUnit(margin);
    };
    /**
     * @param {?} align
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAlignVertical = /**
     * @param {?} align
     * @return {?}
     */
    function (align) {
        this.initStyle();
        if (align === "center") {
            align = "middle";
        }
        this.dynamicElement.styles["vertical-align"] = align;
    };
    /**
     * @param {?} align
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAlignHorizontal = /**
     * @param {?} align
     * @return {?}
     */
    function (align) {
        this.initStyle();
        this.dynamicElement.styles["text-align"] = align;
    };
    /**
     * @param {?} borderCorner
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBorderCorner = /**
     * @param {?} borderCorner
     * @return {?}
     */
    function (borderCorner) {
        this.initStyle();
        this.dynamicElement.styles["border-radius"] = this.convertStyleUnit(borderCorner);
    };
    /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    DynamicElementBuilder.prototype.setDropShadowColor = /**
     * @param {?} dropShadowColor
     * @return {?}
     */
    function (dropShadowColor) {
        this.dropShadowColor = this.checkCustomColor(dropShadowColor);
        this.setBoxShadow();
    };
    /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    DynamicElementBuilder.prototype.setDropShadowOffset = /**
     * @param {?} dropShadowOffset
     * @return {?}
     */
    function (dropShadowOffset) {
        this.dropShadowOffset = dropShadowOffset;
        this.setBoxShadow();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DynamicElementBuilder.prototype.setOnContextMenu = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.dynamicElement.onContextMenu = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DynamicElementBuilder.prototype.setOnCommand = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.dynamicElement.onCommand = fn;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DynamicElementBuilder.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (this.dynamicElement.customAttributes == null) {
            this.dynamicElement.customAttributes = {};
        }
        this.dynamicElement.customAttributes[name] = value;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    DynamicElementBuilder.prototype.setRichText = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.dynamicElement.richText = str === true || str === "true";
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DynamicElementBuilder.prototype.appendChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        if (this.dynamicElement.children == null) {
            this.dynamicElement.children = [child.dynamicElement];
        }
        else {
            this.dynamicElement.children.push(child.dynamicElement);
        }
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.initStyle = /**
     * @return {?}
     */
    function () {
        if (this.dynamicElement.styles == null) {
            this.dynamicElement.styles = {};
        }
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.initBorderStyle = /**
     * @return {?}
     */
    function () {
        if (this.dynamicElement.styles["border-style"] == null || this.dynamicElement.styles["border-style"] == "") {
            this.dynamicElement.styles["border-style"] = "solid";
        }
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    DynamicElementBuilder.prototype.convertStyleUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        if (unit != null && unit.indexOf(",") > 0) {
            unit = unit.split(",").map(function (m) { return m + "px"; }).join(" ");
        }
        else if (unit != null && unit !== "") {
            unit = unit + "px";
        }
        return unit;
    };
    /**
     * @return {?}
     */
    DynamicElementBuilder.prototype.setBoxShadow = /**
     * @return {?}
     */
    function () {
        if (this.dropShadowColor != null && this.dropShadowOffset != null) {
            this.initStyle();
            this.dynamicElement.styles["box-shadow"] = this.dropShadowOffset + "px " + this.dropShadowOffset + "px " + this.dropShadowOffset + "px " + this.dropShadowColor;
        }
    };
    /**
     * @param {?} color
     * @return {?}
     */
    DynamicElementBuilder.prototype.checkCustomColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        if (color != null && color.indexOf("#") === 0 && color.length > 7) {
            color = "var(" + color.replace("#", "--") + ")";
        }
        return color;
    };
    return DynamicElementBuilder;
}());
export { DynamicElementBuilder };
if (false) {
    /** @type {?} */
    DynamicElementBuilder.prototype.dynamicElement;
    /** @type {?} */
    DynamicElementBuilder.prototype.dropShadowColor;
    /** @type {?} */
    DynamicElementBuilder.prototype.dropShadowOffset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1lbGVtZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2R5bmFtaWMvZHluYW1pYy1lbGVtZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLElBQUE7Ozs7Ozs7O0lBS1csd0NBQWtCOzs7OztJQUF6QixVQUEwQixjQUErQixFQUFFLE9BQXNCO1FBQXZELCtCQUFBLEVBQUEsc0JBQStCO1FBQUUsd0JBQUEsRUFBQSxjQUFzQjs7UUFDN0UsSUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxjQUFjLEdBQUc7WUFDaEIsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztRQUVGLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVmLElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUN6QixFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDdEQ7UUFFRCxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDakQ7UUFFRCxPQUFPLEVBQUUsQ0FBQztLQUNiOzs7O0lBRUQsZ0RBQWdCOzs7SUFBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDOUI7Ozs7O0lBRUQscUNBQUs7Ozs7SUFBTCxVQUFNLEVBQVU7UUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBRUQsdUNBQU87Ozs7SUFBUCxVQUFRLElBQVk7UUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ25DOzs7OztJQUVE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QUFDLGdCQUFnQixXQUFNLElBQUksQ0FBQyxlQUFpQixDQUFDO1NBQ3pKOzs7Ozs7SUFHRyxnREFBZ0I7Ozs7Y0FBQyxLQUFhO1FBQ2xDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvRCxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNuRDtRQUVELE9BQU8sS0FBSyxDQUFDOztnQ0EvT3JCO0lBaVBDLENBQUE7QUEvT0QsaUNBK09DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1pY0VsZW1lbnQgfSBmcm9tIFwiLi9keW5hbWljLWVsZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNFbGVtZW50QnVpbGRlciB7XG4gICAgcHJpdmF0ZSBkeW5hbWljRWxlbWVudDogRHluYW1pY0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkcm9wU2hhZG93Q29sb3I6IHN0cmluZztcbiAgICBwcml2YXRlIGRyb3BTaGFkb3dPZmZzZXQ6IHN0cmluZztcblxuICAgIHN0YXRpYyBjcmVhdGVMYWJlbEVsZW1lbnQod2hpdGVTcGFjZVdyYXA6IGJvb2xlYW4gPSBmYWxzZSwgcGFkZGluZzogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICBjb25zdCBlbCA9IG5ldyBEeW5hbWljRWxlbWVudEJ1aWxkZXIoKTtcbiAgICAgICAgZWwuZHluYW1pY0VsZW1lbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBcImxhYmVsXCJcbiAgICAgICAgfTtcblxuICAgICAgICBlbC5pbml0U3R5bGUoKTtcblxuICAgICAgICBpZiAod2hpdGVTcGFjZVdyYXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGVsLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcIndoaXRlLXNwYWNlXCJdID0gXCJub3dyYXBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWRkaW5nICE9IG51bGwgJiYgcGFkZGluZyAhPT0gJycpIHtcbiAgICAgICAgICAgIGVsLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInBhZGRpbmdcIl0gPSBwYWRkaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHRvRHluYW1pY0VsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR5bmFtaWNFbGVtZW50O1xuICAgIH1cblxuICAgIHNldElkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5pZCA9IGlkO1xuICAgIH1cblxuICAgIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgc2V0VGV4dDIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIC8vbm90IHN1cmUgd2hhdCB0aGlzIGlzLCBmb3Igbm93LCBjdXN0b20gYXR0cmlidXRlXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwidGV4dDJcIiwgdGV4dCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0VG9vbHRpcCh0b29sdGlwOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC50b29sdGlwID0gdG9vbHRpcDtcbiAgICB9XG5cbiAgICBzZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC52aXNpYmxlID0gdmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXRFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5lbmFibGVkID0gZW5hYmxlZDtcbiAgICB9XG5cbiAgICBzZXRQb3B1cChwb3B1cE1lbnVJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQucG9wdXBNZW51SWQgPSBwb3B1cE1lbnVJZDtcbiAgICB9XG5cbiAgICBzZXRCZ0NvbG9yKGJnQ29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmNoZWNrQ3VzdG9tQ29sb3IoYmdDb2xvcik7XG4gICAgfVxuXG4gICAgYWRkQ3NzQ2xhc3MoY3NzQ2xhc3M6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICBpZiAodGhpcy5keW5hbWljRWxlbWVudC5jc3NDbGFzcyA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jc3NDbGFzcyA9IGNzc0NsYXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jc3NDbGFzcyA9IHRoaXMuZHluYW1pY0VsZW1lbnQuY3NzQ2xhc3MgKyBcIiBcIiArIGNzc0NsYXNzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVyQ29sb3IoYm9yZGVyQ29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1jb2xvclwiXSA9IHRoaXMuY2hlY2tDdXN0b21Db2xvcihib3JkZXJDb2xvcik7XG4gICAgICAgIHRoaXMuaW5pdEJvcmRlclN0eWxlKCk7XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVyV2lkdGgoYm9yZGVyV2lkdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci13aWR0aFwiXSA9IHRoaXMuY29udmVydFN0eWxlVW5pdChib3JkZXJXaWR0aCk7XG4gICAgICAgIHRoaXMuaW5pdEJvcmRlclN0eWxlKCk7XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVyU3R5bGUoYm9yZGVyU3R5bGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1zdHlsZVwiXSA9IGJvcmRlclN0eWxlO1xuICAgIH1cblxuICAgIHNldEhlaWdodChoZWlnaHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImhlaWdodFwiXSA9IGhlaWdodCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBzZXRXaWR0aCh3aWR0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wid2lkdGhcIl0gPSB3aWR0aCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBzZXRYKHg6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInBvc2l0aW9uXCJdID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImxlZnRcIl0gPSB4ICsgXCJweFwiO1xuICAgIH1cblxuICAgIHNldFkoeTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wicG9zaXRpb25cIl0gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1widG9wXCJdID0geSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBzZXRaKHo6IHN0cmluZyB8IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcInotaW5kZXhcIl0gPSB6IDtcbiAgICB9XG5cblxuICAgIHNldEZvbnRCb2xkKGJvbzogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuXG4gICAgICAgIGlmIChib28gPT09IFwidHJ1ZVwiIHx8IGJvbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJmb250LXdlaWdodFwiXSA9IFwiYm9sZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJmb250LXdlaWdodFwiXSA9IFwibm9ybWFsXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb250U2l6ZShzaXplOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJmb250LXNpemVcIl0gPSBzaXplICsgXCJweFwiO1xuICAgIH1cblxuICAgIHNldEZvbnRDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiY29sb3JcIl0gPSB0aGlzLmNoZWNrQ3VzdG9tQ29sb3IoY29sb3IpO1xuICAgIH1cblxuICAgIHNldE1hcmdpbihtYXJnaW46IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcIm1hcmdpblwiXSA9IHRoaXMuY29udmVydFN0eWxlVW5pdChtYXJnaW4pO1xuICAgIH1cblxuICAgIHNldEFsaWduVmVydGljYWwoYWxpZ246IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuXG4gICAgICAgIGlmIChhbGlnbiA9PT0gXCJjZW50ZXJcIikge1xuICAgICAgICAgICAgYWxpZ24gPSBcIm1pZGRsZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5zdHlsZXNbXCJ2ZXJ0aWNhbC1hbGlnblwiXSA9IGFsaWduO1xuICAgIH1cblxuICAgIHNldEFsaWduSG9yaXpvbnRhbChhbGlnbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0eWxlKCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1widGV4dC1hbGlnblwiXSA9IGFsaWduO1xuICAgIH1cblxuICAgIHNldEJvcmRlckNvcm5lcihib3JkZXJDb3JuZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1yYWRpdXNcIl0gPSB0aGlzLmNvbnZlcnRTdHlsZVVuaXQoYm9yZGVyQ29ybmVyKTtcbiAgICB9XG5cbiAgICBzZXREcm9wU2hhZG93Q29sb3IoZHJvcFNoYWRvd0NvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kcm9wU2hhZG93Q29sb3IgPSB0aGlzLmNoZWNrQ3VzdG9tQ29sb3IoZHJvcFNoYWRvd0NvbG9yKTtcbiAgICAgICAgdGhpcy5zZXRCb3hTaGFkb3coKTtcbiAgICB9XG5cbiAgICBzZXREcm9wU2hhZG93T2Zmc2V0KGRyb3BTaGFkb3dPZmZzZXQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRyb3BTaGFkb3dPZmZzZXQgPSBkcm9wU2hhZG93T2Zmc2V0O1xuICAgICAgICB0aGlzLnNldEJveFNoYWRvdygpO1xuICAgIH1cblxuICAgIHNldE9uQ29udGV4dE1lbnUoZm46ICh0aGlzQXJnPzogYW55KT0+dm9pZCkge1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50Lm9uQ29udGV4dE1lbnUgPSBmbjtcbiAgICB9XG5cbiAgICBzZXRPbkNvbW1hbmQoZm46ICh0aGlzQXJnPzogYW55KT0+dm9pZCkge1xuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50Lm9uQ29tbWFuZCA9IGZuO1xuICAgIH1cblxuICAgIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmR5bmFtaWNFbGVtZW50LmN1c3RvbUF0dHJpYnV0ZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jdXN0b21BdHRyaWJ1dGVzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LmN1c3RvbUF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRSaWNoVGV4dChzdHI6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5yaWNoVGV4dCA9IHN0ciA9PT0gdHJ1ZSB8fCBzdHIgPT09IFwidHJ1ZVwiO1xuICAgIH1cblxuICAgIGFwcGVuZENoaWxkKGNoaWxkOiBEeW5hbWljRWxlbWVudEJ1aWxkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZHluYW1pY0VsZW1lbnQuY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljRWxlbWVudC5jaGlsZHJlbiA9IFtjaGlsZC5keW5hbWljRWxlbWVudF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LmNoaWxkcmVuLnB1c2goY2hpbGQuZHluYW1pY0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlcyA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Qm9yZGVyU3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmR5bmFtaWNFbGVtZW50LnN0eWxlc1tcImJvcmRlci1zdHlsZVwiXSA9PSBudWxsIHx8IHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiYm9yZGVyLXN0eWxlXCJdID09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiYm9yZGVyLXN0eWxlXCJdID0gXCJzb2xpZFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb252ZXJ0U3R5bGVVbml0KHVuaXQ6IHN0cmluZykge1xuICAgICAgICBpZiAodW5pdCAhPSBudWxsICYmIHVuaXQuaW5kZXhPZihcIixcIikgPiAwKSB7XG4gICAgICAgICAgICB1bml0ID0gdW5pdC5zcGxpdChcIixcIikubWFwKG09Pm0gKyBcInB4XCIpLmpvaW4oXCIgXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHVuaXQgIT0gbnVsbCAmJiB1bml0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICB1bml0ID0gdW5pdCArIFwicHhcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bml0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Qm94U2hhZG93KCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wU2hhZG93Q29sb3IgIT0gbnVsbCAmJiB0aGlzLmRyb3BTaGFkb3dPZmZzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcbiAgICAgICAgICAgIHRoaXMuZHluYW1pY0VsZW1lbnQuc3R5bGVzW1wiYm94LXNoYWRvd1wiXSA9IGAke3RoaXMuZHJvcFNoYWRvd09mZnNldH1weCAke3RoaXMuZHJvcFNoYWRvd09mZnNldH1weCAke3RoaXMuZHJvcFNoYWRvd09mZnNldH1weCAke3RoaXMuZHJvcFNoYWRvd0NvbG9yfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQ3VzdG9tQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgICAgICBpZiAoY29sb3IgIT0gbnVsbCAmJiBjb2xvci5pbmRleE9mKFwiI1wiKSA9PT0gMCAmJiBjb2xvci5sZW5ndGggPiA3KSB7XG4gICAgICAgICAgICBjb2xvciA9IFwidmFyKFwiICsgY29sb3IucmVwbGFjZShcIiNcIiwgXCItLVwiKSArIFwiKVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbn1cbiJdfQ==