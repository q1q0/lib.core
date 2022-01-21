import { AfterViewInit, OnDestroy, ElementRef, OnInit, ChangeDetectorRef, ComponentRef, EventEmitter, Renderer2 } from "@angular/core";
import { SessionService } from "../session/session.service";
import { AttributesEnum } from "./attributes.enum";
import { BorderPosition } from "./style-literals";
import { Vector } from "../java/vector";
import { AttributeChangeListener } from "./attribute-change-listener";
import { HTMLElementWrapper } from "../tree-table/html-element-wrapper";
import { AttributeNameValue } from "./attribute-name-value";
/**
 * Main class that all core components should inherit.
 */
export declare class BaseComponent implements AfterViewInit, OnDestroy, OnInit {
    protected parent: BaseComponent;
    private sessionService;
    protected elementRef: ElementRef;
    protected renderer: Renderer2;
    autoWrap: boolean;
    borderPosition: BorderPosition;
    id: string;
    disabled: boolean;
    sort: string;
    visible: boolean;
    text: string;
    /**
    * Accessor for [[cssClass]] property
    */
    cssClass: string;
    controlWidth: string;
    controlHeight: string;
    maxHeight: string;
    lineHeight: string;
    marginRight: string;
    marginLeft: string;
    marginTop: string;
    marginBottom: string;
    controlMargin: string;
    controlPadding: string;
    controlOverflow: string;
    panelWidth: string;
    panelMinWidth: string;
    panelMinHeight: string;
    controlFloat: string;
    required: boolean;
    pattern: string;
    min: number | string;
    max: number | string;
    minLength: number | string;
    maxLength: number | string;
    inputLocale: string;
    inputCharsets: string;
    focusOnActivation: boolean;
    focused: boolean;
    orderIndex: number;
    x: string;
    y: string;
    /**
    * Accessor for [[required]] property
    */
    require: boolean;
    controlWidthComboBox: string;
    class(css: string): void;
    hGrabSpace: boolean;
    vGrabSpace: boolean;
    bgColor: string;
    editor: string;
    popup: string;
    /**
     * Align horizontally? TODO need is a major regression test
     */
    alignHorizontal: string;
    private _cssClass;
    compRef: ComponentRef<any>;
    private _tempFreezeCd;
    enabled: boolean;
    sortValue: string;
    customAttributes: {
        [name: string]: any;
    };
    fontBold: boolean | string;
    fontColor: string;
    fontItalic: boolean | string;
    fontSize: number;
    fontUnderline: boolean | string;
    fontColorDisabled: string;
    opacity: string;
    borderColor: string;
    borderWidth: number | string;
    borderStyle: string;
    borderHeight: number | string;
    skipEmitContextMenuEvent: boolean;
    onContextMenu: EventEmitter<MouseEvent>;
    onActiveLost: EventEmitter<void>;
    onBeforeActiveLost: EventEmitter<void>;
    styles: {
        [name: string]: string;
    };
    tableRowNo: number;
    private _uniqueId;
    /**
     * This is for use when setAttribute(onCommand is set)
     */
    protected _internalOnCommand: (param?: any) => void;
    protected _internalOnActiveLost: (param?: any) => void;
    _internalChangeCb: (comp: BaseComponent) => void;
    readonly uniqueId: string;
    protected _children: Map<string, BaseComponent>;
    protected _childrenIndex: Array<string>;
    readonly children: Map<string, BaseComponent>;
    private attributeChangeListeners;
    private radioButtonGroups;
    highlightBgColor: string;
    highlightFontColor: string;
    parentTableRow: any;
    protected _viewChildrenMap: Map<string, BaseComponent>;
    protected tabChildrenIds: Array<string>;
    private scrollPanes;
    _isDying: boolean;
    /**
     * Constructor where it required minimal injection in order for this class to function properly. Subclass can overload this constructor
     * but it must provided the minimal required items to be injected.
     *
     * @param parent The component where this component will be used. This injection is provided by Angular if the parent component "provide" itself.
     * @param sessionService SessionService needed by this class, this should be injected by Angular.
     * @param elementRef the element reference that wrap the element (tag) of this component.
     * @param renderer The renderer (injected by Angular) that we used to perform DOM manipulation.
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2);
    /**
     * Got call when this component finished initializing, if you override this, make sure to call super.ngAfterViewInit()
     */
    ngAfterViewInit(): void;
    /**
     * Init life cycle of this class, if you override this, make sure to call super.ngOnInit()
     */
    ngOnInit(): void;
    private checkNxStyling;
    /**
     * Sets border CSS based on borderPosition value (top | left | bottom | right)
     */
    private initBorderLayout;
    /**
     * Destroy lifecycle. Clear component references and cache
     */
    ngOnDestroy(): void;
    protected cleanup(): void;
    /**
     * Get [[SessionService]] instance injected via constructor
     * @returns SessionService instance
     */
    getSession(): SessionService;
    /**
     * Get child component by id
     * @param id Component ID
     * @returns Child [[BaseComponent]]
     */
    getChild(id: string): BaseComponent;
    /**
     * Set [[disabled]] property value
     * @param boo Value for disabled property
     */
    setDisabled(boo: boolean): void;
    /**
     * Set [[visible]] property value
     * @param boo Value for visible property
     */
    setVisible(boo: boolean): void;
    setScrollPosVertical(expression: any): void;
    /**
     * Set color of text on the component
     * @param value Color string. Should be hexadecimal or color name supported by CSS
     */
    setFontColor(value: any): void;
    /**
     * Value of [[disabled]] property
     * @returns Value of disabled
     */
    getDisabled(): boolean;
    /**
     * Value of opposite of [[disabled]] value
     * @returns Value of enabled
     */
    getEnabled(): boolean;
    /**
     * Value of soColumnNo attribute
     * @returns Column number
     */
    getSoColumnNo(): string;
    /**
     * Get the component ref string value from [[editor]] property
     * @returns Ref of component
     */
    getEditor(): string;
    /**
     * Value of soRequire attribute
     * @returns soRequire value
     */
    getSoRequire(): string;
    /**
     * Value of soValidate attribute
     * @returns soValidate value
     */
    getSoValidate(): string;
    /**
     * Value of soType attribute
     * @returns soType value
     */
    getSoType(): string;
    /**
     * Value of soFormat attribute
     * @returns soFormat value
     */
    getSoFormat(): string;
    /**
     * Value of soMin attribute
     * @returns soMin value
     */
    getSoMin(): string;
    /**
     * Value of soMax attribute
     * @returns soMax value
     */
    getSoMax(): string;
    /**
     * Value of soMaxLength attribute
     * @returns soMaxLength value
     */
    getSoMaxLength(): string;
    /**
     * Value of soPattern attribute
     * @returns soPattern value
     */
    getSoPattern(): string;
    /**
     * Value of soMaxByteLen attribute
     * @returns soMaxByteLen value
     */
    getSoMaxByteLen(): string;
    /**
     * Set [[disabled]] property to opposite of input
     * @param boo Value of enabled
     */
    setEnabled(boo: boolean | string): void;
    /**
     * Set value of [[sort]] property
     * @param value Sort value to set
     */
    setSortValue(value: string): void;
    /**
     * Get value of [[visible]] property
     * @returns Visble property value
     */
    getVisible(): boolean;
    /**
     * Sets value of text attribute and marks component for change detection
     * @param value Text to set. If it's a null value, it will be converted to an empty string
     * If it's a number or non-string, it will be converted to a string representation of the value.
     */
    setText(value: string | number): void;
    /**
     * Set callback function for [[onCommand]]
     * @param fn Function to be invoked for [[onCommand]] event
     */
    setOnCommand(fn: () => void): void;
    /**
     * Set callback function for [[onActiveLost]]
     * @param fn Function to be invoked for [[onActiveLost]] event
     */
    setOnActiveLost(fn: () => void): void;
    /**
     * Set all attributes in one go
     *
     * @param attrs
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    setAttributes(attrs: Array<AttributeNameValue>, skipAttributeOverride?: boolean): void;
    /**
     * Set HTML attribute value on component
     * @param attribute HTML attribute to set
     * @param value Value of attribute
     * @param skipAttributeOverride Set to 'true' if you do not want custom attribute to override exisiting HTML attribute
     */
    setAttribute(attribute: AttributesEnum | string, value: any, skipAttributeOverride?: boolean): void;
    /**
     * Get value of HTML attribute
     * @param attribute Name of HTML attribute to get
     * @returns Value of attribute
     */
    getAttribute(attribute: string | AttributesEnum, skipQueryDOMIfNotExists?: boolean): any;
    /**
     * Focus the HTML element of this component
     */
    requestFocus(): void;
    /**
     * Focus the native HTML element of the component and mark for change detection
     */
    setFocus(): void;
    /**
     * Event handler for when focus is lost. Invokes onActiveLost event handler
     * @event [[OnActiveLost]]
     */
    focusLost(): void;
    /**
     * Creates a unique id using an optional prefix
     * @param prefix String to append to beginning of ID
     * @returns Unique ID
     */
    static generateUniqueId(prefix?: string): string;
    /**
     * Adds child component to this component
     * @param child Component to add as child
     */
    protected addChild(child: BaseComponent): void;
    /**
     * Get the native element of the component if a reference to it is defined
     * @returns The HTML native element or 'null' if reference is missing
     */
    getElement(): HTMLElement;
    /**
     * Get the text property value
     * @returns Text value
     */
    getText(): string;
    /**
     * Set CSS color style attribute and marks for change detection
     * @param color CSS color string value. Should be hexadecimal or valid CSS color string
     */
    setColor(color: string): void;
    /**
     * Get the color style attribute value
     * @returns Color string. Hexadecimal or CSS color string
     */
    getColor(): string;
    /**
     * Set background color CSS style attribute value
     * @param bgColor Color string value to set. Should be hexadecimal or valid CSS color string.
     */
    setBgColor(bgColor: string): void;
    /**
     * Sets font-weight style property to bold
     * @param boo Switch for turning bold style on/off
     */
    setFontBold(boo: boolean | string): void;
    /**
     * Sets CSS style attribute font-style to italic
     * @param boo Switch for turning italic style on/off
     */
    setFontItalic(boo: boolean | string): void;
    /**
     * Sets CSS style attribute font-size
     * @param size Number of pixels for font-size
     */
    setFontSize(size: number): void;
    /**
     * Add/remove CSS style attribute text-decoration to underline
     * @param underline Switch for turning underline style on/off for text
     */
    setFontUnderline(underline: boolean | string): void;
    /**
     * Event handler that registers focus event
     * @param event
     */
    handleFocus(event: FocusEvent): void;
    /**
     * Event handler that registers click event
     * @param event
     */
    handleClick(event: MouseEvent): void;
    /**
     * Event handler that registers keydown event
     * @param event
     */
    handleKeyDown(event: KeyboardEvent): void;
    /**
     * Event handler that registers keyup event
     * @param event
     */
    handleKeyUp(event: KeyboardEvent): void;
    /**
     * Event handler that registers mousedown event
     * @param event
     */
    handleMouseDown(event: MouseEvent): void;
    /**
     * Gets custom attribute by name if it exists
     * @param attributeName Name of custom attribute
     * @returns Custom attribute if it exists, otherwise undefined
     */
    getCustomAttribute(attributeName: string): any;
    /**
     * Set attribute on customAttribute object using name as key
     * @param name key name of attribute
     * @param value value to set for key/name
     */
    setCustomAttribute(name: string, value: any): void;
    /**
     * Check if custom attribute exists
     * @param id Key name of attribute
     * @returns True if custom attribute with name/key exists
     */
    hasCustomAttribute(id: string): boolean;
    /**
     * Get child component by index
     * @param idx Index of child component
     * @returns Child [[BaseComponent]]
     */
    getChildAt(idx: number): BaseComponent;
    /**
     * Get the number of child components
     * @returns Number of children
     */
    getChildCount(): number;
    /**
     * Get index of child component if it exists
     * @param child Child component
     */
    indexOfChild(child: any): number;
    /**
     * Insert child component to children array at location of index
     * @param idx Index of insert location
     * @param row
     */
    insertChildAt(idx: number, row: any): void;
    /**
     * TODO: Add documentation for emitInternalCommand
     */
    protected emitInternalOnCommand(): boolean;
    /**
     * Registers event handler for client event
     * @param event Event to register
     */
    protected registerClientEvent(event: Event): void;
    /**
     * Get the native HTML element tag name
     * @returns Name of HTML element tag
     */
    getTagName(): string;
    /**
     * Get component tag name without vivify core prefix (i.e. "vt-")
     * @returns Tag name
     */
    getLocalName(): string;
    /**
     * Get the parent component if it exists
     * @returns Component or null if there is no parent
     */
    getParent(): BaseComponent;
    /**
     * Get value property if it exists, otherwise return 'null'
     * @returns Value or 'null'
     */
    getValue(): any;
    /**
     * Removes attribute name name
     * @param attribute Attribute to remove
     */
    removeAttribute(attribute: string | AttributesEnum): void;
    /**
     * Alias of [[setRequired]]
     * @param boo
     */
    setRequire(boo: boolean | string): void;
    /**
     * Set [[required]] to true or false
     * @param boo
     */
    setRequired(boo: boolean | string): void;
    /**
     * Set [[pattern]] value
     * @param pattern
     */
    setPattern(pattern: string): void;
    /**
     * Set [[min]] value
     * @param val
     */
    setMin(val: any): void;
    /**
     * Set [[max]] value
     * @param val
     */
    setMax(val: any): void;
    /**
     * Get [[pattern]] value
     * @returns [[pattern]]
     */
    getPattern(): string;
    /**
     * Get [[min]] value
     * @returns [[min]]
     */
    getMin(): any;
    /**
     * Get [[max]] value
     * @returns [[max]]
     */
    getMax(): any;
    /**
     * Get [[inputLocale]] value
     * @returns [[inputLocale]]
     */
    getInputLocale(): string;
    /** Set [[inputLocale]] value
     * @param locale
     */
    setInputLocale(locale: string): void;
    /**
     * Get [[inputCharsets]] value
     * @returns [[inputCharsets]]
     */
    getInputCharsets(): string;
    /**
     * Set [[inputCharests]] value
     * @param inputCharSets
     */
    setInputCharsets(inputCharSets: string): void;
    /**
     * Get [[id]] value
     * @returns [[id]]
     */
    getId(): string;
    /**
     * Set [[id]] value
     * @param id
     */
    setId(id: string): void;
    /**
     * Abstract method. Implemented by sub class components
     * @param title
     */
    setTitle(title: string): void;
    /**
     * Set [[cssClass]] of component.
     * @param css Class (CSS) name to set on component. For multiple CSS classes, join with DOT (.)
     * ```
     * .class1.class2.class3
     * ```
     */
    setCssClass(css: string, skipAttributeOverride?: boolean): void;
    /**
     * Adds a css class name to the internal [[_cssClass]] property
     * @param css CSS class name to add
     */
    addCssClass(css: string): void;
    /**
     * Removes css class name from internal [[_cssClass]] property
     * @param css CSS class name to remove
     */
    removeCssClass(css: string): void;
    /**
     * Get the [[require]] property value
     * @returns Value of [[require]]
     */
    getRequired(): string | boolean;
    /**
     * Remove all references to the component and invokes Angulars [[ngOnDestroy]] method
     */
    destroyComponent(): void;
    /**
     * Gets JSON representation of the component
     * @returns JSON object
     */
    toJson(): {};
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    protected childToJson(child: BaseComponent): {};
    /**
     * Gets JSON representation of [[customAttributes]]
     * @returns JSON Object
     */
    protected customAttributesToJson(): {};
    static mapToJson(map: {
        [name: string]: any;
    }): {};
    /**
     * Should be implemented by sub class otherwise returns default value of "none"
     * @returns NxTagName as string
     */
    protected getNxTagName(): string;
    /**
     * Sets JSON values. Mutates JSON object that is passed in
     * @param json Object to add key to
     * @param key Key to set
     * @param value Value to set for key param
     */
    protected setJson(json: any, key: any, value: any): void;
    /**
     * Converts value to a valid JSON property string
     * @param value Value to convert to string
     * @returns Value as a valid JSON property string
     */
    protected toJsonValue(value: any): any;
    /**
     * Sets [[id]] property to a unique string ID generated by [[_uniqueId]]
     */
    resetId(): void;
    /**
     * Get value of checked property. Should be implemented in sub class components that have checked state
     * @returns Value of [[checked]] property
     */
    getChecked(): boolean;
    /**
     * Abstract method. Should be implemented by sub class components that have checked state
     * @param boo Toggle [[checked]] on/off
     */
    setChecked(boo: boolean | string): void;
    /**
     * Abstract method. Should be implemented by sub class components that have selected state
     * @param boo Toggle [[checked]] on/off
     */
    setSelected(boo: boolean | string): void;
    /**
     * Get [[maxLength]] property. Returns -1 if it is null
     * @returns Value of maxLength as integer if it's set, otherwise returns null
     */
    getMaxLength(): number;
    /**
     * Get [[minLength]] property. Returns -1 if it is null
     * @returns Value of minLength as integer if it's set, otherwise returns null
     */
    getMinLength(): number;
    /**
     * Get a list of child components
     * @returns Child components
     */
    getChildren(): Vector<BaseComponent>;
    /**
     * Remove child component from list of children and remove children of child
     * @param child Child component to remove
     */
    removeChild(child: BaseComponent): void;
    /**
     * Removes child component by ID
     * @param id Child [[id]]
     */
    removeChildById(id: string): void;
    /**
     * Remove all child components
     */
    private removeAllChildren;
    /**
     * Finds the child component by ID. Deep search
     * @param id Child component [[id]]
     */
    getElementById(id: string): BaseComponent;
    /**
     * Check if a child component with id exists
     * @param id Child component [id]
     */
    hasChild(id: string): boolean;
    /**
     * Set validate attribute for input component. Implement on sub class component
     * @param attr
     */
    setValidate(attr: string): void;
    /**
     * Set type attribute for input component. Implement on sub class component
     * @param type
     */
    setType(type: string): void;
    /**
     * Set format attribute for input component. Implement on sub class component
     * @param format
     */
    setFormat(format: string): void;
    /**
     * Set [[maxLength]] for input component
     * @param maxLength Input max length property. Should be numeric string
     */
    setMaxLength(maxLength: string): void;
    /**
     * Set [[minLength]] for input component
     * @param minLength Input max length property. Should be numeric string
     */
    setMinLength(minLength: string): void;
    /**
     * Set [[maxLength]] as byte length for input component
     * @param bl Should be numeric string
     */
    setMaxByteLen(bl: string): void;
    /**
     * Abstract method. Set value of input component
     * @param val Value to set
     */
    setValue(val: any): void;
    /**
     * Set focusable property value for component. Implement on sub class
     * @param focusable Toggle focusable on/off
     */
    setFocusable(focusable: boolean | string): void;
    /**
     * Abstract. Select parent component tab. Implement on sub class
     */
    selectParentTab(): void;
    /**
     * Perform a deep search (that is, looks up descendants)
     * @param id element id to search
     */
    findElementById(id: string): BaseComponent;
    /**
     * Get radio button group component by id
     * @param id Radio button group ID
     */
    getRadioButtonGroupComponent(id: string): BaseComponent;
    /**
     * Add change listener on attributes
     * @param listener
     */
    addAttributeChangeListener(listener: AttributeChangeListener): void;
    /**
     * Remove change listener on attributes
     * @param listener
     */
    removeAttributeChangeListener(listener: AttributeChangeListener): void;
    /**
     * Set attribute and emit change event
     * @param attributeName
     * @param newValue
     * @event AttributeChangeEvent
     */
    protected fireSetAttributeEvent(attributeName: string, newValue: any): void;
    /**
     * Remove attribute and emit change event
     * @param attributeName
     * @event AttributeChangeEvent
     */
    protected fireRenoveAttributeEvent(attributeName: string): void;
    /**
     * Alias for static [[cleanCss]] method
     * @param css
     */
    private cleanCss;
    /**
     * Format css selectors. Remove dot
     * @param css
     * @returns New CSS selector string
     */
    static cleanCss(css: string): any;
    /**
     * Abstract method gets the instance's [[ChangeDetectorRef]]. Should be implemented in sub class
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Mark component for change detection
     */
    markForCheck(): void;
    /**
     * Invoke change detection on component
     */
    detectChanges(): void;
    /**
     * Set CSS height and width style value. Either 'height/width' or 'max-height/max-width'
     * @param heightStyleName
     * @param widthStyleName
     */
    protected initWidthHeightStyle(heightStyleName?: string, widthStyleName?: string): void;
    /**
     * Add a radio button component to this component
     * @param radio
     */
    addRadioButtonGroup(radio: BaseComponent): any;
    /**
     * Get radio button group by group ID
     * @param groupId
     * @returns  Radio button group component
     */
    getRadioButtonGroup(groupId: string): BaseComponent[];
    /**
     * Sets [[controlWidth]] property
     * @param width Should be numeric value
     */
    setControlWidth(width: any): void;
    /**
     * Sets [[controlHeight]] property
     * @param height Should be numeric value
     */
    setControlHeight(height: any): void;
    /**
     * Alias for [[setControlWidth]] method
     * @param width Should be a numeric value
     */
    setWidth(width: any): void;
    /**
     * Get [[controlWidth]] property
     * @returns Value of [[controlWidth]]
     */
    getWidth(): string;
    /**
     * Alias for [[setControlHeight]] method
     * @param height Should be a numeric value
     */
    setHeight(height: any): void;
    /**
     * Get [[controlHeight]] property
     * @returns Value of [[controlHeight]]
     */
    getHeight(): string;
    /**
     * Sets value of [[x]] property for horizontal position.
     * Sets CSS "left" property to [[x]] px.
     * @param x Horizontal coordinate position
     */
    setX(x: string): void;
    /**
     * Get [[x]] property
     * @returns Value of [[x]]
     */
    getX(): string;
    /**
     * Sets value of [[y]] property for vertical position.
     * Sets CSS "top" property to [[y]] px.
     * @param y Vertical coordinate position
     */
    setY(y: string): void;
    /**
     * Get [[y]] property
     * @returns Value of [[y]]
     */
    getY(): string;
    /**
     * Set [[borderWidth]] property value
     * @param borderWidth Should be numeric
     */
    setBorderWidth(borderWidth: string): void;
    /**
     * Check if component is view component.
     * Implement in sub class
     */
    isView(): boolean;
    /**
     * Check if there are active views.
     * Implement in sub class
     */
    isNoneActiveView(): boolean;
    /**
     * Check if this component is an instance of [[DialogComponent]]
     */
    protected isDialog(): boolean;
    /**
     * Check if this component is a dynamic view
     */
    isDynamicView(): boolean;
    /**
     * Get the parent view of this component
     * @returns Parent view component
     */
    getParentView(): BaseComponent;
    getParentScrollView(): BaseComponent;
    isScrollView(): boolean;
    /**
     * Return the parent container component (for subview), not the actual parent view. This is the parent
     * ViewComponent where canBeActiveView is false
     */
    _getNoneActiveViewParent(): BaseComponent;
    /**
     * Event handler for context menu click (right click).
     * Delegates to [[SessionService]] to display popup.
     * @param event Click event
     * @param force always emit
     */
    handleOnContextMenu(event: MouseEvent, force?: boolean): void;
    /**
     * Emits focus lost event for components that require validation
     * @param event
     * @event BeforeActiveLost
     */
    validateField(event: FocusEvent): void;
    /**
     * Get children of a table component.
     * @returns Array of table children
     */
    getTableChildren(): Array<any>;
    /**
     * Get [[bgColor]] property
     * @returns Value of [[bgColor]]
     */
    getBgColor(): string;
    protected setAttributeFromDef(): void;
    /**
     * Perform an xpath lookup on the element. This will be evaluated against the actual HTMLElement.
     *
     * @warning PLEASE ENSURE TO FREE UP THE THE RESULT SO WE DON'T HAVE ANY DANGLING HTML ELEMENT
     *
     * @param xpathExpression
     */
    evaluateXPath(xpathExpression: string): Vector<Node>;
    /**
     * Set color of hightlighted text background
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    setHighlightBgColor(color: string): void;
    /**
     * Set color of highlighted text foreground
     * @param color Should be a valid CSS color value (e.g. "#FF0000" or "red")
     */
    setHighlightFontColor(color: string): void;
    /**
     * Get [[hightlightBgColor]] property
     * @returns Color string
     */
    getHighlightBgColor(): string;
    /**
     * Get [[highlightFontColor]] property
     * @returns Color string
     */
    getHighlightFontColor(): string;
    /**
     * Get [[parentTableRow]] property
     */
    getParentTableRow(): any;
    /**
     * Check if change detection is frozen
     * @returns Boolean If component change detection is frozen
     */
    isChangeDetectionFrozen(): boolean;
    /**
     * Check if component is a faux element
     * @returns Boolean If component is faux element
     */
    isFauxElement(): boolean;
    /**
     * Get internal [[_viewChildrenMap]] member
     * @returns Value of [[_viewChildrenMap]]
     */
    getViewChildrenMap(): Map<string, BaseComponent>;
    /**
     * Removes view child with id from [[_viewChildrenMap]]
     * @param id ID of child to remove
     */
    removeViewChildFromMap(id: string): void;
    /**
     * Adds a component to [[_viewChildrenMap]]
     * @param obj Child to add to [[_viewChildrenMap]]
     */
    addViewChildToMap(obj: BaseComponent | HTMLElementWrapper): void;
    /**
     * Invoke an MCO method by name. If a function is passed as argument, it will be called with
     * this component as an argument.
     * @param action Name of action method to invoke or a function to invoke
     */
    protected invokeMcoAction(action: string | ((arg?: any) => any)): void;
    protected _notifyInternalChangeCb(): void;
    emptyChildren(): void;
    /**
     * Check to see if this is a ScrollPaneComponent
     */
    isScrollPane(): boolean;
    /**
     * Reset the scroll position to the previous captured
     */
    resetScrollTopToPreviousPosition(): void;
    /**
     * Reset all scrollpane pos
     */
    resetAllScrollPanesPositionToPrevious(): void;
    resetScrollTopPosition(): void;
    resetAllScrollPanesPositionToTop(): void;
    /**
     * Notify parent view that there is a validation error on this, this should only be applicabled to disabled element
     */
    notifyParentOfError(): void;
    /**
     * Focus the parent tab
     */
    focusParentTab(): void;
    /**
     * Register scrollpane
     *
     * @param scrollPane scrollPane to register
     */
    private registerScrollPane;
}
