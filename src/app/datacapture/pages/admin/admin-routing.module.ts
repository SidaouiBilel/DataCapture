import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { FieldsPageComponent } from './pages/fields-page/fields-page.component';
import { RefernceDataPageComponent } from './pages/refernce-data-page/refernce-data-page.component';
import { SuperDomainsPageComponent } from './pages/super-domains-page/super-domains-page.component';


const routes: Routes = [
  {
    path: 'category/:id',
    component: DomainsPageComponent
  },
  {
    path: 'category',
    component: DomainsPageComponent
  },
  {
    path: 'domains',
    component: SuperDomainsPageComponent
  },
  {
    path: 'fields/:id',
    component: FieldsPageComponent
  },
  {
    path: 'references',
    component: RefernceDataPageComponent
  },
  {
    path: '**',
    redirectTo: 'domains'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
