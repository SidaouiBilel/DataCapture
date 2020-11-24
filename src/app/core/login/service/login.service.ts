import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { ActionAuthLogin } from '@app/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoginService {

  KEY_USER_EMAIL = 'DCM_USER'
  KEY_USER_PASS = 'DCM_PASS'

  constructor(private http: HttpClient, private store: Store<any>) {}

  login(email: string, password: string) {
    return this.http.post(environment.auth + `auth/login`, {email, password}, {headers: {skip: 'true'}});
  }

  logout() {
    return this.http.post(environment.auth + `auth/logout`, {}).pipe(tap(()=>this.clearCredentialsPassword()));
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

  saveCredentialsPassword(email, password){
    // TODO MUST CRYPT DATA
    localStorage.setItem(this.KEY_USER_EMAIL, email)
    localStorage.setItem(this.KEY_USER_PASS, password)
  }

  clearCredentialsPassword(){
    // TODO MUST DECRYPT DATA
    localStorage.removeItem(this.KEY_USER_EMAIL)
    localStorage.removeItem(this.KEY_USER_PASS)
  }

  tryLoginRememberedUser(){
    return new Observable(observer=>{
      const email = localStorage.getItem(this.KEY_USER_EMAIL)
      const password = localStorage.getItem(this.KEY_USER_PASS)
      if(email && password){
        this.login(email, password).subscribe((res:any)=>{
          this.store.dispatch(new ActionAuthLogin(res.Authorization)); 
          observer.next(true)
      })
      } else {
        observer.next(false)
      }
    })
  }
}
