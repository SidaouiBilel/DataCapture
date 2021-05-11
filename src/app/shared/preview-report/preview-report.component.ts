import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.css']
})
export class PreviewReportComponent implements OnInit {
  @Input() sheet_id;
  report_content;
  length_vars;

  constructor(public importService: FileImportService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    this.getReport(this.sheet_id)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.report_content = null
    this.getReport(changes.sheet_id.currentValue)
  }

  getReport(sheet_id) {
    if (sheet_id) {
      this.importService.getReportData(sheet_id).subscribe(
        (res: any) => {
          this.report_content = res;
          this.ntf.success('Report generated successfully...');
          this.length_vars = Object.keys(this.report_content.variables).length;
        }, (err) => {
          this.drawerRef.close();
          this.ntf.warn('Report failed...');
        }
      );
    }
  }

}
