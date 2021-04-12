import { Component, OnDestroy, OnInit } from '@angular/core';
import { TargetFieldsService } from '@app/datacapture/pages/admin/services/fields.service';
import { CleansingService } from '@app/datacapture/pages/upload/services/cleansing.service';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { combineAll, mergeMap, take, tap } from 'rxjs/operators';
import { currencyFormatter, dateFormatter, GAPIFilterComponenet, INDEX_HEADER } from '../utils/grid-api.utils';
import { withValue } from '../utils/rxjs.utils';

@Component({
  selector: 'app-dcm-cleansing-grid',
  templateUrl: './dcm-cleansing-grid.component.html',
  styleUrls: ['./dcm-cleansing-grid.component.css']
})
export class DcmCleansingGridComponent implements OnInit, OnDestroy {

  file_id
  sheet_id
  folder
  cleansing_job_id
  domain_id

  errorLevels = [
    {level: 'all', label: 'All', type: 'primary'}
    , {level: 'errors', label: 'Errors', type: 'danger'}
    , {level: 'warnings', label: 'Warnings', type: 'warning'}
  ];
  level$ = new BehaviorSubject('all');
  metadata$
  filters$ = new Subject()
  gridApi$ = new ReplaySubject()
  results$ = new Subject()
  total$ = new Subject()
  headers$ = new Subject()
  targetFields
  observer$

  modifications = {}
  results = []

  nrows = 20

  constructor(private service: CleansingService, private fields: TargetFieldsService) { }

  ngOnDestroy(): void {
    if(this.observer$) this.observer$.unsubscribe()
  }

  loadMetadata(){
    this.metadata$ = this.service.getJobMetaData(this.cleansing_job_id).pipe(take(1))
  }

  ngOnInit(): void {
    combineLatest(this.gridApi$.pipe(take(1)), this.fields.get(this.domain_id).pipe(take(1)))
    .subscribe(([grid, targetFields]:any)=>{
      this.targetFields = targetFields
      this.results$.next({});
      this.loadMetadata()
      grid.api.setServerSideDatasource(this.serverSideDatasource(grid));
    })
  }

  serverSideDatasource = (grid: any) => {
    const that = this;
    return {
      getRows(params) {
        // EVEMT LISTENER FOR DATA FETCH 
        // FETCHES DATA ON FILTER CHANGES
        that.observer$ = combineLatest([that.level$]).subscribe(([errorLevel]:any) => {
          // if (isLocked) {
            const page = (params.request.endRow / that.nrows) - 1;
            // tslint:disable-next-line: max-line-length
            that.service.getJobData(that.file_id, that.sheet_id, page, that.nrows, [], {}, false, errorLevel).subscribe((res: any) => {
              that.total$.next(res.total);
              const newErrors = {};
              Object.keys(res.results).forEach((e: string) => {
                const ind = Number(e);
                newErrors[ind] =  res.results[e];
              });
              that.results = {...that.results, ...newErrors};
              that.results$.next(that.results);
              if (page <= 0) {
                const headers = that.targetFields.map((e) => (that.getGridHeader(e)));
                headers.unshift(INDEX_HEADER);
                that.headers$.next([...headers]);
              }
              const lastRow = () =>  res.total;
              params.successCallback(res.data, lastRow());
            }, (error) => {
              params.failCallback();
              // that.not.error(error.message);
            });
          // }
        });
      }
    };
  }


  auditTrial(){

  }

  getGridHeader(target: any): any {
    let h:any = {field: target.name, headerName: target.label}
    h.cellClass = (params) => {
      const f = params.colDef.field;
      const i = (params.data) ? params.data.row_index : -1;
      try {
        if (this.modifications[i][f]) {
          return 'edited-cell';
        }
      } catch (error) {}
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
    h.resizable = true;
    // h.suppressSizeToFit = false;
    h.tooltipComponent = 'customTooltip';
    // h.tooltipField = h.field;
    h.tooltipComponentParams = {error: this.results$};
    h.tooltipValueGetter = (params) => {
      return { value: params.value, index : (params.data) ? params.data.row_index : '' };
    };
    h.sortable = true;
    h.filterParams = {suppressAndOrCondition: true, buttons: ['reset', 'apply'], debounceMs: 200, closeOnApply: true};
    h.filter=GAPIFilterComponenet(target.type)
    switch (target.type) {
      case 'double':
        h.valueFormatter = currencyFormatter;
        break;
      case 'date':
        h.valueFormatter = dateFormatter;
        break;
    }
    return h;
  }

  onCellEdit(params){
  // CHECK IF VALUE HAS CHANGED
  console.log(1)
  if ( params.oldValue !== params.newValue){
    console.log(2)
    // REGISTER MODIFICATION
    this.modifications[params.data.row_index] = {
      ...this.modifications[params.data.row_index],
      [params.colDef.field]: {previous: params.oldValue, new: params.newValue}
    };
    // APPLY MODIFICATION
    withValue(this.gridApi$, (grid)=>{
      console.log(3)
      const api = grid.api;
      const line = params.data.row_index;
      const rowNode = params.node;
      rowNode.stub = true;
      api.redrawRows({ rowNodes: [rowNode] });
      this.service.editCell(this.file_id, this.sheet_id, this.domain_id, this.modifications, false, null, this.cleansing_job_id)
      .pipe(
        // DELETE THE MODIFICTAION AFTER SENDING THEM TO SERVER AND LOAD NEW METADATA
        tap(()=>{
          this.loadMetadata();
          this.modifications = {};
          this.loadMetadata()
        }),
        // FETCH NEW RESULT FOR MODIFIED LINE
        mergeMap(()=>this.service.getJobData(this.file_id, this.sheet_id, line , 1, [], {}, false)))
        .subscribe((data: any) => {
          // tslint:disable-next-line: variable-name
          const absolute_index = line;
          this.results[absolute_index] = data.results[absolute_index];
          this.results$.next(this.results);
          rowNode.stub = false;
          api.redrawRows({ rowNodes: [rowNode] });
        });
      })
    }  
  }
}
