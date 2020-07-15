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
import { DndModule } from 'ngx-drag-drop';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AgGridModule} from '@ag-grid-community/angular';
import { SortableHeaderComponent } from './gridReusables/header-component/sortable-header.component';
import { HeaderGroupComponent } from './gridReusables/header-group-component/header-group.component';
import { HeaderEditComponent } from './gridReusables/edit-component/header-edit.component';
import { HeaderGeocodeComponent } from './gridReusables/geocode-component/header-geocode.component';
import { HeaderSuppComponent } from './gridReusables/supp-component/header-supp.component';

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
  DndModule,
  NzModalModule,
];

@NgModule({
  imports: [
    ...SharedModules,
    AgGridModule.withComponents([
      SortableHeaderComponent,
      HeaderGroupComponent,
      HeaderEditComponent,
      HeaderGeocodeComponent,
      HeaderSuppComponent,
    ]),
  ],
  declarations: [
    PageHeaderComponent,
    DataGridComponent,
    SortableHeaderComponent,
    HeaderGroupComponent,
    HeaderEditComponent,
    HeaderGeocodeComponent,
    HeaderSuppComponent,
  ],
  exports: [
    ...SharedModules,
    PageHeaderComponent,
  ],
  providers: [
    UtilsService
  ]
})
export class SharedModule {}
