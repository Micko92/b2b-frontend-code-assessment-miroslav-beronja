

import { State, createReducer, on } from '@ngrx/store';

import { InvoiceDto, JobAd, JobAdDto } from '../job-ads/job-ads.model';
import { 
  JobAdsApiActions,
  JobAdsApiActionsUpdate,
  JobAdsApiActionsCreate,
  JobAdsApiActionsRemove,
  InvoiceApiActionsRemove
} from './job-ads.actions';

export const initialState: ReadonlyArray<JobAd> = [];

export const jobAdsReducer = createReducer(
  initialState,
  on(JobAdsApiActions.retrievedJobAdList, (_state, { jobAds }) => jobAds)
);

export interface StateV2 {
  data: any;
  loading: boolean;
  error: any;
}

export const initialStateV2: StateV2 = {
  data: null,
  loading: false,
  error: null
}

export const jobAdsReducerV2 = createReducer(
  initialStateV2,
  on(JobAdsApiActions.load, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(JobAdsApiActions.loadSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
    error: null
  })),
  on(JobAdsApiActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(JobAdsApiActionsUpdate.loadUpdate, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(JobAdsApiActionsUpdate.loadSuccessUpdate, (state, { updateData }) => ({
    ...state,
    loading: false,
    data: state.data.map((item: JobAdDto) => {
      const { id } = item;
      const { id: idUpdateData} = updateData;

      return id === idUpdateData ? updateData : item;
    }),
    error: null
  })),
  on(JobAdsApiActionsUpdate.loadFailureUpdate, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(JobAdsApiActionsCreate.loadCreate, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(JobAdsApiActionsCreate.loadSuccessCreate, (state, { newData }) => ({
    ...state,
    loading: false,
    data: [...state.data, newData],
    error: null
  })),
  on(JobAdsApiActionsCreate.loadFailureCreate, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(JobAdsApiActionsRemove.loadRemove, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(JobAdsApiActionsRemove.loadSuccessRemove, (state, { removeData }) => ({
    ...state,
    loading: false,
    data: state.data.filter((item: JobAdDto) => item.id !== removeData.id),
    error: null
  })),
  on(JobAdsApiActionsRemove.loadFailureRemove, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  

  on(InvoiceApiActionsRemove.loadCreateInvoice, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceApiActionsRemove.loadSuccessCreateInvoice, (state, { invoiceData }) => ({
    ...state,
    loading: false,
    data: state.data.map((item: JobAdDto) => {
      const { id } = item;
      const { jobId } = invoiceData;

      
      let newIOtem = item
      if (id === jobId ) {
        newIOtem = {
          ...item,
          invoices: [
            {
              ...invoiceData
            }
          ]
        }
      } 

      return id === jobId ? newIOtem : item;
    }),
    error: null
  })),
  on(InvoiceApiActionsRemove.loadFailureCreateInvoice, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

 