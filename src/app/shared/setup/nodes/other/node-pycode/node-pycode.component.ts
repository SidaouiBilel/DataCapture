import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-pycode',
  templateUrl: './node-pycode.component.html',
  styleUrls: ['./node-pycode.component.css']
})
export class NodePycodeComponent extends PipelineNodeComponent  {

  constructor() { 
    super()
  }

  editorOptions = {language: 'python'};

  ngOnInit(): void {
  }

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
