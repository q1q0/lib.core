import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMenuComponent } from './popup-menu.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuDirective } from './menu.directive';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PopupMenuContainerComponent } from './popup-menu-container/popup-menu-container.component';
import { PopupMenuDirective } from './popup-menu.directive';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    PopupMenuComponent,
    MenuItemDirective,
    MenuItemComponent,
    MenuDirective,
    PopupMenuContainerComponent,
    PopupMenuDirective
  ],
  exports: [
    PopupMenuComponent,
    MenuItemDirective,
    MenuItemComponent,
    MenuDirective,
    BsDropdownModule,
    PopupMenuContainerComponent,
    PopupMenuDirective
  ],
  providers: [
    ContextMenuService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopupMenuModule { }
