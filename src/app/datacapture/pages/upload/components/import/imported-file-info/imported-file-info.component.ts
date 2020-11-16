import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FileImportService } from '../../../services/file-import.service';
import { selectFileData } from '../../../store/selectors/import.selectors';

@Component({
  selector: 'app-imported-file-info',
  templateUrl: './imported-file-info.component.html',
  styleUrls: ['./imported-file-info.component.css']
})
export class ImportedFileInfoComponent implements OnInit {

  constructor(private store: Store<AppState>, private service: FileImportService) { }
  fileData$
  metadata$
  headers$
  ngOnInit() {
    this.fileData$ = this.store.select(selectFileData);
    this.metadata$ = this.fileData$.pipe(map((data:any)=>data.metaData))
    this.headers$ = this.fileData$.pipe(map((data:any)=>data.headers))
  }


  selectedSheet = null
  generatedSheetId = null
  columns$ = new BehaviorSubject(null)
  // START INDEX 1
  columnStart = 0
  columnEnd = 0
  rowStart = 0
  rowEnd = 0
  total = 0
  getSheetId(ws){
    this.metadata$.pipe(take(1)).subscribe(metadata=>{
      this.service.generateSheet(
        metadata.file_id, 
        ws.sheetId, 
        this.columnStart,
        this.columnEnd,
        this.rowStart,
        this.rowEnd
      ).subscribe((sheetMetadata:any)=>{
        this.selectedSheet = sheetMetadata.sheetId
        this.generatedSheetId = sheetMetadata.sheet_id
        this.service.getFileData(1, this.generatedSheetId, 1, []).subscribe((data)=>{
          this.columns$.next(data.headers)
          this.total = data.total
        })
      })
    })
  }

}
