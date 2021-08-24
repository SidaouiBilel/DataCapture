import { Component, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-connector-preview',
  templateUrl: './connector-preview.component.html',
  styleUrls: ['./connector-preview.component.css'],
})
export class ConnectorPreviewComponent {

  @Input("data") set _data(value){
    this.data$.next(value)
  }
  data
  
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  data$ = new BehaviorSubject<any>(null);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  paginator$: any;
  
  constructor(private service: FileImportService) {
    this.paginator$ = combineLatest([this.size$, this.data$, this.gridReady$]).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
    .subscribe(([size, data, grid]) => {
        this.onReset();
        if (data) {
          this.generateDataSource(grid, data, size);
        } else {
          this.clearGrid(grid)
        } 

    });
  }

  clearGrid(gridApi){
    let self = this;
    let dataSource = {
       getRows(params:any) {
          params.successCallback([],0);
       }
    };
    gridApi.api.setDatasource(dataSource);
}

  generateDataSource(gridApi: any, data, size: number) {
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.previewConnectorData(data).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            const headers = res.headers.map(h => ({field: h, headerName:h, cellRenderer: 'autoTypeRenderer'}));
            that.headers$.next(headers);
          }
          const lastRow = () => res.total;
          params.successCallback(res.data, lastRow());
        }, (error) => {
            params.failCallback();
            // that.onError(error);
        });
      }
    });
  }

  onReset = () => {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  fetchData(data){
    this.data$.next(data)
  }

  clearData(){
    this.data$.next(null)
    }
}
