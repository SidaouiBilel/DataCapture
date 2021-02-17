import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment'; 
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  uploadURL = "http://a639a20b446ca46f2a463cb206e7ca06-1781217483.eu-west-3.elb.amazonaws.com/upload/";
  getTemplates(){
    return this.http.get<any[]>(this.uploadURL+"template");
  }

  addTemplate(data){
    return this.http.post(this.uploadURL+"template",data);
  }

  editTemplate(data , id){
    return this.http.post(this.uploadURL+"template/"+id,data);
  }

  deleteTemplate(id){
    return this.http.delete(this.uploadURL+"template/"+id);
  }
}