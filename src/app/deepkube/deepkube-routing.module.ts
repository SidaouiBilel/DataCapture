import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from './layout/container/layout.container';

const routes: Routes = [
  {
      path: '',
      component: LayoutContainer,
      children: [
        {
          path: 'stacks',
          loadChildren : 'app/deepkube/pages/stacks/stacks.module#StacksModule'
        },
        {
          path: '**',
          redirectTo: ''
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeepKubeRoutingModule {}
