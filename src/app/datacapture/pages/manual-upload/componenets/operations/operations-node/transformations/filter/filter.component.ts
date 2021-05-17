import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends OperationComponent implements OnInit {

  @Input() showReverse = true;

  // sheets$: Observable<Dataset[]>;

  numberOperations = [
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' },
    { value: '==', label: '=' },
    { value: '!=', label: '!=' }
  ];
  stringOperations = [
    { value: 'fullmatch', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startswith', label: 'Starts With' },
    { value: 'endswith', label: 'Ends With' },
    { value: 'match', label: 'REGEX' },
    // {value: 'notEqual', label: 'notEqual'},
  ];
  operations = [
    {
      label: 'Numbers', operations: this.numberOperations
    },
    {
      label: 'Strings', operations: this.stringOperations
    }
  ];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    // this.sheets$ = this.store.select(selectImportedSheets);
  }

  onAddCondition() {
    this.data.conditions = this.data.conditions || [];
    this.data.conditions.push({});
    this.onDataChanged();
  }

  onRemoveCondition(i) {
    this.data.conditions.splice(i, 1);
    this.onDataChanged();
  }

  isUsingRegex(op) {
    return this.stringOperations.map(e => e.value).includes(op);
  }

}
