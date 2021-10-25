import { RsuDataEditorComponent } from './../../modals/rsu-data-editor/rsu-data-editor.component';
import { RsuService } from './../../services/rsu.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { profession, profession_fr, regles } from './utils/model';

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
  profession_fr = profession_fr;
  reglesMasgs = regles;
  date_naissance = null;
  current = 0;


  constructor(public service: RsuService, private modal: NzModalService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // console.log(this.rgs["RG1"])
    /*     Object.keys(this.rgs).forEach(
          item => this.rgs[item]['RG1']
        ) */
    this.updateURI = this.service.RsuDataUpdate();
    this.uploadURI = this.service.RsuDataImport();
    this.laodData()

    this.validateForm = this.fb.group({
      // modele: [null, [Validators.required]],

      Region_Libelle_ar: [null, [Validators.required]],
      Milieu: [null, [Validators.required]],
      Etat_matrimonial_CM: [null, [Validators.required]],
      Demandeur_Sexe: [null, [Validators.required]],
      Demandeur_Taye_Menage: [null, [Validators.required]],
      Demandeur_nbr_Chambre: [null, [Validators.required]],
      Logement_libelle_Ar: [null, [Validators.required]],
      Fonction_libelle_Ar: [null, [Validators.required]],
      parab: [null, [Validators.required]],
      // date_naissance_an: [null, [Validators.required]],
      // date_naissance_mois: [null, [Validators.required]],
      // date_naissance_jour: [null, [Validators.required]],
      voiture: [null, [Validators.required]],
      moto: [null, [Validators.required]],
      bain: [null, [Validators.required]],
      reseau_evacuation_publique_eau_usee: [null, [Validators.required]],
      eau_fontaine_publique: [null, [Validators.required]],
      toilet: [null, [Validators.required]],
      Demandeur_frais_Logement: [null, [Validators.required]],
      SocioEconomique_consomation_Eau: [null, [Validators.required]],
      SocioEconomique_consomation_Electricite: [null, [Validators.required]],
      SocioEconomique_consomation_Telephone: [null, [Validators.required]],
      // revenu: [null, [Validators.required]],

      // Hadi makaynach f input f oussama
      // Niveau_scolaire_agreg_CM: [null, [Validators.required]],
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
    // this.modele = this.validateForm.value.modele
    // delete this.validateForm.value.modele
    console.log(this.validateForm.value);
    // this.service.getFormResult(this.validateForm.value, this.modele).subscribe(
    this.service.getFormResult(this.validateForm.value).subscribe(
      (res: any) => {
        this.fraudResult = res;
        // this.fraudResult.msg = this.getMessage(this.modele, res)
        this.fraudResult.msg = this.getMessage2(res)
        this.fraudResult.msgRegles = this.getReglesMsgs(res)
        this.current += 1;
      }
    )
  }

  getReglesMsgs(res) {
    let msgRegles = [];

    if (res.fraude) {
      res.regles.forEach(elem => {
        let rg = this.reglesMasgs.find(item => item.id == elem)
        msgRegles.push(rg.value)
      });
      this.fraudResult.msgRegles = msgRegles
    }

    return msgRegles;
  }

  getMessage2(res) {
    let message = '';
    if (res.fraude) message = "La personne est fraudause avec une probabilité de " + parseFloat(res['proba']).toFixed(2) + " %"
    else message = "La personne est non fraudause"
    return message
  }

  getMessage(modele, res) {
    let message = '';
    (res.fraude) ?
      (message = "La personne est fraudause à " + parseFloat(res['proba']).toFixed(2) + " %") :
      (message = "La personne est non fraudause à " + parseFloat(res['proba']).toFixed(2) + " %")

    return message

    /*     switch (modele) {
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

        return message */
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
