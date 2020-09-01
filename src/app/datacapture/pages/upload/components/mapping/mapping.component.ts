import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, forkJoin, Observer, combineLatest } from 'rxjs';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MappingService } from '../../services/mapping.service';
import { selectMappingFields, selectMappedSources, selectMandatories, selectMappingId } from './../../store/selectors/mapping.selectors';
import { SaveMappingFields, SaveMappedSources, SaveMappingId, SaveMappingName } from '../../store/actions/mapping.actions';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from './../../store/selectors/preview.selectors';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { PreviousMappingsComponent } from './previous-mappings/previous-mappings.component';
import { selectTransformedFilePath } from '../transformation/store/transformation.selectors';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit, OnDestroy {
  mappingFields: any;
  mappedSources: any;
  mandatories: number;
  keys = Object.keys;
  isVisible: boolean;
  isOkLoading: boolean;
  validateForm: FormGroup;
  worksheet: any;
  domain: any;
  // Store
  mappingFields$: Observable<any>;
  fileData$: Observable<any>;
  mappedSources$: Observable<any>; // sources that are mapped
  mandatories$: Observable<any>; // Mandatories
  selectedSheet$: Observable<any>;
  domain$: Observable<any>;
  mappingId$: Observable<string>;
  worksheet$: Observable<any>;
  monitor$: any;
  constructor(private store: Store<AppState>,
              private service: MappingService,
              private router: Router,
              private fb: FormBuilder,
              private modalService: NzModalService,
              private notification: NotificationService) {
    this.worksheet$     = this.store.select(selectTransformedFilePath);
    this.mappingFields$ = this.store.select(selectMappingFields);
    this.mappedSources$ = this.store.select(selectMappedSources);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mandatories$   = this.store.select(selectMandatories);
    this.mappingId$     = this.store.select(selectMappingId);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.worksheet$.subscribe((res) => { this.worksheet = res; });
    this.domain$.subscribe((res) => { this.domain = res; });
    this.mappingFields$.subscribe((res) => { this.mappingFields = [...res]; });
    this.mappedSources$.subscribe((res) => { this.mappedSources = {...res}; });
    this.mandatories$.subscribe((res) => { this.mandatories = res; });
    this.validateForm = this.fb.group({name: [null, [Validators.required], [this.nameValidator.bind(this)]]});
    this.validate();
  }
  ngOnDestroy(): void {
    if (this.monitor$) { this.monitor$.unsubscribe(); }
  }

  ngOnInit() {
    this.checkMappingSanity();
  }

  reInitMappingFields(): void {
    this.mappingFields.forEach((element, index) => {
      const refObj = {...element};
      refObj.value = null;
      this.mappingFields[index] = refObj;
    });
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
  }

  updateMappingFields(res: any) {
    this.reInitMappingFields();
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
  }

  saveNewMapping(): void {
    // this.validate();
    const x = this.notification.loading('Saving new mapping');
    if (this.validateForm.valid) {
      forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
        .subscribe(([domain, fileData, selectedSheet]) => {
        const ws = fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]];
        this.service.postAutomaticMapping(domain.id, ws, this.validateForm.controls.name.value, this.mappingFields, this.worksheet)
          .subscribe((res) => {
            this.updateLocalMapping(res);
            this.notification.success(`The new mapping ${this.validateForm.controls.name.value} was saved successfully.`);
            this.store.dispatch(new SaveMappingName(this.validateForm.controls.name.value));
            this.notification.close(x);
            this.isVisible = false;
            this.isOkLoading = false;
          }, (err) => {
            this.notification.error(err.message);
            this.notification.close(x);
            this.isVisible = false;
            this.isOkLoading = false;
          });
        });
    } else {
      this.notification.close(x);
      this.notification.error('An error Occured');
    }
  }

  loadAutoMapping(): void {
    const x = this.notification.loading('Loading automatic mapping');
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet]) => {
      const ws = fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]];
      this.service.loadAutoMappingById(domain.id, ws, this.worksheet)
        .subscribe((res) => {
          this.updateLocalMapping(res);
          this.notification.success(`The mapping was loaded successfully.`);
          this.notification.close(x);
        }, (err) => {
          this.notification.error(err.message);
          this.notification.close(x);
          this.isVisible = false;
          this.isOkLoading = false;
        });
      });
  }

  validate(): void {
    this.validateForm.controls.name.markAsDirty();
    this.validateForm.controls.name.updateValueAndValidity();
  }

  previousMappings(): void {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)), this.mappingId$.pipe(take(1)))
    .subscribe(([domain, fileData, selectedSheet, mappingId]) => {
      this.service.getPreviouslyMappings(domain.id).subscribe((mappings: any[]) => {
        const modal: NzModalRef = this.modalService.create({
          nzTitle: 'Previously Saved Mappings',
          nzClosable: false,
          nzWrapClassName: 'vertical-center-modal',
          nzWidth: 'xXL',
          nzContent: PreviousMappingsComponent,
          nzOkText: null,
          nzComponentParams: {
            mappings,
            mappingId
          },
        });
        modal.afterClose.subscribe((map) => {
          if (map.id) {
            // Apply the mapping
            const ws = fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]];
            this.service.getMappingById(domain.id, ws, map.id).subscribe((res: any) => {
              this.updateLocalMapping(res);
              this.store.dispatch(new SaveMappingName(map.name));
              this.notification.success('The mapping was applied successfully.');
              this.checkMappingSanity();
            }, (err) => {
              this.notification.error(err.message);
            });
          }
        });
      });
    });
  }

  updateLocalMapping(res: any): void {
    // Reinit Sources
    Object.keys(this.mappedSources).forEach((e) => {this.mappedSources[e] = false; });
    // Update Mapping Fields
    this.updateMappingFields(res);
    this.store.dispatch(new SaveMappingId(res.mapping_id));
    // Update Source Fields
    Object.keys(res.columns_details).forEach(e => {
      if (e in this.mappedSources) {
        this.mappedSources[e] = res.columns_details[e].isMapped;
      }
    });
    this.store.dispatch(new SaveMappedSources(this.mappedSources));
  }

  onItemDrop(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = source.data;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source, false);
  }

  onRemoveClick(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = null;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source, true);
  }

  onUpdateSources(source, remove: boolean): void {
    // to do check if the source data exist on other columns before setting to false
    if (remove) {
      const exist = this.mappingFields.map((e) => e.value).filter((e) => {if (e) { return e; } }).indexOf(source.value);
      if (exist < 0 && source.value in this.mappedSources) {
        this.mappedSources[source.value] = false;
      }
    } else {
      this.mappedSources[source.data] = true;
    }
    this.store.dispatch(new SaveMappedSources(this.mappedSources));
  }

  updateMapping(): void {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)), this.mappingId$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet, mappingId]) => {
        // tslint:disable-next-line: max-line-length
        this.service.updateMapping(this.mappingFields, mappingId, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], domain.id)
          .subscribe((res) => {
            this.notification.success('The mapping is successfully updated');
          });
      });
  }

  checkMappingSanity(): void {
    this.monitor$ = forkJoin(
      this.mappingFields$.pipe(take(1)),
      this.mappedSources$.pipe(take(1))
    ).subscribe(([mappingFields, mappedSources]) => {
      const values = mappingFields.map((e) => e.value).filter((e) => {if (e) { return e; }});
      const sources = Object.keys(mappedSources);
      for (const iterator of values) {
        if (sources.indexOf(iterator) < 0) {
          this.modalService.warning({
            nzTitle: 'Something is wrong with this mapping.',
            nzWrapClassName: 'vertical-center-modal',
            // tslint:disable-next-line: max-line-length
            nzContent: 'It seems like some of the mapped columns does not exist in the file you imported. Please update it or choose another mapping.'
          });
          break;
        }
      }
    });
  }

  nameValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
    this.service.checkName(this.domain.id, control.value).subscribe((res) => {
      if (res) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  })

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToPreview(): void {
    this.router.navigate(['/datacapture/upload/preview']);
  }

  goToCleansing(): void {
    if (this.mandatories === 0 ) {
      this.router.navigate(['/datacapture/upload/cleansing']);
    } else {
      this.notification.warn('Please map all the mandatory fields');
    }
  }
}
