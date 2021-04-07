import {Injectable, ErrorHandler, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InterceptedHttpError } from './intercepted-error.model';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(public injector: Injector) {
    super();
  }

  handleError(error: Error){
    
    try {

      if(error instanceof InterceptedHttpError)
        return

      let displayMessage = 'An error occurred. ';

      if (!environment.production) {
        displayMessage += error.message;
      }
      /*
      This will create NzNotificationService Property
       */
      if(environment.dk_data_displayed){
          this.injector.get(NzNotificationService).error('JavaScript Error', displayMessage, {nzDuration: 3000, nzAnimate: true});
      }
      
      super.handleError(error);
    } catch (error) {
      console.log('Error', error.message);
    }
  }
}
