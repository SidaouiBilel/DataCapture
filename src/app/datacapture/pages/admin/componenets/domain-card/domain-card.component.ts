import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuperDomain } from '../../models/super-domain';

@Component({
  selector: 'app-domain-card',
  templateUrl: './domain-card.component.html',
  styleUrls: ['./domain-card.component.css']
})
export class DomainCardComponent implements OnInit {

  constructor() { }

  @Input() data: SuperDomain

  @Output() categories = new EventEmitter<any>()
  @Output() edit = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()

  ngOnInit() {
  }

  getAvatar(d:any){
    return (d.name || ' ')[0]
  }
}
