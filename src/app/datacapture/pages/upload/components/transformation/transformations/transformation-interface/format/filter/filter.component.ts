import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends TransformationInterfaceComponent implements OnInit  {

  operations = [
    {label:'Numbers', operations:[
      {value: '>', label: 'Greater'},
      {value: '<', label: 'Lesser'}, 
      {value: '>=', label: 'Greater or Equal'},
      {value: '<=', label: 'Lesser or Equal'},
      {value: '==', label: 'Equal'},
      {value: '!=', label: 'Not Equal'}
    ]},
    {label:'Strings', operations:[
      {value: 'match', label: 'REGEX'}, 
      {value: 'contains', label: 'Contains'}, 
      {value: 'startswith', label: 'Starts With'}, 
      {value: 'endswith', label: 'Ends With'},
    ]}
  ]
  
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
