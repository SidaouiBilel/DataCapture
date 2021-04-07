import { MonitorService } from './../../datacapture/pages/automatic-upload/monitor/service/monitor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-preview',
  templateUrl: './log-preview.component.html',
  styleUrls: ['./log-preview.component.css']
})
export class LogPreviewComponent implements OnInit {
  task_id
  execution_date
  dag_id

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    if (this.task_id && this.execution_date && this.dag_id) {
      console.log('task_id', this.task_id)
      console.log('execution_date', this.execution_date)
      console.log('dag_id', this.dag_id)
      this.getLogs(this.dag_id, this.task_id, this.execution_date)
    }
  }

  getLogs(dag_id: any, task_id: any, execution_date: any) {
    this.monitorService.getTaskLogs(dag_id, task_id, execution_date).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
