import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from './combo-box.component';
import { ListBoxDirective } from './list-box.directive';
import { ListItemDirective } from './list-item.directive';
import { BsDropdownModule } from 'ngx-bootstrap';
import { KeyboardModule } from '../keyboard/keyboard.module';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    KeyboardModule
  ],
  declarations: [ComboBoxComponent, ListBoxDirective, ListItemDirective],
  exports: [
    ComboBoxComponent,
    ListBoxDirective,
    ListItemDirective,
    BsDropdownModule,
    KeyboardModule
  ],
  entryComponents: [
    ComboBoxComponent
  ]
})
export class ComboBoxModule { }
