import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JobAd, JobAdDto } from '../job-ads/job-ads.model';
import { StateV2 } from './job-ads.reducer';

export const selectJobAd = createFeatureSelector<StateV2>('jobAds');

export const selectOneJobAd = (id: string) => createSelector(
  selectJobAd,
  (state: StateV2) => state.data.find((jobAd: JobAdDto) => {
    return jobAd.id === id
  })
);

export const selectJobAdList = createSelector(
  selectJobAd,
  (state: StateV2) => state.data
);

export const selectSearchLoading = createSelector(
  selectJobAd,
  (state: StateV2) => state.loading
);

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('collection');