import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable, forkJoin, BehaviorSubject, combineLatest } from 'rxjs';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../store/selectors/preview.selectors';
import { CleansingService } from '../../services/cleansing.service';
import { selectTransformedFilePath } from '../transformation/store/transformation.selectors';
import { selectMappingId } from '../../store/selectors/mapping.selectors';
import { CleansingHotKeysService } from '../../services/cleansing-hot-keys.service';
import { shortcutString } from '@app/shared/utils/strings.utils';

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
  mappingId: string;
  jobId: string;
  modifications: any = {columns: []};
  keys = Object.keys;
  // BS
  metaData$: BehaviorSubject<any> = new BehaviorSubject({});
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  lock$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // Store
  selectedSheet$: Observable<any>;
  domain$: Observable<any>;
  fileData$: Observable<any>;
  worksheet$: Observable<any>;
  mappingId$: Observable<any>;
  constructor(private router: Router,
              private store: Store<AppState>,
              private service: CleansingService,
              public hotkeys: CleansingHotKeysService,
              private not: NotificationService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mappingId$     = this.store.select(selectMappingId);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.worksheet$     = this.store.select(selectTransformedFilePath);
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.mappingId$.subscribe((res) => { this.mappingId = res; });
    this.domain$.subscribe((domain) => { if (domain) { this.domain = domain.id; } });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.worksheet$.subscribe((res) => { this.worksheet = res; });
    const isTransformed = this.worksheet !== null;
    const ws = this.worksheet ? this.worksheet : this.fileData.metaData.worksheets_map[this.fileData.sheets[this.selectedSheet]];
    this.service.startJob(this.fileData.metaData.file_id, ws, this.domain, isTransformed, this.mappingId).subscribe((job) => {
      if (job) {
        this.jobId = job.job_id;
        this.service.getJobMetaData(job.job_id).subscribe((metaData: any) => {
          this.metaData$.next(metaData);
          this.lock$.next(true);
        });
      }
    });
  }

  ngOnInit() {
    this.hotkeys.register([
      ...this.saveModifications()
    ]);
  }

  saveModifications = () => {
    const that = this;
    const HKSave = 'control.s';
    return [
      {
        name: 'Save modifications',
        tooltip: 'Save and Apply cleansing modifications',
        action: () => that.syncWithServer(),
        shortcut: shortcutString(HKSave),
        key: HKSave,
        icon: 'save',
        alwaysShow: true
      }
    ];
  }

  serverSideDatasource = (grid: any) => {
    const that = this;
    return {
      getRows(params) {
        that.lock$.subscribe((isLocked: boolean) => {
          if (isLocked) {
            const page = (params.request.endRow / that.numberOfRows) - 1;
            const isTransformed = that.worksheet !== null;
            const ws = that.worksheet ? that.worksheet : that.fileData.metaData.worksheets_map[that.fileData.sheets[that.selectedSheet]];
            let adaptedFilter = '';
            let adaptedSort = [];
            Object.keys(params.request.filterModel).forEach((e) => {
              adaptedFilter = adaptedFilter + `{${e}} ${params.request.filterModel[e].type} '${params.request.filterModel[e].filter}' && `;
            });
            adaptedFilter = adaptedFilter.substr(0, adaptedFilter.length - 3);
            adaptedSort = params.request.sortModel.map((e) => ({column_id: e.colId, direction: e.sort}));
            // tslint:disable-next-line: max-line-length
            that.service.getJobData(that.fileData.metaData.file_id, ws, that.domain, page , that.numberOfRows, adaptedFilter, adaptedSort, isTransformed, that.mappingId)
            .subscribe((res: any) => {
              const newErrors = {};
              Object.keys(res.results).forEach((e: string) => {
                const ind = Number(e) + ( that.numberOfRows * page);
                newErrors[ind] =  res.results[e];
              });
              that.results = {...that.results, ...newErrors};
              if (page <= 0 && adaptedFilter === '' && adaptedSort.length === 0) {
                const headers = res.headers.map((e) => ({field: e.field, headerName: e.headerName}));
                headers.unshift({
                  headerName: '#',
                  field: 'row_index',
                  valueGetter: 'node.rowIndex + 1'
                });
                that.headers$.next([...headers]);
                grid.api.setColumnDefs(that.setHeadersLogic(headers, res.headers));
              }
              if (res.data.length) {
                const lastRow = () => {
                  if ( res.data.length < that.numberOfRows  ) { return (page * that.numberOfRows) + res.data.length; } else { return -1; }
                };
                params.successCallback(res.data, lastRow());
              } else {
                params.successCallback([], 0);
              }
            }, (error) => {
              params.failCallback();
              that.not.error(error.message);
            });
          }
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
        if (h.headerName !== '#') {
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
          h.cellStyle = {'font-family': 'Roboto,Helvetica,Arial,sans-serif', color: '#363636', 'border-right': '1px solid #ccc'};
          h.resizable = true;
          // h.suppressSizeToFit = false;
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
          switch (types[(ind - 1)].type) {
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
        } else {
          h.width = 40;
          h.minWidth = 40;
          h.maxWidth = 60;
          // h.suppressSizeToFit = false;
          h.suppressMenu = true;
          h.resizable = true;
          h.editable = false;
          h.cellStyle = {'font-family': 'Roboto,Helvetica,Arial,sans-serif', color: '#363636', 'border-right': '1px solid #ccc'};
          h.cellClass = (params) => 'index-cell';
          return h;
        }
      });
    }
    return headers;
  }

  editCell(params: any): void {
    // Check if the modification exists
    const i = this.modifications.columns.map((e) => e.column).indexOf(params.colDef.field);
    if (i >= 0) {
      this.modifications.columns[i].modifications[params.data.row_index] = params.newValue;
    } else {
      this.modifications.columns.push({
        column: params.colDef.field,
        modifications: {[params.data.row_index]: params.newValue}
      });
    }
  }

  syncWithServer(): void {
    const isTransformed = this.worksheet !== null;
    const ws = this.worksheet ? this.worksheet : this.fileData.metaData.worksheets_map[this.fileData.sheets[this.selectedSheet]];
    // tslint:disable-next-line: max-line-length
    this.service.editCell(this.fileData.metaData.file_id, ws, this.domain, this.modifications, isTransformed, this.mappingId).subscribe((res: any) => {
      this.fetchData(this.grid);
      if (this.jobId) {
        this.service.getJobMetaData(this.jobId).subscribe((metaData: any) => {
          this.metaData$.next(metaData);
          this.lock$.next(true);
        });
      }
      this.not.success('Success');
     }, (err) => {
       this.not.error(err.message);
    });
  }

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
