import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { selectPreviewMode, selectPipeExpanded } from '../transformation/store/transformation.selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  previewMode$: Observable<'SOURCE' | 'TARGET'>;
  expanded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
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

  onNext() {
    return this.goToMapping();
  }

}
