import { createSelector } from '@ngrx/store';
import { selectManualJob } from '../manual.selectors';
import { ImportState } from '../reducers/import.reducer';
import { ManualJobState } from '../reducers/job.reducer';


export const selectGeneratedSheets = createSelector(
  selectManualJob,
  (object: ManualJobState) => object.generated_workbook
);
