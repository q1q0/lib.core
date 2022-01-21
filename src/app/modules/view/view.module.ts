import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { DynamicPagesService } from './dynamic-pages.service';
import { BaseModule } from '../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [ViewComponent],
  providers: [
    DynamicPagesService
  ],
  exports: [
    ViewComponent,
  ]
})
export class ViewModule { }
