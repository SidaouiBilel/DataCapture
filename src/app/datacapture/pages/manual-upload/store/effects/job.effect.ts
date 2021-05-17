import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ManualJobActionTypes, ManualJobSetWorkbookData } from '../actions/job.actions';
import { WorkbookService } from '../../services/workbook.service';
import { selectImportedSheets } from '../selectors/import.selectors';
import { selectManual } from '../manual.state';
import { selectTransformationNodes } from '../selectors/transformation.selectors';
import { of } from 'rxjs';
import { ManualJobLoadWorkbook } from '../actions/job.actions';

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
    withLatestFrom(this.store$.select( selectImportedSheets ), this.store$.select( selectTransformationNodes )),
    tap((res)=>{console.log('store', res)}),
    switchMap(([action, sheets, transformations])=>this.wb.run(sheets, transformations)),
    catchError((e)=> {this.notif.error(e); return of(null)}),
    map((workbook_id)=>{
      this.store$.dispatch(new ManualJobLoadWorkbook(workbook_id))
    }),
  );

  @Effect({ dispatch: false })
  onLoad = this.actions$.pipe(
    ofType(ManualJobActionTypes.LOAD),
    switchMap((action)=>this.wb.get(action['workbook_id'])),
    map((result:any) => {
      const {worksheets, transformations, results} = result
      this.store$.dispatch(new ManualJobSetWorkbookData( worksheets, transformations, results))
    })
  );

}


