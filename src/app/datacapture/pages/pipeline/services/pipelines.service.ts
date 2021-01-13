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
    return this.http.post(environment.pipeline + 'dags/' ,{nodes, links, id: meta.id})
  }

  saveDag(metaData, nodes, links){
    return this.http.post(environment.pipeline + 'dataflow/save' ,{...metaData, nodes, links})
  }

  runDag(dag_id){

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
