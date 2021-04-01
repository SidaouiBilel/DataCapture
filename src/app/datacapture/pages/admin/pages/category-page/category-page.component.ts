import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  sub: any;
  loading = false;
  dict_id = null;
  loadingList = [{}];
  searchTerm: string;
  profile$: Observable<any>;
  categories$ = new BehaviorSubject<any>([]);

  cats$: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private ntf: NotificationService,
    public s: StoreService
  ) {this.load_data() }

  ngOnInit(): void {
    this.profile$ = this.s.getProfile();
    this.sub = this.route.params.subscribe(params => {
      this.dict_id = params.id;
      this.load_data();
    });
  }

  enableAddbtn(profile): boolean {
    return true;
  }

  load_data() {
    this.loading = true;
    const msg = this.ntf.loading('Loading Categories');
    this.categoryService.getAllCategories(this.dict_id).subscribe(
      (data:any) => {
        this.ntf.close(msg);
        this.loading = false;
        this.categories$.next(data)
      }, err => {
        this.ntf.close(msg);
        this.ntf.error('Failed to load Categories');
        this.loading = false;
        this.categories$.next([]);
      }
    )
  }

  openConfig(dict_id) {
    this.categoryService.openConfig(this.dict_id).subscribe(() => {
      console.log('not listening');
      this.load_data();
    });
  }

  navigate(r) {
    this.router.navigate(r);
  }

}