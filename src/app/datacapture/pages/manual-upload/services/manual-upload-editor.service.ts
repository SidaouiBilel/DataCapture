import { ImportDatasourceModalComponent } from './../modals/import-datasource-modal/import-datasource-modal.component';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';


@Injectable({
  providedIn: 'root'
})
export class ManualUploadEditorService {

  constructor(private modalService: NzModalService) { }


  openImport() {

    const modal = this.modalService.create({
      nzTitle: 'Import Datasource',
      nzFooter: [],
      nzContent: ImportDatasourceModalComponent,
      nzComponentParams: { },
    });

  }
}
