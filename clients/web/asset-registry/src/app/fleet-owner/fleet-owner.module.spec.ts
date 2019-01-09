import { FleetOwnerModule } from './fleet-owner.module';

describe('FleetOwnerModule', () => {
  let fleetOwnerModule: FleetOwnerModule;

  beforeEach(() => {
    fleetOwnerModule = new FleetOwnerModule();
  });

  it('should create an instance', () => {
    expect(fleetOwnerModule).toBeTruthy();
  });
});
