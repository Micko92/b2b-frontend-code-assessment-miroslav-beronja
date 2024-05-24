import { createActionGroup, props } from '@ngrx/store';
import { InvoiceDto, JobAd, JobAdDto } from '../job-ads/job-ads.model';

export const JobAdsActions = createActionGroup({
  source: 'JobAds',
  events: {
    'Add Job Ads': props<{ jobAdsId: number }>(),
    'Remove Job Ads': props<{ jobAdsId: number }>(),
  },
});

export const JobAdsApiActions = createActionGroup({
  source: 'JobAds API',
  events: {
    'Load ': props<any>(),
    'Load Success': props<{ data: Array<JobAdDto> }>(),
    'Load Failure': props<{ error: any }>(),
    'Retrieved JobAd List': props<{ jobAds: Array<JobAdDto> }>(),
  },
});

export const JobAdsApiActionsUpdate = createActionGroup({
  source: 'JobAds API Update',
  events: {
    'Load Update': props<{ data: JobAdDto }>(),
    'Load Success Update': props<{ updateData: JobAdDto }>(),
    'Load Failure Update': props<{ error: any }>()
  },
});

export const JobAdsApiActionsCreate = createActionGroup({
  source: 'JobAds API Create',
  events: {
    'Load Create': props<{ newData: JobAdDto }>(),
    'Load Success Create': props<{ newData: JobAdDto }>(),
    'Load Failure Create': props<{ error: any }>()
  },
});

export const JobAdsApiActionsRemove = createActionGroup({
  source: 'JobAds API Create',
  events: {
    'Load Remove': props<{ removeData: JobAdDto }>(),
    'Load Success Remove': props<{ removeData: JobAdDto }>(),
    'Load Failure Remove': props<{ error: any }>()
  },
});

export const InvoiceApiActionsRemove = createActionGroup({
  source: 'Invoice API Create',
  events: {
    'Load Create Invoice': props<{ invoiceData: InvoiceDto }>(),
    'Load Success Create Invoice': props<{ invoiceData: InvoiceDto }>(),
    'Load Failure Create Invoice': props<{ error: any }>()
  },
});