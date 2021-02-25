import { selectRefreshToken } from './../auth/auth.selectors';
import { LoginService } from '@app/core/login/service/login.service';
import {Injectable, Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InterceptedHttpError } from './intercepted-error.model';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { ActionAuthLogout  , ActionRefreshToken} from '../auth/auth.actions';
/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class HttpErrorHandler implements HttpInterceptor {
    
  refreshToken = null;
  constructor(public injector: Injector , private store : Store<AppState> , private LoginS : LoginService ) {
    this.store.select(selectRefreshToken).subscribe((res: string) => {this.refreshToken = res; });
  }

  isRefreshing = false;
  RefreshToken$ : BehaviorSubject<any> = new BehaviorSubject<any>(null);
 
  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {

        let title = 'Server Error'
        let func = 'error'
        let displayMessage = 'An error occurred. ';
        // console.log(error);

        try {
          if(error['error'] && error['error'].message) {
            displayMessage = error['error'].message;
            func = 'warning'
            if (error.status == 409){
              title = 'Conflict'
            } 
            if (error.status == 407){
              title = 'Unauthorized'
            }
            if(error.status === 401){
              title = 'Unauthorized';
              if(this.refreshToken){
                  return this.handle401Error(req , next);
              }else{
                  console.log("logout 1")
                  this.store.dispatch(new ActionAuthLogout());
              }
              
            }
          }
        } catch (error) {
          displayMessage = 'Error Handeling Error'
        }

        this.injector.get(NzNotificationService)[func](title, displayMessage, {nzDuration: 3000, nzAnimate: true});
        return throwError(new InterceptedHttpError());


      })
    )
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) :Observable<HttpEvent<any>>{
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.RefreshToken$.next(null);
  
      return this.LoginS.refreshingToken(this.refreshToken).pipe(
        switchMap((data :any) => {
          if(data.token && data.refresh_token){
            this.isRefreshing = false;
            this.RefreshToken$.next(data.token);
            this.store.dispatch(new ActionRefreshToken({token: data.token , refreshToken: data.refresh_token}));

            let newreq = this.addToken(request , data.token);
            return next.handle(newreq);            
          }else{
            console.log("logout");
            this.store.dispatch(new ActionAuthLogout());
            return throwError(new InterceptedHttpError());
          }
        }),
        catchError(er=>{
          this.store.dispatch(new ActionAuthLogout());
          return throwError(new InterceptedHttpError());
        }));
  
    } else {
      return this.RefreshToken$.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          let newreq = this.addToken(request , token);
          return next.handle(newreq)
        }));
    }
  }

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }
}