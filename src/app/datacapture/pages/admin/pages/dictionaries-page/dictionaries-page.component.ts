import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionaries-page',
  templateUrl: './dictionaries-page.component.html',
  styleUrls: ['./dictionaries-page.component.css']
})
export class DictionariesPageComponent implements OnInit {

  constructor(private editor: DictionaryService) {
    this.loadData()
  }

  addDictionary() {
    this.editor.openAddDictionary().subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
  }

  ngOnInit(): void {
  }

}
