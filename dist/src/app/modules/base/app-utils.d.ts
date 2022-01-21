import { AttributeNameValue } from "./attribute-name-value";
import { ClientEvent } from "../event-handler/client-event";
import { BaseComponent } from "./base.component";
export declare class AppUtils {
    static readonly domParser: DOMParser;
    /** クラス属性変換用マップ */
    static _classOverrideMap: Map<any, any>;
    static attributeOverrideClassInitializer: () => void;
    static attributeOverrideClass: (value: string) => Array<AttributeNameValue>;
    /** バリデート属性変換用マップ */
    static _validateOverrideMap: Map<any, any>;
    static attributeOverrideValidateInitializer: () => void;
    static attributeOverrideValidate: (value: string) => Array<AttributeNameValue>;
    static customizeClientEvent: (source: any, clientEvent: ClientEvent) => void;
    static validateField: (source: BaseComponent) => boolean;
    static parseDom(str: string): Element;
    /**
     * Validate HTML attribute to see if they should be pass to the server. This is needed
     * because Nexaweb framework allow passing of custom attributes
     */
    static validateAttribute: (attributeName: string) => boolean;
    static setCustomAttribute: (json: {
        [name: string]: string;
    }, el: Element) => void;
    static enableLogging: boolean;
    static maxFindElementCache: number;
    static isCloseBtn: boolean;
    /** attributeOverrideInitializer */
    static attributeOverrideInitializer(): void;
}
