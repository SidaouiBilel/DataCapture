import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env as environment } from '@app/env.service';

@Injectable({
  providedIn: 'root'
})
export class TargetFieldsService {

  // url = environment.admin;

  constructor(private http: HttpClient) { }

  get(domain_id) {
    return this.http.get( environment.admin+ `domain/${domain_id}/fields`);
  }

  getSimple(domain_id) {
    return this.http.get( environment.admin+ `domain/${domain_id}/fields/simple`);
  }

  save(domain_id, target_field) {
    return this.http.post( environment.admin+ `domain/${domain_id}/fields`, target_field);
  }

  delete(domain_id, target_field) {
    return this.http.request('DELETE', environment.admin+ `domain/${domain_id}/fields`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: target_field
    })
  }

  fileUploadUrl(domain_id) {
    return environment.admin+ `domain/${domain_id}/fields/file`;
  }

}
