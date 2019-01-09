import { TestBed, inject } from '@angular/core/testing';

import { AllocateCarToUsecaseService } from './allocate-car-to-usecase.service';

describe('AllocateCarToUsecaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocateCarToUsecaseService]
    });
  });

  it('should be created', inject([AllocateCarToUsecaseService], (service: AllocateCarToUsecaseService) => {
    expect(service).toBeTruthy();
  }));
});
