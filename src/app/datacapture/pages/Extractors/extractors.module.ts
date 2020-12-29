import { SharedModule } from './../../../shared/shared.module';
import { ExtractorRoutingModule } from './extracors.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ExtractDBComponent } from './database/extract-db/extract-db.component';
import { FomDbComponent } from './database/fom-db/fom-db.component';
import { DatalakeContainerComponent } from './datalake/datalake-container/datalake-container.component';
import { DatalakeModalComponent } from './datalake/datalake-modal/datalake-modal.component';



@NgModule({
  declarations: [ContainerComponent, ExtractDBComponent, FomDbComponent, DatalakeContainerComponent, DatalakeModalComponent],
  imports: [
    ExtractorRoutingModule,
    CommonModule,
    SharedModule
  ],
  entryComponents:[
    ContainerComponent, ExtractDBComponent, FomDbComponent , DatalakeModalComponent
  ],exports:[
    ExtractDBComponent, FomDbComponent, DatalakeContainerComponent, DatalakeModalComponent
  ]
})
export class ExtractorsModule { }
