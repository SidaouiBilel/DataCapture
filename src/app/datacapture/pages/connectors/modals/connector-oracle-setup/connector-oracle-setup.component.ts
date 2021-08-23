import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-oracle-setup',
  templateUrl: './connector-oracle-setup.component.html',
  styleUrls: ['./connector-oracle-setup.component.css']
})
export class ConnectorOracleSetupComponent  extends ConnectorSetupBaseComponent{


  constructor(modal: NzModalRef, private fb: FormBuilder) {
    super(modal)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description],
      host: [this.data.host, [Validators.required]],
      port: [this.data.port, [Validators.required]],
      database: [this.data.database, [Validators.required]],
      password: [this.data.password, [Validators.required]],
      user: [this.data.user, [Validators.required]],
      mode: [this.data.mode, [Validators.required]],
      database_type: [this.data.database_type, [Validators.required]],
    });
  }
}
