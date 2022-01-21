import { SplitPaneModule } from './split-pane.module';

describe('SplitPaneModule', () => {
  let splitPaneModule: SplitPaneModule;

  beforeEach(() => {
    splitPaneModule = new SplitPaneModule();
  });

  it('should create an instance', () => {
    expect(splitPaneModule).toBeTruthy();
  });
});
