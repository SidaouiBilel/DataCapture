import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipeline-node',
  templateUrl: './pipeline-node.component.html',
  styleUrls: ['./pipeline-node.component.css']
})
export class PipelineNodeComponent implements OnInit {

  data

  constructor() { }

  ngOnInit(): void {
  }

  onSave = new EventEmitter<any>()
  onCancel = new EventEmitter<void>()

  save(){
    this.onSave.emit(this.data)
  }

  cancel(){
    this.onCancel.emit(this.data)
  }
}
