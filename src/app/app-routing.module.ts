import { CommonModule } from '@angular/common';
import { MicroRoutingModule } from './micro-routing/micro-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from './core/login/components/reset/reset.component';
import { LoginComponent } from './core/login/container/login.component';
import { LoginGuard } from './core/login/guards/login.guard';
import * as APP from './app.setting';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'data/datacapture/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'data',
    redirectTo: 'data/datacapture/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'data/datacapture',
    loadChildren: './datacapture/datacapture.module#DataCaptureModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'data/login',
    component: LoginComponent,
  },
  {
    path: 'data/login/reset/:token',
    component: ResetComponent,
  },
  {
    path: '**',
    redirectTo: 'datacapture/dashboard'
  }
];

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes) , MicroRoutingModule.forRoot(APP.APP_NAME , APP.ROUTE_CHANGE_EVENT)],
})
export class AppRoutingModule { }
