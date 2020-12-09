import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clear-grid-filter',
  templateUrl: './clear-grid-filter.component.html',
  styleUrls: ['./clear-grid-filter.component.css']
})
export class ClearGridFilterComponent implements OnInit {
  @Input() gridApi: any = null;
  @Input() filters: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  clearFilter(){
    this.gridApi.setFilterModel(null);
  }

}
