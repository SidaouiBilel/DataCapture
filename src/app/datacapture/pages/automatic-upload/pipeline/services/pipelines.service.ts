import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '@app/core';
import { env as environment } from '@app/env.service';
import { delay, retryWhen, take } from 'rxjs/operators';
import { PipelineMetadata } from '../models/metadata.model';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PipelinesService {

  constructor(private http: HttpClient, private not: NotificationService) { }


  publishDag(dag_id: PipelineMetadata){
    return this.http.post(environment.pipeline + 'dataflow/' + dag_id + "/publish", {})
  }

  saveDag(metaData, nodes, links , uid){
    return this.http.post(environment.pipeline + 'dataflow/save' ,{...metaData, nodes, links , uid})
  }

  getRun(run_id: any) {
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
    return this.http.post(environment.pipeline + `run/dag/${dag_id}`,config).pipe(retryWhen(errors => errors.pipe(delay(1000), take(3))))
  }

  downloadLog(runId: string, executionDate: string, taskId) {
    const x = this.not.loading('Your file is being downloaded...');
    return this.http.get(environment.pipeline + `monitor/log/${runId}/${taskId}/${executionDate}`, { responseType: 'blob' })
      .subscribe((res: any) => {
        this.saveFile(res, taskId, 'txt');
        this.not.close(x);
        this.not.success('Your file has been successfully downloaded.');
      }, (err) => {
        this.not.close(x);
      }
    );
  }

  saveFile = (blobContent: Blob, fileName: string, type: string) => {
    const blob = new Blob([blobContent], { type: "text/plain;charset=utf-8" });
    const file = new File([blob], fileName + '.' + type, { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }
}
