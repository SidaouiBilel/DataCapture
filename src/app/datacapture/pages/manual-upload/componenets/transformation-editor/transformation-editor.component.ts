import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '@app/datacapture/pages/upload/components/transformation/transformations/transformation-interface/format/calculator/calculator.component';
import { TransformationInterfaceComponent } from '@app/datacapture/pages/upload/components/transformation/transformations/transformation-interface/transformation-interface.component';
import { TRANSFORMATIONS } from '@app/datacapture/pages/upload/components/transformation/transformations/transformers';
import { NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  constructor(private modal: NzModalService) { }

  transformations = TRANSFORMATIONS

  ngOnInit(): void {
  }

  addTransformation(t) {
      const modal = this.modal.create({
      nzContent: t.component, // || TransformationInterfaceComponent,
      nzComponentParams:{
        typeModal: true
      }
    })
  }
}
