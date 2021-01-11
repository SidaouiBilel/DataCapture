import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-sqlsetup',
  templateUrl: './connector-sqlsetup.component.html',
  styleUrls: ['./connector-sqlsetup.component.css']
})
export class ConnectorSQLSetupComponent extends ConnectorSetupBaseComponent{

  constructor(modal: NzModalRef) {
    super(modal)
  }
  
  ngOnInit(): void {
  }

}
