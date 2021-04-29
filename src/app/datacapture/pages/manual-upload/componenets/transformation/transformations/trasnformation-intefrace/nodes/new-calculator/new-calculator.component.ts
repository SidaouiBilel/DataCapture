import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Dataset } from '@app/datacapture/pages/manual-upload/store/manual.model';
import { selectImportSheet } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';
import { NewCalculatorModalComponent } from './new-calculator-modal/new-calculator-modal.component';

@Component({
  selector: 'app-new-calculator',
  templateUrl: './new-calculator.component.html',
  styleUrls: ['./new-calculator.component.css']
})
export class NewCalculatorComponent extends TransformationInterfaceComponent implements OnInit {

  sheets$: Observable<Dataset[]>;

  constructor(private modal: NzModalService, private store: Store<AppState>) {
    super()
  }

  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportSheet);
  }

  openFormula(){
    const modal = this.modal.create({
      nzContent: NewCalculatorModalComponent,
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
