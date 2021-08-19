import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsu-data-editor',
  templateUrl: './rsu-data-editor.component.html',
  styleUrls: ['./rsu-data-editor.component.css']
})
export class RsuDataEditorComponent implements OnInit {

  data;
  constructor() { }

  ngOnInit(): void {
    console.log('men lmodal',this.data)
  }

}
