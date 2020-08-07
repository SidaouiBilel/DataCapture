import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset, ActionSaveFile } from '../../store/actions/import.actions';
import { Sheet } from '../../store/models/import.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { selectFileData } from '../../store/selectors/import.selectors';
import { take } from 'rxjs/operators';
import { FileImportService } from '../../services/file-import.service';
import { selectSelectedSheet } from '../../store/selectors/preview.selectors';
import { ActionSelectSheet } from '../../store/actions/preview.actions';
import { selectPreviewMode } from '../transformation/store/transformation.selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  // ag-grid
  target: any;
  isVisible = true;
  numberOfRows = 10;
  page = 1;
  selectedSheet: number;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  // Store
  fileMetaData$: Observable<Sheet>;
  selectedSheet$: Observable<number>;
  previewMode$: Observable<'SOURCE' | 'TARGET'>;
  constructor(private store: Store<AppState>,
              private router: Router,
              private service: FileImportService,
              private notification: NotificationService) {
    this.fileMetaData$ = this.store.select(selectFileData);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.selectedSheet$.subscribe((res) => { this.selectedSheet = res; });
    this.previewMode$ = this.store.select(selectPreviewMode);
  }

  ngOnInit() {
    this.selectedSheet$.subscribe(index => {
      if (index !== null && index >= 0) {
        this.page = 1;
        this.grabPreviewData(index);
      }
    });
  }

  onPageChange(event: number): void {
    this.page = event;
    this.grabPreviewData(this.selectedSheet);
  }

  onSizeChange(event: number): void {
    this.numberOfRows = event;
    this.grabPreviewData(this.selectedSheet)
  }

  selectSheet(index: any): void {
    this.store.dispatch(new ActionSelectSheet(index));
    this.grabPreviewData(index);
  }

  private grabPreviewData(index: number): void {
    try {
      if (index !== null) {
        this.loading$.next(true);
        this.fileMetaData$.pipe(take(1)).subscribe((fileData: Sheet) => {
          if (fileData.metaData) {
            this.service.getFileData(this.page,
                                     fileData.metaData.worksheets_map[fileData.sheets[index]],
                                     this.numberOfRows)
                        .subscribe((res) => {
                          this.totalRecords$.next(Number(res.total));
                          this.headers$.next(res.headers);
                          this.data$.next(res.data);
                          this.store.dispatch(new ActionSaveFile({...fileData, data: res.data, headers: res.headers}));
                          this.loading$.next(false);
                        });
          }
        });
      }
    } catch (error) {
      this.notification.error(error.message);
    }
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToImport(): void {
    this.router.navigate(['/datacapture/upload/import']);
  }


  goToMapping(): void {
    if ( this.selectedSheet !== null ) {
      this.router.navigate(['/datacapture/upload/mapping']);
    } else {
      this.notification.warn('Please select a sheet.');
    }
  }
}
