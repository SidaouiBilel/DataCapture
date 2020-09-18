import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from './core/login/components/reset/reset.component';
import { LoginComponent } from './core/login/container/login.component';
import { LoginGuard } from './core/login/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'datacapture/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'datacapture',
    loadChildren: './datacapture/datacapture.module#DataCaptureModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset/:token',
    component: ResetComponent,
  },
  {
    path: '**',
    redirectTo: 'datacapture/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
