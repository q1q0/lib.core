import { ComboBoxModule } from './combo-box.module';

describe('ComboBoxModule', () => {
  let comboBoxModule: ComboBoxModule;

  beforeEach(() => {
    comboBoxModule = new ComboBoxModule();
  });

  it('should create an instance', () => {
    expect(comboBoxModule).toBeTruthy();
  });
});
