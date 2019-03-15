import { TestBed, inject } from '@angular/core/testing';

import { SipmentService } from './sipment.service';

describe('SipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SipmentService]
    });
  });

  it('should be created', inject([SipmentService], (service: SipmentService) => {
    expect(service).toBeTruthy();
  }));
});
