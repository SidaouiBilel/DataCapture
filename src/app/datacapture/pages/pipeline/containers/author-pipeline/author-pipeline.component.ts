import { Component, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditMetaData, PipelineEditNodes } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes, selectPipelineMetaData } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { PipelineEditorService } from '../../services/pipeline-editor.service';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnInit {

  constructor(public pipelines: PipelinesService, private service: PipelineEditorService, private ntf: NotificationService, private store: Store<AppState>) {
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e => _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e => _.cloneDeep(e)));
    this.metadata$ = this.store.select(selectPipelineMetaData);
   }

  links$;
  nodes$;
  metadata$;

  ngOnInit(): void {}

  publish(){
    forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        this.pipelines.publishDag(nodes, links, metaData).subscribe(() => {
            this.ntf.success('Pipeline Published');
          });
        });
  }

  save() {
    forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        if (metaData.name != '') {
          this.pipelines.saveDag(metaData, nodes, links).subscribe((pipeline_id) => {
              this.store.dispatch(new PipelineEditMetaData({...metaData, pipeline_id}));
              this.ntf.success('Pipeline saved.');
            });
        } else {
          this.edit();
        }
      });
  }

  edit() {
    this.metadata$.pipe(take(1)).subscribe((metaData) => {
      this.service.editPipeline({...metaData}).subscribe((r) => {
        if (r) { this.store.dispatch(new PipelineEditMetaData(r)); }
      });
    })
  }

  onDiagramNodeDataChange(nodes){
    // console.log('nodes', nodes);
    this.store.dispatch(new PipelineEditNodes(nodes));
  }

  onDiagramLinkDataChange(links){
    // console.log('links', links);
    this.store.dispatch(new PipelineEditLinks(links));
  }

}
