import { SharedModule } from './../../../shared/shared.module';
import { ConnectorsRoutingModule } from './connectors-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorsComponent } from './Database/connectors/connectors.component';
import { NzPageHeaderModule , NzFormModule   , NzDividerModule , NzSelectModule } from 'ng-zorro-antd';
import { CreateDBconnectorsComponent } from './Database/create-dbconnectors/create-dbconnectors.component';
import { ListdbconnectorsComponent } from './Database/listdbconnectors/listdbconnectors.component';
import { ModaldbconnectorsComponent } from './Database/modaldbconnectors/modaldbconnectors.component';
import { DBCfilterPipe } from './pipes/dbcfilter.pipe';
import { ContainerComponent } from './Datalake/container/container.component';
import { ListComponent } from './Datalake/list/list.component';
import { ModalComponent } from './Datalake/modal/modal.component';


@NgModule({
  declarations: [
    ConnectorsComponent, 
    CreateDBconnectorsComponent, 
    ListdbconnectorsComponent,
    ModaldbconnectorsComponent,
    DBCfilterPipe,
    ContainerComponent,
    ListComponent,
    ModalComponent
  ],
  imports: [
    ConnectorsRoutingModule,
    CommonModule,
    NzPageHeaderModule , 
    NzFormModule ,
    NzDividerModule,
    NzSelectModule ,
    SharedModule
  ],
  entryComponents:[
    ModaldbconnectorsComponent,
    ModalComponent
  ]
})
export class ConnectorsModule { }