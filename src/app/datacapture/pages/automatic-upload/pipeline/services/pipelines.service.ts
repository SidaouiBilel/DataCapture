import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PipelineMetadata } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class PipelinesService {

  constructor(private http: HttpClient) { }


  publishDag(nodes, links, meta: PipelineMetadata){
    return this.http.post(environment.pipeline + 'dags/' ,{nodes, links, id: meta.pipeline_id})
  }

  saveDag(metaData, nodes, links){
    return this.http.post(environment.pipeline + 'dataflow/save' ,{...metaData, nodes, links})
  }

  runDag(dag_id){
    return this.http.get(environment.pipeline + `dataflow/${dag_id}/list-nodes`)
  }

  getDags(){

  }

  monitorDagRun(run_id){

  }

  getDagRuns(dag_id){

  }

  deleteDag(dag_id){

  }
}
