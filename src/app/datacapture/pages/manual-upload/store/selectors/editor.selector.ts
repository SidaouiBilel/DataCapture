import { createSelector } from "@ngrx/store";
import { selectImportedSheetByIndex } from "./import.selectors";
import { selectWorkbookSheetByIndex, selectWorkbookSheetResults } from "./job.selectors";


export const selectEditorSheet = (index, target:boolean = false) => createSelector(
    selectImportedSheetByIndex(index),
    selectWorkbookSheetByIndex(index),
    (impoted, generated) => (target)?generated:impoted
  );
  

export const selectEditorSheetResults = (index) => createSelector(
  selectEditorSheet(index, true),
  selectWorkbookSheetResults,
  (sheet, results) => {
    console.log({sheet, results})
    return results.find(res=>res.result_id==sheet.result_id)
  }
);