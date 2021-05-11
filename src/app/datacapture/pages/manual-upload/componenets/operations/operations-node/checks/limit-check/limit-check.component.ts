import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-limit-check',
  templateUrl: './limit-check.component.html',
})
export class LimitCheckComponent extends OperationComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    super()
  }
  operators = ['>', '>=', '<', '<=', '==']
  sheets$: Observable<Dataset[]>;
  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportedSheets);
  }

}
