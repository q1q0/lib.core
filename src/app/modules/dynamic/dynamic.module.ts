import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';
import { ButtonModule } from '../button/button.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { LayoutModule } from '../layout/layout.module';
import { LabelModule } from '../label/label.module';
import { HorizontalSeparatorModule } from '../horizontal-separator/horizontal-separator.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    LabelModule,
    TextFieldModule,
    LayoutModule,
    HorizontalSeparatorModule
  ],
  declarations: [
    DynamicComponent
  ],
  exports: [
    DynamicComponent,
    ButtonModule,
    LabelModule,
    TextFieldModule,
    LayoutModule,
    HorizontalSeparatorModule
  ]
})
export class DynamicModule { }
