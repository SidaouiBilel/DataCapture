import { Dataset } from './../../store/manual.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ManualUploadEditorService } from '../../services/manual-upload-editor.service';
import { Observable } from 'rxjs';
import { selectImportedSheets } from '../../store/selectors/import.selectors';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent implements OnInit {

  @Output() sheet: EventEmitter<Dataset> = new EventEmitter();
  @Input() activeIndex = null

  sheets$: Observable<Dataset[]>;
  constructor(private editor: ManualUploadEditorService, private store: Store<AppState>) {
  }


  ngOnInit(): void {
    // FETCH STORE DATA
    this.sheets$ = this.store.select(selectImportedSheets);

    // display saved sheet
    this.store.select(selectImportedSheets).subscribe(
      (sheets: Dataset[]) => {
        if (sheets.length)
          this.displayGrid(sheets[sheets.length-1], 0)
      }
    )
  }

  displayGrid(sheet: any, index) {
    this.sheet.emit({...sheet, index});
  }

  openModal() {
    this.editor.openImport();
  }


}
