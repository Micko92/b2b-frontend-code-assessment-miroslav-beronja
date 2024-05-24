import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PORT } from '../../../../constants';
import { Observable, from, map, mergeMap, of, toArray } from 'rxjs';
import { JobAd, JobAdDto, InvoiceDto } from 'src/app/job-ads/job-ads.model';

const port = PORT;

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {

  constructor(private http: HttpClient) { }

  getJobAds(): Observable<Array<JobAdDto>> {
    return this.http.get<Array<JobAdDto>>(`${port}/jobs?_embed=invoices`)
      .pipe(
        mergeMap(data => {
          return from(data ? data : [])
            .pipe(
              mergeMap((data: any) => of(data)),
              map((data: JobAdDto) => {

                return data;
              }),
              toArray(),
            )
        }),
        map((jobAds: JobAdDto[]) => jobAds)
      );
  }

  getJobAd(id: string): Observable<JobAdDto> {
    return this.http.get<JobAdDto>(`${port}/jobs/${id}?_embed=invoices`)
      .pipe(map((jobAds: JobAdDto) => jobAds));
  }

  changeJobAd(id: string, body: JobAdDto): Observable<JobAdDto> {
    return this.http.put<JobAdDto>(`${port}/jobs/${id}`, {
      ...body
    })
  }

  createJobAd(body: JobAdDto): Observable<JobAdDto> {
    return this.http.post<JobAdDto>(`${port}/jobs`, {
      ...body
    })
  }

  searchJobAd(prop = '', searchText = ''): Observable<Array<JobAdDto>> {
    return this.http.get<Array<JobAdDto>>(`${port}/jobs?${prop}_like=${searchText}`)
      .pipe(map((jobAds: JobAdDto[]) => jobAds));
  }

  removeJodAdAndInvoices(id: string, idInvoices: string) {
    return this.http.delete<JobAdDto>(`${port}/jobs/${id}?_embed=invoices`)
      .pipe(map((jobAds: JobAdDto) => jobAds));
  }

  createInvoice(body: any) {
    return this.http.post<InvoiceDto>(`${port}/invoices`, {
      ...body
    })
  }

}
