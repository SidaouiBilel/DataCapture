import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExplorerService } from '../services/explorer.service';

@Component({
  selector: 'app-data-explorer-container',
  templateUrl: './data-explorer-container.component.html',
  styleUrls: ['./data-explorer-container.component.css']
})
export class DataExplorerContainerComponent implements OnInit {

  constructor(public service: ExplorerService) {
    this.collection$ = this.service.collectionId$
  }

  collection$

  tabs = [
    {label:'Uplaods', route:['uploads']},
    {label:'Collection Data', route:['data']},
    // {label:'Tags', route:['tags']},
  ]

  ngOnInit() {
  }

  onCollectionClicked(id){
    this.service.setCollection(id)
  }
}
