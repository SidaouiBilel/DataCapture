import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { numberToLetters } from '@app/shared/utils/strings.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { selectColRange, selectRowRange } from '../../../store/selectors/import.selectors';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  fileExtension = "";
  colValue:any[] = [0, 0];
  rowValue = [0, 0];
  rowRange$: Observable<any>;
  colRange$: Observable<any>;
  fileData$: Observable<any>;
  constructor(private store: Store<AppState>) {
    this.rowRange$ = this.store.select(selectRowRange);
    this.colRange$ = this.store.select(selectColRange);
    this.rowRange$.subscribe((rR) => {this.rowValue = [...rR]; });
    this.colRange$.subscribe((cR) => {this.colValue = [...cR];});
  }

  ngOnInit() {
    this.fileData$.pipe(take(1)).subscribe((file) => {
      if (file && file.metaData) {
        this.fileExtension = file.metaData.file_type;
        if (this.fileExtension === 'xlsx') {
          const col = [numberToLetters(this.colValue[0]), numberToLetters(this.colValue[1])];
          this.colValue = col;
        }
      }
    })
  }

}
