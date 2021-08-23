import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-compare-with',
  templateUrl: './compare-with.component.html',
  styleUrls: ['./compare-with.component.css']
})
export class CompareWithComponent extends OperationComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    super()
  }
  operators = ['>', '>=', '<', '<=', '==']
  sheets$: Observable<Dataset[]>;
  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportedSheets);
  }

}
