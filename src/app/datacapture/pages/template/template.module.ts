import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { ContainerComponent } from './container/container.component';
import { TableTemplateComponent } from './components/table-template/table-template.component';
import { CloneTemplateComponent } from './components/clone-template/clone-template.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ FormTemplateComponent, ContainerComponent, TableTemplateComponent, CloneTemplateComponent, TemplateCardComponent ],
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
