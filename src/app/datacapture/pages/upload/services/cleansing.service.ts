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

  getJobData(filename: string, worksheet: string, domainId: string, page: number, nrows: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(environment.cleansing + `/exposures?filename=${filename}&worksheet=${worksheet}&page=${page}&nrows=${nrows}&domain_id=${domainId}`);
  }

  getJobResult(filename: string, worksheet: string, page: number, nrows: number): Observable<any> {
    return this.http.get(environment.cleansing + `/results?filename=${filename}&worksheet=${worksheet}&page=${page}&nrows=${nrows}`);
  }
}
