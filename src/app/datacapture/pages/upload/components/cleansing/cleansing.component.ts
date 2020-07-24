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
  numberOfRows = 1500;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  results$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  selectedSheet$: Observable<any>;
  domain$: Observable<string>;
  fileData$: Observable<any>;
  constructor(private router: Router, private store: Store<AppState>, private service: CleansingService, private not: NotificationService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$ = this.store.select(selectDomain);
  }

  ngOnInit() {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet]) => {
        this.service.startJob(fileData.metaData.file_id, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], domain)
          .subscribe((job) => {
            if (job.job_id) {
              forkJoin(
                this.service.getJobData(fileData.metaData.file_id, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]],domain, 1 , 1000),
                this.service.getJobResult(fileData.metaData.file_id, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], 1 , 1000)
              )
                .subscribe(([res, errors]) => {
                  this.totalRecords$.next(Number(res.total));
                  this.headers$.next(res.headers);
                  this.data$.next(res.data);
                  this.loading$.next(false);
                  this.results$.next(errors);
                });
            }
          }, (err) => {
            this.not.error(err.message);
          });
      });
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
