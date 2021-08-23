import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-date-formatter',
  templateUrl: './date-formatter.component.html',
  styleUrls: ['./date-formatter.component.css']
})
export class DateFormatterComponent extends OperationComponent implements OnInit {
  formats = [
    { label: "dd/mm/yyyy", value: "%d/%m/%Y" },
    { label: "mm/dd/yyyy", value: "%m/%d/%Y" },
    { label: "yyyy/mm/dd", value: "%Y/%m/%d" },
    { label: "yyyy-dd-mm", value: "%Y-%d-%m" },
  ]


  constructor(private store: Store<AppState>) {
    super()
  }

  sheets$: Observable<Dataset[]>;
  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportedSheets);
  }

}
