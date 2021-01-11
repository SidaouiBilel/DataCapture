import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectorsRoutingModule } from './connectors-routing.module';
import { ConnectorsComponent } from './containers/connectors/connectors.component';
import { SharedModule } from '@app/shared';
import { ConnectorTypesComponent } from './modals/connector-types/connector-types.component';


@NgModule({
  declarations: [ConnectorsComponent, ConnectorTypesComponent],
  imports: [
    CommonModule,
    ConnectorsRoutingModule,
    SharedModule,
  ]
})
export class ConnectorsModule { }
