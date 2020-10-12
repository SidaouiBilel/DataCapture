import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
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
  total$ = new Observable<any>();

  @Input() set selectedDomain(value) {
    this.domain$.next(value);
  }

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.subscription = combineLatest(this.domain$, this.gridReady$, this.size$, this.page$)
    .subscribe(([domain, gridApi, size, page]) => {
      if (!domain) { return this.error$.next('Please select a collection'); }
      this.error$.next(null);
      // this.getTotal(domain.id)
      this.generateDataSource(domain.id, page, size, gridApi);
    });
  }

  getTotal(id: any) {
    this.total$ =  this.service.getUploadDataTotal(id).pipe(take(1));
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  generateDataSource(domainId, pages, size, gridApi) {
    const that = this;
    // that.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.getUploadData(domainId, page, size).subscribe((res: any) => {
          // that.total$.next(res.total);
          that.loading$.next(false);
          if (page <= 1) {
            // that.total$.next(res.total);
            const headers = res.headers.map(h => (
              {
                ...h,
                editable: false,
                resizable: true,
              }
            ));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }
          const lastRow = () =>  -1;
          // const lastRow = () =>  (page <= res.last_page - 2) ? -1 : res.total;
          params.successCallback(res.content, lastRow());
        }, (error) => {
          params.failCallback();
          this.error$.next(error);
          // that.onError(error);
        });
        }
    });
  }

  download(type: string) {
    this.domain$.pipe(take(1)).subscribe((domain) => {
      this.service.download(domain.id, type);
    });
  }
}
