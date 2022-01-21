import { LabelModule } from './label.module';

describe('LabelModule', () => {
  let labelModule: LabelModule;

  beforeEach(() => {
    labelModule = new LabelModule();
  });

  it('should create an instance', () => {
    expect(labelModule).toBeTruthy();
  });
});
