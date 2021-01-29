import { Injectable } from '@angular/core';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EditPipelineMetadataComponent } from '../componenets/modals/edit-pipeline-metadata/edit-pipeline-metadata.component';
import { PiplineTemplateViewerComponent } from '../componenets/pipeline-editor/pipline-template-viewer/pipline-template-viewer.component';
import { PipelineMetadata } from '../models/metadata.model';
import { ALL_NODES } from '../models/factories/templates.factory';
import { DcmPreviewGridComponent } from '@app/shared/dcm-preview-grid/dcm-preview-grid.component';

@Injectable({
  providedIn: 'root'
})
export class PipelineEditorService {

  NODES_LIST = ALL_NODES;
  links = [];
  nodes = [];

  constructor(private drawer: NzDrawerService, private msg:NzMessageService) { }

  getNodeClass(type): any{
    return this.NODES_LIST.find(c => c.type === type);
  }

  editNode(node){
    return new Observable(observer => {
      const nodeClass = this.getNodeClass(node.type);
      const ref: any = this.drawer.create({
        nzContent: nodeClass.getComponenent(node),
        nzContentParams: {
          data: node
        },
        nzWidth: '700px',
        nzClosable: false,
      });

      setTimeout(() => {
        ref.getContentComponent().onSave.subscribe((newNode) => {observer.next(newNode); observer.complete() ; ref.close(); });
        ref.getContentComponent().onCancel.subscribe(() => ref.close());
      }, 0);
    });
  }

  viewTemplate(nodes, links){
    const ref = this.drawer.create({
      nzContent: PiplineTemplateViewerComponent,
      nzContentParams: {
        nodes,
        links
      },
      nzWidth: '90vw',
      nzClosable: false,
    });
  }

  editPipeline(metaData): Observable<PipelineMetadata> {
    return new Observable(observer=>{
      const ref = this.drawer.create({
        nzTitle: 'Pipeline MetaData',
        nzContent: EditPipelineMetadataComponent,
        nzContentParams: {
          metaData
        },
        nzWidth: '40vw',
        nzClosable: false,
      })
      ref.afterClose.subscribe((metadata: PipelineMetadata) => {
        observer.next(metadata)
        observer.complete()
      });
    })
  }

  updateNode(node){
  }

  addNode(nodeCategory){
  }

  deleteNode(node){
  }

  previewNode(data: any, run: any) {
    const task = run.tasks.find(t=>t.task_id==data.key)
    const output = task.output || {}

    // TODO WEIRD OUTPUT SHOULD INVESTIGATE
    if(output.file_id && output.sheet_id){
      this.drawer.create({
        nzTitle: data.label + ' Preview',
        nzContent: DcmPreviewGridComponent,
        nzContentParams: {
          file_id: output.file_id,
          sheet_id: output.sheet_id,
          folder: output.folder,
        },
        nzWidth: '90vw',
      })
    } else if(output.status == 'success') {
      this.msg.info('No Preview for this Node')
    } else {
      this.msg.info('Preview is not ready')
    }
  }

}
