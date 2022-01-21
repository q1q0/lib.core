/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class AppUtils {
    /**
     * @param {?} str
     * @return {?}
     */
    static parseDom(str) {
        return this.domParser.parseFromString(str, "application/xml").firstElementChild;
    }
    /**
     * attributeOverrideInitializer
     * @return {?}
     */
    static attributeOverrideInitializer() {
        this.attributeOverrideClassInitializer();
        this.attributeOverrideValidateInitializer();
    }
}
AppUtils.domParser = new DOMParser();
/**
 * クラス属性変換用マップ
 */
AppUtils._classOverrideMap = new Map();
AppUtils.attributeOverrideClassInitializer = null;
AppUtils.attributeOverrideClass = null;
/**
 * バリデート属性変換用マップ
 */
AppUtils._validateOverrideMap = new Map();
AppUtils.attributeOverrideValidateInitializer = null;
AppUtils.attributeOverrideValidate = null;
AppUtils.customizeClientEvent = null;
AppUtils.validateField = null;
/**
 * Validate HTML attribute to see if they should be pass to the server. This is needed
 * because Nexaweb framework allow passing of custom attributes
 */
AppUtils.validateAttribute = null;
AppUtils.enableLogging = true;
AppUtils.maxFindElementCache = 500;
AppUtils.isCloseBtn = false;
if (false) {
    /** @type {?} */
    AppUtils.domParser;
    /**
     * クラス属性変換用マップ
     * @type {?}
     */
    AppUtils._classOverrideMap;
    /** @type {?} */
    AppUtils.attributeOverrideClassInitializer;
    /** @type {?} */
    AppUtils.attributeOverrideClass;
    /**
     * バリデート属性変換用マップ
     * @type {?}
     */
    AppUtils._validateOverrideMap;
    /** @type {?} */
    AppUtils.attributeOverrideValidateInitializer;
    /** @type {?} */
    AppUtils.attributeOverrideValidate;
    /** @type {?} */
    AppUtils.customizeClientEvent;
    /** @type {?} */
    AppUtils.validateField;
    /**
     * Validate HTML attribute to see if they should be pass to the server. This is needed
     * because Nexaweb framework allow passing of custom attributes
     * @type {?}
     */
    AppUtils.validateAttribute;
    /** @type {?} */
    AppUtils.setCustomAttribute;
    /** @type {?} */
    AppUtils.enableLogging;
    /** @type {?} */
    AppUtils.maxFindElementCache;
    /** @type {?} */
    AppUtils.isCloseBtn;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL2FwcC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsTUFBTTs7Ozs7SUFjRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztLQUNuRjs7Ozs7SUFZRCxNQUFNLENBQUMsNEJBQTRCO1FBQy9CLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO0tBQy9DOztxQkE5QjJCLElBQUksU0FBUyxFQUFFOzs7OzZCQUdELElBQUksR0FBRyxFQUFFOzZDQUNLLElBQUk7a0NBQ2tCLElBQUk7Ozs7Z0NBRXJDLElBQUksR0FBRyxFQUFFO2dEQUNLLElBQUk7cUNBQ2tCLElBQUk7Z0NBRU4sSUFBSTt5QkFDeEIsSUFBSTs7Ozs7NkJBUUEsSUFBSTt5QkFFbkMsSUFBSTsrQkFDQyxHQUFHO3NCQUNYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVOYW1lVmFsdWUgfSBmcm9tIFwiLi9hdHRyaWJ1dGUtbmFtZS12YWx1ZVwiO1xuaW1wb3J0IHsgQ2xpZW50RXZlbnQgfSBmcm9tIFwiLi4vZXZlbnQtaGFuZGxlci9jbGllbnQtZXZlbnRcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBvbmVudFwiO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIEFwcFV0aWxzIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgZG9tUGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuXG4gICAgLyoqIOOCr+ODqeOCueWxnuaAp+WkieaPm+eUqOODnuODg+ODlyAqL1xuICAgIHN0YXRpYyBfY2xhc3NPdmVycmlkZU1hcDogTWFwPGFueSwgYW55PiA9IG5ldyBNYXAoKTtcbiAgICBzdGF0aWMgYXR0cmlidXRlT3ZlcnJpZGVDbGFzc0luaXRpYWxpemVyOiAoKSA9PiB2b2lkICA9IG51bGw7XG4gICAgc3RhdGljIGF0dHJpYnV0ZU92ZXJyaWRlQ2xhc3M6ICh2YWx1ZTogc3RyaW5nKSA9PiBBcnJheTxBdHRyaWJ1dGVOYW1lVmFsdWU+ID0gbnVsbDtcbiAgICAvKiog44OQ44Oq44OH44O844OI5bGe5oCn5aSJ5o+b55So44Oe44OD44OXICovXG4gICAgc3RhdGljIF92YWxpZGF0ZU92ZXJyaWRlTWFwOiBNYXA8YW55LCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIHN0YXRpYyBhdHRyaWJ1dGVPdmVycmlkZVZhbGlkYXRlSW5pdGlhbGl6ZXI6ICgpID0+IHZvaWQgID0gbnVsbDtcbiAgICBzdGF0aWMgYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IEFycmF5PEF0dHJpYnV0ZU5hbWVWYWx1ZT4gPSBudWxsO1xuXG4gICAgc3RhdGljIGN1c3RvbWl6ZUNsaWVudEV2ZW50OiAoc291cmNlOiBhbnksIGNsaWVudEV2ZW50OiBDbGllbnRFdmVudCkgPT4gdm9pZCA9IG51bGw7XG4gICAgc3RhdGljIHZhbGlkYXRlRmllbGQ6IChzb3VyY2U6IEJhc2VDb21wb25lbnQpID0+IGJvb2xlYW4gPSBudWxsO1xuICAgIHN0YXRpYyBwYXJzZURvbShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN0ciwgXCJhcHBsaWNhdGlvbi94bWxcIikuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIEhUTUwgYXR0cmlidXRlIHRvIHNlZSBpZiB0aGV5IHNob3VsZCBiZSBwYXNzIHRvIHRoZSBzZXJ2ZXIuIFRoaXMgaXMgbmVlZGVkXG4gICAgICogYmVjYXVzZSBOZXhhd2ViIGZyYW1ld29yayBhbGxvdyBwYXNzaW5nIG9mIGN1c3RvbSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgc3RhdGljIHZhbGlkYXRlQXR0cmlidXRlOiAoYXR0cmlidXRlTmFtZTogc3RyaW5nKSA9PiBib29sZWFuID0gbnVsbDtcbiAgICBzdGF0aWMgc2V0Q3VzdG9tQXR0cmlidXRlOiAoanNvbjogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sIGVsOiBFbGVtZW50KSA9PiB2b2lkO1xuICAgIHN0YXRpYyBlbmFibGVMb2dnaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzdGF0aWMgbWF4RmluZEVsZW1lbnRDYWNoZTogbnVtYmVyID0gNTAwO1xuICAgIHN0YXRpYyBpc0Nsb3NlQnRuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogYXR0cmlidXRlT3ZlcnJpZGVJbml0aWFsaXplciAqL1xuICAgIHN0YXRpYyBhdHRyaWJ1dGVPdmVycmlkZUluaXRpYWxpemVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU92ZXJyaWRlQ2xhc3NJbml0aWFsaXplcigpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU92ZXJyaWRlVmFsaWRhdGVJbml0aWFsaXplcigpO1xuICAgIH1cbn1cbiJdfQ==