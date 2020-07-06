import { NgModule } from '@angular/core';
import { LayoutContainer } from './layout/container/layout.container';
import { DeepKubeRoutingModule } from './deepkube-routing.module';
import { SharedModule } from './../shared/shared.module';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { pagesReducers } from './pages/store/pages.state';


const components = [
  LayoutContainer,
  SidebarComponent,
  HeaderComponent,
];

@NgModule({
  imports: [
    DeepKubeRoutingModule,
    SharedModule,
    StoreModule.forFeature('pages', pagesReducers),
    EffectsModule.forFeature([])
  ],
  declarations: [...components ],
  exports: [
    LayoutContainer
  ],
  providers : [
  ],
  entryComponents: [
  ]
})
export class DeepKubeModule {}
