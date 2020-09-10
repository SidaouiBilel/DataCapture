import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { LoginComponent } from './container/login.component';
import { LoginService } from './service/login.service';
import { LoginGuard } from './guards/login.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';

const components = [
  LoginComponent,
  LoginFormComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [...components],
  exports: [
  ],
  providers : [
    LoginService,
    LoginGuard
  ],
  entryComponents: [
  ]
})
export class LoginModule {}
