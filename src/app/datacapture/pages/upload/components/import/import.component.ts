import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState } from '@app/core';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { Store } from '@ngrx/store';
import { ActionUploadFile, ActionImportReset } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { Import } from '../../store/models/import.model';
import { selectImport } from '../../store/upload.selectors';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import * as urls from '@env/environment';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  url = urls.environment.upload;
  // Store
  importState$: Observable<Import>;
  constructor(private notification: NotificationService,
              private store: Store<AppState>,
              private router: Router,
              private service: FileImportService) {
    this.importState$ = this.store.select(selectImport);
  }

  ngOnInit() {
  }

  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status === 'uploading') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: true, imported: false, error: false, progress: file.percent}));
    }
    if (status === 'done') {
      const uploadedFile: any = {
        token: file.name,
        sheets: [],
        numberOfRows: [],
        extenstion: file.name.split('.')[1],
        data: [],
        headers: [],
        file: [file]
      };
      this.store.dispatch(new ActionUploadFile({file: uploadedFile, importing: false, imported: true, error: false, progress: 100}));
      this.notification.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: false, imported: false, error: true, progress: null}));
      this.notification.error(`${file.name} file upload failed.`);
    }
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToPreview(): void {
    this.router.navigate(['/datacapture/upload/preview']);
  }
}
