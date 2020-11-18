import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState  , selectProfile} from '@app/core';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { Store } from '@ngrx/store';
import { ActionUploadFile, ActionImportReset, ActionSaveFile, ActionSelectDomain } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { Import } from '../../store/models/import.model';
import { selectImport } from '../../store/upload.selectors';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import * as urls from '@env/environment';
import { selectDomain, selectFileData } from '../../store/selectors/import.selectors';
import { ActionSelectSheet } from '../../store/actions/preview.actions';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  url: string;
  domains: any[];
  selectedDomain: any;
  fileData: any;
  keys = Object.keys;
  // Store
  importState$: Observable<Import>;
  selectedDomain$: Observable<any>;
  selectedProfile$: Observable<any>;
  fileData$: Observable<any>;
  SuccessMessage="Your file is ready to use";
  autoimportloading=false;
  constructor(private notification: NotificationService,
              private store: Store<AppState>,
              private router: Router,
              private service: FileImportService) {
    this.importState$ = this.store.select(selectImport);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.fileData$ = this.store.select(selectFileData);
    this.selectedProfile$=this.store.select(selectProfile);
    this.fileData$.subscribe((fileData) => {
      this.fileData = fileData;
    })
    this.selectedDomain$.subscribe((domain: any) => {
      this.selectedDomain = domain;
      if (domain) {
        this.selectedProfile$.subscribe((user :any)=>{
          if (user) {
              this.url = urls.environment.import + '?domainId=' + domain.id+"&userId="+user.id;
          }
        });
      }
    });
    this.domains = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: string, name: string, superDomain: string): void {
    this.store.dispatch(new ActionSelectDomain({id: event, name}, superDomain));
  }

  handleChange({file, fileList}: UploadChangeParam): void {
    const status = file.status;
    if (status === 'uploading') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: true, imported: false, error: false, progress: file.percent}));
    }
    if (status === 'done') {
      this.SuccessMessage="Your file has been uploaded successfully.";
      const uploadedFile: any = {
        token: file.name,
        sheets: [],
        numberOfRows: [],
        extension: file.name.split('.')[1],
        data: [],
        headers: [],
        file: [file]
      };
      this.store.dispatch(new ActionUploadFile({file: uploadedFile, importing: false, imported: true, error: false, progress: 100}));
      // tslint:disable-next-line: max-line-length
      this.store.dispatch(new ActionSaveFile({metaData: file.response, sheets: Object.keys(file.response.worksheets_map), data: [], headers: []}));
      this.store.dispatch(new ActionSelectSheet(0));
      this.notification.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: false, imported: false, error: true, progress: null}));
      this.notification.error(`${file.name} file upload failed.`);
    }
  }

  auto_import(fileresponse){
    this.SuccessMessage="Your file has been selected successfully.";
    const uploadedFile: any = {
      token: fileresponse.filename,
      sheets: [],
      numberOfRows: [],
      extension: fileresponse.filetype,
      data: [],
      headers: [],
      file: [{response:fileresponse}]
    };
      this.store.dispatch(new ActionUploadFile({file: uploadedFile, importing: false, imported: true, error: false, progress: 100}));
      // tslint:disable-next-line: max-line-length
      this.store.dispatch(new ActionSaveFile({metaData: fileresponse, sheets: Object.keys(fileresponse.worksheets_map), data: [], headers: []}));
      this.store.dispatch(new ActionSelectSheet(0));
      this.notification.success(`${fileresponse.filename} file uploaded successfully.`);
  }
  _autoimportloading(){
    this.autoimportloading = true;
  }
  cancelUpload(): void {
    this.autoimportloading=false;
    this.store.dispatch(new ActionImportReset());
    
  }

  goToPreview(): void {
    if ( !this.selectedDomain ) {
      this.notification.warn('Please select a domain.');
      return;
    }
    if ( !this.fileData.metaData ) {
      this.notification.warn('Please import your file.');
      return;
    }
    this.router.navigate(['/data/datacapture/upload/transform']);
  }
}
