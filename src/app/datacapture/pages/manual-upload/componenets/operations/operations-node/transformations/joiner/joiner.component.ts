import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-joiner',
  templateUrl: './joiner.component.html',
})
export class JoinerComponent extends OperationComponent implements OnInit {

  datasources$: Observable<Dataset[]>;

  constructor(private store: Store<AppState>) {
    super()
  }

  dataSources = []

  ngOnInit() {
    this.datasources$ = this.store.select(selectImportedSheets);
  }

  onDataSourceSelected(sheet) {
    this.data.join_sheet_id = sheet.sheet_id
    this.data.join_file_id = sheet.file_id

    this.onDataChanged()
  }

  compareWith(o1, o2) {
    if (!o1 && !o2) return true
    if (!o1 || !o2) return false
    if (o1.sheet_id == o2.sheet_id)
      return true
    else
      return false
  }

}
