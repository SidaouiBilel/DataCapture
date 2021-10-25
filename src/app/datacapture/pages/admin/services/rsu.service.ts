import { log } from 'console';
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

  getFormResult(data) {
    // let url = this.getUri(modele)
    let url = "http://localhost:5010/"
    data['regles'] = []
    return this.http.post(url, {
      "Region_Libelle_ar": 12,
      "Milieu": 1,
      "Etat_matrimonial_CM": 1,
      "Demandeur_Sexe": 1,
      "Demandeur_Taye_Menage": 7,
      "Demandeur_nbr_Chambre": 2,
      "Logement_libelle_Ar": 4,
      "Fonction_libelle_Ar": 20,
      "parab": 0,
      "voiture": 1,
      "moto": 1,
      "bain": 1,
      "reseau_evacuation_publique_eau_usee": 0,
      "eau_fontaine_publique": 0,
      "toilet": 1,
      "Demandeur_frais_Logement": 0,
      "SocioEconomique_consomation_Eau": 0,
      "SocioEconomique_consomation_Electricite": 200,
      "SocioEconomique_consomation_Telephone": 25,
      "regles": []
    });
  }

  getFormResult2(data) {
    return this.http.post('http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_without_revenu', data);
  }

  getUri(modele) {
    switch (modele) {
      case 0:
        return 'ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_without_revenu'
      case 1:
      case 2:
        return 'ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_with_revenu'
      case 3:
      default:
        return 'http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_without_revenu'
    }
  }
}
