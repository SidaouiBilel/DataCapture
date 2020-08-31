import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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

  status$: any;
  result$: BehaviorSubject<any> = new BehaviorSubject(null);
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
    this.service.upload(payload).subscribe((res: any) => {
      console.log(res);
      this.store.dispatch(new ActionSaveUploadId(res));
    });
  }

  checkUploadStatus(id: string): void {
    this.status$ = this.service.getUploadStatus(id).subscribe((res) => {
      this.result$.next(res);
    });
  }

}
