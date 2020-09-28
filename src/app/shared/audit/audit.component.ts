import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  @Input() audits: any;
  keys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

  Number(val: any) {
    return Number(val);
  }

}
