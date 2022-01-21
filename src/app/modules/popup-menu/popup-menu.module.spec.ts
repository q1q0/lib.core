import { PopupMenuModule } from './popup-menu.module';

describe('PopupMenuModule', () => {
  let popupMenuModule: PopupMenuModule;

  beforeEach(() => {
    popupMenuModule = new PopupMenuModule();
  });

  it('should create an instance', () => {
    expect(popupMenuModule).toBeTruthy();
  });
});
