import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';


@Component({
  selector: 'app-pycode',
  templateUrl: './pycode.component.html',
  styleUrls: ['./pycode.component.css']
})
export class PycodeComponent extends OperationComponent{

  constructor() { 
    super()
  }


  ngOnInit() {
  }

  onCodeChanged(value){
    this.onDataChanged()
  }

  editorOptions = {language: 'python'};
}
