import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleansingService {

  constructor(private http: HttpClient) {
  }

  startJob(filename: string,  worksheetId: string, domainId: string): Observable<any> {
    return this.http.post(environment.cleansing + `?filename=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&worksheet_id=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&domain_id=B09C2351B7B64554ADB488CD2E239693&worksheet=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&domain_name=B09C2351B7B64554ADB488CD2E239693`, {});
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata?job_id=${jobId}`);
  }

  getJobResult(filename: string, worksheet: string, page: number, nrows: number): Observable<any> {
    return this.http.get(environment.cleansing + `/results?filename=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&worksheet=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&page=1&nrows=10`);
  }

  getJobData(filename: string, worksheet: string, domainId: string, page: number, nrows: number): Observable<any> {
    return this.http.get(environment.cleansing + `/exposures?filename=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&domain_id=B09C2351B7B64554ADB488CD2E239693&worksheet=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&page=1&worksheet_id=f8476d5e632643133a1c7f73b2461cc18b40b11b6334e7271ba3faae531bbd97&nrows=100`);
  }
}
