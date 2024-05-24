import { Component, Inject, Optional, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobAd, JobAdDto } from 'src/app/job-ads/job-ads.model';
import { JOB_AD_STATUS } from '../../../../../constants';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-dialog-job-ads-create-new',
  templateUrl: './dialog-job-ads-create-new.component.html',
  styleUrls: ['./dialog-job-ads-create-new.component.scss']
})
export class DialogJobAdsCreateNewComponent {

  skillsT = new FormControl([Validators.required])
  createNewJobAdsForm: FormGroup;
  flgCreate = true;
  jobAdStatus = JOB_AD_STATUS;
  selectedVal = 'draft';
  skillsArray = [] as any;
  typeOfEvent = 'create';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogJobAdsCreateNewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { values: JobAdDto, typeOfEvent: string}
  ) {
    const { values, typeOfEvent } = this.data;
    const { id = '', title= '', description = '', status = '', skills = '' } = values;

    this.typeOfEvent = typeOfEvent;
    this.createNewJobAdsForm = this.fb.group({
      id: id ? id : null,
      title: [title ? title : '', [Validators.required]],
      description: [description ? description : '', [Validators.required]],
      skills: ['', [Validators.required]],
      status: status ? status : this.jobAdStatus.DRAFT
    });

    if (this.data) {
      this.skillsArray.push(...skills);
      this.createNewJobAdsForm.controls['skills'].setValue(this.skillsArray);
    }
  }

  get skills() {
    return this.createNewJobAdsForm.get('skills') as FormArray;
  }

  get status() {
    return this.createNewJobAdsForm.get('status') as FormArray;
  }

  removeSkill(skill: string, indexOfSkill: number): void {
    const index = this.skillsArray.indexOf(skill);

    if (index >= 0) this.skillsArray.splice(index, 1);

    this.createNewJobAdsForm.controls['skills'].setValue(this.skillsArray);
    const newSkillControls = (this.createNewJobAdsForm.get('skills') as FormArray);
    const count = newSkillControls.value.length;
    
    if (count === 0) this.createNewJobAdsForm.get('skills')?.markAllAsTouched();
  }

  addSkill(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) this.skillsArray.push(value);
    if (input) input.value = '';

    this.createNewJobAdsForm.controls['skills'].setValue(this.skillsArray)
  }

  changeStatus(event: MatButtonToggleChange) {    
    this.createNewJobAdsForm.controls['status'].setValue(event.value);
  }

  saveData() {
    this.dialogRef.close({event: this.typeOfEvent, data: this.createNewJobAdsForm.value });
  }

}
