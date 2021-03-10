import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env as environment } from '@app/env.service'; 
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  getTemplates(id){
    return this.http.get<any[]>(environment.upload+"template/user/"+id);
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
