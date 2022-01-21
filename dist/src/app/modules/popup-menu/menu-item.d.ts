import { EventEmitter } from "@angular/core";
/**
 * Menu item definition
 */
export interface MenuItem {
    visible?: any;
    id?: string;
    text?: string;
    menuItems?: Array<MenuItem>;
    onCommand?: EventEmitter<void>;
    onCommandCallback?: (args?: any) => void;
    onMouseDownCallback?: (args?: any) => void;
    display?: boolean;
    customAttributes?: {
        [name: string]: string;
    };
    parentScreenId?: string;
    styles?: {
        [name: string]: string;
    };
}
