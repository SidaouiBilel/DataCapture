import { SharedModule } from './../../../shared/shared.module';
import { NzPageHeaderModule, NzFormModule, NzDividerModule, NzSelectModule } from 'ng-zorro-antd';
import { ExtractorRoutingModule } from './extracors.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { ExtractDBComponent } from './components/extract-db/extract-db.component';
import { FomDbComponent } from './components/fom-db/fom-db.component';



@NgModule({
  declarations: [ContainerComponent, ExtractDBComponent, FomDbComponent],
  imports: [
    ExtractorRoutingModule,
    CommonModule,
    NzPageHeaderModule , 
    NzFormModule ,
    NzDividerModule,
    NzSelectModule ,
    SharedModule
  ],
  entryComponents:[
    FomDbComponent
  ],
})
export class ExtractorsModule { }
