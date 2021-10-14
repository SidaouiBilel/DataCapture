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

  getFormResult(data, modele) {
    let url = this.getUri(modele)
    return this.http.post(url, data);
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
