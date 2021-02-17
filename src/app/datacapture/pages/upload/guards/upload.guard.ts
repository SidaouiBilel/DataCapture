import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectUpdatedSheet } from './../store/selectors/preview.selectors';
import { selectMandatories, selectMappingId, selectMappingValid } from './../store/selectors/mapping.selectors';
import { selectCleansingErrors } from '../store/selectors/cleansing.selectors';
import { selectUploadingStatus } from '../store/selectors/upload.selectors';
import { selectDatasources, selectDomainId } from '../store/selectors/multi-import.selectors';

@Injectable()
export class UploadGuard implements CanActivate {
  fileData: any;
  selectedDomain: string;
  mappingId: string;
  selectedSheet: string;
  mandatories: number;
  errors: number;
  mappingValid: boolean;
  uploadStatus: string;
  // Store
  errors$: Observable<any>;
  mappingId$: Observable<any>;
  selectedDomain$: Observable<any>;
  selectedSheet$: Observable<string>;
  mandatories$: Observable<number>;
  mappingValid$: Observable<boolean>;
  uploadStatus$: Observable<string>;

  hasDatasources = false

  constructor(private store: Store<AppState>) {
    this.errors$ = this.store.select(selectCleansingErrors);
    this.mappingValid$  = this.store.select(selectMappingValid);
    this.uploadStatus$ = store.select(selectUploadingStatus);
    this.mappingId$ = this.store.select(selectMappingId);
    this.selectedDomain$ = this.store.select(selectDomainId);
    this.selectedSheet$ = this.store.select(selectUpdatedSheet);
    this.mandatories$ = this.store.select(selectMandatories);
    this.errors$.subscribe((errors) => {this.errors = errors; });
    this.mappingId$.subscribe((mappingId) => { this.mappingId = mappingId; });
    this.mandatories$.subscribe((mandatories) => { this.mandatories = mandatories; });
    this.uploadStatus$.subscribe((uploadStatus) => {this.uploadStatus = uploadStatus; });
    this.mappingValid$.subscribe((mappingValid) => { this.mappingValid = mappingValid; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.selectedDomain$.subscribe((domain_id) => { this.selectedDomain = domain_id });


    this.store.select(selectDatasources).subscribe((datasources=>{
      this.hasDatasources = datasources.length > 0 
    }))
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (next.data.route) {
      case 'IMPORT': {
        return ['READY'].includes(this.uploadStatus);
      }
      case 'TRANSFORM': {
        if (this.selectedDomain && this.hasDatasources && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'MAPPING': {
        if (this.selectedDomain && this.hasDatasources && this.selectedSheet != null &&
            ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'CLEANSING': {
        if (this.selectedDomain && this.hasDatasources && this.mandatories === 0 &&
            this.mappingId && this.mappingValid && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'UPLOAD': {
        if (this.selectedDomain && this.hasDatasources && this.mandatories === 0 && this.errors === 0) {
            return true;
        } else {
            return false;
        }
      }
      default:
                return true;
    }
  }
}
