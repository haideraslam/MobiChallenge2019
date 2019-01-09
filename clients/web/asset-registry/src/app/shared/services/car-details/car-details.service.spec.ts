import { TestBed, inject } from '@angular/core/testing';

import { CarDetailsService } from './car-details.service';

describe('CarDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarDetailsService]
    });
  });

  it('should be created', inject([CarDetailsService], (service: CarDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
