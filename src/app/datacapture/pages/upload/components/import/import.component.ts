import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState } from '@app/core';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { Store } from '@ngrx/store';
import { ActionUploadFile, ActionImportReset, ActionSaveFile, ActionSelectDomain } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { Import } from '../../store/models/import.model';
import { selectImport } from '../../store/upload.selectors';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import * as urls from '@env/environment';
import { selectDomain } from '../../store/selectors/import.selectors';
import { take } from 'rxjs/operators';
import { SaveMappingFields } from '../../store/actions/mapping.actions';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  url: string;
  domains: any[];
  selectedDomain: any;
  // Store
  importState$: Observable<Import>;
  selectedDomain$: Observable<string>;
  constructor(private notification: NotificationService,
              private store: Store<AppState>,
              private router: Router,
              private service: FileImportService) {
    this.importState$ = this.store.select(selectImport);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedDomain$.pipe(take(1)).subscribe((domain) => {
      this.selectedDomain = domain;
      this.url = urls.environment.upload + '?domainId=' + domain;
    });
    this.domains = [];
  }

  ngOnInit() {
    this.service.getAll().subscribe((domains: any[]) => {
      this.domains = domains.map((e) => ({id: e.id, name: e.name}));
    });
  }

  selectDomain(event: string): void {
    this.service.getTargetFields(event).subscribe((res: any) => {
      this.store.dispatch(new SaveMappingFields(res));
    });
    this.store.dispatch(new ActionSelectDomain(event));
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
      // tslint:disable-next-line: max-line-length
      this.store.dispatch(new ActionSaveFile({metaData: file.response, sheets: Object.keys(file.response.worksheets_map), data: [], headers: []}));
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
