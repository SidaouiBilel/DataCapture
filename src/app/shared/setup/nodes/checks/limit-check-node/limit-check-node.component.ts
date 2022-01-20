import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-limit-check-node',
  templateUrl: './limit-check-node.component.html',
  styleUrls: ['./limit-check-node.component.css']
})
export class LimitCheckNodeComponent  extends PipelineNodeComponent  {

  constructor() { 
    super()
  }

  operators = ['>', '>=', '<', '<=', '==']

}
