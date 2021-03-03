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
  pagination = false;
  searchTerm="";

  setlistOfcolumns(template){
    this.listOfcolumns = Object.keys(this.templatedata).map(el=>({
      title:el,
      ...{"dataArray":Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null,
       "dataobj":!Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null},
    }))
  }

  ngOnInit() {
     this.setlistOfcolumns(this.templatedata);


     //testing
     
    //  let list = [];
    //  let values = [...Object.values(this.templatedata)];
    //  let keys = [...Object.keys(this.templatedata)];
    //  values.map((el)=>{
    //   if(!Array.isArray(el)  ){
    //     if(list.indexOf(el["sheet"])==-1){
    //        list.push(el["sheet"]);
    //     console.log(el["sheet"])
    //     }
    //   }else{
    //     el.map(el=>{
    //       if(list.indexOf(el["sheet"])==-1){
    //         list.push(el["sheet"]);
    //         console.log(el["sheet"])
    //      }
    //     })
    //   }

    //  })

    // console.log(Object.keys(this.templatedata).map(el=>({
    //   title:el,
    //   ...{"dataArray":Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null,
    //       "dataobj":!Array.isArray(this.templatedata[el]) ?this.templatedata[el] :null},
    // })))

    // console.log(list)
  }

}
