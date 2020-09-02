import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UploadService } from './../../../services/upload.service';
import { UploadingPayload } from './../../../models/uploading.model';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionSaveUploadId } from '../../../store/actions/uploading.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { selectUploadingId } from '../../../store/selectors/upload.selectors';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit, OnDestroy {
  @Input() metaData: any;
  @Input() selectedTags: any;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  progress = 101;
  colors = ['cyan', 'red', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple'];
  status$: any;
  result$: BehaviorSubject<any> = new BehaviorSubject(null);
  uploadStatus$: BehaviorSubject<any> = new BehaviorSubject('READY');
  uploadingId$: Observable<string>;
  constructor(private service: UploadService, private store: Store<AppState>) {
    this.uploadingId$ = store.select(selectUploadingId);
  }

  ngOnDestroy(): void {
    if (this.status$) { this.status$.unsubscribe(); }
  }

  ngOnInit() {
    this.uploadingId$.subscribe((id: string) => {
      if (id) {
        this.checkUploadStatus(id);
      }
    });
  }

  onUpload(): void {
    const payload: UploadingPayload = {
      id: null,
      tags: this.selectedTags,
      domain_id: this.metaData.domainId,
      sheet_id: this.metaData.sheetId,
      file_id: this.metaData.fileId,
      cleansing_job_id: this.metaData.cleansingId,
      transformation_id: this.metaData.transformationId
    };
    this.uploadStatus$.next('STARTED');
    this.progress = 0;
    this.service.upload(payload).subscribe((res: any) => {
      this.store.dispatch(new ActionSaveUploadId(res));
    });
  }

  checkUploadStatus(id: string): void {
    this.progress = 0;
    this.uploadStatus$.next('STARTED');
    this.status$ = this.service.getUploadStatus(id).subscribe((res) => {
      res.upload_tags = res.upload_tags.map((e) => ({color: this.getRandom(), value: e }));
      this.result$.next(res);
      this.uploadStatus$.next(res.upload_status);
      if (['ERROR', 'DONE'].includes(res.upload_status)) {
        if (this.status$) { this.status$.unsubscribe(); }
      }
    });
  }

  format = () => {if (this.progress === 101) { return 'Upload'; } else {return 'Uploading...'; }};

  getRandom() { return this.colors[Math.floor(Math.random() * 11)]; }
}
