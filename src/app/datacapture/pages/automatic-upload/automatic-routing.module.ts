import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'pipeline',
        loadChildren : () => import('app/datacapture/pages/automatic-upload/pipeline/pipeline.module').then(m => m.PipelineModule)
    },
    {
        path: 'author',
        loadChildren : () => import('app/datacapture/pages/automatic-upload/author/author.module').then(m => m.AuthorModule)
    },
    {
      path: '**',
      redirectTo: 'author',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticRoutingModule {}
