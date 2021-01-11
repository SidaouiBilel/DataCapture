import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConnectorTypesComponent } from '../modals/connector-types/connector-types.component';

@Injectable({
  providedIn: 'root'
})
export class ConnectorsUtilsService {

  constructor(private modal:NzModalService) { }

  addConnector(){
    const types = this.modal.create({
      nzContent:ConnectorTypesComponent
    })

    // types.
  }
}
