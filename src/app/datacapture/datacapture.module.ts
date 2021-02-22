import { MappingEffects } from './pages/upload/store/effects/mapping.effect';
import { TransformationEffects } from './pages/upload/components/transformation/store/transformation.effect';
import { ImportEffects } from './pages/upload/store/effects/import.effect';
import { uploadReducers } from './pages/upload/store/upload.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { LayoutContainer } from './layout/container/layout.container';
import { DataCaptureRoutingModule } from './datacapture-routing.module';
import { SharedModule } from './../shared/shared.module';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { UserBarComponent } from './layout/components/user-bar/user-bar.component';
import {TemplateModule} from "./pages/template/template.module";

const components = [
  LayoutContainer,
  SidebarComponent,
  HeaderComponent,
  UserBarComponent
];

@NgModule({
  imports: [
    DataCaptureRoutingModule,
    SharedModule,
    TemplateModule,
    StoreModule.forFeature('upload', uploadReducers),
    EffectsModule.forFeature([ImportEffects, TransformationEffects, MappingEffects]),
  ],
  declarations: [...components ],
  exports: [
    LayoutContainer
  ],
  providers : [
  ],
  entryComponents: [
  ]
})
export class DataCaptureModule {}
