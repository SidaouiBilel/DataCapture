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
          loadChildren : 'app/datacapture/pages/stacks/stacks.module#StacksModule'
        },
        {
          path: 'admin',
          loadChildren : 'app/datacapture/pages/admin/admin.module#AdminModule'
        },
        {
          path: 'upload',
          loadChildren : 'app/datacapture/pages/upload/upload.module#UploadModule'
        },
        {
          path: '**',
          redirectTo: 'stacks'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCaptureRoutingModule {}
