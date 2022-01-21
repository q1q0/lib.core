import { ComboBoxComponent } from "./combo-box.component";
import { ValuePair } from "./value-pair";
export declare class FauxComboElement {
    private comboBox;
    private valuePair;
    static readonly LOCAL_NAME: string;
    constructor(comboBox: ComboBoxComponent, valuePair: ValuePair);
    setAttribute(name: any, value: any): void;
    getLocalName(): string;
    getAttribute(name: any): any;
    getValue(): any;
    getText(): any;
    isSelected(): any;
    setChecked(boo: boolean): void;
}
