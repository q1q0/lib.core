import { AttributeChangeEvent } from "./attribute-change-event";

export interface AttributeChangeListener {
    beforeAttributeRemoved(evt: AttributeChangeEvent): void;
    beforeAttributeSet(evt: AttributeChangeEvent): void;
    onAttributeRemoved(evt: AttributeChangeEvent): void;
    onAttributeSet(evt: AttributeChangeEvent): void;
    _internalId: string;
}
