import { Observable, BehaviorSubject } from 'rxjs';
import { AppState } from '@app/core';
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
  selectedSheet: number;
  mandatories: number;
  // Store
  fileData$: Observable<any>;
  mappingId$: Observable<any>;
  selectedDomain$: Observable<any>;
  selectedSheet$: Observable<number>;
  mandatories$: Observable<number>;
  uploadrouteactivated$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private store: Store<AppState>) {
    this.fileData$ = this.store.select(selectFileData);
    this.mappingId$ = this.store.select(selectMappingId);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mandatories$ = this.store.select(selectMandatories);
    this.fileData$.subscribe((res) => {this.fileData = res; this.runtestactiveRoute();});
    this.selectedDomain$.subscribe((domain) => { if (domain) { this.selectedDomain = domain.id; } this.runtestactiveRoute();});
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; this.runtestactiveRoute();});
    this.mandatories$.subscribe((mandatories) => { this.mandatories = mandatories; this.runtestactiveRoute();});
    this.mappingId$.subscribe((mappingId) => { this.mappingId = mappingId; this.runtestactiveRoute();});
  }

  runtestactiveRoute(){
    this.uploadrouteactivated$.next(
         ["TRANSFORM", "MAPPING","CLEANSING","UPLOAD"].filter(route=>{
            return this.canActivateRoute(route);
         }) 
    );
  }
  canActivateRoute(route): boolean {
    switch (route) {
      case 'TRANSFORM': {
        if (this.fileData.metaData && this.selectedDomain) {
            return true;
        } else {
            return false;
        }
      }
      case 'MAPPING': {
        if (this.fileData.metaData && this.selectedDomain && this.selectedSheet != null) {
            return true;
        } else {
            return false;
        }
      }
      case 'CLEANSING': {
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0 && this.mappingId) {
            return true;
        } else {
            return false;
        }
      }
      case 'UPLOAD': {
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0) {
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
