import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreMappingTransformationService {

  // url = environment.transform

  constructor(private http: HttpClient) {
  }

  startJob(fileid: string,  sheetid: string, pipeid: string): Observable<any> {
    return this.http.get( `${environment.transform}${fileid}/${sheetid}/${pipeid}`);
  }

  getResult(fileid: any, page: any, nrows=10, filter:any[]=[], sort:any=null) {
    // return this.http.get( `${environment.transform}preview/removeit?page=${page}&nrows=${nrows}&filename=${fileid.replace(/\//g,'\\\\')}`);
    const body = {
      filter,
      sort,
      filename:fileid
    }
    return this.http.post( `${environment.transform}preview?page=${page}&nrows=${nrows}`, body);
  }
}
