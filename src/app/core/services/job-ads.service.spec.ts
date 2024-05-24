import { TestBed } from '@angular/core/testing';

import { JobAdsService } from './job-ads.service';

describe('JobAdsService', () => {
  let service: JobAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
