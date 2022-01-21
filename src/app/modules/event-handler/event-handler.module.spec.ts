import { EventHandlerModule } from './event-handler.module';

describe('EventHandlerModule', () => {
  let eventHandlerModule: EventHandlerModule;

  beforeEach(() => {
    eventHandlerModule = new EventHandlerModule();
  });

  it('should create an instance', () => {
    expect(eventHandlerModule).toBeTruthy();
  });
});
