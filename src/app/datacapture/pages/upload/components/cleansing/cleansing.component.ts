import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable, forkJoin, BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../store/selectors/preview.selectors';
import { CleansingService } from '../../services/cleansing.service';
import { selectTransformedFilePath } from '../transformation/store/transformation.selectors';
import { CustomTooltipComponent } from '@app/shared/custom-tooltip/custom-tooltip.component';

@Component({
  selector: 'app-cleansing',
  templateUrl: './cleansing.component.html',
  styleUrls: ['./cleansing.component.css']
})
export class CleansingComponent implements OnInit {
  // Data Table Related
  grid: any;
  domain: string;
  results: any;
  worksheet: any;
  fileData: any;
  numberOfRows = 25;
  selectedSheet: number;
  // BS
  metaData$: BehaviorSubject<any> = new BehaviorSubject({});
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  // Store
  selectedSheet$: Observable<any>;
  domain$: Observable<string>;
  fileData$: Observable<any>;
  worksheet$: Observable<any>;
  constructor(private router: Router,
              private store: Store<AppState>,
              private service: CleansingService,
              private not: NotificationService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.worksheet$     = this.store.select(selectTransformedFilePath);
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.domain$.subscribe((domain) => { this.domain = domain; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.worksheet$.subscribe((res) => { if (res) { this.worksheet = res.split('/')[4]; } });
    forkJoin(this.fileData$.pipe(take(1)), this.worksheet$.pipe(take(1)))
      .subscribe(([fileData, worksheet]) => {
        // const ws: string = worksheet.split('/')[4];
        const ws = fileData.metaData.worksheets_map[fileData.sheets[this.selectedSheet]];
        this.service.startJob(fileData.metaData.file_id, ws, this.domain).subscribe((job) => {
          if (job) {
            this.service.getJobMetaData(job.job_id).subscribe((metaData: any) => {
              this.metaData$.next(metaData);
            });
          }
        });
      }).unsubscribe();
  }

  ngOnInit() {
  }

  serverSideDatasource = (grid: any) => {
    const that = this;
    return {
      getRows(params) {
        const page = (params.request.endRow / that.numberOfRows) - 1;
        const worksheet = that.fileData.metaData.worksheets_map[that.fileData.sheets[that.selectedSheet]];
        let adaptedFilter = '';
        let adaptedSort = [];
        Object.keys(params.request.filterModel).forEach((e) => {
          adaptedFilter = adaptedFilter + `{${e}} ${params.request.filterModel[e].type} '${params.request.filterModel[e].filter}' && `;
        });
        adaptedFilter = adaptedFilter.substr(0, adaptedFilter.length - 3);
        adaptedSort = params.request.sortModel.map((e) => ({column_id: e.colId, direction: e.sort}));
        // tslint:disable-next-line: max-line-length
        that.service.getJobData(that.fileData.metaData.file_id, worksheet, that.domain, page , that.numberOfRows, adaptedFilter, adaptedSort)
        .subscribe((res: any) => {
          const newErrors = {};
          Object.keys(res.results).forEach((e: string) => {
            const ind = Number(e) + ( that.numberOfRows * page);
            newErrors[ind] =  res.results[e];
          });
          that.results = {...that.results, ...newErrors};
          const headers = res.headers.map((e) => ({field: e.field, headerName: e.headerName}));
          if (page <= 0 && adaptedFilter === '' && adaptedSort.length === 0) {
            that.headers$.next([...headers]);
            grid.api.setColumnDefs(that.setHeadersLogic(headers, res.headers));
          }
          if (res.data.length) {
            const lastRow = () => {
              if ( res.data.length < that.numberOfRows  ) { return (page * that.numberOfRows) + res.data.length; } else { return -1; }
            };
            params.successCallback(res.data, lastRow());
          } else {
            params.successCallback({columnFieldName: 'No results Found'});
          }
        }, (error) => {
          params.failCallback();
          that.not.error(error.message);
        });
      }
    };
  }

  fetchData(params: any): void {
    this.results = [];
    const datasource = this.serverSideDatasource(params);
    params.api.setServerSideDatasource(datasource);
    this.grid = params;
  }

  setHeadersLogic(headers: any, types: any): any {
    if (headers) {
      headers.map((h, ind) => {
        const cellClass = (params) => {
          const f = params.colDef.field;
          const i = params.rowIndex;
          try {
            if (this.results[i][f].errors.length > 0) {
              return 'error-cell';
            }
          } catch (error) {}
          try {
            if (this.results[i][f].warnings.length > 0) {
              return 'warning-cell';
            }
          } catch (error) {}
          return null;
        };
        h.cellClass = cellClass;
        h.resizable = true;
        // Tooltip
        h.tooltipComponent = 'customTooltip';
        // h.tooltipField = h.field;
        h.tooltipComponentParams = {error: this.results};
        h.tooltipValueGetter = (params) => {
          return { value: params.value };
        };
        // Sort
        h.sortable = true;
        // Filter
        h.filterParams = {suppressAndOrCondition: true, buttons: ['reset', 'apply'], debounceMs: 200, closeOnApply: true};
        switch (types[ind].type) {
          case 'string':
            h.filter = 'agTextColumnFilter';
            break;
          case 'int':
            h.filter = 'agNumberColumnFilter';
            break;
          case 'double':
            h.filter = 'agNumberColumnFilter';
            break;
          case 'date':
            h.filter = 'agDateColumnFilter';
            break;
          default:
            break;
        }
        return h;
      });
    }
    return headers;
  }

  editCell(params: any): void {
    const worksheet = this.fileData.metaData.worksheets_map[this.fileData.sheets[this.selectedSheet]];
    const payload = {columns: []};
    payload.columns.push({
      column: params.colDef.field,
      modifications: {[params.data.row_index]: params.newValue}
    });
    this.service.editCell(this.fileData.metaData.file_id, worksheet, this.domain, payload).subscribe((res: any) => {
      this.fetchData(this.grid);
      this.not.success('Success');
     }, (err) => {
       this.not.error(err.message);
    });
  }

  // fillOperation = (params: any) => {
  //   this.lockEdit$.next(false);
  //   console.log(params);
  //   switch (params.direction) {
  //     case 'down':
  //       const worksheet = this.fileData.metaData.worksheets_map[this.fileData.sheets[this.selectedSheet]];
  //       const payload = {columns: []};
  //       payload.columns = params.values.map((e) => {
  //         return {
  //           column: params.column.colDef.field,
  //           modifications: null
  //         };
  //       })
  //       // .push({
  //       //   column: params.colDef.field,
  //       //   modifications: {[params.data.row_index]: params.newValue}
  //       // });
  //       // this.service.editCell(this.fileData.metaData.file_id, worksheet, this.domain, payload).subscribe((res: any) => {
  //       //   this.not.success('Success');
  //       //   this.fetchData(this.grid);
  //       //  }, (err) => {
  //       //    this.not.error(err.message);
  //       //  });
  //       break;

  //     default:
  //       break;
  //   }
  //   return 'false';
  // }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }

  goToUpload(): void {
    this.router.navigate(['/datacapture/upload/uploading']);
  }
}
