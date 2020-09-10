import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState, selectToken } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  getUsers() {
    return this.http.get(environment.auth + `user/`);
  }
}
