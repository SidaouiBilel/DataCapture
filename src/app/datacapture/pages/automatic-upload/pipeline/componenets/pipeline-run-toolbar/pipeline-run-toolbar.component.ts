import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipeline-run-toolbar',
  templateUrl: './pipeline-run-toolbar.component.html',
  styleUrls: ['./pipeline-run-toolbar.component.css']
})
export class PipelineRunToolbarComponent implements OnInit {

  @Input("run") set _run(value){this.updateData(value)}
  run:any
  updateData(value){
    this.run = value
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
