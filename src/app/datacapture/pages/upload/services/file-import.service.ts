import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
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

  public getFileData(page: number, worksheet: string, nrows: number, filters=[], result_id=null): Observable<any> {
    const params = new HttpParams()
    .set('page', page + '')
    .set('lob', 0 + '')
    .set('nrows', nrows + '')
    .set('result_id', (result_id)?result_id: '');
    return this.http.put(environment.import + 'data/' + worksheet, {filters} ,{ params });
  }

  public getResultData(result_id, indices): Observable<any> {
    return this.http.post(environment.import + 'results/', { result_id, indices});
  }

  public getReportData(sheet_id: any) {
    return this.http.get(environment.import + 'report/' + sheet_id);
  }

/*   public getDataCorrelation(sheet_id: any) {
    return this.http.get(environment.import + 'data/' + sheet_id + '/correlation');
  } */

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

  public generateSheet(file_id, sheetId, cs, ce, rs, re, provided_header=null){
    return this.http.post(environment.import + 'sheet', {
      file_id, sheetId, cs, ce, rs, re, provided_header
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

