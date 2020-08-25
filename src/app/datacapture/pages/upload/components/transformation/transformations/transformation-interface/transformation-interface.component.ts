import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-transformation-interface',
  templateUrl: './transformation-interface.component.html',
})
export class TransformationInterfaceComponent implements OnInit {

  @Output() dataChanged = new EventEmitter<any>()

  @Input() data: any = {};
  @Input() index = null;

  @Input() size = 'small';

  form_orientation = 'horizontal';
  
  constructor() { }


  ngOnInit() {
  }

  validate(){
    return true;
  }

  onDataChanged(){
    // VALIDATE
    this.dataChanged.emit(this.data);
  }
  

}
