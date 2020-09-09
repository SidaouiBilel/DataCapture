import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { AppState, ActionSaveToken, ActionAuthLogin } from '@app/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private store: Store<AppState>) {}

  ngOnInit(): void {}

  login(event: any): void {
    this.service.login(event.email, event.password).subscribe((res: any) => {
      console.log(res);
      this.store.dispatch(new ActionAuthLogin());
      this.store.dispatch(new ActionSaveToken(res.Authorization));
    });
  }
}
