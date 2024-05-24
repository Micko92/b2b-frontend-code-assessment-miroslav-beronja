import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJobAdsCreateNewComponent } from './dialog-job-ads-create-new.component';

describe('DialogJobAdsCreateNewComponent', () => {
  let component: DialogJobAdsCreateNewComponent;
  let fixture: ComponentFixture<DialogJobAdsCreateNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogJobAdsCreateNewComponent]
    });
    fixture = TestBed.createComponent(DialogJobAdsCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
