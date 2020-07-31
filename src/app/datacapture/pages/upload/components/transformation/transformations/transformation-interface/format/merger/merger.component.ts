import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-merger',
  templateUrl: './merger.component.html',
  styleUrls: ['./merger.component.css']
})
export class MergerComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  ngOnInit() {
  }

  setData(data){
    super.setData(data)
    this.data.columns = this.data.columns || []
  }
}
