import { NgModule } from '@angular/core';
import { DashboardComponent } from './container/dashboard-container.component';
import { SharedModule } from '@app/shared';
import { DashboardService } from './service/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
  ],
  providers : [
    DashboardService
  ],
  entryComponents: [
  ]
})
export class DashboardModule {}
