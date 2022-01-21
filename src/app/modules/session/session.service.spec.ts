import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { BaseComponent } from '../base/base.component';
import { ContextMenuService } from '../popup-menu/context-menu.service';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      McoContainerService,
      EventHandlerService,
      SessionService,
      ContextMenuService
    ],
    declarations: [
      BaseComponent
    ]
  }));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });

  it('should inject McoContainerService', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service.getMcoContainer()).toBeDefined();
  });

  it('should inject EventHandlerService', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service.getEventHandler()).toBeDefined();
  });
});
