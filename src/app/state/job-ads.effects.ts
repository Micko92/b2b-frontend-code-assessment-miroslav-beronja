import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { InvoiceDto, JobAd, JobAdDto } from '../job-ads/job-ads.model';
import { JobAdsService } from '../core/services/job-ads.service';
import { 
  JobAdsApiActions,
  JobAdsApiActionsUpdate,
  JobAdsApiActionsCreate,
  JobAdsApiActionsRemove,
  InvoiceApiActionsRemove
} from './job-ads.actions';

const port = 'http://localhost:3000';


@Injectable()
export class ObjectEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private jobAdsService: JobAdsService,
  ) {}

  getJobAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobAdsApiActions.load),
      mergeMap(() => {
        // this.http.get<Array<JobAd>>(`${port}/jobs`).pipe(
        return this.jobAdsService.getJobAds().pipe(
          delay(1000),
          map((data: JobAdDto[]) => {
            
            return JobAdsApiActions.loadSuccess({ data })
          }),
          catchError((error: { message: string }) => 
            of(JobAdsApiActions.loadFailure({ error: error.message }))
          )
        )
      })
    )
  );

  updateJobAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobAdsApiActionsUpdate.loadUpdate),
      mergeMap(({data}) => {
        const { id = '' } = data as JobAdDto;
        return this.jobAdsService.changeJobAd(id, data as JobAdDto)
          .pipe(
            delay(1000),
            mergeMap((data: any) => this.jobAdsService.getJobAd(data.id)),
            map((data: JobAdDto) => {
              
              return JobAdsApiActionsUpdate.loadSuccessUpdate({ updateData: data })
            }),
            catchError((error: { message: string }) => 
              of(JobAdsApiActionsUpdate.loadFailureUpdate({ error: error.message }))
            )
          )
      })
    )
  );

  createJobAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobAdsApiActionsCreate.loadCreate),
      mergeMap(({newData}) => {
        return this.jobAdsService.createJobAd(newData)
          .pipe(
            delay(1000),
            map((data: JobAdDto) => {
              
              return JobAdsApiActionsCreate.loadSuccessCreate({ newData: {...data, invoices: []}})
            }),
            catchError((error: { message: string }) => 
              of(JobAdsApiActionsCreate.loadFailureCreate({ error: error.message }))
            )
          )
      })
    )
  );

  removeJobAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobAdsApiActionsRemove.loadRemove),
      mergeMap(({removeData}) => {
        return this.jobAdsService.removeJodAdAndInvoices(removeData.id || '', '')
          .pipe(
            delay(1000),
            map((data: JobAdDto) => {
              
              return JobAdsApiActionsRemove.loadSuccessRemove({ removeData: removeData })
            }),
            catchError((error: { message: string }) => 
              of(JobAdsApiActionsRemove.loadFailureRemove({ error: error.message }))
            )
          )
      })
    )
  );

  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceApiActionsRemove.loadCreateInvoice),
      mergeMap(({invoiceData}) => {
        return this.jobAdsService.createInvoice(invoiceData)
          .pipe(
            delay(1000),
            map((data: InvoiceDto) => {
              
              return InvoiceApiActionsRemove.loadSuccessCreateInvoice({ invoiceData: data })
            }),
            catchError((error: { message: string }) => 
              of(InvoiceApiActionsRemove.loadFailureCreateInvoice({ error: error.message }))
            )
          )
      })
    )
  );

}