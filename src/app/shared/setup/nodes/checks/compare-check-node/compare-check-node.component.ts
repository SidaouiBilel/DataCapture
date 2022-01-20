import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-compare-check-node',
  templateUrl: './compare-check-node.component.html',
  styleUrls: ['./compare-check-node.component.css']
})
export class CompareCheckNodeComponent extends PipelineNodeComponent  {

  constructor() { 
    super()
  }

  operators = ['>', '>=', '<', '<=', '==']
}
