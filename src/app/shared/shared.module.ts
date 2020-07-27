import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '@app/icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NzModalModule } from 'ng-zorro-antd';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { UtilsService } from './services/utils.service';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AgGridModule} from '@ag-grid-community/angular';
import { GridComponent } from './grid/grid.component';

// In this constant, Add all the shared modules and components that you will be using in all the rest of the application
// For example, All the modules of the ANT JS Library.
// This is So each module gets imported once throughout all the application.
const SharedModules = [
  CommonModule,
  IconsProviderModule,
  NgZorroAntdModule,
  FormsModule,
  HttpClientModule,
  NzGridModule,
  ReactiveFormsModule,
  MonacoEditorModule,
  NzModalModule,
];

@NgModule({
  imports: [
    ...SharedModules,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    PageHeaderComponent,
    DataGridComponent,
    GridComponent,
  ],
  exports: [
    ...SharedModules,
    PageHeaderComponent,
    DataGridComponent,
    GridComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SharedModule {}
