import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from './layout/container/layout.container';
import { RolesGuard } from '@app/core/login/guards/roles.guard';

const routes: Routes = [
  {
      path: '',
      component: LayoutContainer,
      children: [
        {
          path: 'admin',
          loadChildren : 'app/datacapture/pages/admin/admin.module#AdminModule'
        },
        {
          path: 'users',
          loadChildren : 'app/datacapture/pages/users/users.module#UsersModule',
          canActivate: [RolesGuard],
          data: {role: 'ADMIN'}
        },
        {
          path: 'connectors',
          loadChildren : 'app/datacapture/pages/Connectors/connectors.module#ConnectorsModule'
        },
        {
          path: 'extractors',
          loadChildren : 'app/datacapture/pages/Extractors/extractors.module#ExtractorsModule'
        },
        {
          path: 'upload',
          loadChildren : 'app/datacapture/pages/upload/upload.module#UploadModule'
        },
        {
          path: 'dashboard',
          loadChildren : 'app/datacapture/pages/dashboard/dashboard.module#DashboardModule'
        },
        {
          path: '**',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCaptureRoutingModule {}
