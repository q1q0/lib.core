import { TabPaneModule } from './tab-pane.module';

describe('TabPaneModule', () => {
  let tabPaneModule: TabPaneModule;

  beforeEach(() => {
    tabPaneModule = new TabPaneModule();
  });

  it('should create an instance', () => {
    expect(tabPaneModule).toBeTruthy();
  });
});
