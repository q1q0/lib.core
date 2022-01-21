import { BaseComponent } from "./base.component";
export declare class AttributeChangeEvent {
    private name;
    private oldValue;
    private newValue;
    private sourceElement;
    constructor(name: string, oldValue: any, newValue: any, sourceElement: BaseComponent);
    getName(): string;
    getOldValue(): any;
    getNewValue(): any;
    getSourceElement(): BaseComponent;
}
