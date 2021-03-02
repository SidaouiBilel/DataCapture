import { AppInitService } from './app.init';
// import { AutomaticModule } from './datacapture/pages/automatic-upload/automatic.module';
// import { UsersModule } from './datacapture/pages/users/users.module';
// import { AdminModule } from './datacapture/pages/admin/admin.module';
// import { UploadModule } from './datacapture/pages/upload/upload.module';
import { ErrorHandler, NgModule, Injector, APP_INITIALIZER } from '@angular/core';
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
// import { DataCaptureModule} from '@app/datacapture/datacapture.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { RolesGuard } from './core/login/guards/roles.guard';
// import { AppErrorHandler } from './core/error-handler/app-error-handler.service';
import {createCustomElement } from '@angular/elements';
registerLocaleData(en);
// This is used to configure the placement of the snackbars
const ngZorroConfig: NzConfig = {
  // message: { nzTop: 20 },
  // notification: { nzTop: 20 }
};

export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  // Angular
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,

    
    // DataCaptureModule,
    // AdminModule,
    // UploadModule,
    // UsersModule,
    // AutomaticModule,


    // Core & Shared
    CoreModule,
    SharedModule,

    // DevTools
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // DataCaptureModule
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    RolesGuard
  ],
  bootstrap: [],
  entryComponents:[AppComponent]
})
export class AppModule {
  constructor(private injector:Injector){}

  ngDoBootstrap() {
    if (!customElements.get('data-app')) {  
      const myCustomElement = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define('data-app', myCustomElement);
    }
    
  }
 }
