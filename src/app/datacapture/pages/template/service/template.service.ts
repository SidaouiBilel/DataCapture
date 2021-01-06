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

  editTemplate(data , id){
    return this.http.post(environment.upload+"template/"+id,data);
  }

  deleteTemplate(id){
    return this.http.delete(environment.upload+"template/"+id);
  }
}
