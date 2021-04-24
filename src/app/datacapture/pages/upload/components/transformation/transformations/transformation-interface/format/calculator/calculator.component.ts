import { CalculatorModalComponent } from '@app/datacapture/pages/upload/components/transformation/transformations/transformation-interface/format/calculator/calculator-modal/calculator-modal.component';
import { Component, OnInit } from '@angular/core';
import { NewCalculatorModalComponent } from '@app/datacapture/pages/manual-upload/modals/new-calculator-modal/new-calculator-modal.component';
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
  componentTemplate
  constructor(private modal: NzModalService) {
    super()
  }

  typeModal = false;
  ngOnInit() {

  }

  openFormula(){
    this.componentTemplate = this.typeModal ? NewCalculatorModalComponent : CalculatorModalComponent

    const modal = this.modal.create({
      nzContent: this.componentTemplate,
      nzComponentParams:{
        node_index: this.index,
        formula: deepCopy(this.data.formula || [])
      }
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

