import { selectUpdatedSheet } from './../../pages/upload/store/selectors/preview.selectors';
import { selectMappingValid } from './../../pages/upload/store/selectors/mapping.selectors';
import { selectCleansingErrors } from './../../pages/upload/store/selectors/cleansing.selectors';
import { selectUploadingStatus } from './../../pages/upload/store/selectors/upload.selectors';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppState } from '../../../core';
import { Store } from '@ngrx/store';
import { selectFileData, selectDomain } from '../../pages/upload/store/selectors/import.selectors';
import { Injectable } from '@angular/core';
import { selectSelectedSheet } from '../../pages/upload/store/selectors/preview.selectors';
import { selectMandatories, selectMappingId } from '../../pages/upload/store/selectors/mapping.selectors';

@Injectable({
  providedIn: 'root'
})
export class MenuitemsService {

  fileData: any;
  selectedDomain: string;
  mappingId: string;
  selectedSheet: string;
  mandatories: number;
  errors: number;
  mappingValid: boolean;
  uploadStatus: string;
  // Store
  fileData$: Observable<any>;
  errors$: Observable<any>;
  mappingId$: Observable<any>;
  selectedDomain$: Observable<any>;
  selectedSheet$: Observable<string>;
  mandatories$: Observable<number>;
  mappingValid$: Observable<boolean>;
  uploadStatus$: Observable<string>;
  constructor(private store: Store<AppState>) {
    this.fileData$ = this.store.select(selectFileData);
    this.errors$ = this.store.select(selectCleansingErrors);
    this.mappingValid$  = this.store.select(selectMappingValid);
    this.uploadStatus$ = store.select(selectUploadingStatus);
    this.mappingId$ = this.store.select(selectMappingId);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedSheet$ = this.store.select(selectUpdatedSheet);
    this.mandatories$ = this.store.select(selectMandatories);
    this.errors$.subscribe((errors) => {this.errors = errors; });
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.mappingId$.subscribe((mappingId) => { this.mappingId = mappingId; });
    this.mandatories$.subscribe((mandatories) => { this.mandatories = mandatories; });
    this.uploadStatus$.subscribe((uploadStatus) => {this.uploadStatus = uploadStatus; });
    this.mappingValid$.subscribe((mappingValid) => { this.mappingValid = mappingValid; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.selectedDomain$.subscribe((domain) => { if (domain) { this.selectedDomain = domain.id; } });
  }
  uploadrouteactivated$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  runtestactiveRoute(){
    this.uploadrouteactivated$.next(
         ["TRANSFORM", "MAPPING","CLEANSING","UPLOAD"].filter(route=>{
            return this.canActivateRoute(route);
         }) 
    );
  }
  canActivateRoute(route): boolean {
    switch (route) {
      case 'IMPORT': {
        return ['READY'].includes(this.uploadStatus);
      }
      case 'TRANSFORM': {
        if (this.fileData.metaData && this.selectedDomain && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'MAPPING': {
        if (this.fileData.metaData && this.selectedDomain && this.selectedSheet != null &&
            ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'CLEANSING': {
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0 &&
            this.mappingId && this.mappingValid && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'UPLOAD': {
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0 && this.errors === 0) {
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
