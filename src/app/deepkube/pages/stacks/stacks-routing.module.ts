import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StacksComponent } from './containers/stacks/stacks.component';
import { StacksListComponent } from './containers/stacks-list/stacks-list.component';

const routes: Routes = [
  {
    path: '',
    component: StacksComponent,
    children : [
      {path : '' , component : StacksListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StacksRoutingModule {
}
