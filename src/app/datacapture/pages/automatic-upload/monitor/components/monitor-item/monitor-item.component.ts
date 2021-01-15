import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.css']
})
export class MonitorItemComponent implements OnInit {
  @Input() monitors:any;
  constructor() { }

  ngOnInit(): void {
  }

}
