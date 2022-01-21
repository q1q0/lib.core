import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CheckboxComponent],
  exports: [
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
