import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-format-check',
  templateUrl: './format-check.component.html',
  styleUrls: ['./format-check.component.css']
})
export class FormatCheckComponent extends OperationComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    super()
  }
  sheets$: Observable<Dataset[]>;
  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportedSheets);
  }

}
