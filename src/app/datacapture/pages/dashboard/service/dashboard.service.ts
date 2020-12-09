import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable} from 'rxjs';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getAllSuper() {
    return this.http.get( environment.admin + 'domain/all/super');
  }

  getAuditTrial(worksheet_id: string, domain_id:string): Observable<any> {
    return this.http.post(environment.cleansing + `/audit-trial`, {worksheet_id, domain_id});
  }

  getDashboardData(domainId: string, page: number, size: number, sortkey?, sortAcn?): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.upload}flow?domain_id=${domainId}&page=${page}&size=${size}${sortkey ? '&sort_key=' + sortkey : ''}${sortAcn ?  '&sort_acn=' + sortAcn : ''}`);
  }

  getUploadData(domainId: string, page: number, size: number, filters: any[],sort?): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.upload}data/${domainId}`, {page, size, filters, sort});
  }

  getUploadDataTotal(domainId: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.upload}data/${domainId}/total` );
  }

  download(domainId: string, type: string, filters) {
    const payload = {
      filters
    }
    return this.http.post(`${environment.upload}data/${domainId}/export/${type}`, payload, { responseType: 'blob' })
      .subscribe((res: any) => {this.saveFile(res, domainId, type); });
  }

  saveFile = (blobContent: Blob, fileName: string, type: string) => {
    const blob = new Blob([blobContent], { type: 'application/vnd.ms-excel' });
    const file = new File([blob], fileName + '.' + type, { type: 'application/vnd.ms-excel' });
    saveAs(file);
  }

  getTags(domainId: string): Observable<any> {
    return this.http.get(`${environment.upload}tags/${domainId}`);
  }
}
