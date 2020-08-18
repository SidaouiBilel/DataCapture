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
import { DomainsHierarchyComponent } from './componenets/domains-hierarchy/domains-hierarchy.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { CollectionCardComponent } from './componenets/collection-card/collection-card.component';
import { CollectionEditor } from './services/collection-editor.service';
import { TreePipe } from './pipes/tree.pipe';
import { MetaComponent } from './componenets/meta/meta.component';
import { SimpleFilterPipe } from './pipes/simple-filter.pipe';


@NgModule({
  declarations: [
    RefernceDataPageComponent, 
    FieldsPageComponent, 
    DomainsPageComponent, 
    DomainConfigModalComponent,
    SuperDomainConfigModalComponent,
    FieldModalComponent, 
    SuperDomainsPageComponent,
    DomainCardComponent,
    DomainsHierarchyComponent,
    AdminLayoutComponent,
    CollectionDetailsComponent,
    CollectionCardComponent,
    TreePipe,
    MetaComponent,
    SimpleFilterPipe,
  ],
  providers:[
    CollectionEditor
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents:[DomainConfigModalComponent, FieldModalComponent, SuperDomainConfigModalComponent]
})
export class AdminModule { }
