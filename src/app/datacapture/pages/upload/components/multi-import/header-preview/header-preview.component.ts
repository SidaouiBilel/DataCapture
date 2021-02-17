import { Component, Input, OnInit } from '@angular/core';
import { withValue } from '@app/shared/utils/rxjs.utils';
import { FileImportService } from '../../../services/file-import.service';

@Component({
  selector: 'app-header-preview',
  templateUrl: './header-preview.component.html',
  styleUrls: ['./header-preview.component.css']
})
export class HeaderPreviewComponent implements OnInit {

  @Input() data

  constructor(private service: FileImportService) { }

  ngOnInit(): void {
  }

  descriptions = {};
  onColumnChange(column, isActive) {
    if (isActive) {
      this.descriptions[column] = null;
        this.service.describeColumn(this.data.sheet_id, column).subscribe(description => {
          this.descriptions[column] = [];
          // tslint:disable-next-line: forin
          for (const key in description) {
            this.descriptions[column].push({label: key, value: description[key]});
          }
        });
      
    }
  }

}
