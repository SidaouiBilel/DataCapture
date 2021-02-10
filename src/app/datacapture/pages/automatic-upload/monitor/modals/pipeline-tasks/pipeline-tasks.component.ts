import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pipeline-tasks',
  templateUrl: './pipeline-tasks.component.html',
  styleUrls: ['./pipeline-tasks.component.css']
})
export class PipelineTasksComponent implements OnInit {
  task: any;
  download$: any;
  tasks$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private drawerRef: NzDrawerRef<PipelineTasksComponent>) { }

  ngOnInit(): void {
  }

  openLogs(id) {
    this.download$.next({id, task: this.task});
  }
}
