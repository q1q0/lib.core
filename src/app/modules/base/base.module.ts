import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { SessionModule } from '../session/session.module';
import { JavaModule } from '../java/java.module';
import { EventHandlerModule } from '../event-handler/event-handler.module';
import { OnCreateDirective } from './on-create.directive';

@NgModule({
  imports: [
    CommonModule,
    SessionModule,
    JavaModule,
    EventHandlerModule
  ],
  declarations: [BaseComponent, OnCreateDirective],
  exports: [BaseComponent, OnCreateDirective]
})
export class BaseModule { }
