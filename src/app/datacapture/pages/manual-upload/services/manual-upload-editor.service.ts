import { ImportDatasourceModalComponent } from './../modals/import-datasource-modal/import-datasource-modal.component';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ExportDatasinkModalComponent } from '../modals/export-datasink-modal/export-datasink-modal.component';
import { HeaderDescriptionComponent } from '../../upload/components/transformation/modals/transformation-preview-help/header-description/header-description.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { withValue } from '@app/shared/utils/rxjs.utils';


@Injectable({
  providedIn: 'root'
})
export class ManualUploadEditorService {

  constructor(private modalService: NzModalService, private http: HttpClient) { }


  openImport() {
    const modal = this.modalService.create({
      nzTitle: null,
      nzFooter: null,
      nzContent: ImportDatasourceModalComponent,
      nzComponentParams: { },
      nzWidth:'70vw'
    });
  }

  openExport(){
    alert()
    const modal = this.modalService.create({
      nzTitle: null,
      nzFooter: null,
      nzContent: ExportDatasinkModalComponent,
      nzComponentParams: { },
      nzWidth:'70vw'
    });
  }

  viewDescription(sheet$, params) {
    const id = params.column.getId();
    // call on me
    withValue(sheet$, (sheet) => {
      console.log('sheet', sheet)
      this.http.post(environment.import + 'describe', {sheet_id: sheet.sheet_id, column: id}).subscribe((res) => {
        const modal = this.modalService.create({
          nzTitle: 'Header Description',
          nzClosable: false,
          nzWrapClassName: 'vertical-center-modal',
          nzWidth: 'xXL',
          nzContent: HeaderDescriptionComponent,
          nzOkText: null,
          nzCancelText: 'Close',
          nzComponentParams: {
            description: res,
            name: id
          }
        });
      });
    });
  }
}
