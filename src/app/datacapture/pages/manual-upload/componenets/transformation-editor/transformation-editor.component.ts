import { Component, OnInit } from '@angular/core';
import { TRANSFORMATIONS } from '@app/datacapture/pages/upload/components/transformation/transformations/transformers';

@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  constructor() { }

  transformations = TRANSFORMATIONS
  
  ngOnInit(): void {
  }

  addTransformation(t){

  }
}
