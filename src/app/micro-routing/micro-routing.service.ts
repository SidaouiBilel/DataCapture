import { Inject , InjectionToken , Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

export const MICRO_APP_NAME = new InjectionToken<string>('microAppName');
export const MICRO_EVENT= new InjectionToken<string>('routeChangeEventName');
interface RouteChangedEvent{
    route:{
        path:string,
        app:string,
        data?:any;
    }
}

@Injectable()
export class MicroRoutingService {
    private  routechanged$: Observable<any>;

    constructor(@Inject(MICRO_APP_NAME) private microApp ,
                @Inject(MICRO_EVENT)  microEvent ,
                private router :Router ,
                private location:Location){
        this.routechanged$ = fromEvent(document , microEvent).pipe(
            map((event : CustomEvent<RouteChangedEvent>)=>event.detail.route),
            filter((event)=> event.app === this.microApp)
        );
    }

    initRouting():void{
        this.routechanged$.subscribe((event)=>{
            this.router.navigateByUrl(`${event.path}`);
        });

        this.router.navigateByUrl(this.location.path(true));
    }
}