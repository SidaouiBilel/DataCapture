import { Component, OnInit } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '../utils/grid-api.utils';
import { arrayToDict } from '../utils/objects.utils';

@Component({
  selector: 'app-dcm-preview-grid',
  templateUrl: './dcm-preview-grid.component.html',
  styleUrls: ['./dcm-preview-grid.component.css']
})
export class DcmPreviewGridComponent implements OnInit {

  file_id
  sheet_id
  folder = 'imports'
  result_id

  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  paginator$: any;

  // TODO REPLACE THIS WITH A GENERIC PREVIEWR SERVICE FOR ALL STEPS
  constructor(private service: FileImportService) { }

  viewGrid = false;
  noData = true;

  popup

  ngOnInit(): void {
    this.selectedSheet$.next({file_id:this.file_id,sheet_id:this.sheet_id,folder:this.folder,result_id:this.result_id})
    // FETCH DATA
    combineLatest([this.gridReady$, this.size$, this.selectedSheet$]).subscribe(([grid, size, selectedSheet]: any) => {
      this.onReset()
      if (selectedSheet) this.generateDataSource(grid, selectedSheet, size);
    });

  }

  onReset() {
    this.headers$.next(null);
    this.loading$.next(false);
  }


  generateDataSource(gridApi: any, selectedSheet, size: number) {
    this.noData = false;
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.loading$.next(true);

        that.service.getFileData(page, selectedSheet.sheet_id, size, filters).pipe(
          mergeMap((preview) => that.service.getResultData(selectedSheet.result_id, preview.index).pipe(map(result => ([preview, result])))),
        ).subscribe(([preview, result]: any) => {

          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            preview.headers.forEach((e, i) => {
              previewData[e] = preview.data.slice(1, 10).map((f: any) => f[i]);
            });
            const headers = preview.headers.map(h => ({
              field: h, colId: h, headerName: h, editable: false, resizable: true, cellRenderer: 'autoTypeRenderer', filter: GAPIFilterComponenet('string'), filterParams: GAPIAllFilterParams(params),
              // COLOR DATA
              cellClass: (params) => {
                const checks = ( params.data )? (params.data.DATA_CHECKS || [] ) : []
                const field_checks = checks.filter(c => c.field == params.colDef.field)

                if (field_checks.length) {
                  if (field_checks.filter(c => c.code && c.level == 'error').length)

                    return 'error-cell';
                  if (field_checks.filter(c => c.code && c.level == 'warning').length)
                    return 'warning-cell';

                  return 'valid-cell'
                }


                return null;
              }
            }));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }

          const data = arrayToDict(preview.data, preview.headers);

          let current_row = 0
          let checks_metadata = result.headers
          for (let row of data) {
            row.DATA_CHECKS = checks_metadata.map((cm, i) => ({

              field: cm[2],
              type: cm[1],
              id: cm[0],
              code: result.data[current_row][i],
              level: 'error'

            }))
            current_row++;
          }

          gridApi.columnApi.autoSizeAllColumns();
          params.successCallback(data, preview.total);
        }, (error) => {
          params.failCallback();
        });
      }
    });
  }

  // @edit HASSEN MAHDI
  viewSheetIndex$ = new BehaviorSubject(null)
  viewModeTarget$
  selectedSheet$ = new ReplaySubject()
  viewGrid$
}
