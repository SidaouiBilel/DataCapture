import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState, selectIsAuthenticated } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  isAuthenticated: boolean;
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isAuthenticated$.subscribe((res: boolean) => {this.isAuthenticated = res; });
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/data/login']);
      return false;
    }
  }
}
