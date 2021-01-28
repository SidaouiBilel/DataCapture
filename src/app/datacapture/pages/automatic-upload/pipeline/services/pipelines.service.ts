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
    return this.http.post(environment.pipeline + 'dataflow/' + meta.pipeline_id + "/publish", {})
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

  trigger(dag_id: any, config) {
    return this.http.post(environment.pipeline + `dataflow/${dag_id}/run`,config)
  }

  getRun(run_id: any) {
    return this.http.get(environment.pipeline + `monitor/run/${run_id}`)
  }

  unpause(pipeline_id, params) {
    return this.http.post(environment.pipeline + `dataflow/${pipeline_id}/unpause`,params)
  }

  pause(pipeline_id, params) {
    return this.http.post(environment.pipeline + `dataflow/${pipeline_id}/pause`,params)
  }
}
