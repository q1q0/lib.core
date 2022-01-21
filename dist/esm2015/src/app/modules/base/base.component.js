/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class BaseComponent {
    /**
     * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
     * but it must provided the minimal required items to be injected.
     *
     * @param {?} parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
     * @param {?} sessionService SessionService needed by this class, this should be injected by Angular.
     * @param {?} elementRef the element reference that wrap the element (tag) of this component.
     * @param {?} renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
     */
    constructor(parent, sessionService, elementRef, renderer) {
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
    /**
     * @param {?} css
     * @return {?}
     */
    set cssClass(css) {
        this._cssClass = this.cleanCss(css);
        this.initBorderLayout();
    }
    /**
     * @param {?} req
     * @return {?}
     */
    set require(req) {
        this.required = req;
    }
    /**
     * Accessor for [[required]] property
     * @return {?}
     */
    get require() {
        return this.required;
    }
    /**
     * @param {?} css
     * @return {?}
     */
    class(css) {
        this.cssClass = css;
    }
    /**
     * Accessor for [[cssClass]] property
     * @return {?}
     */
    get cssClass() {
        return this._cssClass;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set enabled(boo) {
        if (typeof boo === 'string') {
            //if enabled is false, disabled is true
            this.disabled = boo === 'true' ? false : true;
        }
        else {
            this.disabled = !boo;
        }
    }
    /**
     * @return {?}
     */
    get enabled() {
        return !this.disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortValue(value) {
        this.sort = value;
    }
    /**
     * @return {?}
     */
    get sortValue() {
        return this.sort;
    }
    /**
     * @return {?}
     */
    get uniqueId() {
        return this._uniqueId;
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.parent != null) {
            this.parent.addChild(this);
        }
        this._childrenIndex = _.uniq(this._childrenIndex);
        //commnet out, causing regression b/c the css selector need id of parent window
        // if (this.renderer != null && typeof this.renderer["removeAttribute"] === "function") {
        //   this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
        // }
    }
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    checkNxStyling(skipAttributeOverride = false) {
        if (skipAttributeOverride !== true && this._cssClass != null && this._cssClass.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
            /** @type {?} */
            let newAttributes = AppUtils.attributeOverrideClass(this._cssClass);
            if (newAttributes != null) {
                /** @type {?} */
                const newCssClass = _.filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                newAttributes = _.filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                newAttributes.push({
                    attributeName: AttributesEnum.CLASS,
                    value: (this._cssClass + " " + newCssClass).trim(),
                });
                this.setAttributes(newAttributes, true);
            }
        }
        if (this.elementRef != null) {
            /** @type {?} */
            const _validate = this.elementRef.nativeElement.getAttribute("validate");
            if (skipAttributeOverride !== true && _validate != null && _validate.length > 0) {
                /** @type {?} */
                let newAttributes = AppUtils.attributeOverrideValidate(_validate);
                if (newAttributes != null) {
                    /** @type {?} */
                    const newCssClass = _.filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                    newAttributes = _.filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
                    newAttributes.push({
                        attributeName: AttributesEnum.CLASS,
                        value: (this._cssClass + " " + newCssClass).trim(),
                    });
                    this.setAttributes(newAttributes, true);
                }
            }
        }
    }
    /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     * @return {?}
     */
    initBorderLayout() {
        if (this.borderPosition != null && this.borderPosition != '') {
            if (this._cssClass != null) {
                this._cssClass = this._cssClass + ' border-' + this.borderPosition;
            }
            else {
                this._cssClass = 'border-' + this.borderPosition;
            }
        }
    }
    /**
     * Destroy lifecycle. Clear component references and cache
     * @return {?}
     */
    ngOnDestroy() {
        this.cleanup();
        this._isDying = true;
        /** @type {?} */
        const parentView = this.getParentView();
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
    }
    /**
     * @return {?}
     */
    cleanup() {
    }
    /**
     * Get [[SessionService]] instance injected via constructor
     * @return {?} SessionService instance
     */
    getSession() {
        return this.sessionService;
    }
    /**
     * Get child component by id
     * @param {?} id Component ID
     * @return {?} Child [[BaseComponent]]
     */
    getChild(id) {
        if (this._children !== null) {
            return this._children.get(KeyUtils.toMapKey(id));
        }
        else {
            return null;
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        this.markForCheck();
    }
    /**
     * Set [[visible]] property value
     * @param {?} boo Value for visible property
     * @return {?}
     */
    setVisible(boo) {
        this.visible = boo;
        this.markForCheck();
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    setScrollPosVertical(expression) {
        //TODO
    }
    /**
     * Set color of text on the component
     * @param {?} value Color string. Should be hexadecimal or color name supported by CSS
     * @return {?}
     */
    setFontColor(value) {
        this.setColor(value);
    }
    /**
     * Value of [[disabled]] property
     * @return {?} Value of disabled
     */
    getDisabled() {
        return this.disabled;
    }
    /**
     * Value of opposite of [[disabled]] value
     * @return {?} Value of enabled
     */
    getEnabled() {
        return !this.getDisabled();
    }
    /**
     * Value of soColumnNo attribute
     * @return {?} Column number
     */
    getSoColumnNo() {
        return this.getAttribute("soColumnNo");
    }
    /**
     * Get the component ref string value from [[editor]] property
     * @return {?} Ref of component
     */
    getEditor() {
        return this.editor;
    }
    /**
     * Value of soRequire attribute
     * @return {?} soRequire value
     */
    getSoRequire() {
        return this.getAttribute("soRequire");
    }
    /**
     * Value of soValidate attribute
     * @return {?} soValidate value
     */
    getSoValidate() {
        return this.getAttribute("soValidate");
    }
    /**
     * Value of soType attribute
     * @return {?} soType value
     */
    getSoType() {
        return this.getAttribute("soType");
    }
    /**
     * Value of soFormat attribute
     * @return {?} soFormat value
     */
    getSoFormat() {
        return this.getAttribute("soFormat");
    }
    /**
     * Value of soMin attribute
     * @return {?} soMin value
     */
    getSoMin() {
        return this.getAttribute("soMin");
    }
    /**
     * Value of soMax attribute
     * @return {?} soMax value
     */
    getSoMax() {
        return this.getAttribute("soMax");
    }
    /**
     * Value of soMaxLength attribute
     * @return {?} soMaxLength value
     */
    getSoMaxLength() {
        return this.getAttribute("soMaxLength");
    }
    /**
     * Value of soPattern attribute
     * @return {?} soPattern value
     */
    getSoPattern() {
        return this.getAttribute("soPattern");
    }
    /**
     * Value of soMaxByteLen attribute
     * @return {?} soMaxByteLen value
     */
    getSoMaxByteLen() {
        return this.getAttribute("soMaxByteLen");
    }
    /**
     * Set [[disabled]] property to opposite of input
     * @param {?} boo Value of enabled
     * @return {?}
     */
    setEnabled(boo) {
        if (typeof boo === 'string') {
            boo = boo === 'true' ? true : false;
        }
        this.setDisabled(!boo);
    }
    /**
     * Set value of [[sort]] property
     * @param {?} value Sort value to set
     * @return {?}
     */
    setSortValue(value) {
        this.sort = value;
    }
    /**
     * Get value of [[visible]] property
     * @return {?} Visble property value
     */
    getVisible() {
        return this.visible;
    }
    /**
     * Sets value of text attribute and marks component for change detection
     * @param {?} value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     * @return {?}
     */
    setText(value) {
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
    }
    /**
     * Set callback function for [[onCommand]]
     * @param {?} fn Function to be invoked for [[onCommand]] event
     * @return {?}
     */
    setOnCommand(fn) {
        this._internalOnCommand = fn;
    }
    /**
     * Set callback function for [[onActiveLost]]
     * @param {?} fn Function to be invoked for [[onActiveLost]] event
     * @return {?}
     */
    setOnActiveLost(fn) {
        this._internalOnActiveLost = fn;
    }
    /**
     * Set all attributes in one go
     *
     * @param {?} attrs
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    setAttributes(attrs, skipAttributeOverride = false) {
        this._tempFreezeCd = true;
        for (const attr of attrs) {
            this.setAttribute(attr.attributeName, attr.value, skipAttributeOverride);
        }
        this._tempFreezeCd = false;
        this.markForCheck();
    }
    /**
     * Set HTML attribute value on component
     * @param {?} attribute HTML attribute to set
     * @param {?} value Value of attribute
     * @param {?=} skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     * @return {?}
     */
    setAttribute(attribute, value, skipAttributeOverride = false) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const originalAttributeName = attribute;
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
                    let newAttributes = AppUtils.attributeOverrideValidate(value);
                    if (newAttributes != null) {
                        /** @type {?} */
                        const newCssClass = _.filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                        newAttributes = _.filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
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
                let newAttributes = AppUtils.attributeOverrideClass(value);
                if (newAttributes != null) {
                    /** @type {?} */
                    const newCssClass = _.filter(newAttributes, (attr) => attr.attributeName === AttributesEnum.CLASS).map((attr) => attr.value).join(" ");
                    newAttributes = _.filter(newAttributes, (attr) => attr.attributeName !== AttributesEnum.CLASS);
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
    }
    /**
     * Get value of HTML attribute
     * @param {?} attribute Name of HTML attribute to get
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?} Value of attribute
     */
    getAttribute(attribute, skipQueryDOMIfNotExists = false) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const attributeLower = attribute.toLowerCase();
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
                Logger.warn(`Attribute ${attribute} does not exists, trying to get from DOM`);
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
    }
    /**
     * Focus the HTML element of this component
     * @return {?}
     */
    requestFocus() {
        if (this.getElement() != null) {
            this.getElement().focus();
        }
    }
    /**
     * Focus the native HTML element of the component and mark for change detection
     * @return {?}
     */
    setFocus() {
        if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
            this.markForCheck();
        }
    }
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * \@event [[OnActiveLost]]
     * @return {?}
     */
    focusLost() {
        this.onActiveLost.emit();
        if (typeof this._internalOnActiveLost === 'function') {
            this._internalOnActiveLost(this);
        }
    }
    /**
     * Creates a unique id using an optional prefix
     * @param {?=} prefix String to append to beginning of ID
     * @return {?} Unique ID
     */
    static generateUniqueId(prefix = 'base') {
        return prefix + Date.now() + '_' + _.random(1, 1000) + _.random(1, 100);
    }
    /**
     * Adds child component to this component
     * @param {?} child Component to add as child
     * @return {?}
     */
    addChild(child) {
        if (child.id !== this.id) {
            /** @type {?} */
            const childKey = KeyUtils.toMapKey(child.id);
            if (this._children === null) {
                this._children = new Map();
            }
            if (this._childrenIndex === null) {
                this._childrenIndex = new Array();
            }
            this._children.set(childKey, child);
            this._childrenIndex.push(child.id);
            /** @type {?} */
            const parentView = this.getParentView();
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
    }
    /**
     * Get the native element of the component if a reference to it is defined
     * @return {?} The HTML native element or 'null' if reference is missing
     */
    getElement() {
        return this.elementRef ? this.elementRef.nativeElement : null;
    }
    /**
     * Get the text property value
     * @return {?} Text value
     */
    getText() {
        return this.text;
    }
    /**
     * Set CSS color style attribute and marks for change detection
     * @param {?} color CSS color string value. Should be hexadecimal or valid CSS color string
     * @return {?}
     */
    setColor(color) {
        if (color == null || color === "") {
            delete this.styles['color'];
        }
        else {
            this.styles['color'] = color;
        }
        this.markForCheck();
    }
    /**
     * Get the color style attribute value
     * @return {?} Color string. Hexadecimal or CSS color string
     */
    getColor() {
        return this.styles['color'];
    }
    /**
     * Set background color CSS style attribute value
     * @param {?} bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     * @return {?}
     */
    setBgColor(bgColor) {
        this.bgColor = bgColor;
        this.styles["background"] = bgColor;
        this.markForCheck();
    }
    /**
     * Sets font-weight style property to bold
     * @param {?} boo Switch for turning bold style on/off
     * @return {?}
     */
    setFontBold(boo) {
        this.fontBold = boo;
        if (boo === true || boo === "true") {
            this.styles["font-weight"] = "bold";
        }
        else {
            delete this.styles["font-weight"];
        }
        this.markForCheck();
    }
    /**
     * Sets CSS style attribute font-style to italic
     * @param {?} boo Switch for turning italic style on/off
     * @return {?}
     */
    setFontItalic(boo) {
        this.fontItalic = boo;
        if (boo === true || boo === "true") {
            this.styles["font-style"] = "italic";
        }
        else {
            delete this.styles["font-style"];
        }
    }
    /**
     * Sets CSS style attribute font-size
     * @param {?} size Number of pixels for font-size
     * @return {?}
     */
    setFontSize(size) {
        this.fontSize = size;
        this.styles["font-size"] = size + "px";
    }
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param {?} underline Switch for turning underline style on/off for text
     * @return {?}
     */
    setFontUnderline(underline) {
        this.fontUnderline = underline;
        if (this.fontUnderline === "true" || this.fontUnderline === true) {
            this.styles["text-decoration"] = "underline";
        }
        else {
            delete this.styles["text-decoration"];
        }
    }
    /**
     * Event handler that registers focus event
     * @param {?} event
     * @return {?}
     */
    handleFocus(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers click event
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers keydown event
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers keyup event
     * @param {?} event
     * @return {?}
     */
    handleKeyUp(event) {
        this.registerClientEvent(event);
    }
    /**
     * Event handler that registers mousedown event
     * @param {?} event
     * @return {?}
     */
    handleMouseDown(event) {
        this.registerClientEvent(event);
    }
    /**
     * Gets custom attribute by name if it exists
     * @param {?} attributeName Name of custom attribute
     * @return {?} Custom attribute if it exists, otherwise undefined
     */
    getCustomAttribute(attributeName) {
        if (this.customAttributes != null) {
            return this.customAttributes[attributeName];
        }
        return undefined;
    }
    /**
     * Set attribute on customAttribute object using name as key
     * @param {?} name key name of attribute
     * @param {?} value value to set for key/name
     * @return {?}
     */
    setCustomAttribute(name, value) {
        if (this.customAttributes == null) {
            this.customAttributes = {};
        }
        if (value != null) {
            this.customAttributes[name] = value + '';
        }
    }
    /**
     * Check if custom attribute exists
     * @param {?} id Key name of attribute
     * @return {?} True if custom attribute with name/key exists
     */
    hasCustomAttribute(id) {
        return this.customAttributes != null && this.customAttributes[id] != null;
    }
    /**
     * Get child component by index
     * @param {?} idx Index of child component
     * @return {?} Child [[BaseComponent]]
     */
    getChildAt(idx) {
        if (this._childrenIndex !== null) {
            if (this._childrenIndex.length > idx) {
                return this.getChild(this._childrenIndex[idx]);
            }
        }
        return null;
    }
    /**
     * Get the number of child components
     * @return {?} Number of children
     */
    getChildCount() {
        if (this._children !== null) {
            return this._children.size;
        }
        else {
            return 0;
        }
    }
    /**
     * Get index of child component if it exists
     * @param {?} child Child component
     * @return {?}
     */
    indexOfChild(child) {
        //TODO
        console.error("indexOfChild is not implemented");
        return -1;
    }
    /**
     * Insert child component to children array at location of index
     * @param {?} idx Index of insert location
     * @param {?} row
     * @return {?}
     */
    insertChildAt(idx, row) {
        //TODO
        console.error("insertChildAt is not implemented");
    }
    /**
     * TODO: Add documentation for emitInternalCommand
     * @return {?}
     */
    emitInternalOnCommand() {
        if (typeof this._internalOnCommand === 'function') {
            this._internalOnCommand(this);
            return true;
        }
        else if (typeof this._internalOnCommand === "string") {
            this.invokeMcoAction(this._internalOnCommand);
        }
        return false;
    }
    /**
     * Registers event handler for client event
     * @param {?} event Event to register
     * @return {?}
     */
    registerClientEvent(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        this.getSession().getEventHandler().setClientEvent(clientEvent);
    }
    /**
     * Get the native HTML element tag name
     * @return {?} Name of HTML element tag
     */
    getTagName() {
        return this.elementRef != null ? this.elementRef.nativeElement.tagName : '';
    }
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @return {?} Tag name
     */
    getLocalName() {
        return this.getTagName().toLowerCase().replace("vt-", "");
    }
    /**
     * Get the parent component if it exists
     * @return {?} Component or null if there is no parent
     */
    getParent() {
        return this.parent;
    }
    /**
     * Get value property if it exists, otherwise return 'null'
     * @return {?} Value or 'null'
     */
    getValue() {
        if (this["value"]) {
            return this["value"];
        }
        return null;
    }
    /**
     * Removes attribute name name
     * @param {?} attribute Attribute to remove
     * @return {?}
     */
    removeAttribute(attribute) {
        if (typeof attribute === 'string') {
            /** @type {?} */
            const attributeLower = attribute.toLowerCase();
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
                Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);
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
    }
    /**
     * Alias of [[setRequired]]
     * @param {?} boo
     * @return {?}
     */
    setRequire(boo) {
        this.setRequired(boo);
    }
    /**
     * Set [[required]] to true or false
     * @param {?} boo
     * @return {?}
     */
    setRequired(boo) {
        if (boo === 'true' || boo === true) {
            this.required = true;
        }
        else {
            this.required = false;
        }
        this.markForCheck();
    }
    /**
     * Set [[pattern]] value
     * @param {?} pattern
     * @return {?}
     */
    setPattern(pattern) {
        this.pattern = pattern;
        this.markForCheck();
    }
    /**
     * Set [[min]] value
     * @param {?} val
     * @return {?}
     */
    setMin(val) {
        this.min = val;
        this.markForCheck();
    }
    /**
     * Set [[max]] value
     * @param {?} val
     * @return {?}
     */
    setMax(val) {
        this.max = val;
        this.markForCheck();
    }
    /**
     * Get [[pattern]] value
     * @return {?} [[pattern]]
     */
    getPattern() {
        return this.pattern;
    }
    /**
     * Get [[min]] value
     * @return {?} [[min]]
     */
    getMin() {
        return this.min;
    }
    /**
     * Get [[max]] value
     * @return {?} [[max]]
     */
    getMax() {
        return this.max;
    }
    /**
     * Get [[inputLocale]] value
     * @return {?} [[inputLocale]]
     */
    getInputLocale() {
        return this.inputLocale;
    }
    /**
     * Set [[inputLocale]] value
     * @param {?} locale
     * @return {?}
     */
    setInputLocale(locale) {
        this.inputLocale = locale;
        this.markForCheck();
    }
    /**
     * Get [[inputCharsets]] value
     * @return {?} [[inputCharsets]]
     */
    getInputCharsets() {
        return this.inputCharsets;
    }
    /**
     * Set [[inputCharests]] value
     * @param {?} inputCharSets
     * @return {?}
     */
    setInputCharsets(inputCharSets) {
        this.inputCharsets = inputCharSets;
        this.markForCheck();
    }
    /**
     * Get [[id]] value
     * @return {?} [[id]]
     */
    getId() {
        return this.id;
    }
    /**
     * Set [[id]] value
     * @param {?} id
     * @return {?}
     */
    setId(id) {
        if (this.parent != null && this.parent.children.has(this.id)) {
            this.parent.children.delete(KeyUtils.toMapKey(this.id));
            this.parent.children.set(KeyUtils.toMapKey(id), this);
            if (this._childrenIndex !== null) {
                /** @type {?} */
                const idx = _.findIndex(this.parent._childrenIndex, (item) => item === this.id);
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
    }
    /**
     * Abstract method. Implemented by sub class components
     * @param {?} title
     * @return {?}
     */
    setTitle(title) {
        //impl. by sub class
    }
    /**
     * Set [[cssClass]] of component.
     * @param {?} css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     * @param {?=} skipAttributeOverride
     * @return {?}
     */
    setCssClass(css, skipAttributeOverride = false) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            const temp = css.split("\.");
            this.cssClass = temp.join("-");
            if (temp[0] === "") {
                this.cssClass = this.cssClass.substring(1);
            }
        }
        this.cssClass = css;
        this.checkNxStyling(skipAttributeOverride);
        this.markForCheck();
    }
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param {?} css CSS class name to add
     * @return {?}
     */
    addCssClass(css) {
        if (this._cssClass == null || this._cssClass === "") {
            this._cssClass = css;
        }
        else if (this._cssClass.indexOf(css) == -1) {
            this._cssClass = `${this._cssClass} ${css}`;
        }
        this.checkNxStyling();
        this.markForCheck();
    }
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param {?} css CSS class name to remove
     * @return {?}
     */
    removeCssClass(css) {
        if (this._cssClass != null)
            this._cssClass = this._cssClass.replace(css, '');
        this.checkNxStyling();
        this.markForCheck();
    }
    /**
     * Get the [[require]] property value
     * @return {?} Value of [[require]]
     */
    getRequired() {
        return this.require;
    }
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     * @return {?}
     */
    destroyComponent() {
        if (this.compRef != null) {
            this.compRef.destroy();
        }
        else if (this.elementRef != null) {
            (/** @type {?} */ (this.elementRef.nativeElement)).remove();
            this.ngOnDestroy();
            Logger.warn("Memory leak! Please use ngIf if you want to remove component!");
        }
    }
    /**
     * Gets JSON representation of the component
     * @return {?} JSON object
     */
    toJson() {
        /** @type {?} */
        const retVal = {};
        //get custom attributes binded to our tag
        if (this.elementRef != null && this.elementRef.nativeElement != null) {
            /** @type {?} */
            const el = this.elementRef.nativeElement;
            /** @type {?} */
            let attributes = null;
            if (typeof el.getAttributeNames === "function") {
                attributes = el.getAttributeNames();
            }
            else if (el.attributes) {
                attributes = [];
                for (let i = 0; i < el.attributes.length; i++) {
                    attributes.push(el.attributes[i].name);
                }
            }
            if (attributes != null) {
                _.forEach(attributes, (attributeName) => {
                    if (typeof AppUtils.validateAttribute === "function" && AppUtils.validateAttribute(attributeName)) {
                        this.setJson(retVal, attributeName, el.getAttribute(attributeName));
                    }
                });
            }
            else if (typeof AppUtils.setCustomAttribute === "function") {
                AppUtils.setCustomAttribute(retVal, el);
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
                    for (let id of this._childrenIndex) {
                        /** @type {?} */
                        const c = this.getChild(id);
                        //getChild can return null?
                        if (c != null) {
                            /** @type {?} */
                            const childJson = this.childToJson(c);
                            if (childJson != null) {
                                retVal["children"].push(childJson);
                            }
                        }
                    }
                }
            }
        }
        return retVal;
    }
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    childToJson(child) {
        return child.toJson();
    }
    /**
     * Gets JSON representation of [[customAttributes]]
     * @return {?} JSON Object
     */
    customAttributesToJson() {
        return BaseComponent.mapToJson(this.customAttributes);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    static mapToJson(map) {
        /** @type {?} */
        const customAttributes = {};
        if (map) {
            /** @type {?} */
            const keys = _.keys(map);
            for (let key of keys) {
                /** @type {?} */
                let value = map[key];
                if (typeof value !== "string" && value != null) {
                    value = value + "";
                }
                customAttributes[key] = value;
            }
        }
        return customAttributes;
    }
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @return {?} NxTagName as string
     */
    getNxTagName() {
        return "none";
    }
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param {?} json Object to add key to
     * @param {?} key Key to set
     * @param {?} value Value to set for key param
     * @return {?}
     */
    setJson(json, key, value) {
        if (key != null) {
            json[key] = this.toJsonValue(value);
        }
    }
    /**
     * Converts value to a valid JSON property string
     * @param {?} value Value to convert to string
     * @return {?} Value as a valid JSON property string
     */
    toJsonValue(value) {
        if (typeof value === 'string') {
            return value;
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            return value + '';
        }
        else {
            return value;
        }
    }
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     * @return {?}
     */
    resetId() {
        this.id = this._uniqueId;
    }
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @return {?} Value of [[checked]] property
     */
    getChecked() {
        return false;
    }
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    setChecked(boo) {
        // NO-OP
    }
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param {?} boo Toggle [[checked]] on/off
     * @return {?}
     */
    setSelected(boo) {
        // NO-OP
    }
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @return {?} Value of maxLength as integer if it's set, otherwise returns null
     */
    getMaxLength() {
        return this.maxLength == null ? -1 : JavaUtils.intValue(this.maxLength);
    }
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @return {?} Value of minLength as integer if it's set, otherwise returns null
     */
    getMinLength() {
        return this.minLength == null ? -1 : JavaUtils.intValue(this.minLength);
    }
    /**
     * Get a list of child components
     * @return {?} Child components
     */
    getChildren() {
        /** @type {?} */
        const children = new Vector();
        if (this._childrenIndex !== null) {
            for (let id of this._childrenIndex) {
                /** @type {?} */
                const c = this.getChild(id);
                if (c != null) {
                    children.add(c);
                }
            }
        }
        return children;
    }
    /**
     * Remove child component from list of children and remove children of child
     * @param {?} child Child component to remove
     * @return {?}
     */
    removeChild(child) {
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
                    this._childrenIndex = _.uniq(_.filter(this._childrenIndex, (item) => item !== child.id));
                }
            }
            /** @type {?} */
            const parentView = this.getParentView();
            //remove ourself from the view children map
            if (parentView != null && parentView._viewChildrenMap != null) {
                parentView._viewChildrenMap.delete(KeyUtils.toMapKey(child.getId()));
            }
            //move children of children
            if (child.removeAllChildren) {
                child.removeAllChildren();
            }
        }
    }
    /**
     * Removes child component by ID
     * @param {?} id Child [[id]]
     * @return {?}
     */
    removeChildById(id) {
        /** @type {?} */
        const child = this.getElementById(id);
        if (child != null) {
            this.removeChild(child);
        }
    }
    /**
     * Remove all child components
     * @return {?}
     */
    removeAllChildren() {
        if (this.children != null) {
            /** @type {?} */
            const cit = this.children.values();
            /** @type {?} */
            let cr = cit.next();
            while (cr.done !== true) {
                this.removeChild(cr.value);
                cr = cit.next();
            }
        }
        if (this.tabChildrenIds != null) {
            this.tabChildrenIds.forEach(cid => {
                this.removeChildById(cid);
            });
        }
    }
    /**
     * Finds the child component by ID. Deep search
     * @param {?} id Child component [[id]]
     * @return {?}
     */
    getElementById(id) {
        return this.findElementById(id);
    }
    /**
     * Check if a child component with id exists
     * @param {?} id Child component [id]
     * @return {?}
     */
    hasChild(id) {
        return this.findElementById(id) != null;
    }
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param {?} attr
     * @return {?}
     */
    setValidate(attr) {
        //TODO
        console.error("setValidate is not implemented");
    }
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param {?} type
     * @return {?}
     */
    setType(type) {
        //TODO
        console.error("setType is not implemented");
    }
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param {?} format
     * @return {?}
     */
    setFormat(format) {
        //TODO
        console.error("setFormat is not implemented");
    }
    /**
     * Set [[maxLength]] for input component
     * @param {?} maxLength Input max length property. Should be numeric string
     * @return {?}
     */
    setMaxLength(maxLength) {
        this.maxLength = maxLength;
        this.markForCheck();
    }
    /**
     * Set [[minLength]] for input component
     * @param {?} minLength Input max length property. Should be numeric string
     * @return {?}
     */
    setMinLength(minLength) {
        this.minLength = minLength;
        this.markForCheck();
    }
    /**
     * Set [[maxLength]] as byte length for input component
     * @param {?} bl Should be numeric string
     * @return {?}
     */
    setMaxByteLen(bl) {
        this.setMaxLength(bl);
    }
    /**
     * Abstract method. Set value of input component
     * @param {?} val Value to set
     * @return {?}
     */
    setValue(val) {
    }
    /**
     * Set focusable property value for component. Implement on sub class
     * @param {?} focusable Toggle focusable on/off
     * @return {?}
     */
    setFocusable(focusable) {
        //TODO
    }
    /**
     * Abstract. Select parent component tab. Implement on sub class
     * @return {?}
     */
    selectParentTab() {
        /**
         * @param {?} item
         * @return {?}
         */
        function findTabBelong(item) {
            if (item != null) {
                /** @type {?} */
                const parent = item.getParent();
                if (parent != null && parent.getLocalName() !== 'tab')
                    return findTabBelong(parent);
                return parent;
            }
        }
        /** @type {?} */
        const tab = /** @type {?} */ (findTabBelong(this.getElementById(this.id)));
        /**
         * @param {?} tab
         * @return {?}
         */
        function findTabPaneBelong(tab) {
            if (tab != null) {
                /** @type {?} */
                const parent = tab.getParent();
                if (parent != null && parent.getLocalName() !== 'tab-pane')
                    return findTabPaneBelong(parent);
                return parent;
            }
        }
        /** @type {?} */
        const tabPane = /** @type {?} */ (findTabPaneBelong(this.getElementById(this.id)));
        if (tab != null) {
            tabPane.setSelectedTab(tab.id);
        }
    }
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param {?} id element id to search
     * @return {?}
     */
    findElementById(id) {
        /** @type {?} */
        const mappedChildId = KeyUtils.toMapKey(id);
        /** @type {?} */
        let comp = null;
        //first check for cache
        // let comp: BaseComponent = UiDocument.getFromCache(mappedChildId);
        if (comp == null) {
            /** @type {?} */
            const radioGroup = this.getRadioButtonGroupComponent(id);
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
                    const parentView = this.getParentView();
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
    }
    /**
     * Get radio button group component by id
     * @param {?} id Radio button group ID
     * @return {?}
     */
    getRadioButtonGroupComponent(id) {
        if (id === (/** @type {?} */ (this)).group) {
            //radio button group
            return this;
        }
        else {
            /** @type {?} */
            const radioGroup = this.getRadioButtonGroup(id);
            if (radioGroup != null) {
                /** @type {?} */
                let retVal = radioGroup[0];
                for (let radio of radioGroup) {
                    if (radio.getChecked() === true) {
                        retVal = radio;
                        break;
                    }
                }
                return retVal;
            }
        }
        return null;
    }
    /**
     * Add change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    addAttributeChangeListener(listener) {
        if (this.attributeChangeListeners == null) {
            this.attributeChangeListeners = [];
        }
        listener._internalId = BaseComponent.generateUniqueId('listener');
        this.attributeChangeListeners.push(listener);
    }
    /**
     * Remove change listener on attributes
     * @param {?} listener
     * @return {?}
     */
    removeAttributeChangeListener(listener) {
        if (this.attributeChangeListeners != null) {
            this.attributeChangeListeners = _.filter(this.attributeChangeListeners, (item) => item._internalId !== listener._internalId);
        }
    }
    /**
     * Set attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @param {?} newValue
     * @return {?}
     */
    fireSetAttributeEvent(attributeName, newValue) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            const event = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), newValue, this);
            _.forEach(this.attributeChangeListeners, (listener) => {
                listener.onAttributeSet(event);
            });
        }
    }
    /**
     * Remove attribute and emit change event
     * \@event AttributeChangeEvent
     * @param {?} attributeName
     * @return {?}
     */
    fireRenoveAttributeEvent(attributeName) {
        if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
            /** @type {?} */
            const event = new AttributeChangeEvent(attributeName, this.getAttribute(attributeName), null, this);
            _.forEach(this.attributeChangeListeners, (listener) => {
                listener.onAttributeRemoved(event);
            });
        }
    }
    /**
     * Alias for static [[cleanCss]] method
     * @param {?} css
     * @return {?}
     */
    cleanCss(css) {
        return BaseComponent.cleanCss(css);
    }
    /**
     * Format css selectors. Remove dot
     * @param {?} css
     * @return {?} New CSS selector string
     */
    static cleanCss(css) {
        if (css != null && css.indexOf(".") >= 0) {
            //more than one style?
            if (css.indexOf(" ") > 0) {
                return _.map(css.split(" "), (item) => this.cleanCss(item)).join(" ");
            }
            else {
                //only one style
                return css.replace(/\./g, '-').replace(/^\-/, '');
            }
        }
        return css;
    }
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     * @return {?}
     */
    getChangeDetector() {
        //sub-class override
        return null;
    }
    /**
     * Mark component for change detection
     * @return {?}
     */
    markForCheck() {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().markForCheck();
            }
        }
    }
    /**
     * Invoke change detection on component
     * @return {?}
     */
    detectChanges() {
        if (this._tempFreezeCd !== true && this._isDying !== true) {
            if (this.getChangeDetector() != null) {
                this.getChangeDetector().detectChanges();
            }
        }
    }
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param {?=} heightStyleName
     * @param {?=} widthStyleName
     * @return {?}
     */
    initWidthHeightStyle(heightStyleName = 'height', widthStyleName = 'max-width') {
        if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
            this.styles["height"] = parseInt(this.controlHeight) + "px";
        }
        if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
            this.styles[widthStyleName] = parseInt(this.controlWidth) + "px";
        }
    }
    /**
     * Add a radio button component to this component
     * @param {?} radio
     * @return {?}
     */
    addRadioButtonGroup(radio) {
        //radio group need to be at ViewComponent level
        if (this.isView() !== true && this.getParent() != null) {
            return this.getParent().addRadioButtonGroup(radio);
        }
        if (this.radioButtonGroups == null) {
            this.radioButtonGroups = new Map();
        }
        /** @type {?} */
        let groupId = (/** @type {?} */ (radio)).group;
        if (this.radioButtonGroups.get(groupId) == null) {
            this.radioButtonGroups.set(groupId, [radio]);
        }
        else {
            this.radioButtonGroups.get(groupId).push(radio);
        }
        return;
    }
    /**
     * Get radio button group by group ID
     * @param {?} groupId
     * @return {?} Radio button group component
     */
    getRadioButtonGroup(groupId) {
        /** @type {?} */
        let view = this.getParentView();
        return view != null && view.radioButtonGroups != null ? view.radioButtonGroups.get(groupId) : null;
    }
    /**
     * Sets [[controlWidth]] property
     * @param {?} width Should be numeric value
     * @return {?}
     */
    setControlWidth(width) {
        this.controlWidth = width;
        this.initWidthHeightStyle();
        this.markForCheck();
    }
    /**
     * Sets [[controlHeight]] property
     * @param {?} height Should be numeric value
     * @return {?}
     */
    setControlHeight(height) {
        this.controlHeight = height;
        this.initWidthHeightStyle();
        this.markForCheck();
    }
    /**
     * Alias for [[setControlWidth]] method
     * @param {?} width Should be a numeric value
     * @return {?}
     */
    setWidth(width) {
        this.setControlWidth(width);
    }
    /**
     * Get [[controlWidth]] property
     * @return {?} Value of [[controlWidth]]
     */
    getWidth() {
        return this.controlWidth;
    }
    /**
     * Alias for [[setControlHeight]] method
     * @param {?} height Should be a numeric value
     * @return {?}
     */
    setHeight(height) {
        this.setControlHeight(height);
    }
    /**
     * Get [[controlHeight]] property
     * @return {?} Value of [[controlHeight]]
     */
    getHeight() {
        return this.controlHeight;
    }
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param {?} x Horizontal coordinate position
     * @return {?}
     */
    setX(x) {
        this.x = x;
        this.styles["left"] = x + "px";
        this.markForCheck();
    }
    /**
     * Get [[x]] property
     * @return {?} Value of [[x]]
     */
    getX() {
        return this.x;
    }
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param {?} y Vertical coordinate position
     * @return {?}
     */
    setY(y) {
        this.y = y;
        this.styles["top"] = y + "px";
        this.markForCheck();
    }
    /**
     * Get [[y]] property
     * @return {?} Value of [[y]]
     */
    getY() {
        return this.y;
    }
    /**
     * Set [[borderWidth]] property value
     * @param {?} borderWidth Should be numeric
     * @return {?}
     */
    setBorderWidth(borderWidth) {
        this.borderWidth = borderWidth;
        this.markForCheck();
    }
    /**
     * Check if component is view component.
     * Implement in sub class
     * @return {?}
     */
    isView() {
        return false;
    }
    /**
     * Check if there are active views.
     * Implement in sub class
     * @return {?}
     */
    isNoneActiveView() {
        return false;
    }
    /**
     * Check if this component is an instance of [[DialogComponent]]
     * @return {?}
     */
    isDialog() {
        return false;
    }
    /**
     * Check if this component is a dynamic view
     * @return {?}
     */
    isDynamicView() {
        return false;
    }
    /**
     * Get the parent view of this component
     * @return {?} Parent view component
     */
    getParentView() {
        if (this.isView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
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
    }
    /**
     * @return {?}
     */
    getParentScrollView() {
        if (this.isScrollView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
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
    }
    /**
     * @return {?}
     */
    isScrollView() {
        return false;
    }
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     * @return {?}
     */
    _getNoneActiveViewParent() {
        if (this.isNoneActiveView()) {
            return this;
        }
        /** @type {?} */
        let parentView = null;
        if (this.parent != null) {
            /** @type {?} */
            let stack = [this.parent];
            while (stack.length > 0) {
                /** @type {?} */
                const temp = stack.pop();
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
    }
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param {?} event Click event
     * @param {?=} force always emit
     * @return {?}
     */
    handleOnContextMenu(event, force = false) {
        //allow component to skip emit event and let parent (i.e. table cell to emit it)
        if (force === true || this.skipEmitContextMenuEvent !== true) {
            if (this.getSession() != null) {
                this.getSession().setMousePosition(event);
            }
            /** @type {?} */
            const parentView = this.getParentView();
            /** @type {?} */
            let popupMenuId = null;
            if (parentView != null) {
                popupMenuId = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
            }
            this.onContextMenu.emit(event);
            if (this.popup != null && this.popup !== "") {
                if (this.popup.indexOf("#") === 0) {
                    this.popup = this.popup.substring(1);
                }
                popupMenuId = this.popup;
                this.getSession()._currentPopupMenuId = this.popup;
            }
            if (popupMenuId != null) {
                event.stopPropagation();
                event.preventDefault();
                /** @type {?} */
                const tm = setTimeout(() => {
                    clearTimeout(tm);
                    if (this.getSession()._currentPopupMenuId != null) {
                        popupMenuId = this.getSession()._currentPopupMenuId;
                    }
                    this.getSession().showContextMenu(popupMenuId);
                    this.getSession()._currentPopupMenuId = null;
                });
            }
        }
    }
    /**
     * Emits focus lost event for components that require validation
     * \@event BeforeActiveLost
     * @param {?} event
     * @return {?}
     */
    validateField(event) {
        if (AppUtils.validateField != null && AppUtils.validateField(this) !== true) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.onBeforeActiveLost.emit();
        this.focusLost();
    }
    /**
     * Get children of a table component.
     * @return {?} Array of table children
     */
    getTableChildren() {
        return [];
    }
    /**
     * Get [[bgColor]] property
     * @return {?} Value of [[bgColor]]
     */
    getBgColor() {
        return this.bgColor;
    }
    /**
     * @return {?}
     */
    setAttributeFromDef() {
        /** @type {?} */
        const compDef = this.getSession().getDef(this.id);
        if (compDef != null && compDef.attribute != null) {
            if (compDef.attribute instanceof Map ||
                compDef.attribute instanceof Hashtable ||
                compDef.attribute instanceof HashMap) {
                /** @type {?} */
                const keys = compDef.attribute.keys();
                /** @type {?} */
                let key = keys.next();
                while (key.done !== true) {
                    this.setAttribute(key.value, compDef.attribute.get(key));
                    key = keys.next();
                }
            }
            else {
                /** @type {?} */
                const keys = _.keys(compDef.attribute);
                for (let key of keys) {
                    this.setAttribute(key, compDef.attribute[key]);
                }
            }
        }
    }
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * \@warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param {?} xpathExpression
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        return null;
    }
    /**
     * Set color of hightlighted text background
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    setHighlightBgColor(color) {
        this.highlightBgColor = color;
    }
    /**
     * Set color of highlighted text foreground
     * @param {?} color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     * @return {?}
     */
    setHighlightFontColor(color) {
        this.highlightFontColor = color;
    }
    /**
     * Get [[hightlightBgColor]] property
     * @return {?} Color string
     */
    getHighlightBgColor() {
        return this.highlightBgColor;
    }
    /**
     * Get [[highlightFontColor]] property
     * @return {?} Color string
     */
    getHighlightFontColor() {
        return this.highlightFontColor;
    }
    /**
     * Get [[parentTableRow]] property
     * @return {?}
     */
    getParentTableRow() {
        return this.parentTableRow;
    }
    /**
     * Check if change detection is frozen
     * @return {?} Boolean If component change detection is frozen
     */
    isChangeDetectionFrozen() {
        return false;
    }
    /**
     * Check if component is a faux element
     * @return {?} Boolean If component is faux element
     */
    isFauxElement() {
        return false;
    }
    /**
     * Get internal [[_viewChildrenMap]] member
     * @return {?} Value of [[_viewChildrenMap]]
     */
    getViewChildrenMap() {
        return this._viewChildrenMap;
    }
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param {?} id ID of child to remove
     * @return {?}
     */
    removeViewChildFromMap(id) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.delete(KeyUtils.toMapKey(id));
        }
    }
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param {?} obj Child to add to [[_viewChildrenMap]]
     * @return {?}
     */
    addViewChildToMap(obj) {
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.set(KeyUtils.toMapKey(obj.getId()), /** @type {?} */ (obj));
        }
    }
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param {?} action Name of action method to invoke or a function to invoke
     * @return {?}
     */
    invokeMcoAction(action) {
        if (typeof action === "function") {
            action(this);
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            const mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
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
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    _notifyInternalChangeCb() {
        if (typeof this._internalChangeCb === "function") {
            this._internalChangeCb(this);
        }
    }
    /**
     * @return {?}
     */
    emptyChildren() {
        if (this._viewChildrenMap != null) {
            /** @type {?} */
            const cit = this._viewChildrenMap.values();
            /** @type {?} */
            let val = cit.next();
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
    }
    /**
     * Check to see if this is a ScrollPaneComponent
     * @return {?}
     */
    isScrollPane() {
        return false;
    }
    /**
     * Reset the scroll position to the previous captured
     * @return {?}
     */
    resetScrollTopToPreviousPosition() {
        //implement by scrollpane
    }
    /**
     * Reset all scrollpane pos
     * @return {?}
     */
    resetAllScrollPanesPositionToPrevious() {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopToPreviousPosition());
        }
    }
    /**
     * @return {?}
     */
    resetScrollTopPosition() {
    }
    /**
     * @return {?}
     */
    resetAllScrollPanesPositionToTop() {
        if (this.scrollPanes != null) {
            this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopPosition());
        }
    }
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     * @return {?}
     */
    notifyParentOfError() {
        if (this.getDisabled() === true) {
            /** @type {?} */
            const parentView = this.getParentView();
            if (parentView != null && parentView["dialog"] != null) {
                if (parentView["dialog"]._disabledErrorElementId == null) {
                    parentView["dialog"]._disabledErrorElementId = [];
                }
                if (parentView["dialog"]._disabledErrorElementId.indexOf(this.getId()) < 0) {
                    parentView["dialog"]._disabledErrorElementId.push(this.getId());
                }
            }
        }
    }
    /**
     * Focus the parent tab
     * @return {?}
     */
    focusParentTab() {
        /** @type {?} */
        const parentView = this._getNoneActiveViewParent() || this.getParentView();
        if (parentView != null) {
            /** @type {?} */
            const tabPane = parentView.getParent();
            //check to see if the parent is a Tab
            if (tabPane != null && tabPane.getNxTagName() === "tab") {
                tabPane.setFocus();
            }
        }
    }
    /**
     * Register scrollpane
     *
     * @param {?} scrollPane scrollPane to register
     * @return {?}
     */
    registerScrollPane(scrollPane) {
        if (typeof scrollPane.isScrollPane === "function" && scrollPane.isScrollPane() === true) {
            if (this.scrollPanes == null) {
                this.scrollPanes = [];
            }
            this.scrollPanes.push(scrollPane);
        }
    }
}
BaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-base',
                template: 'nothing here'
            }] }
];
/** @nocollapse */
BaseComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2Jhc2UvYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBaUIsS0FBSyxFQUFhLFVBQVUsRUFBMkMsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckwsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7O0FBY2xDLE1BQU07Ozs7Ozs7Ozs7SUEyTUosWUFBOEMsTUFBcUIsRUFBVSxjQUE4QixFQUFZLFVBQXNCLEVBQVksUUFBbUI7UUFBOUgsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FB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TCxLQUFLO3NCQVdMLEtBQUs7d0JBYUwsS0FBSzsrQkFTTCxLQUFLO3VCQUdMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztnQ0FDTCxLQUFLO3NCQUNMLEtBQUs7MEJBR0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzt1Q0FHTCxLQUFLOzRCQUdMLE1BQU07MkJBQ04sTUFBTTtpQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgU2tpcFNlbGYsIEFmdGVyVmlld0luaXQsIElucHV0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSBcIi4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gXCIuL2tleS11dGlsc1wiO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tIFwiLi9hdHRyaWJ1dGVzLmVudW1cIjtcbmltcG9ydCB7IEphdmFVdGlscyB9IGZyb20gXCIuLi9qYXZhL2phdmEtdXRpbHNcIjtcbmltcG9ydCB7IENsaWVudEV2ZW50IH0gZnJvbSBcIi4uL2V2ZW50LWhhbmRsZXIvY2xpZW50LWV2ZW50XCI7XG5pbXBvcnQgeyBCb3JkZXJQb3NpdGlvbiB9IGZyb20gXCIuL3N0eWxlLWxpdGVyYWxzXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vamF2YS92ZWN0b3JcIjtcbmltcG9ydCB7IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSBcIi4vYXR0cmlidXRlLWNoYW5nZS1saXN0ZW5lclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlQ2hhbmdlRXZlbnQgfSBmcm9tIFwiLi9hdHRyaWJ1dGUtY2hhbmdlLWV2ZW50XCI7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gXCIuL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgSGFzaHRhYmxlIH0gZnJvbSBcIi4uL2phdmEvaGFzaHRhYmxlXCI7XG5pbXBvcnQgeyBIYXNoTWFwIH0gZnJvbSBcIi4uL2phdmEvaGFzaC1tYXBcIjtcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi4vdmlldy92aWV3LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBIVE1MRWxlbWVudFdyYXBwZXIgfSBmcm9tIFwiLi4vdHJlZS10YWJsZS9odG1sLWVsZW1lbnQtd3JhcHBlclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlTmFtZVZhbHVlIH0gZnJvbSBcIi4vYXR0cmlidXRlLW5hbWUtdmFsdWVcIjtcbmltcG9ydCB7IFRydXN0ZWRTdHlsZVN0cmluZyB9IGZyb20gXCJAYW5ndWxhci9jb3JlL3NyYy9zYW5pdGl6YXRpb24vYnlwYXNzXCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLXBhbmUvdGFiL3RhYi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRhYlBhbmVDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLXBhbmUvdGFiLXBhbmUuY29tcG9uZW50XCI7XG5cbi8qKlxuICogTWFpbiBjbGFzcyB0aGF0IGFsbCBjb3JlIGNvbXBvbmVudHMgc2hvdWxkIGluaGVyaXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LWJhc2UnLFxuICB0ZW1wbGF0ZTogJ25vdGhpbmcgaGVyZSdcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgYXV0b1dyYXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvcmRlclBvc2l0aW9uOiBCb3JkZXJQb3NpdGlvbjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc29ydDogc3RyaW5nID0gXCJcIjtcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9IFwiXCI7XG4gIEBJbnB1dCgpIHNldCBjc3NDbGFzcyhjc3M6IHN0cmluZykge1xuICAgIHRoaXMuX2Nzc0NsYXNzID0gdGhpcy5jbGVhbkNzcyhjc3MpO1xuICAgIHRoaXMuaW5pdEJvcmRlckxheW91dCgpO1xuICB9XG5cbiAgQElucHV0KCkgY29udHJvbFdpZHRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRyb2xIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luUmlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luTGVmdDogc3RyaW5nO1xuICBASW5wdXQoKSBtYXJnaW5Ub3A6IHN0cmluZztcbiAgQElucHV0KCkgbWFyZ2luQm90dG9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRyb2xNYXJnaW46IHN0cmluZztcbiAgQElucHV0KCkgY29udHJvbFBhZGRpbmc6IHN0cmluZztcbiAgQElucHV0KCkgY29udHJvbE92ZXJmbG93OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhbmVsV2lkdGg6IHN0cmluZztcbiAgQElucHV0KCkgcGFuZWxNaW5XaWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwYW5lbE1pbkhlaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBjb250cm9sRmxvYXQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcGF0dGVybjogc3RyaW5nO1xuICBASW5wdXQoKSBtaW46IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgbWF4OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRMb2NhbGU6IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRDaGFyc2V0czogc3RyaW5nO1xuICBASW5wdXQoKSBmb2N1c09uQWN0aXZhdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgb3JkZXJJbmRleDogbnVtYmVyID0gLTE7XG4gIEBJbnB1dCgpIHg6IHN0cmluZztcbiAgQElucHV0KCkgeTogc3RyaW5nO1xuICBASW5wdXQoKSBzZXQgcmVxdWlyZShyZXE6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJlcXVpcmVkID0gcmVxO1xuICB9XG4gIEBJbnB1dCgpIGNvbnRyb2xXaWR0aENvbWJvQm94OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIGZvciBbW3JlcXVpcmVkXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCByZXF1aXJlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVpcmVkO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLy9hZGQgdG8gcHJldmVudCBjb25mdXNpb25cbiAgQElucHV0KCkgY2xhc3MoY3NzOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNzc0NsYXNzID0gY3NzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIGZvciBbW2Nzc0NsYXNzXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCBjc3NDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jc3NDbGFzcztcbiAgfVxuXG4gIC8vVE9ETyBuZWVkIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGVzZSBkb1xuICBASW5wdXQoKSBoR3JhYlNwYWNlOiBib29sZWFuO1xuICBASW5wdXQoKSB2R3JhYlNwYWNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGJnQ29sb3I6IHN0cmluZztcblxuICAvL3VzZSBieSA8ZGVmcyAuLi4uPlxuICAvL2UuZy4gPHZ0LWNvbWJvLWJveCBpZD1cImZvb1wiIGVkaXRvcj1cIiNmb29CYXJcIiAuLi4+XG4gIEBJbnB1dCgpIGVkaXRvcjogc3RyaW5nO1xuXG4gIC8vcG9wdXAgbWVudSBpZCB0aGF0IHNob3VsZCBwb3Agd2hlbiB0aGlzIGNvbXAgaXMgcmlnaHQgY2xpY2sgKGlmIHRoZXJlIGlzIGFueSlcbiAgQElucHV0KCkgcG9wdXA6IHN0cmluZztcblxuICAvKipcbiAgICogQWxpZ24gaG9yaXpvbnRhbGx5PyBUT0RPIG5lZWQgaXMgYSBtYWpvciByZWdyZXNzaW9uIHRlc3RcbiAgICovXG4gIEBJbnB1dCgpIGFsaWduSG9yaXpvbnRhbDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2Nzc0NsYXNzOiBzdHJpbmc7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgY29tcFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJpdmF0ZSBfdGVtcEZyZWV6ZUNkOiBib29sZWFuO1xuXG4gIC8vYWxpYXMgZm9yIGRpc2FibGVkXG4gIEBJbnB1dCgpIHNldCBlbmFibGVkKGJvbzogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgYm9vID09PSAnc3RyaW5nJykge1xuICAgICAgLy9pZiBlbmFibGVkIGlzIGZhbHNlLCBkaXNhYmxlZCBpcyB0cnVlXG4gICAgICB0aGlzLmRpc2FibGVkID0gYm9vID09PSAndHJ1ZScgPyBmYWxzZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSAhYm9vO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzb3J0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc29ydCA9IHZhbHVlXG4gIH1cblxuICBnZXQgc29ydFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc29ydDtcbiAgfVxuXG4gIC8vbG9va3MgbGlrZSBOZXhhd2ViIHN1cHBvcnQgY3VzdG9tIGF0dHJpYnV0ZXMga2V5L3ZhbHVlXG4gIEBJbnB1dCgpIGN1c3RvbUF0dHJpYnV0ZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuXG4gIC8vZm9udFxuICBASW5wdXQoKSBmb250Qm9sZDogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZm9udENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRJdGFsaWM6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZvbnRVbmRlcmxpbmU6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRDb2xvckRpc2FibGVkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wYWNpdHk6IHN0cmluZztcblxuICAvL2JvcmRlclxuICBASW5wdXQoKSBib3JkZXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJXaWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJTdHlsZTogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJIZWlnaHQ6IG51bWJlciB8IHN0cmluZztcblxuICAvL3NraXAgZW1pdGluZyBjb250ZXh0IG1lbnUgZXZlbnRcbiAgQElucHV0KCkgc2tpcEVtaXRDb250ZXh0TWVudUV2ZW50OiBib29sZWFuO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBvbkFjdGl2ZUxvc3Q6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9uQmVmb3JlQWN0aXZlTG9zdDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHN0eWxlczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAvL2ZvciB0YWJsZSB1c2VcbiAgdGFibGVSb3dObzogbnVtYmVyO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkOiBzdHJpbmc7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFRoaXMgaXMgZm9yIHVzZSB3aGVuIHNldEF0dHJpYnV0ZShvbkNvbW1hbmQgaXMgc2V0KVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbnRlcm5hbE9uQ29tbWFuZDogKHBhcmFtPzogYW55KSA9PiB2b2lkO1xuICBwcm90ZWN0ZWQgX2ludGVybmFsT25BY3RpdmVMb3N0OiAocGFyYW0/OiBhbnkpID0+IHZvaWQ7XG5cbiAgLy9pbnRlcm5hbCB1c2Ugb25seSwgZG8gbm90IHVzZSBleHRlcm5hbGx5XG4gIF9pbnRlcm5hbENoYW5nZUNiOiAoY29tcDogQmFzZUNvbXBvbmVudCkgPT4gdm9pZDtcblxuICBnZXQgdW5pcXVlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoaWxkcmVuOiBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PiA9IG51bGw7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJvdGVjdGVkIF9jaGlsZHJlbkluZGV4OiBBcnJheTxzdHJpbmc+ID0gbnVsbDtcblxuICBnZXQgY2hpbGRyZW4oKTogTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHByaXZhdGUgYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzOiBBcnJheTxBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcj47XG5cbiAgcHJpdmF0ZSByYWRpb0J1dHRvbkdyb3VwczogTWFwPHN0cmluZywgQXJyYXk8QmFzZUNvbXBvbmVudD4+O1xuXG4gIGhpZ2hsaWdodEJnQ29sb3I6IHN0cmluZztcbiAgaGlnaGxpZ2h0Rm9udENvbG9yOiBzdHJpbmc7XG5cbiAgcGFyZW50VGFibGVSb3c6IGFueTtcblxuICAvL2NhY2hlIHJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlXG4gIC8vIHByaXZhdGUgX3JlZHVjZUNoaWxkcmVuSXRlcmF0aXZlQ2FjaGU6IEFycmF5PEJhc2VDb21wb25lbnQ+O1xuXG4gIC8vdHJhY2sgYWxsIGNoaWxkcmVuIGZvciB0aGUgdmlld1xuICBwcm90ZWN0ZWQgX3ZpZXdDaGlsZHJlbk1hcDogTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD47XG5cbiAgLy9mb3IgVGFiQ29tcG9uZW50XG4gIHByb3RlY3RlZCB0YWJDaGlsZHJlbklkczogQXJyYXk8c3RyaW5nPjtcblxuICBwcml2YXRlIHNjcm9sbFBhbmVzOiBBcnJheTxCYXNlQ29tcG9uZW50PjtcblxuICBfaXNEeWluZzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igd2hlcmUgaXQgcmVxdWlyZWQgbWluaW1hbCBpbmplY3Rpb24gaW4gb3JkZXIgZm9yIHRoaXMgY2xhc3MgdG8gZnVuY3Rpb24gcHJvcGVybHkuIFN1YmNsYXNzIGNhbiBvdmVybG9hZCB0aGlzIGNvbnN0cnVjdG9yXG4gICAqIGJ1dCBpdCBtdXN0IHByb3ZpZGVkIHRoZSBtaW5pbWFsIHJlcXVpcmVkIGl0ZW1zIHRvIGJlIGluamVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IFRoZSBjb21wb25lbnQgd2hlcmUgdGhpcyBjb21wb25lbnQgd2lsbCBiZSB1c2VkLiBUaGlzIGluamVjdGlvbiBpcyBwcm92aWRlZCBieSBBbmd1bGFyIGlmIHRoZSBwYXJlbnQgY29tcG9uZW50IFwicHJvdmlkZVwiIGl0c2VsZi5cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIFNlc3Npb25TZXJ2aWNlIG5lZWRlZCBieSB0aGlzIGNsYXNzLCB0aGlzIHNob3VsZCBiZSBpbmplY3RlZCBieSBBbmd1bGFyLlxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiB0aGUgZWxlbWVudCByZWZlcmVuY2UgdGhhdCB3cmFwIHRoZSBlbGVtZW50ICh0YWcpIG9mIHRoaXMgY29tcG9uZW50LlxuICAgKiBAcGFyYW0gcmVuZGVyZXIgVGhlIHJlbmRlcmVyIChpbmplY3RlZCBieSBBbmd1bGFyKSB0aGF0IHdlIHVzZWQgdG8gcGVyZm9ybSBET00gbWFuaXB1bGF0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJvdGVjdGVkIHBhcmVudDogQmFzZUNvbXBvbmVudCwgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX3VuaXF1ZUlkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKCk7XG5cbiAgICAvL2luaXRpYWwgaWRcbiAgICB0aGlzLmlkID0gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR290IGNhbGwgd2hlbiB0aGlzIGNvbXBvbmVudCBmaW5pc2hlZCBpbml0aWFsaXppbmcsIGlmIHlvdSBvdmVycmlkZSB0aGlzLCBtYWtlIHN1cmUgdG8gY2FsbCBzdXBlci5uZ0FmdGVyVmlld0luaXQoKVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGlsZHJlbkluZGV4ID0gXy51bmlxKHRoaXMuX2NoaWxkcmVuSW5kZXgpO1xuXG4gICAgLy9jb21tbmV0IG91dCwgY2F1c2luZyByZWdyZXNzaW9uIGIvYyB0aGUgY3NzIHNlbGVjdG9yIG5lZWQgaWQgb2YgcGFyZW50IHdpbmRvd1xuICAgIC8vIGlmICh0aGlzLnJlbmRlcmVyICE9IG51bGwgJiYgdHlwZW9mIHRoaXMucmVuZGVyZXJbXCJyZW1vdmVBdHRyaWJ1dGVcIl0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFwiaWRcIik7XG4gICAgLy8gfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEluaXQgbGlmZSBjeWNsZSBvZiB0aGlzIGNsYXNzLCBpZiB5b3Ugb3ZlcnJpZGUgdGhpcywgbWFrZSBzdXJlIHRvIGNhbGwgc3VwZXIubmdPbkluaXQoKVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0Qm9yZGVyTGF5b3V0KCk7XG5cbiAgICBpZiAodGhpcy5mb250Qm9sZCA9PT0gdHJ1ZSB8fCB0aGlzLmZvbnRCb2xkID09PSBcInRydWVcIikge1xuICAgICAgdGhpcy5zZXRGb250Qm9sZCh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250SXRhbGljID09PSB0cnVlIHx8IHRoaXMuZm9udEl0YWxpYyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgICB0aGlzLnNldEZvbnRJdGFsaWModHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9udFNpemUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRGb250U2l6ZSh0aGlzLmZvbnRTaXplKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250VW5kZXJsaW5lID09PSB0cnVlIHx8IHRoaXMuZm9udFVuZGVybGluZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc2V0Rm9udFVuZGVybGluZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb250Q29sb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLmZvbnRDb2xvcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1dyYXAgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wid2hpdGUtc3BhY2VcIl0gPSBcIm5vcm1hbFwiO1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1dyYXAgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcIndoaXRlLXNwYWNlXCJdID0gXCJub3dyYXBcIjtcbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja054U3R5bGluZygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcHJpdmF0ZSBjaGVja054U3R5bGluZyhza2lwQXR0cmlidXRlT3ZlcnJpZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChza2lwQXR0cmlidXRlT3ZlcnJpZGUgIT09IHRydWUgJiYgdGhpcy5fY3NzQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLl9jc3NDbGFzcy5sZW5ndGggPiAwICYmIHR5cGVvZiBBcHBVdGlscy5hdHRyaWJ1dGVPdmVycmlkZUNsYXNzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyh0aGlzLl9jc3NDbGFzcyk7XG5cbiAgICAgIGlmIChuZXdBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgLy8gY2xhc3Mg44Gr6Zai44GX44Gm44Gv44CB5pei5a2Y44Gu5oyH5a6a44Go44Oe44O844K4XG4gICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICBuZXdBdHRyaWJ1dGVzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lICE9PSBBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICAgIFxuICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IEF0dHJpYnV0ZXNFbnVtLkNMQVNTLFxuICAgICAgICAgIHZhbHVlOiAodGhpcy5fY3NzQ2xhc3MgKyBcIiBcIiArIG5ld0Nzc0NsYXNzKS50cmltKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhuZXdBdHRyaWJ1dGVzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50UmVmICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IF92YWxpZGF0ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShcInZhbGlkYXRlXCIpO1xuXG4gICAgICBpZiAoc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIF92YWxpZGF0ZSAhPSBudWxsICYmIF92YWxpZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZShfdmFsaWRhdGUpO1xuXG4gICAgICAgIGlmIChuZXdBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBjbGFzcyDjgavplqLjgZfjgabjga/jgIHml6LlrZjjga7mjIflrprjgajjg57jg7zjgrhcbiAgICAgICAgICBjb25zdCBuZXdDc3NDbGFzcyA9IF8uZmlsdGVyKG5ld0F0dHJpYnV0ZXMsIChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIuYXR0cmlidXRlTmFtZSA9PT0gQXR0cmlidXRlc0VudW0uQ0xBU1MpLm1hcCgoYXR0cjogQXR0cmlidXRlTmFtZVZhbHVlKSA9PiBhdHRyLnZhbHVlKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lICE9PSBBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICAgICAgXG4gICAgICAgICAgbmV3QXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IEF0dHJpYnV0ZXNFbnVtLkNMQVNTLFxuICAgICAgICAgICAgdmFsdWU6ICh0aGlzLl9jc3NDbGFzcyArIFwiIFwiICsgbmV3Q3NzQ2xhc3MpLnRyaW0oKSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhuZXdBdHRyaWJ1dGVzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGJvcmRlciBDU1MgYmFzZWQgb24gYm9yZGVyUG9zaXRpb24gdmFsdWUgKHRvcCB8IGxlZnQgfCBib3R0b20gfCByaWdodClcbiAgICovXG4gIHByaXZhdGUgaW5pdEJvcmRlckxheW91dCgpIHtcbiAgICBpZiAodGhpcy5ib3JkZXJQb3NpdGlvbiAhPSBudWxsICYmIHRoaXMuYm9yZGVyUG9zaXRpb24gIT0gJycpIHtcbiAgICAgIGlmICh0aGlzLl9jc3NDbGFzcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzID0gdGhpcy5fY3NzQ2xhc3MgKyAnIGJvcmRlci0nICsgdGhpcy5ib3JkZXJQb3NpdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzID0gJ2JvcmRlci0nICsgdGhpcy5ib3JkZXJQb3NpdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIENsZWFyIGNvbXBvbmVudCByZWZlcmVuY2VzIGFuZCBjYWNoZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5faXNEeWluZyA9IHRydWU7XG5cbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAvL3JlbW92ZSBvdXJzZWxmIGZyb20gdGhlIHZpZXcgY2hpbGRyZW4gbWFwXG4gICAgICBpZiAocGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleSh0aGlzLmdldElkKCkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnRlcm5hbENoYW5nZUNiID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92aWV3Q2hpbGRyZW5NYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hpbGRyZW5JbmRleCA9IG51bGw7XG4gICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgPSBudWxsO1xuICAgIHRoaXMucmFkaW9CdXR0b25Hcm91cHMgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IG51bGw7XG4gICAgdGhpcy5zY3JvbGxQYW5lcyA9IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYW51cCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW1Nlc3Npb25TZXJ2aWNlXV0gaW5zdGFuY2UgaW5qZWN0ZWQgdmlhIGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm5zIFNlc3Npb25TZXJ2aWNlIGluc3RhbmNlXG4gICAqL1xuICBnZXRTZXNzaW9uKCk6IFNlc3Npb25TZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uU2VydmljZTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgY29tcG9uZW50IGJ5IGlkXG4gICAqIEBwYXJhbSBpZCBDb21wb25lbnQgSURcbiAgICogQHJldHVybnMgQ2hpbGQgW1tCYXNlQ29tcG9uZW50XV1cbiAgICovXG4gIGdldENoaWxkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5nZXQoS2V5VXRpbHMudG9NYXBLZXkoaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgZGlzYWJsZWQgcHJvcGVydHlcbiAgICovXG4gIHNldERpc2FibGVkKGJvbzogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBib287XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgW1t2aXNpYmxlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgdmlzaWJsZSBwcm9wZXJ0eVxuICAgKi9cbiAgc2V0VmlzaWJsZShib286IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc2libGUgPSBib287XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldFNjcm9sbFBvc1ZlcnRpY2FsKGV4cHJlc3Npb24pIHtcbiAgICAvL1RPRE9cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY29sb3Igb2YgdGV4dCBvbiB0aGUgY29tcG9uZW50XG4gICAqIEBwYXJhbSB2YWx1ZSBDb2xvciBzdHJpbmcuIFNob3VsZCBiZSBoZXhhZGVjaW1hbCBvciBjb2xvciBuYW1lIHN1cHBvcnRlZCBieSBDU1NcbiAgICovXG4gIHNldEZvbnRDb2xvcih2YWx1ZSkge1xuICAgIHRoaXMuc2V0Q29sb3IodmFsdWUpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFZhbHVlIG9mIFtbZGlzYWJsZWRdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBkaXNhYmxlZFxuICAgKi9cbiAgZ2V0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2Ygb3Bwb3NpdGUgb2YgW1tkaXNhYmxlZF1dIHZhbHVlXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIGVuYWJsZWRcbiAgICovXG4gIGdldEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmdldERpc2FibGVkKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29Db2x1bW5ObyBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgQ29sdW1uIG51bWJlclxuICAgKi9cbiAgZ2V0U29Db2x1bW5ObygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvQ29sdW1uTm9cIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgcmVmIHN0cmluZyB2YWx1ZSBmcm9tIFtbZWRpdG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgUmVmIG9mIGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0RWRpdG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbHVlIG9mIHNvUmVxdWlyZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29SZXF1aXJlIHZhbHVlXG4gICAqL1xuICBnZXRTb1JlcXVpcmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzb1JlcXVpcmVcIik7XG4gIH1cblxuICAvKipcbiAgICogVmFsdWUgb2Ygc29WYWxpZGF0ZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29WYWxpZGF0ZSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29WYWxpZGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvVmFsaWRhdGVcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29UeXBlIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb1R5cGUgdmFsdWVcbiAgICovXG4gIGdldFNvVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvVHlwZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb0Zvcm1hdCBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29Gb3JtYXQgdmFsdWVcbiAgICovXG4gIGdldFNvRm9ybWF0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29Gb3JtYXRcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29NaW4gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHNvTWluIHZhbHVlXG4gICAqL1xuICBnZXRTb01pbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvTWluXCIpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFZhbHVlIG9mIHNvTWF4IGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb01heCB2YWx1ZVxuICAgKi9cbiAgZ2V0U29NYXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzb01heFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb01heExlbmd0aCBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgc29NYXhMZW5ndGggdmFsdWVcbiAgICovXG4gIGdldFNvTWF4TGVuZ3RoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29NYXhMZW5ndGhcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogVmFsdWUgb2Ygc29QYXR0ZXJuIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBzb1BhdHRlcm4gdmFsdWVcbiAgICovXG4gIGdldFNvUGF0dGVybigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNvUGF0dGVyblwiKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBWYWx1ZSBvZiBzb01heEJ5dGVMZW4gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHNvTWF4Qnl0ZUxlbiB2YWx1ZVxuICAgKi9cbiAgZ2V0U29NYXhCeXRlTGVuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwic29NYXhCeXRlTGVuXCIpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdG8gb3Bwb3NpdGUgb2YgaW5wdXRcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBvZiBlbmFibGVkXG4gICAqL1xuICBzZXRFbmFibGVkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgYm9vID09PSAnc3RyaW5nJykge1xuICAgICAgYm9vID0gYm9vID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuc2V0RGlzYWJsZWQoIWJvbyk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHZhbHVlIG9mIFtbc29ydF1dIHByb3BlcnR5XG4gICAqIEBwYXJhbSB2YWx1ZSBTb3J0IHZhbHVlIHRvIHNldFxuICAgKi9cbiAgc2V0U29ydFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvcnQgPSB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBbW3Zpc2libGVdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWaXNibGUgcHJvcGVydHkgdmFsdWVcbiAgICovXG4gIGdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIHZhbHVlIG9mIHRleHQgYXR0cmlidXRlIGFuZCBtYXJrcyBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlIFRleHQgdG8gc2V0LiBJZiBpdCdzIGEgbnVsbCB2YWx1ZSwgaXQgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYW4gZW1wdHkgc3RyaW5nXG4gICAqIElmIGl0J3MgYSBudW1iZXIgb3Igbm9uLXN0cmluZywgaXQgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgKi9cbiAgc2V0VGV4dCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudGV4dCA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgdGhpcy50ZXh0ID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGV4dCA9IHZhbHVlICsgJyc7XG4gICAgfVxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBbW29uQ29tbWFuZF1dXG4gICAqIEBwYXJhbSBmbiBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGZvciBbW29uQ29tbWFuZF1dIGV2ZW50XG4gICAqL1xuICBzZXRPbkNvbW1hbmQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCA9IGZuO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgW1tvbkFjdGl2ZUxvc3RdXVxuICAgKiBAcGFyYW0gZm4gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBmb3IgW1tvbkFjdGl2ZUxvc3RdXSBldmVudFxuICAgKi9cbiAgc2V0T25BY3RpdmVMb3N0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5faW50ZXJuYWxPbkFjdGl2ZUxvc3QgPSBmbjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgYWxsIGF0dHJpYnV0ZXMgaW4gb25lIGdvXG4gICAqXG4gICAqIEBwYXJhbSBhdHRyc1xuICAgKiBAcGFyYW0gc2tpcEF0dHJpYnV0ZU92ZXJyaWRlIFNldCB0byAndHJ1ZScgaWYgeW91IGRvIG5vdCB3YW50IGN1c3RvbSBhdHRyaWJ1dGUgdG8gb3ZlcnJpZGUgZXhpc2l0aW5nIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGVzKGF0dHJzOiBBcnJheTxBdHRyaWJ1dGVOYW1lVmFsdWU+LCBza2lwQXR0cmlidXRlT3ZlcnJpZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuX3RlbXBGcmVlemVDZCA9IHRydWU7XG5cbiAgICBmb3IgKGNvbnN0IGF0dHIgb2YgYXR0cnMpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHIuYXR0cmlidXRlTmFtZSwgYXR0ci52YWx1ZSwgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlKTtcbiAgICB9XG5cbiAgICB0aGlzLl90ZW1wRnJlZXplQ2QgPSBmYWxzZTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBIVE1MIGF0dHJpYnV0ZSB2YWx1ZSBvbiBjb21wb25lbnRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBIVE1MIGF0dHJpYnV0ZSB0byBzZXRcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIG9mIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gc2tpcEF0dHJpYnV0ZU92ZXJyaWRlIFNldCB0byAndHJ1ZScgaWYgeW91IGRvIG5vdCB3YW50IGN1c3RvbSBhdHRyaWJ1dGUgdG8gb3ZlcnJpZGUgZXhpc2l0aW5nIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBBdHRyaWJ1dGVzRW51bSB8IHN0cmluZywgdmFsdWU6IGFueSwgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsQXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZTtcbiAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoYXR0cmlidXRlID09PSBcImlkXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uSUQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVklTSUJMRSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiY2xhc3NcIikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DTEFTUywgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09ICdlbmFibGVkJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5FTkFCTEVELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5ESVNBQkxFRCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09ICd0ZXh0Jykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5URVhULCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gJ2NvbG9yJykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DT0xPUiwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwidGl0bGVcIikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5USVRMRSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicmVxdWlyZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcImZvbnRCb2xkXCIgfHwgYXR0cmlidXRlID09PSBcImZvbnRib2xkXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uRk9OVF9CT0xELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVELCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJiZ2NvbG9yXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQkdfQ09MT1IsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVkFMVUUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIm1heGxlbmd0aFwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJtYXhfbGVuZ3RoXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicmVxdWlyZVwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJyZXF1aXJlZFwiKSB7XG4gICAgICAgIHRoaXMuc2V0UmVxdWlyZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJ3aWR0aFwiKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbFdpZHRoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcImhlaWdodFwiKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udHJvbEhlaWdodCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gXCJmb250U2l6ZVwiIHx8IGF0dHJpYnV0ZSA9PT0gXCJmb250c2l6ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0Rm9udFNpemUodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwib25jb21tYW5kXCIpIHtcbiAgICAgICAgdGhpcy5zZXRPbkNvbW1hbmQodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwib25hY3RpdmVsb3N0XCIpIHtcbiAgICAgICAgdGhpcy5zZXRPbkFjdGl2ZUxvc3QodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwicGF0dGVyblwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlBBVFRFUk4sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBcIm1heFwiKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLk1BWCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwibWluXCIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUlOLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKEphdmFVdGlscy5pc051bWJlcihvcmlnaW5hbEF0dHJpYnV0ZU5hbWUpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKF8ucGFyc2VJbnQob3JpZ2luYWxBdHRyaWJ1dGVOYW1lKSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRDdXN0b21BdHRyaWJ1dGUob3JpZ2luYWxBdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIC8vIExvZ2dlci53YXJuKGBVbmtub3duIGF0dHJpYnV0ZTogJHthdHRyaWJ1dGV9LCBzZXR0aW5nIGFzIGN1c3RvbSBhdHRyaWJ1dGVgKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlID09PSBcInZhbGlkYXRlXCIgJiYgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVWYWxpZGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgICBpZiAobmV3QXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBjbGFzcyDjgavplqLjgZfjgabjga/jgIHml6LlrZjjga7mjIflrprjgajjg57jg7zjgrhcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgbmV3QXR0cmlidXRlcyA9IF8uZmlsdGVyKG5ld0F0dHJpYnV0ZXMsIChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIuYXR0cmlidXRlTmFtZSAhPT0gQXR0cmlidXRlc0VudW0uQ0xBU1MpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBBdHRyaWJ1dGVzRW51bS5DTEFTUyxcbiAgICAgICAgICAgICAgdmFsdWU6ICh0aGlzLl9jc3NDbGFzcyArIFwiIFwiICsgbmV3Q3NzQ2xhc3MpLnRyaW0oKSxcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKG5ld0F0dHJpYnV0ZXMsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmVTZXRBdHRyaWJ1dGVFdmVudChvcmlnaW5hbEF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ0xBU1MgJiYgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlICE9PSB0cnVlICYmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiB0eXBlb2YgQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gQXBwVXRpbHMuYXR0cmlidXRlT3ZlcnJpZGVDbGFzcyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld0F0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICAgIC8vIGNsYXNzIOOBq+mWouOBl+OBpuOBr+OAgeaXouWtmOOBruaMh+WumuOBqOODnuODvOOCuFxuICAgICAgICAgIGNvbnN0IG5ld0Nzc0NsYXNzID0gXy5maWx0ZXIobmV3QXR0cmlidXRlcywgKGF0dHI6IEF0dHJpYnV0ZU5hbWVWYWx1ZSkgPT4gYXR0ci5hdHRyaWJ1dGVOYW1lID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykubWFwKChhdHRyOiBBdHRyaWJ1dGVOYW1lVmFsdWUpID0+IGF0dHIudmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgIG5ld0F0dHJpYnV0ZXMgPSBfLmZpbHRlcihuZXdBdHRyaWJ1dGVzLCAoYXR0cjogQXR0cmlidXRlTmFtZVZhbHVlKSA9PiBhdHRyLmF0dHJpYnV0ZU5hbWUgIT09IEF0dHJpYnV0ZXNFbnVtLkNMQVNTKTtcbiAgICAgICAgICBcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogQXR0cmlidXRlc0VudW0uQ0xBU1MsXG4gICAgICAgICAgICB2YWx1ZTogKHRoaXMuX2Nzc0NsYXNzICsgXCIgXCIgKyBuZXdDc3NDbGFzcykudHJpbSgpLFxuICAgICAgICAgIH0pO1xuICBcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMobmV3QXR0cmlidXRlcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uSUQpIHtcbiAgICAgICAgdGhpcy5zZXRJZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZShKYXZhVXRpbHMucGFyc2VCb29sZWFuKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5DTEFTUykge1xuICAgICAgICB0aGlzLnNldENzc0NsYXNzKHZhbHVlLCBza2lwQXR0cmlidXRlT3ZlcnJpZGUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgdGhpcy5zZXREaXNhYmxlZChKYXZhVXRpbHMucGFyc2VCb29sZWFuKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5FTkFCTEVEKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgdGhpcy5zZXREaXNhYmxlZCghSmF2YVV0aWxzLnBhcnNlQm9vbGVhbih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVEVYVCkge1xuICAgICAgICB0aGlzLnNldFRleHQodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkNPTE9SKSB7XG4gICAgICAgIHRoaXMuc2V0Q29sb3IodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkZPTlRfQk9MRCkge1xuICAgICAgICB0aGlzLnNldEZvbnRCb2xkKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5PTl9DT01NQU5EKSB7XG4gICAgICAgIHRoaXMuc2V0T25Db21tYW5kKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5SRVFVSVJFKSB7XG4gICAgICAgIHRoaXMuc2V0UmVxdWlyZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVElUTEUpIHtcbiAgICAgICAgdGhpcy5zZXRUaXRsZSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uU0VMRUNURUQpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQkdfQ09MT1IpIHtcbiAgICAgICAgdGhpcy5zZXRCZ0NvbG9yKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5WQUxVRSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVhfTEVOR1RIKSB7XG4gICAgICAgIHRoaXMuc2V0TWF4TGVuZ3RoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVgpIHtcbiAgICAgICAgdGhpcy5zZXRNYXgodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk1JTikge1xuICAgICAgICB0aGlzLnNldE1pbih2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgICB0aGlzLnNldFBhdHRlcm4odmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBzZXQgYXR0cmlidXRlLCB1bmtub3duIGF0dHJpYnV0ZSBpZDogJyArIGF0dHJpYnV0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBIVE1MIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlIE5hbWUgb2YgSFRNTCBhdHRyaWJ1dGUgdG8gZ2V0XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIGF0dHJpYnV0ZVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nIHwgQXR0cmlidXRlc0VudW0sIHNraXBRdWVyeURPTUlmTm90RXhpc3RzOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgYXR0cmlidXRlTG93ZXIgPSBhdHRyaWJ1dGUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFZpc2libGUoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVuYWJsZWQoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAndGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2NvbG9yJykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xvcigpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3JlcXVpcmUnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlcXVpcmVkKCkgKyAnJztcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09IFwidmFsdWVcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoZWNrZWQoKSArICcnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJpZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldElkKCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSBcInBhdHRlcm5cIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXR0ZXJuKCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSBcIm1pblwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbigpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gXCJtYXhcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXgoKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09IFwibWF4X2xlbmd0aFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1heExlbmd0aCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgIT0gbnVsbCAmJiB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IFwiaXNMb2NrZWRDb2x1bW5cIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNraXBRdWVyeURPTUlmTm90RXhpc3RzICE9PSB0cnVlKSB7XG4gICAgICAgIExvZ2dlci53YXJuKGBBdHRyaWJ1dGUgJHthdHRyaWJ1dGV9IGRvZXMgbm90IGV4aXN0cywgdHJ5aW5nIHRvIGdldCBmcm9tIERPTWApO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VmlzaWJsZSgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkVOQUJMRUQpIHtcbiAgICAgIHJldHVybiAhdGhpcy5nZXREaXNhYmxlZCgpICsgJyc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlRFWFQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRleHQoKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ09MT1IpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbG9yKCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlcXVpcmVkKCkgKyAnJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uVkFMVUUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVEKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKCkgKyAnJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0dGVybigpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NSU4pIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1pbigpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1heCgpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5NQVhfTEVOR1RIKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNYXhMZW5ndGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGdldCBhdHRyaWJ1dGUsIHVua25vd24gYXR0cmlidXRlIGlkOiAnICsgYXR0cmlidXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHJlcXVlc3RGb2N1cygpIHtcbiAgICBpZiAodGhpcy5nZXRFbGVtZW50KCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudCBhbmQgbWFyayBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudFJlZiAhPSBudWxsKSB7XG4gICAgICAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciB3aGVuIGZvY3VzIGlzIGxvc3QuIEludm9rZXMgb25BY3RpdmVMb3N0IGV2ZW50IGhhbmRsZXJcbiAgICogQGV2ZW50IFtbT25BY3RpdmVMb3N0XV1cbiAgICovXG4gIGZvY3VzTG9zdCgpIHtcbiAgICB0aGlzLm9uQWN0aXZlTG9zdC5lbWl0KCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25BY3RpdmVMb3N0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbE9uQWN0aXZlTG9zdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ3JlYXRlcyBhIHVuaXF1ZSBpZCB1c2luZyBhbiBvcHRpb25hbCBwcmVmaXhcbiAgICogQHBhcmFtIHByZWZpeCBTdHJpbmcgdG8gYXBwZW5kIHRvIGJlZ2lubmluZyBvZiBJRFxuICAgKiBAcmV0dXJucyBVbmlxdWUgSURcbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZVVuaXF1ZUlkKHByZWZpeDogc3RyaW5nID0gJ2Jhc2UnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcHJlZml4ICsgRGF0ZS5ub3coKSArICdfJyArIF8ucmFuZG9tKDEsIDEwMDApICsgXy5yYW5kb20oMSwgMTAwKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBBZGRzIGNoaWxkIGNvbXBvbmVudCB0byB0aGlzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gY2hpbGQgQ29tcG9uZW50IHRvIGFkZCBhcyBjaGlsZFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZENoaWxkKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgaWYgKGNoaWxkLmlkICE9PSB0aGlzLmlkKSB7XG4gICAgICBjb25zdCBjaGlsZEtleSA9IEtleVV0aWxzLnRvTWFwS2V5KGNoaWxkLmlkKTtcblxuICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gbmV3IE1hcDxzdHJpbmcsIEJhc2VDb21wb25lbnQ+KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuSW5kZXggPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGlsZHJlbi5zZXQoY2hpbGRLZXksIGNoaWxkKTtcbiAgICAgIHRoaXMuX2NoaWxkcmVuSW5kZXgucHVzaChjaGlsZC5pZCk7XG5cbiAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgVmlld0NvbXBvbmVudCwgaWYgc28sIHJlZ2lzdGVyIG91cnNlbGYgc28gdGhhdFxuICAgICAgLy9pdCBjYW4gYmUgbG9jYXRlZCBmYXN0ZXJcbiAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCAmJiAoY2hpbGQuaXNGYXV4RWxlbWVudCgpIHx8IGNoaWxkLmlzRGlhbG9nKCkgIT09IHRydWUpKSB7XG4gICAgICAgIGlmIChwYXJlbnRWaWV3Ll92aWV3Q2hpbGRyZW5NYXAgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmVudFZpZXcuX3ZpZXdDaGlsZHJlbk1hcCA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLnNldChjaGlsZEtleSwgY2hpbGQpO1xuXG4gICAgICAgIC8vdHJhY2sgU2Nyb2xsUGFuZSBmb3Igc2Nyb2xsIGFkanVzdG1lbnRcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZC5pc1Njcm9sbFBhbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBjaGlsZC5pc1Njcm9sbFBhbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmVudFZpZXcucmVnaXN0ZXJTY3JvbGxQYW5lKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hdGl2ZSBlbGVtZW50IG9mIHRoZSBjb21wb25lbnQgaWYgYSByZWZlcmVuY2UgdG8gaXQgaXMgZGVmaW5lZFxuICAgKiBAcmV0dXJucyBUaGUgSFRNTCBuYXRpdmUgZWxlbWVudCBvciAnbnVsbCcgaWYgcmVmZXJlbmNlIGlzIG1pc3NpbmdcbiAgICovXG4gIGdldEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYgPyB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IG51bGw7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSB0ZXh0IHByb3BlcnR5IHZhbHVlXG4gICAqIEByZXR1cm5zIFRleHQgdmFsdWVcbiAgICovXG4gIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBDU1MgY29sb3Igc3R5bGUgYXR0cmlidXRlIGFuZCBtYXJrcyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gY29sb3IgQ1NTIGNvbG9yIHN0cmluZyB2YWx1ZS4gU2hvdWxkIGJlIGhleGFkZWNpbWFsIG9yIHZhbGlkIENTUyBjb2xvciBzdHJpbmdcbiAgICovXG4gIHNldENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICBpZiAoY29sb3IgPT0gbnVsbCB8fCBjb2xvciA9PT0gXCJcIikge1xuICAgICAgZGVsZXRlIHRoaXMuc3R5bGVzWydjb2xvciddO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlc1snY29sb3InXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvciBzdHlsZSBhdHRyaWJ1dGUgdmFsdWVcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nLiBIZXhhZGVjaW1hbCBvciBDU1MgY29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0eWxlc1snY29sb3InXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYmFja2dyb3VuZCBjb2xvciBDU1Mgc3R5bGUgYXR0cmlidXRlIHZhbHVlXG4gICAqIEBwYXJhbSBiZ0NvbG9yIENvbG9yIHN0cmluZyB2YWx1ZSB0byBzZXQuIFNob3VsZCBiZSBoZXhhZGVjaW1hbCBvciB2YWxpZCBDU1MgY29sb3Igc3RyaW5nLlxuICAgKi9cbiAgc2V0QmdDb2xvcihiZ0NvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgIHRoaXMuc3R5bGVzW1wiYmFja2dyb3VuZFwiXSA9IGJnQ29sb3I7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIGZvbnQtd2VpZ2h0IHN0eWxlIHByb3BlcnR5IHRvIGJvbGRcbiAgICogQHBhcmFtIGJvbyBTd2l0Y2ggZm9yIHR1cm5pbmcgYm9sZCBzdHlsZSBvbi9vZmZcbiAgICovXG4gIHNldEZvbnRCb2xkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuZm9udEJvbGQgPSBib287XG5cbiAgICBpZiAoYm9vID09PSB0cnVlIHx8IGJvbyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl0gPSBcImJvbGRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuc3R5bGVzW1wiZm9udC13ZWlnaHRcIl07XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIENTUyBzdHlsZSBhdHRyaWJ1dGUgZm9udC1zdHlsZSB0byBpdGFsaWNcbiAgICogQHBhcmFtIGJvbyBTd2l0Y2ggZm9yIHR1cm5pbmcgaXRhbGljIHN0eWxlIG9uL29mZlxuICAgKi9cbiAgc2V0Rm9udEl0YWxpYyhib286IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLmZvbnRJdGFsaWMgPSBib287XG5cbiAgICBpZiAoYm9vID09PSB0cnVlIHx8IGJvbyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zdHlsZVwiXSA9IFwiaXRhbGljXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnN0eWxlc1tcImZvbnQtc3R5bGVcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgQ1NTIHN0eWxlIGF0dHJpYnV0ZSBmb250LXNpemVcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIHBpeGVscyBmb3IgZm9udC1zaXplXG4gICAqL1xuICBzZXRGb250U2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmZvbnRTaXplID0gc2l6ZTtcblxuICAgIHRoaXMuc3R5bGVzW1wiZm9udC1zaXplXCJdID0gc2l6ZSArIFwicHhcIjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBBZGQvcmVtb3ZlIENTUyBzdHlsZSBhdHRyaWJ1dGUgdGV4dC1kZWNvcmF0aW9uIHRvIHVuZGVybGluZVxuICAgKiBAcGFyYW0gdW5kZXJsaW5lIFN3aXRjaCBmb3IgdHVybmluZyB1bmRlcmxpbmUgc3R5bGUgb24vb2ZmIGZvciB0ZXh0XG4gICAqL1xuICBzZXRGb250VW5kZXJsaW5lKHVuZGVybGluZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuZm9udFVuZGVybGluZSA9IHVuZGVybGluZTtcblxuICAgIGlmICh0aGlzLmZvbnRVbmRlcmxpbmUgPT09IFwidHJ1ZVwiIHx8IHRoaXMuZm9udFVuZGVybGluZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zdHlsZXNbXCJ0ZXh0LWRlY29yYXRpb25cIl0gPSBcInVuZGVybGluZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5zdHlsZXNbXCJ0ZXh0LWRlY29yYXRpb25cIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdGhhdCByZWdpc3RlcnMgZm9jdXMgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBoYW5kbGVGb2N1cyhldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMucmVnaXN0ZXJDbGllbnRFdmVudChldmVudCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciB0aGF0IHJlZ2lzdGVycyBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgcmVnaXN0ZXJzIGtleWRvd24gZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgcmVnaXN0ZXJzIGtleXVwIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLnJlZ2lzdGVyQ2xpZW50RXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdGhhdCByZWdpc3RlcnMgbW91c2Vkb3duIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWdpc3RlckNsaWVudEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXRzIGN1c3RvbSBhdHRyaWJ1dGUgYnkgbmFtZSBpZiBpdCBleGlzdHNcbiAgICogQHBhcmFtIGF0dHJpYnV0ZU5hbWUgTmFtZSBvZiBjdXN0b20gYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIEN1c3RvbSBhdHRyaWJ1dGUgaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdW5kZWZpbmVkXG4gICAqL1xuICBnZXRDdXN0b21BdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAodGhpcy5jdXN0b21BdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgYXR0cmlidXRlIG9uIGN1c3RvbUF0dHJpYnV0ZSBvYmplY3QgdXNpbmcgbmFtZSBhcyBrZXlcbiAgICogQHBhcmFtIG5hbWUga2V5IG5hbWUgb2YgYXR0cmlidXRlXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBzZXQgZm9yIGtleS9uYW1lXG4gICAqL1xuICBzZXRDdXN0b21BdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tQXR0cmlidXRlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWUgKyAnJztcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ2hlY2sgaWYgY3VzdG9tIGF0dHJpYnV0ZSBleGlzdHNcbiAgICogQHBhcmFtIGlkIEtleSBuYW1lIG9mIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGN1c3RvbSBhdHRyaWJ1dGUgd2l0aCBuYW1lL2tleSBleGlzdHNcbiAgICovXG4gIGhhc0N1c3RvbUF0dHJpYnV0ZShpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsICYmIHRoaXMuY3VzdG9tQXR0cmlidXRlc1tpZF0gIT0gbnVsbDtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgY29tcG9uZW50IGJ5IGluZGV4XG4gICAqIEBwYXJhbSBpZHggSW5kZXggb2YgY2hpbGQgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIENoaWxkIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqL1xuICBnZXRDaGlsZEF0KGlkeDogbnVtYmVyKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4Lmxlbmd0aCA+IGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGlsZCh0aGlzLl9jaGlsZHJlbkluZGV4W2lkeF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHJldHVybnMgTnVtYmVyIG9mIGNoaWxkcmVuXG4gICAqL1xuICBnZXRDaGlsZENvdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbmRleCBvZiBjaGlsZCBjb21wb25lbnQgaWYgaXQgZXhpc3RzXG4gICAqIEBwYXJhbSBjaGlsZCBDaGlsZCBjb21wb25lbnRcbiAgICovXG4gIGluZGV4T2ZDaGlsZChjaGlsZDogYW55KTogbnVtYmVyIHtcbiAgICAvL1RPRE9cbiAgICBjb25zb2xlLmVycm9yKFwiaW5kZXhPZkNoaWxkIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogSW5zZXJ0IGNoaWxkIGNvbXBvbmVudCB0byBjaGlsZHJlbiBhcnJheSBhdCBsb2NhdGlvbiBvZiBpbmRleFxuICAgKiBAcGFyYW0gaWR4IEluZGV4IG9mIGluc2VydCBsb2NhdGlvblxuICAgKiBAcGFyYW0gcm93XG4gICAqL1xuICBpbnNlcnRDaGlsZEF0KGlkeDogbnVtYmVyLCByb3c6IGFueSkge1xuICAgIC8vVE9ET1xuICAgIGNvbnNvbGUuZXJyb3IoXCJpbnNlcnRDaGlsZEF0IGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBUT0RPOiBBZGQgZG9jdW1lbnRhdGlvbiBmb3IgZW1pdEludGVybmFsQ29tbWFuZFxuICAgKi9cbiAgcHJvdGVjdGVkIGVtaXRJbnRlcm5hbE9uQ29tbWFuZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCh0aGlzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2ludGVybmFsT25Db21tYW5kID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmludm9rZU1jb0FjdGlvbih0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBldmVudCBoYW5kbGVyIGZvciBjbGllbnQgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IHRvIHJlZ2lzdGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJDbGllbnRFdmVudChldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hdGl2ZSBIVE1MIGVsZW1lbnQgdGFnIG5hbWVcbiAgICogQHJldHVybnMgTmFtZSBvZiBIVE1MIGVsZW1lbnQgdGFnXG4gICAqL1xuICBnZXRUYWdOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAhPSBudWxsID8gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb21wb25lbnQgdGFnIG5hbWUgd2l0aG91dCB2aXZpZnkgY29yZSBwcmVmaXggKGkuZS4gXCJ2dC1cIilcbiAgICogQHJldHVybnMgVGFnIG5hbWVcbiAgICovXG4gIGdldExvY2FsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldFRhZ05hbWUoKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJ2dC1cIiwgXCJcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSBwYXJlbnQgY29tcG9uZW50IGlmIGl0IGV4aXN0c1xuICAgKiBAcmV0dXJucyBDb21wb25lbnQgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBwYXJlbnRcbiAgICovXG4gIGdldFBhcmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIHByb3BlcnR5IGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHJldHVybiAnbnVsbCdcbiAgICogQHJldHVybnMgVmFsdWUgb3IgJ251bGwnXG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICBpZiAodGhpc1tcInZhbHVlXCJdKSB7XG4gICAgICByZXR1cm4gdGhpc1tcInZhbHVlXCJdO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFJlbW92ZXMgYXR0cmlidXRlIG5hbWUgbmFtZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlIEF0dHJpYnV0ZSB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZyB8IEF0dHJpYnV0ZXNFbnVtKSB7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVMb3dlciA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uVklTSUJMRSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZW5hYmxlZCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uRU5BQkxFRCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICd0ZXh0Jykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5URVhUKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICdjb2xvcicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQ09MT1IpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3BhdHRlcm4nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlBBVFRFUk4pO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ21heCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYKTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTG93ZXIgPT09ICdtYXhsZW5ndGgnIHx8IGF0dHJpYnV0ZUxvd2VyID09PSAnbWF4X2xlbmd0aCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnbWluJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5NSU4pO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5DTEFTUyk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnb25jb21tYW5kJyB8fCBhdHRyaWJ1dGVMb3dlciA9PT0gJ29uX2NvbW1hbmQnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLk9OX0NPTU1BTkQpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3JlcXVpcmUnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEF0dHJpYnV0ZXNFbnVtLlJFUVVJUkUpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3RpdGxlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5USVRMRSk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnZm9udGJvbGQnIHx8IGF0dHJpYnV0ZUxvd2VyID09PSAnZm9udF9ib2xkJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5GT05UX0JPTEQpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5TRUxFQ1RFRCk7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZUxvd2VyID09PSAnYmdDb2xvcicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoQXR0cmlidXRlc0VudW0uQkdfQ09MT1IpO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVMb3dlciA9PT0gJ3ZhbHVlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShBdHRyaWJ1dGVzRW51bS5WQUxVRSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgTG9nZ2VyLndhcm4oYFVua25vd24gYXR0cmlidXRlOiAke2F0dHJpYnV0ZX0sIHNldHRpbmcgYXMgY3VzdG9tIGF0dHJpYnV0ZWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmVSZW5vdmVBdHRyaWJ1dGVFdmVudChhdHRyaWJ1dGUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5WSVNJQkxFKSB7XG4gICAgICB0aGlzLnNldFZpc2libGUodHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLkRJU0FCTEVEKSB7XG4gICAgICB0aGlzLnNldERpc2FibGVkKGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uRU5BQkxFRCkge1xuICAgICAgdGhpcy5zZXRFbmFibGVkKHRydWUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSBBdHRyaWJ1dGVzRW51bS5URVhUKSB7XG4gICAgICBkZWxldGUgdGhpcy50ZXh0O1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uQ09MT1IpIHtcbiAgICAgIHRoaXMuc2V0Q29sb3IoXCJcIik7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk9OX0NPTU1BTkQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9pbnRlcm5hbE9uQ29tbWFuZDtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uUEFUVEVSTikge1xuICAgICAgdGhpcy5zZXRQYXR0ZXJuKHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09IEF0dHJpYnV0ZXNFbnVtLk1BWCkge1xuICAgICAgdGhpcy5zZXRNYXgodW5kZWZpbmVkKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uTUFYX0xFTkdUSCkge1xuICAgICAgdGhpcy5zZXRNYXhMZW5ndGgodW5kZWZpbmVkKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZSA9PT0gQXR0cmlidXRlc0VudW0uTUlOKSB7XG4gICAgICB0aGlzLnNldE1pbih1bmRlZmluZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMb2dnZXIud2FybignVW5hYmxlIHRvIHNldCBhdHRyaWJ1dGUsIHVua25vd24gYXR0cmlidXRlIGlkOiAnICsgYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgb2YgW1tzZXRSZXF1aXJlZF1dXG4gICAqIEBwYXJhbSBib29cbiAgICovXG4gIHNldFJlcXVpcmUoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRSZXF1aXJlZChib28pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW3JlcXVpcmVkXV0gdG8gdHJ1ZSBvciBmYWxzZVxuICAgKiBAcGFyYW0gYm9vXG4gICAqL1xuICBzZXRSZXF1aXJlZChib286IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICBpZiAoYm9vID09PSAndHJ1ZScgfHwgYm9vID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbcGF0dGVybl1dIHZhbHVlXG4gICAqIEBwYXJhbSBwYXR0ZXJuXG4gICAqL1xuICBzZXRQYXR0ZXJuKHBhdHRlcm46IHN0cmluZykge1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm47XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1ttaW5dXSB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsXG4gICAqL1xuICBzZXRNaW4odmFsOiBhbnkpIHtcbiAgICB0aGlzLm1pbiA9IHZhbDtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW21heF1dIHZhbHVlXG4gICAqIEBwYXJhbSB2YWxcbiAgICovXG4gIHNldE1heCh2YWw6IGFueSkge1xuICAgIHRoaXMubWF4ID0gdmFsO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbcGF0dGVybl1dIHZhbHVlXG4gICAqIEByZXR1cm5zIFtbcGF0dGVybl1dXG4gICAqL1xuICBnZXRQYXR0ZXJuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1ttaW5dXSB2YWx1ZVxuICAgKiBAcmV0dXJucyBbW21pbl1dXG4gICAqL1xuICBnZXRNaW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5taW47XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbbWF4XV0gdmFsdWVcbiAgICogQHJldHVybnMgW1ttYXhdXVxuICAgKi9cbiAgZ2V0TWF4KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lucHV0TG9jYWxlXV0gdmFsdWVcbiAgICogQHJldHVybnMgW1tpbnB1dExvY2FsZV1dXG4gICAqL1xuICBnZXRJbnB1dExvY2FsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlucHV0TG9jYWxlO1xuICB9XG5cbiAgLyoqIFNldCBbW2lucHV0TG9jYWxlXV0gdmFsdWVcbiAgICogQHBhcmFtIGxvY2FsZVxuICAgKi9cbiAgc2V0SW5wdXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0TG9jYWxlID0gbG9jYWxlO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbaW5wdXRDaGFyc2V0c11dIHZhbHVlXG4gICAqIEByZXR1cm5zIFtbaW5wdXRDaGFyc2V0c11dXG4gICAqL1xuICBnZXRJbnB1dENoYXJzZXRzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRDaGFyc2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tpbnB1dENoYXJlc3RzXV0gdmFsdWVcbiAgICogQHBhcmFtIGlucHV0Q2hhclNldHNcbiAgICovXG4gIHNldElucHV0Q2hhcnNldHMoaW5wdXRDaGFyU2V0czogc3RyaW5nKSB7XG4gICAgdGhpcy5pbnB1dENoYXJzZXRzID0gaW5wdXRDaGFyU2V0cztcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2lkXV0gdmFsdWVcbiAgICogQHJldHVybnMgW1tpZF1dXG4gICAqL1xuICBnZXRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW2lkXV0gdmFsdWVcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBzZXRJZChpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwgJiYgdGhpcy5wYXJlbnQuY2hpbGRyZW4uaGFzKHRoaXMuaWQpKSB7XG4gICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5kZWxldGUoS2V5VXRpbHMudG9NYXBLZXkodGhpcy5pZCkpO1xuICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc2V0KEtleVV0aWxzLnRvTWFwS2V5KGlkKSwgdGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IF8uZmluZEluZGV4KHRoaXMucGFyZW50Ll9jaGlsZHJlbkluZGV4LCAoaXRlbSkgPT4gaXRlbSA9PT0gdGhpcy5pZCk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXhbaWR4XSA9IGlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFyZW50Ll9jaGlsZHJlbkluZGV4LnB1c2goaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXggPSBfLnVuaXEodGhpcy5wYXJlbnQuX2NoaWxkcmVuSW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdCBtZXRob2QuIEltcGxlbWVudGVkIGJ5IHN1YiBjbGFzcyBjb21wb25lbnRzXG4gICAqIEBwYXJhbSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgIC8vaW1wbC4gYnkgc3ViIGNsYXNzXG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbY3NzQ2xhc3NdXSBvZiBjb21wb25lbnQuXG4gICAqIEBwYXJhbSBjc3MgQ2xhc3MgKENTUykgbmFtZSB0byBzZXQgb24gY29tcG9uZW50LiBGb3IgbXVsdGlwbGUgQ1NTIGNsYXNzZXMsIGpvaW4gd2l0aCBET1QgKC4pXG4gICAqIGBgYFxuICAgKiAuY2xhc3MxLmNsYXNzMi5jbGFzczNcbiAgICogYGBgXG4gICAqL1xuICBzZXRDc3NDbGFzcyhjc3M6IHN0cmluZywgc2tpcEF0dHJpYnV0ZU92ZXJyaWRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoY3NzICE9IG51bGwgJiYgY3NzLmluZGV4T2YoXCIuXCIpID49IDApIHtcbiAgICAgIGNvbnN0IHRlbXAgPSBjc3Muc3BsaXQoXCJcXC5cIik7XG5cbiAgICAgIHRoaXMuY3NzQ2xhc3MgPSB0ZW1wLmpvaW4oXCItXCIpO1xuXG4gICAgICBpZiAodGVtcFswXSA9PT0gXCJcIikge1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gdGhpcy5jc3NDbGFzcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jc3NDbGFzcyA9IGNzcztcbiAgICB0aGlzLmNoZWNrTnhTdHlsaW5nKHNraXBBdHRyaWJ1dGVPdmVycmlkZSk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY3NzIGNsYXNzIG5hbWUgdG8gdGhlIGludGVybmFsIFtbX2Nzc0NsYXNzXV0gcHJvcGVydHlcbiAgICogQHBhcmFtIGNzcyBDU1MgY2xhc3MgbmFtZSB0byBhZGRcbiAgICovXG4gIGFkZENzc0NsYXNzKGNzczogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2Nzc0NsYXNzID09IG51bGwgfHwgdGhpcy5fY3NzQ2xhc3MgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMuX2Nzc0NsYXNzID0gY3NzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3NzQ2xhc3MuaW5kZXhPZihjc3MpID09IC0xKSB7XG4gICAgICB0aGlzLl9jc3NDbGFzcyA9IGAke3RoaXMuX2Nzc0NsYXNzfSAke2Nzc31gO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrTnhTdHlsaW5nKCk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNzcyBjbGFzcyBuYW1lIGZyb20gaW50ZXJuYWwgW1tfY3NzQ2xhc3NdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gY3NzIENTUyBjbGFzcyBuYW1lIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQ3NzQ2xhc3MoY3NzOiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl9jc3NDbGFzcyAhPSBudWxsKVxuICAgICAgdGhpcy5fY3NzQ2xhc3MgPSB0aGlzLl9jc3NDbGFzcy5yZXBsYWNlKGNzcywgJycpO1xuICAgIHRoaXMuY2hlY2tOeFN0eWxpbmcoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgW1tyZXF1aXJlXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tyZXF1aXJlXV1cbiAgICovXG4gIGdldFJlcXVpcmVkKCk6IHN0cmluZyB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVpcmU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSBjb21wb25lbnQgYW5kIGludm9rZXMgQW5ndWxhcnMgW1tuZ09uRGVzdHJveV1dIG1ldGhvZFxuICAgKi9cbiAgZGVzdHJveUNvbXBvbmVudCgpIHtcbiAgICBpZiAodGhpcy5jb21wUmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcFJlZi5kZXN0cm95KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnRSZWYgIT0gbnVsbCkge1xuICAgICAgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIExvZ2dlci53YXJuKFwiTWVtb3J5IGxlYWshIFBsZWFzZSB1c2UgbmdJZiBpZiB5b3Ugd2FudCB0byByZW1vdmUgY29tcG9uZW50IVwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjb21wb25lbnRcbiAgICogQHJldHVybnMgSlNPTiBvYmplY3RcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QgcmV0VmFsOiBhbnkgPSB7fTtcblxuICAgIC8vZ2V0IGN1c3RvbSBhdHRyaWJ1dGVzIGJpbmRlZCB0byBvdXIgdGFnXG4gICAgaWYgKHRoaXMuZWxlbWVudFJlZiAhPSBudWxsICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBsZXQgYXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IG51bGw7XG5cbiAgICAgIGlmICh0eXBlb2YgZWwuZ2V0QXR0cmlidXRlTmFtZXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhdHRyaWJ1dGVzID0gZWwuZ2V0QXR0cmlidXRlTmFtZXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXR0cmlidXRlcy5wdXNoKGVsLmF0dHJpYnV0ZXNbaV0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICBfLmZvckVhY2goYXR0cmlidXRlcywgKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIEFwcFV0aWxzLnZhbGlkYXRlQXR0cmlidXRlID09PSBcImZ1bmN0aW9uXCIgJiYgQXBwVXRpbHMudmFsaWRhdGVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIGF0dHJpYnV0ZU5hbWUsIGVsLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEFwcFV0aWxzLnNldEN1c3RvbUF0dHJpYnV0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIEFwcFV0aWxzLnNldEN1c3RvbUF0dHJpYnV0ZShyZXRWYWwsIGVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcIm54VGFnTmFtZVwiLCB0aGlzLmdldE54VGFnTmFtZSgpKTtcbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcInRhZ05hbWVcIiwgdGhpcy5nZXRUYWdOYW1lKCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiaWRcIiwgdGhpcy5pZCk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJkaXNhYmxlZFwiLCB0aGlzLmdldERpc2FibGVkKCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiZW5hYmxlZFwiLCB0aGlzLmdldEVuYWJsZWQoKSk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJ2aXNpYmxlXCIsIHRoaXMuZ2V0VmlzaWJsZSgpKTtcbiAgICB0aGlzLnNldEpzb24ocmV0VmFsLCBcInRleHRcIiwgdGhpcy5nZXRUZXh0KCkpO1xuICAgIHRoaXMuc2V0SnNvbihyZXRWYWwsIFwiY3NzQ2xhc3NcIiwgdGhpcy5jc3NDbGFzcyk7XG4gICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJjdXN0b21BdHRyaWJ1dGVzXCIsIHRoaXMuY3VzdG9tQXR0cmlidXRlc1RvSnNvbigpKTtcblxuICAgIGlmICh0aGlzLmdldFZhbHVlKCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRKc29uKHJldFZhbCwgXCJ2YWx1ZVwiLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLnNpemUgPiAwKSB7XG4gICAgICAgIC8vbmVlZCB0byByZXR1cm4gY2hpbGRyZW4gaW4gcHJvcGVyIG9yZGVyXG4gICAgICAgIHJldFZhbFtcImNoaWxkcmVuXCJdID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICBmb3IgKGxldCBpZCBvZiB0aGlzLl9jaGlsZHJlbkluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5nZXRDaGlsZChpZCk7XG5cbiAgICAgICAgICAgIC8vZ2V0Q2hpbGQgY2FuIHJldHVybiBudWxsP1xuICAgICAgICAgICAgaWYgKGMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZEpzb24gPSB0aGlzLmNoaWxkVG9Kc29uKGMpO1xuXG4gICAgICAgICAgICAgIGlmIChjaGlsZEpzb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFZhbFtcImNoaWxkcmVuXCJdLnB1c2goY2hpbGRKc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBjaGlsZCB0byBKU09OXG4gICAqIEBwYXJhbSBjaGlsZCBjaGlsZCB0byBiZSBjb252ZXJ0ZWQgdG8gSlNPTlxuICAgKi9cbiAgcHJvdGVjdGVkIGNoaWxkVG9Kc29uKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGNoaWxkLnRvSnNvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBbW2N1c3RvbUF0dHJpYnV0ZXNdXVxuICAgKiBAcmV0dXJucyBKU09OIE9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGN1c3RvbUF0dHJpYnV0ZXNUb0pzb24oKSB7XG4gICAgcmV0dXJuIEJhc2VDb21wb25lbnQubWFwVG9Kc29uKHRoaXMuY3VzdG9tQXR0cmlidXRlcyk7XG4gIH1cblxuICBzdGF0aWMgbWFwVG9Kc29uKG1hcDogeyBbbmFtZTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBjb25zdCBjdXN0b21BdHRyaWJ1dGVzID0ge307XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBjb25zdCBrZXlzID0gXy5rZXlzKG1hcCk7XG5cbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG1hcFtrZXldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIgJiYgdmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VzdG9tQXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1c3RvbUF0dHJpYnV0ZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IHN1YiBjbGFzcyBvdGhlcndpc2UgcmV0dXJucyBkZWZhdWx0IHZhbHVlIG9mIFwibm9uZVwiXG4gICAqIEByZXR1cm5zIE54VGFnTmFtZSBhcyBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBnZXROeFRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIFwibm9uZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgSlNPTiB2YWx1ZXMuIE11dGF0ZXMgSlNPTiBvYmplY3QgdGhhdCBpcyBwYXNzZWQgaW5cbiAgICogQHBhcmFtIGpzb24gT2JqZWN0IHRvIGFkZCBrZXkgdG9cbiAgICogQHBhcmFtIGtleSBLZXkgdG8gc2V0XG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBzZXQgZm9yIGtleSBwYXJhbVxuICAgKi9cbiAgcHJvdGVjdGVkIHNldEpzb24oanNvbjogYW55LCBrZXk6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAganNvbltrZXldID0gdGhpcy50b0pzb25WYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZhbHVlIHRvIGEgdmFsaWQgSlNPTiBwcm9wZXJ0eSBzdHJpbmdcbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGNvbnZlcnQgdG8gc3RyaW5nXG4gICAqIEByZXR1cm5zIFZhbHVlIGFzIGEgdmFsaWQgSlNPTiBwcm9wZXJ0eSBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCB0b0pzb25WYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB2YWx1ZSArICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tpZF1dIHByb3BlcnR5IHRvIGEgdW5pcXVlIHN0cmluZyBJRCBnZW5lcmF0ZWQgYnkgW1tfdW5pcXVlSWRdXVxuICAgKi9cbiAgcmVzZXRJZCgpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5fdW5pcXVlSWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHZhbHVlIG9mIGNoZWNrZWQgcHJvcGVydHkuIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBpbiBzdWIgY2xhc3MgY29tcG9uZW50cyB0aGF0IGhhdmUgY2hlY2tlZCBzdGF0ZVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NoZWNrZWRdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0Q2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViIGNsYXNzIGNvbXBvbmVudHMgdGhhdCBoYXZlIGNoZWNrZWQgc3RhdGVcbiAgICogQHBhcmFtIGJvbyBUb2dnbGUgW1tjaGVja2VkXV0gb24vb2ZmXG4gICAqL1xuICBzZXRDaGVja2VkKGJvbzogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIE5PLU9QXG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViIGNsYXNzIGNvbXBvbmVudHMgdGhhdCBoYXZlIHNlbGVjdGVkIHN0YXRlXG4gICAqIEBwYXJhbSBib28gVG9nZ2xlIFtbY2hlY2tlZF1dIG9uL29mZlxuICAgKi9cbiAgc2V0U2VsZWN0ZWQoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gTk8tT1BcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgW1ttYXhMZW5ndGhdXSBwcm9wZXJ0eS4gUmV0dXJucyAtMSBpZiBpdCBpcyBudWxsXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIG1heExlbmd0aCBhcyBpbnRlZ2VyIGlmIGl0J3Mgc2V0LCBvdGhlcndpc2UgcmV0dXJucyBudWxsXG4gICAqL1xuICBnZXRNYXhMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXhMZW5ndGggPT0gbnVsbCA/IC0xIDogSmF2YVV0aWxzLmludFZhbHVlKHRoaXMubWF4TGVuZ3RoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgW1ttaW5MZW5ndGhdXSBwcm9wZXJ0eS4gUmV0dXJucyAtMSBpZiBpdCBpcyBudWxsXG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIG1pbkxlbmd0aCBhcyBpbnRlZ2VyIGlmIGl0J3Mgc2V0LCBvdGhlcndpc2UgcmV0dXJucyBudWxsXG4gICAqL1xuICBnZXRNaW5MZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5taW5MZW5ndGggPT0gbnVsbCA/IC0xIDogSmF2YVV0aWxzLmludFZhbHVlKHRoaXMubWluTGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIGNoaWxkIGNvbXBvbmVudHNcbiAgICogQHJldHVybnMgQ2hpbGQgY29tcG9uZW50c1xuICAgKi9cbiAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBuZXcgVmVjdG9yPEJhc2VDb21wb25lbnQ+KCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkcmVuSW5kZXggIT09IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGlkIG9mIHRoaXMuX2NoaWxkcmVuSW5kZXgpIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuZ2V0Q2hpbGQoaWQpO1xuXG4gICAgICAgIGlmIChjICE9IG51bGwpIHtcbiAgICAgICAgICBjaGlsZHJlbi5hZGQoYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogUmVtb3ZlIGNoaWxkIGNvbXBvbmVudCBmcm9tIGxpc3Qgb2YgY2hpbGRyZW4gYW5kIHJlbW92ZSBjaGlsZHJlbiBvZiBjaGlsZFxuICAgKiBAcGFyYW0gY2hpbGQgQ2hpbGQgY29tcG9uZW50IHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQoY2hpbGQ6IEJhc2VDb21wb25lbnQpIHtcbiAgICAvL2lmIHNvbWVob3cgc2VuZCBpdCBhcyBzdHJpbmcgKHZpYSB0eXBlIGFueSlcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjaGlsZCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoY2hpbGQpIGFzIEJhc2VDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgIC8vZmlyc3QgaGlkZSBpdFxuICAgICAgaWYgKGNoaWxkLnNldFZpc2libGUpIHtcbiAgICAgICAgY2hpbGQuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZGVsZXRlKEtleVV0aWxzLnRvTWFwS2V5KGNoaWxkLmlkKSk7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fY2hpbGRyZW5JbmRleCA9IF8udW5pcShfLmZpbHRlcih0aGlzLl9jaGlsZHJlbkluZGV4LCAoaXRlbSkgPT4gaXRlbSAhPT0gY2hpbGQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgIC8vcmVtb3ZlIG91cnNlbGYgZnJvbSB0aGUgdmlldyBjaGlsZHJlbiBtYXBcbiAgICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwgJiYgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50Vmlldy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleShjaGlsZC5nZXRJZCgpKSk7XG4gICAgICB9XG5cbiAgICAgIC8vbW92ZSBjaGlsZHJlbiBvZiBjaGlsZHJlblxuICAgICAgaWYgKGNoaWxkLnJlbW92ZUFsbENoaWxkcmVuKSB7XG4gICAgICAgIGNoaWxkLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGQgY29tcG9uZW50IGJ5IElEXG4gICAqIEBwYXJhbSBpZCBDaGlsZCBbW2lkXV1cbiAgICovXG4gIHJlbW92ZUNoaWxkQnlJZChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChjaGlsZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZUFsbENoaWxkcmVuKCkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNpdCA9IHRoaXMuY2hpbGRyZW4udmFsdWVzKCk7XG4gICAgICBsZXQgY3IgPSBjaXQubmV4dCgpO1xuXG4gICAgICB3aGlsZSAoY3IuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNyLnZhbHVlKTtcbiAgICAgICAgY3IgPSBjaXQubmV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYkNoaWxkcmVuSWRzICE9IG51bGwpIHtcbiAgICAgIHRoaXMudGFiQ2hpbGRyZW5JZHMuZm9yRWFjaChjaWQgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkQnlJZChjaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBjaGlsZCBjb21wb25lbnQgYnkgSUQuIERlZXAgc2VhcmNoXG4gICAqIEBwYXJhbSBpZCBDaGlsZCBjb21wb25lbnQgW1tpZF1dXG4gICAqL1xuICBnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEVsZW1lbnRCeUlkKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGNoaWxkIGNvbXBvbmVudCB3aXRoIGlkIGV4aXN0c1xuICAgKiBAcGFyYW0gaWQgQ2hpbGQgY29tcG9uZW50IFtpZF1cbiAgICovXG4gIGhhc0NoaWxkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kRWxlbWVudEJ5SWQoaWQpICE9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbGlkYXRlIGF0dHJpYnV0ZSBmb3IgaW5wdXQgY29tcG9uZW50LiBJbXBsZW1lbnQgb24gc3ViIGNsYXNzIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gYXR0clxuICAgKi9cbiAgc2V0VmFsaWRhdGUoYXR0cjogc3RyaW5nKSB7XG4gICAgLy9UT0RPXG4gICAgY29uc29sZS5lcnJvcihcInNldFZhbGlkYXRlIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdHlwZSBhdHRyaWJ1dGUgZm9yIGlucHV0IGNvbXBvbmVudC4gSW1wbGVtZW50IG9uIHN1YiBjbGFzcyBjb21wb25lbnRcbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIHNldFR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgLy9UT0RPXG4gICAgY29uc29sZS5lcnJvcihcInNldFR5cGUgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb3JtYXQgYXR0cmlidXRlIGZvciBpbnB1dCBjb21wb25lbnQuIEltcGxlbWVudCBvbiBzdWIgY2xhc3MgY29tcG9uZW50XG4gICAqIEBwYXJhbSBmb3JtYXRcbiAgICovXG4gIHNldEZvcm1hdChmb3JtYXQ6IHN0cmluZykge1xuICAgIC8vVE9ET1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzZXRGb3JtYXQgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbW21heExlbmd0aF1dIGZvciBpbnB1dCBjb21wb25lbnRcbiAgICogQHBhcmFtIG1heExlbmd0aCBJbnB1dCBtYXggbGVuZ3RoIHByb3BlcnR5LiBTaG91bGQgYmUgbnVtZXJpYyBzdHJpbmdcbiAgICovXG4gIHNldE1heExlbmd0aChtYXhMZW5ndGg6IHN0cmluZykge1xuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFtbbWluTGVuZ3RoXV0gZm9yIGlucHV0IGNvbXBvbmVudFxuICAgKiBAcGFyYW0gbWluTGVuZ3RoIElucHV0IG1heCBsZW5ndGggcHJvcGVydHkuIFNob3VsZCBiZSBudW1lcmljIHN0cmluZ1xuICAgKi9cbiAgc2V0TWluTGVuZ3RoKG1pbkxlbmd0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5taW5MZW5ndGggPSBtaW5MZW5ndGg7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1ttYXhMZW5ndGhdXSBhcyBieXRlIGxlbmd0aCBmb3IgaW5wdXQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBibCBTaG91bGQgYmUgbnVtZXJpYyBzdHJpbmdcbiAgICovXG4gIHNldE1heEJ5dGVMZW4oYmw6IHN0cmluZykge1xuICAgIHRoaXMuc2V0TWF4TGVuZ3RoKGJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdCBtZXRob2QuIFNldCB2YWx1ZSBvZiBpbnB1dCBjb21wb25lbnRcbiAgICogQHBhcmFtIHZhbCBWYWx1ZSB0byBzZXRcbiAgICovXG4gIHNldFZhbHVlKHZhbDogYW55KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZm9jdXNhYmxlIHByb3BlcnR5IHZhbHVlIGZvciBjb21wb25lbnQuIEltcGxlbWVudCBvbiBzdWIgY2xhc3NcbiAgICogQHBhcmFtIGZvY3VzYWJsZSBUb2dnbGUgZm9jdXNhYmxlIG9uL29mZlxuICAgKi9cbiAgc2V0Rm9jdXNhYmxlKGZvY3VzYWJsZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vVE9ET1xuICB9XG5cbiAgLyoqXG4gICAqIEFic3RyYWN0LiBTZWxlY3QgcGFyZW50IGNvbXBvbmVudCB0YWIuIEltcGxlbWVudCBvbiBzdWIgY2xhc3NcbiAgICovXG4gIHNlbGVjdFBhcmVudFRhYigpIHtcbiAgICBmdW5jdGlvbiBmaW5kVGFiQmVsb25nKGl0ZW06IEJhc2VDb21wb25lbnQpIHtcbiAgICAgIGlmIChpdGVtICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsICYmIHBhcmVudC5nZXRMb2NhbE5hbWUoKSAhPT0gJ3RhYicpXG4gICAgICAgICAgcmV0dXJuIGZpbmRUYWJCZWxvbmcocGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGFiID0gZmluZFRhYkJlbG9uZyh0aGlzLmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSBhcyBUYWJDb21wb25lbnQ7XG5cbiAgICBmdW5jdGlvbiBmaW5kVGFiUGFuZUJlbG9uZyh0YWI6IEJhc2VDb21wb25lbnQpIHtcbiAgICAgIGlmICh0YWIgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YWIuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0TG9jYWxOYW1lKCkgIT09ICd0YWItcGFuZScpXG4gICAgICAgICAgcmV0dXJuIGZpbmRUYWJQYW5lQmVsb25nKHBhcmVudCk7XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRhYlBhbmUgPSBmaW5kVGFiUGFuZUJlbG9uZyh0aGlzLmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSBhcyBUYWJQYW5lQ29tcG9uZW50O1xuICAgIGlmICh0YWIgIT0gbnVsbCkge1xuICAgICAgdGFiUGFuZS5zZXRTZWxlY3RlZFRhYih0YWIuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgZGVlcCBzZWFyY2ggKHRoYXQgaXMsIGxvb2tzIHVwIGRlc2NlbmRhbnRzKVxuICAgKiBAcGFyYW0gaWQgZWxlbWVudCBpZCB0byBzZWFyY2hcbiAgICovXG4gIGZpbmRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3QgbWFwcGVkQ2hpbGRJZCA9IEtleVV0aWxzLnRvTWFwS2V5KGlkKTtcblxuICAgIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcbiAgICAvL2ZpcnN0IGNoZWNrIGZvciBjYWNoZVxuICAgIC8vIGxldCBjb21wOiBCYXNlQ29tcG9uZW50ID0gVWlEb2N1bWVudC5nZXRGcm9tQ2FjaGUobWFwcGVkQ2hpbGRJZCk7XG5cbiAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAvL2NoZWNrIGZvciByYWRpbyBidXR0b24gZ3JvdXBcbiAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSB0aGlzLmdldFJhZGlvQnV0dG9uR3JvdXBDb21wb25lbnQoaWQpO1xuXG4gICAgICBpZiAocmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgIGNvbXAgPSByYWRpb0dyb3VwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcCA9PSBudWxsKSB7XG4gICAgICAgIC8vZ2V0IGFsbCBjaGlsZHJlbiBmcm9tIFZpZXdcbiAgICAgICAgLy8gY29uc3QgYWxsQ2hpbGRyZW4gPSB0aGlzLmdldFBhcmVudFZpZXcoKS5yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZSgpO1xuICAgICAgICAvLyBjb25zdCBlZGl0b3JJZCA9IGAje2lkfWA7XG5cbiAgICAgICAgLy8gZm9yIChsZXQgY2hpbGQgb2YgYWxsQ2hpbGRyZW4pIHtcbiAgICAgICAgLy8gICBpZiAoXG4gICAgICAgIC8vICAgICBLZXlVdGlscy50b01hcEtleShjaGlsZC5nZXRJZCgpKSA9PT0gbWFwcGVkQ2hpbGRJZCB8fFxuICAgICAgICAvLyAgICAgLy9ieSBlZGl0b3IgaWQgKGUuZy4gZWRpdG9yPVwiI2VkaXRvcklkXCIpXG4gICAgICAgIC8vICAgICBjaGlsZC5lZGl0b3IgPT09IGVkaXRvcklkXG4gICAgICAgIC8vICAgKSB7XG4gICAgICAgIC8vICAgICBjb21wID0gY2hpbGQ7XG4gICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICAgICAgY29tcCA9IHRoaXMuX3ZpZXdDaGlsZHJlbk1hcC5nZXQobWFwcGVkQ2hpbGRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcCA9PSBudWxsICYmIHRoaXMuaXNWaWV3KCkgIT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wID0gcGFyZW50Vmlldy5maW5kRWxlbWVudEJ5SWQobWFwcGVkQ2hpbGRJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vaWYgd2UgZmluZCBjb21wb25lbnQsIGFkZCB0byBjYWNoZVxuICAgICAgLy8gaWYgKGNvbXAgIT0gbnVsbCkge1xuICAgICAgLy8gICBVaURvY3VtZW50LmFkZFRvQ2FjaGUobWFwcGVkQ2hpbGRJZCwgY29tcCk7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29tcCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHJhZGlvIGJ1dHRvbiBncm91cCBjb21wb25lbnQgYnkgaWRcbiAgICogQHBhcmFtIGlkIFJhZGlvIGJ1dHRvbiBncm91cCBJRFxuICAgKi9cbiAgZ2V0UmFkaW9CdXR0b25Hcm91cENvbXBvbmVudChpZDogc3RyaW5nKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKGlkID09PSAodGhpcyBhcyBhbnkpLmdyb3VwKSB7XG4gICAgICAvL3JhZGlvIGJ1dHRvbiBncm91cFxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSB0aGlzLmdldFJhZGlvQnV0dG9uR3JvdXAoaWQpO1xuXG4gICAgICBpZiAocmFkaW9Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgIGxldCByZXRWYWwgPSByYWRpb0dyb3VwWzBdO1xuXG4gICAgICAgIGZvciAobGV0IHJhZGlvIG9mIHJhZGlvR3JvdXApIHtcbiAgICAgICAgICBpZiAocmFkaW8uZ2V0Q2hlY2tlZCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXRWYWwgPSByYWRpbztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjaGFuZ2UgbGlzdGVuZXIgb24gYXR0cmlidXRlc1xuICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICovXG4gIGFkZEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKGxpc3RlbmVyOiBBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycyA9IFtdO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLl9pbnRlcm5hbElkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKCdsaXN0ZW5lcicpO1xuXG4gICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2hhbmdlIGxpc3RlbmVyIG9uIGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAqL1xuICByZW1vdmVBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcihsaXN0ZW5lcjogQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgPSBfLmZpbHRlcih0aGlzLmF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVycywgKGl0ZW06IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKSA9PiBpdGVtLl9pbnRlcm5hbElkICE9PSBsaXN0ZW5lci5faW50ZXJuYWxJZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhdHRyaWJ1dGUgYW5kIGVtaXQgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVOYW1lXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAZXZlbnQgQXR0cmlidXRlQ2hhbmdlRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBmaXJlU2V0QXR0cmlidXRlRXZlbnQoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzICYmIHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGV2ZW50OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCA9IG5ldyBBdHRyaWJ1dGVDaGFuZ2VFdmVudChcbiAgICAgICAgYXR0cmlidXRlTmFtZSwgdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSksIG5ld1ZhbHVlLCB0aGlzXG4gICAgICApO1xuXG4gICAgICBfLmZvckVhY2godGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMsIChsaXN0ZW5lcjogQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIpID0+IHtcbiAgICAgICAgbGlzdGVuZXIub25BdHRyaWJ1dGVTZXQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhdHRyaWJ1dGUgYW5kIGVtaXQgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVOYW1lXG4gICAqIEBldmVudCBBdHRyaWJ1dGVDaGFuZ2VFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGZpcmVSZW5vdmVBdHRyaWJ1dGVFdmVudChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMgJiYgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZXZlbnQ6IEF0dHJpYnV0ZUNoYW5nZUV2ZW50ID0gbmV3IEF0dHJpYnV0ZUNoYW5nZUV2ZW50KFxuICAgICAgICBhdHRyaWJ1dGVOYW1lLCB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSwgbnVsbCwgdGhpc1xuICAgICAgKTtcblxuICAgICAgXy5mb3JFYWNoKHRoaXMuYXR0cmlidXRlQ2hhbmdlTGlzdGVuZXJzLCAobGlzdGVuZXI6IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKSA9PiB7XG4gICAgICAgIGxpc3RlbmVyLm9uQXR0cmlidXRlUmVtb3ZlZChldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIHN0YXRpYyBbW2NsZWFuQ3NzXV0gbWV0aG9kXG4gICAqIEBwYXJhbSBjc3NcbiAgICovXG4gIHByaXZhdGUgY2xlYW5Dc3MoY3NzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gQmFzZUNvbXBvbmVudC5jbGVhbkNzcyhjc3MpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEZvcm1hdCBjc3Mgc2VsZWN0b3JzLiBSZW1vdmUgZG90XG4gICAqIEBwYXJhbSBjc3NcbiAgICogQHJldHVybnMgTmV3IENTUyBzZWxlY3RvciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjbGVhbkNzcyhjc3M6IHN0cmluZykge1xuICAgIGlmIChjc3MgIT0gbnVsbCAmJiBjc3MuaW5kZXhPZihcIi5cIikgPj0gMCkge1xuICAgICAgLy9tb3JlIHRoYW4gb25lIHN0eWxlP1xuICAgICAgaWYgKGNzcy5pbmRleE9mKFwiIFwiKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKGNzcy5zcGxpdChcIiBcIiksIChpdGVtKSA9PiB0aGlzLmNsZWFuQ3NzKGl0ZW0pKS5qb2luKFwiIFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb25seSBvbmUgc3R5bGVcbiAgICAgICAgcmV0dXJuIGNzcy5yZXBsYWNlKC9cXC4vZywgJy0nKS5yZXBsYWNlKC9eXFwtLywgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjc3M7XG4gIH1cblxuICAvKipcbiAgICogQWJzdHJhY3QgbWV0aG9kIGdldHMgdGhlIGluc3RhbmNlJ3MgW1tDaGFuZ2VEZXRlY3RvclJlZl1dLiBTaG91bGQgYmUgaW1wbGVtZW50ZWQgaW4gc3ViIGNsYXNzXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKTogQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAgIC8vc3ViLWNsYXNzIG92ZXJyaWRlXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTWFyayBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIG1hcmtGb3JDaGVjaygpIHtcbiAgICBpZiAodGhpcy5fdGVtcEZyZWV6ZUNkICE9PSB0cnVlICYmIHRoaXMuX2lzRHlpbmcgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZSBjaGFuZ2UgZGV0ZWN0aW9uIG9uIGNvbXBvbmVudFxuICAgKi9cbiAgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5fdGVtcEZyZWV6ZUNkICE9PSB0cnVlICYmIHRoaXMuX2lzRHlpbmcgIT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmdldENoYW5nZURldGVjdG9yKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldENoYW5nZURldGVjdG9yKCkuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgQ1NTIGhlaWdodCBhbmQgd2lkdGggc3R5bGUgdmFsdWUuIEVpdGhlciAnaGVpZ2h0L3dpZHRoJyBvciAnbWF4LWhlaWdodC9tYXgtd2lkdGgnXG4gICAqIEBwYXJhbSBoZWlnaHRTdHlsZU5hbWVcbiAgICogQHBhcmFtIHdpZHRoU3R5bGVOYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgaW5pdFdpZHRoSGVpZ2h0U3R5bGUoaGVpZ2h0U3R5bGVOYW1lOiBzdHJpbmcgPSAnaGVpZ2h0Jywgd2lkdGhTdHlsZU5hbWU6IHN0cmluZyA9ICdtYXgtd2lkdGgnKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbEhlaWdodCAhPSBudWxsICYmIHRoaXMuY29udHJvbEhlaWdodCAhPSBcIlwiICYmIHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgPiAwKSB7XG4gICAgICB0aGlzLnN0eWxlc1tcImhlaWdodFwiXSA9IHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udHJvbFdpZHRoICE9IG51bGwgJiYgdGhpcy5jb250cm9sV2lkdGggIT0gXCJcIiAmJiBwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aCkgPiAwKSB7XG4gICAgICB0aGlzLnN0eWxlc1t3aWR0aFN0eWxlTmFtZV0gPSBwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aCkgKyBcInB4XCI7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEFkZCBhIHJhZGlvIGJ1dHRvbiBjb21wb25lbnQgdG8gdGhpcyBjb21wb25lbnRcbiAgICogQHBhcmFtIHJhZGlvXG4gICAqL1xuICBhZGRSYWRpb0J1dHRvbkdyb3VwKHJhZGlvOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgLy9yYWRpbyBncm91cCBuZWVkIHRvIGJlIGF0IFZpZXdDb21wb25lbnQgbGV2ZWxcbiAgICBpZiAodGhpcy5pc1ZpZXcoKSAhPT0gdHJ1ZSAmJiB0aGlzLmdldFBhcmVudCgpICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudCgpLmFkZFJhZGlvQnV0dG9uR3JvdXAocmFkaW8pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJhZGlvQnV0dG9uR3JvdXBzID09IG51bGwpIHtcbiAgICAgIHRoaXMucmFkaW9CdXR0b25Hcm91cHMgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8QmFzZUNvbXBvbmVudD4+KCk7XG4gICAgfVxuXG4gICAgLy9pZ25vcmUgdHlwZSB0byBwcmV2ZW50IGNpcmN1bGFyIHJlZlxuICAgIGxldCBncm91cElkOiBzdHJpbmcgPSAocmFkaW8gYXMgYW55KS5ncm91cDtcblxuICAgIGlmICh0aGlzLnJhZGlvQnV0dG9uR3JvdXBzLmdldChncm91cElkKSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJhZGlvQnV0dG9uR3JvdXBzLnNldChncm91cElkLCBbcmFkaW9dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYWRpb0J1dHRvbkdyb3Vwcy5nZXQoZ3JvdXBJZCkucHVzaChyYWRpbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCByYWRpbyBidXR0b24gZ3JvdXAgYnkgZ3JvdXAgSURcbiAgICogQHBhcmFtIGdyb3VwSWRcbiAgICogQHJldHVybnMgIFJhZGlvIGJ1dHRvbiBncm91cCBjb21wb25lbnRcbiAgICovXG4gIGdldFJhZGlvQnV0dG9uR3JvdXAoZ3JvdXBJZDogc3RyaW5nKSB7XG4gICAgbGV0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgIHJldHVybiB2aWV3ICE9IG51bGwgJiYgdmlldy5yYWRpb0J1dHRvbkdyb3VwcyAhPSBudWxsID8gdmlldy5yYWRpb0J1dHRvbkdyb3Vwcy5nZXQoZ3JvdXBJZCkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tjb250cm9sV2lkdGhdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gd2lkdGggU2hvdWxkIGJlIG51bWVyaWMgdmFsdWVcbiAgICovXG4gIHNldENvbnRyb2xXaWR0aCh3aWR0aDogYW55KSB7XG4gICAgdGhpcy5jb250cm9sV2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgW1tjb250cm9sSGVpZ2h0XV0gcHJvcGVydHlcbiAgICogQHBhcmFtIGhlaWdodCBTaG91bGQgYmUgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0Q29udHJvbEhlaWdodChoZWlnaHQ6IGFueSkge1xuICAgIHRoaXMuY29udHJvbEhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuaW5pdFdpZHRoSGVpZ2h0U3R5bGUoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciBbW3NldENvbnRyb2xXaWR0aF1dIG1ldGhvZFxuICAgKiBAcGFyYW0gd2lkdGggU2hvdWxkIGJlIGEgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0V2lkdGgod2lkdGg6IGFueSkge1xuICAgIHRoaXMuc2V0Q29udHJvbFdpZHRoKHdpZHRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tjb250cm9sV2lkdGhdXSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBWYWx1ZSBvZiBbW2NvbnRyb2xXaWR0aF1dXG4gICAqL1xuICBnZXRXaWR0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlhcyBmb3IgW1tzZXRDb250cm9sSGVpZ2h0XV0gbWV0aG9kXG4gICAqIEBwYXJhbSBoZWlnaHQgU2hvdWxkIGJlIGEgbnVtZXJpYyB2YWx1ZVxuICAgKi9cbiAgc2V0SGVpZ2h0KGhlaWdodDogYW55KSB7XG4gICAgdGhpcy5zZXRDb250cm9sSGVpZ2h0KGhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY29udHJvbEhlaWdodF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIFtbY29udHJvbEhlaWdodF1dXG4gICAqL1xuICBnZXRIZWlnaHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sSGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdmFsdWUgb2YgW1t4XV0gcHJvcGVydHkgZm9yIGhvcml6b250YWwgcG9zaXRpb24uXG4gICAqIFNldHMgQ1NTIFwibGVmdFwiIHByb3BlcnR5IHRvIFtbeF1dIHB4LlxuICAgKiBAcGFyYW0geCBIb3Jpem9udGFsIGNvb3JkaW5hdGUgcG9zaXRpb25cbiAgICovXG4gIHNldFgoeDogc3RyaW5nKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnN0eWxlc1tcImxlZnRcIl0gPSB4ICsgXCJweFwiO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbeF1dIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIFZhbHVlIG9mIFtbeF1dXG4gICAqL1xuICBnZXRYKCkge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB2YWx1ZSBvZiBbW3ldXSBwcm9wZXJ0eSBmb3IgdmVydGljYWwgcG9zaXRpb24uXG4gICAqIFNldHMgQ1NTIFwidG9wXCIgcHJvcGVydHkgdG8gW1t5XV0gcHguXG4gICAqIEBwYXJhbSB5IFZlcnRpY2FsIGNvb3JkaW5hdGUgcG9zaXRpb25cbiAgICovXG4gIHNldFkoeTogc3RyaW5nKSB7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnN0eWxlc1tcInRvcFwiXSA9IHkgKyBcInB4XCI7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1t5XV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1t5XV1cbiAgICovXG4gIGdldFkoKSB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1tib3JkZXJXaWR0aF1dIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBib3JkZXJXaWR0aCBTaG91bGQgYmUgbnVtZXJpY1xuICAgKi9cbiAgc2V0Qm9yZGVyV2lkdGgoYm9yZGVyV2lkdGg6IHN0cmluZykge1xuICAgIHRoaXMuYm9yZGVyV2lkdGggPSBib3JkZXJXaWR0aDtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNvbXBvbmVudCBpcyB2aWV3IGNvbXBvbmVudC5cbiAgICogSW1wbGVtZW50IGluIHN1YiBjbGFzc1xuICAgKi9cbiAgaXNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGVyZSBhcmUgYWN0aXZlIHZpZXdzLlxuICAgKiBJbXBsZW1lbnQgaW4gc3ViIGNsYXNzXG4gICAqL1xuICBpc05vbmVBY3RpdmVWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIGNvbXBvbmVudCBpcyBhbiBpbnN0YW5jZSBvZiBbW0RpYWxvZ0NvbXBvbmVudF1dXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNEaWFsb2coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgZHluYW1pYyB2aWV3XG4gICAqL1xuICBpc0R5bmFtaWNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBhcmVudCB2aWV3IG9mIHRoaXMgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFBhcmVudCB2aWV3IGNvbXBvbmVudFxuICAgKi9cbiAgZ2V0UGFyZW50VmlldygpOiBCYXNlQ29tcG9uZW50IHtcbiAgICBpZiAodGhpcy5pc1ZpZXcoKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHBhcmVudFZpZXc6IEJhc2VDb21wb25lbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBbdGhpcy5wYXJlbnRdO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHRlbXAuaXNWaWV3KCkgPT09IHRydWUpIHtcbiAgICAgICAgICBwYXJlbnRWaWV3ID0gdGVtcDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZW1wLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3RhY2sucHVzaCh0ZW1wLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50VmlldztcbiAgfVxuXG4gIGdldFBhcmVudFNjcm9sbFZpZXcoKTogQmFzZUNvbXBvbmVudCB7XG4gICAgaWYgKHRoaXMuaXNTY3JvbGxWaWV3KCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxldCBwYXJlbnRWaWV3OiBCYXNlQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICBsZXQgc3RhY2s6IEFycmF5PEJhc2VDb21wb25lbnQ+ID0gW3RoaXMucGFyZW50XTtcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdGVtcCA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmICh0ZW1wLmlzU2Nyb2xsVmlldygpID09PSB0cnVlKSB7XG4gICAgICAgICAgcGFyZW50VmlldyA9IHRlbXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrLnB1c2godGVtcC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFZpZXc7XG4gIH1cblxuICBpc1Njcm9sbFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcGFyZW50IGNvbnRhaW5lciBjb21wb25lbnQgKGZvciBzdWJ2aWV3KSwgbm90IHRoZSBhY3R1YWwgcGFyZW50IHZpZXcuIFRoaXMgaXMgdGhlIHBhcmVudFxuICAgKiBWaWV3Q29tcG9uZW50IHdoZXJlIGNhbkJlQWN0aXZlVmlldyBpcyBmYWxzZVxuICAgKi9cbiAgX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCk6IEJhc2VDb21wb25lbnQge1xuICAgIGlmICh0aGlzLmlzTm9uZUFjdGl2ZVZpZXcoKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHBhcmVudFZpZXc6IEJhc2VDb21wb25lbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBbdGhpcy5wYXJlbnRdO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHRlbXAuaXNOb25lQWN0aXZlVmlldygpID09PSB0cnVlKSB7XG4gICAgICAgICAgcGFyZW50VmlldyA9IHRlbXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrLnB1c2godGVtcC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFZpZXc7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgY29udGV4dCBtZW51IGNsaWNrIChyaWdodCBjbGljaykuXG4gICAqIERlbGVnYXRlcyB0byBbW1Nlc3Npb25TZXJ2aWNlXV0gdG8gZGlzcGxheSBwb3B1cC5cbiAgICogQHBhcmFtIGV2ZW50IENsaWNrIGV2ZW50XG4gICAqIEBwYXJhbSBmb3JjZSBhbHdheXMgZW1pdFxuICAgKi9cbiAgaGFuZGxlT25Db250ZXh0TWVudShldmVudDogTW91c2VFdmVudCwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIC8vYWxsb3cgY29tcG9uZW50IHRvIHNraXAgZW1pdCBldmVudCBhbmQgbGV0IHBhcmVudCAoaS5lLiB0YWJsZSBjZWxsIHRvIGVtaXQgaXQpXG4gICAgaWYgKGZvcmNlID09PSB0cnVlIHx8IHRoaXMuc2tpcEVtaXRDb250ZXh0TWVudUV2ZW50ICE9PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5nZXRTZXNzaW9uKCkgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5zZXRNb3VzZVBvc2l0aW9uKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuICAgICAgbGV0IHBvcHVwTWVudUlkOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgIHBvcHVwTWVudUlkID0gKHBhcmVudFZpZXcgYXMgVmlld0NvbXBvbmVudCkuZ2V0Rmlyc3RQb3B1cE1lbnVJZCgpO1xuICAgICAgfVxuXG5cbiAgICAgIHRoaXMub25Db250ZXh0TWVudS5lbWl0KGV2ZW50KTtcblxuXG4gICAgICBpZiAodGhpcy5wb3B1cCAhPSBudWxsICYmIHRoaXMucG9wdXAgIT09IFwiXCIpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAuaW5kZXhPZihcIiNcIikgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBvcHVwID0gdGhpcy5wb3B1cC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBwb3B1cE1lbnVJZCA9IHRoaXMucG9wdXA7XG5cbiAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuX2N1cnJlbnRQb3B1cE1lbnVJZCA9IHRoaXMucG9wdXA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3B1cE1lbnVJZCAhPSBudWxsKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRtID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRtKTtcblxuICAgICAgICAgIGlmICh0aGlzLmdldFNlc3Npb24oKS5fY3VycmVudFBvcHVwTWVudUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBvcHVwTWVudUlkID0gdGhpcy5nZXRTZXNzaW9uKCkuX2N1cnJlbnRQb3B1cE1lbnVJZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5zaG93Q29udGV4dE1lbnUocG9wdXBNZW51SWQpO1xuICAgICAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLl9jdXJyZW50UG9wdXBNZW51SWQgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgZm9jdXMgbG9zdCBldmVudCBmb3IgY29tcG9uZW50cyB0aGF0IHJlcXVpcmUgdmFsaWRhdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQGV2ZW50IEJlZm9yZUFjdGl2ZUxvc3RcbiAgICovXG4gIHZhbGlkYXRlRmllbGQoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBpZiAoQXBwVXRpbHMudmFsaWRhdGVGaWVsZCAhPSBudWxsICYmIEFwcFV0aWxzLnZhbGlkYXRlRmllbGQodGhpcykgIT09IHRydWUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uQmVmb3JlQWN0aXZlTG9zdC5lbWl0KCk7XG5cbiAgICB0aGlzLmZvY3VzTG9zdCgpO1xuICB9XG5cbiAgLy9pdGVyYXRhdGl2ZSBmdW5jdGlvbiB0byBwcmV2ZW50IHN0YWNrIG92ZXJmbG93XG4gIC8vIHJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlKCkge1xuICAvLyAgIGlmICh0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlICE9IG51bGwgJiYgdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5sZW5ndGggPiAwKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZTtcbiAgLy8gICB9XG5cbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gW107XG5cbiAgLy8gICBpZiAodGhpcy5jaGlsZHJlbiA9PSBudWxsKSB7XG4gIC8vICAgICBMb2dnZXIud2FybihcInJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlLCBjaGlsZHJlbiBpcyBudWxsXCIpO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuX3JlZHVjZUNoaWxkcmVuSXRlcmF0aXZlQ2FjaGU7XG4gIC8vICAgfVxuXG4gIC8vICAgLy9za2lwIERpYWxvZ0NvbXBvbmVudFxuICAvLyAgIGxldCBzdGFjazogQXJyYXk8QmFzZUNvbXBvbmVudD4gPSBfLmZpbHRlcihBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4udmFsdWVzKCkpLCAoY29tcDogQmFzZUNvbXBvbmVudCk9PntcbiAgLy8gICAgIHJldHVybiBjb21wLmlzRmF1eEVsZW1lbnQoKSB8fCBjb21wLmlzRGlhbG9nKCkgIT09IHRydWU7XG4gIC8vICAgfSk7XG5cbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5jb25jYXQoc3RhY2spO1xuICAvLyAgIGxldCBjb3VudGVyID0gMDtcblxuICAvLyAgIHdoaWxlKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgLy8gICAgIGNvbnN0IGNoaWxkID0gc3RhY2sucG9wKCk7XG5cbiAgLy8gICAgIGlmIChjaGlsZC5jaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkLmNoaWxkcmVuLnNpemUgPiAwKSB7XG4gIC8vICAgICAgIC8vZ2V0IGdyYW5kY2hpbGRyZW5cbiAgLy8gICAgICAgY29uc3QgZ3JhbmRDaGlsZHJlbiA9IEFycmF5LmZyb20oY2hpbGQuY2hpbGRyZW4udmFsdWVzKCkpO1xuICAvLyAgICAgICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZS5jb25jYXQoZ3JhbmRDaGlsZHJlbik7XG5cbiAgLy8gICAgICAgLy9wdXNoIHRvIG91ciBzdGFjayB0byBpdGVyYXRlIG91ciBncmFuZGNoaWxkcmVuIHRvIGxvb2sgZm9yIGdyZWF0IGdyYW5kY2hpbGRyZW5cbiAgLy8gICAgICAgc3RhY2sgPSBzdGFjay5jb25jYXQoZ3JhbmRDaGlsZHJlbik7XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIGNvdW50ZXIrKztcblxuICAvLyAgICAgaWYgKGNvdW50ZXIgPiAxMDAwMCB8fCBzdGFjay5sZW5ndGggPiAxMDAwMCkge1xuICAvLyAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXNlQ29tcG9uZW50LnJlZHVjZUNoaWxkcmVuSXRlcmF0aXZlOiBzdGFjayBvdmVyZmxvd1wiKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICByZXR1cm4gdGhpcy5fcmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hpbGRyZW4gb2YgYSB0YWJsZSBjb21wb25lbnQuXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHRhYmxlIGNoaWxkcmVuXG4gICAqL1xuICBnZXRUYWJsZUNoaWxkcmVuKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tiZ0NvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tiZ0NvbG9yXV1cbiAgICovXG4gIGdldEJnQ29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmdDb2xvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBdHRyaWJ1dGVGcm9tRGVmKCkge1xuICAgIGNvbnN0IGNvbXBEZWYgPSB0aGlzLmdldFNlc3Npb24oKS5nZXREZWYodGhpcy5pZCk7XG5cbiAgICBpZiAoY29tcERlZiAhPSBudWxsICYmIGNvbXBEZWYuYXR0cmlidXRlICE9IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBNYXAgfHxcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBIYXNodGFibGUgfHxcbiAgICAgICAgY29tcERlZi5hdHRyaWJ1dGUgaW5zdGFuY2VvZiBIYXNoTWFwXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IGNvbXBEZWYuYXR0cmlidXRlLmtleXMoKTtcbiAgICAgICAgbGV0IGtleSA9IGtleXMubmV4dCgpO1xuXG4gICAgICAgIHdoaWxlIChrZXkuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleS52YWx1ZSwgY29tcERlZi5hdHRyaWJ1dGUuZ2V0KGtleSkpO1xuICAgICAgICAgIGtleSA9IGtleXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKGNvbXBEZWYuYXR0cmlidXRlKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgY29tcERlZi5hdHRyaWJ1dGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB4cGF0aCBsb29rdXAgb24gdGhlIGVsZW1lbnQuIFRoaXMgd2lsbCBiZSBldmFsdWF0ZWQgYWdhaW5zdCB0aGUgYWN0dWFsIEhUTUxFbGVtZW50LlxuICAgKlxuICAgKiBAd2FybmluZyBQTEVBU0UgRU5TVVJFIFRPIEZSRUUgVVAgVEhFIFRIRSBSRVNVTFQgU08gV0UgRE9OJ1QgSEFWRSBBTlkgREFOR0xJTkcgSFRNTCBFTEVNRU5UXG4gICAqXG4gICAqIEBwYXJhbSB4cGF0aEV4cHJlc3Npb25cbiAgICovXG4gIGV2YWx1YXRlWFBhdGgoeHBhdGhFeHByZXNzaW9uOiBzdHJpbmcpOiBWZWN0b3I8Tm9kZT4ge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjb2xvciBvZiBoaWdodGxpZ2h0ZWQgdGV4dCBiYWNrZ3JvdW5kXG4gICAqIEBwYXJhbSBjb2xvciBTaG91bGQgYmUgYSB2YWxpZCBDU1MgY29sb3IgdmFsdWUgKGUuZy4gXCIjRkYwMDAwXCIgb3IgXCJyZWRcIilcbiAgICovXG4gIHNldEhpZ2hsaWdodEJnQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuaGlnaGxpZ2h0QmdDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjb2xvciBvZiBoaWdobGlnaHRlZCB0ZXh0IGZvcmVncm91bmRcbiAgICogQHBhcmFtIGNvbG9yIFNob3VsZCBiZSBhIHZhbGlkIENTUyBjb2xvciB2YWx1ZSAoZS5nLiBcIiNGRjAwMDBcIiBvciBcInJlZFwiKVxuICAgKi9cbiAgc2V0SGlnaGxpZ2h0Rm9udENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmhpZ2hsaWdodEZvbnRDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2hpZ2h0bGlnaHRCZ0NvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRIaWdobGlnaHRCZ0NvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEJnQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbaGlnaGxpZ2h0Rm9udENvbG9yXV0gcHJvcGVydHlcbiAgICogQHJldHVybnMgQ29sb3Igc3RyaW5nXG4gICAqL1xuICBnZXRIaWdobGlnaHRGb250Q29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0Rm9udENvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW3BhcmVudFRhYmxlUm93XV0gcHJvcGVydHlcbiAgICovXG4gIGdldFBhcmVudFRhYmxlUm93KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudFRhYmxlUm93O1xuICB9XG5cbiAgLy9jbGVhciByZWR1Y2UgY2hpbGRyZW4gaXRlcmF0aXZlIGNhY2hlXG4gIC8vIHJlc2V0UmVkdWNlQ2hpbGRyZW5JdGVyYXRpdmVDYWNoZSgpIHtcbiAgLy8gICB0aGlzLl9yZWR1Y2VDaGlsZHJlbkl0ZXJhdGl2ZUNhY2hlID0gbnVsbDtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBjaGFuZ2UgZGV0ZWN0aW9uIGlzIGZyb3plblxuICAgKiBAcmV0dXJucyBCb29sZWFuIElmIGNvbXBvbmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIGZyb3plblxuICAgKi9cbiAgaXNDaGFuZ2VEZXRlY3Rpb25Gcm96ZW4oKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNvbXBvbmVudCBpcyBhIGZhdXggZWxlbWVudFxuICAgKiBAcmV0dXJucyBCb29sZWFuIElmIGNvbXBvbmVudCBpcyBmYXV4IGVsZW1lbnRcbiAgICovXG4gIGlzRmF1eEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbnRlcm5hbCBbW192aWV3Q2hpbGRyZW5NYXBdXSBtZW1iZXJcbiAgICogQHJldHVybnMgVmFsdWUgb2YgW1tfdmlld0NoaWxkcmVuTWFwXV1cbiAgICovXG4gIGdldFZpZXdDaGlsZHJlbk1hcCgpOiBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHZpZXcgY2hpbGQgd2l0aCBpZCBmcm9tIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqIEBwYXJhbSBpZCBJRCBvZiBjaGlsZCB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZVZpZXdDaGlsZEZyb21NYXAoaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwLmRlbGV0ZShLZXlVdGlscy50b01hcEtleShpZCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY29tcG9uZW50IHRvIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqIEBwYXJhbSBvYmogQ2hpbGQgdG8gYWRkIHRvIFtbX3ZpZXdDaGlsZHJlbk1hcF1dXG4gICAqL1xuICBhZGRWaWV3Q2hpbGRUb01hcChvYmo6IEJhc2VDb21wb25lbnQgfCBIVE1MRWxlbWVudFdyYXBwZXIpIHtcbiAgICBpZiAodGhpcy5fdmlld0NoaWxkcmVuTWFwICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcC5zZXQoS2V5VXRpbHMudG9NYXBLZXkob2JqLmdldElkKCkpLCBvYmogYXMgYW55KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlIGFuIE1DTyBtZXRob2QgYnkgbmFtZS4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgYXJndW1lbnQsIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGhcbiAgICogdGhpcyBjb21wb25lbnQgYXMgYW4gYXJndW1lbnQuXG4gICAqIEBwYXJhbSBhY3Rpb24gTmFtZSBvZiBhY3Rpb24gbWV0aG9kIHRvIGludm9rZSBvciBhIGZ1bmN0aW9uIHRvIGludm9rZVxuICAgKi9cbiAgcHJvdGVjdGVkIGludm9rZU1jb0FjdGlvbihhY3Rpb246IHN0cmluZyB8ICgoYXJnPzogYW55KSA9PiBhbnkpKSB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYWN0aW9uKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uLmluZGV4T2YoXCJtY286Ly9cIikgPT09IDApIHtcbiAgICAgIGNvbnN0IG1jb05hbWUgPSBhY3Rpb24uc3Vic3RyaW5nKDYsIGFjdGlvbi5pbmRleE9mKFwiLlwiKSk7XG4gICAgICBjb25zdCBtZXRob2ROYW1lID0gYWN0aW9uLnN1YnN0cmluZyhhY3Rpb24uaW5kZXhPZihcIi5cIikgKyAxLCBhY3Rpb24uaW5kZXhPZihcIihcIikpO1xuICAgICAgY29uc3QgYXJnID0gYWN0aW9uLnN1YnN0cmluZyhhY3Rpb24uaW5kZXhPZihcIihcIikgKyAxLCBhY3Rpb24uaW5kZXhPZihcIilcIikpO1xuXG4gICAgICBpZiAoYXJnICE9IG51bGwgJiYgYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWNvID0gdGhpcy5zZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5nZXRNY28obWNvTmFtZSk7XG5cbiAgICAgICAgaWYgKG1jbyAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGFyZyA9PT0gXCJ0aGlzXCIpIHtcbiAgICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28sIFt0aGlzXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28sIFthcmddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBleGVjdXRlIE1DTyBhY3Rpb24sIG1jbyBub3QgZm91bmQ6IFwiICsgbWNvTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1jbyA9IHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0TWNvQ29udGFpbmVyKCkuZ2V0TWNvKG1jb05hbWUpO1xuXG4gICAgICAgIGlmIChtY28gIT0gbnVsbCkge1xuICAgICAgICAgIG1jb1ttZXRob2ROYW1lXS5hcHBseShtY28pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZXhlY3V0ZSBNQ08gYWN0aW9uLCBtY28gbm90IGZvdW5kOiBcIiArIG1jb05hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9ub3RpZnlJbnRlcm5hbENoYW5nZUNiKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5faW50ZXJuYWxDaGFuZ2VDYiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbENoYW5nZUNiKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGVtcHR5Q2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaXQgPSB0aGlzLl92aWV3Q2hpbGRyZW5NYXAudmFsdWVzKCk7XG4gICAgICBsZXQgdmFsID0gY2l0Lm5leHQoKTtcblxuICAgICAgd2hpbGUgKHZhbC5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgIC8vc29tZSBjaGlsZHJlbiBhcmUgbm90IGFjdHVhbCBCYXNlQ29tcG9uZW50XG4gICAgICAgIGlmICh0eXBlb2YgdmFsLnZhbHVlLmVtcHR5Q2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHZhbC52YWx1ZS5lbXB0eUNoaWxkcmVuKCk7XG4gICAgICAgICAgdmFsLnZhbHVlLl9pc0R5aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IGNpdC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwLmNsZWFyKCk7XG4gICAgICBkZWxldGUgdGhpcy5fdmlld0NoaWxkcmVuTWFwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoaXMgaXMgYSBTY3JvbGxQYW5lQ29tcG9uZW50XG4gICAqL1xuICBpc1Njcm9sbFBhbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzY3JvbGwgcG9zaXRpb24gdG8gdGhlIHByZXZpb3VzIGNhcHR1cmVkXG4gICAqL1xuICByZXNldFNjcm9sbFRvcFRvUHJldmlvdXNQb3NpdGlvbigpIHtcbiAgICAvL2ltcGxlbWVudCBieSBzY3JvbGxwYW5lXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHNjcm9sbHBhbmUgcG9zXG4gICAqL1xuICByZXNldEFsbFNjcm9sbFBhbmVzUG9zaXRpb25Ub1ByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFBhbmVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMuZm9yRWFjaCgoc2Nyb2xsUGFuZSkgPT4gc2Nyb2xsUGFuZS5yZXNldFNjcm9sbFRvcFRvUHJldmlvdXNQb3NpdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICByZXNldFNjcm9sbFRvcFBvc2l0aW9uKCkge1xuICB9XG4gIHJlc2V0QWxsU2Nyb2xsUGFuZXNQb3NpdGlvblRvVG9wKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFBhbmVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMuZm9yRWFjaCgoc2Nyb2xsUGFuZSkgPT4gc2Nyb2xsUGFuZS5yZXNldFNjcm9sbFRvcFBvc2l0aW9uKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZnkgcGFyZW50IHZpZXcgdGhhdCB0aGVyZSBpcyBhIHZhbGlkYXRpb24gZXJyb3Igb24gdGhpcywgdGhpcyBzaG91bGQgb25seSBiZSBhcHBsaWNhYmxlZCB0byBkaXNhYmxlZCBlbGVtZW50XG4gICAqL1xuICBub3RpZnlQYXJlbnRPZkVycm9yKCkge1xuICAgIGlmICh0aGlzLmdldERpc2FibGVkKCkgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCAmJiBwYXJlbnRWaWV3W1wiZGlhbG9nXCJdICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHBhcmVudFZpZXdbXCJkaWFsb2dcIl0uX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmVudFZpZXdbXCJkaWFsb2dcIl0uX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRWaWV3W1wiZGlhbG9nXCJdLl9kaXNhYmxlZEVycm9yRWxlbWVudElkLmluZGV4T2YodGhpcy5nZXRJZCgpKSA8IDApIHtcbiAgICAgICAgICBwYXJlbnRWaWV3W1wiZGlhbG9nXCJdLl9kaXNhYmxlZEVycm9yRWxlbWVudElkLnB1c2godGhpcy5nZXRJZCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgcGFyZW50IHRhYlxuICAgKi9cbiAgZm9jdXNQYXJlbnRUYWIoKSB7XG4gICAgLy9nZXQgcGFyZW50IHZpZXdcbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwpIHtcbiAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoaXMgdmlldyBpcyBpbiBhIFRhYlBhbmVcbiAgICAgIGNvbnN0IHRhYlBhbmUgPSBwYXJlbnRWaWV3LmdldFBhcmVudCgpO1xuXG4gICAgICAvL2NoZWNrIHRvIHNlZSBpZiB0aGUgcGFyZW50IGlzIGEgVGFiXG4gICAgICBpZiAodGFiUGFuZSAhPSBudWxsICYmIHRhYlBhbmUuZ2V0TnhUYWdOYW1lKCkgPT09IFwidGFiXCIpIHtcbiAgICAgICAgdGFiUGFuZS5zZXRGb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBzY3JvbGxwYW5lXG4gICAqXG4gICAqIEBwYXJhbSBzY3JvbGxQYW5lIHNjcm9sbFBhbmUgdG8gcmVnaXN0ZXJcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJTY3JvbGxQYW5lKHNjcm9sbFBhbmU6IEJhc2VDb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIHNjcm9sbFBhbmUuaXNTY3JvbGxQYW5lID09PSBcImZ1bmN0aW9uXCIgJiYgc2Nyb2xsUGFuZS5pc1Njcm9sbFBhbmUoKSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsUGFuZXMgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNjcm9sbFBhbmVzID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsUGFuZXMucHVzaChzY3JvbGxQYW5lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==