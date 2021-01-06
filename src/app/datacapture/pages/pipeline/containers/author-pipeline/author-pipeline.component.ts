import { Component, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditNodes } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnInit {

  constructor(public pipelines: PipelinesService, private ntf: NotificationService, private store: Store<AppState>,) {
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e=> _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e=> _.cloneDeep(e)));
   }

  links$
  nodes$

  pipeId

  ngOnInit(): void {
    
  }

  publish(){
    forkJoin(this.links$.pipe(take(1)), this.nodes$.pipe(take(1)))
      .subscribe(([links, nodes])=>{
        this.pipelines.publishDag(nodes, links, this.pipeId).subscribe(()=>{
            this.ntf.success('Pipeline Published')
          })
        })
  }

  onDiagramNodeDataChange(nodes){
    console.log('nodes',nodes)
    this.store.dispatch(new PipelineEditNodes(nodes))
  }
  
  onDiagramLinkDataChange(links){
    console.log('links', links)
    this.store.dispatch(new PipelineEditLinks(links))
  }

}