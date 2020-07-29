import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transformation-interface',
  templateUrl: './transformation-interface.component.html',
})
export class TransformationInterfaceComponent implements OnInit {

  @Output() validationStatus = new EventEmitter<boolean>()
  @Output() paramsChanged = new EventEmitter<any>()
  data: any
  
  constructor() { }


  ngOnInit() {
  }

  validate(){
    this.validationStatus.emit(true)
  }

}
