import { TestBed, inject } from '@angular/core/testing';

import { CarLookupService } from './car-lookup.service';

describe('CarLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarLookupService]
    });
  });

  it('should be created', inject([CarLookupService], (service: CarLookupService) => {
    expect(service).toBeTruthy();
  }));
});
