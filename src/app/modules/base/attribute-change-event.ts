import { BaseComponent } from "./base.component";

export class AttributeChangeEvent {
    constructor(
        private name: string,
        private oldValue: any,
        private newValue: any,
        private sourceElement: BaseComponent
    ) {}

    getName(): string {
        return this.name;
    }

    getOldValue(): any {
        return this.oldValue;
    }

    getNewValue(): any {
        return this.newValue;
    }

    getSourceElement(): BaseComponent {
        return this.sourceElement;
    }
    
}