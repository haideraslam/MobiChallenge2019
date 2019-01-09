import { TestBed, inject } from '@angular/core/testing';

import { FleetOwnerWalletService } from './fleet-owner-wallet.service';

describe('FleetOwnerWalletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FleetOwnerWalletService]
    });
  });

  it('should be created', inject([FleetOwnerWalletService], (service: FleetOwnerWalletService) => {
    expect(service).toBeTruthy();
  }));
});
