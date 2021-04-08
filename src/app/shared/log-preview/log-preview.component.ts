import { MonitorService } from './../../datacapture/pages/automatic-upload/monitor/service/monitor.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-log-preview',
  templateUrl: './log-preview.component.html',
  styleUrls: ['./log-preview.component.css']
})
export class LogPreviewComponent implements OnInit {
  task_id
  execution_date
  dag_id
  logs

  constructor(private monitorService: MonitorService, private ntf: NotificationService, private drawerRef: NzDrawerRef<string>) { }

  ngOnInit(): void {
    if (this.task_id && this.execution_date && this.dag_id) {
      this.getLogs(this.dag_id, this.task_id, this.execution_date)
    }
  }

  getLogs(dag_id: any, task_id: any, execution_date: any) {
    this.monitorService.getTaskLogs(dag_id, task_id, execution_date).subscribe(
      data => {
        this.ntf.success('Logs generated successfully...');
        this.logs = data
      }, err => {
        this.drawerRef.close();
        this.ntf.warn('Logs failed...');
      }
    )
  }

}
