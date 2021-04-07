import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { delay, retryWhen, take } from 'rxjs/operators';
import { PipelineMetadata } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class PipelinesService {

  constructor(private http: HttpClient) { }


  publishDag(dag_id: PipelineMetadata){
    console.log('----------- Publish')
    console.log('----------- dag_id', dag_id)
    return this.http.post(environment.pipeline + 'dataflow/' + dag_id + "/publish", {})
  }

  saveDag(metaData, nodes, links){
    console.log('----------- Save')
    console.log('----------- MetaData', metaData)
    return this.http.post(environment.pipeline + 'dataflow/save' ,{...metaData, nodes, links})
  }

  getRun(run_id: any) {
    console.log('----------- getRun')
    return this.http.get(environment.pipeline + `monitor/run/${run_id}`)
  }

  getDagDetails(dag_id){
    return this.http.get(environment.pipeline + `dataflow/${dag_id}/list-nodes`)
  }

  unpause(pipeline_id, params) {
    return this.http.post(environment.pipeline + `run/dag/${pipeline_id}/unpause`,params)
  }

  pause(pipeline_id, params) {
    return this.http.post(environment.pipeline + `run/dag/${pipeline_id}/pause`,params)
  }

  pulsate(run_id, params) {
    return this.http.post(environment.pipeline + `run/${run_id}/pulsate`,params)
  }

  retry(run_id, params) {
    return this.http.post(environment.pipeline + `run/${run_id}/retry`,params)
  }

  getTaskLogs(runId, taskId, executionDate) {
    return this.http.get(environment.pipeline + `monitor/log/${runId}/${taskId}/${executionDate}`);
  }

  trigger(dag_id: any, config) {
    console.log('----------- Trigger')
    console.log('----------- Config', config)
    console.log('----------- dag_id', dag_id)
    console.log('---------------------------')
    return this.http.post(environment.pipeline + `run/dag/${dag_id}`,config).pipe(retryWhen(errors => errors.pipe(delay(1000), take(3))))
  }
}
