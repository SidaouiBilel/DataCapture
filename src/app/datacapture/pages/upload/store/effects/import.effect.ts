import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { ActionImportReset, ImportActionTypes, ActionSaveFile } from './../actions/import.actions';
import { catchError, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import { SaveMappedSources } from '../actions/mapping.actions';
import { ResetTransformation } from '../../components/transformation/store/transformation.actions';
import { PreviewActionTypes, ActionSelectSheet, SaveTotal, ResetPreview } from '../actions/preview.actions';
import { selectColRange, selectFileData, selectRowRange } from '../selectors/import.selectors';
import { UpdateSheet } from './../actions/preview.actions';
import { Subject, timer } from 'rxjs';

@Injectable()
export class ImportEffects {
  status$: any;

  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private store$: Store<AppState>,
    private service: FileImportService,
    private notif: NotificationService
  ) { }

  @Effect({ dispatch: false })
  onReset = this.actions$.pipe(
    ofType<ActionImportReset>(ImportActionTypes.RESET),
    // withLatestFrom(this.store$.select( selectSelectedFile )),
    map((action) => {
      this.store$.dispatch(new ResetTransformation());
      this.store$.dispatch(new ResetPreview());
      this.router.navigate(['/data/datacapture/upload/import']);
    })

  );

  @Effect({ dispatch: false })
  onSave = this.actions$.pipe(
    ofType<ActionSelectSheet>(PreviewActionTypes.SelectSheet),
    withLatestFrom(this.store$.select(selectFileData)),
    withLatestFrom(this.store$.select(selectRowRange)),
    withLatestFrom(this.store$.select(selectColRange)),
    map(([[[sheet, file], rowRange], colRange]) => {
      const sheetId = String(file.metaData.worksheets[sheet.payload].sheetId);
      const x = this.notif.loading('Preparing the dataset...');
      // Generate the sheets and get the jobId as a response
      this.service.generateSheet(file.metaData.file_id, sheetId, colRange[0], colRange[1], rowRange[0], rowRange[1])
        .subscribe((jobId: any) => {
          // Check job status and quit if its DONE or ERROR
          this.status$ = this.service.checkJobStatus(jobId).subscribe((job) => {
            if (['ERROR', 'DONE'].includes(job.job_status)) {
              if (this.status$) { this.status$.unsubscribe()}
              // Get the sheet after the status is DONE
              this.store$.dispatch(new UpdateSheet(job.result.sheet_id));
              this.store$.dispatch(new SaveTotal(job.result.total));
              this.notif.close(x);
              // this.notif.success('The dataset is ready.');
              const y = this.notif.loading('Processing the dataset...');
              this.service.getFileData(1, job.result.sheet_id, 0).subscribe((data) => {
                const mappingSources = {};
                data.headers.forEach((e) => { mappingSources[e] = false; });
                this.store$.dispatch(new SaveMappedSources(mappingSources));
                this.store$.dispatch(new ActionSaveFile({ ...file, data: [], headers: data.headers }));
                this.notif.close(y);
                this.notif.success(`Dataset <i>${job.result.sheetName}</i> is ready.`);
              })
            }
          });
        }, (err) => {
          this.notif.close(x);
        });
    })
  );
}