import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { ActionImportReset, ImportActionTypes, ActionSaveFile } from './../actions/import.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import { SaveMappedSources } from '../actions/mapping.actions';
import { ResetTransformation } from '../../components/transformation/store/transformation.actions';
import { PreviewActionTypes, ActionSelectSheet } from '../actions/preview.actions';
import { selectFileData } from '../selectors/import.selectors';

@Injectable()
export class ImportEffects {

  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private store$: Store<AppState>,
    private service: FileImportService,
    private notif: NotificationService
  ) {}

  @Effect({ dispatch: false })
  onReset = this.actions$.pipe(
    ofType<ActionImportReset>(ImportActionTypes.RESET),
    // withLatestFrom(this.store$.select( selectSelectedFile )),
    map((action) => {
      this.store$.dispatch(new ResetTransformation());
      this.router.navigate(['/datacapture/upload/import']);
    })
  );

  @Effect({ dispatch: false})
  onSave = this.actions$.pipe(
    ofType<ActionSelectSheet>(PreviewActionTypes.SelectSheet),
    withLatestFrom(this.store$.select( selectFileData )),
    map(([sheet, file]) => {
      const sheetId = String(Object.values(file.metaData.worksheets_map)[sheet.payload]);
      this.service.getFileData(1, sheetId, 0).subscribe((res) => {
        const mappingSources = {};
        res.headers.forEach((e) => { mappingSources[e] = false; });
        this.store$.dispatch(new SaveMappedSources(mappingSources));
        this.store$.dispatch(new ActionSaveFile({...file, data: [], headers: res.headers}));
      });
    })
  );
}
