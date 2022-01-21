import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LinkComponent],
  exports: [LinkComponent]
})
export class LinkModule { }
