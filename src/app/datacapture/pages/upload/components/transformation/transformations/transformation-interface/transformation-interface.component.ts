import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transformation-interface',
  templateUrl: './transformation-interface.component.html',
})
export class TransformationInterfaceComponent implements OnInit {

  @Output() validationStatus = new EventEmitter<boolean>()
  @Output() dataChanged = new EventEmitter<any>()
  data: any = {}

  form_orientation = 'horizontal'
  
  constructor() { }


  ngOnInit() {
  }

  validate(){
    this.validationStatus.emit(true)
  }

  onDataChanged(){
    this.dataChanged.emit(this.data)
  }

  setData(data){
    this.data = data
  }

}
