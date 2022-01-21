import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { BaseModule } from '../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  entryComponents: [
    ButtonComponent
  ]
})
export class ButtonModule { }
