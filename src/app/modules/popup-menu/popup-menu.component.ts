import {
  Component,
  Optional,
  SkipSelf,
  ElementRef,
  ContentChildren,
  QueryList,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DoCheck,
  IterableDiffers,
  IterableDiffer,
  ViewChild,
  ContentChild,
  ViewEncapsulation,
  Renderer2
} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItem } from './menu-item';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { MenuItemBuilder } from './menu-item-builder';
import * as _ from "lodash";
import { ClientEvent } from '../event-handler/client-event';
import { AppUtils } from '../base/app-utils';
import { UiDocument } from '../base/ui-document';
import { Subscription } from 'rxjs';

declare var $;
/**
 * Class for popup menu component
 */
@Component({
  selector: 'vt-popup-menu-view',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PopupMenuComponent extends BaseComponent implements DoCheck {
  @Input() private idName: string; //DO NOT used, exists for bad usage
  @ViewChild("myDropdown", {read: BsDropdownDirective}) dropdown: BsDropdownDirective;
  @ViewChild("bsDropdownContainer", {read: ElementRef}) dropdownContainer: ElementRef<HTMLElement>;
  @ViewChild("dropdownMenu", {read: ElementRef}) dropdownMenu: ElementRef<HTMLElement>;

  @Input() menuItems: Array<MenuItem> = [];

  private menuItemsDiffer: IterableDiffer<{}> = null;

  private isShown: boolean = false;
  private activeItem;
  private subMenu;

  get hasMenuItems(): boolean {
    return this.menuItems != null && this.menuItems.length > 0;
  }

  onDocumentClick: (event)=>void;

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd Change detector
   * @param differs
   * @param popupMenuService
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(
    @Optional() @SkipSelf() parent: BaseComponent,
    sessionService: SessionService,
    elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    differs: IterableDiffers,
    private popupMenuService: ContextMenuService,
    renderer: Renderer2
  ) {
    super(parent, sessionService, elementRef, renderer);

    this.menuItemsDiffer = differs.find([]).create();

    this.onDocumentClick = (event)=>{
      this.handleDocumentClick(event);
    };

    document.addEventListener("mousedown", this.onDocumentClick);
  }

  /**
   * Do check lifecycle
   */
  ngDoCheck() {
    if (this.menuItemsDiffer.diff(this.menuItems)) {
      this.markForCheck();
    }
  }

  /**
   * After view init lifecycle. Trigger change detection and show this component
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.detectChanges();

    UiDocument.registerMenuItemElement(this.getId(), this as any);
    this.activeItem = 0;

    const tm = setTimeout(()=>{
      clearTimeout(tm);
      this.show();
    });
    setTimeout(()=>{
      this.dropdownMenu && $($(this.dropdownMenu.nativeElement).children("li")[0]).children("a").focus();
    }, 200);
  }

  /**
   * Destroy lifecycle. Remove event listeners and remove dropdown elements
   */
  ngOnDestroy() {
    super.ngOnDestroy();

    UiDocument.unregisterMenuItemElement(this.getId());

    document.removeEventListener("mousedown", this.onDocumentClick);
    this.dropdownContainer = null;
    this.dropdown = null;
  }

  /**
   * Show the popup by setting CSS position to on screen
   */
  private show() {
    this.popupMenuService.setActiveMenu(this.id);

    if (this.dropdown != null) {
      this.dropdown.show();
      this.isShown = true;
      const position = this.getSession().getMousePosition();

      if (position != null && this.dropdownContainer != null) {
        this.renderer.setStyle(this.dropdownContainer.nativeElement, "left", position.x + "px");
        this.renderer.setStyle(this.dropdownContainer.nativeElement, "top", position.y + "px");
      }

      this.markForCheck();
    }
  }

  /**
   * Hide the popup menu
   */
  private hide(skipSetActive: boolean = false) {
    this.dropdown.hide();
    this.isShown = false;
    this.markForCheck();

    if (skipSetActive !== true) {
      this.popupMenuService.setActiveMenu(null);
    }
  }

  /**
   * Event handler for mouse click
   * @param event
   */
  handleDocumentClick(event: MouseEvent){
    if (this.isShown === true && this.elementRef && !this.elementRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  arrowShowInterworkSubmenu(event) {
    console.log("show submenu")
  }

  hideAllSubmenu(event) {
    console.log("hide submenu")
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
        if (this.menuItems[this.activeItem] != null) {
          let items = this.dropdownMenu ? $(this.dropdownMenu.nativeElement).children("li") : [];
          this.dispSubmenu(items[this.activeItem]);
          $(this.subMenu.children[0]).children("a").focus();
        }
      }
    } else {
      if (event.keyCode === 37 || event.key === "ArrowLeft") {
        if (this.menuItems[this.activeItem] != null) {
          this.subMenu.classList.remove('popup-sub-menu-display');
          this.subMenu = undefined;
          let items = this.dropdownMenu ? $(this.dropdownMenu.nativeElement).children("li") : [];
          $(items[this.activeItem]).children("a").focus();
        }
      }
    }
  }

  moveUp() {
    if (this.activeItem > 0) {
      let nextItem = this.activeItem - 1;
      if (this.menuItems[nextItem].text === '-') {
        while(this.menuItems[nextItem] && this.menuItems[nextItem].text === '-') nextItem--;
      }
      let items = $(this.dropdownMenu.nativeElement).children("li");
      $(items[this.activeItem]).children("a").blur();
      $(items[nextItem]).children("a").focus();
      this.activeItem = nextItem;
    }
  }

  moveDown() {
    if (this.activeItem < this.menuItems.length - 1) {
      let nextItem = this.activeItem + 1;
      if (this.menuItems[nextItem].text === '-') {
        while(this.menuItems[nextItem] && this.menuItems[nextItem].text === '-') nextItem++;
      }
      let items = $(this.dropdownMenu.nativeElement).children("li");
      $(items[this.activeItem]).children("a").blur();
      $(items[nextItem]).children("a").focus();
      this.activeItem = nextItem;
    }
  }
  /**
   * Get [[cd]] (Change detector) property
   */
  getChangeDetector() {
    return this.cd;
  }

  /**
   * Event handler that hides all other popup menus and displays this one
   * @param event
   */
  dispSubmenu(event: any): void {
    const currentTarget: any = event.currentTarget || event;
    this.activeItem = $(currentTarget).index();
    const currentChildren: Array<any> = currentTarget.children;
    const parentChildren: Array<any> = currentTarget.parentElement.children;

    for(let i = 0, len = parentChildren.length; i < len; i++){
      if(parentChildren[i] !== undefined){
        this.renderer.setStyle(parentChildren[i], "background-color", "#ffffff");
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
    this.renderer.setStyle(currentTarget, "background-color", "#f5de92");
  }

  /**
   * Set an attribute with value on the menu item
   * @param name Attribute name
   * @param value Attribute value
   */
  setAttribute(name: string, value: any) {
    this.setCustomAttribute(name, value);
  }

  /**
   * Get the value of an attribute by name
   * @param name Attribute name
   */
  getAttribute(name: string) {
    return this.getCustomAttribute(name);
  }

  toJson() {
    return super.toJson();
  }
}
