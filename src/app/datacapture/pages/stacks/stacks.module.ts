import { NgModule } from '@angular/core';
import { SharedModule} from '@app/shared/shared.module';
import { StacksRoutingModule } from './stacks-routing.module';
import { StacksListComponent } from './containers/stacks-list/stacks-list.component';
import { StacksComponent } from './containers/stacks/stacks.component';
import { StackSelectListComponent } from './components/stack-select-list/stack-select-list.component';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
  StacksListComponent,
  StacksComponent,
  StackSelectListComponent],
  imports: [
    SharedModule,
    StacksRoutingModule
  ]
})
export class StacksModule { }
