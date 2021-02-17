// import { ExtractorsModule } from './../Extractors/extractors.module';
import { AutoUploadRoutingModule } from './autoupload-routing.module';
import { StepperComponent } from './components/stepper/stepper.component';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { TechMappingComponent } from './components/tech-mapping/tech-mapping.component';
import { OutputComponent } from './components/output/output.component';



@NgModule({
  declarations: [ContainerComponent , StepperComponent, ImportDataComponent, TechMappingComponent, OutputComponent],
  imports: [
    CommonModule,
    SharedModule,
    AutoUploadRoutingModule,
    // ExtractorsModule
  ],
  entryComponents:[
    ImportDataComponent
  ]
})
export class AutouploadModule { }
