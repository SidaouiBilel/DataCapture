import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TagsCellRendererComponent } from '@app/shared/tags-cell-renderer/tags-cell-renderer.component';
import { GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit, OnDestroy {

  domain$ = new BehaviorSubject(null);
  error$ = new BehaviorSubject<any>(false);
  size$ = new BehaviorSubject(15);
  page$ = new BehaviorSubject(1);
  headers$ = new Subject();
  gridReady$ = new Subject();
  loading$ = new BehaviorSubject(false);
  subscription;
  total$ = new BehaviorSubject<any>(null);
  gridApi: any;

  @Input() set selectedDomain(value) {
    this.domain$.next(value);
  }

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.subscription = combineLatest(this.domain$, this.gridReady$, this.size$, this.page$)
    .subscribe(([domain, gridApi, size, page]:any) => {
      this.gridApi = gridApi.api
      if (!domain) { return this.error$.next('Please select a collection'); }
      this.error$.next(null);
      // this.getTotal(domain.id)
      this.generateDataSource(domain.id, page, size, gridApi);
    });
  }

  getTotal(id: any) {
    // this.total$ =  this.service.getUploadDataTotal(id).pipe(take(1));
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  generateDataSource(domainId, pages, size, gridApi) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const firstPage = page <= 1
        if (firstPage)  that.total$.next(0);
        that.loading$.next(true);
        const filters = GAPIFilters(params.request.filterModel) 
        that.service.getUploadData(domainId, page, size, filters).subscribe((res: any) => {
          that.loading$.next(false);
          if (firstPage) {
            that.total$.next(res.total);
            const headers = res.headers.map(h => {
              const colDef: any = {
                field:h.field,
                headerName:h.headerName,
                colId: h.field,
                editable: false,
                resizable: true,
                filter: GAPIFilterComponenet(h.type),
                floatingFilter: GAPIFilterComponenet(h.type),
              }

              if (h.field == "flow_tags"){
                colDef.cellRenderer = 'tagsRenderer'
                colDef.pinned= 'left'
                colDef.filterParams = {
                  excelMode: 'windows',
                  values: (params)=>{
                    that.domain$.pipe(take(1)).subscribe(domain=>{
                      that.service.getTags(domain.id).subscribe(tags=>{
                        params.success(tags)
                      })
                    })
                  },
                  refreshValuesOnOpen: true,
                }
              }

              return colDef
            });
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }
          // const lastRow = () =>  -1;
          that.total$.pipe(take(1)).subscribe((total)=>{
            const lastRow = () =>  total;
            params.successCallback(res.content, lastRow());
          })
        }, (error) => {
          params.failCallback();
          that.error$.next(error);
          // that.onError(error);
        });
        }
    });
  }

  download(type: string, withFilters=false) {
    this.domain$.pipe(take(1)).subscribe((domain) => {
      let filters = []
      if (withFilters){
        filters = GAPIFilters(this.gridApi.getFilterModel())
      } 
      this.service.download(domain.id, type, filters);
    });
  }

  clearFilter(){
    this.gridApi.setFilterModel(null);
  }
}
