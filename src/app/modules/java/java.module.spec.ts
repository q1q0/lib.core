import { JavaModule } from './java.module';

describe('JavaModule', () => {
  let javaModule: JavaModule;

  beforeEach(() => {
    javaModule = new JavaModule();
  });

  it('should create an instance', () => {
    expect(javaModule).toBeTruthy();
  });
});
