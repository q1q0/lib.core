/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, Output, EventEmitter, Renderer2, Input, ViewEncapsulation, ViewChild, forwardRef, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ListBoxDirective } from './list-box.directive';
import * as _ from 'lodash';
import { Vector } from '../java/vector';
import { FauxComboElement } from './faux-combo-element';
import { BsDropdownDirective } from 'ngx-bootstrap';
/**
 * Class for combo box component
 */
export class ComboBoxComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} cd ChangeDetector reference provided by Angular to control change detection
     * @param {?} renderer see [[BaseComponent]]
     * @param {?} ngZone
     */
    constructor(parent, sessionService, elementRef, cd, renderer, ngZone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.ngZone = ngZone;
        this.onCommand = new EventEmitter();
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        this.defaultStyle = {
            'color': '#333333',
            'background-color': '#ffffff'
        };
        this.dropdownElementId = `dropdown-${this.id}`;
        this.isDropup = false;
        this.isDropdownOpen = false;
        /* istanbul ignore next */
        this.dropdownMenuStyle = {};
        /* istanbul ignore next */
        this.hasInputFocus = false;
        this.isFirstKeyDown = true;
        this.parentScrollHanlder = () => {
            /* istanbul ignore else */
            if (this.dropdown != null) {
                this.dropdown.hide();
            }
        };
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set listItems(items) {
        this._listItems = items;
        if (this._listItems != null) {
            /** @type {?} */
            const selectedItem = _.find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
    }
    /**
     * Accessor method for [[_listItems]] property
     * @return {?}
     */
    get listItems() {
        return this._listItems;
    }
    /**
     * Accessor method for [[selectedItem.text]] property
     * @return {?}
     */
    get selectedItemText() {
        return this.selectedItem ? this.selectedItem.text : '';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.parentScrollHanlder != null && this.parentScroller != null) {
            this.ngZone.runOutsideAngular(() => {
                this.parentScroller.removeEventListener("scroll", this.parentScrollHanlder);
            });
        }
        this.parentScrollHanlder = null;
        this.parentScroller = null;
        if (this.dropdown && this.dropdown.isOpen) {
            this.dropdown.hide();
        }
        this.dropdown = null;
        super.ngOnDestroy();
    }
    /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.dropdownElementId = `dropdown-${this.id}`;
        // Ensure controlWidth is exists and is a number
        if (parseInt(this.controlWidth, 10)) {
            this.dropdownMenuStyle['min-width'] = this.controlWidth + 'px !important';
        }
        if (this.alignHorizontal) {
            this.alignHorizontal = this.alignHorizontal;
        }
    }
    /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.listBox != null && this.listBox.listItems != null) {
            this._listItems = [];
            this.listBox.listItems.forEach((item) => {
                /** @type {?} */
                let text = item.text || '';
                /** @type {?} */
                let value = item.value || '';
                this._listItems.push({
                    text: text ? text : value,
                    value: value ? value : text,
                    selected: item.selected === true || item.selected === "true" || item.isChecked === true || item.isChecked === "true"
                });
            });
            /** @type {?} */
            const selectedItem = _.find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
        this.loadDataFromDef();
        this.cd.detectChanges();
        this.subscribeToParentScroller();
    }
    /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    initializeComboboxValues(values) {
        if (values != null) {
            this._listItems = _.map(values, (item) => {
                item.text = item.text || '';
                return {
                    text: item.text,
                    value: item.value,
                    selected: item.selected
                };
            });
            /** @type {?} */
            const selectedItem = _.find(this._listItems, (item) => item.selected === true);
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
            else {
                this.setSelectItem(this._listItems[0]);
            }
        }
        else {
            this._listItems = [];
        }
        this.cd.markForCheck();
    }
    /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    selectItem(item, event) {
        this.inputElement.nativeElement.focus();
        this.setSelectItem(item);
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    }
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    setSelectItem(item, forceCd = false) {
        this.selectedItem = item;
        if (forceCd === true) {
            this.cd.markForCheck();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    }
    /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    setSelectValue(value) {
        if (this._listItems != null) {
            /** @type {?} */
            const temp = _.find(this._listItems, (item) => item.value == value || (value != null && value !== "" && value === item.text));
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    onInputClick(event, dropdown) {
        event.stopPropagation();
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        dropdown.toggle(true);
        if (parseInt(this.controlWidthComboBox, 10)) {
            this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox)) + 'px';
        }
        else {
            this.dropdownMenuStyle['width'] = (parseInt(this.elementRef.nativeElement.children[0].children[0].children[0].clientWidth) + 20) + 'px';
        }
    }
    /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    onKeyDown(e, dropdown) {
        if (!this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            dropdown.toggle(true);
            /** @type {?} */
            let idx = 0;
            // トグルが閉じられている状態でキーボードのUP、DOWNが押下された場合
            if (e.keyCode === 38) {
                // UPの場合、プルダウンの最終に移動してしまうため、最後の要素を設定とする
                idx = this._listItems.length - 1;
            }
            else {
                // DOWNの場合、最初の要素を設定とする
                idx = 0;
            }
            // :hover状態のインデックスを更新
            this.hoveredItem = idx;
            // プルダウンを設定
            this.selectItem(this._listItems[idx], null);
            // フラグを更新
            this.isFirstKeyDown = false;
        }
        else if (this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            // トグルが開いている状態かつキーボードのUP、DOWNが押下された場合
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            /** @type {?} */
            let idx = 0;
            if (e.keyCode === 38) { // 38 = UP arrow
                // 38 = UP arrow
                if (this.isFirstKeyDown || this.hoveredItem === 0) {
                    // トグルが開かれた状態で、初めてキーが押下された場合
                    // :hover状態のプルダウン要素が一番上の場合
                    // UPは最後の要素を設定する
                    idx = this._listItems.length - 1;
                }
                else {
                    // 上記以外
                    // :hover状態の要素の１つ上を設定
                    idx = this.hoveredItem - 1;
                }
            }
            else { // 40 = DOWN arrow
                // 40 = DOWN arrow
                if (this.isFirstKeyDown || this.hoveredItem === (this._listItems.length - 1)) {
                    // トグルが開かれた状態で、初めてキーが押下された場合
                    // :hover状態のプルダウン要素が一番下の場合
                    // 初めの要素を設定
                    idx = 0;
                }
                else {
                    // 上記以外
                    // :hover状態の要素の１つ下を設定
                    idx = this.hoveredItem + 1;
                }
            }
            // :hover状態のインデックスを更新
            this.hoveredItem = idx;
            // プルダウンを設定
            this.selectItem(this._listItems[idx], null);
            // フラグを更新
            this.isFirstKeyDown = false;
        }
        this.cd.markForCheck();
        // V3R1-UT-NSD-643 修正 END
    }
    /**
     * @return {?}
     */
    adjustPulldownWidth() {
        this.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        if (parseInt(this.controlWidthComboBox, 10)) {
            this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox)) + 'px';
        }
        else {
            this.dropdownMenuStyle['width'] = (parseInt(this.elementRef.nativeElement.children[0].children[0].children[0].clientWidth) + 20) + 'px';
        }
    }
    /**
     * @return {?}
     */
    toggleStatus() {
        if (!this.isDropdownOpen) {
            /** @type {?} */
            let id = _.get(this.getParentScrollView(), "id");
            /** @type {?} */
            let _this = this;
            $(`#${id}`).on('scroll mousewheel', function (e) {
                if (_this.dropdown != null) {
                    _this.dropdown.hide();
                }
                // return false;
            });
            /** @type {?} */
            const parentView = /** @type {?} */ (this.getParentView());
            if (parentView != null && parentView.dialog != null && parentView.dialog.modalContent && parentView.dialog.modalContent != null) {
                /** @type {?} */
                let parentPanel = parentView.dialog && parentView.dialog.modalContent.nativeElement;
                /** @type {?} */
                let comboBox = this.inputElement.nativeElement.parentElement;
                /** @type {?} */
                let parentPos = parentPanel.getBoundingClientRect();
                /** @type {?} */
                let childrenPos = comboBox.getBoundingClientRect();
                /** @type {?} */
                let distanceToBottom = parentPos.bottom - childrenPos.bottom;
                /** @type {?} */
                let distanceToTop = childrenPos.top - parentPos.top;
                /** @type {?} */
                let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
                if (distanceToBottom < 200) {
                    if (distanceToTop > 200) {
                        $(".dropdown-menu").parent().attr("class", "dropup");
                    }
                    else if (distanceToTop > distanceToBottom) {
                        $(".dropdown-menu").parent().attr("class", "dropup");
                    }
                    else {
                        $(".dropdown-menu").parent().attr("class", "dropdown");
                    }
                }
                else {
                    $(".dropdown-menu").parent().attr("class", "dropdown");
                }
            }
            else if (parentView != null) {
                /** @type {?} */
                let dialog = $(`#${parentView["mainScreenId"]}`);
                if (dialog != null && dialog.children() && dialog.children()[0] && dialog.children()[0] != null) {
                    /** @type {?} */
                    let comboBox = this.inputElement.nativeElement.parentElement;
                    /** @type {?} */
                    let parentPos = dialog.children()[0].getBoundingClientRect();
                    /** @type {?} */
                    let childrenPos = comboBox.getBoundingClientRect();
                    /** @type {?} */
                    let distanceToBottom = parentPos.bottom - childrenPos.bottom;
                    /** @type {?} */
                    let distanceToTop = childrenPos.top - parentPos.top;
                    /** @type {?} */
                    let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
                    if (distanceToBottom < 200) {
                        if (distanceToTop > 200) {
                            $(".dropdown-menu").parent().attr("class", "dropup");
                        }
                        else if (distanceToTop > distanceToBottom) {
                            $(".dropdown-menu").parent().attr("class", "dropup");
                        }
                        else {
                            $(".dropdown-menu").parent().attr("class", "dropdown");
                        }
                    }
                    else {
                        $(".dropdown-menu").parent().attr("class", "dropdown");
                    }
                }
            }
        }
        else {
            /** @type {?} */
            let id = _.get(this.getParentScrollView(), "id");
            $(`#${id}`).off('scroll mousewheel');
            // V3R1-UT-NSD-643 修正 START
            // トグルが閉じられたタイミングでフラグを戻す
            this.isFirstKeyDown = true;
            // V3R1-UT-NSD-643 修正 END
            this.dropdown.hide();
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    setValue(val) {
        this.setSelectValue(val);
        this.cd.markForCheck();
    }
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    setText(text) {
        if (text == null) {
            this.setSelectItem(null);
            this.cd.markForCheck();
        }
        else if (this._listItems != null) {
            /** @type {?} */
            const temp = _.find(this._listItems, (item) => item.text == text);
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    }
    /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    getValue() {
        return this.selectedItem ? this.selectedItem.value : null;
    }
    /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    getText() {
        return this.selectedItem ? this.selectedItem.text : "";
    }
    /**
     * Focuses the native input element
     * @return {?}
     */
    setFocus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    setBgColor(bgColor) {
        this.inputElement.nativeElement.style.backgroundColor = bgColor;
    }
    /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    findItemByText(text) {
        return _.find(this._listItems, (item) => item.text == text);
    }
    /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    getChildren() {
        /** @type {?} */
        const result = new Vector();
        if (this._listItems != null) {
            _.forEach(this._listItems, (item) => {
                result.add(new FauxComboElement(this, item));
            });
        }
        return result;
    }
    /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json.value = this.getValue();
        return json;
    }
    /**
     * Returns string name of the component
     * @return {?} String
     */
    getLocalName() {
        return "comboBox";
    }
    /**
     * Returns string tag name of component
     * @return {?}
     */
    getNxTagName() {
        return "comboBox";
    }
    /**
     * @return {?} [[ChangeDetector]] for the component
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    loadDataFromDef() {
        /** @type {?} */
        let defId = this.getId();
        if (this.editor != null && this.editor.length > 0) {
            defId = this.editor.substring(1);
        }
        /** @type {?} */
        const def = this.getSession().getDef(defId);
        if (def != null && def.valueList != null) {
            /** @type {?} */
            const attribute = def.attribute;
            this.initializeComboboxValues(_.map(def.valueList, (item) => {
                return {
                    value: item["value"],
                    text: item["name"],
                    selected: item["selectFlg"] === "true" || item["selectFlg"] === true
                };
            }));
            this.setAttributeFromDef();
        }
    }
    /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    inputFocusOut() {
        if (!this.hasInputFocus)
            return; //On the IE, prevent to fire focusout event without focusin event.(this occurs when error-dialog is showed.)issue#1433NG(2)
        if (this.inputElement.nativeElement.ownerDocument.activeElement === this.inputElement.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.setBgColor('');
        this.onBeforeActiveLost.emit();
        this.hasInputFocus = false;
        setTimeout(() => {
            /** @type {?} */
            let $active = $(":focus");
            if ($active.length > 0 && !$active.is("body") && $active.closest(".vt-combo-box,[vt-arrow-navigatable-container]").length == 0) {
                if (this.dropdown && this.dropdown.isOpen) {
                    this.dropdown.hide();
                }
            }
        }, 10);
    }
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    inputFocusIn() {
        this.hasInputFocus = true;
    }
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    preventDefault(event) {
        event.preventDefault();
        event.stopPropagation();
        this.inputElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    subscribeToParentScroller() {
        /** @type {?} */
        const scrollParent = $(this.elementRef.nativeElement).scrollParent();
        if (scrollParent != null && scrollParent[0] instanceof HTMLElement) {
            this.parentScroller = scrollParent[0];
            this.ngZone.runOutsideAngular(() => {
                this.parentScroller.addEventListener("scroll", this.parentScrollHanlder);
            });
        }
    }
}
ComboBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-combo-box',
                template: "<div [id]=\"id\" class=\"btn-group dropdown vt-combo-box {{cssClass}} {{!disabled}}select\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  [style.margin]=\"controlMargin\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  #dropdown=\"bs-dropdown\"\n  (onShown)=\"toggleStatus()\"\n  (onHidden)=\"toggleStatus()\"\n  dropdown [isDisabled]=\"disabled === true\" container=\"body\" [dropup]=\"isDropup\">\n  <div class=\"input-group\">\n    <input #input class=\"form-control combobox-input-box\" type=\"text\" [value]=\"selectedItemText\" [style.text-align]=\"alignHorizontal\"\n      (focusin)=\"inputFocusIn()\" (focusout)=\"inputFocusOut()\" (click)=\"onInputClick($event, dropdown)\" [readonly]=\"disabled !== true\" [disabled]=\"disabled\" (keydown)=\"onKeyDown($event,dropdown)\"/>\n    <span class=\"input-group-btn\">\n      <button id=\"button\" (mousedown)=\"preventDefault($event)\" (click)=\"adjustPulldownWidth()\" dropdownToggle type=\"button\" class=\"btn combo-btn dropdown-toggle\" style=\"width: 20px\" tabindex=\"-1\">\n        <span class=\"caret\"></span>\n      </button>\n    </span>\n  </div>\n  <ul\n    *dropdownMenu\n    [id]=\"dropdownElementId\"\n    class=\"dropdown-menu combobox-dropdown\"\n    role=\"menu\"\n    [ngStyle]=\"dropdownMenuStyle\"\n    vt-arrow-navigatable-container\n    [activeParent]=\"input\"\n    (onTab)=\"dropdown.hide()\"\n  >\n    <li *ngFor=\"let item of listItems; index as i\">\n      <ng-template [ngIf]=\"item.visible !== false && item.visible !== 'false'\">\n        <a *ngIf=\"item.text != null && item.text !== ''\"\n          class=\"dropdown-item menuItem\"\n          (mousedown)=\"preventDefault($event)\"\n          (click)=\"selectItem(item, $event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          vt-arrow-navigatable-item>{{item.text}}</a>\n        <a *ngIf=\"item.text == null || item.text === ''\"\n          class=\"dropdown-item\"\n          (mousedown)=\"preventDefault($event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          vt-arrow-navigatable-item\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          (click)=\"selectItem(item, $event)\">\n          &nbsp;\n        </a>\n      </ng-template>\n    </li>\n  </ul>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => ComboBoxComponent)
                    }
                ],
                styles: ["bs-dropdown-container ul.dropdown-menu.combobox-dropdown{max-height:225px;margin-top:-3px!important;overflow:auto;overflow-x:hidden}.combobox-dropdown>li>a{padding:3px 10px 3px 5px;font-size:9px!important;margin-bottom:0!important}.combobox-dropdown>li>a:hover{color:#0000cd;background-color:#ff9c00}.vt-combo-box .form-control[readonly]{background:#fff;cursor:default;margin-bottom:3px}bs-dropdown-container{z-index:10000}.combo-btn,.combo-btn:hover{color:#000;background-color:#fff;border-color:#ccc;margin-bottom:3px}.combo-btn[disabled]{color:grey;background-color:#ccc;border-color:#ccc;margin-bottom:3px}.falseselect div.input-group .form-control{color:grey;background-color:#eee}.mouse-hover{background:#ff9c00!important}.dropup .dropdown-menu{margin-bottom:26px}"]
            }] }
];
/** @nocollapse */
ComboBoxComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NgZone }
];
ComboBoxComponent.propDecorators = {
    onCommand: [{ type: Output }],
    listBox: [{ type: ContentChild, args: [ListBoxDirective,] }],
    inputElement: [{ type: ViewChild, args: ['input',] }],
    dropdown: [{ type: ViewChild, args: ["dropdown", { read: BsDropdownDirective },] }],
    listItems: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ComboBoxComponent.prototype.onCommand;
    /** @type {?} */
    ComboBoxComponent.prototype.listBox;
    /** @type {?} */
    ComboBoxComponent.prototype.inputElement;
    /** @type {?} */
    ComboBoxComponent.prototype.dropdown;
    /** @type {?} */
    ComboBoxComponent.prototype.hoveredItem;
    /** @type {?} */
    ComboBoxComponent.prototype.hoveredStyle;
    /** @type {?} */
    ComboBoxComponent.prototype.defaultStyle;
    /** @type {?} */
    ComboBoxComponent.prototype.dropdownElementId;
    /** @type {?} */
    ComboBoxComponent.prototype.isDropup;
    /** @type {?} */
    ComboBoxComponent.prototype._listItems;
    /** @type {?} */
    ComboBoxComponent.prototype.isDropdownOpen;
    /** @type {?} */
    ComboBoxComponent.prototype.selectedItem;
    /** @type {?} */
    ComboBoxComponent.prototype.dropdownMenuStyle;
    /** @type {?} */
    ComboBoxComponent.prototype.hasInputFocus;
    /** @type {?} */
    ComboBoxComponent.prototype.parentScrollHanlder;
    /** @type {?} */
    ComboBoxComponent.prototype.parentScroller;
    /** @type {?} */
    ComboBoxComponent.prototype.isFirstKeyDown;
    /** @type {?} */
    ComboBoxComponent.prototype.cd;
    /** @type {?} */
    ComboBoxComponent.prototype.ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY29tYm8tYm94L2NvbWJvLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0TyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFzQnBELE1BQU0sd0JBQXlCLFNBQVEsYUFBYTs7Ozs7Ozs7OztJQXlFbEQsWUFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQixFQUFVLE1BQWM7UUFDM0wsS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRHFFLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQStCLFdBQU0sR0FBTixNQUFNLENBQVE7eUJBeEV2SyxJ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O3FCQUNqRDtpQkFDRjs7YUFDRjs7OztZQWhDUSxhQUFhLHVCQTBHUCxRQUFRLFlBQUksUUFBUTtZQXhHMUIsY0FBYztZQUhtQixVQUFVO1lBQStDLGlCQUFpQjtZQUF3QixTQUFTO1lBQW1ELE1BQU07Ozt3QkFtQzNNLE1BQU07c0JBRU4sWUFBWSxTQUFDLGdCQUFnQjsyQkFFN0IsU0FBUyxTQUFDLE9BQU87dUJBRWpCLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7d0JBZ0JuRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50Jztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBMaXN0Qm94RGlyZWN0aXZlIH0gZnJvbSAnLi9saXN0LWJveC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSAnLi92YWx1ZS1wYWlyJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vamF2YS92ZWN0b3InO1xuaW1wb3J0IHsgRmF1eENvbWJvRWxlbWVudCB9IGZyb20gJy4vZmF1eC1jb21iby1lbGVtZW50JztcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi92aWV3L3ZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwJztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbi8qKlxuICogQ2xhc3MgZm9yIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtY29tYm8tYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbWJvLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbWJvLWJveC5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29tYm9Cb3hDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbWJvQm94Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZChMaXN0Qm94RGlyZWN0aXZlKVxuICBsaXN0Qm94OiBMaXN0Qm94RGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKFwiZHJvcGRvd25cIiwgeyByZWFkOiBCc0Ryb3Bkb3duRGlyZWN0aXZlIH0pIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gIGhvdmVyZWRJdGVtOiBudW1iZXI7XG5cbiAgaG92ZXJlZFN0eWxlID0ge1xuICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZmY5YzAwJ1xuICB9O1xuXG4gIGRlZmF1bHRTdHlsZSA9IHtcbiAgICAnY29sb3InOiAnIzMzMzMzMycsXG4gICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2ZmZmZmZidcbiAgfTtcblxuICBkcm9wZG93bkVsZW1lbnRJZCA9IGBkcm9wZG93bi0ke3RoaXMuaWR9YDtcblxuICBASW5wdXQoKSBzZXQgbGlzdEl0ZW1zKGl0ZW1zOiBBcnJheTxWYWx1ZVBhaXI+KSB7XG4gICAgdGhpcy5fbGlzdEl0ZW1zID0gaXRlbXM7XG5cbiAgICBpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IF8uZmluZCh0aGlzLl9saXN0SXRlbXMsIChpdGVtOiBWYWx1ZVBhaXIpID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHNlbGVjdGVkSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlzRHJvcHVwID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIG1ldGhvZCBmb3IgW1tfbGlzdEl0ZW1zXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCBsaXN0SXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RJdGVtczogQXJyYXk8VmFsdWVQYWlyPjtcbiAgcHJpdmF0ZSBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICBzZWxlY3RlZEl0ZW06IFZhbHVlUGFpcjtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZHJvcGRvd25NZW51U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaGFzSW5wdXRGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBY2Nlc3NvciBtZXRob2QgZm9yIFtbc2VsZWN0ZWRJdGVtLnRleHRdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSXRlbVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS50ZXh0IDogJyc7XG4gIH1cblxuICBwcml2YXRlIHBhcmVudFNjcm9sbEhhbmxkZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgcGFyZW50U2Nyb2xsZXI6IEhUTUxFbGVtZW50O1xuXG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gIHByaXZhdGUgaXNGaXJzdEtleURvd246IGJvb2xlYW4gPSB0cnVlO1xuLy8gVjNSMS1VVC1OU0QtNjQzIOS/ruatoyBFTkRcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIGNkIENoYW5nZURldGVjdG9yIHJlZmVyZW5jZSBwcm92aWRlZCBieSBBbmd1bGFyIHRvIGNvbnRyb2wgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgICB0aGlzLnBhcmVudFNjcm9sbEhhbmxkZXIgPSAoKSA9PiB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHRoaXMuZHJvcGRvd24gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50U2Nyb2xsSGFubGRlciAhPSBudWxsICYmIHRoaXMucGFyZW50U2Nyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcmVudFNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5wYXJlbnRTY3JvbGxIYW5sZGVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50U2Nyb2xsSGFubGRlciA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnRTY3JvbGxlciA9IG51bGw7XG4gICAgaWYodGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzT3Blbikge1xuICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgfVxuICAgIHRoaXMuZHJvcGRvd24gPSBudWxsO1xuXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGNvbXBvbmVudCBhbmQgc2V0IGNzcyBzdHllIGF0dHJpYnV0ZSBmb3IgZHJvcGRvd24gZWxlbWVudFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuZHJvcGRvd25FbGVtZW50SWQgPSBgZHJvcGRvd24tJHt0aGlzLmlkfWA7XG5cbiAgICAvLyBFbnN1cmUgY29udHJvbFdpZHRoIGlzIGV4aXN0cyBhbmQgaXMgYSBudW1iZXJcbiAgICBpZiAocGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGgsIDEwKSkge1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnbWluLXdpZHRoJ10gPSB0aGlzLmNvbnRyb2xXaWR0aCArICdweCAhaW1wb3J0YW50JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbGlnbkhvcml6b250YWwpIHtcbiAgICAgIHRoaXMuYWxpZ25Ib3Jpem9udGFsID0gdGhpcy5hbGlnbkhvcml6b250YWw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBTZXQgdXAgbGlzdCBpdGVtcyBhbmQgc2V0IHZhbHVlL3RleHQgb24gdGhlbS4gU2V0cyBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICBpZiAodGhpcy5saXN0Qm94ICE9IG51bGwgJiYgdGhpcy5saXN0Qm94Lmxpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9saXN0SXRlbXMgPSBbXTtcblxuICAgICAgdGhpcy5saXN0Qm94Lmxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGxldCB0ZXh0ID0gaXRlbS50ZXh0IHx8ICcnLFxuICAgICAgICAgIHZhbHVlID0gaXRlbS52YWx1ZSB8fCAnJztcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLnB1c2goe1xuICAgICAgICAgIHRleHQ6IHRleHQgPyB0ZXh0IDogdmFsdWUsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlID8gdmFsdWUgOiB0ZXh0LFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtLnNlbGVjdGVkID09PSB0cnVlIHx8IGl0ZW0uc2VsZWN0ZWQgPT09IFwidHJ1ZVwiIHx8IGl0ZW0uaXNDaGVja2VkID09PSB0cnVlIHx8IGl0ZW0uaXNDaGVja2VkID09PSBcInRydWVcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3NlbGVjdGQgZmlyc3QgaXRlbSB0aGF0IGlzIHNlbGVjdGVkXG4gICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBfLmZpbmQodGhpcy5fbGlzdEl0ZW1zLCAoaXRlbTogVmFsdWVQYWlyKSA9PiBpdGVtLnNlbGVjdGVkID09PSB0cnVlKTtcblxuICAgICAgaWYgKHNlbGVjdGVkSXRlbSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0SXRlbShzZWxlY3RlZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9hZERhdGFGcm9tRGVmKCk7XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9QYXJlbnRTY3JvbGxlcigpO1xuXG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjb21ib2JveCBsaXN0IHVzaW5nIGFycmF5IG9mIHZhbHVlc1xuICAgKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIFtbVmFsdWVQYWlyc11dIHRvIHNldCBjb21ib2JveCBvcHRpb25zLlxuICAgKi9cbiAgaW5pdGlhbGl6ZUNvbWJvYm94VmFsdWVzKHZhbHVlczogQXJyYXk8VmFsdWVQYWlyPikge1xuICAgIGlmICh2YWx1ZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbGlzdEl0ZW1zID0gXy5tYXAodmFsdWVzLCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLnRleHQgPSBpdGVtLnRleHQgfHwgJyc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiBpdGVtLnRleHQsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW0uc2VsZWN0ZWRcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vc2VsZWN0ZCBmaXJzdCBpdGVtIHRoYXQgaXMgc2VsZWN0ZWRcbiAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IF8uZmluZCh0aGlzLl9saXN0SXRlbXMsIChpdGVtOiBWYWx1ZVBhaXIpID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHNlbGVjdGVkSXRlbSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHRoaXMuX2xpc3RJdGVtc1swXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RJdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBhbmQgc2VsZWN0cyBpdGVtIHRoYXQgaXMgY2xpY2tlZFxuICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIGZvY3VzIGFuZCBzZWxlY3RcbiAgICogQHBhcmFtIGV2ZW50IE1vdXNlIGNsaWNrIGV2ZW50IG9uIGl0ZW1cbiAgICogQGV2ZW50IG9uQ29tbWFuZFxuICAgKi9cbiAgc2VsZWN0SXRlbShpdGVtOiBWYWx1ZVBhaXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuc2V0U2VsZWN0SXRlbShpdGVtKTtcbiAgICBpZiAodGhpcy5lbWl0SW50ZXJuYWxPbkNvbW1hbmQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMub25Db21tYW5kLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0cyBzZWxlY3RlZCBpdGVtIHRoYXQgbWF0Y2hlcyBpdGVtIFtbVmFsdWVQYWlyXV0gcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gc2V0IGFzIHNlbGVjdGVkXG4gICAqIEBwYXJhbSBmb3JjZUNkIEZvcmNlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIHNldFNlbGVjdEl0ZW0oaXRlbTogVmFsdWVQYWlyLCBmb3JjZUNkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cbiAgICBpZiAoZm9yY2VDZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvL25vdGlmeSBpbnRlcm5hbCBjaGFuZ2VzIChmb3IgaW50ZXJuYWwgdXNlIG9ubHkpXG4gICAgdGhpcy5fbm90aWZ5SW50ZXJuYWxDaGFuZ2VDYigpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldHMgc2VsZWN0ZWQgaXRlbSBiYXNlZCBvbiB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gc2V0XG4gICAqL1xuICBzZXRTZWxlY3RWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gXy5maW5kKHRoaXMuX2xpc3RJdGVtcywgKGl0ZW06IFZhbHVlUGFpcikgPT4gaXRlbS52YWx1ZSA9PSB2YWx1ZSB8fCAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIiAmJiB2YWx1ZSA9PT0gaXRlbS50ZXh0KSk7XG5cbiAgICAgIGlmICh0ZW1wICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHRlbXApO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZSBjbGljayBvbiBpbnB1dFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgY2xpY2sgZXZlbnQgb24gaW5wdXQgZWxlbWVudC5cbiAgICovXG4gIG9uSW5wdXRDbGljayhldmVudDogTW91c2VFdmVudCwgZHJvcGRvd246IEJzRHJvcGRvd25EaXJlY3RpdmUpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhvdmVyZWRTdHlsZSA9IHtcbiAgICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZjljMDAnXG4gICAgfTtcbiAgICBkcm9wZG93bi50b2dnbGUodHJ1ZSk7XG4gXG4gICAgaWYgKHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoQ29tYm9Cb3gsIDEwKSkge1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnd2lkdGgnXSA9IChwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aENvbWJvQm94KSkgKyAncHgnO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnd2lkdGgnXSA9IChwYXJzZUludCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jbGllbnRXaWR0aCkgKyAyMCkgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50LCBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZSkge1xuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duT3BlbiAmJiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSkgeyAvLyAzOCA9IFVQIGFycm93LCA0MCA9IERPV04gYXJyb3dcbiAgICAgIHRoaXMuaG92ZXJlZFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkcm9wZG93bi50b2dnbGUodHJ1ZSk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gICAgICAvLyDoqK3lrprjgZnjgovjg5fjg6vjg4Djgqbjg7Pjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICAgIGxldCBpZHg6IG51bWJlciA9IDA7XG4gICAgICAvLyDjg4jjgrDjg6vjgYzplonjgZjjgonjgozjgabjgYTjgovnirbmhYvjgafjgq3jg7zjg5zjg7zjg4njga5VUOOAgURPV07jgYzmirzkuIvjgZXjgozjgZ/loLTlkIhcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICAgIC8vIFVQ44Gu5aC05ZCI44CB44OX44Or44OA44Km44Oz44Gu5pyA57WC44Gr56e75YuV44GX44Gm44GX44G+44GG44Gf44KB44CB5pyA5b6M44Gu6KaB57Sg44KS6Kit5a6a44Go44GZ44KLXG4gICAgICAgIGlkeCA9IHRoaXMuX2xpc3RJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRE9XTuOBruWgtOWQiOOAgeacgOWIneOBruimgee0oOOCkuioreWumuOBqOOBmeOCi1xuICAgICAgICBpZHggPSAwO1xuICAgICAgfVxuICAgICAgLy8gOmhvdmVy54q25oWL44Gu44Kk44Oz44OH44OD44Kv44K544KS5pu05pawXG4gICAgICB0aGlzLmhvdmVyZWRJdGVtID0gaWR4O1xuICAgICAgLy8g44OX44Or44OA44Km44Oz44KS6Kit5a6aXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5fbGlzdEl0ZW1zW2lkeF0sIG51bGwpO1xuICAgICAgLy8g44OV44Op44Kw44KS5pu05pawXG4gICAgICB0aGlzLmlzRmlyc3RLZXlEb3duID0gZmFsc2U7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcm9wZG93bk9wZW4gJiYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkpIHsgLy8gMzggPSBVUCBhcnJvdywgNDAgPSBET1dOIGFycm93XG4gICAgICAvLyDjg4jjgrDjg6vjgYzplovjgYTjgabjgYTjgovnirbmhYvjgYvjgaTjgq3jg7zjg5zjg7zjg4njga5VUOOAgURPV07jgYzmirzkuIvjgZXjgozjgZ/loLTlkIhcbiAgICAgIHRoaXMuaG92ZXJlZFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIOioreWumuOBmeOCi+ODl+ODq+ODgOOCpuODs+OBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgICAgbGV0IGlkeDogbnVtYmVyID0gMDtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7IC8vIDM4ID0gVVAgYXJyb3dcbiAgICAgICAgaWYgKHRoaXMuaXNGaXJzdEtleURvd24gfHwgdGhpcy5ob3ZlcmVkSXRlbSA9PT0gMCkge1xuICAgICAgICAgIC8vIOODiOOCsOODq+OBjOmWi+OBi+OCjOOBn+eKtuaFi+OBp+OAgeWIneOCgeOBpuOCreODvOOBjOaKvOS4i+OBleOCjOOBn+WgtOWQiFxuICAgICAgICAgIC8vIDpob3ZlcueKtuaFi+OBruODl+ODq+ODgOOCpuODs+imgee0oOOBjOS4gOeVquS4iuOBruWgtOWQiFxuICAgICAgICAgIC8vIFVQ44Gv5pyA5b6M44Gu6KaB57Sg44KS6Kit5a6a44GZ44KLXG4gICAgICAgICAgaWR4ID0gdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g5LiK6KiY5Lul5aSWXG4gICAgICAgICAgLy8gOmhvdmVy54q25oWL44Gu6KaB57Sg44Gu77yR44Gk5LiK44KS6Kit5a6aXG4gICAgICAgICAgaWR4ID0gdGhpcy5ob3ZlcmVkSXRlbSAtIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIDQwID0gRE9XTiBhcnJvd1xuICAgICAgICBpZiAodGhpcy5pc0ZpcnN0S2V5RG93biB8fCB0aGlzLmhvdmVyZWRJdGVtID09PSAodGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgLy8g44OI44Kw44Or44GM6ZaL44GL44KM44Gf54q25oWL44Gn44CB5Yid44KB44Gm44Kt44O844GM5oq85LiL44GV44KM44Gf5aC05ZCIXG4gICAgICAgICAgLy8gOmhvdmVy54q25oWL44Gu44OX44Or44OA44Km44Oz6KaB57Sg44GM5LiA55Wq5LiL44Gu5aC05ZCIXG4gICAgICAgICAgLy8g5Yid44KB44Gu6KaB57Sg44KS6Kit5a6aXG4gICAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDkuIroqJjku6XlpJZcbiAgICAgICAgICAvLyA6aG92ZXLnirbmhYvjga7opoHntKDjga7vvJHjgaTkuIvjgpLoqK3lrppcbiAgICAgICAgICBpZHggPSB0aGlzLmhvdmVyZWRJdGVtICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gOmhvdmVy54q25oWL44Gu44Kk44Oz44OH44OD44Kv44K544KS5pu05pawXG4gICAgICB0aGlzLmhvdmVyZWRJdGVtID0gaWR4O1xuICAgICAgLy8g44OX44Or44OA44Km44Oz44KS6Kit5a6aXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5fbGlzdEl0ZW1zW2lkeF0sIG51bGwpO1xuICAgICAgLy8g44OV44Op44Kw44KS5pu05pawXG4gICAgICB0aGlzLmlzRmlyc3RLZXlEb3duID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIEVORFxuICB9XG5cbiAgYWRqdXN0UHVsbGRvd25XaWR0aCgpIHtcbiAgICB0aGlzLmhvdmVyZWRTdHlsZSA9IHtcbiAgICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZjljMDAnXG4gICAgfTtcbiAgICBpZiAocGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGhDb21ib0JveCwgMTApKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duTWVudVN0eWxlWyd3aWR0aCddID0gKHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoQ29tYm9Cb3gpKSArICdweCc7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmRyb3Bkb3duTWVudVN0eWxlWyd3aWR0aCddID0gKHBhcnNlSW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNsaWVudFdpZHRoKSArIDIwKSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgdG9nZ2xlU3RhdHVzKCkge1xuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duT3Blbikge1xuICAgICAgbGV0IGlkID0gXy5nZXQodGhpcy5nZXRQYXJlbnRTY3JvbGxWaWV3KCksIFwiaWRcIik7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgJChgIyR7aWR9YCkub24oJ3Njcm9sbCBtb3VzZXdoZWVsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoX3RoaXMuZHJvcGRvd24gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGFyZW50VmlldzogVmlld0NvbXBvbmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpIGFzIFZpZXdDb21wb25lbnQ7XG4gICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsICYmIHBhcmVudFZpZXcuZGlhbG9nICE9IG51bGwgJiYgcGFyZW50Vmlldy5kaWFsb2cubW9kYWxDb250ZW50ICYmIHBhcmVudFZpZXcuZGlhbG9nLm1vZGFsQ29udGVudCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBwYXJlbnRQYW5lbCA9IHBhcmVudFZpZXcuZGlhbG9nICYmIHBhcmVudFZpZXcuZGlhbG9nLm1vZGFsQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY29tYm9Cb3ggPSB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGxldCBwYXJlbnRQb3MgPSBwYXJlbnRQYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgY2hpbGRyZW5Qb3MgPSBjb21ib0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZGlzdGFuY2VUb0JvdHRvbSA9IHBhcmVudFBvcy5ib3R0b20gLSBjaGlsZHJlblBvcy5ib3R0b207XG4gICAgICAgIGxldCBkaXN0YW5jZVRvVG9wID0gY2hpbGRyZW5Qb3MudG9wIC0gcGFyZW50UG9zLnRvcDtcbiAgICAgICAgbGV0IGhlaWdodE9mQm94ID0gdGhpcy5fbGlzdEl0ZW1zID8gTWF0aC5taW4oMTggKiB0aGlzLl9saXN0SXRlbXMubGVuZ3RoLCAyMDApIDogMjAwO1xuICAgICAgICBpZiAoZGlzdGFuY2VUb0JvdHRvbSA8IDIwMCkge1xuICAgICAgICAgIGlmIChkaXN0YW5jZVRvVG9wID4gMjAwKSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcHVwXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZVRvVG9wID4gZGlzdGFuY2VUb0JvdHRvbSkge1xuICAgICAgICAgICAgJChcIi5kcm9wZG93bi1tZW51XCIpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiLCBcImRyb3B1cFwiKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcGRvd25cIilcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChcIi5kcm9wZG93bi1tZW51XCIpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiLCBcImRyb3Bkb3duXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgIGxldCBkaWFsb2cgPSAkKGAjJHtwYXJlbnRWaWV3W1wibWFpblNjcmVlbklkXCJdfWApO1xuICAgICAgICBpZiAoZGlhbG9nICE9IG51bGwgJiYgZGlhbG9nLmNoaWxkcmVuKCkgJiYgZGlhbG9nLmNoaWxkcmVuKClbMF0gJiYgZGlhbG9nLmNoaWxkcmVuKClbMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGxldCBjb21ib0JveCA9IHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgcGFyZW50UG9zID0gZGlhbG9nLmNoaWxkcmVuKClbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBsZXQgY2hpbGRyZW5Qb3MgPSBjb21ib0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGxldCBkaXN0YW5jZVRvQm90dG9tID0gcGFyZW50UG9zLmJvdHRvbSAtIGNoaWxkcmVuUG9zLmJvdHRvbTtcbiAgICAgICAgICBsZXQgZGlzdGFuY2VUb1RvcCA9IGNoaWxkcmVuUG9zLnRvcCAtIHBhcmVudFBvcy50b3A7XG4gICAgICAgICAgbGV0IGhlaWdodE9mQm94ID0gdGhpcy5fbGlzdEl0ZW1zID8gTWF0aC5taW4oMTggKiB0aGlzLl9saXN0SXRlbXMubGVuZ3RoLCAyMDApIDogMjAwO1xuICAgICAgICAgIGlmIChkaXN0YW5jZVRvQm90dG9tIDwgMjAwKSB7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VUb1RvcCA+IDIwMCkge1xuICAgICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcHVwXCIpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3RhbmNlVG9Ub3AgPiBkaXN0YW5jZVRvQm90dG9tKSB7XG4gICAgICAgICAgICAgICQoXCIuZHJvcGRvd24tbWVudVwiKS5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIiwgXCJkcm9wdXBcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoXCIuZHJvcGRvd24tbWVudVwiKS5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIiwgXCJkcm9wZG93blwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcGRvd25cIilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGlkID0gXy5nZXQodGhpcy5nZXRQYXJlbnRTY3JvbGxWaWV3KCksIFwiaWRcIik7XG4gICAgICAkKGAjJHtpZH1gKS5vZmYoJ3Njcm9sbCBtb3VzZXdoZWVsJyk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gICAgICAvLyDjg4jjgrDjg6vjgYzplonjgZjjgonjgozjgZ/jgr/jgqTjg5/jg7PjgrDjgafjg5Xjg6njgrDjgpLmiLvjgZlcbiAgICAgIHRoaXMuaXNGaXJzdEtleURvd24gPSB0cnVlO1xuLy8gVjNSMS1VVC1OU0QtNjQzIOS/ruatoyBFTkRcbiAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gIXRoaXMuaXNEcm9wZG93bk9wZW47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0ZWQgY29tYm9ib3ggb3B0aW9uIHRvICd2YWwnIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHZhbCBWYWx1ZSB0byBzZXQuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWw6IGFueSkge1xuICAgIHRoaXMuc2V0U2VsZWN0VmFsdWUodmFsKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIGNvbWJvYm94IG9wdGlvbiB0aGF0IG1hdGNoZXMgJ3RleHQnIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHRleHQgVGV4dCBvZiBvcHRpb24gdG8gbWFyayBhcyBzZWxlY3RlZC5cbiAgICovXG4gIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKG51bGwpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gXy5maW5kKHRoaXMuX2xpc3RJdGVtcywgKGl0ZW06IFZhbHVlUGFpcikgPT4gaXRlbS50ZXh0ID09IHRleHQpO1xuXG4gICAgICBpZiAodGVtcCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0SXRlbSh0ZW1wKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgaXRlbSB2YWx1ZS5cbiAgICogQHJldHVybnMgVmFsdWUgb2YgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gdGhlIGNvbWJvYm94LlxuICAgKi9cbiAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICogQHJldHVybnMgU3RyaW5nIHZhbHVlIG9mIHNlbGVjdGVkIGl0ZW0gdGV4dC5cbiAgICovXG4gIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS50ZXh0IDogXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudFxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQHBhcmFtIGJnQ29sb3IgQSBDU1MgY29sb3Igc3RyaW5nIHZhbHVlLiBTaG91bGQgYmUgaGV4YWRlY2ltYWwgb3IgdmFsaWQgY29sb3IgbmFtZS5cbiAgICovXG4gIHNldEJnQ29sb3IoYmdDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGEgbGlzdCBpdGVtIGJ5IHRleHQuXG4gICAqIEBwYXJhbSB0ZXh0IEl0ZW0gdGV4dCB0byBzZWFyY2ggZm9yXG4gICAqIEByZXR1cm5zIFtbVmFsdWVQYWlyXV0gaW4gW1tfbGlzdEl0ZW1zXV0gdGhhdCBtYXRjaGVzIHRleHRcbiAgICovXG4gIGZpbmRJdGVtQnlUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5fbGlzdEl0ZW1zLCAoaXRlbTogVmFsdWVQYWlyKSA9PiBpdGVtLnRleHQgPT0gdGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgbGlzdCBpdGVtcyB0aGF0IGFyZSBjaGlsZHJlbiBvZiB0aGUgY29tYm9ib3ggY29tcG9uZW50LlxuICAgKiBAcmV0dXJucyBDb2xsZWN0aW9uIG9mIGxpc3QgaXRlbXMuXG4gICAqL1xuICBnZXRDaGlsZHJlbigpOiBWZWN0b3I8YW55PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFZlY3Rvcjxhbnk+KCk7XG5cbiAgICBpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwpIHtcbiAgICAgIF8uZm9yRWFjaCh0aGlzLl9saXN0SXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5hZGQobmV3IEZhdXhDb21ib0VsZW1lbnQodGhpcywgaXRlbSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRwdXRzIEpTT04gb2JqZWN0IHRoYXQgZGVzY3JpYmVzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3RcbiAgICovXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICBqc29uLnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdHJpbmcgbmFtZSBvZiB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFN0cmluZ1xuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCkge1xuICAgIHJldHVybiBcImNvbWJvQm94XCI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdHJpbmcgdGFnIG5hbWUgb2YgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcImNvbWJvQm94XCI7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQHJldHVybnMgW1tDaGFuZ2VEZXRlY3Rvcl1dIGZvciB0aGUgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0cyBjb21ib2JveCB2YWx1ZXMgYmFzZWQgb24gZGVmaW5pdGlvbiBtYXBcbiAgICovXG4gIHByaXZhdGUgbG9hZERhdGFGcm9tRGVmKCkge1xuICAgIGxldCBkZWZJZDogc3RyaW5nID0gdGhpcy5nZXRJZCgpO1xuXG4gICAgaWYgKHRoaXMuZWRpdG9yICE9IG51bGwgJiYgdGhpcy5lZGl0b3IubGVuZ3RoID4gMCkge1xuICAgICAgZGVmSWQgPSB0aGlzLmVkaXRvci5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RGVmKGRlZklkKTtcblxuICAgIGlmIChkZWYgIT0gbnVsbCAmJiBkZWYudmFsdWVMaXN0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGRlZi5hdHRyaWJ1dGU7XG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbWJvYm94VmFsdWVzKF8ubWFwKGRlZi52YWx1ZUxpc3QsIChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGl0ZW1bXCJ2YWx1ZVwiXSxcbiAgICAgICAgICB0ZXh0OiBpdGVtW1wibmFtZVwiXSxcbiAgICAgICAgICBzZWxlY3RlZDogaXRlbVtcInNlbGVjdEZsZ1wiXSA9PT0gXCJ0cnVlXCIgfHwgaXRlbVtcInNlbGVjdEZsZ1wiXSA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlRnJvbURlZigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGZvY3VzIGZyb20gaW5wdXQgZWxlbWVudCBhbmQgc2V0cyB1bmZvY3VzIGJhY2tncm91bmRcbiAgICogQGV2ZW50IE9uQmVmb3JlQWN0aXZlTG9zdFxuICAgKi9cbiAgaW5wdXRGb2N1c091dCgpIHtcbiAgICBpZiAoIXRoaXMuaGFzSW5wdXRGb2N1cykgcmV0dXJuOy8vT24gdGhlIElFLCBwcmV2ZW50IHRvIGZpcmUgZm9jdXNvdXQgZXZlbnQgd2l0aG91dCBmb2N1c2luIGV2ZW50Lih0aGlzIG9jY3VycyB3aGVuIGVycm9yLWRpYWxvZyBpcyBzaG93ZWQuKWlzc3VlIzE0MzNORygyKVxuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCkgcmV0dXJuOy8vcHJldmVudCBmb2N1c2xvc3Qgd2hlbmV2ZXIgYWN0aXZlIHByb2Nlc3MgaXMgY2hhbmdlZC5cbiAgICB0aGlzLnNldEJnQ29sb3IoJycpO1xuICAgIHRoaXMub25CZWZvcmVBY3RpdmVMb3N0LmVtaXQoKTtcbiAgICB0aGlzLmhhc0lucHV0Rm9jdXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCAkYWN0aXZlID0gJChcIjpmb2N1c1wiKTtcbiAgICAgIGlmKCRhY3RpdmUubGVuZ3RoID4gMCAmJiAhJGFjdGl2ZS5pcyhcImJvZHlcIikgJiYgJGFjdGl2ZS5jbG9zZXN0KFwiLnZ0LWNvbWJvLWJveCxbdnQtYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyXVwiKS5sZW5ndGggPT0gMCkge1xuICAgICAgICBpZih0aGlzLmRyb3Bkb3duICYmIHRoaXMuZHJvcGRvd24uaXNPcGVuKSB7XG4gICAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGludGVydmFsIGJldHdlZW4gZm9jdXNpbiBhbmQgZm9jdXNvdXQgZXZlbnQgaXMgbGVzcyB0aGFuIDIwMG1zLCBkb24ndCBmaXJlIGZvY3VzaW4uXG4gICAqL1xuICBpbnB1dEZvY3VzSW4oKSB7XG4gICAgdGhpcy5oYXNJbnB1dEZvY3VzID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSBtZXRob2Qgd3JhcHBlciBmb3IgbmF0aXZlIGJyb3dzZXIgcHJldmVudERlZmF1bHRcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IG9iamVjdFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9QYXJlbnRTY3JvbGxlcigpIHtcbiAgICBjb25zdCBzY3JvbGxQYXJlbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zY3JvbGxQYXJlbnQoKTtcblxuICAgIGlmIChzY3JvbGxQYXJlbnQgIT0gbnVsbCAmJiBzY3JvbGxQYXJlbnRbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRTY3JvbGxlciA9IHNjcm9sbFBhcmVudFswXTtcblxuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcmVudFNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5wYXJlbnRTY3JvbGxIYW5sZGVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19