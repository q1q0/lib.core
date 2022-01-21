import { ComponentType } from "../base/component-type.enum";
export interface CellDefinition {
    componentType: ComponentType;
    columnIndex: number;
    attributes: {
        [name: string]: any;
    };
    text: string;
    eventCallbacks: {
        [name: string]: () => void;
    };
}
