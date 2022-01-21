import { TestBed } from '@angular/core/testing';

import { EventHandlerService } from './event-handler.service';
import { ClientEvent } from './client-event';

describe('EventHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventHandlerService
    ]
  }));

  it('should be created', () => {
    const service: EventHandlerService = TestBed.get(EventHandlerService);
    expect(service).toBeTruthy();
  });

  it('should be set/get client event correctly', () => {
    const service: EventHandlerService = TestBed.get(EventHandlerService);
    const clientEvent = new ClientEvent(null,null);
    service.setClientEvent(clientEvent);
    expect(service.getClientEvent()).toBe(clientEvent);
  });
});
