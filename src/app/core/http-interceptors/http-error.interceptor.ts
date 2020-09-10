import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../core.state';
import { Store } from '@ngrx/store';
import { selectToken } from '../auth/auth.selectors';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  token: string;
  token$: Observable<string>;
  constructor(private injector: Injector, private store: Store<AppState>) {
    this.token$ = this.store.select(selectToken);
    this.token$.subscribe((res) => {this.token = res; });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.get('skip')) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token
        }
      });
    }
    return next.handle(request).pipe(
      tap(null, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          const appErrorHandler = this.injector.get(ErrorHandler);
          appErrorHandler.handleError(err);
        }
      })
    );
  }
}
