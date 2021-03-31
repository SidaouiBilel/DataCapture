import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dictionaries-page',
  templateUrl: './dictionaries-page.component.html',
  styleUrls: ['./dictionaries-page.component.css']
})
export class DictionariesPageComponent implements OnInit {
  // dictionaries$ = new BehaviorSubject([])
  dictionaries$: any;
  loading = false;

  constructor(private dictService: DictionaryService) {
    // this.loadData()
  }

  addDictionary() {
    this.dictService.openDictionaryModal().subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.loading = true,
    this.dictService.getAllDictionaries().subscribe(
      (data:any) => {
        this.loading = false;
        this.dictionaries$.next(data)
      }
    )
  }

  ngOnInit(): void {
    this.dictionaries$ = [
      {
        name: 'Yassine Bouhm',
        description: 'Dsc Dsc Dsc Dsc Dsc Dsc Dsc '
      },
      {
        name: 'Yassine Bouhm',
        description: 'Dsc Dsc Dsc Dsc Dsc Dsc Dsc '
      },
    ]
  }

}
