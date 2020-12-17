import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PipelineNode } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineEditorService {

  updateTrigger$ = new Subject()

  constructor() { }

  links = [
    {
      id: 'a',
      source: 'first',
    target: 'second',
      label: 'is parent of'
    }, {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'custom label'
    }
  ]

  nodes = [
    {
      id: 'first',
      label: 'A'
    }, {
      id: 'second',
      label: 'B'
    }, {
      id: 'third',
      label: 'C'
    },
    {
      id: 'forth',
      label: 'C'
    },
    {
      id: 'fivth',
      label: 'C'
    }
  ]

  addNode(nodeType){
    const node = new PipelineNode()
    this.nodes.push(node)
    
    this.updateGraph()
  }
  
  startDrag(from_node){}

  updateGraph(){
    this.updateTrigger$.next()
  }

  deleteNode(nodeId){
    this.links = this.links.filter((l)=> l.source != nodeId && l.target != nodeId)
    this.nodes.splice(this.nodes.findIndex((e)=>e.id == nodeId), 1)

    this.updateGraph()
  }
  
  connectNodes(sourceId, targetId) {
    this.links.push({
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      label: 'Generated Link'
    })
    
    this.updateGraph()
  }
}
