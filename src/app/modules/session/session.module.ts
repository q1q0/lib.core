import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';
import { McoContainerModule } from '../mco-container/mco-container.module';
import { EventHandlerModule } from '../event-handler/event-handler.module';

@NgModule({
  imports: [
    CommonModule,
    McoContainerModule,
    EventHandlerModule
  ],
  declarations: [],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
