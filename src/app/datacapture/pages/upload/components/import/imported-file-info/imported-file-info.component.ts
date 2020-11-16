import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FileImportService } from '../../../services/file-import.service';
import { ActionSelectColRange, ActionSelectRowRange } from '../../../store/actions/import.actions';
import { selectFileData, selectRowRange } from '../../../store/selectors/import.selectors';
import { selectTotal } from '../../../store/selectors/preview.selectors';
import { selectColRange } from './../../../store/selectors/import.selectors';

@Component({
  selector: 'app-imported-file-info',
  templateUrl: './imported-file-info.component.html',
  styleUrls: ['./imported-file-info.component.css']
})

export class ImportedFileInfoComponent implements OnInit {
  selectedSheet = null;
  generatedSheetId = null;
  columns$ = new BehaviorSubject(null);
  // START INDEX 1
  colValue = [0, 0];
  rowValue = [0, 0];
  total = 0;
  // Store
  fileData$: Observable<any>;
  metadata$: Observable<any>;
  headers$: Observable<any>;
  total$: Observable<any>;
  rowRange$: Observable<any>;
  colRange$: Observable<any>;

  constructor(private store: Store<AppState>, private service: FileImportService) { }

  ngOnInit() {
    this.fileData$ = this.store.select(selectFileData);
    this.rowRange$ = this.store.select(selectRowRange);
    this.colRange$ = this.store.select(selectColRange);
    this.total$ = this.store.select(selectTotal);
    this.metadata$ = this.fileData$.pipe(map((data: any) => data.metaData));
    this.headers$ = this.fileData$.pipe(map((data: any) => data.headers));
    this.rowRange$.subscribe((rR) => {this.rowValue = rR; });
    this.colRange$.subscribe((cR) => {this.colValue = cR; });
  }

  rowRangeChanged(): void {
    this.store.dispatch(new ActionSelectRowRange(this.rowValue));
  }

  colRangeChanged(): void {
    this.store.dispatch(new ActionSelectColRange(this.colValue));
  }

}
