import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperDomainService {

  // url = environment.admin;

  hierarchy$ = new Subject();

  constructor(private http: HttpClient) {
    // this.loadHierarchy()
   }

  loadHierarchy() {
    this.getHierarchy().subscribe((hier: any[]) => this.hierarchy$.next(hier));
  }

  get(){
    return this.http.get( environment.admin + "domain/super/")
  }

  getById(id){
    return this.http.get( environment.admin + "domain/super/"+id)
  }

  getHierarchy() {
    return this.http.get( environment.admin + 'domain/super/hierarchy');
  }

  save(domain) {
    return this.http.post( environment.admin + 'domain/super/', domain).pipe(tap(() => this.loadHierarchy()));
  }

  delete(domain) {
    return this.http.request('DELETE', environment.admin + 'domain/super/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: domain
    }).pipe(tap(() => this.loadHierarchy()));
  }

}
