import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.css']
})
export class TemplateCardComponent implements OnInit {

  constructor() { }

  @Input() data;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() clone = new EventEmitter<any>();
  @Output() Seetemplate = new EventEmitter<any>();
  ngOnInit(): void {
  }
  cloneEmmiter(clonemodaltitle , data){
    this.clone.emit({templateref :  clonemodaltitle , data})
  }

}
