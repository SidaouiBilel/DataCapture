import { ContainerComponent } from './Datalake/container/container.component';
import { RolesGuard } from './../../../core/login/guards/roles.guard';
import { CreateDBconnectorsComponent } from './Database/create-dbconnectors/create-dbconnectors.component';
import { ConnectorsComponent } from './Database/connectors/connectors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: ConnectorsComponent,
      children: [
          {
            path:'manageDB',
            component:CreateDBconnectorsComponent,
            canActivate: [RolesGuard],
            data: {role: 'ADMIN'}
          },
          {
            path:'manageDL',
            component:ContainerComponent,
            canActivate: [RolesGuard],
            data: {role: 'ADMIN'}
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
export class ConnectorsRoutingModule {}
