import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponentComponent } from './container/upload-component.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ImportComponent } from './components/import/import.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { CleansingComponent } from './components/cleansing/cleansing.component';
import { PreviewComponent } from './components/preview/preview.component';
import { UploadComponent } from './components/upload/upload.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { uploadReducers } from './store/upload.state';
import { ImportEffects } from './store/effects/import.effect';
import { FileImportService } from './services/file-import.service';


const components = [
  UploadComponentComponent,
  StepperComponent,
  ImportComponent,
  MappingComponent,
  CleansingComponent,
  PreviewComponent,
  UploadComponent
];

@NgModule({
  imports: [
    UploadRoutingModule,
    SharedModule,
    StoreModule.forFeature('upload', uploadReducers),
    EffectsModule.forFeature([ImportEffects])
  ],
  declarations: [...components],
  exports: [
  ],
  providers : [
    FileImportService
  ],
  entryComponents: [
  ]
})
export class UploadModule {}
