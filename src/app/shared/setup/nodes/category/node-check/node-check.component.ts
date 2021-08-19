import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';


@Component({
  selector: 'app-node-check',
  templateUrl: './node-check.component.html',
  styleUrls: ['./node-check.component.css']
})
export class NodeCheckComponent extends PipelineNodeComponent  {

  constructor() {
    super()
   }



}
