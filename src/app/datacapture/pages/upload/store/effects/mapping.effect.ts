import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { SaveMappedSources } from '../actions/mapping.actions';
import { UpdateTransformationHeaders, TransformationActionTypes } from '../../components/transformation/store/transformation.actions';
import { selectHeadersToMap } from '../selectors/preview.selectors';
import { MultiImportActionTypes } from '../actions/multi-import.actions';

@Injectable()
export class MappingEffects {

  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>) {}

  @Effect({ dispatch: false})
  onHeadersChange = this.actions$.pipe(
    ofType<UpdateTransformationHeaders>(
      TransformationActionTypes.UPDATE_TRANSFORMATION_HEADERS, 
      TransformationActionTypes.REMOVE_TRANSFORMATION_SOURCE, 
      TransformationActionTypes.SELECT_ACTIVE_SHEET, 
      MultiImportActionTypes.UPDATE_SOURCE,
      ),
    withLatestFrom(this.store$.select( selectHeadersToMap )),
    map(([action, headers]) => {
      const mappingSources = {};
        console.log({headers})
        headers.forEach((e) => {mappingSources[e] = false; });
        this.store$.dispatch(new SaveMappedSources(mappingSources));
    })
  );
}
