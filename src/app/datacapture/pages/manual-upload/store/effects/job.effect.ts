import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ManualJobActionTypes } from '../actions/job.actions';
import { WorkbookService } from '../../services/workbook.service';
import { selectImportSheet } from '../selectors/import.selectors';
import { selectManual } from '../manual.state';
import { selectTransformationNodes } from '../selectors/transformation.selectors';
import { of } from 'rxjs';

@Injectable()
export class ManualJobEffects {

  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private store$: Store<AppState>,
    private notif: NotificationService,
    private wb: WorkbookService
  ) {}

  @Effect({ dispatch: false })
  onRun = this.actions$.pipe(
    ofType(ManualJobActionTypes.RUN),
    withLatestFrom(this.store$.select( selectImportSheet ), this.store$.select( selectTransformationNodes )),
    // withLatestFrom(this.store$.select( selectTransformationNodes )),
    tap((res)=>{console.log('store', res)}),
    switchMap(([action, sheets, transformations])=>this.wb.run(sheets, transformations)),
    map((workbook_id)=>{
      this.notif.success(String(workbook_id))
    }),
    catchError((e)=> {this.notif.error(e); return of(null)})
  );

  @Effect({ dispatch: false })
  onLoad = this.actions$.pipe(
    ofType(ManualJobActionTypes.LOAD),
    // withLatestFrom(this.store$.select( selectSelectedFile )),
    map((action) => {
      console.log('LOADING', action)

      // this.store$.dispatch(new ResetTransformation());
      // this.store$.dispatch(new ResetPreview());
      // this.router.navigate(['/datacapture/upload/import']);
    })
  );

}


