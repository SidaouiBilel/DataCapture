import { Component, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
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
  data: any[];
  keys = Object.keys;
  pagesSize = 1;
  // Store
  page$: Observable<number>;
  size$: Observable<number>;
  sort$: Observable<any>;
  fetchData$: Observable<boolean>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private service: DashboardService, private store: Store<AppState>, private notification: NotificationService) {
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.sort$ = this.store.select(selectSort);
    this.fetchData$ = this.store.select(selectFetchData);
    this.domains = [];
    this.data = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: any): void {
    this.selectedDomain = {id: event.identifier, name: event.name};
    this.loadData(event.identifier);
  }

  loadData(id: string): void {
    try {
      this.loading$.next(true);
      forkJoin(this.page$.pipe(take(1)), this.size$.pipe(take(1)), this.sort$.pipe(take(1))).subscribe(([page, size, sort]) => {
        this.service.getDashboardData(id, page, size, sort.sortKey, sort.sortAcn).subscribe((res: any) => {
          this.pagesSize = res.total;
          this.data = res.content;
          this.loading$.next(false);
        });
      });
    } catch (error) {
      this.loading$.next(false);
      this.notification.error(error.message);
    }
  }

  sort(event: any) {
    this.store.dispatch(new ActionSaveSort({sortKey: event.key, sortAcn: (event.value === 'ascend' ? 1 : -1)}));
    this.loadData(this.selectedDomain.id);
  }

  onPageChange(page: number) {
    this.store.dispatch(new ActionSavePage(page));
    this.loadData(this.selectedDomain.id);
  }

  onSizeChange(size: number) {
    this.store.dispatch(new ActionSaveSize(size));
    this.loadData(this.selectedDomain.id);
  }
}
