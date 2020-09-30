import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent  extends TransformationInterfaceComponent implements OnInit  {
  
  operations = ['+','*','/','-']
  constructor() { 
    super()
  }

  ngOnInit() {
  }
}

