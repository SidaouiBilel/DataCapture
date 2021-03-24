import { take } from 'rxjs/operators';
import { MenuitemsService } from './../service/menuitems.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState, selectRouterState, ActionAuthLogout, ActionAuthLogin , selectProfile, ActionSaveProfile, selectToken } from '@app/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSettingsService } from '@app/datacapture/settings/app-settings.service';
import { LoginService } from '@app/core/login/service/login.service';
import { env as environment } from '@app/env.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.container.html',
  styleUrls: ['./layout.container.css'],
})
export class LayoutContainer implements OnInit {
  // used to control the sidebar
  isCollapsed: boolean;
  miniSidebarCollapsed = true;
  settings;
  // variable used for breadcrumps
  pageList: string[];
  // Store Router State
  router$: Observable<any>;
  env;
  profile$: Observable<any>;
  uploadrouteactivated=[];
  constructor(private notification: NotificationService,
              private service: LoginService,
              private store: Store<AppState>,
              settings: AppSettingsService ,
              private menuitemservice :MenuitemsService
              ) {
     this.menuitemservice.uploadrouteactivated$.subscribe(activeroutes=>{
      this.uploadrouteactivated = activeroutes;
    });             
    this.settings = settings;
    this.router$ = this.store.select(selectRouterState);
    this.profile$ = this.store.select(selectProfile);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        // this.notification.error(error.message);
      }
    });

    this.isCollapsed = false
    // settings.appSize$.subscribe(size => this.isCollapsed = (size === 'compact') ? true : false);
  }
  ngOnInit(): void {
    this.checkTokenValidity()
  }
  isuploadrouteactivated(route){
    return !this.uploadrouteactivated.includes(route);
  }
  // This is used to select the primary pqge in the sidebqr
  isPrimaryPage(page: string): boolean {
    try {
      if (this.pageList.length > 0 ) {
        return this.pageList.includes(page);
      }
    } catch (error) {
      // this.notification.error(error.message);
    }
  }

  // This is used to match the name of the route with the ANT JS icons
  matchNameWithIcons(name: string): string {
    try {
      switch (name) {
        case 'home':
          return 'home';

        case 'automatic':
          return "deployment-unit";

        case 'pipeline':
          return 'apartment';

        case 'author':
          return 'edit';

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

        default:
          return 'appstore';
      }
    } catch (error) {
      // this.notification.error(error.message);
    }
  }

  getLinkByIndex(id: number): string {
    try {
      let path = '';
      this.pageList.slice(1, id + 1).map((e) => path += '/' + e);
      return (path.includes('datacapture') ? path : '/data/datacapture' + path);
    } catch (error) {
      // this.notification.error(error.message);
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
      // this.notification.error(error.message);
    }
  }

  tokencheck = false; 

  getuser(token){
    this.service.info(token).subscribe((res) => {
      if (res) {
        if (res.status !== 'success') {
          this.logoutUser();
        } else {
          this.store.dispatch(new ActionSaveProfile(res.data));
          this.tokencheck = true;
          // this.geturl_data();
        }
      }
    } 
    // , () => this.logoutUser()
    );
  }

  checkTokenValidity(): void {
    if(window['logout']){
      let ProfileLocalstorage = JSON.parse(localStorage.getItem("data-auth"));
      if( ProfileLocalstorage && ProfileLocalstorage["token"]){
        this.store.dispatch(new ActionAuthLogin({token : ProfileLocalstorage["token"] ,refreshToken:ProfileLocalstorage["refreshToken"]}));
        this.getuser(ProfileLocalstorage["token"]);
      }else{
        this.logoutUser();
      }
    }else{
      this.store.pipe(select(selectToken)).subscribe((token: string) => {
        // console.log(token);
      if(token){
        this.getuser(token);
      }
      });
    }
    
         

  }


  logoutUser() {
    // this.notification.error('Token exp');
    this.store.dispatch(new ActionAuthLogout());
  }

  url_data ="";
  urldataloding=false;
  geturl_data(){
    if(this.urldataloding) { return ;}
    if(this.url_data.trim() == ""){
    this.profile$.pipe(take(1)).subscribe(
      res=>{
        if(res && res.id){
          this.urldataloding = true;
          let notif = this.notification.loading("Generating database console url");
            this.service.get_user_data_link(res.id).subscribe(
              data=>{
                if(data["url"]){
                  this.url_data=data["url"];
                  this.urldataloding = false;
                  this.openmydata();
                }else{                
                  this.notification.warn("Unable to generate database console url" , 1000);
                  this.urldataloding = false;
                }            
                this.notification.close(notif);   
              } , er=>{
                this.notification.close(notif);
                // this.notification.warn("Unable to generate database console url" , 1000);
                this.urldataloding = false;
              }
            )              
      }})
    }else{
        this.openmydata()
    }
  }
  openmydata(){
      var win = window.open(this.url_data, '_blank');
      win.focus();      
  }
}
