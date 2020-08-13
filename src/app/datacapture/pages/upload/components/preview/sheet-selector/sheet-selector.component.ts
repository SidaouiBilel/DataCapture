import { Component, OnInit } from '@angular/core';
import { ActionSelectSheet } from '../../../store/actions/preview.actions';
import { selectFileData } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent{
  fileMetaData$: any;
  selectedSheet$: any;

  constructor(private store: Store<AppState>) {
    this.fileMetaData$ = this.store.select(selectFileData);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
  }

  selectSheet(index: any): void {
    this.store.dispatch(new ActionSelectSheet(index));
  }
}
