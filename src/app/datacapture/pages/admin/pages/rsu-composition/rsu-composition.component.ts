import { RsuDataEditorComponent } from './../../modals/rsu-data-editor/rsu-data-editor.component';
import { RsuService } from './../../services/rsu.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { profession } from './utils/model';
import { log } from 'console';

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
  rsuTargets = []
  modele;

  fraudResult;
  validateForm!: FormGroup;
  profession = profession;
  date_naissance = null;
  current = 0;


  constructor(public service: RsuService, private modal: NzModalService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateURI = this.service.RsuDataUpdate();
    this.uploadURI = this.service.RsuDataImport();
    this.laodData()

    this.validateForm = this.fb.group({
      modele: [null, [Validators.required]],

      revenu: [null, [Validators.required]],
      milieu: [null, [Validators.required]],
      region: [null, [Validators.required]],
      taille_menage: [null, [Validators.required]],
      Demandeur_Sexe: [null, [Validators.required]],
      Logement_libelle_Ar: [null, [Validators.required]],
      date_naissance_an: [null, [Validators.required]],
      date_naissance_mois: [null, [Validators.required]],
      date_naissance_jour: [null, [Validators.required]],
      Etat_matrimonial_CM: [null, [Validators.required]],
      Niveau_scolaire_agreg_CM: [null, [Validators.required]],
      Situation_profession_agreg_CM: [null, [Validators.required]],

      parabol: [null, [Validators.required]],
      voiture: [null, [Validators.required]],
      bain: [null, [Validators.required]],
      toilet: [null, [Validators.required]],

      dep_eau: [null, [Validators.required]],
      dep_elec: [null, [Validators.required]],
      dep_tele: [null, [Validators.required]],
      reseau_evacuation_publique_eau_usee: [null, [Validators.required]],
      eau_fontaine_publique: [null, [Validators.required]],


    });
  }

  onChangeDate(result: Date): void {
    this.validateForm.patchValue({
      date_naissance_an: result.getFullYear(),
      date_naissance_mois: result.getMonth() + 1,
      date_naissance_jour: result.getDay(),
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


  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  submit() {
  }

  done(): void {
    this.modele = this.validateForm.value.modele
    // delete this.validateForm.value.modele
    console.log(this.validateForm.value);
    this.service.getFormResult(this.validateForm.value, this.modele).subscribe(
      (res) => {
        this.fraudResult = res;
        this.fraudResult.msg = this.getMessage(this.modele, res)
        this.current += 1;
      }
    )
  }


  getMessage(modele, res) {
    let message = ''
    switch (modele) {
      case 0:
      case 1: {
        (res.fraude) ?
          (message = "La personne est fraudause à " + res.proba.toFixed(2) + " %") :
          (message = "La personne est non fraudause à " + res.proba.toFixed(2) + " %")
        break;
      }

      case 2: {
        let msg = this.getSubMsg(modele, res.proba);
        (res.fraude) ?
          (message = "La personne est fraudause avec une " + msg) :
          (message = "La personne est non fraudause avec une " + msg)
        break;
      }

      case 3: {
        let msg = this.getSubMsg(modele, res.proba);
        (res.fraude) ?
          (message = "La personne est fraudause avec une " + msg) :
          (message = "La personne est non fraudause avec une " + msg)
        break;
      }

      default: {
        message = 'Default message'
        break;
      }

    }

    return message
  }

  getSubMsg(modele, proba) {
    let msg = ''
    switch (modele) {
      case 2: {
        switch (proba) {
          case 68: {
            msg = "probabilité moyenne (1 std de l'erreur normale )"
            break;
          }
          case 95: {
            msg = "probabilité élevé (2 std de l'erreur normale )"
            break;
          }
          case 99: {
            msg = "probabilité  plus élevée (3 std de l'erreur normale )"
            break;
          }
          default: {
            msg = ''
            break;
          }
        }
        break;
      }
      case 3: {
        switch (proba) {
          case 1.0: {
            msg = "probabilité moyenne (1)"
            break;
          }
          case 2.0: {
            msg = "probabilité élevé (2)"
            break;
          }
          default: {
            msg = "probabilité  plus élevée (supérieur ou égale à 3)"
            break;
          }
        }
        break;
      }
      default: {
        msg = ''
        break;
      }
    }

    return msg
  }


  onSetDate(event) {
    console.log("eveent ", event);


  }

}
