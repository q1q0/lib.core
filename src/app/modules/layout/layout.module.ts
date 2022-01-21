import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { GridColumnDirective } from './grid-column.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridColumnDirective,
    PanelComponent
  ],
  exports: [
    GridColumnDirective,
    PanelComponent
  ]
})
export class LayoutModule { }
