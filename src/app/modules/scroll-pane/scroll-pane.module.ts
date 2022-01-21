import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPaneComponent } from './scroll-pane.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ScrollPaneComponent],
  exports: [
    ScrollPaneComponent
  ]
})
export class ScrollPaneModule { }
