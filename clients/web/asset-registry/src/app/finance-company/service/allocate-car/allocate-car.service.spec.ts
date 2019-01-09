import { TestBed, inject } from '@angular/core/testing';

import { AllocateCarService } from './allocate-car.service';

describe('AllocateCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocateCarService]
    });
  });

  it('should be created', inject([AllocateCarService], (service: AllocateCarService) => {
    expect(service).toBeTruthy();
  }));
});
