import { OnInit, ElementRef, ChangeDetectorRef, EventEmitter, Renderer2, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ListBoxDirective } from './list-box.directive';
import { ValuePair } from './value-pair';
import { Vector } from '../java/vector';
import { BsDropdownDirective } from 'ngx-bootstrap';
/**
 * Class for combo box component
 */
export declare class ComboBoxComponent extends BaseComponent implements OnInit {
    private cd;
    private ngZone;
    onCommand: EventEmitter<{}>;
    listBox: ListBoxDirective;
    inputElement: ElementRef;
    dropdown: BsDropdownDirective;
    hoveredItem: number;
    hoveredStyle: {
        'color': string;
        'background-color': string;
    };
    defaultStyle: {
        'color': string;
        'background-color': string;
    };
    dropdownElementId: string;
    /**
    * Accessor method for [[_listItems]] property
    */
    listItems: Array<ValuePair>;
    isDropup: boolean;
    private _listItems;
    private isDropdownOpen;
    selectedItem: ValuePair;
    dropdownMenuStyle: {
        [key: string]: string;
    };
    hasInputFocus: boolean;
    /**
     * Accessor method for [[selectedItem.text]] property
     */
    readonly selectedItemText: string;
    private parentScrollHanlder;
    private parentScroller;
    private isFirstKeyDown;
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd ChangeDetector reference provided by Angular to control change detection
     * @param renderer see [[BaseComponent]]
     */
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, cd: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone);
    ngOnDestroy(): void;
    /**
     * Initialize component and set css stye attribute for dropdown element
     */
    ngOnInit(): void;
    /**
     * Set up list items and set value/text on them. Sets selected item
     */
    ngAfterViewInit(): void;
    /**
     * Sets combobox list using array of values
     * @param values Array of [[ValuePairs]] to set combobox options.
     */
    initializeComboboxValues(values: Array<ValuePair>): void;
    /**
     * Focuses and selects item that is clicked
     * @param item Item to focus and select
     * @param event Mouse click event on item
     * @event onCommand
     */
    selectItem(item: ValuePair, event: MouseEvent): void;
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param item Item to set as selected
     * @param forceCd Force change detection
     */
    setSelectItem(item: ValuePair, forceCd?: boolean): void;
    /**
     * Sets selected item based on value
     * @param value Value to set
     */
    setSelectValue(value: string | number): void;
    /**
     * Event handler for mouse click on input
     * @param event Mouse click event on input element.
     */
    onInputClick(event: MouseEvent, dropdown: BsDropdownDirective): void;
    onKeyDown(e: KeyboardEvent, dropdown: BsDropdownDirective): void;
    adjustPulldownWidth(): void;
    toggleStatus(): void;
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param val Value to set.
     */
    setValue(val: any): void;
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param text Text of option to mark as selected.
     */
    setText(text: string): void;
    /**
     * Returns the selected item value.
     * @returns Value of the selected item in the combobox.
     */
    getValue(): any;
    /**
     * Returns the text of the selected item.
     * @returns String value of selected item text.
     */
    getText(): string;
    /**
     * Focuses the native input element
     */
    setFocus(): void;
    /**
     * Set the background color of the input element.
     * @param bgColor A CSS color string value. Should be hexadecimal or valid color name.
     */
    setBgColor(bgColor: string): void;
    /**
     * Finds a list item by text.
     * @param text Item text to search for
     * @returns [[ValuePair]] in [[_listItems]] that matches text
     */
    findItemByText(text: string): ValuePair;
    /**
     * Gets all list items that are children of the combobox component.
     * @returns Collection of list items.
     */
    getChildren(): Vector<any>;
    /**
     * Outputs JSON object that describes component
     * @returns Object
     */
    toJson(): any;
    /**
     * Returns string name of the component
     * @returns String
     */
    getLocalName(): string;
    /**
     * Returns string tag name of component
     */
    protected getNxTagName(): string;
    /**
     * @returns [[ChangeDetector]] for the component
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Sets combobox values based on definition map
     */
    private loadDataFromDef;
    /**
     * Removes focus from input element and sets unfocus background
     * @event OnBeforeActiveLost
     */
    inputFocusOut(): void;
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     */
    inputFocusIn(): void;
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param event Event object
     */
    preventDefault(event: any): void;
    private subscribeToParentScroller;
}
