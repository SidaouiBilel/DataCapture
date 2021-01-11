import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

export class ConnectorSetupBaseComponent {

  constructor(protected modal: NzModalRef) { }

  data

  onSave = new EventEmitter<any>()

  save(){
    this.onSave.emit(this.data)
    this.cancel()
  }

  cancel(){
    this.modal.close()
  }
}
