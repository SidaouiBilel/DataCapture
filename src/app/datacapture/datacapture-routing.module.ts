import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from './layout/container/layout.container';

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
          path: 'upload',
          loadChildren : 'app/datacapture/pages/upload/upload.module#UploadModule'
        },
        {
          path: 'dashboard',
          loadChildren : 'app/datacapture/pages/dashboard/dashboard.module#DashboardModule'
        },
        {
          path: '**',
          redirectTo: 'admin'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCaptureRoutingModule {}
