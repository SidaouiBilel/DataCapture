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
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `?filename=${filename}&worksheet=${worksheetId}&worksheet_id=${worksheetId}&domain_id=${domainId}`, {});
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata?job_id=${jobId}`);
  }

  // tslint:disable-next-line: max-line-length
  getJobData(filename: string, worksheet: string, domainId: string, page: number, nrows: number, filter: string, sort: any[]): Observable<any> {
    const payload = {filter, sort};
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `/data?filename=${filename}&worksheet=${worksheet}&worksheet_id=${worksheet}&page=${page}&nrows=${nrows}&domain_id=${domainId}`, payload);
  }
}
