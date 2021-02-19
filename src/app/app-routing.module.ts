import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from './core/login/components/reset/reset.component';
import { LoginComponent } from './core/login/container/login.component';
import { LoginPageGuard } from './core/login/guards/login-page.guard';
import { DatafactureGuard } from './core/login/guards/login.guard';
import { MicroRoutingModule } from './micro-routing/micro-routing.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'data/datacapture/admin/domains',
    pathMatch: 'full'
  },
  {
    path: 'data/datacapture',
    loadChildren: () => import('./datacapture/datacapture.module').then(m => m.DataCaptureModule),
    canActivate: [DatafactureGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'login/reset/:token',
    component: ResetComponent,
  },
  {
    path: '**',
    redirectTo: 'data/datacapture/admin/domains'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) , 
    MicroRoutingModule.forRoot("data-app", "routeChanged")
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
