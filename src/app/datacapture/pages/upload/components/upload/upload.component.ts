import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { ActionImportReset } from '../../store/actions/import.actions';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToCleansing(): void {
    this.router.navigate(['/datacapture/upload/cleansing']);
  }
}
