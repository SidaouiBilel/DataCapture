import { createSelector } from "@ngrx/store";
import { selectImportedSheetByIndex } from "./import.selectors";
import { selectWorkbookSheetByIndex } from "./job.selectors";


export const selectEditorSheet = (index, target:boolean = false) => createSelector(
    selectImportedSheetByIndex(index),
    selectWorkbookSheetByIndex(index),
    (impoted, generated) => (target)?generated:impoted
  );
  