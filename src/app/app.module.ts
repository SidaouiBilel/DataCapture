import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataCaptureModule} from '@app/datacapture/datacapture.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './datacapture/pages/login/container/login.component';
import { LoginFormComponent } from './datacapture/pages/login/components/login-form/login-form.component';
import { LoginService } from './datacapture/pages/login/service/login.service';
import { LoginGuard } from './datacapture/pages/login/login.guard';

registerLocaleData(en);
// This is used to configure the placement of the snackbars
const ngZorroConfig: NzConfig = {
  // message: { nzTop: 20 },
  // notification: { nzTop: 20 }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
  // Angular
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // DevTools
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    DataCaptureModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    LoginService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
