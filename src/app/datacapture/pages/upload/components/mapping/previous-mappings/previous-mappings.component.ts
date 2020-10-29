import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '@app/core';
import { NzModalRef } from 'ng-zorro-antd';
import { MappingService } from '../../../services/mapping.service';

@Component({
  selector: 'app-previous-mappings',
  templateUrl: './previous-mappings.component.html',
  styleUrls: ['./previous-mappings.component.css']
})
export class PreviousMappingsComponent {
  @Input() mappings: any[];
  @Input() domain: string;
  @Input() mappingId: string;
  constructor(private modal: NzModalRef, private service: MappingService, private notification: NotificationService) { }

  apply(id: any): void {
    this.modal.close(id);
  }

  deleteMapping(id: any): void {
    this.service.deleteMappingById(id).subscribe((res) => {
      this.refresh();
      this.notification.success('The mapping was deleted successfully');
    });
  }

  refresh() {
    this.service.getPreviouslyMappings(this.domain).subscribe((res: any[]) => {
      this.mappings = res;
    });
  }
}
