import { AttributeNameValue } from "./attribute-name-value";
import { ClientEvent } from "../event-handler/client-event";
import { BaseComponent } from "./base.component";

// @dynamic
export class AppUtils {
    static readonly domParser = new DOMParser();

    /** クラス属性変換用マップ */
    static _classOverrideMap: Map<any, any> = new Map();
    static attributeOverrideClassInitializer: () => void  = null;
    static attributeOverrideClass: (value: string) => Array<AttributeNameValue> = null;
    /** バリデート属性変換用マップ */
    static _validateOverrideMap: Map<any, any> = new Map();
    static attributeOverrideValidateInitializer: () => void  = null;
    static attributeOverrideValidate: (value: string) => Array<AttributeNameValue> = null;

    static customizeClientEvent: (source: any, clientEvent: ClientEvent) => void = null;
    static validateField: (source: BaseComponent) => boolean = null;
    static parseDom(str: string) {
        return this.domParser.parseFromString(str, "application/xml").firstElementChild;
    }
    /**
     * Validate HTML attribute to see if they should be pass to the server. This is needed
     * because Nexaweb framework allow passing of custom attributes
     */
    static validateAttribute: (attributeName: string) => boolean = null;
    static setCustomAttribute: (json: { [name: string]: string }, el: Element) => void;
    static enableLogging: boolean = true;
    static maxFindElementCache: number = 500;
    static isCloseBtn: boolean = false;

    /** attributeOverrideInitializer */
    static attributeOverrideInitializer(): void {
        this.attributeOverrideClassInitializer();
        this.attributeOverrideValidateInitializer();
    }
}
