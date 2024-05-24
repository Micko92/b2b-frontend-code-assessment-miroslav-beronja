import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdsComponent } from './job-ads.component';

describe('JobAdsComponent', () => {
  let component: JobAdsComponent;
  let fixture: ComponentFixture<JobAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobAdsComponent]
    });
    fixture = TestBed.createComponent(JobAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
