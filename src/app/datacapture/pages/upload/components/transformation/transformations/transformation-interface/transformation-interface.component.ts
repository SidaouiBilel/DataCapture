import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transformation-interface',
  templateUrl: './transformation-interface.component.html',
})
export class TransformationInterfaceComponent implements OnInit {

  @Output() validationStatus = new EventEmitter<boolean>()
  @Output() dataChanged = new EventEmitter<any>()

  data: any = {};
  index = null;

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
    // VALIDATE AND EMIT ERRORS
    this.validationStatus.emit(this.validate());
  }

  setData(data){
    this.data = data;
  }

}
