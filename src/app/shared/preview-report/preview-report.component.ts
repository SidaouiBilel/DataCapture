import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.css']
})
export class PreviewReportComponent implements OnInit {
  sheet_id;
  report_content;
  length_vars;

  constructor(public importService: FileImportService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    if (this.sheet_id) {
      this.importService.getReportData(this.sheet_id).subscribe(
        (res: any) => {
          this.report_content = res;
          this.ntf.success('Report generated successfully...');
          this.length_vars = Object.keys( this.report_content.variables ).length;
        }, (err) => {
          this.drawerRef.close();
          this.ntf.warn('Report failed...');
        }
      );
    }
  }


}
