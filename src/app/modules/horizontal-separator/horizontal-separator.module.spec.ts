import { HorizontalSeparatorModule } from './horizontal-separator.module';

describe('HorizontalSeparatorModule', () => {
  let horizontalSeparatorModule: HorizontalSeparatorModule;

  beforeEach(() => {
    horizontalSeparatorModule = new HorizontalSeparatorModule();
  });

  it('should create an instance', () => {
    expect(horizontalSeparatorModule).toBeTruthy();
  });
});
