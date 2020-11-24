import {Injectable, ErrorHandler, Injector} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'util';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class HttpErrorHandler implements HttpInterceptor {
    
  constructor(public injector: Injector) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        let displayMessage = 'An error occurred. ';
        try {
          if(error['error'] && error['error'].message) {
            displayMessage = error['error'].message;
          }
        } catch (error) {
          displayMessage = 'Error Handeling Error'
        }

        this.injector.get(NzNotificationService).error('Server Error', displayMessage, {nzDuration: 3000, nzAnimate: true});
        // return throwError("HTTPError");
        return new BehaviorSubject(null);
      })
    )
  }
}