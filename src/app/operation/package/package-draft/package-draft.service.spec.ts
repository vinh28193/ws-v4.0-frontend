import { TestBed, inject } from '@angular/core/testing';

import { PackageDraftService } from './package-draft.service';

describe('PackageDraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageDraftService]
    });
  });

  it('should be created', inject([PackageDraftService], (service: PackageDraftService) => {
    expect(service).toBeTruthy();
  }));
});
