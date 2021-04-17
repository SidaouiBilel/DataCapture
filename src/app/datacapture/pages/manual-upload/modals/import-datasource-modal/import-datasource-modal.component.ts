import { Dataset } from './../../store/manual.model';
import { ManualImport } from './../../store/manual.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import * as uuid from 'uuid';
import { NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-import-datasource-modal',
  templateUrl: './import-datasource-modal.component.html'
})
export class ImportDatasourceModalComponent implements OnInit {

  importType: string = 'manual';
  constructor(private ref: NzModalRef,private store: Store<AppState>) {
  }

  ngOnInit() {
  }


  onSaveHandler(event: Dataset) {
    console.log(event)
    const data : Dataset  = {
      file_id: event.file_id,
      sheet_id: event.sheet_id,
      id: uuid.v4(),
      type: this.importType
    }
    this.store.dispatch(new ManualImport(data));
    this.ref.close()
  }

}
