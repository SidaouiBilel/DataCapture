import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-look-in-node',
  templateUrl: './look-in-node.component.html',
  styleUrls: ['./look-in-node.component.css']
})
export class LookInNodeComponent extends PipelineNodeComponent  {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

  onDataChanged(){}

  addInput(){
    this.data.inputs = this.data.inputs || []
    const inputs = this.data.inputs

    const index = inputs.length
    const prefix = (index)?("_"+index): ""
    const portId = "INPUT"+prefix
    const name = "df"+prefix
    inputs.push({portId, name})
  }

  removeInput(){
    this.data.inputs = this.data.inputs || []
    const inputs = this.data.inputs
    inputs.pop()
  }

}
