import { CalculatorModalComponent } from '@app/datacapture/pages/upload/components/transformation/transformations/transformation-interface/format/calculator/calculator-modal/calculator-modal.component';
import { Component, OnInit } from '@angular/core';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { NzModalService } from 'ng-zorro-antd';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent  extends TransformationInterfaceComponent implements OnInit  {

  operations = ['+','*','/','-']
  constructor(private modal: NzModalService) {
    super()
  }

  ngOnInit() {

  }

  openFormula(){
    const modal = this.modal.create({
      nzContent: CalculatorModalComponent,
      nzComponentParams:{
        node_index: this.index,
        formula: deepCopy(this.data.formula || [])
      },
      nzFooter: null,
    })

    modal.afterClose.subscribe(
      (formula)=>{
        if(formula){
          this.data.formula = formula
          this.onDataChanged()
        }
      }
    )
  }

  getFormulaText(){
    return (this.data.formula || []).map(e=>e.value).join(' ')
  }
}

