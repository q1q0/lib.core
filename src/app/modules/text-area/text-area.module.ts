import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TextAreaComponent],
  exports: [
    TextAreaComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    TextAreaComponent
  ]
})
export class TextAreaModule { }
