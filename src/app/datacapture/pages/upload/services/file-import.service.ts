import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { env as environment } from '@app/env.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
  }
  get_extracted_files(uid){
    return this.http.get<any[]>( environment.import + 'files/'+uid);
  }

  select_file(domainid,uid,filename){
    return this.http.get<any[]>( environment.import + 'files/select/'+domainid+"/"+uid+"/"+filename);
  }


  getAll() {
    return this.http.get( environment.admin + 'domain/');
  }

  getAllSuper() {
    return this.http.get( environment.admin + 'domain/all/super');
  }

  getTargetFields(domainId: string) {
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  public getFileData(page: number, worksheet: string, nrows: number, filters=[]): Observable<any> {
    const params = new HttpParams()
    .set('page', page + '')
    .set('lob', 0 + '')
    .set('nrows', nrows + '');
    return this.http.put(environment.import + 'data/' + worksheet, {filters} ,{ params });
  }

  public updateRow(filename: string, worksheet: string, worksheetId: string, nrows: number, page: number, num: number[], lines: string[]) {
    return this.http.post('environment.endPoints.upload1' + 'data', {
      filename,
      worksheet,
      worksheet_id: worksheetId,
      nrows,
      page,
      num,
      lines
    });
  }

  public generateSheet(file_id, sheetId, cs, ce, rs, re){
    return this.http.post(environment.import + 'sheet', {
      file_id, sheetId, cs, ce, rs, re
    });
  }

  public describeColumn(sheet_id, column){
    return this.http.post(environment.import + 'describe', {
      sheet_id, column
    });
  }

  public previewConnectorData(connection_data)
  {
    return this.http.post(environment.import + 'connectors/preview', connection_data).pipe(
      catchError(error=>of({
        "headers": [],
        "data": [],
        "total": 0,
      }))
    );
  }
}

