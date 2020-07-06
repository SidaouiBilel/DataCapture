import {Injectable, ErrorHandler, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(public injector: Injector) {
    super();
  }

  handleError = (error: Error | HttpErrorResponse) => {
    try {
      let displayMessage = 'An error occurred. ';
      if (!environment.production) {
        displayMessage += error.message;
      }
      /*
      This will create NzNotificationService Property
       */
      this.injector.get(NzNotificationService).error('Error', displayMessage, {nzDuration: 3000, nzAnimate: true});
      super.handleError(error);
    } catch (error) {
      console.log('Error', error.message);
    }
  }
}
