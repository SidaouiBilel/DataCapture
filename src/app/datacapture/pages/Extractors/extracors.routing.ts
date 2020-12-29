import { DatalakeContainerComponent } from './datalake/datalake-container/datalake-container.component';
import { ExtractDBComponent } from './database/extract-db/extract-db.component';
import { ContainerComponent } from './container/container.component';
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
            path:'datalake',
            component:DatalakeContainerComponent
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
