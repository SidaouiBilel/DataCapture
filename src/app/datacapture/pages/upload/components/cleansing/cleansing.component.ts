import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../store/selectors/preview.selectors';
import { CleansingService } from '../../services/cleansing.service';

@Component({
  selector: 'app-cleansing',
  templateUrl: './cleansing.component.html',
  styleUrls: ['./cleansing.component.css']
})
export class CleansingComponent implements OnInit {
  // Data Table Related
  numberOfRows = 25;
  page = 1;
  results$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // Store
  fileData: any;
  domain: string;
  selectedSheet: number;
  selectedSheet$: Observable<any>;
  domain$: Observable<string>;
  fileData$: Observable<any>;
  constructor(private router: Router, private store: Store<AppState>, private service: CleansingService, private not: NotificationService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.domain$.subscribe((domain) => { this.domain = domain; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
  }

  ngOnInit() {
  }

  serverSideDatasource = () => {
    const that = this;
    return {
      getRows(params) {
        that.page = params.request.endRow / that.numberOfRows;
        const worksheet = that.fileData.metaData.worksheets_map[that.fileData.sheets[that.selectedSheet]];
        that.service.getJobData(that.fileData.metaData.file_id, worksheet, that.domain, that.page , that.numberOfRows, '', [])
        .subscribe((res) => {
          if (res.data.length) {
            const lastRow = () => {
              if ( res.data.length <= res.total ) { return res.total; } else { return -1; }
            };
            params.successCallback(res.data, lastRow());
          } else {
            params.successCallback({columnFieldName: 'No results Found'});
          }
        }, (error) => {
          params.failCallback();
        });
      }
    };
  }

  fetchData(params: any): void {
    const datasource = this.serverSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }


  goToUpload(): void {
    this.router.navigate(['/datacapture/upload/upload']);
  }
}
