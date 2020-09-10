import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(environment.auth + `auth/login`, {email, password}, {headers: {skip: 'true'}});
  }

  logout() {
    return this.http.post(environment.auth + `auth/logout`, {});
  }
}
