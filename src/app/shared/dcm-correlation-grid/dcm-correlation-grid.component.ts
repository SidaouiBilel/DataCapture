import { Component, OnInit } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '../utils/grid-api.utils';
import { CORRELATION_STATES } from '../utils/state-colors.utils';


@Component({
  selector: 'app-dcm-correlation-grid',
  templateUrl: './dcm-correlation-grid.component.html',
  styleUrls: ['./dcm-correlation-grid.component.css']
})
export class DcmCorrelationGridComponent implements OnInit {
  legend = CORRELATION_STATES
  sheet_id
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  paginator$: any;

  constructor(private service: FileImportService) { }

  ngOnInit(): void {
    this.paginator$ = combineLatest([this.size$, this.gridReady$])
      .subscribe(([size, grid]) => {
        this.onReset();
        if (this.sheet_id) {
          this.generateDataSource(grid, this.sheet_id, size);
        }
      });
  }
  onReset = () => {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  generateDataSource(gridApi: any, sheet_id: any, size: number) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        // that.transformService.filters.next(filters);
        that.loading$.next(true);
        that.service.getFileData(page, sheet_id, size, filters).subscribe((res: any) => {
          // that.total$.next(res.total);
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
              filterParams: GAPIAllFilterParams(params),
              chartDataType: (h == '#####' || h == '####') ? 'category' : 'series',
              cellClass: params => {
                if (params.value >= 0.8) {
                  return 'corr-error-cell';
                }
                else if (params.value < 0.8 && params.value >= 0.5) {
                  return 'corr-valid-cell';
                }
                else if (params.value < 0.5 && params.value >= 0.2) {
                  return 'corr-warning-cell';
                }
                return;

              }
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

