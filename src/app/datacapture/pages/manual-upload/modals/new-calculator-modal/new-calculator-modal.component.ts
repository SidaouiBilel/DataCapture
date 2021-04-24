import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Parser } from '@app/shared/utils/paerser.utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dataset } from '../../store/manual.model';
import { selectImportSheet } from '../../store/manual.selectors';
import { NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-new-calculator-modal',
  templateUrl: './new-calculator-modal.component.html',
  styleUrls: ['./new-calculator-modal.component.css']
})
export class NewCalculatorModalComponent implements OnInit {

  constructor(private modal: NzModalRef, private store: Store<AppState>) { }
  error = null
  formula = []
  node_index = 0
  sheets$: Observable<Dataset[]>;
  column = ''
  selectedSheet = null;
  columns = []


  ngOnInit(): void {
    this.sheets$ = this.store.select(selectImportSheet);
  }
  selectSheet(s) {
    this.selectedSheet = s
  }

  onEnter() {
  /* const col = {
      sheet: this.selectedSheet,
      col: this.column
    }
    this.columns.push(col)
    console.log(this.columns) */
    if(this.column != '')
    this.addToken(this.selectedSheet, this.column, "column")

    this.column = ''
  }

  addToken(sheet, value, type){

    const token = {
      sheet,
      value,
      type
    }

    this.formula.push(token)

    this.updateFormula()
  }

  updateFormula(){
    let index = 0
    let token = this.formula[index]
    while(token) {
      if(token.type == 'number'){
        const next_index = index+1
        const next_token = this.formula[next_index]
        if (next_token && next_token.type == 'number'){
          this.formula.splice(next_index, 1)
          token.value = String(token.value).concat(next_token.value)
        }
      }
      token = this.formula[++index]
    }


    try{
      this.lex(this.formula)
      this.error = null
    } catch (e) {
      this.error = e
    }
  }

  lex(expr: any[]){
    Parser.validate([...expr])
  }

  removeLastToken(){
    const token = this.formula[this.formula.length - 1]
    if(token){
      switch(token.type){
        case 'number': {
          const token_len = token.value.length
          if(token_len > 1){
            token.value = String(token.value).substr(0, token_len - 1)
            break
          }
        }
        default:
          this.formula.pop()
      }
      this.updateFormula()
    }
  }

  clear(){
    this.formula = []
    this.updateFormula()
  }

  submit(){
    this.modal.close(this.formula)
  }

}
