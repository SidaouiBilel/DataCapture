import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MappingService } from '../../services/mapping.service';
import { selectMappingFields, selectMappedSources, selectMandatories, selectMappingId } from './../../store/selectors/mapping.selectors';
import { SaveMappingFields, SaveMappedSources, SaveMappingId } from '../../store/actions/mapping.actions';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from './../../store/selectors/preview.selectors';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  mappingFields: any;
  mappedSources: any;
  // Store
  mappingFields$: Observable<any>;
  fileData$: Observable<any>;
  mappedSources$: Observable<any>; // sources that are mapped
  mandatories$: Observable<any>; // Mandatories
  selectedSheet$: Observable<any>;
  domain$: Observable<string>;
  mappingId$: Observable<string>;
  constructor(private store: Store<AppState>, private service: MappingService, private router: Router, private notification: NotificationService) {
    this.mappingFields$ = this.store.select(selectMappingFields);
    this.mappedSources$ = this.store.select(selectMappedSources);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mandatories$   = this.store.select(selectMandatories);
    this.mappingId$     = this.store.select(selectMappingId);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$ = this.store.select(selectDomain);
    this.mappingFields$.subscribe((res) => { this.mappingFields = [...res]; });
    this.mappedSources$.subscribe((res) => { this.mappedSources = {...res}; });
  }

  ngOnInit() {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet]) => {
        this.service.getAutomaticMapping(domain, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]])
          .subscribe((res) => {
            // Create mapped Source
            const mappedSources = {};
            Object.keys(res.columns_details).forEach((e) => {mappedSources[e] = res.columns_details[e].isMapped; });
            this.store.dispatch(new SaveMappedSources(mappedSources));
            // Update Mapping Fields
            this.reInitMappingFields();
            this.store.dispatch(new SaveMappingId(res.mapping_id));
            const mappingFieldsNames = this.mappingFields.map((e) => e.name);
            res.mappings.forEach(element => {
              const index = mappingFieldsNames.indexOf(element.target);
              if (index >= 0 && element.source.length > 0) {
                const refObj = {...this.mappingFields[index]};
                refObj.value = element.source[0];
                this.mappingFields[index] = refObj;
              }
            });
            this.store.dispatch(new SaveMappingFields(this.mappingFields));

            // Update Source Fields
            Object.keys(this.mappedSources).forEach(element => {
              if (res.columns_details[element]) {
                this.mappedSources[element] = res.columns_details[element].isMapped;
              }
            });
          });
      });
  }

  reInitMappingFields() {
    this.mappingFields.forEach((element, index) => {
      const refObj = {...element};
      refObj.value = null;
      this.mappingFields[index] = refObj;
    });
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
  }

  onItemDrop(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = source.data;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source);
  }

  onRemoveClick(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = null;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source);
  }

  onUpdateSources(source): void {
      this.mappedSources[source.data] = true;
      this.store.dispatch(new SaveMappedSources(this.mappedSources));
  }

  updateMapping(): void {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)), this.mappingId$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet, mappingId]) => {
        this.service.updateMapping(this.mappingFields, mappingId, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], domain)
          .subscribe((res) => {
            this.notification.success('The mapping is successfully updated');
          });
      });
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToPreview(): void {
    this.router.navigate(['/datacapture/upload/preview']);
  }


  goToCleansing(): void {
    this.router.navigate(['/datacapture/upload/cleansing']);
  }

}
