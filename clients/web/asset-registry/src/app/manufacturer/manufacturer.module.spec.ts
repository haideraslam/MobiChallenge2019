import { ManufacturerModule } from './manufacturer.module';

describe('ManufacturerModule', () => {
  let manufacturerModule: ManufacturerModule;

  beforeEach(() => {
    manufacturerModule = new ManufacturerModule();
  });

  it('should create an instance', () => {
    expect(manufacturerModule).toBeTruthy();
  });
});
