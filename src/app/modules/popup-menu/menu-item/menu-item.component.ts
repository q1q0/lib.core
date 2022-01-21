import { Component, Output, Input, ViewChild, ElementRef, EventEmitter, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from '../menu-item';
import { ClientEvent } from '../../event-handler/client-event';
import { AppUtils } from '../../base/app-utils';
import { SessionService } from '../../session/session.service';
import { MenuItemBuilder } from '../menu-item-builder';
import { UiDocument } from '../../base/ui-document';
import * as _ from "lodash";
import { KeyUtils } from '../../base/key-utils';

declare var $;

/**
 * Class for menu item component. Child rendered by Menu directive
 */
@Component({
  selector: '[vt-menu-item-comp]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnDestroy, AfterViewInit{
  @ViewChild('menuItem') itemLink: HTMLElement;
  @ViewChild("dropdownMenu") dropdownMenu: ElementRef<HTMLElement>;
  @Input() text: string;
  @Input() id: string;
  @Input() menuItems: Array<MenuItem>;
  @Input() display: boolean = true;
  @Input() visible: boolean;
  @Input() item: MenuItem;
  @Input() popupMenuId: string;

  @Output() onClick = new EventEmitter<void>();

  private activeItem;
  private subMenu;
  private items;

  /**
   * Check if menu items exist
   * @returns True if [[menuItems]] exists and has 1 or more items
   */
  get hasMenuItems(): boolean {
    return this.menuItems != null && this.menuItems.length > 0;
  }

  /**
   * Check if this menu item is a separator/divider (i.e. hyphen)
   * @returns True if the menu item text is a hyphen
   */
  get isDivider(): boolean {
    return this.text === '-';
  }

  /**
   * Get menu item styles map
   * @return Map of styles
   */
  get menuStyles() {
    return this.item != null ? this.item.styles : null;
  }

  /**
   *
   * @param sessionService Injects reference to [[SessionService]] instance
   */
  constructor(private sessionService: SessionService, private cd: ChangeDetectorRef) {

  }

  /**
   * After view init lifecycle. Adds menu item to [[UiDocument]]
   */
  ngAfterViewInit() {
    UiDocument.registerMenuItemElement(this.id, this);
    this.activeItem = 0;
    this.items = this.dropdownMenu ? $(this.dropdownMenu.nativeElement).children("li") : [];
  }

  ngOnChanges() {
    console.log("changed");
  }

  /**
   * Destroy lifecycle. Remove menu item from [[UiDocument]]
   */
  ngOnDestroy() {
    this.item = null;
    this.menuItems = null;

    UiDocument.unregisterMenuItemElement(this.id);
  }

  /**
   * Set an attribute with value on the menu item
   * @param name Attribute name
   * @param value Attribute value
   */
  setAttribute(name: string, value: any) {
    if (this.item) {
      if (name === "display" || name === "visible") {
        value = value === true || value === "true";
        this.display = value;
        this.item.display = value;
        this.cd.detectChanges();
      } else if (name === "text") {
        this.text = value;
        this.item.text = value;
        this.cd.detectChanges();
      } else if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
        if (this.item.customAttributes == null) {
          this.item.customAttributes = {};
        }

        this.item.customAttributes[name] = value;
      }
    }
  }

  /**
   * Get the value of an attribute by name
   * @param name Attribute name
   */
  getAttribute(name: string) {
    if (this.item) {
      if (MenuItemBuilder.knownKeys.indexOf(name) < 0) {
        return this.item.customAttributes == null ? null : this.item.customAttributes[name];
      } else if (name === "display" || name === "visible") {
        return this.display;
      } else if (name === "text") {
        return this.text;
      } else if (name === "id") {
        return this.id;
      }
    }
  }

  /**
   * Get value of [[id]] property
   * @returns [[id]] value
   */
  getId() {
    return this.id;
  }

  /**
   * Get value of [[text]] property
   * @returns [[text]] value
   */
  getText() {
    return this.text;
  }

  /* istanbul ignore next */
  /**
   * Event handler fro mouseenter event
   * @param event Mouse event
   */
  handleOnEnter(event) {
    const clientEvent = new ClientEvent(this, event);

    if (AppUtils.customizeClientEvent != null) {
      AppUtils.customizeClientEvent(this, clientEvent);
    }

    if (this.item != null && this.item.parentScreenId != null) {
      clientEvent.setParameter("screenId", this.item.parentScreenId);
    }

    this.sessionService.getEventHandler().setClientEvent(clientEvent);

    if (this.item && typeof this.item.onCommandCallback === 'function') {
      this.item.onCommandCallback(this.item);
    } else if (this.item && this.item.onCommand) {
      this.item.onCommand.emit();
    }

    if (this.popupMenuId != null) {
      this.sessionService.hideContextMenu(this.popupMenuId);
    }
  }

  /* istanbul ignore next */
  /**
   * Event handler for mouseenter. Focuses the event target
   * @param event Mouse event
   */
  handleMouseEnter(event) {
    event.target.focus();
  }

  /* istanbul ignore next */
  /**
   * Event handler for click.
   * @param event
   * @event OnCommand
   */
  handleOnClick(event: MouseEvent): void {
    const clientEvent = new ClientEvent(this, event);

    if (AppUtils.customizeClientEvent != null) {
      AppUtils.customizeClientEvent(this, clientEvent);
    }

    if (this.item != null && this.item.parentScreenId != null) {
      clientEvent.setParameter("screenId", this.item.parentScreenId);
    }

    this.sessionService.getEventHandler().setClientEvent(clientEvent);

    if (this.item && typeof this.item.onCommandCallback === 'function') {
      this.item.onCommandCallback(this.item);
    } else if (this.item && this.item.onCommand) {
      this.item.onCommand.emit();
    }

    if (this.popupMenuId != null) {
      this.sessionService.hideContextMenu(this.popupMenuId);
    }
  }

  /* istanbul ignore next */
  /**
   * Event handler for mousedown event
   * @param event Mouse down event
   */
  handleMouseDown(event: MouseEvent) {
    const clientEvent = new ClientEvent(this, event);

    if (AppUtils.customizeClientEvent != null) {
      AppUtils.customizeClientEvent(this, clientEvent);
    }

    if (this.item != null && this.item.parentScreenId != null) {
      clientEvent.setParameter("screenId", this.item.parentScreenId);
    }

    this.sessionService.getEventHandler().setClientEvent(clientEvent);

    if (this.item && typeof this.item.onMouseDownCallback === "function") {
      this.item.onMouseDownCallback(this);
    }
  }

  handleKeydown(event: KeyboardEvent) {
    let focusedItem = document.activeElement.parentElement;
    let parentComponent = focusedItem.parentElement;
    let focusedIdx = $(focusedItem).index();
    if (this.dropdownMenu && this.dropdownMenu.nativeElement.isEqualNode(parentComponent) && this.activeItem !== focusedIdx) {
      this.activeItem = $(focusedItem).index();
    }
    if (!this.subMenu) {
      if (event.keyCode === 38 || event.key === "ArrowUp") {
        this.moveUp();
      } else if (event.keyCode === 40 || event.key === "ArrowDown") {
        this.moveDown();
      } else if (event.keyCode === 39 || event.key === "ArrowRight") {
        if (this.item != null) {
          this.dispSubmenu(this.items[this.activeItem]);
          // For keeping track of select history
          // let selected = $(this.subMenu).children(".selected").index();
          // selected = selected !== -1 ? selected : 0;
          // $(this.subMenu.children[selected]).children("a").focus();
          // this.subMenu.children[selected].classList.remove("selected");
        }
      }
    } else {
      if (event.keyCode === 37 || event.key === "ArrowLeft") {
        if (this.item != null) {
          // document.activeElement.parentElement.classList.add("selected");
          this.subMenu.classList.remove('popup-sub-menu-display');
          this.subMenu = undefined;
          this.items[this.activeItem].style.backgroundColor = "";
          $(this.items[this.activeItem]).children("a").focus();
          event.stopPropagation();
        }
      }
    }
  }

  moveUp() {
    if (this.activeItem > 0) {
      let nextItem = this.activeItem - 1;
      if (this.items[nextItem].text === '-') {
        while(this.items[nextItem] && this.items[nextItem].text === '-') nextItem--;
      }
      $(this.items[this.activeItem]).children("a").blur();
      $(this.items[nextItem]).children("a").focus();
      this.activeItem = nextItem;
    }
  }

  moveDown() {
    if (this.activeItem < this.items.length - 1) {
      let nextItem = this.activeItem + 1;
      if (this.items[nextItem].text === '-') {
        while(this.items[nextItem] && this.items[nextItem].text === '-') nextItem++;
      }
      $(this.items[this.activeItem]).children("a").blur();
      $(this.items[nextItem]).children("a").focus();
      this.activeItem = nextItem;
    }
  }
  /**
   * Get JSON representation for this component
   * @returns Object Metadata as JSON
   */
  toJson(): {} {
    const json = {};

    json["tagName"] = "menuItem";
    json["nxTagName"] = "menuItem";

    if (this.id != null) {
      json["id"] = this.id;
    }

    if (this.text != null) {
      json["text"] = this.text;
    }

    /* istanbul ignore if */
    if (this.popupMenuId != null) {
      json["popup"] = "#" + this.popupMenuId;
    }

    /* istanbul ignore if */
    if (this.item.customAttributes != null) {
      const keys = _.keys(this.item.customAttributes);

      for (let key of keys) {
        json[key] = KeyUtils.toJsonValue(this.item.customAttributes[key]);
      }
    }

    return json;
  }

  /**
   * Event handler to show the submenu items by adding CSS class
   * @param event
   */
  dispSubmenu(event: any): void {
    const currentTarget: any = event.currentTarget || event;
    const currentChildren: Array<any> = currentTarget.children;
    const parentChildren: Array<any> = currentTarget.parentElement.children;
    this.activeItem = $(currentTarget).index();

    for(let i = 0, len = parentChildren.length; i < len; i++){
      if(parentChildren[i] !== undefined){
        parentChildren[i].style.backgroundColor = "#ffffff";
      }
      if(parentChildren[i].children[1] === undefined){
        continue;
      }
      parentChildren[i].children[1].classList.remove('popup-sub-menu-display');
      this.subMenu = undefined;
    }

    if(currentChildren[1] === undefined
        || (currentChildren[0] !== undefined && !currentChildren[0].classList.contains('dropdown-item'))){
      return;
    }

    currentChildren[1].classList.add('popup-sub-menu-display');
    this.subMenu = currentChildren[1];
    $(this.subMenu.children[0]).children("a").focus();
    currentTarget.style.backgroundColor = "#f5de92";
    event.stopPropagation;
  }
}
