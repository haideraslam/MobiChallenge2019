import { ApplicationLayoutModule } from './application-layout.module';

describe('ApplicationLayoutModule', () => {
  let applicationLayoutModule: ApplicationLayoutModule;

  beforeEach(() => {
    applicationLayoutModule = new ApplicationLayoutModule();
  });

  it('should create an instance', () => {
    expect(applicationLayoutModule).toBeTruthy();
  });
});
