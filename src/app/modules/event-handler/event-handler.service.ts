import { Injectable } from '@angular/core';
import { ClientEvent } from './client-event';
import { BaseComponent } from '../base/base.component';
import { McoContainerService } from '../mco-container/mco-container.service';

/**
 * Track events
 */
@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {
  private _clientEvent: ClientEvent;

  constructor(
    private mcoContainerService: McoContainerService
  ) {

  }

  setClientEvent(event: ClientEvent): void {
    this._clientEvent = event;
  }

  getClientEvent(): ClientEvent {
    return this._clientEvent;
  }

  fireEvent(command: string, mcoName: string, actionName: string, arg: any, source: BaseComponent, clientEvent: ClientEvent) {
    const mco = this.mcoContainerService.getMco(mcoName);

    if (mco != null && typeof mco[actionName] === "function") {
      if (Array.isArray(arg)) {
        (mco[actionName] as Function).apply(mco, arg);
      } else {
        (mco[actionName] as Function).apply(mco, [arg]);
      }
    }
  }
}
