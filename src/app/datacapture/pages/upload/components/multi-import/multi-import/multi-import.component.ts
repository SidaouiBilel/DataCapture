import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { FileImportService } from '../../../services/file-import.service';
import { ActionAddSource, ActionMultiImportRemoveSource, ActionMultiImportSelectDomain, ActionMultiImportUpdateSource } from '../../../store/actions/multi-import.actions';
import { selectDomain } from '../../../store/selectors/multi-import.selectors';
import { selectDatasources } from '../../../store/selectors/multi-import.selectors';

@Component({
  selector: 'app-multi-import',
  templateUrl: './multi-import.component.html',
  styleUrls: ['./multi-import.component.css']
})
export class MultiImportComponent implements OnInit {

  
  datasources$
  selectedDomain$
  domains
  selectedDomain

  constructor(private store: Store<AppState>, private service: FileImportService) { 
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedDomain$.subscribe((domain: any) => {
      this.selectedDomain = domain;
    });
    this.domains = [];


    this.datasources$ = this.store.select(selectDatasources)
  }

  ngOnInit(): void {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  onAddDatasource(type='manual'){
    this.store.dispatch(new ActionAddSource({type}))
  }

  onDataChanged(source, i){
    this.store.dispatch(new ActionMultiImportUpdateSource(source, i))
  }
  
  onRemove(i){
    this.store.dispatch(new ActionMultiImportRemoveSource(i))
  }

  OnSelectDomain(domain){
    this.store.dispatch(new ActionMultiImportSelectDomain(domain))
  }

}
