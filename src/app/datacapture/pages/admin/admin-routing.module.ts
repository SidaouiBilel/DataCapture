import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { FieldsPageComponent } from './pages/fields-page/fields-page.component';
import { RefernceDataPageComponent } from './pages/refernce-data-page/refernce-data-page.component';
import { SuperDomainsPageComponent } from './pages/super-domains-page/super-domains-page.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { GlobalReferencesComponent } from './pages/global-references/global-references.component';


const routes: Routes = [
  {
    path: 'domains',
    component: AdminLayoutComponent,
    children: [
      {
        path: ':id/collection',
        component: DomainsPageComponent
      },
      {
        path: '',
        component: SuperDomainsPageComponent,
      },
      {
        path: ':subid/collection/:id',
        component: CollectionDetailsComponent,
        children: [
          {
          path: 'fields',
          component: FieldsPageComponent,
          },
          {
            path: 'references',
            component: RefernceDataPageComponent
          },
        ]
      },
    ]
  },
  {
    path: 'references',
    component: GlobalReferencesComponent
  },
  {
    path: '**',
    redirectTo: 'references'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
