import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationService, AppState, selectRouterState, ActionAuthLogout, selectProfile, ActionSaveProfile, selectToken } from '@app/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSettingsService } from '@app/datacapture/settings/app-settings.service';
import { LoginService } from '@app/core/login/service/login.service';
import { environment } from '@env/environment';
import { NzHeaderComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.container.html',
  styleUrls: ['./layout.container.css'],
})
export class LayoutContainer implements OnInit , AfterViewInit {
  // used to control the sidebar
  isCollapsed: boolean = false;
  miniSidebarCollapsed = true;
  settings;
  // variable used for breadcrumps
  pageList: string[];
  // Store Router State
  router$: Observable<any>;
  env;
  profile$: Observable<any>;
  url_data ="";

  constructor(private notification: NotificationService,
              private service: LoginService,
              private store: Store<AppState>,
              settings: AppSettingsService) {
    this.settings = settings;
    this.router$ = this.store.select(selectRouterState);
    this.profile$ = this.store.select(selectProfile);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        this.notification.error(error.message);
      }
    });

    settings.appSize$.subscribe(size => this.isCollapsed = (size === 'compact') ? true : false);
    
    this.profile$.subscribe(
      res=>{
        this.service.get_user_data_link(res.id).subscribe(
          data=>{
            this.url_data=data["url"];
          }
        )
        
      }
    )
  }
  ngOnInit(): void {
    this.checkTokenValidity();
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

        case 'users':
          return 'user';

        case 'admin':
          return 'tool';

        case 'domains':
          return 'apartment';

        case 'dashboard':
          return 'dashboard';

        case 'upload':
          return 'upload';

        case 'import':
          return 'import';

        case 'transform':
          return 'sliders';

        case 'mapping':
          return 'arrows-alt';

        case 'cleansing':
          return 'monitor';

        case 'uploading':
          return 'upload';
          
        case 'connectors':
          return 'database';

        case 'extractors':
          return 'export';

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

  logout(): void {
    this.service.logout().subscribe((res) => {
      this.store.dispatch(new ActionAuthLogout());
    });
  }

  // This is used to toggle which sidebar to show
  sidebarToggler(): boolean {
    try {
      return this.pageList.includes('projects') && this.pageList.includes('project');
    } catch (error) {
      this.notification.error(error.message);
    }
  }

  checkTokenValidity(): void {
    this.store.pipe(select(selectToken)).subscribe((token: string) => {
      if (token) {
        this.service.info(token).subscribe((res) => {
          if (res) {
            if (res.status !== 'success') {
              this.logoutUser();
            } else {
              this.store.dispatch(new ActionSaveProfile(res.data));
            }
          }
        }, () => this.logoutUser());
      }
    });
  }

  logoutUser() {
    // this.notification.error('Token exp');
    this.store.dispatch(new ActionAuthLogout());
  }

  

  @ViewChild('navbar',{static:false})  navbar :NzHeaderComponent;
  sticky=64;
  ngAfterViewInit(){
    window.onscroll = ()=>this.onscroll();
  }
  onscroll() {
    if (window.pageYOffset > this.sticky) {
      this.navbar.elementRef.nativeElement.classList.add("sticky");
    } else {
      this.navbar.elementRef.nativeElement.classList.remove("sticky");
    }
  }

  openmydata(){
    if(this.url_data.trim() !== ""){
      var win = window.open(this.url_data, '_blank');
      win.focus();      
    }

  }
}
