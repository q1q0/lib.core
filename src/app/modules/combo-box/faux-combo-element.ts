import { ComboBoxComponent } from "./combo-box.component";
import { ValuePair } from "./value-pair";
import { AttributesEnum } from "../base/attributes.enum";

/* istanbul ignore next */
export class FauxComboElement {
    static readonly LOCAL_NAME: string = "listItem";
    constructor(private comboBox: ComboBoxComponent, private valuePair: ValuePair) {

    }

    /* istanbul ignore next */
    setAttribute(name: any, value: any) {
        if (name === AttributesEnum.SELECTED || name === "selected") {
            if (value == true || value == "true") {
                this.comboBox.setSelectItem(this.valuePair, true);
            } else {
                this.comboBox.setSelectItem(null, true);
            }

            this.valuePair.selected = value == true || value == "true";

            this.comboBox.detectChanges();
        } else if (name === AttributesEnum.VISIBLE || name === "visible") {
            this.valuePair.visible = value;
        } else if (name === AttributesEnum.TEXT || name === "text") {
            this.valuePair.text = value;
        } else if (name === AttributesEnum.VALUE || name === "value") {
            this.valuePair.value = value;
        } else {
            console.error("FauxComboElement: Unknown attribute: " + name);
        }
    }

    getLocalName(): string {
        return FauxComboElement.LOCAL_NAME;
    }

    /* istanbul ignore next */
    getAttribute(name: any) {
        if (name === "value" || name === AttributesEnum.VALUE) {
            return this.valuePair.value;
        }

        if (name === "text" || name === AttributesEnum.TEXT) {
            return this.valuePair.text;
        }

        if (name === "selected" || name === AttributesEnum.SELECTED) {
            return this.valuePair.selected == true ? "true" : "false";
        }
    }

    /* istanbul ignore next */
    getValue() {
        return this.getAttribute("value");
    }

    /* istanbul ignore next */
    getText() {
        return this.getAttribute("text");
    }

    isSelected() {
        return this.getAttribute("selected");
    }

    setChecked(boo: boolean) {
        this.setAttribute("selected", boo);
    }
}