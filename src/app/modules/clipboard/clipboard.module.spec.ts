import { ClipboardModule } from './clipboard.module';

describe('ClipboardModule', () => {
  let clipboardModule: ClipboardModule;

  beforeEach(() => {
    clipboardModule = new ClipboardModule();
  });

  it('should create an instance', () => {
    expect(clipboardModule).toBeTruthy();
  });
});
