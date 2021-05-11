import { createSelector } from '@ngrx/store';
import { selectManualJob } from '../manual.selectors';
import { ImportState } from '../reducers/import.reducer';
import { ManualJobState } from '../reducers/job.reducer';



export const selectWorkbookId = createSelector(
  selectManualJob,
  (object: ManualJobState) => object.workbook_id
);

export const selectWorkbookSheets = createSelector(
  selectManualJob,
  (object: ManualJobState) => object.generated_workbook || []
);

export const selectWorkbookSheetByIndex = (index) => createSelector(
  selectWorkbookSheets,
  (object) => object[index]
);

export const selectWorkbookSheetBySheetId = (sheet_id) => createSelector(
  selectWorkbookSheets,
  (object) => object.find((s)=>s.id==sheet_id)
);


