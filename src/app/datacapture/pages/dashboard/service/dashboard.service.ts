import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getAllSuper() {
    return this.http.get( environment.admin + 'domain/all/super');
  }

  getDashboardData(domainId: string, page: number, size: number, sortkey?, sortAcn?): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.upload}flow?domain_id=${domainId}&page=${page}&size=${size}${sortkey ? '&sort_key=' + sortkey : ''}${sortAcn ?  '&sort_acn=' + sortAcn : ''}`);
  }

}
