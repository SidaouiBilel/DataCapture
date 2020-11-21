import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment'; 
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  getTemplates(){
    return this.http.get<any[]>(environment.upload+"template");
  }

  addTemplate(data){
    return this.http.post(environment.upload+"template",data);
  }
}
