import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends TransformationInterfaceComponent implements OnInit  {

  operations = ['>','<', '>=','<=','==','!=']
  
  constructor() { 
    super()
  }

  ngOnInit() {
  }


}
