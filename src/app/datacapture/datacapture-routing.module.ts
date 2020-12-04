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
          path: 'upload',
          loadChildren : 'app/datacapture/pages/upload/upload.module#UploadModule'
        },
        {
          path: 'dashboard',
          loadChildren : 'app/datacapture/pages/dashboard/dashboard.module#DashboardModule'
        },
        {
          path: 'explorer',
          loadChildren : 'app/datacapture/data-explorer/data-explorer.module#DataExplorerModule'
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
