import { ExtractDBComponent } from './components/extract-db/extract-db.component';
import { ContainerComponent } from './components/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: ContainerComponent,
      children: [
          {
              path:'database',
              component:ExtractDBComponent
          },
          {
            path: '**',
            redirectTo: 'database'
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractorRoutingModule {}
