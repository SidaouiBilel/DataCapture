import { TechMappingComponent } from './components/tech-mapping/tech-mapping.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { ContainerComponent } from './container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: ContainerComponent,
      children: [
          {
            path:"import-data",
            component:ImportDataComponent
          },          
          {
            path:"technicalmapping",
            component:TechMappingComponent
          }
        
        // {
        //   path: '**',
        //   redirectTo: 'import'
        // }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoUploadRoutingModule {}
