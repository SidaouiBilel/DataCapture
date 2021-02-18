import { environment } from './../environments/environment';
import { NzIconService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import browser from 'browser-detect';
import { Component, Injector, OnInit } from '@angular/core';
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
export class AppComponent{
  isCollapsed = false;
  constructor(private storageService: LocalStorageService,
              private store: Store<AppState>,
              private service: LoginService,
              private not: NotificationService,
              private injector: Injector,
              private route : Router, 
              private IconS:NzIconService
              ){    // Create global Service Injector.
                ServiceLocator.injector = this.injector;
                // this.route.navigate(["data/datacapture/dashboard"]);
              
                if(environment.production){
                  this.IconS.changeAssetsSource("http://ae778a86eb59b457eb3f2ea25469c793-1433705831.eu-west-3.elb.amazonaws.com/");
                }
            }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
}


