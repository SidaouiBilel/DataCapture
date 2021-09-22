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
    return this.http.post(url, data/* {
      "milieu": 0,
      "region": 0,
      "taille_menage": 0,
      "Sexe_CM": 0,
      "Age_CM": 0,
      "Etat_matrimonial_CM": 0,
      "Niveau_scolaire_agreg_CM": 0,
      "Situation_profession_agreg_CM": 0,
      "voiture": 0,
      "bain": 0,
      "parabol": 0,
      "ordinateur": 0,
      "dep_eau": 0,
      "dep_gaz": 0,
      "dep_elec": 0,
      "dep_internet_tele": 0,
      "revenu": 0
    } */
    );
  }

  getUri(modele) {
    switch (modele) {
      case 0:
        return 'http://ec2-54-226-122-65.compute-1.amazonaws.com:8000/predict_without_revenu'
      case 1:
        return 'http://ec2-54-226-122-65.compute-1.amazonaws.com:8000/predict'
      case 2:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predicted'
      case 3:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predict'
      default:
        return 'http://ec2-54-226-122-65.compute-1.amazonaws.com:8000/predict'
    }
  }
}
