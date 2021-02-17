import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormTemplateComponent } from './form-template/form-template.component';
import { ContainerComponent } from './container/container.component';
import { TableTemplateComponent } from './table-template/table-template.component';
import { CloneTemplateComponent } from './clone-template/clone-template.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ FormTemplateComponent, ContainerComponent, TableTemplateComponent, CloneTemplateComponent ],
  exports: [
  ],
  providers : [
  ],
  entryComponents: [
    FormTemplateComponent,
    TableTemplateComponent,
    CloneTemplateComponent
  ]
})
export class TemplateModule {}
