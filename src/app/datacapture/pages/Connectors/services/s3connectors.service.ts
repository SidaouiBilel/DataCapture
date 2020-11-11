import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment'; 
@Injectable({
  providedIn: 'root'
})
export class S3connectorsService {

  constructor(private Http:HttpClient) { }

  Add_S3_connector(data , userid){
    return this.Http.post(environment.connector+"connector/s3/configure",{...data,uid:userid});
  }
  GET_ALL_S3_connector(){
    return this.Http.get<any[]>(environment.connector+"connector/s3/configure");
  }
}
