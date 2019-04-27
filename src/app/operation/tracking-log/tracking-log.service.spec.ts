import { TestBed, inject } from '@angular/core/testing';

import { TrackingLogService } from './tracking-log.service';

describe('TrackingLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackingLogService]
    });
  });

  it('should be created', inject([TrackingLogService], (service: TrackingLogService) => {
    expect(service).toBeTruthy();
  }));
});
