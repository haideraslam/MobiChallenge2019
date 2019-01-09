import { TestBed, inject } from '@angular/core/testing';

import { TripHistoryService } from './trip-history.service';

describe('TripHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripHistoryService]
    });
  });

  it('should be created', inject([TripHistoryService], (service: TripHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
