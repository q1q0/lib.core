/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AppUtils = /** @class */ (function () {
    function AppUtils() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    AppUtils.parseDom = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this.domParser.parseFromString(str, "application/xml").firstElementChild;
    };
    /** attributeOverrideInitializer */
    /**
     * attributeOverrideInitializer
     * @return {?}
     */
    AppUtils.attributeOverrideInitializer = /**
     * attributeOverrideInitializer
     * @return {?}
     */
    function () {
        this.attributeOverrideClassInitializer();
        this.attributeOverrideValidateInitializer();
    };
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
    return AppUtils;
}());
export { AppUtils };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9iYXNlL2FwcC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQW1CVyxpQkFBUTs7OztJQUFmLFVBQWdCLEdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztLQUNuRjtJQVdELG1DQUFtQzs7Ozs7SUFDNUIscUNBQTRCOzs7O0lBQW5DO1FBQ0ksSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7S0FDL0M7eUJBOUIyQixJQUFJLFNBQVMsRUFBRTs7OztpQ0FHRCxJQUFJLEdBQUcsRUFBRTtpREFDSyxJQUFJO3NDQUNrQixJQUFJOzs7O29DQUVyQyxJQUFJLEdBQUcsRUFBRTtvREFDSyxJQUFJO3lDQUNrQixJQUFJO29DQUVOLElBQUk7NkJBQ3hCLElBQUk7Ozs7O2lDQVFBLElBQUk7NkJBRW5DLElBQUk7bUNBQ0MsR0FBRzswQkFDWCxLQUFLO21CQTlCdEM7O1NBS2EsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF0dHJpYnV0ZU5hbWVWYWx1ZSB9IGZyb20gXCIuL2F0dHJpYnV0ZS1uYW1lLXZhbHVlXCI7XG5pbXBvcnQgeyBDbGllbnRFdmVudCB9IGZyb20gXCIuLi9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudFwiO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcG9uZW50XCI7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgQXBwVXRpbHMge1xuICAgIHN0YXRpYyByZWFkb25seSBkb21QYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG5cbiAgICAvKiog44Kv44Op44K55bGe5oCn5aSJ5o+b55So44Oe44OD44OXICovXG4gICAgc3RhdGljIF9jbGFzc092ZXJyaWRlTWFwOiBNYXA8YW55LCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIHN0YXRpYyBhdHRyaWJ1dGVPdmVycmlkZUNsYXNzSW5pdGlhbGl6ZXI6ICgpID0+IHZvaWQgID0gbnVsbDtcbiAgICBzdGF0aWMgYXR0cmlidXRlT3ZlcnJpZGVDbGFzczogKHZhbHVlOiBzdHJpbmcpID0+IEFycmF5PEF0dHJpYnV0ZU5hbWVWYWx1ZT4gPSBudWxsO1xuICAgIC8qKiDjg5Djg6rjg4fjg7zjg4jlsZ7mgKflpInmj5vnlKjjg57jg4Pjg5cgKi9cbiAgICBzdGF0aWMgX3ZhbGlkYXRlT3ZlcnJpZGVNYXA6IE1hcDxhbnksIGFueT4gPSBuZXcgTWFwKCk7XG4gICAgc3RhdGljIGF0dHJpYnV0ZU92ZXJyaWRlVmFsaWRhdGVJbml0aWFsaXplcjogKCkgPT4gdm9pZCAgPSBudWxsO1xuICAgIHN0YXRpYyBhdHRyaWJ1dGVPdmVycmlkZVZhbGlkYXRlOiAodmFsdWU6IHN0cmluZykgPT4gQXJyYXk8QXR0cmlidXRlTmFtZVZhbHVlPiA9IG51bGw7XG5cbiAgICBzdGF0aWMgY3VzdG9taXplQ2xpZW50RXZlbnQ6IChzb3VyY2U6IGFueSwgY2xpZW50RXZlbnQ6IENsaWVudEV2ZW50KSA9PiB2b2lkID0gbnVsbDtcbiAgICBzdGF0aWMgdmFsaWRhdGVGaWVsZDogKHNvdXJjZTogQmFzZUNvbXBvbmVudCkgPT4gYm9vbGVhbiA9IG51bGw7XG4gICAgc3RhdGljIHBhcnNlRG9tKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3RyLCBcImFwcGxpY2F0aW9uL3htbFwiKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgSFRNTCBhdHRyaWJ1dGUgdG8gc2VlIGlmIHRoZXkgc2hvdWxkIGJlIHBhc3MgdG8gdGhlIHNlcnZlci4gVGhpcyBpcyBuZWVkZWRcbiAgICAgKiBiZWNhdXNlIE5leGF3ZWIgZnJhbWV3b3JrIGFsbG93IHBhc3Npbmcgb2YgY3VzdG9tIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgdmFsaWRhdGVBdHRyaWJ1dGU6IChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4gPSBudWxsO1xuICAgIHN0YXRpYyBzZXRDdXN0b21BdHRyaWJ1dGU6IChqc29uOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSwgZWw6IEVsZW1lbnQpID0+IHZvaWQ7XG4gICAgc3RhdGljIGVuYWJsZUxvZ2dpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHN0YXRpYyBtYXhGaW5kRWxlbWVudENhY2hlOiBudW1iZXIgPSA1MDA7XG4gICAgc3RhdGljIGlzQ2xvc2VCdG46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBhdHRyaWJ1dGVPdmVycmlkZUluaXRpYWxpemVyICovXG4gICAgc3RhdGljIGF0dHJpYnV0ZU92ZXJyaWRlSW5pdGlhbGl6ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzc0luaXRpYWxpemVyKCk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZUluaXRpYWxpemVyKCk7XG4gICAgfVxufVxuIl19