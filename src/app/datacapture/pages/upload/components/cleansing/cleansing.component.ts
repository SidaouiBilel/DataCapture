import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable, forkJoin } from 'rxjs';
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

  selectedSheet$: Observable<any>;
  domain$: Observable<string>;
  fileData$: Observable<any>;
  constructor(private router: Router, private store: Store<AppState>, private service: CleansingService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$ = this.store.select(selectDomain);
  }

  ngOnInit() {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet]) => {
        this.service.startJob(fileData.metaData.file_id, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], domain)
          .subscribe((res) => {
            console.log(res);
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
