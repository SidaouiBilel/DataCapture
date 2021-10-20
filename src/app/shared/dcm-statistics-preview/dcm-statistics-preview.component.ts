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
  consommation$ = new BehaviorSubject<any>([]);
  type
  public pieChartType: ChartType = 'pie';

  // Region Chart
  public pieRegionChartLabels: Label[] = [];
  public pirRegionChartData = []

  // Milieu Chart
  public pieMilieuChartLabels: Label[] = ['Urbain', 'Rural'];
  public pieMilieuChartData = []

  // ------------------ RAMED ------------------- //
  // Score Chart
  public pieScoreChartLabels: Label[] = ['En position de pauvreté', 'En position vulnérable', 'Rejeté'];
  public pieScoreChartData = []

  // ------------------ HCP ------------------- //
  // Social Chart
  public piePauvreChartLabels: Label[] = ['Pauvre', 'Pas pauvre'];
  public piePauvreChartData: SingleDataSet = [,];

  constructor(public importService: FileImportService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    this.getStatistics(this.sheet_id, this.type)
  }

  // ------------------ RAMED / HCP ------------------- //
  // type == true => RAMED
  getStatistics(sheet_id, type) {
    if (sheet_id) {
      this.consommation$.next([])
      this.importService.getStatisticsData(sheet_id, type).subscribe(
        (res: any) => {
          this.stats_content = res;
          this.consommation$.next(res.consommation)
          this.prepareRegionChart(res['region'])
          this.prepareMilieuChart(res['milieu'])

          if (type)
            this.prepareScoreChart(res['categorie'])
          else
            this.preparePauvrePie(res['pauvre'])

          this.ntf.success('Statistics generated successfully...');
        }, (err) => {
          this.consommation$.next([])
          this.drawerRef.close();
          this.ntf.warn('Statistics failed...');
        }
      );
    }
  }

  prepareRegionChart(data) {
    Object.keys(data).forEach(key => {
      this.pieRegionChartLabels.push(key)
      this.pirRegionChartData.push(data[key].toFixed(2))
    })
  }

  prepareMilieuChart(data) {
    Object.keys(data).forEach(key => {
      this.pieMilieuChartData.push(data[key].toFixed(2))
    })
  }

  // ------------------ RAMED -------------------- //
  prepareScoreChart(data) {
    Object.keys(data).forEach(key => {
      this.pieScoreChartData.push(data[key].toFixed(2))
    })
  }

  // ------------------ HCP -------------------- //
  preparePauvrePie(data) {
    this.piePauvreChartData[0] = data[0].toFixed(2)
    this.piePauvreChartData[1] = data[1].toFixed(2)
  }
}
