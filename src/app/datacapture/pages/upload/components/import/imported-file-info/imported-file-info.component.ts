import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectFileData } from '../../../store/selectors/import.selectors';

@Component({
  selector: 'app-imported-file-info',
  templateUrl: './imported-file-info.component.html',
  styleUrls: ['./imported-file-info.component.css']
})
export class ImportedFileInfoComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  fileData$
  metadata$
  headers$
  ngOnInit() {
    this.fileData$ = this.store.select(selectFileData);
    this.metadata$ = this.fileData$.pipe(map((data:any)=>data.metaData))
    this.headers$ = this.fileData$.pipe(map((data:any)=>data.headers))
  }

}
