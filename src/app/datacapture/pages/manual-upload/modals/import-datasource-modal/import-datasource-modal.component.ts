import { Dataset } from './../../store/manual.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import * as uuid from 'uuid';
import { NzModalRef } from 'ng-zorro-antd';
import { ManualImport } from '../../store/actions/import.actions';
import { CONNECTOR_TYPES } from '@app/datacapture/pages/connectors/models/connectors.model';


@Component({
  selector: 'app-import-datasource-modal',
  templateUrl: './import-datasource-modal.component.html'
})
export class ImportDatasourceModalComponent implements OnInit {

  step = 0
  types = [...CONNECTOR_TYPES, {type:'manual', label: 'XLSX or CSV', icon: 'file'}]
  importType: string = 'manual';
  btnGenerate = true;
  constructor(private ref: NzModalRef,private store: Store<AppState>) {
  }

  ngOnInit() {
  }


  onSaveHandler(event: Dataset) {
    const data : Dataset  = {
      file_name: event['filename'].split(".")[0],
      file_id: event.file_id,
      sheet_id: event.sheet_id,
      id: uuid.v4(),
      type: this.importType,
      result_id: null
    }
    this.store.dispatch(new ManualImport(data));
    this.ref.close()
  }

}
