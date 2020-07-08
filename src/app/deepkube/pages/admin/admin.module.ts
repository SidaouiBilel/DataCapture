import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RefernceDataPageComponent } from './pages/refernce-data-page/refernce-data-page.component';
import { FieldsPageComponent } from './pages/fields-page/fields-page.component';
import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { SharedModule } from '@app/shared';
import { DomainConfigModalComponent } from './modals/domain-config-modal/domain-config-modal.component';
import { FieldModalComponent } from './modals/field-modal/field-modal.component';


@NgModule({
  declarations: [RefernceDataPageComponent, FieldsPageComponent, DomainsPageComponent, DomainConfigModalComponent, FieldModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents:[DomainConfigModalComponent, FieldModalComponent]
})
export class AdminModule { }
