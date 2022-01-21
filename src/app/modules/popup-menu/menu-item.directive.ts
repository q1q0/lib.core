import { Directive, Input, QueryList, ContentChildren, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item';

/**
 * Menu item directive class. Adds menu dispay and behavior to component
 */
@Directive({
  selector: 'vt-menu-item'
})
export class MenuItemDirective {
  @Input() private idName: string; //DO NOT used, exists for bad usage
  @Input() private id: string;
  @Input() private text: string = '';
  @Input() private visible: boolean = true;
  @Output() private onCommand = new EventEmitter<void>();

  @ContentChildren(MenuItemDirective) private subMenuItems: QueryList<MenuItemDirective>;

  /**
   * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
   * @param parentScreenId
   */
  toMenuItem(parentScreenId?: string): MenuItem {
    const menuItem: MenuItem = {
      id: this.id,
      text: this.text,
      menuItems: null,
      onCommand: this.onCommand,
      parentScreenId: parentScreenId,
      display: this.visible
    };

    if (this.subMenuItems != null && this.subMenuItems.length > 0) {
      //filter to remove self then map to MenuItem
      menuItem.menuItems = this.subMenuItems.filter(item=>item !== this).map(item=>item.toMenuItem(parentScreenId));
    }

    return menuItem;
  }
}
