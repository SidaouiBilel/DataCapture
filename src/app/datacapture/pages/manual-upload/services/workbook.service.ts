import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkbookService {

  url = environment.transform;

  constructor(private http: HttpClient) { }

  run(sheets:any[], transformations: any[]){
    return this.http.post(`${this.url}workbook/`, {
      sheets, transformations 
    }).pipe(catchError(e=> of(null)));
  }
}
