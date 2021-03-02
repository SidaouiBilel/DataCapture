import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {

  // url = environment.admin;

  constructor(private http: HttpClient) { }

  getDomainChecks(domain_id) {
    return this.http.get(  environment.admin+ `domain/${domain_id}/checks`);
  }

  getDomainChecksMap(domain_id) {
    return this.getDomainChecks(domain_id).pipe(map((list: any[]) => {
      const m = {};
      list.forEach(check => {
        m[check.id] = check;
      });
      return m;
    }));
  }
}
