import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  url = environment.admin

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get( this.url + "domain/")
  }

  saveDomain(domain){
    return this.http.post( this.url + "domain/", domain)
  }

  getById(domain_id){
    return this.http.get( this.url +  `domain/${domain_id}`)
  }

  getTargetFields(domain_id){
    return this.http.get( this.url + `domain/${domain_id}/fields`)
  }

  saveTargetField(domain_id, target_field){
    return this.http.post( this.url + `domain/${domain_id}/fields`, target_field)
  }

  getDomainChecks(domain_id){
    return this.http.get( this.url + `domain/${domain_id}/checks`)
  }

}
