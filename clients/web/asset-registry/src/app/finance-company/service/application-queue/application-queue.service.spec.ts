import { TestBed, inject } from '@angular/core/testing';

import { ApplicationQueueService } from './application-queue.service';

describe('ApplicationQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationQueueService]
    });
  });

  it('should be created', inject([ApplicationQueueService], (service: ApplicationQueueService) => {
    expect(service).toBeTruthy();
  }));
});
