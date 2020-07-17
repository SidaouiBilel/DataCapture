import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AppState, selectDomain } from '@app/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MappingService } from '../../services/mapping.service';
import { selectMappingFields, selectMappedSources, selectMandatories } from './../../store/selectors/mapping.selectors';
import { SaveMappingFields, SaveMappedSources } from '../../store/actions/mapping.actions';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectFileData } from '../../store/selectors/import.selectors';
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
  domain$: Observable<string>;
  mappingFields$: Observable<any>;
  fileData$: Observable<any>;
  mappedSources$: Observable<any>; // sources that are mapped
  mandatories$: Observable<any>; // Mandatories
  selectedSheet$: Observable<any>;
  constructor(private store: Store<AppState>, private service: MappingService, private router: Router) {
    this.domain$ = store.select(selectDomain);
    this.mappingFields$ = this.store.select(selectMappingFields);
    this.mappedSources$ = this.store.select(selectMappedSources);
    this.mandatories$   = this.store.select(selectMandatories);
    this.fileData$ = this.store.select(selectFileData);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mappingFields$.subscribe((res) => { this.mappingFields = [...res]; });
    this.mappedSources$.subscribe((res) => { this.mappedSources = {...res}; });
  }

  ngOnInit() {
    this.domain$.pipe(take(1)).subscribe((domain: string) => {
      this.mappingFields$.pipe(take(1)).subscribe((mappingFields: any) => {
        if (mappingFields.length < 1) {
          this.service.getTargetFields(domain).subscribe((res: any) => {
            this.store.dispatch(new SaveMappingFields(res));
          });
        }
      });
    });
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

  applyMapping(): void {
    forkJoin(this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
    .subscribe(([fileData, selectedSheet]) => {
      this.service.applyMapping(this.mappingFields, fileData, selectedSheet).subscribe((res) => {
        console.log(res);
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
