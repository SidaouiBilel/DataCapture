import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-numeric-transformation',
  templateUrl: './numeric-transformation.component.html'
})
export class NumericTransformationComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() {
    super()
  }

  aggFunctions = [
    {label:'Round', value:"round"},
    {label:'Ceil', value:"ceil"},
    {label:'Floor', value:"floor"},
  ]

  ngOnInit() {
  }

}
