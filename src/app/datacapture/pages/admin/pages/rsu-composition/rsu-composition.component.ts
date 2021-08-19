import { RsuDataEditorComponent } from './../../modals/rsu-data-editor/rsu-data-editor.component';
import { RsuService } from './../../services/rsu.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ReferenceService } from '../../componenets/references/reference.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rsu-composition',
  templateUrl: './rsu-composition.component.html',
  styleUrls: ['./rsu-composition.component.css']
})
export class RsuCompositionComponent implements OnInit {
  loading;
  uploadURI;
  updateURI;
  rsuData$: Subject<any> = new Subject();
  rsuSources$: Subject<any> = new Subject();
  // rsuTargets$: Subject<any> = new Subject();
  rsuTargets = []


  constructor(public service: RsuService, private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.updateURI = this.service.RsuDataUpdate();
    this.uploadURI = this.service.RsuDataImport();
    this.laodData()
  }

  onBack() {
    console.log("Click on back button");
  }

  laodData() {
    this.rsuData$.next([]);
    this.rsuSources$.next([]);
    // this.rsuTargets$.next([]);
    this.rsuTargets = [];

    this.loading = true;
    this.service.getAllRsuCompostion()
      .subscribe(
        (res: any) => {
          this.rsuData$.next(res.data);
          this.rsuSources$.next(res.sources);
          // this.rsuTargets$.next(res.targets);
          this.rsuTargets = res.targets
          this.loading = false;
        });
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.loading = true;
    }
    if (info.file.status === 'done') {
      this.laodData();
    } else if (info.file.status === 'error') {
      this.laodData();
    }
  }

  download() {
    console.log("download file");
  }


  onEdit(row) {
    this.modal.create({
      nzContent: RsuDataEditorComponent,
      nzComponentParams: { data: row },
    }).afterClose.subscribe(success => {
      if (success) {
        this.laodData()
      }
    });
  }


  onDelete(row) {
    console.log("Edit a row", row);
  }

}
