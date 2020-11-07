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

  resetPw(email: string) {
    return this.http.post(environment.auth + 'user/password', {email});
  }

  updatePw(password: string, token: string) {
    return this.http.put(environment.auth + 'user/password', {token, password});
  }

  info(token: string): any {
    return this.http.get(environment.auth + `auth/info`, {headers: {token}});
  }

  get_user_data_link(id){
    return this.http.post("http://ae4ac4a0e7fe54b59b2fe6577ad5aeb7-966793033.eu-west-3.elb.amazonaws.com/pma/spawner/pma/",{
      "user_id":id
    })
  }
}
