import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes
} from './auth.actions';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() =>
      setTimeout(() => {
        this.router.navigate(['/data/datacapture/dashboard']);
      }, 0)
    )
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      if(window["logout"]){
        window["logout"]();
      }else{
        this.router.navigate(['/data/login']);
      }
      
    })
  );
}
