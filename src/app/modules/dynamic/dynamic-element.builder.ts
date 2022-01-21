import { DynamicElement } from "./dynamic-element";

export class DynamicElementBuilder {
    private dynamicElement: DynamicElement;
    private dropShadowColor: string;
    private dropShadowOffset: string;

    static createLabelElement(whiteSpaceWrap: boolean = false, padding: string = null) {
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

    toDynamicElement() {
        return this.dynamicElement;
    }

    setId(id: string) {
        this.dynamicElement.id = id;
    }

    setText(text: string) {
        this.dynamicElement.text = text;
    }

    setText2(text: string) {
        //not sure what this is, for now, custom attribute
        this.setAttribute("text2", text);
    }

    setValue(value: string) {
        this.dynamicElement.value = value;
    }

    setTooltip(tooltip: string) {
        this.dynamicElement.tooltip = tooltip;
    }

    setVisible(visible: boolean) {
        this.dynamicElement.visible = visible;
    }

    setEnabled(enabled: boolean) {
        this.dynamicElement.enabled = enabled;
    }

    setPopup(popupMenuId: string) {
        this.dynamicElement.popupMenuId = popupMenuId;
    }

    setBgColor(bgColor: string) {
        this.initStyle();
        this.dynamicElement.styles["background-color"] = this.checkCustomColor(bgColor);
    }

    addCssClass(cssClass: string) {
        this.initStyle();
        if (this.dynamicElement.cssClass == undefined){
            this.dynamicElement.cssClass = cssClass;
        } else {
            this.dynamicElement.cssClass = this.dynamicElement.cssClass + " " + cssClass;
        }
    }

    setBorderColor(borderColor: string) {
        this.initStyle();
        this.dynamicElement.styles["border-color"] = this.checkCustomColor(borderColor);
        this.initBorderStyle();
    }

    setBorderWidth(borderWidth: string) {
        this.initStyle();
        this.dynamicElement.styles["border-width"] = this.convertStyleUnit(borderWidth);
        this.initBorderStyle();
    }

    setBorderStyle(borderStyle: string) {
        this.initStyle();
        this.dynamicElement.styles["border-style"] = borderStyle;
    }

    setHeight(height: string) {
        this.initStyle();
        this.dynamicElement.styles["height"] = height + "px";
    }

    setWidth(width: string) {
        this.initStyle();
        this.dynamicElement.styles["width"] = width + "px";
    }

    setX(x: string | number) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["left"] = x + "px";
    }

    setY(y: string | number) {
        this.initStyle();
        this.dynamicElement.styles["position"] = "absolute";
        this.dynamicElement.styles["top"] = y + "px";
    }

    setZ(z: string | string) {
        this.initStyle();
        this.dynamicElement.styles["z-index"] = z ;
    }


    setFontBold(boo: string | boolean) {
        this.initStyle();

        if (boo === "true" || boo === true) {
            this.dynamicElement.styles["font-weight"] = "bold";
        } else {
            this.dynamicElement.styles["font-weight"] = "normal";
        }
    }

    setFontSize(size: string | number) {
        this.initStyle();
        this.dynamicElement.styles["font-size"] = size + "px";
    }

    setFontColor(color: string) {
        this.initStyle();
        this.dynamicElement.styles["color"] = this.checkCustomColor(color);
    }

    setMargin(margin: string) {
        this.initStyle();
        this.dynamicElement.styles["margin"] = this.convertStyleUnit(margin);
    }

    setAlignVertical(align: string) {
        this.initStyle();

        if (align === "center") {
            align = "middle";
        }

        this.dynamicElement.styles["vertical-align"] = align;
    }

    setAlignHorizontal(align: string) {
        this.initStyle();
        this.dynamicElement.styles["text-align"] = align;
    }

    setBorderCorner(borderCorner: string) {
        this.initStyle();
        this.dynamicElement.styles["border-radius"] = this.convertStyleUnit(borderCorner);
    }

    setDropShadowColor(dropShadowColor: string) {
        this.dropShadowColor = this.checkCustomColor(dropShadowColor);
        this.setBoxShadow();
    }

    setDropShadowOffset(dropShadowOffset: string) {
        this.dropShadowOffset = dropShadowOffset;
        this.setBoxShadow();
    }

    setOnContextMenu(fn: (thisArg?: any)=>void) {
        this.dynamicElement.onContextMenu = fn;
    }

    setOnCommand(fn: (thisArg?: any)=>void) {
        this.dynamicElement.onCommand = fn;
    }

    setAttribute(name: string, value) {
        if (this.dynamicElement.customAttributes == null) {
            this.dynamicElement.customAttributes = {};
        }

        this.dynamicElement.customAttributes[name] = value;
    }

    setRichText(str: string | boolean) {
        this.dynamicElement.richText = str === true || str === "true";
    }

    appendChild(child: DynamicElementBuilder) {
        if (this.dynamicElement.children == null) {
            this.dynamicElement.children = [child.dynamicElement];
        } else {
            this.dynamicElement.children.push(child.dynamicElement);
        }
    }

    private initStyle() {
        if (this.dynamicElement.styles == null) {
            this.dynamicElement.styles = {};
        }
    }

    private initBorderStyle() {
        if (this.dynamicElement.styles["border-style"] == null || this.dynamicElement.styles["border-style"] == "") {
            this.dynamicElement.styles["border-style"] = "solid";
        }
    }

    private convertStyleUnit(unit: string) {
        if (unit != null && unit.indexOf(",") > 0) {
            unit = unit.split(",").map(m=>m + "px").join(" ");
        } else if (unit != null && unit !== "") {
            unit = unit + "px";
        }

        return unit;
    }

    private setBoxShadow() {
        if (this.dropShadowColor != null && this.dropShadowOffset != null) {
            this.initStyle();
            this.dynamicElement.styles["box-shadow"] = `${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowOffset}px ${this.dropShadowColor}`;
        }
    }

    private checkCustomColor(color: string) {
        if (color != null && color.indexOf("#") === 0 && color.length > 7) {
            color = "var(" + color.replace("#", "--") + ")";
        }

        return color;
    }
}
