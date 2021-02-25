import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { ActionAuthLogin, selectIsAuthenticated } from '@app/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';
import { ActionAuthLogout } from '@app/core/auth/auth.actions';
import { Router } from '@angular/router';
import { selectProfile , selectRefreshToken} from '@app/core/auth/auth.selectors';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable({providedIn: 'root'})
export class LoginService {

  KEY_USER_EMAIL = 'DCM_USER'
  KEY_USER_PASS = 'DCM_PASS'

  isAuthenticated = false;
  profile = null;
  refreshToken = null;
  RefreshTokenURL = "http://ec2-3-236-14-93.compute-1.amazonaws.com:9001/api/v1/store/auth/";

  constructor(private http: HttpClient, private store: Store<any>, private router: Router, private msg: NotificationService) {
    this.store.select(selectIsAuthenticated).subscribe((res: boolean) => {this.isAuthenticated = res; });
    this.store.select(selectProfile).subscribe((res: boolean) => {this.profile = res; });
    this.store.select(selectRefreshToken).subscribe((res: string) => {this.refreshToken = res; });
  }

  get_user_data_link(id){
    return this.http.post("http://a4a1a0328c2d24de7b9356e3eba4b678-705832054.eu-west-1.elb.amazonaws.com/pma/spawner/pma/",{
      "user_id":id
    })
  }
  
  requestLogin(email, password){
    return this.http.post(environment.auth + `auth/login`, {email, password}, {headers: {skip: 'true'}})
  }

  login(email: string, password: string) {
    return this.requestLogin(email, password).pipe(
      tap((res:any)=>{
        this.store.dispatch(new ActionAuthLogin({token : res.Authorization , refreshToken:null}));
        this.router.navigate(['/data/datacapture'])
      }),
      catchError(this.logout)
    );
  }

  logout() {
    const onLogout = ()=>{
      this.store.dispatch(new ActionAuthLogout())
      this.router.navigate(['/login'])
      this.clearCredentialsPassword()
      return null;
    } 
    return this.http.post(environment.auth + `auth/logout`, {}).pipe(
      tap(onLogout),
      catchError(onLogout)
    );

  }

  resetPw(email: string) {
    return this.http.post(environment.auth + 'user/password', {email});
  }

  updatePw(password: string, token: string) {
    return this.http.put(environment.auth + 'user/password', {token, password});
  }

  info(token: string): any {
    
    return this.http.get(environment.auth + `auth/info`, {headers: {token , Connection: "Keep-Alive" , 'Keep-Alive':"timeout=1000"}});
  }

  refreshingToken(refreshToken): any {
    return this.http.post(this.RefreshTokenURL + "refresh?refresh_token="+refreshToken , {});
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

  // Login In Remembered User
  attemptLogin(){
    return new Observable(observer=>{
      const email = localStorage.getItem(this.KEY_USER_EMAIL)
      const password = localStorage.getItem(this.KEY_USER_PASS)
      if(email && password){
        const message = this.msg.loading(`Loging in as ${email}`)
        this.requestLogin(email, password).subscribe((res:any)=>{
          this.store.dispatch(new ActionAuthLogin({token : res.Authorization , refreshToken:null}));
          observer.next(true)
        }, ()=> {
          observer.next(false)
          this.msg.close(message)
      },()=> this.msg.close(message))
      } else {
        observer.next(false)
      }
    })
  }
}
