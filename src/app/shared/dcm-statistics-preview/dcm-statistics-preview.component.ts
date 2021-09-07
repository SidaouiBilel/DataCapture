import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dcm-statistics-preview',
  templateUrl: './dcm-statistics-preview.component.html',
  styleUrls: ['./dcm-statistics-preview.component.css']
})
export class DcmStatisticsPreviewComponent implements OnInit {
  sheet_id;
  stats_content;
  length_vars;
  resultat$ = new BehaviorSubject<any>([]);


  // Social Chart
  public piePauvreChartLabels: Label[] = ['Poor', 'Not Poor'];
  public piePauvreChartData: SingleDataSet = [,];
  public pieChartType: ChartType = 'pie';

  // Geographic Chart
  public pieRegionChartLabels: Label[] = [];
  public pirRegionChartData = []

  constructor(public importService: FileImportService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    this.getStatistics(this.sheet_id)
  }

  getStatistics(sheet_id) {
    if (sheet_id) {
      this.resultat$.next([])
      this.importService.getStatisticsData(sheet_id).subscribe(
        (res: any) => {
          this.stats_content = res;
          this.resultat$.next(res.resultat)
          this.preparePauvrePie(res['pauvre'])
          this.prepareRegionChart(res['region'])
          this.ntf.success('Statistics generated successfully...');
        }, (err) => {
          this.resultat$.next([])
          this.drawerRef.close();
          this.ntf.warn('Statistics failed...');
        }
      );
    }
  }

  preparePauvrePie(data) {
    this.piePauvreChartData[0] = data[0].toFixed(2)
    this.piePauvreChartData[1] = data[1].toFixed(2)
  }

  prepareRegionChart(data) {
    Object.keys(data).forEach(key => {
      this.pieRegionChartLabels.push(key)
      this.pirRegionChartData.push(data[key].toFixed(2))
    })
  }

}
