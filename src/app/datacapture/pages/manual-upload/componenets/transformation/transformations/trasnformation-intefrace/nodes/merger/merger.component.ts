import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportSheet } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-merger',
  templateUrl: './merger.component.html',
  styleUrls: ['./merger.component.css']
})
export class MergerComponent extends TransformationInterfaceComponent implements OnInit {
  sheets$: Observable<Dataset[]>;

  constructor(private store: Store<AppState>) {
    super()
  }

  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportSheet);
  }

  onAddSource() {
    this.data.sources = this.data.sources || [];
    this.data.sources.push({});
    this.onDataChanged();
  }

  onRemoveSource(i) {
    this.data.sources.splice(i, 1);
    this.onDataChanged();
  }

}
