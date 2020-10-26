import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment'; 
@Injectable({
  providedIn: 'root'
})
export class ExtractorService {

  constructor(private Http : HttpClient) { }


  LUNCH_extraction(data , userid ){
    return this.Http.post(environment.connector+"/connector/domain/extract",{...data,uid:userid});
  }

  GET_ALL_DB_connector(){
    return this.Http.get<any[]>(environment.connector+"connector/domain/configure");
  }

  GET_BY_ID_DB_connector(){}

  GET_ALL_USER_JOB(uid){
    return this.Http.get<any[]>(environment.connector+"connector/job/user/"+uid);
  }
}
