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
    const payload = {
      job_id: null,
      file_id: filename,
      worksheet_id: worksheetId,
      mapping_id: mappingId,
      domain_id: domainId,
      is_transformed: isTransformed,
      modifications: {}
    }
    return this.http.post(environment.cleansing, payload);
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata/${jobId}`);
  }

  getAuditTrial(worksheetId: string): Observable<any> {
    return this.http.post(environment.cleansing + `/audit-trial`, {worksheet_id: worksheetId});
  }

  // tslint:disable-next-line: max-line-length
  getJobData(filename: string, worksheet: string, page: number, nrows: number, filter: any[], sort: any, isTransformed: boolean, mappingId: string): Observable<any> {
    const payload = {
      file_id: filename,
      worksheet_id: worksheet,
      is_transformed: isTransformed,
      filter,
      sort};
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `/data?page=${page}&nrows=${nrows}`, payload);
  }

  // tslint:disable-next-line: max-line-length
  editCell(filename: string,  worksheetId: string, domainId: string, modifications: any, isTransformed: boolean, mappingId: string, jobId: string): Observable<any> {
    const payload = {
      job_id: jobId,
      file_id: filename,
      worksheet_id: worksheetId,
      mapping_id: mappingId,
      domain_id: domainId,
      is_transformed: isTransformed,
      modifications
    }
    return this.http.post(environment.cleansing, payload);
  }
}
