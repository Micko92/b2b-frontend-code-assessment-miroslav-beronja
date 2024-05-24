import { createReducer, on } from '@ngrx/store';
import { JobAdsActions } from './job-ads.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  // on(JobAdsActions.removeJobAds, (state, { jobAdsId }) =>
  //   state.filter((id: any) => id !== jobAdsId)
  // ),
  // on(JobAdsActions.addJobAds, (state, { jobAdsId }) => {
  //   if (state.indexOf(jobAdsId) > -1) return state;

  //   return [...state, jobAdsId];
  // })
);