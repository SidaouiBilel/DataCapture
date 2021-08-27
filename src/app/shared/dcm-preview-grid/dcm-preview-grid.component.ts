import { Component, OnInit } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '../utils/grid-api.utils';

@Component({
  selector: 'app-dcm-preview-grid',
  templateUrl: './dcm-preview-grid.component.html',
  styleUrls: ['./dcm-preview-grid.component.css']
})
export class DcmPreviewGridComponent implements OnInit {
  getRowStyle
  file_id
  sheet_id
  folder = 'imports'
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  paginator$: any;

  // TODO REPLACE THIS WITH A GENERIC PREVIEWR SERVICE FOR ALL STEPS
  constructor(private service: FileImportService) { }

  ngOnInit(): void {
    this.paginator$ = combineLatest([this.size$, this.gridReady$])
      .subscribe(([size, grid]) => {
        this.onReset();
        if (this.folder && this.file_id && this.sheet_id) {
          this.generateDataSource(grid, this.folder, this.file_id, this.sheet_id, size);
        }
      });
    this.setRowStyle()
  }
  onReset = () => {
    this.headers$.next(null);
    this.loading$.next(false);
  }


  setRowStyle() {
    this.getRowStyle = params => {
      if (params?.data?.Fraud == "red") {
        return { background: '#f3bebe' };
      }
      else if (params?.data?.Fraud == "orange") {
        return { background: '#f0a878' };
      }
      else if (params?.data?.Fraud == "yellow") {
        return { background: '#def078' };
      }
      else return
    };
  }

  generateDataSource(gridApi: any, folder: string, file_id: any, sheet_id: any, size: number) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        // that.transformService.filters.next(filters);
        that.loading$.next(true);
        that.service.getFileData(page, sheet_id, size, filters).subscribe((res: any) => {
          // that.total$.next(res.total);
          console.log('RESPONSE', res)
          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            res.headers.forEach((e, i) => {
              previewData[e] = res.data.slice(1, 10).map((f: any) => f[i]);
            });
            const headers = res.headers.map(h => ({
              hide: (h == "Fraud") ? true : false,
              field: h,
              colId: h,
              headerName: h,
              editable: false,
              resizable: true,
              cellRenderer: 'autoTypeRenderer',
              filter: GAPIFilterComponenet('string'),
              filterParams: GAPIAllFilterParams(params),
              chartDataType: (h == '#####' || h == '####') ? 'category' : 'series',
            }));
            console.log('Headers', headers)
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
