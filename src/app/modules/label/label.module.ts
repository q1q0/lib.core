import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { BaseModule } from '../base/base.module';

@NgModule({
  imports: [
    CommonModule,
		BaseModule
  ],
  declarations: [LabelComponent],
  exports: [LabelComponent],
  entryComponents: [
    LabelComponent
  ]
})
export class LabelModule { }
