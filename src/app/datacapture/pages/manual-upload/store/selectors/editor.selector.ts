import { createSelector } from "@ngrx/store";
import { ManualState, selectManual } from "../manual.state";
import { EditorState } from "../reducers/editor.reducer";
import { selectImportedSheetByIndex } from "./import.selectors";
import { selectWorkbookSheetByIndex, selectWorkbookSheetResults } from "./job.selectors";


export const selectEditorSheet = (index, target:boolean = false) => createSelector(
    selectImportedSheetByIndex(index),
    selectWorkbookSheetByIndex(index),
    (impoted, generated) => (target && generated)?generated:impoted
  );
  

export const selectEditorSheetResults = (index) => createSelector(
  selectEditorSheet(index, true),
  selectWorkbookSheetResults,
  (sheet, results) => {

    return results.find(res=>res.result_id==sheet.result_id)
  }
);

export const selectEditor = createSelector(
  selectManual,
  (object: ManualState) => object.editor
);

export const selectIsErrorActive = createSelector(
  selectEditor,
  (object: EditorState) => object.filter.control.error
);