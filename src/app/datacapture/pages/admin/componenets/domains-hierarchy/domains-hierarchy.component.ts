import { Component, OnInit } from '@angular/core';
import { SuperDomainService } from '../../services/super-domain.service';
import { map, tap } from 'rxjs/operators';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-domains-hierarchy',
  templateUrl: './domains-hierarchy.component.html',
  styleUrls: ['./domains-hierarchy.component.css']
})
export class DomainsHierarchyComponent implements OnInit {
  nodes$: any;
  searchValue: '';
  expandedKey = null;
  activetedKey = null;

  constructor(
    private service: SuperDomainService,
    private nav: AdminNavigator
    ) { }

  ngOnInit() {

    this.nodes$ = this.service.hierarchy$.pipe(
      map((superDoms: any[]) => superDoms.map(superDom => ({
                                                          title: superDom.name,
                                                          key: superDom.id,
                                                          icon: 'folder',
                                                          info: superDom,
                                                          children: superDom.domains.map(dom => ({
                                                            title: dom.name,
                                                            icon: 'block',
                                                            key: dom.id,
                                                            isLeaf: true,
                                                            info : dom
                                                          }))
                                                        }
      )))
    ).pipe(tap(() => combineLatest(this.nav.activeDomain$, this.nav.activeSubDomina$).subscribe(
      ([domain, subDomain]) => {
        this.activetedKey = [subDomain || domain];
        
        this.expandedKey = [domain] 
      }
    )));

    this.service.loadHierarchy()
  }

  onElementClick(element: any){
    const node = element.node;

    switch(node.level){
      case 0: this.onSuperDomainClick(node); break;
      case 1: this.onDomainClick(node); break;
    }
  }

  onDomainClick(node) {
    const domain = node.origin.info;
    this.nav.goToDomainFields(domain.super_domain_id, domain.id);
  }
  onSuperDomainClick(node) {
    const superDomain = node.origin.info;
    this.nav.goToSuperDomainCollections(superDomain.id);
  }
  onSeeAllClick(){
    this.nav.goToDomains()
  }

}
