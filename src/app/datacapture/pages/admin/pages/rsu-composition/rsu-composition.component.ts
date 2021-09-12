import { RsuDataEditorComponent } from './../../modals/rsu-data-editor/rsu-data-editor.component';
import { RsuService } from './../../services/rsu.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ReferenceService } from '../../componenets/references/reference.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsu-composition',
  templateUrl: './rsu-composition.component.html',
  styleUrls: ['./rsu-composition.component.css']
})
export class RsuCompositionComponent implements OnInit {
  loading;
  uploadURI;
  updateURI;
  rsuData$: Subject<any> = new Subject();
  rsuSources$: Subject<any> = new Subject();
  // rsuTargets$: Subject<any> = new Subject();
  rsuTargets = []

  validateForm!: FormGroup;


  constructor(public service: RsuService, private modal: NzModalService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateURI = this.service.RsuDataUpdate();
    this.uploadURI = this.service.RsuDataImport();
    this.laodData()

    this.validateForm = this.fb.group({
      milieu: [null, [Validators.required]],
      region: [null, [Validators.required]],
      tailleMenage: [null, [Validators.required]],
      ageCM: [null, [Validators.required]],
      niveauScolaireAgregCM: [null, [Validators.required]],
      sexeCM: [null, [Validators.required]],
      situationProfessionAgregCM: [null, [Validators.required]],
      depEau: [null, [Validators.required]],
      depElec: [null, [Validators.required]],
      depInternet: [null, [Validators.required]],
      ordinateur: [null, [Validators.required]],
      parabol: [null, [Validators.required]],
      voiture: [null, [Validators.required]],
      bain: [null, [Validators.required]],
    });
  }

  onBack() {
    console.log("Click on back button");
  }

  laodData() {
    this.rsuData$.next([]);
    this.rsuSources$.next([]);
    // this.rsuTargets$.next([]);
    this.rsuTargets = [];

    this.loading = true;
    this.service.getAllRsuCompostion()
      .subscribe(
        (res: any) => {
          this.rsuData$.next(res.data);
          this.rsuSources$.next(res.sources);
          // this.rsuTargets$.next(res.targets);
          this.rsuTargets = res.targets
          this.loading = false;
        });
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.loading = true;
    }
    if (info.file.status === 'done') {
      this.laodData();
    } else if (info.file.status === 'error') {
      this.laodData();
    }
  }

  download() {
    console.log("download file");
  }


  onEdit(row) {
    this.modal.create({
      nzContent: RsuDataEditorComponent,
      nzComponentParams: { data: row },
    }).afterClose.subscribe(success => {
      if (success) {
        this.laodData()
      }
    });
  }


  onDelete(row) {
    console.log("Edit a row", row);
  }


  submitForm(): void {
    console.log('sub',this.validateForm.value);

    // for (const i in this.validateForm.controls) {
    //   if (this.validateForm.controls.hasOwnProperty(i)) {
    //     this.validateForm.controls[i].markAsDirty();
    //     this.validateForm.controls[i].updateValueAndValidity();
    //   }
    // }
  }

}
