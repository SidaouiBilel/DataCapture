import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { selectFileData, selectDomain } from '../store/selectors/import.selectors';
import { Injectable } from '@angular/core';
import { selectSelectedSheet } from './../store/selectors/preview.selectors';
import { selectMandatories } from './../store/selectors/mapping.selectors';

@Injectable()
export class UploadGuard implements CanActivate {
  fileData: any;
  selectedDomain: string;
  selectedSheet: number;
  mandatories: number;
  // Store
  fileData$: Observable<any>;
  selectedDomain$: Observable<string>;
  selectedSheet$: Observable<number>;
  mandatories$: Observable<number>;
  constructor(private store: Store<AppState>) {
    this.fileData$ = this.store.select(selectFileData);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.mandatories$ = this.store.select(selectMandatories);
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.selectedDomain$.subscribe((domain) => { this.selectedDomain = domain; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.mandatories$.subscribe((mandatories) => { this.mandatories = mandatories; });
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (next.data.route) {
      case 'PREVIEW': {
        if (this.fileData.metaData && this.selectedDomain) {
            return true;
        } else {
            return false;
        }
      }
      case 'MAPPING': {
        if (this.selectedSheet != null) {
            return true;
        } else {
            return false;
        }
      }
      case 'CLEANSING': {
        if (this.mandatories === 0) {
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
