import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-category-hash',
  templateUrl: './category-hash.component.html',
  styleUrls: ['./category-hash.component.css']
})
export class CategoryHashComponent extends PipelineNodeComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  categories$ = new BehaviorSubject([
    {value:'MED', label:'Medical'},
    {value:'PER', label:'Personal'},
    {value:'COM', label:'Commercial'},
    {value:'OTH', label:'Uncategorized'},
  ])

}
