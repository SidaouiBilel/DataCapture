import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env as environment } from '@app/env.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService {


  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get( environment.admin + "domain/")
  }

  getAllBySuperId(super_id){
    return this.http.get( environment.admin + "domain/super/" + super_id)
  }

  saveDomain(domain){
    return this.http.post( environment.admin + "domain/", domain)
  }

  duplicateDomain(domain){
    return this.http.put( environment.admin + "domain/", domain)
  }

  deleteDomain(domain){
    return this.http.request('DELETE', environment.admin + "domain/", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: domain
    })
  }

  getById(domain_id){
    return this.http.get( environment.admin +  `domain/${domain_id}`)
  }

  getInfoById(domain_id){
    return this.http.get( environment.admin +  `domain/${domain_id}/info`)
  }

  getTargetFields(domain_id){
    return this.http.get( environment.admin + `domain/${domain_id}/fields`)
  }

  saveTargetField(domain_id, target_field){
    return this.http.post( environment.admin + `domain/${domain_id}/fields`, target_field)
  }

  getDomainChecks(domain_id){
    return this.http.get( environment.admin + `domain/${domain_id}/checks`)
  }

  getAllSuper(){
    return this.http.get( environment.admin + "domain/super")
  }

  saveSuperDomain(domain){
    return this.http.post( environment.admin + "domain/super/", domain)
  }
}
