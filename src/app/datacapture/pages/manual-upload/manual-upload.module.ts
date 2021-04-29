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
import { TransformationEditorComponent } from './componenets/transformation/transformation-editor/transformation-editor.component';
import { FEATURE_NAME, manualReducers } from './store/manual.state';
import { StoreModule } from '@ngrx/store';
import { ImportDatasourceModalComponent } from './modals/import-datasource-modal/import-datasource-modal.component';
import { NewCalculatorModalComponent } from './componenets/transformation/transformations/trasnformation-intefrace/nodes/new-calculator/new-calculator-modal/new-calculator-modal.component';
import { NewCalculatorComponent } from './componenets/transformation/transformations/trasnformation-intefrace/nodes/new-calculator/new-calculator.component';
import { TransformationNodeComponent } from './componenets/transformation/transformation-node/transformation-node.component';
import { TransformationInterfaceComponent } from './componenets/transformation/transformations/trasnformation-intefrace/transformation-interface.component';


@NgModule({
  declarations: [ImportComponent, TransformComponent, ReportComponent, ControlComponent, NavigatorComponent,
     ContainerComponent, SheetSelectorComponent, DefaultToolbarComponent, TransformationEditorComponent,
     ImportDatasourceModalComponent, NewCalculatorModalComponent, NewCalculatorComponent, TransformationNodeComponent,
     TransformationInterfaceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManualUploadRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, manualReducers),
  ],
  entryComponents:[ImportDatasourceModalComponent, NewCalculatorModalComponent, TransformationInterfaceComponent]
})
export class ManualUploadModule { }
