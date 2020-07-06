import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'deepkube/stacks',
    pathMatch: 'full'
  },
  {
    path: 'deepkube',
    loadChildren: './deepkube/deepkube.module#DeepKubeModule',
  },
  {
    path: '**',
    redirectTo: 'deepkube/stacks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
