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
}
