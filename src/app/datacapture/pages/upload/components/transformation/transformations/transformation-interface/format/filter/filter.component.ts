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

  onAddCondition(){
    this.data.conditions = this.data.conditions || []
    this.data.conditions.push({})
    
    this.onDataChanged()
  }

  onRemoveCondition(i){
    this.data.conditions.splice(i,1)
    
    this.onDataChanged()
  }


}
