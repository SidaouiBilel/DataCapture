import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-previous-mappings',
  templateUrl: './previous-mappings.component.html',
  styleUrls: ['./previous-mappings.component.css']
})
export class PreviousMappingsComponent {
  @Input() mappings: any[];
  @Input() mappingId: string;
  constructor(private modal: NzModalRef) { }

  apply(id: any): void {
    this.modal.close(id);
  }
}
