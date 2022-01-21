import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TextFieldComponent],
  exports: [
    TextFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    TextFieldComponent
  ]
})
export class TextFieldModule { }
