import { NgModule } from '@angular/core';
import { LayoutContainer } from './layout/container/layout.container';
import { DataCaptureRoutingModule } from './datacapture-routing.module';
import { SharedModule } from './../shared/shared.module';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { UserBarComponent } from './layout/components/user-bar/user-bar.component';
import { FormTemplateComponent } from './pages/template/form-template/form-template.component';
import { ContainerComponent } from './pages/template/container/container.component';


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
  declarations: [...components, FormTemplateComponent, ContainerComponent ],
  exports: [
    LayoutContainer
  ],
  providers : [
  ],
  entryComponents: [
    FormTemplateComponent
  ]
})
export class DataCaptureModule {}
