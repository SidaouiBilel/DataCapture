import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ManualUploadEditorService } from '../../../services/manual-upload-editor.service';
import { ResetEditor } from '../../../store/actions/editor.actions';
import { ResetImport } from '../../../store/actions/import.actions';
import { ResetWorkbook } from '../../../store/actions/job.actions';
import { ResetTransformations } from '../../../store/actions/transformation.actions';

@Component({
  selector: 'app-default-toolbar',
  templateUrl: './default-toolbar.component.html',
  styleUrls: ['./default-toolbar.component.css']
})
export class DefaultToolbarComponent implements OnInit {

  constructor(public store: Store<AppState>, private editor: ManualUploadEditorService) { }

  ngOnInit(): void {
  }

  reset(){
    this.store.dispatch(new ResetImport())
    this.store.dispatch(new ResetTransformations())
    this.store.dispatch(new ResetWorkbook())
    this.store.dispatch(new ResetEditor())
  }

  openExport(){
    this.editor.openExport();
  }
}
