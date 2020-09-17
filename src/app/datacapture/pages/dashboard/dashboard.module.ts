import { NgModule } from '@angular/core';
import { DashboardComponent } from './container/dashboard-container.component';
import { SharedModule } from '@app/shared';
import { DashboardService } from './service/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FEATURE_NAME } from './store/dashboard.state';
import { DashboardReducer } from './store/reducer/dashboard.reducer';


@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, DashboardReducer),
    EffectsModule.forFeature([]),
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
