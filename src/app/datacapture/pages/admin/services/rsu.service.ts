import { HttpClient } from '@angular/common/http';
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
}
