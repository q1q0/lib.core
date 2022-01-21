import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHandlerService } from './event-handler.service';
import { McoContainerModule } from '../mco-container/mco-container.module';

@NgModule({
  imports: [
    CommonModule,
    McoContainerModule
  ],
  declarations: [],
  providers: [
    EventHandlerService
  ]
})
export class EventHandlerModule { }
