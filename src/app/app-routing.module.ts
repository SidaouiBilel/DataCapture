import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/container/login.component';
import { LoginGuard } from './core/login/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'datacapture/upload',
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
    path: '**',
    redirectTo: 'datacapture/upload'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
