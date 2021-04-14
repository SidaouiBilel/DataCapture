import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualUploadRoutingModule } from './manual-upload-routing.module';
import { ImportComponent } from './pages/import/import.component';
import { TransformComponent } from './pages/transform/transform.component';
import { ReportComponent } from './pages/report/report.component';
import { ControlComponent } from './pages/control/control.component';
import { NavigatorComponent } from './componenets/navigator/navigator.component';
import { ContainerComponent } from './pages/container/container.component';
import { SharedModule } from '@app/shared';
import { SheetSelectorComponent } from './componenets/sheet-selector/sheet-selector.component';
import { DefaultToolbarComponent } from './componenets/default-toolbar/default-toolbar.component';
import { TransformationEditorComponent } from './componenets/transformation-editor/transformation-editor.component';
import { ManualUploadReducer, FEATURE_NAME } from './store/manual.state';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [ImportComponent, TransformComponent, ReportComponent, ControlComponent, NavigatorComponent, ContainerComponent, SheetSelectorComponent, DefaultToolbarComponent, TransformationEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManualUploadRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, ManualUploadReducer),
  ]
})
export class ManualUploadModule { }
