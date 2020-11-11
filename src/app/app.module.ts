import { AutouploadModule } from './datacapture/pages/autoupload/autoupload.module';
import { ConnectorsModule } from './datacapture/pages/Connectors/connectors.module';
import { ExtractorsModule } from './datacapture/pages/Extractors/extractors.module';
import { UsersModule } from './datacapture/pages/users/users.module';
import { UploadModule } from './datacapture/pages/upload/upload.module';
import { AdminModule } from './datacapture/pages/admin/admin.module';
import { RouterModule } from '@angular/router';
import { NgModule, Injector } from '@angular/core';
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
import { RolesGuard } from './core/login/guards/roles.guard';
import {createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

registerLocaleData(en);
// This is used to configure the placement of the snackbars
const ngZorroConfig: NzConfig = {
  // message: { nzTop: 20 },
  // notification: { nzTop: 20 }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  // Angular
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    RouterModule,
    // Core & Shared
    CoreModule,
    SharedModule,
    BrowserModule,

    // DevTools
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    DataCaptureModule,
    AdminModule,
    UploadModule,
    UsersModule,
    // ExtractorsModule,
    ConnectorsModule,
    AutouploadModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    RolesGuard
  ],
  entryComponents:[AppComponent],
  bootstrap: []
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
