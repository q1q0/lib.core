import { ClientEvent } from './client-event';
import { BaseComponent } from '../base/base.component';
import { McoContainerService } from '../mco-container/mco-container.service';
/**
 * Track events
 */
export declare class EventHandlerService {
    private mcoContainerService;
    private _clientEvent;
    constructor(mcoContainerService: McoContainerService);
    setClientEvent(event: ClientEvent): void;
    getClientEvent(): ClientEvent;
    fireEvent(command: string, mcoName: string, actionName: string, arg: any, source: BaseComponent, clientEvent: ClientEvent): void;
}
