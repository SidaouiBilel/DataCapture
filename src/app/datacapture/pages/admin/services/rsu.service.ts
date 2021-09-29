import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RsuService {

  constructor(private http: HttpClient) { }

  RsuDataImport(): any {
    return `${environment.admin}rsu/import`;
  }

  RsuDataUpdate(): any {
    return `${environment.admin}rsu/update`;
  }

  getAllRsuCompostion() {
    return this.http.get(`${environment.admin}rsu/`);
  }

  getFormResult(data, modele) {
    let url = this.getUri(modele)
    return this.http.post(url, {
      "region": 2,
      "milieu": 1,
      "Etat_matrimonial_CM": 8,
      "Demandeur_Sexe": 1,
      "taille_menage": 3,
      "Logement_libelle_Ar": 3,
      "Situation_profession_agreg_CM": 7,
      "parab": 1,
      "date_naissance_an": 2003,
      "date_naissance_mois": 9,
      "date_naissance_jour": 4,
      "voiture": 1,
      "moto": 1,
      "bain": 0,
      "reseau_evacuation_publique_eau_usee": 0,
      "eau_fontaine_publique": 1,
      "toilet": 1,
      "dep_eau": 100,
      "dep_elec": 100,
      "dep_tele": 100,
      "revenu": 1000
    }
    );
  }

  getUri(modele) {
    switch (modele) {
      case 1:
        return 'http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_with_revenu'
      /* case 1:
        return 'http://ec2-54-226-122-65.compute-1.amazonaws.com:8000/predict'
      case 2:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predicted'
      case 3:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predict' */
      default:
        return 'http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_with_revenu'
    }
  }
}
