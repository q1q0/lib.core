import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPaneComponent } from './tab-pane.component';
import { TabComponent } from './tab/tab.component';
import { TabHostDirective } from './tab/tab-host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabPaneComponent, TabComponent, TabHostDirective],
  exports: [TabComponent, TabPaneComponent, TabHostDirective]
})
export class TabPaneModule { }
