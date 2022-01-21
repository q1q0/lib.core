import { Directive, forwardRef } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';

/**
 * Menu directive class
 */
@Directive({
  selector: 'vt-menu',
  providers: [
    {
      provide: MenuItemDirective,
      useExisting: forwardRef(()=>MenuDirective)
    }
  ]
})
export class MenuDirective extends MenuItemDirective {

}
