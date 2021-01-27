import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-filter-component',
  templateUrl: './node-filter-component.component.html',
  styleUrls: ['./node-filter-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeFilterComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
