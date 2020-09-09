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

  startJob(filename: string,  worksheetId: string, domainId: string, isTransformed: boolean, mappingId: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `?filename=${filename}&mappingId=${mappingId}&isTransformed=${isTransformed}&worksheet=${worksheetId}&worksheet_id=${worksheetId}&domain_id=${domainId}`, {});
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata?job_id=${jobId}`);
  }

  getAuditTrial(worksheetId: string, domainId: string): Observable<any> {
    return this.http.post(environment.cleansing + `/modifications`, {worksheetId:worksheetId,domainId:domainId});
  }

  // tslint:disable-next-line: max-line-length
  getJobData(filename: string, worksheet: string, domainId: string, page: number, nrows: number, filter: string, sort: any[], isTransformed: boolean, mappingId: string): Observable<any> {
    const payload = {filter, sort};
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `/data?mappingId=${mappingId}&filename=${filename}&isTransformed=${isTransformed}&worksheet=${worksheet}&worksheet_id=${worksheet}&page=${page}&nrows=${nrows}&domain_id=${domainId}`, payload);
  }

  // tslint:disable-next-line: max-line-length
  editCell(filename: string,  worksheetId: string, domainId: string, payload: any, isTransformed: boolean, mappingId: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `?mappingId=${mappingId}&filename=${filename}&worksheet=${worksheetId}&worksheet_id=${worksheetId}&domain_id=${domainId}&isTransformed=${isTransformed}`, payload);
  }
}
