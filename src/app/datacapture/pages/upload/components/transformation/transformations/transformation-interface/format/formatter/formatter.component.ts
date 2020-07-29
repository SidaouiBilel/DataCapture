import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  ngOnInit() {
  }

}
