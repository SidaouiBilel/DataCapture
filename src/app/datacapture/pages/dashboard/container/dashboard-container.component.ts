import { Component, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { AuditComponent } from '@app/shared/audit/audit.component';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardService } from '../service/dashboard.service';
import { ActionSavePage, ActionSaveSize, ActionSaveSort } from '../store/actions/dashboard.actions';
import { selectFetchData, selectPage, selectSize, selectSort } from '../store/selectors/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardComponent implements OnInit {
  selectedDomain: any;
  domains: any[];
  keys = Object.keys;
  constructor(private service: DashboardService,
              private store: Store<AppState>) {
    this.domains = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: any): void {
    this.selectedDomain = {id: event.identifier, name: event.name};
  }

}
