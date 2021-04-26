import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TRANSFORMATIONS } from '../transformations/transformers';


@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  constructor(private modal: NzModalService) { }

  transformations = TRANSFORMATIONS

  ngOnInit(): void {
    console.log(this.transformations[0])
  }

  addTransformation(t) {
      const modal = this.modal.create({
      nzContent: t.component,
      nzFooter: null,
      nzWidth: 400,
      nzComponentParams:{
      },
    })
  }
}
