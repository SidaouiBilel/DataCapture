import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-word-page',
  templateUrl: './word-page.component.html',
  styleUrls: ['./word-page.component.css']
})
export class WordPageComponent implements OnInit {
  sub: any;
  loading = false;
  dict_id = null;
  profile$: Observable<any>;
  words$ = new BehaviorSubject<any>([]);

  constructor(private router: Router,
    private route: ActivatedRoute,
    public wordService: WordService,
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
    if(profile){
      if(profile.admin) return true
    }
    return false;
  }

  load_data() {
    this.loading = true;
    const msg = this.ntf.loading('Loading Words');
    this.wordService.getAllWords(this.dict_id).subscribe(
      (data:any) => {
        this.ntf.close(msg);
        this.loading = false;
        this.words$.next(data)
      }, err => {
        this.ntf.close(msg);
        this.ntf.error('Failed to load Words');
        this.loading = false;
        this.words$.next([]);
      }
    )
  }

  onAddWord(data) {
    this.wordService.openWordModal(data, this.dict_id).subscribe(() => {
      this.load_data();
    });
  }

  onEditWord(data) {
    this.wordService.openWordModal(data, data.dict_id).subscribe(() => {
      this.load_data();
    });
  }

  onDeleteWord(data) {
    this.wordService.showDeleteConfirm(data).subscribe(() => {
      this.load_data();
    });
  }

  navigate(r) {
    this.router.navigate(r);
  }

}
