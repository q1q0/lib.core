/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ComboBoxComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ComboBoxComponent, _super);
    // V3R1-UT-NSD-643 修正 END
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param cd ChangeDetector reference provided by Angular to control change detection
     * @param renderer see [[BaseComponent]]
     */
    function ComboBoxComponent(parent, sessionService, elementRef, cd, renderer, ngZone) {
        var _this_1 = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this_1.cd = cd;
        _this_1.ngZone = ngZone;
        _this_1.onCommand = new EventEmitter();
        _this_1.hoveredStyle = {
            'color': '#0000cd',
            'background-color': '#ff9c00'
        };
        _this_1.defaultStyle = {
            'color': '#333333',
            'background-color': '#ffffff'
        };
        _this_1.dropdownElementId = "dropdown-" + _this_1.id;
        _this_1.isDropup = false;
        _this_1.isDropdownOpen = false;
        /* istanbul ignore next */
        _this_1.dropdownMenuStyle = {};
        /* istanbul ignore next */
        _this_1.hasInputFocus = false;
        _this_1.isFirstKeyDown = true;
        _this_1.parentScrollHanlder = function () {
            /* istanbul ignore else */
            if (_this_1.dropdown != null) {
                _this_1.dropdown.hide();
            }
        };
        return _this_1;
    }
    Object.defineProperty(ComboBoxComponent.prototype, "listItems", {
        /**
         * Accessor method for [[_listItems]] property
         */
        get: /**
         * Accessor method for [[_listItems]] property
         * @return {?}
         */
        function () {
            return this._listItems;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._listItems = items;
            if (this._listItems != null) {
                /** @type {?} */
                var selectedItem = _.find(this._listItems, function (item) { return item.selected === true; });
                if (selectedItem != null) {
                    this.setSelectItem(selectedItem);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "selectedItemText", {
        /**
         * Accessor method for [[selectedItem.text]] property
         */
        get: /**
         * Accessor method for [[selectedItem.text]] property
         * @return {?}
         */
        function () {
            return this.selectedItem ? this.selectedItem.text : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this_1 = this;
        if (this.parentScrollHanlder != null && this.parentScroller != null) {
            this.ngZone.runOutsideAngular(function () {
                _this_1.parentScroller.removeEventListener("scroll", _this_1.parentScrollHanlder);
            });
        }
        this.parentScrollHanlder = null;
        this.parentScroller = null;
        if (this.dropdown && this.dropdown.isOpen) {
            this.dropdown.hide();
        }
        this.dropdown = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * Initialize component and set css stye attribute for dropdown element
     */
    /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    ComboBoxComponent.prototype.ngOnInit = /**
     * Initialize component and set css stye attribute for dropdown element
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.dropdownElementId = "dropdown-" + this.id;
        // Ensure controlWidth is exists and is a number
        if (parseInt(this.controlWidth, 10)) {
            this.dropdownMenuStyle['min-width'] = this.controlWidth + 'px !important';
        }
        if (this.alignHorizontal) {
            this.alignHorizontal = this.alignHorizontal;
        }
    };
    /**
     * Set up list items and set value/text on them. Sets selected item
     */
    /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    ComboBoxComponent.prototype.ngAfterViewInit = /**
     * Set up list items and set value/text on them. Sets selected item
     * @return {?}
     */
    function () {
        var _this_1 = this;
        _super.prototype.ngAfterViewInit.call(this);
        if (this.listBox != null && this.listBox.listItems != null) {
            this._listItems = [];
            this.listBox.listItems.forEach(function (item) {
                /** @type {?} */
                var text = item.text || '';
                /** @type {?} */
                var value = item.value || '';
                _this_1._listItems.push({
                    text: text ? text : value,
                    value: value ? value : text,
                    selected: item.selected === true || item.selected === "true" || item.isChecked === true || item.isChecked === "true"
                });
            });
            /** @type {?} */
            var selectedItem = _.find(this._listItems, function (item) { return item.selected === true; });
            if (selectedItem != null) {
                this.setSelectItem(selectedItem);
            }
        }
        this.loadDataFromDef();
        this.cd.detectChanges();
        this.subscribeToParentScroller();
    };
    /**
     * Sets combobox list using array of values
     * @param values Array of [[ValuePairs]] to set combobox options.
     */
    /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    ComboBoxComponent.prototype.initializeComboboxValues = /**
     * Sets combobox list using array of values
     * @param {?} values Array of [[ValuePairs]] to set combobox options.
     * @return {?}
     */
    function (values) {
        if (values != null) {
            this._listItems = _.map(values, function (item) {
                item.text = item.text || '';
                return {
                    text: item.text,
                    value: item.value,
                    selected: item.selected
                };
            });
            /** @type {?} */
            var selectedItem = _.find(this._listItems, function (item) { return item.selected === true; });
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
    };
    /**
     * Focuses and selects item that is clicked
     * @param item Item to focus and select
     * @param event Mouse click event on item
     * @event onCommand
     */
    /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    ComboBoxComponent.prototype.selectItem = /**
     * Focuses and selects item that is clicked
     * \@event onCommand
     * @param {?} item Item to focus and select
     * @param {?} event Mouse click event on item
     * @return {?}
     */
    function (item, event) {
        this.inputElement.nativeElement.focus();
        this.setSelectItem(item);
        if (this.emitInternalOnCommand() === false) {
            this.onCommand.emit();
        }
    };
    /* istanbul ignore next */
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param item Item to set as selected
     * @param forceCd Force change detection
     */
    /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    ComboBoxComponent.prototype.setSelectItem = /**
     * Sets selected item that matches item [[ValuePair]] parameter
     * @param {?} item Item to set as selected
     * @param {?=} forceCd Force change detection
     * @return {?}
     */
    function (item, forceCd) {
        if (forceCd === void 0) { forceCd = false; }
        this.selectedItem = item;
        if (forceCd === true) {
            this.cd.markForCheck();
        }
        //notify internal changes (for internal use only)
        this._notifyInternalChangeCb();
    };
    /* istanbul ignore next */
    /**
     * Sets selected item based on value
     * @param value Value to set
     */
    /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    ComboBoxComponent.prototype.setSelectValue = /**
     * Sets selected item based on value
     * @param {?} value Value to set
     * @return {?}
     */
    function (value) {
        if (this._listItems != null) {
            /** @type {?} */
            var temp = _.find(this._listItems, function (item) { return item.value == value || (value != null && value !== "" && value === item.text); });
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for mouse click on input
     * @param event Mouse click event on input element.
     */
    /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    ComboBoxComponent.prototype.onInputClick = /**
     * Event handler for mouse click on input
     * @param {?} event Mouse click event on input element.
     * @param {?} dropdown
     * @return {?}
     */
    function (event, dropdown) {
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
    };
    /* istanbul ignore next */
    /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    ComboBoxComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @param {?} dropdown
     * @return {?}
     */
    function (e, dropdown) {
        if (!this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
            // 38 = UP arrow, 40 = DOWN arrow
            this.hoveredStyle = this.defaultStyle;
            e.preventDefault();
            dropdown.toggle(true);
            /** @type {?} */
            var idx = 0;
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
            var idx = 0;
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
    };
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.adjustPulldownWidth = /**
     * @return {?}
     */
    function () {
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
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.toggleStatus = /**
     * @return {?}
     */
    function () {
        if (!this.isDropdownOpen) {
            /** @type {?} */
            var id = _.get(this.getParentScrollView(), "id");
            /** @type {?} */
            var _this_2 = this;
            $("#" + id).on('scroll mousewheel', function (e) {
                if (_this_2.dropdown != null) {
                    _this_2.dropdown.hide();
                }
                // return false;
            });
            /** @type {?} */
            var parentView = /** @type {?} */ (this.getParentView());
            if (parentView != null && parentView.dialog != null && parentView.dialog.modalContent && parentView.dialog.modalContent != null) {
                /** @type {?} */
                var parentPanel = parentView.dialog && parentView.dialog.modalContent.nativeElement;
                /** @type {?} */
                var comboBox = this.inputElement.nativeElement.parentElement;
                /** @type {?} */
                var parentPos = parentPanel.getBoundingClientRect();
                /** @type {?} */
                var childrenPos = comboBox.getBoundingClientRect();
                /** @type {?} */
                var distanceToBottom = parentPos.bottom - childrenPos.bottom;
                /** @type {?} */
                var distanceToTop = childrenPos.top - parentPos.top;
                /** @type {?} */
                var heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
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
                var dialog = $("#" + parentView["mainScreenId"]);
                if (dialog != null && dialog.children() && dialog.children()[0] && dialog.children()[0] != null) {
                    /** @type {?} */
                    var comboBox = this.inputElement.nativeElement.parentElement;
                    /** @type {?} */
                    var parentPos = dialog.children()[0].getBoundingClientRect();
                    /** @type {?} */
                    var childrenPos = comboBox.getBoundingClientRect();
                    /** @type {?} */
                    var distanceToBottom = parentPos.bottom - childrenPos.bottom;
                    /** @type {?} */
                    var distanceToTop = childrenPos.top - parentPos.top;
                    /** @type {?} */
                    var heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
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
            var id = _.get(this.getParentScrollView(), "id");
            $("#" + id).off('scroll mousewheel');
            // V3R1-UT-NSD-643 修正 START
            // トグルが閉じられたタイミングでフラグを戻す
            this.isFirstKeyDown = true;
            // V3R1-UT-NSD-643 修正 END
            this.dropdown.hide();
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    };
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param val Value to set.
     */
    /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    ComboBoxComponent.prototype.setValue = /**
     * Sets the selected combobox option to 'val' parameter.
     * @param {?} val Value to set.
     * @return {?}
     */
    function (val) {
        this.setSelectValue(val);
        this.cd.markForCheck();
    };
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param text Text of option to mark as selected.
     */
    /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    ComboBoxComponent.prototype.setText = /**
     * Sets the selected combobox option that matches 'text' parameter.
     * @param {?} text Text of option to mark as selected.
     * @return {?}
     */
    function (text) {
        if (text == null) {
            this.setSelectItem(null);
            this.cd.markForCheck();
        }
        else if (this._listItems != null) {
            /** @type {?} */
            var temp = _.find(this._listItems, function (item) { return item.text == text; });
            if (temp != null) {
                this.setSelectItem(temp);
                this.cd.markForCheck();
            }
        }
    };
    /**
     * Returns the selected item value.
     * @returns Value of the selected item in the combobox.
     */
    /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    ComboBoxComponent.prototype.getValue = /**
     * Returns the selected item value.
     * @return {?} Value of the selected item in the combobox.
     */
    function () {
        return this.selectedItem ? this.selectedItem.value : null;
    };
    /**
     * Returns the text of the selected item.
     * @returns String value of selected item text.
     */
    /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    ComboBoxComponent.prototype.getText = /**
     * Returns the text of the selected item.
     * @return {?} String value of selected item text.
     */
    function () {
        return this.selectedItem ? this.selectedItem.text : "";
    };
    /**
     * Focuses the native input element
     */
    /**
     * Focuses the native input element
     * @return {?}
     */
    ComboBoxComponent.prototype.setFocus = /**
     * Focuses the native input element
     * @return {?}
     */
    function () {
        this.inputElement.nativeElement.focus();
    };
    /**
     * Set the background color of the input element.
     * @param bgColor A CSS color string value. Should be hexadecimal or valid color name.
     */
    /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    ComboBoxComponent.prototype.setBgColor = /**
     * Set the background color of the input element.
     * @param {?} bgColor A CSS color string value. Should be hexadecimal or valid color name.
     * @return {?}
     */
    function (bgColor) {
        this.inputElement.nativeElement.style.backgroundColor = bgColor;
    };
    /**
     * Finds a list item by text.
     * @param text Item text to search for
     * @returns [[ValuePair]] in [[_listItems]] that matches text
     */
    /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    ComboBoxComponent.prototype.findItemByText = /**
     * Finds a list item by text.
     * @param {?} text Item text to search for
     * @return {?} [[ValuePair]] in [[_listItems]] that matches text
     */
    function (text) {
        return _.find(this._listItems, function (item) { return item.text == text; });
    };
    /**
     * Gets all list items that are children of the combobox component.
     * @returns Collection of list items.
     */
    /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    ComboBoxComponent.prototype.getChildren = /**
     * Gets all list items that are children of the combobox component.
     * @return {?} Collection of list items.
     */
    function () {
        var _this_1 = this;
        /** @type {?} */
        var result = new Vector();
        if (this._listItems != null) {
            _.forEach(this._listItems, function (item) {
                result.add(new FauxComboElement(_this_1, item));
            });
        }
        return result;
    };
    /**
     * Outputs JSON object that describes component
     * @returns Object
     */
    /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    ComboBoxComponent.prototype.toJson = /**
     * Outputs JSON object that describes component
     * @return {?} Object
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json.value = this.getValue();
        return json;
    };
    /**
     * Returns string name of the component
     * @returns String
     */
    /**
     * Returns string name of the component
     * @return {?} String
     */
    ComboBoxComponent.prototype.getLocalName = /**
     * Returns string name of the component
     * @return {?} String
     */
    function () {
        return "comboBox";
    };
    /**
     * Returns string tag name of component
     */
    /**
     * Returns string tag name of component
     * @return {?}
     */
    ComboBoxComponent.prototype.getNxTagName = /**
     * Returns string tag name of component
     * @return {?}
     */
    function () {
        return "comboBox";
    };
    /* istanbul ignore next */
    /**
     * @returns [[ChangeDetector]] for the component
     */
    /**
     * @return {?} [[ChangeDetector]] for the component
     */
    ComboBoxComponent.prototype.getChangeDetector = /**
     * @return {?} [[ChangeDetector]] for the component
     */
    function () {
        return this.cd;
    };
    /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    ComboBoxComponent.prototype.loadDataFromDef = /**
     * Sets combobox values based on definition map
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defId = this.getId();
        if (this.editor != null && this.editor.length > 0) {
            defId = this.editor.substring(1);
        }
        /** @type {?} */
        var def = this.getSession().getDef(defId);
        if (def != null && def.valueList != null) {
            /** @type {?} */
            var attribute = def.attribute;
            this.initializeComboboxValues(_.map(def.valueList, function (item) {
                return {
                    value: item["value"],
                    text: item["name"],
                    selected: item["selectFlg"] === "true" || item["selectFlg"] === true
                };
            }));
            this.setAttributeFromDef();
        }
    };
    /**
     * Removes focus from input element and sets unfocus background
     * @event OnBeforeActiveLost
     */
    /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    ComboBoxComponent.prototype.inputFocusOut = /**
     * Removes focus from input element and sets unfocus background
     * \@event OnBeforeActiveLost
     * @return {?}
     */
    function () {
        var _this_1 = this;
        if (!this.hasInputFocus)
            return; //On the IE, prevent to fire focusout event without focusin event.(this occurs when error-dialog is showed.)issue#1433NG(2)
        if (this.inputElement.nativeElement.ownerDocument.activeElement === this.inputElement.nativeElement)
            return; //prevent focuslost whenever active process is changed.
        this.setBgColor('');
        this.onBeforeActiveLost.emit();
        this.hasInputFocus = false;
        setTimeout(function () {
            /** @type {?} */
            var $active = $(":focus");
            if ($active.length > 0 && !$active.is("body") && $active.closest(".vt-combo-box,[vt-arrow-navigatable-container]").length == 0) {
                if (_this_1.dropdown && _this_1.dropdown.isOpen) {
                    _this_1.dropdown.hide();
                }
            }
        }, 10);
    };
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     */
    /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    ComboBoxComponent.prototype.inputFocusIn = /**
     * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
     * @return {?}
     */
    function () {
        this.hasInputFocus = true;
    };
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param event Event object
     */
    /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    ComboBoxComponent.prototype.preventDefault = /**
     * Delegate method wrapper for native browser preventDefault
     * @param {?} event Event object
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.inputElement.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    ComboBoxComponent.prototype.subscribeToParentScroller = /**
     * @return {?}
     */
    function () {
        var _this_1 = this;
        /** @type {?} */
        var scrollParent = $(this.elementRef.nativeElement).scrollParent();
        if (scrollParent != null && scrollParent[0] instanceof HTMLElement) {
            this.parentScroller = scrollParent[0];
            this.ngZone.runOutsideAngular(function () {
                _this_1.parentScroller.addEventListener("scroll", _this_1.parentScrollHanlder);
            });
        }
    };
    ComboBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-combo-box',
                    template: "<div [id]=\"id\" class=\"btn-group dropdown vt-combo-box {{cssClass}} {{!disabled}}select\"\n  [style.height]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  [style.margin]=\"controlMargin\"\n  [ngClass]=\"{'hidden': visible != true}\"\n  (contextmenu)=\"handleOnContextMenu($event)\"\n  #dropdown=\"bs-dropdown\"\n  (onShown)=\"toggleStatus()\"\n  (onHidden)=\"toggleStatus()\"\n  dropdown [isDisabled]=\"disabled === true\" container=\"body\" [dropup]=\"isDropup\">\n  <div class=\"input-group\">\n    <input #input class=\"form-control combobox-input-box\" type=\"text\" [value]=\"selectedItemText\" [style.text-align]=\"alignHorizontal\"\n      (focusin)=\"inputFocusIn()\" (focusout)=\"inputFocusOut()\" (click)=\"onInputClick($event, dropdown)\" [readonly]=\"disabled !== true\" [disabled]=\"disabled\" (keydown)=\"onKeyDown($event,dropdown)\"/>\n    <span class=\"input-group-btn\">\n      <button id=\"button\" (mousedown)=\"preventDefault($event)\" (click)=\"adjustPulldownWidth()\" dropdownToggle type=\"button\" class=\"btn combo-btn dropdown-toggle\" style=\"width: 20px\" tabindex=\"-1\">\n        <span class=\"caret\"></span>\n      </button>\n    </span>\n  </div>\n  <ul\n    *dropdownMenu\n    [id]=\"dropdownElementId\"\n    class=\"dropdown-menu combobox-dropdown\"\n    role=\"menu\"\n    [ngStyle]=\"dropdownMenuStyle\"\n    vt-arrow-navigatable-container\n    [activeParent]=\"input\"\n    (onTab)=\"dropdown.hide()\"\n  >\n    <li *ngFor=\"let item of listItems; index as i\">\n      <ng-template [ngIf]=\"item.visible !== false && item.visible !== 'false'\">\n        <a *ngIf=\"item.text != null && item.text !== ''\"\n          class=\"dropdown-item menuItem\"\n          (mousedown)=\"preventDefault($event)\"\n          (click)=\"selectItem(item, $event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          vt-arrow-navigatable-item>{{item.text}}</a>\n        <a *ngIf=\"item.text == null || item.text === ''\"\n          class=\"dropdown-item\"\n          (mousedown)=\"preventDefault($event)\"\n          [ngStyle]=\"hoveredItem == i ? hoveredStyle : defaultStyle\"\n          (mouseover)=\"hoveredItem = i\"\n          vt-arrow-navigatable-item\n          (keydown)=\"hoveredItem = i; onKeyDown($event,dropdown)\"\n          (click)=\"selectItem(item, $event)\">\n          &nbsp;\n        </a>\n      </ng-template>\n    </li>\n  </ul>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return ComboBoxComponent; })
                        }
                    ],
                    styles: ["bs-dropdown-container ul.dropdown-menu.combobox-dropdown{max-height:225px;margin-top:-3px!important;overflow:auto;overflow-x:hidden}.combobox-dropdown>li>a{padding:3px 10px 3px 5px;font-size:9px!important;margin-bottom:0!important}.combobox-dropdown>li>a:hover{color:#0000cd;background-color:#ff9c00}.vt-combo-box .form-control[readonly]{background:#fff;cursor:default;margin-bottom:3px}bs-dropdown-container{z-index:10000}.combo-btn,.combo-btn:hover{color:#000;background-color:#fff;border-color:#ccc;margin-bottom:3px}.combo-btn[disabled]{color:grey;background-color:#ccc;border-color:#ccc;margin-bottom:3px}.falseselect div.input-group .form-control{color:grey;background-color:#eee}.mouse-hover{background:#ff9c00!important}.dropup .dropdown-menu{margin-bottom:26px}"]
                }] }
    ];
    /** @nocollapse */
    ComboBoxComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    ComboBoxComponent.propDecorators = {
        onCommand: [{ type: Output }],
        listBox: [{ type: ContentChild, args: [ListBoxDirective,] }],
        inputElement: [{ type: ViewChild, args: ['input',] }],
        dropdown: [{ type: ViewChild, args: ["dropdown", { read: BsDropdownDirective },] }],
        listItems: [{ type: Input }]
    };
    return ComboBoxComponent;
}(BaseComponent));
export { ComboBoxComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY29tYm8tYm94L2NvbWJvLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdE8sT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQXNCYiw2Q0FBYTtJQStEcEQseUJBQXlCO0lBRXZCOzs7Ozs7O09BT0c7SUFDSCwyQkFBb0MsTUFBcUIsRUFBRSxjQUE4QixFQUFFLFVBQXNCLEVBQVUsRUFBcUIsRUFBRSxRQUFtQixFQUFVLE1BQWM7UUFBN0wsY0FDRSxrQkFBTSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FRcEQ7UUFUMEgsVUFBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBK0IsY0FBTSxHQUFOLE1BQU0sQ0FBUTs0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Q3VDLGFBQWE7U0FBdkMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNraXBTZWxmLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50Jztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pbXBvcnQgeyBMaXN0Qm94RGlyZWN0aXZlIH0gZnJvbSAnLi9saXN0LWJveC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSAnLi92YWx1ZS1wYWlyJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vamF2YS92ZWN0b3InO1xuaW1wb3J0IHsgRmF1eENvbWJvRWxlbWVudCB9IGZyb20gJy4vZmF1eC1jb21iby1lbGVtZW50JztcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi92aWV3L3ZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwJztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbi8qKlxuICogQ2xhc3MgZm9yIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtY29tYm8tYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbWJvLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbWJvLWJveC5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29tYm9Cb3hDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbWJvQm94Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBvbkNvbW1hbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZChMaXN0Qm94RGlyZWN0aXZlKVxuICBsaXN0Qm94OiBMaXN0Qm94RGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKFwiZHJvcGRvd25cIiwgeyByZWFkOiBCc0Ryb3Bkb3duRGlyZWN0aXZlIH0pIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuXG4gIGhvdmVyZWRJdGVtOiBudW1iZXI7XG5cbiAgaG92ZXJlZFN0eWxlID0ge1xuICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZmY5YzAwJ1xuICB9O1xuXG4gIGRlZmF1bHRTdHlsZSA9IHtcbiAgICAnY29sb3InOiAnIzMzMzMzMycsXG4gICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2ZmZmZmZidcbiAgfTtcblxuICBkcm9wZG93bkVsZW1lbnRJZCA9IGBkcm9wZG93bi0ke3RoaXMuaWR9YDtcblxuICBASW5wdXQoKSBzZXQgbGlzdEl0ZW1zKGl0ZW1zOiBBcnJheTxWYWx1ZVBhaXI+KSB7XG4gICAgdGhpcy5fbGlzdEl0ZW1zID0gaXRlbXM7XG5cbiAgICBpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IF8uZmluZCh0aGlzLl9saXN0SXRlbXMsIChpdGVtOiBWYWx1ZVBhaXIpID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHNlbGVjdGVkSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlzRHJvcHVwID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIG1ldGhvZCBmb3IgW1tfbGlzdEl0ZW1zXV0gcHJvcGVydHlcbiAgICovXG4gIGdldCBsaXN0SXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RJdGVtczogQXJyYXk8VmFsdWVQYWlyPjtcbiAgcHJpdmF0ZSBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICBzZWxlY3RlZEl0ZW06IFZhbHVlUGFpcjtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZHJvcGRvd25NZW51U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaGFzSW5wdXRGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBY2Nlc3NvciBtZXRob2QgZm9yIFtbc2VsZWN0ZWRJdGVtLnRleHRdXSBwcm9wZXJ0eVxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkSXRlbVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS50ZXh0IDogJyc7XG4gIH1cblxuICBwcml2YXRlIHBhcmVudFNjcm9sbEhhbmxkZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgcGFyZW50U2Nyb2xsZXI6IEhUTUxFbGVtZW50O1xuXG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gIHByaXZhdGUgaXNGaXJzdEtleURvd246IGJvb2xlYW4gPSB0cnVlO1xuLy8gVjNSMS1VVC1OU0QtNjQzIOS/ruatoyBFTkRcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIGNkIENoYW5nZURldGVjdG9yIHJlZmVyZW5jZSBwcm92aWRlZCBieSBBbmd1bGFyIHRvIGNvbnRyb2wgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgICB0aGlzLnBhcmVudFNjcm9sbEhhbmxkZXIgPSAoKSA9PiB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHRoaXMuZHJvcGRvd24gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50U2Nyb2xsSGFubGRlciAhPSBudWxsICYmIHRoaXMucGFyZW50U2Nyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcmVudFNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5wYXJlbnRTY3JvbGxIYW5sZGVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50U2Nyb2xsSGFubGRlciA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnRTY3JvbGxlciA9IG51bGw7XG4gICAgaWYodGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzT3Blbikge1xuICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgfVxuICAgIHRoaXMuZHJvcGRvd24gPSBudWxsO1xuXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGNvbXBvbmVudCBhbmQgc2V0IGNzcyBzdHllIGF0dHJpYnV0ZSBmb3IgZHJvcGRvd24gZWxlbWVudFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuZHJvcGRvd25FbGVtZW50SWQgPSBgZHJvcGRvd24tJHt0aGlzLmlkfWA7XG5cbiAgICAvLyBFbnN1cmUgY29udHJvbFdpZHRoIGlzIGV4aXN0cyBhbmQgaXMgYSBudW1iZXJcbiAgICBpZiAocGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGgsIDEwKSkge1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnbWluLXdpZHRoJ10gPSB0aGlzLmNvbnRyb2xXaWR0aCArICdweCAhaW1wb3J0YW50JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbGlnbkhvcml6b250YWwpIHtcbiAgICAgIHRoaXMuYWxpZ25Ib3Jpem9udGFsID0gdGhpcy5hbGlnbkhvcml6b250YWw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBTZXQgdXAgbGlzdCBpdGVtcyBhbmQgc2V0IHZhbHVlL3RleHQgb24gdGhlbS4gU2V0cyBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICBpZiAodGhpcy5saXN0Qm94ICE9IG51bGwgJiYgdGhpcy5saXN0Qm94Lmxpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9saXN0SXRlbXMgPSBbXTtcblxuICAgICAgdGhpcy5saXN0Qm94Lmxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGxldCB0ZXh0ID0gaXRlbS50ZXh0IHx8ICcnLFxuICAgICAgICAgIHZhbHVlID0gaXRlbS52YWx1ZSB8fCAnJztcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1zLnB1c2goe1xuICAgICAgICAgIHRleHQ6IHRleHQgPyB0ZXh0IDogdmFsdWUsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlID8gdmFsdWUgOiB0ZXh0LFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtLnNlbGVjdGVkID09PSB0cnVlIHx8IGl0ZW0uc2VsZWN0ZWQgPT09IFwidHJ1ZVwiIHx8IGl0ZW0uaXNDaGVja2VkID09PSB0cnVlIHx8IGl0ZW0uaXNDaGVja2VkID09PSBcInRydWVcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3NlbGVjdGQgZmlyc3QgaXRlbSB0aGF0IGlzIHNlbGVjdGVkXG4gICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBfLmZpbmQodGhpcy5fbGlzdEl0ZW1zLCAoaXRlbTogVmFsdWVQYWlyKSA9PiBpdGVtLnNlbGVjdGVkID09PSB0cnVlKTtcblxuICAgICAgaWYgKHNlbGVjdGVkSXRlbSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0SXRlbShzZWxlY3RlZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9hZERhdGFGcm9tRGVmKCk7XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9QYXJlbnRTY3JvbGxlcigpO1xuXG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjb21ib2JveCBsaXN0IHVzaW5nIGFycmF5IG9mIHZhbHVlc1xuICAgKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIFtbVmFsdWVQYWlyc11dIHRvIHNldCBjb21ib2JveCBvcHRpb25zLlxuICAgKi9cbiAgaW5pdGlhbGl6ZUNvbWJvYm94VmFsdWVzKHZhbHVlczogQXJyYXk8VmFsdWVQYWlyPikge1xuICAgIGlmICh2YWx1ZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbGlzdEl0ZW1zID0gXy5tYXAodmFsdWVzLCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLnRleHQgPSBpdGVtLnRleHQgfHwgJyc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiBpdGVtLnRleHQsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW0uc2VsZWN0ZWRcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vc2VsZWN0ZCBmaXJzdCBpdGVtIHRoYXQgaXMgc2VsZWN0ZWRcbiAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IF8uZmluZCh0aGlzLl9saXN0SXRlbXMsIChpdGVtOiBWYWx1ZVBhaXIpID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHNlbGVjdGVkSXRlbSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHRoaXMuX2xpc3RJdGVtc1swXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RJdGVtcyA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBhbmQgc2VsZWN0cyBpdGVtIHRoYXQgaXMgY2xpY2tlZFxuICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIGZvY3VzIGFuZCBzZWxlY3RcbiAgICogQHBhcmFtIGV2ZW50IE1vdXNlIGNsaWNrIGV2ZW50IG9uIGl0ZW1cbiAgICogQGV2ZW50IG9uQ29tbWFuZFxuICAgKi9cbiAgc2VsZWN0SXRlbShpdGVtOiBWYWx1ZVBhaXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuc2V0U2VsZWN0SXRlbShpdGVtKTtcbiAgICBpZiAodGhpcy5lbWl0SW50ZXJuYWxPbkNvbW1hbmQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMub25Db21tYW5kLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0cyBzZWxlY3RlZCBpdGVtIHRoYXQgbWF0Y2hlcyBpdGVtIFtbVmFsdWVQYWlyXV0gcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gc2V0IGFzIHNlbGVjdGVkXG4gICAqIEBwYXJhbSBmb3JjZUNkIEZvcmNlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIHNldFNlbGVjdEl0ZW0oaXRlbTogVmFsdWVQYWlyLCBmb3JjZUNkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cbiAgICBpZiAoZm9yY2VDZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvL25vdGlmeSBpbnRlcm5hbCBjaGFuZ2VzIChmb3IgaW50ZXJuYWwgdXNlIG9ubHkpXG4gICAgdGhpcy5fbm90aWZ5SW50ZXJuYWxDaGFuZ2VDYigpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldHMgc2VsZWN0ZWQgaXRlbSBiYXNlZCBvbiB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gc2V0XG4gICAqL1xuICBzZXRTZWxlY3RWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gXy5maW5kKHRoaXMuX2xpc3RJdGVtcywgKGl0ZW06IFZhbHVlUGFpcikgPT4gaXRlbS52YWx1ZSA9PSB2YWx1ZSB8fCAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIiAmJiB2YWx1ZSA9PT0gaXRlbS50ZXh0KSk7XG5cbiAgICAgIGlmICh0ZW1wICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKHRlbXApO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZSBjbGljayBvbiBpbnB1dFxuICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgY2xpY2sgZXZlbnQgb24gaW5wdXQgZWxlbWVudC5cbiAgICovXG4gIG9uSW5wdXRDbGljayhldmVudDogTW91c2VFdmVudCwgZHJvcGRvd246IEJzRHJvcGRvd25EaXJlY3RpdmUpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhvdmVyZWRTdHlsZSA9IHtcbiAgICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZjljMDAnXG4gICAgfTtcbiAgICBkcm9wZG93bi50b2dnbGUodHJ1ZSk7XG4gXG4gICAgaWYgKHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoQ29tYm9Cb3gsIDEwKSkge1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnd2lkdGgnXSA9IChwYXJzZUludCh0aGlzLmNvbnRyb2xXaWR0aENvbWJvQm94KSkgKyAncHgnO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5kcm9wZG93bk1lbnVTdHlsZVsnd2lkdGgnXSA9IChwYXJzZUludCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jbGllbnRXaWR0aCkgKyAyMCkgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50LCBkcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZSkge1xuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duT3BlbiAmJiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSkgeyAvLyAzOCA9IFVQIGFycm93LCA0MCA9IERPV04gYXJyb3dcbiAgICAgIHRoaXMuaG92ZXJlZFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkcm9wZG93bi50b2dnbGUodHJ1ZSk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gICAgICAvLyDoqK3lrprjgZnjgovjg5fjg6vjg4Djgqbjg7Pjga7jgqTjg7Pjg4fjg4Pjgq/jgrlcbiAgICAgIGxldCBpZHg6IG51bWJlciA9IDA7XG4gICAgICAvLyDjg4jjgrDjg6vjgYzplonjgZjjgonjgozjgabjgYTjgovnirbmhYvjgafjgq3jg7zjg5zjg7zjg4njga5VUOOAgURPV07jgYzmirzkuIvjgZXjgozjgZ/loLTlkIhcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICAgIC8vIFVQ44Gu5aC05ZCI44CB44OX44Or44OA44Km44Oz44Gu5pyA57WC44Gr56e75YuV44GX44Gm44GX44G+44GG44Gf44KB44CB5pyA5b6M44Gu6KaB57Sg44KS6Kit5a6a44Go44GZ44KLXG4gICAgICAgIGlkeCA9IHRoaXMuX2xpc3RJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRE9XTuOBruWgtOWQiOOAgeacgOWIneOBruimgee0oOOCkuioreWumuOBqOOBmeOCi1xuICAgICAgICBpZHggPSAwO1xuICAgICAgfVxuICAgICAgLy8gOmhvdmVy54q25oWL44Gu44Kk44Oz44OH44OD44Kv44K544KS5pu05pawXG4gICAgICB0aGlzLmhvdmVyZWRJdGVtID0gaWR4O1xuICAgICAgLy8g44OX44Or44OA44Km44Oz44KS6Kit5a6aXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5fbGlzdEl0ZW1zW2lkeF0sIG51bGwpO1xuICAgICAgLy8g44OV44Op44Kw44KS5pu05pawXG4gICAgICB0aGlzLmlzRmlyc3RLZXlEb3duID0gZmFsc2U7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcm9wZG93bk9wZW4gJiYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkpIHsgLy8gMzggPSBVUCBhcnJvdywgNDAgPSBET1dOIGFycm93XG4gICAgICAvLyDjg4jjgrDjg6vjgYzplovjgYTjgabjgYTjgovnirbmhYvjgYvjgaTjgq3jg7zjg5zjg7zjg4njga5VUOOAgURPV07jgYzmirzkuIvjgZXjgozjgZ/loLTlkIhcbiAgICAgIHRoaXMuaG92ZXJlZFN0eWxlID0gdGhpcy5kZWZhdWx0U3R5bGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIOioreWumuOBmeOCi+ODl+ODq+ODgOOCpuODs+OBruOCpOODs+ODh+ODg+OCr+OCuVxuICAgICAgbGV0IGlkeDogbnVtYmVyID0gMDtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7IC8vIDM4ID0gVVAgYXJyb3dcbiAgICAgICAgaWYgKHRoaXMuaXNGaXJzdEtleURvd24gfHwgdGhpcy5ob3ZlcmVkSXRlbSA9PT0gMCkge1xuICAgICAgICAgIC8vIOODiOOCsOODq+OBjOmWi+OBi+OCjOOBn+eKtuaFi+OBp+OAgeWIneOCgeOBpuOCreODvOOBjOaKvOS4i+OBleOCjOOBn+WgtOWQiFxuICAgICAgICAgIC8vIDpob3ZlcueKtuaFi+OBruODl+ODq+ODgOOCpuODs+imgee0oOOBjOS4gOeVquS4iuOBruWgtOWQiFxuICAgICAgICAgIC8vIFVQ44Gv5pyA5b6M44Gu6KaB57Sg44KS6Kit5a6a44GZ44KLXG4gICAgICAgICAgaWR4ID0gdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g5LiK6KiY5Lul5aSWXG4gICAgICAgICAgLy8gOmhvdmVy54q25oWL44Gu6KaB57Sg44Gu77yR44Gk5LiK44KS6Kit5a6aXG4gICAgICAgICAgaWR4ID0gdGhpcy5ob3ZlcmVkSXRlbSAtIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIDQwID0gRE9XTiBhcnJvd1xuICAgICAgICBpZiAodGhpcy5pc0ZpcnN0S2V5RG93biB8fCB0aGlzLmhvdmVyZWRJdGVtID09PSAodGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgLy8g44OI44Kw44Or44GM6ZaL44GL44KM44Gf54q25oWL44Gn44CB5Yid44KB44Gm44Kt44O844GM5oq85LiL44GV44KM44Gf5aC05ZCIXG4gICAgICAgICAgLy8gOmhvdmVy54q25oWL44Gu44OX44Or44OA44Km44Oz6KaB57Sg44GM5LiA55Wq5LiL44Gu5aC05ZCIXG4gICAgICAgICAgLy8g5Yid44KB44Gu6KaB57Sg44KS6Kit5a6aXG4gICAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDkuIroqJjku6XlpJZcbiAgICAgICAgICAvLyA6aG92ZXLnirbmhYvjga7opoHntKDjga7vvJHjgaTkuIvjgpLoqK3lrppcbiAgICAgICAgICBpZHggPSB0aGlzLmhvdmVyZWRJdGVtICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gOmhvdmVy54q25oWL44Gu44Kk44Oz44OH44OD44Kv44K544KS5pu05pawXG4gICAgICB0aGlzLmhvdmVyZWRJdGVtID0gaWR4O1xuICAgICAgLy8g44OX44Or44OA44Km44Oz44KS6Kit5a6aXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5fbGlzdEl0ZW1zW2lkeF0sIG51bGwpO1xuICAgICAgLy8g44OV44Op44Kw44KS5pu05pawXG4gICAgICB0aGlzLmlzRmlyc3RLZXlEb3duID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIEVORFxuICB9XG5cbiAgYWRqdXN0UHVsbGRvd25XaWR0aCgpIHtcbiAgICB0aGlzLmhvdmVyZWRTdHlsZSA9IHtcbiAgICAgICdjb2xvcic6ICcjMDAwMGNkJyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZjljMDAnXG4gICAgfTtcbiAgICBpZiAocGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGhDb21ib0JveCwgMTApKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duTWVudVN0eWxlWyd3aWR0aCddID0gKHBhcnNlSW50KHRoaXMuY29udHJvbFdpZHRoQ29tYm9Cb3gpKSArICdweCc7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmRyb3Bkb3duTWVudVN0eWxlWyd3aWR0aCddID0gKHBhcnNlSW50KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNsaWVudFdpZHRoKSArIDIwKSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgdG9nZ2xlU3RhdHVzKCkge1xuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duT3Blbikge1xuICAgICAgbGV0IGlkID0gXy5nZXQodGhpcy5nZXRQYXJlbnRTY3JvbGxWaWV3KCksIFwiaWRcIik7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgJChgIyR7aWR9YCkub24oJ3Njcm9sbCBtb3VzZXdoZWVsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoX3RoaXMuZHJvcGRvd24gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGFyZW50VmlldzogVmlld0NvbXBvbmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpIGFzIFZpZXdDb21wb25lbnQ7XG4gICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsICYmIHBhcmVudFZpZXcuZGlhbG9nICE9IG51bGwgJiYgcGFyZW50Vmlldy5kaWFsb2cubW9kYWxDb250ZW50ICYmIHBhcmVudFZpZXcuZGlhbG9nLm1vZGFsQ29udGVudCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBwYXJlbnRQYW5lbCA9IHBhcmVudFZpZXcuZGlhbG9nICYmIHBhcmVudFZpZXcuZGlhbG9nLm1vZGFsQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY29tYm9Cb3ggPSB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGxldCBwYXJlbnRQb3MgPSBwYXJlbnRQYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgY2hpbGRyZW5Qb3MgPSBjb21ib0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZGlzdGFuY2VUb0JvdHRvbSA9IHBhcmVudFBvcy5ib3R0b20gLSBjaGlsZHJlblBvcy5ib3R0b207XG4gICAgICAgIGxldCBkaXN0YW5jZVRvVG9wID0gY2hpbGRyZW5Qb3MudG9wIC0gcGFyZW50UG9zLnRvcDtcbiAgICAgICAgbGV0IGhlaWdodE9mQm94ID0gdGhpcy5fbGlzdEl0ZW1zID8gTWF0aC5taW4oMTggKiB0aGlzLl9saXN0SXRlbXMubGVuZ3RoLCAyMDApIDogMjAwO1xuICAgICAgICBpZiAoZGlzdGFuY2VUb0JvdHRvbSA8IDIwMCkge1xuICAgICAgICAgIGlmIChkaXN0YW5jZVRvVG9wID4gMjAwKSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcHVwXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkaXN0YW5jZVRvVG9wID4gZGlzdGFuY2VUb0JvdHRvbSkge1xuICAgICAgICAgICAgJChcIi5kcm9wZG93bi1tZW51XCIpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiLCBcImRyb3B1cFwiKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcGRvd25cIilcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChcIi5kcm9wZG93bi1tZW51XCIpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiLCBcImRyb3Bkb3duXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgIGxldCBkaWFsb2cgPSAkKGAjJHtwYXJlbnRWaWV3W1wibWFpblNjcmVlbklkXCJdfWApO1xuICAgICAgICBpZiAoZGlhbG9nICE9IG51bGwgJiYgZGlhbG9nLmNoaWxkcmVuKCkgJiYgZGlhbG9nLmNoaWxkcmVuKClbMF0gJiYgZGlhbG9nLmNoaWxkcmVuKClbMF0gIT0gbnVsbCkge1xuICAgICAgICAgIGxldCBjb21ib0JveCA9IHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgcGFyZW50UG9zID0gZGlhbG9nLmNoaWxkcmVuKClbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBsZXQgY2hpbGRyZW5Qb3MgPSBjb21ib0JveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGxldCBkaXN0YW5jZVRvQm90dG9tID0gcGFyZW50UG9zLmJvdHRvbSAtIGNoaWxkcmVuUG9zLmJvdHRvbTtcbiAgICAgICAgICBsZXQgZGlzdGFuY2VUb1RvcCA9IGNoaWxkcmVuUG9zLnRvcCAtIHBhcmVudFBvcy50b3A7XG4gICAgICAgICAgbGV0IGhlaWdodE9mQm94ID0gdGhpcy5fbGlzdEl0ZW1zID8gTWF0aC5taW4oMTggKiB0aGlzLl9saXN0SXRlbXMubGVuZ3RoLCAyMDApIDogMjAwO1xuICAgICAgICAgIGlmIChkaXN0YW5jZVRvQm90dG9tIDwgMjAwKSB7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2VUb1RvcCA+IDIwMCkge1xuICAgICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcHVwXCIpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3RhbmNlVG9Ub3AgPiBkaXN0YW5jZVRvQm90dG9tKSB7XG4gICAgICAgICAgICAgICQoXCIuZHJvcGRvd24tbWVudVwiKS5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIiwgXCJkcm9wdXBcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoXCIuZHJvcGRvd24tbWVudVwiKS5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIiwgXCJkcm9wZG93blwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiLmRyb3Bkb3duLW1lbnVcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIsIFwiZHJvcGRvd25cIilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGlkID0gXy5nZXQodGhpcy5nZXRQYXJlbnRTY3JvbGxWaWV3KCksIFwiaWRcIik7XG4gICAgICAkKGAjJHtpZH1gKS5vZmYoJ3Njcm9sbCBtb3VzZXdoZWVsJyk7XG4vLyBWM1IxLVVULU5TRC02NDMg5L+u5q2jIFNUQVJUXG4gICAgICAvLyDjg4jjgrDjg6vjgYzplonjgZjjgonjgozjgZ/jgr/jgqTjg5/jg7PjgrDjgafjg5Xjg6njgrDjgpLmiLvjgZlcbiAgICAgIHRoaXMuaXNGaXJzdEtleURvd24gPSB0cnVlO1xuLy8gVjNSMS1VVC1OU0QtNjQzIOS/ruatoyBFTkRcbiAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xuICAgIH1cbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gIXRoaXMuaXNEcm9wZG93bk9wZW47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0ZWQgY29tYm9ib3ggb3B0aW9uIHRvICd2YWwnIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHZhbCBWYWx1ZSB0byBzZXQuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWw6IGFueSkge1xuICAgIHRoaXMuc2V0U2VsZWN0VmFsdWUodmFsKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIGNvbWJvYm94IG9wdGlvbiB0aGF0IG1hdGNoZXMgJ3RleHQnIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHRleHQgVGV4dCBvZiBvcHRpb24gdG8gbWFyayBhcyBzZWxlY3RlZC5cbiAgICovXG4gIHNldFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RJdGVtKG51bGwpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gXy5maW5kKHRoaXMuX2xpc3RJdGVtcywgKGl0ZW06IFZhbHVlUGFpcikgPT4gaXRlbS50ZXh0ID09IHRleHQpO1xuXG4gICAgICBpZiAodGVtcCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0SXRlbSh0ZW1wKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgaXRlbSB2YWx1ZS5cbiAgICogQHJldHVybnMgVmFsdWUgb2YgdGhlIHNlbGVjdGVkIGl0ZW0gaW4gdGhlIGNvbWJvYm94LlxuICAgKi9cbiAgZ2V0VmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICogQHJldHVybnMgU3RyaW5nIHZhbHVlIG9mIHNlbGVjdGVkIGl0ZW0gdGV4dC5cbiAgICovXG4gIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS50ZXh0IDogXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudFxuICAgKi9cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQHBhcmFtIGJnQ29sb3IgQSBDU1MgY29sb3Igc3RyaW5nIHZhbHVlLiBTaG91bGQgYmUgaGV4YWRlY2ltYWwgb3IgdmFsaWQgY29sb3IgbmFtZS5cbiAgICovXG4gIHNldEJnQ29sb3IoYmdDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGEgbGlzdCBpdGVtIGJ5IHRleHQuXG4gICAqIEBwYXJhbSB0ZXh0IEl0ZW0gdGV4dCB0byBzZWFyY2ggZm9yXG4gICAqIEByZXR1cm5zIFtbVmFsdWVQYWlyXV0gaW4gW1tfbGlzdEl0ZW1zXV0gdGhhdCBtYXRjaGVzIHRleHRcbiAgICovXG4gIGZpbmRJdGVtQnlUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIHJldHVybiBfLmZpbmQodGhpcy5fbGlzdEl0ZW1zLCAoaXRlbTogVmFsdWVQYWlyKSA9PiBpdGVtLnRleHQgPT0gdGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgbGlzdCBpdGVtcyB0aGF0IGFyZSBjaGlsZHJlbiBvZiB0aGUgY29tYm9ib3ggY29tcG9uZW50LlxuICAgKiBAcmV0dXJucyBDb2xsZWN0aW9uIG9mIGxpc3QgaXRlbXMuXG4gICAqL1xuICBnZXRDaGlsZHJlbigpOiBWZWN0b3I8YW55PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFZlY3Rvcjxhbnk+KCk7XG5cbiAgICBpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwpIHtcbiAgICAgIF8uZm9yRWFjaCh0aGlzLl9saXN0SXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5hZGQobmV3IEZhdXhDb21ib0VsZW1lbnQodGhpcywgaXRlbSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRwdXRzIEpTT04gb2JqZWN0IHRoYXQgZGVzY3JpYmVzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3RcbiAgICovXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICBqc29uLnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdHJpbmcgbmFtZSBvZiB0aGUgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFN0cmluZ1xuICAgKi9cbiAgZ2V0TG9jYWxOYW1lKCkge1xuICAgIHJldHVybiBcImNvbWJvQm94XCI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdHJpbmcgdGFnIG5hbWUgb2YgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcImNvbWJvQm94XCI7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQHJldHVybnMgW1tDaGFuZ2VEZXRlY3Rvcl1dIGZvciB0aGUgY29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0cyBjb21ib2JveCB2YWx1ZXMgYmFzZWQgb24gZGVmaW5pdGlvbiBtYXBcbiAgICovXG4gIHByaXZhdGUgbG9hZERhdGFGcm9tRGVmKCkge1xuICAgIGxldCBkZWZJZDogc3RyaW5nID0gdGhpcy5nZXRJZCgpO1xuXG4gICAgaWYgKHRoaXMuZWRpdG9yICE9IG51bGwgJiYgdGhpcy5lZGl0b3IubGVuZ3RoID4gMCkge1xuICAgICAgZGVmSWQgPSB0aGlzLmVkaXRvci5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RGVmKGRlZklkKTtcblxuICAgIGlmIChkZWYgIT0gbnVsbCAmJiBkZWYudmFsdWVMaXN0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGRlZi5hdHRyaWJ1dGU7XG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbWJvYm94VmFsdWVzKF8ubWFwKGRlZi52YWx1ZUxpc3QsIChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGl0ZW1bXCJ2YWx1ZVwiXSxcbiAgICAgICAgICB0ZXh0OiBpdGVtW1wibmFtZVwiXSxcbiAgICAgICAgICBzZWxlY3RlZDogaXRlbVtcInNlbGVjdEZsZ1wiXSA9PT0gXCJ0cnVlXCIgfHwgaXRlbVtcInNlbGVjdEZsZ1wiXSA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlRnJvbURlZigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGZvY3VzIGZyb20gaW5wdXQgZWxlbWVudCBhbmQgc2V0cyB1bmZvY3VzIGJhY2tncm91bmRcbiAgICogQGV2ZW50IE9uQmVmb3JlQWN0aXZlTG9zdFxuICAgKi9cbiAgaW5wdXRGb2N1c091dCgpIHtcbiAgICBpZiAoIXRoaXMuaGFzSW5wdXRGb2N1cykgcmV0dXJuOy8vT24gdGhlIElFLCBwcmV2ZW50IHRvIGZpcmUgZm9jdXNvdXQgZXZlbnQgd2l0aG91dCBmb2N1c2luIGV2ZW50Lih0aGlzIG9jY3VycyB3aGVuIGVycm9yLWRpYWxvZyBpcyBzaG93ZWQuKWlzc3VlIzE0MzNORygyKVxuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCkgcmV0dXJuOy8vcHJldmVudCBmb2N1c2xvc3Qgd2hlbmV2ZXIgYWN0aXZlIHByb2Nlc3MgaXMgY2hhbmdlZC5cbiAgICB0aGlzLnNldEJnQ29sb3IoJycpO1xuICAgIHRoaXMub25CZWZvcmVBY3RpdmVMb3N0LmVtaXQoKTtcbiAgICB0aGlzLmhhc0lucHV0Rm9jdXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCAkYWN0aXZlID0gJChcIjpmb2N1c1wiKTtcbiAgICAgIGlmKCRhY3RpdmUubGVuZ3RoID4gMCAmJiAhJGFjdGl2ZS5pcyhcImJvZHlcIikgJiYgJGFjdGl2ZS5jbG9zZXN0KFwiLnZ0LWNvbWJvLWJveCxbdnQtYXJyb3ctbmF2aWdhdGFibGUtY29udGFpbmVyXVwiKS5sZW5ndGggPT0gMCkge1xuICAgICAgICBpZih0aGlzLmRyb3Bkb3duICYmIHRoaXMuZHJvcGRvd24uaXNPcGVuKSB7XG4gICAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGludGVydmFsIGJldHdlZW4gZm9jdXNpbiBhbmQgZm9jdXNvdXQgZXZlbnQgaXMgbGVzcyB0aGFuIDIwMG1zLCBkb24ndCBmaXJlIGZvY3VzaW4uXG4gICAqL1xuICBpbnB1dEZvY3VzSW4oKSB7XG4gICAgdGhpcy5oYXNJbnB1dEZvY3VzID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZSBtZXRob2Qgd3JhcHBlciBmb3IgbmF0aXZlIGJyb3dzZXIgcHJldmVudERlZmF1bHRcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IG9iamVjdFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9QYXJlbnRTY3JvbGxlcigpIHtcbiAgICBjb25zdCBzY3JvbGxQYXJlbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zY3JvbGxQYXJlbnQoKTtcblxuICAgIGlmIChzY3JvbGxQYXJlbnQgIT0gbnVsbCAmJiBzY3JvbGxQYXJlbnRbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy5wYXJlbnRTY3JvbGxlciA9IHNjcm9sbFBhcmVudFswXTtcblxuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcmVudFNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5wYXJlbnRTY3JvbGxIYW5sZGVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19