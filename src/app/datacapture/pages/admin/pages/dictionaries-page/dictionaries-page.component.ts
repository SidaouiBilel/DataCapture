import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionaries-page',
  templateUrl: './dictionaries-page.component.html',
  styleUrls: ['./dictionaries-page.component.css']
})
export class DictionariesPageComponent implements OnInit {

  constructor(private dictService: DictionaryService) {
    this.loadData()
  }

  addDictionary() {
    this.dictService.openDictionaryModal().subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
  }

  ngOnInit(): void {
  }

}
