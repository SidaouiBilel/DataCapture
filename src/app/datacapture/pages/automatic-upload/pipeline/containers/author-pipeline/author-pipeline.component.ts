import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditMetaData, PipelineEditNodes, PipelineEditRunId } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes, selectPipelineMetaData, selectRunId } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, interval, Observable, Subject, timer } from 'rxjs';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import { withValue } from '@app/shared/utils/rxjs.utils';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnInit, OnDestroy {

  constructor(public pipelines: PipelinesService, private service: PipelineEditorService, private ntf: NotificationService, private store: Store<AppState>) {
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e => _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e => _.cloneDeep(e)));
    this.metadata$ = this.store.select(selectPipelineMetaData);
    this.runId$ = this.store.select(selectRunId);
   }

  links$;
  nodes$;
  metadata$;
  runId$: Observable<string>;// MANGAGE RUNS HERE
  run$ = new BehaviorSubject(null)
  stop$;

  ngOnInit(): void {
    this.runId$.subscribe((runId)=>{
      if(runId){
        this.monitorRun(runId);
      } else {
        this.resetRun();
      }
    })
  }

  ngOnDestroy(): void {
    this.resetRun()
  }

  publish(){
    forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        // SAVE AND PUBLISH
        this.pipelines.saveDag(metaData,nodes,links).subscribe(()=>{
          this.pipelines.publishDag(nodes, links, metaData).subscribe(() => {
            this.ntf.success('Pipeline Published');
          });
        });
      })
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


  
  onTrigger(){
    this.resetRun()
    withValue(this.metadata$,(p)=>{
      this.pipelines.trigger(p.pipeline_id).subscribe((res:any)=>{
        const run_id = res.run_id;
        this.store.dispatch(new PipelineEditRunId({run_id, pipeline_id: p.pipeline_id}));
      })
    })
  }

  onCancel(){
    this.store.dispatch(new PipelineEditRunId({run_id: null, pipeline_id: null}));
  }

  monitorRun(runId) {
    // CANSEL PREVIOUS POOLING
    this.stop$ = new Subject()
    timer(0,2000).pipe(
      takeUntil(this.stop$), 
      switchMap(()=>this.pipelines.getRun(runId)),
      tap((run_res:any)=>{
        this.run$.next(run_res)
        if(['success','failed'].includes(run_res.state)){
          this.stop$.next()
        }
      })
      ).subscribe();
  }

  resetRun(){
    if (this.stop$) this.stop$.next()
    this.run$.next(null)
  }
}
