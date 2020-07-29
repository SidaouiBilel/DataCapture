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
import { MappingService } from './services/mapping.service';
import { NgDragDropModule } from 'ng-drag-drop';
import { DndModule } from 'ngx-drag-drop';
import { CleansingService } from './services/cleansing.service';
import { TransformationPipeComponent } from './components/transformation/transformation-pipe/transformation-pipe.component';
import { TransformationNodeComponent } from './components/transformation/transformation-node/transformation-node.component';
import { TransformationInterfaceComponent } from './components/transformation/transformations/transformation-interface/transformation-interface.component';
import { FormatterComponent } from './components/transformation/transformations/transformation-interface/format/formatter/formatter.component';
import { ColumnsInputComponent } from './components/transformation/shared/columns-input/columns-input.component';

const components = [
  UploadComponentComponent,
  StepperComponent,
  ImportComponent,
  MappingComponent,
  CleansingComponent,
  PreviewComponent,
  UploadComponent,
  TransformationPipeComponent,
  TransformationNodeComponent, 
  TransformationInterfaceComponent,
  FormatterComponent
];

@NgModule({
  imports: [
    UploadRoutingModule,
    SharedModule,
    StoreModule.forFeature('upload', uploadReducers),
    EffectsModule.forFeature([ImportEffects]),
    // Drag and Drop
    DndModule,
    NgDragDropModule.forRoot(),
  ],
  declarations: [...components, ColumnsInputComponent],
  exports: [
  ],
  providers : [
    FileImportService,
    MappingService,
    CleansingService
  ],
  entryComponents: [
    TransformationPipeComponent, TransformationInterfaceComponent, FormatterComponent
  ]
})
export class UploadModule {}
