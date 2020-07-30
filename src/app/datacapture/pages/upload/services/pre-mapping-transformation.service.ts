import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreMappingTransformationService {

  url = environment.transform

  constructor(private http: HttpClient) {
  }

  startJob(filename: string,  worksheetId: string, domainId: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `?filename=${filename}&worksheet=${worksheetId}&worksheet_id=${worksheetId}&domain_id=${domainId}`, {});
  }

}
