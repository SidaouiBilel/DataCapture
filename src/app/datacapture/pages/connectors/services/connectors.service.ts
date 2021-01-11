import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectorsService {

  constructor(private http: HttpClient) { }

  getAll(type=''){
    return this.http.get(`${environment.admin}connectors/${type}`)
  }

  save(data){
    return this.http.post(`${environment.admin}connectors/`, data)
  }

  delete(id){
    return this.http.delete(`${environment.admin}connectors/${id}`)
  }
}
