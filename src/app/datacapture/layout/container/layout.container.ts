import { Component } from '@angular/core';
import { NotificationService, AppState, selectRouterState } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSettingsService } from '@app/datacapture/settings/app-settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.container.html',
  styleUrls: ['./layout.container.css'],
})
export class LayoutContainer {
  // used to control the sidebar
  isCollapsed: boolean;
  miniSidebarCollapsed = true;
  // variable used for breadcrumps
  pageList: string[];
  // Store Router State
  router$: Observable<any>;
  settings

  constructor(private notification: NotificationService, private store: Store<AppState>,  settings: AppSettingsService) {
    this.settings = settings
    this.router$ = this.store.select(selectRouterState);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        this.notification.error(error.message);
      }
    });

    settings.appSize$.subscribe(size=> this.isCollapsed=(size == 'compact')?true:false)
  }

  // This is used to select the primary pqge in the sidebqr
  isPrimaryPage(page: string): boolean {
    try {
      if (this.pageList.length > 0 ) {
        return this.pageList.includes(page);
      }
    } catch (error) {
      this.notification.error(error.message);
    }
  }

  // This is used to match the name of the route with the ANT JS icons
  matchNameWithIcons(name: string): string {
    try {
      switch (name) {
        case 'home':
          return 'home';

        case 'admin':
          return 'tool';

        case 'domains':
          return 'apartment';

        case 'upload':
          return 'upload';

        case 'import':
          return 'import';

        case 'preview':
          return 'file-done';

        case 'mapping':
          return 'arrows-alt';

        case 'cleansing':
          return 'monitor';

        case 'uploading':
          return 'upload';

        default:
          return 'appstore';
      }
    } catch (error) {
      this.notification.error(error.message);
    }
  }

  getLinkByIndex(id: number): string {
    try {
      let path = '';
      this.pageList.slice(1, id + 1).map((e) => path += '/' + e);
      return (path.includes('datacapture') ? path : '/datacapture' + path);
    } catch (error) {
      this.notification.error(error.message);
    }
  }

  // This is used to toggle which sidebar to show
  sidebarToggler(): boolean {
    try {
      return this.pageList.includes('projects') && this.pageList.includes('project');
    } catch (error) {
      this.notification.error(error.message);
    }
  }
}
