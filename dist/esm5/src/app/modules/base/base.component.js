/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Optional, SkipSelf, Input, ElementRef, Output, EventEmitter, Renderer2 } from "@angular/core";
import * as _ from 'lodash';
import { SessionService } from "../session/session.service";
import { KeyUtils } from "./key-utils";
import { AttributesEnum } from "./attributes.enum";
import { JavaUtils } from "../java/java-utils";
import { ClientEvent } from "../event-handler/client-event";
import { Vector } from "../java/vector";
import { AttributeChangeEvent } from "./attribute-change-event";
import { AppUtils } from "./app-utils";
import { Hashtable } from "../java/hashtable";
import { HashMap } from "../java/hash-map";
import { Logger } from "./logger";
/**
 * Main class that all core components should inherit.
 */
var BaseComponent = /** @class */ (function () {
    /**
     * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
     * but it must provided the minimal required items to be injected.
     *
     * @param parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
     * @param sessionService SessionService needed by this class, this should be injected by Angular.
     * @param elementRef the element reference that wrap the element (tag) of this component.
     * @param renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
     */
    function BaseComponent(parent, sessionService, elementRef, renderer) {
        this.parent = parent;
        this.sessionService = sessionService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.disabled = false;
        this.sort = "";
        this.visible = true;
        this.text = "";
        this.required = false;
        this.orderIndex = -1;
        /* istanbul ignore next */
        this.onContextMenu = new EventEmitter();
        this.onActiveLost = new EventEmitter();
        this.onBeforeActiveLost = new EventEmitter();
        this.styles = {};
        this._children = null;
        /* istanbul ignore next */
        this._childrenIndex = null;
        this._uniqueId = BaseComponent.generateUniqueId();
        //initial id
        this.id = this._uniqueId;
    }
    Object.defineProperty(BaseComponent.prototype, "cssClass", {
        /**
         * Accessor for [[cssClass]] property
         */
        get: /**
         * Accessor for [[cssClass]] property
         * @return {?}
         */
        function () {
            return this._cssClass;
        },
        set: /**
         * @param {?} css
         * @return {?}
         */
        function (css) {
            this._cssClass = this.cleanCss(css);
            this.initBorderLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "require", {
        /**
         * Accessor for [[required]] property
         */
        get: /**
         * Accessor for [[required]] property
         * @return {?}
         */
        function () {
            return this.required;
        },
        set: /**
         * @param {?} req
         * @return {?}
         */
        function (req) {
            this.required = req;
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    //add to prevent confusion
    /**
     * @param {?} css
     * @return {?}
     */
    BaseComponent.prototype.class = /**
     * @param {?} css
     * @return {?}
     */
    function (css) {
        this.cssClass = css;
    };
    Object.defineProperty(BaseComponent.prototype, "enabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.disabled;
        },
        //alias for disabled
        set: /**
         * @param {?} boo
         * @return {?}
         */
        function (boo) {
            if (typeof boo === 'string') {
                //if enabled is false, disabled is true
                this.disabled = boo === 'true' ? false : true;
            }
            else {
                this.disabled = !boo;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "sortValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sort;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.sort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "uniqueId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._uniqueId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     */
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    BaseComponent.prototype.ngAfterViewInit = /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    function () {
        if (this.parent != null) {
            this.parent.addChild(this);
        }
        this._childrenIndex = _.uniq(this._childrenIndex);
        //commnet out, causing regression b/c the css selector need id of parent window
        // if (this.renderer != null && typeof this.renderer["removeAttribute"] === "function") {
        //   this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
        // }
    };
    /* istanbul ignore next */
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     */
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    BaseComponent.prototype.ngOnInit = /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    function () {
        this.initBorderLayout();
        if (this.fontBold === true || this.fontBold === "true") {
            this.setFontBold(true);
        }
        if (this.fontItalic === true || this.fontItalic === "true") {
            this.styles["font-style"] = "italic";
            this.setFontItalic(true);
        }
        if (this.fontSize != null) {
            this.setFontSize(this.fontSize);
        }
        if (this.fontUnderline === true || this.fontUnderline === "true") {
            this.setFontUnderline(true);
        }
        if (this.fontColor != null) {
            this.setColor(this.fontColor);
        }
        if (this.autoWrap === true) {
            this.styles["white-space"] = "normal";
            this.markForCheck();
        }
        else if (this.autoWrap === false) {
            this.styles["white-space"] = "nowrap";
            this.markForCheck();
        }
        this.checkNxStyling();
    };
    /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    BaseComponent.prototype.checkNxStyling = /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    function (skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (skipAttributeOverride !== true && this._cssClass != null && this._cssClass.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
            /** @type {?} */
            var newAttributes = AppUtils.attributeOverrideClass(this._cssClass);
            if (newAttributes != null) {
                /** @type {?} */
                var newCssClass = _.filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                newAttributes = _.filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                newAttributes.push({
                    attributeName: AttributesEnum.CLASS,
                    value: (this._cssClass + " " + newCssClass).trim(),
                });
                this.setAttributes(newAttributes, true);
            }
        }
        if (this.elementRef != null) {
            /** @type {?} */
            var _validate = this.elementRef.nativeElement.getAttribute("validate");
            if (skipAttributeOverride !== true && _validate != null && _validate.length > 0) {
                /** @type {?} */
                var newAttributes = AppUtils.attributeOverrideValidate(_validate);
                if (newAttributes != null) {
                    /** @type {?} */
                    var newCssClass = _.filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                    newAttributes = _.filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
        }
    };
    /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    BaseComponent.prototype.initBorderLayout = /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    function () {
        if (this.borderPosition != null && this.borderPosition != '') {
            if (this._cssClass != null) {
                this._cssClass = this._cssClass + ' border-' + this.borderPosition;
            }
            else {
                this._cssClass = 'border-' + this.borderPosition;
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Clear component references and cache
     */
    /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    BaseComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    function () {
        this.cleanup();
        this._isDying = true;
        /** @type {?} */
        var parentView = this.getParentView();
        if (parentView != null) {
            //remove ourself from the view children map
            if (parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(this.getId()));
            }
        }
        this._internalChangeCb = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
        }
        if (this._children !== null) {
            this._children.clear();
        }
        this._childrenIndex = null;
        this._viewChildrenMap = null;
        this.parent = null;
        this.sessionService = null;
        this.attributeChangeListeners = null;
        this.radioButtonGroups = null;
        this.elementRef = null;
        this.scrollPanes = null;
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.cleanup = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Get [[SessionService]] instance injected via constructor
     * @returns SessionService instance
     */
    /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    BaseComponent.prototype.getSession = /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    function () {
        return this.sessionService;
    };
    /* istanbul ignore next */
    /**
     * Get child component by id
     * @param id Component ID
     * @returns Child [[BaseComponent]]
     */
    /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    BaseComponent.prototype.getChild = /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    function (id) {
        if (this._children !== null) {
            return this._children.get(KeyUtils.toMapKey(id));
        }
        else {
            return null;
        }
    };
    /* istanbul ignore next */
    /**
     * Set [[disabled]] property value
     * @param boo Value for disabled property
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    BaseComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set [[visible]] property value
     * @param boo Value for visible property
     */
    /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    BaseComponent.prototype.setVisible = /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    function (boo) {
        this.visible = boo;
        this.markForCheck();
    };
    /**
     * @param {?} expression
     * @return {?}
     */
    BaseComponent.prototype.setScrollPosVertical = /**
     * @param {?} expression
     * @return {?}
     */
    function (expression) {
        //TODO
    };
    /**
     * Set color of text on the component
     * @param value Color string. Should be hexadecimal or color name supported by CSS
     */
    /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    BaseComponent.prototype.setFontColor = /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    function (value) {
        this.setColor(value);
    };
    /* istanbul ignore next */
    /**
     * Value of [[disabled]] property
     * @returns Value of disabled
     */
    /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    BaseComponent.prototype.getDisabled = /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    function () {
        return this.disabled;
    };
    /**
     * Value of opposite of [[disabled]] value
     * @returns Value of enabled
     */
    /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    BaseComponent.prototype.getEnabled = /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    function () {
        return !this.getDisabled();
    };
    /* istanbul ignore next */
    /**
     * Value of soColumnNo attribute
     * @returns Column number
     */
    /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    BaseComponent.prototype.getSoColumnNo = /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    function () {
        return this.getAttribute("soColumnNo");
    };
    /* istanbul ignore next */
    /**
     * Get the component ref string value from [[editor]] property
     * @returns Ref of component
     */
    /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    BaseComponent.prototype.getEditor = /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    function () {
        return this.editor;
    };
    /**
     * Value of soRequire attribute
     * @returns soRequire value
     */
    /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    BaseComponent.prototype.getSoRequire = /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    function () {
        return this.getAttribute("soRequire");
    };
    /**
     * Value of soValidate attribute
     * @returns soValidate value
     */
    /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    BaseComponent.prototype.getSoValidate = /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    function () {
        return this.getAttribute("soValidate");
    };
    /* istanbul ignore next */
    /**
     * Value of soType attribute
     * @returns soType value
     */
    /**
     * Value of soType attribute
     * @return {?} soType value
     */
    BaseComponent.prototype.getSoType = /**
     * Value of soType attribute
     * @return {?} soType value
     */
    function () {
        return this.getAttribute("soType");
    };
    /**
     * Value of soFormat attribute
     * @returns soFormat value
     */
    /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    BaseComponent.prototype.getSoFormat = /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    function () {
        return this.getAttribute("soFormat");
    };
    /* istanbul ignore next */
    /**
     * Value of soMin attribute
     * @returns soMin value
     */
    /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    BaseComponent.prototype.getSoMin = /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    function () {
        return this.getAttribute("soMin");
    };
    /* istanbul ignore next */
    /**
     * Value of soMax attribute
     * @returns soMax value
     */
    /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    BaseComponent.prototype.getSoMax = /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    function () {
        return this.getAttribute("soMax");
    };
    /**
     * Value of soMaxLength attribute
     * @returns soMaxLength value
     */
    /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    BaseComponent.prototype.getSoMaxLength = /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    function () {
        return this.getAttribute("soMaxLength");
    };
    /* istanbul ignore next */
    /**
     * Value of soPattern attribute
     * @returns soPattern value
     */
    /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    BaseComponent.prototype.getSoPattern = /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    function () {
        return this.getAttribute("soPattern");
    };
    /* istanbul ignore next */
    /**
     * Value of soMaxByteLen attribute
     * @returns soMaxByteLen value
     */
    /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    BaseComponent.prototype.getSoMaxByteLen = /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    function () {
        return this.getAttribute("soMaxByteLen");
    };
    /* istanbul ignore next */
    /**
     * Set [[disabled]] property to opposite of input
     * @param boo Value of enabled
     */
    /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    BaseComponent.prototype.setEnabled = /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    function (boo) {
        if (typeof boo === 'string') {
            boo = boo === 'true' ? true : false;
        }
        this.setDisabled(!boo);
    };
    /* istanbul ignore next */
    /**
     * Set value of [[sort]] property
     * @param value Sort value to set
     */
    /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    BaseComponent.prototype.setSortValue = /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    function (value) {
        this.sort = value;
    };
    /**
     * Get value of [[visible]] property
     * @returns Visble property value
     */
    /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    BaseComponent.prototype.getVisible = /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    function () {
        return this.visible;
    };
    /* istanbul ignore next */
    /**
     * Sets value of text attribute and marks component for change detection
     * @param value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     */
    /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    BaseComponent.prototype.setText = /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            this.text = value;
        }
        else if (value == null) {
            this.text = '';
        }
        else {
            this.text = value + '';
        }
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set callback function for [[onCommand]]
     * @param fn Function to be invoked for [[onCommand]] event
     */
    /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    BaseComponent.prototype.setOnCommand = /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    function (fn) {
        this._internalOnCommand = fn;
    };
    /* istanbul ignore next */
    /**
     * Set callback function for [[onActiveLost]]
     * @param fn Function to be invoked for [[onActiveLost]] event
     */
    /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    BaseComponent.prototype.setOnActiveLost = /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    function (fn) {
        this._internalOnActiveLost = fn;
    };
    /* istanbul ignore next */
    /**
     * Set all attributes in one go
     *
     * @param attrs
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    BaseComponent.prototype.setAttributes = /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    function (attrs, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        var e_1, _a;
        this._tempFreezeCd = true;
        try {
            for (var attrs_1 = tslib_1.__values(attrs), attrs_1_1 = attrs_1.next(); !attrs_1_1.done; attrs_1_1 = attrs_1.next()) {
                var attr = attrs_1_1.value;
                this.setAttribute(attr.attributeName, attr.value, skipAttributeOverride);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (attrs_1_1 && !attrs_1_1.done && (_a = attrs_1.return)) _a.call(attrs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._tempFreezeCd = false;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Set HTML attribute value on component
     * @param attribute HTML attribute to set
     * @param value Value of attribute
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    BaseComponent.prototype.setAttribute = /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    function (attribute, value, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (typeof attribute === 'string') {
            /** @type {?} */
            var originalAttributeName = attribute;
            attribute = attribute.toLowerCase();
            if (attribute === "id") {
                this.setAttribute(AttributesEnum.ID, value);
            }
            else if (attribute === 'visible') {
                this.setAttribute(AttributesEnum.VISIBLE, value);
            }
            else if (attribute === "class") {
                this.setAttribute(AttributesEnum.CLASS, value);
            }
            else if (attribute === 'enabled') {
                this.setAttribute(AttributesEnum.ENABLED, value);
            }
            else if (attribute === 'disabled') {
                this.setAttribute(AttributesEnum.DISABLED, value);
            }
            else if (attribute === 'text') {
                this.setAttribute(AttributesEnum.TEXT, value);
            }
            else if (attribute === 'color') {
                this.setAttribute(AttributesEnum.COLOR, value);
            }
            else if (attribute === "title") {
                this.setAttribute(AttributesEnum.TITLE, value);
            }
            else if (attribute === "require") {
                this.setAttribute(AttributesEnum.REQUIRE, value);
            }
            else if (attribute === "fontBold" || attribute === "fontbold") {
                this.setAttribute(AttributesEnum.FONT_BOLD, value);
            }
            else if (attribute === "selected") {
                this.setAttribute(AttributesEnum.SELECTED, value);
            }
            else if (attribute === "bgcolor") {
                this.setAttribute(AttributesEnum.BG_COLOR, value);
            }
            else if (attribute === "value") {
                this.setAttribute(AttributesEnum.VALUE, value);
            }
            else if (attribute === "maxlength" || attribute === "max_length") {
                this.setAttribute(AttributesEnum.MAX_LENGTH, value);
            }
            else if (attribute === "require" || attribute === "required") {
                this.setRequire(value);
            }
            else if (attribute === "width") {
                this.setControlWidth(value);
            }
            else if (attribute === "height") {
                this.setControlHeight(value);
            }
            else if (attribute === "fontSize" || attribute === "fontsize") {
                this.setFontSize(value);
            }
            else if (attribute === "oncommand") {
                this.setOnCommand(value);
            }
            else if (attribute === "onactivelost") {
                this.setOnActiveLost(value);
            }
            else if (attribute === "pattern") {
                this.setAttribute(AttributesEnum.PATTERN, value);
            }
            else if (attribute === "max") {
                this.setAttribute(AttributesEnum.MAX, value);
            }
            else if (attribute === "min") {
                this.setAttribute(AttributesEnum.MIN, value);
            }
            else if (JavaUtils.isNumber(originalAttributeName) === true) {
                this.setAttribute(_.parseInt(originalAttributeName), value);
            }
            else {
                this.setCustomAttribute(originalAttributeName, value);
                // Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);
                if (attribute === "validate" && skipAttributeOverride !== true && value != null && value.length > 0) {
                    /** @type {?} */
                    var newAttributes = AppUtils.attributeOverrideValidate(value);
                    if (newAttributes != null) {
                        /** @type {?} */
                        var newCssClass = _.filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                        newAttributes = _.filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                        newAttributes.push({
                            attributeName: AttributesEnum.CLASS,
                            value: (this._cssClass + " " + newCssClass).trim(),
                        });
                        this.setAttributes(newAttributes, true);
                    }
                }
            }
            this.fireSetAttributeEvent(originalAttributeName, value);
        }
        else {
            if (attribute === AttributesEnum.CLASS && skipAttributeOverride !== true && value != null && value.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
                /** @type {?} */
                var newAttributes = AppUtils.attributeOverrideClass(value);
                if (newAttributes != null) {
                    /** @type {?} */
                    var newCssClass = _.filter(newAttributes, function (attr) { return attr.attributeName === AttributesEnum.CLASS; }).map(function (attr) { return attr.value; }).join(" ");
                    newAttributes = _.filter(newAttributes, function (attr) { return attr.attributeName !== AttributesEnum.CLASS; });
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
            if (attribute === AttributesEnum.ID) {
                this.setId(value);
            }
            else if (attribute === AttributesEnum.VISIBLE) {
                if (value != null && value !== "") {
                    this.setVisible(JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.CLASS) {
                this.setCssClass(value, skipAttributeOverride);
            }
            else if (attribute === AttributesEnum.DISABLED) {
                if (value != null && value !== "") {
                    this.setDisabled(JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.ENABLED) {
                if (value != null && value !== "") {
                    this.setDisabled(!JavaUtils.parseBoolean(value));
                }
            }
            else if (attribute === AttributesEnum.TEXT) {
                this.setText(value);
            }
            else if (attribute === AttributesEnum.COLOR) {
                this.setColor(value);
            }
            else if (attribute === AttributesEnum.FONT_BOLD) {
                this.setFontBold(value);
            }
            else if (attribute === AttributesEnum.ON_COMMAND) {
                this.setOnCommand(value);
            }
            else if (attribute === AttributesEnum.REQUIRE) {
                this.setRequire(value);
            }
            else if (attribute === AttributesEnum.TITLE) {
                this.setTitle(value);
            }
            else if (attribute === AttributesEnum.SELECTED) {
                this.setSelected(value);
            }
            else if (attribute === AttributesEnum.BG_COLOR) {
                this.setBgColor(value);
            }
            else if (attribute === AttributesEnum.VALUE) {
                this.setValue(value);
            }
            else if (attribute === AttributesEnum.MAX_LENGTH) {
                this.setMaxLength(value);
            }
            else if (attribute === AttributesEnum.MAX) {
                this.setMax(value);
            }
            else if (attribute === AttributesEnum.MIN) {
                this.setMin(value);
            }
            else if (attribute === AttributesEnum.PATTERN) {
                this.setPattern(value);
            }
            else {
                Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
            }
            this.markForCheck();
        }
    };
    /* istanbul ignore next */
    /**
     * Get value of HTML attribute
     * @param attribute Name of HTML attribute to get
     * @returns Value of attribute
     */
    /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    BaseComponent.prototype.getAttribute = /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    function (attribute, skipQueryDOMIfNotExists) {
        if (skipQueryDOMIfNotExists === void 0) { skipQueryDOMIfNotExists = false; }
        if (typeof attribute === 'string') {
            /** @type {?} */
            var attributeLower = attribute.toLowerCase();
            if (attributeLower === 'visible') {
                return this.getVisible() + '';
            }
            else if (attributeLower === 'enabled') {
                return this.getEnabled() + '';
            }
            else if (attributeLower === 'disabled') {
                return this.getDisabled() + '';
            }
            else if (attributeLower === 'text') {
                return this.getText();
            }
            else if (attributeLower === 'color') {
                return this.getColor();
            }
            else if (attributeLower === 'require') {
                return this.getRequired() + '';
            }
            else if (attributeLower === "value") {
                return this.getValue();
            }
            else if (attributeLower === "selected") {
                return this.getChecked() + '';
            }
            else if (attributeLower === "id") {
                return this.getId();
            }
            else if (attributeLower === "pattern") {
                return this.getPattern();
            }
            else if (attributeLower === "min") {
                return this.getMin();
            }
            else if (attributeLower === "max") {
                return this.getMax();
            }
            else if (attributeLower === "max_length") {
                return this.getMaxLength();
            }
            else if (this.customAttributes != null && this.customAttributes[attribute] !== undefined) {
                return this.getCustomAttribute(attribute);
            }
            else if (attribute === "isLockedColumn") {
                return false;
            }
            else if (skipQueryDOMIfNotExists !== true) {
                Logger.warn("Attribute " + attribute + " does not exists, trying to get from DOM");
                if (this.elementRef != null) {
                    return this.elementRef.nativeElement.getAttribute(attribute);
                }
            }
            else {
                return undefined;
            }
        }
        else if (attribute === AttributesEnum.VISIBLE) {
            return this.getVisible() + '';
        }
        else if (attribute === AttributesEnum.DISABLED) {
            return this.getDisabled() + '';
        }
        else if (attribute === AttributesEnum.ENABLED) {
            return !this.getDisabled() + '';
        }
        else if (attribute === AttributesEnum.TEXT) {
            return this.getText();
        }
        else if (attribute === AttributesEnum.COLOR) {
            return this.getColor();
        }
        else if (attribute === AttributesEnum.REQUIRE) {
            return this.getRequired() + '';
        }
        else if (attribute === AttributesEnum.VALUE) {
            return this.getValue();
        }
        else if (attribute === AttributesEnum.SELECTED) {
            return this.getChecked() + '';
        }
        else if (attribute === AttributesEnum.PATTERN) {
            return this.getPattern();
        }
        else if (attribute === AttributesEnum.MIN) {
            return this.getMin();
        }
        else if (attribute === AttributesEnum.MAX) {
            return this.getMax();
        }
        else if (attribute === AttributesEnum.MAX_LENGTH) {
            return this.getMaxLength();
        }
        else {
            console.error('Unable to get attribute, unknown attribute id: ' + attribute);
        }
        return undefined;
    };
    /* istanbul ignore next */
    /**
     * Focus the HTML element of this component
     */
    /**
     * Focus the HTML element of this component
     * @return {?}
     */
    BaseComponent.prototype.requestFocus = /**
     * Focus the HTML element of this component
     * @return {?}
     */
    function () {
        if (this.getElement() != null) {
            this.getElement().focus();
        }
    };
    /* istanbul ignore next */
    /**
     * Focus the native HTML element of the component and mark for change detection
     */
    /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    BaseComponent.prototype.setFocus = /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    function () {
        if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
            this.markForCheck();
        }
    };
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * @event [[OnActiveLost]]
     */
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    BaseComponent.prototype.focusLost = /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    function () {
        this.onActiveLost.emit();
        if (typeof this._internalOnActiveLost === 'function') {
            this._internalOnActiveLost(this);
        }
    };
    /* istanbul ignore next */
    /**
     * Creates a unique id using an optional prefix
     * @param prefix String to append to beginning of ID
     * @returns Unique ID
     */
    /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    BaseComponent.generateUniqueId = /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    function (prefix) {
        if (prefix === void 0) { prefix = 'base'; }
        return prefix + Date.now() + '_' + _.random(1, 1000) + _.random(1, 100);
    };
    /* istanbul ignore next */
    /**
     * Adds child component to this component
     * @param child Component to add as child
     */
    /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    BaseComponent.prototype.addChild = /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    function (child) {
        if (child.id !== this.id) {
            /** @type {?} */
            var childKey = KeyUtils.toMapKey(child.id);
            if (this._children === null) {
                this._children = new Map();
            }
            if (this._childrenIndex === null) {
                this._childrenIndex = new Array();
            }
            this._children.set(childKey, child);
            this._childrenIndex.push(child.id);
            /** @type {?} */
            var parentView = this.getParentView();
            if (parentView != null && (child.isFauxElement() || child.isDialog() !== true)) {
                if (parentView._viewChildrenMap == null) {
                    parentView._viewChildrenMap = new Map();
                }
                parentView._viewChildrenMap.set(childKey, child);
                //track ScrollPane for scroll adjustment
                if (typeof child.isScrollPane === "function" && child.isScrollPane() === true) {
                    parentView.registerScrollPane(child);
                }
            }
        }
    };
    /**
     * Get the native element of the component if a reference to it is defined
     * @returns The HTML native element or 'null' if reference is missing
     */
    /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    BaseComponent.prototype.getElement = /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    function () {
        return this.elementRef ? this.elementRef.nativeElement : null;
    };
    /* istanbul ignore next */
    /**
     * Get the text property value
     * @returns Text value
     */
    /**
     * Get the text property value
     * @return {?} Text value
     */
    BaseComponent.prototype.getText = /**
     * Get the text property value
     * @return {?} Text value
     */
    function () {
        return this.text;
    };
    /* istanbul ignore next */
    /**
     * Set CSS color style attribute and marks for change detection
     * @param color CSS color string value. Should be hexadecimal or valid CSS color string
     */
    /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    BaseComponent.prototype.setColor = /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    function (color) {
        if (color == null || color === "") {
            delete this.styles['color'];
        }
        else {
            this.styles['color'] = color;
        }
        this.markForCheck();
    };
    /**
     * Get the color style attribute value
     * @returns Color string. Hexadecimal or CSS color string
     */
    /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    BaseComponent.prototype.getColor = /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    function () {
        return this.styles['color'];
    };
    /**
     * Set background color CSS style attribute value
     * @param bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     */
    /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    BaseComponent.prototype.setBgColor = /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    function (bgColor) {
        this.bgColor = bgColor;
        this.styles["background"] = bgColor;
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Sets font-weight style property to bold
     * @param boo Switch for turning bold style on/off
     */
    /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    BaseComponent.prototype.setFontBold = /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    function (boo) {
        this.fontBold = boo;
        if (boo === true || boo === "true") {
            this.styles["font-weight"] = "bold";
        }
        else {
            delete this.styles["font-weight"];
        }
        this.markForCheck();
    };
    /* istanbul ignore next */
    /**
     * Sets CSS style attribute font-style to italic
     * @param boo Switch for turning italic style on/off
     */
    /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    BaseComponent.prototype.setFontItalic = /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    function (boo) {
        this.fontItalic = boo;
        if (boo === true || boo === "true") {
            this.styles["font-style"] = "italic";
        }
        else {
            delete this.styles["font-style"];
        }
    };
    /**
     * Sets CSS style attribute font-size
     * @param size Number of pixels for font-size
     */
    /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    BaseComponent.prototype.setFontSize = /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    function (size) {
        this.fontSize = size;
        this.styles["font-size"] = size + "px";
    };
    /* istanbul ignore next */
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param underline Switch for turning underline style on/off for text
     */
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    BaseComponent.prototype.setFontUnderline = /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    function (underline) {
        this.fontUnderline = underline;
        if (this.fontUnderline === "true" || this.fontUnderline === true) {
            this.styles["text-decoration"] = "underline";
        }
        else {
            delete this.styles["text-decoration"];
        }
    };
    /**
     * Event handler that registers focus event
     * @param event
     */
    /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleFocus = /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Event handler that registers click event
     * @param event
     */
    /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleClick = /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /**
     * Event handler that registers keydown event
     * @param event
     */
    /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleKeyDown = /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Event handler that registers keyup event
     * @param event
     */
    /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleKeyUp = /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /**
     * Event handler that registers mousedown event
     * @param event
     */
    /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.handleMouseDown = /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.registerClientEvent(event);
    };
    /* istanbul ignore next */
    /**
     * Gets custom attribute by name if it exists
     * @param attributeName Name of custom attribute
     * @returns Custom attribute if it exists, otherwise undefined
     */
    /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    BaseComponent.prototype.getCustomAttribute = /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    function (attributeName) {
        if (this.customAttributes != null) {
            return this.customAttributes[attributeName];
        }
        return undefined;
    };
    /* istanbul ignore next */
    /**
     * Set attribute on customAttribute object using name as key
     * @param name key name of attribute
     * @param value value to set for key/name
     */
    /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    BaseComponent.prototype.setCustomAttribute = /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    function (name, value) {
        if (this.customAttributes == null) {
            this.customAttributes = {};
        }
        if (value != null) {
            this.customAttributes[name] = value + '';
        }
    };
    /* istanbul ignore next */
    /**
     * Check if custom attribute exists
     * @param id Key name of attribute
     * @returns True if custom attribute with name/key exists
     */
    /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    BaseComponent.prototype.hasCustomAttribute = /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    function (id) {
        return this.customAttributes != null && this.customAttributes[id] != null;
    };
    /* istanbul ignore next */
    /**
     * Get child component by index
     * @param idx Index of child component
     * @returns Child [[BaseComponent]]
     */
    /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    BaseComponent.prototype.getChildAt = /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    function (idx) {
        if (this._childrenIndex !== null) {
            if (this._childrenIndex.length > idx) {
                return this.getChild(this._childrenIndex[idx]);
            }
        }
        return null;
    };
    /**
     * Get the number of child components
     * @returns Number of children
     */
    /**
     * Get the number of child components
     * @return {?} Number of children
     */
    BaseComponent.prototype.getChildCount = /**
     * Get the number of child components
     * @return {?} Number of children
     */
    function () {
        if (this._children !== null) {
            return this._children.size;
        }
        else {
            return 0;
        }
    };
    /**
     * Get index of child component if it exists
     * @param child Child component
     */
    /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    BaseComponent.prototype.indexOfChild = /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    function (child) {
        //TODO
        console.error("indexOfChild is not implemented");
        return -1;
    };
    /* istanbul ignore next */
    /**
     * Insert child component to children array at location of index
     * @param idx Index of insert location
     * @param row
     */
    /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    BaseComponent.prototype.insertChildAt = /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    function (idx, row) {
        //TODO
        console.error("insertChildAt is not implemented");
    };
    /* istanbul ignore next */
    /**
     * TODO: Add documentation for emitInternalCommand
     */
    /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    BaseComponent.prototype.emitInternalOnCommand = /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    function () {
        if (typeof this._internalOnCommand === 'function') {
            this._internalOnCommand(this);
            return true;
        }
        else if (typeof this._internalOnCommand === "string") {
            this.invokeMcoAction(this._internalOnCommand);
        }
        return false;
    };
    /* istanbul ignore next */
    /**
     * Registers event handler for client event
     * @param event Event to register
     */
    /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    BaseComponent.prototype.registerClientEvent = /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        this.getSession().getEventHandler().setClientEvent(clientEvent);
    };
    /* istanbul ignore next */
    /**
     * Get the native HTML element tag name
     * @returns Name of HTML element tag
     */
    /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    BaseComponent.prototype.getTagName = /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    function () {
        return this.elementRef != null ? this.elementRef.nativeElement.tagName : '';
    };
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @returns Tag name
     */
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    BaseComponent.prototype.getLocalName = /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    function () {
        return this.getTagName().toLowerCase().replace("vt-", "");
    };
    /* istanbul ignore next */
    /**
     * Get the parent component if it exists
     * @returns Component or null if there is no parent
     */
    /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    BaseComponent.prototype.getParent = /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    function () {
        return this.parent;
    };
    /**
     * Get value property if it exists, otherwise return 'null'
     * @returns Value or 'null'
     */
    /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    BaseComponent.prototype.getValue = /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    function () {
        if (this["value"]) {
            return this["value"];
        }
        return null;
    };
    /* istanbul ignore next */
    /**
     * Removes attribute name name
     * @param attribute Attribute to remove
     */
    /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    BaseComponent.prototype.removeAttribute = /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    function (attribute) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            var attributeLower = attribute.toLowerCase();
            if (attributeLower === 'visible') {
                this.removeAttribute(AttributesEnum.VISIBLE);
            }
            else if (attributeLower === 'enabled') {
                this.removeAttribute(AttributesEnum.ENABLED);
            }
            else if (attributeLower === 'disabled') {
                this.removeAttribute(AttributesEnum.DISABLED);
            }
            else if (attributeLower === 'text') {
                this.removeAttribute(AttributesEnum.TEXT);
            }
            else if (attributeLower === 'color') {
                this.removeAttribute(AttributesEnum.COLOR);
            }
            else if (attributeLower === 'pattern') {
                this.removeAttribute(AttributesEnum.PATTERN);
            }
            else if (attributeLower === 'max') {
                this.removeAttribute(AttributesEnum.MAX);
            }
            else if (attributeLower === 'maxlength' || attributeLower === 'max_length') {
                this.removeAttribute(AttributesEnum.MAX_LENGTH);
            }
            else if (attributeLower === 'min') {
                this.removeAttribute(AttributesEnum.MIN);
            }
            else if (attributeLower === 'class') {
                this.removeAttribute(AttributesEnum.CLASS);
            }
            else if (attributeLower === 'oncommand' || attributeLower === 'on_command') {
                this.removeAttribute(AttributesEnum.ON_COMMAND);
            }
            else if (attributeLower === 'require') {
                this.removeAttribute(AttributesEnum.REQUIRE);
            }
            else if (attributeLower === 'title') {
                this.removeAttribute(AttributesEnum.TITLE);
            }
            else if (attributeLower === 'fontbold' || attributeLower === 'font_bold') {
                this.removeAttribute(AttributesEnum.FONT_BOLD);
            }
            else if (attributeLower === 'selected') {
                this.removeAttribute(AttributesEnum.SELECTED);
            }
            else if (attributeLower === 'bgColor') {
                this.removeAttribute(AttributesEnum.BG_COLOR);
            }
            else if (attributeLower === 'value') {
                this.removeAttribute(AttributesEnum.VALUE);
            }
            else if (this.customAttributes != null) {
                delete this.customAttributes[attribute];
                Logger.warn("Unknown attribute: " + attribute + ", setting as custom attribute");
            }
            this.fireRenoveAttributeEvent(attribute);
        }
        else if (attribute === AttributesEnum.VISIBLE) {
            this.setVisible(true);
        }
        else if (attribute === AttributesEnum.DISABLED) {
            this.setDisabled(false);
        }
        else if (attribute === AttributesEnum.ENABLED) {
            this.setEnabled(true);
        }
        else if (attribute === AttributesEnum.TEXT) {
            delete this.text;
            this.markForCheck();
        }
        else if (attribute === AttributesEnum.COLOR) {
            this.setColor("");
        }
        else if (attribute === AttributesEnum.ON_COMMAND) {
            delete this._internalOnCommand;
        }
        else if (attribute === AttributesEnum.PATTERN) {
            this.setPattern(undefined);
        }
        else if (attribute === AttributesEnum.MAX) {
            this.setMax(undefined);
        }
        else if (attribute === AttributesEnum.MAX_LENGTH) {
            this.setMaxLength(undefined);
        }
        else if (attribute === AttributesEnum.MIN) {
            this.setMin(undefined);
        }
        else {
            Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
        }
    };
    /**
     * Alias of [[setRequired]]
     * @param boo
     */
    /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    BaseComponent.prototype.setRequire = /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.setRequired(boo);
    };
    /* istanbul ignore next */
    /**
     * Set [[required]] to true or false
     * @param boo
     */
    /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    BaseComponent.prototype.setRequired = /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        if (boo === 'true' || boo === true) {
            this.required = true;
        }
        else {
            this.required = false;
        }
        this.markForCheck();
    };
    /**
     * Set [[pattern]] value
     * @param pattern
     */
    /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    BaseComponent.prototype.setPattern = /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        this.pattern = pattern;
        this.markForCheck();
    };
    /**
     * Set [[min]] value
     * @param val
     */
    /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    BaseComponent.prototype.setMin = /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.min = val;
        this.markForCheck();
    };
    /**
     * Set [[max]] value
     * @param val
     */
    /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    BaseComponent.prototype.setMax = /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.max = val;
        this.markForCheck();
    };
    /**
     * Get [[pattern]] value
     * @returns [[pattern]]
     */
    /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    BaseComponent.prototype.getPattern = /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    function () {
        return this.pattern;
    };
    /**
     * Get [[min]] value
     * @returns [[min]]
     */
    /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    BaseComponent.prototype.getMin = /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    function () {
        return this.min;
    };
    /**
     * Get [[max]] value
     * @returns [[max]]
     */
    /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    BaseComponent.prototype.getMax = /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    function () {
        return this.max;
    };
    /**
     * Get [[inputLocale]] value
     * @returns [[inputLocale]]
     */
    /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    BaseComponent.prototype.getInputLocale = /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    function () {
        return this.inputLocale;
    };
    /** Set [[inputLocale]] value
     * @param locale
     */
    /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    BaseComponent.prototype.setInputLocale = /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.inputLocale = locale;
        this.markForCheck();
    };
    /**
     * Get [[inputCharsets]] value
     * @returns [[inputCharsets]]
     */
    /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    BaseComponent.prototype.getInputCharsets = /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    function () {
        return this.inputCharsets;
    };
    /**
     * Set [[inputCharests]] value
     * @param inputCharSets
     */
    /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    BaseComponent.prototype.setInputCharsets = /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    function (inputCharSets) {
        this.inputCharsets = inputCharSets;
        this.markForCheck();
    };
    /**
     * Get [[id]] value
     * @returns [[id]]
     */
    /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    BaseComponent.prototype.getId = /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    function () {
        return this.id;
    };
    /**
     * Set [[id]] value
     * @param id
     */
    /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    BaseComponent.prototype.setId = /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        if (this.parent != null && this.parent.children.has(this.id)) {
            this.parent.children.delete(KeyUtils.toMapKey(this.id));
            this.parent.children.set(KeyUtils.toMapKey(id), this);
            if (this._childrenIndex !== null) {
                /** @type {?} */
                var idx = _.findIndex(this.parent._childrenIndex, function (item) { return item === _this.id; });
                if (idx >= 0) {
                    this.parent._childrenIndex[idx] = id;
                }
                else {
                    this.parent._childrenIndex.push(id);
                }
                this.parent._childrenIndex = _.uniq(this.parent._childrenIndex);
            }
        }
        this.id = id;
    };
    /**
     * Abstract method. Implemented by sub class components
     * @param title
     */
    /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    BaseComponent.prototype.setTitle = /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    function (title) {
        //impl. by sub class
    };
    /**
     * Set [[cssClass]] of component.
     * @param css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     */
    /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    BaseComponent.prototype.setCssClass = /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    function (css, skipAttributeOverride) {
        if (skipAttributeOverride === void 0) { skipAttributeOverride = false; }
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            var temp = css.split("\.");
            this.cssClass = temp.join("-");
            if (temp[0] === "") {
                this.cssClass = this.cssClass.substring(1);
            }
        }
        this.cssClass = css;
        this.checkNxStyling(skipAttributeOverride);
        this.markForCheck();
    };
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param css CSS class name to add
     */
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    BaseComponent.prototype.addCssClass = /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    function (css) {
        if (this._cssClass == null || this._cssClass === "") {
            this._cssClass = css;
        }
        else if (this._cssClass.indexOf(css) == -1) {
            this._cssClass = this._cssClass + " " + css;
        }
        this.checkNxStyling();
        this.markForCheck();
    };
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param css CSS class name to remove
     */
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    BaseComponent.prototype.removeCssClass = /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    function (css) {
        if (this._cssClass != null)
            this._cssClass = this._cssClass.replace(css, '');
        this.checkNxStyling();
        this.markForCheck();
    };
    /**
     * Get the [[require]] property value
     * @returns Value of [[require]]
     */
    /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    BaseComponent.prototype.getRequired = /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    function () {
        return this.require;
    };
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     */
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    BaseComponent.prototype.destroyComponent = /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    function () {
        if (this.compRef != null) {
            this.compRef.destroy();
        }
        else if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).remove();
            this.ngOnDestroy();
            Logger.warn("Memory leak! Please use ngIf if you want to remove component!");
        }
    };
    /**
     * Gets JSON representation of the component
     * @returns JSON object
     */
    /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    BaseComponent.prototype.toJson = /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    function () {
        var _this = this;
        var e_2, _a;
        /** @type {?} */
        var retVal = {};
        //get custom attributes binded to our tag
        if (this.elementRef != null && this.elementRef.nativeElement != null) {
            /** @type {?} */
            var el_1 = this.elementRef.nativeElement;
            /** @type {?} */
            var attributes = null;
            if (typeof el_1.getAttributeNames === "function") {
                attributes = el_1.getAttributeNames();
            }
            else if (el_1.attributes) {
                attributes = [];
                for (var i = 0; i < el_1.attributes.length; i++) {
                    attributes.push(el_1.attributes[i].name);
                }
            }
            if (attributes != null) {
                _.forEach(attributes, function (attributeName) {
                    if (typeof AppUtils.validateAttribute === "function" && AppUtils.validateAttribute(attributeName)) {
                        _this.setJson(retVal, attributeName, el_1.getAttribute(attributeName));
                    }
                });
            }
            else if (typeof AppUtils.setCustomAttribute === "function") {
                AppUtils.setCustomAttribute(retVal, el_1);
            }
        }
        this.setJson(retVal, "nxTagName", this.getNxTagName());
        this.setJson(retVal, "tagName", this.getTagName());
        this.setJson(retVal, "id", this.id);
        this.setJson(retVal, "disabled", this.getDisabled());
        this.setJson(retVal, "enabled", this.getEnabled());
        this.setJson(retVal, "visible", this.getVisible());
        this.setJson(retVal, "text", this.getText());
        this.setJson(retVal, "cssClass", this.cssClass);
        this.setJson(retVal, "customAttributes", this.customAttributesToJson());
        if (this.getValue() != null) {
            this.setJson(retVal, "value", this.getValue());
        }
        if (this._children !== null) {
            if (this._children.size > 0) {
                //need to return children in proper order
                retVal["children"] = [];
                if (this._childrenIndex !== null) {
                    try {
                        for (var _b = tslib_1.__values(this._childrenIndex), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var id = _c.value;
                            /** @type {?} */
                            var c = this.getChild(id);
                            //getChild can return null?
                            if (c != null) {
                                /** @type {?} */
                                var childJson = this.childToJson(c);
                                if (childJson != null) {
                                    retVal["children"].push(childJson);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        return retVal;
    };
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    BaseComponent.prototype.childToJson = /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    function (child) {
        return child.toJson();
    };
    /**
     * Gets JSON representation of [[customAttributes]]
     * @returns JSON Object
     */
    /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    BaseComponent.prototype.customAttributesToJson = /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    function () {
        return BaseComponent.mapToJson(this.customAttributes);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    BaseComponent.mapToJson = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        var e_3, _a;
        /** @type {?} */
        var customAttributes = {};
        if (map) {
            /** @type {?} */
            var keys = _.keys(map);
            try {
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    /** @type {?} */
                    var value = map[key];
                    if (typeof value !== "string" && value != null) {
                        value = value + "";
                    }
                    customAttributes[key] = value;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return customAttributes;
    };
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @returns NxTagName as string
     */
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    BaseComponent.prototype.getNxTagName = /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    function () {
        return "none";
    };
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param json Object to add key to
     * @param key Key to set
     * @param value Value to set for key param
     */
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    BaseComponent.prototype.setJson = /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    function (json, key, value) {
        if (key != null) {
            json[key] = this.toJsonValue(value);
        }
    };
    /**
     * Converts value to a valid JSON property string
     * @param value Value to convert to string
     * @returns Value as a valid JSON property string
     */
    /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    BaseComponent.prototype.toJsonValue = /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    function (value) {
        if (typeof value === 'string') {
            return value;
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            return value + '';
        }
        else {
            return value;
        }
    };
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     */
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    BaseComponent.prototype.resetId = /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    function () {
        this.id = this._uniqueId;
    };
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @returns Value of [[checked]] property
     */
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    BaseComponent.prototype.getChecked = /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    function () {
        return false;
    };
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param boo Toggle [[checked]] on/off
     */
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    BaseComponent.prototype.setChecked = /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    function (boo) {
        // NO-OP
    };
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param boo Toggle [[checked]] on/off
     */
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    BaseComponent.prototype.setSelected = /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    function (boo) {
        // NO-OP
    };
    /* istanbul ignore next */
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @returns Value of maxLength as integer if it's set, otherwise returns null
     */
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    BaseComponent.prototype.getMaxLength = /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    function () {
        return this.maxLength == null ? -1 : JavaUtils.intValue(this.maxLength);
    };
    /* istanbul ignore next */
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @returns Value of minLength as integer if it's set, otherwise returns null
     */
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    BaseComponent.prototype.getMinLength = /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    function () {
        return this.minLength == null ? -1 : JavaUtils.intValue(this.minLength);
    };
    /**
     * Get a list of child components
     * @returns Child components
     */
    /**
     * Get a list of child components
     * @return {?} Child components
     */
    BaseComponent.prototype.getChildren = /**
     * Get a list of child components
     * @return {?} Child components
     */
    function () {
        var e_4, _a;
        /** @type {?} */
        var children = new Vector();
        if (this._childrenIndex !== null) {
            try {
                for (var _b = tslib_1.__values(this._childrenIndex), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    /** @type {?} */
                    var c = this.getChild(id);
                    if (c != null) {
                        children.add(c);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return children;
    };
    /* istanbul ignore next */
    /**
     * Remove child component from list of children and remove children of child
     * @param child Child component to remove
     */
    /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    BaseComponent.prototype.removeChild = /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    function (child) {
        //if somehow send it as string (via type any)
        if (typeof child === "string") {
            child = /** @type {?} */ (this.getElementById(child));
        }
        if (child != null) {
            //first hide it
            if (child.setVisible) {
                child.setVisible(false);
            }
            if (this.children) {
                this.children.delete(KeyUtils.toMapKey(child.id));
                if (this._childrenIndex !== null) {
                    this._childrenIndex = _.uniq(_.filter(this._childrenIndex, function (item) { return item !== child.id; }));
                }
            }
            /** @type {?} */
            var parentView = this.getParentView();
            //remove ourself from the view children map
            if (parentView != null && parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(child.getId()));
            }
            //move children of children
            if (child.removeAllChildren) {
                child.removeAllChildren();
            }
        }
    };
    /**
     * Removes child component by ID
     * @param id Child [[id]]
     */
    /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    BaseComponent.prototype.removeChildById = /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var child = this.getElementById(id);
        if (child != null) {
            this.removeChild(child);
        }
    };
    /**
     * Remove all child components
     * @return {?}
     */
    BaseComponent.prototype.removeAllChildren = /**
     * Remove all child components
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.children != null) {
            /** @type {?} */
            var cit = this.children.values();
            /** @type {?} */
            var cr = cit.next();
            while (cr.done !== true) {
                this.removeChild(cr.value);
                cr = cit.next();
            }
        }
        if (this.tabChildrenIds != null) {
            this.tabChildrenIds.forEach(function (cid) {
                _this.removeChildById(cid);
            });
        }
    };
    /* istanbul ignore next */
    /**
     * Finds the child component by ID. Deep search
     * @param id Child component [[id]]
     */
    /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    BaseComponent.prototype.getElementById = /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    function (id) {
        return this.findElementById(id);
    };
    /**
     * Check if a child component with id exists
     * @param id Child component [id]
     */
    /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    BaseComponent.prototype.hasChild = /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    function (id) {
        return this.findElementById(id) != null;
    };
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param attr
     */
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    BaseComponent.prototype.setValidate = /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    function (attr) {
        //TODO
        console.error("setValidate is not implemented");
    };
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param type
     */
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    BaseComponent.prototype.setType = /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    function (type) {
        //TODO
        console.error("setType is not implemented");
    };
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param format
     */
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    BaseComponent.prototype.setFormat = /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    function (format) {
        //TODO
        console.error("setFormat is not implemented");
    };
    /**
     * Set [[maxLength]] for input component
     * @param maxLength Input max length property. Should be numeric string
     */
    /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMaxLength = /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    function (maxLength) {
        this.maxLength = maxLength;
        this.markForCheck();
    };
    /**
     * Set [[minLength]] for input component
     * @param minLength Input max length property. Should be numeric string
     */
    /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMinLength = /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    function (minLength) {
        this.minLength = minLength;
        this.markForCheck();
    };
    /**
     * Set [[maxLength]] as byte length for input component
     * @param bl Should be numeric string
     */
    /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    BaseComponent.prototype.setMaxByteLen = /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    function (bl) {
        this.setMaxLength(bl);
    };
    /**
     * Abstract method. Set value of input component
     * @param val Value to set
     */
    /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    BaseComponent.prototype.setValue = /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    function (val) {
    };
    /**
     * Set focusable property value for component. Implement on sub class
     * @param focusable Toggle focusable on/off
     */
    /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    BaseComponent.prototype.setFocusable = /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    function (focusable) {
        //TODO
    };
    /**
     * Abstract. Select parent component tab. Implement on sub class
     */
    /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    BaseComponent.prototype.selectParentTab = /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    function () {
        /**
         * @param {?} item
         * @return {?}
         */
        function findTabBelong(item) {
            if (item != null) {
                /** @type {?} */
                var parent_1 = item.getParent();
                if (parent_1 != null && parent_1.getLocalName() !== 'tab')
                    return findTabBelong(parent_1);
                return parent_1;
            }
        }
        /** @type {?} */
        var tab = /** @type {?} */ (findTabBelong(this.getElementById(this.id)));
        /**
         * @param {?} tab
         * @return {?}
         */
        function findTabPaneBelong(tab) {
            if (tab != null) {
                /** @type {?} */
                var parent_2 = tab.getParent();
                if (parent_2 != null && parent_2.getLocalName() !== 'tab-pane')
                    return findTabPaneBelong(parent_2);
                return parent_2;
            }
        }
        /** @type {?} */
        var tabPane = /** @type {?} */ (findTabPaneBelong(this.getElementById(this.id)));
        if (tab != null) {
            tabPane.setSelectedTab(tab.id);
        }
    };
    /* istanbul ignore next */
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param id element id to search
     */
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    BaseComponent.prototype.findElementById = /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var mappedChildId = KeyUtils.toMapKey(id);
        /** @type {?} */
        var comp = null;
        //first check for cache
        // let comp: BaseComponent = UiDocument.getFromCache(mappedChildId);
        if (comp == null) {
            /** @type {?} */
            var radioGroup = this.getRadioButtonGroupComponent(id);
            if (radioGroup != null) {
                comp = radioGroup;
            }
            if (comp == null) {
                //get all children from View
                // const allChildren = this.getParentView().reduceChildrenIterative();
                // const editorId = `#{id}`;
                // for (let child of allChildren) {
                //   if (
                //     KeyUtils.toMapKey(child.getId()) === mappedChildId ||
                //     //by editor id (e.g. editor="#editorId")
                //     child.editor === editorId
                //   ) {
                //     comp = child;
                //     break;
                //   }
                // }
                if (this._viewChildrenMap != null) {
                    comp = this._viewChildrenMap.get(mappedChildId);
                }
                if (comp == null && this.isView() !== true) {
                    /** @type {?} */
                    var parentView = this.getParentView();
                    if (parentView != null) {
                        comp = parentView.findElementById(mappedChildId);
                    }
                }
            }
            //if we find component, add to cache
            // if (comp != null) {
            //   UiDocument.addToCache(mappedChildId, comp);
            // }
        }
        if (comp === undefined) {
            comp = null;
        }
        return comp;
    };
    /* istanbul ignore next */
    /**
     * Get radio button group component by id
     * @param id Radio button group ID
     */
    /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    BaseComponent.prototype.getRadioButtonGroupComponent = /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    function (id) {
        var e_5, _a;
        if (id === (/** @type {?} */ (this)).group) {
            //radio button group
            return this;
        }
        else {
            /** @type {?} */
            var radioGroup = this.getRadioButtonGroup(id);
            if (radioGroup != null) {
                /** @type {?} */
                var retVal = radioGroup[0];
                try {
                    for (var radioGroup_1 = tslib_1.__values(radioGroup), radioGroup_1_1 = radioGroup_1.next(); !radioGroup_1_1.done; radioGroup_1_1 = radioGroup_1.next()) {
                        var radio = radioGroup_1_1.value;
                        if (radio.getChecked() === true) {
                            retVal = radio;
                            break;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (radioGroup_1_1 && !radioGroup_1_1.done && (_a = radioGroup_1.return)) _a.call(radioGroup_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return retVal;
            }
        }
        return null;
    };
    /**
     * Add change listener on attributes
     * @param listener
     */
    /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    BaseComponent.prototype.addAttributeChangeListener = /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        if (this.attributeChangeListeners == null) {
            this.attributeChangeListeners = [];
        }
        listener._internalId = BaseComponent.generateUniqueId('listener');
        this.attributeChangeListeners.push(listener);
    };
    /**
     * Remove change listener on attributes
     * @param listener
     */
    /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    BaseComponent.prototype.removeAttributeChangeListener = /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        if (this.attributeChangeListeners != null) {
            this.attributeChangeListeners = _.filter(this.attributeChangeListeners, function (item) { return item._internalId !== listener._internalId; });
        }
    };
    /**
     * Set attribute and emit change event
     * @param attributeName
     * @param newValue
     * @event AttributeChangeEvent
     */
    /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    BaseComponent.prototype.fireSetAttributeEvent = /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    function (attributeName, newValue) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            var event_1 = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), newValue, this);
            _.forEach(this.attributeChangeListeners, function (listener) {
                listener.onAttributeSet(event_1);
            });
        }
    };
    /**
     * Remove attribute and emit change event
     * @param attributeName
     * @event AttributeChangeEvent
     */
    /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    BaseComponent.prototype.fireRenoveAttributeEvent = /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    function (attributeName) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            var event_2 = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), null, this);
            _.forEach(this.attributeChangeListeners, function (listener) {
                listener.onAttributeRemoved(event_2);
            });
        }
    };
    /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    BaseComponent.prototype.cleanCss = /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    function (css) {
        return BaseComponent.cleanCss(css);
    };
    /* istanbul ignore next */
    /**
     * Format css selectors. Remove dot
     * @param css
     * @returns New CSS selector string
     */
    /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    BaseComponent.cleanCss = /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    function (css) {
        var _this = this;
        if (css != null && css.indexOf(".") >= 0) {
            //more than one style?
            if (css.indexOf(" ") > 0) {
                return _.map(css.split(" "), function (item) { return _this.cleanCss(item); }).join(" ");
            }
            else {
                //only one style
                return css.replace(/\./g, '-').replace(/^\-/, '');
            }
        }
        return css;
    };
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     */
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    BaseComponent.prototype.getChangeDetector = /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    function () {
        //sub-class override
        return null;
    };
    /**
     * Mark component for change detection
     */
    /**
     * Mark component for change detection
     * @return {?}
     */
    BaseComponent.prototype.markForCheck = /**
     * Mark component for change detection
     * @return {?}
     */
    function () {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().markForCheck();
            }
        }
    };
    /**
     * Invoke change detection on component
     */
    /**
     * Invoke change detection on component
     * @return {?}
     */
    BaseComponent.prototype.detectChanges = /**
     * Invoke change detection on component
     * @return {?}
     */
    function () {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().detectChanges();
            }
        }
    };
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param heightStyleName
     * @param widthStyleName
     */
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    BaseComponent.prototype.initWidthHeightStyle = /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    function (heightStyleName, widthStyleName) {
        if (heightStyleName === void 0) { heightStyleName = 'height'; }
        if (widthStyleName === void 0) { widthStyleName = 'max-width'; }
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.styles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.styles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    };
    /* istanbul ignore next */
    /**
     * Add a radio button component to this component
     * @param radio
     */
    /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    BaseComponent.prototype.addRadioButtonGroup = /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    function (radio) {
        //radio group need to be at ViewComponent level
        if (this.isView() !== true && this.getParent() != null) {
            return this.getParent().addRadioButtonGroup(radio);
        }
        if (this.radioButtonGroups == null) {
            this.radioButtonGroups = new Map();
        }
        /** @type {?} */
        var groupId = (/** @type {?} */ (radio)).group;
        if (this.radioButtonGroups.get(groupId) == null) {
            this.radioButtonGroups.set(groupId, [radio]);
        }
        else {
            this.radioButtonGroups.get(groupId).push(radio);
        }
        return;
    };
    /* istanbul ignore next */
    /**
     * Get radio button group by group ID
     * @param groupId
     * @returns  Radio button group component
     */
    /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    BaseComponent.prototype.getRadioButtonGroup = /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    function (groupId) {
        /** @type {?} */
        var view = this.getParentView();
        return view != null && view.radioButtonGroups != null ? view.radioButtonGroups.get(groupId) : null;
    };
    /**
     * Sets [[controlWidth]] property
     * @param width Should be numeric value
     */
    /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    BaseComponent.prototype.setControlWidth = /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    function (width) {
        this.controlWidth = width;
        this.initWidthHeightStyle();
        this.markForCheck();
    };
    /**
     * Sets [[controlHeight]] property
     * @param height Should be numeric value
     */
    /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    BaseComponent.prototype.setControlHeight = /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    function (height) {
        this.controlHeight = height;
        this.initWidthHeightStyle();
        this.markForCheck();
    };
    /**
     * Alias for [[setControlWidth]] method
     * @param width Should be a numeric value
     */
    /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    BaseComponent.prototype.setWidth = /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    function (width) {
        this.setControlWidth(width);
    };
    /**
     * Get [[controlWidth]] property
     * @returns Value of [[controlWidth]]
     */
    /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    BaseComponent.prototype.getWidth = /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    function () {
        return this.controlWidth;
    };
    /**
     * Alias for [[setControlHeight]] method
     * @param height Should be a numeric value
     */
    /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    BaseComponent.prototype.setHeight = /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    function (height) {
        this.setControlHeight(height);
    };
    /**
     * Get [[controlHeight]] property
     * @returns Value of [[controlHeight]]
     */
    /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    BaseComponent.prototype.getHeight = /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    function () {
        return this.controlHeight;
    };
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param x Horizontal coordinate position
     */
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    BaseComponent.prototype.setX = /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    function (x) {
        this.x = x;
        this.styles["left"] = x + "px";
        this.markForCheck();
    };
    /**
     * Get [[x]] property
     * @returns Value of [[x]]
     */
    /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    BaseComponent.prototype.getX = /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    function () {
        return this.x;
    };
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param y Vertical coordinate position
     */
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    BaseComponent.prototype.setY = /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    function (y) {
        this.y = y;
        this.styles["top"] = y + "px";
        this.markForCheck();
    };
    /**
     * Get [[y]] property
     * @returns Value of [[y]]
     */
    /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    BaseComponent.prototype.getY = /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    function () {
        return this.y;
    };
    /**
     * Set [[borderWidth]] property value
     * @param borderWidth Should be numeric
     */
    /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    BaseComponent.prototype.setBorderWidth = /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    function (borderWidth) {
        this.borderWidth = borderWidth;
        this.markForCheck();
    };
    /**
     * Check if component is view component.
     * Implement in sub class
     */
    /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    BaseComponent.prototype.isView = /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if there are active views.
     * Implement in sub class
     */
    /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    BaseComponent.prototype.isNoneActiveView = /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if this component is an instance of [[DialogComponent]]
     */
    /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    BaseComponent.prototype.isDialog = /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Check if this component is a dynamic view
     */
    /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    BaseComponent.prototype.isDynamicView = /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Get the parent view of this component
     * @returns Parent view component
     */
    /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    BaseComponent.prototype.getParentView = /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    function () {
        if (this.isView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
                if (temp.isView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.getParentScrollView = /**
     * @return {?}
     */
    function () {
        if (this.isScrollView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
                if (temp.isScrollView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.isScrollView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     */
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    BaseComponent.prototype._getNoneActiveViewParent = /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    function () {
        if (this.isNoneActiveView()) {
            return this;
        }
        /** @type {?} */
        var parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            var stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                var temp = stack.pop();
                if (temp.isNoneActiveView() === true) {
                    parentView = temp;
                    break;
                }
                if (temp.parent != null) {
                    stack.push(temp.parent);
                }
            }
        }
        return parentView;
    };
    /* istanbul ignore next */
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param event Click event
     * @param force always emit
     */
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    BaseComponent.prototype.handleOnContextMenu = /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    function (event, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        //allow component to skip emit event and let parent (i.e. table cell to emit it)
        if (force === true || this.skipEmitContextMenuEvent !== true) {
            if (this.getSession() != null) {
                this.getSession().setMousePosition(event);
            }
            /** @type {?} */
            var parentView = this.getParentView();
            /** @type {?} */
            var popupMenuId_1 = null;
            if (parentView != null) {
                popupMenuId_1 = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
            }
            this.onContextMenu.emit(event);
            if (this.popup != null && this.popup !== "") {
                if (this.popup.indexOf("#") === 0) {
                    this.popup = this.popup.substring(1);
                }
                popupMenuId_1 = this.popup;
                this.getSession()._currentPopupMenuId = this.popup;
            }
            if (popupMenuId_1 != null) {
                event.stopPropagation();
                event.preventDefault();
                /** @type {?} */
                var tm_1 = setTimeout(function () {
                    clearTimeout(tm_1);
                    if (_this.getSession()._currentPopupMenuId != null) {
                        popupMenuId_1 = _this.getSession()._currentPopupMenuId;
                    }
                    _this.getSession().showContextMenu(popupMenuId_1);
                    _this.getSession()._currentPopupMenuId = null;
                });
            }
        }
    };
    /**
     * Emits focus lost event for components that require validation
     * @param event
     * @event BeforeActiveLost
     */
    /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    BaseComponent.prototype.validateField = /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (AppUtils.validateField != null && AppUtils.validateField(this) !== true) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.onBeforeActiveLost.emit();
        this.focusLost();
    };
    //iteratative function to prevent stack overflow
    // reduceChildrenIterative() {
    //   if (this._reduceChildrenIterativeCache != null && this._reduceChildrenIterativeCache.length > 0) {
    //     return this._reduceChildrenIterativeCache;
    //   }
    //   this._reduceChildrenIterativeCache = [];
    //   if (this.children == null) {
    //     Logger.warn("reduceChildrenIterative, children is null");
    //     return this._reduceChildrenIterativeCache;
    //   }
    //   //skip DialogComponent
    //   let stack: Array<BaseComponent> = _.filter(Array.from(this.children.values()), (comp: BaseComponent)=>{
    //     return comp.isFauxElement() || comp.isDialog() !== true;
    //   });
    //   this._reduceChildrenIterativeCache = this._reduceChildrenIterativeCache.concat(stack);
    //   let counter = 0;
    //   while(stack.length > 0) {
    //     const child = stack.pop();
    //     if (child.children != null && child.children.size > 0) {
    //       //get grandchildren
    //       const grandChildren = Array.from(child.children.values());
    //       this._reduceChildrenIterativeCache = this._reduceChildrenIterativeCache.concat(grandChildren);
    //       //push to our stack to iterate our grandchildren to look for great grandchildren
    //       stack = stack.concat(grandChildren);
    //     }
    //     counter++;
    //     if (counter > 10000 || stack.length > 10000) {
    //       throw new Error("BaseComponent.reduceChildrenIterative: stack overflow");
    //     }
    //   }
    //   return this._reduceChildrenIterativeCache;
    // }
    /**
     * Get children of a table component.
     * @returns Array of table children
     */
    /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    BaseComponent.prototype.getTableChildren = /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    function () {
        return [];
    };
    /**
     * Get [[bgColor]] property
     * @returns Value of [[bgColor]]
     */
    /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    BaseComponent.prototype.getBgColor = /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    function () {
        return this.bgColor;
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.setAttributeFromDef = /**
     * @return {?}
     */
    function () {
        var e_6, _a;
        /** @type {?} */
        var compDef = this.getSession().getDef(this.id);
        if (compDef != null && compDef.attribute != null) {
            if (compDef.attribute instanceof Map ||
                compDef.attribute instanceof Hashtable ||
                compDef.attribute instanceof HashMap) {
                /** @type {?} */
                var keys = compDef.attribute.keys();
                /** @type {?} */
                var key = keys.next();
                while (key.done !== true) {
                    this.setAttribute(key.value, compDef.attribute.get(key));
                    key = keys.next();
                }
            }
            else {
                /** @type {?} */
                var keys = _.keys(compDef.attribute);
                try {
                    for (var keys_2 = tslib_1.__values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                        var key = keys_2_1.value;
                        this.setAttribute(key, compDef.attribute[key]);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
    };
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * @warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param xpathExpression
     */
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    BaseComponent.prototype.evaluateXPath = /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    function (xpathExpression) {
        return null;
    };
    /**
     * Set color of hightlighted text background
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    BaseComponent.prototype.setHighlightBgColor = /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    function (color) {
        this.highlightBgColor = color;
    };
    /**
     * Set color of highlighted text foreground
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    BaseComponent.prototype.setHighlightFontColor = /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    function (color) {
        this.highlightFontColor = color;
    };
    /**
     * Get [[hightlightBgColor]] property
     * @returns Color string
     */
    /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    BaseComponent.prototype.getHighlightBgColor = /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    function () {
        return this.highlightBgColor;
    };
    /**
     * Get [[highlightFontColor]] property
     * @returns Color string
     */
    /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    BaseComponent.prototype.getHighlightFontColor = /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    function () {
        return this.highlightFontColor;
    };
    /**
     * Get [[parentTableRow]] property
     */
    /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    BaseComponent.prototype.getParentTableRow = /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    function () {
        return this.parentTableRow;
    };
    //clear reduce children iterative cache
    // resetReduceChildrenIterativeCache() {
    //   this._reduceChildrenIterativeCache = null;
    // }
    /**
     * Check if change detection is frozen
     * @returns Boolean If component change detection is frozen
     */
    /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    BaseComponent.prototype.isChangeDetectionFrozen = /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    function () {
        return false;
    };
    /**
     * Check if component is a faux element
     * @returns Boolean If component is faux element
     */
    /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    BaseComponent.prototype.isFauxElement = /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    function () {
        return false;
    };
    /**
     * Get internal [[_viewChildrenMap]] member
     * @returns Value of [[_viewChildrenMap]]
     */
    /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    BaseComponent.prototype.getViewChildrenMap = /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    function () {
        return this._viewChildrenMap;
    };
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param id ID of child to remove
     */
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    BaseComponent.prototype.removeViewChildFromMap = /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    function (id) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.delete(KeyUtils.toMapKey(id));
        }
    };
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param obj Child to add to [[_viewChildrenMap]]
     */
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    BaseComponent.prototype.addViewChildToMap = /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    function (obj) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.set(KeyUtils.toMapKey(obj.getId()), /** @type {?} */ (obj));
        }
    };
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param action Name of action method to invoke or a function to invoke
     */
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    BaseComponent.prototype.invokeMcoAction = /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    function (action) {
        if (typeof action === "function") {
            action(this);
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            var mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            var methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            var arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    if (arg === "this") {
                        mco[methodName].apply(mco, [this]);
                    }
                    else {
                        mco[methodName].apply(mco, [arg]);
                    }
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
            else {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype._notifyInternalChangeCb = /**
     * @return {?}
     */
    function () {
        if (typeof this._internalChangeCb === "function") {
            this._internalChangeCb(this);
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.emptyChildren = /**
     * @return {?}
     */
    function () {
        if (this._viewChildrenMap != null) {
            /** @type {?} */
            var cit = this._viewChildrenMap.values();
            /** @type {?} */
            var val = cit.next();
            while (val.done !== true) {
                //some children are not actual BaseComponent
                if (typeof val.value.emptyChildren === "function") {
                    val.value.emptyChildren();
                    val.value._isDying = true;
                }
                val = cit.next();
            }
        }
        if (this.children != null) {
            this.children.clear();
        }
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
            delete this._viewChildrenMap;
        }
        // this._viewChildrenMap = null;
    };
    /**
     * Check to see if this is a ScrollPaneComponent
     */
    /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    BaseComponent.prototype.isScrollPane = /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Reset the scroll position to the previous captured
     */
    /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    BaseComponent.prototype.resetScrollTopToPreviousPosition = /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    function () {
        //implement by scrollpane
    };
    /**
     * Reset all scrollpane pos
     */
    /**
     * Reset all scrollpane pos
     * @return {?}
     */
    BaseComponent.prototype.resetAllScrollPanesPositionToPrevious = /**
     * Reset all scrollpane pos
     * @return {?}
     */
    function () {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach(function (scrollPane) { return scrollPane.resetScrollTopToPreviousPosition(); });
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.resetScrollTopPosition = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.resetAllScrollPanesPositionToTop = /**
     * @return {?}
     */
    function () {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach(function (scrollPane) { return scrollPane.resetScrollTopPosition(); });
        }
    };
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     */
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    BaseComponent.prototype.notifyParentOfError = /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    function () {
        if (this.getDisabled() === true) {
            /** @type {?} */
            var parentView = this.getParentView();
            if (parentView != null && parentView["dialog"] != null) {
                if (parentView["dialog"]._disabledErrorElementId == null) {
                    parentView["dialog"]._disabledErrorElementId = [];
                }
                if (parentView["dialog"]._disabledErrorElementId.indexOf(this.getId()) < 0) {
                    parentView["dialog"]._disabledErrorElementId.push(this.getId());
                }
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Focus the parent tab
     */
    /**
     * Focus the parent tab
     * @return {?}
     */
    BaseComponent.prototype.focusParentTab = /**
     * Focus the parent tab
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parentView = this._getNoneActiveViewParent() || this.getParentView();
        if (parentView != null) {
            /** @type {?} */
            var tabPane = parentView.getParent();
            //check to see if the parent is a Tab
            if (tabPane != null && tabPane.getNxTagName() === "tab") {
                tabPane.setFocus();
            }
        }
    };
    /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    BaseComponent.prototype.registerScrollPane = /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    function (scrollPane) {
        if (typeof scrollPane.isScrollPane === "function" && scrollPane.isScrollPane() === true) {
            if (this.scrollPanes == null) {
                this.scrollPanes = [];
            }
            this.scrollPanes.push(scrollPane);
        }
    };
    BaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-base',
                    template: 'nothing here'
                }] }
    ];
    /** @nocollapse */
    BaseComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    BaseComponent.propDecorators = {
        autoWrap: [{ type: Input }],
        borderPosition: [{ type: Input }],
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        sort: [{ type: Input }],
        visible: [{ type: Input }],
        text: [{ type: Input }],
        cssClass: [{ type: Input }],
        controlWidth: [{ type: Input }],
        controlHeight: [{ type: Input }],
        maxHeight: [{ type: Input }],
        lineHeight: [{ type: Input }],
        marginRight: [{ type: Input }],
        marginLeft: [{ type: Input }],
        marginTop: [{ type: Input }],
        marginBottom: [{ type: Input }],
        controlMargin: [{ type: Input }],
        controlPadding: [{ type: Input }],
        controlOverflow: [{ type: Input }],
        panelWidth: [{ type: Input }],
        panelMinWidth: [{ type: Input }],
        panelMinHeight: [{ type: Input }],
        controlFloat: [{ type: Input }],
        required: [{ type: Input }],
        pattern: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        minLength: [{ type: Input }],
        maxLength: [{ type: Input }],
        inputLocale: [{ type: Input }],
        inputCharsets: [{ type: Input }],
        focusOnActivation: [{ type: Input }],
        focused: [{ type: Input }],
        orderIndex: [{ type: Input }],
        x: [{ type: Input }],
        y: [{ type: Input }],
        require: [{ type: Input }],
        controlWidthComboBox: [{ type: Input }],
        class: [{ type: Input }],
        hGrabSpace: [{ type: Input }],
        vGrabSpace: [{ type: Input }],
        bgColor: [{ type: Input }],
        editor: [{ type: Input }],
        popup: [{ type: Input }],
        alignHorizontal: [{ type: Input }],
        enabled: [{ type: Input }],
        sortValue: [{ type: Input }],
        customAttributes: [{ type: Input }],
        fontBold: [{ type: Input }],
        fontColor: [{ type: Input }],
        fontItalic: [{ type: Input }],
        fontSize: [{ type: Input }],
        fontUnderline: [{ type: Input }],
        fontColorDisabled: [{ type: Input }],
        opacity: [{ type: Input }],
        borderColor: [{ type: Input }],
        borderWidth: [{ type: Input }],
        borderStyle: [{ type: Input }],
        borderHeight: [{ type: Input }],
        skipEmitContextMenuEvent: [{ type: Input }],
        onContextMenu: [{ type: Output }],
        onActiveLost: [{ type: Output }],
        onBeforeActiveLost: [{ type: Output }]
    };
    return BaseComponent;
}());
export { BaseComponent };
if (false) {
    /** @type {?} */
    BaseComponent.prototype.autoWrap;
    /** @type {?} */
    BaseComponent.prototype.borderPosition;
    /** @type {?} */
    BaseComponent.prototype.id;
    /** @type {?} */
    BaseComponent.prototype.disabled;
    /** @type {?} */
    BaseComponent.prototype.sort;
    /** @type {?} */
    BaseComponent.prototype.visible;
    /** @type {?} */
    BaseComponent.prototype.text;
    /** @type {?} */
    BaseComponent.prototype.controlWidth;
    /** @type {?} */
    BaseComponent.prototype.controlHeight;
    /** @type {?} */
    BaseComponent.prototype.maxHeight;
    /** @type {?} */
    BaseComponent.prototype.lineHeight;
    /** @type {?} */
    BaseComponent.prototype.marginRight;
    /** @type {?} */
    BaseComponent.prototype.marginLeft;
    /** @type {?} */
    BaseComponent.prototype.marginTop;
    /** @type {?} */
    BaseComponent.prototype.marginBottom;
    /** @type {?} */
    BaseComponent.prototype.controlMargin;
    /** @type {?} */
    BaseComponent.prototype.controlPadding;
    /** @type {?} */
    BaseComponent.prototype.controlOverflow;
    /** @type {?} */
    BaseComponent.prototype.panelWidth;
    /** @type {?} */
    BaseComponent.prototype.panelMinWidth;
    /** @type {?} */
    BaseComponent.prototype.panelMinHeight;
    /** @type {?} */
    BaseComponent.prototype.controlFloat;
    /** @type {?} */
    BaseComponent.prototype.required;
    /** @type {?} */
    BaseComponent.prototype.pattern;
    /** @type {?} */
    BaseComponent.prototype.min;
    /** @type {?} */
    BaseComponent.prototype.max;
    /** @type {?} */
    BaseComponent.prototype.minLength;
    /** @type {?} */
    BaseComponent.prototype.maxLength;
    /** @type {?} */
    BaseComponent.prototype.inputLocale;
    /** @type {?} */
    BaseComponent.prototype.inputCharsets;
    /** @type {?} */
    BaseComponent.prototype.focusOnActivation;
    /** @type {?} */
    BaseComponent.prototype.focused;
    /** @type {?} */
    BaseComponent.prototype.orderIndex;
    /** @type {?} */
    BaseComponent.prototype.x;
    /** @type {?} */
    BaseComponent.prototype.y;
    /** @type {?} */
    BaseComponent.prototype.controlWidthComboBox;
    /** @type {?} */
    BaseComponent.prototype.hGrabSpace;
    /** @type {?} */
    BaseComponent.prototype.vGrabSpace;
    /** @type {?} */
    BaseComponent.prototype.bgColor;
    /** @type {?} */
    BaseComponent.prototype.editor;
    /** @type {?} */
    BaseComponent.prototype.popup;
    /**
     * Align horizontally? TODO need is a major regression test
     * @type {?}
     */
    BaseComponent.prototype.alignHorizontal;
    /** @type {?} */
    BaseComponent.prototype._cssClass;
    /** @type {?} */
    BaseComponent.prototype.compRef;
    /** @type {?} */
    BaseComponent.prototype._tempFreezeCd;
    /** @type {?} */
    BaseComponent.prototype.customAttributes;
    /** @type {?} */
    BaseComponent.prototype.fontBold;
    /** @type {?} */
    BaseComponent.prototype.fontColor;
    /** @type {?} */
    BaseComponent.prototype.fontItalic;
    /** @type {?} */
    BaseComponent.prototype.fontSize;
    /** @type {?} */
    BaseComponent.prototype.fontUnderline;
    /** @type {?} */
    BaseComponent.prototype.fontColorDisabled;
    /** @type {?} */
    BaseComponent.prototype.opacity;
    /** @type {?} */
    BaseComponent.prototype.borderColor;
    /** @type {?} */
    BaseComponent.prototype.borderWidth;
    /** @type {?} */
    BaseComponent.prototype.borderStyle;
    /** @type {?} */
    BaseComponent.prototype.borderHeight;
    /** @type {?} */
    BaseComponent.prototype.skipEmitContextMenuEvent;
    /** @type {?} */
    BaseComponent.prototype.onContextMenu;
    /** @type {?} */
    BaseComponent.prototype.onActiveLost;
    /** @type {?} */
    BaseComponent.prototype.onBeforeActiveLost;
    /** @type {?} */
    BaseComponent.prototype.styles;
    /** @type {?} */
    BaseComponent.prototype.tableRowNo;
    /** @type {?} */
    BaseComponent.prototype._uniqueId;
    /**
     * This is for use when setAttribute(onCommand is set)
     * @type {?}
     */
    BaseComponent.prototype._internalOnCommand;
    /** @type {?} */
    BaseComponent.prototype._internalOnActiveLost;
    /** @type {?} */
    BaseComponent.prototype._internalChangeCb;
    /** @type {?} */
    BaseComponent.prototype._children;
    /** @type {?} */
    BaseComponent.prototype._childrenIndex;
    /** @type {?} */
    BaseComponent.prototype.attributeChangeListeners;
    /** @type {?} */
    BaseComponent.prototype.radioButtonGroups;
    /** @type {?} */
    BaseComponent.prototype.highlightBgColor;
    /** @type {?} */
    BaseComponent.prototype.highlightFontColor;
    /** @type {?} */
    BaseComponent.prototype.parentTableRow;
    /** @type {?} */
    BaseComponent.prototype._viewChildrenMap;
    /** @type {?} */
    BaseComponent.prototype.tabChildrenIds;
    /** @type {?} */
    BaseComponent.prototype.scrollPanes;
    /** @type {?} */
    BaseComponent.prototype._isDying;
    /** @type {?} */
    BaseComponent.prototype.parent;
    /** @type {?} */
    BaseComponent.prototype.sessionService;
    /** @type {?} */
    BaseComponent.prototype.elementRef;
    /** @type {?} */
    BaseComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2Jhc2UvYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQWlCLEtBQUssRUFBYSxVQUFVLEVBQTJDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJMLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7SUFnTmhDOzs7Ozs7OztPQVFHO0lBQ0gsdUJBQThDLE1BQXFCLEVBQVUsY0FBOEIsRUFBWSxVQUFzQixFQUFZLFFBQW1CO1FBQTlILFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNB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QUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdDO2lCQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25EO2lCQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9DO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxTQUFTLEtBQUssVUFBVSxFQUFFO2dCQUMvRCxJQUFJLENBQUMsWUFBWSxD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QUs7MEJBRUwsS0FBSzt5QkFJTCxLQUFLO3dCQUdMLEtBQUs7a0NBS0wsS0FBSzswQkFXTCxLQUFLOzRCQWFMLEtBQUs7bUNBU0wsS0FBSzsyQkFHTCxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUNMLEtBQUs7b0NBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUdMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7MkNBR0wsS0FBSztnQ0FHTCxNQUFNOytCQUNOLE1BQU07cUNBQ04sTUFBTTs7d0JBeEtUOztTQThCYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgU2tpcFNlbGYsIEFmdGVyVmlld0luaXQsIElucHV0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gXCIuL2tleS11dGlsc1wiO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tIFwiLi9hdHRyaWJ1dGVzLmVudW1cIjtcbmltcG9ydCB7IEphdmFVdGlscyB9IGZyb20gXCIuLi9qYXZhL2phdmEtdXRpbHNcIjtcbmltcG9ydCB7IENsaWVudEV2ZW50IH0gZnJvbSBcIi4uL2V2ZW50LWhhbmRsZXIvY2xpZW50LWV2ZW50XCI7XG5pbXBvcnQgeyBCb3JkZXJQb3NpdGlvbiB9IGZyb20gXCIuL3N0eWxlLWxpdGVyYWxzXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vamF2YS92ZWN0b3JcIjtcbmltcG9ydCB7IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSBcIi4vYXR0cmlidXRlLWNoYW5nZS1saXN0ZW5lclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlQ2hhbmdlRXZlbnQgfSBmcm9tIFwiLi9hdHRyaWJ1dGUtY2hhbmdlLWV2ZW50XCI7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgSGFzaHRhYmxlIH0gZnJvbSBcIi4uL2phdmEvaGFzaHRhYmxlXCI7XG5pbXBvcnQgeyBIYXNoTWFwIH0gZnJvbSBcIi4uL2phdmEvaGFzaC1tYXBcIjtcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vdmlldy92aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBIVE1MRWxlbWVudFdyYXBwZXIgfSBmcm9tIFwiLi4vdHJlZS10YWJsZS9odG1sLWVsZW1lbnQtd3JhcHBlclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlTmFtZVZhbHVlIH0gZnJvbSBcIi4vYXR0cmlidXRlLW5hbWUtdmFsdWVcIjtcbmltcG9ydCB7IFRydXN0ZWRTdHlsZVN0cmluZyB9IGZyb20gXCJAYW5ndWxhci9jb3JlL3NyYy9zYW5pdGl6YXRpb24vYnlwYXNzXCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLXBhbmUvdGFiL3RhYi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRhYlBhbmVDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLXBhbmUvdGFiLXBhbmUuY29tcG9uZW50XCI7XG5cbi8qKlxuICogTWFpbiBjbGFzcyB0aGF0IGFsbCBjb3JlIGNvbXBvbmVudHMgc2hvdWxkIGluaGVyaXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWJhc2UnLFxuICB0ZW1wbGF0ZTogJ25vdGhpbmcgaGVyZSdcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgYXV0b1dyYXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvcmRlclBvc2l0aW9uOiBCb3JkZXJQb3NpdGlvbjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc29ydDogc3RyaW5nID0gXCJcIjtcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9IFwiXCI7XG4gIEBJbnB1dCgpIHNldCBjc3NDbGFzcyhjc3M6IHN0cmluZykge1xuICAgIHRoaXMuX2Nzc0NsYXNzID0gdGhpcy5jbGVhbkNzcyhjc3MpO1xuICAgIHRoaXMuaW5pdEJvcmRlckxheW91dCgpO1xuICB9XG5cbiAgQElucHV0KCkgY29udHJvbFdpZHRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRyb2xIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luUmlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luTGVmdDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Ub3A6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luQm90dG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRyb2xNYXJnaW46IHN0cmluZztcbiAgQElucHV0KCkgY29udHJvbFBhZGRpbmc6IHN0cmluZztcbiAgQElucHV0KCkgY29udHJvbE92ZXJmbG93OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhbmVsV2lkdGg6IHN0cmluZztcbiAgQElucHV0KCkgcGFuZWxNaW5XaWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwYW5lbE1pbkhlaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBjb250cm9sRmxvYXQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGF0dGVybjogc3RyaW5nO1xuICBASW5wdXQoKSBtaW46IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgbWF4OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRMb2NhbGU6IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRDaGFyc2V0czogc3RyaW5nO1xuICBASW5wdXQoKSBmb2N1c09uQWN0aXZhdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgb3JkZXJJbmRleDogbnVtYmVyID0gLTE7XG4gIEBJbnB1dCgpIHg6IHN0cmluZztcbiAgQElucHV0KCkgeTogc3RyaW5nO1xuICBASW5wdXQoKSBzZXQgcmVxdWlyZShyZXE6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJlcXVpcmVkID0gcmVxO1xuICB9XG4gIEBJbnB1dCgpIGNvbnRyb2xXaWR0aENvbWJvQm94OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIGZvciBbW3JlcXVpcmVkXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCByZXF1aXJlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVpcmVkO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLy9hZGQgdG8gcHJldmVudCBjb25mdXNpb25cbiAgQElucHV0KCkgY2xhc3MoY3NzOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNzc0NsYXNzID0gY3NzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIGZvciBbW2Nzc0NsYXNzXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCBjc3NDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jc3NDbGFzcztcbiAgfVxuXG4gIC8vVE9ETyBuZWVkIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGVzZSBkb1xuICBASW5wdXQoKSBoR3JhYlNwYWNlOiBib29sZWFuO1xuICBASW5wdXQoKSB2R3JhYlNwYWNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGJnQ29sb3I6IHN0cmluZztcblxuICAvL3VzZSBieSA8ZGVmcyAuLi4uPlxuICAvL2UuZy4gPHZ0LWNvbWJvLWJveCBpZD1cImZvb1wiIGVkaXRvcj1cIiNmb29CYXJcIiAuLi4+XG4gIEBJbnB1dCgpIGVkaXRvcjogc3RyaW5nO1xuXG4gIC8vcG9wdXAgbWVudSBpZCB0aGF0IHNob3VsZCBwb3Agd2hlbiB0aGlzIGNvbXAgaXMgcmlnaHQgY2xpY2sgKGlmIHRoZXJlIGlzIGFueSlcbiAgQElucHV0KCkgcG9wdXA6IHN0cmluZztcblxuICAvKipcbiAgICogQWxpZ24gaG9yaXpvbnRhbGx5PyBUT0RPIG5lZWQgaXMgYSBtYWpvciByZWdyZXNzaW9uIHRlc3RcbiAgICovXG4gIEBJbnB1dCgpIGFsaWduSG9yaXpvbnRhbDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2Nzc0NsYXNzOiBzdHJpbmc7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgY29tcFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJpdmF0ZSBfdGVtcEZyZWV6ZUNkOiBib29sZWFuO1xuXG4gIC8vYWxpYXMgZm9yIGRpc2FibGVkXG4gIEBJbnB1dCgpIHNldCBlbmFibGVkKGJvbzogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgYm9vID09PSAnc3RyaW5nJykge1xuICAgICAgLy9pZiBlbmFibGVkIGlzIGZhbHNlLCBkaXNhYmxlZCBpcyB0cnVlXG4gICAgICB0aGlzLmRpc2FibGVkID0gYm9vID09PSAndHJ1ZScgPyBmYWxzZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSAhYm9vO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzb3J0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc29ydCA9IHZhbHVlXG4gIH1cblxuICBnZXQgc29ydFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc29ydDtcbiAgfVxuXG4gIC8vbG9va3MgbGlrZSBOZXhhd2ViIHN1cHBvcnQgY3VzdG9tIGF0dHJpYnV0ZXMga2V5L3ZhbHVlXG4gIEBJbnB1dCgpIGN1c3RvbUF0dHJpYnV0ZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuXG4gIC8vZm9udFxuICBASW5wdXQoKSBmb250Qm9sZDogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZm9udENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRJdGFsaWM6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZvbnRVbmRlcmxpbmU6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRDb2xvckRpc2FibGVkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wYWNpdHk6IHN0cmluZztcblxuICAvL2JvcmRlclxuICBASW5wdXQoKSBib3JkZXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJXaWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJTdHlsZTogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJIZWlnaHQ6IG51bWJlciB8IHN0cmluZztcblxuICAvL3NraXAgZW1pdGluZyBjb250ZXh0IG1lbnUgZXZlbnRcbiAgQElucHV0KCkgc2tpcEVtaXRDb250ZXh0TWVudUV2ZW50OiBib29sZWFuO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkFjdGl2ZUxvc3Q6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9uQmVmb3JlQWN0aXZlTG9zdDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHN0eWxlczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAvL2ZvciB0YWJsZSB1c2VcbiAgdGFibGVSb3dObzogbnVtYmVyO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmc7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFRoaXMgaXMgZm9yIHVzZSB3aGVuIHNldEF0dHJpYnV0ZShvbkNvbW1hbmQgaXMgc2V0KVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbnRlcm5hbE9uQ29tbWFuZDogKHBhcmFtPzogYW55KSA9PiB2b2lkO1xuICBwcm90ZWN0ZWQgX2ludGVybmFsT25BY3RpdmVMb3N0OiAocGFyYW0/OiBhbnkpID0+IHZvaWQ7XG5cbiAgLy9pbnRlcm5hbCB1c2Ugb25seSwgZG8gbm90IHVzZSBleHRlcm5hbGx5XG4gIF9pbnRlcm5hbENoYW5nZUNiOiAoY29tcDogQmFzZUNvbXBvbmVudCkgPT4gdm9pZDtcblxuICBnZXQgdW5pcXVlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoaWxkcmVuOiBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PiA9IG51bGw7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJvdGVjdGVkIF9jaGlsZHJlbkluZGV4OiBBcnJheTxzdHJpbmc+ID0gbnVsbDtcblxuICBnZXQgY2hpbGRyZW4oKTogTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHByaXZhdGUgYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcj47XG5cbiAgcHJpdmF0ZSByYWRpb0J1dHRvbkdyb3VwczogTWFwPHN0cmluZywgQXJyYXk8QmFzZUNvbXBvbmVudD4+O1xuXG4gIGhpZ2hsaWdodEJnQ29sb3I6IHN0cmluZztcbiAgaGlnaGxpZ2h0Rm9udENvbG9yOiBzdHJpbmc7XG5cbiAgcGFyZW50VGFibGVSb3c6IGFueTtcblxuICAvL2NhY2hlIHJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlXG4gIC8vIHByaXZhdGUgX3JlZHVjZUNoaWxkcmVuSXRlcmF0aXZlQ2FjaGU6IEFycmF5PEJhc2VDb21wb25lbnQ+O1xuXG4gIC8vdHJhY2sgYWxsIGNoaWxkcmVuIGZvciB0aGUgdmlld1xuICBwcm90ZWN0ZWQgX3ZpZXdDaGlsZHJlbk1hcDogTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD47XG5cbiAgLy9mb3IgVGFiQ29tcG9uZW50XG4gIHByb3RlY3RlZCB0YWJDaGlsZHJlbklkczogQXJyYXk8c3RyaW5nPjtcblxuICBwcml2YXRlIHNjcm9sbFBhbmVzOiBBcnJheTxCYXNlQ29tcG9uZW50PjtcblxuICBfaXNEeWluZzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igd2hlcmUgaXQgcmVxdWlyZWQgbWluaW1hbCBpbmplY3Rpb24gaW4gb3JkZXIgZm9yIHRoaXMgY2xhc3MgdG8gZnVuY3Rpb24gcHJvcGVybHkuIFN1YmNsYXNzIGNhbiBvdmVybG9hZCB0aGlzIGNvbnN0cnVjdG9yXG4gICAqIGJ1dCBpdCBtdXN0IHByb3ZpZGVkIHRoZSBtaW5pbWFsIHJlcXVpcmVkIGl0ZW1zIHRvIGJlIGluamVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IFRoZSBjb21wb25lbnQgd2hlcmUgdGhpcyBjb21wb25lbnQgd2lsbCBiZSB1c2VkLiBUaGlzIGluamVjdGlvbiBpcyBwcm92aWRlZCBieSBBbmd1bGFyIGlmIHRoZSBwYXJlbnQgY29tcG9uZW50IFwicHJvdmlkZVwiIGl0c2VsZi5cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIFNlc3Npb25TZXJ2aWNlIG5lZWRlZCBieSB0aGlzIGNsYXNzLCB0aGlzIHNob3VsZCBiZSBpbmplY3RlZCBieSBBbmd1bGFyLlxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiB0aGUgZWxlbWVudCByZWZlcmVuY2UgdGhhdCB3cmFwIHRoZSBlbGVtZW50ICh0YWcpIG9mIHRoaXMgY29tcG9uZW50LlxuICAgKiBAcGFyYW0gcmVuZGVyZXIgVGhlIHJlbmRlcmVyIChpbmplY3RlZCBieSBBbmd1bGFyKSB0aGF0IHdlIHVzZWQgdG8gcGVyZm9ybSBET00gbWFuaXB1bGF0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJvdGVjdGVkIHBhcmVudDogQmFzZUNvbXBvbmVudCwgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX3VuaXF1ZUlkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKCk7XG5cbiAgICAvL2luaXRpYWwgaWRcbiAgICB0aGlzLmlkID0gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR290IGNhbGwgd2hlbiB0aGlzIGNvbXBvbmVudCBmaW5pc2hlZCBpbml0aWFsaXppbmcsIGlmIHlvdSBvdmVycmlkZSB0aGlzLCBtYWtlIHN1cmUgdG8gY2FsbCBzdXBlci5uZ0FmdGVyVmlld0luaXQoKVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGlsZHJlbkluZGV4ID0gXy51bmlxKHRoaXMuX2NoaWxkcmVuSW5kZXgpO1xuXG4gICAgLy9jb21tbmV0IG91dCwgY2F1c2luZyByZWdyZXNzaW9uIGIvYyB0aGUgY3NzIHNlbGVjdG9yIG5lZWQgaWQgb2YgcGFyZW50IHdpbmRvd1xuICAgIC8vIGlmICh0aGlzLnJlbmRlcmVyICE9IG51bGwgJiYgdHlwZW9mIHRoaXMucmVuZGVyZXJbXCJyZW1vdmVBdHRyaWJ1dGVcIl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFwiaWRcIik7XG4gICAgLy8gfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEluaXQgbGlmZSBjeWNsZSBvZiB0aGlzIGNsYXNzLCBpZiB5b3Ugb3ZlcnJpZGUgdGhpcywgbWFrZSBzdXJlIHRvIGNhbGwgc3VwZXIubmdPbkluaXQoKVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0Qm9yZGVyTGF5b3V0KCk7XG5cbiAgICBpZiAodGhpcy5mb250Qm9sZCA9PT0gdHJ1ZSB8fCB0aGlzLmZvbnRCb2xkID09PSBcInRydWVcIikge1xuICAgICAgdGhpcy5zZXRGb250Qm9sZCh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250SXRhbGljID09PSB0cnVlIHx8IHRoaXMuZm9udEl0YWxpYyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgICB0aGlzLnNldEZvbnRJdGFsaWModHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9udFNpemUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRGb250U2l6ZSh0aGlzLmZvbnRTaXplKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250VW5kZXJsaW5lID09PSB0cnVlIHx8IHRoaXMuZm9udFVuZGVybGluZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc2V0Rm9udFVuZGVybGluZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250Q29sb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLmZvbnRDb2xvcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1dyYXAgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wid2hpdGUtc3BhY2VcIl0gPSBcIm5vcm1hbFwiO1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1dyYXAgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcIndoaXRlLXNwYWNlXCJdID0gXCJub3dyYXBcIjtcbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja054U3R5bGluZygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJpdmF0ZSBjaGVja054U3R5bGluZyhza2lwQXR0cmlidXRlT3ZlcnJpZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChza2lwQXR0cmlidXRlT3ZlcnJpZGUgIT09IHRydWUgJiYgdGhpcy5fY3NzQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLl9jc3NDbGFzcy5sZW5ndGggPiAwICYmIHR5cGVvZiBBcHBVdGlscy5hdHRyaWJ1dGVPdmVycmlkZUNsYXNzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyh0aGlzLl9jc3NDbGFzcyk7XG5cbiAgICAgIGlmIChuZXdBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgLy8gY2xhc3Mg44Gr6Zai44GX44Gm44Gv44CB5pei5a2Y44Gu5oyH5a6a44Go44Oe44O844K4XG4gICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICBuZXdBdHRyaWJ1dGVzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lICE9PSBBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICAgIFxuICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IEF0dHJpYnV0ZXNFbnVtLkNMQVNTLFxuICAgICAgICAgIHZhbHVlOiAodGhpcy5fY3NzQ2xhc3MgKyBcIiBcIiArIG5ld0Nzc0NsYXNzKS50cmltKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhuZXdBdHRyaWJ1dGVzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50UmVmICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IF92YWxpZGF0ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShcInZhbGlkYXRlXCIpO1xuXG4gICAgICBpZiAoc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIF92YWxpZGF0ZSAhPSBudWxsICYmIF92YWxpZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZShfdmFsaWRhdGUpO1xuXG4gICAgICAgIGlmIChuZXdBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBjbGFzcyDjgavplqLjgZfjgabjga/jgIHml6LlrZjjga7mjIflrprjgajjg57jg7zjgrhcbiAgICAgICAgICBjb25zdCBuZXdDc3NDbGFzcyA9IF8uZmlsdGVyKG5ld0F0dHJpYnV0ZXMsIChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIuYXR0cmlidXRlTmFtZSA9PT0gQXR0cmlidXRlc0VudW0uQ0xBU1MpLm1hcCgoYXR0cjogQXR0cmlidXRlTmFtZVZhbHVlKSA9PiBhdHRyLnZhbHVlKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lICE9PSBBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICAgICAgXG4gICAgICAgICAgbmV3QXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IEF0dHJpYnV0ZXNFbnVtLkNMQVNTLFxuICAgICAgICAgICAgdmFsdWU6ICh0aGlzLl9jc3NDbGFzcyArIFwiIFwiICsgbmV3Q3NzQ2xhc3MpLnRyaW0oKSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhuZXdBdHRyaWJ1dGVzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGJvcmRlciBDU1MgYmFzZWQgb24gYm9yZGVyUG9zaXRpb24gdmFsdWUgKHRvcCB8IGxlZnQgfCBib3R0b20gfCByaWdodClcbiAgICovXG4gIHByaXZhdGUgaW5pdEJvcmRlckxheW91dCgpIHtcbiAgICBpZiAodGhpcy5ib3JkZXJQb3NpdGlvbiAhPSBudWxsICYmIHRoaXMuYm9yZGVyUG9zaXRpb24gIT0gJycpIHtcbiAgICAgIGlmICh0aGlzLl9jc3NDbGFzcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzID0gdGhpcy5fY3NzQ2xhc3MgKyAnIGJvcmRlci0nICsgdGhpcy5ib3JkZXJQb3NpdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzID0gJ2JvcmRlci0nICsgdGhpcy5ib3JkZXJQb3NpdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIENsZWFyIGNvbXBvbmVudCByZWZlcmVuY2VzIGFuZCBjYWNoZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5faXNEeWluZyA9IHRydWU7XG5cbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAvL3JlbW92ZSBvdXJzZWxmIGZyb20gdGhlIHZpZXcgY2hpbGRyZW4gbWFwXG4gICAgICBpZiAocGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleSh0aGlzLmdldElkKCkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZUNiID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92aWV3Q2hpbGRyZW5NYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hpbGRyZW5JbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgPSBudWxsO1xuICAgIHRoaXMucmFkaW9CdXR0b25Hcm91cHMgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IG51bGw7XG4gICAgdGhpcy5zY3JvbGxQYW5lcyA9IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYW51cCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW1Nlc3Npb25TZXJ2aWNlXV0gaW5zdGFuY2UgaW5qZWN0ZWQgdmlhIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm5zIFNlc3Npb25TZXJ2aWNlIGluc3RhbmNlXG4gICAqL1xuICBnZXRTZXNzaW9uKCk6IFNlc3Npb25TZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uU2VydmljZTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgY29tcG9uZW50IGJ5IGlkXG4gICAqIEBwYXJhbSBpZCBDb21wb25lbnQgSURcbiAgICogQHJldHVybnMgQ2hpbGQgW1tCYXNlQ29tcG9uZW50XV1cbiAgICovXG4gIGdldENoaWxkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5nZXQoS2V5VXRpbHMudG9NYXBLZXkoaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgZGlzYWJsZWQgcHJvcGVydHlcbiAgICovXG4gIHNldERpc2FibGVkKGJvbzogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBib287XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgW1t2aXNpYmxlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgdmlzaWJsZSBwcm9wZXJ0eVxuICAgKi9cbiAgc2V0VmlzaWJsZShib286IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc2libGUgPSBib287XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldFNjcm9sbFBvc1ZlcnRpY2FsKGV4cHJlc3Npb24pIHtcbiAgICAvL1RPRE9cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY29sb3Igb2YgdGV4dCBvbiB0aGUgY29tcG9uZW50XG4gICAqIEBwYXJhbSB2YWx1ZSBDb2xvciBzdHJpbmcuIFNob3VsZCBiZSBoZXhhZGVjaW1hbCBvciBjb2xvciBuYW1lIHN1cHBvcnRlZCBieSBDU1NcbiAgICovXG4gIHNldEZvbnRDb2xvcih2YWx1ZSkge1xuICAgIHRoaXMuc2V0Q29sb3IodmFsdWUpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFZhbHVlIG9mIFtbZGlzYWJsZWRdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBkaXNhYmxlZFxuICAgKi9cbiAgZ2V0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2Ygb3Bwb3NpdGUgb2YgW1tkaXNhYmxlZF1dIHZhbHVlXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIGVuYWJsZWRcbiAgICovXG4gIGdldEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmdldERpc2FibGVkKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29Db2x1bW5ObyBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgQ29sdW1uIG51bWJlclxuICAgKi9cbiAgZ2V0U29Db2x1bW5ObygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvQ29sdW1uTm9cIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgcmVmIHN0cmluZyB2YWx1ZSBmcm9tIFtbZWRpdG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgUmVmIG9mIGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0RWRpdG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbHVlIG9mIHNvUmVxdWlyZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29SZXF1aXJlIHZhbHVlXG4gICAqL1xuICBnZXRTb1JlcXVpcmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzb1JlcXVpcmVcIik7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2Ygc29WYWxpZGF0ZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29WYWxpZGF0ZSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29WYWxpZGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvVmFsaWRhdGVcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29UeXBlIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb1R5cGUgdmFsdWVcbiAgICovXG4gIGdldFNvVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvVHlwZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb0Zvcm1hdCBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29Gb3JtYXQgdmFsdWVcbiAgICovXG4gIGdldFNvRm9ybWF0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29Gb3JtYXRcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29NaW4gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHNvTWluIHZhbHVlXG4gICAqL1xuICBnZXRTb01pbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvTWluXCIpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFZhbHVlIG9mIHNvTWF4IGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb01heCB2YWx1ZVxuICAgKi9cbiAgZ2V0U29NYXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzb01heFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb01heExlbmd0aCBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29NYXhMZW5ndGggdmFsdWVcbiAgICovXG4gIGdldFNvTWF4TGVuZ3RoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29NYXhMZW5ndGhcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29QYXR0ZXJuIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb1BhdHRlcm4gdmFsdWVcbiAgICovXG4gIGdldFNvUGF0dGVybigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvUGF0dGVyblwiKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb01heEJ5dGVMZW4gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHNvTWF4Qnl0ZUxlbiB2YWx1ZVxuICAgKi9cbiAgZ2V0U29NYXhCeXRlTGVuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29NYXhCeXRlTGVuXCIpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdG8gb3Bwb3NpdGUgb2YgaW5wdXRcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBvZiBlbmFibGVkXG4gICAqL1xuICBzZXRFbmFibGVkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgYm9vID09PSAnc3RyaW5nJykge1xuICAgICAgYm9vID0gYm9vID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuc2V0RGlzYWJsZWQoIWJvbyk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHZhbHVlIG9mIFtbc29ydF1dIHByb3BlcnR5XG4gICAqIEBwYXJhbSB2YWx1ZSBTb3J0IHZhbHVlIHRvIHNldFxuICAgKi9cbiAgc2V0U29ydFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvcnQgPSB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBbW3Zpc2libGVdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWaXNibGUgcHJvcGVydHkgdmFsdWVcbiAgICovXG4gIGdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIHZhbHVlIG9mIHRleHQgYXR0cmlidXRlIGFuZCBtYXJrcyBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlIFRleHQgdG8gc2V0LiBJZiBpdCdzIGEgbnVsbCB2YWx1ZSwgaXQgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYW4gZW1wdHkgc3RyaW5nXG4gICAqIElmIGl0J3MgYSBudW1iZXIgb3Igbm9uLXN0cmluZywgaXQgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgKi9cbiAgc2V0VGV4dCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudGV4dCA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgdGhpcy50ZXh0ID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGV4dCA9IHZhbHVlICsgJyc7XG4gICAgfVxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBbW29uQ29tbWFuZF1dXG4gICAqIEBwYXJhbSBmbiBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGZvciBbW29uQ29tbWFuZF1dIGV2ZW50XG4gICAqL1xuICBzZXRPbkNvbW1hbmQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCA9IGZuO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgW1tvbkFjdGl2ZUxvc3RdXVxuICAgKiBAcGFyYW0gZm4gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBmb3IgW1tvbkFjdGl2ZUxvc3RdXSBldmVudFxuICAgKi9cbiAgc2V0T25BY3RpdmVMb3N0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5faW50ZXJuYWxPbkFjdGl2ZUxvc3QgPSBmbjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgYWxsIGF0dHJpYnV0ZXMgaW4gb25lIGdvXG4gICAqXG4gICAqIEBwYXJhbSBhdHRyc1xuICAgKiBAcGFyYW0gc2tpcEF0dHJpYnV0ZU92ZXJyaWRlIFNldCB0byAndHJ1ZScgaWYgeW91IGRvIG5vdCB3YW50IGN1c3RvbSBhdHRyaWJ1dGUgdG8gb3ZlcnJpZGUgZXhpc2l0aW5nIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGVzKGF0dHJzOiBBcnJheTxBdHRyaWJ1dGVOYW1lVmFsdWU+LCBza2lwQXR0cmlidXRlT3ZlcnJpZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuX3RlbXBGcmVlemVDZCA9IHRydWU7XG5cbiAgICBmb3IgKGNvbnN0IGF0dHIgb2YgYXR0cnMpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHIuYXR0cmlidXRlTmFtZSwgYXR0ci52YWx1ZSwgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlKTtcbiAgICB9XG5cbiAgICB0aGlzLl90ZW1wRnJlZXplQ2QgPSBmYWxzZTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBIVE1MIGF0dHJpYnV0ZSB2YWx1ZSBvbiBjb21wb25lbnRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBIVE1MIGF0dHJpYnV0ZSB0byBzZXRcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIG9mIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gc2tpcEF0dHJpYnV0ZU92ZXJyaWRlIFNldCB0byAndHJ1ZScgaWYgeW91IGRvIG5vdCB3YW50IGN1c3RvbSBhdHRyaWJ1dGUgdG8gb3ZlcnJpZGUgZXhpc2l0aW5nIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZywgdmFsdWU6IGFueSwgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsQXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZTtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoYXR0cmlidXRlID09PSBcImlkXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uSUQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVklTSUJMRSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiY2xhc3NcIikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DTEFTUywgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09ICdlbmFibGVkJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5FTkFCTEVELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5ESVNBQkxFRCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09ICd0ZXh0Jykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5URVhULCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gJ2NvbG9yJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DT0xPUiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwidGl0bGVcIikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5USVRMRSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicmVxdWlyZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcImZvbnRCb2xkXCIgfHwgYXR0cmlidXRlID09PSBcImZvbnRib2xkXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uRk9OVF9CT0xELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJiZ2NvbG9yXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQkdfQ09MT1IsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVkFMVUUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIm1heGxlbmd0aFwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJtYXhfbGVuZ3RoXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicmVxdWlyZVwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJyZXF1aXJlZFwiKSB7XG4gICAgICAgIHRoaXMuc2V0UmVxdWlyZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJ3aWR0aFwiKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbFdpZHRoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcImhlaWdodFwiKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbEhlaWdodCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJmb250U2l6ZVwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJmb250c2l6ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0Rm9udFNpemUodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwib25jb21tYW5kXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPbkNvbW1hbmQodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwib25hY3RpdmVsb3N0XCIpIHtcbiAgICAgICAgdGhpcy5zZXRPbkFjdGl2ZUxvc3QodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicGF0dGVyblwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlBBVFRFUk4sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIm1heFwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLk1BWCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwibWluXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUlOLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKEphdmFVdGlscy5pc051bWJlcihvcmlnaW5hbEF0dHJpYnV0ZU5hbWUpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKF8ucGFyc2VJbnQob3JpZ2luYWxBdHRyaWJ1dGVOYW1lKSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDdXN0b21BdHRyaWJ1dGUob3JpZ2luYWxBdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIC8vIExvZ2dlci53YXJuKGBVbmtub3duIGF0dHJpYnV0ZTogJHthdHRyaWJ1dGV9LCBzZXR0aW5nIGFzIGN1c3RvbSBhdHRyaWJ1dGVgKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlID09PSBcInZhbGlkYXRlXCIgJiYgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgICBpZiAobmV3QXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBjbGFzcyDjgavplqLjgZfjgabjga/jgIHml6LlrZjjga7mjIflrprjgajjg57jg7zjgrhcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgbmV3QXR0cmlidXRlcyA9IF8uZmlsdGVyKG5ld0F0dHJpYnV0ZXMsIChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIuYXR0cmlidXRlTmFtZSAhPT0gQXR0cmlidXRlc0VudW0uQ0xBU1MpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBBdHRyaWJ1dGVzRW51bS5DTEFTUyxcbiAgICAgICAgICAgICAgdmFsdWU6ICh0aGlzLl9jc3NDbGFzcyArIFwiIFwiICsgbmV3Q3NzQ2xhc3MpLnRyaW0oKSxcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKG5ld0F0dHJpYnV0ZXMsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmVTZXRBdHRyaWJ1dGVFdmVudChvcmlnaW5hbEF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ0xBU1MgJiYgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiB0eXBlb2YgQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld0F0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICAgIC8vIGNsYXNzIOOBq+mWouOBl+OBpuOBr+OAgeaXouWtmOOBruaMh+WumuOBqOODnuODvOOCuFxuICAgICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIG5ld0F0dHJpYnV0ZXMgPSBfLmZpbHRlcihuZXdBdHRyaWJ1dGVzLCAoYXR0cjogQXR0cmlidXRlTmFtZVZhbHVlKSA9PiBhdHRyLmF0dHJpYnV0ZU5hbWUgIT09IEF0dHJpYnV0ZXNFbnVtLkNMQVNTKTtcbiAgICAgICAgICBcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogQXR0cmlidXRlc0VudW0uQ0xBU1MsXG4gICAgICAgICAgICB2YWx1ZTogKHRoaXMuX2Nzc0NsYXNzICsgXCIgXCIgKyBuZXdDc3NDbGFzcykudHJpbSgpLFxuICAgICAgICAgIH0pO1xuICBcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMobmV3QXR0cmlidXRlcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uSUQpIHtcbiAgICAgICAgdGhpcy5zZXRJZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShKYXZhVXRpbHMucGFyc2VCb29sZWFuKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykge1xuICAgICAgICB0aGlzLnNldENzc0NsYXNzKHZhbHVlLCBza2lwQXR0cmlidXRlT3ZlcnJpZGUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgdGhpcy5zZXREaXNhYmxlZChKYXZhVXRpbHMucGFyc2VCb29sZWFuKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5FTkFCTEVEKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgdGhpcy5zZXREaXNhYmxlZCghSmF2YVV0aWxzLnBhcnNlQm9vbGVhbih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVEVYVCkge1xuICAgICAgICB0aGlzLnNldFRleHQodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkNPTE9SKSB7XG4gICAgICAgIHRoaXMuc2V0Q29sb3IodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkZPTlRfQk9MRCkge1xuICAgICAgICB0aGlzLnNldEZvbnRCb2xkKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5PTl9DT01NQU5EKSB7XG4gICAgICAgIHRoaXMuc2V0T25Db21tYW5kKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5SRVFVSVJFKSB7XG4gICAgICAgIHRoaXMuc2V0UmVxdWlyZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVElUTEUpIHtcbiAgICAgICAgdGhpcy5zZXRUaXRsZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uU0VMRUNURUQpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQkdfQ09MT1IpIHtcbiAgICAgICAgdGhpcy5zZXRCZ0NvbG9yKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5WQUxVRSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVhfTEVOR1RIKSB7XG4gICAgICAgIHRoaXMuc2V0TWF4TGVuZ3RoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVgpIHtcbiAgICAgICAgdGhpcy5zZXRNYXgodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk1JTikge1xuICAgICAgICB0aGlzLnNldE1pbih2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgICB0aGlzLnNldFBhdHRlcm4odmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBzZXQgYXR0cmlidXRlLCB1bmtub3duIGF0dHJpYnV0ZSBpZDogJyArIGF0dHJpYnV0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBIVE1MIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlIE5hbWUgb2YgSFRNTCBhdHRyaWJ1dGUgdG8gZ2V0XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIGF0dHJpYnV0ZVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nIHwgQXR0cmlidXRlc0VudW0sIHNraXBRdWVyeURPTUlmTm90RXhpc3RzOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgYXR0cmlidXRlTG93ZXIgPSBhdHRyaWJ1dGUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFZpc2libGUoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVuYWJsZWQoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAndGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2NvbG9yJykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xvcigpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3JlcXVpcmUnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlcXVpcmVkKCkgKyAnJztcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09IFwidmFsdWVcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoZWNrZWQoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJpZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElkKCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSBcInBhdHRlcm5cIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXR0ZXJuKCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSBcIm1pblwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbigpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJtYXhcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXgoKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09IFwibWF4X2xlbmd0aFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1heExlbmd0aCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgIT0gbnVsbCAmJiB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiaXNMb2NrZWRDb2x1bW5cIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNraXBRdWVyeURPTUlmTm90RXhpc3RzICE9PSB0cnVlKSB7XG4gICAgICAgIExvZ2dlci53YXJuKGBBdHRyaWJ1dGUgJHthdHRyaWJ1dGV9IGRvZXMgbm90IGV4aXN0cywgdHJ5aW5nIHRvIGdldCBmcm9tIERPTWApO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VmlzaWJsZSgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkVOQUJMRUQpIHtcbiAgICAgIHJldHVybiAhdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlRFWFQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRleHQoKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ09MT1IpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbG9yKCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlcXVpcmVkKCkgKyAnJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVkFMVUUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVEKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKCkgKyAnJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NSU4pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1pbigpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1heCgpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVhfTEVOR1RIKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNYXhMZW5ndGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGdldCBhdHRyaWJ1dGUsIHVua25vd24gYXR0cmlidXRlIGlkOiAnICsgYXR0cmlidXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHJlcXVlc3RGb2N1cygpIHtcbiAgICBpZiAodGhpcy5nZXRFbGVtZW50KCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudCBhbmQgbWFyayBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudFJlZiAhPSBudWxsKSB7XG4gICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIGZvY3VzIGlzIGxvc3QuIEludm9rZXMgb25BY3RpdmVMb3N0IGV2ZW50IGhhbmRsZXJcbiAgICogQGV2ZW50IFtbT25BY3RpdmVMb3N0XV1cbiAgICovXG4gIGZvY3VzTG9zdCgpIHtcbiAgICB0aGlzLm9uQWN0aXZlTG9zdC5lbWl0KCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25BY3RpdmVMb3N0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbE9uQWN0aXZlTG9zdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ3JlYXRlcyBhIHVuaXF1ZSBpZCB1c2luZyBhbiBvcHRpb25hbCBwcmVmaXhcbiAgICogQHBhcmFtIHByZWZpeCBTdHJpbmcgdG8gYXBwZW5kIHRvIGJlZ2lubmluZyBvZiBJRFxuICAgKiBAcmV0dXJucyBVbmlxdWUgSURcbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZVVuaXF1ZUlkKHByZWZpeDogc3RyaW5nID0gJ2Jhc2UnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcHJlZml4ICsgRGF0ZS5ub3coKSArICdfJyArIF8ucmFuZG9tKDEsIDEwMDApICsgXy5yYW5kb20oMSwgMTAwKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBBZGRzIGNoaWxkIGNvbXBvbmVudCB0byB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gY2hpbGQgQ29tcG9uZW50IHRvIGFkZCBhcyBjaGlsZFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZENoaWxkKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgaWYgKGNoaWxkLmlkICE9PSB0aGlzLmlkKSB7XG4gICAgICBjb25zdCBjaGlsZEtleSA9IEtleVV0aWxzLnRvTWFwS2V5KGNoaWxkLmlkKTtcblxuICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gbmV3IE1hcDxzdHJpbmcsIEJhc2VDb21wb25lbnQ+KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuSW5kZXggPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGlsZHJlbi5zZXQoY2hpbGRLZXksIGNoaWxkKTtcbiAgICAgIHRoaXMuX2NoaWxkcmVuSW5kZXgucHVzaChjaGlsZC5pZCk7XG5cbiAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgVmlld0NvbXBvbmVudCwgaWYgc28sIHJlZ2lzdGVyIG91cnNlbGYgc28gdGhhdFxuICAgICAgLy9pdCBjYW4gYmUgbG9jYXRlZCBmYXN0ZXJcbiAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCAmJiAoY2hpbGQuaXNGYXV4RWxlbWVudCgpIHx8IGNoaWxkLmlzRGlhbG9nKCkgIT09IHRydWUpKSB7XG4gICAgICAgIGlmIChwYXJlbnRWaWV3Ll92aWV3Q2hpbGRyZW5NYXAgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmVudFZpZXcuX3ZpZXdDaGlsZHJlbk1hcCA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLnNldChjaGlsZEtleSwgY2hpbGQpO1xuXG4gICAgICAgIC8vdHJhY2sgU2Nyb2xsUGFuZSBmb3Igc2Nyb2xsIGFkanVzdG1lbnRcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZC5pc1Njcm9sbFBhbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBjaGlsZC5pc1Njcm9sbFBhbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmVudFZpZXcucmVnaXN0ZXJTY3JvbGxQYW5lKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hdGl2ZSBlbGVtZW50IG9mIHRoZSBjb21wb25lbnQgaWYgYSByZWZlcmVuY2UgdG8gaXQgaXMgZGVmaW5lZFxuICAgKiBAcmV0dXJucyBUaGUgSFRNTCBuYXRpdmUgZWxlbWVudCBvciAnbnVsbCcgaWYgcmVmZXJlbmNlIGlzIG1pc3NpbmdcbiAgICovXG4gIGdldEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYgPyB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSB0ZXh0IHByb3BlcnR5IHZhbHVlXG4gICAqIEByZXR1cm5zIFRleHQgdmFsdWVcbiAgICovXG4gIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBDU1MgY29sb3Igc3R5bGUgYXR0cmlidXRlIGFuZCBtYXJrcyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gY29sb3IgQ1NTIGNvbG9yIHN0cmluZyB2YWx1ZS4gU2hvdWxkIGJlIGhleGFkZWNpbWFsIG9yIHZhbGlkIENTUyBjb2xvciBzdHJpbmdcbiAgICovXG4gIHNldENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICBpZiAoY29sb3IgPT0gbnVsbCB8fCBjb2xvciA9PT0gXCJcIikge1xuICAgICAgZGVsZXRlIHRoaXMuc3R5bGVzWydjb2xvciddO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlc1snY29sb3InXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvciBzdHlsZSBhdHRyaWJ1dGUgdmFsdWVcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nLiBIZXhhZGVjaW1hbCBvciBDU1MgY29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0eWxlc1snY29sb3InXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYmFja2dyb3VuZCBjb2xvciBDU1Mgc3R5bGUgYXR0cmlidXRlIHZhbHVlXG4gICAqIEBwYXJhbSBiZ0NvbG9yIENvbG9yIHN0cmluZyB2YWx1ZSB0byBzZXQuIFNob3VsZCBiZSBoZXhhZGVjaW1hbCBvciB2YWxpZCBDU1MgY29sb3Igc3RyaW5nLlxuICAgKi9cbiAgc2V0QmdDb2xvcihiZ0NvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgIHRoaXMuc3R5bGVzW1wiYmFja2dyb3VuZFwiXSA9IGJnQ29sb3I7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIGZvbnQtd2VpZ2h0IHN0eWxlIHByb3BlcnR5IHRvIGJvbGRcbiAgICogQHBhcmFtIGJvbyBTd2l0Y2ggZm9yIHR1cm5pbmcgYm9sZCBzdHlsZSBvbi9vZmZcbiAgICovXG4gIHNldEZvbnRCb2xkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuZm9udEJvbGQgPSBib287XG5cbiAgICBpZiAoYm9vID09PSB0cnVlIHx8IGJvbyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl0gPSBcImJvbGRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl07XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIENTUyBzdHlsZSBhdHRyaWJ1dGUgZm9udC1zdHlsZSB0byBpdGFsaWNcbiAgICogQHBhcmFtIGJvbyBTd2l0Y2ggZm9yIHR1cm5pbmcgaXRhbGljIHN0eWxlIG9uL29mZlxuICAgKi9cbiAgc2V0Rm9udEl0YWxpYyhib286IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLmZvbnRJdGFsaWMgPSBib287XG5cbiAgICBpZiAoYm9vID09PSB0cnVlIHx8IGJvbyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnN0eWxlc1tcImZvbnQtc3R5bGVcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQ1NTIHN0eWxlIGF0dHJpYnV0ZSBmb250LXNpemVcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIHBpeGVscyBmb3IgZm9udC1zaXplXG4gICAqL1xuICBzZXRGb250U2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmZvbnRTaXplID0gc2l6ZTtcblxuICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zaXplXCJdID0gc2l6ZSArIFwicHhcIjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBBZGQvcmVtb3ZlIENTUyBzdHlsZSBhdHRyaWJ1dGUgdGV4dC1kZWNvcmF0aW9uIHRvIHVuZGVybGluZVxuICAgKiBAcGFyYW0gdW5kZXJsaW5lIFN3aXRjaCBmb3IgdHVybmluZyB1bmRlcmxpbmUgc3R5bGUgb24vb2ZmIGZvciB0ZXh0XG4gICAqL1xuICBzZXRGb250VW5kZXJsaW5lKHVuZGVybGluZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuZm9udFVuZGVybGluZSA9IHVuZGVybGluZTtcblxuICAgIGlmICh0aGlzLmZvbnRVbmRlcmxpbmUgPT09IFwidHJ1ZVwiIHx8IHRoaXMuZm9udFVuZGVybGluZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zdHlsZXNbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcInVuZGVybGluZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5zdHlsZXNbXCJ0ZXh0LWRlY29yYXRpb25cIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdGhhdCByZWdpc3RlcnMgZm9jdXMgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBoYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMucmVnaXN0ZXJDbGllbnRFdmVudChldmVudCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciB0aGF0IHJlZ2lzdGVycyBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgcmVnaXN0ZXJzIGtleWRvd24gZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgcmVnaXN0ZXJzIGtleXVwIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLnJlZ2lzdGVyQ2xpZW50RXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdGhhdCByZWdpc3RlcnMgbW91c2Vkb3duIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXRzIGN1c3RvbSBhdHRyaWJ1dGUgYnkgbmFtZSBpZiBpdCBleGlzdHNcbiAgICogQHBhcmFtIGF0dHJpYnV0ZU5hbWUgTmFtZSBvZiBjdXN0b20gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIEN1c3RvbSBhdHRyaWJ1dGUgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdW5kZWZpbmVkXG4gICAqL1xuICBnZXRDdXN0b21BdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAodGhpcy5jdXN0b21BdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgYXR0cmlidXRlIG9uIGN1c3RvbUF0dHJpYnV0ZSBvYmplY3QgdXNpbmcgbmFtZSBhcyBrZXlcbiAgICogQHBhcmFtIG5hbWUga2V5IG5hbWUgb2YgYXR0cmlidXRlXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBzZXQgZm9yIGtleS9uYW1lXG4gICAqL1xuICBzZXRDdXN0b21BdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tQXR0cmlidXRlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWUgKyAnJztcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ2hlY2sgaWYgY3VzdG9tIGF0dHJpYnV0ZSBleGlzdHNcbiAgICogQHBhcmFtIGlkIEtleSBuYW1lIG9mIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGN1c3RvbSBhdHRyaWJ1dGUgd2l0aCBuYW1lL2tleSBleGlzdHNcbiAgICovXG4gIGhhc0N1c3RvbUF0dHJpYnV0ZShpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsICYmIHRoaXMuY3VzdG9tQXR0cmlidXRlc1tpZF0gIT0gbnVsbDtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgY29tcG9uZW50IGJ5IGluZGV4XG4gICAqIEBwYXJhbSBpZHggSW5kZXggb2YgY2hpbGQgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIENoaWxkIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqL1xuICBnZXRDaGlsZEF0KGlkeDogbnVtYmVyKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4Lmxlbmd0aCA+IGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGlsZCh0aGlzLl9jaGlsZHJlbkluZGV4W2lkeF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHJldHVybnMgTnVtYmVyIG9mIGNoaWxkcmVuXG4gICAqL1xuICBnZXRDaGlsZENvdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbmRleCBvZiBjaGlsZCBjb21wb25lbnQgaWYgaXQgZXhpc3RzXG4gICAqIEBwYXJhbSBjaGlsZCBDaGlsZCBjb21wb25lbnRcbiAgICovXG4gIGluZGV4T2ZDaGlsZChjaGlsZDogYW55KTogbnVtYmVyIHtcbiAgICAvL1RPRE9cbiAgICBjb25zb2xlLmVycm9yKFwiaW5kZXhPZkNoaWxkIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogSW5zZXJ0IGNoaWxkIGNvbXBvbmVudCB0byBjaGlsZHJlbiBhcnJheSBhdCBsb2NhdGlvbiBvZiBpbmRleFxuICAgKiBAcGFyYW0gaWR4IEluZGV4IG9mIGluc2VydCBsb2NhdGlvblxuICAgKiBAcGFyYW0gcm93XG4gICAqL1xuICBpbnNlcnRDaGlsZEF0KGlkeDogbnVtYmVyLCByb3c6IGFueSkge1xuICAgIC8vVE9ET1xuICAgIGNvbnNvbGUuZXJyb3IoXCJpbnNlcnRDaGlsZEF0IGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBUT0RPOiBBZGQgZG9jdW1lbnRhdGlvbiBmb3IgZW1pdEludGVybmFsQ29tbWFuZFxuICAgKi9cbiAgcHJvdGVjdGVkIGVtaXRJbnRlcm5hbE9uQ29tbWFuZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCh0aGlzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25Db21tYW5kID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmludm9rZU1jb0FjdGlvbih0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBldmVudCBoYW5kbGVyIGZvciBjbGllbnQgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IHRvIHJlZ2lzdGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJDbGllbnRFdmVudChldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgdGFnIG5hbWVcbiAgICogQHJldHVybnMgTmFtZSBvZiBIVE1MIGVsZW1lbnQgdGFnXG4gICAqL1xuICBnZXRUYWdOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAhPSBudWxsID8gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb21wb25lbnQgdGFnIG5hbWUgd2l0aG91dCB2aXZpZnkgY29yZSBwcmVmaXggKGkuZS4gXCJ2dC1cIilcbiAgICogQHJldHVybnMgVGFnIG5hbWVcbiAgICovXG4gIGdldExvY2FsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldFRhZ05hbWUoKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJ2dC1cIiwgXCJcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSBwYXJlbnQgY29tcG9uZW50IGlmIGl0IGV4aXN0c1xuICAgKiBAcmV0dXJucyBDb21wb25lbnQgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBwYXJlbnRcbiAgICovXG4gIGdldFBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIHByb3BlcnR5IGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHJldHVybiAnbnVsbCdcbiAgICogQHJldHVybnMgVmFsdWUgb3IgJ251bGwnXG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICBpZiAodGhpc1tcInZhbHVlXCJdKSB7XG4gICAgICByZXR1cm4gdGhpc1tcInZhbHVlXCJdO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFJlbW92ZXMgYXR0cmlidXRlIG5hbWUgbmFtZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlIEF0dHJpYnV0ZSB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZyB8IEF0dHJpYnV0ZXNFbnVtKSB7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVMb3dlciA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVklTSUJMRSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZW5hYmxlZCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uRU5BQkxFRCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICd0ZXh0Jykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5URVhUKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICdjb2xvcicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQ09MT1IpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3BhdHRlcm4nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlBBVFRFUk4pO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ21heCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICdtYXhsZW5ndGgnIHx8IGF0dHJpYnV0ZUxvd2VyID09PSAnbWF4X2xlbmd0aCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnbWluJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5NSU4pO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnb25jb21tYW5kJyB8fCBhdHRyaWJ1dGVMb3dlciA9PT0gJ29uX2NvbW1hbmQnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLk9OX0NPTU1BTkQpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3JlcXVpcmUnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3RpdGxlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5USVRMRSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZm9udGJvbGQnIHx8IGF0dHJpYnV0ZUxvd2VyID09PSAnZm9udF9ib2xkJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5GT05UX0JPTEQpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5TRUxFQ1RFRCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnYmdDb2xvcicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQkdfQ09MT1IpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3ZhbHVlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5WQUxVRSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgTG9nZ2VyLndhcm4oYFVua25vd24gYXR0cmlidXRlOiAke2F0dHJpYnV0ZX0sIHNldHRpbmcgYXMgY3VzdG9tIGF0dHJpYnV0ZWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmVSZW5vdmVBdHRyaWJ1dGVFdmVudChhdHRyaWJ1dGUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5WSVNJQkxFKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUodHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICB0aGlzLnNldERpc2FibGVkKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uRU5BQkxFRCkge1xuICAgICAgdGhpcy5zZXRFbmFibGVkKHRydWUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5URVhUKSB7XG4gICAgICBkZWxldGUgdGhpcy50ZXh0O1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ09MT1IpIHtcbiAgICAgIHRoaXMuc2V0Q29sb3IoXCJcIik7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk9OX0NPTU1BTkQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZDtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgdGhpcy5zZXRQYXR0ZXJuKHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk1BWCkge1xuICAgICAgdGhpcy5zZXRNYXgodW5kZWZpbmVkKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCkge1xuICAgICAgdGhpcy5zZXRNYXhMZW5ndGgodW5kZWZpbmVkKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uTUlOKSB7XG4gICAgICB0aGlzLnNldE1pbih1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMb2dnZXIud2FybignVW5hYmxlIHRvIHNldCBhdHRyaWJ1dGUsIHVua25vd24gYXR0cmlidXRlIGlkOiAnICsgYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2YgW1tzZXRSZXF1aXJlZF1dXG4gICAqIEBwYXJhbSBib29cbiAgICovXG4gIHNldFJlcXVpcmUoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRSZXF1aXJlZChib28pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW3JlcXVpcmVkXV0gdG8gdHJ1ZSBvciBmYWxzZVxuICAgKiBAcGFyYW0gYm9vXG4gICAqL1xuICBzZXRSZXF1aXJlZChib286IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICBpZiAoYm9vID09PSAndHJ1ZScgfHwgYm9vID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbcGF0dGVybl1dIHZhbHVlXG4gICAqIEBwYXJhbSBwYXR0ZXJuXG4gICAqL1xuICBzZXRQYXR0ZXJuKHBhdHRlcm46IHN0cmluZykge1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm47XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1ttaW5dXSB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsXG4gICAqL1xuICBzZXRNaW4odmFsOiBhbnkpIHtcbiAgICB0aGlzLm1pbiA9IHZhbDtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW21heF1dIHZhbHVlXG4gICAqIEBwYXJhbSB2YWxcbiAgICovXG4gIHNldE1heCh2YWw6IGFueSkge1xuICAgIHRoaXMubWF4ID0gdmFsO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbcGF0dGVybl1dIHZhbHVlXG4gICAqIEByZXR1cm5zIFtbcGF0dGVybl1dXG4gICAqL1xuICBnZXRQYXR0ZXJuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1ttaW5dXSB2YWx1ZVxuICAgKiBAcmV0dXJucyBbW21pbl1dXG4gICAqL1xuICBnZXRNaW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5taW47XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbbWF4XV0gdmFsdWVcbiAgICogQHJldHVybnMgW1ttYXhdXVxuICAgKi9cbiAgZ2V0TWF4KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lucHV0TG9jYWxlXV0gdmFsdWVcbiAgICogQHJldHVybnMgW1tpbnB1dExvY2FsZV1dXG4gICAqL1xuICBnZXRJbnB1dExvY2FsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlucHV0TG9jYWxlO1xuICB9XG5cbiAgLyoqIFNldCBbW2lucHV0TG9jYWxlXV0gdmFsdWVcbiAgICogQHBhcmFtIGxvY2FsZVxuICAgKi9cbiAgc2V0SW5wdXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0TG9jYWxlID0gbG9jYWxlO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbaW5wdXRDaGFyc2V0c11dIHZhbHVlXG4gICAqIEByZXR1cm5zIFtbaW5wdXRDaGFyc2V0c11dXG4gICAqL1xuICBnZXRJbnB1dENoYXJzZXRzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRDaGFyc2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tpbnB1dENoYXJlc3RzXV0gdmFsdWVcbiAgICogQHBhcmFtIGlucHV0Q2hhclNldHNcbiAgICovXG4gIHNldElucHV0Q2hhcnNldHMoaW5wdXRDaGFyU2V0czogc3RyaW5nKSB7XG4gICAgdGhpcy5pbnB1dENoYXJzZXRzID0gaW5wdXRDaGFyU2V0cztcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lkXV0gdmFsdWVcbiAgICogQHJldHVybnMgW1tpZF1dXG4gICAqL1xuICBnZXRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW2lkXV0gdmFsdWVcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBzZXRJZChpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwgJiYgdGhpcy5wYXJlbnQuY2hpbGRyZW4uaGFzKHRoaXMuaWQpKSB7XG4gICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5kZWxldGUoS2V5VXRpbHMudG9NYXBLZXkodGhpcy5pZCkpO1xuICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc2V0KEtleVV0aWxzLnRvTWFwS2V5KGlkKSwgdGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IF8uZmluZEluZGV4KHRoaXMucGFyZW50Ll9jaGlsZHJlbkluZGV4LCAoaXRlbSkgPT4gaXRlbSA9PT0gdGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXhbaWR4XSA9IGlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFyZW50Ll9jaGlsZHJlbkluZGV4LnB1c2goaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXggPSBfLnVuaXEodGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdCBtZXRob2QuIEltcGxlbWVudGVkIGJ5IHN1YiBjbGFzcyBjb21wb25lbnRzXG4gICAqIEBwYXJhbSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgIC8vaW1wbC4gYnkgc3ViIGNsYXNzXG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbY3NzQ2xhc3NdXSBvZiBjb21wb25lbnQuXG4gICAqIEBwYXJhbSBjc3MgQ2xhc3MgKENTUykgbmFtZSB0byBzZXQgb24gY29tcG9uZW50LiBGb3IgbXVsdGlwbGUgQ1NTIGNsYXNzZXMsIGpvaW4gd2l0aCBET1QgKC4pXG4gICAqIGBgYFxuICAgKiAuY2xhc3MxLmNsYXNzMi5jbGFzczNcbiAgICogYGBgXG4gICAqL1xuICBzZXRDc3NDbGFzcyhjc3M6IHN0cmluZywgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoY3NzICE9IG51bGwgJiYgY3NzLmluZGV4T2YoXCIuXCIpID49IDApIHtcbiAgICAgIGNvbnN0IHRlbXAgPSBjc3Muc3BsaXQoXCJcXC5cIik7XG5cbiAgICAgIHRoaXMuY3NzQ2xhc3MgPSB0ZW1wLmpvaW4oXCItXCIpO1xuXG4gICAgICBpZiAodGVtcFswXSA9PT0gXCJcIikge1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gdGhpcy5jc3NDbGFzcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jc3NDbGFzcyA9IGNzcztcbiAgICB0aGlzLmNoZWNrTnhTdHlsaW5nKHNraXBBdHRyaWJ1dGVPdmVycmlkZSk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY3NzIGNsYXNzIG5hbWUgdG8gdGhlIGludGVybmFsIFtbX2Nzc0NsYXNzXV0gcHJvcGVydHlcbiAgICogQHBhcmFtIGNzcyBDU1MgY2xhc3MgbmFtZSB0byBhZGRcbiAgICovXG4gIGFkZENzc0NsYXNzKGNzczogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2Nzc0NsYXNzID09IG51bGwgfHwgdGhpcy5fY3NzQ2xhc3MgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMuX2Nzc0NsYXNzID0gY3NzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3NzQ2xhc3MuaW5kZXhPZihjc3MpID09IC0xKSB7XG4gICAgICB0aGlzLl9jc3NDbGFzcyA9IGAke3RoaXMuX2Nzc0NsYXNzfSAke2Nzc31gO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrTnhTdHlsaW5nKCk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNzcyBjbGFzcyBuYW1lIGZyb20gaW50ZXJuYWwgW1tfY3NzQ2xhc3NdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gY3NzIENTUyBjbGFzcyBuYW1lIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQ3NzQ2xhc3MoY3NzOiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl9jc3NDbGFzcyAhPSBudWxsKVxuICAgICAgdGhpcy5fY3NzQ2xhc3MgPSB0aGlzLl9jc3NDbGFzcy5yZXBsYWNlKGNzcywgJycpO1xuICAgIHRoaXMuY2hlY2tOeFN0eWxpbmcoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1tyZXF1aXJlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tyZXF1aXJlXV1cbiAgICovXG4gIGdldFJlcXVpcmVkKCk6IHN0cmluZyB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVpcmU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSBjb21wb25lbnQgYW5kIGludm9rZXMgQW5ndWxhcnMgW1tuZ09uRGVzdHJveV1dIG1ldGhvZFxuICAgKi9cbiAgZGVzdHJveUNvbXBvbmVudCgpIHtcbiAgICBpZiAodGhpcy5jb21wUmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcFJlZi5kZXN0cm95KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnRSZWYgIT0gbnVsbCkge1xuICAgICAgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIExvZ2dlci53YXJuKFwiTWVtb3J5IGxlYWshIFBsZWFzZSB1c2UgbmdJZiBpZiB5b3Ugd2FudCB0byByZW1vdmUgY29tcG9uZW50IVwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMgSlNPTiBvYmplY3RcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QgcmV0VmFsOiBhbnkgPSB7fTtcblxuICAgIC8vZ2V0IGN1c3RvbSBhdHRyaWJ1dGVzIGJpbmRlZCB0byBvdXIgdGFnXG4gICAgaWYgKHRoaXMuZWxlbWVudFJlZiAhPSBudWxsICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBsZXQgYXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IG51bGw7XG5cbiAgICAgIGlmICh0eXBlb2YgZWwuZ2V0QXR0cmlidXRlTmFtZXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhdHRyaWJ1dGVzID0gZWwuZ2V0QXR0cmlidXRlTmFtZXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXR0cmlidXRlcy5wdXNoKGVsLmF0dHJpYnV0ZXNbaV0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICBfLmZvckVhY2goYXR0cmlidXRlcywgKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIEFwcFV0aWxzLnZhbGlkYXRlQXR0cmlidXRlID09PSBcImZ1bmN0aW9uXCIgJiYgQXBwVXRpbHMudmFsaWRhdGVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIGF0dHJpYnV0ZU5hbWUsIGVsLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEFwcFV0aWxzLnNldEN1c3RvbUF0dHJpYnV0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIEFwcFV0aWxzLnNldEN1c3RvbUF0dHJpYnV0ZShyZXRWYWwsIGVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcIm54VGFnTmFtZVwiLCB0aGlzLmdldE54VGFnTmFtZSgpKTtcbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcInRhZ05hbWVcIiwgdGhpcy5nZXRUYWdOYW1lKCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiaWRcIiwgdGhpcy5pZCk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJkaXNhYmxlZFwiLCB0aGlzLmdldERpc2FibGVkKCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiZW5hYmxlZFwiLCB0aGlzLmdldEVuYWJsZWQoKSk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJ2aXNpYmxlXCIsIHRoaXMuZ2V0VmlzaWJsZSgpKTtcbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcInRleHRcIiwgdGhpcy5nZXRUZXh0KCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiY3NzQ2xhc3NcIiwgdGhpcy5jc3NDbGFzcyk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJjdXN0b21BdHRyaWJ1dGVzXCIsIHRoaXMuY3VzdG9tQXR0cmlidXRlc1RvSnNvbigpKTtcblxuICAgIGlmICh0aGlzLmdldFZhbHVlKCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJ2YWx1ZVwiLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLnNpemUgPiAwKSB7XG4gICAgICAgIC8vbmVlZCB0byByZXR1cm4gY2hpbGRyZW4gaW4gcHJvcGVyIG9yZGVyXG4gICAgICAgIHJldFZhbFtcImNoaWxkcmVuXCJdID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICBmb3IgKGxldCBpZCBvZiB0aGlzLl9jaGlsZHJlbkluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5nZXRDaGlsZChpZCk7XG5cbiAgICAgICAgICAgIC8vZ2V0Q2hpbGQgY2FuIHJldHVybiBudWxsP1xuICAgICAgICAgICAgaWYgKGMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZEpzb24gPSB0aGlzLmNoaWxkVG9Kc29uKGMpO1xuXG4gICAgICAgICAgICAgIGlmIChjaGlsZEpzb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFZhbFtcImNoaWxkcmVuXCJdLnB1c2goY2hpbGRKc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBjaGlsZCB0byBKU09OXG4gICAqIEBwYXJhbSBjaGlsZCBjaGlsZCB0byBiZSBjb252ZXJ0ZWQgdG8gSlNPTlxuICAgKi9cbiAgcHJvdGVjdGVkIGNoaWxkVG9Kc29uKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGNoaWxkLnRvSnNvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBbW2N1c3RvbUF0dHJpYnV0ZXNdXVxuICAgKiBAcmV0dXJucyBKU09OIE9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGN1c3RvbUF0dHJpYnV0ZXNUb0pzb24oKSB7XG4gICAgcmV0dXJuIEJhc2VDb21wb25lbnQubWFwVG9Kc29uKHRoaXMuY3VzdG9tQXR0cmlidXRlcyk7XG4gIH1cblxuICBzdGF0aWMgbWFwVG9Kc29uKG1hcDogeyBbbmFtZTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBjdXN0b21BdHRyaWJ1dGVzID0ge307XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBjb25zdCBrZXlzID0gXy5rZXlzKG1hcCk7XG5cbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG1hcFtrZXldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIgJiYgdmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VzdG9tQXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1c3RvbUF0dHJpYnV0ZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IHN1YiBjbGFzcyBvdGhlcndpc2UgcmV0dXJucyBkZWZhdWx0IHZhbHVlIG9mIFwibm9uZVwiXG4gICAqIEByZXR1cm5zIE54VGFnTmFtZSBhcyBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBnZXROeFRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIFwibm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgSlNPTiB2YWx1ZXMuIE11dGF0ZXMgSlNPTiBvYmplY3QgdGhhdCBpcyBwYXNzZWQgaW5cbiAgICogQHBhcmFtIGpzb24gT2JqZWN0IHRvIGFkZCBrZXkgdG9cbiAgICogQHBhcmFtIGtleSBLZXkgdG8gc2V0XG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBzZXQgZm9yIGtleSBwYXJhbVxuICAgKi9cbiAgcHJvdGVjdGVkIHNldEpzb24oanNvbjogYW55LCBrZXk6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAganNvbltrZXldID0gdGhpcy50b0pzb25WYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZhbHVlIHRvIGEgdmFsaWQgSlNPTiBwcm9wZXJ0eSBzdHJpbmdcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXG4gICAqIEByZXR1cm5zIFZhbHVlIGFzIGEgdmFsaWQgSlNPTiBwcm9wZXJ0eSBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCB0b0pzb25WYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB2YWx1ZSArICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tpZF1dIHByb3BlcnR5IHRvIGEgdW5pcXVlIHN0cmluZyBJRCBnZW5lcmF0ZWQgYnkgW1tfdW5pcXVlSWRdXVxuICAgKi9cbiAgcmVzZXRJZCgpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIG9mIGNoZWNrZWQgcHJvcGVydHkuIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBpbiBzdWIgY2xhc3MgY29tcG9uZW50cyB0aGF0IGhhdmUgY2hlY2tlZCBzdGF0ZVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NoZWNrZWRdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0Q2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViIGNsYXNzIGNvbXBvbmVudHMgdGhhdCBoYXZlIGNoZWNrZWQgc3RhdGVcbiAgICogQHBhcmFtIGJvbyBUb2dnbGUgW1tjaGVja2VkXV0gb24vb2ZmXG4gICAqL1xuICBzZXRDaGVja2VkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIE5PLU9QXG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViIGNsYXNzIGNvbXBvbmVudHMgdGhhdCBoYXZlIHNlbGVjdGVkIHN0YXRlXG4gICAqIEBwYXJhbSBib28gVG9nZ2xlIFtbY2hlY2tlZF1dIG9uL29mZlxuICAgKi9cbiAgc2V0U2VsZWN0ZWQoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gTk8tT1BcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgW1ttYXhMZW5ndGhdXSBwcm9wZXJ0eS4gUmV0dXJucyAtMSBpZiBpdCBpcyBudWxsXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIG1heExlbmd0aCBhcyBpbnRlZ2VyIGlmIGl0J3Mgc2V0LCBvdGhlcndpc2UgcmV0dXJucyBudWxsXG4gICAqL1xuICBnZXRNYXhMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXhMZW5ndGggPT0gbnVsbCA/IC0xIDogSmF2YVV0aWxzLmludFZhbHVlKHRoaXMubWF4TGVuZ3RoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgW1ttaW5MZW5ndGhdXSBwcm9wZXJ0eS4gUmV0dXJucyAtMSBpZiBpdCBpcyBudWxsXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIG1pbkxlbmd0aCBhcyBpbnRlZ2VyIGlmIGl0J3Mgc2V0LCBvdGhlcndpc2UgcmV0dXJucyBudWxsXG4gICAqL1xuICBnZXRNaW5MZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5taW5MZW5ndGggPT0gbnVsbCA/IC0xIDogSmF2YVV0aWxzLmludFZhbHVlKHRoaXMubWluTGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHJldHVybnMgQ2hpbGQgY29tcG9uZW50c1xuICAgKi9cbiAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBuZXcgVmVjdG9yPEJhc2VDb21wb25lbnQ+KCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGlkIG9mIHRoaXMuX2NoaWxkcmVuSW5kZXgpIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuZ2V0Q2hpbGQoaWQpO1xuXG4gICAgICAgIGlmIChjICE9IG51bGwpIHtcbiAgICAgICAgICBjaGlsZHJlbi5hZGQoYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogUmVtb3ZlIGNoaWxkIGNvbXBvbmVudCBmcm9tIGxpc3Qgb2YgY2hpbGRyZW4gYW5kIHJlbW92ZSBjaGlsZHJlbiBvZiBjaGlsZFxuICAgKiBAcGFyYW0gY2hpbGQgQ2hpbGQgY29tcG9uZW50IHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQoY2hpbGQ6IEJhc2VDb21wb25lbnQpIHtcbiAgICAvL2lmIHNvbWVob3cgc2VuZCBpdCBhcyBzdHJpbmcgKHZpYSB0eXBlIGFueSlcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjaGlsZCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoY2hpbGQpIGFzIEJhc2VDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgIC8vZmlyc3QgaGlkZSBpdFxuICAgICAgaWYgKGNoaWxkLnNldFZpc2libGUpIHtcbiAgICAgICAgY2hpbGQuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZGVsZXRlKEtleVV0aWxzLnRvTWFwS2V5KGNoaWxkLmlkKSk7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fY2hpbGRyZW5JbmRleCA9IF8udW5pcShfLmZpbHRlcih0aGlzLl9jaGlsZHJlbkluZGV4LCAoaXRlbSkgPT4gaXRlbSAhPT0gY2hpbGQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgIC8vcmVtb3ZlIG91cnNlbGYgZnJvbSB0aGUgdmlldyBjaGlsZHJlbiBtYXBcbiAgICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwgJiYgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleShjaGlsZC5nZXRJZCgpKSk7XG4gICAgICB9XG5cbiAgICAgIC8vbW92ZSBjaGlsZHJlbiBvZiBjaGlsZHJlblxuICAgICAgaWYgKGNoaWxkLnJlbW92ZUFsbENoaWxkcmVuKSB7XG4gICAgICAgIGNoaWxkLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGQgY29tcG9uZW50IGJ5IElEXG4gICAqIEBwYXJhbSBpZCBDaGlsZCBbW2lkXV1cbiAgICovXG4gIHJlbW92ZUNoaWxkQnlJZChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChjaGlsZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZUFsbENoaWxkcmVuKCkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNpdCA9IHRoaXMuY2hpbGRyZW4udmFsdWVzKCk7XG4gICAgICBsZXQgY3IgPSBjaXQubmV4dCgpO1xuXG4gICAgICB3aGlsZSAoY3IuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNyLnZhbHVlKTtcbiAgICAgICAgY3IgPSBjaXQubmV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYkNoaWxkcmVuSWRzICE9IG51bGwpIHtcbiAgICAgIHRoaXMudGFiQ2hpbGRyZW5JZHMuZm9yRWFjaChjaWQgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkQnlJZChjaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBjaGlsZCBjb21wb25lbnQgYnkgSUQuIERlZXAgc2VhcmNoXG4gICAqIEBwYXJhbSBpZCBDaGlsZCBjb21wb25lbnQgW1tpZF1dXG4gICAqL1xuICBnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEVsZW1lbnRCeUlkKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGNoaWxkIGNvbXBvbmVudCB3aXRoIGlkIGV4aXN0c1xuICAgKiBAcGFyYW0gaWQgQ2hpbGQgY29tcG9uZW50IFtpZF1cbiAgICovXG4gIGhhc0NoaWxkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kRWxlbWVudEJ5SWQoaWQpICE9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbGlkYXRlIGF0dHJpYnV0ZSBmb3IgaW5wdXQgY29tcG9uZW50LiBJbXBsZW1lbnQgb24gc3ViIGNsYXNzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gYXR0clxuICAgKi9cbiAgc2V0VmFsaWRhdGUoYXR0cjogc3RyaW5nKSB7XG4gICAgLy9UT0RPXG4gICAgY29uc29sZS5lcnJvcihcInNldFZhbGlkYXRlIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdHlwZSBhdHRyaWJ1dGUgZm9yIGlucHV0IGNvbXBvbmVudC4gSW1wbGVtZW50IG9uIHN1YiBjbGFzcyBjb21wb25lbnRcbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIHNldFR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgLy9UT0RPXG4gICAgY29uc29sZS5lcnJvcihcInNldFR5cGUgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb3JtYXQgYXR0cmlidXRlIGZvciBpbnB1dCBjb21wb25lbnQuIEltcGxlbWVudCBvbiBzdWIgY2xhc3MgY29tcG9uZW50XG4gICAqIEBwYXJhbSBmb3JtYXRcbiAgICovXG4gIHNldEZvcm1hdChmb3JtYXQ6IHN0cmluZykge1xuICAgIC8vVE9ET1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzZXRGb3JtYXQgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW21heExlbmd0aF1dIGZvciBpbnB1dCBjb21wb25lbnRcbiAgICogQHBhcmFtIG1heExlbmd0aCBJbnB1dCBtYXggbGVuZ3RoIHByb3BlcnR5LiBTaG91bGQgYmUgbnVtZXJpYyBzdHJpbmdcbiAgICovXG4gIHNldE1heExlbmd0aChtYXhMZW5ndGg6IHN0cmluZykge1xuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbbWluTGVuZ3RoXV0gZm9yIGlucHV0IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gbWluTGVuZ3RoIElucHV0IG1heCBsZW5ndGggcHJvcGVydHkuIFNob3VsZCBiZSBudW1lcmljIHN0cmluZ1xuICAgKi9cbiAgc2V0TWluTGVuZ3RoKG1pbkxlbmd0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5taW5MZW5ndGggPSBtaW5MZW5ndGg7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1ttYXhMZW5ndGhdXSBhcyBieXRlIGxlbmd0aCBmb3IgaW5wdXQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBibCBTaG91bGQgYmUgbnVtZXJpYyBzdHJpbmdcbiAgICovXG4gIHNldE1heEJ5dGVMZW4oYmw6IHN0cmluZykge1xuICAgIHRoaXMuc2V0TWF4TGVuZ3RoKGJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdCBtZXRob2QuIFNldCB2YWx1ZSBvZiBpbnB1dCBjb21wb25lbnRcbiAgICogQHBhcmFtIHZhbCBWYWx1ZSB0byBzZXRcbiAgICovXG4gIHNldFZhbHVlKHZhbDogYW55KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZm9jdXNhYmxlIHByb3BlcnR5IHZhbHVlIGZvciBjb21wb25lbnQuIEltcGxlbWVudCBvbiBzdWIgY2xhc3NcbiAgICogQHBhcmFtIGZvY3VzYWJsZSBUb2dnbGUgZm9jdXNhYmxlIG9uL29mZlxuICAgKi9cbiAgc2V0Rm9jdXNhYmxlKGZvY3VzYWJsZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vVE9ET1xuICB9XG5cbiAgLyoqXG4gICAqIEFic3RyYWN0LiBTZWxlY3QgcGFyZW50IGNvbXBvbmVudCB0YWIuIEltcGxlbWVudCBvbiBzdWIgY2xhc3NcbiAgICovXG4gIHNlbGVjdFBhcmVudFRhYigpIHtcbiAgICBmdW5jdGlvbiBmaW5kVGFiQmVsb25nKGl0ZW06IEJhc2VDb21wb25lbnQpIHtcbiAgICAgIGlmIChpdGVtICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsICYmIHBhcmVudC5nZXRMb2NhbE5hbWUoKSAhPT0gJ3RhYicpXG4gICAgICAgICAgcmV0dXJuIGZpbmRUYWJCZWxvbmcocGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGFiID0gZmluZFRhYkJlbG9uZyh0aGlzLmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSBhcyBUYWJDb21wb25lbnQ7XG5cbiAgICBmdW5jdGlvbiBmaW5kVGFiUGFuZUJlbG9uZyh0YWI6IEJhc2VDb21wb25lbnQpIHtcbiAgICAgIGlmICh0YWIgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YWIuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0TG9jYWxOYW1lKCkgIT09ICd0YWItcGFuZScpXG4gICAgICAgICAgcmV0dXJuIGZpbmRUYWJQYW5lQmVsb25nKHBhcmVudCk7XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRhYlBhbmUgPSBmaW5kVGFiUGFuZUJlbG9uZyh0aGlzLmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSBhcyBUYWJQYW5lQ29tcG9uZW50O1xuICAgIGlmICh0YWIgIT0gbnVsbCkge1xuICAgICAgdGFiUGFuZS5zZXRTZWxlY3RlZFRhYih0YWIuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgZGVlcCBzZWFyY2ggKHRoYXQgaXMsIGxvb2tzIHVwIGRlc2NlbmRhbnRzKVxuICAgKiBAcGFyYW0gaWQgZWxlbWVudCBpZCB0byBzZWFyY2hcbiAgICovXG4gIGZpbmRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3QgbWFwcGVkQ2hpbGRJZCA9IEtleVV0aWxzLnRvTWFwS2V5KGlkKTtcblxuICAgIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcbiAgICAvL2ZpcnN0IGNoZWNrIGZvciBjYWNoZVxuICAgIC8vIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gVWlEb2N1bWVudC5nZXRGcm9tQ2FjaGUobWFwcGVkQ2hpbGRJZCk7XG5cbiAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAvL2NoZWNrIGZvciByYWRpbyBidXR0b24gZ3JvdXBcbiAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSB0aGlzLmdldFJhZGlvQnV0dG9uR3JvdXBDb21wb25lbnQoaWQpO1xuXG4gICAgICBpZiAocmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgIGNvbXAgPSByYWRpb0dyb3VwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIC8vZ2V0IGFsbCBjaGlsZHJlbiBmcm9tIFZpZXdcbiAgICAgICAgLy8gY29uc3QgYWxsQ2hpbGRyZW4gPSB0aGlzLmdldFBhcmVudFZpZXcoKS5yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZSgpO1xuICAgICAgICAvLyBjb25zdCBlZGl0b3JJZCA9IGAje2lkfWA7XG5cbiAgICAgICAgLy8gZm9yIChsZXQgY2hpbGQgb2YgYWxsQ2hpbGRyZW4pIHtcbiAgICAgICAgLy8gICBpZiAoXG4gICAgICAgIC8vICAgICBLZXlVdGlscy50b01hcEtleShjaGlsZC5nZXRJZCgpKSA9PT0gbWFwcGVkQ2hpbGRJZCB8fFxuICAgICAgICAvLyAgICAgLy9ieSBlZGl0b3IgaWQgKGUuZy4gZWRpdG9yPVwiI2VkaXRvcklkXCIpXG4gICAgICAgIC8vICAgICBjaGlsZC5lZGl0b3IgPT09IGVkaXRvcklkXG4gICAgICAgIC8vICAgKSB7XG4gICAgICAgIC8vICAgICBjb21wID0gY2hpbGQ7XG4gICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICAgICAgY29tcCA9IHRoaXMuX3ZpZXdDaGlsZHJlbk1hcC5nZXQobWFwcGVkQ2hpbGRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcCA9PSBudWxsICYmIHRoaXMuaXNWaWV3KCkgIT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wID0gcGFyZW50Vmlldy5maW5kRWxlbWVudEJ5SWQobWFwcGVkQ2hpbGRJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vaWYgd2UgZmluZCBjb21wb25lbnQsIGFkZCB0byBjYWNoZVxuICAgICAgLy8gaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgLy8gICBVaURvY3VtZW50LmFkZFRvQ2FjaGUobWFwcGVkQ2hpbGRJZCwgY29tcCk7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29tcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHJhZGlvIGJ1dHRvbiBncm91cCBjb21wb25lbnQgYnkgaWRcbiAgICogQHBhcmFtIGlkIFJhZGlvIGJ1dHRvbiBncm91cCBJRFxuICAgKi9cbiAgZ2V0UmFkaW9CdXR0b25Hcm91cENvbXBvbmVudChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKGlkID09PSAodGhpcyBhcyBhbnkpLmdyb3VwKSB7XG4gICAgICAvL3JhZGlvIGJ1dHRvbiBncm91cFxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSB0aGlzLmdldFJhZGlvQnV0dG9uR3JvdXAoaWQpO1xuXG4gICAgICBpZiAocmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSByYWRpb0dyb3VwWzBdO1xuXG4gICAgICAgIGZvciAobGV0IHJhZGlvIG9mIHJhZGlvR3JvdXApIHtcbiAgICAgICAgICBpZiAocmFkaW8uZ2V0Q2hlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXRWYWwgPSByYWRpbztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjaGFuZ2UgbGlzdGVuZXIgb24gYXR0cmlidXRlc1xuICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICovXG4gIGFkZEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKGxpc3RlbmVyOiBBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycyA9IFtdO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLl9pbnRlcm5hbElkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKCdsaXN0ZW5lcicpO1xuXG4gICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2hhbmdlIGxpc3RlbmVyIG9uIGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAqL1xuICByZW1vdmVBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcjogQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgPSBfLmZpbHRlcih0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycywgKGl0ZW06IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKSA9PiBpdGVtLl9pbnRlcm5hbElkICE9PSBsaXN0ZW5lci5faW50ZXJuYWxJZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhdHRyaWJ1dGUgYW5kIGVtaXQgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVOYW1lXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAZXZlbnQgQXR0cmlidXRlQ2hhbmdlRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBmaXJlU2V0QXR0cmlidXRlRXZlbnQoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzICYmIHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGV2ZW50OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCA9IG5ldyBBdHRyaWJ1dGVDaGFuZ2VFdmVudChcbiAgICAgICAgYXR0cmlidXRlTmFtZSwgdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSksIG5ld1ZhbHVlLCB0aGlzXG4gICAgICApO1xuXG4gICAgICBfLmZvckVhY2godGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMsIChsaXN0ZW5lcjogQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIpID0+IHtcbiAgICAgICAgbGlzdGVuZXIub25BdHRyaWJ1dGVTZXQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhdHRyaWJ1dGUgYW5kIGVtaXQgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVOYW1lXG4gICAqIEBldmVudCBBdHRyaWJ1dGVDaGFuZ2VFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGZpcmVSZW5vdmVBdHRyaWJ1dGVFdmVudChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgJiYgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZXZlbnQ6IEF0dHJpYnV0ZUNoYW5nZUV2ZW50ID0gbmV3IEF0dHJpYnV0ZUNoYW5nZUV2ZW50KFxuICAgICAgICBhdHRyaWJ1dGVOYW1lLCB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSwgbnVsbCwgdGhpc1xuICAgICAgKTtcblxuICAgICAgXy5mb3JFYWNoKHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzLCAobGlzdGVuZXI6IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKSA9PiB7XG4gICAgICAgIGxpc3RlbmVyLm9uQXR0cmlidXRlUmVtb3ZlZChldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIHN0YXRpYyBbW2NsZWFuQ3NzXV0gbWV0aG9kXG4gICAqIEBwYXJhbSBjc3NcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Dc3MoY3NzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gQmFzZUNvbXBvbmVudC5jbGVhbkNzcyhjc3MpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZvcm1hdCBjc3Mgc2VsZWN0b3JzLiBSZW1vdmUgZG90XG4gICAqIEBwYXJhbSBjc3NcbiAgICogQHJldHVybnMgTmV3IENTUyBzZWxlY3RvciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjbGVhbkNzcyhjc3M6IHN0cmluZykge1xuICAgIGlmIChjc3MgIT0gbnVsbCAmJiBjc3MuaW5kZXhPZihcIi5cIikgPj0gMCkge1xuICAgICAgLy9tb3JlIHRoYW4gb25lIHN0eWxlP1xuICAgICAgaWYgKGNzcy5pbmRleE9mKFwiIFwiKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKGNzcy5zcGxpdChcIiBcIiksIChpdGVtKSA9PiB0aGlzLmNsZWFuQ3NzKGl0ZW0pKS5qb2luKFwiIFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb25seSBvbmUgc3R5bGVcbiAgICAgICAgcmV0dXJuIGNzcy5yZXBsYWNlKC9cXC4vZywgJy0nKS5yZXBsYWNlKC9eXFwtLywgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjc3M7XG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kIGdldHMgdGhlIGluc3RhbmNlJ3MgW1tDaGFuZ2VEZXRlY3RvclJlZl1dLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgaW4gc3ViIGNsYXNzXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIC8vc3ViLWNsYXNzIG92ZXJyaWRlXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTWFyayBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIG1hcmtGb3JDaGVjaygpIHtcbiAgICBpZiAodGhpcy5fdGVtcEZyZWV6ZUNkICE9PSB0cnVlICYmIHRoaXMuX2lzRHlpbmcgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZSBjaGFuZ2UgZGV0ZWN0aW9uIG9uIGNvbXBvbmVudFxuICAgKi9cbiAgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5fdGVtcEZyZWV6ZUNkICE9PSB0cnVlICYmIHRoaXMuX2lzRHlpbmcgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgQ1NTIGhlaWdodCBhbmQgd2lkdGggc3R5bGUgdmFsdWUuIEVpdGhlciAnaGVpZ2h0L3dpZHRoJyBvciAnbWF4LWhlaWdodC9tYXgtd2lkdGgnXG4gICAqIEBwYXJhbSBoZWlnaHRTdHlsZU5hbWVcbiAgICogQHBhcmFtIHdpZHRoU3R5bGVOYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgaW5pdFdpZHRoSGVpZ2h0U3R5bGUoaGVpZ2h0U3R5bGVOYW1lOiBzdHJpbmcgPSAnaGVpZ2h0Jywgd2lkdGhTdHlsZU5hbWU6IHN0cmluZyA9ICdtYXgtd2lkdGgnKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbEhlaWdodCAhPSBudWxsICYmIHRoaXMuY29udHJvbEhlaWdodCAhPSBcIlwiICYmIHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgPiAwKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcImhlaWdodFwiXSA9IHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbFdpZHRoICE9IG51bGwgJiYgdGhpcy5jb250cm9sV2lkdGggIT0gXCJcIiAmJiBwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aCkgPiAwKSB7XG4gICAgICB0aGlzLnN0eWxlc1t3aWR0aFN0eWxlTmFtZV0gPSBwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aCkgKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEFkZCBhIHJhZGlvIGJ1dHRvbiBjb21wb25lbnQgdG8gdGhpcyBjb21wb25lbnRcbiAgICogQHBhcmFtIHJhZGlvXG4gICAqL1xuICBhZGRSYWRpb0J1dHRvbkdyb3VwKHJhZGlvOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgLy9yYWRpbyBncm91cCBuZWVkIHRvIGJlIGF0IFZpZXdDb21wb25lbnQgbGV2ZWxcbiAgICBpZiAodGhpcy5pc1ZpZXcoKSAhPT0gdHJ1ZSAmJiB0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudCgpLmFkZFJhZGlvQnV0dG9uR3JvdXAocmFkaW8pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJhZGlvQnV0dG9uR3JvdXBzID09IG51bGwpIHtcbiAgICAgIHRoaXMucmFkaW9CdXR0b25Hcm91cHMgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8QmFzZUNvbXBvbmVudD4+KCk7XG4gICAgfVxuXG4gICAgLy9pZ25vcmUgdHlwZSB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZlxuICAgIGxldCBncm91cElkOiBzdHJpbmcgPSAocmFkaW8gYXMgYW55KS5ncm91cDtcblxuICAgIGlmICh0aGlzLnJhZGlvQnV0dG9uR3JvdXBzLmdldChncm91cElkKSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJhZGlvQnV0dG9uR3JvdXBzLnNldChncm91cElkLCBbcmFkaW9dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYWRpb0J1dHRvbkdyb3Vwcy5nZXQoZ3JvdXBJZCkucHVzaChyYWRpbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCByYWRpbyBidXR0b24gZ3JvdXAgYnkgZ3JvdXAgSURcbiAgICogQHBhcmFtIGdyb3VwSWRcbiAgICogQHJldHVybnMgIFJhZGlvIGJ1dHRvbiBncm91cCBjb21wb25lbnRcbiAgICovXG4gIGdldFJhZGlvQnV0dG9uR3JvdXAoZ3JvdXBJZDogc3RyaW5nKSB7XG4gICAgbGV0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgIHJldHVybiB2aWV3ICE9IG51bGwgJiYgdmlldy5yYWRpb0J1dHRvbkdyb3VwcyAhPSBudWxsID8gdmlldy5yYWRpb0J1dHRvbkdyb3Vwcy5nZXQoZ3JvdXBJZCkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tjb250cm9sV2lkdGhdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gd2lkdGggU2hvdWxkIGJlIG51bWVyaWMgdmFsdWVcbiAgICovXG4gIHNldENvbnRyb2xXaWR0aCh3aWR0aDogYW55KSB7XG4gICAgdGhpcy5jb250cm9sV2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tjb250cm9sSGVpZ2h0XV0gcHJvcGVydHlcbiAgICogQHBhcmFtIGhlaWdodCBTaG91bGQgYmUgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0Q29udHJvbEhlaWdodChoZWlnaHQ6IGFueSkge1xuICAgIHRoaXMuY29udHJvbEhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBbW3NldENvbnRyb2xXaWR0aF1dIG1ldGhvZFxuICAgKiBAcGFyYW0gd2lkdGggU2hvdWxkIGJlIGEgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0V2lkdGgod2lkdGg6IGFueSkge1xuICAgIHRoaXMuc2V0Q29udHJvbFdpZHRoKHdpZHRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tjb250cm9sV2lkdGhdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NvbnRyb2xXaWR0aF1dXG4gICAqL1xuICBnZXRXaWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBmb3IgW1tzZXRDb250cm9sSGVpZ2h0XV0gbWV0aG9kXG4gICAqIEBwYXJhbSBoZWlnaHQgU2hvdWxkIGJlIGEgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0SGVpZ2h0KGhlaWdodDogYW55KSB7XG4gICAgdGhpcy5zZXRDb250cm9sSGVpZ2h0KGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY29udHJvbEhlaWdodF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIFtbY29udHJvbEhlaWdodF1dXG4gICAqL1xuICBnZXRIZWlnaHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sSGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdmFsdWUgb2YgW1t4XV0gcHJvcGVydHkgZm9yIGhvcml6b250YWwgcG9zaXRpb24uXG4gICAqIFNldHMgQ1NTIFwibGVmdFwiIHByb3BlcnR5IHRvIFtbeF1dIHB4LlxuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIGNvb3JkaW5hdGUgcG9zaXRpb25cbiAgICovXG4gIHNldFgoeDogc3RyaW5nKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnN0eWxlc1tcImxlZnRcIl0gPSB4ICsgXCJweFwiO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbeF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIFtbeF1dXG4gICAqL1xuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2YWx1ZSBvZiBbW3ldXSBwcm9wZXJ0eSBmb3IgdmVydGljYWwgcG9zaXRpb24uXG4gICAqIFNldHMgQ1NTIFwidG9wXCIgcHJvcGVydHkgdG8gW1t5XV0gcHguXG4gICAqIEBwYXJhbSB5IFZlcnRpY2FsIGNvb3JkaW5hdGUgcG9zaXRpb25cbiAgICovXG4gIHNldFkoeTogc3RyaW5nKSB7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnN0eWxlc1tcInRvcFwiXSA9IHkgKyBcInB4XCI7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1t5XV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1t5XV1cbiAgICovXG4gIGdldFkoKSB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tib3JkZXJXaWR0aF1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBib3JkZXJXaWR0aCBTaG91bGQgYmUgbnVtZXJpY1xuICAgKi9cbiAgc2V0Qm9yZGVyV2lkdGgoYm9yZGVyV2lkdGg6IHN0cmluZykge1xuICAgIHRoaXMuYm9yZGVyV2lkdGggPSBib3JkZXJXaWR0aDtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNvbXBvbmVudCBpcyB2aWV3IGNvbXBvbmVudC5cbiAgICogSW1wbGVtZW50IGluIHN1YiBjbGFzc1xuICAgKi9cbiAgaXNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGVyZSBhcmUgYWN0aXZlIHZpZXdzLlxuICAgKiBJbXBsZW1lbnQgaW4gc3ViIGNsYXNzXG4gICAqL1xuICBpc05vbmVBY3RpdmVWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIGNvbXBvbmVudCBpcyBhbiBpbnN0YW5jZSBvZiBbW0RpYWxvZ0NvbXBvbmVudF1dXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNEaWFsb2coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgZHluYW1pYyB2aWV3XG4gICAqL1xuICBpc0R5bmFtaWNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBhcmVudCB2aWV3IG9mIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFBhcmVudCB2aWV3IGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0UGFyZW50VmlldygpOiBCYXNlQ29tcG9uZW50IHtcbiAgICBpZiAodGhpcy5pc1ZpZXcoKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHBhcmVudFZpZXc6IEJhc2VDb21wb25lbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBbdGhpcy5wYXJlbnRdO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHRlbXAuaXNWaWV3KCkgPT09IHRydWUpIHtcbiAgICAgICAgICBwYXJlbnRWaWV3ID0gdGVtcDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZW1wLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3RhY2sucHVzaCh0ZW1wLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50VmlldztcbiAgfVxuXG4gIGdldFBhcmVudFNjcm9sbFZpZXcoKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMuaXNTY3JvbGxWaWV3KCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxldCBwYXJlbnRWaWV3OiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICBsZXQgc3RhY2s6IEFycmF5PEJhc2VDb21wb25lbnQ+ID0gW3RoaXMucGFyZW50XTtcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdGVtcCA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmICh0ZW1wLmlzU2Nyb2xsVmlldygpID09PSB0cnVlKSB7XG4gICAgICAgICAgcGFyZW50VmlldyA9IHRlbXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrLnB1c2godGVtcC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFZpZXc7XG4gIH1cblxuICBpc1Njcm9sbFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcGFyZW50IGNvbnRhaW5lciBjb21wb25lbnQgKGZvciBzdWJ2aWV3KSwgbm90IHRoZSBhY3R1YWwgcGFyZW50IHZpZXcuIFRoaXMgaXMgdGhlIHBhcmVudFxuICAgKiBWaWV3Q29tcG9uZW50IHdoZXJlIGNhbkJlQWN0aXZlVmlldyBpcyBmYWxzZVxuICAgKi9cbiAgX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCk6IEJhc2VDb21wb25lbnQge1xuICAgIGlmICh0aGlzLmlzTm9uZUFjdGl2ZVZpZXcoKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHBhcmVudFZpZXc6IEJhc2VDb21wb25lbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBbdGhpcy5wYXJlbnRdO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHRlbXAuaXNOb25lQWN0aXZlVmlldygpID09PSB0cnVlKSB7XG4gICAgICAgICAgcGFyZW50VmlldyA9IHRlbXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrLnB1c2godGVtcC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFZpZXc7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY29udGV4dCBtZW51IGNsaWNrIChyaWdodCBjbGljaykuXG4gICAqIERlbGVnYXRlcyB0byBbW1Nlc3Npb25TZXJ2aWNlXV0gdG8gZGlzcGxheSBwb3B1cC5cbiAgICogQHBhcmFtIGV2ZW50IENsaWNrIGV2ZW50XG4gICAqIEBwYXJhbSBmb3JjZSBhbHdheXMgZW1pdFxuICAgKi9cbiAgaGFuZGxlT25Db250ZXh0TWVudShldmVudDogTW91c2VFdmVudCwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIC8vYWxsb3cgY29tcG9uZW50IHRvIHNraXAgZW1pdCBldmVudCBhbmQgbGV0IHBhcmVudCAoaS5lLiB0YWJsZSBjZWxsIHRvIGVtaXQgaXQpXG4gICAgaWYgKGZvcmNlID09PSB0cnVlIHx8IHRoaXMuc2tpcEVtaXRDb250ZXh0TWVudUV2ZW50ICE9PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5nZXRTZXNzaW9uKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5zZXRNb3VzZVBvc2l0aW9uKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuICAgICAgbGV0IHBvcHVwTWVudUlkOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgIHBvcHVwTWVudUlkID0gKHBhcmVudFZpZXcgYXMgVmlld0NvbXBvbmVudCkuZ2V0Rmlyc3RQb3B1cE1lbnVJZCgpO1xuICAgICAgfVxuXG5cbiAgICAgIHRoaXMub25Db250ZXh0TWVudS5lbWl0KGV2ZW50KTtcblxuXG4gICAgICBpZiAodGhpcy5wb3B1cCAhPSBudWxsICYmIHRoaXMucG9wdXAgIT09IFwiXCIpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAuaW5kZXhPZihcIiNcIikgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBvcHVwID0gdGhpcy5wb3B1cC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBwb3B1cE1lbnVJZCA9IHRoaXMucG9wdXA7XG5cbiAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuX2N1cnJlbnRQb3B1cE1lbnVJZCA9IHRoaXMucG9wdXA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3B1cE1lbnVJZCAhPSBudWxsKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRtID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRtKTtcblxuICAgICAgICAgIGlmICh0aGlzLmdldFNlc3Npb24oKS5fY3VycmVudFBvcHVwTWVudUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBvcHVwTWVudUlkID0gdGhpcy5nZXRTZXNzaW9uKCkuX2N1cnJlbnRQb3B1cE1lbnVJZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5zaG93Q29udGV4dE1lbnUocG9wdXBNZW51SWQpO1xuICAgICAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLl9jdXJyZW50UG9wdXBNZW51SWQgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgZm9jdXMgbG9zdCBldmVudCBmb3IgY29tcG9uZW50cyB0aGF0IHJlcXVpcmUgdmFsaWRhdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IEJlZm9yZUFjdGl2ZUxvc3RcbiAgICovXG4gIHZhbGlkYXRlRmllbGQoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBpZiAoQXBwVXRpbHMudmFsaWRhdGVGaWVsZCAhPSBudWxsICYmIEFwcFV0aWxzLnZhbGlkYXRlRmllbGQodGhpcykgIT09IHRydWUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uQmVmb3JlQWN0aXZlTG9zdC5lbWl0KCk7XG5cbiAgICB0aGlzLmZvY3VzTG9zdCgpO1xuICB9XG5cbiAgLy9pdGVyYXRhdGl2ZSBmdW5jdGlvbiB0byBwcmV2ZW50IHN0YWNrIG92ZXJmbG93XG4gIC8vIHJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlKCkge1xuICAvLyAgIGlmICh0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlICE9IG51bGwgJiYgdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5sZW5ndGggPiAwKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZTtcbiAgLy8gICB9XG5cbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gW107XG5cbiAgLy8gICBpZiAodGhpcy5jaGlsZHJlbiA9PSBudWxsKSB7XG4gIC8vICAgICBMb2dnZXIud2FybihcInJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlLCBjaGlsZHJlbiBpcyBudWxsXCIpO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX3JlZHVjZUNoaWxkcmVuSXRlcmF0aXZlQ2FjaGU7XG4gIC8vICAgfVxuXG4gIC8vICAgLy9za2lwIERpYWxvZ0NvbXBvbmVudFxuICAvLyAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBfLmZpbHRlcihBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4udmFsdWVzKCkpLCAoY29tcDogQmFzZUNvbXBvbmVudCk9PntcbiAgLy8gICAgIHJldHVybiBjb21wLmlzRmF1eEVsZW1lbnQoKSB8fCBjb21wLmlzRGlhbG9nKCkgIT09IHRydWU7XG4gIC8vICAgfSk7XG5cbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5jb25jYXQoc3RhY2spO1xuICAvLyAgIGxldCBjb3VudGVyID0gMDtcblxuICAvLyAgIHdoaWxlKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgLy8gICAgIGNvbnN0IGNoaWxkID0gc3RhY2sucG9wKCk7XG5cbiAgLy8gICAgIGlmIChjaGlsZC5jaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkLmNoaWxkcmVuLnNpemUgPiAwKSB7XG4gIC8vICAgICAgIC8vZ2V0IGdyYW5kY2hpbGRyZW5cbiAgLy8gICAgICAgY29uc3QgZ3JhbmRDaGlsZHJlbiA9IEFycmF5LmZyb20oY2hpbGQuY2hpbGRyZW4udmFsdWVzKCkpO1xuICAvLyAgICAgICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5jb25jYXQoZ3JhbmRDaGlsZHJlbik7XG5cbiAgLy8gICAgICAgLy9wdXNoIHRvIG91ciBzdGFjayB0byBpdGVyYXRlIG91ciBncmFuZGNoaWxkcmVuIHRvIGxvb2sgZm9yIGdyZWF0IGdyYW5kY2hpbGRyZW5cbiAgLy8gICAgICAgc3RhY2sgPSBzdGFjay5jb25jYXQoZ3JhbmRDaGlsZHJlbik7XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIGNvdW50ZXIrKztcblxuICAvLyAgICAgaWYgKGNvdW50ZXIgPiAxMDAwMCB8fCBzdGFjay5sZW5ndGggPiAxMDAwMCkge1xuICAvLyAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXNlQ29tcG9uZW50LnJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlOiBzdGFjayBvdmVyZmxvd1wiKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICByZXR1cm4gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hpbGRyZW4gb2YgYSB0YWJsZSBjb21wb25lbnQuXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHRhYmxlIGNoaWxkcmVuXG4gICAqL1xuICBnZXRUYWJsZUNoaWxkcmVuKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tiZ0NvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tiZ0NvbG9yXV1cbiAgICovXG4gIGdldEJnQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmdDb2xvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBdHRyaWJ1dGVGcm9tRGVmKCkge1xuICAgIGNvbnN0IGNvbXBEZWYgPSB0aGlzLmdldFNlc3Npb24oKS5nZXREZWYodGhpcy5pZCk7XG5cbiAgICBpZiAoY29tcERlZiAhPSBudWxsICYmIGNvbXBEZWYuYXR0cmlidXRlICE9IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBNYXAgfHxcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBIYXNodGFibGUgfHxcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBIYXNoTWFwXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IGNvbXBEZWYuYXR0cmlidXRlLmtleXMoKTtcbiAgICAgICAgbGV0IGtleSA9IGtleXMubmV4dCgpO1xuXG4gICAgICAgIHdoaWxlIChrZXkuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleS52YWx1ZSwgY29tcERlZi5hdHRyaWJ1dGUuZ2V0KGtleSkpO1xuICAgICAgICAgIGtleSA9IGtleXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKGNvbXBEZWYuYXR0cmlidXRlKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgY29tcERlZi5hdHRyaWJ1dGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB4cGF0aCBsb29rdXAgb24gdGhlIGVsZW1lbnQuIFRoaXMgd2lsbCBiZSBldmFsdWF0ZWQgYWdhaW5zdCB0aGUgYWN0dWFsIEhUTUxFbGVtZW50LlxuICAgKlxuICAgKiBAd2FybmluZyBQTEVBU0UgRU5TVVJFIFRPIEZSRUUgVVAgVEhFIFRIRSBSRVNVTFQgU08gV0UgRE9OJ1QgSEFWRSBBTlkgREFOR0xJTkcgSFRNTCBFTEVNRU5UXG4gICAqXG4gICAqIEBwYXJhbSB4cGF0aEV4cHJlc3Npb25cbiAgICovXG4gIGV2YWx1YXRlWFBhdGgoeHBhdGhFeHByZXNzaW9uOiBzdHJpbmcpOiBWZWN0b3I8Tm9kZT4ge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjb2xvciBvZiBoaWdodGxpZ2h0ZWQgdGV4dCBiYWNrZ3JvdW5kXG4gICAqIEBwYXJhbSBjb2xvciBTaG91bGQgYmUgYSB2YWxpZCBDU1MgY29sb3IgdmFsdWUgKGUuZy4gXCIjRkYwMDAwXCIgb3IgXCJyZWRcIilcbiAgICovXG4gIHNldEhpZ2hsaWdodEJnQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuaGlnaGxpZ2h0QmdDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjb2xvciBvZiBoaWdobGlnaHRlZCB0ZXh0IGZvcmVncm91bmRcbiAgICogQHBhcmFtIGNvbG9yIFNob3VsZCBiZSBhIHZhbGlkIENTUyBjb2xvciB2YWx1ZSAoZS5nLiBcIiNGRjAwMDBcIiBvciBcInJlZFwiKVxuICAgKi9cbiAgc2V0SGlnaGxpZ2h0Rm9udENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmhpZ2hsaWdodEZvbnRDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2hpZ2h0bGlnaHRCZ0NvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRIaWdobGlnaHRCZ0NvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEJnQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbaGlnaGxpZ2h0Rm9udENvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRIaWdobGlnaHRGb250Q29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0Rm9udENvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW3BhcmVudFRhYmxlUm93XV0gcHJvcGVydHlcbiAgICovXG4gIGdldFBhcmVudFRhYmxlUm93KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudFRhYmxlUm93O1xuICB9XG5cbiAgLy9jbGVhciByZWR1Y2UgY2hpbGRyZW4gaXRlcmF0aXZlIGNhY2hlXG4gIC8vIHJlc2V0UmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZSgpIHtcbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gbnVsbDtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBjaGFuZ2UgZGV0ZWN0aW9uIGlzIGZyb3plblxuICAgKiBAcmV0dXJucyBCb29sZWFuIElmIGNvbXBvbmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIGZyb3plblxuICAgKi9cbiAgaXNDaGFuZ2VEZXRlY3Rpb25Gcm96ZW4oKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNvbXBvbmVudCBpcyBhIGZhdXggZWxlbWVudFxuICAgKiBAcmV0dXJucyBCb29sZWFuIElmIGNvbXBvbmVudCBpcyBmYXV4IGVsZW1lbnRcbiAgICovXG4gIGlzRmF1eEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbnRlcm5hbCBbW192aWV3Q2hpbGRyZW5NYXBdXSBtZW1iZXJcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tfdmlld0NoaWxkcmVuTWFwXV1cbiAgICovXG4gIGdldFZpZXdDaGlsZHJlbk1hcCgpOiBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHZpZXcgY2hpbGQgd2l0aCBpZCBmcm9tIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqIEBwYXJhbSBpZCBJRCBvZiBjaGlsZCB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZVZpZXdDaGlsZEZyb21NYXAoaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleShpZCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY29tcG9uZW50IHRvIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqIEBwYXJhbSBvYmogQ2hpbGQgdG8gYWRkIHRvIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqL1xuICBhZGRWaWV3Q2hpbGRUb01hcChvYmo6IEJhc2VDb21wb25lbnQgfCBIVE1MRWxlbWVudFdyYXBwZXIpIHtcbiAgICBpZiAodGhpcy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcC5zZXQoS2V5VXRpbHMudG9NYXBLZXkob2JqLmdldElkKCkpLCBvYmogYXMgYW55KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlIGFuIE1DTyBtZXRob2QgYnkgbmFtZS4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgYXJndW1lbnQsIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGhcbiAgICogdGhpcyBjb21wb25lbnQgYXMgYW4gYXJndW1lbnQuXG4gICAqIEBwYXJhbSBhY3Rpb24gTmFtZSBvZiBhY3Rpb24gbWV0aG9kIHRvIGludm9rZSBvciBhIGZ1bmN0aW9uIHRvIGludm9rZVxuICAgKi9cbiAgcHJvdGVjdGVkIGludm9rZU1jb0FjdGlvbihhY3Rpb246IHN0cmluZyB8ICgoYXJnPzogYW55KSA9PiBhbnkpKSB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYWN0aW9uKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uLmluZGV4T2YoXCJtY286Ly9cIikgPT09IDApIHtcbiAgICAgIGNvbnN0IG1jb05hbWUgPSBhY3Rpb24uc3Vic3RyaW5nKDYsIGFjdGlvbi5pbmRleE9mKFwiLlwiKSk7XG4gICAgICBjb25zdCBtZXRob2ROYW1lID0gYWN0aW9uLnN1YnN0cmluZyhhY3Rpb24uaW5kZXhPZihcIi5cIikgKyAxLCBhY3Rpb24uaW5kZXhPZihcIihcIikpO1xuICAgICAgY29uc3QgYXJnID0gYWN0aW9uLnN1YnN0cmluZyhhY3Rpb24uaW5kZXhPZihcIihcIikgKyAxLCBhY3Rpb24uaW5kZXhPZihcIilcIikpO1xuXG4gICAgICBpZiAoYXJnICE9IG51bGwgJiYgYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWNvID0gdGhpcy5zZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5nZXRNY28obWNvTmFtZSk7XG5cbiAgICAgICAgaWYgKG1jbyAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGFyZyA9PT0gXCJ0aGlzXCIpIHtcbiAgICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28sIFt0aGlzXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28sIFthcmddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBleGVjdXRlIE1DTyBhY3Rpb24sIG1jbyBub3QgZm91bmQ6IFwiICsgbWNvTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1jbyA9IHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0TWNvQ29udGFpbmVyKCkuZ2V0TWNvKG1jb05hbWUpO1xuXG4gICAgICAgIGlmIChtY28gIT0gbnVsbCkge1xuICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZXhlY3V0ZSBNQ08gYWN0aW9uLCBtY28gbm90IGZvdW5kOiBcIiArIG1jb05hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5faW50ZXJuYWxDaGFuZ2VDYiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbENoYW5nZUNiKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGVtcHR5Q2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaXQgPSB0aGlzLl92aWV3Q2hpbGRyZW5NYXAudmFsdWVzKCk7XG4gICAgICBsZXQgdmFsID0gY2l0Lm5leHQoKTtcblxuICAgICAgd2hpbGUgKHZhbC5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgIC8vc29tZSBjaGlsZHJlbiBhcmUgbm90IGFjdHVhbCBCYXNlQ29tcG9uZW50XG4gICAgICAgIGlmICh0eXBlb2YgdmFsLnZhbHVlLmVtcHR5Q2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHZhbC52YWx1ZS5lbXB0eUNoaWxkcmVuKCk7XG4gICAgICAgICAgdmFsLnZhbHVlLl9pc0R5aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IGNpdC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwLmNsZWFyKCk7XG4gICAgICBkZWxldGUgdGhpcy5fdmlld0NoaWxkcmVuTWFwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoaXMgaXMgYSBTY3JvbGxQYW5lQ29tcG9uZW50XG4gICAqL1xuICBpc1Njcm9sbFBhbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzY3JvbGwgcG9zaXRpb24gdG8gdGhlIHByZXZpb3VzIGNhcHR1cmVkXG4gICAqL1xuICByZXNldFNjcm9sbFRvcFRvUHJldmlvdXNQb3NpdGlvbigpIHtcbiAgICAvL2ltcGxlbWVudCBieSBzY3JvbGxwYW5lXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHNjcm9sbHBhbmUgcG9zXG4gICAqL1xuICByZXNldEFsbFNjcm9sbFBhbmVzUG9zaXRpb25Ub1ByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFBhbmVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMuZm9yRWFjaCgoc2Nyb2xsUGFuZSkgPT4gc2Nyb2xsUGFuZS5yZXNldFNjcm9sbFRvcFRvUHJldmlvdXNQb3NpdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICByZXNldFNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICB9XG4gIHJlc2V0QWxsU2Nyb2xsUGFuZXNQb3NpdGlvblRvVG9wKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFBhbmVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMuZm9yRWFjaCgoc2Nyb2xsUGFuZSkgPT4gc2Nyb2xsUGFuZS5yZXNldFNjcm9sbFRvcFBvc2l0aW9uKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZnkgcGFyZW50IHZpZXcgdGhhdCB0aGVyZSBpcyBhIHZhbGlkYXRpb24gZXJyb3Igb24gdGhpcywgdGhpcyBzaG91bGQgb25seSBiZSBhcHBsaWNhYmxlZCB0byBkaXNhYmxlZCBlbGVtZW50XG4gICAqL1xuICBub3RpZnlQYXJlbnRPZkVycm9yKCkge1xuICAgIGlmICh0aGlzLmdldERpc2FibGVkKCkgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCAmJiBwYXJlbnRWaWV3W1wiZGlhbG9nXCJdICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHBhcmVudFZpZXdbXCJkaWFsb2dcIl0uX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmVudFZpZXdbXCJkaWFsb2dcIl0uX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRWaWV3W1wiZGlhbG9nXCJdLl9kaXNhYmxlZEVycm9yRWxlbWVudElkLmluZGV4T2YodGhpcy5nZXRJZCgpKSA8IDApIHtcbiAgICAgICAgICBwYXJlbnRWaWV3W1wiZGlhbG9nXCJdLl9kaXNhYmxlZEVycm9yRWxlbWVudElkLnB1c2godGhpcy5nZXRJZCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgcGFyZW50IHRhYlxuICAgKi9cbiAgZm9jdXNQYXJlbnRUYWIoKSB7XG4gICAgLy9nZXQgcGFyZW50IHZpZXdcbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwpIHtcbiAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoaXMgdmlldyBpcyBpbiBhIFRhYlBhbmVcbiAgICAgIGNvbnN0IHRhYlBhbmUgPSBwYXJlbnRWaWV3LmdldFBhcmVudCgpO1xuXG4gICAgICAvL2NoZWNrIHRvIHNlZSBpZiB0aGUgcGFyZW50IGlzIGEgVGFiXG4gICAgICBpZiAodGFiUGFuZSAhPSBudWxsICYmIHRhYlBhbmUuZ2V0TnhUYWdOYW1lKCkgPT09IFwidGFiXCIpIHtcbiAgICAgICAgdGFiUGFuZS5zZXRGb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBzY3JvbGxwYW5lXG4gICAqXG4gICAqIEBwYXJhbSBzY3JvbGxQYW5lIHNjcm9sbFBhbmUgdG8gcmVnaXN0ZXJcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJTY3JvbGxQYW5lKHNjcm9sbFBhbmU6IEJhc2VDb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIHNjcm9sbFBhbmUuaXNTY3JvbGxQYW5lID09PSBcImZ1bmN0aW9uXCIgJiYgc2Nyb2xsUGFuZS5pc1Njcm9sbFBhbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsUGFuZXMgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNjcm9sbFBhbmVzID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMucHVzaChzY3JvbGxQYW5lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==