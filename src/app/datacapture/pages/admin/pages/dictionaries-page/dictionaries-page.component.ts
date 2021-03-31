import { Component, OnInit } from '@angular/core';
import { DictionaryEditorService } from '../../services/dictionary-editor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from '@app/core';
import { StoreService } from '../../services/store.service';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionaries-page',
  templateUrl: './dictionaries-page.component.html',
  styleUrls: ['./dictionaries-page.component.css']
})
export class DictionariesPageComponent implements OnInit {
  dictionaries$ = new BehaviorSubject([])
  loading = false;
  profile$: Observable<any>;
  searchTerm;


  constructor(private dictService: DictionaryService, private dictEditorService: DictionaryEditorService, public s: StoreService,
    private ntf: NotificationService) {
    this.loadData()
  }

  ngOnInit(): void {
    this.profile$ = this.s.getProfile();
  }

  enableAddbtn(profile): boolean {
    if(profile){
      if(profile.admin) return true
    }
    return false;
  }

  loadData() {
    this.loading = true;
    const msg = this.ntf.loading('Loading Dictionaries');
    this.dictService.getAllDictionaries().subscribe(
      (data:any) => {
        this.ntf.close(msg);
        this.loading = false;
        this.dictionaries$.next(data)
      }, err => {
        this.ntf.close(msg);
        this.ntf.error('Failed to load Dictionaries');
        this.loading = false;
        this.dictionaries$.next([]);
      }
    )
  }

  addDictionary() {
    this.dictEditorService.openDictionaryModal(null).subscribe(() => {
      this.loadData();
    });
  }

}
