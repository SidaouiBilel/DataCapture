import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { selectPreviewMode, selectPipeExpanded } from '../transformation/store/transformation.selectors';
import { TranformationService } from '../transformation/services/tranformation.service';
import { NzModalService } from 'ng-zorro-antd';
import { PipeChangesAlertComponent } from './pipe-changes-alert/pipe-changes-alert.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  
  previewMode$: Observable<'SOURCE' | 'TARGET'>;
  expanded$: Observable<boolean>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private modal: NzModalService,
              private pipe: TranformationService
              ) {
    this.previewMode$ = this.store.select(selectPreviewMode);
    this.expanded$ = this.store.select(selectPipeExpanded);
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToImport(): void {
    this.router.navigate(['/datacapture/upload/import']);
  }


  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }
  
  onNext(){
    return this.goToMapping()
  }

}
