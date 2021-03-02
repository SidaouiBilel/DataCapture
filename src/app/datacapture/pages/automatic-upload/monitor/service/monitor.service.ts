import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService } from "@app/core";
import { env as environment } from '@app/env.service';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
  })
export class MonitorService {

    constructor(private http: HttpClient, private not: NotificationService) {}

    getAll(page?, size?){
        return this.http.get(environment.pipeline + 'dataflow/list-pipelines')
    }

    getMonitors(id) {
        return this.http.get(environment.pipeline + `monitor/dag/${id}/run`)
    }

    getRunTasks(runId) {
        return this.http.get(environment.pipeline + `monitor/run/${runId}`)
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