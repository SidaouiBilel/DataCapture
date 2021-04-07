import { env as environment , updateConfig} from '@app/env.service';
import { NzIconService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import browser from 'browser-detect';
import { Component, Injector, OnInit , OnDestroy , HostListener} from '@angular/core';
import { routeAnimations,LocalStorageService, AppState, NotificationService} from '@app/core';
import { Store } from '@ngrx/store';
import { LoginService } from './core/login/service/login.service';
import { ServiceLocator } from './shared/utils/injector.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [routeAnimations]
})
export class AppComponent implements OnInit , OnDestroy{
  isCollapsed = false;

  constructor(private storageService: LocalStorageService,
              private store: Store<AppState>,
              private service: LoginService,
              private not: NotificationService,
              private injector: Injector,
              private router:Router
              ){    // Create global Service Injector.
                ServiceLocator.injector = this.injector;
                // this.route.navigate(["data/datacapture/dashboard"]);
              
                // if(!environment.production){
                //   this.IconS.changeAssetsSource("http://127.0.0.1:8080");
                // }
                
            }
  
  @HostListener('window:popstate', ['$event']) onPopState(event) {
    console.log('Back button pressed', window.location.pathname);
    this.router.navigate([window.location.pathname]);
  }

  ngOnInit(){
    // if(!environment.dk_data_displayed){
    //   updateConfig({...environment ,"dk_data_displayed":true});
    // }
  }
  ngOnDestroy(){
    // this.not.close();
    // if(environment.dk_data_displayed){
    //   updateConfig({...environment ,"dk_data_displayed":false});
    // }
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
}


