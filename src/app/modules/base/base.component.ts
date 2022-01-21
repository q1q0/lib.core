import { Component, Optional, SkipSelf, AfterViewInit, Input, OnDestroy, ElementRef, OnInit, ChangeDetectorRef, ComponentRef, Output, EventEmitter, Renderer2 } from "@angular/core";

import * as _ from 'lodash';
import { SessionService } from "../session/session.service";
import { KeyUtils } from "./key-utils";
import { AttributesEnum } from "./attributes.enum";
import { JavaUtils } from "../java/java-utils";
import { ClientEvent } from "../event-handler/client-event";
import { BorderPosition } from "./style-literals";
import { Vector } from "../java/vector";
import { AttributeChangeListener } from "./attribute-change-listener";
import { AttributeChangeEvent } from "./attribute-change-event";
import { AppUtils } from "./app-utils";
import { Hashtable } from "../java/hashtable";
import { HashMap } from "../java/hash-map";
import { ViewComponent } from "../view/view.component";
import { Logger } from "./logger";
import { HTMLElementWrapper } from "../tree-table/html-element-wrapper";
import { AttributeNameValue } from "./attribute-name-value";
import { TrustedStyleString } from "@angular/core/src/sanitization/bypass";
import { TabComponent } from "../tab-pane/tab/tab.component";
import { TabPaneComponent } from "../tab-pane/tab-pane.component";

declare var $: any;

/**
 * Main class that all core components should inherit.
 */
@Component({
  selector: 'vt-base',
  template: 'nothing here'
})
export class BaseComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() autoWrap: boolean;
  @Input() borderPosition: BorderPosition;
  @Input() id: string;
  @Input() disabled: boolean = false;
  @Input() textEditable: boolean = true;
  @Input() sort: string = "";
  @Input() visible: boolean = true;
  @Input() text: string = "";
  @Input() set cssClass(css: string) {
    this._cssClass = this.cleanCss(css);
    this.initBorderLayout();
  }

  @Input() controlWidth: string;
  @Input() controlHeight: string;
  @Input() maxHeight: string;
  @Input() lineHeight: string;
  @Input() marginRight: string;
  @Input() marginLeft: string;
  @Input() marginTop: string;
  @Input() marginBottom: string;
  @Input() controlMargin: string;
  @Input() controlPadding: string;
  @Input() controlOverflow: string;
  @Input() panelWidth: string;
  @Input() panelMinWidth: string;
  @Input() panelMinHeight: string;
  @Input() controlFloat: string;
  @Input() required: boolean = false;
  @Input() pattern: string;
  @Input() min: number | string;
  @Input() max: number | string;
  @Input() minLength: number | string;
  @Input() maxLength: number | string;
  @Input() inputLocale: string;
  @Input() inputCharsets: string;
  @Input() focusOnActivation: boolean;
  @Input() focused: boolean;
  @Input() orderIndex: number = -1;
  @Input() x: string;
  @Input() y: string;
  @Input() set require(req: boolean) {
    this.required = req;
  }
  @Input() controlWidthComboBox: string;

  /**
   * Accessor for [[required]] property
   */
  get require(): boolean {
    return this.required;
  }

  /* istanbul ignore next */
  //add to prevent confusion
  @Input() class(css: string) {
    this.cssClass = css;
  }

  /**
   * Accessor for [[cssClass]] property
   */
  get cssClass(): string {
    return this._cssClass;
  }

  //TODO need to figure out what these do
  @Input() hGrabSpace: boolean;
  @Input() vGrabSpace: boolean;

  @Input() bgColor: string;

  //use by <defs ....>
  //e.g. <vt-combo-box id="foo" editor="#fooBar" ...>
  @Input() editor: string;

  //popup menu id that should pop when this comp is right click (if there is any)
  @Input() popup: string;

  /**
   * Align horizontally? TODO need is a major regression test
   */
  @Input() alignHorizontal: string;

  private _cssClass: string;

  /* istanbul ignore next */
  compRef: ComponentRef<any>;

  /* istanbul ignore next */
  private _tempFreezeCd: boolean;

  //alias for disabled
  @Input() set enabled(boo: boolean) {
    if (typeof boo === 'string') {
      //if enabled is false, disabled is true
      this.disabled = boo === 'true' ? false : true;
    } else {
      this.disabled = !boo;
    }
  }

  get enabled(): boolean {
    return !this.disabled;
  }

  @Input() set sortValue(value: string) {
    this.sort = value
  }

  get sortValue(): string {
    return this.sort;
  }

  //looks like Nexaweb support custom attributes key/value
  @Input() customAttributes: { [name: string]: any };

  //font
  @Input() fontBold: boolean | string;
  @Input() fontColor: string;
  @Input() fontItalic: boolean | string;
  @Input() fontSize: number;
  @Input() fontUnderline: boolean | string;
  @Input() fontColorDisabled: string;
  @Input() opacity: string;

  //border
  @Input() borderColor: string;
  @Input() borderWidth: number | string;
  @Input() borderStyle: string;
  @Input() borderHeight: number | string;

  //skip emiting context menu event
  @Input() skipEmitContextMenuEvent: boolean;

  /* istanbul ignore next */
  @Input() sendPropertyEvent: boolean = false;
  @Output() onManualEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() onContextMenu: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onActiveLost: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBeforeActiveLost: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  styles: { [name: string]: string } = {};

  //for table use
  tableRowNo: number;

  /* istanbul ignore next */
  private _uniqueId: string;

  /* istanbul ignore next */
  /**
   * This is for use when setAttribute(onCommand is set)
   */
  protected _internalOnCommand: (param?: any) => void;
  protected _internalOnActiveLost: (param?: any) => void;

  //internal use only, do not use externally
  _internalChangeCb: (comp: BaseComponent) => void;

  get uniqueId(): string {
    return this._uniqueId;
  }

  protected _children: Map<string, BaseComponent> = null;

  /* istanbul ignore next */
  protected _childrenIndex: Array<string> = null;

  get children(): Map<string, BaseComponent> {
    return this._children;
  }

  /* istanbul ignore next */
  private attributeChangeListeners: Array<AttributeChangeListener>;

  private radioButtonGroups: Map<string, Array<BaseComponent>>;

  highlightBgColor: string;
  highlightFontColor: string;

  parentTableRow: any;

  //cache reduceChildrenIterative
  // private _reduceChildrenIterativeCache: Array<BaseComponent>;

  //track all children for the view
  protected _viewChildrenMap: Map<string, BaseComponent>;

  //for TabComponent
  protected tabChildrenIds: Array<string>;

  private scrollPanes: Array<BaseComponent>;
  private tables: Array<BaseComponent>;
  private splitpanels: Array<BaseComponent>;

  _isDying: boolean;

  private static setAttributeMapStr = new Map([
    ["id",           function(value){ this.setAttribute(AttributesEnum.ID, value); }],
    ["visible",      function(value){ this.setAttribute(AttributesEnum.VISIBLE, value); }],
    ["class",        function(value){ this.setAttribute(AttributesEnum.CLASS, value); }],
    ["enabled",      function(value){ this.setAttribute(AttributesEnum.ENABLED, value); }],
    ["disabled",     function(value){ this.setAttribute(AttributesEnum.DISABLED, value); }],
    ["text",         function(value){ this.setAttribute(AttributesEnum.TEXT, value); }],
    ["color",        function(value){ this.setAttribute(AttributesEnum.COLOR, value); }],
    ["title",        function(value){ this.setAttribute(AttributesEnum.TITLE, value); }],
    ["require",      function(value){ this.setAttribute(AttributesEnum.REQUIRE, value); }],
    ["fontbold",     function(value){ this.setAttribute(AttributesEnum.FONT_BOLD, value); }],
    ["selected",     function(value){ this.setAttribute(AttributesEnum.SELECTED, value); }],
    ["bgcolor",      function(value){ this.setAttribute(AttributesEnum.BG_COLOR, value); }],
    ["value",        function(value){ this.setAttribute(AttributesEnum.VALUE, value); }],
    ["maxlength",    function(value){ this.setAttribute(AttributesEnum.MAX_LENGTH, value); }],
    ["max_length",   function(value){ this.setAttribute(AttributesEnum.MAX_LENGTH, value); }],
    ["pattern",      function(value){ this.setAttribute(AttributesEnum.PATTERN, value); }],
    ["max",          function(value){ this.setAttribute(AttributesEnum.MAX, value); }],
    ["min",          function(value){ this.setAttribute(AttributesEnum.MIN, value); }],
    ["required",     function(value){ this.setRequire(value); }],
    ["width",        function(value){ this.setControlWidth(value); }],
    ["height",       function(value){ this.setControlHeight(value); }],
    ["fontsize",     function(value){ this.setFontSize(value); }],
    ["oncommand",    function(value){ this.setOnCommand(value); }],
    ["onactivelost", function(value){ this.setOnActiveLost(value); }],
  ]);

  private static setAttributeMapEnum = new Map([
    [AttributesEnum.ID,         function(value){ this.setId(value); }],
    [AttributesEnum.TEXT,       function(value){ this.setText(value); }],
    [AttributesEnum.COLOR,      function(value){ this.setColor(value); }],
    [AttributesEnum.FONT_BOLD,  function(value){ this.setFontBold(value); }],
    [AttributesEnum.ON_COMMAND, function(value){ this.setOnCommand(value); }],
    [AttributesEnum.REQUIRE,    function(value){ this.setRequire(value); }],
    [AttributesEnum.TITLE,      function(value){ this.setTitle(value); }],
    [AttributesEnum.SELECTED,   function(value){ this.setSelected(value); }],
    [AttributesEnum.BG_COLOR,   function(value){ this.setBgColor(value); }],
    [AttributesEnum.VALUE,      function(value){ this.setValue(value); }],
    [AttributesEnum.MAX_LENGTH, function(value){ this.setMaxLength(value); }],
    [AttributesEnum.MAX,        function(value){ this.setMax(value); }],
    [AttributesEnum.MIN,        function(value){ this.setMin(value); }],
    [AttributesEnum.TEXT_EDITABLE,    function(value){ this.setTextEditable(value); }],
    [AttributesEnum.PATTERN,    function(value){ this.setPattern(value); }],
    [AttributesEnum.VISIBLE,    function(value){ if (value != null && value !== "") { this.setVisible(JavaUtils.parseBoolean(value)); }}],
    [AttributesEnum.DISABLED,   function(value){ if (value != null && value !== "") { this.setDisabled(JavaUtils.parseBoolean(value)); }}],
    [AttributesEnum.ENABLED,    function(value){ if (value != null && value !== "") { this.setDisabled(!JavaUtils.parseBoolean(value)); }}],
  ]);

  private static getAttributeMapStr = new Map([
    ["visible",    function(){ return this.getVisible() + ''; }],
    ["enabled",    function(){ return this.getEnabled() + ''; }],
    ["disabled",   function(){ return this.getDisabled() + ''; }],
    ["text",       function(){ return this.getText(); }],
    ["color",      function(){ return this.getColor();}],
    ["require",    function(){ return this.getRequired() + ''; }],
    ["value",      function(){ return this.getValue(); }],
    ["selected",   function(){ return this.getChecked() + ''; }],
    ["id",         function(){ return this.getId(); }],
    ["pattern",    function(){ return this.getPattern(); }],
    ["min",        function(){ return this.getMin(); }],
    ["max",        function(){ return this.getMax(); }],
    ["max_length", function(){ return this.getMaxLength(); }],
  ]);

  private static getAttributeMapEnum = new Map([
    [AttributesEnum.ID,         function(){ return this.getId(); }],
    [AttributesEnum.VISIBLE,    function(){ return this.getVisible() + ''; }],
    // AttributesEnum.CLASS
    [AttributesEnum.DISABLED,   function(){ return this.getDisabled() + ''; }],
    [AttributesEnum.ENABLED,    function(){ return !this.getDisabled() + ''; }],
    [AttributesEnum.TEXT,       function(){ return this.getText(); }],
    [AttributesEnum.COLOR,      function(){ return this.getColor(); }],
    // AttributesEnum.ON_COMMAND
    [AttributesEnum.REQUIRE,    function(){ return this.getRequired() + ''; }],
    // AttributesEnum.TITLE
    [AttributesEnum.FONT_BOLD,  function(){ return this.fontBold + ''; }],
    [AttributesEnum.SELECTED,   function(){ return this.getChecked() + ''; }],
    [AttributesEnum.BG_COLOR,   function(){ return this.bgColor; }],
    [AttributesEnum.VALUE,      function(){ return this.getValue(); }],
    [AttributesEnum.PATTERN,    function(){ return this.getPattern(); }],
    [AttributesEnum.MAX_LENGTH, function(){ return this.getMaxLength(); }],
    [AttributesEnum.MAX,        function(){ return this.getMax(); }],
    [AttributesEnum.MIN,        function(){ return this.getMin(); }],
  ]);

  private parentView: BaseComponent = null;

  private parentScrollView: BaseComponent = null;
  private parentDialogView: BaseComponent = null;

  /**
   * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
   * but it must provided the minimal required items to be injected.
   *
   * @param parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
   * @param sessionService SessionService needed by this class, this should be injected by Angular.
   * @param elementRef the element reference that wrap the element (tag) of this component.
   * @param renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
   */
  constructor(@Optional() @SkipSelf() protected parent: BaseComponent, private sessionService: SessionService, protected elementRef: ElementRef, protected renderer: Renderer2) {
    this._uniqueId = BaseComponent.generateUniqueId();

    //initial id
    this.id = this._uniqueId;
  }

  /* istanbul ignore next */
  /**
   * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
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
    this.onManualEvent.emit("ngAfterViewInit");
  }

  /* istanbul ignore next */
  /**
   * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
   */
  ngOnInit() {
    this.onManualEvent.emit("ngOnInit");
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
    } else if (this.autoWrap === false) {
      this.styles["white-space"] = "nowrap";
      this.markForCheck();
    }

    this.checkNxStyling();
  }

  /* istanbul ignore next */
  private checkNxStyling(skipAttributeOverride: boolean = false) {
    if (skipAttributeOverride !== true && this._cssClass != null && this._cssClass.length > 0 && typeof AppUtils.attributeOverrideClass === "function") {
      let newAttributes = AppUtils.attributeOverrideClass(this._cssClass);

      if (newAttributes != null) {
        // class に関しては、既存の指定とマージ
        const newCssClass = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName === AttributesEnum.CLASS).map((attr: AttributeNameValue) => attr.value).join(" ");
        newAttributes = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName !== AttributesEnum.CLASS);

        newAttributes.push({
          attributeName: AttributesEnum.CLASS,
          value: (this._cssClass + " " + newCssClass).trim(),
        });

        this.setAttributes(newAttributes, true);
      }
    }

    if (this.elementRef != null) {
      const _validate = this.elementRef.nativeElement.getAttribute("validate");

      if (skipAttributeOverride !== true && _validate != null && _validate.length > 0) {
        let newAttributes = AppUtils.attributeOverrideValidate(_validate);

        if (newAttributes != null) {
          // class に関しては、既存の指定とマージ
          const newCssClass = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName === AttributesEnum.CLASS).map((attr: AttributeNameValue) => attr.value).join(" ");
          newAttributes = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName !== AttributesEnum.CLASS);

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
   */
  private initBorderLayout() {
    if (this.borderPosition != null && this.borderPosition != '') {
      if (this._cssClass != null) {
        this._cssClass = this._cssClass + ' border-' + this.borderPosition;
      } else {
        this._cssClass = 'border-' + this.borderPosition;
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Destroy lifecycle. Clear component references and cache
   */
  ngOnDestroy() {
    this.onManualEvent.emit("ngOnDestroy");
    this.cleanup();
    this._isDying = true;

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
      this._children = null;
    }


    this.onManualEvent.unsubscribe();
    this.onContextMenu.unsubscribe();
    this.onActiveLost.unsubscribe();
    this.onBeforeActiveLost.unsubscribe();
  
    this.onManualEvent = null;
    this.onContextMenu = null;
    this.onActiveLost = null;
    this.onBeforeActiveLost = null;

    this._childrenIndex = null;
    this._viewChildrenMap = null;
    this.parent = null;
    this.sessionService = null;
    this.attributeChangeListeners = null;
    this.radioButtonGroups = null;
    this.elementRef = null;
    this.scrollPanes = null;
    this.tables = null;
    this.splitpanels = null;
    this._internalOnCommand = null;
    this._internalOnActiveLost = null;

    this.parentScrollView = null;
    this.parentDialogView = null;
    this.parentView = null;
  
  
  }

  protected cleanup() {

  }

  /* istanbul ignore next */
  /**
   * Fire the ManualEvent
   * @param name event name
   */
  handleManualEvent(name?: string): void {
    this.onManualEvent.emit(name);
  }

  /**
   * Fire a property event by sub class.
   * @param name event name (eg:"set:BgColor")
   */
  protected handlePropertyEvent(name: string): void {
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit(name);
    }
  }

  /**
   * Get [[SessionService]] instance injected via constructor
   * @returns SessionService instance
   */
  getSession(): SessionService {
    return this.sessionService;
  }

  /* istanbul ignore next */
  /**
   * Get child component by id
   * @param id Component ID
   * @returns Child [[BaseComponent]]
   */
  getChild(id: string) {
    if (this._children !== null) {
      return this._children.get(KeyUtils.toMapKey(id));
    } else {
      return null;
    }
  }

  /* istanbul ignore next */
  /**
   * Set [[disabled]] property value
   * @param boo Value for disabled property
   */
  setDisabled(boo: boolean) {
    this.disabled = boo;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Disabled");
    }
  }

  setTextEditable(boo: boolean) {
    this.textEditable = boo;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:TextEditable");
    }
  }

  /* istanbul ignore next */
  /**
   * Set [[visible]] property value
   * @param boo Value for visible property
   */
  setVisible(boo: boolean) {
    this.visible = boo;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Visible");
    }
  }

  setScrollPosVertical(expression) {
    //TODO
  }

  /**
   * Set color of text on the component
   * @param value Color string. Should be hexadecimal or color name supported by CSS
   */
  setFontColor(value) {
    this.setColor(value);
  }

  /* istanbul ignore next */
  /**
   * Value of [[disabled]] property
   * @returns Value of disabled
   */
  getDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Value of opposite of [[disabled]] value
   * @returns Value of enabled
   */
  getEnabled(): boolean {
    return !this.getDisabled();
  }

  /* istanbul ignore next */
  /**
   * Value of soColumnNo attribute
   * @returns Column number
   */
  getSoColumnNo(): string {
    // return this.getAttribute("soColumnNo");
    return this.getCustomAttribute("soColumnNo");
  }

  /* istanbul ignore next */
  /**
   * Get the component ref string value from [[editor]] property
   * @returns Ref of component
   */
  getEditor(): string {
    return this.editor;
  }

  /**
   * Value of soRequire attribute
   * @returns soRequire value
   */
  getSoRequire(): string {
    // return this.getAttribute("soRequire");
    return this.getCustomAttribute("soRequire");
  }

  /**
   * Value of soValidate attribute
   * @returns soValidate value
   */
  getSoValidate(): string {
    // return this.getAttribute("soValidate");
    return this.getCustomAttribute("soValidate");
  }

  /* istanbul ignore next */
  /**
   * Value of soType attribute
   * @returns soType value
   */
  getSoType(): string {
    // return this.getAttribute("soType");
    return this.getCustomAttribute("soType");
  }

  /**
   * Value of soFormat attribute
   * @returns soFormat value
   */
  getSoFormat(): string {
    // return this.getAttribute("soFormat");
    return this.getCustomAttribute("soFormat");
  }

  /* istanbul ignore next */
  /**
   * Value of soMin attribute
   * @returns soMin value
   */
  getSoMin(): string {
    // return this.getAttribute("soMin");
    return this.getCustomAttribute("soMin");
  }

  /* istanbul ignore next */
  /**
   * Value of soMax attribute
   * @returns soMax value
   */
  getSoMax(): string {
    // return this.getAttribute("soMax");
    return this.getCustomAttribute("soMax");
  }

  /**
   * Value of soMaxLength attribute
   * @returns soMaxLength value
   */
  getSoMaxLength(): string {
    // return this.getAttribute("soMaxLength");
    return this.getCustomAttribute("soMaxLength");
  }

  /* istanbul ignore next */
  /**
   * Value of soPattern attribute
   * @returns soPattern value
   */
  getSoPattern(): string {
    // return this.getAttribute("soPattern");
    return this.getCustomAttribute("soPattern");
  }

  /* istanbul ignore next */
  /**
   * Value of soMaxByteLen attribute
   * @returns soMaxByteLen value
   */
  getSoMaxByteLen(): string {
    // return this.getAttribute("soMaxByteLen");
    return this.getCustomAttribute("soMaxByteLen");
  }

  /* istanbul ignore next */
  /**
   * Set [[disabled]] property to opposite of input
   * @param boo Value of enabled
   */
  setEnabled(boo: boolean | string) {
    if (typeof boo === 'string') {
      boo = boo === 'true' ? true : false;
    }
    this.setDisabled(!boo);
  }

  /* istanbul ignore next */
  /**
   * Set value of [[sort]] property
   * @param value Sort value to set
   */
  setSortValue(value: string) {
    this.sort = value
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:SortValue");
    }
  }

  /**
   * Get value of [[visible]] property
   * @returns Visble property value
   */
  getVisible(): boolean {
    return this.visible;
  }

  /* istanbul ignore next */
  /**
   * Sets value of text attribute and marks component for change detection
   * @param value Text to set. If it's a null value, it will be converted to an empty string
   * If it's a number or non-string, it will be converted to a string representation of the value.
   */
  setText(value: string | number): void {
    if (typeof value === 'string') {
      this.text = value;
    } else if (value == null) {
      this.text = '';
    } else {
      this.text = value + '';
    }
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Text");
    }
  }

  /* istanbul ignore next */
  /**
   * Set callback function for [[onCommand]]
   * @param fn Function to be invoked for [[onCommand]] event
   */
  setOnCommand(fn: () => void): void {
    this._internalOnCommand = fn;
  }

  /* istanbul ignore next */
  /**
   * Set callback function for [[onActiveLost]]
   * @param fn Function to be invoked for [[onActiveLost]] event
   */
  setOnActiveLost(fn: () => void): void {
    this._internalOnActiveLost = fn;
  }

  /* istanbul ignore next */
  /**
   * Set all attributes in one go
   *
   * @param attrs
   * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
   */
  setAttributes(attrs: Array<AttributeNameValue>, skipAttributeOverride: boolean = false) {
    this._tempFreezeCd = true;

    for (const attr of attrs) {
      this.setAttribute(attr.attributeName, attr.value, skipAttributeOverride);
    }

    this._tempFreezeCd = false;
    this.markForCheck();
  }

  /* istanbul ignore next */
  /**
   * Set HTML attribute value on component
   * @param attribute HTML attribute to set
   * @param value Value of attribute
   * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
   */
  setAttribute(attribute: AttributesEnum | string, value: any, skipAttributeOverride: boolean = false) {
    if (typeof attribute === 'string') {
      const attributeLower = attribute.toLowerCase();

      if (BaseComponent.setAttributeMapStr.has(attributeLower)) {
        const func = BaseComponent.setAttributeMapStr.get(attributeLower).bind(this);
        func(value);
      } else if (JavaUtils.isNumber(attribute) === true) {
        this.setAttribute(_.parseInt(attribute), value);
      } else {
        this.setCustomAttribute(attribute, value);
        // Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);

        if (attributeLower === "validate" && skipAttributeOverride !== true && value != null && value.length > 0) {
          let newAttributes = AppUtils.attributeOverrideValidate(value);

          if (newAttributes != null) {
            // class に関しては、既存の指定とマージ
            const newCssClass = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName === AttributesEnum.CLASS).map((attr: AttributeNameValue) => attr.value).join(" ");
            newAttributes = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName !== AttributesEnum.CLASS);

            newAttributes.push({
              attributeName: AttributesEnum.CLASS,
              value: (this._cssClass + " " + newCssClass).trim(),
            });
            this.setAttributes(newAttributes, true);
          }
        }
      }
      this.fireSetAttributeEvent(attribute, value);
    } else {
      // attributeがstringでは無い
      if (BaseComponent.setAttributeMapEnum.has(attribute)) {
        const func = BaseComponent.setAttributeMapEnum.get(attribute).bind(this);
        func(value);
      } else if (attribute === AttributesEnum.CLASS) {
        this.setCssClass(value, skipAttributeOverride);

        if (skipAttributeOverride !== true
          && value != null
          && value.length > 0
          && typeof AppUtils.attributeOverrideClass === "function") {
          let newAttributes = AppUtils.attributeOverrideClass(value);

          if (newAttributes != null) {
            // class に関しては、既存の指定とマージ
            const newCssClass = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName === AttributesEnum.CLASS).map((attr: AttributeNameValue) => attr.value).join(" ");
            newAttributes = _.filter(newAttributes, (attr: AttributeNameValue) => attr.attributeName !== AttributesEnum.CLASS);

            newAttributes.push({
              attributeName: AttributesEnum.CLASS,
              value: (this._cssClass + " " + newCssClass).trim(),
            });

            this.setAttributes(newAttributes, true);
          }
        }
      } else {
        Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
      }

      this.markForCheck();
      if(this.sendPropertyEvent) {
        this.onManualEvent.emit("set:Attribute#" + AttributesEnum[attribute]);
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Get value of HTML attribute
   * @param attribute Name of HTML attribute to get
   * @returns Value of attribute
   */
  getAttribute(attribute: string | AttributesEnum, skipQueryDOMIfNotExists: boolean = false): any {
    if (typeof attribute === 'string') {
      const attributeLower = attribute.toLowerCase();

      if (BaseComponent.getAttributeMapStr.has(attributeLower)) {
        const func = BaseComponent.getAttributeMapStr.get(attributeLower).bind(this);
        return func();
      } else if (this.customAttributes != null && this.customAttributes[attribute] !== undefined) {
        return this.getCustomAttribute(attribute);
      } else if (attribute === "isLockedColumn") {
        return false;
      } else if (skipQueryDOMIfNotExists !== true) {
        Logger.warn(`Attribute ${attribute} does not exists, trying to get from DOM`);
        if (this.elementRef != null) {
          return this.elementRef.nativeElement.getAttribute(attribute)
        }
      } else {
        return undefined;
      }
    } else if (BaseComponent.getAttributeMapEnum.has(attribute)) {
      const func = BaseComponent.getAttributeMapEnum.get(attribute).bind(this);
      return func();
    } else {
      console.error('Unable to get attribute, unknown attribute id: ' + attribute);
    }

    return undefined;
  }

  /* istanbul ignore next */
  /**
   * Focus the HTML element of this component
   */
  requestFocus() {
    if (this.getElement() != null) {
      this.getElement().focus();
    }
  }

  /* istanbul ignore next */
  /**
   * Focus the native HTML element of the component and mark for change detection
   */
  setFocus() {
    if (this.elementRef != null) {
      (this.elementRef.nativeElement as HTMLElement).focus();

      if ((this.elementRef.nativeElement as HTMLElement).firstElementChild instanceof HTMLElement) {
        setTimeout(()=>{
          ((this.elementRef.nativeElement as HTMLElement).firstElementChild as HTMLElement).focus();
        }, 100);
      }

      this.markForCheck();
      if(this.sendPropertyEvent) {
        this.onManualEvent.emit("set:Focus");
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Scroll the element into visible view
   */
  scrollIntoView() {
    if (this.elementRef != null) {
      if ((this.elementRef.nativeElement as HTMLElement).firstElementChild instanceof HTMLElement) {
        ((this.elementRef.nativeElement as HTMLElement).firstElementChild as HTMLElement).scrollIntoView(true);
      }

      this.markForCheck();
    }
  }

  /**
   * Event handler for when focus is lost. Invokes onActiveLost event handler
   * @event [[OnActiveLost]]
   */
  focusLost() {
    this.onActiveLost.emit();

    if (typeof this._internalOnActiveLost === 'function') {
      this._internalOnActiveLost(this);
    }
  }

  /* istanbul ignore next */
  /**
   * Creates a unique id using an optional prefix
   * @param prefix String to append to beginning of ID
   * @returns Unique ID
   */
  static generateUniqueId(prefix: string = 'base'): string {
    return prefix + Date.now() + '_' + _.random(1, 1000) + _.random(1, 100);
  }

  /* istanbul ignore next */
  /**
   * Adds child component to this component
   * @param child Component to add as child
   */
  protected addChild(child: BaseComponent) {
    if (child.id !== this.id) {
      const childKey = KeyUtils.toMapKey(child.id);

      if (this._children === null) {
        this._children = new Map<string, BaseComponent>();
      }

      if (this._childrenIndex === null) {
        this._childrenIndex = new Array<string>();
      }

      this._children.set(childKey, child);
      this._childrenIndex.push(child.id);

      //check to see if we have ViewComponent, if so, register ourself so that
      //it can be located faster
      const parentView = this.getParentView();

      if (parentView != null && (child.isFauxElement() || child.isDialog() !== true)) {
        if (parentView._viewChildrenMap == null) {
          parentView._viewChildrenMap = new Map<string, BaseComponent>();
        }

        parentView._viewChildrenMap.set(childKey, child);

        //track ScrollPane for scroll adjustment
        if (typeof child.isScrollPane === "function" && child.isScrollPane() === true) {
          parentView.registerScrollPane(child);
        }

        //track Table for scroll adjustment
        if (typeof child.isTable === "function" && child.isTable() === true) {
          parentView.registerTable(child);
        }

        //track Panel for scroll adjustment
        if (typeof child.isSplitPanel === "function" && child.isSplitPanel() === true) {
          parentView.registerPanels(child);
        }
      }
    }
  }

  /**
   * Get the native element of the component if a reference to it is defined
   * @returns The HTML native element or 'null' if reference is missing
   */
  getElement(): HTMLElement {
    return this.elementRef ? this.elementRef.nativeElement : null;
  }

  /* istanbul ignore next */
  /**
   * Get the text property value
   * @returns Text value
   */
  getText(): string {
    return this.text;
  }

  /* istanbul ignore next */
  /**
   * Set CSS color style attribute and marks for change detection
   * @param color CSS color string value. Should be hexadecimal or valid CSS color string
   */
  setColor(color: string) {
    if (color == null || color === "") {
      delete this.styles['color'];
    } else {
      this.styles['color'] = color;
    }

    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Color");
    }
  }

  /**
   * Get the color style attribute value
   * @returns Color string. Hexadecimal or CSS color string
   */
  getColor(): string {
    return this.styles['color'];
  }

  /**
   * Set background color CSS style attribute value
   * @param bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
   */
  setBgColor(bgColor: string) {
    this.bgColor = bgColor;
    this.styles["background"] = bgColor;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:BgColor");
    }
  }

  /* istanbul ignore next */
  /**
   * Sets font-weight style property to bold
   * @param boo Switch for turning bold style on/off
   */
  setFontBold(boo: boolean | string) {
    this.fontBold = boo;

    if (boo === true || boo === "true") {
      this.styles["font-weight"] = "bold";
    } else {
      delete this.styles["font-weight"];
    }

    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:FontBold");
    }
  }

  /* istanbul ignore next */
  /**
   * Sets CSS style attribute font-style to italic
   * @param boo Switch for turning italic style on/off
   */
  setFontItalic(boo: boolean | string) {
    this.fontItalic = boo;

    if (boo === true || boo === "true") {
      this.styles["font-style"] = "italic";
    } else {
      delete this.styles["font-style"];
    }
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:FontItalic");
    }
  }

  /**
   * Sets CSS style attribute font-size
   * @param size Number of pixels for font-size
   */
  setFontSize(size: number) {
    this.fontSize = size;

    this.styles["font-size"] = size + "px";
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:FontSize");
    }
  }

  /* istanbul ignore next */
  /**
   * Add/remove CSS style attribute text-decoration to underline
   * @param underline Switch for turning underline style on/off for text
   */
  setFontUnderline(underline: boolean | string) {
    this.fontUnderline = underline;

    if (this.fontUnderline === "true" || this.fontUnderline === true) {
      this.styles["text-decoration"] = "underline";
    } else {
      delete this.styles["text-decoration"];
    }
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:FontUnderline");
    }
  }

  /**
   * Event handler that registers focus event
   * @param event
   */
  handleFocus(event: FocusEvent) {
    this.registerClientEvent(event);
  }

  /* istanbul ignore next */
  /**
   * Event handler that registers click event
   * @param event
   */
  handleClick(event: MouseEvent) {
    this.registerClientEvent(event);
  }

  /**
   * Event handler that registers keydown event
   * @param event
   */
  handleKeyDown(event: KeyboardEvent) {
    this.registerClientEvent(event);
  }

  /* istanbul ignore next */
  /**
   * Event handler that registers keyup event
   * @param event
   */
  handleKeyUp(event: KeyboardEvent) {
    this.registerClientEvent(event);
  }

  /**
   * Event handler that registers mousedown event
   * @param event
   */
  handleMouseDown(event: MouseEvent) {
    this.registerClientEvent(event);
  }

  /* istanbul ignore next */
  /**
   * Gets custom attribute by name if it exists
   * @param attributeName Name of custom attribute
   * @returns Custom attribute if it exists, otherwise undefined
   */
  getCustomAttribute(attributeName: string): any {
    if (this.customAttributes != null) {
      return this.customAttributes[attributeName];
    }

    return undefined;
  }

  /* istanbul ignore next */
  /**
   * Set attribute on customAttribute object using name as key
   * @param name key name of attribute
   * @param value value to set for key/name
   */
  setCustomAttribute(name: string, value: any) {
    if (this.customAttributes == null) {
      this.customAttributes = {};
    }

    if (value != null) {
      this.customAttributes[name] = value + '';
      if(this.sendPropertyEvent) {
        this.onManualEvent.emit("set:CustomAttribute#" + name);
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Check if custom attribute exists
   * @param id Key name of attribute
   * @returns True if custom attribute with name/key exists
   */
  hasCustomAttribute(id: string): boolean {
    return this.customAttributes != null && this.customAttributes[id] != null;
  }

  /* istanbul ignore next */
  /**
   * Get child component by index
   * @param idx Index of child component
   * @returns Child [[BaseComponent]]
   */
  getChildAt(idx: number): BaseComponent {
    if (this._childrenIndex !== null) {
      if (this._childrenIndex.length > idx) {
        return this.getChild(this._childrenIndex[idx]);
      }
    }

    return null;
  }

  /**
   * Get the number of child components
   * @returns Number of children
   */
  getChildCount(): number {
    if (this._children !== null) {
      return this._children.size;
    } else {
      return 0;
    }
  }

  /**
   * Get index of child component if it exists
   * @param child Child component
   */
  indexOfChild(child: any): number {
    //TODO
    console.error("indexOfChild is not implemented");
    return -1;
  }

  /* istanbul ignore next */
  /**
   * Insert child component to children array at location of index
   * @param idx Index of insert location
   * @param row
   */
  insertChildAt(idx: number, row: any) {
    //TODO
    console.error("insertChildAt is not implemented");
  }

  /* istanbul ignore next */
  /**
   * TODO: Add documentation for emitInternalCommand
   */
  protected emitInternalOnCommand() {
    if (typeof this._internalOnCommand === 'function') {
      this._internalOnCommand(this);
      return true;
    } else if (typeof this._internalOnCommand === "string") {
      this.invokeMcoAction(this._internalOnCommand);
    }

    return false;
  }

  /* istanbul ignore next */
  /**
   * Registers event handler for client event
   * @param event Event to register
   */
  protected registerClientEvent(event: Event) {
    const clientEvent = new ClientEvent(this, event);

    if (AppUtils.customizeClientEvent != null) {
      AppUtils.customizeClientEvent(this, clientEvent);
    }

    this.getSession().getEventHandler().setClientEvent(clientEvent);
  }

  /* istanbul ignore next */
  /**
   * Get the native HTML element tag name
   * @returns Name of HTML element tag
   */
  getTagName(): string {
    return this.elementRef != null ? this.elementRef.nativeElement.tagName : '';
  }

  /**
   * Get component tag name without vivify core prefix (i.e. "vt-")
   * @returns Tag name
   */
  getLocalName(): string {
    return this.getTagName().toLowerCase().replace("vt-", "");
  }

  /* istanbul ignore next */
  /**
   * Get the parent component if it exists
   * @returns Component or null if there is no parent
   */
  getParent() {
    return this.parent;
  }

  /**
   * Get value property if it exists, otherwise return 'null'
   * @returns Value or 'null'
   */
  getValue() {
    if (this["value"]) {
      return this["value"];
    }

    return null;
  }

  /* istanbul ignore next */
  /**
   * Removes attribute name name
   * @param attribute Attribute to remove
   */
  removeAttribute(attribute: string | AttributesEnum) {
    if (typeof attribute === 'string') {
      const attributeLower = attribute.toLowerCase();
      if (attributeLower === 'visible') {
        this.removeAttribute(AttributesEnum.VISIBLE);
      } else if (attributeLower === 'enabled') {
        this.removeAttribute(AttributesEnum.ENABLED);
      } else if (attributeLower === 'disabled') {
        this.removeAttribute(AttributesEnum.DISABLED);
      } else if (attributeLower === 'text') {
        this.removeAttribute(AttributesEnum.TEXT);
      } else if (attributeLower === 'color') {
        this.removeAttribute(AttributesEnum.COLOR);
      } else if (attributeLower === 'pattern') {
        this.removeAttribute(AttributesEnum.PATTERN);
      } else if (attributeLower === 'max') {
        this.removeAttribute(AttributesEnum.MAX);
      } else if (attributeLower === 'maxlength' || attributeLower === 'max_length') {
        this.removeAttribute(AttributesEnum.MAX_LENGTH);
      } else if (attributeLower === 'min') {
        this.removeAttribute(AttributesEnum.MIN);
      } else if (attributeLower === 'class') {
        this.removeAttribute(AttributesEnum.CLASS);
      } else if (attributeLower === 'oncommand' || attributeLower === 'on_command') {
        this.removeAttribute(AttributesEnum.ON_COMMAND);
      } else if (attributeLower === 'require') {
        this.removeAttribute(AttributesEnum.REQUIRE);
      } else if (attributeLower === 'title') {
        this.removeAttribute(AttributesEnum.TITLE);
      } else if (attributeLower === 'fontbold' || attributeLower === 'font_bold') {
        this.removeAttribute(AttributesEnum.FONT_BOLD);
      } else if (attributeLower === 'selected') {
        this.removeAttribute(AttributesEnum.SELECTED);
      } else if (attributeLower === 'bgColor') {
        this.removeAttribute(AttributesEnum.BG_COLOR);
      } else if (attributeLower === 'value') {
        this.removeAttribute(AttributesEnum.VALUE);
      } else if (this.customAttributes != null) {
        delete this.customAttributes[attribute];
        Logger.warn(`Unknown attribute: ${attribute}, setting as custom attribute`);
      }

      this.fireRenoveAttributeEvent(attribute);
    } else if (attribute === AttributesEnum.VISIBLE) {
      this.setVisible(true);
    } else if (attribute === AttributesEnum.DISABLED) {
      this.setDisabled(false);
    } else if (attribute === AttributesEnum.ENABLED) {
      this.setEnabled(true);
    } else if (attribute === AttributesEnum.TEXT) {
      delete this.text;
      this.markForCheck();
    } else if (attribute === AttributesEnum.COLOR) {
      this.setColor("");
    } else if (attribute === AttributesEnum.ON_COMMAND) {
      delete this._internalOnCommand;
    } else if (attribute === AttributesEnum.PATTERN) {
      this.setPattern(undefined);
    } else if (attribute === AttributesEnum.MAX) {
      this.setMax(undefined);
    } else if (attribute === AttributesEnum.MAX_LENGTH) {
      this.setMaxLength(undefined);
    } else if (attribute === AttributesEnum.MIN) {
      this.setMin(undefined);
    } else if (attribute === AttributesEnum.REQUIRE) {
      this.setRequire(false);
    } else {
      Logger.warn('Unable to set attribute, unknown attribute id: ' + attribute);
    }
  }

  /**
   * Alias of [[setRequired]]
   * @param boo
   */
  setRequire(boo: boolean | string) {
    this.setRequired(boo);
  }

  /* istanbul ignore next */
  /**
   * Set [[required]] to true or false
   * @param boo
   */
  setRequired(boo: boolean | string) {
    if (boo === 'true' || boo === true) {
      this.required = true;
    }
    else {
      this.required = false;
    }
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Required");
    }
  }

  /**
   * Set [[pattern]] value
   * @param pattern
   */
  setPattern(pattern: string) {
    this.pattern = pattern;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Pattern");
    }
  }

  /**
   * Set [[min]] value
   * @param val
   */
  setMin(val: any) {
    this.min = val;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Min");
    }
  }

  /**
   * Set [[max]] value
   * @param val
   */
  setMax(val: any) {
    this.max = val;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Max");
    }
  }

  /**
   * Get [[pattern]] value
   * @returns [[pattern]]
   */
  getPattern(): string {
    return this.pattern;
  }

  /**
   * Get [[min]] value
   * @returns [[min]]
   */
  getMin(): any {
    return this.min;
  }

  /**
   * Get [[max]] value
   * @returns [[max]]
   */
  getMax(): any {
    return this.max;
  }

  /**
   * Get [[inputLocale]] value
   * @returns [[inputLocale]]
   */
  getInputLocale(): string {
    return this.inputLocale;
  }

  /** Set [[inputLocale]] value
   * @param locale
   */
  setInputLocale(locale: string) {
    this.inputLocale = locale;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:InputLocale");
    }
  }

  /**
   * Get [[inputCharsets]] value
   * @returns [[inputCharsets]]
   */
  getInputCharsets(): string {
    return this.inputCharsets;
  }

  /**
   * Set [[inputCharests]] value
   * @param inputCharSets
   */
  setInputCharsets(inputCharSets: string) {
    this.inputCharsets = inputCharSets;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:InputCharsets");
    }
  }

  /**
   * Get [[id]] value
   * @returns [[id]]
   */
  getId(): string {
    return this.id;
  }

  /**
   * Set [[id]] value
   * @param id
   */
  setId(id: string) {
    if (this.parent != null && this.parent.children.has(this.id)) {
      this.parent.children.delete(KeyUtils.toMapKey(this.id));
      this.parent.children.set(KeyUtils.toMapKey(id), this);

      if (this._childrenIndex !== null) {
        const idx = _.findIndex(this.parent._childrenIndex, (item) => item === this.id);

        if (idx >= 0) {
          this.parent._childrenIndex[idx] = id;
        } else {
          this.parent._childrenIndex.push(id);
        }

        this.parent._childrenIndex = _.uniq(this.parent._childrenIndex);
      }
    }

    this.id = id;
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Id");
    }
  }

  /**
   * Abstract method. Implemented by sub class components
   * @param title
   */
  setTitle(title: string) {
    //impl. by sub class
  }

  /**
   * Set [[cssClass]] of component.
   * @param css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
   * ```
   * .class1.class2.class3
   * ```
   */
  setCssClass(css: string, skipAttributeOverride: boolean = false) {
    if (css != null && css.indexOf(".") >= 0) {
      const temp = css.split("\.");

      this.cssClass = temp.join("-");

      if (temp[0] === "") {
        this.cssClass = this.cssClass.substring(1);
      }
    }

    this.cssClass = css;
    this.checkNxStyling(skipAttributeOverride);
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:CssClass");
    }
  }

  /**
   * Adds a css class name to the internal [[_cssClass]] property
   * @param css CSS class name to add
   */
  addCssClass(css: string) {
    if (this._cssClass == null || this._cssClass === "") {
      this._cssClass = css;
    } else if (this._cssClass.indexOf(css) == -1) {
      this._cssClass = `${this._cssClass} ${css}`;
    }
    this.checkNxStyling();
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("add:CssClasss");
    }
  }

  /**
   * Removes css class name from internal [[_cssClass]] property
   * @param css CSS class name to remove
   */
  removeCssClass(css: string) {

    if (this._cssClass != null)
      this._cssClass = this._cssClass.replace(css, '');
    this.checkNxStyling();
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("remove:CssClass");
    }
  }

  /**
   * Get the [[require]] property value
   * @returns Value of [[require]]
   */
  getRequired(): string | boolean {
    return this.require;
  }

  /**
   * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
   */
  destroyComponent() {
    if (this.compRef != null) {
      this.compRef.destroy();
    } else if (this.elementRef != null) {
      (this.elementRef.nativeElement as HTMLElement).remove();
      this.ngOnDestroy();
      Logger.warn("Memory leak! Please use ngIf if you want to remove component!");
    }
  }

  /**
   * Gets JSON representation of the component
   * @returns JSON object
   */
  toJson(): {} {
    const retVal: any = {};

    //get custom attributes binded to our tag
    if (this.elementRef != null && this.elementRef.nativeElement != null) {
      const el = this.elementRef.nativeElement;
      let attributes: Array<string> = null;

      if (typeof el.getAttributeNames === "function") {
        attributes = el.getAttributeNames();
      } else if (el.attributes) {
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
      } else if (typeof AppUtils.setCustomAttribute === "function") {
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
            const c = this.getChild(id);

            //getChild can return null?
            if (c != null) {
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
   * @param child child to be converted to JSON
   */
  protected childToJson(child: BaseComponent) {
    return child.toJson();
  }

  /**
   * Gets JSON representation of [[customAttributes]]
   * @returns JSON Object
   */
  protected customAttributesToJson() {
    return BaseComponent.mapToJson(this.customAttributes);
  }

  static mapToJson(map: { [name: string]: any }) {
    const customAttributes = {};

    if (map) {
      const keys = _.keys(map);

      for (let key of keys) {
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
   * @returns NxTagName as string
   */
  protected getNxTagName() {
    return "none";
  }

  /**
   * Sets JSON values. Mutates JSON object that is passed in
   * @param json Object to add key to
   * @param key Key to set
   * @param value Value to set for key param
   */
  protected setJson(json: any, key: any, value: any) {
    if (key != null) {
      json[key] = this.toJsonValue(value);
    }
  }

  /**
   * Converts value to a valid JSON property string
   * @param value Value to convert to string
   * @returns Value as a valid JSON property string
   */
  protected toJsonValue(value: any) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return value + '';
    } else {
      return value;
    }
  }

  /**
   * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
   */
  resetId() {
    this.id = this._uniqueId;
  }

  /**
   * Get value of checked property. Should be implemented in sub class components that have checked state
   * @returns Value of [[checked]] property
   */
  getChecked(): boolean {
    return false;
  }

  /**
   * Abstract method. Should be implemented by sub class components that have checked state
   * @param boo Toggle [[checked]] on/off
   */
  setChecked(boo: boolean | string) {
    // NO-OP
  }

  /**
   * Abstract method. Should be implemented by sub class components that have selected state
   * @param boo Toggle [[checked]] on/off
   */
  setSelected(boo: boolean | string) {
    // NO-OP
  }

  /* istanbul ignore next */
  /**
   * Get [[maxLength]] property. Returns -1 if it is null
   * @returns Value of maxLength as integer if it's set, otherwise returns null
   */
  getMaxLength(): number {
    return this.maxLength == null ? -1 : JavaUtils.intValue(this.maxLength);
  }

  /* istanbul ignore next */
  /**
   * Get [[minLength]] property. Returns -1 if it is null
   * @returns Value of minLength as integer if it's set, otherwise returns null
   */
  getMinLength(): number {
    return this.minLength == null ? -1 : JavaUtils.intValue(this.minLength);
  }

  /**
   * Get a list of child components
   * @returns Child components
   */
  getChildren() {
    const children = new Vector<BaseComponent>();
    if (this._childrenIndex !== null) {
      for (let id of this._childrenIndex) {
        const c = this.getChild(id);

        if (c != null) {
          children.add(c);
        }
      }
    }

    return children;
  }

  /* istanbul ignore next */
  /**
   * Remove child component from list of children and remove children of child
   * @param child Child component to remove
   */
  removeChild(child: BaseComponent) {
    //if somehow send it as string (via type any)
    if (typeof child === "string") {
      child = this.getElementById(child) as BaseComponent;
    }

    if (child != null) {
      //first hide it
      if (child.setVisible) {
        child.setVisible(false);
      }

      if (this.children) {
        this.children.delete(KeyUtils.toMapKey(child.id));
        if (this._childrenIndex !== null) {
          this._childrenIndex = _.chain(_.filter(this._childrenIndex, (item) => item !== child.id)).uniq().value();
        }
      }

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
   * @param id Child [[id]]
   */
  removeChildById(id: string) {
    const child = this.getElementById(id);

    if (child != null) {
      this.removeChild(child);
    }
  }

  /**
   * Remove all child components
   */
  private removeAllChildren() {
    if (this.children != null) {
      const cit = this.children.values();
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

  /* istanbul ignore next */
  /**
   * Finds the child component by ID. Deep search
   * @param id Child component [[id]]
   */
  getElementById(id: string) {
    return this.findElementById(id);
  }

  /**
   * Check if a child component with id exists
   * @param id Child component [id]
   */
  hasChild(id: string) {
    return this.findElementById(id) != null;
  }

  /**
   * Set validate attribute for input component. Implement on sub class component
   * @param attr
   */
  setValidate(attr: string) {
    // TODO: causing regression
    // this.setAttribute("validate", attr);
  }

  /**
   * Set type attribute for input component. Implement on sub class component
   * @param type
   */
  setType(type: string) {
    // TODO: causing regression
    //this.setAttribute("type", type);
  }

  /**
   * Set format attribute for input component. Implement on sub class component
   * @param format
   */
  setFormat(format: string) {
    // TODO: causing regression
    //this.setAttribute("format", format);
  }

  /**
   * Set [[maxLength]] for input component
   * @param maxLength Input max length property. Should be numeric string
   */
  setMaxLength(maxLength: string) {
    this.maxLength = maxLength;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:MaxLength");
    }
  }

  /**
   * Set [[minLength]] for input component
   * @param minLength Input max length property. Should be numeric string
   */
  setMinLength(minLength: string) {
    this.minLength = minLength;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:MinLength");
    }
  }

  /**
   * Set [[maxLength]] as byte length for input component
   * @param bl Should be numeric string
   */
  setMaxByteLen(bl: string) {
    this.setMaxLength(bl);
  }

  /**
   * Abstract method. Set value of input component
   * @param val Value to set
   */
  setValue(val: any) {

  }

  /**
   * Set focusable property value for component. Implement on sub class
   * @param focusable Toggle focusable on/off
   */
  setFocusable(focusable: boolean | string) {
    //TODO
  }

  /**
   * Abstract. Select parent component tab. Implement on sub class
   */
  selectParentTab() {
    function findTabBelong(item: BaseComponent) {
      if (item != null) {
        const parent = item.getParent();
        if (parent != null && parent.getLocalName() !== 'tab')
          return findTabBelong(parent);
        return parent;
      }
    }
    const tab = findTabBelong(this.getElementById(this.id)) as TabComponent;

    function findTabPaneBelong(tab: BaseComponent) {
      if (tab != null) {
        const parent = tab.getParent();
        if (parent != null && parent.getLocalName() !== 'tab-pane')
          return findTabPaneBelong(parent);
        return parent;
      }
    }
    const tabPane = findTabPaneBelong(this.getElementById(this.id)) as TabPaneComponent;
    if (tab != null) {
      tabPane.setSelectedTab(tab.id);
    }
  }

  /* istanbul ignore next */
  /**
   * Perform a deep search (that is, looks up descendants)
   * @param id element id to search
   */
  findElementById(id: string): BaseComponent {
    const mappedChildId = KeyUtils.toMapKey(id);

    let comp: BaseComponent = null;
    //first check for cache
    // let comp: BaseComponent = UiDocument.getFromCache(mappedChildId);

    if (comp == null) {
      //check for radio button group
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

  /* istanbul ignore next */
  /**
   * Get radio button group component by id
   * @param id Radio button group ID
   */
  getRadioButtonGroupComponent(id: string): BaseComponent {
    if (id === (this as any).group) {
      //radio button group
      return this;
    } else {
      const radioGroup = this.getRadioButtonGroup(id);

      if (radioGroup != null) {
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
   * @param listener
   */
  addAttributeChangeListener(listener: AttributeChangeListener): void {
    if (this.attributeChangeListeners == null) {
      this.attributeChangeListeners = [];
    }

    listener._internalId = BaseComponent.generateUniqueId('listener');

    this.attributeChangeListeners.push(listener)
  }

  /**
   * Remove change listener on attributes
   * @param listener
   */
  removeAttributeChangeListener(listener: AttributeChangeListener): void {
    if (this.attributeChangeListeners != null) {
      this.attributeChangeListeners = _.filter(this.attributeChangeListeners, (item: AttributeChangeListener) => item._internalId !== listener._internalId);
    }
  }

  /**
   * Set attribute and emit change event
   * @param attributeName
   * @param newValue
   * @event AttributeChangeEvent
   */
  protected fireSetAttributeEvent(attributeName: string, newValue: any) {
    if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
      const event: AttributeChangeEvent = new AttributeChangeEvent(
        attributeName, this.getAttribute(attributeName), newValue, this
      );

      _.forEach(this.attributeChangeListeners, (listener: AttributeChangeListener) => {
        listener.onAttributeSet(event);
      });
    }
  }

  /**
   * Remove attribute and emit change event
   * @param attributeName
   * @event AttributeChangeEvent
   */
  protected fireRenoveAttributeEvent(attributeName: string) {
    if (this.attributeChangeListeners && this.attributeChangeListeners.length > 0) {
      const event: AttributeChangeEvent = new AttributeChangeEvent(
        attributeName, this.getAttribute(attributeName), null, this
      );

      _.forEach(this.attributeChangeListeners, (listener: AttributeChangeListener) => {
        listener.onAttributeRemoved(event);
      });
    }
  }

  /**
   * Alias for static [[cleanCss]] method
   * @param css
   */
  private cleanCss(css: string) {
    return BaseComponent.cleanCss(css);
  }

  /* istanbul ignore next */
  /**
   * Format css selectors. Remove dot
   * @param css
   * @returns New CSS selector string
   */
  static cleanCss(css: string) {
    if (css != null && css.indexOf(".") >= 0) {
      //more than one style?
      if (css.indexOf(" ") > 0) {
        return _.map(css.split(" "), (item) => this.cleanCss(item)).join(" ");
      } else {
        //only one style
        return css.replace(/\./g, '-').replace(/^\-/, '');
      }
    }

    return css;
  }

  /**
   * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
   */
  protected getChangeDetector(): ChangeDetectorRef {
    //sub-class override
    return null;
  }

  /**
   * Mark component for change detection
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
   * @param heightStyleName
   * @param widthStyleName
   */
  protected initWidthHeightStyle(heightStyleName: string = 'height', widthStyleName: string = 'max-width') {
    if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
      this.styles["height"] = parseInt(this.controlHeight) + "px";
    }

    if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
      this.styles[widthStyleName] = parseInt(this.controlWidth) + "px";
    }
  }

  /* istanbul ignore next */
  /**
   * Add a radio button component to this component
   * @param radio
   */
  addRadioButtonGroup(radio: BaseComponent) {
    //radio group need to be at ViewComponent level
    if (this.isView() !== true && this.getParent() != null) {
      return this.getParent().addRadioButtonGroup(radio);
    }

    if (this.radioButtonGroups == null) {
      this.radioButtonGroups = new Map<string, Array<BaseComponent>>();
    }

    //ignore type to prevent circular ref
    let groupId: string = (radio as any).group;

    if (this.radioButtonGroups.get(groupId) == null) {
      this.radioButtonGroups.set(groupId, [radio]);
    } else {
      this.radioButtonGroups.get(groupId).push(radio);
    }

    return;
  }

  /* istanbul ignore next */
  /**
   * Get radio button group by group ID
   * @param groupId
   * @returns  Radio button group component
   */
  getRadioButtonGroup(groupId: string) {
    let view = this.getParentView();

    return view != null && view.radioButtonGroups != null ? view.radioButtonGroups.get(groupId) : null;
  }

  /**
   * Sets [[controlWidth]] property
   * @param width Should be numeric value
   */
  setControlWidth(width: any) {
    this.controlWidth = width;

    this.initWidthHeightStyle();
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:ControlWidth");
    }
  }

  /**
   * Sets [[controlHeight]] property
   * @param height Should be numeric value
   */
  setControlHeight(height: any) {
    this.controlHeight = height;

    this.initWidthHeightStyle();
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:ControlHeight");
    }
  }

  /**
   * Alias for [[setControlWidth]] method
   * @param width Should be a numeric value
   */
  setWidth(width: any) {
    this.setControlWidth(width);
  }

  /**
   * Get [[controlWidth]] property
   * @returns Value of [[controlWidth]]
   */
  getWidth(): string {
    return this.controlWidth;
  }

  /**
   * Alias for [[setControlHeight]] method
   * @param height Should be a numeric value
   */
  setHeight(height: any) {
    this.setControlHeight(height);
  }

  /**
   * Get [[controlHeight]] property
   * @returns Value of [[controlHeight]]
   */
  getHeight(): string {
    return this.controlHeight;
  }

  /**
   * Sets value of [[x]] property for horizontal position.
   * Sets CSS "left" property to [[x]] px.
   * @param x Horizontal coordinate position
   */
  setX(x: string) {
    this.x = x;
    this.styles["left"] = x + "px";
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:X");
    }
  }

  /**
   * Get [[x]] property
   * @returns Value of [[x]]
   */
  getX() {
    return this.x;
  }

  /**
   * Sets value of [[y]] property for vertical position.
   * Sets CSS "top" property to [[y]] px.
   * @param y Vertical coordinate position
   */
  setY(y: string) {
    this.y = y;
    this.styles["top"] = y + "px";
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:Y");
    }
  }

  /**
   * Get [[y]] property
   * @returns Value of [[y]]
   */
  getY() {
    return this.y;
  }

  /**
   * Set [[borderWidth]] property value
   * @param borderWidth Should be numeric
   */
  setBorderWidth(borderWidth: string) {
    this.borderWidth = borderWidth;
    this.markForCheck();
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:BorderWidth");
    }
  }

  /**
   * Check if component is view component.
   * Implement in sub class
   */
  isView(): boolean {
    return false;
  }

  /**
   * Check if there are active views.
   * Implement in sub class
   */
  isNoneActiveView(): boolean {
    return false;
  }

  /**
   * Check if this component is an instance of [[DialogComponent]]
   */
  protected isDialog(): boolean {
    return false;
  }

  /**
   * Check if this component is a dynamic view
   */
  isDynamicView(): boolean {
    return false;
  }

  /**
   * Get the parent view of this component
   * @returns Parent view component
   */
  getParentView(): BaseComponent {
    if (this.parentView != null) {
      return this.parentView;
    }

    if (this.isView()) {
      this.parentView = this;
      return this;
    }

    if (this.parent != null) {
      let stack: Array<BaseComponent> = [this.parent];

      while (stack.length > 0) {
        const temp = stack.pop();

        if (temp.isView() === true) {
          this.parentView = temp;
          break;
        }

        if (temp.parent != null) {
          stack.push(temp.parent);
        }
      }
    }

    return this.parentView;
  }

  getParentScrollView(): BaseComponent {
    if (this.parentScrollView != null) {
      return this.parentScrollView;
    }

    if (this.isScrollView()) {
      this.parentScrollView = this;
      return this;
    }

    if (this.parent != null) {
      let stack: Array<BaseComponent> = [this.parent];

      while (stack.length > 0) {
        const temp = stack.pop();

        if (temp.isScrollView() === true) {
          this.parentScrollView = temp;
          break;
        }

        if (temp.parent != null) {
          stack.push(temp.parent);
        }
      }
    }

    return this.parentScrollView;
  }

  isScrollView(): boolean {
    return false;
  }

  /**
   * Return the parent container component (for subview), not the actual parent view. This is the parent
   * ViewComponent where canBeActiveView is false
   */
  _getNoneActiveViewParent(): BaseComponent {
    if (this.isNoneActiveView()) {
      return this;
    }

    let parentView: BaseComponent = null;

    if (this.parent != null) {
      let stack: Array<BaseComponent> = [this.parent];

      while (stack.length > 0) {
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

  /* istanbul ignore next */
  /**
   * Event handler for context menu click (right click).
   * Delegates to [[SessionService]] to display popup.
   * @param event Click event
   * @param force always emit
   */
  handleOnContextMenu(event: MouseEvent, force: boolean = false) {
    //allow component to skip emit event and let parent (i.e. table cell to emit it)
    if (force === true || this.skipEmitContextMenuEvent !== true) {
      if (this.getSession() != null) {
        this.getSession().setMousePosition(event);
      }

      let popupMenuId: string = null;

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
   * @param event
   * @event BeforeActiveLost
   */
  validateField(event: FocusEvent) {
    if (AppUtils.validateField != null && AppUtils.validateField(this) !== true) {
      event.preventDefault();
      event.stopPropagation();

      try {
        event.stopImmediatePropagation();
      } catch (e){}

      event.returnValue = false;
    }

    this.onBeforeActiveLost.emit(event);

    this.focusLost();
  }

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
  getTableChildren(): Array<any> {
    return [];
  }

  /**
   * Get [[bgColor]] property
   * @returns Value of [[bgColor]]
   */
  getBgColor() {
    return this.bgColor;
  }

  protected setAttributeFromDef() {
    const compDef = this.getSession().getDef(this.id);

    if (compDef != null && compDef.attribute != null) {
      if (
        compDef.attribute instanceof Map ||
        compDef.attribute instanceof Hashtable ||
        compDef.attribute instanceof HashMap
      ) {
        const keys = compDef.attribute.keys();
        let key = keys.next();

        while (key.done !== true) {
          this.setAttribute(key.value, compDef.attribute.get(key));
          key = keys.next();
        }
      } else {
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
   * @warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
   *
   * @param xpathExpression
   */
  evaluateXPath(xpathExpression: string): Vector<Node> {
    return null;
  }

  /**
   * Set color of hightlighted text background
   * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
   */
  setHighlightBgColor(color: string) {
    this.highlightBgColor = color;
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:HighlightBgColor");
    }
  }

  /**
   * Set color of highlighted text foreground
   * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
   */
  setHighlightFontColor(color: string) {
    this.highlightFontColor = color;
    if(this.sendPropertyEvent) {
      this.onManualEvent.emit("set:HighlightFontColor");
    }
  }

  /**
   * Get [[hightlightBgColor]] property
   * @returns Color string
   */
  getHighlightBgColor() {
    return this.highlightBgColor;
  }

  /**
   * Get [[highlightFontColor]] property
   * @returns Color string
   */
  getHighlightFontColor() {
    return this.highlightFontColor;
  }

  /**
   * Get [[parentTableRow]] property
   */
  getParentTableRow() {
    return this.parentTableRow;
  }

  //clear reduce children iterative cache
  // resetReduceChildrenIterativeCache() {
  //   this._reduceChildrenIterativeCache = null;
  // }

  /**
   * Check if change detection is frozen
   * @returns Boolean If component change detection is frozen
   */
  isChangeDetectionFrozen() {
    return false;
  }

  /**
   * Check if component is a faux element
   * @returns Boolean If component is faux element
   */
  isFauxElement() {
    return false;
  }

  /**
   * Get internal [[_viewChildrenMap]] member
   * @returns Value of [[_viewChildrenMap]]
   */
  getViewChildrenMap(): Map<string, BaseComponent> {
    return this._viewChildrenMap;
  }

  /**
   * Removes view child with id from [[_viewChildrenMap]]
   * @param id ID of child to remove
   */
  removeViewChildFromMap(id: string) {
    if (this._viewChildrenMap != null) {
      this._viewChildrenMap.delete(KeyUtils.toMapKey(id));
    }
  }

  /**
   * Adds a component to [[_viewChildrenMap]]
   * @param obj Child to add to [[_viewChildrenMap]]
   */
  addViewChildToMap(obj: BaseComponent | HTMLElementWrapper) {
    if (this._viewChildrenMap != null) {
      this._viewChildrenMap.set(KeyUtils.toMapKey(obj.getId()), obj as any);
    }
  }

  /**
   * Invoke an MCO method by name. If a function is passed as argument, it will be called with
   * this component as an argument.
   * @param action Name of action method to invoke or a function to invoke
   */
  protected invokeMcoAction(action: string | ((arg?: any) => any)) {
    if (typeof action === "function") {
      action(this);
    } else if (action.indexOf("mco://") === 0) {
      const mcoName = action.substring(6, action.indexOf("."));
      const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
      const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));

      if (arg != null && arg.length > 0) {
        const mco = this.sessionService.getMcoContainer().getMco(mcoName);

        if (mco != null) {
          if (arg === "this") {
            mco[methodName].apply(mco, [this]);
          } else {
            mco[methodName].apply(mco, [arg]);
          }
        } else {
          console.error("Unable to execute MCO action, mco not found: " + mcoName);
        }
      } else {
        const mco = this.sessionService.getMcoContainer().getMco(mcoName);

        if (mco != null) {
          mco[methodName].apply(mco);
        } else {
          console.error("Unable to execute MCO action, mco not found: " + mcoName);
        }
      }
    }
  }

  protected _notifyInternalChangeCb() {
    if (typeof this._internalChangeCb === "function") {
      this._internalChangeCb(this);
    }
  }

  emptyChildren() {
    if (this._viewChildrenMap != null) {
      const cit = this._viewChildrenMap.values();
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

    this._childrenIndex = null;
  }

  /**
   * Check to see if this is a ScrollPaneComponent
   */
  isScrollPane() {
    return false;
  }

  /**
   * Check to see if this is a TableComponent
   */
  isTable() {
    return false;
  }

  /**
   * Check to see if this is a PanelComponent
   */
  isSplitPanel() {
    return false;
  }

  /**
   * Reset the scroll position to the previous captured
   */
  resetScrollTopToPreviousPosition() {
    //implement by scrollpane and table
  }

  /**
   * Reset all scrollpane pos
   */
  resetAllScrollPanesPositionToPrevious() {
    if (this.scrollPanes != null) {
      this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopToPreviousPosition());
    }
  }

  resetScrollTopPosition() {
  }
  resetAllScrollPanesPositionToTop() {
    if (this.scrollPanes != null) {
      this.scrollPanes.forEach((scrollPane) => scrollPane.resetScrollTopPosition());
    }
  }

  resetAllTablesPositionToPrevious() {
    if (this.tables != null) {
      this.tables.forEach((table) => table.resetScrollTopToPreviousPosition());
    }
  }

  resetSplitPanelPositionToPrevious() {
    if (this.splitpanels != null) {
      this.splitpanels.forEach((splitpanel) => splitpanel.resetScrollTopToPreviousPosition());
    }
  }

  resetColumnResizer(){
    
  }
  resetAllTablesColumnResizer() {
    if (this.tables != null) {
      this.tables.forEach((table) => table.resetColumnResizer());
    }
  }

  restoreColumnWidth(){

  }
  restoreAllTablesColumnWidth()
  {
    if (this.tables != null) {
      this.tables.forEach((table) => table.restoreColumnWidth());
    }
  }

  maximizeColumnWidth(){

  }
  maximizeAllTablesColumnWidth() {
    if (this.tables != null) {
      this.tables.forEach((table) => table.maximizeColumnWidth());
    }
  }

  /**
   * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
   */
  notifyParentOfError() {
    if (this.getDisabled() === true) {
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

  /* istanbul ignore next */
  /**
   * Focus the parent tab
   */
  focusParentTab() {
    //get parent view
    const parentView = this._getNoneActiveViewParent() || this.getParentView();

    if (parentView != null) {
      //check to see if this view is in a TabPane
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
   * @param scrollPane scrollPane to register
   */
  private registerScrollPane(scrollPane: BaseComponent) {
    if (typeof scrollPane.isScrollPane === "function" && scrollPane.isScrollPane() === true) {
      if (this.scrollPanes == null) {
        this.scrollPanes = [];
      }

      this.scrollPanes.push(scrollPane);
    }
  }

  /**
   * Register panel
   *
   * @param splitpanel panel to register
   */
  private registerPanels(splitpanel: BaseComponent) {
    if (typeof splitpanel.isSplitPanel === "function" && splitpanel.isSplitPanel() === true) {
      if (this.splitpanels == null) {
        this.splitpanels = [];
      }

      this.splitpanels.push(splitpanel);
    }
  }

  /**
   * Register table
   *
   * @param table table to register
   */
  private registerTable(table: BaseComponent) {
    if (typeof table.isTable === "function" && table.isTable() === true) {
      if (this.tables == null) {
        this.tables = [];
      }

      this.tables.push(table);
    }
  }

  /* istanbul ignore next */
  /**
   * Return the dialog of the parent view
   */
  getParentDialogView(): BaseComponent {
    if (this.parentDialogView != null) {
      return this.parentDialogView;
    }

     if (this.isDialog()) {
      this.parentDialogView = this;
      return this;
    }

     if (this.parent != null) {
      let stack: Array<BaseComponent> = [this.parent];

       while (stack.length > 0) {
        const temp = stack.pop();

         if (_.get(temp, "dialog")) {
          this.parentDialogView = _.get(temp, "dialog");
          break;
        }

         if (temp.parent != null) {
          stack.push(temp.parent);
        }
      }
    }

     return this.parentDialogView;
  }

  getTables() {
    return this.tables;
  }

  logMessage(msg: string) {
    console.log('DEBUG ' + this.id + ": " + msg);
  }

  adjustScrollOnTable(element: HTMLElement){
    let parentElement = $(element).scrollParent();

    if(parentElement != null && parentElement.hasClass("table-container") &&
      (parentElement[0].scrollHeight > parentElement.outerHeight() || parentElement[0].scrollWidth > parentElement.outerWidth())){
      let sumOfLockedColumnsWidth = 0;

      const tableId = parentElement.find('table').attr('id');
      $(`table#${tableId} th.vt-locked-column`).each(function(index, lockedColumn) {
        sumOfLockedColumnsWidth += parseInt($(lockedColumn).outerWidth(), 10);
      });

      this.moveScrollIntoView(element, parentElement[0], sumOfLockedColumnsWidth);
    }
  }

  moveScrollIntoView(element: HTMLElement, scrolling_parent: HTMLElement, leftOffset: number)
  {
    const top = scrolling_parent.getBoundingClientRect().top;
    const bottom = scrolling_parent.getBoundingClientRect().bottom;

    const now_top = element.getBoundingClientRect().top;
    const now_bottom = element.getBoundingClientRect().bottom;

    let scroll_by = 0;
    if(now_top < top)
        scroll_by = -(top - now_top);
    else if(now_bottom > bottom)
        scroll_by = now_bottom - bottom;
    if(scroll_by != 0)
    {
        scrolling_parent.scrollTop += scroll_by;
    }

    const left = scrolling_parent.getBoundingClientRect().left;
    const right = scrolling_parent.getBoundingClientRect().right;

    const now_left = element.getBoundingClientRect().left;
    const now_right = element.getBoundingClientRect().right;

    scroll_by = 0;
    if(now_left < left + leftOffset)
        scroll_by = -(left + leftOffset - now_left);
    else if(now_right > right)
        scroll_by = now_right - right;
    if(scroll_by != 0)
    {
        scrolling_parent.scrollLeft += scroll_by;
    }
  }
}
