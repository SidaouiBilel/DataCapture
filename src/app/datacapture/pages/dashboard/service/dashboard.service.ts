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

  getDashboardData(domainId: string): Observable<any> {
    return this.http.get(`${environment.upload}flow?domain_id=${domainId}`);
  }

}
