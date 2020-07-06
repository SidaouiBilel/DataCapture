import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { routeAnimations,LocalStorageService,} from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit{
  isCollapsed = false;

  constructor(private storageService: LocalStorageService) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {

    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      // Here we add configuration if ever the application is not working with edge or IE or safari
    }
  }

}
