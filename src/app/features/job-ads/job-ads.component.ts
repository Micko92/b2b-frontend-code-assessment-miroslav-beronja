import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, from, map, mergeMap, of, pipe, reduce, switchMap, timer, toArray, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { JobAdsService } from 'src/app/core/services/job-ads.service';
import { Invoice, InvoiceDto, JobAd, JobAdDto } from 'src/app/job-ads/job-ads.model';
import { selectJobAdList, selectOneJobAd, selectSearchLoading } from 'src/app/state/job-ads.selectors';
import { 
  JobAdsApiActions,
  JobAdsApiActionsUpdate,
  JobAdsApiActionsCreate,
  JobAdsApiActionsRemove,
  InvoiceApiActionsRemove
} from 'src/app/state/job-ads.actions';
import { DialogJobAdsCreateNewComponent } from './dialog-job-ads-create-new/dialog-job-ads-create-new.component';
import * as moment from 'moment';

@Component({
  selector: 'app-job-ads',
  templateUrl: './job-ads.component.html',
  styleUrls: ['./job-ads.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JobAdsComponent implements OnInit {
  // jobAds$ = this.store.select(selectJobAd);
  loadingJobAds$ = this.store.select(selectSearchLoading);
  subjectGlobalSearch = new Subject();
  showSearchLoader = false;
  mode = 'determinate' as any;
  value = 50;

  dataSource: JobAd[] = [];
  columnsToDisplay = ['title', 'description', 'skills', 'status'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay, 'button'];
  expandedElement: any | null;
  showLoader = true;
  search = '';
  amount = '';
  disableAmountButton = true;

  constructor(
    public dialog: MatDialog,
    private jobAdsService: JobAdsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(JobAdsApiActions.load());
    this.store.select(selectSearchLoading);
    
    this.store.select(selectSearchLoading)
      .subscribe(loader => {
        this.showLoader = loader;
      })

    this.store.select(selectJobAdList)
      .pipe(
        // mergeMap(data => {
        //   return from(data ? data : [])
        //     .pipe(
        //       mergeMap((data: any) => of(data)),
        //       map(data => {
        //         // data['_embedded'] = 'exist buttons';

        //         return data;
        //       }),
        //       toArray(),
        //     )
        // }),
      )
      .subscribe(dataTable => {
        this.dataSource = dataTable ? [...dataTable] : [];
      })

    this.subjectGlobalSearch.pipe(
      filter((query: any) => {
        const { text } = query;

        return text.length >= 3 || text.length === 0
      }),
      map((data) => {
        this.showLoader = true;

        return data;
      }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: any) => {
        const { text } = query;

        //I use this method because I can not find how json-serve search for certain params
        //I had an idea to use search like 'or' not like 'and'
        return zip( 
          this.jobAdsService.searchJobAd('title', text),
          this.jobAdsService.searchJobAd('description', text),
          this.jobAdsService.searchJobAd('skills', text),
          this.jobAdsService.searchJobAd('status', text)
        ).pipe(
          map(([titleData, descriptionData, skillsData, statusData]) => {
            return [...titleData, ...descriptionData, ...skillsData, ...statusData]
          }),
          mergeMap(data => data),
          reduce((acc: any, item: any) => {
            acc[item.id] = item;
            return acc;
          }, {}),
          toArray(),
          map(data => {
            return Object.values(data[0]) as JobAd[]
          })
        )
      })
    ).subscribe((response: JobAd[]) => {
      this.dataSource = response;
      this.showLoader = false; 
    });
  }

  expandColapse() {
    this.amount = '';
    this.disableAmountButton = true;
  }

  searchJobAd() {
    this.subjectGlobalSearch.next({text: this.search});
  }

  openDialog(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const data: JobAd = {
      id: '',
      title: '',
      description: '',
      skills: [],
      status: 'draft'
    }

    const dialogRef = this.dialog.open(DialogJobAdsCreateNewComponent, {
      data: {
        typeOfEvent: 'create',
        values: data
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const { data } = result;

      const newDate = new Date();
      const localMoment = moment(newDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
      const utcDate = localMoment.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

      const body: JobAdDto = {
        ...data,
        updatedAt: utcDate,
        createdAt: utcDate,
      }

      this.store.dispatch(JobAdsApiActionsCreate.loadCreate({newData: body}));

    });
  }

  globalSearch(event: any) {
    const { value } = event.target;

    this.subjectGlobalSearch.next({text: value});
  }

  editJobAd(event: MouseEvent, dataJodAd: JobAdDto) {
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(DialogJobAdsCreateNewComponent, {
      data: {
        typeOfEvent: 'edit',
        values: dataJodAd
      },
      width: '400px'
    });

    const { id = '' } = dataJodAd;
    dialogRef.afterClosed()
      .pipe(
        mergeMap(data => {

          return zip(
            of(data),
            this.store.pipe(select(selectOneJobAd(id)))
          ).pipe(
            map(([fromEventData, fromStoreData]) => {
              return {
                fromEvent: fromEventData,
                fromStore: fromStoreData
              }
            }),
          )
        })

      )
      .subscribe((response: any) => {
        const { fromEvent, fromStore } = response;
        const { data } = fromEvent;
        const { createdAt } = fromStore; 

        const newDate = new Date();
        const localMoment = moment(newDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
        const utcDate = localMoment.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        const body = {
          ...data,
          updatedAt: utcDate,
          createdAt: createdAt,
        } as JobAdDto

        this.store.dispatch(JobAdsApiActionsUpdate.loadUpdate({data: body}));
    });
  }

  removeJobAd(event: MouseEvent, data: JobAdDto) {
    event.preventDefault();
    event.stopPropagation();

    this.store.dispatch(JobAdsApiActionsRemove.loadRemove({removeData: data}));
  }

  addNewInvoice(event: MouseEvent, data: any) {

    const newDate = new Date();
    const localMoment = moment(newDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
    const utcDate = localMoment.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

    const newDueDate = new Date();
    newDueDate.setMonth(newDueDate.getMonth() + 1);
    newDueDate.setDate(newDueDate.getDate() + 15);
    const localMomentDueDate = moment(new Date(newDueDate), 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
    const utcDueDate = localMomentDueDate.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

    const body: InvoiceDto = {
      id: '',
      jobId: data.id,
      amount: this.amount, // up to you
      dueDate: utcDueDate,
      createdAt: utcDate,
      updatedAt: utcDate,
    }

    this.store.dispatch(InvoiceApiActionsRemove.loadCreateInvoice({invoiceData: body}))
  }

  ifPriceValidCurrency(value: any): boolean {

    if(typeof value === "string"){
      return !isNaN(value as any)
    } 

    return false;
  }

  checkValue() {
    this.disableAmountButton = !this.ifPriceValidCurrency(this.amount);
  }
}


