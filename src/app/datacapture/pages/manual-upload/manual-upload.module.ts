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
import { DefaultToolbarComponent } from './componenets/toolbars/default-toolbar/default-toolbar.component';
import { TransformationEditorComponent } from './componenets/operations/operation-editor/transformation-editor.component';
import { FEATURE_NAME, manualReducers } from './store/manual.state';
import { StoreModule } from '@ngrx/store';
import { ImportDatasourceModalComponent } from './modals/import-datasource-modal/import-datasource-modal.component';
import { NewCalculatorModalComponent } from './componenets/operations/operations-node/transformations/new-calculator/new-calculator-modal/new-calculator-modal.component';
import { NewCalculatorComponent } from './componenets/operations/operations-node/transformations/new-calculator/new-calculator.component';
import { TransformationNodeComponent } from './componenets/operations/operation-container/transformation-node.component';
import { FilterComponent } from './componenets/operations/operations-node/transformations/filter/filter.component';
import { MergerComponent } from './componenets/operations/operations-node/transformations/merger/merger.component';
import { JoinerComponent } from './componenets/operations/operations-node/transformations/joiner/joiner.component';
import { EffectsModule } from '@ngrx/effects';
import { ManualJobEffects } from './store/effects/job.effect';
import { PycodeComponent } from './componenets/operations/operations-node/transformations/pycode/pycode.component';
import { OperationComponent } from './componenets/operations/operations-node/operation.component';
import { LimitCheckComponent } from './componenets/operations/operations-node/checks/limit-check/limit-check.component';
import { OverviewComponent } from './componenets/overview/overview.component';
import { TransformToolbarComponent } from './componenets/toolbars/transform-toolbar/transform-toolbar.component';
import { ControlToolbarComponent } from './componenets/toolbars/control-toolbar/control-toolbar.component';
import { FormatterComponent } from './componenets/operations/operations-node/transformations/formatter/formatter.component';
import { FindAndReplaceComponent } from './componenets/operations/operations-node/transformations/find-and-replace/find-and-replace.component';
import { SplitterComponent } from './componenets/operations/operations-node/transformations/splitter/splitter.component';
import { DeleteRowsComponent } from './componenets/operations/operations-node/transformations/delete-rows/delete-rows.component';
import { DateFormatterComponent } from './componenets/operations/operations-node/transformations/date-formatter/date-formatter.component';


@NgModule({
  declarations: [ImportComponent, TransformComponent, ReportComponent, ControlComponent, NavigatorComponent,
    ContainerComponent, SheetSelectorComponent, DefaultToolbarComponent, TransformationEditorComponent,
    ImportDatasourceModalComponent, NewCalculatorModalComponent, NewCalculatorComponent, TransformationNodeComponent,
    OperationComponent,
    FilterComponent,
    MergerComponent,
    JoinerComponent,
    PycodeComponent,
    LimitCheckComponent,
    OverviewComponent,
    TransformToolbarComponent,
    ControlToolbarComponent,
    FormatterComponent,
    FindAndReplaceComponent,
    SplitterComponent,
    DeleteRowsComponent,
    DateFormatterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManualUploadRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, manualReducers),
    EffectsModule.forFeature([ManualJobEffects])
  ],
  entryComponents: [ImportDatasourceModalComponent, NewCalculatorModalComponent, OperationComponent]
})
export class ManualUploadModule { }
