import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutouploadService {

  constructor(private Http:HttpClient) { }
  uploadURL = "http://a639a20b446ca46f2a463cb206e7ca06-1781217483.eu-west-3.elb.amazonaws.com/upload/";
  importURL = "http://a8b41132de2dc41baa67d550c73f6171-2042249671.eu-west-3.elb.amazonaws.com/import/";
  auto_upload(data){
    return this.Http.post(environment.upload+"automtic",data);
  }
  getoutputs(){
    return this.Http.get<any[]>(environment.upload+"datalake");
  }
  get_extracted_files(uid){
    return this.Http.get<any[]>( environment.import + 'files/'+uid);
  }
}
