import { env as environment } from '@app/env.service';
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
  getoutputs(uid){
    return this.Http.get<any[]>(environment.upload+"datalake/"+uid);
  }
  get_extracted_files(uid){
    return this.Http.get<any[]>( environment.import + 'files/'+uid);
  }
}
