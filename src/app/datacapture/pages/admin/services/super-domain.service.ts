import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperDomainService {

  url = environment.admin

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get( this.url + "domain/super")
  }

  getHierarchy(){
    return this.http.get( this.url + "domain/super/hierarchy")
  }

  save(domain){
    return this.http.post( this.url + "domain/super/", domain)
  }

  delete(domain){
    return this.http.request('DELETE', this.url + "domain/super/", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: domain
    })
  }

}
