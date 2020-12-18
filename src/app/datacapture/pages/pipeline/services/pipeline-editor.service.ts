import { Injectable } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { PiplineTemplateViewerComponent } from '../componenets/pipeline-editor/pipline-template-viewer/pipline-template-viewer.component';
import { nodeClasses } from '../models/factories/node-templates.factory';
import { PipelineNode } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineEditorService {

  NODES_LIST = nodeClasses
  links = []
  nodes = []

  constructor(private drawer: NzDrawerService) { }

  getNodeClass(category){
    return this.NODES_LIST.find(c=>c.category==category)
  }

  editNode(node){
    return new Observable(observer=>{
      const nodeClass = this.getNodeClass(node.category)
      const ref = this.drawer.create({
        nzContent: nodeClass.componenet,
      nzContentParams:{
        data: node
      },
      nzWidth: '500px'
    })

    setTimeout(()=> {
      ref.getContentComponent().onSave.subscribe((newNode)=>{observer.next(newNode); observer.complete() ; ref.close()})
      ref.getContentComponent().onCancel.subscribe(()=> ref.close())
    }, 0)
    })
  }

  viewTemplate(nodes, links){
    const ref = this.drawer.create({
      nzContent: PiplineTemplateViewerComponent,
      nzContentParams:{
        nodes,
        links
      },
      nzWidth: '90vw'
    })
  }

  updateNode(node){
  }

  addNode(nodeCategory){
  }

  deleteNode(node){
  }
  
}
