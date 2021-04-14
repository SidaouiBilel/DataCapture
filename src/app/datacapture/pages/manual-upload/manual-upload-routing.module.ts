import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './pages/container/container.component';
import { ControlComponent } from './pages/control/control.component';
import { ImportComponent } from './pages/import/import.component';
import { ReportComponent } from './pages/report/report.component';
import { TransformComponent } from './pages/transform/transform.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'import',
        component: ImportComponent,
      },
      {
        path: 'transform',
        component: TransformComponent,
      },
      {
        path: 'control',
        component: ControlComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: '**',
        redirectTo: 'transform'
      }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualUploadRoutingModule { }
