import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject, interval, Subject, timer } from 'rxjs';
import { UploadingPayload } from '../models/uploading.model';
import { takeUntil, switchMap, tap, catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  getTags(domainId: string): Observable<any> {
    return this.http.get(`${environment.upload}tags/${domainId}`);
  }

  upload(payload: UploadingPayload): Observable<any> {
    return this.http.post(`${environment.upload}flow`, payload);
  }

  getStatus(flowId) {
    return this.http.get(`${environment.upload}flow/${flowId}/status`);
  }

  getUploadStatus(flowId: any): Observable<any> {
    const stop = new Subject();
    const pool = new BehaviorSubject(true);
    
    const poolResult = pool.pipe(
      takeUntil(stop),
      switchMap(() => this.getStatus(flowId)),
      tap((status: any) => {
        if (['ERROR', 'DONE'].includes(status.upload_status)) { 
          stop.next();
          pool.complete() 
        } else {
          timer(2000).pipe(take(1)).subscribe(()=> pool.next(true))
        }
      }),
      catchError((err) => {stop.next(); pool.complete(); return err; } )
    );
    pool.next(true)
    return poolResult
  }

}
