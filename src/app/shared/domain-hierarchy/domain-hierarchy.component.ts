import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-domain-hierarchy',
  templateUrl: './domain-hierarchy.component.html',
  styleUrls: ['./domain-hierarchy.component.css']
})
export class DomainHierarchyComponent implements OnInit {

  nodes$: any;
  searchValue: '';
  expandedKey = null;
  activetedKey = null;

  activeDomain$ = new BehaviorSubject(null)
  activeSubDomina$ = new BehaviorSubject(null)
  
  @Input('collection') set collection(value){
    this.activeSubDomina$.next(value)
  }

  @Output()
  domainClicked = new EventEmitter<string>()
  @Output()
  collectionClicked = new EventEmitter<string>()

  constructor(
    private service: SuperDomainService
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
    ).pipe(tap(() => combineLatest(this.activeDomain$, this.activeSubDomina$).subscribe(
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
    const data = node.origin.info;
    this.collectionClicked.emit(data.id)
  }
  onSuperDomainClick(node) {
    const data = node.origin.info;
    this.domainClicked.emit(data.id)
  }
}
