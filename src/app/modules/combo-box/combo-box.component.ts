import { Component, ContentChild, OnInit, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, ChangeDetectorRef, Output, EventEmitter, Renderer2, Input, ViewEncapsulation, ViewChild, forwardRef, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
/* istanbul ignore next */
import { SessionService } from '../session/session.service';
/* istanbul ignore next */
import { ListBoxDirective } from './list-box.directive';
import { ValuePair } from './value-pair';

import * as _ from 'lodash';
import { Vector } from '../java/vector';
import { FauxComboElement } from './faux-combo-element';
import { ViewComponent } from '../view/view.component';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { isIE } from '../../functions/is-ie';


/* istanbul ignore next */
declare var $: any;

/* istanbul ignore else */
/**
 * Class for combo box component
 */
@Component({
  selector: 'vt-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ComboBoxComponent)
    }
  ]
})
export class ComboBoxComponent extends BaseComponent implements OnInit {
  @Output() onCommand = new EventEmitter();

  @ContentChild(ListBoxDirective)
  listBox: ListBoxDirective;
  @ViewChild('input') inputElement: ElementRef;
  @ViewChild('button') buttonElement: ElementRef;

  @ViewChild("dropdown", { read: BsDropdownDirective }) dropdown: BsDropdownDirective;

  hoveredItem: number;

  hoveredStyle = {
    'color': '#0000cd',
    'background-color': '#ff9c00'
  };

  defaultStyle = {
    'color': '#333333',
    'background-color': '#ffffff'
  };

  dropdownElementId = `dropdown-${this.id}`;

  @Input() set listItems(items: Array<ValuePair>) {
    this._listItems = items;

    if (this._listItems != null) {
      const selectedItem = _.find(this._listItems, (item: ValuePair) => item.selected === true);

      if (selectedItem != null) {
        this.setSelectItem(selectedItem);
      }
    }
  }
  isDropup = false;

  /**
   * Accessor method for [[_listItems]] property
   */
  get listItems() {
    return this._listItems;
  }

  private _listItems: Array<ValuePair>;
  private isDropdownOpen = false;
  selectedItem: ValuePair;
  /* istanbul ignore next */
  dropdownMenuStyle: { [key: string]: string } = {};
  /* istanbul ignore next */
  hasInputFocus: boolean = false;
  inputStartValue: string = "";

  /**
   * Accessor method for [[selectedItem.text]] property
   */
  get selectedItemText(): string {
    return this.selectedItem ? this.selectedItem.text : '';
  }

  private parentScrollHanlder: () => void;
  private parentScroller: HTMLElement;

// V3R1-UT-NSD-643 修正 START
  private isFirstKeyDown: boolean = true;
// V3R1-UT-NSD-643 修正 END

  //track pre-init value
  private value: string | number;

  private _lastKeyTimeStamp: number =  0;
  private _typedText: string = "";
  /**
   *
   * @param parent see [[BaseComponent]]
   * @param sessionService see [[BaseComponent]]
   * @param elementRef see [[BaseComponent]]
   * @param cd ChangeDetector reference provided by Angular to control change detection
   * @param renderer see [[BaseComponent]]
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2, private ngZone: NgZone) {
    super(parent, sessionService, elementRef, renderer);

    this.parentScrollHanlder = () => {
      /* istanbul ignore else */
      if (this.dropdown != null) {
        this.dropdown.hide();
      }
    };
  }

  ngOnDestroy() {
    if (this.parentScrollHanlder != null && this.parentScroller != null) {
      this.ngZone.runOutsideAngular(() => {
        this.parentScroller.removeEventListener("scroll", this.parentScrollHanlder);
      });
    }

    this.parentScrollHanlder = null;
    this.parentScroller = null;
    if(this.dropdown && this.dropdown.isOpen) {
      this.dropdown.hide();
    }
    this.dropdown = null;
    this.inputElement = null;

    super.ngOnDestroy();
  }

  /**
   * Initialize component and set css stye attribute for dropdown element
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
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.listBox != null && this.listBox.listItems != null) {
      this._listItems = [];

      this.listBox.listItems.forEach((item) => {
        let text = item.text || '',
          value = item.value || '';
        this._listItems.push({
          text: text ? text : value,
          value: value ? value : text,
          selected: item.selected === true || item.selected === "true" || item.isChecked === true || item.isChecked === "true"
        });
      });

      //selectd first item that is selected
      const selectedItem = _.find(this._listItems, (item: ValuePair) => item.selected === true);

      if (selectedItem != null) {
        this.setSelectItem(selectedItem);
      }
    }

    this.inputElement.nativeElement.addEventListener('dragstart', (event) => { event.preventDefault() });

    this.loadDataFromDef();

    this.detectChanges();

    this.subscribeToParentScroller();

    //if text was set (currently by TableComponent, selected the item)
    if (this.text != null && this.text !== "") {
      this.setText(this.text);
    } else if (this.value != null && this.value !== "") {
      this.setSelectValue(this.value);
    }

  }

  /**
   * Sets combobox list using array of values
   * @param values Array of [[ValuePairs]] to set combobox options.
   */
  initializeComboboxValues(values: Array<ValuePair>) {
    if (values != null) {
      this._listItems = _.map(values, (item) => {
        item.text = item.text || '';

        return {
          text: item.text,
          value: item.value,
          selected: item.selected
        }
      });

      //selectd first item that is selected
      const selectedItem = _.find(this._listItems, (item: ValuePair) => item.selected === true);

      if (selectedItem != null) {
        this.setSelectItem(selectedItem);
      }
      else {
        this.setSelectItem(this._listItems[0]);
      }
    } else {
      this._listItems = [];
    }
    this.markForCheck();
  }

  /**
   * Focuses and selects item that is clicked
   * @param item Item to focus and select
   * @param event Mouse click event on item
   * @event onCommand
   */
  selectItem(item: ValuePair, event: MouseEvent) {
    this.inputElement.nativeElement.focus();
    this.setSelectItem(item);
    if (this.emitInternalOnCommand() === false) {
      this.onCommand.emit();
    }
    this.dropdown.toggle(false);
    this.inputStartValue = this.selectedItemText;//NGN-2142 pattern1
  }

  /* istanbul ignore next */
  /**
   * Sets selected item that matches item [[ValuePair]] parameter
   * @param item Item to set as selected
   * @param forceCd Force change detection
   */
  setSelectItem(item: ValuePair, forceCd: boolean = false) {
    let isFire = false;
    if((this.selectedItem) && this.selectedItem !== item){
      isFire = true;
    }
    this.selectedItem = item;
    this.inputElement.nativeElement.value = this.selectedItemText;

    if (forceCd === true) {
      this.markForCheck();
    }

    //notify internal changes (for internal use only)
    this._notifyInternalChangeCb();

    // fire onchange Event
    if((this.inputElement) && isFire){
      $(this.inputElement.nativeElement).change();
    }
  }

  /* istanbul ignore next */
  /**
   * Sets selected item based on index
   * @param index Value to set
   */
  setSelectItemByIndex(index: number) {
    if (this._listItems != null) {
        this.hoveredItem = index;
        this.setSelectItem(this._listItems[index]);
        this.markForCheck();
    }
  }

  /* istanbul ignore next */
  /**
   * Sets selected item based on value
   * @param value Value to set
   */
  setSelectValue(value: string | number) {
    if (this._listItems != null) {
      //const temp = _.find(this._listItems, (item: ValuePair) => item.value == value || (value != null && value !== "" && value === item.text));
      const idx = _.findIndex(this._listItems, (item: ValuePair) => item.value == value || (value != null && value !== "" && value === item.text));
      if (idx >= 0) {
        this.hoveredItem = idx;
        this.setSelectItem(this._listItems[idx]);
        this.markForCheck();
      }
    } else {
      //save value for later, combobox may not be fully init
      this.value = value;
    }
  }


  /* istanbul ignore next */
  /**
   * Event handler for mouse click on input
   * @param event Mouse click event on input element.
   */
  onInputClick(event: MouseEvent, dropdown: BsDropdownDirective) {
    if (this.disabled !== true) {
      this.buttonElement.nativeElement.focus();
      this.inputElement.nativeElement.focus();
      event.stopPropagation();
      setTimeout(()=>{
        dropdown.toggle(true);
        this.adjustPulldownWidth();
      });
    }
  }

  /* istanbul ignore next */
  onKeyDown(e: KeyboardEvent, dropdown: BsDropdownDirective) {
    if ( e.keyCode >= 112 && e.keyCode <= 123) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
    }

    if (e.keyCode === 8) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.settingWidth();

    if (!this.isDropdownOpen){
      e.stopPropagation();
    }

    //NGN-2336: autocomplete of calendar combobox
    if (e.keyCode >= 48 && e.keyCode <= 57 //Digit0 - Digit9
      || e.keyCode >= 96 && e.keyCode <= 105 //Numpad0 - Numpad9
    ) {
      if (e.timeStamp - this._lastKeyTimeStamp > 1000) {
        this._typedText = "";
      }
      this._typedText += e.key;
      let idx = _.findIndex(this._listItems, (item: ValuePair) => this._typedText !== "" && item.text.indexOf(this._typedText) === 0);
      if(idx > -1)
      {
        if(!this.isDropdownOpen)dropdown.toggle(true);
        this.hoveredItem = idx;
        this.setSelectItem(this._listItems[idx]);
      }
      this._lastKeyTimeStamp = e.timeStamp;
    }
    else{
      this._typedText = "";
    }

    if (!this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32)) { // 38 = UP arrow, 40 = DOWN arrow,32=space
      dropdown.toggle(true);
      // V3R1-UT-NSD-643 修正 START
      // 設定するプルダウンのインデックス
      let idx: number = 0;

      if (this.selectedItemText !== null && this.selectedItemText.length > 0) {
        const value = this.selectedItemText;
        idx = _.findIndex(this._listItems, (item: ValuePair) => item.value == value || (value != null && value !== "" && value === item.text));
        if (e.keyCode === 40) {
          if (idx >= 0 && idx < this._listItems.length - 1) {
            idx = idx + 1;
          } else {
            idx = this._listItems.length - 1;
          }
        }
        if (e.keyCode === 38) {
          if (idx > 0 && idx < this._listItems.length) {
            idx = idx - 1;
          } else {
            idx = 0;
          }
        }
        this.hoveredItem = idx;
        this.setSelectItem(this._listItems[idx]);
      } else {
        if (e.keyCode === 38 || e.keyCode === 32) {
          // プルダウンを設定
          this.setSelectItemByIndex(0);
        } else if (e.keyCode === 40) {
          // プルダウンを設定
          this.setSelectItemByIndex(1);
        }
      }
      // フラグを更新
      this.isFirstKeyDown = false;

    } else if (this.isDropdownOpen && (e.keyCode === 38 || e.keyCode === 40)) { // 38 = UP arrow, 40 = DOWN arrow
      // トグルが開いている状態かつキーボードのUP、DOWNが押下された場合

      // 設定するプルダウンのインデックス
      let idx: number = 0;
      if (e.keyCode === 38) { // 38 = UP arrow
        if (this.hoveredItem === 0) {
          // トグルが開かれた状態で、初めてキーが押下された場合
          // :hover状態のプルダウン要素が一番上の場合
          // UPは最後の要素を設定する
          idx = 0;
        } else {
          // 上記以外
          // :hover状態の要素の１つ上を設定
          idx = this.hoveredItem - 1;
        }
      } else { // 40 = DOWN arrow
        if (this.hoveredItem === (this._listItems.length - 1)) {
          // トグルが開かれた状態で、初めてキーが押下された場合
          // :hover状態のプルダウン要素が一番下の場合
          // 初めの要素を設定
          idx = this._listItems.length - 1;
        } else {
          // 上記以外
          // :hover状態の要素の１つ下を設定
          idx = this.hoveredItem + 1;
        }
      }

      // プルダウンを設定
      this.setSelectItemByIndex(idx);

      // フラグを更新
      this.isFirstKeyDown = false;
      e.stopPropagation();

    }else if (this.isDropdownOpen && (e.keyCode === 13 )) { // enter
      this.inputElement.nativeElement.focus();
      this.setSelectItem(this._listItems[this.hoveredItem]);
      setTimeout(()=>{
        if (this.emitInternalOnCommand() === false) {
          this.onCommand.emit();
        }
       dropdown.toggle(false);
     }, 50);
      e.stopPropagation();
      this.inputStartValue = this.selectedItemText;
    }
    else if (this.isDropdownOpen && e.keyCode === 9) { // tab(NGN-2142)
      this.setSelectItem(this._listItems[this.hoveredItem]);
      setTimeout(()=>{
        if (this.emitInternalOnCommand() === false) {
          this.onCommand.emit();
        }
        dropdown.toggle(false);
      }, 50);
      e.stopPropagation();
      this.inputStartValue = this.selectedItemText;
    }
    else if (this.isDropdownOpen && e.keyCode === 27) { // Esc
      // this.setSelectItem(this._listItems[this.hoveredItem]);
      setTimeout(()=>{
        if (this.emitInternalOnCommand() === false) {
          this.onCommand.emit();
        }
        dropdown.toggle(false);
      }, 50);
      e.stopPropagation();
      // this.inputStartValue = this.selectedItemText;
    }
    //scroll調整
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32){
      this.settingScrollPostion(this.hoveredItem);
    }
    this.markForCheck();
// V3R1-UT-NSD-643 修正 END
  }

  adjustPulldownWidth() {

    this.settingWidth();

/*
    if (this._listItems != null && this._listItems.length > 0 && (this.selectedItem == null || this.selectedItem.text ==='' || this.selectedItem.text ===null) ){
      this.hoveredItem = 0;
      this.setSelectItem(this._listItems[0],true);
    }
    if (this.selectedItemText !==null && this.selectedItemText.length >0 ){
*/
    if (this.inputStartValue !==null){
      this.setSelectValue(this.inputStartValue);
    }
    this.settingScrollPostion(this.hoveredItem);
  }

  /* istanbul ignore next */
  toggleStatus() {
    if (!this.isDropdownOpen) {
      let id = _.get(this.getParentScrollView(), "id");
      let _this = this;
      $(`#${id}`).on('scroll mousewheel', function(e) {
        if (_this.dropdown != null) {
          _this.dropdown.hide();
        }
        // return false;
      });

      const parentView: ViewComponent = this.getParentView() as ViewComponent;
      if (parentView != null && parentView.dialog != null && parentView.dialog.modalContent && parentView.dialog.modalContent != null) {
        let parentPanel = parentView.dialog && parentView.dialog.modalContent.nativeElement;
        let comboBox = this.inputElement.nativeElement.parentElement;
        let parentPos = parentPanel.getBoundingClientRect()
        let childrenPos = comboBox.getBoundingClientRect()
        let distanceToBottom = parentPos.bottom - childrenPos.bottom;
        let distanceToTop = childrenPos.top - parentPos.top;
        let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
        if (distanceToBottom < 200) {
          if (distanceToTop > 200) {
            $(".dropdown-menu").parent().attr("class", "dropup")
          } else if (distanceToTop > distanceToBottom) {
            $(".dropdown-menu").parent().attr("class", "dropup")
          } else {
            $(".dropdown-menu").parent().attr("class", "dropdown")
          }
        } else {
          $(".dropdown-menu").parent().attr("class", "dropdown")
        }
      } else if (parentView != null) {
        let dialog = $(`#${parentView["mainScreenId"]}`);
        if (dialog != null && dialog.children() && dialog.children()[0] && dialog.children()[0] != null) {
          let comboBox = this.inputElement.nativeElement.parentElement;
          let parentPos = dialog.children()[0].getBoundingClientRect()
          let childrenPos = comboBox.getBoundingClientRect()
          let distanceToBottom = parentPos.bottom - childrenPos.bottom;
          let distanceToTop = childrenPos.top - parentPos.top;
          let heightOfBox = this._listItems ? Math.min(18 * this._listItems.length, 200) : 200;
          if (distanceToBottom < 200) {
            if (distanceToTop > 200) {
              $(".dropdown-menu").parent().attr("class", "dropup")
            } else if (distanceToTop > distanceToBottom) {
              $(".dropdown-menu").parent().attr("class", "dropup")
            } else {
              $(".dropdown-menu").parent().attr("class", "dropdown")
            }
          } else {
            $(".dropdown-menu").parent().attr("class", "dropdown")
          }
        }
      }
    } else {
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
   * @param val Value to set.
   */
  setValue(val: any) {
    this.setSelectValue(val);
    this.markForCheck();
  }

  /**
   * Sets the selected combobox option that matches 'text' parameter.
   * @param text Text of option to mark as selected.
   */
  setText(text: string) {
    if (text == null) {
      this.setSelectItem(null);
      this.markForCheck();
    } else if (this._listItems != null) {
      const temp = _.find(this._listItems, (item: ValuePair) => item.text == text);

      if (temp != null) {
        this.setSelectItem(temp);
        this.markForCheck();
      }
    } else {
      //save text for later, combobox has not been fully initialized.
      this.text = text;
    }
  }

  /**
   * Returns the selected item value.
   * @returns Value of the selected item in the combobox.
   */
  getValue(): any {
    return this.selectedItem ? this.selectedItem.value : null;
  }

  /**
   * Returns the text of the selected item.
   * @returns String value of selected item text.
   */
  getText(): string {
    return this.selectedItem ? this.selectedItem.text : "";
  }

  /**
   * Focuses the native input element
   */
  setFocus() {
    this.inputElement.nativeElement.focus();
    super.handlePropertyEvent("set:Focus");
  }

  /**
   * Set the background color of the input element.
   * @param bgColor A CSS color string value. Should be hexadecimal or valid color name.
   */
  setBgColor(bgColor: string) {
    this.inputElement.nativeElement.style.backgroundColor = bgColor;
    this.bgColor = bgColor;
    super.handlePropertyEvent("set:BgColor");
  }

  /**
   * Finds a list item by text.
   * @param text Item text to search for
   * @returns [[ValuePair]] in [[_listItems]] that matches text
   */
  findItemByText(text: string) {
    return _.find(this._listItems, (item: ValuePair) => item.text == text);
  }

  /**
   * Gets all list items that are children of the combobox component.
   * @returns Collection of list items.
   */
  getChildren(): Vector<any> {
    const result = new Vector<any>();

    if (this._listItems != null) {
      _.forEach(this._listItems, (item) => {
        result.add(new FauxComboElement(this, item));
      });
    }

    return result;
  }

  /**
   * Outputs JSON object that describes component
   * @returns Object
   */
  toJson() {
    const json: any = super.toJson();
    json.value = this.getValue();

    return json;
  }

  /**
   * Returns string name of the component
   * @returns String
   */
  getLocalName() {
    return "comboBox";
  }

  /**
   * Returns string tag name of component
   */
  protected getNxTagName() {
    return "comboBox";
  }

  /* istanbul ignore next */
  /**
   * @returns [[ChangeDetector]] for the component
   */
  protected getChangeDetector() {
    return this.cd;
  }

  /* istanbul ignore next */
  /**
   * Sets combobox values based on definition map
   */
  private loadDataFromDef() {
    let defId: string = this.getId();

    if (this.editor != null && this.editor.length > 0) {
      defId = this.editor.substring(1);
    }

    const def = this.getSession().getDef(defId);

    if (def != null && def.valueList != null) {
      const attribute = def.attribute;

      this.initializeComboboxValues(_.map(def.valueList, (item) => {
        return {
          value: item["value"],
          text: item["name"],
          selected: item["selectFlg"] === "true" || item["selectFlg"] === true
        }
      }));

      this.setAttributeFromDef();
    }
  }

  /**
   * Removes focus from input element and sets unfocus background
   * @event OnBeforeActiveLost
   */
  inputFocusOut(event: FocusEvent) {
    if (!this.hasInputFocus) return;//On the IE, prevent to fire focusout event without focusin event.(this occurs when error-dialog is showed.)issue#1433NG(2)
    if (this.inputElement.nativeElement.ownerDocument.activeElement === this.inputElement.nativeElement) return;//prevent focuslost whenever active process is changed.
    this.setBgColor('');
    this.onBeforeActiveLost.emit(event);
    this.hasInputFocus = false;
    setTimeout(() => {
      let $active = $(":focus");
      if($active.length > 0 && !$active.is("body") && $active.closest(".vt-combo-box,[vt-arrow-navigatable-container]").length == 0) {
        if(this.dropdown && this.dropdown.isOpen) {
          this.inputElement.nativeElement.value = this.inputStartValue;
          this.dropdown.hide();
        }
      }
    }, 10);
  }

  /**
   * if the interval between focusin and focusout event is less than 200ms, don't fire focusin.
   */
  inputFocusIn() {
    this.adjustScrollOnTable(this.inputElement.nativeElement);
    this.hasInputFocus = true;
    this.inputStartValue = this.inputElement.nativeElement.value;
  }

  handleScroll = _.debounce(function() {
    this.inputElement.nativeElement.focus();
  }, 500);

  /**
   * Delegate method wrapper for native browser preventDefault
   * @param event Event object
   */
  preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
    this.inputElement.nativeElement.focus();
  }

  private subscribeToParentScroller() {
    const scrollParent = $(this.elementRef.nativeElement).scrollParent();

    if (scrollParent != null && scrollParent[0] instanceof HTMLElement) {
      this.parentScroller = scrollParent[0];

      this.ngZone.runOutsideAngular(() => {
        this.parentScroller.addEventListener("scroll", this.parentScrollHanlder);
      });
    }
  }

  private settingWidth(){
    if (parseInt(this.controlWidthComboBox, 10)) {
      this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox)) + 'px';
      if (isIE() == 9){
        //ie9で幅を再設定
        this.dropdownMenuStyle['width'] = (parseInt(this.controlWidthComboBox) + 15) + 'px \9';
      }
    }else{
      this.dropdownMenuStyle['width'] = (parseInt(this.elementRef.nativeElement.children[0].children[0].children[0].clientWidth) + 20) + 'px';
    }
  }

  private settingScrollPostion(selectedIndex: number) {
    let _this = this;
    setTimeout(() => {
      const scl = $(".dropdown-menu")[0];
      $(".dropdown-menu").mousedown(event => {
        this.hasInputFocus = false;
        setTimeout(() => {
          this.inputElement.nativeElement.focus();
        }, 100);
      });
      const item = $($(".dropdown-menu").find("li")[selectedIndex])
      if (scl !== undefined && scl !== null && _this._listItems!== null && _this._listItems.length >0 && item.length > 0) {
        if (scl.offsetHeight !== null){
          const height = scl.offsetHeight + $(".dropdown-menu").offset().top;
          if (item.offset().top > height - 30) {
            const delta = item.offset().top - height + 30;
            scl.scrollTop = scl.scrollTop + delta;
          } else if(item.offset().top < $(".dropdown-menu").offset().top) {
            const delta = $(".dropdown-menu").offset().top - item.offset().top + 30;
            scl.scrollTop = scl.scrollTop - delta
          }
          _this.markForCheck();
        }
      }
    }, 10);
  }

}
