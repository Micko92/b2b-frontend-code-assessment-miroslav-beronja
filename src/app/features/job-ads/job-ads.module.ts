import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAdsComponent } from './job-ads.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ObjectEffects } from 'src/app/state/job-ads.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogJobAdsCreateNewComponent } from './dialog-job-ads-create-new/dialog-job-ads-create-new.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: JobAdsComponent }
]

@NgModule({
  declarations: [
    JobAdsComponent,
    DialogJobAdsCreateNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(ObjectEffects),
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class JobAdsModule { }
