import { McoContainerModule } from './mco-container.module';

describe('McoContainerModule', () => {
  let mcoContainerModule: McoContainerModule;

  beforeEach(() => {
    mcoContainerModule = new McoContainerModule();
  });

  it('should create an instance', () => {
    expect(mcoContainerModule).toBeTruthy();
  });
});
