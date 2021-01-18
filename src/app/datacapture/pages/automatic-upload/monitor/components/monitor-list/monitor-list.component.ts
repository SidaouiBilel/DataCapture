import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.css']
})
export class MonitorListComponent implements OnInit {
  monitors$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() pipelines = [];
  @Input() getMonitor: (pipe: any, monitors$: BehaviorSubject<any>) => void;
  @Input() getTasks: (pipe: any, tasks$: BehaviorSubject<any>) => void;
  constructor() { }

  ngOnInit(): void {
  }

  getMonitors(pipe: any) {
    this.getMonitor(pipe, this.monitors$);
  }

}
