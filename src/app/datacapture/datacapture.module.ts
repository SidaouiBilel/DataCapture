import { NgModule } from '@angular/core';
import { LayoutContainer } from './layout/container/layout.container';
import { DataCaptureRoutingModule } from './datacapture-routing.module';
import { SharedModule } from './../shared/shared.module';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { UserBarComponent } from './layout/components/user-bar/user-bar.component';
import { FormTemplateComponent } from './pages/template/form-template/form-template.component';
import { ContainerComponent } from './pages/template/container/container.component';
import { TableTemplateComponent } from './pages/template/table-template/table-template.component';
import { CloneTemplateComponent } from './pages/template/clone-template/clone-template.component';


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
  ],
  declarations: [...components, FormTemplateComponent, ContainerComponent, TableTemplateComponent, CloneTemplateComponent ],
  exports: [
    LayoutContainer
  ],
  providers : [
  ],
  entryComponents: [
    FormTemplateComponent,
    TableTemplateComponent,
    CloneTemplateComponent
  ]
})
export class DataCaptureModule {}
