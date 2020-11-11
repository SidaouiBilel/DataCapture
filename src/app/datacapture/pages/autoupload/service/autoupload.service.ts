import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutouploadService {

  constructor(private Http:HttpClient) { }

  auto_upload(data){
    return this.Http.post(environment.upload+"automtic",data);
  }
  getoutputs(){
    return this.Http.get<any[]>(environment.upload+"datalake");
  }
}
