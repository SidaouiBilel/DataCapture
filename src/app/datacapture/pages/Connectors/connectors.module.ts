import { SharedModule } from './../../../shared/shared.module';
import { ConnectorsRoutingModule } from './connectors-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { NzPageHeaderModule , NzFormModule   , NzDividerModule , NzSelectModule } from 'ng-zorro-antd';
import { CreateDBconnectorsComponent } from './components/create-dbconnectors/create-dbconnectors.component';
import { ListdbconnectorsComponent } from './components/listdbconnectors/listdbconnectors.component';
import { ModaldbconnectorsComponent } from './components/modaldbconnectors/modaldbconnectors.component';
import { DBCfilterPipe } from './pipes/dbcfilter.pipe';
import { ContainerComponent } from './AWSconnector/container/container.component';
import { ListComponent } from './AWSconnector/list/list.component';
import { ModalComponent } from './AWSconnector/modal/modal.component';


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