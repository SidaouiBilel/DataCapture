import { Component, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditMetaData, PipelineEditNodes } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes, selectPipelineMetaData } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';
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
    this.store.dispatch(new PipelineEditNodes(nodes));
  }

  onDiagramLinkDataChange(links){
    this.store.dispatch(new PipelineEditLinks(links));
  }


  // MANGAGE RUNS HERE
  run$=new BehaviorSubject<any>({
    "id": "1",
    "dag_id": "52CEAF3E9E65417B829579395EB13463",
    "execution_date": "2021-01-13T18:33:43.607636+00:00",
    "run_id": "5B85F4DDE47F4FEFAF9DD1C237453678",
    "start_date": "2021-01-13T18:33:43.636586+00:00",
    "state": "running",
    "end_date": null,
    "tasks": [
      {
        "task_id": "1610555918004",
        "start_date": "2021-01-13T18:33:52.023382+00:00",
        "end_date": "2021-01-13T18:33:54.281687+00:00",
        "state": "failed"
      },
      {
        "task_id": "1610555919392",
        "start_date": "2021-01-13T18:33:57.190477+00:00",
        "end_date": "2021-01-13T18:33:57.190495+00:00",
        "state": "upstream_failed"
      },
      {
        "task_id": "1610555921368",
        "start_date": "2021-01-13T18:33:57.198525+00:00",
        "end_date": "2021-01-13T18:33:57.198541+00:00",
        "state": "upstream_failed"
      },
      {
        "task_id": "1610554482770",
        "start_date": "2021-01-13T18:33:59.948910+00:00",
        "end_date": null,
        "state": "running"
      },
      {
        "task_id": "1610555922698",
        "start_date": "2021-01-13T18:34:01.347157+00:00",
        "end_date": "2021-01-13T18:34:01.347172+00:00",
        "state": "upstream_failed"
      }
    ]
  })

}
