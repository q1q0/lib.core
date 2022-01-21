import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { ModalModule } from 'ngx-bootstrap';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DialogComponent,
    DraggableDirective
  ],
  exports: [
    DialogComponent,
    DraggableDirective,
    ModalModule
  ]
})
export class DialogModule { }
