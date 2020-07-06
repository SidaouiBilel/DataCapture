import { Component } from '@angular/core';
import { NotificationService, AppState, selectRouterState } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  constructor(private notification: NotificationService, private store: Store<AppState>) {
    this.router$ = this.store.select(selectRouterState);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        this.notification.error(error.message)
      }
    });
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

        case 'summary':
          return 'trophy';

        case 'projects':
          return 'project';

        case 'project':
          return 'project';

        case 'api':
          return 'api';

        case 'boards':
          return 'appstore';

        case 'docs':
          return 'read';

        case 'datasets':
          return 'database';

        case 'deployments':
          return 'deployment-unit';

        case 'apps':
          return 'laptop';

        case 'jobs':
          return 'play-square';

        case 'models':
          return 'code';

        case 'repos':
          return 'pull-request';

        case 'workspaces':
          return 'experiment';

        case 'deployments':
          return 'deployment-unit';

        case 'settings':
          return 'setting';

        case 'clusters':
          return 'cluster';

        case 'help':
          return 'question';

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
      this.pageList.slice(1,id+1).map((e) => path += '/' + e);
      return (path.includes('deepkube') ? path : '/deepkube' + path);
    } catch (error) {
      this.notification.error(error.message)
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
