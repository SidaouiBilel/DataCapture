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
    return this.http.post(url, data);
  }

  getUri(modele) {
    switch (modele) {
      case 1:
        return 'http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_without_revenu'
      /* case 1:
        return 'http://ec2-54-226-122-65.compute-1.amazonaws.com:8000/predict'
      case 2:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predicted'
      case 3:
        return 'http://ec2-54-234-18-137.compute-1.amazonaws.com:3333/predict' */
      default:
        return 'http://ec2-54-163-35-186.compute-1.amazonaws.com:80/predict_without_revenu'
    }
  }
}
