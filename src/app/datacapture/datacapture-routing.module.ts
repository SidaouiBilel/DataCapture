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
          loadChildren : './pages/admin/admin.module#AdminModule'
        },
        {
          path: 'users',
          loadChildren : './pages/users/users.module#UsersModule',
          canActivate: [RolesGuard],
          data: {role: 'ADMIN'}
        },
        {
          path: 'connectors',
          loadChildren : './pages/Connectors/connectors.module#ConnectorsModule'
        },
        {
          path: 'extractors',
          loadChildren : './pages/Extractors/extractors.module#ExtractorsModule'
        },
        {
          path: 'upload',
          loadChildren : './pages/upload/upload.module#UploadModule'
        },
        {
          path: 'autoupload',
          loadChildren : './pages/autoupload/autoupload.module#AutouploadModule'
        },
        {
          path: 'dashboard',
          loadChildren : './pages/dashboard/dashboard.module#DashboardModule'
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
