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
    return this.http.get(environment.cleansing + `?filename=${filename}&worksheet_id=${worksheetId}&domain_id=${domainId}`);
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata?job_id=${jobId}`);
  }

  getJobResult(filename: string, worksheet: string, page: number, nrows: number): Observable<any> {
    return this.http.get(environment.cleansing + `/results?filename=${filename}&worksheet=${worksheet}&page=${page}&nrows=${nrows}`);
  }
}
