import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pipeline-run-toolbar',
  templateUrl: './pipeline-run-toolbar.component.html',
  styleUrls: ['./pipeline-run-toolbar.component.css']
})
export class PipelineRunToolbarComponent implements OnInit {

  @Input("run") set _run(value){this.updateData(value)}
  @Output() trigger = new EventEmitter<any>()
  
  run:any
  updateData(value){
    this.run = value
    if(this.run){
      this.showProgress = true
      this.runStatus = this.run.state
      this.progressSteps = this.run.tasks.length
      this.doneSteps = this.run.tasks.filter(e=>e.state=='success').length

      this.progress = (this.doneSteps / this.progressSteps) * 100


      switch(this.runStatus){
        // success, failed, running
        case "success": {
          this.progressStatus = 'success' ;
          break;
        }
        case "failed": {
          this.progressStatus = 'exception';
          this.progress = 100
          break;
        }
        case "running": {
          this.progressStatus = 'active' ;
          break;
        }
        default: {
          this.progressStatus = 'normal';
          break;
        }
      }
    } else {
      this.reset()
    }
  }

  reset(){
    this.progressSteps = 0
    this.doneSteps = 0
    this.progress = 0
    this.runStatus = 'not_running'
    this.progressStatus = 'normal'
    this.showProgress = false
  }

  runStatus
  progressSteps
  doneSteps
  progress
  progressStatus
  showProgress
  
  constructor() { 
    this.reset()
  }

  ngOnInit(): void {
  }

}
