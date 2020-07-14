import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'datacapture/upload',
    pathMatch: 'full'
  },
  {
    path: 'datacapture',
    loadChildren: './datacapture/datacapture.module#DataCaptureModule',
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
