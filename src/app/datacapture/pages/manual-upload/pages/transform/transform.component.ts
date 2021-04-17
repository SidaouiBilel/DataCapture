import { Dataset } from './../../store/manual.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Observable, of, concat } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';


@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.css']
})
export class TransformComponent implements OnInit {
  selectedSheet$: Observable<Dataset>;
  paginator$: any;
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  viewGrid = false;


  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private store: Store<AppState>, private service: FileImportService) {
  }

  ngOnInit(): void {
    combineLatest([this.gridReady$]).subscribe(([grid]: any) => {
      combineLatest([this.size$, this.selectedSheet$])
        .subscribe(([size, selectedSheet]: any) => {
          this.onReset()
          if (selectedSheet) {
            this.generateDataSource(grid, selectedSheet, size);
          }
        });
    });
  }

  onReset() {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  selectedSheet(sheet) {
    this.viewGrid = false
    this.selectedSheet$ = of(sheet);
    setTimeout(() => {
      this.viewGrid = true
    }, 100);
  }

  generateDataSource(gridApi: any, selectedSheet: Dataset, size: number) {
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.loading$.next(true);
        that.service.getFileData(page, selectedSheet.sheet_id, size, filters).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            res.headers.forEach((e, i) => {
              previewData[e] = res.data.slice(1, 10).map((f: any) => f[i]);
            });
            const headers = res.headers.map(h => ({
              field: h,
              colId: h,
              headerName: h,
              editable: false,
              resizable: true,
              cellRenderer: 'autoTypeRenderer',
              filter: GAPIFilterComponenet('string'),
              filterParams: GAPIAllFilterParams(params)
            }));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }
          const lastRow = () => res.total;
          const data = [];
          for (const row of res.data) {
            const rowObject = {};
            let i = 0;
            for (const h of res.headers) {
              rowObject[h] = row[i];
              i++;
            }
            data.push(rowObject);
          }
          gridApi.columnApi.autoSizeAllColumns();
          params.successCallback(data, lastRow());
        }, (error) => {
          params.failCallback();
          // that.onError(error);
        });
      }
    });
  }

}
