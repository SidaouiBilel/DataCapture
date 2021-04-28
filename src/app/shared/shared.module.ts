import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '@app/icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTagModule, NgZorroAntdModule, NzIconService, NzModalModule } from 'ng-zorro-antd';
import { PageHeaderComponent } from './page-header/page-header.component';
import { UtilsService } from './services/utils.service';
import { BoolIconComponent } from './bool-icon/bool-icon.component';
import { NsAutoHeightTableDirective } from './directives/auto-table-height.directive';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { EnvTagComponent } from './env-tag/env-tag.component';
import { AuditComponent } from './audit/audit.component';
import { RegexHelperTriggerComponent } from './regex-helper/regex-helper-trigger/regex-helper-trigger.component';
import { RegexHelperDocumentationComponent } from './regex-helper/regex-helper-documentation/regex-helper-documentation.component';
import { KeyFilterPipe } from './pipes/key-filter.pipe';
import { CustomIconsService } from './services/custom-icons.service';
import { GridFooterComponent } from './grid-footer/grid-footer.component';
import { TagsCellRendererComponent } from './tags-cell-renderer/tags-cell-renderer.component';
import { GridCellAutoTypeComponent } from './grid-cell-auto-type/grid-cell-auto-type.component';
import { DomainHierarchyComponent } from './domain-hierarchy/domain-hierarchy.component';
import { DomainBreadcrumbComponent } from './domain-breadcrumb/domain-breadcrumb.component';
import { ClearGridFilterComponent } from './clear-grid-filter/clear-grid-filter.component';
import { StorageAccountImportNodeComponent } from './setup/nodes/datasources/azure/storage-account/storage-account.component';
import { BaseNodeTransformationComponent } from './setup/nodes/transformations/base-node-transformation/base-node-transformation.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { NodePycodeComponent } from './setup/nodes/other/node-pycode/node-pycode.component';
import { MetaComponent } from '@app/datacapture/pages/admin/componenets/meta/meta.component';
import { SqlImportNodeComponent } from './setup/nodes/datasources/sql-import-node/sql-import-node.component';
import { SqlUploadNodeComponent } from './setup/nodes/datasinks/sql-upload-node/sql-upload-node.component';
import { StorageAccountUploadNodeComponent } from './setup/nodes/datasinks/storage-account-upload-node/storage-account-upload-node.component';
import { PostgresImportNodeComponent } from './setup/nodes/datasources/postgres-import-node/postgres-import-node.component';
import { PostgresUploadNodeComponent } from './setup/nodes/datasinks/postgres-upload-node/postgres-upload-node.component';
import { DcmPreviewGridComponent } from './dcm-preview-grid/dcm-preview-grid.component';
import { ConnectorPreviewComponent } from './connector-preview/connector-preview.component';
import { NodeFilterComponent } from './setup/nodes/transformations/node-filter-component/node-filter-component.component';
import { NodeFilterReplaceComponent } from './setup/nodes/transformations/node-filer-replace-component/node-filer-replace-component.component';
import { NodeMergeComponent } from './setup/nodes/transformations/node-merge-component/node-merge-component.component';
import { NodeReplaceComponent } from './setup/nodes/transformations/node-replace-component/node-replace-component.component';
import { NodeDeleteRowComponent } from './setup/nodes/transformations/node-delete-row-component/node-delete-row-component.component';
import { NodeDefaultComponent } from './setup/nodes/transformations/node-default-component/node-default-component.component';
import { NodeSplitterComponent } from './setup/nodes/transformations/node-splitter-component/node-splitter-component.component';
import { NodeCalculcatorComponent } from './setup/nodes/transformations/node-calculcator-component/node-calculcator-component.component';
import { NodeFormatDateComponent } from './setup/nodes/transformations/node-format-date-component/node-format-date-component.component';
import { NodeGroupbyComponent } from './setup/nodes/transformations/node-groupby-component/node-groupby-component.component';
import { NodeHashComponent } from './setup/nodes/transformations/node-hash-component/node-hash-component.component';
import { CollectionImportComponent } from './setup/nodes/datasources/collection-import/collection-import.component';
import { CollectionUploadComponent } from './setup/nodes/datasinks/collection-upload/collection-upload.component';
import { NodeJoinComponent } from './setup/nodes/other/node-join/node-join.component';
import { NodePipelineComponent } from './setup/nodes/other/node-pipeline/node-pipeline.component';
import { NodeTranformationService } from './setup/nodes/other/node-pipeline/service/node-transformation.service';
import { ManualImportNodeComponent } from './setup/nodes/datasources/manual-import-node/manual-import-node.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DcmCleansingGridComponent } from './dcm-cleansing-grid/dcm-cleansing-grid.component';
import { CategoryFilterComponent } from './setup/nodes/category/category-filter/category-filter.component';
import { LogPreviewComponent } from './log-preview/log-preview.component';
import { CategoryHashComponent } from './setup/nodes/category/category-hash/category-hash.component';
import { CategoryPipe } from './pipes/category.pipe';
import { PreviewReportComponent } from './preview-report/preview-report.component';
import { WarningsFilterPipe } from './pipes/warnings-filter.pipe';
import { WarningsExistPipe } from './preview-report/warnings-exist.pipe';
// import { ZorroSharperModule } from "zorro-sharper";

// In this constant, Add all the shared modules and components that you will be using in all the rest of the application
// For example, All the modules of the ANT JS Library.
// This is So each module gets imported once throughout all the application.
const SharedModules = [
  CommonModule,
  IconsProviderModule,
  NgZorroAntdModule,
  FormsModule,
  ReactiveFormsModule,
  NzModalModule,
  AngularResizedEventModule,
  NzTagModule
];

const Components = [
  PageHeaderComponent,
  BoolIconComponent,
  NsAutoHeightTableDirective,
  DataGridComponent,
  CustomTooltipComponent,
  EnvTagComponent,
  AuditComponent,
  RegexHelperTriggerComponent,
  KeyFilterPipe,
  RegexHelperDocumentationComponent,
  GridFooterComponent,
  TagsCellRendererComponent,
  GridCellAutoTypeComponent,
  DomainHierarchyComponent,
  DomainBreadcrumbComponent,
  StorageAccountImportNodeComponent,
  BaseNodeTransformationComponent,
  ClearGridFilterComponent,
  MetaComponent,
  NodePycodeComponent,
  SqlImportNodeComponent,
  SqlUploadNodeComponent,
  StorageAccountUploadNodeComponent,
  PostgresImportNodeComponent,
  PostgresUploadNodeComponent,
  DcmPreviewGridComponent,
  ConnectorPreviewComponent,
  PreviewReportComponent
  DatasetComponent,
  DcmCleansingGridComponent,
  NodeFilterComponent,
  NodeFilterReplaceComponent,
  NodeMergeComponent,
  NodeReplaceComponent,
  NodeDeleteRowComponent,
  NodeDefaultComponent,
  NodeSplitterComponent,
  NodeCalculcatorComponent,
  NodeFormatDateComponent,
  NodeGroupbyComponent,
  NodeHashComponent,
  CollectionImportComponent,
  CollectionUploadComponent,
  NodeJoinComponent,
  NodePipelineComponent,
  ManualImportNodeComponent,
  CategoryPipe
];

@NgModule({
  imports: [
    ...SharedModules,
    AgGridModule,
    MonacoEditorModule,
  ],
  declarations: [

    ...Components,
    CategoryFilterComponent,
    NodeFilterComponent,
    NodeFilterReplaceComponent,
    NodeMergeComponent,
    NodeReplaceComponent,
    NodeDeleteRowComponent,
    NodeDefaultComponent,
    NodeSplitterComponent,
    NodeCalculcatorComponent,
    NodeFormatDateComponent,
    NodeGroupbyComponent,
    NodeHashComponent,
    CollectionImportComponent,
    CollectionUploadComponent,
    NodeJoinComponent,
    NodePipelineComponent,
    ManualImportNodeComponent,
    LogPreviewComponent,
    CategoryHashComponent,
    WarningsFilterPipe,
    WarningsExistPipe
  ],
  exports: [
    ...SharedModules,
    ...Components,
    WarningsFilterPipe
  ],
  providers: [
    UtilsService,
    NodeTranformationService,
    // CustomIconsService,
    {provide: NzIconService, useClass:CustomIconsService}
  ],
  entryComponents: [
    CustomTooltipComponent,
    AuditComponent,
    RegexHelperDocumentationComponent,
    TagsCellRendererComponent,
    GridCellAutoTypeComponent,
    BaseNodeTransformationComponent,
    StorageAccountImportNodeComponent
  ]
})
export class SharedModule {}


