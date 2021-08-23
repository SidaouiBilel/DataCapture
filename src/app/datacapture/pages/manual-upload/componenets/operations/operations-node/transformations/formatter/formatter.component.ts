import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportedSheets } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent extends OperationComponent implements OnInit {

  @Input() showFrom = true

  constructor(private store: Store<AppState>) {
    super()
  }

  sheets$: Observable<Dataset[]>;
  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportedSheets);
  }

}
