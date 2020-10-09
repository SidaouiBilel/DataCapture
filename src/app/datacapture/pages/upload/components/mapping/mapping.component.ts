import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, forkJoin, Observer, combineLatest } from 'rxjs';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MappingService } from '../../services/mapping.service';
import { selectMappingFields, selectMappedSources, selectMandatories,
         selectMappingId, selectMappingValid, selectIsModified } from './../../store/selectors/mapping.selectors';
import { SaveMappingFields, SaveMappedSources, SaveMappingId, SaveMappingName,
         SaveMappingValid, SaveIsModified } from '../../store/actions/mapping.actions';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectSelectedSheet } from './../../store/selectors/preview.selectors';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { PreviousMappingsComponent } from './previous-mappings/previous-mappings.component';
import { selectTransformedFilePath } from '../transformation/store/transformation.selectors';
import { deepCopy } from '@app/shared/utils/objects.utils';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit, OnDestroy {
  mappingFields: any;
  mappedSources: any;
  search: string;
  mandatories: number;
  keys = Object.keys;
  isVisible: boolean;
  isOkLoading: boolean;
  isModified = false;
  validateForm: FormGroup;
  worksheet: any;
  mappingId: any;
  domain: any;
  mappingValid$: Observable<boolean>;
  // Store
  mappingFields$: Observable<any>;
  isModified$: Observable<any>;
  fileData$: Observable<any>;
  mappedSources$: Observable<any>; // sources that are mapped
  mandatories$: Observable<any>; // Mandatories
  selectedSheet$: Observable<any>;
  domain$: Observable<any>;
  mappingId$: Observable<string>;
  worksheet$: Observable<any>;
  monitor$: any;
  searchTarget: string;
  constructor(private store: Store<AppState>,
              private service: MappingService,
              private router: Router,
              private fb: FormBuilder,
              private modalService: NzModalService,
              private notification: NotificationService) {
    this.worksheet$     = this.store.select(selectTransformedFilePath);
    this.isModified$    = this.store.select(selectIsModified);
    this.mappingFields$ = this.store.select(selectMappingFields);
    this.mappedSources$ = this.store.select(selectMappedSources);
    this.mappingValid$  = this.store.select(selectMappingValid);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mandatories$   = this.store.select(selectMandatories);
    this.mappingId$     = this.store.select(selectMappingId);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.worksheet$.subscribe((res) => { this.worksheet = res; });
    this.isModified$.subscribe((res) => { this.isModified = res; });
    this.mappingId$.subscribe((res) => { this.mappingId = res; });
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
    this.getTargetFields();
    if (this.mappingId) {
      this.checkMappingSanity();
    }
  }

  // called on init to get the target fields
  getTargetFields(): void {
    this.service.getTargetFields(this.domain.id).subscribe((res: any) => {
      if (this.mappingId) {
        // do something
        if (res.length) {
          const mfIds = this.mappingFields.map((e) => e.id);
          res = res.map((e) => {
            const id = mfIds.indexOf(e.id);
            if ( id >= 0) {
              const field = {...this.mappingFields[id]};
              field.type = e.type;
              return field;
            } else {
              return e;
            }
          });
          if (res.length !== this.mappingFields.length) {
            this.modalService.info({
              nzTitle: 'Changes Occured',
              nzOkText: 'Update',
              nzCancelText: 'Update Later',
              nzWrapClassName: 'vertical-center-modal',
              // tslint:disable-next-line: max-line-length
              nzContent: `The target fields linked to this collection have been modified.
                           We updated your local mapping. You can choose to update it now or later.`,
              nzOnOk: () => this.updateMapping(res),
              nzOnCancel: () => this.notification.warn(`Don't forget to update the mapping before moving to cleansing.`)
            });
          }
        }

      }
      this.store.dispatch(new SaveMappingFields(res));
    });
  }

  // called to reinitialize the mapping fields in the store
  reInitMappingFields(): void {
    this.mappingFields.forEach((element, index) => {
      const refObj = {...element};
      refObj.value = null;
      this.mappingFields[index] = refObj;
    });
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
  }

  // function to update the mapping fields in the store
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

  // called to save a new mapping
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
            this.store.dispatch(new SaveIsModified(false));
          }, (err) => {
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

  // Called to load automatic mapping
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
          this.notification.close(x);
          this.isVisible = false;
          this.isOkLoading = false;
        });
      });
  }

  // Validate name form
  validate(): void {
    this.validateForm.controls.name.markAsDirty();
    this.validateForm.controls.name.updateValueAndValidity();
  }

  // Called to get previous mapping
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
            });
          }
        });
      });
    });
  }

  // Called to sync data from the server with data in the store
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

  // Called when dropping new source
  onItemDrop(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = source.data;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source, false);
    this.checkMappingSanity();
    this.checkIfModified();
  }

  // Called when removing mapped value
  onRemoveClick(source, index: number): void {
    const refObj = {...this.mappingFields[index]};
    refObj.value = null;
    this.mappingFields[index] = refObj;
    this.store.dispatch(new SaveMappingFields(this.mappingFields));
    this.onUpdateSources(source, true);
    this.checkMappingSanity();
    this.checkIfModified();
  }

  checkIfModified() {
    if (this.mappingId) {
      this.store.dispatch(new SaveIsModified(true));
    }
  }

  // Called to update the sources whether they are mapped or nor
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

  // Update the current mapping by id
  updateMapping(mappingFields: any): void {
    forkJoin(this.domain$.pipe(take(1)), this.fileData$.pipe(take(1)), this.selectedSheet$.pipe(take(1)), this.mappingId$.pipe(take(1)))
      .subscribe(([domain, fileData, selectedSheet, mappingId]) => {
        // tslint:disable-next-line: max-line-length
        this.service.updateMapping(mappingFields, mappingId, fileData.metaData.worksheets_map[fileData.sheets[selectedSheet]], domain.id)
          .subscribe((res) => {
            this.notification.success('The mapping is successfully updated');
            this.store.dispatch(new SaveIsModified(false));
          });
      });
  }

  // Check if the mapping is valid or not
  checkMappingSanity(): void {
    this.monitor$ = forkJoin(
      this.mappingFields$.pipe(take(1)),
      this.mappedSources$.pipe(take(1))
    ).subscribe(([mappingFields, mappedSources]) => {
      const mfRef = deepCopy(mappingFields);
      let isValid = true;
      const values = mappingFields.map((e) => e.value);
      const sources = Object.keys(mappedSources);
      for (const [index, value] of values.entries()) {
        if (value) {
          if (sources.indexOf(value) < 0) {
            mfRef[index].inError = true;
            isValid = false;
          } else {
            mfRef[index].inError = false;
          }
        }
      }
      if (!isValid) {
        this.store.dispatch(new SaveMappingValid(false));
        this.store.dispatch(new SaveMappingFields(mfRef));
        return;
      }
      this.store.dispatch(new SaveMappingValid(true));
      this.store.dispatch(new SaveMappingFields(mfRef));
    });
  }

  // mapping name validator
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

  // Navigation
  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToPreview(): void {
    this.router.navigate(['/datacapture/upload/transform']);
  }

  goToCleansing(): void {
    if (this.isModified) {
      this.modalService.warning({
        nzTitle: 'Mapping modified',
        nzContent: 'You have made changes to the mapping. <br>Please save them before leaving or they will not be applied.',
        nzOkText: 'Ok',
        nzCancelText: 'Continue Without Saving',
        nzOnOk: () => {
          this.updateMapping(this.mappingFields);
        },
        nzOnCancel: () => {
          this.store.dispatch(new SaveIsModified(false));
        }
      });
      return;
    }
    if (! this.mappingId ) {
      this.notification.warn('Please save your mapping or Apply one.');
      return;
    }
    if (this.mandatories === 0) {
      this.router.navigate(['/datacapture/upload/cleansing']);
    } else if (this.mandatories !== 0) {
      this.notification.warn('Please map all the mandatory fields');
    }
  }
}
