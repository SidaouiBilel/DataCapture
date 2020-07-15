import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset, ActionSaveFile } from '../../store/actions/import.actions';
import { Sheet } from '../../store/models/import.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { selectFileData } from '../../store/selectors/import.selectors';
import { take } from 'rxjs/operators';
import { FileImportService } from '../../services/file-import.service';
import { selectSelectedSheet } from '../../store/selectors/preview.selectors';
import { ActionSelectSheet } from '../../store/actions/preview.actions';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  // ag-grid
  numberOfRows = 1500;
  page = 0;
  public datatest;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  // Store
  fileMetaData$: Observable<Sheet>;
  selectedSheet$: Observable<number>;
  constructor(private store: Store<AppState>,
              private router: Router,
              private service: FileImportService) {
    this.fileMetaData$ = this.store.select(selectFileData);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
  }

  ngOnInit() {
    this.selectedSheet$.subscribe(index => {
      if (index !== null && index >= 0) {
        this.page = 1;
        this.grabPreviewData(index);
      }
    });
  }

  selectSheet(index: any): void {
    this.store.dispatch(new ActionSelectSheet(index));
  }

  private grabPreviewData(index: number): void {
    try {
      if (index !== null) {
        this.fileMetaData$.pipe(take(1)).subscribe((fileData: Sheet) => {
          if (fileData.metaData) {
            this.loading$.next(true);
            this.service.getFileData(fileData.metaData.filename,
                                     fileData.metaData.filetype,
                                     this.page,
                                     fileData.metaData.worksheets_map[fileData.sheets[index]],
                                     this.numberOfRows)
                        .subscribe((res) => {
                          this.totalRecords$.next(Number(res.total_line_number));
                          this.headers$.next(res.headers);
                          this.data$.next(res.data);
                          this.store.dispatch(new ActionSaveFile({...fileData, data: res.data}));
                          this.loading$.next(false);
                          this.datatest = res.data;
                        });
          }
        });
      }
    } catch (error) {

    }
  }

  onLazyLoad(event) {
    this.page = Math.floor((event.first + 1) / this.numberOfRows);
    this.selectedSheet$.pipe(take(1)).subscribe(index => {
      this.grabPreviewData(index);
    });
  }

  onBtLast(lastPageChanged) {
    const index = lastPageChanged.selectedSheet;
    this.page = lastPageChanged.lastPage;
    this.numberOfRows = lastPageChanged.newNrows;
    this.grabPreviewData(index);
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToImport(): void {
    this.router.navigate(['/datacapture/upload/import']);
  }


  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }
}
