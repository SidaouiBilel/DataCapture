import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AppState, ActionAuthLogin } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: LoginService, private store: Store<AppState>) {}

  loading$ = new BehaviorSubject(false);

  login(event: any): void {
    this.loading$.next(true);
    this.service.login(event.email, event.password).subscribe((res: any) => {
      // this.loading$.next(false)
      this.store.dispatch(new ActionAuthLogin(res.Authorization));
    }, err => this.loading$.next(false));
  }
}
