import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DefaultArray } from '@app/shared/utils/arrays.utils';
import { nodeClasses } from '../../../models/factories/node-templates.factory';

@Component({
  selector: 'app-pipeline-editor-sidebar',
  templateUrl: './pipeline-editor-sidebar.component.html',
  styleUrls: ['./pipeline-editor-sidebar.component.css']
})
export class PipelineEditorSidebarComponent implements OnInit {

  @Output() addedNode = new EventEmitter<any>()
  @Output() onSave = new EventEmitter<any>()
  @Output() onSaveAs = new EventEmitter<any>()
  @Output() onViewTemplate = new EventEmitter<any>()

  constructor() { }

  nodesMap

  labels = {
    'DATASINK':'Datasink',
    'DATASOURCE':'Datasource',
    'TRANSFORMATION':'Transformation',
  }

  ngOnInit(): void {
    this.nodesMap = {}
    for (let node of nodeClasses){
      const arr = DefaultArray(this.nodesMap, this.labels[node.category] || node.category)
      arr.push(node)
    }
  }

  addNode(nodeClass){
    this.addedNode.emit(nodeClass.createNode())
  }
}
