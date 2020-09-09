import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState, selectToken } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {
  token: string;
  token$: Observable<string>;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$ = this.store.select(selectToken);
    this.token$.subscribe((res) => {this.token = res; });
  }

  getUsers() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  this.token)
    };
    return this.http.get(environment.auth + `user`,  header);
  }
}
