import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { ActionImportReset, ImportActionTypes, ActionSaveFile } from './../actions/import.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';

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
      this.router.navigate(['/datacapture/upload/import']);
    })
  );

  @Effect({ dispatch: false})
  onSave = this.actions$.pipe(
    ofType<ActionSaveFile>(ImportActionTypes.SAVE_FILE),
    map((action) => {
      this.service.getFileMetaData(action.payload).subscribe((res) => {
        console.log(res);
      });
    })
  )
}
