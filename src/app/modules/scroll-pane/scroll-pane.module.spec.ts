import { ScrollPaneModule } from './scroll-pane.module';

describe('ScrollPaneModule', () => {
  let scrollPaneModule: ScrollPaneModule;

  beforeEach(() => {
    scrollPaneModule = new ScrollPaneModule();
  });

  it('should create an instance', () => {
    expect(scrollPaneModule).toBeTruthy();
  });
});
