import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {

  constructor() { }

  listOfcolumns=[];
  templatedata;

  setlistOfcolumns(template){
    this.listOfcolumns = Object.keys(this.templatedata).map(el=>({
      title:el,
      ...{"dataArray":Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null,
       "dataobj":!Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null},
    }))
  }

  ngOnInit() {
     this.setlistOfcolumns(this.templatedata);
    console.log(Object.keys(this.templatedata).map(el=>({
      title:el,
      ...{"dataArray":Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null,
       "dataobj":!Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null},
    })))
  }

}
