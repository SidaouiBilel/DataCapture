import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { Observable, Subject, timer } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreMappingTransformationService {

  // url = environment.transform

  constructor(private http: HttpClient) {
  }

  // Split into 2 fct
  // This fct will get a jobId as a resonse
  startJob(fileid: string, sheetid: string, pipeid: string): Observable<any> {
    console.log('start Job========>')
    return this.http.get(`${environment.transform}${fileid}/${sheetid}/${pipeid}`);
  }

  // Get Job Status with jobId
  public getJobStatus(jobId) {
    console.log('get Job Status ========>')
    return this.http.get(`${environment.transform}transformation/${jobId}/status`)
  }

  // Check the job status (getJobStatus) until it's DONE or ERROR
  public checkJobStatus(jobId: any): Observable<any> {
    const stop = new Subject();
    return timer(0, 2000).pipe(
      takeUntil(stop),
      switchMap(() => this.getJobStatus(jobId)),
      tap((job: any) => {
        if (['ERROR', 'DONE'].includes(job.job_status)) {
          stop.next();
        }
      }),
      catchError((err) => { stop.next(); return err; })
    );
  }

  getResult(fileid: any, page: any, nrows = 10, filter: any[] = [], sort: any = null) {
    // return this.http.get( `${this.url}preview/removeit?page=${page}&nrows=${nrows}&filename=${fileid.replace(/\//g,'\\\\')}`);
    const body = {
      filter,
      sort,
      filename: fileid
    }
    return this.http.post( `${environment.transform}preview?page=${page}&nrows=${nrows}`, body);
  }
}
