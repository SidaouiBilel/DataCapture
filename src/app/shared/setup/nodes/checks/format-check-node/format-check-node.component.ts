import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-format-check-node',
  templateUrl: './format-check-node.component.html',
  styleUrls: ['./format-check-node.component.css']
})
export class FormatCheckNodeComponent extends PipelineNodeComponent  {

  constructor() { 
    super()
  }
}
