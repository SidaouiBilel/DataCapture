import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';



@Component({
  selector: 'app-dcm-statistics-preview',
  templateUrl: './dcm-statistics-preview.component.html',
  styleUrls: ['./dcm-statistics-preview.component.css']
})
export class DcmStatisticsPreviewComponent implements OnInit {
  @Input() sheet_id;
  report_content;
  length_vars;

  //Pie Pauvre
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(public importService: FileImportService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    this.getStatistics(this.sheet_id)
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.report_content = null
  //   this.getStatistics(changes.sheet_id.currentValue)
  // }

  getStatistics(sheet_id) {
    console.log(" === sheet_id === ",sheet_id);
    if (sheet_id) {
      this.importService.getStatisticsData(sheet_id).subscribe(
        (res: any) => {
          console.log("res",res);
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
