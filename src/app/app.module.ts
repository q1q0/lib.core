import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ButtonModule } from './modules/button/button.module';
import { SessionModule } from './modules/session/session.module';
import { McoContainerModule } from './modules/mco-container/mco-container.module';
import { EventHandlerModule } from './modules/event-handler/event-handler.module';
import { JavaModule } from './modules/java/java.module';
import { ViewModule } from './modules/view/view.module';
import { LabelComponent } from './modules/label/label.component';
import { PanelComponent } from './modules/layout/panel.component';
import { ButtonComponent } from './modules/button/button.component';
import { LayoutModule } from './modules/layout/layout.module';
import { LinkModule } from './modules/link/link.module';
import { GridColumnDirective } from './modules/layout/grid-column.directive';
import { TableModule } from './modules/table/table.module';
import { ModalModule } from "ngx-bootstrap";
import { RadioButtonModule } from './modules/radio-button/radio-button.module';
import { CheckboxModule } from './modules/checkbox/checkbox.module';
import { ListBoxDirective } from './modules/combo-box/list-box.directive';
import { ListItemDirective } from './modules/combo-box/list-item.directive';
import { ComboBoxModule } from './modules/combo-box/combo-box.module';
import { AppTestView } from './test-view.component';
import { DialogModule } from './modules/dialog/dialog.module';
import { LabelModule } from './modules/label/label.module';
import { TabPaneModule } from './modules/tab-pane/tab-pane.module';
import { HorizontalSeparatorModule } from './modules/horizontal-separator/horizontal-separator.module';
import { TextFieldModule } from './modules/text-field/text-field.module';
import { TreeTableModule } from './modules/tree-table/tree-table.module';
import { SplitPaneModule } from './modules/split-pane/split-pane.module';
import { DraggableDirective } from './modules/dialog/draggable.directive';
import { AppTestView2 } from './test-view2.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PopupMenuModule } from './modules/popup-menu/popup-menu.module';
import { DynamicModule } from './modules/dynamic/dynamic.module';
import { ClipboardModule } from './modules/clipboard/clipboard.module';
import { KeyboardModule } from './modules/keyboard/keyboard.module';
import { ScrollPaneModule } from './modules/scroll-pane/scroll-pane.module';

@NgModule({
  declarations: [
    AppComponent,
    AppTestView,
    AppTestView2
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    LayoutModule,
    SessionModule,
    McoContainerModule,
    EventHandlerModule,
    JavaModule,
    ViewModule,
    TableModule,
    RadioButtonModule,
    CheckboxModule,
    ComboBoxModule,
    DialogModule,
    LabelModule,
    LinkModule,
    TabPaneModule,
    HorizontalSeparatorModule,
    TextFieldModule,
    SplitPaneModule,
    TreeTableModule,
    PopupMenuModule,
    DynamicModule,
    ClipboardModule,
    KeyboardModule,
    ScrollPaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
