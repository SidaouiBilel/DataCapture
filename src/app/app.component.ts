import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { routeAnimations,LocalStorageService, AppState, selectToken, NotificationService, ActionAuthLogout, ActionSaveProfile,} from '@app/core';
import { Store, select } from '@ngrx/store';
import { LoginService } from './core/login/service/login.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent{
  isCollapsed = false;
  constructor(private storageService: LocalStorageService,
              private store: Store<AppState>,
              private service: LoginService,
              private not: NotificationService) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
}


