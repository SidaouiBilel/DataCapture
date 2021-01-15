import { Component } from "@angular/core";
import { AppState, NotificationService } from "@app/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { MonitorService } from "../service/monitor.service";

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor-container.component.html',
    styleUrls: ['./monitor-container.component.css']
})
export class MonitorContainer {
    searchPipeline = "";
    pipelines:any = [];
    constructor(private service: MonitorService,
        private not: NotificationService,
        private store: Store<AppState>) {
        this.getData();
    }
    
    getData() {
        const loader = this.not.loading('Loading pipelines...');
        this.service.getAll().subscribe((pipelines) => {
            this.pipelines = pipelines;
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }

    getMonitors = (pipe: any, monitors$: BehaviorSubject<any>) => {
        const loader = this.not.loading('Loading...');
        this.service.getMonitors(pipe.id).subscribe((res: any) => {
            monitors$.next(res);
            console.log(res);
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }
}