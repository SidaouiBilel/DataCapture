import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '@app/datacapture/pages/admin/componenets/references/reference.service';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-is-refrence-check-node',
  templateUrl: './is-refrence-check-node.component.html',
  styleUrls: ['./is-refrence-check-node.component.css']
})
export class IsRefrenceCheckNodeComponent extends PipelineNodeComponent  {

  constructor( private service:ReferenceService) { 
    super()
  }

  
}
