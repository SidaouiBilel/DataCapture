import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-format-date-component',
  templateUrl: './node-format-date-component.component.html',
  styleUrls: ['./node-format-date-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeFormatDateComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
