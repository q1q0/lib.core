import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPaneComponent } from './split-pane.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { BottomPaneComponent } from './bottom-pane/bottom-pane.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SplitPaneComponent,
    TopPaneComponent,
    BottomPaneComponent
  ],
  exports: [
    SplitPaneComponent,
    TopPaneComponent,
    BottomPaneComponent
  ]
})
export class SplitPaneModule { }
