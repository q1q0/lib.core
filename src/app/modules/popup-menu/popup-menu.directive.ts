import { Directive, QueryList, Input, ContentChildren, OnInit, AfterViewInit, Optional, SkipSelf } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItem } from './menu-item';
import { ContextMenuService } from './context-menu.service';
import { BaseComponent } from '../base/base.component';
import { ViewComponent } from '../view/view.component';

/**
 * Popup menu directive class. Adds context menu items to component
 */
@Directive({
  selector: 'vt-popup-menu'
})
export class PopupMenuDirective implements AfterViewInit {
  @Input() idName: string; //DO NOT used, exists for bad usage
  @Input() id: string;
  @Input() disabled: boolean = false;
  @Input() visible: boolean = true;
  @Input() text: string = "";

  @ContentChildren(MenuItemDirective) private subMenuItems: QueryList<MenuItemDirective>;
  
  /**
   * 
   * @param parent 
   * @param contextMenuService Injected service for context menu functions
   */
  constructor(
    @Optional() private parent: BaseComponent,
    private contextMenuService: ContextMenuService
  ) { }

  /**
   * After view init lifecycle. Initialize submenu items
   */
  ngAfterViewInit() {
    if (this.parent != null && this.parent.getParentView() != null) {
      (this.parent.getParentView() as ViewComponent).registerPopupMenu(this);
    } else {
      this.convertSubMenuItems(null);
    }
  }

  /**
   * Delegate to [[ContextMenuService]] getContextMenuItems method
   */
  getMenuItems() {
    return this.contextMenuService.getContextMenuItems(this.id);
  }

  /**
   * Convert all sub menu items ([[MenuItemDirective]]) to [[MenuItem]]
   * @param parentScreenId Id of parent view component
   */
  convertSubMenuItems(parentScreenId: string) {
    let menuItems: Array<MenuItem> = [];

    if (this.subMenuItems) {
      menuItems = this.subMenuItems.map(item=>item.toMenuItem(parentScreenId));
    }

    this.contextMenuService.registerContextMenu(this.id, menuItems, parentScreenId);
  }
}
