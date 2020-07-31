import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, Observable } from 'rxjs';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { selectFileData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';

@Component({
  selector: 'app-source-preview',
  templateUrl: './source-preview.component.html',
  styleUrls: ['./source-preview.component.css']
})
export class SourcePreviewComponent implements OnInit {
  // Store
  fileData$: Observable<any>;
  selectedSheet$: Observable<any>;
  // Grid
  paginator$: any;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  error$ = new BehaviorSubject<string>(null);
  page$ = new BehaviorSubject<number>(1);
  size$ = new BehaviorSubject<number>(25);
  gridReady$ = new Subject<string>();

  constructor(private service: FileImportService, private store: Store<AppState>) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$ = this.store.select(selectFileData);
  }

  ngOnInit(): void {
    this.paginator$ = combineLatest(this.size$, this.fileData$, this.selectedSheet$, this.gridReady$)
      .subscribe(([size, file, selectedSheet, grid]) => {
        this.onReset();
        if (selectedSheet) {
          const worksheet = file.metaData.worksheets_map[file.sheets[selectedSheet]];
          this.generateDataSource(grid, worksheet, size);
        }
      });
  }

  generateDataSource(gridApi: any, worksheet: string, size: number) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.getFileData(page, worksheet, size).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            that.totalRecords$.next(res.total);
            that.headers$.next(res.headers.map(h => ({field: h})));
          }
          const lastRow = () =>  (page <= res.last_page - 2) ? -1 : res.total;
          params.successCallback(res.data, lastRow());
        }, (error) => {
            params.failCallback();
            // that.onError(error);
        });
      }
    });
  }

  onError = (err) => {
    this.headers$.next(null);
    this.loading$.next(false);
    this.error$.next(err);
  }

  onReset = () => {
    this.error$.next(null);
    this.headers$.next(null);
    this.loading$.next(false);
  }

}
