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
export class AppComponent implements OnInit{
  isCollapsed = false;
  constructor(private storageService: LocalStorageService,
              private store: Store<AppState>,
              private service: LoginService,
              private not: NotificationService) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token: string) => {
      if (token) {
        this.service.info(token).subscribe((res) => {
          if (res) {
            if (res.status !== 'success') {
              this.not.error('Your session was expired. Please login again.');
              this.store.dispatch(new ActionAuthLogout());
            } else {
              this.store.dispatch(new ActionSaveProfile(res.data));
              this.not.success(`Welcome back ${res.data.last_name} ${res.data.first_name}`, 'Hello');
            }
          }
        });
      }
    });
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      // Here we add configuration if ever the application is not working with edge or IE or safari
    }
  }

}
