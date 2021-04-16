import { Dataset } from './../../store/manual.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ManualUploadEditorService } from '../../services/manual-upload-editor.service';
import { Observable } from 'rxjs';
import { selectImportSheet } from '../../store/manual.selectors';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent implements OnInit {

  @Output() sheet: EventEmitter<Dataset> = new EventEmitter();

  sheets$: Observable<Dataset[]>;
  constructor(private editor: ManualUploadEditorService,private store: Store<AppState>) {
    // FETCH STORE DATA
    this.sheets$ = this.store.select(selectImportSheet);

  }


  ngOnInit(): void {
  }

  displayGrid(sheet: any){
    this.sheet.emit(sheet);
  }

  openModal(){
    this.editor.openImport();
  }


}
