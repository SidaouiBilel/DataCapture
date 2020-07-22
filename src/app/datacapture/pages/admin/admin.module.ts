import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RefernceDataPageComponent } from './pages/refernce-data-page/refernce-data-page.component';
import { FieldsPageComponent } from './pages/fields-page/fields-page.component';
import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { SharedModule } from '@app/shared';
import { DomainConfigModalComponent } from './modals/domain-config-modal/domain-config-modal.component';
import { FieldModalComponent } from './modals/field-modal/field-modal.component';
import { SuperDomainsPageComponent } from './pages/super-domains-page/super-domains-page.component';
import { SuperDomainConfigModalComponent } from './modals/super-domain-config-modal/super-domain-config-modal.component';
import { DomainCardComponent } from './componenets/domain-card/domain-card.component';


@NgModule({
  declarations: [RefernceDataPageComponent, FieldsPageComponent, DomainsPageComponent, DomainConfigModalComponent,SuperDomainConfigModalComponent, FieldModalComponent, SuperDomainsPageComponent, DomainCardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents:[DomainConfigModalComponent, FieldModalComponent, SuperDomainConfigModalComponent]
})
export class AdminModule { }
