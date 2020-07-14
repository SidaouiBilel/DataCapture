import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponentComponent } from './container/upload-component.component';
import { ImportComponent } from './components/import/import.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { CleansingComponent } from './components/cleansing/cleansing.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {
      path: '',
      component: UploadComponentComponent,
      children: [
        {
          path: 'import',
          component: ImportComponent
        },
        {
          path: 'preview',
          component: PreviewComponent
        },
        {
          path: 'mapping',
          component: MappingComponent
        },
        {
          path: 'cleansing',
          component: CleansingComponent
        },
        {
          path: 'uploading',
          component: UploadComponent
        },
        {
          path: '**',
          redirectTo: 'import'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
