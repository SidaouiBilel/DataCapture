import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-azure-blob-setup',
  templateUrl: './connector-azure-blob-setup.component.html',
  styleUrls: ['./connector-azure-blob-setup.component.css']
})
export class ConnectorAzureBlobSetupComponent extends ConnectorSetupBaseComponent{

  constructor(modal: NzModalRef) {
    super(modal)
  }
  ngOnInit(): void {
  }

}
