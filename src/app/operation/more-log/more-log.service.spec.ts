import { TestBed, inject } from '@angular/core/testing';

import { MoreLogService } from './more-log.service';

describe('MoreLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoreLogService]
    });
  });

  it('should be created', inject([MoreLogService], (service: MoreLogService) => {
    expect(service).toBeTruthy();
  }));
});
